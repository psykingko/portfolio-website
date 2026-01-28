import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  const baseClasses = "loading-spinner";
  const sizeClasses = `loading-spinner--${size}`;
  const classes = `${baseClasses} ${sizeClasses} ${className}`.trim();

  return (
    <div className={classes}>
      <div className="spinner" />
    </div>
  );
};

export default LoadingSpinner;
