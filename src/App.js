import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart.js";
import data from "./components/data.json";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Contacts from "./components/Contacts.js";
import Blog from "./components/Blog.js";
import ShareCart from "./components/ShareCart.js";
function App() {
  const [cartItems, setCartItems] = useState(data);
  function showCart(category) {
    const filteredItems = data.filter((el) => el.category === category);
    setCartItems(filteredItems);
  }
  function showCartName(name) {
    const filteredItems = data.filter((el) => el.title.toLowerCase().includes(name.toLowerCase()));
    setCartItems(filteredItems);
  }
  let [orders, setOrders] = useState([]);
  let ordersLength = orders.length;
  let [quantity, setQuantity] = useState();
  console.log(ordersLength);
  function addToCart(item){
    let isEmpty = false; 
    orders.forEach((el) => {
      if(el.id === item.id){
        isEmpty = true;
      }
    })
    if(!isEmpty){
      setOrders([...orders, item]);
    }else{
      alert('Товар вже додано до кошику');
    }
  }
  function deleteOrder(id){
    setOrders(orders.filter(el => el.id !== id));
  }
  let count = 0;
  orders.forEach((el) => {
    count += el.count * el.quantity;
  })
  return (
    <div className="container">
      <Header setCartItems={setCartItems} cartItems={cartItems} quantity={quantity} setQuantity={setQuantity} ordersLength={ordersLength} orders={orders} deleteOrder={deleteOrder} count={count}/>
      <Routes>
      <Route path="/" element={<Cart showCartName={showCartName} addToCart={addToCart} cartItems={cartItems} showCart={showCart}/>}></Route>
      <Route path="/contacts" element={<Contacts />}></Route>
      <Route path="/blog" element={<Blog/>}></Route>
      <Route path="/cart" element={<ShareCart orders={orders} count={count} deleteOrder={deleteOrder} setQuantity={setQuantity}/>}></Route>
      </Routes> 
      <Footer />
    </div>
  );
}

export default App;