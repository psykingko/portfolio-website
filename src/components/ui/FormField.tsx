import React from "react";
import { cn } from "@/utils";

interface FormFieldProps {
  children: React.ReactNode;
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  children,
  label,
  htmlFor,
  required = false,
  error,
  helpText,
  className = "",
}) => {
  const fieldId = htmlFor;
  const errorId = error ? `${fieldId}-error` : undefined;
  const helpId = helpText ? `${fieldId}-help` : undefined;

  return (
    <div className={cn("form-field", className)}>
      <label
        htmlFor={fieldId}
        className={cn(
          "block text-sm font-medium text-text-primary mb-2",
          "transition-colors duration-200",
          error && "text-red-600"
        )}
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      <div className="relative">
        {React.cloneElement(children as React.ReactElement<any>, {
          id: fieldId,
          "aria-invalid": !!error,
          "aria-describedby": cn(errorId, helpId).trim() || undefined,
          className: cn(
            (children as React.ReactElement<any>).props.className,
            error && "border-red-500 focus:border-red-500 focus:ring-red-500"
          ),
        })}
      </div>

      {helpText && !error && (
        <p id={helpId} className="mt-1 text-xs text-text-secondary" role="note">
          {helpText}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className="mt-1 text-xs text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
