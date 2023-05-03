import { PROMOTION_PRODUCT_LIST_REQUEST,PROMOTION_PRODUCT_LIST_SUCCESS,PROMOTION_PRODUCT_LIST_FAIL,PROMOTION_PRODUCT_LIST_RESET } from '../Constants/PromotionConstants';



export const promotionProductListReducer = (state = {data:{}}, action) =>{
    switch (action.type) {
        case PROMOTION_PRODUCT_LIST_REQUEST:
            return {loading: true};
        case PROMOTION_PRODUCT_LIST_SUCCESS:
            return {loading: false, success: true, data: action.payload}
        case PROMOTION_PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};
        case PROMOTION_PRODUCT_LIST_RESET:
            return {}
        default:
            return state
    }
}
