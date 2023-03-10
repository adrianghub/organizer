import { cva, VariantProps } from "class-variance-authority";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {}

export const Button = ({
  children,
  variant = "primary",
  size = "medium",
  className,
  ...props
}: ButtonProps) => (
  <button className={buttonClasses({ variant, size, className })} {...props}>
    {children}
  </button>
);

const buttonClasses = cva(
  [
    "rounded-3xl",
    "font-bold",
    "hover:scale-110",
    "active:scale-100",
    "transition",
    "duration-200",
    "ease-in-out",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-violet-500",
          "text-white",
          "border-transparent",
          "hover:bg-violet-600",
        ],

        secondary: [
          "bg-white",
          "text-violet-500",
          "border-violet-500",
          "hover:bg-gray-100",
          "focus:border-gray-100",
          "border-solid",
          "border-2",
        ],
        text: ["bg-transparent", "text-black", "hover:bg-gray-100"],
      },
      size: {
        small: ["text-md", "py-1", "px-2"],
        medium: ["text-lg", "px-6", "py-2"],
        large: ["text-xlg", "px-8", "py-4"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);
