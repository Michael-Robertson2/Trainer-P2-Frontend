import { error } from "console";
import { useState, useContext, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, SetAuthContext } from "../context/AuthProvider";
import "../index.css";
import Auth from "../models/Auth";
import YOLP_API from "../utils/ApiConfig";
import { passwordRegex, usernameRegex } from "../utils/regex";

export default function SignupPage() {
    const navigate = useNavigate();
    const setAuth = useContext(SetAuthContext);
    const [pwd, setPwd] = useState<string>("");
    const [pwd2, setPwd2] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [pwdError, setPwdError] = useState<boolean>(false);
    const [samePwdError, setSamePwdError] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [conflicUsername, setConflicUsername] = useState<boolean>(false);

    async function login() {
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
            .catch((e) => console.log(e));
    }

    async function submit(e: FormEvent) {
        e.preventDefault();

        if (usernameRegex.test(username)) {
            setUsernameError(false);
            if (passwordRegex.test(pwd)) {
                setPwdError(false);
                if (pwd === pwd2) {
                    setSamePwdError(false);
                    await YOLP_API.post("/users", {
                        username: username,
                        password1: pwd,
                        password2: pwd2
                    }).then(() => {
                        setConflicUsername(false);
                        login();
                    }).catch((e) => {
                        let statusCode: number = e.response.status;
                        statusCode === 409 ? setConflicUsername(true) : setConflicUsername(false)
                    });
                } else {
                    setSamePwdError(true);
                    return;
                }
            } else {
                setPwdError(true);
                return;
            }
        } else {
            setUsernameError(true);
            return;
        }
    }

    return (
        <div className="flex justify-center">
            <img className="singup-img border-8 border-slate-100 shadow-2xl m-5 p-5 rounded-lg" src="https://static.vecteezy.com/system/resources/previews/002/056/881/original/white-marble-with-dark-blue-alcohol-ink-background-free-vector.jpg" alt="" />
            <form className="absolute backdrop-blur-xl rounded-m top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center" onSubmit={(e) => submit(e)}>
                <div className="flex flex-col items-center gap-7 shadow-xl rounded-xl px-10 py-16">
                    <h1 className="font-serif font-bold text-black text-4xl">REGISTER ACCOUNT</h1>

                    <div className="flex flex-col gap-2">
                        <input className="shadow-xl rounded-md px-5 py-2 mt-10 focus:scale-110 duration-300 ease-out" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        {usernameError && <label className="text-red-500 text-center">Username needs to be 8-20 characters long</label>}
                        {conflicUsername && <label className="text-red-500 text-center">Username is already taken</label>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <input className="shadow-xl rounded-md px-5 py-2 focus:scale-110 duration-300 ease-out" type="password" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} required />
                        {pwdError && <label className="text-red-500 text-center">Minimum eight characters, <br/> at least one uppercase letter <br/> at least one letter, <br/> at least one number and one special character</label>}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <input className="shadow-xl rounded-md px-5 py-2 focus:scale-110 duration-300 ease-out" type="password" placeholder="Confirm Password" value={pwd2} onChange={(e) => setPwd2(e.target.value)} required />
                        {samePwdError && <label className="text-red-500 text-center">Password do not match</label>}
                    </div>

                    <button className="bg-slate-300 rounded-md text-black font-bold mt-2 px-5 py-2 ease-out duration-300 hover:scale-125 shadow-xl">SIGN UP</button>
                    <Link to={"/login"} className="text-blue-700 font-bold underline">Already have an account?</Link>
                </div>
            </form>
        </div>
    );
}