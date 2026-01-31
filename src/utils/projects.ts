/**
 * Project-related utility functions
 */

/**
 * Interface for tech stack display result
 */
export interface TechStackDisplay {
  visible: string[];
  remaining: number;
}

/**
 * Get tech stack display with truncation
 *
 * Returns the first N technologies to display and the count of remaining technologies.
 * Handles edge cases like empty arrays and arrays with fewer items than maxVisible.
 *
 * @param technologies - Array of technology names
 * @param maxVisible - Maximum number of technologies to show (default: 5)
 * @returns Object with visible technologies array and remaining count
 *
 * @example
 * // Array with more than 5 items
 * getTechStackDisplay(['React', 'TypeScript', 'Node.js', 'MongoDB', 'Express', 'Tailwind', 'Framer Motion'], 5)
 * // Returns: { visible: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Express'], remaining: 2 }
 *
 * @example
 * // Array with fewer than 5 items
 * getTechStackDisplay(['React', 'TypeScript', 'Node.js'], 5)
 * // Returns: { visible: ['React', 'TypeScript', 'Node.js'], remaining: 0 }
 *
 * @example
 * // Empty array
 * getTechStackDisplay([], 5)
 * // Returns: { visible: [], remaining: 0 }
 */
export const getTechStackDisplay = (
  technologies: string[],
  maxVisible: number = 5
): TechStackDisplay => {
  // Handle edge case: empty array
  if (!technologies || technologies.length === 0) {
    return {
      visible: [],
      remaining: 0,
    };
  }

  // Handle edge case: array length is less than or equal to maxVisible
  if (technologies.length <= maxVisible) {
    return {
      visible: technologies,
      remaining: 0,
    };
  }

  // Normal case: truncate to maxVisible and calculate remaining
  const visible = technologies.slice(0, maxVisible);
  const remaining = technologies.length - maxVisible;

  return {
    visible,
    remaining,
  };
};
