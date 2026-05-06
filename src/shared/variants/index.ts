import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-xs font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-action text-action-foreground",
        destructive: "bg-transparent text-destructive hover:bg-destructive/10",
        outline: "border border-border bg-background",
        secondary: "bg-secondary text-secondary-foreground",
        tertiary: "bg-tertiary text-tertiary-foreground",
        accent: "bg-accent text-accent-foreground",
        ghost: "bg-transparent border-none text-current",
        item: "bg-transparent border-none text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-foreground text-xs font-medium",
        navlink: "border-none text-foreground justify-start [&_svg]:size-4 hover:text-tertiary",
        flat: "bg-action text-action-foreground font-medium dark:bg-tertiary/10 dark:text-tertiary",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-7 rounded-sm gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-7 rounded-sm p-0.5",
        xs: "size-5 rounded-sm p-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-3xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
        outline: "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",
        muted: "bg-muted text-muted-foreground border border-border",
        tertiary: "bg-tertiary text-tertiary-foreground",
        light: "bg-tertiary/15 text-tertiary border border-tertiary/20",
        blue: "bg-blue-200 text-blue-600 ring-blue-600 dark:bg-blue-950 dark:ring-blue-950",
        green: "bg-green-200 text-green-600 ring-green-600 dark:bg-green-950 dark:ring-green-950",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const buttonGroupVariants = cva(
  "has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md flex w-fit items-stretch *:focus-visible:z-10 *:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-md! [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-md! flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

export const inputVariants = cva("w-80 flex items-center gap-1 px-2 rounded-lg autofill:bg-transparent", {
  variants: {
    variant: {
      ghost: "bg-transparent text-foreground",
      outline: "border border-input bg-background text-foreground",
      accent: "bg-accent text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground",
    },
    sizes: {
      sm: "h-8",
      md: "h-9",
      lg: "h-11",
    },
  },
  defaultVariants: {
    variant: "outline",
    sizes: "md",
  },
});

export const sheetVariants = cva(
  "fixed z-50 gap-2 bg-background flex flex-col p-2 shadow-sm transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 flex-col flex h-full w-80 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left max-sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-80 flex-col flex data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right max-sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

export const sheetContainerVariants = cva(
  "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      container: {
        black: "bg-black/90",
        white: "bg-white/10",
        gray: "bg-gray-300/80",
      },
    },
    defaultVariants: {
      container: "black",
    },
  }
);

export const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-4 bg-transparent",
      },
      border: {
        line: "border-b border-border pb-3 group-data-[variant=line]/tabs-trigger:border-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 bg-background",
        rounded: "border rounded-lg border-border",
      },
    },
    defaultVariants: {
      variant: "default",
      border: "line",
    },
  }
);

export const dividerVariants = cva("shrink-0 flex", {
  variants: {
    type: {
      vertical: "w-[1px] h-10 border-r border-border",
      horizontal: "h-[1px] w-10 border-t border-border",
    },
  },
  defaultVariants: {
    type: "vertical",
  },
});

export const boxVariants = cva("relative shrink-0 flex items-center justify-center", {
  variants: {
    variant: {
      gray: "bg-gray-200 text-gray-800 ring-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:ring-gray-700",
      black: "bg-black text-white ring-black dark:bg-stone-900 dark:ring-stone-900 dark:text-stone-200",
      blue: "bg-blue-500 text-blue-100 ring-blue-500 dark:text-blue-200 dark:bg-blue-900 dark:ring-blue-900",
      green: "bg-green-600 text-green-100 ring-green-600 dark:text-green-200 dark:bg-green-900 dark:ring-green-900",
      red: "bg-red-500 text-red-100 ring-red-500 dark:text-red-200 dark:bg-red-900 dark:ring-red-900",
      purple:
        "bg-purple-500 text-purple-100 ring-purple-500 dark:text-purple-200 dark:bg-purple-900 dark:ring-purple-900",
      fuchsia:
        "bg-fuchsia-500 text-fuchsia-100 ring-fuchsia-500 dark:text-fuchsia-200 dark:bg-fuchsia-900 dark:ring-fuchsia-900",
      yellow:
        "bg-yellow-400 text-yellow-800 ring-yellow-400 dark:text-yellow-200 dark:bg-yellow-700 dark:ring-yellow-700",
      outline: "border-border text-foreground bg-background",
    },
    type: {
      rounded: "rounded-full",
      square: "rounded-sm",
      base: "rounded-none",
    },
    sizes: {
      sm: "size-5 px-0.5",
      md: "size-7 px-1.5",
      lg: "size-9 px-2",
    },
  },
  defaultVariants: {
    type: "square",
    variant: "black",
    sizes: "sm",
  },
});

export const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-muted",
        accent: "bg-accent text-accent-foreground border border-border rounded-md hover:bg-accent/90",
      },
      size: {
        default: "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        sm: "h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
