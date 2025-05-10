import axios from 'axios';

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
  
export let foodItems: foodItemType[] = [];

export const fetchFoodItems = async () => {
  try {
    const response = await axios.get('/api/listings', {
      headers: {
        'x-auth-token': localStorage.getItem('token') || '',
      },
    });

    foodItems = response.data.map((item: any, index: number) => ({
      id: index,
      foodName: item.foodName,
      restaurantName: item.restaurantName,
      imageUrl: item.imageUrl,
      distance: item.distance,
      pickupTime: item.pickupTime,
      tags: item.tags,
      active: item.status === 'available', 
      isFavorite: false, 
    }));
  } catch (error) {
    console.error('Error fetching food listings:', error);
  }
};