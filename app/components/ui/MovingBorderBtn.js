"use client";
import React from "react";
import { cn } from "@/app/lib/utils";

export const MovingBorderBtn = ({
    borderRadius = "1.75rem",
    children,
    as: Component = "button",
    containerClassName,
    borderClassName,
    duration = 2000,
    className,
    ...otherProps
}) => {
    return (
        <Component
            className={cn(
                "bg-transparent relative text-xl  h-16 w-40 p-[1px] overflow-hidden ",
                containerClassName
            )}
            style={{
                borderRadius: borderRadius,
            }}
            {...otherProps}
        >
            <div
                className="absolute inset-0"
                style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
            >
                <MovingBorder duration={duration} rx="30%" ry="30%">
                    <div
                        className={cn(
                            "h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]",
                            borderClassName
                        )}
                    />
                </MovingBorder>
            </div>

            <div
                className={cn(
                    "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
                    className
                )}
                style={{
                    borderRadius: `calc(${borderRadius} * 0.96)`,
                }}
            >
                {children}
            </div>
        </Component>
    );
};

export const MovingBorder = ({
    children,
    duration = 2000,
    rx,
    ry,
    ...otherProps
}) => {
    const pathRef = React.useRef(null);
    const progress = React.useRef(0);
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);

    React.useEffect(() => {
        let animationFrameId;

        const animate = (time) => {
            const length = pathRef.current?.getTotalLength();
            if (length) {
                const px = pathRef.current.getPointAtLength(length * progress.current);
                setX(px.x);
                setY(px.y);
            }
            progress.current += 1 / (60 * (duration / 1000)); // approximate frame time
            if (progress.current >= 1) {
                progress.current = 0;
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [duration]);

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="absolute h-full w-full"
                width="100%"
                height="100%"
                {...otherProps}
            >
                <rect
                    fill="none"
                    width="100%"
                    height="100%"
                    rx={rx}
                    ry={ry}
                    ref={pathRef}
                />
            </svg>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    display: "inline-block",
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
            >
                {children}
            </div>
        </>
    );
};
