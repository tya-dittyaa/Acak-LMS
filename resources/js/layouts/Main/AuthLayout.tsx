import ApplicationLogo from "@/components/default/ApplicationLogo";

interface Props {
    children: React.ReactNode;
    useCard?: boolean;
}

export default function AuthLayout({ children, useCard = false }: Props) {
    return (
        <div className="flex flex-col lg:flex-row min-h-dvh">
            {/* Left section */}
            <div className="flex flex-auto h-[15dvh] lg:h-dvh justify-center items-center bg-sky-100 lg:w-[40%]">
                <ApplicationLogo textClassName="text-4xl lg:text-6xl" />
            </div>

            {/* Right section */}
            <div className="flex flex-col py-5 gap-5 h-[85dvh] lg:h-dvh justify-center items-center lg:w-[60%] overflow-hidden">
                <div className="flex flex-col">
                    <h1 className="font-extrabold text-2xl">
                        Welcome to professional
                    </h1>
                    <h1 className="font-light text-xl">
                        Learning Management System
                    </h1>
                </div>

                {useCard ? (
                    <div className="flex justify-center w-full px-8">
                        <div className="w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                            {children}
                        </div>
                    </div>
                ) : (
                    <>{children}</>
                )}
            </div>
        </div>
    );
}
