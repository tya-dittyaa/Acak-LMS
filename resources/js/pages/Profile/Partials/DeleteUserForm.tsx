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
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";

interface Props {
    passwordAvailable: boolean;
}

function WarningNotHavePassword() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center px-4 sm:px-8 md:px-16 h-full">
            <div className="flex flex-col gap-4 items-center text-center">
                <RiErrorWarningLine className="text-red-500 text-6xl" />
                <Label>
                    Please set a password before you can delete your account.
                </Label>
            </div>
        </div>
    );
}

function DeleteModal() {
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <form onSubmit={deleteUser} className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="password">
                        Enter your password to confirm
                    </Label>
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
            </div>

            <div className="flex items-center gap-4">
                <Button
                    disabled={processing}
                    className="w-full sm:w-auto"
                    variant={"destructive"}
                >
                    <MdOutlineDeleteOutline />
                    Delete Account
                </Button>
            </div>
        </form>
    );
}

export default function DeleteUserForm(props: Props) {
    return (
        <Card className="flex flex-col lg:h-full">
            <CardHeader>
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Please enter your password to
                    confirm you would like to permanently delete your account.
                </CardDescription>
                <Separator />
            </CardHeader>
            <CardContent className="flex flex-col gap-4 h-full">
                <div className="flex flex-col gap-4 h-full">
                    {props.passwordAvailable ? (
                        <DeleteModal />
                    ) : (
                        <WarningNotHavePassword />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
