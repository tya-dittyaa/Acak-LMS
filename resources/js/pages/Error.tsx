import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { NotFoundPathBreadcrumb } from "@/components/ui/path-breadcrumb";
import { Separator } from "@/components/ui/separator";
import MainLayout from "@/layouts/Main/HomeLayout";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { MdErrorOutline } from "react-icons/md";

interface Props extends PageProps {
    status: number;
}

export default function Error(props: Props) {
    const { status, auth } = props;

    const errorMessages: Record<
        number,
        { title: string; description: string }
    > = {
        401: {
            title: "401: Unauthorized",
            description: "Sorry, you are not authorized to access this page.",
        },
        403: {
            title: "403: Forbidden",
            description: "Sorry, you are not authorized to access this page.",
        },
        404: {
            title: "404: Page Not Found",
            description:
                "Sorry, the page you are looking for could not be found.",
        },
        419: {
            title: "419: Page Expired",
            description:
                "Sorry, your session has expired. Please refresh and try again.",
        },
        500: {
            title: "500: Server Error",
            description: "Whoops, something went wrong on our servers.",
        },
        503: {
            title: "503: Service Unavailable",
            description:
                "Sorry, we are doing some maintenance. Please check back soon.",
        },
    };

    const { title, description } = errorMessages[status] || {
        title: "Error",
        description: "An unexpected error has occurred.",
    };

    return (
        <MainLayout auth={auth} title={title} hasPadding>
            <div className="flex flex-col gap-4 md:gap-8">
                <div className="flex flex-col gap-5">
                    <NotFoundPathBreadcrumb />

                    <div className="flex items-center gap-3">
                        <MdErrorOutline className="size-6 md:size-7" />
                        <h1 className="scroll-m-20 text-xl font-bold tracking-tight md:text-2xl">
                            {title}
                        </h1>
                    </div>

                    <Separator />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <blockquote className="border-l-2 pl-6 italic">
                            <ul className="ml-6 list-disc [&>li]:mt-2">
                                <li>
                                    The link you followed might be broken, or
                                    the page may have been deleted.
                                </li>
                                <li>
                                    Go back to the previous page and try again,
                                    or go to the homepage.
                                </li>
                            </ul>
                        </blockquote>
                    </CardContent>
                    <CardFooter className="gap-3">
                        <Button asChild>
                            <Link href="/">Homepage</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </MainLayout>
    );
}
