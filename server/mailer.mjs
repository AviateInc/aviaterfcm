import nodemailer from "nodemailer";

export async function createMailer({ testMode = false } = {}) {
    const timeouts = { connectionTimeout: 15000, greetingTimeout: 15000, socketTimeout: 15000 };
    
    if (testMode) {
        const account = await nodemailer.createTestAccount();
        const transport = nodemailer.createTransport({ ...account.smtp, auth: { user: account.user, pass: account.pass }, ...timeouts });
        await transport.verify();
        return { transport, from: account.user, to: "sales@aviaterfcm.com", testMode: true };
    }

    for (const key of ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM"]) {
        if (!process.env[key]) {
            throw new Error(`Missing required mail setting: ${key}`);
        }
    }

    const port = Number(process.env.SMTP_PORT);

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error("Invalid SMTP_PORT");
    }

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: port === 465,
        requireTLS: port !== 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
        disableFileAccess: true,
        disableUrlAccess: true,
        ...timeouts,
    });

    await transport.verify();

    return {
        transport,
        from: process.env.SMTP_FROM,
        to: process.env.CONTACT_TO ?? "sales@aviaterfcm.com",
        testMode: false,
    };
}

export async function sendContactEmail(mailer, fields) {
    const info = await mailer.transport.sendMail({
        from: mailer.from,
        to: mailer.to,
        replyTo: { name: fields.name, address: fields.email },
        subject: `Aviate RFCM enquiry: ${fields.subject}`,
        text: [
            `Name: ${fields.name}`,
            `Email: ${fields.email}`,
            `Company: ${fields.company || "Not provided"}`,
            "",
            fields.message,
        ].join("\n"),
    });

    if (!info.accepted?.length) {
        throw new Error("SMTP did not accept the message");
    }

    return {
        ok: true,
        testMode: mailer.testMode,
        ...(mailer.testMode ? { previewUrl: nodemailer.getTestMessageUrl(info) } : {}),
    };
}
