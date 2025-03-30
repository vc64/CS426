export interface foodItemType {
    id: number,
    foodName: string;
    restaurantName: string;
    imageUrl: string;
    distance: number;
    pickupTime: string;
    tags: string[];
    active: boolean;
    isFavorite: boolean
   }
   
export const foodItems: foodItemType[] = [
    {
      id: 0,
      foodName: "Pepperoni Pizza",
      restaurantName: "Worcester Dining Commons",
      imageUrl: "Pizza.jpg",
      distance: 0.1,
      pickupTime: "Today, 5:00 PM - 6:30 PM",
      tags: ["Italian"],
      active: true,
      isFavorite: false
    },
    {
      id: 1,
      foodName: "Chocolate Cookies",
      restaurantName: "UMASO",
      imageUrl: "Chocolate-Cookies.jpg",
      distance: 0.3,
      pickupTime: "Today, 8:30 PM - 9:30 PM",
      tags: ["Dessert"],
      active: true,
      isFavorite: false
    },
    {
      id: 2,
      foodName: "Chicken Biryani",
      restaurantName: "Cooking Club",
      imageUrl: "Chicken-Biryani.jpg",
      distance: 0.5,
      pickupTime: "Today, 9:00 PM - 10:00 PM",
      tags: ["South Asian", "Gluten-Free", "Student-Made"],
      active: false,
      isFavorite: false
    },
    {
      id: 3,
      foodName: "Garden Salad",
      restaurantName: "CICS",
      imageUrl: "Salad.jpg",
      distance: 1.1,
      pickupTime: "Tomorrow, 11:30 AM - 1:00 PM",
      tags: ["Vegetarian", "Vegan", "Dairy-Free", "Organic"],
      active: true,
      isFavorite: false
    },
    {
      id: 4,
      foodName: "Dalgona Coffee",
      restaurantName: "Korean Students Association",
      imageUrl: "Coffee.jpg",
      distance: 0.2,
      pickupTime: "Tomorrow, 2:00 PM - 3:00 PM",
      tags: ["Drink", "Vegetarian", "Student-Made"],
      active: true,
      isFavorite: false
    },
    {
      id: 5,
      foodName: "Assorted Candy",
      restaurantName: "Positive Presence",
      imageUrl: "Candy.jpg",
      distance: 0.1,
      pickupTime: "Today, 2:00 PM - 4:00 PM",
      tags: ["Dessert"],
      active: false,
      isFavorite: false
    },
    {
      id: 6,
      foodName: "Mac & Cheese",
      restaurantName: "Harvest Market",
      imageUrl: "Mac-and-Cheese.jpg",
      distance: 0.1,
      pickupTime: "Tomorrow, 11:00 PM - 12:00 AM",
      tags: ["Vegetarian"],
      active: true,
      isFavorite: false
    },
    {
      id: 7,
      foodName: "Gluten-Free Brownies",
      restaurantName: "Yum! Bakery",
      imageUrl: "Brownies.jpg",
      distance: 0.2,
      pickupTime: "Today, 8:00 PM - 9:00 PM",
      tags: ["Dessert", "Gluten-Free"],
      active: true,
      isFavorite: false
    },
  ];