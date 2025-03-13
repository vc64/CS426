import FoodCard from './FoodCard.tsx';
import './App.css';

function App() {

  const tempdata = {
    organization: 'UMASO',
    food: 'Cookies',
    location: 'Hasbrouck Laboratory',
    description: 'Example food description. This food looks so good.',
    price: 'Free',
    distance: 0.2,
    img: "pizza.jpg"
  }
  
  return (
    <div>
      <FoodCard
        organization={tempdata.organization}
        food={tempdata.food}
        location={tempdata.location}
        description={tempdata.description}
        price={tempdata.price}
        distance={tempdata.distance}
        img={tempdata.img}
      />
      <FoodCard organization={'Organization'} food={'Food'} location={'Location'} description={'Description'} price={'Price'} distance={0} img={"pizza.jpg"}/>
      <FoodCard organization={'Organization'} food={'Food'} location={'Location'} description={'Description'} price={'Price'} distance={0} img={"pizza.jpg"}/>
    </div>
  )
}

export default App;
