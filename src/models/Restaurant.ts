import Review from "./Review";

export default class Restaurant {
    id: string;
    name: string;
    img: string;
    reviews: Review[];

    constructor(id: string, name: string, img: string, reviews: Review[]) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.reviews = reviews;
    }
}