import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import type { VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer transition-all justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 rounded-md ease-in-out",
  {
    defaultVariants: {
      size: "lg",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-10 px-4 py-2",
        icon: "h-12 w-12",
        lg: "h-12 rounded-md px-5",
        sm: "h-9 rounded-md px-3",
      },
      variant: {
        default: "bg-light text-primary bg-light-muted hover:opacity-80",
        destructive: "bg-destructive-light text-destructive hover:opacity-80",
        ghost: "bg-light text-primary hover:bg-light-muted",
        link: "text-primary underline-offset-4 hover:underline",
        outline:
          "border border-primary bg-light hover:bg-light-muted text-primary",
        primary: "bg-primary text-light hover:bg-primary/80",
        secondary: "bg-light-muted text-primary hover:text-primary/80",
        success: "bg-success-light text-success-dark hover:opacity-80",
      },
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({
  asChild = false,
  className,
  disabled,
  ref,
  size,
  type = "button",
  variant,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      aria-disabled={disabled}
      className={cn(buttonVariants({ className, size, variant }))}
      disabled={disabled}
      ref={ref}
      type={asChild ? undefined : type}
      {...props}
    />
  );
};

export { Button, buttonVariants };
