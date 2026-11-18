
import React, { useState } from 'react';

import {
  useSelector,
  useDispatch
} from 'react-redux';

import {
  addItem,
  removeItem,
  clearCart,
  applyPromoCode
} from '../redux/cartSlice';

export default function Cart() {

  const {
    items,
    totalCount,
    totalPrice,
    discountPercent
  } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const [promoCode, setPromoCode] = useState('');

  const [promoMessage, setPromoMessage] = useState('');

  const handlePromo = () => {

    const code = promoCode.trim().toUpperCase();

    dispatch(applyPromoCode(code));

    if (code === 'POLY2027') {
      setPromoMessage('Code promo applique : -20%');
    } else {
      setPromoMessage('Code promo invalide');
    }

  };

  const finalPrice =
    totalPrice * (1 - discountPercent / 100);

  return (

    <div className="cart-card">

      <div className="cart-header">

        <h3>Mon Panier Redux</h3>

        {items.length > 0 && (

          <button onClick={() => dispatch(clearCart())}>
            Vider
          </button>

        )}

      </div>

      {items.length === 0 ? (

        <p>Le panier est actuellement vide.</p>

      ) : (

        <>

          {items.map((item) => (

            <div key={item.id} className="cart-row">

              <span>
                {item.name} ({item.price} DT x {item.quantity})
              </span>

              <div>

                <button
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => dispatch(addItem(item))}
                >
                  +
                </button>

              </div>

            </div>

          ))}

          <hr />

          <p>
            Nombre total d'articles :
            <strong> {totalCount}</strong>
          </p>

          <p>
            Sous-total :
            <strong> {totalPrice} DT</strong>
          </p>

          <div className="promo-area">

            <h4>Code Promo</h4>

            <input
              type="text"
              placeholder="Entrez POLY2027"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />

            <button onClick={handlePromo}>
              Appliquer
            </button>

            <p
              style={{
                color: discountPercent > 0 ? 'green' : 'red'
              }}
            >
              {promoMessage}
            </p>

          </div>

          <hr />

          <p>
            Montant Total :
            <strong
              style={{
                color: discountPercent > 0 ? 'green' : 'inherit'
              }}
            >
              {' '}{finalPrice.toFixed(2)} DT
            </strong>
          </p>

        </>

      )}

    </div>

  );

}
