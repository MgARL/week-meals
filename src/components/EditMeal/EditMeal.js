import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../../Contexts/GlobalContext';
import './EditMeal.css'
import { Container, Form, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyLoggedIn } from '../../helper_hooks/OnStartFuncs'

function EditMeal() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { BaseURL, selectedMeal, setSelectedMeal } = useContext(GlobalContext);
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
        try {
            setLoading(true);
            const res = await fetch(`${BaseURL}${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(selectedMeal)
            });
            const data = await res.json();
            if (data !== 200) {
                throw new Error(data.title);
            }
            setLoading(false);
            navigate('/fullList');
        } catch (error) {
            setLoading(false);
            setErrorMessage(error.message);
            setDisplayError(true);
            setTimeout(() => setDisplayError(false), '5000');
        }
    };
    return (
        <>
            <Container className='bg-secondary min-height-100 text-start'>
                <Row className='pt-3 pe-4'>
                    <Col className='text-light text-end'>
                        <h6>
                            Meal {`#${id}`}
                        </h6>
                    </Col>
                </Row>
                <Form className='pt-2' onSubmit={e => handleSubmit(e)}>
                    <Form.Group className='m-3' controlId='MealEdit'>
                        <Form.Label className='text-light'>Meal Name:</Form.Label>
                        <Form.Control onChange={e => setSelectedMeal({ ...selectedMeal, dishName: e.target.value })}
                            type='text' placeholder='Enter Meal name here' value={selectedMeal.dishName} />
                    </Form.Group>

                    <Form.Group className='m-3' controlId='MealEdit2'>
                        <Form.Label className='text-light'>Ingredients:</Form.Label>
                        <Form.Control onChange={e => setSelectedMeal({ ...selectedMeal, ingredients: e.target.value })}
                            type='text' placeholder='Enter Ingredients here' value={selectedMeal.ingredients} />
                    </Form.Group>

                    <Form.Group className='m-3' controlId='MealEdit3'>
                        <Form.Label className='text-light'>Recipe Link:</Form.Label>
                        <Form.Control onChange={e => setSelectedMeal({ ...selectedMeal, link: e.target.value })}
                            type='url' placeholder='Enter Recipe link here' value={selectedMeal?.link} />
                    </Form.Group>
                    {displayError && (
                        <Row>
                            <Col className='d-flex justify-content-center'>
                                <Alert variant='danger' className='w-50 text-center'>{errorMessage}</Alert>
                            </Col>
                        </Row>
                    )}

                    <Row>
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
            </Container>
        </>
    )
}

export default EditMeal