import React, { useState, useEffect, useContext } from 'react';
import './full-list.css';
import { Table, Row, Col, Button, Spinner } from 'react-bootstrap';
import { GlobalContext } from '../../Contexts/GlobalContext';
import DownloadExcel from '../../helper_hooks/DownloadExcel';

function FullList() {
  const { BaseURL } = useContext(GlobalContext);
  const [allMeals, setAllMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getFullList();
  }, []);

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
    };  
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
      console.log(data);
      if(data = 200){
        console.log("delete successful");
      }
    } catch (error) {
      console.error(error);
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
                    <td>
                      <Button variant='warning'>Edit</Button>
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
          <Col xs={12}>
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
