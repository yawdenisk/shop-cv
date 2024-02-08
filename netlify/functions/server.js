const express = require('express');
const nodemailer = require('nodemailer');
const serverless = require('serverless-http');
const path = require('path');

const app = express();

app.use(express.json()); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shop.dla.tebe@gmail.com',
    pass: 'fgaq pihy lguw mdia',
  },
});

app.post('/send-email', async (req, res) => {
  const { orders, count, userName, userSurName, userMail, userCity, userPost, userPhone } = req.body;

  if (!orders) {
    return res.status(400).json({ error: 'Bad Request: Orders data is missing' });
  }

  const emailBody = orders.map(order => `${order.title} - ${order.quantity} шт.`).join('\n') + '\n' + 'Загальна ціна :' + count.toFixed(2) + '\n' + 
    'Ім\'я:  ' + userName + '\n' + 
    'Прізвище:  ' + userSurName + '\n' + 
    'Телефон:  ' + userPhone + '\n' + 
    'Пошта:  ' + userMail + '\n' + 
    'Поштовий індекс:  ' + userPost + '\n' + 
    'Місто:  ' + userCity + '\n';

  const mailOptions = {
    from: 'shop.dla.tebe@gmail.com',
    to: 'shop.dla.tebe@gmail.com',
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
  res.status(500).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Error</title>
    </head>
    <body>
      <h1>Что-то пошло не так!</h1>
      <p>Пожалуйста, <a href="#" onclick="window.location.reload();">обновите страницу</a>.</p>
    </body>
    </html>
  `);
});

module.exports.handler = serverless(app);