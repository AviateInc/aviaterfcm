import Image from "next/image";
import HomeCarousel from "../components/home-carousel";
import Tim from "../../public/Tim.jpg";

import AboutComponent from "../components/about";
import PhilosophyComponent from "../components/philosophyComponent";
import AboutContinuedComponent from "../components/aboutContinued";
import ShippingComponent from "../components/shipping";
import ExpertiseComponent from "../components/expertise";
import ContactComponent from "../components/contact";

export default function HomePage() {
    return (
        <div className="">
            <div className="bg-[#101c24] py-4">
                <HomeCarousel />
            </div>

            <section
                className="bg-[#101c24] pb-8 font-sans text-slate-50 sm:pb-12"
                aria-labelledby="founder-heading"
            >
                <div className="mx-auto w-[calc(100%-2rem)] max-w-[1600px]">
                    <div className="card rounded-2xl border border-white/10 bg-slate-800/40 p-6 sm:rounded-3xl sm:p-8 lg:p-10">
                        <div className="grid items-start gap-8 md:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[18rem_minmax(0,1fr)]">
                            <figure className="mx-auto block w-full max-w-64 md:mx-0 xl:max-w-72">
                                <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-slate-800">
                                    <Image
                                        src={Tim}
                                        alt="Timothy P. Devine outside Aviate Enterprises"
                                        fill
                                        sizes="(min-width: 1280px) 288px, 256px"
                                        placeholder="blur"
                                        className="object-cover object-bottom"
                                    />
                                </div>
                                <figcaption className="pt-4 text-center md:text-left">
                                    <p className="text-base font-medium text-slate-50">
                                        Timothy P. Devine
                                    </p>
                                    <p className="mt-1 text-sm text-slate-400">
                                        Founder & President · Aviate RFCM
                                    </p>
                                </figcaption>
                            </figure>

                            <div className="min-w-0 max-w-3xl">
                                <p className="mb-3 flex items-center gap-2.5 text-sm font-semibold tracking-[0.17em] text-blue-300 uppercase">
                                    <span className="h-0.5 w-7 bg-current" aria-hidden="true" />
                                    From our founder
                                </p>
                                <h2
                                    id="founder-heading"
                                    className="max-w-2xl text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl lg:text-4xl"
                                >
                                    A message from Timothy P. Devine
                                </h2>
                                <div className="mt-5 space-y-4 text-base leading-7 text-slate-300 sm:mt-6">
                                    <p className="font-medium text-slate-100">
                                        Are you tired of not being compliant with rules and
                                        regulations set in place?
                                    </p>
                                    <p>
                                        Contact Aviate RFCM and we can help you get your agency back
                                        on track with your Small Business and{" "}
                                        <strong className="font-semibold text-slate-100">
                                            DVBE
                                        </strong>{" "}
                                        (Disabled Veteran Business Enterprise) compliance.
                                    </p>
                                    <p>
                                        Are you tired of reaching out to a company for quotes or
                                        assistance but you get a call attendant system? Call us @{" "}
                                        <a
                                            href="tel:+19169934000"
                                            className="link link-hover rounded-sm font-semibold whitespace-nowrap text-blue-300 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
                                        >
                                            (916) 993-4000
                                        </a>{" "}
                                        and you will always reach a live person, who is happy to
                                        assist you all the time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Text section */}
            <div className="w-full py-4 text-center bg-slate-600">
                <div className="mx-auto max-w-5xl px-5 sm:px-8">
                    <p className="font-normal p-3">
                        I started my contracting career in the U.S.A.F. Since retiring, I decided to
                        take what I learned there and put it to work while helping veterans get
                        jobs. I have a staff with several unique skills to assist you with almost
                        any project you can send our way.
                    </p>

                    <p className="font-normal p-3">
                        When you find that you need a <strong>DVBE</strong> (Disabled Veteran
                        Business Enterprise) think of Aviate RFCM.
                    </p>
                </div>
            </div>

            <AboutComponent />
            <PhilosophyComponent />         
            <AboutContinuedComponent />
            <ShippingComponent />
            <ExpertiseComponent />
            <ContactComponent />
        </div>
    );
}
