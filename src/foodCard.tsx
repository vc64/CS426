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
    const defaultImg = "/src/assets/placeholder.png";
    const foodImg = img ? `/src/assets/${img}` : defaultImg;
    return (
        <div className="card">
            <img className="food-image" src={foodImg} alt="Food"></img>
            <div className="food-details">
                <h2 className="org-name">{organization}</h2>
                <h1 className="food-name">{food}</h1>
                <h2 className="location">{location}</h2>
            </div>
            <div className="food-details">
                <p className="description">{description}</p>
                <p className="price">{price}</p>
                <p className="distance">{distance} miles</p>            
            </div>
        </div>
    );
}

export default FoodCard;

