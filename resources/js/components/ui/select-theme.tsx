import { useTheme } from "@/context/ThemeProvider";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./button";
import { Tabs, TabsList, TabsTrigger } from "./tabs";

function ThemeButton() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme}>
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}

function ThemeTabs() {
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
                    Light
                </TabsTrigger>
                <TabsTrigger value="dark" className="gap-3">
                    <MoonIcon className="h-4 w-4" />
                    Dark
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}

export { ThemeButton, ThemeTabs };
