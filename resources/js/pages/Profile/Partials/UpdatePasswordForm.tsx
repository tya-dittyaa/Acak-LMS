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
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import { MdSave } from "react-icons/md";

interface Props {
    passwordAvailable: boolean;
}

function CreateForm() {
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        password: "",
        password_confirmation: "",
    });

    const insertPassword: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.create"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }
            },
        });
    };

    return (
        <form onSubmit={insertPassword} className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                        type="password"
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => {
                            setData("password", e.target.value);
                        }}
                        required
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="password_confirmation">
                        Confirm Password
                    </Label>
                    <Input
                        type="password"
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => {
                            setData("password_confirmation", e.target.value);
                        }}
                        required
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password_confirmation} />
                </div>
            </div>

            <div className="flex items-center gap-4">
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

function UpdateForm() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <form onSubmit={updatePassword} className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="current_password">Current Password</Label>
                    <Input
                        type="password"
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => {
                            setData("current_password", e.target.value);
                        }}
                        required
                        autoComplete="current-password"
                    />
                    <InputError message={errors.current_password} />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                        type="password"
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => {
                            setData("password", e.target.value);
                        }}
                        required
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="password_confirmation">
                        Confirm Password
                    </Label>
                    <Input
                        type="password"
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => {
                            setData("password_confirmation", e.target.value);
                        }}
                        required
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password_confirmation} />
                </div>
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

export default function UpdatePasswordForm(props: Props) {
    return (
        <Card className="flex flex-col lg:h-full">
            <CardHeader>
                <CardTitle>
                    {props.passwordAvailable
                        ? "Update Password"
                        : "Create Password"}
                </CardTitle>
                <CardDescription>
                    Ensure your account is using a long, random password to stay
                    secure.
                </CardDescription>
                <Separator />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    {props.passwordAvailable ? <UpdateForm /> : <CreateForm />}
                </div>
            </CardContent>
        </Card>
    );
}
