import { PathBreadcrumb } from "./path-breadcrumb";
import { Separator } from "./separator";

export default function PageTitle({
    title,
    icon,
}: {
    title: string;
    icon: React.ReactNode;
}): JSX.Element {
    return (
        <div className="flex flex-col gap-5">
            <PathBreadcrumb />

            <div className="flex items-center gap-3">
                {icon}

                <h1 className="scroll-m-20 text-xl font-bold tracking-tight md:text-2xl">
                    {title}
                </h1>
            </div>

            <Separator />
        </div>
    );
}
