import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TagProvider } from "./contexts/TagContext";
import { FoodListingProvider } from "./contexts/FoodListingContext";
import { FoodCardsProvider } from './contexts/FoodCardsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FoodCardsProvider>
      <FoodListingProvider>
        <TagProvider>
          <App />
        </TagProvider>
      </FoodListingProvider>
    </FoodCardsProvider>
  </StrictMode>,
)
