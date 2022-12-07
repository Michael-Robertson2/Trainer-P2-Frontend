import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center text-xl shadow-xl px-20 py-5">
            <ul className="flex items-center gap-5">
                <li className="font-bold font-serif text-2xl"><Link to={"/"}>YOLP</Link></li>
                <li className=""><Link to={"/restaurants"}>Restaurants</Link></li>
            </ul>
            <ul>
                <li><Link to={"/login"}>Login</Link></li>
            </ul>
        </nav>
    );
}