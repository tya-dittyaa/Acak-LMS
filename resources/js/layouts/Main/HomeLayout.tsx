import { ThemeProvider } from "@/context/ThemeProvider";
import { PageProps } from "@/types";
import FooterLayout from "../Footer/FooterLayout";
import HeaderLayout from "../Header/HeaderLayout";

interface Props extends PageProps {
    title: string;
    children: React.ReactNode;
    hasPadding?: boolean;
}

export default function MainLayout(props: Props) {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <div className="flex min-h-screen w-full flex-col">
                <HeaderLayout auth={props.auth} title={props.title} />
                <main
                    className={`flex flex-1 flex-col gap-4 bg-muted/40 ${
                        props.hasPadding ? "p-4 md:gap-8 md:p-8" : ""
                    }`}
                >
                    {props.children}
                </main>
                <FooterLayout />
            </div>
        </ThemeProvider>
    );
}
