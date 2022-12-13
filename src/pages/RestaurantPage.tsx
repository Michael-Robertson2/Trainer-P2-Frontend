import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { StarIcon } from "@heroicons/react/24/solid";
import YOLP_API from "../ApiConfig";
import Rating from "../components/Rating";
import Restaurant from "../models/Restaurant";
import Review from "../models/Review";
import LoadinPage from "./LoadingPage";

export default function RestaurantPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [resto, setResto] = useState<Restaurant | null>(null);
    const [reviews, setReviews] = useState<Review[] | null>(null);
    const [rating, setRating] = useState<number>(0);
    const [msg, setMsg] = useState<string>("");

    useEffect(() => {
        getReviewsByRestoId()
        getRestaurantById();
    }, [])

    async function getReviewsByRestoId() {
        await YOLP_API.get(`/reviews/id?id=${id}`, {
            headers: {
                "authorization": auth?.token
            }
        }).then((resp) => {
            setReviews(resp.data);
        }).catch((e) => {
            navigate("/login");
        });
    }

    async function getRestaurantById() {
        await YOLP_API.get(`/restaurants/id?id=${id}`, {
        }).then((resp) => {
            setResto(resp.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    async function submit(e: FormEvent) {
        e.preventDefault();
        await YOLP_API.post("/reviews", {
            "rating": rating,
            "msg": msg,
            "username": auth?.username,
            "restaurant_id": resto?.id,
            "user_id": auth?.id
        }).then((resp) => {
            window.location.reload();
        }).catch((e) => console.log(e));
    }

    return (
        reviews
            ? <div className="flex flex-col items-center gap-20">
                <h1 className="mt-40 font-bold font-serif text-7xl">{resto?.name}</h1>
                <img className="rounded-lg shadow-xl" src={resto?.img} alt="" />
                {reviews.length > 0
                    ? <div className="grid grid-cols-3 items-center gap-20">
                        {reviews.map((r) => (
                            <ul className="flex flex-col shadow-xl px-10 py-5 gap-2 rounded-xl text-white bg-slate-700 hover:bg-white hover:text-black ease-out hover:scale-110 duration-500" style={{ width: "400px" }}>
                                <li><strong>User: </strong>{r.username}</li>
                                <li className="flex items-center gap-1">
                                    <StarIcon className="w-5 text-yellow-500" />
                                    <p>{r.rating}</p>
                                </li>
                                <li><strong>Review: </strong>{r.msg}</li>
                            </ul>
                        ))}
                    </div>
                    : <h1 className="font-bold font-serif text-5xl">No Reviews Yet...</h1> }
                <form onSubmit={(e) => submit(e)} className="flex flex-col items-center gap-10">
                    <h2 className="font-bold font-serif text-3xl">Leave a review</h2>
                    <Rating updateRating={setRating} />
                    <textarea className="bg-slate-100 p-5 rounded-md" placeholder="Enter a review" cols={55} rows={5} value={msg} onChange={(e) => setMsg(e.target.value)} ></textarea>
                    <button className="bg-slate-700 px-10 py-4 mb-40 text-white rounded-md ease-out hover:scale-125 duration-300">Submit</button>
                </form>
            </div>
            : <LoadinPage />
    );
}