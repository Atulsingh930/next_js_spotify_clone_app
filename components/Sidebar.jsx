"use client"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"
import { IconType } from "react-icons"
import Box from "./Box"
import SidebarIteam from "./SidebarIteam"
import Library from "./Library"

export default function Sidebar({children}){
    
    const pathname = usePathname();
    const routes = useMemo(() => [
        {
            icon : HiHome,
            name : "Home",
            href : "/",
            active : pathname!=='/search'
        },
        {
            icon : BiSearch,
            name : "Search",
            href : "/search",
            active : pathname==='/search'
        }
    ], [pathname])

    return (
        <div className="flex h-[calc(100vh-80px)] max-sm:h-[calc(100vh-150px)] w-full">
            <div className="hidden md:flex flex-col gap-2 w-[350px] p-2">
                <Box className="px-5 py-5 flex flex-col gap-5">
                {
                    routes.map((route, index) => (
                        <SidebarIteam key={index} {...route}/>
                    ))
                }
                </Box>
                <Box className="overflow-y-auto h-full">
                    <Library/>
                </Box>
            </div>
            <main className="h-full flex-1 py-2 pr-2 max-sm:pl-2 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
