/**
 * Utility function for concatenating class names
 * Similar to clsx but lightweight for our needs
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ").trim();
}
