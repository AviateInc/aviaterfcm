import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";
import { createContactServer } from "./contact-server.mjs";

const valid = {
    name: "Test Visitor",
    email: "visitor@example.com",
    company: "Example Company",
    subject: "Project enquiry",
    message: "Materials for a roofing project.",
    website: "",
};

async function setup(context, sendMail) {
    const sent = [];

    const server = createContactServer({
        mailer: {
            testMode: false,
            from: "website@example.com",
            to: "sales@aviaterfcm.com",
            transport: {
                sendMail:
                    sendMail ??
                    (async (mail) => {
                        sent.push(mail);
                        return { accepted: [mail.to] };
                    }),
            },
        },

        allowedOrigins: new Set(["http://localhost:3000"]),
    });

    server.listen(0, "127.0.0.1");
    await once(server, "listening");

    context.after(() => {
        server.closeAllConnections();
        server.close();
    });

    return {
        sent,
        
        post: (data, origin = "http://localhost:3000") =>
            fetch(`http://127.0.0.1:${server.address().port}/contact`, {
                method: "POST",
                headers: { Origin: origin, "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }),
    };
}

test("submits validated content with a fixed recipient and visitor reply-to", async (context) => {
    const { post, sent } = await setup(context);
    const response = await post(valid);
    
    assert.equal(response.status, 200);
    assert.equal((await response.json()).ok, true);
    assert.equal(sent.length, 1);
    assert.equal(sent[0].to, "sales@aviaterfcm.com");
    assert.equal(sent[0].from, "website@example.com");
    assert.equal(sent[0].replyTo.address, valid.email);
    assert.ok(sent[0].text.includes(valid.message));
});

test("rejects invalid fields and header injection before sending", async (context) => {
    const { post, sent } = await setup(context);
    
    for (const change of [
        { email: "invalid" },
        { subject: "Hello\r\nBcc: other@example.com" },
        { message: " " },
        { name: {} },
    ]) {
        assert.equal((await post({ ...valid, ...change })).status, 400);
    }

    assert.equal(sent.length, 0);
});

test("rejects unapproved origins and oversized bodies", async (context) => {
    const { post, sent } = await setup(context);
    
    assert.equal((await post(valid, "https://unapproved.example")).status, 403);
    assert.equal((await post({ ...valid, message: "x".repeat(17000) })).status, 413);
    assert.equal(sent.length, 0);
});

test("honeypot submissions do not send email", async (context) => {
    const { post, sent } = await setup(context);
    
    assert.equal((await post({ ...valid, website: "bot.example" })).status, 200);
    assert.equal(sent.length, 0);
});

test("rate limits repeated submissions", async (context) => {
    const { post } = await setup(context);
    
    for (let index = 0; index < 5; index++) {
        assert.equal((await post(valid)).status, 200);
    }

    const response = await post(valid);

    assert.equal(response.status, 429);
    assert.equal(response.headers.get("retry-after"), "600");
});

test("SMTP errors return a failure without exposing configuration", async (context) => {
    const { post } = await setup(context, async () => {
        throw new Error("private SMTP information");
    });

    const response = await post(valid);
    
    assert.equal(response.status, 502);
    assert.equal((await response.text()).includes("private SMTP information"), false);
});
