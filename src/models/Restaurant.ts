
export default class Restaurant {
    id: string;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;

    constructor(id: string, name: string, street: string, city: string, state: string, zip: string) {
        this.id = id;
        this.name = name;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }
}