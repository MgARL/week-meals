import React, { useState } from 'react';

import RandomFive from './RandomFive';
import { Button, Row, Col } from 'react-bootstrap';

function RandomFiveWrapper() {
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [areRandomFiveVisible, setAreRandomFiveVisible] = useState(false);

  const renderButton = () => {
    return (
      <Row
        className='text-center d-flex justify-content-center align-items-center'
        style={{ height: '60vh' }}
      >
        <Col xs={12} md={3}>
          <Button variant='info' onClick={renderFive}>
            Get Five Random Recipes
          </Button>
        </Col>
      </Row>
    );
  };

  const renderFive = () => {
    setIsButtonVisible(false);
    setAreRandomFiveVisible(true);
  };
  return (
    <>
      {isButtonVisible && renderButton()}
      {areRandomFiveVisible && <RandomFive />}
    </>
  );
}

export default RandomFiveWrapper;
