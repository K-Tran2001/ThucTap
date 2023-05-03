import React,{useEffect} from "react";
import {Link} from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import {useDispatch,useSelector} from "react-redux";

import Loading from "../LoadingError/Loading"
import Message from "../LoadingError/Error";
import {listCategory} from "../../Redux/Actions/CategoryAction"


import {activePListDrugStore,hotActiveListDrugStore,bestSellerActiveListDrugStore} from "../../Redux/Actions/DrugStoreActions.js"
import {ACTIVE_P_DRUGSTORE_LIST_RESET} from "../../Redux/Constants/DrugStoreConstants";
//import CardSlider from "../CardSlider";
import CardSlider2 from "../CardSlider2";

const ShopSection=(props) => {
  const {keyword,pageNumber}=props //{keyword,pageNumber,banners}=props 
  const dispatch=useDispatch()//categoryList

  const categoryList=useSelector((state) => state.categoryList)
  const {categories}=categoryList

  const activePDrugStoreList=useSelector((state) => state.activePDrugStoreList)
  const {loading,error,drugstores,currentPage,totalPage,success}=activePDrugStoreList

  const hotActivePDrugStoreList=useSelector((state) => state.hotActiveDrugStoreList)
  const {drugstores:drugstoresBestSeller}=hotActivePDrugStoreList

  const bestSellerActivePDrugStoreList=useSelector((state) => state.bestSellerActiveDrugStoreList)
  const {drugstores:drugstoresHot}=bestSellerActivePDrugStoreList


  





  //categotyList


  const truncateString=(str, maxLength)=> {
    if (str.length > maxLength) {//<p style={{whiteSpace:"pre-wrap"}}>
      return str.slice(0, maxLength) + '...';
    } else {
      return str.padEnd(maxLength, ` `);
    }
  }




  useEffect(() => {

    dispatch({type: ACTIVE_P_DRUGSTORE_LIST_RESET})
    dispatch(activePListDrugStore(keyword,pageNumber))
    dispatch(hotActiveListDrugStore())
    dispatch(bestSellerActiveListDrugStore())
    dispatch(listCategory())

    
  },[dispatch,keyword,pageNumber])
  return (
    <>
      <div className="container-fluid">

        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              {/* card-slider  */}
              <h3>Danh mục sản phẩm</h3>
                <div className="category">

                  

                    <div className="category-item-container has-scrollbar">
                    {
                      categories?.map((item)=>{
                        return(
                         
                      <div className="category-item">

                        <div className="category-img-box">
                          <img src={item?.image} alt="dress & frock" width="30"/>
                        </div>

                        <div className="category-content-box">

                          <div className="category-content-flex" >
                            <h3 className="category-item-title" style={{whiteSpace:"pre-wrap"}}>{truncateString(item?.name,20)}&nbsp;</h3>

                            <p className="category-item-amount">(99+)</p>
                          </div>

                          <Link to={`${item._id}/category`} className="category-btn">Xem tất cả</Link>

                        </div>

                      </div>

                        )
                      })
                    }
                  </div>
                </div>
              <h3>Sản phẩm bán chạy</h3>
              <CardSlider2 drugstores={drugstoresBestSeller}/>
              <h3 className="mt-5">Sản phẩm HOT</h3>
              <CardSlider2 drugstores={drugstoresHot}/>
              <h3 className="mt-5"> Sản phẩm chính</h3>
              <div className="shop-container row p-0">
                {
                  loading? (<div className="mb-5"><Loading /></div>):error? (<Message variant="alert-danger">{error}</Message>)
                    :
                    (
                      <>
                        {drugstores&&drugstores?.length==0?"Không có sản phẩm":drugstores?.map((item) => (
                          
                          <div
                            className="shop col-lg-3 col-md-6 col-sm-6"
                            key={item?._id}
                          >
                            <div className="border-product">
                              <Link to={`/products/${item?._id}`}>
                                <div className="shopBack">
                                  <img src={item?.product?.image?.slice(0,0+1)[0]} alt={item?.product?.name} />
                                </div>
                              </Link>

                              <div className="shop-text">
                                <p style={{whiteSpace:"pre-wrap"}}>
                                  <Link to={`/products/${item?._id}`} >
                                    {truncateString(item?.product?.name,55)}
                                    &nbsp;
                                  </Link>
                                </p>

                                <Rating
                                  value={item?.product?.rating}
                                  text={`${item?.product?.numberReviews} reviews`}
                                />
                                
                                <h4>{(item?.product?.price*(1-Number(item?.discount)/100))?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+` đ/${item?.product?.unit}`}
                                  {item?.discount!=0?
                                    <span style={{fontSize:"12px",color:"red"}}> (-{Number(item?.discount)}%)</span>
                                    :""
                                  }
                                </h4>
                              </div>
                            </div>
                          </div>
                          
                        ))}
                      </>
                    )
                }
              
                
              </div>
               

                <Pagination
                  totalPage={totalPage}
                  currentPage={currentPage}
                  keyword={keyword? keyword:""}
                />
             
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
