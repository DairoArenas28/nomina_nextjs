import { ConceptWithoutId } from "@/src/types/concept.type";

interface ConceptFieldsProps {
  data?: ConceptWithoutId;
  onChange?: (field: keyof ConceptWithoutId, value: string) => void;
}

export function ConceptFields({ data, onChange }: ConceptFieldsProps) {
  return (
    <div className="max-h-[600px] overflow-y-auto p-3 space-y-6">

      {/* === INFORMACIÓN PERSONAL === */}
      <section>
        <h3 className="font-bold text-lg mb-2">Información Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Nombre */}
          <div>
            <label className="font-semibold">Código</label>
            <input
              value={data?.code ?? ""}
              onChange={(e) => onChange?.("code", e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Edad */}
          <div>
            <label className="font-semibold">Descripción</label>
            <input
              type="text"
              value={data?.description ?? ""}
              onChange={(e) => onChange?.("description", e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Tipo de concepto */}
          <div>
            <label className="font-semibold">Tipo de concepto</label>
            <input
              type="text"
              value={data?.type ?? ""}
              onChange={(e) => onChange?.("type", e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Valor */}
          <div>
            <label className="font-semibold">Valor</label>
            <input
              type="text"
              value={data?.value ?? ""}
              onChange={(e) => onChange?.("value", e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

        </div>
      </section>

    </div>
  );
}
