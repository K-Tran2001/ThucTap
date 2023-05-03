import React,{useEffect} from 'react'
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {removeFromCart} from '../../Redux/Actions/CartAction.js';
import {checkDrugStoreStock} from "../../Redux/Actions/DrugStoreActions"

const CartItem = (props) => {
    const {index,item }=props
    const dispatch=useDispatch()


  useEffect(()=>{
    dispatch(checkDrugStoreStock(item.qty,item.drugstoreId))
    
  },[dispatch,item.drugstoreId])

  return (
    <div key={index}>
      
    <div className="cart-item row">
      <div
        onClick={() => dispatch(removeFromCart(item.product))}
        className="remove-button d-flex justify-content-center align-items-center"
      >
        <i className="fas fa-times"></i>
      </div>
      <div className="cart-image col-md-3">
        <img src={`${item?.image?.slice(0,0+1)[0]}`} alt="nike" />
      </div>
      <div className="cart-text col-md-5 d-flex align-items-center">
        <Link to="#">
          <h4>{item.name}</h4>
        </Link>
      </div>
      <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
        <h6>QUANTITY</h6>

        <label 
          //className="form-control"
          value={item.qty}
          disabled
        >{item.qty}</label>
        
        
        
      </div>
      <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
        <h6>SUBTOTAL</h6>
        <p style={{textDecoration:"line-through",opacity:"60%"}}>{(item.qty*item.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"} </p>
        <h4 >{(item.qty*item.price*(1-item.discount/100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</h4>
      </div>

      
    </div>
  </div>
  )
}

export default CartItem
