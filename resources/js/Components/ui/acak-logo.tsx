import { Separator } from "./separator";

interface AcakLogoProps {
    subtitle: string;
}

export default function AcakLogo({ subtitle }: AcakLogoProps) {
    return (
        <div className="flex h-5 items-center space-x-4 text-md">
            <a
                href="/"
                className="flex items-center gap-2 font-semibold md:text-base"
            >
                <h1 className="text-2xl">ACAK</h1>
            </a>
            <Separator orientation="vertical" />
            <h2>{subtitle}</h2>
        </div>
    );
}
