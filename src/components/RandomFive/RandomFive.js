import React, { useState, useEffect, useContext } from 'react';
import './random-five.css';
import { Table, Row, Col, Button, Spinner } from 'react-bootstrap';
import { GlobalContext } from '../../Contexts/GlobalContext';
import DownloadExcel from '../../helper_hooks/DownloadExcel';

function RandomFive() {
  const { BaseURL } = useContext(GlobalContext);
  const [fiveMeals, setFiveMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getRandomFive();
  }, []);

  const getNewList = async () => {
    setIsLoading(true);
    await getRandomFive();
  };
  const getRandomFive = async () => {
    try {
      const res = await fetch(`${BaseURL}five`);
      const data = await res.json();
      setIsLoading(false);
      setFiveMeals(data);
    } catch (error) {
      console.error(error);
    }
  };
  const renderTable = () => {
    return (
      <>
        <Row>
          <Table id='RFive' responsive='md' striped bordered variant='light'>
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
              {fiveMeals.map((m, i) => {
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
          <Col xs={12} sm={5} md={3}>
            <Button variant='info' onClick={getNewList}>
              New List
            </Button>
          </Col>
          <Col xs={12} sm={5} md={3}>
            <Button variant='success' onClick={() => DownloadExcel(fiveMeals)}>
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

export default RandomFive;
