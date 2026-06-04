export function CompareBottomCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-brand">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8 text-white">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl">Ready to Get Funded?</h2>
            <p className="mt-3 text-white/85 max-w-xl">
              Check out our exclusive discount codes before you sign up — save up to 30% on your challenge fee.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-[#0a0a0a] font-semibold whitespace-nowrap hover:bg-white/90 transition shadow-lg"
          >
            See All Discount Codes
          </a>
        </div>
      </div>
    </section>
  );
}