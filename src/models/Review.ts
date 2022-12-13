
export default class Review {
    id: string;
    rating: number;
    msg: string;
    username: string;
    user_id: string;
    restaurant_id: string;

    constructor(id: string, rating: number, msg: string, username: string, user_id:string, restaurant_id: string) {
        this.id = id;
        this.rating = rating;
        this.msg = msg;
        this.username = username;
        this.user_id = user_id;
        this.restaurant_id = restaurant_id;
    }
}