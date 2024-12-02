import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthLayout from "@/layouts/Main/AuthLayout";
import { usePage } from "@inertiajs/react";
import Login from "./Login";
import Register from "./Register";

interface authProps {
    status?: string;
    canResetPassword: boolean;
}

export default function AuthForm(props: authProps) {
    const { url } = usePage();
    const currentTab = url.includes("register") ? "register" : "login";

    const handleTabChange = (tab: string) => {
        if (tab === "login") {
            window.location.href = "/login"; // Navigate to login page
        } else if (tab === "register") {
            window.location.href = "/register"; // Navigate to register page
        }
    };

    return (
        <AuthLayout>
            {/* Scrollable Card */}
            <Tabs
                value={currentTab}
                onValueChange={handleTabChange}
                className="w-full overflow-hidden"
            >
                <div className="w-full px-8 lg:px-28 overflow-y-auto h-full">
                    <Card className="w-full p-2 h-full overflow-y-auto">
                        <CardHeader>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Login</TabsTrigger>
                                <TabsTrigger value="register">
                                    Register
                                </TabsTrigger>
                            </TabsList>
                        </CardHeader>
                        <CardContent>
                            <TabsContent value="login">
                                <Login
                                    status={props.status}
                                    canResetPassword={props.canResetPassword}
                                />
                            </TabsContent>
                            <TabsContent value="register">
                                <Register />
                            </TabsContent>
                        </CardContent>
                    </Card>
                </div>
            </Tabs>
        </AuthLayout>
    );
}
