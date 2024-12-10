import AcakLogo from "@/Components/ui/acak-logo";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import ThemeTabs from "@/Components/ui/theme-tabs";
import { Menu } from "lucide-react";

export default function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex min-h-svh flex-col">
                <AcakLogo subtitle="LMS" />
                <Separator />
                <Separator />
                <ThemeTabs />
            </SheetContent>
        </Sheet>
    );
}
