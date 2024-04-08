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
      let [agree, setArgee] = useState(false)
      let [error, setError] = useState(false);
      function check(){
        if (userName.length>1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userMail) && userSurName.length>1 && /^\d*$/.test(userPost) && /^\+?\d+$/.test(userPhone) && 5<=userPost.length && userPost.length<=6 && 10<=userPhone.length<=13&& userCity.length>1 && userMail.length>1){
          setArgee(agree = true);
          sendOrdersToEmail();
        }else{
          document.getElementsByName('name').forEach(input => {
            if (input.value.length <= 1) {
              input.style.borderColor = 'red';
              setError(error = true)
            }else{
              input.style.borderColor = 'grey';
            }
          });
          document.getElementsByName('surname').forEach(input => {
            if (input.value.length <= 1) {
              input.style.borderColor = 'red';
              setError(error = true)
            }else{
              input.style.borderColor = 'grey';
            }
          });
          document.getElementsByName('phone').forEach(input => {
            const length = input.value.length;
            if ((length < 10 || length > 13) && !/^\+?\d+$/.test(input.value)) {
              input.style.borderColor = 'red';
              setError(error = true)
            }else{
              input.style.borderColor = 'grey';
            }
          });
          document.getElementsByName('postindex').forEach(input => {
            const length = input.value.length;
            if ((length < 5 || length > 6) || !/^\d*$/.test(input.value)) {
              input.style.borderColor = 'red';
              setError(error = true)
            }else{
              input.style.borderColor = 'grey';
            }
          });
          document.getElementsByName('city').forEach(input => {
            if (input.value.length <= 1) {
              input.style.borderColor = 'red';
              setError(error = true)
            }else{
              input.style.borderColor = 'grey';
            }
          });
          document.getElementsByName('mail').forEach(input => {
            const email = input.value;
            const length = email.length;
            if (length <= 1 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              input.style.borderColor = 'red';
              setError(true);
            } else {
              input.style.borderColor = 'grey';
            }
          });
        }
      }
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
                        <p>{el.title} - {el.volume} ml</p>
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
            <button className='button1' onClick={() => check()}>Відправити замовлення</button>
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
                <input type="text" name="surname" onChange={(event) => setUserSurName(event.target.value)} />
            </label>
            <label>
                Телефон:
                <input type="text" name="phone" placeholder='+380' onChange={(event) => setUserPhone(event.target.value)}/>
            </label>
            <label>
                Пошта:
                <input type="text" name="mail" onChange={(event) => setUserMail(event.target.value)}/>
            </label>
            <label>
                Місто:
                <input type="text" name="city" onChange={(event) => setUserCity(event.target.value)}/>
            </label>
            <label>
                Поштовий індекс:
                <input type="text" name="postindex" onChange={(event) => setUserPost(event.target.value)}/>
            </label>
            </form>
            <button className='button1' onClick={() => check()}>Відправити замовленяя</button>
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
        {error && (
          <div className='error'>
            <p>Ви ввели некоректні данні</p>
            <p>Перевірте правильність написання</p>
            <button className='button1' onClick={() => setError(error=false)}>Спробувати ще раз</button>
          </div>
        )}
    </div>
  )
}
