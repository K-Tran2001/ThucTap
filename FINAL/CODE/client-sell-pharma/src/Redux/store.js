import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { producerListReducer, productCreateReviewReducer, productDetailsReducer  } from './Reducers/ProductReducers.js'
import { cartReducer } from './Reducers/CartReducer.js';
import { themeReducer } from './Reducers/ThemeReducer.js'
import { userChangeProfileReducer, userConfirmForgotReducer, userConfirmRegisterReducer, userDetailsReducer, userForgotReducer, userLoginGGReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './Reducers/UserReducer.js';
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer,orderCheckReducer,orderCancelReducer,orderReceiveReducer} from './Reducers/OrderReducer';
import {bestSellerActiveDrugStoreListReducer,hotActiveDrugStoreListReducer,activePDrugStoreListReducer,activeDrugStoreListReducer,newDrugStoreListReducer,drugstoreCheckStockReducer,drugstoreUpdateStockReducer,drugstoreAllReducer, drugstoreCategoriesDrugReducer, drugstoreCategoriesReducer, drugstoreImportReducer, drugstoreSingleReducer, drugstoreUpdateReducer, drugstoreListReducer} from "./Reducers/DrugStoreReducers";
import {categoryListReducer } from "./Reducers/CategoryReducer.js"
import {categoryDrugListReducer } from "./Reducers/CategoryDrugReducer.js"
import {contentSingleReducer} from './Reducers/ContentReducer';
import { promotionProductListReducer } from './Reducers/PromotionReducer.js';
const reducer = combineReducers({

    contentSingle: contentSingleReducer,

    productList: producerListReducer,
    productDetails: productDetailsReducer,
    categoryList:categoryListReducer,
    categoryDrugList:categoryDrugListReducer,


    drugstoreList: drugstoreListReducer,
    drugstoreAll: drugstoreAllReducer,
    drugstoreSingle: drugstoreSingleReducer,
    drugstoreCategories: drugstoreCategoriesReducer,
    drugstoreCategoriesDrug: drugstoreCategoriesDrugReducer,
    drugstoreUpdate: drugstoreUpdateReducer,
    drugstoreImport: drugstoreImportReducer,
    drugstoreUpdateStock: drugstoreUpdateStockReducer,
    drugstoreCheckStock: drugstoreCheckStockReducer,
    newDrugStoreList:newDrugStoreListReducer,
    activePDrugStoreList:activePDrugStoreListReducer,
    activeDrugStoreList:activeDrugStoreListReducer,
    bestSellerActiveDrugStoreList:bestSellerActiveDrugStoreListReducer,
    hotActiveDrugStoreList:hotActiveDrugStoreListReducer,

    promotionProductList:promotionProductListReducer,

    productReview: productCreateReviewReducer,
    cart: cartReducer,
    theme: themeReducer,
    userLogin: userLoginReducer,
    userLoginGoogle: userLoginGGReducer,
    userDetails: userDetailsReducer,
    userRegister: userRegisterReducer,
    userConfirmRegister: userConfirmRegisterReducer,
    userForgot: userForgotReducer,
    userConfirmForgot: userConfirmForgotReducer,
    userChangeProfile: userChangeProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderCheck:orderCheckReducer,

    orderCancel:orderCancelReducer,
    orderReceive:orderReceiveReducer,
    orderMyList: orderListMyReducer,
    categoryList: categoryListReducer
})

const initialState = {
  cart:{
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    shippingAddress: localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")): {}
  },
  userLogin:{
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
  }
}

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;