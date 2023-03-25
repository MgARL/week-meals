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
import FullList from './components/FullList/FullList';
import EditMeal from './components/EditMeal/EditMeal';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [selectedMeal, setSelectedMeal] = useState(null);
	const { REACT_APP_API_URL } = process.env;
	const BaseURL = `${REACT_APP_API_URL}api/dishes/`;

	useEffect(() => {
		findUser();
	}, []);

	const findUser = async () => {
		const userName = await verifyLoggedIn(BaseURL);
		if (userName) {
			setCurrentUser(userName);
			setIsLoggedIn(true);
		}
	};

	return (
		<main className='App bg-primary min-height-100'>
			<Router basename={process.env.PUBLIC_URL}>
				<GlobalContext.Provider
					value={{
						isLoggedIn,
						setIsLoggedIn,
						currentUser,
						setCurrentUser,
						BaseURL,
						selectedMeal,
						setSelectedMeal
					}}
				>
					<NavigationBar />
					<Container className="bg-primary">
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/RandomFive' element={<RandomFive />} />
							<Route path='/login' element={<LogIn />} />
							<Route path='/fullList' element={<FullList/>} />
							<Route path='/fullList/edit' element={<EditMeal/>}/>
						</Routes>
					</Container>
				</GlobalContext.Provider>
			</Router>
		</main>
	);
}

export default App;
