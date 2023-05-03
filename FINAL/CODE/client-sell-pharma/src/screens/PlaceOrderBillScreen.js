import React,{useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {createOrder} from "../Redux/Actions/OrderAction";
import {getUserDetails} from "../Redux/Actions/UserAction";
import {ORDER_CREATE_RESET,ORDER_DETAILS_RESET} from "../Redux/Constants/OrderConstant";
import Form from 'react-bootstrap/Form';

const LIMIT_1=100000
const LIMIT_2=200000
const LIMIT_3=300000

const MAX_POINT_LV1=15000
const MAX_POINT_LV2=40000
const MAX_POINT_LV3=60000


const PlaceOrderBillScreen = () => {

    const {order,success}=useSelector(state => state.orderCreate);

    const userDetails=useSelector(state => state.userDetails);
    const {user}=userDetails
    
    const [valueRange,setValueRange]=useState(0)
    const [active,setActive]=useState(false)
    const [totalPrice,setTotalPrice]=useState(0)
    const [check,setCheck]=useState(false)
  



  const dispatch=useDispatch();
  const history=useHistory();
  const cart=useSelector(state => state.cart);
  const {shippingAddress,cartItems,paymentMethod}=cart;
  cart.itemsPrice=parseFloat(cartItems.reduce((sum,current) => sum+current.price*current.qty*(1-current.discount/100),0)) ;
 
  cart.taxPrice=5;
  cart.shippingPrice=10000;
  cart.totalPrice=(cart.itemsPrice+(cart.itemsPrice*(cart.taxPrice/100))+cart.shippingPrice-(check?Number(valueRange):0));
  const placeOrderHandler=(e) => {
    e.preventDefault();
    dispatch(createOrder({
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      itemsPrice: cart.itemsPrice,
      taxPrice: cart.taxPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
      discountPoint:valueRange,
      totalPoints:cartItems.reduce((sum,current) => sum+current.price*current.qty*current.refunded/100,0)
      
    },user._id))
  };
  const [maxPoint,setMaxPoint]=useState(0)
  const handleCheck=()=>{
    if(check){
        setValueRange(0)

        setCheck(!check)
    }else{
        setCheck(!check)
         //setCheck(false)
         if(cart?.totalPrice>LIMIT_3&&user.pCoin>=MAX_POINT_LV3){//toi da doi duoc 60 000
            setMaxPoint(MAX_POINT_LV3);
            setValueRange(maxPoint)
        }
        else if(cart?.totalPrice>LIMIT_2 &&user.pCoin>=MAX_POINT_LV2){//toi da doi duoc MAX_POINT_LV2 
            setMaxPoint(MAX_POINT_LV2);
            setValueRange(maxPoint)
        }
        else if(cart?.totalPrice>LIMIT_1 &&user.pCoin>=MAX_POINT_LV1){//toi da doi duoc MAX_POINT_LV1
            setMaxPoint(MAX_POINT_LV1) 
            setValueRange(maxPoint)
        }
        
    }
  }


  useEffect(() => {
    if(success) {
      history.push(`/order/${order._id}`);
      
      dispatch({type: ORDER_CREATE_RESET})
      dispatch({type: ORDER_DETAILS_RESET})
    }
    if(!paymentMethod) {
      history.push('/payment');
    }
    dispatch(getUserDetails());
    //dispatch(checkOrder(order._id))
  },[dispatch,order,history,success,paymentMethod,check,active,valueRange,])
  return (
    <div className="col-lg-4 d-flex align-items-end flex-column mt-5 subtotal-order">
        
        <table className="table table-bordered">
        <tbody>
            <tr>
            <td>
                <strong>Tổng đơn hàng</strong>
            </td>
            <td style={{textAlign:"right"}}>{cart?.itemsPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</td>
            </tr>
            <tr>
            <td>
                <strong>Vận chuyển</strong>
            </td>
            <td style={{textAlign:"right"}}>{cart.shippingPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</td>
            </tr>
            <tr>
            <td>
                <strong>Giao hàng nhanh</strong>
            </td>
            <td style={{textAlign:"right"}}>{cart.taxPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" %"}</td>
            </tr>
            <tr>
            <td>
                <strong>Tổng cộng</strong>
            </td>
            <td style={{textAlign:"right"}}>{cart.totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</td>
            </tr>
        </tbody>
        </table>
        <div className="w-100">
            <button type="submit" onClick={()=>{
                if(active){
                    setActive(!active)
                    setValueRange(0)
                    setCheck(false)
                }else{
                    setActive(!active)
                    if(cart?.totalPrice>LIMIT_3&&user.pCoin>=MAX_POINT_LV3){//toi da doi duoc MAX_POINT_LV3 
                        setMaxPoint(MAX_POINT_LV3);
                    }
                    else if(cart?.totalPrice>LIMIT_2 &&user.pCoin>=MAX_POINT_LV2){//toi da doi duoc 40 
                        setMaxPoint(MAX_POINT_LV2);
                    }
                    else if(cart?.totalPrice>LIMIT_1 &&user.pCoin>=MAX_POINT_LV1){//toi da doi duoc 15
                        setMaxPoint(MAX_POINT_LV1) 
                    }
                }
                
                
                }} 
                className="text-white mt-2">
                {active?"Hủy bỏ":"Trừ điểm qui đổi"}
            </button>
            {/*{active?<Range total={cart.totalPrice} coin={user.pCoin} valueRange={valueRange} setValueRange={setValueRange}/>:""}*/}
            {
                active?<Form.Check type={"checkbox"} id={`check-api`} className="mt-2">
                        {
                           //Number(order?.totalPrice)>1?
                            <>
                                <Form.Check.Input type={"checkbox"} isValid onChange={handleCheck}/>
                                <Form.Check.Label>{`Chấp nhận đổi ${maxPoint} pCoin để giảm ${maxPoint} VNĐ`}</Form.Check.Label>
                            
                            </>
                            //:""
                           
                            //<div class="alert alert-danger mb-0" role="alert">
                            //    Đơn hàng chưa đạt giá trị tối thiêu
                            //</div>
                        }
                            <Form.Control.Feedback type="valid">
                            Điểm qui đổi còn lại:{" "+user.pCoin-valueRange}
                            </Form.Control.Feedback>
                        </Form.Check>:""
            }
            
        </div>
        <button type="submit" onClick={placeOrderHandler} className="text-white mt-2">
        Xác nhận đặt hàng
        </button>
    </div>
  )
}

export default PlaceOrderBillScreen     
