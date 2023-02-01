import "./App.css";
import "./bootstraps_themes/bootstrap-flatly.min.css";
import NavigationBar from "./components/navbar/NavigationBar";
import { Container, Button, Row, Col } from "react-bootstrap";
import RandomFive from "./components/RandomFive/RandomFive";
import { useState } from "react";

function App() {
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [areRandomFiveVisible, setAreRandomFiveVisible] = useState(false);

  const renderButton = () => {
    return (
      <Row className="text-center d-flex justify-content-center align-items-center" style={{height: '60vh'}}>
        <Col xs={12} md={3}>
          <Button variant="info" onClick={renderFive}>Get Five Random Recipes</Button>
        </Col>
      </Row>
    );
  };

  const renderFive = () => {
    setIsButtonVisible(false);
    setAreRandomFiveVisible(true);
  }
  return (
    <div className="App bg-primary vh-100">
      <NavigationBar />
      <Container>
        {isButtonVisible && renderButton()}
        {areRandomFiveVisible && <RandomFive/>}
      </Container>
    </div>
  );
}

export default App;
