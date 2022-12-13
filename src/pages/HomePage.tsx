import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import "../index.css";

export default function HomePage() {
    const navigate = useNavigate();
    return (
        <div>
            <img className="home-background" src="https://media.architecturaldigest.com/photos/5d2c9e26ae81990009f6429f/16:9/w_2560%2Cc_limit/TAK%2520Room_by%2520Adrian%2520Gaut.jpg" alt="" />
            <button className="welcome-to-yolp absolute bg-white px-10 py-5 font-bold text-5xl font-serif top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:bg-gradient-to-r hover:from-slate-700 hover:to-cyan-700 hover:text-white hover:scale-110 ease-out duration-1000" onClick={() => navigate("/restaurants")}>Welcome To Yolp</button>
        </div>
    );
}