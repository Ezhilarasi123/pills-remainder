
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Sign up the user
      await axios.post('http://localhost:3001/signup', { email, password });
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/login'); // Redirect to login after successful signup
      }, 2000);

    } catch (error) {
      setError(error.response?.data?.msg || 'Signup failed. Please try again.');
    }
  };

  return (
    <Container 
      fluid 
      className="d-flex align-items-center justify-content-center min-vh-100" 
      
  style={{
    background: "linear-gradient(to bottom right, #8BC34A, #4CAF50)", // Put the value in quotes
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}
>
  {/* Your form components go here */}


      <Card 
        className="p-4" 
        style={{ 
          width: '100%', 
          maxWidth: '400px', 
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', 
          borderRadius: '10px',
          borderColor: '6b8e23',
        }}
      >
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: '#333' }}>Sign up</h2>

          {success && <Alert variant="success">Sign up successful! Redirecting to login...</Alert>}
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

            <Form.Group controlId="formConfirmPassword" className="mb-4">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              Sign up
            </Button>
          </Form>

          <div className="text-center mt-3">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#556b2f' }}>
              Login
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
