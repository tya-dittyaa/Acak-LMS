import Developer from "@/Components/Developer";
import MainLayout from "@/Layouts/Main/MainLayout";
import {
    IntroPNG,
    ScalablePNG,
    SecurePNG,
    FlexiblePNG,
    GIF1,
    GIF2,
    GIF3,
} from "@/assets/Home";
import { AntonyJPG, AditJPG, CharlesJPG, KarinaJPG } from "@/assets/Programmer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";

const Home = () => {
    useEffect(() => {
        if (window.location.hash) {
            window.scrollTo(0, 0);
        }
    }, []);

    useEffect(() => {
        const words = ["Partners", "Members", "People"];
        let currentIndex = 0;

        const changeWord = () => {
            const wordElement = document.getElementById(
                "changing-word"
            ) as HTMLSpanElement;
            wordElement.classList.remove("typing");
            wordElement.textContent = "";

            const word = words[currentIndex];
            let i = 0;

            wordElement.classList.add("typing");

            const typingInterval = setInterval(() => {
                wordElement.textContent += word[i];
                i++;

                if (i === word.length) {
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        currentIndex = (currentIndex + 1) % words.length;
                        changeWord();
                    }, 2000);
                }
            }, 100);
        };

        changeWord();
    }, []);

    return (
        <>
            <style>{`
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
            <MainLayout title="Home">
                {/* Intro Section */}
                <section className="flex flex-row justify-center items-center">
                    <div className="flex flex-col justify-center space-y-16">
                        <div className="flex flex-col justify-center">
                            <p className="font-black text-7xl">
                                Where your{" "}
                                <span
                                    id="changing-word"
                                    className="typing text-blue-500"
                                ></span>
                            </p>{" "}
                            <p className="font-black text-7xl">
                                learn. How your
                            </p>
                            <p className="font-black text-7xl">
                                progress results.
                            </p>
                            <br />
                            <p className="text-xl">
                                Empower your teams with ACAK LMS to deliver
                                engaging learning experiences
                            </p>
                            <p className="text-xl">
                                that drive performance, boost retention, and
                                fuel growth. Unlock the potential of
                            </p>
                            <p className="text-xl">
                                every learner with a platform designed for
                                lasting impact.
                            </p>
                        </div>

                        <a
                            href="#dash"
                            className="w-3/5 bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all hover:bg-blue-600 hover:text-white duration-300 ease-in-out"
                        >
                            Login
                        </a>
                    </div>

                    <div className="animate-slideUp">
                        <img src={IntroPNG} alt="Intro" />
                    </div>
                </section>

                {/* Offerings Directory */}
                <section className="flex justify-center items-center mt-8 flex-col pt-10 pb-10">
                    <p className="text-6xl font-black">Benefit Offerings</p>
                    <div className="flex flex-row mt-16 space-x-24">
                        <div className="flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out">
                            <img
                                src={ScalablePNG}
                                alt="Scalability"
                                className="w-96"
                            />
                            <p className="text-4xl font-black mt-7">
                                Scalability
                            </p>
                        </div>
                        <div className="flex flex-col items-center pl-36 hover:scale-105 transition-transform duration-300 ease-in-out">
                            <img
                                src={SecurePNG}
                                alt="Security"
                                className="w-7/12"
                            />
                            <p className="text-4xl font-black mt-7">Security</p>
                        </div>
                        <div className="flex flex-col items-center pl-4 hover:scale-105 transition-transform duration-300 ease-in-out">
                            <img
                                src={FlexiblePNG}
                                alt="Flexibility"
                                className="w-7/12"
                            />
                            <p className="text-4xl font-black mt-7">
                                Flexibility
                            </p>
                        </div>
                    </div>
                </section>

                {/* Developed By */}
                <section className="mt-12">
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-6xl mb-10">
                            Learning platforms and services made by
                        </p>
                    </div>
                    <div className="flex flex-row justify-evenly ">
                        <Developer
                            image={AntonyJPG}
                            name={"Antony"}
                            nim={"2602067773"}
                            role={"AFK"}
                        />
                        <Developer
                            image={AditJPG}
                            name={"Adit"}
                            nim={"2602113205"}
                            role={"AFK"}
                        />
                        <Developer
                            image={KarinaJPG}
                            name={"Karina"}
                            nim={"2602099680"}
                            role={"AFK"}
                        />
                        <Developer
                            image={CharlesJPG}
                            name={"Charles"}
                            nim={"2602117512"}
                            role={"AFK"}
                        />
                    </div>
                </section>

                {/* NewsLetter Image Slider Section */}
                <section className="mt-16 py-16">
                    <div className="text-center mb-10">
                        <p className="text-6xl font-bold">Our Latest Updates</p>
                        <p className="text-2xl mt-4">
                            Check out the latest from our platform!
                        </p>
                    </div>

                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation
                        loop
                        className="w-3/4 mx-auto"
                    >
                        <SwiperSlide>
                            <div className="flex justify-center items-center space-x-8">
                                <img
                                    src={GIF1}
                                    alt="News 1"
                                    className="w-11/12 object-cover rounded-lg"
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex justify-center items-center space-x-8">
                                <img
                                    src={GIF2}
                                    alt="News 2"
                                    className="w-11/12 object-cover rounded-lg"
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex justify-center items-center space-x-8">
                                <img
                                    src={GIF3}
                                    alt="News 3"
                                    className="w-11/12 object-cover rounded-lg"
                                />
                            </div>
                        </SwiperSlide>
                    </Swiper>

                    {/* Login Register Direct */}
                    <section id="dash" className="mt-16">
                        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-cyan-500 py-20 rounded-lg">
                            <p className="text-4xl font-semibold mb-6 text-center">
                                Start delivering learning that impacts what
                                matters today.
                            </p>
                            <a
                                href={"/dashboard"}
                                className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all hover:bg-blue-600 hover:text-white duration-300 ease-in-out"
                            >
                                Go to Dashboard
                            </a>
                        </div>
                    </section>
                </section>
            </MainLayout>
        </>
    );
};

export default Home;
