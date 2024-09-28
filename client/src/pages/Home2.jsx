import VideoPlayer from '../components/VideoPlayer';
import Notifications from '../components/Notifications';
import Options from '../components/Options';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home2 = () => {
  return (
    <div className="container">
      <div className="home-section">
        {/* Navbar */}
        <div className="navbar">
          <img src='../../assets/icon.ico' alt="ZenCall Icon" />
        </div>

        {/* Landing Content */}
        <div className="landing-container">
          <div className="content">
            <h1 className="heading">Hello...</h1>
            <p>
              Welcome to ZenCall, the ultimate video calling platform designed to enhance your virtual communication experience. Our user-friendly interface allows you to effortlessly host and join video meetings, whether for business, education, or staying in touch with loved ones. With high-definition video and crystal-clear audio, ZenCall ensures every conversation feels personal and engaging. Features such as screen sharing, chat, and virtual backgrounds add versatility and fun to your calls. We prioritize security, offering end-to-end encryption to protect your privacy. Join ZenCall today and experience seamless, reliable, and secure video calling like never before.
            </p>
            <div className="links">
              <Link to="/register">
                <button className="register">Register</button>
              </Link>
              <Link to="/login">
                <button className="login">Login/Demo</button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="image">
            <img src='../../assets/zencall.jfif' alt="ZenCall" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home2;
