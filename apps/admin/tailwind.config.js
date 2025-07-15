/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Button component classes
    'bg-primary', 'text-primary-foreground', 'hover:bg-primary/90',
    'bg-destructive', 'text-white', 'hover:bg-destructive/90',
    'border', 'bg-background', 'hover:bg-accent', 'hover:text-accent-foreground',
    'bg-secondary', 'text-secondary-foreground', 'hover:bg-secondary/80',
    'text-primary', 'underline-offset-4', 'hover:underline',
    'inline-flex', 'items-center', 'justify-center', 'gap-2',
    'whitespace-nowrap', 'rounded-md', 'text-sm', 'font-medium',
    'transition-all', 'disabled:pointer-events-none', 'disabled:opacity-50',
    'h-9', 'px-4', 'py-2', 'h-8', 'gap-1.5', 'px-3', 'h-10', 'px-6',
    'shadow-xs', 'focus-visible:ring-ring/50', 'focus-visible:ring-[3px]',
    'outline-none', 'focus-visible:border-ring',
    // Other common UI classes
    'bg-card', 'text-card-foreground', 'bg-popover', 'text-popover-foreground',
    'bg-muted', 'text-muted-foreground', 'text-accent-foreground',
    'border-border', 'bg-input', 'ring-ring', 'text-foreground',
    'dark:bg-destructive/60', 'dark:bg-input/30', 'dark:border-input',
    'dark:hover:bg-input/50', 'dark:hover:bg-accent/50',
    'aria-invalid:ring-destructive/20', 'dark:aria-invalid:ring-destructive/40',
    'aria-invalid:border-destructive', 'focus-visible:ring-destructive/20',
    'dark:focus-visible:ring-destructive/40'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}