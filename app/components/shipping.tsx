import Image from "next/image";
import Shipping from "../../public/shipping.jpg";

export default function ShippingComponent() {
    return (
        <section
            className="bg-[#101c24] pb-8 font-sans text-slate-50 sm:pb-12"
            aria-labelledby="shipping"
        >
            <div className="mx-auto w-[calc(100%-2rem)] max-w-[1600px]">
                <div className="card rounded-2xl border border-white/10 bg-slate-800/40 p-6 sm:rounded-3xl sm:p-8 lg:p-10">
                    <div className="grid items-start gap-8 md:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[18rem_minmax(0,1fr)]">
                        <figure className="mx-auto block w-full max-w-64 md:mx-0 md:self-center xl:max-w-72">
                            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-800">
                                <Image
                                    src={Shipping}
                                    alt="Cardboard boxes packed and stacked for shipping"
                                    fill
                                    sizes="(min-width: 1280px) 288px, 256px"
                                    placeholder="blur"
                                    className="object-cover object-bottom"
                                />
                            </div>
                        </figure>
                        <div className="min-w-0">
                            <p className="mb-3 flex items-center gap-2.5 text-sm font-semibold tracking-[0.17em] text-blue-300 uppercase">
                                <span className="h-0.5 w-7 bg-current" aria-hidden="true" />
                                logistics
                            </p>

                            <h2
                                id="shipping"
                                className="max-w-2xl text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl lg:text-4xl"
                            >
                                Shipping
                            </h2>

                            <div className="mt-5 space-y-4 text-base leading-7 text-slate-300 sm:mt-6">
                                <p className="font-medium text-slate-100">
                                    We can ship to virtually any address in the world, through
                                    diverse connections with perfectly aligned shipping and
                                    logistics companies.
                                </p>

                                <p className="font-medium text-slate-100">
                                    *Note that there are restrictions on some products, and some
                                    products cannot be shipped to international destinations.
                                </p>

                                <p className="font-medium text-slate-100">
                                    When you place an order, we’ll estimate shipping and delivery
                                    dates for you based on the availability of your items and the
                                    shipping options you choose. Depending on the shipping provider
                                    you request, the shipping date will appear on the shipping
                                    quotes page. We have many shipping providers and resources
                                    available to support your individual organizational
                                    requirements.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
