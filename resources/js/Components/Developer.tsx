import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface DeveloperProps {
    image: string;
    name: string;
    nim: string;
    role: string;
}

export default function Developer({ image, name, nim, role }: DeveloperProps) {
    return (
        <div className="relative group p-8 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl max-w-xs">
            <div className="flex justify-center items-center bg-blue-500 rounded-full p-6 group-hover:bg-blue-500 transition-all">
                <img
                    src={image}
                    alt={name}
                    className="rounded-full w-48 h-48 transition-transform duration-300 group-hover:scale-125"
                />
            </div>
            <div className="flex flex-col items-center mt-6">
                <p className="text-3xl">{name}</p>
                <p className="text-xl">NIM: {nim}</p>
                <p className="text-xl">Role: {role}</p>
            </div>
        </div>
    );
}
