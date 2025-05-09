export const defaultFood = {
  foodName: "Assorted Pastries",
  restaurantName: "Bella Bakery",
  imageUrl: "/api/placeholder/300/200",
  distance: 0.7,
  pickupTime: "Today, 5:00 PM - 6:30 PM",
  tags: ["Vegetarian", "Bakery"],
  active: true,
  isFavorite: true
};

export const foodCardButtonStyle = {
    backgroundColor: '#16a34a', // Tailwind green-600
   color: 'white',
   fontWeight: 'bold',
   padding: '0.5rem 1rem',
   borderRadius: '0.5rem',
   width: '100%',
   transition: 'background-color 200ms',
};

export const handleMouseEnter = (e) => e.target.style.backgroundColor = '#15803d';
  
export const handleMouseLeave = (e) => e.target.style.backgroundColor = '#16a34a';