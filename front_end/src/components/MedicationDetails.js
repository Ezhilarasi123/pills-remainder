import React, { useState } from 'react';
import { Container, Card, Button, ProgressBar, InputGroup, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const MedicineTracker = () => {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    medications: [{
      name: '',
      dosage: '',
      time: '',
      days: [],
      refillDate: ''
    }]
  });
  const [error, setError] = useState(null); // To handle error messages
  const [success, setSuccess] = useState(false); // To handle success state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state on each submit

    try {
      // Make a POST request to the medication endpoint with user data
      await axios.post('http://localhost:3001/medications', userData);

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      setError(error.response?.data?.msg || 'Submission failed. Please try again.');
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 0) {
      if (!userData.name) newErrors.name = "Enter your name";
      if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) newErrors.email = "Enter a valid email";
    } else if (step === 1) {
      userData.medications.forEach((med, index) => {
        if (!med.name) newErrors[`name${index}`] = "Enter medicine name";
        if (!med.dosage) newErrors[`dosage${index}`] = "Enter dosage";
        if (!med.time) newErrors[`time${index}`] = "Enter dosage time";
      });
    } else if (step === 2) {
      userData.medications.forEach((med, index) => {
        if (!med.refillDate) newErrors[`refillDate${index}`] = "Select refill date";
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleMedicationChange = (index, field, value) => {
    const newMedications = [...userData.medications];
    newMedications[index][field] = value;
    setUserData({ ...userData, medications: newMedications });
  };

  const addMedication = () => {
    setUserData({
      ...userData,
      medications: [...userData.medications, { name: '', dosage: '', time: '', days: [], refillDate: '' }]
    });
  };

  const removeMedication = (index) => {
    // Only allow removal if there is more than one medication
    if (userData.medications.length > 1) {
      const newMedications = userData.medications.filter((_, i) => i !== index);
      setUserData({ ...userData, medications: newMedications });
    }
  };

  const handleDayToggle = (index, day) => {
    const newMedications = [...userData.medications];
    const days = newMedications[index].days;
    if (days.includes(day)) {
      newMedications[index].days = days.filter(d => d !== day);
    } else {
      newMedications[index].days.push(day);
    }
    setUserData({ ...userData, medications: newMedications });
  };

  const handleDateChange = (index, value) => {
    const newMedications = [...userData.medications];
    newMedications[index].refillDate = value;
    setUserData({ ...userData, medications: newMedications });
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
      setErrors({});
    }
  };

  const handlePrevious = () => setStep(step - 1);

  return (
    <Container className="mt-5" >
      <Card className="p-4 shadow">
        <h4 style={{textAlign:" center"}}> Track Your Medication </h4>
      <ProgressBar 
  now={(step / 3) * 100} 
  className="mb-4" 
  style={{ backgroundColor: '#556b2f' }} // Set your desired color here
/>


        {step === 0 && (
          <Card className="p-3">
            <h5>Personal Information</h5>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={userData.name}
                onChange={handleInputChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={userData.email}
                onChange={handleInputChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Button onClick={handleNext} variant="primary" className="w-100" style={{ 
                padding: '10px', 
                fontSize: '16px', 
                backgroundColor: '#556b2f', 
                borderColor: '#556b2f', 
                borderRadius: '5px' 
              }}>Next</Button>
          </Card>
        )}

        {step === 1 && (
          <Card className="p-3">
            <h5>Medication Details</h5>
            {userData.medications.map((med, index) => (
              <div key={index} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label>Medicine Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Medicine name"
                    value={med.name}
                    onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                    isInvalid={!!errors[`name${index}`]}
                  />
                  <Form.Control.Feedback type="invalid">{errors[`name${index}`]}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Dosage Level</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Dosage level"
                    value={med.dosage}
                    onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                    isInvalid={!!errors[`dosage${index}`]}
                  />
                  <Form.Control.Feedback type="invalid">{errors[`dosage${index}`]}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Dosage Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={med.time}
                    onChange={(e) => handleMedicationChange(index, 'time', e.target.value)}
                    isInvalid={!!errors[`time${index}`]}
                  />
                  <Form.Control.Feedback type="invalid">{errors[`time${index}`]}</Form.Control.Feedback>
                </Form.Group>
                <Form.Label>Days of the Week</Form.Label>
                <InputGroup className="mb-3">
                  {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, i) => (
                    <Button
                      key={i}
                      variant={med.days.includes(day) ? 'primary' : 'outline-primary'}
                      onClick={() => handleDayToggle(index, day)}
                      className="me-1"
                    >
                      {day}
                    </Button>
                  ))}
                </InputGroup>
                <Button variant="outline-danger" onClick={() => removeMedication(index)}>
                  Remove Medicine
                </Button>
              </div>
            ))}
            <Button onClick={addMedication} variant="outline-success" className="mb-3 w-100">
              + Add Another Medicine
            </Button>
            <Button onClick={handleNext} variant="primary" className="w-100" style={{ 
                padding: '10px', 
                fontSize: '16px', 
                backgroundColor: '#556b2f', 
                borderColor: '#556b2f', 
                borderRadius: '5px' 
              }}>Next</Button>
            <Button onClick={handlePrevious} variant="outline-secondary" className="w-100 mt-2">Back</Button>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-3">
            <h5>Medication Refill Dates</h5>
            {userData.medications.map((med, index) => (
              <Form.Group key={index} className="mb-3">
                <Form.Label>Refill Date for {med.name || `Medication ${index + 1}`}</Form.Label>
                <Form.Control
                  type="date"
                  value={med.refillDate}
                  onChange={(e) => handleDateChange(index, e.target.value)}
                  isInvalid={!!errors[`refillDate${index}`]}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors[`refillDate${index}`]}</Form.Control.Feedback>
              </Form.Group>
            ))}
            <Button onClick={handleNext} variant="primary" className="w-100" style={{ 
                padding: '10px', 
                fontSize: '16px', 
                backgroundColor: '#556b2f', 
                borderColor: '#556b2f', 
                borderRadius: '5px' 
              }}>Next</Button>
            <Button onClick={handlePrevious} variant="outline-secondary" className="w-100 mt-2">Back</Button>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-3 text-center">
            <h5>Review & Submit</h5>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            {userData.medications.map((med, index) => (
              <div key={index}>
                <p><strong>Medicine:</strong> {med.name}</p>
                <p><strong>Dosage:</strong> {med.dosage}</p>
                <p><strong>Time:</strong> {med.time}</p>
                <p><strong>Days:</strong> {med.days.join(',')}</p>
                <p><strong>Refill Date:</strong> {med.refillDate}</p>
              </div>
            ))}
            <Button variant="success" className="w-100 mt-3" style={{ 
                backgroundColor: '#556b2f', 
                borderColor: '#556b2f', 
              }}onClick={handleSubmit} >Submit</Button>
            <Button onClick={handlePrevious} variant="outline-secondary" className="w-100 mt-2">Back</Button>
            {error && <p className="text-danger text-center mt-3">{error}</p>}
            {success && <p className="text-success text-center mt-3">Submission successful! Redirecting...</p>}
          </Card>
        )}
      </Card>
    </Container>
  );
};

export default MedicineTracker;


