import { Box, Stack } from "@mui/material";
import Banner from "../../components/Auth/Banner";
import LoginPage from "./LoginPage";
import { useState } from "react";
import RegisterPage from "./RegisterPage";
import TwoFactorAuth from "./TwoFactorAuth";


interface AuthPageProps {
    formType: 'login' | 'register' | '2FA';
}

function AuthPageContainer({ formType }: AuthPageProps) {

    const [form, setForm] = useState<'login' | 'register' | '2FA'>(formType);
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
        // <Container maxWidth="lg" >
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
        </Box>
        // </Container>
    );
}

export default AuthPageContainer;


