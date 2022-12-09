import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YOLP_API from "../ApiConfig";
import Review from "../models/Review";
import LoadinPage from "./LoadingPage";

export default function RestaurantPage() {
    const { id } = useParams();
    const [reviews, setReviews] = useState<Review[] | null>(null);

    useEffect(() => {
        // ryan's solution
        // if (typeof(id) !== 'undefined') {
        //     getReviewsByRestoId(id);
        // }

        getReviewsByRestoId()
    }, [])

    async function getReviewsByRestoId() {
        await YOLP_API.get(`/reviews?id=${id}`)
            .then((resp) => {
                setReviews(resp.data);
            })
            .catch((e) => console.log(e));
    }

    return (
        reviews
            ? reviews.length == 0
                ? <h1 className="mt-40 text-center font-bold text-7xl">NO REVIEWS YET...</h1>
                : <div>
                    {
                        reviews.map((r) => (
                            <ul>
                                <li><strong>Username: </strong>{r.username}</li>
                                <li><strong>Rating: </strong>{r.rating}</li>
                                <li><strong>Review: </strong>{r.msg}</li>
                            </ul>
                        ))
                    }

                </div>
            : <LoadinPage />
    );
}