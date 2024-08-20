import logo from './logo.svg';
import './App.css';
import NavBar from "./components/NavBar";
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import Homepage from './pages/Homepage';
import { Route, Routes } from "react-router-dom";
import SignIn from './pages/SignIn';
import SignOut from './pages/SignUp';
import NotFound from './components/NotFound';
import "./api/axiosDefaults";



function App() {
  return (
    <div className="App">
      <NavBar />
      <Container fluid>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignOut />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
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
        <Footer />
      </Container>
    </div>
  );
}

export default App;
