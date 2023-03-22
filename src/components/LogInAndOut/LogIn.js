import React, { useContext, useState } from 'react';
import { Form, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { getUserName } from '../../helper_hooks/stringManipulation';

function LogIn() {
	const { setIsLoggedIn, setCurrentUser, BaseURL } = useContext(GlobalContext);
	const navigate = useNavigate();
	const initialCredentials = {
		Email: '',
		Password: '',
	};
	const [credentials, setCredentials] = useState(initialCredentials);
	const [isLoading, setLoading] = useState(false);
	const [wrongCred, setWrongCred] = useState(false);

	const handleCredentialChange = (e) => {
		setCredentials({
			...credentials,
			[e.target.id]: e.target.value,
		});
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		//fetch request to get token and user name.
		try {
			const res = await fetch(`${BaseURL}auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(credentials),
			});
			if (!res.ok) {
				setLoading(false);
				setTimeout(() => setWrongCred(false), 2000);
				return setWrongCred(true);
			}
			const data = await res.json();
			localStorage.setItem('token', data.firebaseToken);
			localStorage.setItem('refreshToken', data.refreshToken);
			setIsLoggedIn(true);
			setCurrentUser(getUserName(data.user.email));
			setCredentials({
				Email: '',
				Password: '',
			});
			navigate('/');
		} catch (err) {
			console.error(err);
			setLoading(false);
		}
	};

	const renderAlert = () => {
		return (
			<Row className='d-flex justify-content-center'>
				<Col xs={12} md={10}>
					<Alert variant='warning'>Wrong Credentials</Alert>
				</Col>
			</Row>
		);
	};

	return (
		<Row className='d-flex justify-content-center mt-4'>
			<Col sm='12' md='5'>
				<Form
					className='text-light bg-dark py-2'
					onSubmit={(e) => handleLogin(e)}
				>
					{wrongCred && renderAlert()}
					<Row className='mt-3 d-flex justify-content-center'>
						<Col sm='12' md='10' lg='10'>
							<Form.Group>
								<Form.Label>Email Address</Form.Label>
								<Form.Control
									type='Email'
									placeholder='Enter Email'
									onChange={(e) => handleCredentialChange(e)}
									id='Email'
									value={credentials.Email}
									required
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className='mt-3 d-flex justify-content-center'>
						<Col sm='12' md='10' lg='10'>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='password'
									minLength={8}
									id='Password'
									onChange={(e) => handleCredentialChange(e)}
									value={credentials.Password}
									required
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className='my-3 d-flex justify-content-center'>
						<Col sm='12' md='6' lg='3'>
							{isLoading ? (
								<Spinner animation='border' variant='success' />
							) : (
								<Button variant='success' type='submit'>
									Submit
								</Button>
							)}
						</Col>
					</Row>
				</Form>
			</Col>
		</Row>
	);
}

export default LogIn;
