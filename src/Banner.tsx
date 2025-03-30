import { useNavigate } from "react-router-dom";
import "./Banner.css";
import { useContext } from "react";
import { FoodListingContext } from "./contexts/FoodListingContext.tsx";
import { Space } from "lucide-react";

type BannerProps = {
  logoSrc: string;
  name: string;
  desc: string;
  profileSrc: string;
  isOrg: boolean
};

const AppBanner = ({
  logoSrc = "/src/assets/logo.png",
  name = "Minuteman Meals",
  desc = "Find free food on campus",
  profileSrc = "/src/assets/profile.png",
  isOrg
}: BannerProps) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };
  const foodListingContext = useContext(FoodListingContext)!;
  return (
    <header className="app-banner">
      <div className="banner-content">
        {isOrg && <button onClick={foodListingContext.toggleOpen}>
          New <br></br>Listing
        </button>}
        {!isOrg && <div></div>}

        <div className="logo-container justify-center">
          {logoSrc && <img src={logoSrc} alt="Logo" className="app-logo" />}
          <div className="title-container">
            <h1 className="app-title">{name}</h1>
            <p className="app-description">{desc}</p>
          </div>
        </div>

        <div className="profile-container">
          {profileSrc && (
            <img
              src={profileSrc}
              alt="Profile"
              className="profile-image"
              onClick={handleProfileClick}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default AppBanner;
