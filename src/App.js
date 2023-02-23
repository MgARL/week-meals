import './App.css';
import './bootstraps_themes/bootstrap-flatly.min.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalContext } from './Contexts/GlobalContext';

//Component Imports
import NavigationBar from './components/navbar/NavigationBar';
import RandomFiveWrapper from './components/RandomFive/RandomFiveWrapper';
import LogIn from './components/LogInAndOut/LogIn';
import { Container } from 'react-bootstrap';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { REACT_APP_API_URL } = process.env;
  const BaseURL = `${REACT_APP_API_URL}api/dishes/`;

  return (
    <div className='App bg-primary vh-100'>
      <Router>
        <GlobalContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            currentUser,
            setCurrentUser,
            BaseURL,
          }}
        >
          <NavigationBar />
          <Container>
            <Routes>
              <Route path='/' element={<RandomFiveWrapper />} />
              <Route path='/login' element={<LogIn />} />
            </Routes>
          </Container>
        </GlobalContext.Provider>
      </Router>
    </div>
  );
}

export default App;
