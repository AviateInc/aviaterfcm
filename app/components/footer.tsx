// Static hosts refresh the copyright year whenever the site is rebuilt.
const year = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="footer footer-center mt-auto bg-black px-4 py-6 text-center font-sans text-[#d4af37] sm:py-8">
            <p className="max-w-3xl text-sm leading-relaxed text-balance">
                <strong>
                    Copyright &copy; {year} Aviate Roofing, Flooring &amp; Construction Materials.
                    All rights reserved.
                </strong>
            </p>
        </footer>
    );
}
