interface DeveloperProps {
    image: string;
    name: string;
    nim: string;
    role: string;
}

export default function Developer({ image, name, nim, role }: DeveloperProps) {
    return (
        <div className="relative group bg-white dark:bg-gray-800 p-6 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl max-w-xs">
            <div className="flex justify-center items-center bg-blue-100 dark:bg-blue-900 rounded-full p-6 group-hover:bg-blue-500 transition-all">
                <img
                    src={image}
                    alt={name}
                    className="rounded-full w-32 h-32 transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <div className="flex flex-col items-center mt-6 text-center">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {nim}
                </p>
                <span className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                    {role}
                </span>
            </div>
        </div>
    );
}
