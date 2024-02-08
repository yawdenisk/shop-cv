import { useState } from "react";
export default function Cart({addToCart, showCart, cartItems, showCartName}) {
  let [clicked, setClicked] = useState(false);
  let [slectedItem, setSelectedItem] = useState(null);
  function showItem(item){
    setClicked(clicked = !clicked);
    setSelectedItem(item);
  }
  return (
    <div className='cart-main'>
      <p className='p1'>Католог</p>
      <div className='filter-menu'>
        <button onClick={() => showCart('cream')}>Крема</button>
        <button onClick={() => showCart('losion')}>Лосьйони</button>
        <button onClick={() => showCart('scub')}>Скраби</button>
        <button onClick={() => showCart('piling')}>Пілінги</button>
        <button onClick={() => showCart('toniq')}>Тоніки</button>
      </div>
      <label>
          <input placeholder="пошук товару за назвою 🔍︎"onChange={(event) => showCartName(event.target.value)}></input>
        </label>
        <div className='carts'>
          {cartItems.map((el) => (
            <div className='cart' key={el.id}>
              <img src={'./img/' + el.foto} alt='none foto' />
              <p>{el.title}</p>
              <p>{el.count} грн</p>
              <button className='button1' onClick={() => addToCart(el)}>Купити</button>
              <button className='button2' onClick={() => showItem(el)}>Оглянути</button>
            </div>
          ))}
        </div> 
        {clicked && (
          <div className="view" key={slectedItem.id}>
            <div className="img-area">
            <img src={'./img/' + slectedItem.foto} alt="none foto"/>
            <p>Код продукту: {slectedItem.id}</p>
            </div>
            <div className="text-area">
              <p>Інформація про продукт:</p>
              <p>Назва: {slectedItem.title}</p>
              <p>Ціна: {slectedItem.count} грн</p>
              <p>Опис: {slectedItem.description}</p>
              <div className="close" onClick={() => setClicked(clicked = !clicked)}>
                <span></span>
                <span></span>
              </div>
              <button className='button1' onClick={() => addToCart(slectedItem)}>Додати до кошика</button>
            </div>
          </div>
        )}
    </div>
  );
}
