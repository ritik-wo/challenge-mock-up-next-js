// Color variables for consistent theming across the application
export const colors = {
  // Text colors
  text: {
    primary: 'text-gray-900',      // Black/dark text for headings and primary content
    secondary: 'text-gray-700',    // Dark grey for secondary text
    tertiary: 'text-gray-500',     // Light grey for tertiary text, labels, hints
    muted: 'text-gray-400',        // Very light grey for placeholders, disabled text
    white: 'text-white',           // White text for dark backgrounds
  },
  
  // Background colors
  bg: {
    primary: 'bg-white',           // Primary white background
    secondary: 'bg-gray-50',       // Light grey background for sections
    tertiary: 'bg-gray-100',       // Medium grey background for cards, inputs
    dark: 'bg-gray-900',           // Dark background for buttons, icons
    overlay: 'bg-black/30',        // Semi-transparent overlay
  },
  
  // Border colors
  border: {
    light: 'border-gray-200',      // Light border for cards, inputs
    medium: 'border-gray-300',     // Medium border for buttons, dividers
    dark: 'border-gray-400',       // Darker border for active states
    dashed: 'border-2 border-dashed border-gray-300',  // Thicker dashed border for file uploads
    dashedActive: 'border-2 border-dashed border-red-500', // Active state for file uploads
  },
  
  hover: {
    light: 'hover:bg-gray-50',     // Light hover for buttons
    medium: 'hover:bg-gray-100',   // Medium hover for cards
    dark: 'hover:bg-black/90',     // Dark hover for primary buttons
    text: 'hover:text-gray-900',   // Text hover state
  },
  
  focus: {
    ring: 'focus:ring-2 focus:ring-brand-400/50',
    border: 'focus:border-brand-400',
    outline: 'focus:outline-none',
  }
} as const;

export const getColorClass = (category: keyof typeof colors, variant: string) => {
  return (colors[category] as any)[variant] || '';
};
