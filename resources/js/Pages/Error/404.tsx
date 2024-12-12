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

interface Props extends PageProps {}

export default function Error404(props: Props) {
    return (
        <MainLayout auth={props.auth} title="404" hasPadding>
            <div className="flex flex-col gap-4 md:gap-8">
                <div className="flex flex-col gap-5">
                    <NotFoundPathBreadcrumb />

                    <div className="flex items-center gap-3">
                        <MdErrorOutline className="size-6 md:size-7" />

                        <h1 className="scroll-m-20 text-xl font-bold tracking-tight md:text-2xl">
                            404 - Page Not Found
                        </h1>
                    </div>

                    <Separator />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Error 404: Page Not Found</CardTitle>
                        <CardDescription>
                            Sorry, the page you are looking for cannot be found.
                        </CardDescription>
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
