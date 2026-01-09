import { ConceptWithoutId } from "@/src/types/concept.type";
import { InputField } from "./UI/InputField";
import { SelectField } from "./UI/SelectField";
import { enumToOptions } from "@/src/utils/EnumToOptions";
import { CalculationBaseLabel, CalculationTypeLabel, ConceptCategoryLabel, ConceptTypeLabel, OvertimeTypeLabel } from "@/src/constants";

interface ConceptFieldsProps {
  data?: ConceptWithoutId;
  onChange: (field: keyof ConceptWithoutId, value: unknown) => void;
}

export function ConceptFields({ data, onChange }: ConceptFieldsProps) {
  return (
    <div className="max-h-[600px] overflow-y-auto p-3 space-y-6">
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Código */}
          <InputField labelProps={{ children: "Código" }} inputProps={
            {
              name: "code",
              type: "text", value: data?.code ?? "",
              onChange: (e) => onChange?.("code", e.target.value),
              className: "border p-2 rounded w-full"
            }
          } />

          <InputField labelProps={{ children: "Descripción" }} inputProps={
            {
              name: "description",
              type: "text", value: data?.description ?? "",
              onChange: (e) => onChange?.("description", e.target.value),
              className: "border p-2 rounded w-full"
            }
          } />

          {/* Tipo de concepto */}

          <SelectField
            labelProps={{ children: "Tipo de concepto" }}
            selectProps={
              {
                value: data?.type, name: "type",
                onChange: (e) => onChange("type", e.target.value),
                className: "border p-2 rounded w-full cursor-pointer"
              }
            }
            options={ConceptTypeLabel}
          />

          {/* Categoría */}

          <SelectField
            labelProps={{ children: "Categoría" }}
            selectProps={
              {
                value: data?.category, name: "category",
                onChange: (e) => onChange("category", e.target.value),
                className: "border p-2 rounded w-full cursor-pointer"
              }
            }
            options={ConceptCategoryLabel}
          />

          {/* Tipo de cálculo */}

          <SelectField
            labelProps={{ children: "Tipo de cálculo" }}
            selectProps={
              {
                name: "calculationType",
                value: data?.calculationType ?? "",
                onChange: (e) => onChange("calculationType", e.target.value),
                className: "border p-2 rounded w-full cursor-pointer"
              }
            }
            options={CalculationTypeLabel}
          />

          {/* Valor */}

          <SelectField
            labelProps={{ children: "Base" }}
            selectProps={
              {
                name: "calculationBase",
                value: data?.calculationBase ?? "",
                onChange: (e) => onChange("calculationBase", e.target.value),
                className: "border p-2 rounded w-full cursor-pointer"
              }
            }
            options={CalculationBaseLabel}
          />

          <InputField labelProps={{ children: "Porcentaje (%)" }} inputProps={
            {
              name: "percentage",
              type: "number", value: data?.percentage ?? "",
              onChange: (e) => onChange?.("percentage", e.target.value),
              className: "border p-2 rounded w-full"
            }
          } />

          <SelectField
            labelProps={{ children: "Tipo Hora Extra" }}
            selectProps={
              {
                name: "overtimeType",
                value: data?.overtimeType ?? "",
                onChange: (e) => onChange("overtimeType", e.target.value),
                className: "border p-2 rounded w-full cursor-pointer"
              }
            }
            options={OvertimeTypeLabel}
          />

          <InputField labelProps={{ children: "Valor" }} inputProps={
            {
              name: "value",
              type: "number", value: data?.value ?? "",
              onChange: (e) => onChange?.("value", e.target.value),
              className: "border p-2 rounded w-full"
            }
          } />

          <div className="flex flex-row justify-around">
            <InputField labelProps={{ children: "Editable" }} inputProps={
              {
                name: "editable",
                type: "checkbox", checked: data?.editable ?? true,
                onChange: (e) => onChange?.("editable", e.target.value),
                className: "w-6 h-6 border border-default-medium rounded-xs bg-neutral-secondary-medium cursor-pointer"
              }
            } />

            <InputField labelProps={{ children: "Activo" }} inputProps={
              {
                name: "active",
                type: "checkbox", checked: data?.active ?? true,
                onChange: (e) => onChange?.("active", e.target.value),
                className: "w-6 h-6 border border-default-medium rounded-xs bg-neutral-secondary-medium cursor-pointer"
              }
            } />
          </div>

        </div>
      </section>
    </div>
  );
}
