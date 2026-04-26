import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LuFrown } from "react-icons/lu";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-pp-surface">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-white/60 bg-white/78 px-4 py-24 text-center pp-shadow max-w-lg w-full">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
            <LuFrown className="h-10 w-10 text-slate-300" />
          </div>
          <h2 className="mb-2 text-2xl font-black tracking-[-0.04em] text-slate-950">Oops, page not found.</h2>
          <p className="mb-8 text-sm leading-7 text-slate-500">
            We couldn't locate the page you were looking for. It might have been moved or deleted.
          </p>
          <Link 
            href="/" 
            className="pp-button-primary rounded-full px-8 py-3 text-sm font-bold"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
