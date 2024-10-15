import { ThemeProvider } from "@/Context/ThemeProvider";
import FooterLayout from "../Footer/FooterLayout";
import HeaderLayout from "../Header/HeaderLayout";

interface PageLayoutProps {
    title: string;
    children: React.ReactNode;
    hasPadding?: boolean;
}

export default function PageLayout({
    title,
    children,
    hasPadding = true,
}: PageLayoutProps) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            {/* ThemeProvider for handling light/dark mode */}
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                {/* Header component with dynamic title */}
                <HeaderLayout title={title} />

                {/* Main content area with conditional padding */}
                <main
                    className={`flex flex-1 flex-col gap-4 bg-muted/40 ${
                        hasPadding ? "p-4 md:gap-8 md:p-8" : ""
                    }`}
                >
                    {children}
                </main>

                {/* Footer component */}
                <FooterLayout />
            </ThemeProvider>
        </div>
    );
}
