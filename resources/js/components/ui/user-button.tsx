import { LuLogOut } from "react-icons/lu";
import { Button } from "./button";

function LoginButton() {
    return (
        <Button onClick={() => (window.location.href = route("login"))}>
            Login
        </Button>
    );
}

function LogoutButton() {
    return (
        <Button
            onClick={() => (window.location.href = route("logout"))}
            className="w-full gap-4 justify-center items-center"
        >
            <LuLogOut />
            Logout
        </Button>
    );
}

export { LoginButton, LogoutButton };
