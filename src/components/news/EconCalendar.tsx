import { useEffect, useRef } from "react";

export function EconCalendar() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    widget.replaceChildren();

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.async = true;
    script.type = "text/javascript";
    script.textContent = JSON.stringify({
      colorTheme: "dark",
      isTransparent: true,
      width: "100%",
      height: "600",
      locale: "en",
      importanceFilter: "-1,0,1",
    });
    widget.appendChild(script);

    return () => widget.replaceChildren();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-8">
      <div className="mb-5">
        <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Economic Calendar</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Live economic events, filterable by day or week — set your own timezone inside the calendar.
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border border-primary/40 bg-card p-2 shadow-[0_0_36px_-18px_hsl(var(--primary)/0.65)] sm:p-4">
        <div
          ref={widgetRef}
          className="tradingview-widget-container h-[600px] w-full overflow-hidden"
          aria-label="Live economic calendar"
        />
      </div>
    </section>
  );
}