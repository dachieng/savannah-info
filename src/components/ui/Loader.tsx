"use client";

interface SpinnerProps {
  active?: boolean;
  className?: string;
  variant?: "large" | "medium" | "small";
}

const SpinnerVariants = {
  large: "w-12 h-12",
  medium: "w-8 h-8",
  small: "w-6 h-6",
};

const Loading = ({
  active = false,
  className = "",
  variant = "small",
  ...props
}: SpinnerProps) => {
  if (!active) return null;

  return (
    <span
      className={`flex items-center justify-center ${className}`}
      {...props}
    >
      <span
        className={`inline-block ${SpinnerVariants[variant]} animate-spin rounded-full border-4 border-light border-b-primary border-t-primary`}
      />
    </span>
  );
};

export default Loading;
