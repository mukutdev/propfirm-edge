import { useEffect, useRef, memo } from "react";

type TradingViewWidgetProps = {
  /** embed-widget-<type> suffix */
  type: "ticker-tape" | "timeline" | "market-overview";
  config: Record<string, unknown>;
  /** height for the iframe container; ticker-tape ignores this */
  height?: number | string;
  className?: string;
};

const SCRIPT_SRC: Record<TradingViewWidgetProps["type"], string> = {
  "ticker-tape":
    "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js",
  timeline:
    "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js",
  "market-overview":
    "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js",
};

/**
 * Embeds an official TradingView widget by injecting its loader script into a
 * container div. Runs only in the browser (useEffect), so SSR renders an empty
 * container that fills on mount.
 */
function TradingViewWidgetBase({
  type,
  config,
  height,
  className,
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // TradingView appends an <iframe> alongside the script tag. Clear any
    // previous render so HMR / re-mounts don't stack duplicates.
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = SCRIPT_SRC[type];
    script.async = true;
    script.type = "text/javascript";
    // The config is passed as the script's inner HTML as JSON.
    script.innerHTML = JSON.stringify(config);
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [type, JSON.stringify(config)]);

  return (
    <div
      ref={containerRef}
      className={`tradingview-widget-container ${className ?? ""}`}
      style={height ? { height } : undefined}
    />
  );
}

export const TradingViewWidget = memo(TradingViewWidgetBase);
