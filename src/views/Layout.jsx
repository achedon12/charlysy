import Header from "@/components/header/Header.jsx";
import Footer from "@/components/footer/Footer.jsx";
import {Outlet} from "react-router-dom";
import PlayerBar from "@/components/music/PlayerBar.jsx";

const Layout = () => {
    return (
        <>
            <Header />
            <PlayerBar />
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;