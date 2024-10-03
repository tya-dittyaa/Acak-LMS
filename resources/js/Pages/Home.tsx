import MainLayout from "@/Layouts/Main/MainLayout";
import backGround from "./assets/VectorImage.png";
import Dev from "../Components/Developer";

export default function Home() {
    return (
        <MainLayout title="Home">
            <section>
                <div className="flex flex-row items-center justify-evenly bg-gradient-to-r from-cyan-500 to-blue-500">
                    <div
                        className="flex h-96 w-96 opacity-40"
                        style={{
                            backgroundImage: `url(${backGround})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>

                    <div className="flex flex-col w-1/5 space-y-16">
                        <div className="min-w-fit text-center text-4xl">
                            <p>
                                ACAK LMS <br /> Your Unique Learning Experience
                                <br /> Learning Adventure Starts Here
                            </p>
                        </div>

                        {/* <div className="w-auto text-center">
                            <p>
                                Frustrated with rigid, overpriced learning
                                platforms? Discover a fully adaptable,
                                open-source LMS designed to meet your specific
                                needs, giving you complete control over your
                                learning environment.
                            </p>
                        </div>

                        <div className="w-auto text-center">
                            <p>
                                With 24/7 expert support, top-tier security, and
                                effortless scalability, our platform evolves
                                with your needs—crafted with care by a dedicated
                                team of professionals!
                            </p>
                        </div> */}
                    </div>

                    <div
                        className="flex h-96 w-96 opacity-40"
                        style={{
                            backgroundImage: `url(${backGround})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>
                </div>
            </section>

            <section>
                <div className="flex flex-col justify-center items-center">
                    <p className="text-5xl">
                        Learning platforms and services made by
                    </p>
                </div>
                <div className="flex flex-row justify-evenly">
                    <Dev image={backGround} name={"Antony"} role={"Komti"} />
                    <Dev image={backGround} name={"Adit"} role={"Back-End"} />
                    <Dev
                        image={backGround}
                        name={"Karina"}
                        role={"Front-End"}
                    />
                    <Dev image={backGround} name={"Charles"} role={"DBA"} />
                </div>
            </section>

            <section className="py-16 px-8 bg-gray-100">
                <div className="text-center">
                    <p className="text-3xl font-bold mb-4">Why use ACAK LMS?</p>
                    <p className="text-lg mb-4">Uvuvewwevwve</p>
                    {/* <img src=Image URL here alt="LMS Features" className="w-full h-auto"/> */}
                </div>
            </section>

            <section className="flex items-center justify-center py-12 bg-blue-50">
                <p className="text-2xl font-semibold">
                    Don’t have an account?{" "}
                    <a href="#" className="text-blue-500 underline">
                        Sign Up Now
                    </a>{" "}
                    <a href="#" className="text-blue-500 underline">
                        Login
                    </a>
                </p>
            </section>
        </MainLayout>
    );
}
