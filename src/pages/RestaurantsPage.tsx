import { useEffect, useState } from "react";
import YOLP_API from "../ApiConfig";
import Restaurant from "../models/Restaurant";
import LoadinPage from "./LoadingPage";
import '../index.css';
import { useNavigate } from "react-router-dom";

export default function RestaurantsPage() {
    const [restoList, setResto] = useState<Restaurant[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAllRestaurants();
    }, []);


    async function getAllRestaurants() {
        await YOLP_API.get("/restaurants").then((resp) => {
            setResto(resp.data);
        })
    }

    return (
        restoList
            ? <div>
                <h1 className="mt-40 font-bold text-7xl text-center">Restaurants</h1>
                <div className="grid grid-cols-3 place-items-center mt-20">
                    {restoList.map((r) => (
                        <ul className="flex flex-col items-center py-10 w-2/3 gap-10 rounded-2xl shadow-xl cursor-pointer ease-out hover:scale-125 duration-300" onClick={() => navigate(`/restaurant/${r.id}`)}>
                            <li><img className="p-10 restolist-img" src={r.img} alt="" /></li>
                            <li className="font-bold text-2xl">{r.name}</li>
                        </ul>
                    ))}
                </div>
            </div>
            : <LoadinPage />
    );
}