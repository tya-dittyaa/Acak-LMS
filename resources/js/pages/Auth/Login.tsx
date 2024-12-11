import Checkbox from "@/components/default/Checkbox";
import InputError from "@/components/default/InputError";
import InputLabel from "@/components/default/InputLabel";
import PrimaryButton from "@/components/default/PrimaryButton";
import TextInput from "@/components/default/TextInput";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
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
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>

            <div className="relative mt-6 flex items-center">
                <Separator className="flex-1" />
                <span className="relative z-10 bg-white px-4 text-sm text-gray-500">
                    Or continue with
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
