import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { usePage, Link, useForm, Head, router } from "@inertiajs/react";
import { X, PanelLeft, Settings, ChevronRight, Check, Circle, LogOut, ChevronsUpDown, LayoutGrid, LayoutPanelTop, Newspaper, Store, ExternalLink, Folder, BookOpen, Sun, Moon, LoaderCircle, OctagonX, TriangleAlert, Info, CircleCheck, Plus, Pencil, Trash2, Search, ArrowUpDown, XCircle, ChevronDown, ChevronUp, Copy, Loader2, SearchCode, History, Eye, ArrowUp, ArrowDown, ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ArrowLeft, FileSpreadsheet, RefreshCw, TrendingUp, Users, Calendar as Calendar$1, Clock, Smartphone, Laptop, AlertTriangle, Hash, Sparkles, Save, GripVertical, Tag, Layers, Image, ShoppingBag, MousePointerClick, Youtube, Instagram, Twitter, Link as Link$1, Unlink, Video, HelpCircle, Flame, Pin } from "lucide-react";
import * as React from "react";
import React__default, { useState, useEffect, useCallback, Fragment as Fragment$1, useRef, useMemo } from "react";
import { cva } from "class-variance-authority";
import { Toaster as Toaster$1, toast } from "sonner";
import { Command as Command$1 } from "cmdk";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ReactNodeViewRenderer, NodeViewWrapper, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Node, mergeAttributes } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { getDefaultClassNames, DayPicker } from "react-day-picker";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { useTheme } from "next-themes";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;
const Sheet = SheetPrimitive.Root;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      className: cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      ),
      ...props,
      ref
    }
  )
);
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(
  ({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(SheetPrimitive.Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
      children,
      /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
        /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
      ] })
    ] })
  ] })
);
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Title, { ref, className: cn("text-lg font-semibold text-foreground", className), ...props })
);
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("animate-pulse rounded-md bg-muted", className), ...props });
}
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(void 0);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = React.createContext(null);
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
const SidebarProvider = React.forwardRef(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React.useEffect(() => {
    const handleMobileNavigation = () => {
      if (isMobile) {
        setOpenMobile(false);
      }
    };
    window.addEventListener("mobile-navigation", handleMobileNavigation);
    return () => window.removeEventListener("mobile-navigation", handleMobileNavigation);
  }, [isMobile, setOpenMobile]);
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );
  return /* @__PURE__ */ jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", className),
      ref,
      ...props,
      children
    }
  ) }) });
});
SidebarProvider.displayName = "SidebarProvider";
const Sidebar = React.forwardRef(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsx("div", { className: cn("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", className), ref, ...props, children });
  }
  if (isMobile) {
    return /* @__PURE__ */ jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxs(
      SheetContent,
      {
        "data-sidebar": "sidebar",
        "data-mobile": "true",
        className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: [
          /* @__PURE__ */ jsx(SheetTitle, { className: "sr-only", children: "Sidebar Navigation" }),
          /* @__PURE__ */ jsx("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: "group peer hidden text-sidebar-foreground md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                "data-sidebar": "sidebar",
                className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm",
                children
              }
            )
          }
        )
      ]
    }
  );
});
Sidebar.displayName = "Sidebar";
const SidebarTrigger = React.forwardRef(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();
    return /* @__PURE__ */ jsxs(
      Button,
      {
        ref,
        "data-sidebar": "trigger",
        variant: "ghost",
        size: "icon",
        className: cn("h-7 w-7", className),
        onClick: (event) => {
          onClick == null ? void 0 : onClick(event);
          toggleSidebar();
        },
        ...props,
        children: [
          /* @__PURE__ */ jsx(PanelLeft, {}),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
        ]
      }
    );
  }
);
SidebarTrigger.displayName = "SidebarTrigger";
const SidebarRail = React.forwardRef(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      "data-sidebar": "rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: toggleSidebar,
      title: "Toggle Sidebar",
      className: cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      ),
      ...props
    }
  );
});
SidebarRail.displayName = "SidebarRail";
const SidebarInset = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "main",
    {
      ref,
      className: cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm",
        className
      ),
      ...props
    }
  );
});
SidebarInset.displayName = "SidebarInset";
const SidebarInput = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    Input,
    {
      ref,
      "data-sidebar": "input",
      className: cn("h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring", className),
      ...props
    }
  );
});
SidebarInput.displayName = "SidebarInput";
const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx("div", { ref, "data-sidebar": "header", className: cn("flex flex-col gap-2 p-2", className), ...props });
});
SidebarHeader.displayName = "SidebarHeader";
const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx("div", { ref, "data-sidebar": "footer", className: cn("flex flex-col gap-2 p-2", className), ...props });
});
SidebarFooter.displayName = "SidebarFooter";
const SidebarSeparator = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(Separator, { ref, "data-sidebar": "separator", className: cn("mx-2 w-auto bg-sidebar-border", className), ...props });
  }
);
SidebarSeparator.displayName = "SidebarSeparator";
const SidebarContent = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-sidebar": "content",
      className: cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className),
      ...props
    }
  );
});
SidebarContent.displayName = "SidebarContent";
const SidebarGroup = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx("div", { ref, "data-sidebar": "group", className: cn("relative flex w-full min-w-0 flex-col p-2", className), ...props });
});
SidebarGroup.displayName = "SidebarGroup";
const SidebarGroupLabel = React.forwardRef(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        ref,
        "data-sidebar": "group-label",
        className: cn(
          "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-hidden ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
          className
        ),
        ...props
      }
    );
  }
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";
const SidebarGroupAction = React.forwardRef(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        ref,
        "data-sidebar": "group-action",
        className: cn(
          "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          // Increases the hit area of the button on mobile.
          "after:absolute after:-inset-2 md:after:hidden",
          "group-data-[collapsible=icon]:hidden",
          className
        ),
        ...props
      }
    );
  }
);
SidebarGroupAction.displayName = "SidebarGroupAction";
const SidebarGroupContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, "data-sidebar": "group-content", className: cn("w-full text-sm", className), ...props }));
SidebarGroupContent.displayName = "SidebarGroupContent";
const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("ul", { ref, "data-sidebar": "menu", className: cn("flex w-full min-w-0 flex-col gap-1", className), ...props }));
SidebarMenu.displayName = "SidebarMenu";
const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("li", { ref, "data-sidebar": "menu-item", className: cn("group/menu-item relative", className), ...props }));
SidebarMenuItem.displayName = "SidebarMenuItem";
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const SidebarMenuButton = React.forwardRef(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();
  const button = /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      ...props
    }
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsx(TooltipContent, { side: "right", align: "center", hidden: state !== "collapsed" || isMobile, ...tooltip })
  ] });
});
SidebarMenuButton.displayName = "SidebarMenuButton";
const SidebarMenuAction = React.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      "data-sidebar": "menu-action",
      className: cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      ),
      ...props
    }
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";
const SidebarMenuBadge = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    "data-sidebar": "menu-badge",
    className: cn(
      "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className
    ),
    ...props
  }
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";
const SidebarMenuSkeleton = React.forwardRef(({ className, showIcon = false, ...props }, ref) => {
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return /* @__PURE__ */ jsxs("div", { ref, "data-sidebar": "menu-skeleton", className: cn("flex h-8 items-center gap-2 rounded-md px-2", className), ...props, children: [
    showIcon && /* @__PURE__ */ jsx(Skeleton, { className: "size-4 rounded-md", "data-sidebar": "menu-skeleton-icon" }),
    /* @__PURE__ */ jsx(
      Skeleton,
      {
        className: "h-4 max-w-(--skeleton-width) flex-1",
        "data-sidebar": "menu-skeleton-text",
        style: {
          "--skeleton-width": width
        }
      }
    )
  ] });
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
const SidebarMenuSub = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "ul",
  {
    ref,
    "data-sidebar": "menu-sub",
    className: cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className
    ),
    ...props
  }
));
SidebarMenuSub.displayName = "SidebarMenuSub";
const SidebarMenuSubItem = React.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx("li", { ref, ...props }));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
const SidebarMenuSubButton = React.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      "data-sidebar": "menu-sub-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-hidden ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
function AppContent({ variant = "header", children, ...props }) {
  if (variant === "sidebar") {
    return /* @__PURE__ */ jsx(SidebarInset, { ...props, children });
  }
  return /* @__PURE__ */ jsx("main", { className: "mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl", ...props, children });
}
function AppShell({ children, variant = "header" }) {
  const [isOpen, setIsOpen] = useState(() => typeof window !== "undefined" ? localStorage.getItem("sidebar") !== "false" : true);
  const handleSidebarChange = (open) => {
    setIsOpen(open);
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar", String(open));
    }
  };
  if (variant === "header") {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen w-full flex-col", children });
  }
  return /* @__PURE__ */ jsx(SidebarProvider, { defaultOpen: isOpen, open: isOpen, onOpenChange: handleSidebarChange, children });
}
function Icon({ iconNode: IconComponent, className, ...props }) {
  return /* @__PURE__ */ jsx(IconComponent, { className: cn("h-4 w-4", className), ...props });
}
const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;
function NavFooter({
  items,
  className,
  ...props
}) {
  const page = usePage();
  const isAnyActive = items.some((item) => page.url.startsWith(item.url));
  return /* @__PURE__ */ jsx(SidebarGroup, { ...props, className: `group-data-[collapsible=icon]:p-0 ${className || ""}`, children: /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(Collapsible, { defaultOpen: isAnyActive, className: "group/collapsible", children: /* @__PURE__ */ jsxs(SidebarMenuItem, { children: [
    /* @__PURE__ */ jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      SidebarMenuButton,
      {
        tooltip: "Settings",
        className: "text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100 cursor-pointer",
        children: [
          /* @__PURE__ */ jsx(Settings, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsx("span", { children: "Settings" }),
          /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(CollapsibleContent, { children: /* @__PURE__ */ jsx(SidebarMenuSub, { children: items.map((item) => /* @__PURE__ */ jsx(SidebarMenuSubItem, { children: /* @__PURE__ */ jsx(
      SidebarMenuSubButton,
      {
        asChild: true,
        isActive: page.url.startsWith(item.url),
        className: "text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100",
        children: /* @__PURE__ */ jsxs(Link, { href: item.url, prefetch: true, children: [
          item.icon && /* @__PURE__ */ jsx(Icon, { iconNode: item.icon, className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { children: item.title })
        ] })
      }
    ) }, item.title)) }) })
  ] }) }) }) }) });
}
function NavMain({ items = [] }) {
  const page = usePage();
  return /* @__PURE__ */ jsxs(SidebarGroup, { className: "px-2 py-0", children: [
    /* @__PURE__ */ jsx(SidebarGroupLabel, { children: "Platform" }),
    /* @__PURE__ */ jsx(SidebarMenu, { children: items.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(SidebarMenuButton, { asChild: true, isActive: item.url === page.url, children: item.target ? /* @__PURE__ */ jsxs("a", { href: item.url, target: item.target, rel: "noopener noreferrer", children: [
      item.icon && /* @__PURE__ */ jsx(item.icon, {}),
      /* @__PURE__ */ jsx("span", { children: item.title })
    ] }) : /* @__PURE__ */ jsxs(Link, { href: item.url, prefetch: true, children: [
      item.icon && /* @__PURE__ */ jsx(item.icon, {}),
      /* @__PURE__ */ jsx("span", { children: item.title })
    ] }) }) }, item.title)) })
  ] });
}
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Label, { ref, className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className), ...props }));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const Avatar = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(AvatarPrimitive.Root, { ref, className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className), ...props })
);
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(AvatarPrimitive.Image, { ref, className: cn("aspect-square h-full w-full", className), ...props })
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn("flex h-full w-full items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground", className),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
function useInitials() {
  const getInitials = (fullName) => {
    const names = fullName.trim().split(" ");
    if (names.length === 0) return "";
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
  };
  return getInitials;
}
function UserInfo({ user, showEmail = false }) {
  const getInitials = useInitials();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8 overflow-hidden rounded-full", children: [
      /* @__PURE__ */ jsx(AvatarImage, { src: user.avatar, alt: user.name }),
      /* @__PURE__ */ jsx(AvatarFallback, { className: "rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white", children: getInitials(user.name) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [
      /* @__PURE__ */ jsx("span", { className: "truncate font-medium", children: user.name }),
      showEmail && /* @__PURE__ */ jsx("span", { className: "text-muted-foreground truncate text-xs", children: user.email })
    ] })
  ] });
}
function useMobileNavigation() {
  const cleanup = useCallback(() => {
    document.body.style.removeProperty("pointer-events");
  }, []);
  return cleanup;
}
function UserMenuContent({ user }) {
  const cleanup = useMobileNavigation();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "p-0 font-normal", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm", children: /* @__PURE__ */ jsx(UserInfo, { user, showEmail: true }) }) }),
    /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
    /* @__PURE__ */ jsx(DropdownMenuGroup, { children: /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { className: "block w-full", href: route("profile.edit"), as: "button", prefetch: true, onClick: cleanup, children: [
      /* @__PURE__ */ jsx(Settings, { className: "mr-2" }),
      "Settings"
    ] }) }) }),
    /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
    /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { className: "block w-full", method: "post", href: route("logout"), as: "button", onClick: cleanup, children: [
      /* @__PURE__ */ jsx(LogOut, { className: "mr-2" }),
      "Log out"
    ] }) })
  ] });
}
function NavUser() {
  const { auth } = usePage().props;
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  return /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(SidebarMenuButton, { size: "lg", className: "text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent group", children: [
      /* @__PURE__ */ jsx(UserInfo, { user: auth.user }),
      /* @__PURE__ */ jsx(ChevronsUpDown, { className: "ml-auto size-4" })
    ] }) }),
    /* @__PURE__ */ jsx(
      DropdownMenuContent,
      {
        className: "w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg",
        align: "end",
        side: isMobile ? "bottom" : state === "collapsed" ? "left" : "bottom",
        children: /* @__PURE__ */ jsx(UserMenuContent, { user: auth.user })
      }
    )
  ] }) }) });
}
const prefersDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
const applyTheme = (appearance) => {
  const isDark = appearance === "dark" || appearance === "system" && prefersDark();
  document.documentElement.classList.toggle("dark", isDark);
};
window.matchMedia("(prefers-color-scheme: dark)");
let currentAppearance = typeof window !== "undefined" ? localStorage.getItem("appearance") || "system" : "system";
const listeners = /* @__PURE__ */ new Set();
function updateAppearance(mode) {
  currentAppearance = mode;
  localStorage.setItem("appearance", mode);
  applyTheme(mode);
  listeners.forEach((listener) => listener(mode));
}
function useAppearance() {
  const [appearance, setAppearance] = useState(currentAppearance);
  useEffect(() => {
    const listener = (value) => setAppearance(value);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);
  return { appearance, updateAppearance };
}
const logoDarkUrl = "/build/assets/logo-dark-C-flLQry.png";
const logoLightUrl = "/build/assets/logo-light-L1vTUok6.png";
const mainNavItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutGrid
  },
  {
    title: "Katalog",
    url: "/admin/books",
    icon: LayoutPanelTop
  },
  {
    title: "Berita",
    url: "/admin/news",
    icon: Newspaper
  },
  {
    title: "Kios & Preloved",
    url: "/admin/kios",
    icon: Store
  },
  {
    title: "Lihat Website",
    url: "/",
    icon: ExternalLink,
    target: "_blank"
  }
];
const footerNavItems = [
  {
    title: "Genre",
    url: "/admin/genres",
    icon: Folder
  },
  {
    title: "Author",
    url: "/admin/authors",
    icon: BookOpen
  },
  {
    title: "Series",
    url: "/admin/book-series",
    icon: BookOpen
  },
  {
    title: "Penerbit",
    url: "/admin/publishers",
    icon: BookOpen
  },
  {
    title: "Edisi",
    url: "/admin/editions",
    icon: BookOpen
  },
  {
    title: "Status Cerita",
    url: "/admin/story-statuses",
    icon: BookOpen
  },
  {
    title: "Toko Afiliasi",
    url: "/admin/affiliate-stores",
    icon: BookOpen
  },
  {
    title: "Toko Partner Kios",
    url: "/admin/kios-partners",
    icon: Store
  }
];
function AppSidebar() {
  const { appearance } = useAppearance();
  const isDark = appearance === "dark" || appearance === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return /* @__PURE__ */ jsxs(Sidebar, { collapsible: "icon", variant: "inset", children: [
    /* @__PURE__ */ jsx(SidebarHeader, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(SidebarMenuButton, { size: "lg", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: "/admin/dashboard", prefetch: true, children: /* @__PURE__ */ jsx(
      "img",
      {
        src: isDark ? logoDarkUrl : logoLightUrl,
        alt: "Norinoya Logo",
        className: "h-60 object-contain transition-transform  pt-6"
      }
    ) }) }) }) }) }),
    /* @__PURE__ */ jsx(SidebarContent, { children: /* @__PURE__ */ jsx(NavMain, { items: mainNavItems }) }),
    /* @__PURE__ */ jsxs(SidebarFooter, { children: [
      /* @__PURE__ */ jsx(NavFooter, { items: footerNavItems, className: "mt-auto" }),
      /* @__PURE__ */ jsx(NavUser, {})
    ] })
  ] });
}
const Breadcrumb = React.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx("nav", { ref, "aria-label": "breadcrumb", ...props }));
Breadcrumb.displayName = "Breadcrumb";
const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("ol", { ref, className: cn("flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5", className), ...props }));
BreadcrumbList.displayName = "BreadcrumbList";
const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("li", { ref, className: cn("inline-flex items-center gap-1.5", className), ...props }));
BreadcrumbItem.displayName = "BreadcrumbItem";
const BreadcrumbLink = React.forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsx(Comp, { ref, className: cn("transition-colors hover:text-foreground", className), ...props });
});
BreadcrumbLink.displayName = "BreadcrumbLink";
const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("span", { ref, role: "link", "aria-disabled": "true", "aria-current": "page", className: cn("font-normal text-foreground", className), ...props }));
BreadcrumbPage.displayName = "BreadcrumbPage";
const BreadcrumbSeparator = ({ children, className, ...props }) => /* @__PURE__ */ jsx("li", { role: "presentation", "aria-hidden": "true", className: cn("[&>svg]:h-3.5 [&>svg]:w-3.5", className), ...props, children: children ?? /* @__PURE__ */ jsx(ChevronRight, {}) });
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
function Breadcrumbs({ breadcrumbs: breadcrumbs2 }) {
  return /* @__PURE__ */ jsx(Fragment, { children: breadcrumbs2.length > 0 && /* @__PURE__ */ jsx(Breadcrumb, { children: /* @__PURE__ */ jsx(BreadcrumbList, { children: breadcrumbs2.map((item, index) => {
    const isLast = index === breadcrumbs2.length - 1;
    return /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(BreadcrumbItem, { children: isLast ? /* @__PURE__ */ jsx(BreadcrumbPage, { children: item.title }) : /* @__PURE__ */ jsx(BreadcrumbLink, { href: item.href, children: item.title }) }),
      !isLast && /* @__PURE__ */ jsx(BreadcrumbSeparator, {})
    ] }, index);
  }) }) }) });
}
function AppSidebarHeader({ breadcrumbs: breadcrumbs2 = [] }) {
  const { appearance, updateAppearance: updateAppearance2 } = useAppearance();
  const isDark = appearance === "dark" || appearance === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return /* @__PURE__ */ jsxs("header", { className: "border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(SidebarTrigger, { className: "-ml-1" }),
      /* @__PURE__ */ jsx(Breadcrumbs, { breadcrumbs: breadcrumbs2 })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => updateAppearance2(isDark ? "light" : "dark"),
        className: "ml-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-neutral-200/50 bg-neutral-100 text-neutral-800 shadow-3xs transition-all hover:bg-neutral-200 active:scale-95 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700",
        title: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
        children: isDark ? /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4 text-[#DA6B1C]" }) : /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4 text-[#112A12]" })
      }
    )
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group",
      icons: {
        success: /* @__PURE__ */ jsx(CircleCheck, { className: "h-4 w-4" }),
        info: /* @__PURE__ */ jsx(Info, { className: "h-4 w-4" }),
        warning: /* @__PURE__ */ jsx(TriangleAlert, { className: "h-4 w-4" }),
        error: /* @__PURE__ */ jsx(OctagonX, { className: "h-4 w-4" }),
        loading: /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" })
      },
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function AppSidebarLayout({ children, breadcrumbs: breadcrumbs2 = [] }) {
  const { flash } = usePage().props;
  useEffect(() => {
    if (flash == null ? void 0 : flash.success) {
      toast.success(flash.success);
    }
    if (flash == null ? void 0 : flash.error) {
      toast.error(flash.error);
    }
  }, [flash]);
  return /* @__PURE__ */ jsxs(AppShell, { variant: "sidebar", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "top-right", richColors: true }),
    /* @__PURE__ */ jsx(AppSidebar, {}),
    /* @__PURE__ */ jsxs(AppContent, { variant: "sidebar", children: [
      /* @__PURE__ */ jsx(AppSidebarHeader, { breadcrumbs: breadcrumbs2 }),
      children
    ] })
  ] });
}
const AppLayout = ({ children, breadcrumbs: breadcrumbs2, ...props }) => /* @__PURE__ */ jsx(AppSidebarLayout, { breadcrumbs: breadcrumbs2, ...props, children });
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const breadcrumbs$q = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Affiliate Stores",
    href: "/admin/affiliate-stores"
  },
  {
    title: "Tambah",
    href: "/admin/affiliate-stores/create"
  }
];
function CreateAffiliateStore() {
  const form = useForm({
    name: ""
  });
  const submit = (event) => {
    event.preventDefault();
    form.post(
      route("admin.affiliate-stores.store")
    );
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$q, children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah Affiliate Store" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Tambah Affiliate Store" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Tambahkan toko untuk link affiliate." })
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(
          Link,
          {
            href: route(
              "admin.affiliate-stores.index"
            ),
            children: "Kembali"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border bg-card p-6", children: /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: submit,
          className: "max-w-xl space-y-6",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Nama Toko" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "name",
                  value: form.data.name,
                  onChange: (event) => form.setData(
                    "name",
                    event.target.value
                  ),
                  placeholder: "Contoh: Tokopedia",
                  disabled: form.processing
                }
              ),
              form.errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.name })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                disabled: form.processing || !form.data.name.trim(),
                children: form.processing ? "Menyimpan..." : "Simpan Store"
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateAffiliateStore
}, Symbol.toStringTag, { value: "Module" }));
function EditAffiliateStore({
  affiliateStore
}) {
  const breadcrumbs2 = [
    {
      title: "Dashboard",
      href: "/dashboard"
    },
    {
      title: "Affiliate Stores",
      href: "/admin/affiliate-stores"
    },
    {
      title: "Edit",
      href: `/admin/affiliate-stores/${affiliateStore.id}/edit`
    }
  ];
  const form = useForm({
    name: affiliateStore.name
  });
  const submit = (event) => {
    event.preventDefault();
    form.put(
      route(
        "admin.affiliate-stores.update",
        affiliateStore.id
      )
    );
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs2, children: [
    /* @__PURE__ */ jsx(
      Head,
      {
        title: `Edit Affiliate Store - ${affiliateStore.name}`
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Edit Affiliate Store" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Perbarui informasi toko." })
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(
          Link,
          {
            href: route(
              "admin.affiliate-stores.index"
            ),
            children: "Kembali"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border bg-card p-6", children: /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: submit,
          className: "max-w-xl space-y-6",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Nama Toko" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "name",
                  value: form.data.name,
                  onChange: (event) => form.setData(
                    "name",
                    event.target.value
                  ),
                  disabled: form.processing
                }
              ),
              form.errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "slug", children: "Slug" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "slug",
                  value: affiliateStore.slug,
                  disabled: true
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Slug dibuat otomatis oleh sistem." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  disabled: form.processing || !form.data.name.trim(),
                  children: form.processing ? "Menyimpan..." : "Simpan Perubahan"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  asChild: true,
                  children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route(
                        "admin.affiliate-stores.index"
                      ),
                      children: "Batal"
                    }
                  )
                }
              )
            ] })
          ]
        }
      ) })
    ] })
  ] });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditAffiliateStore
}, Symbol.toStringTag, { value: "Module" }));
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Action,
  {
    ref,
    className: cn(buttonVariants(), className),
    ...props
  }
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    ),
    ...props
  }
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
const breadcrumbs$p = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Affiliate Stores",
    href: "/admin/affiliate-stores"
  }
];
function AffiliateStoreIndex({
  affiliateStores
}) {
  const [deleteStore, setDeleteStore] = useState(null);
  const handleDelete = () => {
    if (!deleteStore) {
      return;
    }
    router.delete(
      route(
        "admin.affiliate-stores.destroy",
        deleteStore.id
      ),
      {
        preserveScroll: true,
        onFinish: () => {
          setDeleteStore(null);
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$p, children: [
    /* @__PURE__ */ jsx(Head, { title: "Affiliate Stores" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Affiliate Stores" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Kelola toko untuk link affiliate buku." })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: route(
              "admin.affiliate-stores.create"
            ),
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "mr-2 size-4" }),
              "Tambah Store"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl border bg-card", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b bg-muted/40", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-medium", children: "#" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-medium", children: "Nama Toko" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-medium", children: "Slug" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right text-sm font-medium", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: affiliateStores.data.length > 0 ? affiliateStores.data.map(
          (store, index) => /* @__PURE__ */ jsxs(
            "tr",
            {
              className: "border-b last:border-0",
              children: [
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: (affiliateStores.current_page - 1) * affiliateStores.per_page + index + 1 }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm font-medium", children: store.name }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: store.slug }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "icon",
                      asChild: true,
                      children: /* @__PURE__ */ jsx(
                        Link,
                        {
                          href: route(
                            "admin.affiliate-stores.edit",
                            store.id
                          ),
                          children: /* @__PURE__ */ jsx(Pencil, { className: "size-4" })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "destructive",
                      size: "icon",
                      onClick: () => setDeleteStore(
                        store
                      ),
                      children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
                    }
                  )
                ] }) })
              ]
            },
            store.id
          )
        ) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
          "td",
          {
            colSpan: 4,
            className: "px-4 py-10 text-center text-sm text-muted-foreground",
            children: "Belum ada affiliate store."
          }
        ) }) })
      ] }) }) }),
      affiliateStores.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Menampilkan",
          " ",
          affiliateStores.data.length,
          " ",
          "dari ",
          affiliateStores.total,
          " ",
          "store."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          affiliateStores.current_page > 1 && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              asChild: true,
              children: /* @__PURE__ */ jsx(
                Link,
                {
                  href: route(
                    "admin.affiliate-stores.index",
                    {
                      page: affiliateStores.current_page - 1
                    }
                  ),
                  children: "Sebelumnya"
                }
              )
            }
          ),
          affiliateStores.current_page < affiliateStores.last_page && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              asChild: true,
              children: /* @__PURE__ */ jsx(
                Link,
                {
                  href: route(
                    "admin.affiliate-stores.index",
                    {
                      page: affiliateStores.current_page + 1
                    }
                  ),
                  children: "Berikutnya"
                }
              )
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      AlertDialog,
      {
        open: deleteStore !== null,
        onOpenChange: (open) => {
          if (!open) {
            setDeleteStore(null);
          }
        },
        children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Hapus Affiliate Store?" }),
            /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
              "Apakah Anda yakin ingin menghapus",
              " ",
              /* @__PURE__ */ jsx("strong", { children: deleteStore == null ? void 0 : deleteStore.name }),
              "?",
              /* @__PURE__ */ jsx("br", {}),
              "Store yang masih digunakan oleh affiliate link tidak dapat dihapus."
            ] })
          ] }),
          /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Batal" }),
            /* @__PURE__ */ jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                children: "Hapus"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AffiliateStoreIndex
}, Symbol.toStringTag, { value: "Module" }));
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
function AuthorForm({
  initialValues,
  submitLabel,
  onSubmit
}) {
  const form = useForm({
    name: (initialValues == null ? void 0 : initialValues.name) ?? "",
    biography: (initialValues == null ? void 0 : initialValues.biography) ?? ""
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Nama Author" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              value: form.data.name,
              onChange: (event) => form.setData(
                "name",
                event.target.value
              ),
              placeholder: "Contoh: Eiichiro Oda",
              disabled: form.processing
            }
          ),
          form.errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "biography", children: "Biografi" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "biography",
              value: form.data.biography,
              onChange: (event) => form.setData(
                "biography",
                event.target.value
              ),
              placeholder: "Biografi author...",
              rows: 6,
              disabled: form.processing
            }
          ),
          form.errors.biography && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.biography })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            disabled: form.processing || !form.data.name.trim(),
            children: form.processing ? "Menyimpan..." : submitLabel
          }
        ) })
      ]
    }
  );
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AuthorForm
}, Symbol.toStringTag, { value: "Module" }));
function CreateAuthor() {
  const breadcrumbs2 = [
    {
      title: "Dashboard",
      href: "/dashboard"
    },
    {
      title: "Authors",
      href: "/admin/authors"
    },
    {
      title: "Tambah Author",
      href: "/admin/authors/create"
    }
  ];
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs2, children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah Author" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Tambah Author" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Tambahkan author baru." })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            asChild: true,
            children: /* @__PURE__ */ jsx(
              Link,
              {
                href: route(
                  "admin.authors.index"
                ),
                children: "Kembali"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-lg border bg-card p-6", children: /* @__PURE__ */ jsx(
        AuthorForm,
        {
          submitLabel: "Simpan Author",
          onSubmit: (form) => {
            form.post(
              route(
                "admin.authors.store"
              )
            );
          }
        }
      ) })
    ] })
  ] });
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateAuthor
}, Symbol.toStringTag, { value: "Module" }));
function EditAuthor({
  author
}) {
  const breadcrumbs2 = [
    {
      title: "Dashboard",
      href: "/dashboard"
    },
    {
      title: "Authors",
      href: "/admin/authors"
    },
    {
      title: "Edit Author",
      href: `/admin/authors/${author.id}/edit`
    }
  ];
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs2, children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit ${author.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Edit Author" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Perbarui informasi author." })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            asChild: true,
            children: /* @__PURE__ */ jsx(
              Link,
              {
                href: route(
                  "admin.authors.index"
                ),
                children: "Kembali"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-lg border bg-card p-6", children: /* @__PURE__ */ jsx(
        AuthorForm,
        {
          submitLabel: "Simpan Perubahan",
          initialValues: {
            name: author.name,
            biography: author.biography ?? ""
          },
          onSubmit: (form) => {
            form.put(
              route(
                "admin.authors.update",
                author.id
              )
            );
          }
        }
      ) })
    ] })
  ] });
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditAuthor
}, Symbol.toStringTag, { value: "Module" }));
const Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
function AuthorIndex({
  authors
}) {
  const [deleteAuthor, setDeleteAuthor] = useState(null);
  const handleDelete = () => {
    if (!deleteAuthor) {
      return;
    }
    router.delete(
      route(
        "admin.authors.destroy",
        deleteAuthor.id
      ),
      {
        preserveScroll: true,
        onSuccess: () => {
          setDeleteAuthor(null);
        }
      }
    );
  };
  const breadcrumbs2 = [
    {
      title: "Dashboard",
      href: "/dashboard"
    },
    {
      title: "Authors",
      href: "/admin/authors"
    }
  ];
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs2, children: [
    /* @__PURE__ */ jsx(Head, { title: "Authors" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Authors" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Kelola author buku." })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: route(
              "admin.authors.create"
            ),
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
              "Tambah Author"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-lg border", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Nama Author" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Story" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Art" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: authors.data.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
          TableCell,
          {
            colSpan: 4,
            className: "h-24 text-center",
            children: "Belum ada author."
          }
        ) }) : authors.data.map(
          (author) => /* @__PURE__ */ jsxs(
            TableRow,
            {
              children: [
                /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: author.name }),
                /* @__PURE__ */ jsx(TableCell, { children: author.story_books_count ?? 0 }),
                /* @__PURE__ */ jsx(TableCell, { children: author.art_books_count ?? 0 }),
                /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      asChild: true,
                      children: /* @__PURE__ */ jsx(
                        Link,
                        {
                          href: route(
                            "admin.authors.edit",
                            author.id
                          ),
                          children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      onClick: () => setDeleteAuthor(
                        author
                      ),
                      children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" })
                    }
                  )
                ] }) })
              ]
            },
            author.id
          )
        ) })
      ] }) }),
      authors.last_page > 1 && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-1", children: authors.links.map(
        (link, index) => /* @__PURE__ */ jsx(
          Button,
          {
            variant: link.active ? "default" : "outline",
            size: "sm",
            disabled: !link.url,
            onClick: () => {
              if (link.url) {
                router.get(
                  link.url,
                  {},
                  {
                    preserveState: true,
                    preserveScroll: true
                  }
                );
              }
            },
            dangerouslySetInnerHTML: {
              __html: link.label
            }
          },
          `${link.label}-${index}`
        )
      ) })
    ] }),
    /* @__PURE__ */ jsx(
      AlertDialog,
      {
        open: Boolean(deleteAuthor),
        onOpenChange: (open) => {
          if (!open) {
            setDeleteAuthor(null);
          }
        },
        children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Hapus Author?" }),
            /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
              "Apakah Anda yakin ingin menghapus author",
              " ",
              /* @__PURE__ */ jsx("strong", { children: deleteAuthor == null ? void 0 : deleteAuthor.name }),
              "?",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("br", {}),
              "Author yang masih digunakan oleh buku tidak dapat dihapus."
            ] })
          ] }),
          /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Batal" }),
            /* @__PURE__ */ jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                children: "Hapus"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AuthorIndex
}, Symbol.toStringTag, { value: "Module" }));
function BookSeriesForm({
  initialValues,
  onSubmit,
  submitLabel
}) {
  const form = useForm({
    title: (initialValues == null ? void 0 : initialValues.title) ?? "",
    description: (initialValues == null ? void 0 : initialValues.description) ?? ""
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "title", children: "Nama Series" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "title",
              value: form.data.title,
              onChange: (event) => form.setData(
                "title",
                event.target.value
              ),
              placeholder: "Contoh: One Piece",
              disabled: form.processing
            }
          ),
          form.errors.title && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.title })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Deskripsi" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "description",
              value: form.data.description,
              onChange: (event) => form.setData(
                "description",
                event.target.value
              ),
              placeholder: "Deskripsi singkat mengenai series...",
              rows: 6,
              disabled: form.processing
            }
          ),
          form.errors.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.description })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end gap-3", children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            disabled: form.processing || !form.data.title.trim(),
            children: form.processing ? "Menyimpan..." : submitLabel
          }
        ) })
      ]
    }
  );
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BookSeriesForm
}, Symbol.toStringTag, { value: "Module" }));
function CreateBookSeries() {
  const breadcrumbs2 = [
    {
      title: "Dashboard",
      href: "/dashboard"
    },
    {
      title: "Book Series",
      href: "/admin/book-series"
    },
    {
      title: "Tambah Book Series",
      href: "/admin/book-series/create"
    }
  ];
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs2, children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah Series" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Tambah Series" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Tambahkan series buku baru." })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            asChild: true,
            children: /* @__PURE__ */ jsx(Link, { href: route("admin.book-series.index"), children: "Kembali" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-lg border bg-card p-6", children: /* @__PURE__ */ jsx(
        BookSeriesForm,
        {
          mode: "create",
          submitLabel: "Simpan Series",
          onSubmit: (form) => {
            form.post(
              route(
                "admin.book-series.store"
              )
            );
          }
        }
      ) })
    ] })
  ] });
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateBookSeries
}, Symbol.toStringTag, { value: "Module" }));
function EditBookSeries({
  series
}) {
  const breadcrumbs2 = [
    {
      title: "Dashboard",
      href: "/dashboard"
    },
    {
      title: "Book Series",
      href: "/admin/book-series"
    },
    {
      title: "Edit Book Series",
      href: `/admin/book-series/${series.id}/edit`
    }
  ];
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs2, children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit ${series.title}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Edit Series" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Perbarui informasi series." })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            asChild: true,
            children: /* @__PURE__ */ jsx(
              Link,
              {
                href: route(
                  "admin.book-series.index"
                ),
                children: "Kembali"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-lg border bg-card p-6", children: /* @__PURE__ */ jsx(
        BookSeriesForm,
        {
          mode: "edit",
          submitLabel: "Simpan Perubahan",
          initialValues: {
            title: series.title,
            description: series.description ?? ""
          },
          onSubmit: (form) => {
            form.put(
              route(
                "admin.book-series.update",
                series.id
              )
            );
          }
        }
      ) })
    ] })
  ] });
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditBookSeries
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$o = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Book Series",
    href: "/admin/book-series"
  }
];
function BookSeriesIndex({
  series,
  filters: rawFilters
}) {
  const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
  const [deleteSeries, setDeleteSeries] = useState(null);
  const [search, setSearch] = useState(filters.search || "");
  const [sort, setSort] = useState(filters.sort || "latest");
  const [perPage, setPerPage] = useState(
    String(filters.per_page || "15")
  );
  const lastAppliedSearch = useRef(filters.search || "");
  const applyFilters = (override) => {
    const payload = {
      search: (override == null ? void 0 : override.search) !== void 0 ? override.search : search,
      sort: (override == null ? void 0 : override.sort) !== void 0 ? override.sort : sort,
      per_page: (override == null ? void 0 : override.per_page) !== void 0 ? override.per_page : perPage
    };
    if (!payload.search) {
      delete payload.search;
    }
    if (payload.sort === "latest") {
      delete payload.sort;
    }
    if (payload.per_page === "15") {
      delete payload.per_page;
    }
    lastAppliedSearch.current = payload.search ?? "";
    router.get(route("admin.book-series.index"), payload, {
      preserveState: true,
      preserveScroll: true
    });
  };
  const applyFiltersRef = useRef(
    () => {
    }
  );
  applyFiltersRef.current = applyFilters;
  useEffect(() => {
    if (search === lastAppliedSearch.current) {
      return;
    }
    const timeout = setTimeout(() => {
      if (search === lastAppliedSearch.current) {
        return;
      }
      lastAppliedSearch.current = search;
      applyFiltersRef.current({ search });
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    lastAppliedSearch.current = search;
    applyFilters({ search });
  };
  const handleClearSearch = () => {
    setSearch("");
    lastAppliedSearch.current = "";
    applyFilters({ search: "" });
  };
  const handleSortChange = (value) => {
    setSort(value);
    applyFilters({ sort: value });
  };
  const handlePerPageChange = (value) => {
    setPerPage(value);
    applyFilters({ per_page: value });
  };
  const handleReset = () => {
    setSearch("");
    setSort("latest");
    setPerPage("15");
    lastAppliedSearch.current = "";
    router.get(
      route("admin.book-series.index"),
      {},
      {
        preserveScroll: true
      }
    );
  };
  const hasActiveFilters = Boolean(search) || sort !== "latest" || perPage !== "15";
  const handleDelete = () => {
    if (!deleteSeries) {
      return;
    }
    router.delete(
      route(
        "admin.book-series.destroy",
        deleteSeries.id
      ),
      {
        preserveScroll: true,
        onSuccess: () => {
          setDeleteSeries(null);
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$o, children: [
    /* @__PURE__ */ jsx(Head, { title: "Book Series" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Book Series" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Kelola series buku." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxs(
            "form",
            {
              onSubmit: handleSearchSubmit,
              className: "relative",
              children: [
                /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    placeholder: "Cari nama atau slug series...",
                    "aria-label": "Cari series",
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    className: "h-9 w-64 pl-9 pr-8 text-sm"
                  }
                ),
                search && /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Bersihkan pencarian",
                    onClick: handleClearSearch,
                    className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground",
                    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(ArrowUpDown, { className: "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: sort,
                onChange: (e) => handleSortChange(e.target.value),
                "aria-label": "Urutkan series",
                className: "h-9 cursor-pointer appearance-none rounded-md border border-input bg-background pr-3 pl-8 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-ring",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "latest", children: "Terbaru" }),
                  /* @__PURE__ */ jsx("option", { value: "oldest", children: "Terlama" }),
                  /* @__PURE__ */ jsx("option", { value: "title_asc", children: "Judul A–Z" }),
                  /* @__PURE__ */ jsx("option", { value: "title_desc", children: "Judul Z–A" }),
                  /* @__PURE__ */ jsx("option", { value: "books_desc", children: "Jumlah Buku" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: perPage,
              onChange: (e) => handlePerPageChange(e.target.value),
              "aria-label": "Jumlah data per halaman",
              className: "h-9 cursor-pointer rounded-md border border-input bg-background px-3 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-ring",
              children: [
                /* @__PURE__ */ jsx("option", { value: "15", children: "15 / halaman" }),
                /* @__PURE__ */ jsx("option", { value: "25", children: "25 / halaman" }),
                /* @__PURE__ */ jsx("option", { value: "50", children: "50 / halaman" }),
                /* @__PURE__ */ jsx("option", { value: "100", children: "100 / halaman" })
              ]
            }
          ),
          hasActiveFilters && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleReset,
              className: "h-9 text-xs font-bold",
              children: "Reset"
            }
          ),
          /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(
            Link,
            {
              href: route(
                "admin.book-series.create"
              ),
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
                "Tambah Series"
              ]
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-lg border", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Series" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Slug" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Jumlah Buku" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: series.data.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
          TableCell,
          {
            colSpan: 4,
            className: "h-24 text-center",
            children: filters.search ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 py-2", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Tidak ada series yang cocok dengan “",
                filters.search,
                "”."
              ] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: handleClearSearch,
                  children: "Reset Pencarian"
                }
              )
            ] }) : "Belum ada series."
          }
        ) }) : series.data.map(
          (item) => /* @__PURE__ */ jsxs(
            TableRow,
            {
              children: [
                /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "block max-w-[320px] truncate",
                    title: item.title,
                    children: item.title
                  }
                ) }),
                /* @__PURE__ */ jsx(TableCell, { className: "text-muted-foreground", children: /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "block max-w-[240px] truncate",
                    title: item.slug,
                    children: item.slug
                  }
                ) }),
                /* @__PURE__ */ jsx(TableCell, { children: item.books_count ?? 0 }),
                /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      asChild: true,
                      title: "Edit series",
                      "aria-label": `Edit ${item.title}`,
                      children: /* @__PURE__ */ jsx(
                        Link,
                        {
                          href: route(
                            "admin.book-series.edit",
                            item.id
                          ),
                          children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      disabled: (item.books_count ?? 0) > 0,
                      title: (item.books_count ?? 0) > 0 ? "Tidak dapat dihapus: series masih memiliki buku" : "Hapus series",
                      "aria-label": `Hapus ${item.title}`,
                      onClick: () => setDeleteSeries(
                        item
                      ),
                      children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" })
                    }
                  )
                ] }) })
              ]
            },
            item.id
          )
        ) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Menampilkan ",
          series.from ?? 0,
          "–",
          series.to ?? 0,
          " dari",
          " ",
          series.total.toLocaleString("id-ID"),
          " ",
          "series",
          filters.search ? ` untuk pencarian “${filters.search}”` : "",
          "."
        ] }),
        series.last_page > 1 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-1", children: series.links.map(
          (link, index) => {
            const label = link.label.replace(
              "&laquo; Previous",
              "Sebelumnya"
            ).replace(
              "Previous",
              "Sebelumnya"
            ).replace(
              "Next &raquo;",
              "Berikutnya"
            ).replace(
              "Next",
              "Berikutnya"
            );
            if (!link.url && link.label === "...") {
              return /* @__PURE__ */ jsx(
                "span",
                {
                  className: "px-2 text-sm text-muted-foreground",
                  children: "…"
                },
                `ellipsis-${index}`
              );
            }
            if (!link.url) {
              return /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  disabled: true,
                  children: label
                },
                `${link.label}-${index}`
              );
            }
            return /* @__PURE__ */ jsx(
              Button,
              {
                variant: link.active ? "default" : "outline",
                size: "sm",
                asChild: true,
                children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: link.url,
                    preserveScroll: true,
                    preserveState: true,
                    children: label
                  }
                )
              },
              `${link.label}-${index}`
            );
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      AlertDialog,
      {
        open: Boolean(deleteSeries),
        onOpenChange: (open) => {
          if (!open) {
            setDeleteSeries(null);
          }
        },
        children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Hapus Series?" }),
            /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
              "Apakah Anda yakin ingin menghapus series",
              " ",
              /* @__PURE__ */ jsx("strong", { children: deleteSeries == null ? void 0 : deleteSeries.title }),
              "?",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("br", {}),
              "Series yang masih memiliki buku tidak dapat dihapus."
            ] })
          ] }),
          /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Batal" }),
            /* @__PURE__ */ jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                children: "Hapus"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BookSeriesIndex
}, Symbol.toStringTag, { value: "Module" }));
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = React.forwardRef(
  ({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, role: "alert", className: cn(alertVariants({ variant }), className), ...props })
);
Alert.displayName = "Alert";
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("h5", { ref, className: cn("mb-1 font-medium leading-none tracking-tight", className), ...props }));
AlertTitle.displayName = "AlertTitle";
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("text-sm [&_p]:leading-relaxed", className), ...props }));
AlertDescription.displayName = "AlertDescription";
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
const Dialog = SheetPrimitive.Root;
const DialogTrigger = SheetPrimitive.Trigger;
const DialogPortal = SheetPrimitive.Portal;
const DialogClose = SheetPrimitive.Close;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = SheetPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = SheetPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = SheetPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = SheetPrimitive.Description.displayName;
const Command = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = Command$1.displayName;
const CommandInput = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsx(
    Command$1.Input,
    {
      ref,
      className: cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = Command$1.Input.displayName;
const CommandList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = Command$1.List.displayName;
const CommandEmpty = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(
  Command$1.Empty,
  {
    ref,
    className: "py-6 text-center text-sm",
    ...props
  }
));
CommandEmpty.displayName = Command$1.Empty.displayName;
const CommandGroup = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = Command$1.Group.displayName;
const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = Command$1.Separator.displayName;
const CommandItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    ),
    ...props
  }
));
CommandItem.displayName = Command$1.Item.displayName;
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const MultiSelectContext = React.createContext(void 0);
function useMultiSelect() {
  const context = React.useContext(MultiSelectContext);
  if (!context) {
    throw new Error("MultiSelect components must be used within a MultiSelect");
  }
  return context;
}
function MultiSelect({
  children,
  options: optionsProp,
  selected: selectedProp,
  values: valuesProp,
  value: valueProp,
  onChange: onChangeProp,
  onValuesChange: onValuesChangeProp,
  onValueChange: onValueChangeProp,
  className
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const selected = selectedProp ?? valuesProp ?? valueProp ?? [];
  const onChange = (newValues) => {
    if (onChangeProp) onChangeProp(newValues);
    if (onValuesChangeProp) onValuesChangeProp(newValues);
    if (onValueChangeProp) onValueChangeProp(newValues);
  };
  const registerOption = React.useCallback((option) => {
    setOptions((prev) => {
      if (prev.some((o) => o.value === option.value)) return prev;
      return [...prev, option];
    });
  }, []);
  const labelFor = React.useCallback(
    (value) => {
      var _a, _b;
      return ((_a = optionsProp == null ? void 0 : optionsProp.find((option) => option.value === value)) == null ? void 0 : _a.label) ?? ((_b = options.find((option) => option.value === value)) == null ? void 0 : _b.label) ?? value;
    },
    [options, optionsProp]
  );
  return /* @__PURE__ */ jsx(MultiSelectContext.Provider, { value: { selected, onChange, open, setOpen, options, registerOption, labelFor }, children: /* @__PURE__ */ jsx(Popover, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsx("div", { className: cn("w-full", className), children }) }) });
}
function MultiSelectTrigger({
  className,
  placeholder = "Pilih opsi...",
  children,
  id,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  "aria-required": ariaRequired
}) {
  const { selected, onChange, open, setOpen, options, labelFor } = useMultiSelect();
  const handleUnselect = (item) => {
    onChange(selected.filter((i) => i !== item));
  };
  return /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
    Button,
    {
      id,
      variant: "outline",
      role: "combobox",
      "aria-expanded": open,
      "aria-invalid": ariaInvalid,
      "aria-describedby": ariaDescribedBy,
      "aria-required": ariaRequired,
      className: cn(
        "w-full justify-between h-auto min-h-10 px-3 py-2 hover:bg-background",
        className
      ),
      onClick: () => setOpen(!open),
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex gap-1 flex-wrap items-center", children: children ? children : selected.length > 0 ? selected.map((item) => {
          const option = options.find((o) => o.value === item);
          const IconComponent = option == null ? void 0 : option.icon;
          return /* @__PURE__ */ jsxs(
            Badge,
            {
              variant: "secondary",
              className: "flex items-center gap-1 px-2 py-0.5",
              onClick: (e) => {
                e.stopPropagation();
                handleUnselect(item);
              },
              children: [
                IconComponent && /* @__PURE__ */ jsx(IconComponent, { className: "h-3 w-3 text-muted-foreground" }),
                labelFor(item),
                /* @__PURE__ */ jsx(X, { className: "h-3 w-3 text-muted-foreground hover:text-foreground cursor-pointer" })
              ]
            },
            item
          );
        }) : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground font-normal", children: placeholder }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 shrink-0 ml-2", children: [
          selected.length > 0 && /* @__PURE__ */ jsx(
            XCircle,
            {
              className: "h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
                onChange([]);
              }
            }
          ),
          /* @__PURE__ */ jsx(ChevronsUpDown, { className: "h-4 w-4 shrink-0 opacity-50" })
        ] })
      ]
    }
  ) });
}
function MultiSelectValue({ placeholder }) {
  const { selected, labelFor } = useMultiSelect();
  if (selected.length === 0) return /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: placeholder });
  return /* @__PURE__ */ jsx("span", { children: selected.map((value) => labelFor(value)).join(", ") });
}
function MultiSelectContent({ children }) {
  return /* @__PURE__ */ jsx(PopoverContent, { className: "w-(--radix-popover-trigger-width) p-0", align: "start", children: /* @__PURE__ */ jsx(Command, { children }) });
}
function MultiSelectGroup({ children, heading }) {
  return /* @__PURE__ */ jsx(CommandGroup, { heading, children });
}
function MultiSelectItem({
  value,
  label,
  icon: Icon2,
  children
}) {
  const { selected, onChange, setOpen, registerOption } = useMultiSelect();
  const isSelected = selected.includes(value);
  const itemLabel = label || (typeof children === "string" ? children : value);
  React.useEffect(() => {
    registerOption({ value, label: itemLabel, icon: Icon2 });
  }, [value, itemLabel, Icon2, registerOption]);
  return /* @__PURE__ */ jsxs(
    CommandItem,
    {
      onSelect: () => {
        if (isSelected) {
          onChange(selected.filter((item) => item !== value));
        } else {
          onChange([...selected, value]);
        }
        setOpen(true);
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
              isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
            ),
            children: /* @__PURE__ */ jsx(Check, { className: cn("h-4 w-4") })
          }
        ),
        Icon2 && /* @__PURE__ */ jsx(Icon2, { className: "mr-2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx("span", { children: children || label || value })
      ]
    }
  );
}
function MultiSelectSearch({ placeholder = "Cari..." }) {
  return /* @__PURE__ */ jsx(CommandInput, { placeholder });
}
function MultiSelectList({ children }) {
  return /* @__PURE__ */ jsxs(CommandList, { children: [
    /* @__PURE__ */ jsx(CommandEmpty, { children: "Tidak ada hasil ditemukan." }),
    children
  ] });
}
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, { ref, className: cn("flex cursor-default items-center justify-center py-1", className), ...props, children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" }) }));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, { ref, className: cn("flex cursor-default items-center justify-center py-1", className), ...props, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" }) }));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, { ref, className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className), ...props })
);
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      ref,
      className: cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    }
  )
);
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const isValidUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};
const buildSlugPreview = (title, volume) => {
  return `${title}-volume-${volume}`.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "");
};
const validateBook = (form, existingVolumes) => {
  const nextErrors = {};
  if (!form.title.trim()) {
    nextErrors.title = "Judul buku wajib diisi.";
  }
  if (!form.volume.trim()) {
    nextErrors.volume = "Volume wajib diisi.";
  } else if (form.volume.trim().length > 50) {
    nextErrors.volume = "Volume maksimal 50 karakter.";
  } else if (existingVolumes.includes(form.volume.trim())) {
    nextErrors.volume = "Volume ini sudah ada dalam series yang sama.";
  }
  if (!form.edition_id) {
    nextErrors.edition_id = "Edisi cetakan wajib dipilih.";
  }
  if (!form.book_type) {
    nextErrors.book_type = "Tipe buku wajib dipilih.";
  }
  if (!form.story_status_id) {
    nextErrors.story_status_id = "Status cerita wajib dipilih.";
  }
  if (!form.age_rating) {
    nextErrors.age_rating = "Rating umur wajib dipilih.";
  }
  if (!form.publisher_id) {
    nextErrors.publisher_id = "Penerbit wajib dipilih.";
  }
  if (!form.synopsis.trim()) {
    nextErrors.synopsis = "Sinopsis wajib diisi.";
  }
  if (!form.msrp.trim()) {
    nextErrors.msrp = "Harga MSRP wajib diisi.";
  } else if (!Number.isFinite(Number(form.msrp)) || Number(form.msrp) < 0) {
    nextErrors.msrp = "Harga MSRP harus berupa angka minimal 0.";
  }
  if (form.news_link.trim() && !isValidUrl(form.news_link.trim())) {
    nextErrors.news_link = "Link berita tidak valid.";
  }
  if (form.images.length > 5) {
    nextErrors.images = "Maksimal 5 gambar.";
  }
  form.images.forEach((image, index) => {
    const url = image.image_url.trim();
    if (url && !isValidUrl(url)) {
      nextErrors[`images.${index}.image_url`] = "URL gambar tidak valid.";
    }
  });
  if (form.tiktok_embeds.length > 10) {
    nextErrors.tiktok_embeds = "Maksimal 10 video TikTok.";
  }
  form.tiktok_embeds.forEach((embed, index) => {
    const url = (embed.embed_url || embed.url_video || "").trim();
    if (url && !isValidUrl(url)) {
      nextErrors[`tiktok_embeds.${index}.url_video`] = "URL TikTok tidak valid.";
    }
  });
  form.affiliate_links.forEach((link, index) => {
    const hasStore = Boolean(link.affiliate_store_id);
    const url = link.url.trim();
    if ((hasStore || url) && !hasStore) {
      nextErrors[`affiliate_links.${index}.affiliate_store_id`] = "Toko affiliate wajib dipilih.";
    }
    if ((hasStore || url) && !url) {
      nextErrors[`affiliate_links.${index}.url`] = "URL affiliate wajib diisi.";
    } else if (url && !isValidUrl(url)) {
      nextErrors[`affiliate_links.${index}.url`] = "URL affiliate tidak valid.";
    }
  });
  return nextErrors;
};
const normalizeServerErrors = (serverErrors, maps) => {
  const normalized = {};
  for (const [key, message] of Object.entries(serverErrors)) {
    const imageMatch = key.match(/^images\.(\d+)\.([\w.]+)$/);
    if (imageMatch) {
      const payloadIndex = Number(imageMatch[1]);
      const formIndex = maps.images[payloadIndex] ?? payloadIndex;
      normalized[`images.${formIndex}.${imageMatch[2]}`] = message;
      continue;
    }
    const tiktokMatch = key.match(/^tiktok_embeds\.(\d+)\.([\w.]+)$/);
    if (tiktokMatch) {
      const payloadIndex = Number(tiktokMatch[1]);
      const formIndex = maps.tiktok_embeds[payloadIndex] ?? payloadIndex;
      normalized[`tiktok_embeds.${formIndex}.${tiktokMatch[2]}`] = message;
      continue;
    }
    const affiliateMatch = key.match(/^affiliate_links\.(\d+)\.([\w.]+)$/);
    if (affiliateMatch) {
      const payloadIndex = Number(affiliateMatch[1]);
      const formIndex = maps.affiliate_links[payloadIndex] ?? payloadIndex;
      normalized[`affiliate_links.${formIndex}.${affiliateMatch[2]}`] = message;
      continue;
    }
    normalized[key] = message;
  }
  return normalized;
};
function FieldError({ field, errors }) {
  const message = errors[field];
  if (!message) {
    return null;
  }
  return /* @__PURE__ */ jsx("p", { id: `${field}-error`, className: "text-destructive text-sm", children: message });
}
function BookForm({
  mode,
  book,
  series,
  editions,
  storyStatuses,
  publishers,
  authors,
  genres,
  affiliateStores,
  bookTypes,
  ageRatings,
  existingVolumes,
  processing,
  errors,
  onSubmit
}) {
  var _a, _b, _c, _d, _e, _f;
  const [localErrors, setLocalErrors] = useState({});
  const [clearedFields, setClearedFields] = useState(/* @__PURE__ */ new Set());
  const [submissionMaps, setSubmissionMaps] = useState({
    images: [],
    tiktok_embeds: [],
    affiliate_links: []
  });
  const formRef = useRef(null);
  const errorSummaryRef = useRef(null);
  const normalizedServerErrors = useMemo(() => normalizeServerErrors(errors, submissionMaps), [errors, submissionMaps]);
  const activeErrors = useMemo(() => {
    const merged = {
      ...normalizedServerErrors,
      ...localErrors
    };
    return Object.fromEntries(Object.entries(merged).filter(([key, message]) => Boolean(message) && !clearedFields.has(key)));
  }, [clearedFields, localErrors, normalizedServerErrors]);
  const errorCount = Object.keys(activeErrors).length;
  const clearFieldError = (field) => {
    setLocalErrors((previous) => ({
      ...previous,
      [field]: ""
    }));
    setClearedFields((previous) => {
      const next = new Set(previous);
      next.add(field);
      return next;
    });
  };
  const clearErrorPrefix = (prefix) => {
    setLocalErrors((previous) => {
      const next = { ...previous };
      for (const key of Object.keys(next)) {
        if (key === prefix || key.startsWith(`${prefix}.`)) {
          next[key] = "";
        }
      }
      return next;
    });
    setClearedFields((previous) => {
      const next = new Set(previous);
      next.add(prefix);
      for (const key of Object.keys(activeErrors)) {
        if (key.startsWith(`${prefix}.`)) {
          next.add(key);
        }
      }
      return next;
    });
  };
  const REQUIRED_FIELDS = /* @__PURE__ */ new Set([
    "title",
    "volume",
    "edition_id",
    "book_type",
    "story_status_id",
    "age_rating",
    "publisher_id",
    "synopsis",
    "msrp"
  ]);
  const getFieldProps = (field, alternateFields = [], baseClassName) => {
    const errorFields = [field, ...alternateFields].filter((candidate) => Boolean(activeErrors[candidate]));
    const hasError = errorFields.length > 0;
    const isRequired = REQUIRED_FIELDS.has(field) || alternateFields.some((candidate) => REQUIRED_FIELDS.has(candidate));
    return {
      "aria-invalid": hasError || void 0,
      "aria-required": isRequired || void 0,
      "aria-describedby": hasError ? errorFields.map((candidate) => `${candidate}-error`).join(" ") : void 0,
      className: cn(baseClassName, hasError && "border-destructive")
    };
  };
  const [form, setForm] = useState({
    title: (book == null ? void 0 : book.title) ?? "",
    series_id: (book == null ? void 0 : book.series_id) ? String(book.series_id) : "",
    volume: (book == null ? void 0 : book.volume) ? String(book.volume) : "",
    edition_id: (book == null ? void 0 : book.edition_id) ? String(book.edition_id) : "",
    book_type: (book == null ? void 0 : book.book_type) ?? "",
    story_status_id: (book == null ? void 0 : book.story_status_id) ? String(book.story_status_id) : "",
    age_rating: (book == null ? void 0 : book.age_rating) ?? "",
    publisher_id: (book == null ? void 0 : book.publisher_id) ? String(book.publisher_id) : "",
    synopsis: (book == null ? void 0 : book.synopsis) ?? "",
    short_description: (book == null ? void 0 : book.short_description) ?? "",
    news_link: (book == null ? void 0 : book.news_link) ?? "",
    msrp: (book == null ? void 0 : book.msrp) !== void 0 && (book == null ? void 0 : book.msrp) !== null ? String(book.msrp) : "",
    isbn: (book == null ? void 0 : book.isbn) ?? "",
    page_count: (book == null ? void 0 : book.page_count) !== void 0 && (book == null ? void 0 : book.page_count) !== null ? String(book.page_count) : "",
    paper_type: (book == null ? void 0 : book.paper_type) ?? "",
    dimensions: (book == null ? void 0 : book.dimensions) ?? "",
    adaptation: (book == null ? void 0 : book.adaptation) ?? "",
    is_upcoming: Boolean(book == null ? void 0 : book.is_upcoming),
    images: ((_a = book == null ? void 0 : book.images) == null ? void 0 : _a.map((image) => ({
      id: image.id,
      image_url: image.image_url,
      sort_order: image.sort_order
    }))) ?? [
      {
        image_url: ""
      }
    ],
    tiktok_embeds: ((_b = book == null ? void 0 : book.tiktok_embeds) == null ? void 0 : _b.map((embed) => ({
      id: embed.id,
      name: embed.name ?? "",
      embed_url: embed.embed_url ?? embed.url_video ?? "",
      url_video: embed.url_video ?? embed.embed_url ?? ""
    }))) ?? [
      {
        name: "",
        embed_url: "",
        url_video: ""
      }
    ],
    story_authors: ((_c = book == null ? void 0 : book.story_authors) == null ? void 0 : _c.map(String)) ?? [],
    art_authors: ((_d = book == null ? void 0 : book.art_authors) == null ? void 0 : _d.map(String)) ?? [],
    genres: ((_e = book == null ? void 0 : book.genres) == null ? void 0 : _e.map(String)) ?? [],
    affiliate_links: ((_f = book == null ? void 0 : book.affiliate_links) == null ? void 0 : _f.map((link) => ({
      id: link.id,
      affiliate_store_id: String(link.affiliate_store_id),
      store_name: link.store_name ?? "Official Store",
      location: link.location ?? "Indonesia",
      url: link.url
    }))) ?? [
      {
        affiliate_store_id: "",
        store_name: "Official Store",
        location: "Indonesia",
        url: ""
      }
    ]
  });
  useEffect(() => {
    if (form.images.length === 0) {
      setForm((previous) => ({
        ...previous,
        images: [
          {
            image_url: ""
          }
        ]
      }));
    }
  }, [form.images.length]);
  const updateField = (field, value) => {
    clearFieldError(field);
    setForm((previous) => ({
      ...previous,
      [field]: value
    }));
  };
  const addImage = () => {
    if (form.images.length >= 5) {
      return;
    }
    clearErrorPrefix("images");
    setForm((previous) => ({
      ...previous,
      images: [
        ...previous.images,
        {
          image_url: ""
        }
      ]
    }));
  };
  const removeImage = (index) => {
    clearErrorPrefix("images");
    setForm((previous) => ({
      ...previous,
      images: previous.images.filter((_, imageIndex) => imageIndex !== index)
    }));
  };
  const updateImage = (index, value) => {
    clearFieldError(`images.${index}.image_url`);
    setForm((previous) => ({
      ...previous,
      images: previous.images.map(
        (image, imageIndex) => imageIndex === index ? {
          ...image,
          image_url: value
        } : image
      )
    }));
  };
  const cleanTikTokUrl = (url) => {
    if (!url) return "";
    const trimmed = url.trim();
    const match = trimmed.match(/^(https?:\/\/(?:[a-zA-Z0-9-]+\.)?tiktok\.com\/@[^/]+\/(?:video|photo)\/\d+)/i);
    if (match && match[1]) {
      return match[1];
    }
    if (trimmed.includes("tiktok.com") && (trimmed.includes("?") || trimmed.includes("#"))) {
      return trimmed.split("?")[0].split("#")[0];
    }
    return trimmed;
  };
  const addTiktokEmbed = () => {
    if (form.tiktok_embeds.length >= 10) {
      return;
    }
    clearErrorPrefix("tiktok_embeds");
    setForm((previous) => ({
      ...previous,
      tiktok_embeds: [
        ...previous.tiktok_embeds,
        {
          name: "",
          embed_url: "",
          url_video: ""
        }
      ]
    }));
  };
  const removeTiktokEmbed = (index) => {
    clearErrorPrefix("tiktok_embeds");
    setForm((previous) => ({
      ...previous,
      tiktok_embeds: previous.tiktok_embeds.filter((_, embedIndex) => embedIndex !== index)
    }));
  };
  const updateTiktokEmbed = (index, field, value) => {
    if (field === "embed_url" || field === "url_video") {
      clearFieldError(`tiktok_embeds.${index}.url_video`);
      clearFieldError(`tiktok_embeds.${index}.embed_url`);
    } else {
      clearFieldError(`tiktok_embeds.${index}.${field}`);
    }
    let finalValue = value;
    if (field === "embed_url" || field === "url_video") {
      finalValue = cleanTikTokUrl(value);
    }
    setForm((previous) => ({
      ...previous,
      tiktok_embeds: previous.tiktok_embeds.map(
        (embed, embedIndex) => embedIndex === index ? {
          ...embed,
          [field]: finalValue,
          ...field === "embed_url" || field === "url_video" ? {
            embed_url: finalValue,
            url_video: finalValue
          } : {}
        } : embed
      )
    }));
  };
  const addAffiliateLink = () => {
    clearErrorPrefix("affiliate_links");
    setForm((previous) => ({
      ...previous,
      affiliate_links: [
        ...previous.affiliate_links,
        {
          affiliate_store_id: "",
          store_name: "Official Store",
          location: "Indonesia",
          url: ""
        }
      ]
    }));
  };
  const removeAffiliateLink = (index) => {
    clearErrorPrefix("affiliate_links");
    setForm((previous) => ({
      ...previous,
      affiliate_links: previous.affiliate_links.filter((_, linkIndex) => linkIndex !== index)
    }));
  };
  const updateAffiliateLink = (index, field, value) => {
    clearFieldError(`affiliate_links.${index}.${field}`);
    setForm((previous) => ({
      ...previous,
      affiliate_links: previous.affiliate_links.map(
        (link, linkIndex) => linkIndex === index ? {
          ...link,
          [field]: value
        } : link
      )
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateBook(form, existingVolumes);
    setClearedFields(/* @__PURE__ */ new Set());
    setLocalErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    const imagesPayload = [];
    const imageMap = [];
    form.images.forEach((image, index) => {
      const imageUrl = image.image_url.trim();
      if (imageUrl !== "") {
        imagesPayload.push({
          ...image,
          image_url: imageUrl
        });
        imageMap.push(index);
      }
    });
    const tiktokPayload = [];
    const tiktokMap = [];
    form.tiktok_embeds.forEach((embed, index) => {
      const url = (embed.embed_url || embed.url_video || "").trim();
      if (url !== "") {
        tiktokPayload.push({
          ...embed,
          embed_url: url,
          url_video: url
        });
        tiktokMap.push(index);
      }
    });
    const affiliatePayload = [];
    const affiliateMap = [];
    form.affiliate_links.forEach((link, index) => {
      const url = link.url.trim();
      if (link.affiliate_store_id !== "" || url !== "") {
        affiliatePayload.push({
          ...link,
          url
        });
        affiliateMap.push(index);
      }
    });
    setSubmissionMaps({
      images: imageMap,
      tiktok_embeds: tiktokMap,
      affiliate_links: affiliateMap
    });
    setLocalErrors({});
    onSubmit({
      ...form,
      images: imagesPayload,
      tiktok_embeds: tiktokPayload,
      affiliate_links: affiliatePayload
    });
  };
  useEffect(() => {
    if (errorCount === 0) {
      return;
    }
    const timer = window.setTimeout(() => {
      var _a2, _b2;
      const firstInvalid = (_a2 = formRef.current) == null ? void 0 : _a2.querySelector('[aria-invalid="true"]');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
        firstInvalid.focus({ preventScroll: true });
      } else {
        (_b2 = errorSummaryRef.current) == null ? void 0 : _b2.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }, 80);
    return () => window.clearTimeout(timer);
  }, [activeErrors, errorCount]);
  const authorOptions = useMemo(
    () => authors.map((author) => ({
      value: String(author.id),
      label: author.name ?? String(author.id)
    })),
    [authors]
  );
  const genreOptions = useMemo(
    () => genres.map((genre) => ({
      value: String(genre.id),
      label: genre.name ?? String(genre.id)
    })),
    [genres]
  );
  return /* @__PURE__ */ jsxs("form", { ref: formRef, onSubmit: handleSubmit, className: "space-y-6", noValidate: true, children: [
    errorCount > 0 && /* @__PURE__ */ jsxs(Alert, { ref: errorSummaryRef, variant: "destructive", children: [
      /* @__PURE__ */ jsxs(AlertTitle, { children: [
        "Terdapat ",
        errorCount,
        " kesalahan pada formulir"
      ] }),
      /* @__PURE__ */ jsx(AlertDescription, { children: "Periksa kembali kolom yang ditandai merah sebelum menyimpan." })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Informasi Buku" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Informasi utama mengenai buku." })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "title", children: [
            "Judul Buku",
            " ",
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "title",
              ...getFieldProps("title"),
              value: form.title,
              onChange: (event) => updateField("title", event.target.value),
              placeholder: "Masukkan judul buku"
            }
          ),
          /* @__PURE__ */ jsx(FieldError, { field: "title", errors: activeErrors })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Series" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: form.series_id || "none",
                onValueChange: (value) => updateField("series_id", value === "none" ? "" : value),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { ...getFieldProps("series_id"), children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih series" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "Tidak ada" }),
                    series.map((item) => /* @__PURE__ */ jsx(SelectItem, { value: String(item.id), children: item.title || item.name }, item.id))
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx(FieldError, { field: "series_id", errors: activeErrors })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "volume", children: [
              "Volume",
              " ",
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "volume",
                ...getFieldProps("volume"),
                type: "text",
                value: form.volume,
                onChange: (event) => updateField("volume", event.target.value),
                placeholder: "Contoh: 1, 16.5, Limited Edition"
              }
            ),
            /* @__PURE__ */ jsx(FieldError, { field: "volume", errors: activeErrors }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs", children: "Volume tidak boleh sama dalam series yang sama. Boleh berupa angka (mis. 1, 16.5) atau teks (mis. Limited Edition)." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-dashed bg-neutral-50/60 p-3.5 dark:bg-neutral-900/40", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-[11px] font-semibold tracking-wide uppercase", children: "Slug URL" }),
            mode === "edit" && (book == null ? void 0 : book.slug) && /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground max-w-full truncate font-mono text-[11px]", children: [
              "Sebelumnya: ",
              book.slug
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 truncate font-mono text-sm", children: [
            "/buku/",
            buildSlugPreview(form.title, form.volume) || "…"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1 text-xs", children: "Slug dibentuk dari judul dan volume, lalu diperbarui otomatis saat formulir disimpan sehingga URL selalu mengikuti judul terbaru." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { children: [
              "Edisi Cetakan",
              " ",
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(Select, { value: form.edition_id, onValueChange: (value) => updateField("edition_id", value), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { ...getFieldProps("edition_id"), children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih edisi" }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: editions.map((item) => /* @__PURE__ */ jsx(SelectItem, { value: String(item.id), children: item.name }, item.id)) })
            ] }),
            /* @__PURE__ */ jsx(FieldError, { field: "edition_id", errors: activeErrors })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { children: [
              "Tipe Buku",
              " ",
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(Select, { value: form.book_type, onValueChange: (value) => updateField("book_type", value), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { ...getFieldProps("book_type"), children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih tipe buku" }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: (bookTypes && bookTypes.length > 0 ? bookTypes : [
                // Nilai (bukan sekadar label) harus sama persis dengan backing value
                // App\Enums\BookType, karena kolom book_type di-cast ke enum tersebut.
                { value: "Manga", label: "Manga" },
                { value: "Komik", label: "Komik" },
                { value: "Light Novel", label: "Light Novel" },
                { value: "Novel", label: "Novel" },
                { value: "Komik Lokal", label: "Komik Lokal" },
                { value: "J Lit", label: "J Lit" }
              ]).map((item) => /* @__PURE__ */ jsx(SelectItem, { value: item.value, children: item.label }, item.value)) })
            ] }),
            /* @__PURE__ */ jsx(FieldError, { field: "book_type", errors: activeErrors })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-5 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { children: [
              "Status Cerita",
              " ",
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(Select, { value: form.story_status_id, onValueChange: (value) => updateField("story_status_id", value), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { ...getFieldProps("story_status_id"), children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih status" }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: storyStatuses.map((item) => /* @__PURE__ */ jsx(SelectItem, { value: String(item.id), children: item.name }, item.id)) })
            ] }),
            /* @__PURE__ */ jsx(FieldError, { field: "story_status_id", errors: activeErrors })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { children: [
              "Rating Umur",
              " ",
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(Select, { value: form.age_rating, onValueChange: (value) => updateField("age_rating", value), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { ...getFieldProps("age_rating"), children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih rating umur" }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: ageRatings.map((item) => /* @__PURE__ */ jsx(SelectItem, { value: item.value, children: item.label }, item.value)) })
            ] }),
            /* @__PURE__ */ jsx(FieldError, { field: "age_rating", errors: activeErrors })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { children: [
              "Penerbit",
              " ",
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(Select, { value: form.publisher_id, onValueChange: (value) => updateField("publisher_id", value), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { ...getFieldProps("publisher_id"), children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih penerbit" }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: publishers.map((item) => /* @__PURE__ */ jsx(SelectItem, { value: String(item.id), children: item.name }, item.id)) })
            ] }),
            /* @__PURE__ */ jsx(FieldError, { field: "publisher_id", errors: activeErrors })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Spesifikasi & Adaptasi Buku" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Detail fisik buku seperti ISBN, jumlah halaman, jenis kertas, ukuran, dan info adaptasi." })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "isbn", children: "ISBN" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "isbn",
                ...getFieldProps("isbn"),
                value: form.isbn,
                onChange: (event) => updateField("isbn", event.target.value),
                placeholder: "Contoh: 978-623-87-002-6"
              }
            ),
            /* @__PURE__ */ jsx(FieldError, { field: "isbn", errors: activeErrors })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "page_count", children: "Jumlah Halaman" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "page_count",
                ...getFieldProps("page_count"),
                type: "number",
                min: "1",
                value: form.page_count,
                onChange: (event) => updateField("page_count", event.target.value),
                placeholder: "Contoh: 208"
              }
            ),
            /* @__PURE__ */ jsx(FieldError, { field: "page_count", errors: activeErrors })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "paper_type", children: "Jenis Kertas" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "paper_type",
                ...getFieldProps("paper_type"),
                value: form.paper_type,
                onChange: (event) => updateField("paper_type", event.target.value),
                placeholder: "Contoh: Bookpaper 55g"
              }
            ),
            /* @__PURE__ */ jsx(FieldError, { field: "paper_type", errors: activeErrors })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "dimensions", children: "Ukuran Buku (Dimensi)" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "dimensions",
                ...getFieldProps("dimensions"),
                value: form.dimensions,
                onChange: (event) => updateField("dimensions", event.target.value),
                placeholder: "Contoh: 13 x 18 cm"
              }
            ),
            /* @__PURE__ */ jsx(FieldError, { field: "dimensions", errors: activeErrors })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Adaptasi Media" }),
          /* @__PURE__ */ jsxs(Select, { value: form.adaptation || "all", onValueChange: (value) => updateField("adaptation", value === "all" ? "" : value), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { ...getFieldProps("adaptation"), children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih adaptasi" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Semua Adaptasi" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "anime", children: "Anime" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "live_action", children: "Live Action" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "manga", children: "Manga" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(FieldError, { field: "adaptation", errors: activeErrors })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-border/60 border-t pt-3", children: /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-start gap-3 rounded-xl border bg-neutral-50/50 p-3.5 transition-colors hover:bg-neutral-50 dark:bg-neutral-900/50 dark:hover:bg-neutral-900", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: form.is_upcoming,
              onChange: (e) => updateField("is_upcoming", e.target.checked),
              className: "text-primary focus:ring-primary mt-0.5 h-4 w-4 rounded"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-foreground flex items-center gap-1.5 text-sm font-semibold", children: [
              /* @__PURE__ */ jsx("span", { children: 'Tampilkan di Section "Item Segera Rilis"' }),
              /* @__PURE__ */ jsx("span", { className: "rounded bg-orange-100 px-2 py-0.5 font-mono text-[10px] font-bold text-orange-700 uppercase dark:bg-orange-950 dark:text-orange-300", children: "Highlight User" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs", children: 'Jika dicentang, buku ini akan dimunculkan pada banner khusus "ITEM SEGERA RILIS" di bagian atas halaman katalog user.' })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Author & Genre" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Pilih author cerita, author gambar, dan genre buku." })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Author Story" }),
            /* @__PURE__ */ jsxs(
              MultiSelect,
              {
                values: form.story_authors,
                options: authorOptions,
                onValuesChange: (values) => updateField("story_authors", values),
                children: [
                  /* @__PURE__ */ jsx(MultiSelectTrigger, { ...getFieldProps("story_authors", [], "w-full"), children: /* @__PURE__ */ jsx(MultiSelectValue, { placeholder: "Pilih author story" }) }),
                  /* @__PURE__ */ jsxs(MultiSelectContent, { children: [
                    /* @__PURE__ */ jsx(MultiSelectSearch, { placeholder: "Cari author..." }),
                    /* @__PURE__ */ jsx(MultiSelectList, { children: /* @__PURE__ */ jsx(MultiSelectGroup, { children: authors.map((author) => /* @__PURE__ */ jsx(MultiSelectItem, { value: String(author.id), children: author.name }, author.id)) }) })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx(FieldError, { field: "story_authors", errors: activeErrors })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Author Art" }),
            /* @__PURE__ */ jsxs(
              MultiSelect,
              {
                values: form.art_authors,
                options: authorOptions,
                onValuesChange: (values) => updateField("art_authors", values),
                children: [
                  /* @__PURE__ */ jsx(MultiSelectTrigger, { ...getFieldProps("art_authors", [], "w-full"), children: /* @__PURE__ */ jsx(MultiSelectValue, { placeholder: "Pilih author art" }) }),
                  /* @__PURE__ */ jsxs(MultiSelectContent, { children: [
                    /* @__PURE__ */ jsx(MultiSelectSearch, { placeholder: "Cari author..." }),
                    /* @__PURE__ */ jsx(MultiSelectList, { children: /* @__PURE__ */ jsx(MultiSelectGroup, { children: authors.map((author) => /* @__PURE__ */ jsx(MultiSelectItem, { value: String(author.id), children: author.name }, author.id)) }) })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx(FieldError, { field: "art_authors", errors: activeErrors })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Genre" }),
          /* @__PURE__ */ jsxs(MultiSelect, { values: form.genres, options: genreOptions, onValuesChange: (values) => updateField("genres", values), children: [
            /* @__PURE__ */ jsx(MultiSelectTrigger, { ...getFieldProps("genres", [], "w-full"), children: /* @__PURE__ */ jsx(MultiSelectValue, { placeholder: "Pilih genre" }) }),
            /* @__PURE__ */ jsxs(MultiSelectContent, { children: [
              /* @__PURE__ */ jsx(MultiSelectSearch, { placeholder: "Cari genre..." }),
              /* @__PURE__ */ jsx(MultiSelectList, { children: /* @__PURE__ */ jsx(MultiSelectGroup, { children: genres.map((genre) => /* @__PURE__ */ jsx(MultiSelectItem, { value: String(genre.id), children: genre.name }, genre.id)) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(FieldError, { field: "genres", errors: activeErrors })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Gambar Buku" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Masukkan maksimal 5 URL gambar untuk buku." })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
        form.images.map((image, index) => /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { children: [
              "Gambar ",
              index + 1
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  ...getFieldProps(`images.${index}.image_url`, [], "pr-10"),
                  value: image.image_url,
                  onChange: (event) => updateImage(index, event.target.value),
                  placeholder: "https://example.com/image.jpg"
                }
              ),
              image.image_url.trim() !== "" && /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  "aria-label": `Kosongkan link gambar ${index + 1}`,
                  onClick: () => updateImage(index, ""),
                  className: "text-muted-foreground hover:text-foreground absolute top-1/2 right-1 size-8 -translate-y-1/2",
                  children: /* @__PURE__ */ jsx(X, { className: "size-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx(FieldError, { field: `images.${index}.image_url`, errors: activeErrors }),
            image.image_url && /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: image.image_url,
                  alt: `Preview gambar ${index + 1}`,
                  className: "block h-full w-full object-cover",
                  onError: (event) => {
                    event.target.style.display = "none";
                  }
                }
              ) }),
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-xs", children: "Preview gambar" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-end", children: form.images.length > 1 && /* @__PURE__ */ jsx(Button, { type: "button", variant: "destructive", size: "icon", onClick: () => removeImage(index), children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" }) }) })
        ] }, index)),
        /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", onClick: addImage, disabled: form.images.length >= 5, children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 size-4" }),
          "Tambah Gambar"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-xs", children: [
          form.images.length,
          "/5 gambar digunakan."
        ] }),
        /* @__PURE__ */ jsx(FieldError, { field: "images", errors: activeErrors })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Deskripsi & Media" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Informasi deskripsi dan embed media tambahan buku." })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "synopsis", children: [
            "Sinopsis",
            " ",
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "synopsis",
              ...getFieldProps("synopsis"),
              value: form.synopsis,
              onChange: (event) => updateField("synopsis", event.target.value),
              placeholder: "Masukkan sinopsis buku",
              rows: 6
            }
          ),
          /* @__PURE__ */ jsx(FieldError, { field: "synopsis", errors: activeErrors })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "short_description", children: "Deskripsi Singkat" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "short_description",
              ...getFieldProps("short_description"),
              value: form.short_description,
              onChange: (event) => updateField("short_description", event.target.value),
              placeholder: "Deskripsi singkat buku",
              rows: 3
            }
          ),
          /* @__PURE__ */ jsx(FieldError, { field: "short_description", errors: activeErrors })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "news_link", children: "Link Berita" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "news_link",
                ...getFieldProps("news_link"),
                type: "url",
                value: form.news_link,
                onChange: (event) => updateField("news_link", event.target.value),
                placeholder: "https://..."
              }
            ),
            /* @__PURE__ */ jsx(FieldError, { field: "news_link", errors: activeErrors })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "msrp", children: [
              "Harga MSRP",
              " ",
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "msrp",
                ...getFieldProps("msrp"),
                type: "number",
                min: "0",
                step: "0.01",
                value: form.msrp,
                onChange: (event) => updateField("msrp", event.target.value),
                placeholder: "Contoh: 45000"
              }
            ),
            /* @__PURE__ */ jsx(FieldError, { field: "msrp", errors: activeErrors })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "TikTok Video Links & Review" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Masukkan Judul dan Link video/photo TikTok (maksimal 10 link). Link otomatis dibersihkan saat di-paste." }),
          form.tiktok_embeds.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "bg-muted/20 space-y-3 rounded-lg border p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs(Label, { className: "text-muted-foreground text-xs font-semibold tracking-wider uppercase", children: [
                "Video TikTok #",
                index + 1
              ] }),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  type: "button",
                  variant: "destructive",
                  size: "sm",
                  className: "h-7 px-2 text-xs",
                  onClick: () => removeTiktokEmbed(index),
                  children: [
                    /* @__PURE__ */ jsx(Trash2, { className: "mr-1 size-3.5" }),
                    "Hapus"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Judul Video" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    ...getFieldProps(`tiktok_embeds.${index}.name`),
                    value: item.name || "",
                    onChange: (e) => updateTiktokEmbed(index, "name", e.target.value),
                    placeholder: "Contoh: Bedah Detail Kertas Jilid 1"
                  }
                ),
                /* @__PURE__ */ jsx(FieldError, { field: `tiktok_embeds.${index}.name`, errors: activeErrors })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Link TikTok" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    ...getFieldProps(`tiktok_embeds.${index}.url_video`, [`tiktok_embeds.${index}.embed_url`]),
                    value: item.url_video || item.embed_url || "",
                    onChange: (e) => updateTiktokEmbed(index, "url_video", e.target.value),
                    placeholder: "https://www.tiktok.com/@norinoya.official/photo/..."
                  }
                ),
                /* @__PURE__ */ jsx(FieldError, { field: `tiktok_embeds.${index}.url_video`, errors: activeErrors }),
                /* @__PURE__ */ jsx(FieldError, { field: `tiktok_embeds.${index}.embed_url`, errors: activeErrors })
              ] })
            ] })
          ] }, index)),
          /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", onClick: addTiktokEmbed, disabled: form.tiktok_embeds.length >= 10, children: [
            /* @__PURE__ */ jsx(Plus, { className: "mr-2 size-4" }),
            "Tambah TikTok Link"
          ] }),
          /* @__PURE__ */ jsx(FieldError, { field: "tiktok_embeds", errors: activeErrors })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Affiliate Links" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Tambahkan link pembelian dari berbagai toko." })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
        form.affiliate_links.length === 0 ? /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-dashed p-6 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Belum ada affiliate link." }) }) : form.affiliate_links.map((link, index) => /* @__PURE__ */ jsx("div", { className: "rounded-lg border p-4", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-[220px_1fr_auto]", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Toko" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: link.affiliate_store_id,
                onValueChange: (value) => updateAffiliateLink(index, "affiliate_store_id", value),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { ...getFieldProps(`affiliate_links.${index}.affiliate_store_id`), children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih toko" }) }),
                  /* @__PURE__ */ jsx(SelectContent, { children: affiliateStores.map((store) => /* @__PURE__ */ jsx(SelectItem, { value: String(store.id), children: store.name }, store.id)) })
                ]
              }
            ),
            /* @__PURE__ */ jsx(FieldError, { field: `affiliate_links.${index}.affiliate_store_id`, errors: activeErrors })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Nama Toko" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  value: link.store_name || "",
                  onChange: (event) => updateAffiliateLink(index, "store_name", event.target.value),
                  placeholder: "Official Store"
                }
              ),
              /* @__PURE__ */ jsx(FieldError, { field: `affiliate_links.${index}.store_name`, errors: activeErrors })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Lokasi" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  value: link.location || "",
                  onChange: (event) => updateAffiliateLink(index, "location", event.target.value),
                  placeholder: "Indonesia"
                }
              ),
              /* @__PURE__ */ jsx(FieldError, { field: `affiliate_links.${index}.location`, errors: activeErrors })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Link" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "url",
                value: link.url,
                onChange: (event) => updateAffiliateLink(index, "url", event.target.value),
                placeholder: "https://tokopedia.com/..."
              }
            ),
            /* @__PURE__ */ jsx(FieldError, { field: `affiliate_links.${index}.url`, errors: activeErrors })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsx(Button, { type: "button", variant: "destructive", size: "icon", onClick: () => removeAffiliateLink(index), children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" }) }) })
        ] }) }, index)),
        /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", onClick: addAffiliateLink, children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 size-4" }),
          "Tambah Affiliate Link"
        ] }),
        /* @__PURE__ */ jsx(FieldError, { field: "affiliate_links", errors: activeErrors })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", disabled: processing, onClick: () => router.visit(route("admin.books.index")), children: "Batal" }),
      /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: processing ? "Menyimpan..." : mode === "create" ? "Simpan Buku" : "Simpan Perubahan" })
    ] })
  ] });
}
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BookForm
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$n = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Books",
    href: "/admin/books"
  },
  {
    title: "Tambah Buku",
    href: "/admin/books/create"
  }
];
const breadcrumbsWithDuplicate = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Books",
    href: "/admin/books"
  },
  {
    title: "Tambah Buku",
    href: "/admin/books/create"
  },
  {
    title: "Duplikat Buku",
    href: "#"
  }
];
function Create({
  series,
  editions,
  storyStatuses,
  publishers,
  authors,
  genres,
  affiliateStores,
  existingVolumes,
  bookTypes,
  ageRatings,
  book
}) {
  const { errors } = usePage().props;
  const [processing, setProcessing] = useState(false);
  const handleSubmit = (formData) => {
    router.post(route("admin.books.store"), formData, {
      preserveScroll: true,
      onStart: () => setProcessing(true),
      onFinish: () => setProcessing(false)
    });
  };
  const pageTitle = book ? "Duplikat Buku" : "Tambah Buku";
  const pageDescription = book ? "Duplikat buku dengan volume yang sudah disesuaikan." : "Tambahkan buku baru ke dalam database.";
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: book ? breadcrumbsWithDuplicate : breadcrumbs$n, children: [
    /* @__PURE__ */ jsx(Head, { title: pageTitle }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-6 p-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: pageTitle }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: pageDescription })
      ] }),
      /* @__PURE__ */ jsx(
        BookForm,
        {
          mode: "create",
          book,
          series,
          editions,
          storyStatuses,
          publishers,
          authors,
          genres,
          affiliateStores,
          existingVolumes,
          bookTypes,
          ageRatings,
          processing,
          errors: errors || {},
          onSubmit: handleSubmit
        }
      )
    ] })
  ] });
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$m = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Books",
    href: "/admin/books"
  },
  {
    title: "Edit",
    href: "#"
  }
];
function Edit({
  book,
  series,
  editions,
  storyStatuses,
  publishers,
  authors,
  genres,
  affiliateStores,
  existingVolumes,
  bookTypes,
  ageRatings
}) {
  const { errors } = usePage().props;
  const [processing, setProcessing] = useState(false);
  const handleSubmit = (formData) => {
    router.put(route("admin.books.update", book.id), formData, {
      preserveScroll: true,
      onStart: () => setProcessing(true),
      onFinish: () => setProcessing(false)
    });
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$m, children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit ${book.title}` }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-6 p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Edit Book" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Edit informasi buku." })
        ] }),
        /* @__PURE__ */ jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Copy, { className: "size-4" }),
            "Duplikat"
          ] }) }),
          /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
            /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Duplikat buku ini?" }),
              /* @__PURE__ */ jsx(AlertDialogDescription, { children: "Buku akan disalin ke dalam halaman pembuatan dengan volume yang sudah disesuaikan otomatis." })
            ] }),
            /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Batal" }),
              /* @__PURE__ */ jsx(AlertDialogAction, { asChild: true, children: /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("admin.books.duplicate", book.id),
                  className: "bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
                  children: "Duplikat Sekarang"
                }
              ) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        BookForm,
        {
          mode: "edit",
          book,
          series,
          editions,
          storyStatuses,
          publishers,
          authors,
          genres,
          affiliateStores,
          existingVolumes,
          bookTypes,
          ageRatings,
          processing,
          errors: errors || {},
          onSubmit: handleSubmit
        }
      )
    ] })
  ] });
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
function FilterCombobox({
  value,
  selectedLabel,
  allLabel,
  placeholder,
  type,
  onChange,
  className
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [labels, setLabels] = useState({});
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);
  useEffect(() => {
    if (selectedLabel && value && value !== "all") {
      setLabels((prev) => prev[value] === selectedLabel ? prev : { ...prev, [value]: selectedLabel });
    }
  }, [selectedLabel, value]);
  useEffect(() => {
    var _a;
    if (!open) {
      return;
    }
    const term = query.trim();
    const controller = new AbortController();
    (_a = abortRef.current) == null ? void 0 : _a.abort();
    abortRef.current = controller;
    const timer = window.setTimeout(
      () => {
        setLoading(true);
        const url = new URL(route("admin.books.filter-options"), window.location.origin);
        url.searchParams.set("type", type);
        if (term !== "") {
          url.searchParams.set("q", term);
        }
        fetch(url.toString(), {
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest"
          },
          signal: controller.signal
        }).then((response) => response.ok ? response.json() : { data: [] }).then((payload) => {
          const items = Array.isArray(payload.data) ? payload.data : [];
          setOptions(items);
          setLabels((prev) => {
            const next = { ...prev };
            for (const item of items) {
              next[item.value] = item.label;
            }
            return next;
          });
        }).catch(() => void 0).finally(() => {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        });
      },
      term === "" ? 0 : 300
    );
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [open, query, type]);
  const close = () => {
    setOpen(false);
    setQuery("");
  };
  const activeLabel = value && value !== "all" ? labels[value] ?? selectedLabel ?? placeholder : allLabel;
  return /* @__PURE__ */ jsxs(
    Popover,
    {
      open,
      onOpenChange: (nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          setQuery("");
        }
      },
      children: [
        /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            role: "combobox",
            "aria-expanded": open,
            className: cn(
              "h-9 w-full cursor-pointer justify-between px-3 text-xs font-medium sm:w-[190px]",
              (!value || value === "all") && "text-muted-foreground",
              className
            ),
            children: [
              /* @__PURE__ */ jsx("span", { className: "truncate", children: activeLabel }),
              /* @__PURE__ */ jsx(ChevronsUpDown, { className: "ml-2 size-3.5 shrink-0 opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(PopoverContent, { align: "start", className: "w-(--radix-popover-trigger-width) p-0", children: /* @__PURE__ */ jsxs(Command, { shouldFilter: false, children: [
          /* @__PURE__ */ jsx(CommandInput, { placeholder, value: query, onValueChange: setQuery }),
          /* @__PURE__ */ jsx(CommandList, { children: loading ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 py-4 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsx(Loader2, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ jsx("span", { children: "Memuat..." })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            options.length === 0 && /* @__PURE__ */ jsx("div", { className: "py-4 text-center text-xs text-muted-foreground", children: "Tidak ada hasil." }),
            /* @__PURE__ */ jsxs(
              CommandItem,
              {
                value: "all",
                onSelect: () => {
                  onChange("all");
                  close();
                },
                children: [
                  /* @__PURE__ */ jsx(
                    Check,
                    {
                      className: cn(
                        "mr-2 size-3.5",
                        !value || value === "all" ? "opacity-100" : "opacity-0"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { children: allLabel })
                ]
              }
            ),
            options.map((option) => /* @__PURE__ */ jsxs(
              CommandItem,
              {
                value: option.value,
                onSelect: () => {
                  onChange(option.value);
                  close();
                },
                children: [
                  /* @__PURE__ */ jsx(
                    Check,
                    {
                      className: cn(
                        "mr-2 size-3.5",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "truncate", children: option.label })
                ]
              },
              option.value
            ))
          ] }) })
        ] }) })
      ]
    }
  );
}
const Checkbox = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      ref,
      className: cn(
        "peer size-5 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-accent-foreground",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, { className: cn("flex items-center justify-center text-current"), children: /* @__PURE__ */ jsx(Check, { className: "size-3.5 stroke-[3]" }) })
    }
  )
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
const breadcrumbs$l = [
  {
    title: "Dashboard",
    href: "/admin/dashboard"
  },
  {
    title: "Books",
    href: "/admin/books"
  }
];
const PER_PAGE_OPTIONS = [10, 15, 25, 50, 100];
const SORT_OPTIONS = [
  { value: "latest", label: "Terbaru" },
  { value: "oldest", label: "Terlama" },
  { value: "title_asc", label: "Judul A–Z" },
  { value: "title_desc", label: "Judul Z–A" },
  { value: "views_desc", label: "Views Terbanyak" },
  { value: "views_asc", label: "Views Tersedikit" }
];
const formatPaginationLabel = (label) => label.replace(/&laquo;|&raquo;/g, "").replace("pagination.previous", "Sebelumnya").replace("pagination.next", "Berikutnya").trim();
function Index({
  books,
  selectedSeries = null,
  selectedPublisher = null,
  filters: rawFilters
}) {
  const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
  const [deleteBook, setDeleteBook] = useState(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [bulkCount, setBulkCount] = useState(0);
  const [search, setSearch] = useState(filters.search || "");
  const [seriesId, setSeriesId] = useState(filters.series_id || "all");
  const [publisherId, setPublisherId] = useState(filters.publisher_id || "all");
  const [sort, setSort] = useState(filters.sort || "latest");
  const [perPage, setPerPage] = useState(Number(filters.per_page) || 15);
  const [selectedIds, setSelectedIds] = useState([]);
  const [pageInput, setPageInput] = useState("");
  const pageIds = useMemo(() => books.data.map((book) => book.id), [books.data]);
  const selectedOnPage = pageIds.filter((id) => selectedIds.includes(id));
  const allPageSelected = pageIds.length > 0 && selectedOnPage.length === pageIds.length;
  const somePageSelected = selectedOnPage.length > 0 && !allPageSelected;
  useEffect(() => {
    setSelectedIds([]);
  }, [books.current_page]);
  useEffect(() => {
    if (books.data.length === 0 && books.current_page > 1 && books.prev_page_url) {
      router.get(books.prev_page_url, {}, { preserveScroll: true, preserveState: true, only: ["books"] });
    }
  }, [books.current_page, books.data.length, books.prev_page_url]);
  const toggleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds((prev) => Array.from(/* @__PURE__ */ new Set([...prev, ...pageIds])));
      return;
    }
    setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
  };
  const toggleSelect = (id, checked) => {
    setSelectedIds((prev) => checked ? Array.from(/* @__PURE__ */ new Set([...prev, id])) : prev.filter((value) => value !== id));
  };
  const buildQuery = (overrides) => {
    const nextSearch = (overrides == null ? void 0 : overrides.search) ?? search;
    const nextSeries = (overrides == null ? void 0 : overrides.series_id) ?? seriesId;
    const nextPublisher = (overrides == null ? void 0 : overrides.publisher_id) ?? publisherId;
    const nextSort = (overrides == null ? void 0 : overrides.sort) ?? sort;
    const nextPerPage = (overrides == null ? void 0 : overrides.per_page) ?? perPage;
    const payload = {};
    if (nextSearch) {
      payload.search = nextSearch;
    }
    if (nextSeries && nextSeries !== "all") {
      payload.series_id = nextSeries;
    }
    if (nextPublisher && nextPublisher !== "all") {
      payload.publisher_id = nextPublisher;
    }
    if (nextSort && nextSort !== "latest") {
      payload.sort = nextSort;
    }
    if (nextPerPage !== 15) {
      payload.per_page = String(nextPerPage);
    }
    if ((overrides == null ? void 0 : overrides.page) && overrides.page > 1) {
      payload.page = String(overrides.page);
    }
    return payload;
  };
  const handleApplyFilters = (overrides) => {
    setSelectedIds([]);
    router.get(route("admin.books.index"), buildQuery(overrides), {
      preserveState: true,
      preserveScroll: true,
      only: ["books", "filters", "selectedSeries", "selectedPublisher"]
    });
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleApplyFilters();
  };
  const handleReset = () => {
    setSearch("");
    setSeriesId("all");
    setPublisherId("all");
    setSort("latest");
    setPerPage(15);
    setSelectedIds([]);
    router.get(route("admin.books.index"), {}, { preserveState: true, preserveScroll: true });
  };
  const handlePageJump = (e) => {
    e.preventDefault();
    const target = Number.parseInt(pageInput, 10);
    if (!Number.isFinite(target) || target < 1 || target > books.last_page) {
      toast.error(`Halaman harus di antara 1 dan ${books.last_page}`);
      return;
    }
    router.get(route("admin.books.index"), buildQuery({ page: target }), {
      preserveState: true,
      preserveScroll: true,
      only: ["books"]
    });
    setPageInput("");
  };
  const toggleTitleSort = () => {
    const next = sort === "title_asc" ? "title_desc" : "title_asc";
    setSort(next);
    handleApplyFilters({ sort: next });
  };
  const toggleViewsSort = () => {
    const next = sort === "views_desc" ? "views_asc" : "views_desc";
    setSort(next);
    handleApplyFilters({ sort: next });
  };
  const renderSortIcon = (ascValue, descValue) => {
    if (sort === ascValue) {
      return /* @__PURE__ */ jsx(ArrowUp, { className: "size-3.5" });
    }
    if (sort === descValue) {
      return /* @__PURE__ */ jsx(ArrowDown, { className: "size-3.5" });
    }
    return /* @__PURE__ */ jsx(ArrowUpDown, { className: "size-3.5 opacity-60" });
  };
  const handleDelete = () => {
    if (!deleteBook) {
      return;
    }
    const bookTitle = deleteBook.title;
    router.delete(route("admin.books.destroy", deleteBook.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(`Buku "${bookTitle}" sudah terhapus`);
      },
      onError: () => {
        toast.error("Gagal menghapus buku");
      },
      onFinish: () => {
        setDeleteBook(null);
      }
    });
  };
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) {
      return;
    }
    const count = selectedIds.length;
    router.delete(route("admin.books.bulk-destroy"), {
      data: { ids: selectedIds },
      preserveScroll: true,
      onSuccess: () => {
        toast.success(`${count} buku sudah terhapus`);
        setSelectedIds([]);
      },
      onError: () => {
        toast.error("Gagal menghapus buku terpilih");
      },
      onFinish: () => {
        setBulkDeleteOpen(false);
      }
    });
  };
  const hasActiveFilters = Boolean(search) || seriesId !== "all" || publisherId !== "all" || sort !== "latest" || perPage !== 15;
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$l, children: [
    /* @__PURE__ */ jsx(Head, { title: "Books" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-5 p-4 sm:p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white", children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "w-6 h-6 text-[#112A12] dark:text-emerald-400" }),
            /* @__PURE__ */ jsx("span", { children: "Books Catalog" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Kelola seluruh katalog buku, manga, novel, dan informasi volume yang tersedia di website." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap sm:flex-nowrap", children: [
          /* @__PURE__ */ jsx(Link, { href: route("admin.books.search-logs"), children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs", children: [
            /* @__PURE__ */ jsx(SearchCode, { className: "w-4 h-4 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ jsx("span", { children: "Keyword Logs" })
          ] }) }),
          /* @__PURE__ */ jsx(Link, { href: route("admin.books.logs"), children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs", children: [
            /* @__PURE__ */ jsx(History, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400" }),
            /* @__PURE__ */ jsx("span", { children: "Lihat Logs" })
          ] }) }),
          /* @__PURE__ */ jsx(Link, { href: route("admin.books.volume-order"), children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs", children: [
            /* @__PURE__ */ jsx(ArrowUpDown, { className: "w-4 h-4 text-purple-600 dark:text-purple-400" }),
            /* @__PURE__ */ jsx("span", { children: "Urutan Volume" })
          ] }) }),
          /* @__PURE__ */ jsx(Link, { href: route("admin.books.create"), children: /* @__PURE__ */ jsxs(Button, { className: "bg-[#112A12] hover:bg-[#0c1e0d] text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold px-4 h-9 rounded-lg", children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: "Tambah Buku" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-2xs", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSearchSubmit, className: "flex items-center gap-2 flex-1 min-w-[240px]", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Cari judul buku, sinopsis...",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-9 h-9 text-xs"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "secondary", className: "h-9 px-3 text-xs font-bold", children: "Cari" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap sm:flex-nowrap", children: [
          /* @__PURE__ */ jsx(
            FilterCombobox,
            {
              value: seriesId,
              selectedLabel: (selectedSeries == null ? void 0 : selectedSeries.title) ?? null,
              allLabel: "Semua Series",
              placeholder: "Cari series...",
              type: "series",
              onChange: (next) => {
                setSeriesId(next);
                handleApplyFilters({ series_id: next });
              }
            }
          ),
          /* @__PURE__ */ jsx(
            FilterCombobox,
            {
              value: publisherId,
              selectedLabel: (selectedPublisher == null ? void 0 : selectedPublisher.name) ?? null,
              allLabel: "Semua Penerbit",
              placeholder: "Cari penerbit...",
              type: "publisher",
              onChange: (next) => {
                setPublisherId(next);
                handleApplyFilters({ publisher_id: next });
              }
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(ArrowUpDown, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsx(
              "select",
              {
                value: sort,
                onChange: (e) => {
                  const next = e.target.value;
                  setSort(next);
                  handleApplyFilters({ sort: next });
                },
                className: "h-9 pl-8 pr-7 text-xs font-medium bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer appearance-none",
                children: SORT_OPTIONS.map((option) => /* @__PURE__ */ jsx("option", { value: option.value, children: option.label }, option.value))
              }
            )
          ] }),
          hasActiveFilters && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleReset,
              className: "h-9 text-xs font-bold",
              children: "Reset"
            }
          )
        ] })
      ] }),
      selectedIds.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 sm:flex-row sm:items-center sm:justify-between dark:border-red-900/50 dark:bg-red-950/30", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-xs font-semibold text-red-700 dark:text-red-300", children: [
          selectedIds.length,
          " buku dipilih"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-8 text-xs font-bold",
              onClick: () => setSelectedIds([]),
              children: "Batal"
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "destructive",
              size: "sm",
              className: "h-8 text-xs font-bold",
              onClick: () => {
                setBulkCount(selectedIds.length);
                setBulkDeleteOpen(true);
              },
              children: [
                /* @__PURE__ */ jsx(Trash2, { className: "mr-1.5 size-3.5" }),
                "Hapus Terpilih"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xs", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[1040px]", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-[#112A12] text-white", children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-[#112A12]", children: [
          /* @__PURE__ */ jsx("th", { className: "w-[44px] px-4 py-3 text-left", children: /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: allPageSelected ? true : somePageSelected ? "indeterminate" : false,
              onCheckedChange: (checked) => toggleSelectAll(checked === true),
              "aria-label": "Pilih semua buku di halaman ini",
              className: "border-white/60 data-[state=checked]:border-white data-[state=checked]:bg-white data-[state=checked]:text-[#112A12]"
            }
          ) }),
          /* @__PURE__ */ jsx("th", { className: "w-[70px] px-4 py-3 text-left text-xs font-bold text-white", children: "#" }),
          /* @__PURE__ */ jsx("th", { className: "w-[80px] px-4 py-3 text-left text-xs font-bold text-white", children: "Cover" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-bold text-white", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: toggleTitleSort,
              className: "inline-flex cursor-pointer items-center gap-1 hover:text-emerald-200",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Buku" }),
                renderSortIcon("title_asc", "title_desc")
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-bold text-white", children: "Series" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-bold text-white", children: "Volume" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-bold text-white", children: "Penerbit" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-bold text-white", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-center text-xs font-bold text-white", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: toggleViewsSort,
              className: "inline-flex cursor-pointer items-center gap-1 hover:text-emerald-200",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Views" }),
                renderSortIcon("views_desc", "views_asc")
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right text-xs font-bold text-white", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: books.data.length > 0 ? books.data.map((book, index) => {
          var _a;
          return /* @__PURE__ */ jsxs(
            "tr",
            {
              className: "border-b last:border-0 hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40",
              children: [
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(
                  Checkbox,
                  {
                    checked: selectedIds.includes(book.id),
                    onCheckedChange: (checked) => toggleSelect(book.id, checked === true),
                    "aria-label": `Pilih ${book.title}`
                  }
                ) }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: (books.current_page - 1) * books.per_page + index + 1 }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: book.images.length > 0 ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: book.images[0].image_url,
                    alt: book.title,
                    loading: "lazy",
                    decoding: "async",
                    className: "h-16 w-12 rounded-md border object-cover"
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "flex h-16 w-12 items-center justify-center rounded-md border bg-muted text-center text-[10px] text-muted-foreground", children: "No Image" }) }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[280px]", children: [
                  /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-medium", children: book.title }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-1 flex flex-wrap gap-1.5", children: [
                    /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
                      book.genres_count,
                      " genre"
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "•" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
                      book.affiliate_links_count,
                      " affiliate"
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm", children: book.series ? book.series.title : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "-" }) }),
                /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-sm", children: [
                  "Vol. ",
                  book.volume
                ] }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm", children: book.publisher ? book.publisher.name : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "-" }) }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: book.story_status ? /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-full border px-2.5 py-1 text-xs font-medium", children: (_a = book.story_status) == null ? void 0 : _a.name }) : /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "-" }) }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 font-mono text-xs font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md", children: [
                  /* @__PURE__ */ jsx(Eye, { className: "w-3.5 h-3.5 text-neutral-400" }),
                  /* @__PURE__ */ jsx("span", { children: (book.views_count ?? 0).toLocaleString("id-ID") })
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-1.5", children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "icon",
                      asChild: true,
                      title: "Lihat Tampilan User",
                      className: "text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white",
                      children: /* @__PURE__ */ jsx(
                        "a",
                        {
                          href: route("book.detail", book.slug || book.id),
                          target: "_blank",
                          rel: "noopener noreferrer",
                          children: /* @__PURE__ */ jsx(Eye, { className: "size-4" })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, title: "Edit Buku", children: /* @__PURE__ */ jsx(Link, { href: route("admin.books.edit", book.id), children: /* @__PURE__ */ jsx(Pencil, { className: "size-4" }) }) }),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "destructive",
                      size: "icon",
                      title: "Hapus Buku",
                      onClick: () => setDeleteBook(book),
                      children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
                    }
                  )
                ] }) })
              ]
            },
            book.id
          );
        }) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 10, className: "px-4 py-16 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex size-12 items-center justify-center rounded-full bg-muted", children: /* @__PURE__ */ jsx(BookOpen, { className: "size-5 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: hasActiveFilters ? "Tidak ada buku yang cocok" : "Belum ada buku" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: hasActiveFilters ? "Coba ubah kata kunci atau filter pencarian." : "Tambahkan buku pertama Anda." })
          ] }),
          hasActiveFilters ? /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: handleReset, children: "Reset Filter" }) : /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: route("admin.books.create"), children: [
            /* @__PURE__ */ jsx(Plus, { className: "mr-2 size-4" }),
            "Tambah Buku"
          ] }) })
        ] }) }) }) })
      ] }) }) }),
      books.total > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Menampilkan ",
            books.from ?? 0,
            "–",
            books.to ?? 0,
            " dari ",
            books.total,
            " buku."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs", children: "Baris:" }),
            /* @__PURE__ */ jsx(
              "select",
              {
                value: perPage,
                onChange: (e) => {
                  const next = Number(e.target.value);
                  setPerPage(next);
                  handleApplyFilters({ per_page: next });
                },
                className: "h-8 rounded-md border border-input bg-background px-2 text-xs font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring",
                children: PER_PAGE_OPTIONS.map((option) => /* @__PURE__ */ jsx("option", { value: option, children: option }, option))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          books.last_page > 1 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: books.links.map((link, index) => {
            const label = formatPaginationLabel(link.label);
            if (!link.url) {
              return /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", disabled: true, children: label }, index);
            }
            return /* @__PURE__ */ jsx(
              Button,
              {
                variant: link.active ? "default" : "outline",
                size: "sm",
                asChild: true,
                children: /* @__PURE__ */ jsx(Link, { href: link.url, preserveScroll: true, children: label })
              },
              index
            );
          }) }),
          books.last_page > 1 && /* @__PURE__ */ jsxs("form", { onSubmit: handlePageJump, className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                value: pageInput,
                onChange: (e) => setPageInput(e.target.value),
                inputMode: "numeric",
                placeholder: "Hal.",
                "aria-label": "Lompat ke halaman",
                className: "h-8 w-16 text-center text-xs"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                variant: "secondary",
                size: "sm",
                className: "h-8 px-2.5 text-xs font-bold",
                children: "Ke"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      AlertDialog,
      {
        open: deleteBook !== null,
        onOpenChange: (open) => {
          if (!open) {
            setDeleteBook(null);
          }
        },
        children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Hapus buku?" }),
            /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
              "Apakah Anda yakin ingin menghapus buku ",
              /* @__PURE__ */ jsx("strong", { children: deleteBook == null ? void 0 : deleteBook.title }),
              "?"
            ] })
          ] }),
          /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Batal" }),
            /* @__PURE__ */ jsx(AlertDialogAction, { onClick: handleDelete, children: "Hapus Buku" })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(AlertDialog, { open: bulkDeleteOpen, onOpenChange: setBulkDeleteOpen, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxs(AlertDialogTitle, { children: [
          "Hapus ",
          bulkCount,
          " buku?"
        ] }),
        /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
          "Buku yang dihapus tidak dapat dikembalikan. Apakah Anda yakin ingin menghapus",
          " ",
          /* @__PURE__ */ jsxs("strong", { children: [
            bulkCount,
            " buku"
          ] }),
          " terpilih?"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Batal" }),
        /* @__PURE__ */ jsx(AlertDialogAction, { onClick: handleBulkDelete, children: "Hapus Buku" })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn(
        "bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      ),
      captionLayout,
      formatters: {
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters
      },
      classNames: {
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center justify-between w-full relative z-10 px-1 mb-2",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-[--cell-size] w-full items-center justify-center font-bold text-sm text-neutral-900 dark:text-white",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "bg-popover absolute inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-[--cell-size] select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "bg-accent rounded-l-md",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      },
      components: {
        Root: ({ className: className2, rootRef, ...props2 }) => {
          return /* @__PURE__ */ jsx(
            "div",
            {
              "data-slot": "calendar",
              ref: rootRef,
              className: cn(className2),
              ...props2
            }
          );
        },
        Chevron: ({ className: className2, orientation, ...props2 }) => {
          if (orientation === "left") {
            return /* @__PURE__ */ jsx(ChevronLeftIcon, { className: cn("size-4", className2), ...props2 });
          }
          if (orientation === "right") {
            return /* @__PURE__ */ jsx(
              ChevronRightIcon,
              {
                className: cn("size-4", className2),
                ...props2
              }
            );
          }
          return /* @__PURE__ */ jsx(ChevronDownIcon, { className: cn("size-4", className2), ...props2 });
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props2 }) => {
          return /* @__PURE__ */ jsx("td", { ...props2, children: /* @__PURE__ */ jsx("div", { className: "flex size-[--cell-size] items-center justify-center text-center", children }) });
        },
        ...components
      },
      ...props
    }
  );
}
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef(null);
  React.useEffect(() => {
    var _a;
    if (modifiers.focused) (_a = ref.current) == null ? void 0 : _a.focus();
  }, [modifiers.focused]);
  return /* @__PURE__ */ jsx(
    Button,
    {
      ref,
      variant: "ghost",
      size: "icon",
      "data-day": day.date.toLocaleDateString(),
      "data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
      "data-range-start": modifiers.range_start,
      "data-range-end": modifiers.range_end,
      "data-range-middle": modifiers.range_middle,
      className: cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      ),
      ...props
    }
  );
}
const breadcrumbs$k = [
  {
    title: "Dashboard",
    href: "/admin/dashboard"
  },
  {
    title: "Books",
    href: "/admin/books"
  },
  {
    title: "View Logs",
    href: "/admin/books/logs"
  }
];
function Logs$2({ logs, filters: rawFilters, stats }) {
  var _a;
  const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
  const [search, setSearch] = useState(filters.search || "");
  const [startDate, setStartDate] = useState(filters.start_date || "");
  const [endDate, setEndDate] = useState(filters.end_date || "");
  const [deleteItem, setDeleteItem] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);
  const handleApplyFilters = (newStart, newEnd, newSearch) => {
    const queryStart = newStart !== void 0 ? newStart : startDate;
    const queryEnd = newEnd !== void 0 ? newEnd : endDate;
    const querySearch = search;
    router.get(
      route("admin.books.logs"),
      {
        search: querySearch || void 0,
        book_id: filters.book_id || void 0,
        start_date: queryStart || void 0,
        end_date: queryEnd || void 0
      },
      { preserveState: true, preserveScroll: true }
    );
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleApplyFilters();
  };
  const handleReset = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    router.get(route("admin.books.logs"), {}, { preserveScroll: true });
  };
  const toLocalDateString = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    }
    return dateString;
  };
  const confirmDeleteSingle = () => {
    if (!deleteItem) return;
    setIsDeleting(true);
    router.delete(route("admin.books.logs.destroy", deleteItem.id), {
      preserveScroll: true,
      onFinish: () => {
        setIsDeleting(false);
        setDeleteItem(null);
      }
    });
  };
  const confirmClearLogs = () => {
    setIsDeleting(true);
    router.delete(route("admin.books.logs.clear"), {
      data: {
        book_id: filters.book_id || void 0,
        start_date: startDate || void 0,
        end_date: endDate || void 0
      },
      preserveScroll: true,
      onFinish: () => {
        setIsDeleting(false);
        setShowClearConfirm(false);
      }
    });
  };
  const parseUserAgent = (ua) => {
    if (!ua) return { device: "Unknown", browser: "Unknown", isMobile: false };
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(ua);
    let browser = "Browser";
    if (/edg/i.test(ua)) browser = "Edge";
    else if (/chrome|crios/i.test(ua)) browser = "Chrome";
    else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
    else if (/safari/i.test(ua)) browser = "Safari";
    else if (/opera|opr/i.test(ua)) browser = "Opera";
    return {
      device: isMobile ? "Mobile" : "Desktop",
      browser,
      isMobile
    };
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$k, children: [
    /* @__PURE__ */ jsx(Head, { title: "Book View Logs" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-5 p-4 sm:p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Link, { href: route("admin.books.index"), children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) }) }),
            /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white", children: [
              /* @__PURE__ */ jsx(History, { className: "w-6 h-6 text-[#112A12] dark:text-emerald-400" }),
              /* @__PURE__ */ jsx("span", { children: "Log Kunjungan & Waktu Buku" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 ml-10", children: "Pencatatan riwayat waktu real-time saat buku dilihat oleh pengunjung (dengan anti-spam 1 view/menit per IP)." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap sm:flex-nowrap", children: [
          /* @__PURE__ */ jsx(Link, { href: route("admin.books.search-logs"), children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs", children: [
            /* @__PURE__ */ jsx(SearchCode, { className: "w-4 h-4 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ jsx("span", { children: "Keyword Logs" })
          ] }) }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: route("admin.books.logs.export", {
                search: filters.search,
                book_id: filters.book_id,
                start_date: filters.start_date,
                end_date: filters.end_date
              }),
              target: "_blank",
              rel: "noopener noreferrer",
              download: true,
              children: /* @__PURE__ */ jsxs(
                Button,
                {
                  className: "bg-[#0F9D58] hover:bg-[#0b8043] text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs",
                  title: "Download format CSV yang kompatibel langsung dengan Google Sheets & Excel",
                  children: [
                    /* @__PURE__ */ jsx(FileSpreadsheet, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsx("span", { children: "Export Google Sheets" })
                  ]
                }
              )
            }
          ),
          logs.data.length > 0 && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => setShowClearConfirm(true),
              className: "h-9 px-3 text-xs font-bold flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 border-red-200 dark:border-red-900/50 cursor-pointer",
              title: "Bersihkan log (seluruhnya atau sesuai filter tanggal)",
              children: [
                /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Bersihkan Log" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => router.reload(),
              className: "h-9 px-3 text-xs font-bold flex items-center gap-1.5 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Refresh" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Total Log Tercatat" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-neutral-900 dark:text-white", children: stats.total_views.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-[#112A12]/10 dark:bg-emerald-950/40 text-[#112A12] dark:text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(Eye, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Kunjungan Hari Ini" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-emerald-600 dark:text-emerald-400", children: stats.today_views.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Unique IP Pengunjung" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-blue-600 dark:text-blue-400", children: stats.unique_ips.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(Users, { className: "w-5 h-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-2xs", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSearchSubmit, className: "flex items-center gap-2 flex-1 max-w-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Cari judul buku, IP address, user agent...",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-9 h-9 text-xs"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "secondary", className: "h-9 px-3 text-xs font-bold", children: "Cari" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-neutral-500 dark:text-neutral-400", children: "Dari:" }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                onClick: () => setIsStartDateOpen(true),
                className: `h-9 px-3 text-xs font-medium justify-start text-left gap-2 border-neutral-200 dark:border-neutral-800 ${!startDate && "text-neutral-400"}`,
                children: [
                  /* @__PURE__ */ jsx(Calendar$1, { className: "w-3.5 h-3.5 text-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { children: startDate ? formatDisplayDate(startDate) : "Pilih Tanggal" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-neutral-500 dark:text-neutral-400", children: "Sampai:" }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                onClick: () => setIsEndDateOpen(true),
                className: `h-9 px-3 text-xs font-medium justify-start text-left gap-2 border-neutral-200 dark:border-neutral-800 ${!endDate && "text-neutral-400"}`,
                children: [
                  /* @__PURE__ */ jsx(Calendar$1, { className: "w-3.5 h-3.5 text-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { children: endDate ? formatDisplayDate(endDate) : "Pilih Tanggal" })
                ]
              }
            )
          ] }),
          filters.book_id && /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md", children: [
            "Filter Book #",
            filters.book_id
          ] }),
          (search || filters.book_id || startDate || endDate) && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleReset,
              className: "h-9 px-2.5 text-xs font-bold text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 flex items-center gap-1 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Reset Filter" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xs", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { className: "bg-[#112A12] text-white", children: /* @__PURE__ */ jsxs(TableRow, { className: "border-b border-[#112A12] hover:bg-transparent", children: [
          /* @__PURE__ */ jsx(TableHead, { className: "w-16 text-center text-xs font-bold text-white", children: "ID" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Judul Buku / Jilid" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Waktu & Jam Dilihat" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "IP Address" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Device & Browser" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "User Agent" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right text-xs font-bold w-16 text-white", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: logs.data.length > 0 ? logs.data.map((log) => {
          const uaParsed = parseUserAgent(log.user_agent);
          const dateObj = new Date(log.created_at);
          return /* @__PURE__ */ jsxs(TableRow, { className: "hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40", children: [
            /* @__PURE__ */ jsxs(TableCell, { className: "text-center font-mono text-xs text-neutral-400", children: [
              "#",
              log.id
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "max-w-[280px]", children: log.book ? /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ jsxs("div", { className: "font-bold text-xs text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(BookOpen, { className: "w-3.5 h-3.5 text-emerald-600 shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "truncate", children: log.book.title }),
                /* @__PURE__ */ jsxs("span", { className: "font-mono text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded shrink-0", children: [
                  "Vol ",
                  log.book.volume
                ] })
              ] }),
              log.book.publisher && /* @__PURE__ */ jsx("div", { className: "text-[10px] font-mono text-neutral-400", children: log.book.publisher.name })
            ] }) : /* @__PURE__ */ jsxs("span", { className: "text-xs text-neutral-400 italic", children: [
              "Buku ID #",
              log.book_id,
              " (Dihapus)"
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ jsxs("div", { className: "font-mono font-bold text-xs text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-neutral-400" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  dateObj.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                  }),
                  " WIB"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "font-mono text-[10px] text-neutral-400 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Calendar$1, { className: "w-3 h-3 text-neutral-400" }),
                /* @__PURE__ */ jsx("span", { children: dateObj.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                }) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", { className: "font-mono text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md border border-neutral-200/50 dark:border-neutral-700", children: log.ip_address || "127.0.0.1" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              uaParsed.isMobile ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800", children: [
                /* @__PURE__ */ jsx(Smartphone, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsx("span", { children: "Mobile" })
              ] }) : /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800", children: [
                /* @__PURE__ */ jsx(Laptop, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsx("span", { children: "Desktop" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono text-neutral-500 dark:text-neutral-400", children: uaParsed.browser })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "max-w-[180px] truncate font-mono text-[10px] text-neutral-400", title: log.user_agent || "", children: log.user_agent || "-" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer",
                onClick: () => setDeleteItem(log),
                title: "Hapus baris log ini",
                children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            ) })
          ] }, log.id);
        }) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 7, className: "h-32 text-center text-xs text-neutral-500", children: "Belum ada riwayat log kunjungan yang tercatat sesuai kriteria filter." }) }) })
      ] }) }),
      logs.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-neutral-500 pt-2", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "Halaman ",
          logs.current_page,
          " dari ",
          logs.last_page,
          " (",
          logs.total,
          " total log)"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: logs.links.map((link, idx) => {
          let label = link.label;
          if (label.includes("pagination.previous") || label.includes("&laquo;") || label.includes("Previous")) {
            label = "&laquo; Previous";
          } else if (label.includes("pagination.next") || label.includes("&raquo;") || label.includes("Next")) {
            label = "Next &raquo;";
          }
          return /* @__PURE__ */ jsx(
            Link,
            {
              href: link.url || "#",
              preserveScroll: true,
              className: `px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-colors ${link.active ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900" : !link.url ? "opacity-40 cursor-not-allowed border-neutral-200 dark:border-neutral-800" : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100"}`,
              dangerouslySetInnerHTML: { __html: label }
            },
            idx
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: !!deleteItem, onOpenChange: (open) => !open && setDeleteItem(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2 text-red-600", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { children: "Hapus Riwayat Log" })
        ] }),
        /* @__PURE__ */ jsxs(DialogDescription, { className: "text-xs text-neutral-600 dark:text-neutral-400 mt-2", children: [
          "Apakah Anda yakin ingin menghapus data log ID ",
          /* @__PURE__ */ jsxs("strong", { children: [
            "#",
            deleteItem == null ? void 0 : deleteItem.id
          ] }),
          " untuk buku ",
          /* @__PURE__ */ jsx("strong", { children: ((_a = deleteItem == null ? void 0 : deleteItem.book) == null ? void 0 : _a.title) || "buku" }),
          "? Tindakan ini tidak dapat dibatalkan."
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "mt-4 gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setDeleteItem(null),
            disabled: isDeleting,
            children: "Batal"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "destructive",
            size: "sm",
            onClick: confirmDeleteSingle,
            disabled: isDeleting,
            className: "bg-red-600 hover:bg-red-700 text-white font-bold",
            children: isDeleting ? "Menghapus..." : "Ya, Hapus Log"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: showClearConfirm, onOpenChange: setShowClearConfirm, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2 text-red-600", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { children: "Bersihkan Seluruh Log" })
        ] }),
        /* @__PURE__ */ jsxs(DialogDescription, { className: "text-xs text-neutral-600 dark:text-neutral-400 mt-2 space-y-2", children: [
          /* @__PURE__ */ jsx("p", { children: startDate || endDate ? /* @__PURE__ */ jsxs(Fragment, { children: [
            "Anda akan menghapus data log dalam rentang",
            " ",
            /* @__PURE__ */ jsx("strong", { children: startDate ? formatDisplayDate(startDate) : "awal" }),
            " s/d",
            " ",
            /* @__PURE__ */ jsx("strong", { children: endDate ? formatDisplayDate(endDate) : "sekarang" }),
            "."
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            "Anda akan menghapus ",
            /* @__PURE__ */ jsx("strong", { children: "seluruh data log kunjungan" }),
            " yang ada di database."
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-neutral-500", children: /* @__PURE__ */ jsx("em", { children: "Catatan: Jumlah counter views pada masing-masing buku tidak akan terpengaruh atau berkurang." }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "mt-4 gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setShowClearConfirm(false),
            disabled: isDeleting,
            children: "Batal"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "destructive",
            size: "sm",
            onClick: confirmClearLogs,
            disabled: isDeleting,
            className: "bg-red-600 hover:bg-red-700 text-white font-bold",
            children: isDeleting ? "Membersihkan..." : "Bersihkan Sekarang"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: isStartDateOpen, onOpenChange: setIsStartDateOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg w-[92vw] sm:w-[500px] p-6 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "w-full text-center sm:text-center pb-2", children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar$1, { className: "w-4 h-4 text-emerald-600" }),
          /* @__PURE__ */ jsx("span", { children: "Pilih Tanggal Mulai (Dari)" })
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-xs text-neutral-500", children: "Pilih tanggal awal untuk memfilter data log kunjungan buku." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center py-2", children: /* @__PURE__ */ jsx(
        Calendar,
        {
          mode: "single",
          className: "w-full p-4 [--cell-size:3.2rem] rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-2xs",
          classNames: {
            root: "w-full",
            months: "w-full flex flex-col items-center",
            month: "w-full space-y-4",
            month_grid: "w-full border-collapse",
            weekdays: "flex w-full justify-between",
            weekday: "text-muted-foreground flex-1 text-center font-bold text-xs py-1",
            week: "flex w-full justify-between mt-2",
            day: "flex-1 aspect-square flex items-center justify-center p-0"
          },
          selected: startDate ? (() => {
            const parts = startDate.split("-");
            return parts.length === 3 ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)) : void 0;
          })() : void 0,
          onSelect: (date) => {
            if (date) {
              const formatted = toLocalDateString(date);
              setStartDate(formatted);
              setIsStartDateOpen(false);
              handleApplyFilters(formatted, endDate);
            } else {
              setStartDate("");
              setIsStartDateOpen(false);
              handleApplyFilters("", endDate);
            }
          }
        }
      ) }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "w-full mt-3 flex items-center justify-between sm:justify-between", children: [
        startDate ? /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              setStartDate("");
              setIsStartDateOpen(false);
              handleApplyFilters("", endDate);
            },
            className: "text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer",
            children: "Hapus Filter Tanggal"
          }
        ) : /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setIsStartDateOpen(false),
            className: "text-xs font-semibold cursor-pointer",
            children: "Tutup"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: isEndDateOpen, onOpenChange: setIsEndDateOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg w-[92vw] sm:w-[500px] p-6 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "w-full text-center sm:text-center pb-2", children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar$1, { className: "w-4 h-4 text-emerald-600" }),
          /* @__PURE__ */ jsx("span", { children: "Pilih Tanggal Akhir (Sampai)" })
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-xs text-neutral-500", children: "Pilih tanggal akhir untuk memfilter data log kunjungan buku." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center py-2", children: /* @__PURE__ */ jsx(
        Calendar,
        {
          mode: "single",
          className: "w-full p-4 [--cell-size:3.2rem] rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-2xs",
          classNames: {
            root: "w-full",
            months: "w-full flex flex-col items-center",
            month: "w-full space-y-4",
            month_grid: "w-full border-collapse",
            weekdays: "flex w-full justify-between",
            weekday: "text-muted-foreground flex-1 text-center font-bold text-xs py-1",
            week: "flex w-full justify-between mt-2",
            day: "flex-1 aspect-square flex items-center justify-center p-0"
          },
          selected: endDate ? (() => {
            const parts = endDate.split("-");
            return parts.length === 3 ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)) : void 0;
          })() : void 0,
          onSelect: (date) => {
            if (date) {
              const formatted = toLocalDateString(date);
              setEndDate(formatted);
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, formatted);
            } else {
              setEndDate("");
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, "");
            }
          }
        }
      ) }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "w-full mt-3 flex items-center justify-between sm:justify-between", children: [
        endDate ? /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              setEndDate("");
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, "");
            },
            className: "text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer",
            children: "Hapus Filter Tanggal"
          }
        ) : /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setIsEndDateOpen(false),
            className: "text-xs font-semibold cursor-pointer",
            children: "Tutup"
          }
        )
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Logs$2
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$j = [
  {
    title: "Dashboard",
    href: "/admin/dashboard"
  },
  {
    title: "Books",
    href: "/admin/books"
  },
  {
    title: "Keyword Logs",
    href: "/admin/books/search-logs"
  }
];
function SearchLogs$2({ logs, filters: rawFilters, stats, topSearches }) {
  const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
  const [search, setSearch] = useState(filters.search || "");
  const [startDate, setStartDate] = useState(filters.start_date || "");
  const [endDate, setEndDate] = useState(filters.end_date || "");
  const [deleteItem, setDeleteItem] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);
  const handleApplyFilters = (newStart, newEnd, newSearch) => {
    const queryStart = newStart !== void 0 ? newStart : startDate;
    const queryEnd = newEnd !== void 0 ? newEnd : endDate;
    const querySearch = newSearch !== void 0 ? newSearch : search;
    router.get(
      route("admin.books.search-logs"),
      {
        search: querySearch || void 0,
        start_date: queryStart || void 0,
        end_date: queryEnd || void 0
      },
      { preserveState: true, preserveScroll: true }
    );
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleApplyFilters();
  };
  const handleReset = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    router.get(route("admin.books.search-logs"), {}, { preserveScroll: true });
  };
  const toLocalDateString = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    }
    return dateString;
  };
  const confirmDeleteSingle = () => {
    if (!deleteItem) return;
    setIsDeleting(true);
    router.delete(route("admin.books.search-logs.destroy", deleteItem.id), {
      preserveScroll: true,
      onFinish: () => {
        setIsDeleting(false);
        setDeleteItem(null);
      }
    });
  };
  const confirmClearLogs = () => {
    setIsDeleting(true);
    router.delete(route("admin.books.search-logs.clear"), {
      data: {
        search: search || void 0,
        start_date: startDate || void 0,
        end_date: endDate || void 0
      },
      preserveScroll: true,
      onFinish: () => {
        setIsDeleting(false);
        setShowClearConfirm(false);
      }
    });
  };
  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$j, children: [
    /* @__PURE__ */ jsx(Head, { title: "Keyword Logs Pencarian Buku" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-5 p-4 sm:p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Link, { href: route("admin.books.index"), children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) }) }),
            /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white", children: [
              /* @__PURE__ */ jsx(SearchCode, { className: "w-6 h-6 text-[#112A12] dark:text-emerald-400" }),
              /* @__PURE__ */ jsx("span", { children: "Log Kata Kunci Pencarian Buku" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 ml-10", children: "Riwayat kata kunci yang dicari pengunjung di katalog buku. Otomatis dibersihkan dari spasi berlebih, huruf kecil, serta pencegahan spam kata berulang." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap sm:flex-nowrap", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: route("admin.books.search-logs.export", {
                search: filters.search,
                start_date: filters.start_date,
                end_date: filters.end_date
              }),
              target: "_blank",
              rel: "noopener noreferrer",
              download: true,
              children: /* @__PURE__ */ jsxs(
                Button,
                {
                  className: "bg-[#0F9D58] hover:bg-[#0b8043] text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs",
                  title: "Download format CSV yang kompatibel langsung dengan Google Sheets & Excel",
                  children: [
                    /* @__PURE__ */ jsx(FileSpreadsheet, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsx("span", { children: "Export Google Sheets" })
                  ]
                }
              )
            }
          ),
          logs.data.length > 0 && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => setShowClearConfirm(true),
              className: "h-9 px-3 text-xs font-bold flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 border-red-200 dark:border-red-900/50 cursor-pointer",
              title: "Bersihkan log (seluruhnya atau sesuai filter tanggal/kata kunci)",
              children: [
                /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Bersihkan Log" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => router.reload(),
              className: "h-9 px-3 text-xs font-bold flex items-center gap-1.5 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Refresh" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Total Frekuensi Pencarian" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-neutral-900 dark:text-white", children: stats.total_searches.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-[#112A12]/10 dark:bg-emerald-950/40 text-[#112A12] dark:text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(Search, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Pencarian Hari Ini" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-emerald-600 dark:text-emerald-400", children: stats.today_searches.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Kata Kunci Unik" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-blue-600 dark:text-blue-400", children: stats.unique_keywords.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(Hash, { className: "w-5 h-5" }) })
        ] })
      ] }),
      topSearches && topSearches.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-[#DA6B1C] shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-mono font-bold uppercase text-neutral-700 dark:text-neutral-300", children: "Top Kata Kunci Terpopuler:" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 flex-wrap", children: topSearches.map((item, idx) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              setSearch(item.keyword);
              handleApplyFilters(void 0, void 0, item.keyword);
            },
            className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-emerald-500 text-neutral-800 dark:text-neutral-200 cursor-pointer shadow-3xs transition-all",
            children: [
              /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#112A12] dark:text-emerald-400", children: [
                "#",
                idx + 1
              ] }),
              /* @__PURE__ */ jsx("span", { children: item.keyword }),
              /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-mono text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-900 px-1.5 py-0.5 rounded", children: [
                Number(item.total_count).toLocaleString("id-ID"),
                "x"
              ] })
            ]
          },
          idx
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-2xs", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSearchSubmit, className: "flex items-center gap-2 flex-1 max-w-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Cari kata kunci...",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-9 h-9 text-xs"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "secondary", className: "h-9 px-3 text-xs font-bold", children: "Cari" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-neutral-500 dark:text-neutral-400", children: "Dari:" }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                onClick: () => setIsStartDateOpen(true),
                className: `h-9 px-3 text-xs font-medium justify-start text-left gap-2 border-neutral-200 dark:border-neutral-800 ${!startDate && "text-neutral-400"}`,
                children: [
                  /* @__PURE__ */ jsx(Calendar$1, { className: "w-3.5 h-3.5 text-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { children: startDate ? formatDisplayDate(startDate) : "Pilih Tanggal" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-neutral-500 dark:text-neutral-400", children: "Sampai:" }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                onClick: () => setIsEndDateOpen(true),
                className: `h-9 px-3 text-xs font-medium justify-start text-left gap-2 border-neutral-200 dark:border-neutral-800 ${!endDate && "text-neutral-400"}`,
                children: [
                  /* @__PURE__ */ jsx(Calendar$1, { className: "w-3.5 h-3.5 text-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { children: endDate ? formatDisplayDate(endDate) : "Pilih Tanggal" })
                ]
              }
            )
          ] }),
          (search || startDate || endDate) && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleReset,
              className: "h-9 text-xs font-bold flex items-center gap-1 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Reset Filter" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-2xs", children: [
        /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { className: "bg-neutral-50/70 dark:bg-neutral-800/50", children: /* @__PURE__ */ jsxs(TableRow, { className: "border-neutral-200 dark:border-neutral-800", children: [
            /* @__PURE__ */ jsx(TableHead, { className: "w-[80px] text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "ID" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "Kata Kunci (Keyword)" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "Frekuensi Pencarian" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "Tanggal Pencarian" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "Terakhir Dicari" }),
            /* @__PURE__ */ jsx(TableHead, { className: "w-[100px] text-right text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "Aksi" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: logs.data.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 6, className: "h-48 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-2 text-neutral-400 dark:text-neutral-500", children: [
            /* @__PURE__ */ jsx(SearchCode, { className: "w-8 h-8 stroke-1" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Belum ada riwayat kata kunci pencarian" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-400", children: "Kata kunci pencarian yang diketik pengunjung di katalog buku akan otomatis dicatat di sini." })
          ] }) }) }) : logs.data.map((log) => {
            return /* @__PURE__ */ jsxs(
              TableRow,
              {
                className: "border-neutral-100 dark:border-neutral-800/60 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors",
                children: [
                  /* @__PURE__ */ jsxs(TableCell, { className: "font-mono text-xs text-neutral-400", children: [
                    "#",
                    log.id
                  ] }),
                  /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("span", { className: "font-medium font-mono text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md border border-neutral-200/60 dark:border-neutral-700", children: log.keyword }) }) }),
                  /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40", children: [
                    /* @__PURE__ */ jsx(TrendingUp, { className: "w-3 h-3 text-emerald-600 dark:text-emerald-400" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      log.search_count.toLocaleString("id-ID"),
                      "x dicari"
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-300 font-sans", children: [
                    /* @__PURE__ */ jsx(Calendar$1, { className: "w-3.5 h-3.5 text-neutral-400" }),
                    /* @__PURE__ */ jsx("span", { children: formatDisplayDate(log.search_date) })
                  ] }) }),
                  /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-mono", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-neutral-400" }),
                    /* @__PURE__ */ jsx("span", { children: formatDateTime(log.updated_at) })
                  ] }) }),
                  /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      onClick: () => setDeleteItem(log),
                      className: "h-8 w-8 text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg cursor-pointer",
                      title: "Hapus log kata kunci ini",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                    }
                  ) })
                ]
              },
              log.id
            );
          }) })
        ] }),
        logs.total > logs.per_page && /* @__PURE__ */ jsxs("div", { className: "p-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-neutral-500", children: [
            "Menampilkan ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-neutral-800 dark:text-neutral-200", children: logs.from || 0 }),
            " sampai",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-neutral-800 dark:text-neutral-200", children: logs.to || 0 }),
            " dari",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-neutral-800 dark:text-neutral-200", children: logs.total }),
            " data"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: logs.links.map((link, idx) => {
            if (link.url === null) {
              return /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  disabled: true,
                  dangerouslySetInnerHTML: { __html: link.label },
                  className: "h-8 text-xs font-semibold opacity-50 cursor-not-allowed"
                },
                idx
              );
            }
            return /* @__PURE__ */ jsx(Link, { href: link.url, preserveScroll: true, preserveState: true, children: /* @__PURE__ */ jsx(
              Button,
              {
                variant: link.active ? "default" : "outline",
                size: "sm",
                dangerouslySetInnerHTML: { __html: link.label },
                className: `h-8 text-xs font-semibold ${link.active ? "bg-[#112A12] text-white hover:bg-[#112A12]/90" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"}`
              }
            ) }, idx);
          }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: !!deleteItem, onOpenChange: (open) => !open && setDeleteItem(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md p-6", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-1", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white", children: "Hapus Log Kata Kunci?" }),
        /* @__PURE__ */ jsxs(DialogDescription, { className: "text-xs text-neutral-500 dark:text-neutral-400", children: [
          "Apakah Anda yakin ingin menghapus riwayat kata kunci ",
          /* @__PURE__ */ jsxs("span", { className: "font-bold text-neutral-900 dark:text-white font-mono", children: [
            '"',
            deleteItem == null ? void 0 : deleteItem.keyword,
            '"'
          ] }),
          " pada tanggal ",
          /* @__PURE__ */ jsx("span", { className: "font-bold text-neutral-900 dark:text-white", children: formatDisplayDate(deleteItem == null ? void 0 : deleteItem.search_date) }),
          "? Tindakan ini tidak dapat dibatalkan."
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "mt-4 flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            disabled: isDeleting,
            onClick: () => setDeleteItem(null),
            className: "text-xs font-semibold cursor-pointer",
            children: "Batal"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "destructive",
            size: "sm",
            disabled: isDeleting,
            onClick: confirmDeleteSingle,
            className: "text-xs font-semibold cursor-pointer bg-red-600 hover:bg-red-700 text-white",
            children: isDeleting ? "Menghapus..." : "Ya, Hapus Log"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: showClearConfirm, onOpenChange: setShowClearConfirm, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md p-6", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-1", children: /* @__PURE__ */ jsx(Trash2, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white", children: "Bersihkan Riwayat Log Kata Kunci?" }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-xs text-neutral-500 dark:text-neutral-400 space-y-1.5", children: /* @__PURE__ */ jsx("p", { children: startDate || endDate || search ? /* @__PURE__ */ jsxs("span", { children: [
          "Data log kata kunci pencarian yang sesuai dengan ",
          /* @__PURE__ */ jsx("strong", { children: "filter aktif saat ini" }),
          " akan dihapus permanen."
        ] }) : /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsxs("strong", { children: [
            "Seluruh (",
            stats.total_searches.toLocaleString("id-ID"),
            ")"
          ] }),
          " data log kata kunci pencarian akan dihapus secara permanen dari database."
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "mt-4 flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            disabled: isDeleting,
            onClick: () => setShowClearConfirm(false),
            className: "text-xs font-semibold cursor-pointer",
            children: "Batal"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "destructive",
            size: "sm",
            disabled: isDeleting,
            onClick: confirmClearLogs,
            className: "text-xs font-semibold cursor-pointer bg-red-600 hover:bg-red-700 text-white",
            children: isDeleting ? "Membersihkan..." : "Ya, Bersihkan Sekarang"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: isStartDateOpen, onOpenChange: setIsStartDateOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg w-[92vw] sm:w-[500px] p-6 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "w-full text-center sm:text-center pb-2", children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar$1, { className: "w-4 h-4 text-emerald-600" }),
          /* @__PURE__ */ jsx("span", { children: "Pilih Tanggal Mulai (Dari)" })
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-xs text-neutral-500", children: "Pilih tanggal awal untuk memfilter data log kata kunci pencarian." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center py-2", children: /* @__PURE__ */ jsx(
        Calendar,
        {
          mode: "single",
          className: "w-full p-4 [--cell-size:3.2rem] rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-2xs",
          classNames: {
            root: "w-full",
            months: "w-full flex flex-col items-center",
            month: "w-full space-y-4",
            month_grid: "w-full border-collapse",
            weekdays: "flex w-full justify-between",
            weekday: "text-muted-foreground flex-1 text-center font-bold text-xs py-1",
            week: "flex w-full justify-between mt-2",
            day: "flex-1 aspect-square flex items-center justify-center p-0"
          },
          selected: startDate ? (() => {
            const parts = startDate.split("-");
            return parts.length === 3 ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)) : void 0;
          })() : void 0,
          onSelect: (date) => {
            if (date) {
              const formatted = toLocalDateString(date);
              setStartDate(formatted);
              setIsStartDateOpen(false);
              handleApplyFilters(formatted, endDate);
            } else {
              setStartDate("");
              setIsStartDateOpen(false);
              handleApplyFilters("", endDate);
            }
          }
        }
      ) }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "w-full mt-3 flex items-center justify-between sm:justify-between", children: [
        startDate ? /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              setStartDate("");
              setIsStartDateOpen(false);
              handleApplyFilters("", endDate);
            },
            className: "text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer",
            children: "Hapus Filter Tanggal"
          }
        ) : /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setIsStartDateOpen(false),
            className: "text-xs font-semibold cursor-pointer",
            children: "Tutup"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: isEndDateOpen, onOpenChange: setIsEndDateOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg w-[92vw] sm:w-[500px] p-6 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "w-full text-center sm:text-center pb-2", children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar$1, { className: "w-4 h-4 text-emerald-600" }),
          /* @__PURE__ */ jsx("span", { children: "Pilih Tanggal Akhir (Sampai)" })
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-xs text-neutral-500", children: "Pilih tanggal akhir untuk memfilter data log kata kunci pencarian." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center py-2", children: /* @__PURE__ */ jsx(
        Calendar,
        {
          mode: "single",
          className: "w-full p-4 [--cell-size:3.2rem] rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-2xs",
          classNames: {
            root: "w-full",
            months: "w-full flex flex-col items-center",
            month: "w-full space-y-4",
            month_grid: "w-full border-collapse",
            weekdays: "flex w-full justify-between",
            weekday: "text-muted-foreground flex-1 text-center font-bold text-xs py-1",
            week: "flex w-full justify-between mt-2",
            day: "flex-1 aspect-square flex items-center justify-center p-0"
          },
          selected: endDate ? (() => {
            const parts = endDate.split("-");
            return parts.length === 3 ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)) : void 0;
          })() : void 0,
          onSelect: (date) => {
            if (date) {
              const formatted = toLocalDateString(date);
              setEndDate(formatted);
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, formatted);
            } else {
              setEndDate("");
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, "");
            }
          }
        }
      ) }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "w-full mt-3 flex items-center justify-between sm:justify-between", children: [
        endDate ? /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              setEndDate("");
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, "");
            },
            className: "text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer",
            children: "Hapus Filter Tanggal"
          }
        ) : /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setIsEndDateOpen(false),
            className: "text-xs font-semibold cursor-pointer",
            children: "Tutup"
          }
        )
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SearchLogs$2
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$i = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Books",
    href: "/admin/books"
  },
  {
    title: "Volume Order",
    href: "/admin/books/volume-order"
  }
];
function VolumeOrder({ seriesList }) {
  const { errors } = usePage().props;
  const [selectedSeriesId, setSelectedSeriesId] = useState("");
  const [volumes, setVolumes] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const fetchVolumes = (seriesId) => {
    if (!seriesId || seriesId === "none") {
      setVolumes([]);
      return;
    }
    fetch(route("admin.books.volume-order.volumes", seriesId)).then((res) => res.json()).then((data) => {
      const fetchedVolumes = data.volumes || [];
      setVolumes(fetchedVolumes);
      setHasChanges(false);
    }).catch(() => {
      toast.error("Gagal memuat data volume.");
    });
  };
  useEffect(() => {
    if (selectedSeriesId && selectedSeriesId !== "none") {
      fetchVolumes(selectedSeriesId);
    } else {
      setVolumes([]);
    }
  }, [selectedSeriesId]);
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };
  const handleDragOver = (e, dragOverIndex) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    const newVolumes = [...volumes];
    const draggedItem = newVolumes[draggedIndex];
    const dragOverItem = newVolumes[dragOverIndex];
    newVolumes[draggedIndex] = dragOverItem;
    newVolumes[dragOverIndex] = draggedItem;
    setVolumes(newVolumes);
    setDraggedIndex(dragOverIndex);
    setHasChanges(true);
  };
  const handleDragEnd = () => {
    setDraggedIndex(null);
  };
  const handleSaveOrder = () => {
    var _a;
    if (volumes.length === 0) return;
    setProcessing(true);
    const orders = volumes.map((vol, index) => ({
      id: vol.id,
      sort_order: index
    }));
    fetch(route("admin.books.volume-order.update"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": ((_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content")) || "",
        "Accept": "application/json"
      },
      body: JSON.stringify({ orders })
    }).then((res) => res.json()).then((data) => {
      if (data.success) {
        toast.success(data.message || "Urutan volume berhasil disimpan.");
        setHasChanges(false);
      } else {
        toast.error("Gagal menyimpan urutan volume.");
      }
    }).catch(() => {
      toast.error("Terjadi kesalahan saat menyimpan.");
    }).finally(() => {
      setProcessing(false);
    });
  };
  const handleRefresh = () => {
    if (selectedSeriesId && selectedSeriesId !== "none") {
      fetchVolumes(selectedSeriesId);
    }
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$i, children: [
    /* @__PURE__ */ jsx(Head, { title: "Atur Urutan Volume" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-6 p-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Atur Urutan Volume" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Seret dan lepas untuk mengatur urutan volume dalam sebuah series." })
      ] }),
      (errors == null ? void 0 : errors.error) && /* @__PURE__ */ jsx("p", { className: "text-destructive text-sm", children: errors.error }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-end", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 max-w-xs", children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium mb-1 block", children: "Pilih Series" }),
          /* @__PURE__ */ jsxs(Select, { value: selectedSeriesId, onValueChange: setSelectedSeriesId, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih series" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "Tidak ada" }),
              seriesList.map((item) => /* @__PURE__ */ jsx(SelectItem, { value: String(item.id), children: item.title }, item.id))
            ] })
          ] })
        ] }),
        selectedSeriesId && selectedSeriesId !== "none" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: handleRefresh,
              disabled: processing,
              children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-1" }),
                "Refresh"
              ]
            }
          ),
          hasChanges && /* @__PURE__ */ jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              onClick: handleSaveOrder,
              disabled: processing,
              children: [
                /* @__PURE__ */ jsx(Save, { className: "w-4 h-4 mr-1" }),
                processing ? "Menyimpan..." : "Simpan Urutan"
              ]
            }
          )
        ] })
      ] }),
      selectedSeriesId && selectedSeriesId !== "none" && /* @__PURE__ */ jsx("div", { className: "border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden", children: volumes.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-6 text-center text-neutral-500", children: "Tidak ada volume dalam series ini." }) : /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-neutral-100 dark:bg-neutral-800", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "p-3 text-left text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase", children: "Grip" }),
          /* @__PURE__ */ jsx("th", { className: "p-3 text-left text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase", children: "Volume" }),
          /* @__PURE__ */ jsx("th", { className: "p-3 text-left text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase", children: "Judul" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: volumes.map((vol, index) => /* @__PURE__ */ jsxs(
          "tr",
          {
            draggable: true,
            onDragStart: () => handleDragStart(index),
            onDragOver: (e) => handleDragOver(e, index),
            onDragEnd: handleDragEnd,
            className: "border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50",
            children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 cursor-grab", children: /* @__PURE__ */ jsx(GripVertical, { className: "w-5 h-5 text-neutral-500" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 font-medium", children: vol.volume }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-sm text-neutral-600 dark:text-neutral-300", children: vol.title })
            ]
          },
          vol.id
        )) })
      ] }) })
    ] })
  ] });
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VolumeOrder
}, Symbol.toStringTag, { value: "Module" }));
function EditionForm({
  initialValues,
  submitLabel,
  onSubmit
}) {
  const form = useForm({
    name: (initialValues == null ? void 0 : initialValues.name) ?? ""
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "max-w-xl space-y-6",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Nama Edisi" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              value: form.data.name,
              onChange: (event) => form.setData(
                "name",
                event.target.value
              ),
              placeholder: "Contoh: Regular Edition",
              disabled: form.processing
            }
          ),
          form.errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.name })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            disabled: form.processing || !form.data.name.trim(),
            children: form.processing ? "Menyimpan..." : submitLabel
          }
        ) })
      ]
    }
  );
}
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditionForm
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$h = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Editions",
    href: "/admin/editions"
  },
  {
    title: "Tambah Edisi",
    href: "/admin/editions/create"
  }
];
function CreateEdition() {
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$h, children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah Edisi" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Tambah Edisi" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Tambahkan jenis edisi buku baru." })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            asChild: true,
            children: /* @__PURE__ */ jsx(
              Link,
              {
                href: route(
                  "admin.editions.index"
                ),
                children: "Kembali"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border bg-card p-6", children: /* @__PURE__ */ jsx(
        EditionForm,
        {
          submitLabel: "Simpan Edisi",
          onSubmit: (form) => {
            form.post(
              route(
                "admin.editions.store"
              )
            );
          }
        }
      ) })
    ] })
  ] });
}
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateEdition
}, Symbol.toStringTag, { value: "Module" }));
function EditEdition({
  edition
}) {
  const breadcrumbs2 = [
    {
      title: "Dashboard",
      href: "/dashboard"
    },
    {
      title: "Editions",
      href: "/admin/editions"
    },
    {
      title: "Edit Edisi",
      href: `/admin/editions/${edition.id}/edit`
    }
  ];
  const form = useForm({
    name: edition.name
  });
  const submit = (event) => {
    event.preventDefault();
    form.put(
      route(
        "admin.editions.update",
        edition.id
      )
    );
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs2, children: [
    /* @__PURE__ */ jsx(
      Head,
      {
        title: `Edit Edisi - ${edition.name}`
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Edit Edisi" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Perbarui informasi edisi." })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            asChild: true,
            children: /* @__PURE__ */ jsx(
              Link,
              {
                href: route(
                  "admin.editions.index"
                ),
                children: "Kembali"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border bg-card p-6", children: /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: submit,
          className: "max-w-xl space-y-6",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Nama Edisi" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "name",
                  value: form.data.name,
                  onChange: (event) => form.setData(
                    "name",
                    event.target.value
                  ),
                  disabled: form.processing
                }
              ),
              form.errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "slug", children: "Slug" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "slug",
                  value: edition.slug,
                  disabled: true
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Slug dibuat otomatis berdasarkan nama edisi." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  disabled: form.processing || !form.data.name.trim(),
                  children: form.processing ? "Menyimpan..." : "Simpan Perubahan"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  asChild: true,
                  children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route(
                        "admin.editions.index"
                      ),
                      children: "Batal"
                    }
                  )
                }
              )
            ] })
          ]
        }
      ) })
    ] })
  ] });
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditEdition
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$g = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Editions",
    href: "/admin/editions"
  }
];
function EditionIndex({
  editions
}) {
  const [deleteEdition, setDeleteEdition] = useState(null);
  const handleDelete = () => {
    if (!deleteEdition) {
      return;
    }
    router.delete(
      route(
        "admin.editions.destroy",
        deleteEdition.id
      ),
      {
        preserveScroll: true,
        onSuccess: () => {
          setDeleteEdition(null);
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$g, children: [
    /* @__PURE__ */ jsx(Head, { title: "Editions" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Editions" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Kelola edisi buku." })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: route(
              "admin.editions.create"
            ),
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
              "Tambah Edisi"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border bg-card", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Edisi" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Slug" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Jumlah Buku" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: editions.data.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
          TableCell,
          {
            colSpan: 4,
            className: "h-24 text-center",
            children: "Belum ada edisi."
          }
        ) }) : editions.data.map((edition) => /* @__PURE__ */ jsxs(
          TableRow,
          {
            children: [
              /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: edition.name }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-muted-foreground", children: edition.slug }),
              /* @__PURE__ */ jsx(TableCell, { children: edition.books_count ?? 0 }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    asChild: true,
                    children: /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: route(
                          "admin.editions.edit",
                          edition.id
                        ),
                        children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: () => setDeleteEdition(
                      edition
                    ),
                    children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" })
                  }
                )
              ] }) })
            ]
          },
          edition.id
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      AlertDialog,
      {
        open: Boolean(deleteEdition),
        onOpenChange: (open) => {
          if (!open) {
            setDeleteEdition(null);
          }
        },
        children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Hapus Edisi?" }),
            /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
              "Apakah Anda yakin ingin menghapus edisi",
              " ",
              /* @__PURE__ */ jsx("strong", { children: deleteEdition == null ? void 0 : deleteEdition.name }),
              "?"
            ] })
          ] }),
          /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Batal" }),
            /* @__PURE__ */ jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                children: "Hapus"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditionIndex
}, Symbol.toStringTag, { value: "Module" }));
function GenreForm({
  initialValues,
  submitLabel,
  onSubmit
}) {
  const form = useForm({
    name: (initialValues == null ? void 0 : initialValues.name) ?? ""
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Nama Genre" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              value: form.data.name,
              onChange: (event) => form.setData(
                "name",
                event.target.value
              ),
              placeholder: "Contoh: Action",
              disabled: form.processing
            }
          ),
          form.errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.name })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            disabled: form.processing || !form.data.name.trim(),
            children: form.processing ? "Menyimpan..." : submitLabel
          }
        ) })
      ]
    }
  );
}
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GenreForm
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$f = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Genres",
    href: "/admin/genres"
  },
  {
    title: "Tambah",
    href: "/admin/genres/create"
  }
];
function CreateGenre() {
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$f, children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah Genre" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Tambah Genre" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Tambahkan genre baru." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border bg-card p-6", children: /* @__PURE__ */ jsx(
        GenreForm,
        {
          submitLabel: "Simpan Genre",
          onSubmit: (form) => {
            form.post(
              route(
                "admin.genres.store"
              )
            );
          }
        }
      ) })
    ] })
  ] });
}
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateGenre
}, Symbol.toStringTag, { value: "Module" }));
function EditGenre({
  genre
}) {
  const breadcrumbs2 = [
    {
      title: "Dashboard",
      href: "/dashboard"
    },
    {
      title: "Genres",
      href: "/admin/genres"
    },
    {
      title: "Edit Genre",
      href: `/admin/genres/${genre.id}/edit`
    }
  ];
  const form = useForm({
    name: genre.name
  });
  const submit = (event) => {
    event.preventDefault();
    form.put(
      route(
        "admin.genres.update",
        genre.id
      )
    );
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs2, children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit Genre - ${genre.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Edit Genre" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Perbarui informasi genre." })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            asChild: true,
            children: /* @__PURE__ */ jsx(
              Link,
              {
                href: route(
                  "admin.genres.index"
                ),
                children: "Kembali"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border bg-card p-6", children: /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: submit,
          className: "max-w-xl space-y-6",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Nama Genre" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "name",
                  type: "text",
                  value: form.data.name,
                  onChange: (event) => form.setData(
                    "name",
                    event.target.value
                  ),
                  placeholder: "Contoh: Action",
                  disabled: form.processing
                }
              ),
              form.errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "slug", children: "Slug" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "slug",
                  type: "text",
                  value: genre.slug,
                  disabled: true
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Slug dibuat otomatis oleh sistem berdasarkan nama genre." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  disabled: form.processing || !form.data.name.trim(),
                  children: form.processing ? "Menyimpan..." : "Simpan Perubahan"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  asChild: true,
                  children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route(
                        "admin.genres.index"
                      ),
                      children: "Batal"
                    }
                  )
                }
              )
            ] })
          ]
        }
      ) })
    ] })
  ] });
}
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditGenre
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$e = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Genres",
    href: "/admin/genres"
  }
];
function GenreIndex({
  genres
}) {
  const [deleteGenre, setDeleteGenre] = useState(null);
  const sortedGenres = useMemo(
    () => [...genres.data].sort(
      (a, b) => a.name.localeCompare(b.name, "id", {
        sensitivity: "base"
      })
    ),
    [genres.data]
  );
  const handleDelete = () => {
    if (!deleteGenre) {
      return;
    }
    router.delete(
      route(
        "admin.genres.destroy",
        deleteGenre.id
      ),
      {
        preserveScroll: true,
        onSuccess: () => {
          setDeleteGenre(null);
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$e, children: [
    /* @__PURE__ */ jsx(Head, { title: "Genres" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Genres" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Kelola genre buku." })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: route(
              "admin.genres.create"
            ),
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
              "Tambah Genre"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border bg-card", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Genre" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Slug" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Jumlah Buku" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: sortedGenres.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
          TableCell,
          {
            colSpan: 4,
            className: "h-24 text-center",
            children: "Belum ada genre."
          }
        ) }) : sortedGenres.map((genre) => /* @__PURE__ */ jsxs(
          TableRow,
          {
            children: [
              /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: genre.name }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-muted-foreground", children: genre.slug }),
              /* @__PURE__ */ jsx(TableCell, { children: genre.books_count ?? 0 }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    asChild: true,
                    children: /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: route(
                          "admin.genres.edit",
                          genre.id
                        ),
                        children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: () => setDeleteGenre(
                      genre
                    ),
                    children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" })
                  }
                )
              ] }) })
            ]
          },
          genre.id
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      AlertDialog,
      {
        open: Boolean(deleteGenre),
        onOpenChange: (open) => {
          if (!open) {
            setDeleteGenre(null);
          }
        },
        children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Hapus Genre?" }),
            /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
              "Apakah Anda yakin ingin menghapus genre",
              " ",
              /* @__PURE__ */ jsx("strong", { children: deleteGenre == null ? void 0 : deleteGenre.name }),
              "?"
            ] })
          ] }),
          /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Batal" }),
            /* @__PURE__ */ jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                children: "Hapus"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GenreIndex
}, Symbol.toStringTag, { value: "Module" }));
const MERCH_TYPES$1 = [
  { value: "manga", label: "Manga / Buku" },
  { value: "light_novel", label: "Light Novel" },
  { value: "novel", label: "Novel" },
  { value: "trading_card", label: "Trading Card" },
  { value: "apparel", label: "Apparel" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "tas", label: "Tas" },
  { value: "aksesoris", label: "Aksesoris" },
  { value: "gaming", label: "Gaming" },
  { value: "dekorasi", label: "Dekorasi" }
];
const ITEM_CATEGORIES$1 = [
  { id: "manga", label: "Manga / Komik" },
  { id: "light_novel", label: "Light Novel" },
  { id: "novel", label: "Novel" },
  { id: "apparel", label: "Apparel / Kaos / Jaket" },
  { id: "trading_card", label: "Trading Card / TCG" },
  { id: "figurine", label: "Figure / Model Kit" },
  { id: "tas", label: "Tas / Pouch" },
  { id: "aksesoris", label: "Aksesoris / Gantungan Kunci" },
  { id: "lifestyle", label: "Lifestyle / Tumbler / Mug" },
  { id: "gaming", label: "Gaming / Deskmat / Mousepad" },
  { id: "dekorasi", label: "Dekorasi / Poster / Wall Scroll" },
  { id: "artbook", label: "Artbook / Fanbook" },
  { id: "stationery", label: "Stationery / Buku Catatan" }
];
const CONDITION_RATINGS$1 = [
  { id: "S", label: "Grade S (Kolektor / Mulus Sempurna)" },
  { id: "A", label: "Grade A (Sangat Bagus / Sekali Baca)" },
  { id: "B", label: "Grade B (Bagus / Sedikit Jejak Baca)" },
  { id: "C", label: "Grade C (Cukup / Kertas Menguning Wajar)" },
  { id: "D", label: "Grade D (Bacaan Harian / Ada Minus Fisik)" }
];
const breadcrumbs$d = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Kios & Preloved", href: "/admin/kios" },
  { title: "Tambah Item", href: "/admin/kios/create" }
];
function KiosCreate({ partners = [], ageRatings = [] }) {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    merch_type: "manga",
    categories: ["manga"],
    cover_image: "",
    carousel_images: ["", "", "", ""],
    carousel_labels: ["Cover Depan", "Punggung Buku (Spine)", "Cover Belakang", "Halaman Kertas"],
    deskripsi_produk: "",
    notes: "",
    price: "",
    original_price: "",
    condition_rating: "S",
    is_preloved: true,
    is_sold_out: false,
    rating: 5,
    kios_partner_id: "",
    publisher_name: "",
    publisher_id: "",
    author: "",
    reading_rating: "Remaja",
    status: "completed",
    demographic: "General",
    isbn: "",
    release_date: "",
    cetakan_info: "",
    shopee_url: "",
    tokopedia_url: "",
    gramedia_url: "",
    toco_url: ""
  });
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const toggleCategory = (catId) => {
    const current = [...data.categories];
    if (current.includes(catId)) {
      if (current.length > 1) {
        setData("categories", current.filter((c) => c !== catId));
      }
    } else {
      setData("categories", [...current, catId]);
    }
  };
  const removeCategory = (catId, e) => {
    e.stopPropagation();
    if (data.categories.length > 1) {
      setData("categories", data.categories.filter((c) => c !== catId));
    }
  };
  const handlePartnerChange = (partnerId) => {
    setData("kios_partner_id", partnerId);
    const partner = partners.find((p) => String(p.id) === partnerId);
    if (partner) {
      setData((prev) => ({
        ...prev,
        kios_partner_id: partnerId,
        publisher_name: partner.name,
        publisher_id: partner.slug
      }));
    }
  };
  const handleCoverImageChange = (val) => {
    const updatedCarousel = [...data.carousel_images];
    updatedCarousel[0] = val;
    setData((prev) => ({
      ...prev,
      cover_image: val,
      carousel_images: updatedCarousel
    }));
  };
  const handleCarouselImageChange = (index, val) => {
    const updated = [...data.carousel_images];
    updated[index] = val;
    if (index === 0) {
      setData((prev) => ({
        ...prev,
        cover_image: val,
        carousel_images: updated
      }));
    } else {
      setData("carousel_images", updated);
    }
  };
  const handleCarouselLabelChange = (index, val) => {
    const updated = [...data.carousel_labels];
    updated[index] = val;
    setData("carousel_labels", updated);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("admin.kios.store"));
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$d, children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah Item Kios & Preloved" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto p-4 sm:p-6 space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Link, { href: route("admin.kios.index"), children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-9 w-9", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-neutral-900 dark:text-white", children: "Tambah Item Kios & Preloved Baru" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500", children: "Buat listing item preloved review atau produk kolaborasi partner merchandise." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-neutral-500", children: "Tipe Listing Kios" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${data.is_preloved ? "border-pink-500 bg-pink-50/50 dark:bg-pink-950/20 ring-1 ring-pink-500" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50"}`, children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  name: "is_preloved",
                  checked: data.is_preloved,
                  onChange: () => {
                    setData("is_preloved", true);
                  },
                  className: "mt-1"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold text-sm text-pink-900 dark:text-pink-200 flex items-center gap-1.5", children: /* @__PURE__ */ jsx("span", { children: "🌸 Preloved Reviewer (@konotasi)" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-550 dark:text-neutral-400", children: "Buku/komik bekas ulasan berkualitas tinggi dengan grade kondisi fisik, catatan minus, dan slider galeri detail fisik." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${!data.is_preloved ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-1 ring-emerald-500" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50"}`, children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  name: "is_preloved",
                  checked: !data.is_preloved,
                  onChange: () => {
                    setData("is_preloved", false);
                  },
                  className: "mt-1"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5", children: /* @__PURE__ */ jsx("span", { children: "🛍️ Partner Merchandise / Official" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-550 dark:text-neutral-400", children: "Merchandise resmi partner (Apparel, TCG, Lifestyle, Figure) atau buku original baru dari penerbit." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Tag, { className: "w-4 h-4 text-neutral-600" }),
            /* @__PURE__ */ jsx("span", { children: "Informasi Utama Produk" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "title", className: "text-xs font-semibold", children: "Judul Produk Listing *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "title",
                  value: data.title,
                  onChange: (e) => setData("title", e.target.value),
                  placeholder: "Contoh: Frieren Vol 1 (Preloved) / Jujutsu Kaisen Oversized Shirt",
                  required: true
                }
              ),
              errors.title && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: errors.title })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "author", className: "text-xs font-semibold", children: "Author / Creator / Brand" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "author",
                  value: data.author,
                  onChange: (e) => setData("author", e.target.value),
                  placeholder: "Contoh: Kanehito Yamada / Bandai / Studio Mappa"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs(Label, { htmlFor: "merch_type", className: "text-xs font-semibold flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Layers, { className: "w-3.5 h-3.5 text-neutral-500" }),
                /* @__PURE__ */ jsx("span", { children: "Tipe Merch (Kategori Utama) *" })
              ] }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  id: "merch_type",
                  value: data.merch_type,
                  onChange: (e) => setData("merch_type", e.target.value),
                  className: "w-full h-9 px-3 rounded-md border border-input bg-background text-xs font-medium",
                  required: true,
                  children: MERCH_TYPES$1.map((m) => /* @__PURE__ */ jsx("option", { value: m.value, children: m.label }, m.value))
                }
              ),
              errors.merch_type && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: errors.merch_type })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs(Label, { htmlFor: "kios_partner_id", className: "text-xs font-semibold flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsx(Store, { className: "w-3.5 h-3.5 text-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { children: "Nama Partner / Toko / Penerbit" })
                ] }),
                /* @__PURE__ */ jsx(Link, { href: route("admin.kios-partners.create"), target: "_blank", className: "text-[11px] text-emerald-600 hover:underline font-medium", children: "+ Tambah Toko Baru" })
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "kios_partner_id",
                  value: data.kios_partner_id || "",
                  onChange: (e) => handlePartnerChange(e.target.value),
                  className: "w-full h-9 px-3 rounded-md border border-input bg-background text-xs font-medium",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Toko Partner Kios --" }),
                    partners.map((partner) => /* @__PURE__ */ jsx("option", { value: partner.id, children: partner.name }, partner.id))
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 pt-2", ref: categoryDropdownRef, children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs font-semibold block", children: "Kategori Item (Dropdown Multi-Pilih) *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  onClick: () => setIsCategoryDropdownOpen(!isCategoryDropdownOpen),
                  className: "min-h-[42px] w-full px-3 py-2 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded-xl cursor-pointer flex items-center justify-between gap-2 transition-all shadow-inner text-white",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 flex-1 items-center", children: data.categories.length > 0 ? data.categories.map((catId) => {
                      const catObj = ITEM_CATEGORIES$1.find((c) => c.id === catId);
                      return /* @__PURE__ */ jsxs(
                        "span",
                        {
                          className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-neutral-800 text-emerald-400 border border-neutral-700 select-none shadow-xs",
                          children: [
                            /* @__PURE__ */ jsx("span", { children: catObj ? catObj.label : catId }),
                            /* @__PURE__ */ jsx(
                              "span",
                              {
                                onClick: (e) => removeCategory(catId, e),
                                className: "hover:text-red-400 cursor-pointer p-0.5 rounded",
                                children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" })
                              }
                            )
                          ]
                        },
                        catId
                      );
                    }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-400", children: "Pilih satu atau beberapa kategori..." }) }),
                    /* @__PURE__ */ jsx(ChevronDown, { className: `w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${isCategoryDropdownOpen ? "rotate-180 text-emerald-400" : ""}` })
                  ]
                }
              ),
              isCategoryDropdownOpen && /* @__PURE__ */ jsxs("div", { className: "absolute top-[calc(100%+6px)] left-0 w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 z-50 shadow-2xl max-h-64 overflow-y-auto space-y-1", children: [
                /* @__PURE__ */ jsx("div", { className: "text-[10px] font-mono font-bold text-neutral-400 px-2 py-1 uppercase tracking-wider border-b border-neutral-800/80 mb-1", children: "Daftar Kategori Produk (Klik untuk memilih/membatalkan)" }),
                ITEM_CATEGORIES$1.map((cat) => {
                  const isSelected = data.categories.includes(cat.id);
                  return /* @__PURE__ */ jsxs(
                    "div",
                    {
                      onClick: () => toggleCategory(cat.id),
                      className: `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${isSelected ? "bg-neutral-800 text-emerald-400 font-bold" : "text-neutral-300 hover:bg-neutral-900 hover:text-white"}`,
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
                          /* @__PURE__ */ jsx("div", { className: `w-4 h-4 rounded border flex items-center justify-center transition-all ${isSelected ? "bg-emerald-500 border-emerald-500 text-neutral-950" : "border-neutral-600 bg-neutral-900"}`, children: isSelected && /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 stroke-[3]" }) }),
                          /* @__PURE__ */ jsx("span", { children: cat.label })
                        ] }),
                        isSelected && /* @__PURE__ */ jsx("span", { className: "text-[10px] font-mono text-emerald-400 uppercase tracking-wider", children: "Terpilih" })
                      ]
                    },
                    cat.id
                  );
                })
              ] })
            ] }),
            errors.categories && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: errors.categories })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-emerald-600" }),
            /* @__PURE__ */ jsx("span", { children: "Harga & Ketersediaan" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "price", className: "text-xs font-semibold", children: "Harga Jual (Rp) *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "price",
                  type: "number",
                  value: data.price,
                  onChange: (e) => setData("price", e.target.value),
                  placeholder: "Contoh: 35000",
                  required: true
                }
              ),
              errors.price && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: errors.price })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "original_price", className: "text-xs font-semibold", children: "Harga Asli / Normal (Rp)" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "original_price",
                  type: "number",
                  value: data.original_price,
                  onChange: (e) => setData("original_price", e.target.value),
                  placeholder: "Contoh: 45000"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "condition_rating", className: "text-xs font-semibold", children: "Grade Kondisi Fisik" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  id: "condition_rating",
                  value: data.condition_rating,
                  onChange: (e) => setData("condition_rating", e.target.value),
                  className: "w-full h-9 px-3 rounded-md border border-input bg-background text-xs",
                  children: CONDITION_RATINGS$1.map((cr) => /* @__PURE__ */ jsx("option", { value: cr.id, children: cr.label }, cr.id))
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "reading_rating", className: "text-xs font-semibold", children: "Rating Usia (Age Rating)" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  id: "reading_rating",
                  value: data.reading_rating,
                  onChange: (e) => setData("reading_rating", e.target.value),
                  className: "w-full h-9 px-3 rounded-md border border-input bg-background text-xs",
                  children: ageRatings.length > 0 ? ageRatings.map((ar) => /* @__PURE__ */ jsx("option", { value: ar.value, children: ar.label }, ar.value)) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("option", { value: "Anak & Bimbingan Orang Tua", children: "Anak & Bimbingan Orang Tua" }),
                    /* @__PURE__ */ jsx("option", { value: "Remaja", children: "Remaja" }),
                    /* @__PURE__ */ jsx("option", { value: "Dewasa Ringan", children: "Dewasa Ringan" }),
                    /* @__PURE__ */ jsx("option", { value: "Dewasa Berat", children: "Dewasa Berat" })
                  ] })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                id: "is_sold_out",
                checked: data.is_sold_out,
                onChange: (e) => setData("is_sold_out", e.target.checked),
                className: "w-4 h-4 rounded text-red-600 cursor-pointer"
              }
            ),
            /* @__PURE__ */ jsx(Label, { htmlFor: "is_sold_out", className: "cursor-pointer text-xs font-bold text-red-600", children: "Tandai sebagai HABIS TERJUAL (Sold Out)" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Image, { className: "w-4 h-4 text-blue-600" }),
            /* @__PURE__ */ jsx("span", { children: "Gambar Cover & Slider Galeri Foto Fisik" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "cover_image", className: "text-xs font-semibold", children: [
              "URL Cover Utama Produk * ",
              /* @__PURE__ */ jsx("span", { className: "text-[11px] font-normal text-neutral-400", children: "(Otomatis dijadikan foto Cover Depan galeri)" })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "cover_image",
                value: data.cover_image,
                onChange: (e) => handleCoverImageChange(e.target.value),
                placeholder: "https://images.unsplash.com/... atau link gambar"
              }
            ),
            data.cover_image && /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-3 p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg border", children: [
              /* @__PURE__ */ jsx("img", { src: data.cover_image, alt: "Preview", className: "w-12 h-16 object-cover rounded shadow-2xs" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-500", children: "Preview Cover Utama & Cover Depan" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs font-semibold block", children: "4 Foto Galeri Slider Detail Kondisi Fisik (Untuk Tampilan Detail Kios):" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: data.carousel_images.map((img, idx) => /* @__PURE__ */ jsxs("div", { className: "p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border space-y-2", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300", children: /* @__PURE__ */ jsxs("span", { children: [
                "Foto Slide #",
                idx + 1,
                " ",
                idx === 0 && /* @__PURE__ */ jsx("span", { className: "text-emerald-500 font-normal text-[10px]", children: "(Cover Depan)" })
              ] }) }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  value: img,
                  onChange: (e) => handleCarouselImageChange(idx, e.target.value),
                  placeholder: `URL Foto Slide ${idx + 1}`,
                  className: "text-xs h-8"
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  value: data.carousel_labels[idx] || "",
                  onChange: (e) => handleCarouselLabelChange(idx, e.target.value),
                  placeholder: "Label Caption (e.g. Cover Depan, Spine)",
                  className: "text-xs h-8"
                }
              )
            ] }, idx)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 text-orange-600" }),
            /* @__PURE__ */ jsx("span", { children: "Link Pembelian Marketplace" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "shopee_url", className: "text-xs font-semibold text-[#EE4D2D]", children: "Link Toko Shopee" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "shopee_url",
                  value: data.shopee_url,
                  onChange: (e) => setData("shopee_url", e.target.value),
                  placeholder: "https://shopee.co.id/..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "tokopedia_url", className: "text-xs font-semibold text-[#03AC0E]", children: "Link Toko Tokopedia" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "tokopedia_url",
                  value: data.tokopedia_url,
                  onChange: (e) => setData("tokopedia_url", e.target.value),
                  placeholder: "https://tokopedia.com/..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "gramedia_url", className: "text-xs font-semibold text-[#00519E]", children: "Link Toko Gramedia" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "gramedia_url",
                  value: data.gramedia_url,
                  onChange: (e) => setData("gramedia_url", e.target.value),
                  placeholder: "https://gramedia.com/..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs(Label, { htmlFor: "toco_url", className: "text-xs font-semibold text-[#D49B00] dark:text-[#FFD400] flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-[#FFD400] inline-block shrink-0 shadow-2xs" }),
                "Link Toko Toco"
              ] }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "toco_url",
                  value: data.toco_url,
                  onChange: (e) => setData("toco_url", e.target.value),
                  placeholder: "https://toco.id/...",
                  className: "focus-visible:ring-[#FFD400]"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "w-4 h-4 text-indigo-600" }),
            /* @__PURE__ */ jsx("span", { children: "Deskripsi Produk & Catatan Kondisi Fisik" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "deskripsi_produk", className: "text-xs font-semibold", children: "Deskripsi Produk" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "deskripsi_produk",
                rows: 4,
                value: data.deskripsi_produk,
                onChange: (e) => setData("deskripsi_produk", e.target.value),
                placeholder: "Tuliskan deskripsi lengkap komik, buku, atau spesifikasi merchandise..."
              }
            ),
            errors.deskripsi_produk && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: errors.deskripsi_produk })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "notes", className: "text-xs font-semibold", children: "Catatan Kondisi Fisik Reviewer (Preloved)" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "notes",
                rows: 3,
                value: data.notes,
                onChange: (e) => setData("notes", e.target.value),
                placeholder: "Contoh: Kondisi 98% seperti baru. Hanya dibuka segel untuk review kertas, jaket komik mulus tanpa tekukan..."
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800", children: [
          /* @__PURE__ */ jsx(Link, { href: route("admin.kios.index"), children: /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", className: "text-xs font-bold", children: "Batal" }) }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "submit",
              disabled: processing,
              className: "bg-[#112A12] hover:bg-[#0c1e0d] text-white flex items-center gap-1.5 text-xs font-bold px-6",
              children: [
                /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: processing ? "Menyimpan..." : "Simpan Item Kios" })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: KiosCreate
}, Symbol.toStringTag, { value: "Module" }));
const MERCH_TYPES = [
  { value: "manga", label: "Manga / Buku" },
  { value: "light_novel", label: "Light Novel" },
  { value: "novel", label: "Novel" },
  { value: "trading_card", label: "Trading Card" },
  { value: "apparel", label: "Apparel" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "tas", label: "Tas" },
  { value: "aksesoris", label: "Aksesoris" },
  { value: "gaming", label: "Gaming" },
  { value: "dekorasi", label: "Dekorasi" }
];
const ITEM_CATEGORIES = [
  { id: "manga", label: "Manga / Komik" },
  { id: "light_novel", label: "Light Novel" },
  { id: "novel", label: "Novel" },
  { id: "apparel", label: "Apparel / Kaos / Jaket" },
  { id: "trading_card", label: "Trading Card / TCG" },
  { id: "figurine", label: "Figure / Model Kit" },
  { id: "tas", label: "Tas / Pouch" },
  { id: "aksesoris", label: "Aksesoris / Gantungan Kunci" },
  { id: "lifestyle", label: "Lifestyle / Tumbler / Mug" },
  { id: "gaming", label: "Gaming / Deskmat / Mousepad" },
  { id: "dekorasi", label: "Dekorasi / Poster / Wall Scroll" },
  { id: "artbook", label: "Artbook / Fanbook" },
  { id: "stationery", label: "Stationery / Buku Catatan" }
];
const CONDITION_RATINGS = [
  { id: "S", label: "Grade S (Kolektor / Mulus Sempurna)" },
  { id: "A", label: "Grade A (Sangat Bagus / Sekali Baca)" },
  { id: "B", label: "Grade B (Bagus / Sedikit Jejak Baca)" },
  { id: "C", label: "Grade C (Cukup / Kertas Menguning Wajar)" },
  { id: "D", label: "Grade D (Bacaan Harian / Ada Minus Fisik)" }
];
function KiosEdit({ kiosItem, partners = [], ageRatings = [] }) {
  const breadcrumbs2 = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Kios & Preloved", href: "/admin/kios" },
    { title: "Edit Item", href: `/admin/kios/${kiosItem.id}/edit` }
  ];
  const initialCarouselImages = kiosItem.carousel_images && kiosItem.carousel_images.length > 0 ? [...kiosItem.carousel_images, "", "", "", ""].slice(0, 4) : ["", "", "", ""];
  const initialCarouselLabels = kiosItem.carousel_labels && kiosItem.carousel_labels.length > 0 ? [...kiosItem.carousel_labels, "Cover Depan", "Punggung Buku (Spine)", "Cover Belakang", "Halaman Kertas"].slice(0, 4) : ["Cover Depan", "Punggung Buku (Spine)", "Cover Belakang", "Halaman Kertas"];
  const initialCategories = kiosItem.categories && kiosItem.categories.length > 0 ? kiosItem.categories : [kiosItem.category || "manga"];
  const { data, setData, put, processing, errors } = useForm({
    title: kiosItem.title || "",
    merch_type: kiosItem.merch_type || kiosItem.category || "manga",
    categories: initialCategories,
    cover_image: kiosItem.cover_image || "",
    carousel_images: initialCarouselImages,
    carousel_labels: initialCarouselLabels,
    deskripsi_produk: kiosItem.deskripsi_produk || kiosItem.synopsis || "",
    notes: kiosItem.notes || "",
    price: kiosItem.price || "",
    original_price: kiosItem.original_price || "",
    condition_rating: kiosItem.condition_rating || "S",
    is_preloved: !!kiosItem.is_preloved,
    is_sold_out: !!kiosItem.is_sold_out,
    rating: kiosItem.rating || 5,
    kios_partner_id: kiosItem.kios_partner_id || "",
    publisher_name: kiosItem.publisher_name || "",
    publisher_id: kiosItem.publisher_id || "",
    author: kiosItem.author || "",
    reading_rating: kiosItem.reading_rating || "Remaja",
    status: kiosItem.status || "completed",
    demographic: kiosItem.demographic || "General",
    isbn: kiosItem.isbn || "",
    release_date: kiosItem.release_date || "",
    cetakan_info: kiosItem.cetakan_info || "",
    shopee_url: kiosItem.shopee_url || "",
    tokopedia_url: kiosItem.tokopedia_url || "",
    gramedia_url: kiosItem.gramedia_url || "",
    toco_url: kiosItem.toco_url || ""
  });
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const toggleCategory = (catId) => {
    const current = [...data.categories];
    if (current.includes(catId)) {
      if (current.length > 1) {
        setData("categories", current.filter((c) => c !== catId));
      }
    } else {
      setData("categories", [...current, catId]);
    }
  };
  const removeCategory = (catId, e) => {
    e.stopPropagation();
    if (data.categories.length > 1) {
      setData("categories", data.categories.filter((c) => c !== catId));
    }
  };
  const handlePartnerChange = (partnerId) => {
    setData("kios_partner_id", partnerId);
    const partner = partners.find((p) => String(p.id) === partnerId);
    if (partner) {
      setData((prev) => ({
        ...prev,
        kios_partner_id: partnerId,
        publisher_name: partner.name,
        publisher_id: partner.slug
      }));
    }
  };
  const handleCoverImageChange = (val) => {
    const updatedCarousel = [...data.carousel_images];
    updatedCarousel[0] = val;
    setData((prev) => ({
      ...prev,
      cover_image: val,
      carousel_images: updatedCarousel
    }));
  };
  const handleCarouselImageChange = (index, val) => {
    const updated = [...data.carousel_images];
    updated[index] = val;
    if (index === 0) {
      setData((prev) => ({
        ...prev,
        cover_image: val,
        carousel_images: updated
      }));
    } else {
      setData("carousel_images", updated);
    }
  };
  const handleCarouselLabelChange = (index, val) => {
    const updated = [...data.carousel_labels];
    updated[index] = val;
    setData("carousel_labels", updated);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("admin.kios.update", kiosItem.id));
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs2, children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit Item - ${kiosItem.title}` }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto p-4 sm:p-6 space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Link, { href: route("admin.kios.index"), children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-9 w-9", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-neutral-900 dark:text-white", children: "Edit Item Kios & Preloved" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-neutral-500", children: [
            "ID #",
            kiosItem.id,
            " • ",
            kiosItem.title
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-neutral-500", children: "Tipe Listing Kios" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${data.is_preloved ? "border-pink-500 bg-pink-50/50 dark:bg-pink-950/20 ring-1 ring-pink-500" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50"}`, children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  name: "is_preloved",
                  checked: data.is_preloved,
                  onChange: () => {
                    setData((prev) => ({
                      ...prev,
                      is_preloved: true
                    }));
                  },
                  className: "mt-1"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold text-sm text-pink-900 dark:text-pink-200 flex items-center gap-1.5", children: /* @__PURE__ */ jsx("span", { children: "🌸 Preloved Reviewer (@konotasi)" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-550 dark:text-neutral-400", children: "Buku/komik bekas ulasan berkualitas tinggi dengan grade kondisi fisik, catatan minus, dan slider galeri detail fisik." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${!data.is_preloved ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-1 ring-emerald-500" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50"}`, children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  name: "is_preloved",
                  checked: !data.is_preloved,
                  onChange: () => {
                    setData((prev) => ({
                      ...prev,
                      is_preloved: false
                    }));
                  },
                  className: "mt-1"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5", children: /* @__PURE__ */ jsx("span", { children: "🛍️ Partner Merchandise / Official" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-550 dark:text-neutral-400", children: "Merchandise resmi partner (Apparel, TCG, Lifestyle, Figure) atau buku original baru dari penerbit." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Tag, { className: "w-4 h-4 text-neutral-600" }),
            /* @__PURE__ */ jsx("span", { children: "Informasi Utama Produk" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "title", className: "text-xs font-semibold", children: "Judul Produk Listing *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "title",
                  value: data.title,
                  onChange: (e) => setData("title", e.target.value),
                  placeholder: "Contoh: Frieren Vol 1 (Preloved) / Jujutsu Kaisen Oversized Shirt",
                  required: true
                }
              ),
              errors.title && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: errors.title })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "author", className: "text-xs font-semibold", children: "Author / Creator / Brand" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "author",
                  value: data.author,
                  onChange: (e) => setData("author", e.target.value),
                  placeholder: "Contoh: Kanehito Yamada / Bandai / Studio Mappa"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs(Label, { htmlFor: "merch_type", className: "text-xs font-semibold flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Layers, { className: "w-3.5 h-3.5 text-neutral-500" }),
                /* @__PURE__ */ jsx("span", { children: "Tipe Merch (Kategori Utama) *" })
              ] }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  id: "merch_type",
                  value: data.merch_type,
                  onChange: (e) => setData("merch_type", e.target.value),
                  className: "w-full h-9 px-3 rounded-md border border-input bg-background text-xs font-medium",
                  required: true,
                  children: MERCH_TYPES.map((m) => /* @__PURE__ */ jsx("option", { value: m.value, children: m.label }, m.value))
                }
              ),
              errors.merch_type && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: errors.merch_type })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs(Label, { htmlFor: "kios_partner_id", className: "text-xs font-semibold flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsx(Store, { className: "w-3.5 h-3.5 text-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { children: "Nama Partner / Toko / Penerbit" })
                ] }),
                /* @__PURE__ */ jsx(Link, { href: route("admin.kios-partners.create"), target: "_blank", className: "text-[11px] text-emerald-600 hover:underline font-medium", children: "+ Tambah Toko Baru" })
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "kios_partner_id",
                  value: data.kios_partner_id || "",
                  onChange: (e) => handlePartnerChange(e.target.value),
                  className: "w-full h-9 px-3 rounded-md border border-input bg-background text-xs font-medium",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Toko Partner Kios --" }),
                    partners.map((partner) => /* @__PURE__ */ jsx("option", { value: partner.id, children: partner.name }, partner.id))
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 pt-2", ref: categoryDropdownRef, children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs font-semibold block", children: "Kategori Item (Dropdown Multi-Pilih) *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  onClick: () => setIsCategoryDropdownOpen(!isCategoryDropdownOpen),
                  className: "min-h-[42px] w-full px-3 py-2 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded-xl cursor-pointer flex items-center justify-between gap-2 transition-all shadow-inner text-white",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 flex-1 items-center", children: data.categories.length > 0 ? data.categories.map((catId) => {
                      const catObj = ITEM_CATEGORIES.find((c) => c.id === catId);
                      return /* @__PURE__ */ jsxs(
                        "span",
                        {
                          className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-neutral-800 text-emerald-400 border border-neutral-700 select-none shadow-xs",
                          children: [
                            /* @__PURE__ */ jsx("span", { children: catObj ? catObj.label : catId }),
                            /* @__PURE__ */ jsx(
                              "span",
                              {
                                onClick: (e) => removeCategory(catId, e),
                                className: "hover:text-red-400 cursor-pointer p-0.5 rounded",
                                children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" })
                              }
                            )
                          ]
                        },
                        catId
                      );
                    }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-400", children: "Pilih satu atau beberapa kategori..." }) }),
                    /* @__PURE__ */ jsx(ChevronDown, { className: `w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${isCategoryDropdownOpen ? "rotate-180 text-emerald-400" : ""}` })
                  ]
                }
              ),
              isCategoryDropdownOpen && /* @__PURE__ */ jsxs("div", { className: "absolute top-[calc(100%+6px)] left-0 w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 z-50 shadow-2xl max-h-64 overflow-y-auto space-y-1", children: [
                /* @__PURE__ */ jsx("div", { className: "text-[10px] font-mono font-bold text-neutral-400 px-2 py-1 uppercase tracking-wider border-b border-neutral-800/80 mb-1", children: "Daftar Kategori Produk (Klik untuk memilih/membatalkan)" }),
                ITEM_CATEGORIES.map((cat) => {
                  const isSelected = data.categories.includes(cat.id);
                  return /* @__PURE__ */ jsxs(
                    "div",
                    {
                      onClick: () => toggleCategory(cat.id),
                      className: `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${isSelected ? "bg-neutral-800 text-emerald-400 font-bold" : "text-neutral-300 hover:bg-neutral-900 hover:text-white"}`,
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
                          /* @__PURE__ */ jsx("div", { className: `w-4 h-4 rounded border flex items-center justify-center transition-all ${isSelected ? "bg-emerald-500 border-emerald-500 text-neutral-950" : "border-neutral-600 bg-neutral-900"}`, children: isSelected && /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 stroke-[3]" }) }),
                          /* @__PURE__ */ jsx("span", { children: cat.label })
                        ] }),
                        isSelected && /* @__PURE__ */ jsx("span", { className: "text-[10px] font-mono text-emerald-400 uppercase tracking-wider", children: "Terpilih" })
                      ]
                    },
                    cat.id
                  );
                })
              ] })
            ] }),
            errors.categories && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: errors.categories })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-emerald-600" }),
            /* @__PURE__ */ jsx("span", { children: "Harga & Ketersediaan" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "price", className: "text-xs font-semibold", children: "Harga Jual (Rp) *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "price",
                  type: "number",
                  value: data.price,
                  onChange: (e) => setData("price", e.target.value),
                  placeholder: "Contoh: 35000",
                  required: true
                }
              ),
              errors.price && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: errors.price })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "original_price", className: "text-xs font-semibold", children: "Harga Asli / Normal (Rp)" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "original_price",
                  type: "number",
                  value: data.original_price,
                  onChange: (e) => setData("original_price", e.target.value),
                  placeholder: "Contoh: 45000"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "condition_rating", className: "text-xs font-semibold", children: "Grade Kondisi Fisik" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  id: "condition_rating",
                  value: data.condition_rating,
                  onChange: (e) => setData("condition_rating", e.target.value),
                  className: "w-full h-9 px-3 rounded-md border border-input bg-background text-xs",
                  children: CONDITION_RATINGS.map((cr) => /* @__PURE__ */ jsx("option", { value: cr.id, children: cr.label }, cr.id))
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "reading_rating", className: "text-xs font-semibold", children: "Rating Usia (Age Rating)" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  id: "reading_rating",
                  value: data.reading_rating,
                  onChange: (e) => setData("reading_rating", e.target.value),
                  className: "w-full h-9 px-3 rounded-md border border-input bg-background text-xs",
                  children: ageRatings.length > 0 ? ageRatings.map((ar) => /* @__PURE__ */ jsx("option", { value: ar.value, children: ar.label }, ar.value)) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("option", { value: "Anak & Bimbingan Orang Tua", children: "Anak & Bimbingan Orang Tua" }),
                    /* @__PURE__ */ jsx("option", { value: "Remaja", children: "Remaja" }),
                    /* @__PURE__ */ jsx("option", { value: "Dewasa Ringan", children: "Dewasa Ringan" }),
                    /* @__PURE__ */ jsx("option", { value: "Dewasa Berat", children: "Dewasa Berat" })
                  ] })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                id: "is_sold_out",
                checked: data.is_sold_out,
                onChange: (e) => setData("is_sold_out", e.target.checked),
                className: "w-4 h-4 rounded text-red-600 cursor-pointer"
              }
            ),
            /* @__PURE__ */ jsx(Label, { htmlFor: "is_sold_out", className: "cursor-pointer text-xs font-bold text-red-600", children: "Tandai sebagai HABIS TERJUAL (Sold Out)" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Image, { className: "w-4 h-4 text-blue-600" }),
            /* @__PURE__ */ jsx("span", { children: "Gambar Cover & Slider Galeri Foto Fisik" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "cover_image", className: "text-xs font-semibold", children: [
              "URL Cover Utama Produk * ",
              /* @__PURE__ */ jsx("span", { className: "text-[11px] font-normal text-neutral-400", children: "(Otomatis dijadikan foto Cover Depan galeri)" })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "cover_image",
                value: data.cover_image,
                onChange: (e) => handleCoverImageChange(e.target.value),
                placeholder: "https://images.unsplash.com/... atau link gambar"
              }
            ),
            data.cover_image && /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-3 p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg border", children: [
              /* @__PURE__ */ jsx("img", { src: data.cover_image, alt: "Preview", className: "w-12 h-16 object-cover rounded shadow-2xs" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-500", children: "Preview Cover Utama & Cover Depan" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs font-semibold block", children: "4 Foto Galeri Slider Detail Kondisi Fisik (Untuk Tampilan Detail Kios):" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: data.carousel_images.map((img, idx) => /* @__PURE__ */ jsxs("div", { className: "p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border space-y-2", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300", children: /* @__PURE__ */ jsxs("span", { children: [
                "Foto Slide #",
                idx + 1,
                " ",
                idx === 0 && /* @__PURE__ */ jsx("span", { className: "text-emerald-500 font-normal text-[10px]", children: "(Cover Depan)" })
              ] }) }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  value: img,
                  onChange: (e) => handleCarouselImageChange(idx, e.target.value),
                  placeholder: `URL Foto Slide ${idx + 1}`,
                  className: "text-xs h-8"
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  value: data.carousel_labels[idx] || "",
                  onChange: (e) => handleCarouselLabelChange(idx, e.target.value),
                  placeholder: "Label Caption (e.g. Cover Depan, Spine)",
                  className: "text-xs h-8"
                }
              )
            ] }, idx)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 text-orange-600" }),
            /* @__PURE__ */ jsx("span", { children: "Link Pembelian Marketplace" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "shopee_url", className: "text-xs font-semibold text-[#EE4D2D]", children: "Link Toko Shopee" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "shopee_url",
                  value: data.shopee_url,
                  onChange: (e) => setData("shopee_url", e.target.value),
                  placeholder: "https://shopee.co.id/..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "tokopedia_url", className: "text-xs font-semibold text-[#03AC0E]", children: "Link Toko Tokopedia" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "tokopedia_url",
                  value: data.tokopedia_url,
                  onChange: (e) => setData("tokopedia_url", e.target.value),
                  placeholder: "https://tokopedia.com/..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "gramedia_url", className: "text-xs font-semibold text-[#00519E]", children: "Link Toko Gramedia" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "gramedia_url",
                  value: data.gramedia_url,
                  onChange: (e) => setData("gramedia_url", e.target.value),
                  placeholder: "https://gramedia.com/..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs(Label, { htmlFor: "toco_url", className: "text-xs font-semibold text-[#D49B00] dark:text-[#FFD400] flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-[#FFD400] inline-block shrink-0 shadow-2xs" }),
                "Link Toko Toco"
              ] }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "toco_url",
                  value: data.toco_url,
                  onChange: (e) => setData("toco_url", e.target.value),
                  placeholder: "https://toco.id/...",
                  className: "focus-visible:ring-[#FFD400]"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "w-4 h-4 text-indigo-600" }),
            /* @__PURE__ */ jsx("span", { children: "Deskripsi Produk & Catatan Kondisi Fisik" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "deskripsi_produk", className: "text-xs font-semibold", children: "Deskripsi Produk" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "deskripsi_produk",
                rows: 4,
                value: data.deskripsi_produk,
                onChange: (e) => setData("deskripsi_produk", e.target.value),
                placeholder: "Tuliskan deskripsi lengkap komik, buku, atau spesifikasi merchandise..."
              }
            ),
            errors.deskripsi_produk && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: errors.deskripsi_produk })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "notes", className: "text-xs font-semibold", children: "Catatan Kondisi Fisik Reviewer (Preloved)" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "notes",
                rows: 3,
                value: data.notes,
                onChange: (e) => setData("notes", e.target.value),
                placeholder: "Contoh: Kondisi 98% seperti baru. Hanya dibuka segel untuk review kertas, jaket komik mulus tanpa tekukan..."
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800", children: [
          /* @__PURE__ */ jsx(Link, { href: route("admin.kios.index"), children: /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", className: "text-xs font-bold", children: "Batal" }) }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "submit",
              disabled: processing,
              className: "bg-[#112A12] hover:bg-[#0c1e0d] text-white flex items-center gap-1.5 text-xs font-bold px-6",
              children: [
                /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: processing ? "Menyimpan..." : "Perbarui Item Kios" })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: KiosEdit
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$c = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Kios & Preloved",
    href: "/admin/kios"
  }
];
function KiosIndex({ kiosItems, filters: rawFilters }) {
  const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
  const [deleteItem, setDeleteItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [category, setCategory] = useState(filters.category || "all");
  const [sort, setSort] = useState(filters.sort || "latest");
  const [type, setType] = useState(filters.type || "all");
  const handleApplyFilters = (newParams) => {
    const payload = {
      search: (newParams == null ? void 0 : newParams.search) !== void 0 ? newParams.search : searchTerm,
      category: (newParams == null ? void 0 : newParams.category) !== void 0 ? newParams.category : category,
      type: (newParams == null ? void 0 : newParams.type) !== void 0 ? newParams.type : type,
      sort: (newParams == null ? void 0 : newParams.sort) !== void 0 ? newParams.sort : sort
    };
    if (!payload.search) delete payload.search;
    if (!payload.category || payload.category === "all") delete payload.category;
    if (!payload.type || payload.type === "all") delete payload.type;
    router.get(route("admin.kios.index"), payload, {
      preserveState: true,
      preserveScroll: true
    });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    handleApplyFilters();
  };
  const handleFilterType = (newType) => {
    setType(newType);
    handleApplyFilters({ type: newType });
  };
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    handleApplyFilters({ category: newCategory });
  };
  const handleSortChange = (newSort) => {
    setSort(newSort);
    handleApplyFilters({ sort: newSort });
  };
  const handleDelete = () => {
    if (!deleteItem) return;
    const itemTitle = deleteItem.title;
    router.delete(route("admin.kios.destroy", deleteItem.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(`Item "${itemTitle}" sudah terhapus`);
        setDeleteItem(null);
      },
      onError: () => {
        toast.error("Gagal menghapus item kios");
      },
      onFinish: () => {
        setDeleteItem(null);
      }
    });
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$c, children: [
    /* @__PURE__ */ jsx(Head, { title: "Kios & Preloved Items" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-5 p-4 sm:p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white", children: [
            /* @__PURE__ */ jsx(ShoppingBag, { className: "w-6 h-6 text-[#112A12] dark:text-emerald-400" }),
            /* @__PURE__ */ jsx("span", { children: "Kios & Preloved Catalog" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Kelola etalase komik preloved konotasi, official partner merchandise, dan apparel Norinoya." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Link, { href: route("admin.kios.search-logs"), children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800", children: [
            /* @__PURE__ */ jsx(SearchCode, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400" }),
            /* @__PURE__ */ jsx("span", { children: "Keyword Logs" })
          ] }) }),
          /* @__PURE__ */ jsx(Link, { href: route("admin.kios.logs"), children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800", children: [
            /* @__PURE__ */ jsx(History, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400" }),
            /* @__PURE__ */ jsx("span", { children: "Lihat Logs" })
          ] }) }),
          /* @__PURE__ */ jsx(Link, { href: route("admin.kios.create"), children: /* @__PURE__ */ jsxs(Button, { className: "bg-[#112A12] hover:bg-[#0c1e0d] text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold px-4 h-9 rounded-lg", children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: "Tambah Item Kios" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-2xs", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex items-center gap-2 flex-1 min-w-[240px]", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Cari judul, komik, brand partner...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                className: "pl-9 h-9 text-xs"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "secondary", className: "h-9 px-3 text-xs font-bold", children: "Cari" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap sm:flex-nowrap", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => handleFilterType("all"),
                className: `px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${type === "all" ? "bg-white text-neutral-900 shadow-2xs dark:bg-neutral-900 dark:text-white" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`,
                children: "Semua"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => handleFilterType("preloved"),
                className: `px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${type === "preloved" ? "bg-pink-600 text-white shadow-2xs" : "text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-950/30"}`,
                children: "Preloved"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => handleFilterType("partner"),
                className: `px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${type === "partner" ? "bg-emerald-600 text-white shadow-2xs" : "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"}`,
                children: "Partner"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs(
            "select",
            {
              value: category,
              onChange: (e) => handleCategoryChange(e.target.value),
              className: "h-9 px-3 text-xs font-medium bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer",
              children: [
                /* @__PURE__ */ jsx("option", { value: "all", children: "Semua Kategori" }),
                /* @__PURE__ */ jsx("option", { value: "manga", children: "Manga" }),
                /* @__PURE__ */ jsx("option", { value: "light_novel", children: "Light Novel" }),
                /* @__PURE__ */ jsx("option", { value: "artbook", children: "Artbook" }),
                /* @__PURE__ */ jsx("option", { value: "merchandise", children: "Merchandise" }),
                /* @__PURE__ */ jsx("option", { value: "apparel", children: "Apparel / Kaos" }),
                /* @__PURE__ */ jsx("option", { value: "figure", children: "Figure" }),
                /* @__PURE__ */ jsx("option", { value: "poster", children: "Poster" }),
                /* @__PURE__ */ jsx("option", { value: "lainnya", children: "Lainnya" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(ArrowUpDown, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: sort,
                onChange: (e) => handleSortChange(e.target.value),
                className: "h-9 pl-8 pr-7 text-xs font-medium bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer appearance-none",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "latest", children: "Terbaru" }),
                  /* @__PURE__ */ jsx("option", { value: "oldest", children: "Terlama" })
                ]
              }
            )
          ] }),
          (searchTerm || category !== "all" || type !== "all" || sort !== "latest") && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => {
                setSearchTerm("");
                setCategory("all");
                setType("all");
                setSort("latest");
                router.get(route("admin.kios.index"), {}, { preserveScroll: true });
              },
              className: "h-9 text-xs font-bold",
              children: "Reset"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xs", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { className: "bg-[#112A12] text-white", children: /* @__PURE__ */ jsxs(TableRow, { className: "border-b border-[#112A12] hover:bg-transparent", children: [
          /* @__PURE__ */ jsx(TableHead, { className: "w-16 text-center text-xs font-bold text-white", children: "Cover" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Produk / Judul" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Tipe & Kategori" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Partner / Toko" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Harga" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Kondisi / Status" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-center text-white", children: "Views" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-center text-white", children: "Klik Link Beli" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-center text-white", children: "Link Marketplace" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right text-xs font-bold w-24 text-white", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: kiosItems.data.length > 0 ? kiosItems.data.map((item) => {
          var _a;
          return /* @__PURE__ */ jsxs(TableRow, { className: "hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40", children: [
            /* @__PURE__ */ jsx(TableCell, { className: "p-2 text-center", children: item.cover_image ? /* @__PURE__ */ jsx(
              "img",
              {
                src: item.cover_image,
                alt: item.title,
                className: "w-11 h-14 object-cover rounded-md mx-auto border border-neutral-200 dark:border-neutral-700 shadow-2xs"
              }
            ) : /* @__PURE__ */ jsx("div", { className: "w-11 h-14 bg-neutral-100 dark:bg-neutral-800 rounded-md mx-auto flex items-center justify-center text-neutral-400", children: /* @__PURE__ */ jsx(ShoppingBag, { className: "w-4 h-4" }) }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "max-w-[240px]", children: /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ jsx("div", { className: "font-bold text-xs text-neutral-900 dark:text-neutral-100 line-clamp-1", children: item.title }),
              item.author && /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-mono text-neutral-400", children: [
                "Oleh: ",
                item.author
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 rounded text-[10px] font-mono font-bold ${item.is_preloved ? "bg-pink-100 text-pink-800 dark:bg-pink-950/60 dark:text-pink-300" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"}`, children: item.is_preloved ? "PRELOVED" : "PARTNER MERCH" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: Array.isArray(item.categories) && item.categories.length > 0 ? item.categories.map((c, i) => /* @__PURE__ */ jsx("span", { className: "text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-1.5 py-0.2 rounded capitalize", children: c.replace("_", " ") }, i)) : /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono text-neutral-500 capitalize", children: ((_a = item.category) == null ? void 0 : _a.replace("_", " ")) || "manga" }) })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-neutral-700 dark:text-neutral-300", children: item.publisher_name || "-" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-extrabold text-neutral-900 dark:text-white", children: [
                "Rp ",
                Number(item.price).toLocaleString("id-ID")
              ] }),
              item.original_price && Number(item.original_price) > 0 && /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-mono text-neutral-400 line-through", children: [
                "Rp ",
                Number(item.original_price).toLocaleString("id-ID")
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-1", children: [
              item.is_preloved ? /* @__PURE__ */ jsxs("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200", children: [
                "Grade: ",
                item.condition_rating || "S"
              ] }) : /* @__PURE__ */ jsx("span", { className: "text-[10px] font-mono text-neutral-400", children: "Kondisi Baru" }),
              item.reading_rating && /* @__PURE__ */ jsx("span", { className: "px-1.5 py-0.5 rounded text-[9.5px] font-mono font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300", children: item.reading_rating }),
              item.is_sold_out ? /* @__PURE__ */ jsx("span", { className: "px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300", children: "HABIS" }) : /* @__PURE__ */ jsx("span", { className: "px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300", children: "TERSEDIA" })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 font-mono text-xs font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md", children: [
              /* @__PURE__ */ jsx(Eye, { className: "w-3.5 h-3.5 text-neutral-400" }),
              /* @__PURE__ */ jsx("span", { children: (item.views_count ?? 0).toLocaleString("id-ID") })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1", children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800", children: [
                /* @__PURE__ */ jsx(MousePointerClick, { className: "w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  (item.total_clicks_count ?? 0).toLocaleString("id-ID"),
                  " klik"
                ] })
              ] }),
              (Number(item.total_clicks_count) > 0 || item.shopee_clicks_count || item.tokopedia_clicks_count || item.gramedia_clicks_count || item.toco_clicks_count) && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-[9px] font-mono font-semibold text-neutral-500 dark:text-neutral-400 flex-wrap justify-center", children: [
                Number(item.shopee_clicks_count) > 0 && /* @__PURE__ */ jsxs("span", { className: "text-[#EE4D2D]", title: "Shopee clicks", children: [
                  "S: ",
                  item.shopee_clicks_count
                ] }),
                Number(item.tokopedia_clicks_count) > 0 && /* @__PURE__ */ jsxs("span", { className: "text-[#03AC0E]", title: "Tokopedia clicks", children: [
                  "T: ",
                  item.tokopedia_clicks_count
                ] }),
                Number(item.gramedia_clicks_count) > 0 && /* @__PURE__ */ jsxs("span", { className: "text-[#00519E]", title: "Gramedia clicks", children: [
                  "G: ",
                  item.gramedia_clicks_count
                ] }),
                Number(item.toco_clicks_count) > 0 && /* @__PURE__ */ jsxs("span", { className: "text-amber-600 dark:text-amber-400", title: "Toco clicks", children: [
                  "Tc: ",
                  item.toco_clicks_count
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-1.5", children: [
              item.shopee_url && /* @__PURE__ */ jsx(
                "a",
                {
                  href: item.shopee_url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-6 h-6 rounded bg-[#EE4D2D] text-white flex items-center justify-center text-[10px] font-bold",
                  title: "Buka Link Shopee",
                  children: "S"
                }
              ),
              item.tokopedia_url && /* @__PURE__ */ jsx(
                "a",
                {
                  href: item.tokopedia_url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-6 h-6 rounded bg-[#03AC0E] text-white flex items-center justify-center text-[10px] font-bold",
                  title: "Buka Link Tokopedia",
                  children: "T"
                }
              ),
              item.gramedia_url && /* @__PURE__ */ jsx(
                "a",
                {
                  href: item.gramedia_url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-6 h-6 rounded bg-[#00519E] text-white flex items-center justify-center text-[10px] font-bold",
                  title: "Buka Link Gramedia",
                  children: "G"
                }
              ),
              item.toco_url && /* @__PURE__ */ jsx(
                "a",
                {
                  href: item.toco_url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-6 h-6 rounded bg-[#FFD400] text-neutral-950 flex items-center justify-center text-[10px] font-black shadow-2xs",
                  title: "Buka Link Toco",
                  children: "Tc"
                }
              ),
              !item.shopee_url && !item.tokopedia_url && !item.gramedia_url && !item.toco_url && /* @__PURE__ */ jsx("span", { className: "text-[11px] text-neutral-400", children: "-" })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  asChild: true,
                  title: "Lihat Tampilan User",
                  className: "h-8 w-8 text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white",
                  children: /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: route("kios.detail", item.slug || item.id),
                      target: "_blank",
                      rel: "noopener noreferrer",
                      children: /* @__PURE__ */ jsx(Eye, { className: "w-3.5 h-3.5" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(Link, { href: route("admin.kios.edit", item.id), children: /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  title: "Edit Item Kios",
                  className: "h-8 w-8 text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white",
                  children: /* @__PURE__ */ jsx(Pencil, { className: "w-3.5 h-3.5" })
                }
              ) }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  title: "Hapus Item Kios",
                  className: "h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40",
                  onClick: () => setDeleteItem(item),
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              )
            ] }) })
          ] }, item.id);
        }) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 10, className: "h-32 text-center text-xs text-neutral-500", children: "Belum ada item kios yang ditambahkan." }) }) })
      ] }) }),
      kiosItems.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-neutral-500 pt-2", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "Halaman ",
          kiosItems.current_page,
          " dari ",
          kiosItems.last_page,
          " (",
          kiosItems.total,
          " total item)"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: kiosItems.links.map((link, idx) => {
          const cleanLabel = link.label.replace("pagination.previous", "Previous").replace("pagination.next", "Next");
          return /* @__PURE__ */ jsx(
            Link,
            {
              href: link.url || "#",
              preserveScroll: true,
              className: `px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-colors ${link.active ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900" : !link.url ? "opacity-40 cursor-not-allowed border-neutral-200 dark:border-neutral-800" : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100"}`,
              dangerouslySetInnerHTML: { __html: cleanLabel }
            },
            idx
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      AlertDialog,
      {
        open: !!deleteItem,
        onOpenChange: (open) => !open && setDeleteItem(null),
        children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Hapus Item Kios?" }),
            /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
              "Apakah Anda yakin ingin menghapus item",
              " ",
              /* @__PURE__ */ jsxs("span", { className: "font-semibold text-neutral-900 dark:text-white", children: [
                '"',
                deleteItem == null ? void 0 : deleteItem.title,
                '"'
              ] }),
              "? Tindakan ini tidak dapat dibatalkan."
            ] })
          ] }),
          /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Batal" }),
            /* @__PURE__ */ jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                className: "bg-red-600 hover:bg-red-700 text-white",
                children: "Hapus"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: KiosIndex
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$b = [
  {
    title: "Dashboard",
    href: "/admin/dashboard"
  },
  {
    title: "Kios Merch & Preloved",
    href: "/admin/kios"
  },
  {
    title: "Activity Logs",
    href: "/admin/kios/logs"
  }
];
function Logs$1({ logs, filters: rawFilters, stats }) {
  var _a;
  const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
  const [search, setSearch] = useState(filters.search || "");
  const [actionType, setActionType] = useState(filters.action_type || "all");
  const [startDate, setStartDate] = useState(filters.start_date || "");
  const [endDate, setEndDate] = useState(filters.end_date || "");
  const [deleteItem, setDeleteItem] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);
  const handleApplyFilters = (newStart, newEnd, newSearch, newAction) => {
    const queryStart = newStart !== void 0 ? newStart : startDate;
    const queryEnd = newEnd !== void 0 ? newEnd : endDate;
    const querySearch = search;
    const queryAction = newAction !== void 0 ? newAction : actionType;
    router.get(
      route("admin.kios.logs"),
      {
        search: querySearch || void 0,
        kios_item_id: filters.kios_item_id || void 0,
        action_type: queryAction !== "all" ? queryAction : void 0,
        start_date: queryStart || void 0,
        end_date: queryEnd || void 0
      },
      { preserveState: true, preserveScroll: true }
    );
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleApplyFilters();
  };
  const handleReset = () => {
    setSearch("");
    setActionType("all");
    setStartDate("");
    setEndDate("");
    router.get(route("admin.kios.logs"), {}, { preserveScroll: true });
  };
  const toLocalDateString = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    }
    return dateString;
  };
  const confirmDeleteSingle = () => {
    if (!deleteItem) return;
    setIsDeleting(true);
    router.delete(route("admin.kios.logs.destroy", deleteItem.id), {
      preserveScroll: true,
      onFinish: () => {
        setIsDeleting(false);
        setDeleteItem(null);
      }
    });
  };
  const confirmClearLogs = () => {
    setIsDeleting(true);
    router.delete(route("admin.kios.logs.clear"), {
      data: {
        kios_item_id: filters.kios_item_id || void 0,
        action_type: actionType !== "all" ? actionType : void 0,
        start_date: startDate || void 0,
        end_date: endDate || void 0
      },
      preserveScroll: true,
      onFinish: () => {
        setIsDeleting(false);
        setShowClearConfirm(false);
      }
    });
  };
  const parseUserAgent = (ua) => {
    if (!ua) return { device: "Unknown", browser: "Unknown", isMobile: false };
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(ua);
    let browser = "Browser";
    if (/edg/i.test(ua)) browser = "Edge";
    else if (/chrome|crios/i.test(ua)) browser = "Chrome";
    else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
    else if (/safari/i.test(ua)) browser = "Safari";
    else if (/opera|opr/i.test(ua)) browser = "Opera";
    return {
      device: isMobile ? "Mobile" : "Desktop",
      browser,
      isMobile
    };
  };
  const renderActionBadge = (action) => {
    if (action === "view") {
      return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800", children: [
        /* @__PURE__ */ jsx(Eye, { className: "w-3 h-3" }),
        /* @__PURE__ */ jsx("span", { children: "View Detail" })
      ] });
    }
    const platform = action.replace("click_", "");
    return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800 uppercase", children: [
      /* @__PURE__ */ jsx(MousePointerClick, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxs("span", { children: [
        "Klik ",
        platform
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$b, children: [
    /* @__PURE__ */ jsx(Head, { title: "Kios Activity Logs" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-5 p-4 sm:p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Link, { href: route("admin.kios.index"), children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) }) }),
            /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white", children: [
              /* @__PURE__ */ jsx(History, { className: "w-6 h-6 text-[#112A12] dark:text-emerald-400" }),
              /* @__PURE__ */ jsx("span", { children: "Log Kunjungan & Klik Produk Kios" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 ml-10", children: "Pencatatan riwayat waktu saat produk dilihat atau link pembelian diklik oleh pembeli." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap sm:flex-nowrap", children: [
          /* @__PURE__ */ jsx(Link, { href: route("admin.kios.search-logs"), children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs", children: [
            /* @__PURE__ */ jsx(SearchCode, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400" }),
            /* @__PURE__ */ jsx("span", { children: "Keyword Logs" })
          ] }) }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: route("admin.kios.logs.export", {
                search: filters.search,
                kios_item_id: filters.kios_item_id,
                action_type: filters.action_type,
                start_date: filters.start_date,
                end_date: filters.end_date
              }),
              target: "_blank",
              rel: "noopener noreferrer",
              download: true,
              children: /* @__PURE__ */ jsxs(
                Button,
                {
                  className: "bg-[#0F9D58] hover:bg-[#0b8043] text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs",
                  title: "Download format CSV yang kompatibel langsung dengan Google Sheets & Excel",
                  children: [
                    /* @__PURE__ */ jsx(FileSpreadsheet, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsx("span", { children: "Export Google Sheets" })
                  ]
                }
              )
            }
          ),
          logs.data.length > 0 && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => setShowClearConfirm(true),
              className: "h-9 px-3 text-xs font-bold flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 border-red-200 dark:border-red-900/50 cursor-pointer",
              title: "Bersihkan log (seluruhnya atau sesuai filter tanggal)",
              children: [
                /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Bersihkan Log" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => router.reload(),
              className: "h-9 px-3 text-xs font-bold flex items-center gap-1.5 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Refresh" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Total View Produk" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-neutral-900 dark:text-white", children: stats.total_views.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-[#112A12]/10 dark:bg-emerald-950/40 text-[#112A12] dark:text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(Eye, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Total Klik Pembelian" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-amber-600 dark:text-amber-400", children: stats.total_clicks.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(MousePointerClick, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Aktivitas Hari Ini" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-emerald-600 dark:text-emerald-400", children: stats.today_views.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Unique IP Pengunjung" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-blue-600 dark:text-blue-400", children: stats.unique_ips.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(Users, { className: "w-5 h-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-2xs", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSearchSubmit, className: "flex items-center gap-2 flex-1 max-w-md", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Cari judul produk, IP, user agent...",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-9 h-9 text-xs"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: actionType,
              onChange: (e) => {
                setActionType(e.target.value);
                handleApplyFilters(void 0, void 0, void 0, e.target.value);
              },
              className: "h-9 px-2.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 font-semibold",
              children: [
                /* @__PURE__ */ jsx("option", { value: "all", children: "Semua Tipe" }),
                /* @__PURE__ */ jsx("option", { value: "view", children: "View Detail" }),
                /* @__PURE__ */ jsx("option", { value: "click_shopee", children: "Klik Shopee" }),
                /* @__PURE__ */ jsx("option", { value: "click_tokopedia", children: "Klik Tokopedia" }),
                /* @__PURE__ */ jsx("option", { value: "click_gramedia", children: "Klik Gramedia" }),
                /* @__PURE__ */ jsx("option", { value: "click_toco", children: "Klik Toco" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "secondary", className: "h-9 px-3 text-xs font-bold", children: "Cari" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-neutral-500 dark:text-neutral-400", children: "Dari:" }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                onClick: () => setIsStartDateOpen(true),
                className: `h-9 px-3 text-xs font-medium justify-start text-left gap-2 border-neutral-200 dark:border-neutral-800 ${!startDate && "text-neutral-400"}`,
                children: [
                  /* @__PURE__ */ jsx(Calendar$1, { className: "w-3.5 h-3.5 text-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { children: startDate ? formatDisplayDate(startDate) : "Pilih Tanggal" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-neutral-500 dark:text-neutral-400", children: "Sampai:" }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                onClick: () => setIsEndDateOpen(true),
                className: `h-9 px-3 text-xs font-medium justify-start text-left gap-2 border-neutral-200 dark:border-neutral-800 ${!endDate && "text-neutral-400"}`,
                children: [
                  /* @__PURE__ */ jsx(Calendar$1, { className: "w-3.5 h-3.5 text-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { children: endDate ? formatDisplayDate(endDate) : "Pilih Tanggal" })
                ]
              }
            )
          ] }),
          filters.kios_item_id && /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md", children: [
            "Filter Kios #",
            filters.kios_item_id
          ] }),
          (search || filters.kios_item_id || actionType !== "all" || startDate || endDate) && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleReset,
              className: "h-9 px-2.5 text-xs font-bold text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 flex items-center gap-1 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Reset Filter" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xs", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { className: "bg-[#112A12] text-white", children: /* @__PURE__ */ jsxs(TableRow, { className: "border-b border-[#112A12] hover:bg-transparent", children: [
          /* @__PURE__ */ jsx(TableHead, { className: "w-16 text-center text-xs font-bold text-white", children: "ID" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Produk / Item" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Aktivitas" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Waktu & Jam" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "IP Address" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Device & Browser" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "User Agent" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right text-xs font-bold w-16 text-white", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: logs.data.length > 0 ? logs.data.map((log) => {
          const uaParsed = parseUserAgent(log.user_agent);
          const dateObj = new Date(log.created_at);
          return /* @__PURE__ */ jsxs(TableRow, { className: "hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40", children: [
            /* @__PURE__ */ jsxs(TableCell, { className: "text-center font-mono text-xs text-neutral-400", children: [
              "#",
              log.id
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "max-w-[260px]", children: log.kios_item ? /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ jsxs("div", { className: "font-bold text-xs text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(ShoppingBag, { className: "w-3.5 h-3.5 text-emerald-600 shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "truncate", children: log.kios_item.title })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-mono text-neutral-400 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "bg-neutral-100 dark:bg-neutral-800 px-1 rounded", children: log.kios_item.is_preloved ? "Preloved" : "Partner" }),
                log.kios_item.publisher_name && /* @__PURE__ */ jsx("span", { children: log.kios_item.publisher_name })
              ] })
            ] }) : /* @__PURE__ */ jsxs("span", { className: "text-xs text-neutral-400 italic", children: [
              "Item Kios #",
              log.kios_item_id,
              " (Dihapus)"
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: renderActionBadge(log.action_type) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ jsxs("div", { className: "font-mono font-bold text-xs text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-neutral-400" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  dateObj.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                  }),
                  " WIB"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "font-mono text-[10px] text-neutral-400 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Calendar$1, { className: "w-3 h-3 text-neutral-400" }),
                /* @__PURE__ */ jsx("span", { children: dateObj.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                }) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", { className: "font-mono text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md border border-neutral-200/50 dark:border-neutral-700", children: log.ip_address || "127.0.0.1" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              uaParsed.isMobile ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800", children: [
                /* @__PURE__ */ jsx(Smartphone, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsx("span", { children: "Mobile" })
              ] }) : /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800", children: [
                /* @__PURE__ */ jsx(Laptop, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsx("span", { children: "Desktop" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono text-neutral-500 dark:text-neutral-400", children: uaParsed.browser })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "max-w-[180px] truncate font-mono text-[10px] text-neutral-400", title: log.user_agent || "", children: log.user_agent || "-" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer",
                onClick: () => setDeleteItem(log),
                title: "Hapus baris log ini",
                children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            ) })
          ] }, log.id);
        }) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 8, className: "h-32 text-center text-xs text-neutral-500", children: "Belum ada riwayat log aktivitas kios yang tercatat sesuai kriteria filter." }) }) })
      ] }) }),
      logs.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-neutral-500 pt-2", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "Halaman ",
          logs.current_page,
          " dari ",
          logs.last_page,
          " (",
          logs.total,
          " total log)"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: logs.links.map((link, idx) => {
          let label = link.label;
          if (label.includes("pagination.previous") || label.includes("&laquo;") || label.includes("Previous")) {
            label = "&laquo; Previous";
          } else if (label.includes("pagination.next") || label.includes("&raquo;") || label.includes("Next")) {
            label = "Next &raquo;";
          }
          return /* @__PURE__ */ jsx(
            Link,
            {
              href: link.url || "#",
              preserveScroll: true,
              className: `px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-colors ${link.active ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900" : !link.url ? "opacity-40 cursor-not-allowed border-neutral-200 dark:border-neutral-800" : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100"}`,
              dangerouslySetInnerHTML: { __html: label }
            },
            idx
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: isStartDateOpen, onOpenChange: setIsStartDateOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg w-[92vw] sm:w-[500px] p-6 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "w-full text-center sm:text-center pb-2", children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar$1, { className: "w-4 h-4 text-emerald-600" }),
          /* @__PURE__ */ jsx("span", { children: "Pilih Tanggal Mulai (Dari)" })
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-xs text-neutral-500", children: "Pilih tanggal awal untuk memfilter data log aktivitas kios." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center py-2", children: /* @__PURE__ */ jsx(
        Calendar,
        {
          mode: "single",
          className: "w-full p-4 [--cell-size:3.2rem] rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-2xs",
          classNames: {
            root: "w-full",
            months: "w-full flex flex-col items-center",
            month: "w-full space-y-4",
            month_grid: "w-full border-collapse",
            weekdays: "flex w-full justify-between",
            weekday: "text-muted-foreground flex-1 text-center font-bold text-xs py-1",
            week: "flex w-full justify-between mt-2",
            day: "flex-1 aspect-square flex items-center justify-center p-0"
          },
          selected: startDate ? (() => {
            const parts = startDate.split("-");
            return parts.length === 3 ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)) : void 0;
          })() : void 0,
          onSelect: (date) => {
            if (date) {
              const formatted = toLocalDateString(date);
              setStartDate(formatted);
              setIsStartDateOpen(false);
              handleApplyFilters(formatted, endDate);
            } else {
              setStartDate("");
              setIsStartDateOpen(false);
              handleApplyFilters("", endDate);
            }
          }
        }
      ) }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "w-full mt-3 flex items-center justify-between sm:justify-between", children: [
        startDate ? /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              setStartDate("");
              setIsStartDateOpen(false);
              handleApplyFilters("", endDate);
            },
            className: "text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer",
            children: "Hapus Filter Tanggal"
          }
        ) : /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setIsStartDateOpen(false),
            className: "text-xs font-semibold cursor-pointer",
            children: "Tutup"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: isEndDateOpen, onOpenChange: setIsEndDateOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg w-[92vw] sm:w-[500px] p-6 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "w-full text-center sm:text-center pb-2", children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar$1, { className: "w-4 h-4 text-emerald-600" }),
          /* @__PURE__ */ jsx("span", { children: "Pilih Tanggal Akhir (Sampai)" })
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-xs text-neutral-500", children: "Pilih tanggal akhir untuk memfilter data log aktivitas kios." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center py-2", children: /* @__PURE__ */ jsx(
        Calendar,
        {
          mode: "single",
          className: "w-full p-4 [--cell-size:3.2rem] rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-2xs",
          classNames: {
            root: "w-full",
            months: "w-full flex flex-col items-center",
            month: "w-full space-y-4",
            month_grid: "w-full border-collapse",
            weekdays: "flex w-full justify-between",
            weekday: "text-muted-foreground flex-1 text-center font-bold text-xs py-1",
            week: "flex w-full justify-between mt-2",
            day: "flex-1 aspect-square flex items-center justify-center p-0"
          },
          selected: endDate ? (() => {
            const parts = endDate.split("-");
            return parts.length === 3 ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)) : void 0;
          })() : void 0,
          onSelect: (date) => {
            if (date) {
              const formatted = toLocalDateString(date);
              setEndDate(formatted);
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, formatted);
            } else {
              setEndDate("");
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, "");
            }
          }
        }
      ) }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "w-full mt-3 flex items-center justify-between sm:justify-between", children: [
        endDate ? /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              setEndDate("");
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, "");
            },
            className: "text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer",
            children: "Hapus Filter Tanggal"
          }
        ) : /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setIsEndDateOpen(false),
            className: "text-xs font-semibold cursor-pointer",
            children: "Tutup"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: !!deleteItem, onOpenChange: (open) => !open && setDeleteItem(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2 text-red-600", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { children: "Hapus Riwayat Log Kios" })
        ] }),
        /* @__PURE__ */ jsxs(DialogDescription, { className: "text-xs text-neutral-600 dark:text-neutral-400 mt-2", children: [
          "Apakah Anda yakin ingin menghapus data log ID ",
          /* @__PURE__ */ jsxs("strong", { children: [
            "#",
            deleteItem == null ? void 0 : deleteItem.id
          ] }),
          " untuk produk ",
          /* @__PURE__ */ jsx("strong", { children: ((_a = deleteItem == null ? void 0 : deleteItem.kios_item) == null ? void 0 : _a.title) || "item" }),
          "? Tindakan ini tidak dapat dibatalkan."
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "mt-4 gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setDeleteItem(null),
            disabled: isDeleting,
            children: "Batal"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "destructive",
            size: "sm",
            onClick: confirmDeleteSingle,
            disabled: isDeleting,
            className: "bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer",
            children: isDeleting ? "Menghapus..." : "Ya, Hapus Log"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: showClearConfirm, onOpenChange: setShowClearConfirm, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2 text-red-600", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { children: "Bersihkan Seluruh Log Kios" })
        ] }),
        /* @__PURE__ */ jsxs(DialogDescription, { className: "text-xs text-neutral-600 dark:text-neutral-400 mt-2 space-y-2", children: [
          /* @__PURE__ */ jsx("p", { children: startDate || endDate ? /* @__PURE__ */ jsxs(Fragment, { children: [
            "Anda akan menghapus data log dalam rentang",
            " ",
            /* @__PURE__ */ jsx("strong", { children: startDate ? formatDisplayDate(startDate) : "awal" }),
            " s/d",
            " ",
            /* @__PURE__ */ jsx("strong", { children: endDate ? formatDisplayDate(endDate) : "sekarang" }),
            "."
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            "Anda akan menghapus ",
            /* @__PURE__ */ jsx("strong", { children: "seluruh data log aktivitas kios" }),
            " yang ada di database."
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-neutral-500", children: /* @__PURE__ */ jsx("em", { children: "Catatan: Jumlah counter views dan klik pada masing-masing produk kios tidak akan terpengaruh atau berkurang." }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "mt-4 gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setShowClearConfirm(false),
            disabled: isDeleting,
            children: "Batal"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "destructive",
            size: "sm",
            onClick: confirmClearLogs,
            disabled: isDeleting,
            className: "bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer",
            children: isDeleting ? "Membersihkan..." : "Bersihkan Sekarang"
          }
        )
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Logs$1
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$a = [
  {
    title: "Dashboard",
    href: "/admin/dashboard"
  },
  {
    title: "Kios",
    href: "/admin/kios"
  },
  {
    title: "Keyword Logs",
    href: "/admin/kios/search-logs"
  }
];
function SearchLogs$1({ logs, filters: rawFilters, stats, topSearches }) {
  const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
  const [search, setSearch] = useState(filters.search || "");
  const [startDate, setStartDate] = useState(filters.start_date || "");
  const [endDate, setEndDate] = useState(filters.end_date || "");
  const [deleteItem, setDeleteItem] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);
  const handleApplyFilters = (newStart, newEnd, newSearch) => {
    const queryStart = newStart !== void 0 ? newStart : startDate;
    const queryEnd = newEnd !== void 0 ? newEnd : endDate;
    const querySearch = newSearch !== void 0 ? newSearch : search;
    router.get(
      route("admin.kios.search-logs"),
      {
        search: querySearch || void 0,
        start_date: queryStart || void 0,
        end_date: queryEnd || void 0
      },
      { preserveState: true, preserveScroll: true }
    );
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleApplyFilters();
  };
  const handleReset = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    router.get(route("admin.kios.search-logs"), {}, { preserveScroll: true });
  };
  const toLocalDateString = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    }
    return dateString;
  };
  const confirmDeleteSingle = () => {
    if (!deleteItem) return;
    setIsDeleting(true);
    router.delete(route("admin.kios.search-logs.destroy", deleteItem.id), {
      preserveScroll: true,
      onFinish: () => {
        setIsDeleting(false);
        setDeleteItem(null);
      }
    });
  };
  const confirmClearLogs = () => {
    setIsDeleting(true);
    router.delete(route("admin.kios.search-logs.clear"), {
      data: {
        search: search || void 0,
        start_date: startDate || void 0,
        end_date: endDate || void 0
      },
      preserveScroll: true,
      onFinish: () => {
        setIsDeleting(false);
        setShowClearConfirm(false);
      }
    });
  };
  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$a, children: [
    /* @__PURE__ */ jsx(Head, { title: "Keyword Logs Pencarian Kios" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-5 p-4 sm:p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Link, { href: route("admin.kios.index"), children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) }) }),
            /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white", children: [
              /* @__PURE__ */ jsx(SearchCode, { className: "w-6 h-6 text-[#112A12] dark:text-emerald-400" }),
              /* @__PURE__ */ jsx("span", { children: "Log Kata Kunci Pencarian Kios" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 ml-10", children: "Riwayat kata kunci yang dicari pengunjung pada etalase katalog produk kios (dilengkapi sanitasi dan anti-spam)." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap sm:flex-nowrap", children: [
          /* @__PURE__ */ jsx(Link, { href: route("admin.kios.logs"), children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs", children: [
            /* @__PURE__ */ jsx(Store, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400" }),
            /* @__PURE__ */ jsx("span", { children: "Lihat Aktivitas Kios" })
          ] }) }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: route("admin.kios.search-logs.export", {
                search: filters.search,
                start_date: filters.start_date,
                end_date: filters.end_date
              }),
              target: "_blank",
              rel: "noopener noreferrer",
              download: true,
              children: /* @__PURE__ */ jsxs(
                Button,
                {
                  className: "bg-[#0F9D58] hover:bg-[#0b8043] text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs",
                  title: "Download format CSV yang kompatibel langsung dengan Google Sheets & Excel",
                  children: [
                    /* @__PURE__ */ jsx(FileSpreadsheet, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsx("span", { children: "Export Google Sheets" })
                  ]
                }
              )
            }
          ),
          logs.data.length > 0 && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => setShowClearConfirm(true),
              className: "h-9 px-3 text-xs font-bold flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 border-red-200 dark:border-red-900/50 cursor-pointer",
              title: "Bersihkan log (seluruhnya atau sesuai filter tanggal/kata kunci)",
              children: [
                /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Bersihkan Log" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => router.reload(),
              className: "h-9 px-3 text-xs font-bold flex items-center gap-1.5 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Refresh" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Total Frekuensi Pencarian" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-neutral-900 dark:text-white", children: stats.total_searches.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-[#112A12]/10 dark:bg-emerald-950/40 text-[#112A12] dark:text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(Search, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Pencarian Hari Ini" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-emerald-600 dark:text-emerald-400", children: stats.today_searches.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Kata Kunci Unik" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-blue-600 dark:text-blue-400", children: stats.unique_keywords.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(Hash, { className: "w-5 h-5" }) })
        ] })
      ] }),
      topSearches && topSearches.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-[#DA6B1C] shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-mono font-bold uppercase text-neutral-700 dark:text-neutral-300", children: "Top Kata Kunci Kios Terpopuler:" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 flex-wrap", children: topSearches.map((item, idx) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              setSearch(item.keyword);
              handleApplyFilters(void 0, void 0, item.keyword);
            },
            className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-emerald-500 text-neutral-800 dark:text-neutral-200 cursor-pointer shadow-3xs transition-all",
            children: [
              /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#112A12] dark:text-emerald-400", children: [
                "#",
                idx + 1
              ] }),
              /* @__PURE__ */ jsx("span", { children: item.keyword }),
              /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-mono text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-900 px-1.5 py-0.5 rounded", children: [
                Number(item.total_count).toLocaleString("id-ID"),
                "x"
              ] })
            ]
          },
          idx
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-2xs", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSearchSubmit, className: "flex items-center gap-2 flex-1 max-w-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Cari kata kunci produk kios...",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-9 h-9 text-xs"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "secondary", className: "h-9 px-3 text-xs font-bold", children: "Cari" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-neutral-500 dark:text-neutral-400", children: "Dari:" }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                onClick: () => setIsStartDateOpen(true),
                className: `h-9 px-3 text-xs font-medium justify-start text-left gap-2 border-neutral-200 dark:border-neutral-800 ${!startDate && "text-neutral-400"}`,
                children: [
                  /* @__PURE__ */ jsx(Calendar$1, { className: "w-3.5 h-3.5 text-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { children: startDate ? formatDisplayDate(startDate) : "Pilih Tanggal" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-neutral-500 dark:text-neutral-400", children: "Sampai:" }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                onClick: () => setIsEndDateOpen(true),
                className: `h-9 px-3 text-xs font-medium justify-start text-left gap-2 border-neutral-200 dark:border-neutral-800 ${!endDate && "text-neutral-400"}`,
                children: [
                  /* @__PURE__ */ jsx(Calendar$1, { className: "w-3.5 h-3.5 text-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { children: endDate ? formatDisplayDate(endDate) : "Pilih Tanggal" })
                ]
              }
            )
          ] }),
          (search || startDate || endDate) && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleReset,
              className: "h-9 text-xs font-bold flex items-center gap-1 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Reset Filter" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-2xs", children: [
        /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { className: "bg-neutral-50/70 dark:bg-neutral-800/50", children: /* @__PURE__ */ jsxs(TableRow, { className: "border-neutral-200 dark:border-neutral-800", children: [
            /* @__PURE__ */ jsx(TableHead, { className: "w-[80px] text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "ID" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "Kata Kunci (Keyword)" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "Frekuensi Pencarian" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "Tanggal Pencarian" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "Terakhir Dicari" }),
            /* @__PURE__ */ jsx(TableHead, { className: "w-[100px] text-right text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "Aksi" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: logs.data.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 6, className: "h-48 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-2 text-neutral-400 dark:text-neutral-500", children: [
            /* @__PURE__ */ jsx(SearchCode, { className: "w-8 h-8 stroke-1" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Belum ada riwayat kata kunci pencarian produk kios" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-400", children: "Kata kunci yang diketik pengunjung saat mencari produk di etalase kios akan otomatis dicatat di sini." })
          ] }) }) }) : logs.data.map((log) => {
            return /* @__PURE__ */ jsxs(
              TableRow,
              {
                className: "border-neutral-100 dark:border-neutral-800/60 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors",
                children: [
                  /* @__PURE__ */ jsxs(TableCell, { className: "font-mono text-xs text-neutral-400", children: [
                    "#",
                    log.id
                  ] }),
                  /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("span", { className: "font-medium font-mono text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md border border-neutral-200/60 dark:border-neutral-700", children: log.keyword }) }) }),
                  /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40", children: [
                    /* @__PURE__ */ jsx(TrendingUp, { className: "w-3 h-3 text-emerald-600 dark:text-emerald-400" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      log.search_count.toLocaleString("id-ID"),
                      "x dicari"
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-300 font-sans", children: [
                    /* @__PURE__ */ jsx(Calendar$1, { className: "w-3.5 h-3.5 text-neutral-400" }),
                    /* @__PURE__ */ jsx("span", { children: formatDisplayDate(log.search_date) })
                  ] }) }),
                  /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-mono", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-neutral-400" }),
                    /* @__PURE__ */ jsx("span", { children: formatDateTime(log.updated_at) })
                  ] }) }),
                  /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      onClick: () => setDeleteItem(log),
                      className: "h-8 w-8 text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg cursor-pointer",
                      title: "Hapus log kata kunci ini",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                    }
                  ) })
                ]
              },
              log.id
            );
          }) })
        ] }),
        logs.total > logs.per_page && /* @__PURE__ */ jsxs("div", { className: "p-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-neutral-500", children: [
            "Menampilkan ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-neutral-800 dark:text-neutral-200", children: logs.from || 0 }),
            " sampai",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-neutral-800 dark:text-neutral-200", children: logs.to || 0 }),
            " dari",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-neutral-800 dark:text-neutral-200", children: logs.total }),
            " data"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: logs.links.map((link, idx) => {
            if (link.url === null) {
              return /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  disabled: true,
                  dangerouslySetInnerHTML: { __html: link.label },
                  className: "h-8 text-xs font-semibold opacity-50 cursor-not-allowed"
                },
                idx
              );
            }
            return /* @__PURE__ */ jsx(Link, { href: link.url, preserveScroll: true, preserveState: true, children: /* @__PURE__ */ jsx(
              Button,
              {
                variant: link.active ? "default" : "outline",
                size: "sm",
                dangerouslySetInnerHTML: { __html: link.label },
                className: `h-8 text-xs font-semibold ${link.active ? "bg-[#112A12] text-white hover:bg-[#112A12]/90" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"}`
              }
            ) }, idx);
          }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: !!deleteItem, onOpenChange: (open) => !open && setDeleteItem(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md p-6", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-1", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white", children: "Hapus Log Kata Kunci Kios?" }),
        /* @__PURE__ */ jsxs(DialogDescription, { className: "text-xs text-neutral-500 dark:text-neutral-400", children: [
          "Apakah Anda yakin ingin menghapus riwayat kata kunci ",
          /* @__PURE__ */ jsxs("span", { className: "font-bold text-neutral-900 dark:text-white font-mono", children: [
            '"',
            deleteItem == null ? void 0 : deleteItem.keyword,
            '"'
          ] }),
          " pada tanggal ",
          /* @__PURE__ */ jsx("span", { className: "font-bold text-neutral-900 dark:text-white", children: formatDisplayDate(deleteItem == null ? void 0 : deleteItem.search_date) }),
          "? Tindakan ini tidak dapat dibatalkan."
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "mt-4 flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            disabled: isDeleting,
            onClick: () => setDeleteItem(null),
            className: "text-xs font-semibold cursor-pointer",
            children: "Batal"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "destructive",
            size: "sm",
            disabled: isDeleting,
            onClick: confirmDeleteSingle,
            className: "text-xs font-semibold cursor-pointer bg-red-600 hover:bg-red-700 text-white",
            children: isDeleting ? "Menghapus..." : "Ya, Hapus Log"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: showClearConfirm, onOpenChange: setShowClearConfirm, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md p-6", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-1", children: /* @__PURE__ */ jsx(Trash2, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white", children: "Bersihkan Riwayat Log Kata Kunci Kios?" }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-xs text-neutral-500 dark:text-neutral-400 space-y-1.5", children: /* @__PURE__ */ jsx("p", { children: startDate || endDate || search ? /* @__PURE__ */ jsxs("span", { children: [
          "Data log kata kunci pencarian kios yang sesuai dengan ",
          /* @__PURE__ */ jsx("strong", { children: "filter aktif saat ini" }),
          " akan dihapus permanen."
        ] }) : /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsxs("strong", { children: [
            "Seluruh (",
            stats.total_searches.toLocaleString("id-ID"),
            ")"
          ] }),
          " data log kata kunci pencarian kios akan dihapus secara permanen dari database."
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "mt-4 flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            disabled: isDeleting,
            onClick: () => setShowClearConfirm(false),
            className: "text-xs font-semibold cursor-pointer",
            children: "Batal"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "destructive",
            size: "sm",
            disabled: isDeleting,
            onClick: confirmClearLogs,
            className: "text-xs font-semibold cursor-pointer bg-red-600 hover:bg-red-700 text-white",
            children: isDeleting ? "Membersihkan..." : "Ya, Bersihkan Sekarang"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: isStartDateOpen, onOpenChange: setIsStartDateOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg w-[92vw] sm:w-[500px] p-6 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "w-full text-center sm:text-center pb-2", children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar$1, { className: "w-4 h-4 text-emerald-600" }),
          /* @__PURE__ */ jsx("span", { children: "Pilih Tanggal Mulai (Dari)" })
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-xs text-neutral-500", children: "Pilih tanggal awal untuk memfilter data log kata kunci pencarian kios." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center py-2", children: /* @__PURE__ */ jsx(
        Calendar,
        {
          mode: "single",
          className: "w-full p-4 [--cell-size:3.2rem] rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-2xs",
          classNames: {
            root: "w-full",
            months: "w-full flex flex-col items-center",
            month: "w-full space-y-4",
            month_grid: "w-full border-collapse",
            weekdays: "flex w-full justify-between",
            weekday: "text-muted-foreground flex-1 text-center font-bold text-xs py-1",
            week: "flex w-full justify-between mt-2",
            day: "flex-1 aspect-square flex items-center justify-center p-0"
          },
          selected: startDate ? (() => {
            const parts = startDate.split("-");
            return parts.length === 3 ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)) : void 0;
          })() : void 0,
          onSelect: (date) => {
            if (date) {
              const formatted = toLocalDateString(date);
              setStartDate(formatted);
              setIsStartDateOpen(false);
              handleApplyFilters(formatted, endDate);
            } else {
              setStartDate("");
              setIsStartDateOpen(false);
              handleApplyFilters("", endDate);
            }
          }
        }
      ) }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "w-full mt-3 flex items-center justify-between sm:justify-between", children: [
        startDate ? /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              setStartDate("");
              setIsStartDateOpen(false);
              handleApplyFilters("", endDate);
            },
            className: "text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer",
            children: "Hapus Filter Tanggal"
          }
        ) : /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setIsStartDateOpen(false),
            className: "text-xs font-semibold cursor-pointer",
            children: "Tutup"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: isEndDateOpen, onOpenChange: setIsEndDateOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg w-[92vw] sm:w-[500px] p-6 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "w-full text-center sm:text-center pb-2", children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar$1, { className: "w-4 h-4 text-emerald-600" }),
          /* @__PURE__ */ jsx("span", { children: "Pilih Tanggal Akhir (Sampai)" })
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-xs text-neutral-500", children: "Pilih tanggal akhir untuk memfilter data log kata kunci pencarian kios." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center py-2", children: /* @__PURE__ */ jsx(
        Calendar,
        {
          mode: "single",
          className: "w-full p-4 [--cell-size:3.2rem] rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-2xs",
          classNames: {
            root: "w-full",
            months: "w-full flex flex-col items-center",
            month: "w-full space-y-4",
            month_grid: "w-full border-collapse",
            weekdays: "flex w-full justify-between",
            weekday: "text-muted-foreground flex-1 text-center font-bold text-xs py-1",
            week: "flex w-full justify-between mt-2",
            day: "flex-1 aspect-square flex items-center justify-center p-0"
          },
          selected: endDate ? (() => {
            const parts = endDate.split("-");
            return parts.length === 3 ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)) : void 0;
          })() : void 0,
          onSelect: (date) => {
            if (date) {
              const formatted = toLocalDateString(date);
              setEndDate(formatted);
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, formatted);
            } else {
              setEndDate("");
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, "");
            }
          }
        }
      ) }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "w-full mt-3 flex items-center justify-between sm:justify-between", children: [
        endDate ? /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              setEndDate("");
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, "");
            },
            className: "text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer",
            children: "Hapus Filter Tanggal"
          }
        ) : /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setIsEndDateOpen(false),
            className: "text-xs font-semibold cursor-pointer",
            children: "Tutup"
          }
        )
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SearchLogs$1
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$9 = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Toko Partner Kios", href: "/admin/kios-partners" },
  { title: "Tambah Toko Partner", href: "/admin/kios-partners/create" }
];
function KiosPartnerCreate() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    slug: "",
    logo_url: "",
    description: ""
  });
  const handleNameChange = (val) => {
    setData((prev) => ({
      ...prev,
      name: val,
      slug: prev.slug === "" || prev.slug === prev.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ? val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : prev.slug
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("admin.kios-partners.store"));
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$9, children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah Toko Partner Kios" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto p-4 sm:p-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Link, { href: route("admin.kios-partners.index"), children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-9 w-9", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-neutral-900 dark:text-white", children: "Tambah Toko Partner Kios Baru" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500", children: "Tambahkan nama toko partner/penjual untuk listing produk Kios." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", className: "text-xs font-semibold", children: "Nama Toko Partner *" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                value: data.name,
                onChange: (e) => handleNameChange(e.target.value),
                placeholder: "Contoh: geekmode.id / Preloved @konotasi / animate",
                required: true
              }
            ),
            errors.name && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "slug", className: "text-xs font-semibold", children: "Slug Identifier (Unik)" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "slug",
                value: data.slug,
                onChange: (e) => setData("slug", e.target.value),
                placeholder: "Contoh: geekmode / preloved / animate"
              }
            ),
            errors.slug && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: errors.slug })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "logo_url", className: "text-xs font-semibold", children: "URL Logo Toko (Opsional)" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "logo_url",
                value: data.logo_url,
                onChange: (e) => setData("logo_url", e.target.value),
                placeholder: "https://... URL gambar/logo"
              }
            ),
            data.logo_url && /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-3 p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg border", children: [
              /* @__PURE__ */ jsx("img", { src: data.logo_url, alt: "Preview", className: "w-10 h-10 object-contain rounded bg-white p-1" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-500", children: "Preview Logo" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "description", className: "text-xs font-semibold", children: "Deskripsi / Keterangan Toko" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "description",
                rows: 3,
                value: data.description,
                onChange: (e) => setData("description", e.target.value),
                placeholder: "Keterangan singkat partner atau official store..."
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800", children: [
          /* @__PURE__ */ jsx(Link, { href: route("admin.kios-partners.index"), children: /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", className: "text-xs font-bold", children: "Batal" }) }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "submit",
              disabled: processing,
              className: "bg-[#112A12] hover:bg-[#0c1e0d] text-white flex items-center gap-1.5 text-xs font-bold px-6",
              children: [
                /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: processing ? "Menyimpan..." : "Simpan Toko Partner" })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: KiosPartnerCreate
}, Symbol.toStringTag, { value: "Module" }));
function KiosPartnerEdit({ partner }) {
  const breadcrumbs2 = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Toko Partner Kios", href: "/admin/kios-partners" },
    { title: "Edit Toko Partner", href: `/admin/kios-partners/${partner.id}/edit` }
  ];
  const { data, setData, put, processing, errors } = useForm({
    name: partner.name || "",
    slug: partner.slug || "",
    logo_url: partner.logo_url || "",
    description: partner.description || ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("admin.kios-partners.update", partner.id));
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs2, children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit Toko Partner - ${partner.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto p-4 sm:p-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Link, { href: route("admin.kios-partners.index"), children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-9 w-9", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-neutral-900 dark:text-white", children: "Edit Toko Partner Kios" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-neutral-500", children: [
            "ID #",
            partner.id,
            " • ",
            partner.name
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", className: "text-xs font-semibold", children: "Nama Toko Partner *" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                value: data.name,
                onChange: (e) => setData("name", e.target.value),
                placeholder: "Contoh: geekmode.id / Preloved @konotasi / animate",
                required: true
              }
            ),
            errors.name && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "slug", className: "text-xs font-semibold", children: "Slug Identifier (Unik)" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "slug",
                value: data.slug,
                onChange: (e) => setData("slug", e.target.value),
                placeholder: "Contoh: geekmode / preloved / animate"
              }
            ),
            errors.slug && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: errors.slug })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "logo_url", className: "text-xs font-semibold", children: "URL Logo Toko (Opsional)" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "logo_url",
                value: data.logo_url,
                onChange: (e) => setData("logo_url", e.target.value),
                placeholder: "https://... URL gambar/logo"
              }
            ),
            data.logo_url && /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-3 p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg border", children: [
              /* @__PURE__ */ jsx("img", { src: data.logo_url, alt: "Preview", className: "w-10 h-10 object-contain rounded bg-white p-1" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-500", children: "Preview Logo" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "description", className: "text-xs font-semibold", children: "Deskripsi / Keterangan Toko" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "description",
                rows: 3,
                value: data.description,
                onChange: (e) => setData("description", e.target.value),
                placeholder: "Keterangan singkat partner atau official store..."
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800", children: [
          /* @__PURE__ */ jsx(Link, { href: route("admin.kios-partners.index"), children: /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", className: "text-xs font-bold", children: "Batal" }) }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "submit",
              disabled: processing,
              className: "bg-[#112A12] hover:bg-[#0c1e0d] text-white flex items-center gap-1.5 text-xs font-bold px-6",
              children: [
                /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: processing ? "Menyimpan..." : "Perbarui Toko Partner" })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: KiosPartnerEdit
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$8 = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Toko Partner Kios",
    href: "/admin/kios-partners"
  }
];
function KiosPartnersIndex({ partners, filters = {} }) {
  const [deletePartner, setDeletePartner] = useState(null);
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route("admin.kios-partners.index"), {
      search: searchTerm
    }, { preserveState: true });
  };
  const handleDelete = () => {
    if (!deletePartner) return;
    router.delete(route("admin.kios-partners.destroy", deletePartner.id), {
      preserveScroll: true,
      onSuccess: () => {
        setDeletePartner(null);
      }
    });
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$8, children: [
    /* @__PURE__ */ jsx(Head, { title: "Toko Partner Kios" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-5 p-4 sm:p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white", children: [
            /* @__PURE__ */ jsx(Store, { className: "w-6 h-6 text-emerald-600 dark:text-emerald-400" }),
            /* @__PURE__ */ jsx("span", { children: "Toko Partner Kios" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Kelola daftar toko partner/penjual resmi yang akan muncul pada dropdown pilihan di CRUD Kios." })
        ] }),
        /* @__PURE__ */ jsx(Link, { href: route("admin.kios-partners.create"), children: /* @__PURE__ */ jsxs(Button, { className: "bg-[#112A12] hover:bg-[#0c1e0d] text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold px-4 h-9 rounded-lg", children: [
          /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: "Tambah Toko Partner" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 flex items-center justify-between shadow-2xs", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex items-center gap-2 flex-1 max-w-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Cari nama partner...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "pl-9 h-9 text-xs"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", variant: "secondary", className: "h-9 px-3 text-xs font-bold", children: "Cari" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xs", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { className: "bg-neutral-50 dark:bg-neutral-850", children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { className: "w-16 text-center text-xs font-bold", children: "Logo" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold", children: "Nama Toko Partner" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold", children: "Slug Identifier" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold", children: "Deskripsi" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-center", children: "Jumlah Produk" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right text-xs font-bold w-24", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: partners.data.length > 0 ? partners.data.map((partner) => /* @__PURE__ */ jsxs(TableRow, { className: "hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40", children: [
          /* @__PURE__ */ jsx(TableCell, { className: "p-2 text-center", children: partner.logo_url ? /* @__PURE__ */ jsx(
            "img",
            {
              src: partner.logo_url,
              alt: partner.name,
              className: "w-10 h-10 object-contain rounded-lg mx-auto border border-neutral-200 dark:border-neutral-700 bg-white p-1"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg mx-auto flex items-center justify-center text-neutral-400", children: /* @__PURE__ */ jsx(Store, { className: "w-4 h-4" }) }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", { className: "font-bold text-xs text-neutral-900 dark:text-neutral-100", children: partner.name }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded", children: partner.slug }) }),
          /* @__PURE__ */ jsx(TableCell, { className: "max-w-[280px]", children: /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-600 dark:text-neutral-400 line-clamp-1", children: partner.description || "-" }) }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-200/50", children: [
            partner.kios_items_count || 0,
            " item"
          ] }) }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
            /* @__PURE__ */ jsx(Link, { href: route("admin.kios-partners.edit", partner.id), children: /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white",
                children: /* @__PURE__ */ jsx(Pencil, { className: "w-3.5 h-3.5" })
              }
            ) }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40",
                onClick: () => setDeletePartner(partner),
                children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] }) })
        ] }, partner.id)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 6, className: "h-32 text-center text-xs text-neutral-500", children: "Belum ada toko partner kios yang ditambahkan." }) }) })
      ] }) }),
      partners.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-neutral-500 pt-2", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "Halaman ",
          partners.current_page,
          " dari ",
          partners.last_page,
          " (",
          partners.total,
          " total partner)"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: partners.links.map((link, idx) => /* @__PURE__ */ jsx(
          Link,
          {
            href: link.url || "#",
            preserveScroll: true,
            className: `px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-colors ${link.active ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900" : !link.url ? "opacity-40 cursor-not-allowed border-neutral-200 dark:border-neutral-800" : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100"}`,
            dangerouslySetInnerHTML: { __html: link.label }
          },
          idx
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      AlertDialog,
      {
        open: !!deletePartner,
        onOpenChange: (open) => !open && setDeletePartner(null),
        children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Hapus Toko Partner?" }),
            /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
              "Apakah Anda yakin ingin menghapus toko partner",
              " ",
              /* @__PURE__ */ jsxs("span", { className: "font-semibold text-neutral-900 dark:text-white", children: [
                '"',
                deletePartner == null ? void 0 : deletePartner.name,
                '"'
              ] }),
              "? Tindakan ini tidak dapat dibatalkan."
            ] })
          ] }),
          /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Batal" }),
            /* @__PURE__ */ jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                className: "bg-red-600 hover:bg-red-700 text-white",
                children: "Hapus"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: KiosPartnersIndex
}, Symbol.toStringTag, { value: "Module" }));
const DANGEROUS_PROTOCOL = /^(javascript|data|vbscript):/i;
const castElement = (element) => element;
const resolveEmbedUrl = (raw) => {
  const input = raw.trim();
  if (!input || DANGEROUS_PROTOCOL.test(input)) return null;
  let url;
  try {
    url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(input) ? input : `https://${input}`);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  const path = url.pathname;
  if (host === "youtu.be") {
    const id = path.split("/").filter(Boolean)[0];
    return id ? { src: `https://www.youtube.com/embed/${id}`, provider: "youtube", title: "YouTube Video" } : null;
  }
  if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
    const list = url.searchParams.get("list");
    if (path === "/playlist" || path === "/embed/videoseries") {
      return list ? { src: `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(list)}`, provider: "youtube", title: "YouTube Playlist" } : null;
    }
    const videoId = url.searchParams.get("v");
    if (path === "/watch" && videoId) {
      return { src: `https://www.youtube.com/embed/${videoId}`, provider: "youtube", title: "YouTube Video" };
    }
    const short = path.match(/^\/shorts\/([\w-]+)/);
    if (short) {
      return { src: `https://www.youtube.com/embed/${short[1]}`, provider: "youtube", title: "YouTube Short" };
    }
    const live = path.match(/^\/live\/([\w-]+)/);
    if (live) {
      return { src: `https://www.youtube.com/embed/${live[1]}`, provider: "youtube", title: "YouTube Live" };
    }
    const embed = path.match(/^\/embed\/([\w-]+)/);
    if (embed) {
      return { src: `https://www.youtube.com/embed/${embed[1]}`, provider: "youtube", title: "YouTube Video" };
    }
    return null;
  }
  if (host === "instagram.com" || host === "instagr.am") {
    const match = path.match(/^\/(p|reel|reels|tv)\/([\w-]+)/);
    if (!match) return null;
    const type = match[1] === "reels" ? "reel" : match[1];
    const label = type === "p" ? "Post" : type === "tv" ? "IGTV" : "Reel";
    return {
      src: `https://www.instagram.com/${type}/${match[2]}/embed`,
      provider: "instagram",
      title: `Instagram ${label}`
    };
  }
  if (host === "twitter.com" || host === "x.com" || host === "mobile.twitter.com" || host === "mobile.x.com") {
    const match = path.match(/\/status(?:es)?\/(\d+)/);
    return match ? { src: `https://platform.twitter.com/embed/Tweet.html?id=${match[1]}&dnt=true`, provider: "twitter", title: "Postingan X" } : null;
  }
  if (host === "platform.twitter.com") {
    const id = url.searchParams.get("id");
    return id && /^\d+$/.test(id) ? { src: `https://platform.twitter.com/embed/Tweet.html?id=${id}&dnt=true`, provider: "twitter", title: "Postingan X" } : null;
  }
  return null;
};
const allowedProvider = (src) => {
  if (!src || DANGEROUS_PROTOCOL.test(src)) return null;
  let url;
  try {
    url = new URL(src);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    return url.pathname.startsWith("/embed/") ? "youtube" : null;
  }
  if (host === "instagram.com") {
    return /\/(p|reel|tv)\/[\w-]+\/embed\/?$/.test(url.pathname) ? "instagram" : null;
  }
  if (host === "platform.twitter.com") {
    return url.pathname.startsWith("/embed/") ? "twitter" : null;
  }
  return null;
};
const iframeAttributes = {
  frameborder: "0",
  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
  allowfullscreen: "true",
  referrerpolicy: "strict-origin-when-cross-origin"
};
const IFRAME_SRC_REGEX = /<iframe\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;
const decodeBasicEntities = (value) => value.replace(/&amp;/gi, "&").replace(/&#0*38;/g, "&").replace(/&quot;/gi, '"').replace(/&#0*34;/g, '"').replace(/&#0*39;/g, "'").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");
const extractEmbedDataFromText = (text) => {
  if (!text || !/<iframe/i.test(text)) return [];
  const embeds = [];
  for (const match of text.matchAll(IFRAME_SRC_REGEX)) {
    const embed = resolveEmbedUrl(decodeBasicEntities(match[1]));
    if (embed) embeds.push(embed);
  }
  if (embeds.length === 0) return [];
  const leftover = text.replace(IFRAME_SRC_REGEX, "").replace(/\s+/g, "");
  if (leftover.length > 0) return [];
  return embeds;
};
const extractEmbedDataFromClipboard = (data) => {
  if (!data) return [];
  const fromPlainText = extractEmbedDataFromText(data.getData("text/plain"));
  if (fromPlainText.length > 0) return fromPlainText;
  const html = data.getData("text/html");
  if (!html || !/&lt;iframe/i.test(html)) return [];
  const container = document.createElement("div");
  container.innerHTML = html;
  return extractEmbedDataFromText(container.textContent || "");
};
function EmbedView({ node, selected, deleteNode }) {
  const provider = node.attrs.provider || "youtube";
  const src = String(node.attrs.src || "");
  const isYoutube = provider === "youtube";
  const isInstagram = provider === "instagram";
  const providerLabel = isYoutube ? "YouTube Embed" : isInstagram ? "Instagram Embed" : "Twitter / X Embed";
  const title = String(node.attrs.title || providerLabel);
  const previewClass = isYoutube ? "aspect-video w-full" : isInstagram ? "mx-auto h-[620px] w-full max-w-[400px]" : "mx-auto h-[600px] w-full max-w-[550px]";
  return /* @__PURE__ */ jsx(NodeViewWrapper, { className: "my-3", "data-embed-view": provider, contentEditable: false, children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: `overflow-hidden rounded-xl border bg-white dark:bg-neutral-900 ${selected ? "border-emerald-500 ring-2 ring-emerald-500/40" : "border-neutral-200 dark:border-neutral-700"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex select-none items-center justify-between gap-2 border-b border-neutral-200 bg-neutral-50 px-2.5 py-1.5 dark:border-neutral-700 dark:bg-neutral-800", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-[11px] font-bold text-neutral-600 dark:text-neutral-300", children: [
            isYoutube ? /* @__PURE__ */ jsx(Youtube, { className: "h-3.5 w-3.5 text-red-600" }) : isInstagram ? /* @__PURE__ */ jsx(Instagram, { className: "h-3.5 w-3.5 text-pink-600" }) : /* @__PURE__ */ jsx(Twitter, { className: "h-3.5 w-3.5 text-sky-500" }),
            providerLabel
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: src,
                target: "_blank",
                rel: "noopener noreferrer",
                onClick: (event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  window.open(src, "_blank", "noopener,noreferrer");
                },
                className: "flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40",
                title: "Buka pratinjau di tab baru",
                children: [
                  /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3" }),
                  "Pratinjau"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => deleteNode == null ? void 0 : deleteNode(),
                className: "flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40",
                title: "Hapus embed",
                children: [
                  /* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" }),
                  "Hapus"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: previewClass, children: /* @__PURE__ */ jsx(
          "iframe",
          {
            src,
            title,
            className: "pointer-events-none h-full w-full",
            allow: iframeAttributes.allow,
            allowFullScreen: true,
            referrerPolicy: "strict-origin-when-cross-origin",
            frameBorder: 0
          }
        ) })
      ]
    }
  ) });
}
const Embed = Node.create({
  name: "embed",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,
  addAttributes() {
    return {
      src: {
        default: null
      },
      provider: {
        default: "youtube",
        parseHTML: (element) => {
          var _a;
          return ((_a = castElement(element)) == null ? void 0 : _a.getAttribute("data-embed-provider")) || "youtube";
        },
        renderHTML: (attributes) => ({ "data-embed-provider": attributes.provider })
      },
      title: {
        default: null
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "iframe[src]",
        getAttrs: (element) => {
          var _a, _b;
          const src = ((_a = castElement(element)) == null ? void 0 : _a.getAttribute("src")) || "";
          const provider = allowedProvider(src);
          if (!provider) return false;
          return {
            src,
            provider,
            title: ((_b = castElement(element)) == null ? void 0 : _b.getAttribute("title")) || null
          };
        }
      }
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    const provider = node.attrs.provider || "youtube";
    const style = provider === "instagram" ? "display:block;width:100%;max-width:400px;height:620px;margin:0 auto;border:0;border-radius:12px;background:#fff" : provider === "twitter" ? "display:block;width:100%;max-width:550px;height:600px;margin:0 auto;border:0;border-radius:12px;background:#fff" : "display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:12px;background:#000";
    return [
      "iframe",
      mergeAttributes(HTMLAttributes, {
        class: "norinoya-embed",
        style,
        ...iframeAttributes
      })
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(EmbedView);
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("embedPasteHandler"),
        props: {
          handlePaste: (_view, event) => {
            const embeds = extractEmbedDataFromClipboard(event.clipboardData);
            if (embeds.length === 0) return false;
            this.editor.chain().focus().insertContent(
              embeds.map((embed) => ({
                type: "embed",
                attrs: {
                  src: embed.src,
                  provider: embed.provider,
                  title: embed.title
                }
              }))
            ).run();
            return true;
          }
        }
      })
    ];
  }
});
const normalizeUrl = (raw) => {
  const url = raw.trim();
  if (!url) return "";
  if (/^(javascript|data|vbscript):/i.test(url)) return "";
  if (/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(url)) return url;
  if (/^[a-z][a-z0-9+.-]*:/i.test(url)) return url;
  return `https://${url}`;
};
function RichTextEditor({ value, onChange }) {
  const [openDialog, setOpenDialog] = React__default.useState(null);
  const [linkUrl, setLinkUrl] = React__default.useState("");
  const [embedUrl, setEmbedUrl] = React__default.useState("");
  const linkFormRef = React__default.useRef(null);
  const embedFormRef = React__default.useRef(null);
  const linkInputRef = React__default.useRef(null);
  const embedInputRef = React__default.useRef(null);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Ensure heading, bold, italic, bulletList, etc. are enabled without image plugins
        heading: {
          levels: [2, 3]
        },
        link: {
          openOnClick: false,
          autolink: true,
          linkOnPaste: true,
          defaultProtocol: "https",
          HTMLAttributes: {
            target: "_blank",
            rel: "noopener noreferrer"
          }
        }
      }),
      // Blok embed YouTube / Instagram (iframe) ke dalam isi berita
      Embed
    ],
    content: value || "",
    editorProps: {
      attributes: {
        // [&_p]:mb-4 memberi jarak bawah tiap paragraf
        // [&_p:empty]:min-h-[1.5rem] menjaga tinggi baris jika ada double-enter (baris kosong)
        // [&_a]:* membuat tautan terlihat jelas saat mode edit (typography plugin tidak terpasang)
        class: "min-h-[180px] [&_p:empty]:min-h-[1.5rem] p-3.5 focus:outline-none prose dark:prose-invert max-w-none text-sm leading-relaxed text-neutral-800 dark:text-neutral-200 focus:ring-0 [&_a]:cursor-pointer [&_a]:font-medium [&_a]:text-emerald-700 [&_a]:underline [&_a]:decoration-emerald-500/60 [&_a]:underline-offset-2 hover:[&_a]:text-emerald-800 dark:[&_a]:text-emerald-400 dark:[&_a]:decoration-emerald-400/50 dark:hover:[&_a]:text-emerald-300"
      }
    },
    onUpdate: ({ editor: editor2 }) => {
      onChange(editor2.getHTML());
    }
  });
  React__default.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      if (value === "" || editor.isEmpty && value !== "") {
        editor.commands.setContent(value || "", false);
      }
    }
  }, [value, editor]);
  React__default.useEffect(() => {
    if (!openDialog) return;
    const handleClickOutside = (event) => {
      var _a, _b;
      const target = event.target;
      if (((_a = linkFormRef.current) == null ? void 0 : _a.contains(target)) || ((_b = embedFormRef.current) == null ? void 0 : _b.contains(target))) return;
      setOpenDialog(null);
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenDialog(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openDialog]);
  if (!editor) {
    return null;
  }
  const isLinkFormOpen = openDialog === "link";
  const isEmbedFormOpen = openDialog === "embed";
  const getActiveLinkHref = () => editor.isActive("link") ? String(editor.getAttributes("link").href || "") : "";
  const activeLinkHref = getActiveLinkHref();
  const detectedEmbed = resolveEmbedUrl(embedUrl);
  const openLinkForm = () => {
    setLinkUrl(getActiveLinkHref());
    setOpenDialog("link");
    window.setTimeout(() => {
      var _a;
      return (_a = linkInputRef.current) == null ? void 0 : _a.focus();
    }, 0);
  };
  const closeLinkForm = () => {
    setOpenDialog(null);
    setLinkUrl("");
  };
  const handleApplyLink = () => {
    const href = normalizeUrl(linkUrl);
    if (!href) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      closeLinkForm();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    closeLinkForm();
  };
  const handleRemoveLink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    closeLinkForm();
  };
  const openEmbedForm = () => {
    setEmbedUrl("");
    setOpenDialog("embed");
    window.setTimeout(() => {
      var _a;
      return (_a = embedInputRef.current) == null ? void 0 : _a.focus();
    }, 0);
  };
  const closeEmbedForm = () => {
    setOpenDialog(null);
    setEmbedUrl("");
  };
  const handleInsertEmbed = () => {
    if (!detectedEmbed) return;
    editor.chain().focus().insertContent({
      type: "embed",
      attrs: {
        src: detectedEmbed.src,
        provider: detectedEmbed.provider,
        title: detectedEmbed.title
      }
    }).run();
    closeEmbedForm();
  };
  const handleContainerKeyDown = (event) => {
    var _a, _b;
    if (((_a = linkFormRef.current) == null ? void 0 : _a.contains(event.target)) || ((_b = embedFormRef.current) == null ? void 0 : _b.contains(event.target))) return;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (isLinkFormOpen) {
        closeLinkForm();
      } else {
        openLinkForm();
      }
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onKeyDown: handleContainerKeyDown,
      className: "border border-neutral-300 dark:border-neutral-700 rounded-xl shadow-xs bg-white dark:bg-neutral-900 focus-within:ring-2 focus-within:ring-emerald-500/50 dark:focus-within:ring-emerald-400/50",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 p-2 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 select-none flex-wrap rounded-t-xl", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => editor.chain().focus().toggleBold().run(),
              className: `px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${editor.isActive("bold") ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900" : "bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600"}`,
              title: "Bold (Tebal)",
              children: "B"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => editor.chain().focus().toggleItalic().run(),
              className: `px-2.5 py-1 text-xs italic font-serif rounded-lg transition-all ${editor.isActive("italic") ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900" : "bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600"}`,
              title: "Italic (Miring)",
              children: "I"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
              className: `px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${editor.isActive("heading", { level: 2 }) ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900" : "bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600"}`,
              title: "Heading 2 (Sub Judul)",
              children: "H2"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
              className: `px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${editor.isActive("heading", { level: 3 }) ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900" : "bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600"}`,
              title: "Heading 3",
              children: "H3"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => editor.chain().focus().toggleBulletList().run(),
              className: `px-2.5 py-1 text-xs rounded-lg transition-all ${editor.isActive("bulletList") ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900" : "bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600"}`,
              title: "Bullet List (Daftar Poin)",
              children: "• List"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => editor.chain().focus().toggleOrderedList().run(),
              className: `px-2.5 py-1 text-xs rounded-lg transition-all ${editor.isActive("orderedList") ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900" : "bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600"}`,
              title: "Numbered List (Daftar Angka)",
              children: "1. List"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => editor.chain().focus().toggleBlockquote().run(),
              className: `px-2.5 py-1 text-xs rounded-lg transition-all ${editor.isActive("blockquote") ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900" : "bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600"}`,
              title: "Kutipan",
              children: "” Kutipan"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "w-px h-5 mx-0.5 bg-neutral-200 dark:bg-neutral-700" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", ref: linkFormRef, children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => isLinkFormOpen ? closeLinkForm() : openLinkForm(),
                className: `flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg transition-all ${editor.isActive("link") || isLinkFormOpen ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900" : "bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600"}`,
                title: "Sisipkan / Edit Link (Ctrl+K)",
                children: [
                  /* @__PURE__ */ jsx(Link$1, { className: "w-3.5 h-3.5" }),
                  "Link"
                ]
              }
            ),
            isLinkFormOpen && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-3rem)] space-y-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 text-left shadow-xl sm:left-0 sm:right-auto", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-[11px] font-bold text-neutral-700 dark:text-neutral-200", children: [
                /* @__PURE__ */ jsx(Link$1, { className: "w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" }),
                /* @__PURE__ */ jsx("span", { children: activeLinkHref ? "Edit Link" : "Sisipkan Link" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: linkInputRef,
                  type: "text",
                  inputMode: "url",
                  spellCheck: false,
                  value: linkUrl,
                  onChange: (e) => setLinkUrl(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleApplyLink();
                    }
                  },
                  placeholder: "https://www.youtube.com/playlist?list=...",
                  className: "w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2.5 py-2 text-xs text-neutral-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-emerald-500/50"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleApplyLink,
                    className: "flex flex-1 items-center justify-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-700",
                    children: [
                      /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5" }),
                      "Terapkan"
                    ]
                  }
                ),
                (activeLinkHref || editor.isActive("link")) && /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleRemoveLink,
                    className: "flex items-center justify-center gap-1 rounded-lg border border-red-200 dark:border-red-900/60 px-2.5 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 transition-colors hover:bg-red-50 dark:hover:bg-red-950/40",
                    title: "Hapus link dari teks terpilih",
                    children: [
                      /* @__PURE__ */ jsx(Unlink, { className: "w-3.5 h-3.5" }),
                      "Hapus"
                    ]
                  }
                )
              ] }),
              activeLinkHref && /* @__PURE__ */ jsxs(
                "a",
                {
                  href: activeLinkHref,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 hover:underline dark:text-emerald-400",
                  children: [
                    /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3" }),
                    "Buka tautan saat ini"
                  ]
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] leading-relaxed text-neutral-400 dark:text-neutral-500", children: "Tip: tempel atau ketik URL langsung di teks akan otomatis menjadi link. Tekan Ctrl/Cmd + K untuk membuka dialog ini." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", ref: embedFormRef, children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => isEmbedFormOpen ? closeEmbedForm() : openEmbedForm(),
                className: `flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg transition-all ${isEmbedFormOpen ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900" : "bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600"}`,
                title: "Sisipkan Embed YouTube / Instagram / X",
                children: [
                  /* @__PURE__ */ jsx(Video, { className: "w-3.5 h-3.5" }),
                  "Embed"
                ]
              }
            ),
            isEmbedFormOpen && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-3rem)] space-y-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 text-left shadow-xl sm:left-0 sm:right-auto", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-[11px] font-bold text-neutral-700 dark:text-neutral-200", children: [
                /* @__PURE__ */ jsx(Video, { className: "w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" }),
                /* @__PURE__ */ jsx("span", { children: "Sisipkan Embed YouTube / Instagram / X" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 rounded-md bg-red-50 dark:bg-red-950/40 px-1.5 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400", children: [
                  /* @__PURE__ */ jsx(Youtube, { className: "h-3 w-3" }),
                  "YouTube"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 rounded-md bg-pink-50 dark:bg-pink-950/40 px-1.5 py-0.5 text-[10px] font-bold text-pink-600 dark:text-pink-400", children: [
                  /* @__PURE__ */ jsx(Instagram, { className: "h-3 w-3" }),
                  "Instagram"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 rounded-md bg-sky-50 dark:bg-sky-950/40 px-1.5 py-0.5 text-[10px] font-bold text-sky-600 dark:text-sky-400", children: [
                  /* @__PURE__ */ jsx(Twitter, { className: "h-3 w-3" }),
                  "X / Twitter"
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: embedInputRef,
                  type: "text",
                  inputMode: "url",
                  spellCheck: false,
                  value: embedUrl,
                  onChange: (e) => setEmbedUrl(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleInsertEmbed();
                    }
                  },
                  placeholder: "https://www.youtube.com/watch?v=... atau https://x.com/user/status/...",
                  className: "w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2.5 py-2 text-xs text-neutral-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-emerald-500/50"
                }
              ),
              embedUrl.trim() ? detectedEmbed ? /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400", children: [
                /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 shrink-0" }),
                "Terdeteksi: ",
                detectedEmbed.title
              ] }) : /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold text-red-600 dark:text-red-400", children: "URL tidak dikenali. Gunakan link YouTube, Instagram, atau X/Twitter." }) : /* @__PURE__ */ jsx("p", { className: "text-[11px] text-neutral-400 dark:text-neutral-500", children: "Video, Shorts, dan playlist YouTube, post/Reel/IGTV Instagram, serta postingan X/Twitter." }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleInsertEmbed,
                  disabled: !detectedEmbed,
                  className: `flex w-full items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors ${detectedEmbed ? "bg-emerald-600 text-white hover:bg-emerald-700" : "cursor-not-allowed bg-neutral-200 text-neutral-400 dark:bg-neutral-700 dark:text-neutral-500"}`,
                  children: [
                    /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5" }),
                    "Sisipkan Embed"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("p", { className: "text-[10px] leading-relaxed text-neutral-400 dark:text-neutral-500", children: [
                "Embed dirender sebagai iframe pada halaman berita. Anda juga bisa menempel kode ",
                "<iframe>",
                " YouTube/Instagram/X langsung ke isi berita — otomatis dikonversi menjadi embed."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-neutral-900 cursor-text rounded-b-xl", onClick: () => editor.commands.focus(), children: /* @__PURE__ */ jsx(EditorContent, { editor }) })
      ]
    }
  );
}
const CATEGORIES$1 = [
  { id: "rilisan", label: "Rilisan" },
  { id: "cetakan_ulang", label: "Cetak Ulang" },
  { id: "edukasi", label: "Review / Edukasi" },
  { id: "promo", label: "Promo" },
  { id: "manga", label: "Manga" },
  { id: "light_novel", label: "Light Novel" },
  { id: "novel", label: "Novel" },
  { id: "anime", label: "Anime" },
  { id: "event", label: "Event" },
  { id: "game", label: "Game" },
  { id: "jepang", label: "Jepang" },
  { id: "komunitas", label: "Komunitas" },
  { id: "breaking", label: "Breaking News" }
];
const DEFAULT_REACTIONS$1 = [
  { id: "fire", emoji: "🔥", label: "Hype!", count: 128 },
  { id: "heart", emoji: "😍", label: "Mau Banget", count: 94 },
  { id: "mind_blown", emoji: "🤯", label: "Baru Tahu", count: 65 },
  { id: "thumbs_up", emoji: "👍", label: "Sangat Setuju", count: 82 }
];
const breadcrumbs$7 = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Berita & Feeds", href: "/admin/news" },
  { title: "Tambah Berita", href: "/admin/news/create" }
];
function NewsCreate({ books = [], tiktokEmbeds = [] }) {
  const [bookSearchTerm, setBookSearchTerm] = useState("");
  const [isBookDropdownOpen, setIsBookDropdownOpen] = useState(false);
  const bookDropdownRef = React__default.useRef(null);
  React__default.useEffect(() => {
    const handleClickOutside = (event) => {
      if (bookDropdownRef.current && !bookDropdownRef.current.contains(event.target)) {
        setIsBookDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    content: "",
    category: "rilisan",
    username: "norinoya_official",
    display_name: "Norinoya Official",
    attached_image: "",
    gallery_images: ["", "", "", ""],
    // Maksimal 4 link gambar
    hash_tags: ["", "", ""],
    // Hashtags badge
    reading_rating: "",
    is_pinned: false,
    // Rekomendasi Buku & Review TikTok (Insert Katalog & Review Short)
    recommendations: [],
    // Katalog Relevan (Array book_id)
    relevant_books: [],
    // Polling opsional
    enable_poll: false,
    poll_question: "",
    poll_options: [
      { label: "", votes: 85 },
      { label: "", votes: 62 }
    ],
    // Reaction boost opsional
    reactions: DEFAULT_REACTIONS$1
  });
  const handleGalleryChange = (index, value) => {
    const updated = [...data.gallery_images];
    updated[index] = value;
    setData("gallery_images", updated);
  };
  const handleHashtagChange = (index, value) => {
    const updated = [...data.hash_tags];
    updated[index] = value;
    setData("hash_tags", updated);
  };
  const handleAddHashtag = () => {
    if (data.hash_tags.length < 6) {
      setData("hash_tags", [...data.hash_tags, ""]);
    }
  };
  const handleRemoveHashtag = (index) => {
    const updated = data.hash_tags.filter((_, i) => i !== index);
    setData("hash_tags", updated);
  };
  const handleAddRecommendation = () => {
    setData("recommendations", [
      ...data.recommendations,
      {
        number: data.recommendations.length + 1,
        title: "",
        description: "",
        book_id: "",
        tiktok_embed_id: ""
      }
    ]);
  };
  const handleRemoveRecommendation = (index) => {
    const updated = data.recommendations.filter((_, i) => i !== index);
    setData("recommendations", updated);
  };
  const handleRecommendationChange = (index, field, value) => {
    const updated = [...data.recommendations];
    const item = { ...updated[index], [field]: value };
    if (field === "book_id" && value) {
      const selectedBook = books.find((b) => String(b.id) === String(value));
      if (selectedBook && !item.title) {
        item.title = `${selectedBook.title} Vol ${selectedBook.volume}`;
      }
    }
    updated[index] = item;
    setData("recommendations", updated);
  };
  const handleAddPollOption = () => {
    setData("poll_options", [...data.poll_options, { label: "", votes: Math.floor(Math.random() * 50) + 20 }]);
  };
  const handleRemovePollOption = (index) => {
    const updated = data.poll_options.filter((_, i) => i !== index);
    setData("poll_options", updated);
  };
  const handlePollOptionChange = (index, field, value) => {
    const updated = [...data.poll_options];
    updated[index] = { ...updated[index], [field]: value };
    setData("poll_options", updated);
  };
  const handleReactionChange = (index, countValue) => {
    const updated = [...data.reactions];
    updated[index] = { ...updated[index], count: countValue };
    setData("reactions", updated);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("admin.news.store"));
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$7, children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah Berita Baru" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-6 p-4 max-w-4xl mx-auto w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("admin.news.index"), children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Tambah Berita Baru" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Publikasikan artikel, galeri gambar (maks. 4), hashtag, poling interaktif, atau ulasan terbaru." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6 bg-card border p-6 rounded-xl shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "title", children: "Judul Berita" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "title",
              value: data.title,
              onChange: (e) => setData("title", e.target.value),
              placeholder: "Contoh: Pengumuman Cetak Ulang Komik Frieren Vol 1 & 2",
              required: true
            }
          ),
          errors.title && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: errors.title })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "category", children: "Kategori Berita" }),
            /* @__PURE__ */ jsx(
              "select",
              {
                id: "category",
                value: data.category,
                onChange: (e) => setData("category", e.target.value),
                className: "w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background outline-none focus:ring-2 focus:ring-ring",
                children: CATEGORIES$1.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.id, children: cat.label }, cat.id))
              }
            ),
            errors.category && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: errors.category })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "reading_rating", children: "Rating Umur (Opsional)" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "reading_rating",
                value: data.reading_rating,
                onChange: (e) => setData("reading_rating", e.target.value),
                className: "w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background outline-none focus:ring-2 focus:ring-ring",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Tanpa Rating" }),
                  /* @__PURE__ */ jsx("option", { value: "Anak & Bimbingan Orang Tua", children: "Anak & Bimbingan Orang Tua" }),
                  /* @__PURE__ */ jsx("option", { value: "Remaja", children: "Remaja" }),
                  /* @__PURE__ */ jsx("option", { value: "Dewasa Ringan", children: "Dewasa Ringan" }),
                  /* @__PURE__ */ jsx("option", { value: "Dewasa Berat", children: "Dewasa Berat" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "username", children: "Username Penulis" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "username",
                value: data.username,
                onChange: (e) => setData("username", e.target.value),
                placeholder: "norinoya_official"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "display_name", children: "Nama Penulis" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "display_name",
                value: data.display_name,
                onChange: (e) => setData("display_name", e.target.value),
                placeholder: "Norinoya Official"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border p-4 rounded-xl space-y-3 bg-muted/20", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Image, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400" }),
              /* @__PURE__ */ jsx(Label, { className: "font-bold text-sm", children: "URL Gambar Berita / Galeri (Maksimal 4 Link Gambar)" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "Input URL Gambar" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: data.gallery_images.slice(0, 4).map((url, idx) => /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxs(Label, { className: "text-[11px] text-muted-foreground", children: [
              "Gambar ",
              idx + 1,
              " ",
              idx === 0 ? "(Gambar Utama)" : ""
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: url,
                onChange: (e) => handleGalleryChange(idx, e.target.value),
                placeholder: `https://domain.com/gambar-${idx + 1}.jpg`,
                className: "text-xs"
              }
            )
          ] }, idx)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border p-4 rounded-xl space-y-3 bg-muted/20", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Tag, { className: "w-4 h-4 text-rose-600 dark:text-rose-400" }),
              /* @__PURE__ */ jsx(Label, { className: "font-bold text-sm", children: "Hashtag Badges Berita (Ditampilkan di Gambar Detail)" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "Misal: #Frieren #ElexMedia" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            data.hash_tags.map((tag, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-mono font-bold text-muted-foreground", children: "#" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  value: tag,
                  onChange: (e) => handleHashtagChange(idx, e.target.value),
                  placeholder: "Frieren",
                  className: "w-32 text-xs"
                }
              ),
              data.hash_tags.length > 1 && /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8",
                  onClick: () => handleRemoveHashtag(idx),
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5 text-destructive" })
                }
              )
            ] }, idx)),
            data.hash_tags.length < 6 && /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: handleAddHashtag,
                className: "text-xs h-8",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3 mr-1" }),
                  "Tambah Hashtag"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "content", children: "Isi Berita" }),
          /* @__PURE__ */ jsx(
            RichTextEditor,
            {
              value: data.content,
              onChange: (content) => setData("content", content),
              placeholder: "Tuliskan isi berita atau pengumuman lengkap di sini..."
            }
          ),
          errors.content && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: errors.content })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 p-5 rounded-xl space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "p-1.5 rounded-lg bg-amber-500 text-white", children: /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-amber-950 dark:text-amber-200 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsx("span", { children: "Rekomendasi Buku & Review TikTok (Insert Katalog & Shorts)" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-200/70 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200", children: [
                    data.recommendations.length,
                    " Item"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Tambahkan daftar rekomendasi buku berseri, ulasan singkat, nomor urut, dan video TikTok review." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: handleAddRecommendation,
                className: "border-amber-300 dark:border-amber-700 text-xs hover:bg-amber-100 dark:hover:bg-amber-900/40",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5 mr-1 text-amber-600 dark:text-amber-400" }),
                  "Tambah Rekomendasi"
                ]
              }
            )
          ] }),
          data.recommendations.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-6 text-center border border-dashed border-amber-300/80 dark:border-amber-800/80 rounded-xl bg-white/50 dark:bg-neutral-900/50 space-y-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Belum ada rekomendasi buku yang ditambahkan untuk berita ini." }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                variant: "secondary",
                size: "sm",
                onClick: handleAddRecommendation,
                className: "text-xs font-semibold",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
                  "Mulai Tambah Rekomendasi"
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: data.recommendations.map((rec, idx) => {
            const availableTiktoks = rec.book_id ? tiktokEmbeds.filter((t) => String(t.book_id) === String(rec.book_id)) : tiktokEmbeds;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-card space-y-3 relative shadow-2xs",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-2 border-b", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-md bg-[#DA6B1C] text-white font-mono font-bold text-xs flex items-center justify-center", children: idx + 1 }),
                      /* @__PURE__ */ jsxs("span", { className: "font-bold text-xs", children: [
                        "Item Rekomendasi #",
                        idx + 1
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "icon",
                        className: "h-7 w-7 text-destructive hover:bg-destructive/10",
                        onClick: () => handleRemoveRecommendation(idx),
                        title: "Hapus Rekomendasi Ini",
                        children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-3", children: [
                    /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-1", children: [
                      /* @__PURE__ */ jsx(Label, { className: "text-[11px] font-mono", children: "Nomor Urut" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          type: "number",
                          value: rec.number,
                          onChange: (e) => handleRecommendationChange(idx, "number", e.target.value),
                          placeholder: "Misal: 1",
                          className: "text-xs"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "md:col-span-10 space-y-1", children: [
                      /* @__PURE__ */ jsx(Label, { className: "text-[11px]", children: "Judul Rekomendasi" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          value: rec.title,
                          onChange: (e) => handleRecommendationChange(idx, "title", e.target.value),
                          placeholder: "Contoh: Frieren: After the End (Vol 1)",
                          className: "text-xs"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx(Label, { className: "text-[11px]", children: "Deskripsi / Ulasan Mengapa Direkomendasikan" }),
                    /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        rows: 2,
                        value: rec.description,
                        onChange: (e) => handleRecommendationChange(idx, "description", e.target.value),
                        placeholder: "Jelaskan alasan mengapa buku ini wajib dibaca atau kualitas cetakannya...",
                        className: "text-xs"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 pt-1", children: [
                    /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxs(Label, { className: "text-[11px] flex items-center gap-1.5 font-semibold", children: [
                        /* @__PURE__ */ jsx(BookOpen, { className: "w-3.5 h-3.5 text-emerald-600" }),
                        /* @__PURE__ */ jsx("span", { children: "Hubungkan dengan Buku Katalog (Book)" })
                      ] }),
                      /* @__PURE__ */ jsxs(
                        "select",
                        {
                          value: rec.book_id || "",
                          onChange: (e) => handleRecommendationChange(idx, "book_id", e.target.value),
                          className: "w-full h-9 px-2.5 rounded-md border border-input bg-background text-xs ring-offset-background outline-none focus:ring-1 focus:ring-ring",
                          children: [
                            /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Buku Dari Katalog --" }),
                            books.map((b) => /* @__PURE__ */ jsxs("option", { value: b.id, children: [
                              b.title,
                              " Vol ",
                              b.volume,
                              " ",
                              b.publisher ? `(${b.publisher.name})` : "",
                              " ",
                              b.msrp ? `- Rp ${Number(b.msrp).toLocaleString("id-ID")}` : ""
                            ] }, b.id))
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxs(Label, { className: "text-[11px] flex items-center gap-1.5 font-semibold", children: [
                        /* @__PURE__ */ jsx(Video, { className: "w-3.5 h-3.5 text-rose-600" }),
                        /* @__PURE__ */ jsx("span", { children: "Pilih Video TikTok Review (BookTiktokEmbed)" })
                      ] }),
                      /* @__PURE__ */ jsxs(
                        "select",
                        {
                          value: rec.tiktok_embed_id || "",
                          onChange: (e) => handleRecommendationChange(idx, "tiktok_embed_id", e.target.value),
                          className: "w-full h-9 px-2.5 rounded-md border border-input bg-background text-xs ring-offset-background outline-none focus:ring-1 focus:ring-ring",
                          children: [
                            /* @__PURE__ */ jsx("option", { value: "", children: "-- Tanpa Video / Pilih Video TikTok --" }),
                            availableTiktoks.map((t) => {
                              const relatedBook = books.find((b) => b.id === t.book_id);
                              return /* @__PURE__ */ jsxs("option", { value: t.id, children: [
                                t.name,
                                " ",
                                relatedBook ? `[Buku: ${relatedBook.title} V${relatedBook.volume}]` : ""
                              ] }, t.id);
                            })
                          ]
                        }
                      )
                    ] })
                  ] })
                ]
              },
              idx
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-5 rounded-xl space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(ShoppingBag, { className: "w-5 h-5 text-emerald-700 dark:text-emerald-400" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm text-emerald-950 dark:text-emerald-200", children: "Katalog Relevan (Sidebar Detail Berita)" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 dark:text-neutral-400", children: 'Pilih beberapa buku dari database untuk ditampilkan pada widget "Katalog Relevan"' })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "px-2.5 py-1 text-xs font-mono font-bold rounded-full bg-emerald-600 text-white", children: [
              data.relevant_books.length,
              " Buku Terpilih"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs font-bold text-neutral-700 dark:text-neutral-300", children: "Cari dan Tambah Buku ke Katalog Relevan" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", ref: bookDropdownRef, children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 px-3 py-1.5 focus-within:ring-2 focus-within:ring-emerald-500", children: [
                /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 text-neutral-400 mr-2 shrink-0" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: bookSearchTerm,
                    onChange: (e) => {
                      setBookSearchTerm(e.target.value);
                      setIsBookDropdownOpen(true);
                    },
                    onFocus: () => setIsBookDropdownOpen(true),
                    placeholder: "Ketik judul buku, volume, atau penerbit...",
                    className: "w-full text-xs sm:text-sm bg-transparent border-none outline-none text-neutral-900 dark:text-white placeholder-neutral-400"
                  }
                ),
                bookSearchTerm && /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setBookSearchTerm(""),
                    className: "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1 mr-1",
                    children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setIsBookDropdownOpen((prev) => !prev),
                    className: "text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded text-neutral-700 dark:text-neutral-300 shrink-0 font-medium",
                    children: isBookDropdownOpen ? "Tutup" : "Pilih"
                  }
                )
              ] }),
              isBookDropdownOpen && /* @__PURE__ */ jsxs("div", { className: "absolute top-full left-0 right-0 mt-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800", children: [
                books.filter((b) => {
                  var _a;
                  const searchStr = `${b.title} ${b.volume} ${((_a = b.publisher) == null ? void 0 : _a.name) || ""}`.toLowerCase();
                  return searchStr.includes(bookSearchTerm.toLowerCase());
                }).map((book) => {
                  const isSelected = data.relevant_books.includes(book.id);
                  return /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        if (isSelected) {
                          setData("relevant_books", data.relevant_books.filter((id) => id !== book.id));
                        } else {
                          setData("relevant_books", [...data.relevant_books, book.id]);
                        }
                      },
                      className: `w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors ${isSelected ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold" : "hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"}`,
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0 pr-2", children: [
                          /* @__PURE__ */ jsx(BookOpen, { className: "w-3.5 h-3.5 text-emerald-600 shrink-0" }),
                          /* @__PURE__ */ jsxs("span", { className: "truncate", children: [
                            book.title,
                            " Vol ",
                            book.volume,
                            " ",
                            book.publisher ? `(${book.publisher.name})` : ""
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                          /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-mono text-neutral-400", children: [
                            "Rp ",
                            book.msrp ? Number(book.msrp).toLocaleString("id-ID") : "45.000"
                          ] }),
                          isSelected ? /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-emerald-600 shrink-0" }) : /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5 text-neutral-400 hover:text-neutral-700 shrink-0" })
                        ] })
                      ]
                    },
                    book.id
                  );
                }),
                /* @__PURE__ */ jsx("div", { className: "p-2 bg-neutral-50 dark:bg-neutral-850 text-center", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setIsBookDropdownOpen(false),
                    className: "text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300 hover:underline",
                    children: "Selesai / Tutup Pilihan"
                  }
                ) })
              ] })
            ] })
          ] }),
          data.relevant_books.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "space-y-2 pt-2", children: [
            /* @__PURE__ */ jsxs(Label, { className: "text-xs font-semibold text-neutral-600 dark:text-neutral-400", children: [
              "Daftar Buku Terpilih (",
              data.relevant_books.length,
              "):"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: data.relevant_books.map((bookId) => {
              const book = books.find((b) => b.id === bookId);
              if (!book) return null;
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center justify-between gap-2 p-2 bg-white dark:bg-neutral-900 border border-emerald-300 dark:border-emerald-800 rounded-lg shadow-2xs text-xs",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                      /* @__PURE__ */ jsxs("span", { className: "w-5 h-5 rounded bg-emerald-600 text-white font-mono text-[10px] flex items-center justify-center font-bold shrink-0", children: [
                        "V",
                        book.volume
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "truncate font-medium text-neutral-900 dark:text-neutral-100", children: book.title })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setData("relevant_books", data.relevant_books.filter((id) => id !== bookId)),
                        className: "text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 shrink-0",
                        title: "Hapus dari Katalog Relevan",
                        children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ]
                },
                bookId
              );
            }) })
          ] }) : /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-400 italic", children: "Belum ada buku yang dipilih. Jika dikosongkan, sistem akan otomatis memilih buku teratas dari katalog." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 p-5 rounded-xl space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-indigo-600 dark:text-indigo-400" }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm text-indigo-900 dark:text-indigo-200", children: "Fitur Opsional: Poling Komunitas" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  id: "enable_poll",
                  checked: data.enable_poll,
                  onChange: (e) => setData("enable_poll", e.target.checked),
                  className: "w-4 h-4 rounded text-indigo-600 cursor-pointer"
                }
              ),
              /* @__PURE__ */ jsx(Label, { htmlFor: "enable_poll", className: "cursor-pointer text-xs font-bold", children: "Aktifkan Poling" })
            ] })
          ] }),
          data.enable_poll && /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "poll_question", className: "text-xs", children: "Pertanyaan Poling" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "poll_question",
                  value: data.poll_question,
                  onChange: (e) => setData("poll_question", e.target.value),
                  placeholder: "Contoh: Apakah Anda akan membeli edisi komik ini?",
                  required: data.enable_poll
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Pilihan Jawaban & Suara Awal (Auto Boost)" }),
              data.poll_options.map((opt, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    value: opt.label,
                    onChange: (e) => handlePollOptionChange(idx, "label", e.target.value),
                    placeholder: `Pilihan ${idx + 1}`,
                    className: "flex-1",
                    required: data.enable_poll
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "w-28 flex items-center gap-1", children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "number",
                    value: opt.votes,
                    onChange: (e) => handlePollOptionChange(idx, "votes", parseInt(e.target.value) || 0),
                    placeholder: "Suara",
                    title: "Jumlah Suara Awal"
                  }
                ) }),
                data.poll_options.length > 2 && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    onClick: () => handleRemovePollOption(idx),
                    children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 text-destructive" })
                  }
                )
              ] }, idx)),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: handleAddPollOption,
                  className: "text-xs",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
                    "Tambah Opsi Jawaban"
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border border-orange-200 dark:border-orange-900/60 bg-orange-50/50 dark:bg-orange-950/20 p-5 rounded-xl space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Flame, { className: "w-5 h-5 text-orange-600 dark:text-orange-400" }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm text-orange-900 dark:text-orange-200", children: "Angka Reaksi Awal (Ramai / High-Engagement Boost)" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Atur jumlah reaksi emoji awal agar postingan tidak terlihat sepi saat pertama kali tayang." }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: data.reactions.map((react, idx) => /* @__PURE__ */ jsxs("div", { className: "bg-card border p-3 rounded-lg space-y-1.5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs font-bold", children: [
              /* @__PURE__ */ jsx("span", { children: react.emoji }),
              /* @__PURE__ */ jsx("span", { children: react.label })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "number",
                value: react.count,
                onChange: (e) => handleReactionChange(idx, parseInt(e.target.value) || 0),
                className: "text-xs h-8"
              }
            )
          ] }, react.id)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pt-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "is_pinned",
              checked: data.is_pinned,
              onChange: (e) => setData("is_pinned", e.target.checked),
              className: "w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
            }
          ),
          /* @__PURE__ */ jsx(Label, { htmlFor: "is_pinned", className: "cursor-pointer font-bold", children: "Sematkan di Berita Utama / Pinned Announcement" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-4 border-t", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("admin.news.index"), children: "Batal" }) }),
          /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: processing, children: [
            /* @__PURE__ */ jsx(Save, { className: "mr-2 h-4 w-4" }),
            "Publikasikan Berita"
          ] })
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NewsCreate
}, Symbol.toStringTag, { value: "Module" }));
const CATEGORIES = [
  { id: "rilisan", label: "Rilisan" },
  { id: "cetakan_ulang", label: "Cetak Ulang" },
  { id: "edukasi", label: "Review / Edukasi" },
  { id: "promo", label: "Promo" },
  { id: "manga", label: "Manga" },
  { id: "light_novel", label: "Light Novel" },
  { id: "novel", label: "Novel" },
  { id: "anime", label: "Anime" },
  { id: "event", label: "Event" },
  { id: "game", label: "Game" },
  { id: "jepang", label: "Jepang" },
  { id: "komunitas", label: "Komunitas" },
  { id: "breaking", label: "Breaking News" }
];
const DEFAULT_REACTIONS = [
  { id: "fire", emoji: "🔥", label: "Hype!", count: 128 },
  { id: "heart", emoji: "😍", label: "Mau Banget", count: 94 },
  { id: "mind_blown", emoji: "🤯", label: "Baru Tahu", count: 65 },
  { id: "thumbs_up", emoji: "👍", label: "Sangat Setuju", count: 82 }
];
function NewsEdit({ newsItem, books = [], tiktokEmbeds = [] }) {
  const [bookSearchTerm, setBookSearchTerm] = useState("");
  const [isBookDropdownOpen, setIsBookDropdownOpen] = useState(false);
  const bookDropdownRef = React__default.useRef(null);
  React__default.useEffect(() => {
    const handleClickOutside = (event) => {
      if (bookDropdownRef.current && !bookDropdownRef.current.contains(event.target)) {
        setIsBookDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const breadcrumbs2 = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Berita & Feeds", href: "/admin/news" },
    { title: "Edit Berita", href: `/admin/news/${newsItem.id}/edit` }
  ];
  const initialGallery = newsItem.gallery_images && newsItem.gallery_images.length > 0 ? [...newsItem.gallery_images, "", "", "", ""].slice(0, 4) : [newsItem.attached_image || "", "", "", ""];
  const initialHashtags = newsItem.hash_tags && newsItem.hash_tags.length > 0 ? newsItem.hash_tags : ["", ""];
  const initialPollOptions = newsItem.poll_options && newsItem.poll_options.length > 0 ? newsItem.poll_options : [{ label: "", votes: 85 }, { label: "", votes: 62 }];
  const initialReactions = newsItem.reactions && newsItem.reactions.length > 0 ? newsItem.reactions : DEFAULT_REACTIONS;
  const initialRecommendations = newsItem.recommendations && newsItem.recommendations.length > 0 ? newsItem.recommendations.map((r) => ({
    number: r.number || 1,
    title: r.title || "",
    description: r.description || "",
    book_id: r.book_id || "",
    tiktok_embed_id: r.tiktok_embed_id || ""
  })) : [];
  const initialRelevantBooks = newsItem.relevant_books && Array.isArray(newsItem.relevant_books) ? newsItem.relevant_books.map((id) => Number(id)) : [];
  const { data, setData, put, processing, errors } = useForm({
    title: newsItem.title || "",
    content: newsItem.content || "",
    category: newsItem.category || "rilisan",
    username: newsItem.username || "norinoya_official",
    display_name: newsItem.display_name || "Norinoya Official",
    attached_image: newsItem.attached_image || "",
    gallery_images: initialGallery,
    hash_tags: initialHashtags,
    reading_rating: newsItem.reading_rating || "",
    is_pinned: !!newsItem.is_pinned,
    recommendations: initialRecommendations,
    // Katalog Relevan (Array book_id)
    relevant_books: initialRelevantBooks,
    enable_poll: !!newsItem.poll_question,
    poll_question: newsItem.poll_question || "",
    poll_options: initialPollOptions,
    reactions: initialReactions
  });
  const handleGalleryChange = (index, value) => {
    const updated = [...data.gallery_images];
    updated[index] = value;
    setData("gallery_images", updated);
  };
  const handleHashtagChange = (index, value) => {
    const updated = [...data.hash_tags];
    updated[index] = value;
    setData("hash_tags", updated);
  };
  const handleAddHashtag = () => {
    if (data.hash_tags.length < 6) {
      setData("hash_tags", [...data.hash_tags, ""]);
    }
  };
  const handleRemoveHashtag = (index) => {
    const updated = data.hash_tags.filter((_, i) => i !== index);
    setData("hash_tags", updated);
  };
  const handleAddRecommendation = () => {
    const nextNum = data.recommendations.length + 1;
    setData("recommendations", [
      ...data.recommendations,
      {
        number: nextNum,
        title: "",
        description: "",
        book_id: "",
        tiktok_embed_id: ""
      }
    ]);
  };
  const handleRemoveRecommendation = (index) => {
    const updated = data.recommendations.filter((_, i) => i !== index);
    setData("recommendations", updated);
  };
  const handleRecommendationChange = (index, field, value) => {
    const updated = [...data.recommendations];
    const item = { ...updated[index], [field]: value };
    if (field === "book_id" && value) {
      const selectedBook = books.find((b) => String(b.id) === String(value));
      if (selectedBook && !item.title) {
        item.title = `${selectedBook.title} Vol ${selectedBook.volume}`;
      }
    }
    updated[index] = item;
    setData("recommendations", updated);
  };
  const handleAddPollOption = () => {
    setData("poll_options", [...data.poll_options, { id: "", label: "", votes: Math.floor(Math.random() * 50) + 20 }]);
  };
  const handleRemovePollOption = (index) => {
    const updated = data.poll_options.filter((_, i) => i !== index);
    setData("poll_options", updated);
  };
  const handlePollOptionChange = (index, field, value) => {
    const updated = [...data.poll_options];
    updated[index] = { ...updated[index], [field]: value };
    setData("poll_options", updated);
  };
  const handleReactionChange = (index, countValue) => {
    const updated = [...data.reactions];
    updated[index] = { ...updated[index], count: countValue };
    setData("reactions", updated);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("admin.news.update", newsItem.id));
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs2, children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit Berita: ${newsItem.title}` }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-6 p-4 max-w-4xl mx-auto w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("admin.news.index"), children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Edit Berita & Poling" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Perbarui berita, galeri gambar (maks 4), hashtag badge, poling, atau jumlah reaksi." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6 bg-card border p-6 rounded-xl shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "title", children: "Judul Berita" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "title",
              value: data.title,
              onChange: (e) => setData("title", e.target.value),
              required: true
            }
          ),
          errors.title && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: errors.title })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "category", children: "Kategori Berita" }),
            /* @__PURE__ */ jsx(
              "select",
              {
                id: "category",
                value: data.category,
                onChange: (e) => setData("category", e.target.value),
                className: "w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background outline-none focus:ring-2 focus:ring-ring",
                children: CATEGORIES.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.id, children: cat.label }, cat.id))
              }
            ),
            errors.category && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: errors.category })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "reading_rating", children: "Rating Umur (Opsional)" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "reading_rating",
                value: data.reading_rating,
                onChange: (e) => setData("reading_rating", e.target.value),
                className: "w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background outline-none focus:ring-2 focus:ring-ring",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Tanpa Rating" }),
                  /* @__PURE__ */ jsx("option", { value: "Anak & Bimbingan Orang Tua", children: "Anak & Bimbingan Orang Tua" }),
                  /* @__PURE__ */ jsx("option", { value: "Remaja", children: "Remaja" }),
                  /* @__PURE__ */ jsx("option", { value: "Dewasa Ringan", children: "Dewasa Ringan" }),
                  /* @__PURE__ */ jsx("option", { value: "Dewasa Berat", children: "Dewasa Berat" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "username", children: "Username Penulis" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "username",
                value: data.username,
                onChange: (e) => setData("username", e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "display_name", children: "Nama Penulis" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "display_name",
                value: data.display_name,
                onChange: (e) => setData("display_name", e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border p-4 rounded-xl space-y-3 bg-muted/20", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Image, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400" }),
              /* @__PURE__ */ jsx(Label, { className: "font-bold text-sm", children: "URL Gambar Berita / Galeri (Maksimal 4 Link Gambar)" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "Input URL Gambar" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: data.gallery_images.slice(0, 4).map((url, idx) => /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxs(Label, { className: "text-[11px] text-muted-foreground", children: [
              "Gambar ",
              idx + 1,
              " ",
              idx === 0 ? "(Gambar Utama)" : ""
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: url,
                onChange: (e) => handleGalleryChange(idx, e.target.value),
                placeholder: `https://domain.com/gambar-${idx + 1}.jpg`,
                className: "text-xs"
              }
            )
          ] }, idx)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border p-4 rounded-xl space-y-3 bg-muted/20", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Tag, { className: "w-4 h-4 text-rose-600 dark:text-rose-400" }),
              /* @__PURE__ */ jsx(Label, { className: "font-bold text-sm", children: "Hashtag Badges Berita (Ditampilkan di Gambar Detail)" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "Misal: #Frieren #ElexMedia" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            data.hash_tags.map((tag, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-mono font-bold text-muted-foreground", children: "#" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  value: tag,
                  onChange: (e) => handleHashtagChange(idx, e.target.value),
                  placeholder: "Frieren",
                  className: "w-32 text-xs"
                }
              ),
              data.hash_tags.length > 1 && /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8",
                  onClick: () => handleRemoveHashtag(idx),
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5 text-destructive" })
                }
              )
            ] }, idx)),
            data.hash_tags.length < 6 && /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: handleAddHashtag,
                className: "text-xs h-8",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3 mr-1" }),
                  "Tambah Hashtag"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "content", children: "Isi Berita" }),
          /* @__PURE__ */ jsx(
            RichTextEditor,
            {
              value: data.content,
              onChange: (content) => setData("content", content),
              placeholder: "Tuliskan isi berita atau pengumuman lengkap di sini..."
            }
          ),
          errors.content && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: errors.content })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 p-5 rounded-xl space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "p-1.5 rounded-lg bg-amber-500 text-white", children: /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-amber-950 dark:text-amber-200 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsx("span", { children: "Rekomendasi Buku & Review TikTok (Insert Katalog & Shorts)" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-200/70 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200", children: [
                    data.recommendations.length,
                    " Item"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Tambahkan daftar rekomendasi buku berseri, ulasan singkat, nomor urut, dan video TikTok review." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: handleAddRecommendation,
                className: "border-amber-300 dark:border-amber-700 text-xs hover:bg-amber-100 dark:hover:bg-amber-900/40",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5 mr-1 text-amber-600 dark:text-amber-400" }),
                  "Tambah Rekomendasi"
                ]
              }
            )
          ] }),
          data.recommendations.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-6 text-center border border-dashed border-amber-300/80 dark:border-amber-800/80 rounded-xl bg-white/50 dark:bg-neutral-900/50 space-y-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Belum ada rekomendasi buku yang ditambahkan untuk berita ini." }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                variant: "secondary",
                size: "sm",
                onClick: handleAddRecommendation,
                className: "text-xs font-semibold",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
                  "Mulai Tambah Rekomendasi"
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: data.recommendations.map((rec, idx) => {
            const availableTiktoks = rec.book_id ? tiktokEmbeds.filter((t) => String(t.book_id) === String(rec.book_id)) : tiktokEmbeds;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-card space-y-3 relative shadow-2xs",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-2 border-b", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-md bg-[#DA6B1C] text-white font-mono font-bold text-xs flex items-center justify-center", children: idx + 1 }),
                      /* @__PURE__ */ jsxs("span", { className: "font-bold text-xs", children: [
                        "Item Rekomendasi #",
                        idx + 1
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "icon",
                        className: "h-7 w-7 text-destructive hover:bg-destructive/10",
                        onClick: () => handleRemoveRecommendation(idx),
                        title: "Hapus Rekomendasi Ini",
                        children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-3", children: [
                    /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-1", children: [
                      /* @__PURE__ */ jsx(Label, { className: "text-[11px] font-mono", children: "Nomor Urut" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          type: "number",
                          value: rec.number,
                          onChange: (e) => handleRecommendationChange(idx, "number", e.target.value),
                          placeholder: "Misal: 1",
                          className: "text-xs"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "md:col-span-10 space-y-1", children: [
                      /* @__PURE__ */ jsx(Label, { className: "text-[11px]", children: "Judul Rekomendasi" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          value: rec.title,
                          onChange: (e) => handleRecommendationChange(idx, "title", e.target.value),
                          placeholder: "Contoh: Frieren: After the End (Vol 1)",
                          className: "text-xs"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx(Label, { className: "text-[11px]", children: "Deskripsi / Ulasan Mengapa Direkomendasikan" }),
                    /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        rows: 2,
                        value: rec.description,
                        onChange: (e) => handleRecommendationChange(idx, "description", e.target.value),
                        placeholder: "Jelaskan alasan mengapa buku ini wajib dibaca atau kualitas cetakannya...",
                        className: "text-xs"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 pt-1", children: [
                    /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxs(Label, { className: "text-[11px] flex items-center gap-1.5 font-semibold", children: [
                        /* @__PURE__ */ jsx(BookOpen, { className: "w-3.5 h-3.5 text-emerald-600" }),
                        /* @__PURE__ */ jsx("span", { children: "Hubungkan dengan Buku Katalog (Book)" })
                      ] }),
                      /* @__PURE__ */ jsxs(
                        "select",
                        {
                          value: rec.book_id || "",
                          onChange: (e) => handleRecommendationChange(idx, "book_id", e.target.value),
                          className: "w-full h-9 px-2.5 rounded-md border border-input bg-background text-xs ring-offset-background outline-none focus:ring-1 focus:ring-ring",
                          children: [
                            /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Buku Dari Katalog --" }),
                            books.map((b) => /* @__PURE__ */ jsxs("option", { value: b.id, children: [
                              b.title,
                              " Vol ",
                              b.volume,
                              " ",
                              b.publisher ? `(${b.publisher.name})` : "",
                              " ",
                              b.msrp ? `- Rp ${Number(b.msrp).toLocaleString("id-ID")}` : ""
                            ] }, b.id))
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxs(Label, { className: "text-[11px] flex items-center gap-1.5 font-semibold", children: [
                        /* @__PURE__ */ jsx(Video, { className: "w-3.5 h-3.5 text-rose-600" }),
                        /* @__PURE__ */ jsx("span", { children: "Pilih Video TikTok Review (BookTiktokEmbed)" })
                      ] }),
                      /* @__PURE__ */ jsxs(
                        "select",
                        {
                          value: rec.tiktok_embed_id || "",
                          onChange: (e) => handleRecommendationChange(idx, "tiktok_embed_id", e.target.value),
                          className: "w-full h-9 px-2.5 rounded-md border border-input bg-background text-xs ring-offset-background outline-none focus:ring-1 focus:ring-ring",
                          children: [
                            /* @__PURE__ */ jsx("option", { value: "", children: "-- Tanpa Video / Pilih Video TikTok --" }),
                            availableTiktoks.map((t) => {
                              const relatedBook = books.find((b) => b.id === t.book_id);
                              return /* @__PURE__ */ jsxs("option", { value: t.id, children: [
                                t.name,
                                " ",
                                relatedBook ? `[Buku: ${relatedBook.title} V${relatedBook.volume}]` : ""
                              ] }, t.id);
                            })
                          ]
                        }
                      )
                    ] })
                  ] })
                ]
              },
              idx
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-5 rounded-xl space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(ShoppingBag, { className: "w-5 h-5 text-emerald-700 dark:text-emerald-400" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm text-emerald-955 dark:text-emerald-200", children: "Katalog Relevan (Sidebar Detail Berita)" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 dark:text-neutral-400", children: 'Pilih beberapa buku dari database untuk ditampilkan pada widget "Katalog Relevan"' })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "px-2.5 py-1 text-xs font-mono font-bold rounded-full bg-emerald-600 text-white", children: [
              data.relevant_books.length,
              " Buku Terpilih"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs font-bold text-neutral-700 dark:text-neutral-300", children: "Cari dan Tambah Buku ke Katalog Relevan" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", ref: bookDropdownRef, children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 px-3 py-1.5 focus-within:ring-2 focus-within:ring-emerald-500", children: [
                /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 text-neutral-400 mr-2 shrink-0" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: bookSearchTerm,
                    onChange: (e) => {
                      setBookSearchTerm(e.target.value);
                      setIsBookDropdownOpen(true);
                    },
                    onFocus: () => setIsBookDropdownOpen(true),
                    placeholder: "Ketik judul buku, volume, atau penerbit...",
                    className: "w-full text-xs sm:text-sm bg-transparent border-none outline-none text-neutral-900 dark:text-white placeholder-neutral-400"
                  }
                ),
                bookSearchTerm && /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setBookSearchTerm(""),
                    className: "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1 mr-1",
                    children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setIsBookDropdownOpen((prev) => !prev),
                    className: "text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded text-neutral-700 dark:text-neutral-300 shrink-0 font-medium",
                    children: isBookDropdownOpen ? "Tutup" : "Pilih"
                  }
                )
              ] }),
              isBookDropdownOpen && /* @__PURE__ */ jsxs("div", { className: "absolute top-full left-0 right-0 mt-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800", children: [
                books.filter((b) => {
                  var _a;
                  const searchStr = `${b.title} ${b.volume} ${((_a = b.publisher) == null ? void 0 : _a.name) || ""}`.toLowerCase();
                  return searchStr.includes(bookSearchTerm.toLowerCase());
                }).map((book) => {
                  const isSelected = data.relevant_books.includes(book.id);
                  return /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        if (isSelected) {
                          setData("relevant_books", data.relevant_books.filter((id) => id !== book.id));
                        } else {
                          setData("relevant_books", [...data.relevant_books, book.id]);
                        }
                      },
                      className: `w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors ${isSelected ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold" : "hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"}`,
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0 pr-2", children: [
                          /* @__PURE__ */ jsx(BookOpen, { className: "w-3.5 h-3.5 text-emerald-600 shrink-0" }),
                          /* @__PURE__ */ jsxs("span", { className: "truncate", children: [
                            book.title,
                            " Vol ",
                            book.volume,
                            " ",
                            book.publisher ? `(${book.publisher.name})` : ""
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                          /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-mono text-neutral-400", children: [
                            "Rp ",
                            book.msrp ? Number(book.msrp).toLocaleString("id-ID") : "45.000"
                          ] }),
                          isSelected ? /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-emerald-600 shrink-0" }) : /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5 text-neutral-400 hover:text-neutral-700 shrink-0" })
                        ] })
                      ]
                    },
                    book.id
                  );
                }),
                /* @__PURE__ */ jsx("div", { className: "p-2 bg-neutral-50 dark:bg-neutral-850 text-center", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setIsBookDropdownOpen(false),
                    className: "text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300 hover:underline",
                    children: "Selesai / Tutup Pilihan"
                  }
                ) })
              ] })
            ] })
          ] }),
          data.relevant_books.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "space-y-2 pt-2", children: [
            /* @__PURE__ */ jsxs(Label, { className: "text-xs font-semibold text-neutral-600 dark:text-neutral-400", children: [
              "Daftar Buku Terpilih (",
              data.relevant_books.length,
              "):"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: data.relevant_books.map((bookId) => {
              const book = books.find((b) => b.id === bookId);
              if (!book) return null;
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center justify-between gap-2 p-2 bg-white dark:bg-neutral-900 border border-emerald-300 dark:border-emerald-800 rounded-lg shadow-2xs text-xs",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                      /* @__PURE__ */ jsxs("span", { className: "w-5 h-5 rounded bg-emerald-600 text-white font-mono text-[10px] flex items-center justify-center font-bold shrink-0", children: [
                        "V",
                        book.volume
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "truncate font-medium text-neutral-900 dark:text-neutral-100", children: book.title })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setData("relevant_books", data.relevant_books.filter((id) => id !== bookId)),
                        className: "text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 shrink-0",
                        title: "Hapus dari Katalog Relevan",
                        children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ]
                },
                bookId
              );
            }) })
          ] }) : /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-400 italic", children: "Belum ada buku yang dipilih. Jika dikosongkan, sistem akan otomatis memilih buku teratas dari katalog." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 p-5 rounded-xl space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-indigo-600 dark:text-indigo-400" }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm text-indigo-900 dark:text-indigo-200", children: "Fitur Opsional: Poling Komunitas" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  id: "enable_poll",
                  checked: data.enable_poll,
                  onChange: (e) => setData("enable_poll", e.target.checked),
                  className: "w-4 h-4 rounded text-indigo-600 cursor-pointer"
                }
              ),
              /* @__PURE__ */ jsx(Label, { htmlFor: "enable_poll", className: "cursor-pointer text-xs font-bold", children: "Aktifkan Poling" })
            ] })
          ] }),
          data.enable_poll && /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "poll_question", className: "text-xs", children: "Pertanyaan Poling" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "poll_question",
                  value: data.poll_question,
                  onChange: (e) => setData("poll_question", e.target.value),
                  placeholder: "Contoh: Apakah Anda akan membeli edisi komik ini?",
                  required: data.enable_poll
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Pilihan Jawaban & Suara saat Ini" }),
              data.poll_options.map((opt, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    value: opt.label,
                    onChange: (e) => handlePollOptionChange(idx, "label", e.target.value),
                    placeholder: `Pilihan ${idx + 1}`,
                    className: "flex-1",
                    required: data.enable_poll
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "w-28 flex items-center gap-1", children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "number",
                    value: opt.votes,
                    onChange: (e) => handlePollOptionChange(idx, "votes", parseInt(e.target.value) || 0),
                    placeholder: "Suara"
                  }
                ) }),
                data.poll_options.length > 2 && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    onClick: () => handleRemovePollOption(idx),
                    children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 text-destructive" })
                  }
                )
              ] }, idx)),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: handleAddPollOption,
                  className: "text-xs",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
                    "Tambah Opsi Jawaban"
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border border-orange-200 dark:border-orange-900/60 bg-orange-50/50 dark:bg-orange-950/20 p-5 rounded-xl space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Flame, { className: "w-5 h-5 text-orange-600 dark:text-orange-400" }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm text-orange-900 dark:text-orange-200", children: "Angka Reaksi (Boost / Social Proof)" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: data.reactions.map((react, idx) => /* @__PURE__ */ jsxs("div", { className: "bg-card border p-3 rounded-lg space-y-1.5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs font-bold", children: [
              /* @__PURE__ */ jsx("span", { children: react.emoji }),
              /* @__PURE__ */ jsx("span", { children: react.label })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "number",
                value: react.count,
                onChange: (e) => handleReactionChange(idx, parseInt(e.target.value) || 0),
                className: "text-xs h-8"
              }
            )
          ] }, react.id || idx)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pt-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "is_pinned",
              checked: data.is_pinned,
              onChange: (e) => setData("is_pinned", e.target.checked),
              className: "w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
            }
          ),
          /* @__PURE__ */ jsx(Label, { htmlFor: "is_pinned", className: "cursor-pointer font-bold", children: "Sematkan di Berita Utama / Pinned Announcement" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-4 border-t", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("admin.news.index"), children: "Batal" }) }),
          /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: processing, children: [
            /* @__PURE__ */ jsx(Save, { className: "mr-2 h-4 w-4" }),
            "Simpan Perubahan"
          ] })
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NewsEdit
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$6 = [
  {
    title: "Dashboard",
    href: "/admin/dashboard"
  },
  {
    title: "Berita & Feeds",
    href: "/admin/news"
  }
];
function NewsIndex({ news, filters: rawFilters }) {
  const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
  const [deleteNewsItem, setDeleteNewsItem] = useState(null);
  const [search, setSearch] = useState(filters.search || "");
  const [category, setCategory] = useState(filters.category || "all");
  const [sort, setSort] = useState(filters.sort || "latest");
  const handleApplyFilters = (newParams) => {
    const payload = {
      search: (newParams == null ? void 0 : newParams.search) !== void 0 ? newParams.search : search,
      category: (newParams == null ? void 0 : newParams.category) !== void 0 ? newParams.category : category,
      sort: (newParams == null ? void 0 : newParams.sort) !== void 0 ? newParams.sort : sort
    };
    if (!payload.search) delete payload.search;
    if (!payload.category || payload.category === "all") delete payload.category;
    router.get(route("admin.news.index"), payload, {
      preserveState: true,
      preserveScroll: true
    });
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleApplyFilters();
  };
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    handleApplyFilters({ category: newCategory });
  };
  const handleSortChange = (newSort) => {
    setSort(newSort);
    handleApplyFilters({ sort: newSort });
  };
  const handleDelete = () => {
    if (!deleteNewsItem) return;
    const newsTitle = deleteNewsItem.title;
    router.delete(route("admin.news.destroy", deleteNewsItem.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(`Berita "${newsTitle}" sudah terhapus`);
        setDeleteNewsItem(null);
      },
      onError: () => {
        toast.error("Gagal menghapus berita");
      },
      onFinish: () => {
        setDeleteNewsItem(null);
      }
    });
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$6, children: [
    /* @__PURE__ */ jsx(Head, { title: "Berita & Feeds" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-5 p-4 sm:p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white", children: [
            /* @__PURE__ */ jsx(Newspaper, { className: "w-6 h-6 text-[#112A12] dark:text-emerald-400" }),
            /* @__PURE__ */ jsx("span", { children: "Berita & Feeds" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Kelola publikasi berita, pengumuman, dan artikel komunitas Norinoya." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Link, { href: route("admin.news.search-logs"), children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800", children: [
            /* @__PURE__ */ jsx(SearchCode, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400" }),
            /* @__PURE__ */ jsx("span", { children: "Keyword Logs" })
          ] }) }),
          /* @__PURE__ */ jsx(Link, { href: route("admin.news.logs"), children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800", children: [
            /* @__PURE__ */ jsx(History, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400" }),
            /* @__PURE__ */ jsx("span", { children: "Lihat Logs" })
          ] }) }),
          /* @__PURE__ */ jsx(Link, { href: route("admin.news.create"), children: /* @__PURE__ */ jsxs(Button, { className: "bg-[#112A12] hover:bg-[#0c1e0d] text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold px-4 h-9 rounded-lg", children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: "Tambah Berita" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSearchSubmit, className: "flex items-center gap-2 flex-1 max-w-md", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Cari judul berita atau konten...",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-9 h-9 text-xs"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "secondary", className: "h-9 px-3 text-xs font-bold", children: "Cari" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap sm:flex-nowrap", children: [
          /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs(
            "select",
            {
              value: category,
              onChange: (e) => handleCategoryChange(e.target.value),
              className: "h-9 px-3 text-xs font-medium bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer",
              children: [
                /* @__PURE__ */ jsx("option", { value: "all", children: "Semua Kategori" }),
                /* @__PURE__ */ jsx("option", { value: "rilisan", children: "Rilisan" }),
                /* @__PURE__ */ jsx("option", { value: "event", children: "Event" }),
                /* @__PURE__ */ jsx("option", { value: "berita", children: "Berita" }),
                /* @__PURE__ */ jsx("option", { value: "pengumuman", children: "Pengumuman" }),
                /* @__PURE__ */ jsx("option", { value: "komunitas", children: "Komunitas" }),
                /* @__PURE__ */ jsx("option", { value: "ulasan", children: "Ulasan" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(ArrowUpDown, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: sort,
                onChange: (e) => handleSortChange(e.target.value),
                className: "h-9 pl-8 pr-7 text-xs font-medium bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer appearance-none",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "latest", children: "Terbaru" }),
                  /* @__PURE__ */ jsx("option", { value: "oldest", children: "Terlama" })
                ]
              }
            )
          ] }),
          (search || category !== "all" || sort !== "latest") && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => {
                setSearch("");
                setCategory("all");
                setSort("latest");
                router.get(route("admin.news.index"), {}, { preserveScroll: true });
              },
              className: "h-9 text-xs font-bold",
              children: "Reset"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xs", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { className: "bg-[#112A12] text-white", children: /* @__PURE__ */ jsxs(TableRow, { className: "border-b border-[#112A12] hover:bg-transparent", children: [
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Judul Berita" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Kategori" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Penulis" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Status Pin" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-center text-xs font-bold text-white", children: "Views" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Tanggal Publikasi" }),
          /* @__PURE__ */ jsx(TableHead, { className: "w-[100px] text-right text-xs font-bold text-white", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: news.data.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 7, className: "text-center text-muted-foreground py-8", children: "Belum ada berita. Klik tombol Tambah Berita untuk memublikasikan postingan baru." }) }) : news.data.map((item) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium max-w-md truncate", children: item.title }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", { className: "px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-neutral-100 dark:bg-neutral-800 uppercase", children: item.category }) }),
          /* @__PURE__ */ jsxs(TableCell, { className: "text-sm text-muted-foreground", children: [
            "@",
            item.username,
            " (",
            item.display_name,
            ")"
          ] }),
          /* @__PURE__ */ jsx(TableCell, { children: item.is_pinned ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800", children: [
            /* @__PURE__ */ jsx(Pin, { className: "w-3 h-3 fill-current" }),
            "Disematkan"
          ] }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "-" }) }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 font-mono text-xs font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md", children: [
            /* @__PURE__ */ jsx(Eye, { className: "w-3.5 h-3.5 text-neutral-400" }),
            /* @__PURE__ */ jsx("span", { children: (item.views_count ?? 0).toLocaleString("id-ID") })
          ] }) }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-xs font-mono text-muted-foreground", children: item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric"
          }) : "-" }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
            /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", asChild: true, title: "Lihat Tampilan User", children: /* @__PURE__ */ jsx(
              "a",
              {
                href: route("news.detail", item.slug || item.id),
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white",
                children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
              }
            ) }),
            /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", asChild: true, title: "Edit Berita", children: /* @__PURE__ */ jsx(Link, { href: route("admin.news.edit", item.id), children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                title: "Hapus Berita",
                onClick: () => setDeleteNewsItem(item),
                children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" })
              }
            )
          ] }) })
        ] }, item.id)) })
      ] }) }),
      news.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-neutral-500 pt-2", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "Halaman ",
          news.current_page,
          " dari ",
          news.last_page
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: news.links.map((link, idx) => {
          const cleanLabel = link.label.replace("pagination.previous", "Previous").replace("pagination.next", "Next");
          if (!link.url) {
            return /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                disabled: true,
                className: "opacity-40 cursor-not-allowed text-xs font-mono",
                children: /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: cleanLabel } })
              },
              idx
            );
          }
          return /* @__PURE__ */ jsx(
            Button,
            {
              variant: link.active ? "default" : "outline",
              size: "sm",
              asChild: true,
              className: "text-xs font-mono",
              children: /* @__PURE__ */ jsx(Link, { href: link.url, preserveScroll: true, children: /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: cleanLabel } }) })
            },
            idx
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(AlertDialog, { open: !!deleteNewsItem, onOpenChange: () => setDeleteNewsItem(null), children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Hapus Berita Ini?" }),
        /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
          'Tindakan ini tidak dapat dibatalkan. Berita "',
          deleteNewsItem == null ? void 0 : deleteNewsItem.title,
          '" akan dihapus secara permanen dari server.'
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Batal" }),
        /* @__PURE__ */ jsx(AlertDialogAction, { onClick: handleDelete, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Hapus" })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NewsIndex
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$5 = [
  {
    title: "Dashboard",
    href: "/admin/dashboard"
  },
  {
    title: "News",
    href: "/admin/news"
  },
  {
    title: "View Logs",
    href: "/admin/news/logs"
  }
];
function Logs({ logs, filters: rawFilters, stats }) {
  var _a;
  const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
  const [search, setSearch] = useState(filters.search || "");
  const [startDate, setStartDate] = useState(filters.start_date || "");
  const [endDate, setEndDate] = useState(filters.end_date || "");
  const [deleteItem, setDeleteItem] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);
  const handleApplyFilters = (newStart, newEnd, newSearch) => {
    const queryStart = newStart !== void 0 ? newStart : startDate;
    const queryEnd = newEnd !== void 0 ? newEnd : endDate;
    const querySearch = search;
    router.get(
      route("admin.news.logs"),
      {
        search: querySearch || void 0,
        news_id: filters.news_id || void 0,
        start_date: queryStart || void 0,
        end_date: queryEnd || void 0
      },
      { preserveState: true, preserveScroll: true }
    );
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleApplyFilters();
  };
  const handleReset = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    router.get(route("admin.news.logs"), {}, { preserveScroll: true });
  };
  const toLocalDateString = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    }
    return dateString;
  };
  const confirmDeleteSingle = () => {
    if (!deleteItem) return;
    setIsDeleting(true);
    router.delete(route("admin.news.logs.destroy", deleteItem.id), {
      preserveScroll: true,
      onFinish: () => {
        setIsDeleting(false);
        setDeleteItem(null);
      }
    });
  };
  const confirmClearLogs = () => {
    setIsDeleting(true);
    router.delete(route("admin.news.logs.clear"), {
      data: {
        news_id: filters.news_id || void 0,
        start_date: startDate || void 0,
        end_date: endDate || void 0
      },
      preserveScroll: true,
      onFinish: () => {
        setIsDeleting(false);
        setShowClearConfirm(false);
      }
    });
  };
  const parseUserAgent = (ua) => {
    if (!ua) return { device: "Unknown", browser: "Unknown", isMobile: false };
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(ua);
    let browser = "Browser";
    if (/edg/i.test(ua)) browser = "Edge";
    else if (/chrome|crios/i.test(ua)) browser = "Chrome";
    else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
    else if (/safari/i.test(ua)) browser = "Safari";
    else if (/opera|opr/i.test(ua)) browser = "Opera";
    return {
      device: isMobile ? "Mobile" : "Desktop",
      browser,
      isMobile
    };
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$5, children: [
    /* @__PURE__ */ jsx(Head, { title: "News View Logs" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-5 p-4 sm:p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Link, { href: route("admin.news.index"), children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) }) }),
            /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white", children: [
              /* @__PURE__ */ jsx(History, { className: "w-6 h-6 text-[#112A12] dark:text-emerald-400" }),
              /* @__PURE__ */ jsx("span", { children: "Log Kunjungan & Waktu Berita" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 ml-10", children: "Pencatatan riwayat waktu real-time saat artikel berita dilihat oleh pengunjung (dengan anti-spam 1 view/menit per IP)." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap sm:flex-nowrap", children: [
          /* @__PURE__ */ jsx(Link, { href: route("admin.news.search-logs"), children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs", children: [
            /* @__PURE__ */ jsx(SearchCode, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400" }),
            /* @__PURE__ */ jsx("span", { children: "Keyword Logs" })
          ] }) }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: route("admin.news.logs.export", {
                search: filters.search,
                news_id: filters.news_id,
                start_date: filters.start_date,
                end_date: filters.end_date
              }),
              target: "_blank",
              rel: "noopener noreferrer",
              download: true,
              children: /* @__PURE__ */ jsxs(
                Button,
                {
                  className: "bg-[#0F9D58] hover:bg-[#0b8043] text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs",
                  title: "Download format CSV yang kompatibel langsung dengan Google Sheets & Excel",
                  children: [
                    /* @__PURE__ */ jsx(FileSpreadsheet, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsx("span", { children: "Export Google Sheets" })
                  ]
                }
              )
            }
          ),
          logs.data.length > 0 && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => setShowClearConfirm(true),
              className: "h-9 px-3 text-xs font-bold flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 border-red-200 dark:border-red-900/50 cursor-pointer",
              title: "Bersihkan log (seluruhnya atau sesuai filter tanggal)",
              children: [
                /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Bersihkan Log" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => router.reload(),
              className: "h-9 px-3 text-xs font-bold flex items-center gap-1.5 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Refresh" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Total Log Tercatat" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-neutral-900 dark:text-white", children: stats.total_views.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-[#112A12]/10 dark:bg-emerald-950/40 text-[#112A12] dark:text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(Eye, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Kunjungan Hari Ini" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-emerald-600 dark:text-emerald-400", children: stats.today_views.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Unique IP Pengunjung" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-blue-600 dark:text-blue-400", children: stats.unique_ips.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(Users, { className: "w-5 h-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-2xs", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSearchSubmit, className: "flex items-center gap-2 flex-1 max-w-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Cari judul berita, IP address, user agent...",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-9 h-9 text-xs"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "secondary", className: "h-9 px-3 text-xs font-bold", children: "Cari" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-neutral-500 dark:text-neutral-400", children: "Dari:" }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                onClick: () => setIsStartDateOpen(true),
                className: `h-9 px-3 text-xs font-medium justify-start text-left gap-2 border-neutral-200 dark:border-neutral-800 ${!startDate && "text-neutral-400"}`,
                children: [
                  /* @__PURE__ */ jsx(Calendar$1, { className: "w-3.5 h-3.5 text-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { children: startDate ? formatDisplayDate(startDate) : "Pilih Tanggal" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-neutral-500 dark:text-neutral-400", children: "Sampai:" }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                onClick: () => setIsEndDateOpen(true),
                className: `h-9 px-3 text-xs font-medium justify-start text-left gap-2 border-neutral-200 dark:border-neutral-800 ${!endDate && "text-neutral-400"}`,
                children: [
                  /* @__PURE__ */ jsx(Calendar$1, { className: "w-3.5 h-3.5 text-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { children: endDate ? formatDisplayDate(endDate) : "Pilih Tanggal" })
                ]
              }
            )
          ] }),
          filters.news_id && /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md", children: [
            "Filter News #",
            filters.news_id
          ] }),
          (search || filters.news_id || startDate || endDate) && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleReset,
              className: "h-9 px-2.5 text-xs font-bold text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 flex items-center gap-1 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Reset Filter" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xs", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { className: "bg-[#112A12] text-white", children: /* @__PURE__ */ jsxs(TableRow, { className: "border-b border-[#112A12] hover:bg-transparent", children: [
          /* @__PURE__ */ jsx(TableHead, { className: "w-16 text-center text-xs font-bold text-white", children: "ID" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Judul Berita" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Waktu & Jam Dilihat" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "IP Address" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "Device & Browser" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-bold text-white", children: "User Agent" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right text-xs font-bold w-16 text-white", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: logs.data.length > 0 ? logs.data.map((log) => {
          const uaParsed = parseUserAgent(log.user_agent);
          const dateObj = new Date(log.created_at);
          return /* @__PURE__ */ jsxs(TableRow, { className: "hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40", children: [
            /* @__PURE__ */ jsxs(TableCell, { className: "text-center font-mono text-xs text-neutral-400", children: [
              "#",
              log.id
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "max-w-[280px]", children: log.news ? /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ jsxs("div", { className: "font-bold text-xs text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Newspaper, { className: "w-3.5 h-3.5 text-emerald-600 shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "truncate", children: log.news.title })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-mono text-neutral-400 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "bg-neutral-100 dark:bg-neutral-800 px-1 rounded capitalize", children: log.news.category || "news" }),
                log.news.display_name && /* @__PURE__ */ jsxs("span", { children: [
                  "Oleh: ",
                  log.news.display_name
                ] })
              ] })
            ] }) : /* @__PURE__ */ jsxs("span", { className: "text-xs text-neutral-400 italic", children: [
              "Berita ID #",
              log.news_id,
              " (Dihapus)"
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ jsxs("div", { className: "font-mono font-bold text-xs text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-neutral-400" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  dateObj.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                  }),
                  " WIB"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "font-mono text-[10px] text-neutral-400 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Calendar$1, { className: "w-3 h-3 text-neutral-400" }),
                /* @__PURE__ */ jsx("span", { children: dateObj.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                }) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", { className: "font-mono text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md border border-neutral-200/50 dark:border-neutral-700", children: log.ip_address || "127.0.0.1" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              uaParsed.isMobile ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800", children: [
                /* @__PURE__ */ jsx(Smartphone, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsx("span", { children: "Mobile" })
              ] }) : /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800", children: [
                /* @__PURE__ */ jsx(Laptop, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsx("span", { children: "Desktop" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono text-neutral-500 dark:text-neutral-400", children: uaParsed.browser })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "max-w-[180px] truncate font-mono text-[10px] text-neutral-400", title: log.user_agent || "", children: log.user_agent || "-" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer",
                onClick: () => setDeleteItem(log),
                title: "Hapus baris log ini",
                children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            ) })
          ] }, log.id);
        }) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 7, className: "h-32 text-center text-xs text-neutral-500", children: "Belum ada riwayat log kunjungan berita yang tercatat sesuai kriteria filter." }) }) })
      ] }) }),
      logs.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-neutral-500 pt-2", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "Halaman ",
          logs.current_page,
          " dari ",
          logs.last_page,
          " (",
          logs.total,
          " total log)"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: logs.links.map((link, idx) => {
          let label = link.label;
          if (label.includes("pagination.previous") || label.includes("&laquo;") || label.includes("Previous")) {
            label = "&laquo; Previous";
          } else if (label.includes("pagination.next") || label.includes("&raquo;") || label.includes("Next")) {
            label = "Next &raquo;";
          }
          return /* @__PURE__ */ jsx(
            Link,
            {
              href: link.url || "#",
              preserveScroll: true,
              className: `px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-colors ${link.active ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900" : !link.url ? "opacity-40 cursor-not-allowed border-neutral-200 dark:border-neutral-800" : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100"}`,
              dangerouslySetInnerHTML: { __html: label }
            },
            idx
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: isStartDateOpen, onOpenChange: setIsStartDateOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg w-[92vw] sm:w-[500px] p-6 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "w-full text-center sm:text-center pb-2", children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar$1, { className: "w-4 h-4 text-emerald-600" }),
          /* @__PURE__ */ jsx("span", { children: "Pilih Tanggal Mulai (Dari)" })
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-xs text-neutral-500", children: "Pilih tanggal awal untuk memfilter data log kunjungan berita." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center py-2", children: /* @__PURE__ */ jsx(
        Calendar,
        {
          mode: "single",
          className: "w-full p-4 [--cell-size:3.2rem] rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-2xs",
          classNames: {
            root: "w-full",
            months: "w-full flex flex-col items-center",
            month: "w-full space-y-4",
            month_grid: "w-full border-collapse",
            weekdays: "flex w-full justify-between",
            weekday: "text-muted-foreground flex-1 text-center font-bold text-xs py-1",
            week: "flex w-full justify-between mt-2",
            day: "flex-1 aspect-square flex items-center justify-center p-0"
          },
          selected: startDate ? (() => {
            const parts = startDate.split("-");
            return parts.length === 3 ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)) : void 0;
          })() : void 0,
          onSelect: (date) => {
            if (date) {
              const formatted = toLocalDateString(date);
              setStartDate(formatted);
              setIsStartDateOpen(false);
              handleApplyFilters(formatted, endDate);
            } else {
              setStartDate("");
              setIsStartDateOpen(false);
              handleApplyFilters("", endDate);
            }
          }
        }
      ) }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "w-full mt-3 flex items-center justify-between sm:justify-between", children: [
        startDate ? /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              setStartDate("");
              setIsStartDateOpen(false);
              handleApplyFilters("", endDate);
            },
            className: "text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer",
            children: "Hapus Filter Tanggal"
          }
        ) : /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setIsStartDateOpen(false),
            className: "text-xs font-semibold cursor-pointer",
            children: "Tutup"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: isEndDateOpen, onOpenChange: setIsEndDateOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg w-[92vw] sm:w-[500px] p-6 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "w-full text-center sm:text-center pb-2", children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar$1, { className: "w-4 h-4 text-emerald-600" }),
          /* @__PURE__ */ jsx("span", { children: "Pilih Tanggal Akhir (Sampai)" })
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-xs text-neutral-500", children: "Pilih tanggal akhir untuk memfilter data log interaksi berita." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center py-2", children: /* @__PURE__ */ jsx(
        Calendar,
        {
          mode: "single",
          className: "w-full p-4 [--cell-size:3.2rem] rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-2xs",
          classNames: {
            root: "w-full",
            months: "w-full flex flex-col items-center",
            month: "w-full space-y-4",
            month_grid: "w-full border-collapse",
            weekdays: "flex w-full justify-between",
            weekday: "text-muted-foreground flex-1 text-center font-bold text-xs py-1",
            week: "flex w-full justify-between mt-2",
            day: "flex-1 aspect-square flex items-center justify-center p-0"
          },
          selected: endDate ? (() => {
            const parts = endDate.split("-");
            return parts.length === 3 ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)) : void 0;
          })() : void 0,
          onSelect: (date) => {
            if (date) {
              const formatted = toLocalDateString(date);
              setEndDate(formatted);
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, formatted);
            } else {
              setEndDate("");
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, "");
            }
          }
        }
      ) }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "w-full mt-3 flex items-center justify-between sm:justify-between", children: [
        endDate ? /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              setEndDate("");
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, "");
            },
            className: "text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer",
            children: "Hapus Filter Tanggal"
          }
        ) : /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setIsEndDateOpen(false),
            className: "text-xs font-semibold cursor-pointer",
            children: "Tutup"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: !!deleteItem, onOpenChange: (open) => !open && setDeleteItem(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2 text-red-600", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { children: "Hapus Riwayat Log Berita" })
        ] }),
        /* @__PURE__ */ jsxs(DialogDescription, { className: "text-xs text-neutral-600 dark:text-neutral-400 mt-2", children: [
          "Apakah Anda yakin ingin menghapus data log ID ",
          /* @__PURE__ */ jsxs("strong", { children: [
            "#",
            deleteItem == null ? void 0 : deleteItem.id
          ] }),
          " untuk berita ",
          /* @__PURE__ */ jsx("strong", { children: ((_a = deleteItem == null ? void 0 : deleteItem.news) == null ? void 0 : _a.title) || "berita" }),
          "? Tindakan ini tidak dapat dibatalkan."
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "mt-4 gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setDeleteItem(null),
            disabled: isDeleting,
            children: "Batal"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "destructive",
            size: "sm",
            onClick: confirmDeleteSingle,
            disabled: isDeleting,
            className: "bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer",
            children: isDeleting ? "Menghapus..." : "Ya, Hapus Log"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: showClearConfirm, onOpenChange: setShowClearConfirm, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2 text-red-600", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { children: "Bersihkan Seluruh Log Berita" })
        ] }),
        /* @__PURE__ */ jsxs(DialogDescription, { className: "text-xs text-neutral-600 dark:text-neutral-400 mt-2 space-y-2", children: [
          /* @__PURE__ */ jsx("p", { children: startDate || endDate ? /* @__PURE__ */ jsxs(Fragment, { children: [
            "Anda akan menghapus data log dalam rentang",
            " ",
            /* @__PURE__ */ jsx("strong", { children: startDate ? formatDisplayDate(startDate) : "awal" }),
            " s/d",
            " ",
            /* @__PURE__ */ jsx("strong", { children: endDate ? formatDisplayDate(endDate) : "sekarang" }),
            "."
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            "Anda akan menghapus ",
            /* @__PURE__ */ jsx("strong", { children: "seluruh data log kunjungan berita" }),
            " yang ada di database."
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-neutral-500", children: /* @__PURE__ */ jsx("em", { children: "Catatan: Jumlah counter views pada masing-masing berita tidak akan terpengaruh atau berkurang." }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "mt-4 gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setShowClearConfirm(false),
            disabled: isDeleting,
            children: "Batal"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "destructive",
            size: "sm",
            onClick: confirmClearLogs,
            disabled: isDeleting,
            className: "bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer",
            children: isDeleting ? "Membersihkan..." : "Bersihkan Sekarang"
          }
        )
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Logs
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$4 = [
  {
    title: "Dashboard",
    href: "/admin/dashboard"
  },
  {
    title: "Berita",
    href: "/admin/news"
  },
  {
    title: "Keyword Logs",
    href: "/admin/news/search-logs"
  }
];
function SearchLogs({ logs, filters: rawFilters, stats, topSearches }) {
  const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
  const [search, setSearch] = useState(filters.search || "");
  const [startDate, setStartDate] = useState(filters.start_date || "");
  const [endDate, setEndDate] = useState(filters.end_date || "");
  const [deleteItem, setDeleteItem] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);
  const handleApplyFilters = (newStart, newEnd, newSearch) => {
    const queryStart = newStart !== void 0 ? newStart : startDate;
    const queryEnd = newEnd !== void 0 ? newEnd : endDate;
    const querySearch = newSearch !== void 0 ? newSearch : search;
    router.get(
      route("admin.news.search-logs"),
      {
        search: querySearch || void 0,
        start_date: queryStart || void 0,
        end_date: queryEnd || void 0
      },
      { preserveState: true, preserveScroll: true }
    );
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleApplyFilters();
  };
  const handleReset = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    router.get(route("admin.news.search-logs"), {}, { preserveScroll: true });
  };
  const toLocalDateString = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    }
    return dateString;
  };
  const confirmDeleteSingle = () => {
    if (!deleteItem) return;
    setIsDeleting(true);
    router.delete(route("admin.news.search-logs.destroy", deleteItem.id), {
      preserveScroll: true,
      onFinish: () => {
        setIsDeleting(false);
        setDeleteItem(null);
      }
    });
  };
  const confirmClearLogs = () => {
    setIsDeleting(true);
    router.delete(route("admin.news.search-logs.clear"), {
      data: {
        search: search || void 0,
        start_date: startDate || void 0,
        end_date: endDate || void 0
      },
      preserveScroll: true,
      onFinish: () => {
        setIsDeleting(false);
        setShowClearConfirm(false);
      }
    });
  };
  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$4, children: [
    /* @__PURE__ */ jsx(Head, { title: "Keyword Logs Pencarian Berita" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-5 p-4 sm:p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Link, { href: route("admin.news.index"), children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) }) }),
            /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white", children: [
              /* @__PURE__ */ jsx(SearchCode, { className: "w-6 h-6 text-[#112A12] dark:text-emerald-400" }),
              /* @__PURE__ */ jsx("span", { children: "Log Kata Kunci Pencarian Berita" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 ml-10", children: "Riwayat kata kunci yang dicari pengunjung pada halaman berita & artikel (dilengkapi sanitasi dan anti-spam)." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap sm:flex-nowrap", children: [
          /* @__PURE__ */ jsx(Link, { href: route("admin.news.logs"), children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs", children: [
            /* @__PURE__ */ jsx(Newspaper, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400" }),
            /* @__PURE__ */ jsx("span", { children: "Lihat View Logs" })
          ] }) }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: route("admin.news.search-logs.export", {
                search: filters.search,
                start_date: filters.start_date,
                end_date: filters.end_date
              }),
              target: "_blank",
              rel: "noopener noreferrer",
              download: true,
              children: /* @__PURE__ */ jsxs(
                Button,
                {
                  className: "bg-[#0F9D58] hover:bg-[#0b8043] text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs",
                  title: "Download format CSV yang kompatibel langsung dengan Google Sheets & Excel",
                  children: [
                    /* @__PURE__ */ jsx(FileSpreadsheet, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsx("span", { children: "Export Google Sheets" })
                  ]
                }
              )
            }
          ),
          logs.data.length > 0 && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => setShowClearConfirm(true),
              className: "h-9 px-3 text-xs font-bold flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 border-red-200 dark:border-red-900/50 cursor-pointer",
              title: "Bersihkan log (seluruhnya atau sesuai filter tanggal/kata kunci)",
              children: [
                /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Bersihkan Log" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => router.reload(),
              className: "h-9 px-3 text-xs font-bold flex items-center gap-1.5 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Refresh" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Total Frekuensi Pencarian" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-neutral-900 dark:text-white", children: stats.total_searches.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-[#112A12]/10 dark:bg-emerald-950/40 text-[#112A12] dark:text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(Search, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Pencarian Hari Ini" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-emerald-600 dark:text-emerald-400", children: stats.today_searches.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase", children: "Kata Kunci Unik" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-sans font-black text-blue-600 dark:text-blue-400", children: stats.unique_keywords.toLocaleString("id-ID") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(Hash, { className: "w-5 h-5" }) })
        ] })
      ] }),
      topSearches && topSearches.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-[#DA6B1C] shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-mono font-bold uppercase text-neutral-700 dark:text-neutral-300", children: "Top Kata Kunci Berita Terpopuler:" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 flex-wrap", children: topSearches.map((item, idx) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              setSearch(item.keyword);
              handleApplyFilters(void 0, void 0, item.keyword);
            },
            className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-emerald-500 text-neutral-800 dark:text-neutral-200 cursor-pointer shadow-3xs transition-all",
            children: [
              /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#112A12] dark:text-emerald-400", children: [
                "#",
                idx + 1
              ] }),
              /* @__PURE__ */ jsx("span", { children: item.keyword }),
              /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-mono text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-900 px-1.5 py-0.5 rounded", children: [
                Number(item.total_count).toLocaleString("id-ID"),
                "x"
              ] })
            ]
          },
          idx
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-2xs", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSearchSubmit, className: "flex items-center gap-2 flex-1 max-w-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Cari kata kunci berita...",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-9 h-9 text-xs"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "secondary", className: "h-9 px-3 text-xs font-bold", children: "Cari" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-neutral-500 dark:text-neutral-400", children: "Dari:" }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                onClick: () => setIsStartDateOpen(true),
                className: `h-9 px-3 text-xs font-medium justify-start text-left gap-2 border-neutral-200 dark:border-neutral-800 ${!startDate && "text-neutral-400"}`,
                children: [
                  /* @__PURE__ */ jsx(Calendar$1, { className: "w-3.5 h-3.5 text-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { children: startDate ? formatDisplayDate(startDate) : "Pilih Tanggal" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-neutral-500 dark:text-neutral-400", children: "Sampai:" }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                onClick: () => setIsEndDateOpen(true),
                className: `h-9 px-3 text-xs font-medium justify-start text-left gap-2 border-neutral-200 dark:border-neutral-800 ${!endDate && "text-neutral-400"}`,
                children: [
                  /* @__PURE__ */ jsx(Calendar$1, { className: "w-3.5 h-3.5 text-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { children: endDate ? formatDisplayDate(endDate) : "Pilih Tanggal" })
                ]
              }
            )
          ] }),
          (search || startDate || endDate) && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleReset,
              className: "h-9 text-xs font-bold flex items-center gap-1 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Reset Filter" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-2xs", children: [
        /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { className: "bg-neutral-50/70 dark:bg-neutral-800/50", children: /* @__PURE__ */ jsxs(TableRow, { className: "border-neutral-200 dark:border-neutral-800", children: [
            /* @__PURE__ */ jsx(TableHead, { className: "w-[80px] text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "ID" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "Kata Kunci (Keyword)" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "Frekuensi Pencarian" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "Tanggal Pencarian" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "Terakhir Dicari" }),
            /* @__PURE__ */ jsx(TableHead, { className: "w-[100px] text-right text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400", children: "Aksi" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: logs.data.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 6, className: "h-48 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-2 text-neutral-400 dark:text-neutral-500", children: [
            /* @__PURE__ */ jsx(SearchCode, { className: "w-8 h-8 stroke-1" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Belum ada riwayat kata kunci pencarian berita" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-400", children: "Kata kunci yang diketik pengunjung saat mencari berita & artikel akan otomatis dicatat di sini." })
          ] }) }) }) : logs.data.map((log) => {
            return /* @__PURE__ */ jsxs(
              TableRow,
              {
                className: "border-neutral-100 dark:border-neutral-800/60 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors",
                children: [
                  /* @__PURE__ */ jsxs(TableCell, { className: "font-mono text-xs text-neutral-400", children: [
                    "#",
                    log.id
                  ] }),
                  /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("span", { className: "font-medium font-mono text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md border border-neutral-200/60 dark:border-neutral-700", children: log.keyword }) }) }),
                  /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40", children: [
                    /* @__PURE__ */ jsx(TrendingUp, { className: "w-3 h-3 text-emerald-600 dark:text-emerald-400" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      log.search_count.toLocaleString("id-ID"),
                      "x dicari"
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-300 font-sans", children: [
                    /* @__PURE__ */ jsx(Calendar$1, { className: "w-3.5 h-3.5 text-neutral-400" }),
                    /* @__PURE__ */ jsx("span", { children: formatDisplayDate(log.search_date) })
                  ] }) }),
                  /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-mono", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-neutral-400" }),
                    /* @__PURE__ */ jsx("span", { children: formatDateTime(log.updated_at) })
                  ] }) }),
                  /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      onClick: () => setDeleteItem(log),
                      className: "h-8 w-8 text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg cursor-pointer",
                      title: "Hapus log kata kunci ini",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                    }
                  ) })
                ]
              },
              log.id
            );
          }) })
        ] }),
        logs.total > logs.per_page && /* @__PURE__ */ jsxs("div", { className: "p-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-neutral-500", children: [
            "Menampilkan ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-neutral-800 dark:text-neutral-200", children: logs.from || 0 }),
            " sampai",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-neutral-800 dark:text-neutral-200", children: logs.to || 0 }),
            " dari",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-neutral-800 dark:text-neutral-200", children: logs.total }),
            " data"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: logs.links.map((link, idx) => {
            if (link.url === null) {
              return /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  disabled: true,
                  dangerouslySetInnerHTML: { __html: link.label },
                  className: "h-8 text-xs font-semibold opacity-50 cursor-not-allowed"
                },
                idx
              );
            }
            return /* @__PURE__ */ jsx(Link, { href: link.url, preserveScroll: true, preserveState: true, children: /* @__PURE__ */ jsx(
              Button,
              {
                variant: link.active ? "default" : "outline",
                size: "sm",
                dangerouslySetInnerHTML: { __html: link.label },
                className: `h-8 text-xs font-semibold ${link.active ? "bg-[#112A12] text-white hover:bg-[#112A12]/90" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"}`
              }
            ) }, idx);
          }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: !!deleteItem, onOpenChange: (open) => !open && setDeleteItem(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md p-6", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-1", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white", children: "Hapus Log Kata Kunci Berita?" }),
        /* @__PURE__ */ jsxs(DialogDescription, { className: "text-xs text-neutral-500 dark:text-neutral-400", children: [
          "Apakah Anda yakin ingin menghapus riwayat kata kunci ",
          /* @__PURE__ */ jsxs("span", { className: "font-bold text-neutral-900 dark:text-white font-mono", children: [
            '"',
            deleteItem == null ? void 0 : deleteItem.keyword,
            '"'
          ] }),
          " pada tanggal ",
          /* @__PURE__ */ jsx("span", { className: "font-bold text-neutral-900 dark:text-white", children: formatDisplayDate(deleteItem == null ? void 0 : deleteItem.search_date) }),
          "? Tindakan ini tidak dapat dibatalkan."
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "mt-4 flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            disabled: isDeleting,
            onClick: () => setDeleteItem(null),
            className: "text-xs font-semibold cursor-pointer",
            children: "Batal"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "destructive",
            size: "sm",
            disabled: isDeleting,
            onClick: confirmDeleteSingle,
            className: "text-xs font-semibold cursor-pointer bg-red-600 hover:bg-red-700 text-white",
            children: isDeleting ? "Menghapus..." : "Ya, Hapus Log"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: showClearConfirm, onOpenChange: setShowClearConfirm, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md p-6", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-1", children: /* @__PURE__ */ jsx(Trash2, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white", children: "Bersihkan Riwayat Log Kata Kunci Berita?" }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-xs text-neutral-500 dark:text-neutral-400 space-y-1.5", children: /* @__PURE__ */ jsx("p", { children: startDate || endDate || search ? /* @__PURE__ */ jsxs("span", { children: [
          "Data log kata kunci pencarian berita yang sesuai dengan ",
          /* @__PURE__ */ jsx("strong", { children: "filter aktif saat ini" }),
          " akan dihapus permanen."
        ] }) : /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsxs("strong", { children: [
            "Seluruh (",
            stats.total_searches.toLocaleString("id-ID"),
            ")"
          ] }),
          " data log kata kunci pencarian berita akan dihapus secara permanen dari database."
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "mt-4 flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            disabled: isDeleting,
            onClick: () => setShowClearConfirm(false),
            className: "text-xs font-semibold cursor-pointer",
            children: "Batal"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "destructive",
            size: "sm",
            disabled: isDeleting,
            onClick: confirmClearLogs,
            className: "text-xs font-semibold cursor-pointer bg-red-600 hover:bg-red-700 text-white",
            children: isDeleting ? "Membersihkan..." : "Ya, Bersihkan Sekarang"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: isStartDateOpen, onOpenChange: setIsStartDateOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg w-[92vw] sm:w-[500px] p-6 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "w-full text-center sm:text-center pb-2", children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar$1, { className: "w-4 h-4 text-emerald-600" }),
          /* @__PURE__ */ jsx("span", { children: "Pilih Tanggal Mulai (Dari)" })
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-xs text-neutral-500", children: "Pilih tanggal awal untuk memfilter data log kata kunci pencarian berita." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center py-2", children: /* @__PURE__ */ jsx(
        Calendar,
        {
          mode: "single",
          className: "w-full p-4 [--cell-size:3.2rem] rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-2xs",
          classNames: {
            root: "w-full",
            months: "w-full flex flex-col items-center",
            month: "w-full space-y-4",
            month_grid: "w-full border-collapse",
            weekdays: "flex w-full justify-between",
            weekday: "text-muted-foreground flex-1 text-center font-bold text-xs py-1",
            week: "flex w-full justify-between mt-2",
            day: "flex-1 aspect-square flex items-center justify-center p-0"
          },
          selected: startDate ? (() => {
            const parts = startDate.split("-");
            return parts.length === 3 ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)) : void 0;
          })() : void 0,
          onSelect: (date) => {
            if (date) {
              const formatted = toLocalDateString(date);
              setStartDate(formatted);
              setIsStartDateOpen(false);
              handleApplyFilters(formatted, endDate);
            } else {
              setStartDate("");
              setIsStartDateOpen(false);
              handleApplyFilters("", endDate);
            }
          }
        }
      ) }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "w-full mt-3 flex items-center justify-between sm:justify-between", children: [
        startDate ? /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              setStartDate("");
              setIsStartDateOpen(false);
              handleApplyFilters("", endDate);
            },
            className: "text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer",
            children: "Hapus Filter Tanggal"
          }
        ) : /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setIsStartDateOpen(false),
            className: "text-xs font-semibold cursor-pointer",
            children: "Tutup"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: isEndDateOpen, onOpenChange: setIsEndDateOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg w-[92vw] sm:w-[500px] p-6 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "w-full text-center sm:text-center pb-2", children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "text-base font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar$1, { className: "w-4 h-4 text-emerald-600" }),
          /* @__PURE__ */ jsx("span", { children: "Pilih Tanggal Akhir (Sampai)" })
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-xs text-neutral-500", children: "Pilih tanggal akhir untuk memfilter data log kata kunci pencarian berita." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center py-2", children: /* @__PURE__ */ jsx(
        Calendar,
        {
          mode: "single",
          className: "w-full p-4 [--cell-size:3.2rem] rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-2xs",
          classNames: {
            root: "w-full",
            months: "w-full flex flex-col items-center",
            month: "w-full space-y-4",
            month_grid: "w-full border-collapse",
            weekdays: "flex w-full justify-between",
            weekday: "text-muted-foreground flex-1 text-center font-bold text-xs py-1",
            week: "flex w-full justify-between mt-2",
            day: "flex-1 aspect-square flex items-center justify-center p-0"
          },
          selected: endDate ? (() => {
            const parts = endDate.split("-");
            return parts.length === 3 ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)) : void 0;
          })() : void 0,
          onSelect: (date) => {
            if (date) {
              const formatted = toLocalDateString(date);
              setEndDate(formatted);
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, formatted);
            } else {
              setEndDate("");
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, "");
            }
          }
        }
      ) }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "w-full mt-3 flex items-center justify-between sm:justify-between", children: [
        endDate ? /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              setEndDate("");
              setIsEndDateOpen(false);
              handleApplyFilters(startDate, "");
            },
            className: "text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer",
            children: "Hapus Filter Tanggal"
          }
        ) : /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setIsEndDateOpen(false),
            className: "text-xs font-semibold cursor-pointer",
            children: "Tutup"
          }
        )
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SearchLogs
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$3 = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Publishers",
    href: "/admin/publishers"
  },
  {
    title: "Tambah",
    href: "/admin/publishers/create"
  }
];
function CreatePublisher() {
  const form = useForm({
    name: ""
  });
  const submit = (event) => {
    event.preventDefault();
    form.post(
      route("admin.publishers.store")
    );
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$3, children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah Publisher" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Tambah Publisher" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Tambahkan penerbit buku baru." })
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(
          Link,
          {
            href: route(
              "admin.publishers.index"
            ),
            children: "Kembali"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border bg-card p-6", children: /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: submit,
          className: "max-w-xl space-y-6",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Nama Publisher" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "name",
                  value: form.data.name,
                  onChange: (event) => form.setData(
                    "name",
                    event.target.value
                  ),
                  placeholder: "Contoh: Elex Media Komputindo",
                  disabled: form.processing
                }
              ),
              form.errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.name })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                disabled: form.processing || !form.data.name.trim(),
                children: form.processing ? "Menyimpan..." : "Simpan Publisher"
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
const __vite_glob_0_39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreatePublisher
}, Symbol.toStringTag, { value: "Module" }));
function EditPublisher({
  publisher
}) {
  const breadcrumbs2 = [
    {
      title: "Dashboard",
      href: "/dashboard"
    },
    {
      title: "Publishers",
      href: "/admin/publishers"
    },
    {
      title: "Edit",
      href: `/admin/publishers/${publisher.id}/edit`
    }
  ];
  const form = useForm({
    name: publisher.name
  });
  const submit = (event) => {
    event.preventDefault();
    form.put(
      route(
        "admin.publishers.update",
        publisher.id
      )
    );
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs2, children: [
    /* @__PURE__ */ jsx(
      Head,
      {
        title: `Edit Publisher - ${publisher.name}`
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Edit Publisher" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Perbarui informasi publisher." })
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(
          Link,
          {
            href: route(
              "admin.publishers.index"
            ),
            children: "Kembali"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border bg-card p-6", children: /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: submit,
          className: "max-w-xl space-y-6",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Nama Publisher" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "name",
                  value: form.data.name,
                  onChange: (event) => form.setData(
                    "name",
                    event.target.value
                  ),
                  disabled: form.processing
                }
              ),
              form.errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "slug", children: "Slug" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "slug",
                  value: publisher.slug,
                  disabled: true
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Slug dibuat otomatis oleh sistem." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  disabled: form.processing || !form.data.name.trim(),
                  children: form.processing ? "Menyimpan..." : "Simpan Perubahan"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  asChild: true,
                  children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route(
                        "admin.publishers.index"
                      ),
                      children: "Batal"
                    }
                  )
                }
              )
            ] })
          ]
        }
      ) })
    ] })
  ] });
}
const __vite_glob_0_40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditPublisher
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$2 = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Publishers",
    href: "/admin/publishers"
  }
];
function PublisherIndex({
  publishers
}) {
  const [deletePublisher, setDeletePublisher] = useState(null);
  const handleDelete = () => {
    if (!deletePublisher) {
      return;
    }
    router.delete(
      route(
        "admin.publishers.destroy",
        deletePublisher.id
      ),
      {
        preserveScroll: true,
        onFinish: () => {
          setDeletePublisher(null);
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$2, children: [
    /* @__PURE__ */ jsx(Head, { title: "Publishers" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Publishers" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Kelola penerbit buku." })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: route(
              "admin.publishers.create"
            ),
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "mr-2 size-4" }),
              "Tambah Publisher"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl border bg-card", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b bg-muted/40", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-medium", children: "#" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-medium", children: "Nama" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-medium", children: "Slug" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right text-sm font-medium", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: publishers.data.length > 0 ? publishers.data.map(
          (publisher, index) => /* @__PURE__ */ jsxs(
            "tr",
            {
              className: "border-b last:border-0",
              children: [
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: (publishers.current_page - 1) * publishers.per_page + index + 1 }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm font-medium", children: publisher.name }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: publisher.slug }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "icon",
                      asChild: true,
                      children: /* @__PURE__ */ jsx(
                        Link,
                        {
                          href: route(
                            "admin.publishers.edit",
                            publisher.id
                          ),
                          children: /* @__PURE__ */ jsx(Pencil, { className: "size-4" })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "destructive",
                      size: "icon",
                      onClick: () => setDeletePublisher(
                        publisher
                      ),
                      children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
                    }
                  )
                ] }) })
              ]
            },
            publisher.id
          )
        ) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
          "td",
          {
            colSpan: 4,
            className: "px-4 py-10 text-center text-sm text-muted-foreground",
            children: "Belum ada publisher."
          }
        ) }) })
      ] }) }) }),
      publishers.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Menampilkan",
          " ",
          publishers.data.length,
          " dari",
          " ",
          publishers.total,
          " publisher."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          publishers.current_page > 1 && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              asChild: true,
              children: /* @__PURE__ */ jsx(
                Link,
                {
                  href: route(
                    "admin.publishers.index",
                    {
                      page: publishers.current_page - 1
                    }
                  ),
                  children: "Sebelumnya"
                }
              )
            }
          ),
          publishers.current_page < publishers.last_page && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              asChild: true,
              children: /* @__PURE__ */ jsx(
                Link,
                {
                  href: route(
                    "admin.publishers.index",
                    {
                      page: publishers.current_page + 1
                    }
                  ),
                  children: "Berikutnya"
                }
              )
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      AlertDialog,
      {
        open: deletePublisher !== null,
        onOpenChange: (open) => {
          if (!open) {
            setDeletePublisher(null);
          }
        },
        children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Hapus Publisher?" }),
            /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
              "Apakah Anda yakin ingin menghapus",
              " ",
              /* @__PURE__ */ jsx("strong", { children: deletePublisher == null ? void 0 : deletePublisher.name }),
              "?",
              /* @__PURE__ */ jsx("br", {}),
              "Publisher yang masih digunakan oleh buku tidak dapat dihapus."
            ] })
          ] }),
          /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Batal" }),
            /* @__PURE__ */ jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                children: "Hapus"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const __vite_glob_0_41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PublisherIndex
}, Symbol.toStringTag, { value: "Module" }));
function PublisherForm({
  initialValues,
  submitLabel,
  onSubmit
}) {
  const form = useForm({
    name: (initialValues == null ? void 0 : initialValues.name) ?? ""
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Nama Penerbit" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              value: form.data.name,
              onChange: (event) => form.setData(
                "name",
                event.target.value
              ),
              placeholder: "Contoh: Action",
              disabled: form.processing
            }
          ),
          form.errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.name })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            disabled: form.processing || !form.data.name.trim(),
            children: form.processing ? "Menyimpan..." : submitLabel
          }
        ) })
      ]
    }
  );
}
const __vite_glob_0_42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PublisherForm
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$1 = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Story Status",
    href: "/admin/story-statuses"
  },
  {
    title: "Tambah",
    href: "/admin/story-statuses/create"
  }
];
function CreateStoryStatus() {
  const form = useForm({
    name: ""
  });
  const submit = (event) => {
    event.preventDefault();
    form.post(
      route("admin.story-statuses.store")
    );
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$1, children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah Story Status" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Tambah Story Status" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Tambahkan status cerita baru." })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            asChild: true,
            children: /* @__PURE__ */ jsx(
              Link,
              {
                href: route(
                  "admin.story-statuses.index"
                ),
                children: "Kembali"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border bg-card p-6", children: /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: submit,
          className: "max-w-xl space-y-6",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Nama Status" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "name",
                  value: form.data.name,
                  onChange: (event) => form.setData(
                    "name",
                    event.target.value
                  ),
                  placeholder: "Contoh: Ongoing",
                  disabled: form.processing
                }
              ),
              form.errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.name })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                disabled: form.processing || !form.data.name.trim(),
                children: form.processing ? "Menyimpan..." : "Simpan Status"
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
const __vite_glob_0_43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateStoryStatus
}, Symbol.toStringTag, { value: "Module" }));
function EditStoryStatus({
  storyStatus
}) {
  const breadcrumbs2 = [
    {
      title: "Dashboard",
      href: "/dashboard"
    },
    {
      title: "Story Status",
      href: "/admin/story-statuses"
    },
    {
      title: "Edit",
      href: `/admin/story-statuses/${storyStatus.id}/edit`
    }
  ];
  const form = useForm({
    name: storyStatus.name
  });
  const submit = (event) => {
    event.preventDefault();
    form.put(
      route(
        "admin.story-statuses.update",
        storyStatus.id
      )
    );
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs2, children: [
    /* @__PURE__ */ jsx(
      Head,
      {
        title: `Edit Story Status - ${storyStatus.name}`
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Edit Story Status" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Perbarui status cerita." })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            asChild: true,
            children: /* @__PURE__ */ jsx(
              Link,
              {
                href: route(
                  "admin.story-statuses.index"
                ),
                children: "Kembali"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border bg-card p-6", children: /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: submit,
          className: "max-w-xl space-y-6",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Nama Status" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "name",
                  value: form.data.name,
                  onChange: (event) => form.setData(
                    "name",
                    event.target.value
                  ),
                  disabled: form.processing
                }
              ),
              form.errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "slug", children: "Slug" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "slug",
                  value: storyStatus.slug,
                  disabled: true
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Slug dibuat otomatis oleh sistem." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  disabled: form.processing || !form.data.name.trim(),
                  children: form.processing ? "Menyimpan..." : "Simpan Perubahan"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  asChild: true,
                  children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route(
                        "admin.story-statuses.index"
                      ),
                      children: "Batal"
                    }
                  )
                }
              )
            ] })
          ]
        }
      ) })
    ] })
  ] });
}
const __vite_glob_0_44 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditStoryStatus
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Story Status",
    href: "/admin/story-statuses"
  }
];
function StoryStatusIndex({
  storyStatuses
}) {
  const [deleteStatus, setDeleteStatus] = useState(null);
  const handleDelete = () => {
    if (!deleteStatus) {
      return;
    }
    router.delete(
      route(
        "admin.story-statuses.destroy",
        deleteStatus.id
      ),
      {
        preserveScroll: true,
        onFinish: () => {
          setDeleteStatus(null);
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsx(Head, { title: "Story Status" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Story Status" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Kelola status cerita buku." })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: route(
              "admin.story-statuses.create"
            ),
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "mr-2 size-4" }),
              "Tambah Status"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl border bg-card", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b bg-muted/40", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-medium", children: "#" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-medium", children: "Nama" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-medium", children: "Slug" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right text-sm font-medium", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: storyStatuses.data.length > 0 ? storyStatuses.data.map(
          (status, index) => /* @__PURE__ */ jsxs(
            "tr",
            {
              className: "border-b last:border-0",
              children: [
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: (storyStatuses.current_page - 1) * storyStatuses.per_page + index + 1 }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm font-medium", children: status.name }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: status.slug }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "icon",
                      asChild: true,
                      children: /* @__PURE__ */ jsxs(
                        Link,
                        {
                          href: route(
                            "admin.story-statuses.edit",
                            status.id
                          ),
                          children: [
                            /* @__PURE__ */ jsx(Pencil, { className: "size-4" }),
                            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Edits" })
                          ]
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      variant: "destructive",
                      size: "icon",
                      onClick: () => setDeleteStatus(
                        status
                      ),
                      children: [
                        /* @__PURE__ */ jsx(Trash2, { className: "size-4" }),
                        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Hapus" })
                      ]
                    }
                  )
                ] }) })
              ]
            },
            status.id
          )
        ) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
          "td",
          {
            colSpan: 4,
            className: "px-4 py-10 text-center text-sm text-muted-foreground",
            children: "Belum ada status cerita."
          }
        ) }) })
      ] }) }) }),
      storyStatuses.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Menampilkan",
          " ",
          storyStatuses.data.length,
          " ",
          "dari ",
          storyStatuses.total,
          " ",
          "status."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          storyStatuses.current_page > 1 && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              asChild: true,
              children: /* @__PURE__ */ jsx(
                Link,
                {
                  href: route(
                    "admin.story-statuses.index",
                    {
                      page: storyStatuses.current_page - 1
                    }
                  ),
                  children: "Sebelumnya"
                }
              )
            }
          ),
          storyStatuses.current_page < storyStatuses.last_page && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              asChild: true,
              children: /* @__PURE__ */ jsx(
                Link,
                {
                  href: route(
                    "admin.story-statuses.index",
                    {
                      page: storyStatuses.current_page + 1
                    }
                  ),
                  children: "Berikutnya"
                }
              )
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      AlertDialog,
      {
        open: deleteStatus !== null,
        onOpenChange: (open) => {
          if (!open) {
            setDeleteStatus(null);
          }
        },
        children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Hapus Story Status?" }),
            /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
              "Apakah Anda yakin ingin menghapus status",
              " ",
              /* @__PURE__ */ jsx("strong", { children: deleteStatus == null ? void 0 : deleteStatus.name }),
              "? Tindakan ini tidak dapat dibatalkan."
            ] })
          ] }),
          /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Batal" }),
            /* @__PURE__ */ jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                children: "Hapus"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const __vite_glob_0_45 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: StoryStatusIndex
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_7 as $,
  AppLayout as A,
  Button as B,
  __vite_glob_0_26 as C,
  Dialog as D,
  __vite_glob_0_25 as E,
  __vite_glob_0_24 as F,
  __vite_glob_0_23 as G,
  __vite_glob_0_22 as H,
  Input as I,
  __vite_glob_0_21 as J,
  __vite_glob_0_20 as K,
  Label as L,
  __vite_glob_0_19 as M,
  __vite_glob_0_18 as N,
  __vite_glob_0_17 as O,
  __vite_glob_0_16 as P,
  __vite_glob_0_15 as Q,
  __vite_glob_0_14 as R,
  Separator as S,
  Toaster as T,
  __vite_glob_0_13 as U,
  __vite_glob_0_12 as V,
  __vite_glob_0_11 as W,
  __vite_glob_0_10 as X,
  __vite_glob_0_9 as Y,
  __vite_glob_0_8 as Z,
  __vite_glob_0_45 as _,
  DialogTrigger as a,
  __vite_glob_0_6 as a0,
  __vite_glob_0_5 as a1,
  __vite_glob_0_4 as a2,
  __vite_glob_0_3 as a3,
  __vite_glob_0_2 as a4,
  __vite_glob_0_1 as a5,
  __vite_glob_0_0 as a6,
  DialogContent as b,
  cn as c,
  DialogTitle as d,
  DialogDescription as e,
  DialogFooter as f,
  DialogClose as g,
  __vite_glob_0_44 as h,
  __vite_glob_0_43 as i,
  __vite_glob_0_42 as j,
  __vite_glob_0_41 as k,
  __vite_glob_0_40 as l,
  __vite_glob_0_39 as m,
  __vite_glob_0_38 as n,
  __vite_glob_0_37 as o,
  __vite_glob_0_36 as p,
  __vite_glob_0_35 as q,
  __vite_glob_0_34 as r,
  __vite_glob_0_33 as s,
  __vite_glob_0_32 as t,
  useAppearance as u,
  __vite_glob_0_31 as v,
  __vite_glob_0_30 as w,
  __vite_glob_0_29 as x,
  __vite_glob_0_28 as y,
  __vite_glob_0_27 as z
};
