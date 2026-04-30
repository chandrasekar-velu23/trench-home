"use client";

export default function LightRays() {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-rotate">
        <svg
          width="2000"
          height="2000"
          viewBox="0 0 2000 2000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-40"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d={`M1000 1000 L${1000 + Math.cos((i * 30 * Math.PI) / 180) * 1500} ${
                1000 + Math.sin((i * 30 * Math.PI) / 180) * 1500
              } L${1000 + Math.cos(((i * 30 + 15) * Math.PI) / 180) * 1500} ${
                1000 + Math.sin(((i * 30 + 15) * Math.PI) / 180) * 1500
              } Z`}
              fill="url(#ray-gradient)"
            />
          ))}
          <defs>
            <radialGradient
              id="ray-gradient"
              cx="1000"
              cy="1000"
              r="1000"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--dome-glow)" stopOpacity="0.4" />
              <stop offset="1" stopColor="var(--dome-glow)" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
