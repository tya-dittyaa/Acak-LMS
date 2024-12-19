import ApplicationLogo from "@/components/default/ApplicationLogo";
import { Button } from "@/components/ui/button";
import { ThemeTabs } from "@/components/ui/select-theme";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavCommand from "./NavCommand";

export default function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex min-h-svh flex-col">
                <ApplicationLogo subtitle="LMS" />
                <Separator />
                <NavCommand />
                <Separator />
                <ThemeTabs />
            </SheetContent>
        </Sheet>
    );
}
