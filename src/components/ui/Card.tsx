"use client";

import Image from "next/image";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
} from "react";

import { cn } from "@/lib/utils";

import type { ImageProps } from "next/image";

const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-lg border shadow-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    ref={ref}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    ref={ref}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    ref={ref}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div className={cn("p-6 pt-0", className)} ref={ref} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("flex items-center p-6 pt-0", className)}
    ref={ref}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

const CardMediaContext = createContext({
  isLoaded: false,
  setIsLoaded: (_loaded: boolean) => {},
});

const useCardMedia = () => useContext(CardMediaContext);

const CardMediaProvider = ({ children }: { children?: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <CardMediaContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </CardMediaContext.Provider>
  );
};

const CardMedia = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <CardMediaProvider>
    <div
      className={cn("relative h-80 w-full overflow-hidden", className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  </CardMediaProvider>
));

CardMedia.displayName = "CardMedia";

const CardMediaImage = forwardRef<
  HTMLImageElement,
  ImageProps & React.ImgHTMLAttributes<HTMLImageElement>
>(({ alt, className, src, ...props }, ref) => {
  const { setIsLoaded } = useCardMedia();

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  return (
    <Image
      alt={alt}
      className={cn("rounded-md object-cover", className)}
      fill
      onLoad={handleLoad}
      ref={ref}
      src={src}
      {...props}
    />
  );
});

CardMediaImage.displayName = "CardMediaImage";

const CardMediaImageFallback = forwardRef<
  HTMLImageElement,
  ImageProps & React.ImgHTMLAttributes<HTMLImageElement>
>(({ alt, className, src, ...props }, ref) => {
  const { isLoaded } = useCardMedia();

  if (isLoaded) return null;

  return (
    <Image
      alt={alt}
      className={cn("rounded-md object-cover", className)}
      fill
      ref={ref}
      src={src}
      {...props}
    />
  );
});

CardMediaImageFallback.displayName = "CardMediaImageFallback";

const CardMediaBackground = forwardRef<
  HTMLDivElement,
  Pick<HTMLImageElement, "alt" | "src"> & React.HTMLAttributes<HTMLDivElement>
>(({ alt, className, src, style, ...props }, ref) => (
  <div
    aria-label={alt}
    className={cn("bg-cover bg-center", className)}
    ref={ref}
    role="img"
    style={{ backgroundImage: `url(${src})`, ...style }}
    {...props}
  />
));

CardMediaBackground.displayName = "CardMediaBackground";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardMediaBackground,
  CardMediaImage,
  CardMediaImageFallback,
  CardTitle,
};
