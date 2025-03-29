import { useNavigate } from "react-router-dom";
import "./Banner.css";

type BannerProps = {
  logoSrc: string;
  name: string;
  desc: string;
  profileSrc: string;
};

const AppBanner = ({
  logoSrc = "/src/assets/logo.png",
  name = "Minuteman Meals",
  desc = "Find free food on campus",
  profileSrc = "/src/assets/profile.png",
}: BannerProps) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };
  return (
    <header className="app-banner">
      <div className="banner-content">
        <div className="logo-container">
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
