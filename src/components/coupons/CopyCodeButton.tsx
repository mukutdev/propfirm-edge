import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyCodeButton({
  code,
  variant = "ghost",
  size = "md",
}: {
  code: string;
  variant?: "ghost" | "gradient";
  size?: "md" | "lg";
}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const cls =
    variant === "gradient"
      ? `btn-gradient ${size === "lg" ? "text-base py-3 px-6" : "text-xs py-2 px-3.5"}`
      : `btn-ghost ${size === "lg" ? "text-base py-3 px-6" : "text-xs py-2 px-3.5"}`;

  return (
    <button
      onClick={copy}
      className={`${cls} transition-all ${copied ? "!bg-[#00d97e] !text-black !border-transparent !shadow-none" : ""}`}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied!" : "Copy Code"}
    </button>
  );
}