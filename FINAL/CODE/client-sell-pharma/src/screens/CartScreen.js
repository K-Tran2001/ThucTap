import React, {useEffect} from 'react';
import Header from './../components/Header';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {checkCart} from '../Redux/Actions/CartAction';
import CartItem from '../components/homeComponents/CartItem';

const CartScreen=() => {
  window.scrollTo(0,0);
  const {cartItems,result}=useSelector((state) => state.cart);
  const dispatch=useDispatch();

 useEffect(()=>{
  dispatch(checkCart(cartItems))
 },[dispatch,cartItems])


  

 
  return (
    <>
      <Header />
      
      <div className="container">
        <div className="alert alert-info text-center mt-3">
          Tổng sản phẩm
          <Link className="text-success mx-2" to="/cart">
            {cartItems?.length}
          </Link>
        </div>
        {cartItems?.map((item,index) => {
          
          return (
            <CartItem key={index} item={item}/>
          );
        })}
        {cartItems?.length===0? (
          <div className="container">
            <div className=" alert alert-info text-center mt-3">
              Giỏ hàng rỗng!
              <Link
                className="btn btn-success mx-5 px-5 py-3"
                to="/"
                style={{
                  fontSize: '12px',
                }}
              >
                Mua ngay
              </Link>
            </div>
          </div>
        ):(
          ''
        )}

        {/* End of cart items */}
        <div className="total">
          <span className="sub">Tổng cộng:</span>
          <span className="total-price">
            {(cartItems.reduce((sum,curr) => sum+curr.price*curr.qty*(1-(curr.discount)/100),0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}
          </span>
        </div>
        <hr />
        <div className="cart-buttons d-flex align-items-center row">
          <Link to="/" className="col-md-6 ">
            <button>Tiếp tục mua sắm</button>
          </Link>
          <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">              
            <button>
              {result?
                <Link to="/shipping" className="text-white">
                  Đặt hàng
                </Link>
              :"Không thể đặt hàng."  
              }
            </button>
            
            
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
