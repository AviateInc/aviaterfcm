import Image from "next/image";
import Office from "../../public/Office.jpg";
import { Phone, Mail, Building } from 'lucide-react';

export default function AboutComponent() {
    return (
        <section className="bg-[#101c24] pb-8 pt-8 font-sans text-slate-50 sm:pb-12 ">
            <div className="mx-auto w-[calc(100%-2rem)] max-w-[1600px]">
                <div className="card rounded-2xl border border-white/10 bg-slate-800/40 p-6 sm:rounded-3xl sm:p-8 lg:p-10">
                    <div className="grid items-start gap-8 md:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[18rem_minmax(0,1fr)]">

                        <figure className="mx-auto block w-full max-w-64 md:mx-0 xl:max-w-72">
                            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-slate-800">
                                <Image
                                    src={Office}
                                    alt="Timothy P. Devine outside Aviate Enterprises"
                                    fill
                                    sizes="(min-width: 1280px) 288px, 256px"
                                    placeholder="blur"
                                    className="object-cover object-bottom"
                                />
                            </div>

                            <figcaption className="pt-4 text-center md:text-left">
                                <div className="flex flex-row">
                                    <Phone className="pr-2" />
                                    <p className="text-base font-medium text-slate-50">
                                        (916) 993-4000
                                    </p>
                                </div>

                                <div className="flex flex-row">
                                    <Mail className="pr-2" />
                                    <p className="text-base font-medium text-slate-50">
                                        sales@aviaterfcm.com
                                    </p>
                                </div>

                                <div className="flex flex-row">
                                    <Building className="pr-2 "/>
                                    <p className="mt-1 text-sm text-slate-400">
                                        1418 N. Market Blvd, Sacramento, <br />CA, 95834
                                    </p>
                                </div>
                            </figcaption>
                        </figure>

                        <div className="min-w-0 max-w-3xl">
                            <p className="mb-3 flex items-center gap-2.5 text-sm font-semibold tracking-[0.17em] text-blue-300 uppercase">
                                <span className="h-0.5 w-7 bg-current" aria-hidden="true" />
                                About Us
                            </p>

                            <h2
                                id="founder-heading"
                                className="max-w-2xl text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl lg:text-4xl"
                            >
                                The Company
                            </h2>
                            
                            <div className="mt-5 space-y-4 text-base leading-7 text-slate-300 sm:mt-6">
                                <p className="font-medium text-slate-100">
                                    We at Aviate Enterprises Roofing, Flooring & Construction Materials always have you, the customer, in mind.  We opened in November 5, 2018, with the goal of offering the highest quality products at competitive prices.  Although our catalog of products continues to expand rapidly, it always comes second to our customers and ensuring they receive the most informed, point-to-point service in the industry.
                                </p>

                                <p className="font-medium text-slate-100">
                                    Our superb team of personal account managers offers product knowledge, quick responses, and innovative agreements directly to buyers from prospect to delivery.  We are trained to field any and all questions—and no order is too large to find a solution!
                                </p>
                            </div>
                        </div>
                    
                    </div>

                </div>
            </div>
        </section>
    );
}
