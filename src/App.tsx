import FoodCard from './FoodCard.tsx';
import './App.css';

function App() {

  const tempdata = {
    organization: 'UMASO',
    food: 'Cookies',
    location: 'Hasbrouck Laboratory',
    description: 'Example food description. This food looks so good.',
    price: 'Free',
    distance: 0.2
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
      />
      <FoodCard organization={'Organization'} food={'Food'} location={'Location'} description={'Description'} price={'Price'} distance={0}/>
      <FoodCard organization={'Organization'} food={'Food'} location={'Location'} description={'Description'} price={'Price'} distance={0}/>
    </div>
  )
}

export default App;
