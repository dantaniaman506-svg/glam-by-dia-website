import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "@/routes";
import About from "@/routes/about";
import Book from "@/routes/book";
import Contact from "@/routes/contact";
import Gallery from "@/routes/gallery";
import Henna from "@/routes/henna";
import SelfMakeupClass from "@/routes/self-makeup-class";
import Services from "@/routes/services";

const PAGE_TITLES: Record<string, string> = {
  "/": "Glam by Dia | Bridal Hair & Makeup Melbourne",
  "/about": "About Glam by Dia | Melbourne Bridal Artist",
  "/services": "Bridal Services & Prices | Glam by Dia",
  "/gallery": "Bridal Gallery | Glam by Dia",
  "/book": "Book Bridal Hair & Makeup | Glam by Dia",
  "/henna": "Henna & Mehndi Artistry | Glam by Dia",
  "/self-makeup-class": "Self Makeup Class | Glam by Dia",
  "/contact": "Contact Glam by Dia | Clayton South",
};

function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = PAGE_TITLES[pathname] ?? "Glam by Dia | Melbourne Bridal Artist";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="glass-panel max-w-md p-8 text-center">
        <h1 className="heading-display text-5xl">Oh, lovely</h1>
        <p className="mt-3 text-sm text-foreground/80">We couldn't find that page.</p>
        <a href="/" className="btn-primary mt-6">Back to home</a>
      </div>
    </main>
  );
}

export function AppRoutes() {
  return (
    <>
      <RouteEffects />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/book" element={<Book />} />
        <Route path="/henna" element={<Henna />} />
        <Route path="/self-makeup-class" element={<SelfMakeupClass />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="site-bg" aria-hidden="true" />
      <AppRoutes />
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}
