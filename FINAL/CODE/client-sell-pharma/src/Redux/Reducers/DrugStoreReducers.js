import {
  DRUGSTORE_LIST_REQUEST,DRUGSTORE_LIST_FAIL,
  DRUGSTORE_LIST_SUCCESS,DRUGSTORE_LIST_RESET,DRUGSTORE_DELETE_REQUEST,DRUGSTORE_DELETE_SUCCESS,
  DRUGSTORE_DELETE_FAIL,DRUGSTORE_UPDATE_REQUEST,DRUGSTORE_UPDATE_SUCCESS,DRUGSTORE_UPDATE_FAIL,DRUGSTORE_UPDATE_RESET,DRUGSTORE_DELETE_RESET,DRUGSTORE_SINGLE_REQUEST,DRUGSTORE_SINGLE_SUCCESS,DRUGSTORE_SINGLE_FAIL,DRUGSTORE_SINGLE_RESET,
  DRUGSTORE_CATEGORY_REQUEST,DRUGSTORE_CATEGORY_FAIL,DRUGSTORE_CATEGORY_RESET,DRUGSTORE_CATEGORY_SUCCESS,DRUGSTORE_IMPORT_REQUEST,DRUGSTORE_IMPORT_SUCCESS,DRUGSTORE_IMPORT_FAIL,DRUGSTORE_IMPORT_RESET,DRUGSTORE_ALL_REQUEST,DRUGSTORE_ALL_SUCCESS,DRUGSTORE_ALL_FAIL,DRUGSTORE_ALL_RESET,DRUGSTORE_CATEGORY_DRUG_REQUEST,DRUGSTORE_CATEGORY_DRUG_SUCCESS,DRUGSTORE_CATEGORY_DRUG_FAIL,DRUGSTORE_CATEGORY_DRUG_RESET,
  
  DRUGSTORE_UPDATE_STOCK_FAIL,
  DRUGSTORE_UPDATE_STOCK_REQUEST,
  DRUGSTORE_UPDATE_STOCK_RESET,
  DRUGSTORE_UPDATE_STOCK_SUCCESS,

  DRUGSTORE_CHECK_STOCK_FAIL,
  DRUGSTORE_CHECK_STOCK_REQUEST,
  DRUGSTORE_CHECK_STOCK_RESET,
  DRUGSTORE_CHECK_STOCK_SUCCESS,

  NEW_DRUGSTORE_LIST_REQUEST,NEW_DRUGSTORE_LIST_FAIL,
  NEW_DRUGSTORE_LIST_SUCCESS,NEW_DRUGSTORE_LIST_RESET,

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

// LIST PRODUCT
export const drugstoreListReducer=(state={drugstores: []},action) => {
  switch(action.type) {
    case DRUGSTORE_LIST_REQUEST:
      return {loading: true,drugstores: []};
    case DRUGSTORE_LIST_SUCCESS:
      return {
        loading: false,
        //totalPage: action.payload.totalPage,
        //currentPage: action.payload.currentPage,
        drugstores: action.payload
      }
    case DRUGSTORE_LIST_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_LIST_RESET:
      return {drugstores: []};
    default:
      return state;
  }
};

// LIST PRODUCT NEW+ACTIVE
export const newDrugStoreListReducer=(state={drugstores: []},action) => {
  switch(action.type) {
    case NEW_DRUGSTORE_LIST_REQUEST:
      return {loading: true,drugstores: []};
    case NEW_DRUGSTORE_LIST_SUCCESS:
      return {
        loading: false,
        drugstores: action.payload
      }
    case NEW_DRUGSTORE_LIST_FAIL:
      return {loading: false,error: action.payload};
    case NEW_DRUGSTORE_LIST_RESET:
      return {drugstores: []};
    default:
      return state;
  }
};

// LIST PRODUCT NEW+ACTIVE
export const activePDrugStoreListReducer=(state={drugstores: []},action) => {
  switch(action.type) {
    case ACTIVE_P_DRUGSTORE_LIST_REQUEST:
      return {loading: true,drugstores: []};
    case ACTIVE_P_DRUGSTORE_LIST_SUCCESS:
      return {
        loading: false,
        drugstores:action.payload.drugstores,
        currentPage:action.payload.currentPage,
        totalPage:action.payload.totalPage,

        //success:true,
      }
    case ACTIVE_P_DRUGSTORE_LIST_FAIL:
      return {loading: false,error: action.payload};
    case ACTIVE_P_DRUGSTORE_LIST_RESET:
      return {drugstores: []};
    default:
      return state;
  }
};


// LIST PRODUCT NEW+ACTIVE
export const activeDrugStoreListReducer=(state={drugstores: []},action) => {
  switch(action.type) {
    case ACTIVE_DRUGSTORE_LIST_REQUEST:
      return {loading: true,drugstores: []};
    case ACTIVE_DRUGSTORE_LIST_SUCCESS:
      return {
        loading: false,
        drugstores: action.payload
      }
    case ACTIVE_DRUGSTORE_LIST_FAIL:
      return {loading: false,error: action.payload};
    case ACTIVE_DRUGSTORE_LIST_RESET:
      return {drugstores: []};
    default:
      return state;
  }
};

// LIST PRODUCT NEW+ACTIVE + BESTSELLER
export const bestSellerActiveDrugStoreListReducer=(state={drugstores: []},action) => {
  switch(action.type) {
    case BESTSELLER_ACTIVE_DRUGSTORE_LIST_REQUEST:
      return {loading: true,drugstores: []};
    case BESTSELLER_ACTIVE_DRUGSTORE_LIST_SUCCESS:
      return {
        loading: false,
        drugstores: action.payload
      }
    case BESTSELLER_ACTIVE_DRUGSTORE_LIST_FAIL:
      return {loading: false,error: action.payload};
    case BESTSELLER_ACTIVE_DRUGSTORE_LIST_RESET:
      return {drugstores: []};
    default:
      return state;
  }
};

// LIST PRODUCT NEW+ACTIVE + HOT
export const hotActiveDrugStoreListReducer=(state={drugstores: []},action) => {
  switch(action.type) {
    case HOT_ACTIVE_DRUGSTORE_LIST_REQUEST:
      return {loading: true,drugstores: []};
    case HOT_ACTIVE_DRUGSTORE_LIST_SUCCESS:
      return {
        loading: false,
        drugstores: action.payload
      }
    case HOT_ACTIVE_DRUGSTORE_LIST_FAIL:
      return {loading: false,error: action.payload};
    case HOT_ACTIVE_DRUGSTORE_LIST_RESET:
      return {drugstores: []};
    default:
      return state;
  }
};





// ALL PRODUCT
export const drugstoreAllReducer=(state={} ,action) => {
  switch(action.type) {
    case DRUGSTORE_ALL_REQUEST:
      return {loading: true};
    case DRUGSTORE_ALL_SUCCESS:
      return {loading: false,
              totalPage: action.payload.totalPage,
              currentPage: action.payload.currentPage,
              drugstoreall: action.payload.drugstore
            }
    case DRUGSTORE_ALL_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_ALL_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE PRODUCT
export const drugstoreDeleteReducer=(state={},action) => {
  switch(action.type) {
    case DRUGSTORE_DELETE_REQUEST:
      return {loading: true};
    case DRUGSTORE_DELETE_SUCCESS:
      return {loading: false,success: true};
    case DRUGSTORE_DELETE_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};


// CATEGORIES PRODUCT
export const drugstoreCategoriesReducer=(state={drugstore: []},action) => {
  switch(action.type) {
    case DRUGSTORE_CATEGORY_REQUEST:
      return {...state,loading: true};
    case DRUGSTORE_CATEGORY_SUCCESS:
      return {loading: false,success: true,
        drugstore: action.payload.drugstore,
        totalPage: action.payload.totalPage,
        currentPage: action.payload.currentPage,
      };
    case DRUGSTORE_CATEGORY_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_CATEGORY_RESET:
      return {drugstore: []};
    default:
      return state;
  }
};

// CATEGORIES DRUG PRODUCT
export const drugstoreCategoriesDrugReducer=(state={drugstore: []},action) => {
  switch(action.type) {
    case DRUGSTORE_CATEGORY_DRUG_REQUEST:
      return {...state,loading: true};
    case DRUGSTORE_CATEGORY_DRUG_SUCCESS:
      return {loading: false,success: true,
        drugstore: action.payload.drugstore,
        totalPage: action.payload.totalPage,
        currentPage: action.payload.currentPage,
      
      };
    case DRUGSTORE_CATEGORY_DRUG_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_CATEGORY_DRUG_RESET:
      return {drugstore: []};
    default:
      return state;
  }
};


// SINGLE PRODUCT
export const drugstoreSingleReducer=(state={drugstore: {}},action) => {
  switch(action.type) {
    case DRUGSTORE_SINGLE_REQUEST:
      return {...state,loading: true};
    case DRUGSTORE_SINGLE_SUCCESS:
      return {loading: false,drugstore: action.payload, success: true};
    case DRUGSTORE_SINGLE_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_SINGLE_RESET:
      return {drugstore: {}};
    default:
      return state;
  }
};

// UPDATE PRODUCT
export const drugstoreUpdateReducer=(state={drugstore: {}},action) => {
  switch(action.type) {
    case DRUGSTORE_UPDATE_REQUEST:
      return {loading: true};
    case DRUGSTORE_UPDATE_SUCCESS:
      return {loading: false,success: true,drugstore: action.payload};
    case DRUGSTORE_UPDATE_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_UPDATE_RESET:
      return {drugstore: {}};
    default:
      return state;
  }
};

export const drugstoreUpdateStockReducer=(state={drugstore: {}},action) => {
  switch(action.type) {
    case DRUGSTORE_UPDATE_STOCK_REQUEST:
      return {loading: true};
    case DRUGSTORE_UPDATE_STOCK_SUCCESS:
      return {loading: false,success: true,drugstore: action.payload};
    case DRUGSTORE_UPDATE_STOCK_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_UPDATE_STOCK_RESET:
      return {drugstore: {}};
    default:
      return state;
  }
};

export const drugstoreCheckStockReducer=(state={result:''},action) => {
  switch(action.type) {
    case DRUGSTORE_CHECK_STOCK_REQUEST:
      return {loading: true};
    case DRUGSTORE_CHECK_STOCK_SUCCESS:
      return {loading: false,success: true,result: action.payload};
    case DRUGSTORE_CHECK_STOCK_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_CHECK_STOCK_RESET:
      return {result: ''};
    default:
      return state;
  }
};

// IMPORT PRODUCT
export const drugstoreImportReducer=(state={drugstoreImport: []},action) => {
  switch(action.type) {
    case DRUGSTORE_IMPORT_REQUEST:
      return {loading: true};
    case DRUGSTORE_IMPORT_SUCCESS:
      return {loading: false,success: true,drugstoreImport: action.payload};
    case DRUGSTORE_IMPORT_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_IMPORT_RESET:
      return [];
    default:
      return state;
  }
};