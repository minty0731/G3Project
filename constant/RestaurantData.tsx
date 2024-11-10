import { DeliveryLink } from "./DeliveryLink";
export interface restaurantData {
    name: string;
    category_description: string;
    profile_image_link: string;
    promo_image_collection: string[];
    address_collection: []
    open_hours: string;
    open_days: string;
    highest_price: number;
    lowest_price: number;
    phone_number: string;
    food_country_type: string;
    pure_vegan: boolean;
    take_away: boolean;
    dine_in: boolean;
    buffet: boolean;
    delivery_collection: DeliveryLink[];
    payment_method: string[];
}