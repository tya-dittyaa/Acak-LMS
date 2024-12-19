import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { GoCopy } from "react-icons/go";

interface CopyButtonProps {
    code: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            toast.success("Team code copied to clipboard");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <Button
            onClick={handleCopy}
            size="icon"
            variant="ghost"
            className="w-5 h-5"
        >
            <GoCopy />
        </Button>
    );
};

export default CopyButton;
