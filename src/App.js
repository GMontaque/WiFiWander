import './App.css';
import NavBar from "./components/NavBar";
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import Homepage from './pages/Homepage';
import { Route, Routes } from "react-router-dom";
import SignIn from './pages/SignIn';
import SignOut from './pages/SignUp';
import NotFound from './components/NotFound';
import Profile from './pages/Profile';
import Hero from './components/Hero';
import Country from './pages/Country';
import City from './pages/City';
import WifiLocationsList from './pages/WifiLocationsList';
import WifiLocationsCreation from './pages/WifiLocationsCreation';
import About from './pages/About';
import WifiLocationsPage from './pages/WifiLocationsPage';
import Password from './pages/Password';
import './api/axiosDefaults'


function App() {

  return (
    <div className="App">
      <NavBar />
      <Hero />
      <Container fluid>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignOut />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/continents/:continentName" element={<Country />} />
          <Route path="/continents/:continentName/:countryName" element={<City />} />
          <Route path="/newlocation" element={<WifiLocationsCreation />} />
          <Route path="/continents/:continentName/:countryName/:cityName" element={<WifiLocationsList />} />
          <Route path="/wifipage" element={<WifiLocationsPage />} />
          <Route path="/password" element={<Password />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </div>

  );
}

export default App;
