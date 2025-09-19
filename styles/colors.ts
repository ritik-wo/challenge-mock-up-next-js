export const colors = {
  text: {
    primary: 'text-gray-900',      
    secondary: 'text-gray-700',    
    tertiary: 'text-gray-500',    
    quaternary: 'text-gray-600',
    muted: 'text-gray-400',       
    white: 'text-white',          
  },
  
  bg: {
    primary: 'bg-white',           
    secondary: 'bg-gray-100',       
    tertiary: 'bg-gray-200',
    quaternary: 'bg-gray-200',       
    dark: 'bg-gray-900',           
    overlay: 'bg-black/30',        
  },
  
  border: {
    light: 'border-gray-200',      
    medium: 'border-gray-300',     
    dark: 'border-gray-400',       
    dashed: 'border-2 border-dashed border-gray-300',  
    dashedActive: 'border-2 border-dashed border-red-500', 
  },
  
  hover: {
    light: 'hover:bg-gray-50',     
    medium: 'hover:bg-gray-200',   
    dark: 'hover:bg-black/90',     
    text: 'hover:text-gray-900',   
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
