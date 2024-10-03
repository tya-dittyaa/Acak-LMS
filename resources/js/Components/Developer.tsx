import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface DeveloperProps {
    image: string;
    name: string;
    nim: string;
    role: string;
}

export default function Developer({ image, name, nim, role }: DeveloperProps) {
    return (
        <>
            <Avatar>
                <div className="flex flex-col justify-center items-center text-2xl">
                    <AvatarImage
                        className="rounded-full w-60 h-60"
                        src={image}
                    ></AvatarImage>
                    <AvatarFallback>{name}</AvatarFallback>
                    <p>{name}</p>
                    <p>{nim}</p>
                    <p>{role}</p>
                </div>
            </Avatar>
        </>
    );
}
