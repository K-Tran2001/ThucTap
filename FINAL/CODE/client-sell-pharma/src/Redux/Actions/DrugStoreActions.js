import {
  DRUGSTORE_ALL_FAIL,
  DRUGSTORE_ALL_REQUEST,
  DRUGSTORE_ALL_RESET,
  DRUGSTORE_ALL_SUCCESS,
  DRUGSTORE_CATEGORY_DRUG_FAIL,
  DRUGSTORE_CATEGORY_DRUG_REQUEST,
  DRUGSTORE_CATEGORY_DRUG_RESET,
  DRUGSTORE_CATEGORY_DRUG_SUCCESS,
  DRUGSTORE_CATEGORY_FAIL,
  DRUGSTORE_CATEGORY_REQUEST,
  DRUGSTORE_CATEGORY_RESET,
  DRUGSTORE_CATEGORY_SUCCESS,
  DRUGSTORE_LIST_FAIL,
  DRUGSTORE_LIST_REQUEST,
  DRUGSTORE_LIST_RESET,
  DRUGSTORE_LIST_SUCCESS,
  DRUGSTORE_SINGLE_FAIL,
  DRUGSTORE_SINGLE_REQUEST,
  DRUGSTORE_SINGLE_RESET,
  DRUGSTORE_SINGLE_SUCCESS,
  DRUGSTORE_UPDATE_FAIL,
  DRUGSTORE_UPDATE_REQUEST,
  DRUGSTORE_UPDATE_RESET,
  DRUGSTORE_UPDATE_SUCCESS,

  DRUGSTORE_UPDATE_STOCK_FAIL,
  DRUGSTORE_UPDATE_STOCK_REQUEST,
  DRUGSTORE_UPDATE_STOCK_RESET,
  DRUGSTORE_UPDATE_STOCK_SUCCESS,

  DRUGSTORE_CHECK_STOCK_FAIL,
  DRUGSTORE_CHECK_STOCK_REQUEST,
  DRUGSTORE_CHECK_STOCK_RESET,
  DRUGSTORE_CHECK_STOCK_SUCCESS,

  NEW_DRUGSTORE_LIST_FAIL,
  NEW_DRUGSTORE_LIST_REQUEST,
  NEW_DRUGSTORE_LIST_RESET,
  NEW_DRUGSTORE_LIST_SUCCESS,

  ACTIVE_P_DRUGSTORE_LIST_FAIL,
  ACTIVE_P_DRUGSTORE_LIST_REQUEST,
  ACTIVE_P_DRUGSTORE_LIST_RESET,
  ACTIVE_P_DRUGSTORE_LIST_SUCCESS,

  ACTIVE_DRUGSTORE_LIST_FAIL,
  ACTIVE_DRUGSTORE_LIST_REQUEST,
  ACTIVE_DRUGSTORE_LIST_RESET,
  ACTIVE_DRUGSTORE_LIST_SUCCESS,


  
  BESTSELLER_ACTIVE_DRUGSTORE_LIST_FAIL,
  BESTSELLER_ACTIVE_DRUGSTORE_LIST_REQUEST,
  BESTSELLER_ACTIVE_DRUGSTORE_LIST_RESET,
  BESTSELLER_ACTIVE_DRUGSTORE_LIST_SUCCESS,

  HOT_ACTIVE_DRUGSTORE_LIST_FAIL,
  HOT_ACTIVE_DRUGSTORE_LIST_REQUEST,
  HOT_ACTIVE_DRUGSTORE_LIST_RESET,
  HOT_ACTIVE_DRUGSTORE_LIST_SUCCESS,
} from '../Constants/DrugStoreConstants';
import { logout } from './UserAction';
import axios from 'axios';

// ADMINDRUGSTORE LIST
export const listDrugStore=(keyword=" ",pageNumber=" ",sort=" ") => async (dispatch,getState) => {
  try {
    dispatch({type: DRUGSTORE_LIST_REQUEST});

    const {
      userLogin: {userInfo},
    }=getState();

    const config={
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //const {data}=await axios.get(`/api/drugstore/userGetActive?keyword=${keyword}&pageNumber=${pageNumber}&sort=${sort}`)
    const { data } = await axios.get(`/api/drugstore/all?keyword=${keyword}&pageNumber=${pageNumber}&sort=${sort}`);
    dispatch({type: DRUGSTORE_LIST_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DRUGSTORE_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: DRUGSTORE_LIST_RESET});
    },3000);
  }
};


// USER DRUGSTORE LIST (TOP 4 NEW)->Sản phẩm mới 
export const newListDrugStore=() => async (dispatch,getState) => {
  try {
    dispatch({type: NEW_DRUGSTORE_LIST_REQUEST});

    
    //const {data}=await axios.get(`/api/drugstore/userGetActive?keyword=${keyword}&pageNumber=${pageNumber}&sort=${sort}`)
    const { data } = await axios.get(`/api/drugstore/userGetNew`);
    dispatch({type: NEW_DRUGSTORE_LIST_SUCCESS,payload: data,success:true});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    
    dispatch({
      type: NEW_DRUGSTORE_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: NEW_DRUGSTORE_LIST_RESET});
    },3000);
  }
};

// USER DRUGSTORE LIST (ACTIVE - Pagination) Hiện tất cả sp có phân trang
export const activePListDrugStore=(keyword=" ",pageNumber=" ",sort=" ") => async (dispatch,getState) => {
  try {
    dispatch({type: ACTIVE_P_DRUGSTORE_LIST_REQUEST});

    //const {
    //  userLogin: {userInfo},
    //}=getState();

    //const config={
    //  headers: {
    //    Authorization: `Bearer ${userInfo.token}`,
    //  },
    //};

    //const {data}=await axios.get(`/api/drugstore/userGetActive?keyword=${keyword}&pageNumber=${pageNumber}&sort=${sort}`)
    const { data } = await axios.get(`/api/drugstore/userGetActive-Pagination?keyword=${keyword}&pageNumber=${pageNumber}&sort=${sort}`);
    dispatch({type: ACTIVE_P_DRUGSTORE_LIST_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ACTIVE_P_DRUGSTORE_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: ACTIVE_P_DRUGSTORE_LIST_RESET});
    },3000);
  }
};

// USER DRUGSTORE LIST (ACTIVE ) Hiện tất cả sp ko phân trang
export const activeListDrugStore=() => async (dispatch,getState) => {
  try {
    dispatch({type: ACTIVE_DRUGSTORE_LIST_REQUEST});

    //const {
    //  userLogin: {userInfo},
    //}=getState();

    //const config={
    //  headers: {
    //    Authorization: `Bearer ${userInfo.token}`,
    //  },
    //};

    //const {data}=await axios.get(`/api/drugstore/userGetActive?keyword=${keyword}&pageNumber=${pageNumber}&sort=${sort}`)
    const { data } = await axios.get(`/api/drugstore/userGetActive`);
    dispatch({type: ACTIVE_DRUGSTORE_LIST_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ACTIVE_DRUGSTORE_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: ACTIVE_DRUGSTORE_LIST_RESET});
    },3000);
  }
};


// USER DRUGSTORE LIST (ACTIVE ) Hiện tất cả sp có view cao
export const hotActiveListDrugStore=() => async (dispatch,getState) => {
  try {
    dispatch({type: HOT_ACTIVE_DRUGSTORE_LIST_REQUEST});

    //const {
    //  userLogin: {userInfo},
    //}=getState();

    //const config={
    //  headers: {
    //    Authorization: `Bearer ${userInfo.token}`,
    //  },
    //};

    //const {data}=await axios.get(`/api/drugstore/userGetActive?keyword=${keyword}&pageNumber=${pageNumber}&sort=${sort}`)
    const { data } = await axios.get(`/api/drugstore/userGetHot`);
    dispatch({type: HOT_ACTIVE_DRUGSTORE_LIST_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: HOT_ACTIVE_DRUGSTORE_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: HOT_ACTIVE_DRUGSTORE_LIST_RESET});
    },3000);
  }
};


// USER DRUGSTORE LIST (ACTIVE ) Hiện tất cả sp bán chạy
export const bestSellerActiveListDrugStore=() => async (dispatch,getState) => {
  try {
    dispatch({type: BESTSELLER_ACTIVE_DRUGSTORE_LIST_REQUEST});

    //const {
    //  userLogin: {userInfo},
    //}=getState();

    //const config={
    //  headers: {
    //    Authorization: `Bearer ${userInfo.token}`,
    //  },
    //};

    //const {data}=await axios.get(`/api/drugstore/userGetActive?keyword=${keyword}&pageNumber=${pageNumber}&sort=${sort}`)
    const { data } = await axios.get(`/api/drugstore/userGetBestSeller`);
    dispatch({type: BESTSELLER_ACTIVE_DRUGSTORE_LIST_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BESTSELLER_ACTIVE_DRUGSTORE_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: BESTSELLER_ACTIVE_DRUGSTORE_LIST_RESET});
    },3000);
  }
};






// ADMINDRUGSTORE LIST
export const allDrugStore=() => async (dispatch,getState) => {
  try {
    dispatch({type: DRUGSTORE_ALL_REQUEST});

    const {
      userLogin: {userInfo},
    }=getState();

    const config={
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {data}=await axios.get(`/api/drugstore/alldrugstore`,config)
    dispatch({type: DRUGSTORE_ALL_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DRUGSTORE_ALL_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: DRUGSTORE_ALL_RESET});
    },3000);
  }
};





//ADMINDRUGSTORE CATEGORY
export const categoriesDrugStore=(id) => async (dispatch,getState) => {
  try {
    dispatch({type: DRUGSTORE_CATEGORY_REQUEST});
    // userInfo -> userLogin -> getState(){globalState}
    //const {
    //  userLogin: {userInfo},
    //}=getState();

    //const config={
    //  headers: {
    //    Authorization: `Bearer ${userInfo.token}`,
    //  },
    //};
    const {data}=await axios.get(`/api/drugstore/${id}/categories/userGet`);
    dispatch({type: DRUGSTORE_CATEGORY_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DRUGSTORE_CATEGORY_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: DRUGSTORE_CATEGORY_RESET});
    },3000);
  }
};

//ADMINDRUGSTORE CATEGORY DRUG
export const categoriesDrugDrugStore=(id) => async (dispatch,getState) => {
  try {
    dispatch({type: DRUGSTORE_CATEGORY_DRUG_REQUEST});
    const {data}=await axios.get(`/api/drugstore/${id}/categories-drug/userGet`);
    dispatch({type: DRUGSTORE_CATEGORY_DRUG_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DRUGSTORE_CATEGORY_DRUG_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: DRUGSTORE_CATEGORY_DRUG_RESET});
    },3000);
  }
};




//ADMINDRUGSTORE SINGLE
export const singleDrugStore=(id) => async (dispatch,getState) => {
  try {
    dispatch({type: DRUGSTORE_SINGLE_REQUEST});
    

    const {data}=await axios.get(`/api/drugstore/${id}/userGet`);
    await axios.get(`/api/drugstore/${id}/inc-view-num`);//tăng khi người dùng view
    dispatch({type: DRUGSTORE_SINGLE_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DRUGSTORE_SINGLE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: DRUGSTORE_SINGLE_RESET});
    },3000);
  }
};

// ADMIN UPDATEDRUGSTORE

export const updateDrugStore=({countInStock,isActive,discount,refunded,drugstoreId}) => async (dispatch,getState) => {
  try {
    dispatch({type: DRUGSTORE_UPDATE_REQUEST});
    const {
      userLogin: {userInfo},
    }=getState();

    const config={
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data}=await axios.put(`/api/drugstore/${drugstoreId}`,
      {
        countInStock,isActive,discount,refunded
      }
      ,config);
    dispatch({type: DRUGSTORE_UPDATE_SUCCESS,payload: data});
    dispatch({type: DRUGSTORE_SINGLE_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DRUGSTORE_UPDATE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: DRUGSTORE_UPDATE_RESET});
    },3000);
  }
};


export const updateDrugStoreStock=(num,drugstoreId) => async (dispatch,getState) => {
  try {
    dispatch({type: DRUGSTORE_UPDATE_STOCK_REQUEST});
    const {
      userLogin: {userInfo},
    }=getState();

    const config={
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data}=await axios.get(`/api/drugstore/${drugstoreId}/update-stock?num=${num}`,
      {
      }
      ,config);
    dispatch({type: DRUGSTORE_UPDATE_STOCK_SUCCESS,payload: data});
    dispatch({type: DRUGSTORE_SINGLE_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DRUGSTORE_UPDATE_STOCK_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: DRUGSTORE_UPDATE_RESET});
    },3000);
  }
};

export const checkDrugStoreStock=(num,drugstoreId) => async (dispatch,getState) => {
  try {
    dispatch({type: DRUGSTORE_CHECK_STOCK_REQUEST});
    //const {
    //  userLogin: {userInfo},
    //}=getState();

    //const config={
    //  headers: {
    //    "Content-Type": "application/json",
    //    Authorization: `Bearer ${userInfo.token}`,
    //  },
    //};
    const {data}=await axios.get(`/api/drugstore/${drugstoreId}/check-stock?num=${num}`,
      {
        data:''
      }
      );
    dispatch({type: DRUGSTORE_CHECK_STOCK_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DRUGSTORE_CHECK_STOCK_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: DRUGSTORE_CHECK_STOCK_RESET});
    },3000);
  }
};




