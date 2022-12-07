import { FormEvent, useState } from "react";
import YOLP_API from "../ApiConfig";

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

    async function submit(e: FormEvent) {
        e.preventDefault();

        await YOLP_API.post("/auth", {
            username: username,
            password: pwd,
        }).then((resp) => {
            setError("");
            console.log(resp);
        })
            .catch((e) => setError(e.response.data.message));

        setUsername("");
        setPwd("");
    }

    return (
        <form className="flex justify-center items-center" onSubmit={(e) => submit(e)}>
            <div className="flex flex-col items-center gap-7 shadow-xl rounded-xl mt-40 px-10 py-16">
                <h1 className="font-serif font-bold text-5xl">LOGIN</h1>
                <input className="bg-blue-100 shadow-xl rounded-md px-5 py-2" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className="bg-blue-100 shadow-xl rounded-md px-5 py-2" type="password" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                {error ? <p className="text-red-500">{error}</p> : null}
                <button className="bg-slate-700 rounded-md text-white mt-2 px-5 py-2 ease-out duration-300 hover:scale-125">LOGIN</button>
            </div>
        </form>
    );
}