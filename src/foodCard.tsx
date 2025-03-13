import img from "./assets/react.svg"

type FoodCardProps = {
    organization: string;
    food: string;
    location: string;
    description: string;
}

const FoodCard = ({ organization, food, location, description }: FoodCardProps) => {
    return (
        <div className="card">
            <img className="food-image" src={img} alt="Food"></img>
            <h2 className="org-name">{organization}</h2>
            <h1 className="food-name">{food}</h1>
            <h2 className="location">{location}</h2>
            <p className="description">
                {description}
                Example food description. This food looks so good.
            </p>
        </div>
    );
}

export default FoodCard;

