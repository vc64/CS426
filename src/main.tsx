import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TagProvider } from "./contexts/TagContext";
import { FoodListingProvider } from "./contexts/FoodListingContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FoodListingProvider>
      <TagProvider>
        <App />
      </TagProvider>
    </FoodListingProvider>
  </StrictMode>,
)
