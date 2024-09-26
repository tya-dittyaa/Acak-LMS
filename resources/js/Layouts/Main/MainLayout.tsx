import { ThemeProvider } from "@/Context/ThemeProvider";
import FooterLayout from "../Footer/FooterLayout";
import HeaderLayout from "../Header/HeaderLayout";

interface MainLayoutProps {
    title: string;
    children: React.ReactNode;
}

export default function MainLayout({ title, children }: MainLayoutProps) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <HeaderLayout title={title} />
                <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-8">
                    {children}
                </main>
                <FooterLayout />
            </ThemeProvider>
        </div>
    );
}
