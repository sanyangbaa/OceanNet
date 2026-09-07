import Link from "next/link";
import { ArrowLeft, Compass, Mail, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-primary">
          <Compass className="h-10 w-10 animate-spin" style={{ animationDuration: "12s" }} />
        </div>

        <span className="text-xs font-black uppercase tracking-[0.3em] text-primary block mb-2">
          Error 404
        </span>

        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-secondary mb-4">
          Page Not Found
        </h1>

        <p className="text-muted-foreground text-base leading-relaxed mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-secondary font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>

          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-secondary text-white font-bold text-sm uppercase tracking-wider hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="h-4 w-4" />
            View Services
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gray-100 text-secondary font-bold text-sm uppercase tracking-wider hover:bg-gray-200 transition-all"
          >
            <Mail className="h-4 w-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
