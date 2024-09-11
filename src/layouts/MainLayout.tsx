import { } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";


const MainLayout = () => {
    console.log("layout")
    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    );
}

export default MainLayout;