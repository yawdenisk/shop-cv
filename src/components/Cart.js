import { useState } from "react";
export default function Cart({addToCart, showCart, cartItems, showCartName}) {
  let [clicked, setClicked] = useState(false);
  let [slectedItem, setSelectedItem] = useState(null);
  function showItem(item){
    setClicked(clicked = !clicked);
    setSelectedItem(item)
  }
  let [description, setDescription] = useState(true);
  let [using, setUsing] = useState(false);
  const handleButtonClick = (id) => {
    const buttons = document.querySelectorAll('.toggle-button');
    buttons.forEach(button => {
      button.style.background = 'none';
      button.style.color = 'initial';
    });

    const button = document.getElementById(id);
    button.style.background = 'grey';
    button.style.color = 'white';
  }
  return (
    <div className='cart-main'>
      <p className='p1'>Католог</p>
      <div className='filter-menu'>
        <button onClick={() => showCart('washing')}>Умивання</button>
        <button onClick={() => showCart('toning')}>Тонізація</button>
        <button onClick={() => showCart('serum')}>Сироватка</button>
        <button onClick={() => showCart('cream')}>Крем</button>
        <button onClick={() => showCart('peeling')}>Пілінг</button>
        <button onClick={() => showCart('other')}>Інше</button>
      </div>
      <label>
          <input placeholder="пошук товару за назвою 🔍︎"onChange={(event) => showCartName(event.target.value)}></input>
        </label>
        <div className='carts'>
          {cartItems.map((el) => (
            <div className='cart' key={el.id}>
              <button onClick={() => showItem(el)}><img src={'./img/' + el.foto} alt='none foto' /></button>
              <p>{el.title}</p>
              <p>{el.count} грн</p>
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
              <div className="buttons">
                {(slectedItem.category === "washing") && (
                  <>
                  <button className="toggle-button" id="btn50" onClick={() => {handleButtonClick('btn50');setSelectedItem({ ...slectedItem, count: slectedItem.count50ml , volume : 50})}}>50ml</button>
                  <button className="toggle-button" id="btn100" onClick={() => {handleButtonClick('btn100');setSelectedItem({ ...slectedItem, count: slectedItem.count100ml , volume : 100})}}>100ml</button>
                  <button className="toggle-button" id="btn120" onClick={() => {handleButtonClick('btn120');setSelectedItem({ ...slectedItem, count: slectedItem.count120ml , volume : 120})}}>120ml</button>
                  <button className="toggle-button" id="btn150" onClick={() => {handleButtonClick('btn150');setSelectedItem({ ...slectedItem, count: slectedItem.count150ml , volume : 150})}}>150ml</button>
                  <button className="toggle-button" id="btn200" onClick={() => {handleButtonClick('btn200');setSelectedItem({ ...slectedItem, count: slectedItem.count200ml , volume : 200})}}>200ml</button>
                  </>
                )}
                {(slectedItem.category === "toning") && (
                  <>
                  <button className="toggle-button" id="btn50" onClick={() => {handleButtonClick('btn50');setSelectedItem({ ...slectedItem, count: slectedItem.count50ml , volume : 50})}}>50ml</button>
                  <button className="toggle-button" id="btn100" onClick={() => {handleButtonClick('btn100');setSelectedItem({ ...slectedItem, count: slectedItem.count100ml , volume : 100})}}>100ml</button>
                  <button className="toggle-button" id="btn150" onClick={() => {handleButtonClick('btn150');setSelectedItem({ ...slectedItem, count: slectedItem.count150ml , volume : 150})}}>150ml</button>
                  <button className="toggle-button" id="btn200" onClick={() => {handleButtonClick('btn200');setSelectedItem({ ...slectedItem, count: slectedItem.count200ml , volume : 200})}}>200ml</button>
                  </>
                )}
                {(slectedItem.category === "serum") && (
                  <>
                  <button className="toggle-button" id="btn10" onClick={() => {handleButtonClick('btn10');setSelectedItem({ ...slectedItem, count: slectedItem.count10ml , volume : 10})}}>10ml</button>
                  <button className="toggle-button" id="btn20" onClick={() => {handleButtonClick('btn20');setSelectedItem({ ...slectedItem, count: slectedItem.count20ml , volume : 20})}}>20ml</button>
                  <button className="toggle-button" id="btn30" onClick={() => {handleButtonClick('btn30');setSelectedItem({ ...slectedItem, count: slectedItem.count30ml , volume : 30})}}>30ml</button>
                  </>
                )}
                {(slectedItem.category === "cream") && (
                  <>
                  <button className="toggle-button" id="btn10" onClick={() => {handleButtonClick('btn10');setSelectedItem({ ...slectedItem, count: slectedItem.count10ml , volume : 10})}}>10ml</button>
                  <button className="toggle-button" id="btn20" onClick={() => {handleButtonClick('btn20');setSelectedItem({ ...slectedItem, count: slectedItem.count20ml , volume : 20})}}>20ml</button>
                  <button className="toggle-button" id="btn30" onClick={() => {handleButtonClick('btn30');setSelectedItem({ ...slectedItem, count: slectedItem.count30ml , volume : 30})}}>30ml</button>
                  <button className="toggle-button" id="btn50" onClick={() => {handleButtonClick('btn50');setSelectedItem({ ...slectedItem, count: slectedItem.count50ml , volume : 50})}}>50ml</button>
                  </>
                )}
                {(slectedItem.category === "peeling") && (
                  <>
                  <button className="toggle-button" id="btn10" onClick={() => {handleButtonClick('btn10');setSelectedItem({ ...slectedItem, count: slectedItem.count10ml , volume : 10})}}>10ml</button>
                  <button className="toggle-button" id="btn20" onClick={() => {handleButtonClick('btn20');setSelectedItem({ ...slectedItem, count: slectedItem.count20ml , volume : 20})}}>20ml</button>
                  <button className="toggle-button" id="btn30" onClick={() => {handleButtonClick('btn30');setSelectedItem({ ...slectedItem, count: slectedItem.count30ml , volume : 30})}}>30ml</button>
                  <button className="toggle-button" id="btn60" onClick={() => {handleButtonClick('btn60');setSelectedItem({ ...slectedItem, count: slectedItem.count60ml , volume : 60})}}>60ml</button>
                  </>
                )}
              </div>
              <div className="close" onClick={() => {setClicked(clicked = !clicked); setDescription(true); setUsing(false)}}>
                <span></span>
                <span></span>
              </div>
              <button className='button1' onClick={() => {addToCart(slectedItem); setClicked(clicked = !clicked)}}>Додати до кошика</button>
            </div>
            <div className="character">
              <div className="nav">
              <button style={{ backgroundColor: description ? 'grey' : 'white' , color: description ? 'white' : 'black'}} onClick={() => {setDescription(true); setUsing(false)}}>Опис</button>
              <button style={{ backgroundColor: using ? 'grey' : 'white' , color: using ? 'white' : 'black'}} onClick={() => {setDescription(false); setUsing(true)}}>Cпосіб застосування</button>
              </div>
              <div className="area" key={slectedItem.id}>
                {description && (
                  <p>{slectedItem.description}</p>
                )}
                {using && (
                  <p>{slectedItem.Застосування}</p>
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
