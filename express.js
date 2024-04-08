
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json()); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '*****************',
    pass: ' **** **** **** ****',
  },
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

app.post('/send-email', async (req, res) => {
    const { orders, count, userName, userSurName, userMail, userCity, userPost, userPhone } = req.body;
  
    if (!orders) {
      return res.status(400).send('Bad Request: Orders data is missing');
    }
  
    const emailBody = orders.map(order => `${order.title} - ${order.quantity} шт, Об'єм - ${order.volume}` + '\n' + "Код товару -" + `${order.id}` ).join('\n') + '\n' + 'Загальна ціна :' + count.toFixed(2) + '\n' + 
    'Ім\'я:  ' + userName + '\n' + 
    'Прізвище:  ' + userSurName + '\n' + 
    'Телефон:  ' + userPhone + '\n' + 
    'Пошта:  ' + userMail + '\n' + 
    'Поштовий індекс:  ' + userPost + '\n' + 
    'Місто:  ' + userCity + '\n';
  
    const mailOptions = {
      from: '**************',
      to: '****************',
      subject: 'Нове замовлення',
      text: emailBody,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    }
  });

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});