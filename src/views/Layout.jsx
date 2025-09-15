import Header from "@/components/header/Header.jsx";
import Footer from "@/components/footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import PlayerBar from "@/components/music/PlayerBar.jsx";

const Layout = () => {
    return (
        <>
            <Header />
            <PlayerBar />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Layout;