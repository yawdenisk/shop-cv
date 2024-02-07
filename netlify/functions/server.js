const express = require('express');
const nodemailer = require('nodemailer');

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

// Обертываем наше приложение Express в функцию
const handler = async (event) => {
  try {
    const { httpMethod, body } = event;

    if (httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const data = JSON.parse(body);

    const response = await new Promise((resolve, reject) => {
      // Функция обработки запроса Express
      app(req, res, (result) => {
        resolve({ statusCode: result.status, body: result.body });
      });
    });

    return response;
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};

module.exports = { handler };