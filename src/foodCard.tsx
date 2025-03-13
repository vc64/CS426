import img from "./assets/react.svg"

const FoodCard = () => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-indigo-500">
            <img className="w-full" src={img} alt="Food"></img>
            <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Food</div>
            <p className="text-gray-700 text-base">
                Example food description. This food looks so good.
            </p>
            </div>
        </div>
    );
}

export default FoodCard

