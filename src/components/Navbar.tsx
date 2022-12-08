import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, SetAuthContext } from "../context/AuthProvider";

export default function Navbar() {
    const auth = useContext(AuthContext);
    const setAuth = useContext(SetAuthContext);

    function logout() {
        setAuth!(null);
    }

    return (
        <nav className="flex justify-between items-center text-xl shadow-xl px-20 py-5">
            <ul className="flex items-center gap-5">
                <li className="font-bold font-serif text-2xl"><Link to={"/"}>YOLP</Link></li>
                <li className=""><Link to={"/restaurants"}>Restaurants</Link></li>
            </ul>
            <ul>
                {auth ? <button onClick={() => logout()}>Log out</button> : <li><Link to={"/login"}>Login</Link></li>}
            </ul>
        </nav>
    );
}