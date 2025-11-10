import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      default: "",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      h1: "lg:text-6xl text-4xl font-bold tracking-tight",
      h2: "text-4xl font-semibold tracking-tight",
      h3: "text-2xl font-semibold tracking-tight",
      h4: "text-xl font-semibold tracking-tight",
      tip: "text-xs text-muted-foreground",
      muted: "text-sm text-muted-foreground",
      numeric: "font-semibold",
    },
    color: {
      destructive: "text-destructive",
      warning: "text-orange-400",
      primary: "text-primary",
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
    color: "default",
  },
});

function Typography({
  className,
  variant,
  color,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof typographyVariants>) {
  return (
    <div
      data-slot="typography"
      className={cn(typographyVariants({ variant, color }), className)}
      {...props}
    />
  );
}

export { Typography };
