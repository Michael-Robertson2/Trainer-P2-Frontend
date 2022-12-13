import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../index.css";

interface RatingProp {
    updateRating: Function;
}

export default function Rating({ updateRating }: RatingProp) {
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<any>(null);

    function setStar(ratingValue: any) {
        setRating(ratingValue);
        updateRating(ratingValue);
    }

    return (
        <div className="flex">
            {[...Array(5)].map((star, i) => {
                const ratingValue: any = i + 1;

                return (
                    <label>
                        <input
                            className="star-radio"
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setStar(ratingValue)}
                            required
                        />

                        <FaStar
                            className="star w-7 h-7"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            size={100}
                            onMouseOver={() => setHover(ratingValue)}
                            onMouseOut={() => setHover(null)}
                        />
                    </label>
                )
            })}
        </div>
    );
}