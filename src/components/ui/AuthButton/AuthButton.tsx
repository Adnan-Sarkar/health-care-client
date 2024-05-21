import {getUserInfo} from "@/services/auth.services";
import {Button} from "@mui/material";
import Link from "next/link";
import {useRouter} from "next/navigation";
import logoutUser from "@/services/actions/logoutUser";

const AuthButton = () => {
    const userInfo = getUserInfo();
    const router = useRouter();

    const handleLogout = () => {
        logoutUser(router);
    };

    return (
        <>
            {userInfo && userInfo.userId ? (
                <Button color="error" variant="contained" onClick={handleLogout}>
                    Logout
                </Button>
            ) : (
                <Button component={Link} href="/login">
                    Login
                </Button>
            )}
        </>
    );
};

export default AuthButton;
