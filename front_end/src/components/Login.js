
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Login the user
      const result = await axios.post('http://localhost:3001/login', { email, password });
      
      if (result.data === 'Success') {
        setSuccess(true);
        setTimeout(() => {
          navigate('/'); // Redirect to home page after successful login
        }, 2000);
      } else {
        setError('Invalid login credentials');
      }
    } catch (error) {
      setError(error.response?.data?.msg || 'Invalid login credentials');
    }
  };

  return (
    <Container 
      fluid 
      className="login-container d-flex align-items-center justify-content-center min-vh-100" 
      style={{
        background: "linear-gradient(to bottom right, #8BC34A, #4CAF50)", // Put the value in quotes
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Card 
        className="p-4" 
        style={{ 
          width: '100%', 
          maxWidth: '400px', 
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', 
          borderRadius: '10px',
          borderColor: '#556b2f',
        }}
      >
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: '#333' }}>Login</h2>

          {success && <Alert variant="success">Login successful! Redirecting to home...</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '10px', fontSize: '16px', borderRadius: '5px' }}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: '10px', fontSize: '16px', borderRadius: '5px' }}
                required
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100" 
              style={{ 
                padding: '10px', 
                fontSize: '16px', 
                backgroundColor: '#556b2f', 
                borderColor: '#556b2f', 
                borderRadius: '5px' 
              }}
            >
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#556b2f' }}>
              Signup
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
