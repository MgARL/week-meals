import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './full-list.css';
import { Table, Row, Col, Button, Spinner } from 'react-bootstrap';
import { GlobalContext } from '../../Contexts/GlobalContext';
import DownloadExcel from '../../helper_hooks/DownloadExcel';
import { verifyLoggedIn } from '../../helper_hooks/OnStartFuncs'


function FullList() {
  const { BaseURL, setSelectedMeal } = useContext(GlobalContext);
  const [allMeals, setAllMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    validateUser()
  }, []);

  const validateUser = async () => {
    const userName = await verifyLoggedIn(BaseURL);
    if (userName) {
      getFullList();
    } else {
      navigate('/login');
    }
  };

  const getFullList = async () => {
    try {
      const res = await fetch(`${BaseURL}all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      setIsLoading(false);
      setAllMeals(data);
    } catch (error) {
      console.error(error);
      navigate('/');
    };
  };

  const handleEditButton = (e) => {
    setSelectedMeal(allMeals[e.target.id]);
    navigate(`/fullList/edit/${e.target.id}`)
  };

  const deleteMeal = async (e) => {
    try {
      const res = await fetch(`${BaseURL}${e.target.id}`, {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      if (data === 200) {
        console.log("delete successful");
        //Will show modal successful
      }
    } catch (error) {
      console.error(error);
      //will show Error message
    }
  };
  const renderTable = () => {
    return (
      <>
        <Row>
          <Table id='MealList' responsive='md' striped bordered variant='light'>
            <thead>
              <tr>
                <th>
                  <h4>#</h4>
                </th>
                <th colSpan={3}>
                  <h4>Meal Name</h4>
                </th>
                <th colSpan={6}>
                  <h4>Ingredients</h4>
                </th>
                <th colSpan={3}>
                  <h4>Recipe</h4>
                </th>
                <th>
                  <h4>Edit</h4>
                </th>
                <th>
                  <h4>Delete</h4>
                </th>
              </tr>
            </thead>
            <tbody>
              {allMeals.map((m, i) => {
                return (
                  <tr key={i}>
                    <td className='align-middle'>
                      <div>
                        {i + 1}
                      </div>
                    </td>
                    <td colSpan={3}>{m.dishName}</td>
                    <td colSpan={6}>{m.ingredients}</td>
                    <td colSpan={3}>
                      {m.link
                        ? <a href={`${m.link}`} target='_blank'>Go to Recipe</a>
                        : ''}
                    </td>
                    <td>
                      <Button id={i} onClick={(e) => handleEditButton(e)} variant='warning'>Edit</Button>
                    </td>
                    <td>
                      <Button id={i} onClick={(e) => deleteMeal(e)} variant='danger'>Delete</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>

        <Row className='d-flex justify-content-center pb-3'>
          <Col xs={6}>
            <Button variant='success' onClick={() => navigate('/addmeal')}>
              Add New Meal
            </Button>
          </Col>
          <Col xs={6}>
            <Button variant='success' onClick={() => DownloadExcel(allMeals)}>
              Download as Excel
            </Button>
          </Col>
        </Row>
      </>
    );
  };

  const handleLoading = () => {
    return (
      <Row className='d-flex justify-content-center align-items-center vh-30'>
        <Spinner animation='border' variant='info' />
      </Row>
    );
  };
  return <>{isLoading ? handleLoading() : renderTable()}</>;
}

export default FullList;
