const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  medications: [
    {
      name: {
        type: String,
        required: true
      },
      dosage: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      days: {
        type: [String],
        required: true
      },
      refillDate: {
        type: Date,
        required: true
      },
      refillReminderSent: {  // Flag to check if reminder is already sent
        type: Boolean,
        default: false
      }
    }
  ]
});


const MedicationModel = mongoose.model("Medication", medicationSchema);
module.exports = MedicationModel;
