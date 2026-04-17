import React from "react";

export default function LoadingSpinner({
  title = "Searching IP Address...",
  subtitle = "Please wait while we fetch accurate network details.",
}) {
  return (
    <div
      className="loading-wrapper"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Animated Loader */}
      <div className="loading-spinner-area">
        <div className="spinner-ring ring-one"></div>
        <div className="spinner-ring ring-two"></div>
        <div className="spinner-core"></div>
      </div>

      {/* Text Content */}
      <div className="loading-content">
        <h3 className="loading-title">
          {title}
        </h3>

        <p className="loading-subtitle">
          {subtitle}
        </p>
      </div>

      {/* Progress Dots */}
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}