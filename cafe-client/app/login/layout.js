import LoginWallpaper from "../ui/login-wallpaper";

const Layout = ({ children }) => {
    return (
        <div className="sign-in-page">
            <LoginWallpaper />
            {children}
        </div>
    );
};

export default Layout;
