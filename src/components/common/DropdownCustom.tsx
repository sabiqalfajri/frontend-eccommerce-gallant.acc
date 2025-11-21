import { Link } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

type alignType = 'start' | 'center' | 'end'

export interface MenuItem {
    label: string
    icon?: React.ReactNode
    href?: string
    onClick?: () => void
    disabled?: boolean
    className?: string
    separator?: 'up' | 'down' 
}

interface DropdownCustomProps {
    trigger?: React.ReactNode
    menu: MenuItem[]
    className?: string
    align?: alignType
    children?: React.ReactNode
    header?: React.ReactNode
}

export const DropdownCustom = ({
    trigger,
    menu,
    className,
    align = 'end',
    children,
    header
}: DropdownCustomProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children ?? trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={className} align={align}>
                {header && (
                    <div className="text-[15px] px-3 py-0.5">
                        {header}
                    </div>
                )}
                {menu.map((item, idx) => {
                    const content = (
                        <>
                            <div className="flex flex-wrap items-center gap-x-2.5">
                                {item.icon && item.icon}
                                {item.label}
                            </div>
                        </>
                    )

                    return (
                        <>
                            {item.separator && item.separator === 'up' && <div className="border-b border-gray-200 my-1"></div>}

                            <DropdownMenuItem 
                            key={idx} onClick={item.onClick} 
                            className={`text-[15px] ${item.className}`}>
                                {item.href ? (
                                    <Link
                                        to={item.href}
                                        className="flex items-center w-full p-0.5"
                                    >
                                        {content}
                                    </Link>
                                ) : (
                                    <button
                                        className="flex items-center w-full cursor-pointer p-0.5"
                                        onClick={item.onClick}
                                    >
                                        {content}
                                    </button>
                                )}
                            </DropdownMenuItem>

                            {item.separator && item.separator === 'down' && <div className="border-t border-gray-200 my-1"></div>}
                        </>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}