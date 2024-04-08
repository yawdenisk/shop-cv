const express = require('express');
const nodemailer = require('nodemailer');
const serverless = require('serverless-http');
const path = require('path');

const app = express();

app.use(express.json()); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ' *************',
    pass: '**** **** **** ****',
  },
});

app.post('/send-email', async (req, res) => {
  const { orders, count, userName, userSurName, userMail, userCity, userPost, userPhone } = req.body;

  if (!orders) {
    return res.status(400).json({ error: 'Bad Request: Orders data is missing' });
  }

  const emailBody = orders.map(order => `${order.title} - ${order.quantity} шт, Об'єм - ${order.volume}` + '\n' + "Код товару -" + `${order.id}` ).join('\n') + '\n' + 'Загальна ціна :' + count.toFixed(2) + '\n' + 
    'Ім\'я:  ' + userName + '\n' + 
    'Прізвище:  ' + userSurName + '\n' + 
    'Телефон:  ' + userPhone + '\n' + 
    'Пошта:  ' + userMail + '\n' + 
    'Поштовий індекс:  ' + userPost + '\n' + 
    'Місто:  ' + userCity + '\n';

  const mailOptions = {
    from: '***************',
    to: '****************',
    subject: 'Нове замовлення',
    text: emailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error sending email' });
  }
});

app.use(express.static(path.join(__dirname, 'build')));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports.handler = serverless(app);