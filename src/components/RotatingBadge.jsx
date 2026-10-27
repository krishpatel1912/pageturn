import React from 'react';

export default function RotatingBadge({
  text = "INDEPENDENT BOOKSTORE • EST. 2026 • CURATED ZINE • ",
  diameter = 110,
  className = ""
}) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={`rotating-badge-container ${className}`}
      style={{
        width: `${diameter}px`,
        height: `${diameter}px`,
        position: "relative",
        userSelect: "none"
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="rotating-badge-svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          <path
            id="textcircle"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <circle cx="50" cy="50" r="48" fill="var(--accent-mustard)" stroke="var(--border-color)" strokeWidth="2" />
        <circle cx="50" cy="50" r="26" fill="var(--accent-tomato)" stroke="var(--border-color)" strokeWidth="1.5" />
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fill="#FFFDF9"
          fontFamily="var(--font-serif)"
          fontSize="18"
          fontWeight="bold"
        >
          PT
        </text>
        <text
          fill="var(--text-primary)"
          fontSize="7.8"
          fontFamily="var(--font-mono)"
          fontWeight="bold"
          letterSpacing="1.8"
        >
          <textPath xlinkHref="#textcircle" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
