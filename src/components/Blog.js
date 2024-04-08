import React from 'react'
import { useState } from 'react';
export default function Blog() {
  let [clicked, setClicked] = useState(false)
  return (
    <div className='blog-main'>
      <div className='main-area'>
      <p>Онлайн-консультації, які завжди під
рукою. 

Потрібно отримати пораду з приводу краси та здоровʼя,
а подружка не відповідає на повідомлення? З нами ти зможеш отримати влучну та вичерпну відповідь на свої питання! Обрати засоби 
під свій тип шкіри і під свої потреби, спробувати косметику в маленьких обʼємах (на розпив). 
Ми зібрали найкращу команду лікарів косметологів, які стануть
твоєю надійною підтримкою у будь-якій ситуації. 
Ключ до бездоганної шкіри - лежить у правильному професійному догляді вдома. Ми навчимо вас трансформувати свою шкіру!</p>
        <button onClick={() => setClicked(!clicked)}> Отримати Консультацію</button>
        {clicked && (
          <div className='social'>
            <a href='https://www.instagram.com/dlyatebe_beauty/'><img src='./img/instagram.png' alt='none foto'></img>Instagram</a>
            <a href='https://www.facebook.com/people/Dlya-tebe-beauty/61556109684953/?mibextid=sCpJLy'><img src='./img/facebook.png' alt='none foto'></img>Facebook</a>
          </div>
        )}
      </div>
<img src='./img/blog.jpg' alt='none foto'></img>
    </div>
  )
}
