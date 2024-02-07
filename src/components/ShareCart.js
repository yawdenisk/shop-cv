import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import iconDelete from './media/delete.png'
export default function ShareCart({count, orders, deleteOrder, setQuantity}) {
    async function sendOrdersToEmail() {
        try {
          const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orders, count, userName, userSurName, userMail, userCity, userPost, userPhone}),
          });
      
          if (response.ok) {
            console.log('Email sent successfully');
          } else {
            console.error('Error sending email');
          }
        } catch (error) {
          console.error('Error sending email:', error);
        }
      }
      let [userName, setUserName] = useState('')
      let [userSurName, setUserSurName] = useState('')
      let [userPost, setUserPost] = useState('')
      let [userPhone, setUserPhone] = useState('')
      let [userCity, setUserCity] = useState('')
      let [userMail, setUserMail] = useState('')
      let [agree, setArgee] = useState(false);
  return (
    <div className='share-cart'>
        {orders.length > 0 ? (
            <>
            <div className='cart'>
            <p>Ваше замовлення:</p>
            <div className='orders'>
                {orders.map((el) => (
                        <div className='cart-orders' key={el.id}>
                        <img src={'./img/' + el.foto} alt='none foto' />
                        <p>{el.title}</p>
                        <h4>{el.count} грн</h4>
                        <h5>{el.quantity}</h5>
                        <button className='button-counter' onClick={() => setQuantity(el.quantity += 1)}>+</button>
                        <button className='button-counter' onClick={() => setQuantity (el.quantity > 1 ? el.quantity -= 1 : el.quantity)}>-</button>
                        <button onClick={() => {deleteOrder(el.id); setQuantity(el.quantity = 1)}}>
                            <img src={iconDelete} alt='none foto' />
                        </button>
                        </div>
                    ))}
             </div>
            <p className='sum'>До сплати : {count.toFixed(2)} грн</p>
            <button className='button1' onClick={() => {sendOrdersToEmail(); setArgee(agree = true);}}>Відправити замовлення</button>
        </div>
        <div className='form'>
        <form>
            <p>Заповніть данні покупця:</p>
            <label>
                Ім'я:
                <input type="text" name="name" onChange={(event) => setUserName(event.target.value)}/>
            </label>
            <label>
                Прізвище:
                <input type="text" name="name" onChange={(event) => setUserSurName(event.target.value)} />
            </label>
            <label>
                Телефон:
                <input type="text" name="name" onChange={(event) => setUserPhone(event.target.value)}/>
            </label>
            <label>
                Пошта:
                <input type="text" name="name" onChange={(event) => setUserMail(event.target.value)}/>
            </label>
            <label>
                Місто:
                <input type="text" name="name" onChange={(event) => setUserCity(event.target.value)}/>
            </label>
            <label>
                Поштовий індекс:
                <input type="text" name="name" onChange={(event) => setUserPost(event.target.value)}/>
            </label>
            </form>
            <button className='button1' onClick={() => {sendOrdersToEmail(); setArgee(agree = true);}}>Відправити замовленяя</button>
        </div>
        </>
        ) : (
            <div className='none-cart'>
                <p>Кошик нажаль порожній ☹</p>
                <Link to="/">Повернутися до каталогу</Link>
            </div>
        )}
        {agree && (
          <div className='agree'>
            <p>Дякуємо за покупку</p>
            <p>Ваше замовлення успішно відправлено на обробку</p>
            <Link to='/'>Повернутися до каталогу</Link>
          </div>
        )}
    </div>
  )
}
