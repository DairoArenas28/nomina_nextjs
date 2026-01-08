
type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            {...props}
            className={`border p-2 rounded w-full ${className ?? ''}`}
        />
    )
}