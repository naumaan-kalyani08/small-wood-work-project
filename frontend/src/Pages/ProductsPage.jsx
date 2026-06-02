import React, { useState, useEffect, useRef } from "react";
import Transition from "../Components/Transition";
import {
    Search,
    X,
    Star,
    Package,
    ChevronRight,
    ArrowRight,
    CheckCircle,
    Ruler,
    Weight,
    Layers,
    ShoppingCart,
    Eye,
    Filter,
} from "lucide-react";

/* ─────────────────────────────────────────
   InView hook for scroll animations
───────────────────────────────────────── */
function useInView(threshold = 0.15) {
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
   Product Data
───────────────────────────────────────── */
const CATEGORIES = ["All", "Standard", "Professional", "Heavy-Duty", "Finishing"];

const PRODUCTS = [
    {
        id: 1,
        name: "Classic Plasterer's Float",
        category: "Standard",
        price: "₹180",
        priceNote: "per unit",
        rating: 4.8,
        reviews: 214,
        badge: "Best Seller",
        badgeColor: "bg-amber-800",
        wood: "Spruce Pine",
        dimensions: '280 × 120 mm',
        weight: "320 g",
        finish: "Sanded Smooth",
        description:
            "Our original hand float — the workhorse of any plasterer's kit. Lightweight, well-balanced and shaped from Grade-A Spruce Pine for a consistent drag every time.",
        features: [
            "Ergonomic bevel-edged handle",
            "Flat-grain face for even spread",
            "Pre-drilled handle mount",
            "Suitable for all mortar mixes",
        ],
        moq: 50,
        gradient: "from-amber-100 to-orange-100",
        iconBg: "bg-amber-700",
    },
    {
        id: 2,
        name: "Pro Mason's Float",
        category: "Professional",
        price: "₹290",
        priceNote: "per unit",
        rating: 4.9,
        reviews: 178,
        badge: "Top Rated",
        badgeColor: "bg-orange-700",
        wood: "Teak",
        dimensions: '300 × 130 mm',
        weight: "410 g",
        finish: "Hand-Planed",
        description:
            "Crafted from premium teak with a hand-planed face, this float delivers superior control for experienced masons working fine render and skimcoat finishes.",
        features: [
            "Dense teak for longevity",
            "Hand-planed to ±0.3 mm flatness",
            "Reinforced steel handle bracket",
            "Oil-treated for moisture resistance",
        ],
        moq: 25,
        gradient: "from-orange-100 to-amber-100",
        iconBg: "bg-orange-700",
    },
    {
        id: 3,
        name: "Heavy Duty Site Float",
        category: "Heavy-Duty",
        price: "₹340",
        priceNote: "per unit",
        rating: 4.7,
        reviews: 132,
        badge: "Industrial",
        badgeColor: "bg-stone-700",
        wood: "Sal Wood",
        dimensions: '320 × 140 mm',
        weight: "520 g",
        finish: "Rough-Cut Face",
        description:
            "Built for rough plaster work and site conditions. Sal Wood's natural hardness resists denting and chipping even in high-use commercial environments.",
        features: [
            "Extra-dense Sal Wood body",
            "Thicker cross-section for rigidity",
            "Double-bolt handle attachment",
            "Coarse face for scratch coats",
        ],
        moq: 30,
        gradient: "from-stone-100 to-amber-100",
        iconBg: "bg-stone-600",
    },
    {
        id: 4,
        name: "Deodar Finishing Float",
        category: "Finishing",
        price: "₹420",
        priceNote: "per unit",
        rating: 5.0,
        reviews: 89,
        badge: "Premium",
        badgeColor: "bg-amber-900",
        wood: "Deodar Cedar",
        dimensions: '260 × 110 mm',
        weight: "280 g",
        finish: "Mirror-Sanded",
        description:
            "The finest float in our range. Mirror-sanded Deodar Cedar delivers an ultra-smooth glide for setting coats and top-finish plasterwork on premium projects.",
        features: [
            "Mirror-sanded face (320-grit finish)",
            "Lightweight cedar body",
            "Precision-cut for minimal drag lines",
            "Perfect for gypsum and lime finishes",
        ],
        moq: 20,
        gradient: "from-amber-50 to-yellow-100",
        iconBg: "bg-amber-900",
    },
    {
        id: 5,
        name: "Economy Trade Pack Float",
        category: "Standard",
        price: "₹130",
        priceNote: "per unit",
        rating: 4.5,
        reviews: 301,
        badge: "Value",
        badgeColor: "bg-green-700",
        wood: "Spruce Pine",
        dimensions: '270 × 115 mm',
        weight: "300 g",
        finish: "Machine Sanded",
        description:
            "Maximum value for large-scale trading and distribution. Consistent quality at scale — ideal for tool suppliers and hardware distributors.",
        features: [
            "Machine-sanded for consistency",
            "Bulk packaging available",
            "Custom branding / OEM option",
            "Fast dispatch for trade orders",
        ],
        moq: 100,
        gradient: "from-green-50 to-amber-50",
        iconBg: "bg-green-700",
    },
    {
        id: 6,
        name: "Corner & Edge Float",
        category: "Finishing",
        price: "₹380",
        priceNote: "per unit",
        rating: 4.8,
        reviews: 67,
        badge: "Specialist",
        badgeColor: "bg-rose-700",
        wood: "Teak",
        dimensions: '200 × 80 mm',
        weight: "210 g",
        finish: "Bevelled Edge",
        description:
            "Designed specifically for internal angles, reveals and edge detailing. The narrow bevelled face reaches where standard floats cannot.",
        features: [
            "Narrow profile for corners",
            "Precision bevelled edges both sides",
            "Compact grip for one-handed use",
            "Teak body for long service life",
        ],
        moq: 20,
        gradient: "from-rose-50 to-amber-50",
        iconBg: "bg-rose-700",
    },
];

/* ─────────────────────────────────────────
   Star Rating
───────────────────────────────────────── */
function Stars({ rating }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    size={12}
                    className={
                        s <= Math.round(rating)
                            ? "text-amber-500 fill-amber-500"
                            : "text-gray-300 fill-gray-300"
                    }
                />
            ))}
        </div>
    );
}

/* ─────────────────────────────────────────
   Product Card
───────────────────────────────────────── */
function ProductCard({ product, index, onView, visible }) {
    return (
        <div
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
            }}
            className="bg-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col"
        >
            {/* Visual panel */}
            <div className={`relative bg-gradient-to-br ${product.gradient} p-8 flex items-center justify-center min-h-[180px]`}>
                {/* Badge */}
                <span
                    className={`absolute top-4 left-4 ${product.badgeColor} text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full`}
                >
                    {product.badge}
                </span>

                {/* Decorative wood illustration */}
                <div className="relative">
                    <div
                        className={`w-28 h-10 ${product.iconBg} rounded-md shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-500`}
                    />
                    <div
                        className={`absolute top-2 left-2 w-28 h-10 ${product.iconBg} opacity-50 rounded-md transform rotate-3 group-hover:rotate-6 transition-transform duration-500`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Package size={24} className="text-white drop-shadow" />
                    </div>
                </div>

                {/* Quick view overlay */}
                <button
                    onClick={() => onView(product)}
                    className="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/10 transition-colors duration-300 flex items-center justify-center"
                >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-amber-800 text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                        <Eye size={14} /> Quick View
                    </span>
                </button>
            </div>

            {/* Info */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-semibold text-amber-600 tracking-widest uppercase">
                        {product.category}
                    </span>
                    <span className="text-xs text-gray-400">{product.wood}</span>
                </div>
                <h3
                    className="text-lg font-bold text-gray-900 mb-2 leading-snug"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    {product.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                    {product.description.slice(0, 90)}…
                </p>

                {/* Specs row */}
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-5 border-t border-amber-50 pt-4">
                    <span className="flex items-center gap-1">
                        <Ruler size={12} className="text-amber-400" /> {product.dimensions}
                    </span>
                    <span className="flex items-center gap-1">
                        <Weight size={12} className="text-amber-400" /> {product.weight}
                    </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-5">
                    <Stars rating={product.rating} />
                    <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-2xl font-bold text-amber-800">{product.price}</span>
                        <span className="text-xs text-gray-400 ml-1">{product.priceNote}</span>
                        <p className="text-xs text-gray-400">MOQ: {product.moq} units</p>
                    </div>
                    <button
                        onClick={() => onView(product)}
                        className="flex items-center gap-2 bg-amber-800 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-amber-900 transition-all transform hover:scale-105 shadow"
                    >
                        Details <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────
   Detail Modal
───────────────────────────────────────── */
function ProductModal({ product, onClose }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    if (!product) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: "modalIn 0.3s ease" }}
            >
                <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.94)}to{opacity:1;transform:scale(1)}}`}</style>

                {/* Header */}
                <div className={`relative bg-gradient-to-br ${product.gradient} p-10 flex items-center justify-center min-h-[200px]`}>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
                    >
                        <X size={16} className="text-gray-600" />
                    </button>
                    <span className={`absolute top-4 left-4 ${product.badgeColor} text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full`}>
                        {product.badge}
                    </span>
                    <div className="relative">
                        <div className={`w-36 h-14 ${product.iconBg} rounded-lg shadow-xl transform -rotate-3`} />
                        <div className={`absolute top-2 left-2 w-36 h-14 ${product.iconBg} opacity-40 rounded-lg transform rotate-2`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Package size={32} className="text-white drop-shadow" />
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-8">
                    <div className="flex items-start justify-between mb-1">
                        <span className="text-xs font-semibold text-amber-600 tracking-widest uppercase">{product.category}</span>
                        <Stars rating={product.rating} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Georgia', serif" }}>
                        {product.name}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

                    {/* Specs grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        {[
                            { icon: Layers, label: "Wood", val: product.wood },
                            { icon: Ruler, label: "Size", val: product.dimensions },
                            { icon: Weight, label: "Weight", val: product.weight },
                            { icon: Package, label: "Finish", val: product.finish },
                        ].map((spec) => (
                            <div key={spec.label} className="bg-amber-50 rounded-xl p-3 text-center border border-amber-100">
                                <spec.icon size={18} className="text-amber-600 mx-auto mb-1" />
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{spec.label}</p>
                                <p className="text-sm font-bold text-gray-800">{spec.val}</p>
                            </div>
                        ))}
                    </div>

                    {/* Features */}
                    <h4 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-3">Key Features</h4>
                    <ul className="space-y-2 mb-8">
                        {product.features.map((f) => (
                            <li key={f} className="flex items-center gap-3 text-gray-600 text-sm">
                                <CheckCircle size={16} className="text-amber-600 flex-shrink-0" />
                                {f}
                            </li>
                        ))}
                    </ul>

                    {/* Price + CTA */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100">
                        <div>
                            <span className="text-3xl font-bold text-amber-800">{product.price}</span>
                            <span className="text-sm text-gray-400 ml-1">{product.priceNote}</span>
                            <p className="text-xs text-gray-500 mt-1">Minimum order: {product.moq} units</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 border-2 border-amber-800 text-amber-800 rounded-xl text-sm font-semibold hover:bg-amber-50 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    onClose();
                                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="flex items-center gap-2 px-5 py-2.5 bg-amber-800 text-white rounded-xl text-sm font-semibold hover:bg-amber-900 transition-all transform hover:scale-105 shadow-lg"
                            >
                                <ShoppingCart size={16} /> Get Quote
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
const ProductsPage = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [gridRef, gridVisible] = useInView(0.05);
    const [heroRef, heroVisible] = useInView(0.05);

    const filtered = PRODUCTS.filter((p) => {
        const matchCat = activeCategory === "All" || p.category === activeCategory;
        const matchSearch =
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.wood.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <div
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            className="relative overflow-x-hidden bg-gradient-to-b from-white via-amber-50/40 to-white min-h-screen"
        >
            {/* ── HERO ─────────────────────────────── */}
            <section className="relative overflow-hidden py-24">
                {/* Decorative rings */}
                <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-amber-200 opacity-40" />
                <div className="absolute top-10 -right-8 w-64 h-64 rounded-full border border-amber-300 opacity-20" />
                <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-orange-100 opacity-50" />

                <div
                    ref={heroRef}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
                >
                    <div className="absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-200/30 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
                    <div
                        style={{
                            opacity: heroVisible ? 1 : 0,
                            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
                            transition: "opacity 0.8s ease, transform 0.8s ease",
                        }}
                        className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/70 p-10 shadow-2xl backdrop-blur-xl md:p-14"
                    >
                        <span className="inline-flex items-center gap-2 text-amber-700 text-xs font-semibold tracking-widest uppercase mb-5 border border-amber-300 rounded-full px-4 py-1 bg-white/60">
                            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                            Our Product Range
                        </span>
                        <h1
                            className="text-5xl md:text-6xl font-bold text-gray-900 mb-5 leading-tight"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            Tools Built for
                            <br />
                            <span className="text-amber-700">Real Work.</span>
                        </h1>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Every float in our range is designed with one goal: to make your
                            plastering job easier, faster and more precise. Browse by category
                            or search by wood type.
                        </p>
                    </div>

                    {/* Search + Filter bar */}
                    <div
                        style={{
                            opacity: heroVisible ? 1 : 0,
                            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
                        }}
                        className="mt-10 rounded-[2rem] border border-white/40 bg-white/70 p-5 shadow-xl backdrop-blur-xl sm:flex sm:items-center sm:justify-between"
                    >
                        {/* Search */}
                        <div className="relative flex-shrink-0 w-full sm:w-72">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
                            <input
                                type="text"
                                placeholder="Search products or wood type…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 rounded-xl border border-amber-200 bg-white/80 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
                                style={{ fontFamily: "system-ui, sans-serif" }}
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {/* Category pills */}
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeCategory === cat
                                            ? "bg-amber-800 text-white shadow-md"
                                            : "bg-white text-amber-800 border border-amber-200 hover:border-amber-400"
                                        }`}
                                    style={{ fontFamily: "system-ui, sans-serif" }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PRODUCT GRID ─────────────────────── */}
            <section className="relative py-16">
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-amber-100/30 to-transparent" />
                <div
                    ref={gridRef}
                    className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                    {/* Result count */}
                    <div
                        className="flex items-center justify-between mb-8"
                        style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                        <p className="text-sm text-gray-500">
                            Showing{" "}
                            <span className="font-bold text-amber-800">{filtered.length}</span>{" "}
                            {filtered.length === 1 ? "product" : "products"}
                            {activeCategory !== "All" && (
                                <span className="text-gray-400"> in {activeCategory}</span>
                            )}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Filter size={12} />
                            {activeCategory !== "All" ? activeCategory : "All categories"}
                        </div>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="text-center rounded-[1.75rem] border border-white/40 bg-white/70 p-16 shadow-xl backdrop-blur-xl">
                            <Package size={48} className="text-amber-200 mx-auto mb-4" />
                            <p className="text-gray-400 text-lg">No products match your search.</p>
                            <button
                                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                                className="mt-4 text-amber-700 text-sm underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((product, i) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    index={i}
                                    onView={setSelectedProduct}
                                    visible={gridVisible}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── TRADE ENQUIRY BANNER ──────────────── */}
            <section className="relative py-20">
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-amber-100/60 to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/70 p-10 md:p-14 shadow-2xl backdrop-blur-xl">
                        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-amber-200/30 blur-3xl" />
                        <div className="absolute bottom-0 -left-8 w-48 h-48 rounded-full bg-orange-200/30 blur-3xl" />
                        {/* Decorative */}
                        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full border border-amber-700 opacity-30" />
                        <div className="absolute bottom-0 -left-8 w-48 h-48 rounded-full bg-amber-700 opacity-20" />

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <span className="text-amber-300 text-xs font-bold tracking-widest uppercase mb-3 block">
                                    Trade & Bulk Orders
                                </span>
                                <h2
                                    className="text-3xl md:text-4xl font-bold text-white mb-4"
                                    style={{ fontFamily: "'Georgia', serif" }}
                                >
                                    Need a Custom Quote?
                                </h2>
                                <p className="text-amber-200 leading-relaxed">
                                    We supply tool traders, construction companies and hardware
                                    distributors at scale. OEM branding, custom dimensions and
                                    bulk pricing available on request.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("contact")
                                            ?.scrollIntoView({ behavior: "smooth" })
                                    }
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-amber-800 font-bold rounded-xl hover:bg-amber-50 transition-all transform hover:scale-105 shadow-xl"
                                    style={{ fontFamily: "system-ui, sans-serif" }}
                                >
                                    Request a Quote <ArrowRight size={18} />
                                </button>
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("contact")
                                            ?.scrollIntoView({ behavior: "smooth" })
                                    }
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-amber-700 transition-all"
                                    style={{ fontFamily: "system-ui, sans-serif" }}
                                >
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MODAL ────────────────────────────── */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
};

export default Transition(ProductsPage);