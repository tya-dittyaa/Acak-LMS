interface DeveloperProps {
    image: string;
    name: string;
    role: string;
}

export default function Developer({ image, name, role }: DeveloperProps) {
    return (
        <>
            <div className="flex flex-col justify-center items-center space-x-4">
                <img
                    src={image}
                    alt={name}
                    className="rounded-full w-64 h-64 "
                />
                <h2>{name}</h2>
                <p>{role}</p>
            </div>
        </>
    );
}
