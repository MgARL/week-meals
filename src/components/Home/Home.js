import React, { useState } from 'react';

import RandomFive from '../RandomFive/RandomFive';
import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
	return (
		<>
			<Row
				className='text-center d-flex justify-content-center align-items-center'
				style={{ height: '60vh' }}
			>
				<Col xs={12} md={3}>
					<Button variant='info' onClick={() => navigate('/RandomFive')}>
						Get Five Random Recipes
					</Button>
				</Col>
			</Row>
		</>
	);
}

export default Home;
