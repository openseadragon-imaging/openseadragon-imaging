import React from 'react';
import './HomePage.scss';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function HomePage(props) {
  //useEffect(() => {}, []);

  return (
    <Row className="home-page justify-content-md-center">
      <Col xs></Col>
      <Col xs="auto">
        <h2>
          <Badge variant="warning">\\ Under Construction //</Badge>
        </h2>
      </Col>
      <Col xs></Col>
    </Row>
  );
}

export default HomePage;
