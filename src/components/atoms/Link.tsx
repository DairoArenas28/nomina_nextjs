import React from "react"
import { IconType } from "react-icons"

interface Props {
    name: string
    href: string
    icon?: IconType
}

export default function Link({ name, href, icon }: Props) {
    return (
        <a href={href} className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
            {icon && (
                <span>
                    {React.createElement(icon, { size: 20, color: "currentColor" })}
                </span>
            )}
            <span className="flex-1 ms-3 whitespace-nowrap">{name}</span>
            <span className="bg-neutral-secondary-medium border border-default-medium text-heading text-xs font-medium px-1.5 py-0.5 rounded-sm">Pro</span>
        </a>
    )
}