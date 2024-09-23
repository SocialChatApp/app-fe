import { Box, Stack } from "@mui/material";
import Banner from "../../components/Auth/Banner";
import LoginPage from "./LoginPage";
import { useEffect, useState } from "react";
import RegisterPage from "./RegisterPage";
import TwoFactorAuth from "./TwoFactorAuth";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


function AuthPageContainer() {

    const { authPage } = useSelector((store: RootState) => store.auth)

    useEffect(() => {
        setForm(authPage);
    }, [authPage]);


    const [form, setForm] = useState<'login' | 'register' | '2FA'>(authPage);
    const renderForm = () => {
        switch (form) {
            case 'login':
                return <LoginPage setForm={setForm} />;
            case 'register':
                return <RegisterPage setForm={setForm} />;
            case '2FA':
                return <TwoFactorAuth setForm={setForm} />;
            default:
                return <LoginPage setForm={setForm} />;

        }
    }
    return (
        <Box >
            <Box width={"90%"} justifyContent="center" alignContent="center">
                <Stack direction="row" spacing={{ xs: 1, sm: 2 }} justifyContent="center" alignItems="center">
                    <Box width="50%" visibility={{ xs: "hidden", sm: "visible" }}>
                        <Banner />
                    </Box>
                    <Box width={{ xs: "100%", sm: "50%" }}>
                        {renderForm()}
                    </Box>
                </Stack>
            </Box>
            <Footer />
        </Box>
    );
}

export default AuthPageContainer;


