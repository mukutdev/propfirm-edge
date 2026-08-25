export function ResponsePromise() {
  const pills = [
    { icon: "⚡", text: "We reply within 24 hours" },
    { icon: "📧", text: "Real human responses" },
    { icon: "🔒", text: "Your info is never shared" },
  ];
  return (
    <section className="pb-10">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-[#0f0f0f] border border-[#1c1c1c] rounded-xl px-4 py-4 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2">
          {pills.map((p) => (
            <div
              key={p.text}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141414] border border-[#222] text-xs text-[#ccc]"
            >
              <span>{p.icon}</span>
              <span>{p.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}