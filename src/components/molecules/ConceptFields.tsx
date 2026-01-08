import { ConceptWithoutId } from "@/src/types/concept.type";
import { InputField } from "./UI/InputField";
import { SelectField } from "./UI/SelectField";
import { CalculationBase, CalculationType, ConceptType } from "@/src/entities/enums";

interface ConceptFieldsProps {
  data?: ConceptWithoutId;
  onChange: (field: keyof ConceptWithoutId, value: string) => void;
}

export function ConceptFields({ data, onChange }: ConceptFieldsProps) {
  return (
    <div className="max-h-[600px] overflow-y-auto p-3 space-y-6">
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Código */}
          <InputField labelProps={{children: "Código"}} inputProps={
            {
              name: "code", 
              type: "text", value:data?.code ?? "", 
              onChange: (e) => onChange?.("code", e.target.value), 
              className: "border p-2 rounded w-full" 
            }
          }/>

          <InputField labelProps={{children: "Descripción"}} inputProps={
            {
              name: "description", 
              type: "text", value:data?.description ?? "", 
              onChange: (e) => onChange?.("description", e.target.value), 
              className: "border p-2 rounded w-full" 
            }
          }/>

          {/* Tipo de concepto */}

          <SelectField
            labelProps={{children: "Tipo de concepto"}}
            selectProps={
              {
                value: data?.type, name:"type", 
                onChange: (e) => onChange("type", e.target.value), 
                className:"border p-2 rounded w-full cursor-pointer"
              }
            }
            options={ConceptType}
          />

          {/* Tipo de cálculo */}

          <SelectField
            labelProps={{children: "Tipo de cálculo"}}
            selectProps={
              {name: "calculationType", 
                value:data?.calculationType, 
                onChange: (e) => onChange("calculationType", e.target.value), 
                className:"border p-2 rounded w-full cursor-pointer"
              }
            }
            options={CalculationType}
          />

          {/* Valor */}

          <SelectField
            labelProps={{children: "Base"}}
            selectProps={
              {name: "calculationBase", 
                value:data?.calculationBase, 
                onChange: (e) => onChange("calculationBase", e.target.value), 
                className:"border p-2 rounded w-full cursor-pointer"
              }
            }
            options={CalculationBase}
          />
    
        </div>
      </section>
    </div>
  );
}
