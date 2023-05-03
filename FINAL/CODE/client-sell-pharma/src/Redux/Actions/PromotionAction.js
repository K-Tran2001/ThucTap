import axios from 'axios';
import {  PROMOTION_PRODUCT_LIST_REQUEST, PROMOTION_PRODUCT_LIST_SUCCESS, PROMOTION_PRODUCT_LIST_FAIL,PROMOTION_PRODUCT_LIST_RESET 

} from '../Constants/PromotionConstants';


import { logout } from "./UserAction";



//PROMOTION PRODUCT LIST
export const promotionProductList = (discountDitail) => async(dispatch, getState)=>{
  try {
    dispatch({type: PROMOTION_PRODUCT_LIST_REQUEST});
    
    const { data } = await axios.post(`/api/promotion/check`,{discountDitail})
    dispatch({type: PROMOTION_PRODUCT_LIST_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PROMOTION_PRODUCT_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: PROMOTION_PRODUCT_LIST_RESET });
    }, 3000);
  }
}

