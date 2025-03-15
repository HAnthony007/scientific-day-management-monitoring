import Breadcrumb from "@/components/breadcrumb";
import SearchInput from "@/components/search-input";
import { ToggleTheme } from "@/components/theme/theme-mode-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "./user-nav";

export default function Header() {
    return (
        <header className="sticky top-0 z-[999] backdrop:blur flex h-16 shrink-0 items-center justify-between gap-2 transtion-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb />
            </div>
            <div className="flex items-center gap-2 px-4">
                <div className="hidden md:flex">
                    <SearchInput />
                </div>
                <UserNav />
                <ToggleTheme />
            </div>
        </header>
    );
}
