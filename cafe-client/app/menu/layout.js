import NavigationBar from "../navigation-bar"

const Layout = ({children}) => {
    return (
        <>
            <NavigationBar />
            {children}
        </>
    )
};

export default Layout;
