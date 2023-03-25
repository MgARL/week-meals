import React, { useContext } from 'react'
import { GlobalContext } from '../../Contexts/GlobalContext';
import './EditMeal.css'
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';

function EditMeal() {
    const { selectedMeal, setSelectedMeal } = useContext(GlobalContext);
    return (
        <>
            <Container className='bg-secondary min-height-100'>
                <Form className='pt-5 '>
                    <Form.Group className='m-3' controlId='MealEdit'>
                        <Form.Label>Meal Name:</Form.Label>
                        <Form.Control onChange={e => setSelectedMeal({...selectedMeal, dishName: e.target.value})} type='text' placeholder='Enter Meal name here'  value={selectedMeal.dishName} />
                    </Form.Group>

                    <Form.Group className='m-3' controlId='MealEdit'>
                        <Form.Label>Ingredients:</Form.Label>
                        <Form.Control type='text' placeholder='Enter Ingredients here' value={selectedMeal.ingredients} />
                    </Form.Group>

                    <Form.Group className='m-3' controlId='MealEdit'>
                        <Form.Label>Recipe Link:</Form.Label>
                        <Form.Control type='text' placeholder='Enter Recipe link here' value={selectedMeal?.link} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default EditMeal