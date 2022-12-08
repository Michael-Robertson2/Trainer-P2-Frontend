import { useEffect, useState } from "react";
import YOLP_API from "../ApiConfig";
import Restaurant from "../models/Restaurant";

export default function RestaurantsPage() {
    const [resto, setResto] = useState<Restaurant[] | null>(null);
    const [num, setNum] = useState<number>(0);

    useEffect(() => {
        // setNum(num + 1);
        console.log(num);
        // getAllRestaurants();
    
    }, [])

    async function getAllRestaurants() {
        await YOLP_API.get("/restaurants").then((resp) => {
            setResto(resp.data);
        })
    }

    return (
        <button onClick={() => setNum(num + 1)}>click me!</button>
    );
}