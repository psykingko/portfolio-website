import React, { forwardRef } from "react";
import { cn } from "@/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "error";
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "default", fullWidth = true, ...props }, ref) => {
    const baseClasses = cn(
      // Base styling
      "px-4 py-3 rounded-lg border transition-all duration-200",
      "text-text-primary placeholder-text-secondary",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",

      // Width
      fullWidth && "w-full",

      // Variants
      variant === "default" &&
        cn(
          "border-gray-300 bg-white",
          "hover:border-gray-400",
          "focus:border-primary focus:ring-primary focus:ring-opacity-20"
        ),

      variant === "error" &&
        cn(
          "border-red-500 bg-red-50",
          "focus:border-red-500 focus:ring-red-500 focus:ring-opacity-20"
        ),

      className
    );

    return <input ref={ref} className={baseClasses} {...props} />;
  }
);

Input.displayName = "Input";

export default Input;
