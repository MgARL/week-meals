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

  const getNewList = async () => {
    setIsLoading(true);
    await getFullList();
  };
  const getFullList = async () => {
    try {
      const res = await fetch(`${BaseURL}all`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(res)
      const data = await res.json();
      setIsLoading(false);
      setAllMeals(data);
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
              </tr>
            </thead>
            <tbody>
              {allMeals.map((m, i) => {
                return (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <th colSpan={3}>{m.dishName}</th>
                    <th colSpan={6}>{m.ingredients}</th>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
        <Row className='d-flex justify-content-center'>
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
