import { Mail, Phone, Printer } from "lucide-react";
import ContactEmailForm from "./contact-email-form";

const departments = [
    { label: "Sales Department:", email: "sales@aviaterfcm.com" },
    { label: "Administrative Support team:", email: "support_admin@aviaterfcm.com" },
];

export default function ContactComponent() {
    return (
        <section
            className="bg-[#101c24] pb-8 font-sans text-slate-50 sm:pb-12"
            aria-labelledby="contact-heading"
        >
            <div className="mx-auto w-[calc(100%-2rem)] max-w-[1600px]">
                <div className="card rounded-2xl border border-white/10 bg-slate-800/40 p-6 sm:rounded-3xl sm:p-8 lg:p-10">
                    <div className="grid items-start gap-10 lg:grid-cols-2 xl:gap-16">
                        <div className="min-w-0">
                            <p className="mb-3 flex items-center gap-2.5 text-sm font-semibold tracking-[0.17em] text-blue-300 uppercase">
                                <span
                                    className="h-0.5 w-7 shrink-0 bg-current"
                                    aria-hidden="true"
                                />
                                Contact us
                            </p>
                            <h2
                                id="contact-heading"
                                className="max-w-2xl text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl lg:text-4xl"
                            >
                                We can be reached by the following
                            </h2>

                            <dl className="mt-6 divide-y divide-white/10 text-base leading-7 sm:mt-8">
                                {departments.map(({ label, email }) => (
                                    <div
                                        key={email}
                                        className="grid gap-2 py-4 first:pt-0 last:pb-0 "
                                    >
                                        <dt className="min-w-0 font-semibold text-slate-100">
                                            {label}
                                        </dt>
                                        <dd className="flex min-w-0 items-start gap-3 text-slate-300">
                                            <Mail
                                                className="mt-1 size-5 shrink-0 text-blue-300"
                                                aria-hidden="true"
                                            />
                                            <a
                                                href={`mailto:${email}`}
                                                className="link link-hover min-w-0 rounded-sm break-all underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
                                            >
                                                {email}
                                            </a>
                                        </dd>
                                    </div>
                                ))}
                            </dl>

                            <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
                                <h3 className="max-w-2xl text-base leading-7 font-medium text-blue-300">
                                    For Corporate or Small Business Sales please contact:
                                </h3>

                                <dl className="mt-4 space-y-4 text-base leading-7">
                                    <div className="grid grid-cols-[4rem_minmax(0,1fr)] gap-4">
                                        <dt className="font-semibold text-slate-100">Phone:</dt>
                                        <dd className="flex min-w-0 items-start gap-3 text-slate-300">
                                            <Phone
                                                className="mt-1 size-5 shrink-0 text-blue-300"
                                                aria-hidden="true"
                                            />
                                            <a
                                                href="tel:+19169934000"
                                                className="link link-hover min-w-0 rounded-sm underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
                                            >
                                                (916) 993-4000
                                            </a>
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-[4rem_minmax(0,1fr)] gap-4">
                                        <dt className="font-semibold text-slate-100">Fax:</dt>
                                        <dd className="flex min-w-0 items-start gap-3 text-slate-300">
                                            <Printer
                                                className="mt-1 size-5 shrink-0 text-blue-300"
                                                aria-hidden="true"
                                            />
                                            <span>(916) 993-4010</span>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <ContactEmailForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
