import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './main/home';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
 
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default AppWrapper;
