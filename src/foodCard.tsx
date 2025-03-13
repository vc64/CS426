import "./FoodCard.css";

type FoodCardProps = {
    organization: string;
    food: string;
    location: string;
    description: string;
    price: string;
    distance: number;
    img: string;
}

const FoodCard = ({ organization, food, location, description, price, distance, img }: FoodCardProps) => {
    const foodImg = `/src/assets/${img}`;
    return (
        <div className="card">
            <img className="food-image" src={foodImg} alt="Food"></img>
            <h2 className="org-name">{organization}</h2>
            <h1 className="food-name">{food}</h1>
            <h2 className="location">{location}</h2>
            <p className="description">{description}</p>
            <p className="price">{price}</p>
            <p className="distance">{distance} miles</p>
        </div>
    );
}

export default FoodCard;

