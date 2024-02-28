import LoginWallpaper from "../ui/login-wallpaper";

const Page = ({ children }) => {
    return (
        <div className="sign-in-page">
            <LoginWallpaper />
            {children}
        </div>
    );
};

export default Page;
