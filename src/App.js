import './App.css';
import './bootstraps_themes/bootstrap-flatly.min.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalContext } from './Contexts/GlobalContext';
import { verifyLoggedIn } from './helper_hooks/OnStartFuncs';

//Component Imports
import NavigationBar from './components/navbar/NavigationBar';
import Home from './components/Home/Home';
import LogIn from './components/LogInAndOut/LogIn';
import { Container } from 'react-bootstrap';
import RandomFive from './components/RandomFive/RandomFive';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const { REACT_APP_API_URL } = process.env;
	const BaseURL = `${REACT_APP_API_URL}api/dishes/`;

	useEffect(() => {
		findUser();
	}, []);

	const findUser = async () => {
		const userName = await verifyLoggedIn(BaseURL);
		if (userName) {
			setCurrentUser(userName);
		}
	};

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
              <Route path='/' element={<Home />} />
							<Route path='/RandomFive' element={<RandomFive />} />
							<Route path='/login' element={<LogIn />} />
						</Routes>
					</Container>
				</GlobalContext.Provider>
			</Router>
		</div>
	);
}

export default App;
