export function enumToOptions<T extends Record<string, string>>(
    labels: Record<T[keyof T], string>
) {
    return Object.entries(labels).map(([value, label]) => ({
        value,
        label
    }))
}