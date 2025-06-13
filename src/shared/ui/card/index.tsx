import { type HTMLAttributes, forwardRef } from "react";
import styles from "./styles.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.card} ${className || ""}`}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card, type CardProps };
