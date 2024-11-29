const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/User');
const MedicationModel = require('./models/Medication');
const nodemailer = require('nodemailer');
const nodeCron = require('node-cron');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/login")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

//login end point
app.post("/login",(req,res) =>{
    const {email,password} = req.body;
    UserModel.findOne({email:email})
    .then(user =>{
        if(user){
            if(user.password == password){
                res.json("Success")
            }
            else{
                res.json("the password is incorrect");
            }
        }
        else{
            res.json("No record existed");
        }
    })
})

// signup endpoint
app.post('/signup', (req, res) => {
    UserModel.create(req.body)
        .then(users => res.status(201).json(users))
        .catch(err => res.status(400).json({ error: err.message }));
});

// medication endpoint
app.post('/medications', async (req, res) => {
    console.log("Received medication data:", req.body); // Debugging line

    try {
        const medication = await MedicationModel.create(req.body);
        res.status(201).json(medication);
    } catch (err) {
        console.error("Error creating medication:", err);
        res.status(400).json({ error: "Submission failed. Please try again later." });
    }
});



//node mailer
const moment = require('moment');  // For date comparison

// Configure the email transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use TLS
    auth: {
        user: process.env.GMAIL,  // Replace with your email
        pass: process.env.PASS     // Use your app-specific password
    }
});

// Schedule a job to run every minute
nodeCron.schedule('* * * * *', async () => {
    console.log("Running scheduled task...");

    try {
        // Get the current time and date
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5); // Format: HH:MM
        const currentDay = moment(now).format('dddd'); // Get current day in full text (e.g., Monday, Tuesday)
        const currentDate = moment(now).format('YYYY-MM-DD'); // Get current date in YYYY-MM-DD format

        // Find medications with matching dosage time and day
        const medications = await MedicationModel.find({
            "medications.time": currentTime,
            "medications.days": currentDay // Match the current day with the user's specified days
        });

        medications.forEach(user => {
            user.medications.forEach(med => {
                if (med.time === currentTime && med.days.includes(currentDay)) {
                    // Send a medication reminder
                    const mailOptions = {
                        from: process.env.GMAIL,  // Replace with your email
                        to: user.email,
                        subject: 'Medication Reminder',
                        text: `Hi ${user.name}, it's time to take your tablet: ${med.name}.`
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log('Error sending email:', error);
                        } else {
                            console.log('Email sent:', info.response);
                        }
                    });
                }
            });
        });

        // Check if refill date matches the current date
        const medicationsForRefill = await MedicationModel.find({
            "medications.refillDate": currentDate,  // Compare refill date with the current date
            "medications.refillReminderSent": false // Only fetch medications where reminder has not been sent yet
        });

        medicationsForRefill.forEach(user => {
            user.medications.forEach(med => {
                if (moment(med.refillDate).format('YYYY-MM-DD') === currentDate) {
                    // Send a refill reminder
                    const mailOptions = {
                        from: process.env.GMAIL,  // Replace with your email
                        to: user.email,
                        subject: 'Medication Refill Reminder',
                        text: `Hi ${user.name}, it's time to refill your medication: ${med.name}.`
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log('Error sending refill email:', error);
                        } else {
                            console.log('Refill email sent:', info.response);
                        }
                    });

                    // After sending the refill reminder, update the flag
                    MedicationModel.updateOne(
                        { _id: user._id, "medications._id": med._id },
                        { $set: { "medications.$.refillReminderSent": true } }
                    ).exec();
                }
            });
        });

    } catch (error) {
        console.error("Error in scheduled task:", error);
    }
});


// Start server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
