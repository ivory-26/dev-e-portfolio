import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  className?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  ...props
}) => {
  const isPrimary = variant === 'primary';
  
  // Base classes
  const baseClasses = "relative group overflow-hidden font-bold transition-all duration-300 ease-out active:scale-95 hover:shadow-[0_0_30px_rgba(255,0,128,0.5)]";
  
  // Variant Styles
  // Primary: Primary Text/BG contrast -> Hover: Pink BG
  // Outline: Transparent BG, Primary Text -> Hover: Pink BG
  
  const variantClasses = isPrimary
    ? "bg-primary text-background"
    : "bg-transparent text-primary border border-border hover:border-[#ff0080]";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {/* Pink Swipe Layer */}
      <div 
        className="absolute inset-0 bg-[#ff0080] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out will-change-transform" 
      />
      
      {/* Content Layer */}
      <div className="relative z-10 flex items-center justify-center gap-2">
         {Icon && iconPosition === 'left' && (
             <Icon 
                size={18} 
                className={`transition-colors duration-300 delay-100 ${isPrimary ? 'group-hover:text-primary' : 'group-hover:text-background'}`} 
            />
         )}
         
         {/* Text Gradient Swipe 
             bg-right is default (50-100%), bg-left is hover (0-50%)
         */}
         <span 
            className="bg-clip-text text-transparent bg-[length:200%_100%] bg-right group-hover:bg-left transition-[background-position] duration-300 delay-100 ease-out"
            style={{
                backgroundImage: isPrimary
                    /* Primary: Hover (Text Primary Color), Default (Background Color) */
                    ? 'linear-gradient(to right, var(--text-primary) 50%, var(--bg-color) 50%)' 
                    /* Outline: Hover (Background Color), Default (Text Primary Color) */
                    : 'linear-gradient(to right, var(--bg-color) 50%, var(--text-primary) 50%)'
            }}
         >
            {children}
         </span>

         {Icon && iconPosition === 'right' && (
             <Icon 
                size={18} 
                className={`transition-colors duration-300 delay-100 ${isPrimary ? 'group-hover:text-primary' : 'group-hover:text-background'}`} 
            />
         )}
      </div>
    </button>
  );
};
