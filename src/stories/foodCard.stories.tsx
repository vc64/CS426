import type { Meta, StoryObj } from "@storybook/react";
import FoodCard from "../foodCard";
import { foodItemType } from "../data/foodItems";

const meta = {
    title: "Food Card",
    component: FoodCard,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
      }
} satisfies Meta<typeof FoodCard>;
export default meta;

const defaultFood: foodItemType = {
    id: -1,
    foodName: "Assorted Pastries",
    restaurantName: "Bella Bakery",
    imageUrl: "Breakfast.jpg",
    distance: 0.7,
    pickupTime: "Today, 5:00 PM - 6:30 PM",
    tags: ["Vegetarian", "Bakery"],
    active: true,
    isFavorite: true
};
const favToggle = (index: number) => {index = index + 1} 
type FoodCardType = StoryObj<typeof meta>;

export const Primary: FoodCardType = {
    args: {
        food: defaultFood,
        favToggle: favToggle
    }
}