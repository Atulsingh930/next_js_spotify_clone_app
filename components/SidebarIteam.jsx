import Link from "next/link";
import { twMerge } from "tailwind-merge";

const SidebarIteam = ({icon, name, href, active}) =>{
    const Icon = icon;
    return (
        <Link href={href} className={twMerge("flex items-center text-2xl gap-4 font-medium text-neutral-400 transition-all duration-100 hover:text-white", active && "text-white")}>
            <Icon size={28}/>
            <p className="truncate w-full text-base">{name}</p>
        </Link>
    )
}

export default SidebarIteam;