"use client";

import Image from "next/image";
import aviateLogo from "../../public/Aviate_rfcm.png";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import concrete from "../../public/concrete-floors.jpg";
import construction from "../../public/construction-site.jpg";
import roofingWork from "../../public/roofing-work.jpg";
import roofing from "../../public/roofing.jpg";

const slides = [
    {
        image: concrete,
        alt: "Concrete flooring",
        category: "Flooring",
        title: "A solid foundation.",
        position: "center",
    },
    {
        image: construction,
        alt: "Construction site, left-hand view",
        category: "Construction",
        title: "Where plans take shape.",
        position: "25% center",
    },
    {
        image: construction,
        alt: "Construction site, central view",
        category: "Construction",
        title: "See the bigger picture.",
        position: "center",
    },
    {
        image: construction,
        alt: "Construction site, right-hand view",
        category: "Materials",
        title: "The details make the difference.",
        position: "75% center",
    },
    {
        image: roofingWork,
        alt: "Roofing work in progress",
        category: "Roofing",
        title: "From the ground to the roof.",
        position: "center",
    },
    {
        image: roofing,
        alt: "Roofing materials and roof surface",
        category: "Roofing",
        title: "Every layer matters.",
        position: "center",
    },
];

export default function HomeCarousel() {
    const [active, setActive] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [keyboardFocus, setKeyboardFocus] = useState(false);
    const [paused, setPaused] = useState(false);
    const [touching, setTouching] = useState(false);
    const swipeStart = useRef<{ x: number; y: number } | null>(null);
    const autoplayPaused = hovered || keyboardFocus || paused || touching;

    useEffect(() => {
        if (autoplayPaused) {
            return;
        }
        
        const timer = window.setInterval(() => {
            if (!document.hidden) {
                setActive((current) => (current + 1) % slides.length);
            }
        }, 5000);

        return () => window.clearInterval(timer);
    }, [autoplayPaused]);

    function advance(direction: number) {
        setActive((current) => (current + direction + slides.length) % slides.length);
    }

    function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
        switch (event.key) {
            case "ArrowLeft":
                event.preventDefault();
                advance(-1);
                break;
            case "ArrowRight":
                event.preventDefault();
                advance(1);
                break;
            case "Home":
                event.preventDefault();
                setActive(0);
                break;
            case "End":
                event.preventDefault();
                setActive(slides.length - 1);
                break;
        }
    }

    const controlClass =
        "btn btn-circle btn-outline size-11 min-h-11 border-white/25 bg-transparent text-white shadow-none hover:border-blue-300 hover:bg-blue-300 hover:text-slate-950 focus-visible:outline-blue-300";

    return (
        <section
            className="mx-auto w-[calc(100%-2rem)] max-w-[1600px] pt-4 pb-4 font-sans text-slate-50 sm:pt-6"
            aria-label="Roofing, flooring and construction materials"
            aria-roledescription="carousel"
            onPointerEnter={(event) => {
                if (event.pointerType === "mouse") {
                    setHovered(true);
                }
            }}
            onPointerLeave={() => setHovered(false)}
            onPointerDownCapture={() => setKeyboardFocus(false)}
            onFocusCapture={(event) => {
                if (event.target.matches(":focus-visible")) {
                    setKeyboardFocus(true);
                }
            }}
            onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setKeyboardFocus(false);
                }
            }}
        >
            <div className="flex items-center justify-between gap-3 px-1 pb-4 sm:gap-6 sm:pb-6">
                <div
                    className="flex items-center gap-2 text-base font-bold tracking-widest sm:gap-3 sm:text-xl"
                    aria-label="Aviate RFCM"
                >
                    <Image
                        src={aviateLogo}
                        alt=""
                        aria-hidden="true"
                        className="h-14 w-auto shrink-0 object-contain sm:h-10"
                        sizes="(min-width: 640px) 60px, 48px"
                    />
                    <span>
                        AVIATE{" "}
                        <span className="block text-xs font-normal tracking-widest text-slate-400 sm:ml-1 sm:inline sm:text-sm">
                            RFCM
                        </span>
                    </span>
                </div>
                <p className="max-w-40 text-right text-xs leading-relaxed text-slate-300 sm:max-w-80 sm:text-sm">
                    Roofing. Flooring. Construction materials.
                </p>
                <span className="text-right text-xs leading-relaxed text-slate-300 sm:max-w-80 sm:text-sm">
                    <strong>(916) 993-4000</strong> | <strong>sales@aviaterfcm.com</strong>
                </span>
            </div>

            <div
                id="home-carousel-gallery"
                className="card relative isolate h-[clamp(14rem,22vw,20rem)] touch-pan-y overflow-hidden rounded-2xl bg-slate-800 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-blue-300 max-sm:h-[clamp(13.5rem,32.5svh,17.5rem)] sm:rounded-3xl"
                tabIndex={0}
                aria-label="Image gallery. Use the left and right arrow keys to browse."
                onKeyDown={handleKeys}
                onPointerDown={(event) => {
                    if (event.pointerType !== "mouse" && event.isPrimary) {
                        swipeStart.current = { x: event.clientX, y: event.clientY };
                        setTouching(true);
                        event.currentTarget.setPointerCapture(event.pointerId);
                    }
                }}

                onPointerUp={(event) => {
                    const start = swipeStart.current;
                    swipeStart.current = null;
                    setTouching(false);
                    if (start) {
                        const dx = event.clientX - start.x;
                        const dy = event.clientY - start.y;
                        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
                            advance(dx < 0 ? 1 : -1);
                        }
                    }
                }}

                onPointerCancel={() => {
                    swipeStart.current = null;
                    setTouching(false);
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${index === active ? "z-10 opacity-100" : "pointer-events-none opacity-0"}`}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${slides.length}: ${slide.category}`}
                        aria-hidden={index !== active}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.alt}
                            fill
                            sizes="(max-width: 1432px) calc(100vw - 32px), 1400px"
                            preload={index === 0}
                            loading={index === 0 ? undefined : "eager"}
                            placeholder="blur"
                            className="object-cover"
                            style={{ objectPosition: slide.position }}
                        />

                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/35 to-slate-950/5" />
                        <div className="absolute right-6 bottom-[clamp(1.25rem,2.5vw,2.25rem)] left-[clamp(1.5rem,5vw,4.5rem)] max-w-3xl">
                            <p className="mb-2 flex items-center gap-2.5 text-sm font-semibold tracking-[0.17em] text-blue-400 uppercase">
                                <span className="h-0.5 w-7 bg-current" aria-hidden="true" />
                                {slide.category}
                            </p>

                            {index === 0 ? (
                                <h1 className="max-w-[24ch] text-[clamp(1.75rem,3vw,3rem)] leading-[1.05] font-medium tracking-[-0.055em] text-balance max-sm:text-[clamp(1.5rem,6vw,2rem)]">
                                    {slide.title}
                                </h1>
                            ) : (
                                <h2 className="max-w-[24ch] text-[clamp(1.75rem,3vw,3rem)] leading-[1.05] font-medium tracking-[-0.055em] text-balance max-sm:text-[clamp(1.5rem,6vw,2rem)]">
                                    {slide.title}
                                </h2>
                            )}

                            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-200 sm:mt-3 sm:text-base">
                                Aviate Roofing, Flooring &amp; Construction Materials
                            </p>
                        </div>
                    </div>
                ))}

                <span
                    className="badge badge-outline pointer-events-none absolute top-6 right-6 z-20 hidden h-auto rounded-full border-white/30 bg-slate-950/25 px-3.5 py-2 text-xs tracking-wider text-white backdrop-blur-md sm:inline-flex"
                    aria-hidden="true"
                >
                    Aviate RFCM
                </span>
            </div>

            <div className="grid min-h-20 grid-cols-[1fr_auto] items-center gap-1 px-1 pt-3 sm:flex sm:justify-between sm:gap-4 sm:py-2">
                <p
                    className="flex items-center gap-2.5 text-sm text-slate-400 tabular-nums sm:min-w-48"
                    aria-live={autoplayPaused ? "polite" : "off"}
                    aria-atomic="true"
                >
                    <span className="text-white">{String(active + 1).padStart(2, "0")}</span>
                    <span className="text-slate-600">/</span>
                    {String(slides.length).padStart(2, "0")}

                    <span className="ml-2 hidden border-l border-white/20 pl-4 sm:inline">
                        {slides[active].category}
                    </span>
                </p>
                <div
                    className="col-span-2 row-start-2 flex items-center justify-center sm:order-none"
                    aria-label="Choose a slide"
                >
                    {slides.map((slide, index) => (
                        <button
                            key={index}
                            type="button"
                            className="btn btn-ghost size-11 min-h-11 border-0 p-0 shadow-none hover:bg-white/10 focus-visible:outline-blue-300"
                            aria-label={`Go to slide ${index + 1}: ${slide.category}`}
                            aria-current={active === index ? "true" : undefined}
                            aria-controls="home-carousel-gallery"
                            onClick={() => setActive(index)}
                        >
                            <span
                                className={`h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${active === index ? "w-7 bg-blue-300" : "w-1.5 bg-slate-500"}`}
                            />
                        </button>
                    ))}
                </div>
                <div className="flex justify-end gap-2 sm:min-w-48">
                    <button
                        type="button"
                        className={controlClass}
                        aria-label={
                            paused ? "Start automatic slideshow" : "Pause automatic slideshow"
                        }
                        aria-controls="home-carousel-gallery"
                        onClick={() => setPaused((value) => !value)}
                    >
                        <svg
                            className="size-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-hidden="true"
                        >
                            {paused ? <path d="m9 5 10 7-10 7Z" /> : <path d="M9 5v14M15 5v14" />}
                        </svg>
                    </button>
                    <button
                        type="button"
                        className={controlClass}
                        aria-label="Previous slide"
                        aria-controls="home-carousel-gallery"
                        onClick={() => advance(-1)}
                    >
                        <svg
                            className="size-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-hidden="true"
                        >
                            <path d="m14 6-6 6 6 6" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className={controlClass}
                        aria-label="Next slide"
                        aria-controls="home-carousel-gallery"
                        onClick={() => advance(1)}
                    >
                        <svg
                            className="size-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-hidden="true"
                        >
                            <path d="m10 6 6 6-6 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
