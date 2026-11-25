"use client";

import { useRef, useState, type FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";

const endpoint =
    process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ??
    (process.env.NODE_ENV === "development" ? "http://localhost:3201/contact" : "");

export default function ContactEmailForm() {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [feedback, setFeedback] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const inFlight = useRef(false);
    const fieldClass =
        "input w-full min-w-0 border-white/20 bg-slate-950/40 text-base text-slate-50 placeholder:text-slate-500 focus:border-blue-300 focus:outline-blue-300";

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (inFlight.current || !endpoint) {
            return;
        }

        const form = event.currentTarget;
        const data = Object.fromEntries(new FormData(form));

        inFlight.current = true;

        setStatus("sending");
        setFeedback("");
        setPreviewUrl(null);

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(data),
                signal: AbortSignal.timeout(20000),
            });

            const result = await response.json();

            if (!response.ok || result.ok !== true) {
                throw new Error(
                    response.status === 429
                        ? "Please wait a few minutes before trying again, or email us directly."
                        : "We couldn�t submit your message. Please try again or email sales@aviaterfcm.com.",
                );
            }

            const successMessage = result.testMode
                ? "Your test email was captured. It was not delivered to a mailbox."
                : "Thank you! Your message has been submitted.";
            setStatus("success");
            setFeedback(successMessage);
            toast.success(successMessage, { id: "contact-submission" });
            if (
                result.testMode &&
                typeof result.previewUrl === "string" &&
                result.previewUrl.startsWith("https://ethereal.email/message/")
            ) {
                setPreviewUrl(result.previewUrl);
            }

            form.reset();
        } catch (error) {
            setStatus("error");

            setFeedback(
                error instanceof Error && error.message.startsWith("Please wait")
                    ? error.message
                    : "We couldn�t confirm your message was submitted. Please try again or email sales@aviaterfcm.com.",
            );
        } finally {
            inFlight.current = false;
        }
    }

    return (
        <div className="min-w-0 rounded-2xl border border-white/10 bg-slate-950/25 p-5 sm:p-6 lg:p-8">
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 5000,
                    className: "font-sans text-sm",
                    style: {
                        background: "#101c24",
                        color: "#f1f5f9",
                        border: "1px solid rgba(147, 197, 253, 0.25)",
                        borderRadius: "1rem",
                        padding: "1rem 1.25rem",
                        maxWidth: "min(420px, calc(100vw - 32px))",
                        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.3)",
                    },
                    success: {
                        iconTheme: { primary: "#93c5fd", secondary: "#101c24" },
                    },
                }}
            />
            <h3
                id="contact-form-heading"
                className="text-2xl font-medium tracking-tight text-slate-50"
            >
                Send us a message
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
                Tell us about your project or ask our team a question.
            </p>

            <form
                className="mt-6"
                aria-labelledby="contact-form-heading"
                aria-busy={status === "sending"}
                onSubmit={handleSubmit}
            >
                <fieldset disabled={status === "sending"} className="space-y-5 disabled:opacity-70">
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        <div className="min-w-0">
                            <label
                                className="mb-2 block text-sm font-medium text-slate-200"
                                htmlFor="contact-name"
                            >
                                Name{" "}
                                <span className="text-blue-300" aria-hidden="true">
                                    *
                                </span>
                            </label>

                            <input
                                className={fieldClass}
                                id="contact-name"
                                name="name"
                                autoComplete="name"
                                maxLength={100}
                                required
                            />
                        </div>

                        <div className="min-w-0">
                            <label
                                className="mb-2 block text-sm font-medium text-slate-200"
                                htmlFor="contact-email"
                            >
                                Email{" "}
                                <span className="text-blue-300" aria-hidden="true">
                                    *
                                </span>
                            </label>

                            <input
                                className={fieldClass}
                                id="contact-email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                maxLength={254}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            className="mb-2 block text-sm font-medium text-slate-200"
                            htmlFor="contact-company"
                        >
                            Company or organization{" "}
                            <span className="font-normal text-slate-400">(optional)</span>
                        </label>

                        <input
                            className={fieldClass}
                            id="contact-company"
                            name="company"
                            autoComplete="organization"
                            maxLength={150}
                        />
                    </div>

                    <div>
                        <label
                            className="mb-2 block text-sm font-medium text-slate-200"
                            htmlFor="contact-subject"
                        >
                            Subject{" "}
                            <span className="text-blue-300" aria-hidden="true">
                                *
                            </span>
                        </label>

                        <input
                            className={fieldClass}
                            id="contact-subject"
                            name="subject"
                            maxLength={150}
                            required
                        />
                    </div>

                    <div>
                        <label
                            className="mb-2 block text-sm font-medium text-slate-200"
                            htmlFor="contact-message"
                        >
                            Message{" "}
                            <span className="text-blue-300" aria-hidden="true">
                                *
                            </span>
                        </label>

                        <textarea
                            className="textarea min-h-36 w-full resize-y border-white/20 bg-slate-950/40 text-base text-slate-50 focus:border-blue-300 focus:outline-blue-300"
                            id="contact-message"
                            name="message"
                            rows={5}
                            maxLength={4000}
                            required
                        />
                    </div>

                    <div className="hidden" aria-hidden="true">
                        <label htmlFor="contact-website">Leave this field empty</label>
                        
                        <input
                            id="contact-website"
                            name="website"
                            autoComplete="off"
                            tabIndex={-1}
                        />
                    </div>

                    <button
                        className="btn w-full border-blue-300 bg-blue-300 text-slate-950 shadow-none hover:border-blue-200 hover:bg-blue-200 focus-visible:outline-blue-300 sm:w-auto"
                        type="submit"
                        disabled={!endpoint}
                    >
                        {status === "sending" ? "Sending�" : "Send message"}
                    </button>
                </fieldset>

                {!endpoint && (
                    <p className="mt-4 text-sm leading-6 text-slate-400">
                        Online messaging is not available yet. Please email{" "}
                        <a
                            className="link link-hover text-blue-300"
                            href="mailto:sales@aviaterfcm.com"
                        >
                            sales@aviaterfcm.com
                        </a>
                        .
                    </p>
                )}

                <div
                    className="mt-4 text-sm leading-6"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {feedback && (
                        <p className={status === "error" ? "text-red-300" : "text-blue-200"}>
                            {feedback}
                        </p>
                    )}
                    
                    {previewUrl && (
                        <a
                            className="link mt-2 inline-block text-blue-300"
                            href={previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View captured test email
                        </a>
                    )}
                </div>
            </form>
        </div>
    );
}
