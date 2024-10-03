import MainLayout from "@/Layouts/Main/MainLayout";
import Dev from "../Components/Developer";
import { AditJPG, KarinaJPG, AntonyJPG, CharlesJPG } from "@/assets/Programmer";
import { KanbanPNG } from "@/assets/Home";

export default function Home() {
    return (
        <MainLayout title="Home">
            <section>
                <div className="flex justify-center bg-gradient-to-r from-blue-800 to-cyan-500">
                    <div className="flex flex-col justify-center w-full space-y-10 my-10">
                        <div className="text-center text-5xl font-bold">
                            <p>ACAK LMS</p>
                            <p>Where Learning Meets Adventure</p>
                        </div>

                        <div className="text-center w-2/3 self-center text-3xl">
                            <p>
                                Whether you're learning solo or collaborating
                                with a team, ACAK LMS helps you track your
                                progress every step of the way. Organize tasks,
                                set goals, and watch your learning journey
                                unfold with the precision of a Kanban
                                board—built to support your unique learning
                                style.
                            </p>
                        </div>

                        {/* <button className="bg-red-600 w-1/12 self-center">
                            asd
                        </button> */}

                        <div className="self-center w-3/5">
                            <figure className="flex flex-row items-center justify-evenly">
                                <img
                                    className="bg-white rounded-full h-24 w-24"
                                    src="https://cdn.sanity.io/images/nosafynr/openlms-production/916f12c04371f5715aeb49b3b09e2f6e7fb27497-50x50.svg"
                                    alt=""
                                />
                                <img
                                    className="bg-white rounded-full h-48 w-48"
                                    src="https://cdn.sanity.io/images/nosafynr/openlms-production/547c14f220906e359a8a15584fa912e4d6bef390-50x50.svg"
                                    alt=""
                                />
                                <img
                                    className="rounded-full h-96 w-96"
                                    src="https://cdn.sanity.io/images/nosafynr/openlms-production/4bcb982156ef74b223bc6f4b82772ed4f612cb89-400x400.png"
                                    alt=""
                                />
                                <img
                                    className="bg-white rounded-full h-48 w-48"
                                    src="https://cdn.sanity.io/images/nosafynr/openlms-production/11ad98b31eedc751fac6d6873390ec3420724ab8-50x50.svg"
                                    alt=""
                                />
                                <img
                                    className="bg-white rounded-full h-24 w-24"
                                    src="https://cdn.sanity.io/images/nosafynr/openlms-production/cba43db80d5f5236d1e44c4d9d9054d69533ed8b-50x50.svg"
                                    alt=""
                                />
                            </figure>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="flex flex-col justify-center items-center">
                    <p className="text-5xl mb-10">
                        Learning platforms and services made by
                    </p>
                </div>
                <div className="flex flex-row justify-evenly ">
                    <Dev
                        image={AntonyJPG}
                        name={"Antony"}
                        nim={"2602067773"}
                        role={"AFK"}
                    />
                    <Dev
                        image={AditJPG}
                        name={"Adit"}
                        nim={"2602113205"}
                        role={"AFK"}
                    />
                    <Dev
                        image={KarinaJPG}
                        name={"Karina"}
                        nim={"2602099680"}
                        role={"AFK"}
                    />
                    <Dev
                        image={CharlesJPG}
                        name={"Charles"}
                        nim={"2602117512"}
                        role={"AFK"}
                    />
                </div>
            </section>

            <section className="flex py-16 px-8 bg-gradient-to-r from-cyan-500 to-blue-800 justify-center">
                <div className="flex flex-row w-2/3 items-center justify-around">
                    <div className="w-3/5">
                        <p className="text-5xl font-bold mb-4 text-center">
                            Why use ACAK LMS?
                        </p>
                        <p className="text-center text-xl">
                            Manage and Support Learning Experiences for Multiple
                            Organizations or Business Divisions Update, manage,
                            and provide training content across organizations
                            with a fully integrated multi-tenancy solution
                            within your LMS. Open LMS WORK makes it easy to
                            manage multiple training sites at once with secure,
                            streamlined deployment, letting you deliver courses
                            faster without sacrificing quality. Whether you need
                            multi-tenancy hosting or segmented reporting, Open
                            LMS WORK has you covered. Control your data with
                            powerful reports that limit information to shared
                            cohorts, shared courses, or shared profile field
                            values. Rely on our built-in ecommerce options or
                            opt into advanced alternatives via our extensive
                            partner network.
                        </p>
                    </div>
                    <img
                        src={KanbanPNG}
                        alt="LMS Features"
                        className="w-1/3 h-full"
                    />
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
