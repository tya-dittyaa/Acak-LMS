export default function FooterLayout() {
    return (
        <footer className="text-center text-gray-650 p-4 border-t">
            <div>
                <p className="text-sm">
                    Copyright ©️ {new Date().getFullYear()} -{" "}
                    <b>ACAK Development</b>. All rights reserved.
                </p>
                <p className="text-xs">
                    COMP6821001 - Web Programming - Class LA08 - Group 3
                </p>
            </div>
        </footer>
    );
}
