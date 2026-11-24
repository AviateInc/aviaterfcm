export default function PhilosophyComponent() {
    return (
        <section
            className="bg-[#101c24] pb-8 font-sans text-slate-50 sm:pb-12"
            aria-labelledby="philosophy"
        >
            <div className="mx-auto w-[calc(100%-2rem)] max-w-[1600px]">
                <div className="card rounded-2xl border border-white/10 bg-slate-800/40 p-6 sm:rounded-3xl sm:p-8 lg:p-10 flex flex-col items-center justify-center">
                    <p className="mb-3 flex items-center gap-2.5 text-sm font-semibold tracking-[0.17em] text-blue-300 uppercase">
                        <span className="h-0.5 w-7 bg-current" aria-hidden="true" />
                        philosophies
                    </p>

                    <h2 className="max-w-2xl text-2xl leading-tight text-center font-medium tracking-tight text-balance sm:text-3xl lg:text-4xl">
                        We will always be firmly rooted in these three philosophies
                    </h2>

                    <div className="mt-5 space-y-4 text-base leading-7 text-slate-300 sm:mt-6">
                        <h2 className="max-w-2xl text-2xl italic leading-tight text-center font-medium tracking-tight text-balance sm:text-3xl lg:text-4xl">
                            {'"'}Customers First{'"'}
                        </h2>
                        
                        <h2 className="max-w-2xl text-2xl italic leading-tight text-center font-medium tracking-tight text-balance sm:text-3xl lg:text-4xl">
                            {'"'}Always Provide Value{'"'}
                        </h2>
                        
                        <h2 className="max-w-2xl text-2xl italic leading-tight text-center font-medium tracking-tight text-balance sm:text-3xl lg:text-4xl">
                            {'"'}Always Serving with a Smile{'"'}
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
