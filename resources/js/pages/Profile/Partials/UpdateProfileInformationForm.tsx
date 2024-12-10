import InputError from "@/components/default/InputError";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { MdSave } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";

interface Props {
    mustVerifyEmail: boolean;
    passwordAvailable: boolean;
    status?: string;
    className?: string;
}

function WarningNotHavePassword() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center px-4 sm:px-8 md:px-16 h-full">
            <div className="flex flex-col gap-4 items-center text-center">
                <RiErrorWarningLine className="text-red-500 text-6xl" />
                <Label>
                    Please set a password before you can update your profile
                    information.
                </Label>
            </div>
        </div>
    );
}

function UpdateForm(props: Props) {
    const user = usePage().props.auth.user;

    const {
        data,
        setData,
        patch,
        post,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-2">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => {
                            setData("name", e.target.value);
                        }}
                        required
                        autoComplete="name"
                    />
                    <InputError message={errors.name} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        value={data.email}
                        onChange={(e) => {
                            setData("email", e.target.value);
                        }}
                        required
                        autoComplete="name"
                    />
                    <InputError message={errors.email} />
                </div>

                {props.mustVerifyEmail && user.email_verified_at === null && (
                    <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                            <span>Your email address is unverified. </span>
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="text-sm font-medium text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {props.status === "verification-link-sent" && (
                            <div className="text-sm font-medium text-green-600 dark:text-green-400 mt-2">
                                A new verification link has been sent to your
                                email.
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4 mt-4">
                <Button disabled={processing} className="w-full sm:w-auto">
                    <MdSave />
                    Save
                </Button>
                {recentlySuccessful && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Saved.
                    </p>
                )}
            </div>
        </form>
    );
}

export default function UpdateProfileInformationForm(props: Props) {
    return (
        <Card className="flex flex-col lg:h-full">
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                    Update your account's profile information and email address.
                </CardDescription>
                <Separator />
            </CardHeader>
            <CardContent className="flex flex-col gap-4 lg:h-full">
                <div className="flex flex-col gap-4 lg:h-full">
                    {props.passwordAvailable ? (
                        <UpdateForm {...props} />
                    ) : (
                        <WarningNotHavePassword />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
