import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { Toaster, ToastPosition } from "react-hot-toast";
import { useMediaQuery } from "usehooks-ts";
import { UserTeamProvider } from "./context/UserTeamProvider";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

function ToastWrapper({ children }: { children: React.ReactNode }) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const toastPosition: ToastPosition = isDesktop
        ? "bottom-right"
        : "top-right";

    return (
        <>
            {children}
            <Toaster position={toastPosition} reverseOrder={true} />
        </>
    );
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob("./pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const teams = props.initialPage?.props?.auth?.teams || [];

        root.render(
            <ToastWrapper>
                <UserTeamProvider teams={teams}>
                    <App {...props} />
                </UserTeamProvider>
            </ToastWrapper>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
