const express = require('express');
const cors = require('cors'); // Добавим модуль для обработки CORS
const nodemailer = require('nodemailer');
const serverless = require('serverless-http'); 
const app = express();

// Добавим использование CORS
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shop.dla.tebe@gmail.com',
    pass: 'fgaq pihy lguw mdia',
  },
});

app.post('/send-email', async (req, res) => { // Обработчик POST-запроса для отправки письма
  const { orders, count, userName, userSurName, userMail, userCity, userPost, userPhone } = req.body;

  if (!orders) {
    return res.status(400).send('Bad Request: Orders data is missing');
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
    await transporter.sendMail(mailOptions); // Отправляем письмо
    res.status(200).send('Email sent successfully'); // Ответ в случае успешной отправки
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email'); // Ответ в случае ошибки
  }
});

module.exports = app;
module.exports.handler = serverless(app);