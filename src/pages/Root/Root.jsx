import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar"
import classes from "./Root.module.css"
function RootLayout(){
    return (
        <>
          <Navbar />
          <main className={classes.content}>
            <Outlet />
          </main>
        </>
        
    );
}

export default RootLayout;
