import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/cx";
import type { RouteHref } from "@/lib/site";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant?: ButtonVariant;
  className?: string;
  children?: ReactNode;
} & (
  | (Omit<ComponentProps<"button">, "className" | "children"> & {
      href?: undefined;
    })
  | (Omit<ComponentProps<typeof Link>, "href" | "className" | "children"> & {
      href: RouteHref;
    })
);

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cx(variantClass[variant], className);

  if (props.href) {
    return (
      <Link className={classes} {...props}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props;

  return (
    <button className={classes} type={type} {...buttonProps}>
      {children}
    </button>
  );
}
