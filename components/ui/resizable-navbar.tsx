import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
  className?: string;
}

export function Navbar({ children, className }: NavbarProps) {
  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-950/80",
        className
      )}
    >
      {children}
    </nav>
  );
}

interface NavBodyProps {
  children: ReactNode;
  className?: string;
}

export function NavBody({ children, className }: NavBodyProps) {
  return (
    <div
      className={cn(
        "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}

interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
}

export function NavItems({ items, className }: NavItemsProps) {
  return (
    <div className={cn("hidden items-center gap-8 md:flex", className)}>
      {items.map((item, idx) => (
        <a
          key={`nav-link-${idx}`}
          href={item.link}
          className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}

interface NavbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  className?: string;
}

export function NavbarButton({
  variant = "primary",
  className,
  ...props
}: NavbarButtonProps) {
  return (
    <button
      className={cn(
        "hidden rounded-full px-4 py-2 text-sm font-medium transition-colors md:block",
        variant === "primary"
          ? "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
        className
      )}
      {...props}
    />
  );
}

interface NavbarLogoProps {
  className?: string;
}

export function NavbarLogo({ className }: NavbarLogoProps) {
  return (
    <a href="/" className={cn("flex items-center gap-2", className)}>
      <img src="/voice.png" alt="Voice IT" className="h-8 w-8" />
      <span className="text-xl font-bold text-neutral-900 dark:text-white">
        Voice IT
      </span>
    </a>
  );
}

interface MobileNavProps {
  children: ReactNode;
  className?: string;
}

export function MobileNav({ children, className }: MobileNavProps) {
  return (
    <div className={cn("md:hidden", className)}>
      {children}
    </div>
  );
}

interface MobileNavHeaderProps {
  children: ReactNode;
  className?: string;
}

export function MobileNavHeader({ children, className }: MobileNavHeaderProps) {
  return (
    <div
      className={cn(
        "flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}

interface MobileNavToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
}

export function MobileNavToggle({
  isOpen,
  className,
  ...props
}: MobileNavToggleProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white",
        className
      )}
      {...props}
    >
      {isOpen ? (
        <X className="h-6 w-6" aria-hidden="true" />
      ) : (
        <Menu className="h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
}

interface MobileNavMenuProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function MobileNavMenu({
  children,
  isOpen,
  onClose,
  className,
}: MobileNavMenuProps) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 top-16 z-50 border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950",
        isOpen ? "block" : "hidden",
        className
      )}
    >
      <div className="space-y-4 p-4">
        {children}
      </div>
    </div>
  );
} 