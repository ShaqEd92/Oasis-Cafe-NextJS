import NavigationBar from "../ui/navigation-bar"

const Layout = ({children}) => {
    return (
        <>
            <NavigationBar />
            {children}
        </>
    )
};

export default Layout;
