import { cacheLife } from "next/cache";

export default async function Footer() {
    "use cache";
    cacheLife("days");

    const year = new Date().getFullYear();

    return (
        <footer className="footer footer-center mt-auto bg-black px-4 py-6 text-center font-sans text-[#d4af37] sm:py-8">
            <p className="max-w-3xl text-sm leading-relaxed text-balance">
                <strong>
                    Copyright &copy; {year} Aviate Roofing, Flooring &amp; Construction Materials. All
                    rights reserved.
                </strong>
            </p>
        </footer>
    );
}
