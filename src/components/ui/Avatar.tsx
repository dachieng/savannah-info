"use client";

import {
  Root as AvatarPrimitiveRoot,
  Image as AvatarPrimitiveImage,
  Fallback as AvatarPrimitiveFallback,
} from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Avatar = forwardRef<
  React.ElementRef<typeof AvatarPrimitiveRoot>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitiveRoot>
>(({ className, ...props }, ref) => (
  <AvatarPrimitiveRoot
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitiveRoot.displayName;

const AvatarImage = forwardRef<
  React.ElementRef<typeof AvatarPrimitiveImage>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitiveImage>
>(({ className, ...props }, ref) => (
  <AvatarPrimitiveImage
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitiveImage.displayName;

const AvatarFallback = forwardRef<
  React.ElementRef<typeof AvatarPrimitiveFallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitiveFallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitiveFallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitiveFallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
