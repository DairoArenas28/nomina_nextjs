import { Label } from "../../atoms/Label"
import { Select } from "../../atoms/Select/Select"

type EnumLike = Record<string, string | number>

type SelectFieldProps<T extends EnumLike> = {
    labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
    selectProps: React.SelectHTMLAttributes<HTMLSelectElement>

    options?: T               // enum / objeto as const
    placeholder?: string
    children?: React.ReactNode
}

export function SelectField<T extends EnumLike>({
    labelProps,
    selectProps,
    options,
    placeholder = "Seleccione una opción",
    children
}: SelectFieldProps<T>) {
    return (
        <div className="flex flex-col gap-1">
            <Label {...labelProps} />

            <Select {...selectProps}>
                <option value="">{placeholder}</option>

                {children
                    ? children
                    : options &&
                    Object.entries(options).map(([key, value]) => (
                        <option key={key} value={value}>
                            {value}
                        </option>
                    ))}
            </Select>
        </div>
    )
}
