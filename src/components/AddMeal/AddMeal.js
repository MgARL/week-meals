import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { verifyLoggedIn } from '../../helper_hooks/OnStartFuncs'
import { useNavigate } from 'react-router-dom';
import {Form, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';

function AddMeal() {
    const { BaseURL } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [meal, setMeal] = useState({
        dishName: '',
        ingredients: '',
        link: ''

    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [displayError, setDisplayError] = useState(false);

    useEffect(() => {
        validateUser()
    }, []);

    const validateUser = async () => {
        const userName = await verifyLoggedIn(BaseURL);
        if (!userName) {
            navigate('/login');
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
    };

  return (
    <>
        <Row className='bg-secondary pt-3 mb-3'>
            <Row>
                <Col xs={12} className='text-light'>
                    <h4>Add a Meal</h4>
                </Col>
            </Row>
            <Form className='pt-2 text-start' onSubmit={e => handleSubmit(e)}>
                    <Form.Group className='m-3' controlId='MealEdit'>
                        <Form.Label className='text-light'>Meal Name:</Form.Label>
                        <Form.Control onChange={e => setMeal({...meal, dishName: e.target.value})} 
                            type='text' placeholder='Enter Meal name here'  value={meal.dishName} />
                    </Form.Group>

                    <Form.Group className='m-3' controlId='MealEdit2'>
                        <Form.Label className='text-light'>Ingredients:</Form.Label>
                        <Form.Control  onChange={e => setMeal({...meal, ingredients: e.target.value})}
                            type='text' placeholder='Enter Ingredients here' value={meal.ingredients} />
                    </Form.Group>

                    <Form.Group className='m-3' controlId='MealEdit3'>
                        <Form.Label className='text-light'>Recipe Link:</Form.Label>
                        <Form.Control onChange={e => setMeal({...meal, link: e.target.value})}
                            type='url' placeholder='Enter Recipe link here' value={meal?.link} />
                    </Form.Group>
                    { displayError && (
                        <Row>
                            <Col className='d-flex justify-content-center'>
                                <Alert variant='danger' className='w-50 text-center'>{errorMessage}</Alert>
                            </Col>
                        </Row>
                    )}

                    <Row className='pb-3'>
                        <Col className='d-flex justify-content-center' xs={12}>
                            {loading 
                            ? <Spinner variant='primary' />
                            : <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            }
                        </Col>
                    </Row>                    
                </Form>
        </Row>
    </>
  )
}

export default AddMeal