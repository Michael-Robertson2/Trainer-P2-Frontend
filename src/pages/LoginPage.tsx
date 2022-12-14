import { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import YOLP_API from "../utils/ApiConfig";
import { SetAuthContext } from "../context/AuthProvider";
import Auth from "../models/Auth";
import "../index.css";

/* 
    State is a built-in React object that is used to contain data or information about the component. 
    A component’s state can change over time; whenever it changes, the component re-renders. 
    The change in state can happen as a response to user action or system-generated events and these changes determine the behavior of the component and how it will render.  

    Hooks are functions that let you “hook into” React state and lifecycle features from function components. 
 */
export default function LoginPage() {
    // essentially variables
    const [username, setUsername] = useState<string>(""); // useState is a hook
    const [pwd, setPwd] = useState<string>("");
    const [error, setError] = useState<string>("");
    const setAuth = useContext(SetAuthContext);
    const navigate = useNavigate();

    async function submit(e: FormEvent) {
        e.preventDefault();

        await YOLP_API.post("/auth", {
            username: username,
            password: pwd,
        }).then((resp) => {
            let auth = new Auth(resp.data.id, resp.data.username, resp.data.role, resp.data.token);
            // save auth user into session storage
            window.sessionStorage.setItem("auth", JSON.stringify(auth));
            setAuth!(auth);
            navigate("/");
        })
            .catch((e) => setError(e.response.data.message));

        setUsername("");
        setPwd("");
    }

    return (
        <div className="flex justify-center">
            <img className="login-img | m-5 p-5 | border-8 border-slate-100 | shadow-2xl rounded-lg" src="https://static.vecteezy.com/system/resources/previews/006/554/439/original/marble-with-golden-texture-background-illustration-free-vector.jpg" alt="" />
            
            <form className="absolute backdrop-blur-xl rounded-m top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center" onSubmit={(e) => submit(e)}>
                <div className="flex flex-col items-center gap-7 shadow-xl rounded-xl px-10 py-16">
                    <h1 className="font-serif font-bold text-black text-5xl">LOGIN</h1>
                    <input className="shadow-xl rounded-md px-5 py-2 mt-10 focus:scale-110 duration-300 ease-out" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input className="shadow-xl rounded-md px-5 py-2 focus:scale-110 duration-300 ease-out" type="password" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                    {error ? <p className="text-red-500">{error}</p> : null}
                    <button className="bg-slate-300 rounded-md text-black font-bold mt-2 px-5 py-2 ease-out duration-300 hover:scale-125 shadow-xl">LOGIN</button>
                    <Link to={"/signup"} className="text-blue-700 font-bold underline">Create new account</Link>
                </div>
            </form>
        </div>
    );
}