import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface Props {
    subtitle?: string;
    textClassName?: string;
}

export default function ApplicationLogo(props: Props) {
    return (
        <div className="flex h-5 items-center space-x-3 text-md">
            <a href="/" className="flex items-center gap-2 md:text-base">
                <h1 className={cn("text-2xl", props.textClassName)}>
                    <span className="font-bold">ACAK</span>
                    <span className="text-yellow-500">MAYA</span>
                </h1>
            </a>

            {props.subtitle && (
                <>
                    <Separator orientation="vertical" />
                    <h2>{props.subtitle}</h2>
                </>
            )}
        </div>
    );
}
