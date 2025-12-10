
interface Props {
    text: string
    color?: string
    onClick: () => void
}

export function Button({text, color='bg-blue-300', onClick}: Props) {
    return (
        <>
            <button onClick={onClick} className={`rounded-xl p-2 ${color} text-white cursor-pointer`}>
                {text}
            </button>
        </>
    )
}