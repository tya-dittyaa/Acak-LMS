import MainLayout from "@/Layouts/Main/MainLayout";
import backGround from "./assets/VectorImage.png";

export default function Home() {
    return (
        <MainLayout title="Home">
            <section>
                <div className="flex flex-row items-center justify-center border p-5 space-x-16 bg-gradient-to-r from-cyan-500 to-blue-500">
                    <div
                        className="flex h-96 w-96 opacity-40"
                        style={{
                            backgroundImage: `url(${backGround})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>

                    <div className="flex flex-col w-1/5 space-y-16">
                        <div className="min-w-fit text-center text-5xl">
                            <p>
                                ACAK LMS <br /> Your Unique Learning Experience
                                <br /> Learning Adventure Starts Here
                            </p>
                        </div>

                        <div className="w-auto text-center">
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
                        </div>
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
                <p>Learning platforms and services made by</p>
            </section>
        </MainLayout>
    );
}
