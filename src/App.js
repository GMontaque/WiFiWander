import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import NavBar from "./components/NavBar";
import Footer from './components/Footer';
import { Breadcrumb, Container } from 'react-bootstrap';
import Hero from './components/Hero';
import TotalLocations from './components/TotalLocations';
import SearchBar from './components/SearchBar';
import Continents from './pages/Continents';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          add new text
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
