import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarIcon } from '@heroicons/react/24/solid';
import YOLP_API from "../utils/ApiConfig";
import Restaurant from "../models/Restaurant";
import LoadinPage from "./LoadingPage";
import '../index.css';
import Review from "../models/Review";

export default function RestaurantsPage() {
    const [restoList, setResto] = useState<Restaurant[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAllRestaurants();
    }, []);

    function getAvgRating(review: Review[]): number | string {
        let rating: number = 0;
        if (review.length < 1) return "No reviews yet...";
        for (let i = 0; i < review.length; i++) {
            rating += review[i].rating;
        }
        rating /= review.length;
        return Math.round(rating * 100) / 100;
    }

    async function getAllRestaurants() {
        await YOLP_API.get("/restaurants").then((resp) => {
            setResto(resp.data);
        })
    }

    return (
        restoList
            ? <div>
                <h1 className="font-serif italic font-bold text-7xl text-center | mt-40">RESTAURANTS</h1>
                <div className="grid grid-cols-3 place-items-center | mt-32">
                    {restoList.map((r) => (
                        <ul className="flex flex-col items-center | py-5 mb-40 w-2/3 | rounded-2xl shadow-xl cursor-pointer | ease-out duration-300 hover:scale-125" onClick={() => navigate(`/restaurant/${r.id}`)}>
                            <li><img className="restolist-img | p-10" src={r.img} alt="" /></li>
                            <li className="font-bold text-2xl">{r.name}</li>
                            <li className="flex items-center justify-center | gap-2 | font-bold text-xl">
                                <StarIcon color="#FDD017" className="w-6" />
                                <p>{getAvgRating(r.reviews)}</p>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
            : <LoadinPage />
    );
}