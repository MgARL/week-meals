import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../Contexts/GlobalContext';
import './EditMeal.css'
import { Container, Form, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';

function EditMeal() {
    const { selectedMeal, setSelectedMeal } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [displayError, setDisplayError] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log('Submitting')
            setTimeout(()=>setLoading(false), "2000")
            throw new Error('hello');
        } catch (error) {
            setErrorMessage(error.message);
            setDisplayError(true);
            setTimeout(() => setDisplayError(false), '5000');
        }
    }
    return (
        <>
            <Container className='bg-secondary min-height-100 text-start'>
                <Form className='pt-5' onSubmit={e => handleSubmit(e)}>
                    <Form.Group className='m-3' controlId='MealEdit'>
                        <Form.Label className='text-light'>Meal Name:</Form.Label>
                        <Form.Control onChange={e => setSelectedMeal({...selectedMeal, dishName: e.target.value})} 
                            type='text' placeholder='Enter Meal name here'  value={selectedMeal.dishName} />
                    </Form.Group>

                    <Form.Group className='m-3' controlId='MealEdit2'>
                        <Form.Label className='text-light'>Ingredients:</Form.Label>
                        <Form.Control  onChange={e => setSelectedMeal({...selectedMeal, ingredients: e.target.value})}
                            type='text' placeholder='Enter Ingredients here' value={selectedMeal.ingredients} />
                    </Form.Group>

                    <Form.Group className='m-3' controlId='MealEdit3'>
                        <Form.Label className='text-light'>Recipe Link:</Form.Label>
                        <Form.Control onChange={e => setSelectedMeal({...selectedMeal, link: e.target.value})}
                            type='url' placeholder='Enter Recipe link here' value={selectedMeal?.link} />
                    </Form.Group>
                    { displayError && (
                        <Row>
                            <Col className='d-flex justify-content-center'>
                                <Alert variant='danger' className='w-75 text-center'>{errorMessage}</Alert>
                            </Col>
                        </Row>
                    )}
                    {loading 
                        ? <Spinner variant='primary' />
                        : <Button variant="primary" type="submit">
                            Submit
                          </Button>
                    }
                    
                </Form>
            </Container>
        </>
    )
}

export default EditMeal