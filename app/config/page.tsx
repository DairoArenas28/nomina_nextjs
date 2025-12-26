import { Config } from "@/src/components/organisms/Config";

export default function ConfigPage() {
    return (
        <div className="flex w-full items-center justify-center font-sans dark:bg-black bg-gray-300 ">
            <div className="flex h-full  w-full max-w-48xl flex-col items-center justify-between py-32 px-16 bg-gray-300 dark:bg-black sm:items-start">
                <Config />
            </div>
        </div>
    )
}