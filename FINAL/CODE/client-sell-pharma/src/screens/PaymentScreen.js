import React,{useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {savePaymentMethod} from "../Redux/Actions/CartAction";
import Header from "./../components/Header";

const PaymentScreen=() => {
  const {shippingAddress}=useSelector(state => state.cart);

  
  window.scrollTo(0,0);
  const [payment,setPayment]=useState(null);
  const history=useHistory();
  const dispatch=useDispatch();

  const submitHandler=(e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
    history.push('/placeorder')
  };
  useEffect(() => {
    if(!shippingAddress.address) {
      history.push('/shipping');
    }
  },[dispatch,history,shippingAddress.address])
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>CHỌN PHƯƠNG THỨC THANH TOÁN</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input className="form-check-input" name="payment" type="radio" value="PayPal" onChange={e => setPayment(e.target.value)} />
              <label className="form-check-label">PayPal hoặc thẻ tín dụng</label>
            </div>
            <div className="radio-container">
              <input className="form-check-input" name="payment" type="radio" value="COD" onChange={e => setPayment(e.target.value)}/>
              <label className="form-check-label">Trả khi nhận hàng</label>
            </div>
          </div>

          <button type="submit" className="text-white">
            Tiếp tục
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
