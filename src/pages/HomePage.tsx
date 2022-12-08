import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Auth from "../models/Auth";

export default function HomePage() {
    const auth = useContext(AuthContext);

    return (
        <div>
            <h1 className="text-center font-bold text-5xl font-serif font- pt-40">Welcome To Yolp</h1>
        </div>
    );
}