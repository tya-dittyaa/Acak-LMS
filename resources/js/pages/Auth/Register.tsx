import InputError from "@/components/default/InputError";
import InputLabel from "@/components/default/InputLabel";
import PrimaryButton from "@/components/default/PrimaryButton";
import TextInput from "@/components/default/TextInput";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>

            <div className="relative mt-6 flex items-center">
                <Separator className="flex-1" />
                <span className="relative z-10 bg-white px-4 text-sm text-gray-500">
                    Or register with
                </span>
                <Separator className="flex-1" />
            </div>

            <div className="mt-6 flex flex-col gap-2">
                <Button
                    className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                    onClick={() =>
                        (window.location.href = route(
                            "socialite.redirect",
                            "google"
                        ))
                    }
                >
                    <FaGoogle className="text-lg" />
                    <span>Continue with Google</span>
                </Button>

                <Button
                    className="flex items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
                    onClick={() =>
                        (window.location.href = route(
                            "socialite.redirect",
                            "github"
                        ))
                    }
                >
                    <FaGithub className="text-lg" />
                    <span>Continue with GitHub</span>
                </Button>
            </div>
        </>
    );
}
