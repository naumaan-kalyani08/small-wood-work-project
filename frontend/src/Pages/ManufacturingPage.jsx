import React, { useEffect, useRef, useState } from "react";
import Transition from "../Components/Transition";
import {
    Settings,
    Layers,
    Shield,
    Clock,
    ChevronRight,
    Hammer,
    Package,
    Cpu,
    CheckCircle,
    ArrowRight,
} from "lucide-react";

/* ─────────────────────────────────────────
   Tiny hook: fires when element enters view
───────────────────────────────────────── */
function useInView(threshold = 0.18) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
}

/* ─────────────────────────────────────────
   Animated counter widget
───────────────────────────────────────── */
function Counter({ end, suffix = "", duration = 1800 }) {
    const [count, setCount] = useState(0);
    const [ref, visible] = useInView(0.3);
    useEffect(() => {
        if (!visible) return;
        let start = 0;
        const step = Math.ceil(duration / end);
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(timer);
        }, step);
        return () => clearInterval(timer);
    }, [visible, end, duration]);
    return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const processSteps = [
    {
        icon: Layers,
        title: "Raw Material Selection",
        desc: "We source only premium-grade hardwoods — seasoned, kiln-dried timber with optimal grain density for maximum durability in plastering applications.",
        num: "01",
    },
    {
        icon: Settings,
        title: "Precision Machining",
        desc: "CNC-guided cutting ensures every float is shaped to exact tolerances. Consistent width, length and thickness across every batch — no exceptions.",
        num: "02",
    },
    {
        icon: Hammer,
        title: "Hand Finishing",
        desc: "Skilled craftsmen sand, bevel and inspect each piece by hand. Tool marks are removed, edges are chamfered, and surfaces are smoothed for a professional feel.",
        num: "03",
    },
    {
        icon: Shield,
        title: "Quality Control",
        desc: "Every float passes a rigorous 12-point inspection — checking density, flatness, handle fit, weight balance and surface uniformity before packaging.",
        num: "04",
    },
    {
        icon: Package,
        title: "Packaging & Dispatch",
        desc: "Products are bundled, labelled and wrapped to prevent transit damage. Orders are fulfilled within 2 business days and shipped to masons worldwide.",
        num: "05",
    },
];

const capabilities = [
    { icon: Cpu, label: "CNC Precision Cutting", detail: "±0.2 mm tolerance" },
    { icon: Clock, label: "Fast Turnaround", detail: "48-hr dispatch" },
    { icon: Shield, label: "ISO Quality Standards", detail: "12-point QC check" },
    { icon: Hammer, label: "Hand Craftsmanship", detail: "Skilled artisans" },
];

const materials = [
    { name: "Spruce Pine", grade: "Grade A", usage: "Standard float series" },
    { name: "Teak", grade: "Premium", usage: "Pro mason collection" },
    { name: "Sal Wood", grade: "Grade A+", usage: "Heavy-duty range" },
    { name: "Deodar Cedar", grade: "Premium", usage: "Finishing float line" },
];

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
const ManufacturingPage = () => {
    const [heroRef, heroVisible] = useInView(0.05);
    const [processRef, processVisible] = useInView(0.1);
    const [capRef, capVisible] = useInView(0.1);
    const [matRef, matVisible] = useInView(0.1);

    return (
        <div
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            className="bg-amber-50 text-gray-900 overflow-x-hidden"
        >
            {/* ── HERO ───────────────────────────────── */}
            <section
                ref={heroRef}
                className="relative min-h-screen flex items-center bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden pt-16"
            >
                {/* Decorative background rings */}
                <div
                    className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-amber-200 opacity-40"
                    style={{ transform: "rotate(15deg)" }}
                />
                <div
                    className="absolute -top-16 -right-16 w-[420px] h-[420px] rounded-full border border-amber-300 opacity-30"
                />
                <div
                    className="absolute bottom-0 -left-24 w-[340px] h-[340px] rounded-full bg-gradient-to-tr from-orange-100 to-transparent opacity-60"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left copy */}
                        <div
                            style={{
                                opacity: heroVisible ? 1 : 0,
                                transform: heroVisible ? "translateY(0)" : "translateY(40px)",
                                transition: "opacity 0.8s ease, transform 0.8s ease",
                            }}
                        >
                            <span className="inline-flex items-center gap-2 text-amber-700 text-sm font-semibold tracking-widest uppercase mb-6 border border-amber-300 rounded-full px-4 py-1 bg-white/60">
                                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                                How We Make It
                            </span>
                            <h1
                                className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
                                style={{ fontFamily: "'Georgia', serif" }}
                            >
                                Crafted with
                                <br />
                                <span className="text-amber-700">Purpose.</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
                                From raw timber to finished hand float — every step of our
                                manufacturing process is designed to deliver tools that
                                professional masons trust on-site, every day.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="#process"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document
                                            .getElementById("process")
                                            ?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="inline-flex items-center gap-2 px-8 py-3 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-all transform hover:scale-105 shadow-lg text-base"
                                >
                                    Our Process <ArrowRight size={18} />
                                </a>
                                <a
                                    href="#materials"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document
                                            .getElementById("materials")
                                            ?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="inline-flex items-center gap-2 px-8 py-3 border-2 border-amber-800 text-amber-800 rounded-lg hover:bg-amber-800 hover:text-white transition-all text-base"
                                >
                                    Materials Used
                                </a>
                            </div>
                        </div>

                        {/* Right stats card */}
                        <div
                            style={{
                                opacity: heroVisible ? 1 : 0,
                                transform: heroVisible ? "translateY(0)" : "translateY(60px)",
                                transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
                            }}
                            className="relative"
                        >
                            <div className="bg-gradient-to-br from-amber-200 to-orange-200 rounded-3xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="bg-white rounded-2xl p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-6">
                                        Manufacturing At A Glance
                                    </p>
                                    <div className="grid grid-cols-2 gap-6">
                                        {[
                                            { label: "Units / day", end: 500, suffix: "+" },
                                            { label: "Years Active", end: 25, suffix: "+" },
                                            { label: "QC Checkpoints", end: 12, suffix: "" },
                                            { label: "Export Countries", end: 18, suffix: "+" },
                                        ].map((stat) => (
                                            <div
                                                key={stat.label}
                                                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 text-center border border-amber-100"
                                            >
                                                <div className="text-3xl font-bold text-amber-800 mb-1">
                                                    <Counter end={stat.end} suffix={stat.suffix} />
                                                </div>
                                                <div className="text-xs text-gray-500 font-medium">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* floating badge */}
                            <div className="absolute -bottom-4 -left-4 bg-amber-800 text-white text-xs font-bold rounded-xl px-4 py-2 shadow-lg">
                                ISO Certified
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CAPABILITIES STRIP ─────────────────── */}
            <section
                ref={capRef}
                className="bg-amber-800 py-12"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {capabilities.map((c, i) => (
                            <div
                                key={c.label}
                                style={{
                                    opacity: capVisible ? 1 : 0,
                                    transform: capVisible ? "translateY(0)" : "translateY(20px)",
                                    transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                                }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-xl bg-amber-700 flex items-center justify-center flex-shrink-0">
                                    <c.icon size={22} className="text-amber-200" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">{c.label}</p>
                                    <p className="text-amber-300 text-xs">{c.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PROCESS STEPS ──────────────────────── */}
            <section id="process" className="py-24 bg-white">
                <div
                    ref={processRef}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                    {/* Header */}
                    <div
                        style={{
                            opacity: processVisible ? 1 : 0,
                            transform: processVisible ? "translateY(0)" : "translateY(30px)",
                            transition: "opacity 0.7s ease, transform 0.7s ease",
                        }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block text-amber-700 text-sm font-semibold tracking-widest uppercase mb-3">
                            From Forest to Job Site
                        </span>
                        <h2
                            className="text-4xl md:text-5xl font-bold text-gray-900"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            Our Manufacturing Process
                        </h2>
                        <div className="mx-auto mt-4 w-16 h-1 rounded bg-amber-400" />
                    </div>

                    {/* Steps */}
                    <div className="relative">
                        {/* vertical line (desktop) */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-200 via-amber-400 to-amber-200 -translate-x-1/2" />

                        <div className="space-y-12">
                            {processSteps.map((step, i) => {
                                const isLeft = i % 2 === 0;
                                return (
                                    <div
                                        key={step.num}
                                        style={{
                                            opacity: processVisible ? 1 : 0,
                                            transform: processVisible
                                                ? "translateX(0)"
                                                : `translateX(${isLeft ? "-40px" : "40px"})`,
                                            transition: `opacity 0.7s ease ${0.1 + i * 0.12}s, transform 0.7s ease ${0.1 + i * 0.12}s`,
                                        }}
                                        className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center`}
                                    >
                                        {/* Card always renders; on desktop, alternates side */}
                                        <div className={isLeft ? "lg:pr-16" : "lg:col-start-2 lg:pl-16"}>
                                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 group">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-amber-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                        <step.icon size={22} className="text-amber-100" />
                                                    </div>
                                                    <div>
                                                        <span className="text-amber-400 font-bold text-xs tracking-widest">
                                                            STEP {step.num}
                                                        </span>
                                                        <h3 className="text-xl font-bold text-gray-900 mt-0.5 mb-3">
                                                            {step.title}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm leading-relaxed">
                                                            {step.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Center dot on desktop */}
                                        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-800 border-4 border-white shadow-lg items-center justify-center z-10">
                                            <div className="w-2 h-2 rounded-full bg-amber-200" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MATERIALS TABLE ─────────────────────── */}
            <section
                id="materials"
                className="py-24 bg-gradient-to-br from-amber-50 to-orange-50"
            >
                <div
                    ref={matRef}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                    <div
                        style={{
                            opacity: matVisible ? 1 : 0,
                            transform: matVisible ? "translateY(0)" : "translateY(30px)",
                            transition: "opacity 0.7s ease, transform 0.7s ease",
                        }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                    >
                        {/* Left copy */}
                        <div>
                            <span className="inline-block text-amber-700 text-sm font-semibold tracking-widest uppercase mb-3">
                                Sourced With Integrity
                            </span>
                            <h2
                                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                                style={{ fontFamily: "'Georgia', serif" }}
                            >
                                Premium Timber,
                                <br />
                                Every Time.
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                We believe the quality of a hand float starts with the tree it
                                comes from. That's why we partner with certified timber yards to
                                source only the finest hardwoods — each selected for grain
                                uniformity, moisture content and density.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Sustainably sourced timber",
                                    "Kiln-dried to optimal moisture",
                                    "Grain-checked for uniformity",
                                    "Batch tested before production",
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-gray-700 text-sm">
                                        <CheckCircle size={18} className="text-amber-600 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right table */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-100">
                            <div className="bg-amber-800 px-6 py-4">
                                <h3 className="text-white font-semibold text-sm tracking-wide">
                                    Materials We Use
                                </h3>
                            </div>
                            <div className="divide-y divide-amber-50">
                                {materials.map((m, i) => (
                                    <div
                                        key={m.name}
                                        style={{
                                            opacity: matVisible ? 1 : 0,
                                            transform: matVisible ? "translateX(0)" : "translateX(20px)",
                                            transition: `opacity 0.5s ease ${0.2 + i * 0.1}s, transform 0.5s ease ${0.2 + i * 0.1}s`,
                                        }}
                                        className="px-6 py-4 flex items-center justify-between hover:bg-amber-50 transition-colors group"
                                    >
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">{m.name}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{m.usage}</p>
                                        </div>
                                        <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full group-hover:bg-amber-800 group-hover:text-white transition-colors">
                                            {m.grade}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA BANNER ──────────────────────────── */}
            <section className="py-20 bg-amber-800 relative overflow-hidden">
                {/* decorative rings */}
                <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border border-amber-700 opacity-40" />
                <div className="absolute -left-10 -bottom-10 w-56 h-56 rounded-full border border-amber-600 opacity-30" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        Ready to Order?
                    </h2>
                    <p className="text-amber-200 text-lg mb-10 leading-relaxed">
                        Whether you need a single sample or a bulk trade order, our team is
                        ready to assist. Get in touch for a custom quote today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() =>
                                document
                                    .getElementById("contact")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-amber-800 font-semibold rounded-xl hover:bg-amber-50 transition-all transform hover:scale-105 shadow-xl"
                        >
                            Request a Quote <ChevronRight size={18} />
                        </button>
                        <button
                            onClick={() =>
                                document
                                    .getElementById("products")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-amber-700 transition-all"
                        >
                            Browse Products
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Transition(ManufacturingPage);