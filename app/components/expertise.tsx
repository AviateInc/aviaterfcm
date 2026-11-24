import Image from "next/image";
import Expertise from "../../public/expertise.jpg";

export default function ExpertiseComponent() {
    return (
        <section
            className="bg-[#101c24] pb-8 font-sans text-slate-50 sm:pb-12"
            aria-labelledby="shipping"
        >
            <div className="mx-auto w-[calc(100%-2rem)] max-w-[1600px]">
                <div className="card rounded-2xl border border-white/10 bg-slate-800/40 p-6 sm:rounded-3xl sm:p-8 lg:p-10">
                    <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_18rem]">

                        <div className="mt-5 space-y-4 text-base leading-7 text-slate-300 sm:mt-6">
                            <p className="mb-3 flex items-center gap-2.5 text-sm font-semibold tracking-[0.17em] text-blue-300 uppercase">
                                <span className="h-0.5 w-7 bg-current" aria-hidden="true" />
                                expertise
                            </p>

                            <h2 className="max-w-2xl text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl lg:text-4xl">
                                Corporate Expertise
                            </h2>

                            <p className="font-medium text-slate-100">
                                Since its founding in 2018, Aviate Enterprises Roofing, Flooring & Construction Materials. has been guided by core values of integrity, personal excellence, and service.
                            </p>
                            
                            <p className="font-medium text-slate-100">
                                Lt. Col Timothy P. Devine USAF retired founded Aviate Enterprises Roofing, Flooring & Construction Materials in 2018 after a long and successful career in the Air Force. With his vast experience in aviation, bioenvironmental engineering, occupational safety and health, the intelligence community, the nuclear industry and servicing government contracts led him to found Aviate Enterprises, Inc. with the goal of helping procurement specialists.
                            </p>
                            
                            <p className="font-medium text-slate-100">
                                Aviate Enterprises Roofing. Flooring & Construction Materials is focused on supporting City, State, and Federal purchasing professionals to meet or exceed mandated goals for business with Service-Disabled Veteran-Owned Small Business (<strong>SDVOSB</strong>), Small Business (<strong>SB</strong>) and Disabled Veterans Business Enterprise (<strong>DVBE</strong>) and <strong>HUBZone</strong> (Historical Underutilized Business Zones) while providing quality products, services, and proven solutions on a best-value basis.
                            </p>
                            
                            <p className="font-medium text-slate-100">
                                Aviate Enterprises Roofing. Flooring & Construction Materials helps Federal, State, and Local purchasing professionals nationwide. Aviate Enterprises Roofing. Flooring & Construction Materials is a value-added reseller for Sika Sarnafil and Garrett-Callahan.
                            </p>
                            
                            <p className="font-medium text-slate-100">
                                Experienced in Government Procurement.
                            </p>
                            
                            <p className="font-medium text-slate-100">
                                With more than 25 years of experience, we understand the government{'’'}s unique procurement processes and work with procurement and end-users to deliver the best equipment supplies and material resources and services. We look forward to the opportunity to demonstrate our customer-centered approach to supporting all of your organizational needs.
                            </p>
                        </div>

                        <figure className="block w-full max-w-64 justify-self-end md:self-center xl:max-w-72">
                            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-800">
                                <Image
                                    src={Expertise}
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
 