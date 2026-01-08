import { Input } from "../../atoms/Input"
import { Label } from "../../atoms/Label"

type InputFieldProps = {
    labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
    inputProps: React.InputHTMLAttributes<HTMLInputElement>
}

export function InputField({ labelProps, inputProps }: InputFieldProps) {
    return (
        <div className="flex flex-col gap-1">
            <Label  {...labelProps} htmlFor={inputProps.name} />

            <Input
                {...inputProps}
            />
        </div>
    )
}
