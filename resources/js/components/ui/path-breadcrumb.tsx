import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

// Extend the PageProps type to include 'currentPath'
interface CustomPageProps extends PageProps {
    currentPath: string;
}

function PathBreadcrumb() {
    const { currentPath } = usePage<CustomPageProps>().props;
    const pathSegments = currentPath.split("/").filter(Boolean);

    // Capitalize the first letter of each segment and display the full segment
    const capitalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <Breadcrumb>
            <BreadcrumbList className="text-xs">
                {/* Home Link */}
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                {/* Display Breadcrumb for 1 segment */}
                {pathSegments.length === 1 && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {capitalize(pathSegments[0])}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                )}

                {/* Display Breadcrumb for 2 segments */}
                {pathSegments.length === 2 && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/${pathSegments[0]}`}>
                                {capitalize(pathSegments[0])}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {capitalize(pathSegments[1])}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                )}

                {/* Display Breadcrumb for 3 or more segments with ellipsis and dropdown */}
                {pathSegments.length >= 3 && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1">
                                    <BreadcrumbEllipsis className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {/* Dropdown for all middle segments (now including the first one) */}
                                    {pathSegments
                                        .slice(0, -1)
                                        .map((segment, index) => (
                                            <DropdownMenuItem key={index}>
                                                <BreadcrumbLink
                                                    href={`/${pathSegments
                                                        .slice(0, index + 1)
                                                        .join("/")}`}
                                                    className="h-full w-full text-xs"
                                                >
                                                    {capitalize(segment)}
                                                </BreadcrumbLink>
                                            </DropdownMenuItem>
                                        ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {capitalize(
                                    pathSegments[pathSegments.length - 1]
                                )}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

function NotFoundPathBreadcrumb() {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Not Found</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}

function ServerErrorPathBreadcrumb() {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Server Error</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}

function UnauthorizedPathBreadcrumb() {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Unauthorized</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export {
    NotFoundPathBreadcrumb,
    PathBreadcrumb,
    ServerErrorPathBreadcrumb,
    UnauthorizedPathBreadcrumb,
};
