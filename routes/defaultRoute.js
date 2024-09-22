import express from "express";
import contacts from "./contacts.json" with {type: 'json'} // #IMP: this is experimental feature

const defaultRoutes = express.Router();

let sentMessages = [
  {
    contact: "firstName lastName",
    time: new Date(),
    message: "Hi. Your OTP is: 123456",
  },
];

// Get all contacts
defaultRoutes.get("/contacts", (req, res) => {
  res.json(contacts);
});

// Get contact by ID
defaultRoutes.get("/contacts/:id", (req, res) => {
  const contact = contacts.find((c) => c.id == req.params.id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Contact not found" });
  }
});

// Send SMS
defaultRoutes.post("/send-message", (req, res) => {
  const { id, message, phone } = req.body;
  const contact = contacts.find((c) => c.id == id);

  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const smsMessage = message.replace("123456", otp.toString());

  const accountSid = process.env.VITE_TWILIO_ACCOUNT_SID;
  const authToken = process.env.VITE_TWILIO_AUTH_TOKEN;
  const twilioNumber = process.env.VITE_TWILIO_NUMBER;
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: message,
      from: twilioNumber, // Your Twilio number
      to: phone,
    })
    .then((message) => {
      sentMessages.push({
        contact: `${contact.firstName} ${contact.lastName}`,
        time: new Date(),
        message: message?.body,
      });
      res.json({ message: "SMS sent successfully" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Failed to send SMS", error: err.message });
    });
});

// Get all sent messages
defaultRoutes.get("/messages", (req, res) => {
  res.json(sentMessages.sort((a, b) => b.time - a.time));
});

export default defaultRoutes;
