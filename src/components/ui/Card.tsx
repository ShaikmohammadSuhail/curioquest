import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
    hoverEffect?: boolean;
}

export function Card({ className, children, hoverEffect = false, ...props }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={hoverEffect ? { y: -5, rotate: 1 } : undefined}
            className={cn(
                "bg-white rounded-3xl border-4 border-brand-dark shadow-[8px_8px_0_0_rgb(31,41,55)] p-6",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
}
