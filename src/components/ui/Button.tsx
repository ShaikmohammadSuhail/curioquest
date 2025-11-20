import { motion, type MotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps & {
    variant?: "primary" | "secondary" | "danger" | "success" | "outline";
    size?: "sm" | "md" | "lg" | "xl";
};

export function Button({
    className,
    variant = "primary",
    size = "md",
    children,
    ...props
}: ButtonProps) {
    const variants = {
        primary: "bg-brand-purple text-white shadow-[0_4px_0_0_rgb(109,40,217)] hover:shadow-[0_2px_0_0_rgb(109,40,217)] active:shadow-none active:translate-y-1",
        secondary: "bg-brand-yellow text-brand-dark shadow-[0_4px_0_0_rgb(217,119,6)] hover:shadow-[0_2px_0_0_rgb(217,119,6)] active:shadow-none active:translate-y-1",
        danger: "bg-brand-red text-white shadow-[0_4px_0_0_rgb(185,28,28)] hover:shadow-[0_2px_0_0_rgb(185,28,28)] active:shadow-none active:translate-y-1",
        success: "bg-brand-green text-white shadow-[0_4px_0_0_rgb(4,120,87)] hover:shadow-[0_2px_0_0_rgb(4,120,87)] active:shadow-none active:translate-y-1",
        outline: "bg-white border-2 border-brand-dark text-brand-dark shadow-[0_4px_0_0_rgb(31,41,55)] hover:shadow-[0_2px_0_0_rgb(31,41,55)] active:shadow-none active:translate-y-1",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        xl: "px-10 py-5 text-xl font-black",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "rounded-2xl font-bold transition-all duration-100 flex items-center justify-center gap-2",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
