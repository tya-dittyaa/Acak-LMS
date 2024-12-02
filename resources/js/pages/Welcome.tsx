import Developer from "@/components/ui/developer";
import { Separator } from "@/components/ui/separator";
import MainLayout from "@/layouts/Main/HomeLayout";
import { PageProps } from "@/types";
import { useEffect, useRef } from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";

interface Props extends PageProps {}

export default function Welcome({ auth }: Props) {
    const words = ["Partners", "Members", "Peoples"];
    const currentIndex = useRef(0);
    const wordElementRef = useRef<HTMLSpanElement | null>(null);
    const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (window.location.hash) {
            window.scrollTo(0, 0);
        }
    }, []);

    const changeWord = () => {
        const wordElement = wordElementRef.current;
        if (!wordElement) return;

        const word = words[currentIndex.current];
        wordElement.textContent = "";

        let i = 0;
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        typingIntervalRef.current = setInterval(() => {
            wordElement.textContent += word[i];
            i++;

            if (i === word.length) {
                clearInterval(typingIntervalRef.current!);
                timeoutRef.current = setTimeout(() => {
                    currentIndex.current =
                        (currentIndex.current + 1) % words.length;
                    changeWord();
                }, 2000);
            }
        }, 100);
    };

    useEffect(() => {
        changeWord();

        return () => {
            if (typingIntervalRef.current)
                clearInterval(typingIntervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [words]);

    return (
        <MainLayout auth={auth} title="Welcome" hasPadding>
            {/* Intro Section */}
            <section className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16 px-4 md:px-8 lg:px-16 py-12 h-[91dvh]">
                {/* Text Content */}
                <div className="flex flex-col justify-center space-y-6 text-center md:text-left md:w-2/3">
                    <div>
                        <p className="font-black text-4xl md:text-7xl leading-tight">
                            Where your{" "}
                            <span
                                id="changing-word"
                                ref={wordElementRef}
                                className="typing text-blue-500"
                            ></span>
                        </p>
                        <p className="font-black text-4xl md:text-7xl leading-tight">
                            learn. How your progress results.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-lg md:text-xl">
                            Empower your teams with <b>ACAKMAYA LMS</b> to
                            deliver engaging learning experiences that drive
                            performance, boost retention, and fuel growth.
                            Unlock the potential of every learner with a
                            platform designed for lasting impact.
                        </p>
                    </div>
                    <div className="md:w-[20rem]">
                        <a
                            href={auth.user ? "/dashboard" : "/login"}
                            className="flex items-center justify-center bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all hover:bg-blue-600 hover:text-white duration-300 ease-in-out"
                        >
                            <FaChevronCircleRight className="mr-2" />
                            {auth.user ? "Access Dashboard" : "Get Started"}
                        </a>
                    </div>
                </div>

                {/* Image */}
                <div className="flex justify-center md:justify-end w-full md:w-1/3">
                    <img
                        src={"/img/welcome/IntroPage.png"}
                        alt="Intro"
                        className="max-w-full h-auto animate-slideUp"
                    />
                </div>
            </section>

            <Separator />

            {/* Offerings Directory */}
            <section className="flex flex-col items-center pt-10 pb-10 space-y-12">
                <p className="text-3xl md:text-5xl font-black text-center">
                    Benefit Offerings
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 mt-8 w-full max-w-5xl px-4">
                    {/* Scalability */}
                    <div className="flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out">
                        <img
                            src={"/img/welcome/Scalable.png"}
                            alt="Scalability"
                            className="w-24 h-24 md:w-32 md:h-32 object-contain"
                        />
                        <p className="text-xl md:text-2xl font-black mt-4 text-center">
                            Scalability
                        </p>
                    </div>
                    {/* Security */}
                    <div className="flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out">
                        <img
                            src={"/img/welcome/Secure.png"}
                            alt="Security"
                            className="w-24 h-24 md:w-32 md:h-32 object-contain"
                        />
                        <p className="text-xl md:text-2xl font-black mt-4 text-center">
                            Security
                        </p>
                    </div>
                    {/* Flexibility */}
                    <div className="flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out">
                        <img
                            src={"/img/welcome/Flexible.png"}
                            alt="Flexibility"
                            className="w-24 h-24 md:w-32 md:h-32 object-contain"
                        />
                        <p className="text-xl md:text-2xl font-black mt-4 text-center">
                            Flexibility
                        </p>
                    </div>
                </div>
            </section>

            <Separator />

            {/* Developed By */}
            <section className="flex flex-col gap-4 py-12">
                <div className="text-center mb-10 px-4">
                    <p className="text-3xl sm:text-4xl md:text-5xl font-bold">
                        Learning platforms and services made by
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-8 px-4">
                    {[
                        {
                            image: "/img/programmer/Antony.jpg",
                            name: "Antony",
                            nim: "2602067773",
                            role: "Fullstack Developer",
                        },
                        {
                            image: "/img/programmer/Adit.jpg",
                            name: "Aditya",
                            nim: "2602113205",
                            role: "Fullstack Developer",
                        },
                        {
                            image: "/img/programmer/Karina.jpg",
                            name: "Karina",
                            nim: "2602099680",
                            role: "Fullstack Developer",
                        },
                        {
                            image: "/img/programmer/Charles.jpg",
                            name: "Charles",
                            nim: "2602117512",
                            role: "Fullstack Developer",
                        },
                    ].map((developer, index) => (
                        <Developer
                            key={index}
                            image={developer.image}
                            name={developer.name}
                            nim={developer.nim}
                            role={developer.role}
                        />
                    ))}
                </div>
            </section>

            <Separator />

            {/* Login Register Direct */}
            <section
                id="dash"
                className="py-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg"
            >
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <p className="text-2xl md:text-4xl font-semibold text-center mb-6">
                        Start delivering learning that impacts what matters
                        today.
                    </p>
                    {auth.user ? (
                        <a
                            href="/dashboard"
                            className="flex items-center bg-white text-blue-600 font-semibold py-3 px-6 md:px-8 rounded-lg shadow-lg transition-all hover:bg-blue-600 hover:text-white duration-300 ease-in-out"
                        >
                            <MdSpaceDashboard className="mr-2" />
                            Go to Dashboard
                        </a>
                    ) : (
                        <div className="flex space-x-4">
                            <a
                                href="/login"
                                className="flex items-center bg-white text-blue-600 font-semibold py-3 px-6 md:px-8 w-full rounded-lg shadow-lg transition-all hover:bg-blue-600 hover:text-white duration-300 ease-in-out"
                            >
                                <IoMdLogIn className="mr-2" />
                                Login
                            </a>
                            <a
                                href="/register"
                                className="flex items-center bg-white text-blue-600 font-semibold py-3 px-6 md:px-8 w-full rounded-lg shadow-lg transition-all hover:bg-blue-600 hover:text-white duration-300 ease-in-out"
                            >
                                <TfiWrite className="mr-2" />
                                Register
                            </a>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
