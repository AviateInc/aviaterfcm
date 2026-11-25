"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import aviateLogo from "../../public/Aviate_rfcm.png";

const SPLASH_DURATION_MS = 5000;

export default function SplashScreen({ children }: { children: ReactNode }) {
    const [visible, setVisible] = useState(true);
    const content = useRef<HTMLDivElement>(null);
    const skipButton = useRef<HTMLButtonElement>(null);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (!visible) {
            return;
        }

        const page = content.current;
        const previousOverflow = document.body.style.overflow;
        const previousFocus = document.activeElement;

        document.body.style.overflow = "hidden";

        if (page) {
            page.inert = true;
        }

        skipButton.current?.focus({ preventScroll: true });
        const timer = window.setTimeout(() => setVisible(false), SPLASH_DURATION_MS);

        return () => {
            window.clearTimeout(timer);
            document.body.style.overflow = previousOverflow;

            if (page) {
                page.inert = false;
            }

            if (previousFocus instanceof HTMLElement && previousFocus !== document.body) {
                previousFocus.focus({ preventScroll: true });
            } else {
                page?.focus({ preventScroll: true });
            }
        };
    }, [visible]);

    return (
        <>
            <div
                ref={content}
                tabIndex={-1}
                className="flex min-h-full flex-1 flex-col outline-none"
            >
                {children}
            </div>

            {visible && (
                <motion.div
                    data-site-splash
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="splash-title"
                    aria-describedby="splash-description"
                    className="fixed inset-0 z-100 flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#101c24] px-6 font-sans text-slate-50"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 1, 0] }}
                    transition={{ duration: 5, times: [0, 0.92, 1], ease: "easeInOut" }}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") {
                            setVisible(false);
                        }
                        if (event.key === "Tab") {
                            event.preventDefault();
                            skipButton.current?.focus();
                        }
                    }}
                >

                    <div
                        className="pointer-events-none absolute inset-0 bg-radial from-blue-900/25 via-transparent to-transparent"
                        aria-hidden="true"
                    />

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <Image
                            src={aviateLogo}
                            alt=""
                            aria-hidden="true"
                            className="mb-5 h-14 w-auto object-contain sm:h-16"
                            sizes="96px"
                            preload
                        />

                        <p className="mb-3 text-sm font-medium tracking-[0.3em] text-blue-300 uppercase">
                            Aviate RFCM
                        </p>

                        <h1
                            id="splash-title"
                            className="text-3xl font-medium tracking-tight sm:text-5xl"
                        >
                            Ready for takeoff.
                        </h1>

                        <p
                            id="splash-description"
                            className="mt-4 max-w-sm text-base leading-relaxed text-slate-300"
                        >
                            Roofing, flooring &amp; construction materials.
                            <span className="sr-only">
                                {" "}
                                The home page will appear automatically after five seconds.
                            </span>
                        </p>
                    </div>

                    <div
                        className="relative mt-10 h-36 w-full max-w-3xl sm:mt-14 sm:h-44"
                        aria-hidden="true"
                    >
                        <div className="absolute right-0 bottom-5 left-0 h-px bg-linear-to-r from-transparent via-slate-500 to-transparent" />
                        
                        <div className="absolute right-0 bottom-2 left-0 flex justify-around px-4">
                            {Array.from({ length: 12 }, (_, index) => (
                                <span
                                    key={index}
                                    className="h-0.5 w-4 rounded-full bg-blue-300/50 sm:w-7"
                                />
                            ))}
                        </div>
                        
                        <motion.div
                            className="absolute bottom-6 left-[10%] w-40 origin-center sm:w-52"
                            initial={{ x: "-15vw", y: 0, rotate: 0, opacity: 0 }}
                            animate={
                                reducedMotion
                                    ? { x: "18vw", y: -16, rotate: 0, opacity: 1 }
                                    : {
                                          x: ["-15vw", "-5vw", "10vw", "35vw", "85vw"],
                                          y: [0, 0, -12, -90, -240],
                                          rotate: [0, 0, -8, -18, -24],
                                          opacity: [0, 1, 1, 1, 0],
                                      }
                            }
                            transition={
                                reducedMotion
                                    ? { duration: 0 }
                                    : {
                                          duration: 4.6,
                                          times: [0, 0.2, 0.45, 0.75, 1],
                                          ease: "easeIn",
                                      }
                            }
                        >
                            <svg
                                viewBox="0 0 240 100"
                                fill="none"
                                className="h-auto w-full drop-shadow-[0_8px_18px_rgba(96,165,250,0.3)]"
                            >
                                <path
                                    d="m16 62-9-37h16l28 34 111-2c15 0 33 3 44 10l20 12c5 3 4 8-3 9L43 88 9 75 4 64Z"
                                    fill="#f1f5f9"
                                />
                                <path
                                    d="m86 71-29-57h19l62 58m-22 8-35 18H63l22-18"
                                    fill="#60a5fa"
                                />
                                <path d="m18 58-5-27h8l22 27Z" fill="#2563eb" />
                                <path d="m186 65 15 3 10 7h-22Z" fill="#101c24" />
                                <path
                                    d="M57 68h5m9 0h5m9 0h5m9 0h5m9 0h5m9 0h5m9 0h5m9 0h5m9 0h5"
                                    stroke="#334155"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                                <path d="M43 83h163" stroke="#2563eb" strokeWidth="2" />
                            </svg>
                        </motion.div>
                    </div>

                    <div className="relative mt-8 w-full max-w-xs">
                        <div
                            className="h-0.5 overflow-hidden rounded-full bg-white/10"
                            aria-hidden="true"
                        >
                            <motion.div
                                className="h-full origin-left bg-blue-300"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 5, ease: "linear" }}
                            />
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-4 text-sm text-slate-400">
                            <span>Welcome aboard</span>
                            <button
                                ref={skipButton}
                                type="button"
                                onClick={() => setVisible(false)}
                                className="btn btn-ghost btn-sm min-h-10 rounded-full px-4 font-normal text-slate-200 hover:bg-white/10 focus-visible:outline-blue-300"
                            >
                                Skip intro
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
            
            <noscript>
                <style>{"[data-site-splash] { display: none !important; }"}</style>
            </noscript>
        </>
    );
}
