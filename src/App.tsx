import FoodCard from "./foodCard.tsx";
import AppBanner from "./Banner.tsx";
import "./App.css";

function App() {
  const tempdata = {
    organization: "UMASO",
    food: "Cookies",
    location: "Hasbrouck Laboratory",
    description: "Example food description. This food looks so good.",
    price: "Free",
    distance: 0.2,
    img: "pizza.jpg",
  };

  return (
    <div className="app-wrapper">
      <AppBanner
        logoSrc="/src/assets/logo.png"
        name="Minuteman Meals"
        desc="Find free food on campus!"
        profileSrc="/src/assets/profile.png"
      />

      <div className="app-container">
        <FoodCard
          organization={tempdata.organization}
          food={tempdata.food}
          location={tempdata.location}
          description={tempdata.description}
          price={tempdata.price}
          distance={tempdata.distance}
          img={tempdata.img}
        />
        <FoodCard
          organization={"Organization"}
          food={"Food"}
          location={"Location"}
          description={"Description"}
          price={"Price"}
          distance={0}
          img={"pizza.jpg"}
        />
        <FoodCard
          organization={"Organization"}
          food={"Food"}
          location={"Location"}
          description={"Description"}
          price={"Price"}
          distance={0}
          img={"pizza.jpg"}
        />
      </div>
    </div>
  );
}

export default App;
