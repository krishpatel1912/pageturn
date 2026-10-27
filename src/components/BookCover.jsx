import React from 'react';

/**
 * Pure CSS/SVG generated book covers with geometric patterns,
 * color blocks, Bauhaus/zine motifs, and spine realism.
 * Zero external image dependencies.
 */
export default function BookCover({
  book,
  width = "100%",
  aspectRatio = "2 / 3",
  showSpine = true,
  className = ""
}) {
  const {
    title,
    author,
    pattern = "bauhaus-shapes",
    bgColor = "#E4472B",
    textColor = "#F4EDE0",
    genre = "Literature"
  } = book;

  // Render SVG pattern based on the book's pattern attribute
  const renderPattern = () => {
    switch (pattern) {
      case "circles":
        return (
          <svg className="cover-svg-pattern" viewBox="0 0 200 300" preserveAspectRatio="none">
            <circle cx="100" cy="140" r="70" fill="none" stroke={textColor} strokeWidth="3" opacity="0.4" />
            <circle cx="100" cy="140" r="45" fill={textColor} opacity="0.15" />
            <circle cx="100" cy="140" r="20" fill={textColor} opacity="0.3" />
            <line x1="20" y1="140" x2="180" y2="140" stroke={textColor} strokeWidth="1.5" opacity="0.5" />
          </svg>
        );

      case "grid":
        return (
          <svg className="cover-svg-pattern" viewBox="0 0 200 300" preserveAspectRatio="none">
            <defs>
              <pattern id={`grid-${book.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke={textColor} strokeWidth="0.8" opacity="0.25" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${book.id})`} />
            <line x1="0" y1="200" x2="200" y2="120" stroke={textColor} strokeWidth="2" opacity="0.6" />
            <circle cx="150" cy="140" r="16" fill="none" stroke={textColor} strokeWidth="2" />
          </svg>
        );

      case "bauhaus-shapes":
        return (
          <svg className="cover-svg-pattern" viewBox="0 0 200 300" preserveAspectRatio="none">
            <circle cx="50" cy="110" r="40" fill={textColor} opacity="0.2" />
            <rect x="90" y="70" width="80" height="80" fill={textColor} opacity="0.12" />
            <polygon points="100,160 180,240 20,240" fill={textColor} opacity="0.18" />
            <line x1="10" y1="110" x2="190" y2="110" stroke={textColor} strokeWidth="2" opacity="0.4" />
          </svg>
        );

      case "stripes":
        return (
          <svg className="cover-svg-pattern" viewBox="0 0 200 300" preserveAspectRatio="none">
            <line x1="0" y1="40" x2="200" y2="40" stroke={textColor} strokeWidth="8" opacity="0.3" />
            <line x1="0" y1="65" x2="200" y2="65" stroke={textColor} strokeWidth="4" opacity="0.2" />
            <line x1="0" y1="180" x2="200" y2="180" stroke={textColor} strokeWidth="12" opacity="0.25" />
            <line x1="0" y1="210" x2="200" y2="210" stroke={textColor} strokeWidth="4" opacity="0.15" />
          </svg>
        );

      case "diagonal":
        return (
          <svg className="cover-svg-pattern" viewBox="0 0 200 300" preserveAspectRatio="none">
            <polygon points="0,0 120,0 200,300 80,300" fill={textColor} opacity="0.15" />
            <line x1="40" y1="0" x2="200" y2="240" stroke={textColor} strokeWidth="3" opacity="0.4" />
            <circle cx="160" cy="70" r="25" fill={textColor} opacity="0.25" />
          </svg>
        );

      case "dots":
      case "halftone":
        return (
          <svg className="cover-svg-pattern" viewBox="0 0 200 300" preserveAspectRatio="none">
            <defs>
              <pattern id={`dots-${book.id}`} width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="8" cy="8" r="3" fill={textColor} opacity="0.25" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#dots-${book.id})`} />
            <rect x="30" y="80" width="140" height="90" fill="none" stroke={textColor} strokeWidth="2" opacity="0.5" />
          </svg>
        );

      case "moon":
        return (
          <svg className="cover-svg-pattern" viewBox="0 0 200 300" preserveAspectRatio="none">
            <circle cx="100" cy="110" r="50" fill={textColor} opacity="0.25" />
            <circle cx="120" cy="95" r="45" fill={bgColor} />
            <circle cx="50" cy="180" r="2" fill={textColor} opacity="0.8" />
            <circle cx="150" cy="190" r="2.5" fill={textColor} opacity="0.7" />
            <circle cx="80" cy="220" r="1.5" fill={textColor} opacity="0.6" />
          </svg>
        );

      case "sun":
        return (
          <svg className="cover-svg-pattern" viewBox="0 0 200 300" preserveAspectRatio="none">
            <circle cx="100" cy="130" r="38" fill={textColor} opacity="0.3" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <line
                key={i}
                x1="100"
                y1="130"
                x2={100 + 55 * Math.cos((deg * Math.PI) / 180)}
                y2={130 + 55 * Math.sin((deg * Math.PI) / 180)}
                stroke={textColor}
                strokeWidth="2"
                opacity="0.4"
              />
            ))}
          </svg>
        );

      case "waves":
        return (
          <svg className="cover-svg-pattern" viewBox="0 0 200 300" preserveAspectRatio="none">
            <path d="M 0 100 Q 50 80 100 100 T 200 100" fill="none" stroke={textColor} strokeWidth="2.5" opacity="0.4" />
            <path d="M 0 130 Q 50 110 100 130 T 200 130" fill="none" stroke={textColor} strokeWidth="2.5" opacity="0.35" />
            <path d="M 0 160 Q 50 140 100 160 T 200 160" fill="none" stroke={textColor} strokeWidth="2.5" opacity="0.3" />
            <path d="M 0 190 Q 50 170 100 190 T 200 190" fill="none" stroke={textColor} strokeWidth="2.5" opacity="0.25" />
          </svg>
        );

      case "matrix":
        return (
          <svg className="cover-svg-pattern" viewBox="0 0 200 300" preserveAspectRatio="none">
            <text x="20" y="60" fill={textColor} opacity="0.3" fontFamily="monospace" fontSize="12">10110010 01101</text>
            <text x="20" y="90" fill={textColor} opacity="0.25" fontFamily="monospace" fontSize="12">00101101 11010</text>
            <text x="20" y="120" fill={textColor} opacity="0.35" fontFamily="monospace" fontSize="12">&lt;ROOT::COMMONS&gt;</text>
            <text x="20" y="150" fill={textColor} opacity="0.2" fontFamily="monospace" fontSize="12">01001110 10001</text>
            <text x="20" y="180" fill={textColor} opacity="0.3" fontFamily="monospace" fontSize="12">NULL POINTER 0x8F</text>
            <line x1="20" y1="200" x2="180" y2="200" stroke={textColor} strokeWidth="1.5" opacity="0.5" />
          </svg>
        );

      case "blockprint":
      case "terracotta":
        return (
          <svg className="cover-svg-pattern" viewBox="0 0 200 300" preserveAspectRatio="none">
            <rect x="40" y="70" width="120" height="120" fill="none" stroke={textColor} strokeWidth="3" opacity="0.3" />
            <polygon points="100,70 160,130 100,190 40,130" fill={textColor} opacity="0.15" />
            <circle cx="100" cy="130" r="15" fill={textColor} opacity="0.3" />
            <circle cx="60" cy="90" r="4" fill={textColor} opacity="0.5" />
            <circle cx="140" cy="90" r="4" fill={textColor} opacity="0.5" />
            <circle cx="60" cy="170" r="4" fill={textColor} opacity="0.5" />
            <circle cx="140" cy="170" r="4" fill={textColor} opacity="0.5" />
          </svg>
        );

      case "mycelium":
        return (
          <svg className="cover-svg-pattern" viewBox="0 0 200 300" preserveAspectRatio="none">
            <path d="M 100 240 Q 100 170 80 140 T 50 80 M 80 140 Q 120 110 140 70 M 100 170 Q 130 150 160 120" fill="none" stroke={textColor} strokeWidth="2.5" opacity="0.4" />
            <circle cx="50" cy="80" r="5" fill={textColor} opacity="0.4" />
            <circle cx="140" cy="70" r="6" fill={textColor} opacity="0.5" />
            <circle cx="160" cy="120" r="4" fill={textColor} opacity="0.4" />
          </svg>
        );

      default:
        // Default clean architectural composition
        return (
          <svg className="cover-svg-pattern" viewBox="0 0 200 300" preserveAspectRatio="none">
            <line x1="20" y1="30" x2="180" y2="30" stroke={textColor} strokeWidth="2" opacity="0.4" />
            <circle cx="100" cy="130" r="48" fill={textColor} opacity="0.15" />
            <rect x="70" y="100" width="60" height="60" fill="none" stroke={textColor} strokeWidth="2" opacity="0.35" />
            <line x1="20" y1="240" x2="180" y2="240" stroke={textColor} strokeWidth="1" opacity="0.3" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`pageturn-book-cover ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        width: width,
        aspectRatio: aspectRatio,
        position: "relative",
        overflow: "hidden",
        border: "2px solid #141414",
        boxShadow: "3px 3px 0px #141414",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1.25rem 1rem",
        boxSizing: "border-box",
        userSelect: "none"
      }}
    >
      {/* Realism: Left book spine highlight & shadow */}
      {showSpine && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "12px",
            background: "linear-gradient(to right, rgba(0,0,0,0.35), rgba(255,255,255,0.1) 40%, rgba(0,0,0,0.2) 80%, transparent)",
            zIndex: 3,
            pointerEvents: "none"
          }}
        />
      )}

      {/* Subtle paper texture gloss overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%, rgba(0,0,0,0.12) 100%)",
          zIndex: 2,
          pointerEvents: "none"
        }}
      />

      {/* SVG Geometric Background Motif */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          pointerEvents: "none"
        }}
      >
        {renderPattern()}
      </div>

      {/* Top Header: Genre Tag & Archival Stamp */}
      <div
        style={{
          position: "relative",
          zIndex: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${textColor}33`,
          paddingBottom: "0.4rem"
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.68rem",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            fontWeight: 700,
            opacity: 0.9
          }}
        >
          {genre}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.62rem",
            opacity: 0.7
          }}
        >
          PT•{book.year || "2026"}
        </span>
      </div>

      {/* Middle/Bottom: Book Title & Author */}
      <div
        style={{
          position: "relative",
          zIndex: 4,
          marginTop: "auto"
        }}
      >
        <h4
          style={{
            fontFamily: "var(--font-serif, serif)",
            fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)",
            lineHeight: 1.15,
            fontWeight: 700,
            marginBottom: "0.5rem",
            textShadow: "0 1px 2px rgba(0,0,0,0.2)"
          }}
        >
          {title}
        </h4>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            borderTop: `1px dashed ${textColor}44`,
            paddingTop: "0.4rem"
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              opacity: 0.95
            }}
          >
            {author}
          </span>
        </div>
      </div>
    </div>
  );
}
