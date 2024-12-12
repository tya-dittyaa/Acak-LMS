import { Button } from "@/components/ui/button";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function UserJoinTeam() {
    return (
        <Button className="w-full gap-4 justify-center items-center">
            <IoMdAddCircleOutline />
            Join Team
        </Button>
    );
}
