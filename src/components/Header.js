import React, { useState } from 'react';
import logo from './media/logo1.png';
import cart from './media/cart.png';
import iconDelete from './media/delete.png';
import { Link } from 'react-router-dom';
import data from './data.json';
  export default function Header({orders, setCartItems, deleteOrder, count, ordersLength, setQuantity}) {
  let [cartOpen, setCartOpen] = useState(false);
  let [burgerMenu, openBurgerMenu] = useState(false);
  function returnCartItems(){
    setCartItems(data);
  }
  return (
    <header>
      <div className='logo' onClick={() => returnCartItems()}>
        <Link to='/'>
          <img src={logo} alt='none logo' height='100px'/>
        </Link>
      </div>
      <div className='links'>
        <Link to='/' onClick={() => returnCartItems()}>
          Каталог
        </Link>
        <Link to='/contacts'>
          Контакти
        </Link>
        <Link to='/blog'>
          Консультація
        </Link> 
      </div>
      <div className={`cart-logo ${cartOpen && 'active'}`} onClick={() => setCartOpen(cartOpen = !cartOpen)}>
          <img src={cart} alt='none cart' height='35px'/>
          <span>{ordersLength}</span>
      </div>
      <div className={`burger ${burgerMenu && 'active'}`} onClick={() => openBurgerMenu(burgerMenu =!burgerMenu)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {cartOpen && (
        <div className='cart-board'>
          {orders.length > 0 ? (
            <div>
              {orders.map((el) => (
                <div className='cart-orders' key={el.id}>
                  <img src={'./img/' + el.foto} alt='none foto' />
                  <p>{el.title} - {el.volume} ml</p>
                  <h5>{el.quantity}</h5>
                  <button className='button-counter' onClick={() => setQuantity(el.quantity += 1)}>+</button>
                  <button className='button-counter' onClick={() => setQuantity (el.quantity > 1 ? el.quantity -= 1 : el.quantity)}>-</button>
                  <button onClick={() => {deleteOrder(el.id); setQuantity(el.quantity = 1)}}>
                    <img src={iconDelete} alt='none foto' />
                  </button>
                </div>
              ))}
              <div className='place'>
              <p className='p-count'>Сумма : {count.toFixed(2)} грн</p>
              <Link to="/cart" className='button-gotocart' onClick={() => setCartOpen(cartOpen = false)}><h1>Перейти до кошику</h1></Link>
              </div>
            </div>
          ) : (
            <p className='p-empty'>Кошик порожній ☹</p>
          )}
        </div>
      )}
        {burgerMenu && (
          <div className='burger-menu'>
            <ul>
              <Link to='/'><li onClick={() => openBurgerMenu(burgerMenu =!burgerMenu)}>Каталог</li></Link>
              <Link to='/contacts'><li onClick={() => openBurgerMenu(burgerMenu =!burgerMenu)}>Контакти</li></Link>
              <Link to='/blog'><li onClick={() => openBurgerMenu(burgerMenu =!burgerMenu)}>Консультація</li></Link>
            </ul>
          </div>
        )}
    </header>
  )
}
