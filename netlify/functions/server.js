const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  const { orders, count, userName, userSurName, userMail, userCity, userPost, userPhone } = JSON.parse(event.body);
  
  // Ваша логика для отправки почты
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shop.dla.tebe@gmail.com',
      pass: 'fgaq pihy lguw mdia',
    },
  });

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
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email' }),
    };
  }
};п