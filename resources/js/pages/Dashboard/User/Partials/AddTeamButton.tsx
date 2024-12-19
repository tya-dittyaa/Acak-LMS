import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UserModalTeam from "@/layouts/Header/UserModalTeam";
import { PlusIcon } from "lucide-react";

const AddTeamButton: React.FC = () => {
    return (
        <Card className="w-full justify-center items-center flex flex-col">
            <CardContent className="flex flex-col justify-center items-center mt-6 p-0">
                <UserModalTeam
                    triggerButton={
                        <Button
                            variant="ghost"
                            className="flex flex-col justify-center items-center gap-2 w-full h-full p-6"
                        >
                            <PlusIcon className="rounded-sm w-7 h-7" />
                            <p className="text-gray-600">
                                Join or create a new team
                            </p>
                        </Button>
                    }
                />
            </CardContent>
        </Card>
    );
};

export default AddTeamButton;
