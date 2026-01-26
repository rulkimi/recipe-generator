import * as React from "react";
import { cn } from "@/lib/utils";
import { Button as BaseButton, buttonVariants } from "@/components/ui/button";
import { Spinner as DefaultSpinner } from "@/components/ui/spinner";
import { Icons, type IconType } from "@/components/icons";
import type { VariantProps } from "class-variance-authority";

type IconPosition = "left" | "right";

type AppButtonProps = React.ComponentProps<typeof BaseButton> &
  VariantProps<typeof buttonVariants> & {
    icon?: IconType;
    iconPosition?: IconPosition;
    loading?: boolean;
    /**
     * Optional: set aria-label for loading spinner
     */
    loadingLabel?: string;
  };

/**
 * AppButton - Wraps base button with an optional icon and loading indicator.
 * Shows icon left or right (default left).
 */
const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      className,
      icon,
      iconPosition = "left",
      loading = false,
      loadingLabel = "Loading...",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Icon = icon ? Icons[icon] : null;

    return (
      <BaseButton
        ref={ref}
        className={className}
        aria-busy={loading ? true : undefined}
        aria-label={loading ? loadingLabel : props["aria-label"]}
        disabled={disabled || loading}
        {...props}
      >
        {/* Icon left */}
        {Icon && iconPosition === "left" && !loading && (
          <Icon
            className="mr-1"
            aria-hidden="true"
          />
        )}

        {/* Loading Spinner */}
        {loading && (
          <DefaultSpinner className={Icon ? "" : "mr-2"} />
        )}

        {/* Content */}
        <span
          style={{ opacity: loading ? 0.6 : 1 }}
          className={cn("flex-1", {
            ["ml-1"]: Icon && iconPosition === "left" && !loading,
            ["mr-1"]: Icon && iconPosition === "right" && !loading,
          })}
        >
          {children}
        </span>

        {/* Icon right */}
        {Icon && iconPosition === "right" && !loading && (
          <Icon
            className="ml-1"
            aria-hidden="true"
          />
        )}
      </BaseButton>
    );
  }
);

AppButton.displayName = "AppButton";

export { AppButton, buttonVariants };
