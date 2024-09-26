import { useTheme } from "@/Context/ThemeProvider";
import { MoonIcon, SunIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./tabs";

export default function ThemeTabs() {
    const { theme, setTheme } = useTheme();

    const handleThemeChange = (value: string) => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Tabs
            defaultValue={theme === "light" ? "light" : "dark"}
            onValueChange={handleThemeChange}
            className="w-full"
        >
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="light" className="gap-3">
                    <SunIcon className="h-4 w-4" />
                    Terang
                </TabsTrigger>
                <TabsTrigger value="dark" className="gap-3">
                    <MoonIcon className="h-4 w-4" />
                    Gelap
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
