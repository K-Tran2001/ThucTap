import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Message from "../components/LoadingError/Error";

import Header from "./../components/Header";
import Footer2 from "../components/Footer/Footer2.js"

import PlaceOrderBillScreen from "./PlaceOrderBillScreen";

const PlaceOrderScreen=() => {
  const userDetails=useSelector(state => state.userDetails);
  const {user}=userDetails
  const cart=useSelector(state => state.cart);
  const {shippingAddress,cartItems,paymentMethod}=cart;

  return (
    <>
      <Header />
      <div className="container pb-2">
        {/*{
          loading? (<Loading />):error? (<Message>{error}</Message>):''
        }*/}
        <div className="row order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Khách hàng</strong>
                </h5>
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Thông tin đơn hàng</strong>
                </h5>
                <p>Vận chuyển: {shippingAddress.country}</p>
                <p>Phương thức thanh toán: {paymentMethod}</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Vận chuyển đến</strong>
                </h5>
                <p>
                  Địa chỉ: {shippingAddress.address}
                </p>
              </div>
            </div>
          </div>
        </div>
        {
          cartItems.length>0? (<div className="row order-products justify-content-between">
            <div className="col-lg-8">
              {/* <Message variant="alert-info mt-5">Your cart is empty</Message> */}

              {
                cartItems.map((cart,index) => {
                  return (
                    <div key={index} className="order-product row">
                      <div className="col-md-3 col-6">
                        <img src={cart.image?.slice(0,0+1)[0]} alt="product" />
                      </div>
                      <div className="col-md-5 col-6 d-flex align-items-center">
                        <Link to={"/"}>
                          <h6>{cart.name}</h6>
                        </Link>
                      </div>
                      <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                        <h4>SỐ LƯỢNG</h4>
                        <h6>{cart.qty}</h6>
                      </div>
                      <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                        <h4>THÀNH TIỀN</h4>
                        <h6>{(cart.qty*cart.price*(1-cart.discount/100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</h6>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            {/* total */}
           <PlaceOrderBillScreen/>
          </div>):<Message>Giỏ hàng của bạn hiện đang trống.</Message>
        }
      </div>
      <Footer2/>
    </>
  );
};

export default PlaceOrderScreen;
