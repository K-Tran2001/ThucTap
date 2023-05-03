import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_CHECK_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS
} from "../Constants/CartConstant";

// ADD TO CART
export const addToCart = (id, qty,discount) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/drugstore/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      drugstoreId:data._id,
      product: data.product._id,
      name: data.product.name,
      image: data.product.image,
      price: data.product.price,
      discount,
      refunded:data.refunded,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


export const checkCart = (cartItems) => async (dispatch, getState) => {
  const { data } = await axios.post(`/api/cart`,cartItems);
  dispatch({
    type: CART_CHECK_ITEMS,
    payload: data,
  });
};

//geState get những cái state của dispatch bên store lưu vào localStogare

// REMOVE PRODUCT FROM CART
export const removeFromCart = (id) => async(dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


// SAVE SHIPPING ADDRESS
export const saveShippingAddress = (data) => async(dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// SAVE PAYMENT METHOD
export const savePaymentMethod = (data) => async(dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
