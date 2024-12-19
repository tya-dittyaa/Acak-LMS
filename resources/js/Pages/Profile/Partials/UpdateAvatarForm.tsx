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
import { UserAvatarSession } from "@/components/ui/user-avatar";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import {
    MdOutlineDeleteOutline,
    MdOutlineSystemUpdateAlt,
} from "react-icons/md";

function UpdateForm() {
    const avatarInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        delete: remove,
        processing,
        recentlySuccessful,
    } = useForm<{ avatar: File | null }>({
        avatar: null,
    });

    const updateAvatar: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("profile.avatar.update"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                if (avatarInput.current) {
                    avatarInput.current.value = "";
                }
            },
            onError: (errors) => {
                if (errors.avatar) {
                    reset("avatar");
                    if (avatarInput.current) {
                        avatarInput.current.value = "";
                    }
                }
            },
        });
    };

    const deleteAvatar = () => {
        remove(route("profile.avatar.delete"), {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={updateAvatar} className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <Label htmlFor="avatar">Profile Picture</Label>
                <Input
                    type="file"
                    id="avatar"
                    ref={avatarInput}
                    onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        setData("avatar", file);
                    }}
                />
                <InputError message={errors.avatar} />
            </div>
            <div className="flex felx-row gap-4 w-full">
                <Button type="submit" className="w-1/2" disabled={processing}>
                    <MdOutlineSystemUpdateAlt />
                    Update
                </Button>
                <Button
                    type="button"
                    variant={"destructive"}
                    onClick={deleteAvatar}
                    disabled={processing}
                    className="w-1/2"
                >
                    <MdOutlineDeleteOutline />
                    Delete
                </Button>
            </div>
        </form>
    );
}

export default function UpdateAvatarForm() {
    const user = usePage().props.auth.user;

    return (
        <Card className="flex flex-col lg:h-full">
            <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Update your profile picture.</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <UserAvatarSession
                        user={user}
                        className="h-28 w-28 rounded-lg"
                    />
                    <UpdateForm />
                </div>
            </CardContent>
        </Card>
    );
}
