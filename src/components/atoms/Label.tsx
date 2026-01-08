type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export function Label({ children, className, ...props }: LabelProps) {
    return (
        <label
            {...props}
            className={`font-semibold ${className ?? ''}`}
        >
            {children}
        </label>
    )
}