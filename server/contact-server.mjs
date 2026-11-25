import { createServer } from "node:http";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createMailer, sendContactEmail } from "./mailer.mjs";

function validate(data) {
    if (!data || typeof data !== "object" || Array.isArray(data)) {
        return null;
    }
    const fields = {};
    for (const [key, limit] of Object.entries({
        name: 100,
        email: 254,
        company: 150,
        subject: 150,
        message: 4000,
    })) {
        if (data[key] !== undefined && typeof data[key] !== "string") {
            return null;
        }

        const value = (data[key] ?? "").trim();

        if (
            value.length > limit ||
            (key !== "company" && !value) ||
            (key !== "message" && /[\r\n\0]/.test(value))
        ) {
            return null;
        }

        fields[key] = value;
    }

    return /^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(fields.email) ? fields : null;
}

export function createContactServer({ mailer, allowedOrigins }) {
    const attempts = new Map();
    
    const server = createServer(async (request, response) => {
        const reply = (status, body) => {
            response.writeHead(status, {
                "Content-Type": "application/json",
                "Cache-Control": "no-store",
                "X-Content-Type-Options": "nosniff",
            });

            response.end(JSON.stringify(body));
        };

        if (request.url !== "/contact") {
            reply(404, { ok: false });
            return;
        }

        const origin = request.headers.origin;
        response.setHeader("Vary", "Origin");

        if (!origin || !allowedOrigins.has(origin)) {
            reply(403, { ok: false, error: "Origin not allowed" });
            return;
        }

        response.setHeader("Access-Control-Allow-Origin", origin);
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");

        if (request.method === "OPTIONS") {
            response.writeHead(204);
            response.end();
            return;
        }

        if (request.method !== "POST") {
            response.setHeader("Allow", "POST, OPTIONS");
            reply(405, { ok: false });
            return;
        }

        if (!request.headers["content-type"]?.startsWith("application/json")) {
            reply(415, { ok: false });
            return;
        }

        const now = Date.now();

        for (const [key, entry] of attempts) {
            if (entry.expires <= now) {
                attempts.delete(key);
            }
        }

        const ip = request.socket.remoteAddress ?? "unknown";
        const attempt = attempts.get(ip) ?? { count: 0, expires: now + 600000 };

        if (attempt.count >= 5 || (!attempts.has(ip) && attempts.size >= 1000)) {
            response.setHeader("Retry-After", "600");
            reply(429, { ok: false });
            return;
        }

        attempt.count += 1;
        attempts.set(ip, attempt);

        let data;

        try {
            const chunks = [];
            let bytes = 0;
            
            for await (const chunk of request) {
                bytes += chunk.length;
                
                if (bytes > 16384) {
                    reply(413, { ok: false });
                    return;
                }

                chunks.push(chunk);
            }
            
            const body = Buffer.concat(chunks).toString("utf8");
            data = JSON.parse(body);
        } catch {
            reply(400, { ok: false, error: "Invalid request" });
            return;
        }

        const fields = validate(data);

        if (!fields) {
            reply(400, { ok: false, error: "Check the form fields" });
            return;
        }

        if (data.website) {
            reply(200, { ok: true, testMode: mailer.testMode });
            return;
        }

        try {
            reply(200, await sendContactEmail(mailer, fields));
        } catch {
            reply(502, { ok: false, error: "Email submission unavailable" });
        }
    });

    server.requestTimeout = 30000;
    server.headersTimeout = 10000;

    return server;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    try {
        const testMode = process.argv.includes("--test");
        const mailer = await createMailer({ testMode });
        const allowedOrigins = new Set((process.env.CONTACT_ALLOWED_ORIGINS ?? "http://localhost:3000,http://localhost:3001,http://localhost:3126").split(",").map((value) => value.trim()).filter(Boolean));
        const port = Number(process.env.CONTACT_PORT ?? 3201);
        const host = process.env.CONTACT_HOST ?? "127.0.0.1";
        const server = createContactServer({ mailer, allowedOrigins });
        
        server.listen(port, host, () => console.log(`Contact service: http://${host}:${port}/contact (${testMode ? "Ethereal test inbox; no mailbox delivery" : "SMTP delivery"})`));
        server.on("error", () => {
            console.error("Contact service could not start. Check the host and port.");
            process.exitCode = 1;
        });
    } catch (error) {
        console.error("Contact service could not start:", error instanceof Error ? error.message : "Mail configuration error");
        process.exitCode = 1;
    }
}
