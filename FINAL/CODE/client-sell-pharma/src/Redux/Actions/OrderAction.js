import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_CHECK_FAIL,
    ORDER_CHECK_REQUEST,
    ORDER_CHECK_SUCCESS,

    ORDER_CANCELED_FAIL, ORDER_CANCELED_SUCCESS, ORDER_CANCELED_REQUEST,
    ORDER_RECEIVED_FAIL, ORDER_RECEIVED_SUCCESS, ORDER_RECEIVED_REQUEST,
  } from "../Constants/OrderConstant";
  import axios from "axios";
  import { CART_CLEAR_ITEMS } from "../Constants/CartConstant";
  import { logout } from "./UserAction";
  
  // CREATE ORDER
  export const  createOrder = (order,userId) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST });
  
      const {userLogin: { userInfo }} = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.get(`/api/customers/${userId}/inc-coin?coin=${order.discountPoint*(-1)}`, config);
  
      const { data } = await axios.post(`/api/orders`, order, config);
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
      
      dispatch({ type: CART_CLEAR_ITEMS, payload: data });
      localStorage.removeItem("cartItems");
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: message,
      });
    }

  };

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};


export const checkOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CHECK_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}/check-stock`, config);
    dispatch({ type: ORDER_CHECK_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_CHECK_FAIL,
      payload: message,
    });
  }
};

// ORDER PAY
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config, 
      );
      /*===========cong diem tieu dung ========== */
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: message,
      });
    }
  };



// USER ORDERS
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/`, config);
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    });
  }
};


//ORDER CANCELED for User
export const cancelOrder = (orderItems) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CANCELED_REQUEST });
        // userInfo -> userLogin -> getState(){globalState}
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        // api not transmiss any params because it just change state of deliverd 
        const { data } = await axios.get(`/api/orders/${orderItems._id}/canceled`, config);
        dispatch({ type: ORDER_CANCELED_SUCCESS, payload: data });

    
        
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_CANCELED_FAIL,
            payload: message,
        });
    }
};

//ORDER RECEIVED  for User
export const receiveOrder  = (orderItems) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_RECEIVED_REQUEST });
        // userInfo -> userLogin -> getState(){globalState}
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.get(`/api/customers/${orderItems.user._id}/inc-coin?coin=${orderItems.totalPoints}`, config);

        // api not transmiss any params because it just change state of deliverd 
        const { data } = await axios.get(`/api/orders/${orderItems._id}/received`, config);
        dispatch({ type: ORDER_RECEIVED_SUCCESS, payload: data });

    
        
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_RECEIVED_FAIL,
            payload: message,
        });
    }
};
