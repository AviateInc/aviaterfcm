import Image from "next/image";
import AboutContinued from "../../public/about_continued.jpg";

export default function AboutContinuedComponent() {
    return (
        <section
            className="bg-[#101c24] pb-8 font-sans text-slate-50 sm:pb-12"
            aria-label="More about Aviate RFCM"
        >
            <div className="mx-auto w-[calc(100%-2rem)] max-w-[1600px]">
                <div className="card rounded-2xl border border-white/10 bg-slate-800/40 p-6 sm:rounded-3xl sm:p-8 lg:p-10">
                    <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_18rem]">
                        <div className="min-w-0 space-y-4 text-base leading-7 text-slate-300">
                            <p className="font-medium text-slate-100">
                                Our superb team of personal account managers offers product
                                knowledge, quick responses, and innovative agreements directly to
                                buyers from prospect to delivery. We are trained to field any and
                                all questions—and no order is too large to find a solution!
                            </p>

                            <p className="font-medium text-slate-100">
                                Aviate Enterprises R.F.C.M is an <strong>SDVOSB</strong> (Service
                                Disabled Veteran Owned Small Business) located at the 1418 N. Market
                                Blvd, Sacramento, CA, 95834, and is currently in the process to be
                                HUBZone Certified. This location has a 10,000-foot runway, over
                                100,000 SQ FT of warehouse space, and rail access.
                            </p>

                            <p className="font-medium text-slate-100">
                                We envision becoming your ally to combat all of your organization
                                {"’"}s needs, ranging from office supplies to construction
                                equipment—and everything in between! With our distribution
                                partnerships with Sika, we are expanding to support more needs for
                                contractors, and we plan to continue to grow our network in order to
                                accommodate the needs of our customers. Need a reliable small
                                business{'’'} help arranging an important quote? Contact one of our
                                talented contract specialists today!
                            </p>
                        </div>

                        <figure className="block w-full max-w-64 justify-self-end xl:max-w-72">
                            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-800">
                                <Image
                                    src={AboutContinued}
                                    alt="Roof tiles stacked on timber battens during roof installation"
                                    fill
                                    sizes="(min-width: 1280px) 288px, 256px"
                                    placeholder="blur"
                                    className="object-cover object-bottom"
                                />
                            </div>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    );
}
