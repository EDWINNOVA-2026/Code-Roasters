"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Context
const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be inside Carousel");
  return context;
}

// Main Carousel
export const Carousel = React.forwardRef(function Carousel(
  { orientation = "horizontal", opts, plugins, className, children, ...props },
  ref
) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  );

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    return () => api?.off("select", onSelect);
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        orientation,
      }}
    >
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});

// Content
export const CarouselContent = React.forwardRef(function CarouselContent(
  { className, ...props },
  ref
) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "flex-col -mt-4",
          className
        )}
        {...props}
      />
    </div>
  );
});

// Item
export const CarouselItem = React.forwardRef(function CarouselItem(
  { className, ...props },
  ref
) {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
});

// Previous Button
export const CarouselPrevious = React.forwardRef(function CarouselPrevious(
  { className, ...props },
  ref
) {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      size="icon"
      variant="outline"
      className={cn(
        "absolute left-0 top-1/2 -translate-y-1/2",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="w-4 h-4" />
    </Button>
  );
});

// Next Button
export const CarouselNext = React.forwardRef(function CarouselNext(
  { className, ...props },
  ref
) {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      size="icon"
      variant="outline"
      className={cn(
        "absolute right-0 top-1/2 -translate-y-1/2",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="w-4 h-4" />
    </Button>
  );
});