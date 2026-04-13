export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#E5E7EB]">
      <div className="max-w-5xl mx-auto px-6 py-8 text-center">
        <p className="text-sm font-medium text-[#1C1D2E]">Bhaduri Lab</p>
        <p className="mt-1 text-xs text-[#9CA3AF]">
          Site by Elisa Fazzari &middot; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
