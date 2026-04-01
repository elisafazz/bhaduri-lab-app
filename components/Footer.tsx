export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#D4D9EE] bg-white">
      <div className="max-w-3xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-[#6B7280]">
          Site authored by Elisa Fazzari for Bhaduri Lab
        </p>
        <p className="text-xs text-[#B8C5E0]">
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
