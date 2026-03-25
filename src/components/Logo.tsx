import Image from "next/image";

interface LogoProps {
  /** Size of the logo container in pixels (square). Defaults to 28. */
  size?: number;
  /** Additional className for the outer wrapper span */
  className?: string;
}

/**
 * Reusable FastNLP logo mark.
 * Renders icon.png on a dark background pill/square.
 */
export function Logo({ size = 28, className = "" }: LogoProps) {
  const padding = Math.round(size * 0.12);

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.25),
        backgroundColor: "#0f0f0f",
        flexShrink: 0,
        padding,
      }}
    >
      <Image
        src="/icon.png"
        alt="FastNLP logo"
        width={size - padding * 2}
        height={size - padding * 2}
        style={{ objectFit: "contain" }}
      />
    </span>
  );
}
