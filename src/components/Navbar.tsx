import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext, SetAuthContext } from "../context/AuthProvider";
import { UserIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
    const auth = useContext(AuthContext);
    const setAuth = useContext(SetAuthContext);
    const [dropdown, setDropDown] = useState<boolean>(false);

    function logout() {
        window.sessionStorage.removeItem("auth");
        setAuth!(null);
    }

    return (
        <nav className="flex justify-between items-center text-xl shadow-xl px-20 py-5">
            <ul className="flex items-center gap-5">
                <li className="font-bold font-serif text-2xl"><Link to={"/"}>YOLP</Link></li>
                <li className=""><Link to={"/restaurants"}>Restaurants</Link></li>
            </ul>
            <ul>
                {
                    auth
                        ? <div className="flex items-center gap-3 cursor-pointer" onClick={() => setDropDown(!dropdown)}>
                            <UserIcon className="w-7" />{auth.username}
                            {dropdown && <button className="absolute translate-y-16 translate-x-10 bg-red-700 rounded-xl text-white px-5 py-2" onClick={() => logout()}>Log out</button>}
                        </div>
                        : <li className="bg-green-600 text-white rounded-xl px-5 py-2"><Link to={"/login"}>Login</Link></li>
                }
            </ul>
        </nav>
    );
}