import React from 'react'

export default function Contacts() {
  return (
    <div className='contacts-main'>
      <div className='area'>
        <p>Телефон:</p>
        <a href='tel:+380506686307'><img src='./img/phone.png' alt='none foto'></img>+38(050)668-63-07</a>
        <a href='tel:+380506686307'><img src='./img/viber.png' alt='none foto'></img>+38(050)668-63-07</a>
        <p>Соціальні мережі:</p>
        <div className='social'>
        <a href='https://www.instagram.com/dlyatebe_beauty/'><img src='./img/instagram.png' alt='none foto'></img>Instagram</a>
            <a href='https://www.facebook.com/people/Dlya-tebe-beauty/61556109684953/?mibextid=sCpJLy'><img src='./img/facebook.png' alt='none foto'></img>Facebook</a>
        </div>
        <p>Адреса:</p>
        <p>проспект Михайла Лушпи 5 корпус 22/1</p>
      </div>
      <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.8744206193815!2d34.81205031206227!3d50.90621927156469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4129021e6d068955%3A0x2b5ed176ef45cbd3!2z0JfQsNGA0LXRh9C90YvQuSDRgNCw0LnQvtC9LCDQodGD0LzRiywg0KHRg9C80YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsINCj0LrRgNCw0LjQvdCwLCA0MDAwMA!5e1!3m2!1sru!2spl!4v1709497444786!5m2!1sru!2spl"></iframe>
    </div>
  )
}
