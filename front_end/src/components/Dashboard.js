import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button, Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Dashboard.css'; 
// Custom styles for further enhancements

const Dashboard = () => {
  return (
    <>
      {/* Navbar Section */}
      <Navbar expand="lg" className="custom-navbar">
        <Container fluid className="d-flex justify-content-between align-items-center w-100">
          <div className="flex-grow-1"></div>
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            Pills Reminder
          </Navbar.Brand>
          <Nav className="flex-grow-1 d-flex justify-content-end">
            <Button as={Link} to="/signup" variant="warning" className="custom-btn">
              Login/Sign Up
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Hero Section */}
      
      <section className="hero bg-light text-center py-5">
        <Container>
          <Carousel indicators={false} interval={3000} fade>
            {/* First Slide */}
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/remainder.png"
                alt="Stay on top of your medication"
                style={{ maxHeight: '500px', objectFit: 'cover', filter: 'brightness(80%)' }}
              />
              <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '8px', padding: '15px' }}>
                <h3 style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.8rem' }}>Stay on Top of Your Medication</h3>
                <p style={{ color: '#e0e0e0', fontSize: '1.1rem' }}>Track your medicine intake easily with PillsPall.</p>
              </Carousel.Caption>
            </Carousel.Item>
            {/* Second Slide */}
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/details.png"
                alt="Get Refill Reminders"
                style={{ maxHeight: '500px', objectFit: 'cover', filter: 'brightness(80%)' }}
              />
              <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '8px', padding: '15px' }}>
                <h3 style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.8rem' }}>Get Refill Reminders</h3>
                <p style={{ color: '#e0e0e0', fontSize: '1.1rem' }}>Never miss a refill with our timely reminders.</p>
              </Carousel.Caption>
            </Carousel.Item>
            {/* Third Slide */}
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/tips.png"
                alt="Personalized Health Tips"
                style={{ maxHeight: '500px', objectFit: 'cover', filter: 'brightness(80%)' }}
              />
              <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '8px', padding: '15px' }}>
                <h3 style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.8rem' }}>Personalized Health Tips</h3>
                <p style={{ color: '#e0e0e0', fontSize: '1.1rem' }}>Receive health tips based on your medicinal history.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={4} className="mb-4">
              <Card className="text-center h-100 feature-card">
                <Card.Body>
                  <Card.Title>Medicinal Details</Card.Title>
                  <Link to="/medication">
                    <img
                      src="/images/Kerfin7-NEA-2139.jpg"
                      alt="Medicinal details"
                      className="feature-img"
                    />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer Section */}
      <footer className="footer text-white text-center py-3">
        <Container>
          <p className="mb-0">© {new Date().getFullYear()} PillsPall. All Rights Reserved.</p>
        </Container>
      </footer>

      {/* Global Background Color */}
      <style>{`
        body {
          background-color: #f0f8ff; /* Light background color for the entire screen */
        }
      `}</style>
    </>
  );
};

export default Dashboard;
