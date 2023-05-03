import React,{ useLayoutEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import  Dropdown  from "../../components/Dropdown";

import {categoriesDrugDrugStore, categoriesDrugStore} from "../../Redux/Actions/DrugStoreActions.js"
import {listCategory} from "../../Redux/Actions/CategoryAction.js"
import {listCategoryDrug} from "../../Redux/Actions/CategoryDrugAction.js"
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Rating from "./Rating";


const CateDrugSection=(props) => {
  const [categoryMode,setCategoryMode]=useState(true)
  const dispatch=useDispatch()

  const location  = useLocation()
  const checkRoute = location?.pathname?.split("/")[2]
  const {id}=useParams();
  const drugstoreCateDrugList=useSelector((state) => state.drugstoreCategoriesDrug)
  const {loading,error,drugstore}=drugstoreCateDrugList

  const drugstoreCateList=useSelector((state) => state.drugstoreCategories)
  const {loading:loadingDrugstoreCategory,
    error:errorDrugstoreCategory,drugstore:drugstoreCategory}=drugstoreCateList

  const categoryList=useSelector((state) => state.categoryList)//Categories
  const {categories}=categoryList

  const categoryDrugList=useSelector((state) => state.categoryDrugList)//CategoriesDrug
  const {categoriesDrug}=categoryDrugList
  console.log({drugstore,drugstoreCategory});

  


  useLayoutEffect(() => {
    dispatch(listCategory())
    dispatch(listCategoryDrug())
    
    if(checkRoute==="category"){
      dispatch(categoriesDrugStore(id))
      setCategoryMode(true)
    }else{
      dispatch(categoriesDrugDrugStore(id))
      setCategoryMode(false)
      //setData(drugstore)
    }
    
    
    
  },[dispatch,checkRoute,id,categoryMode])
  const truncateString=(str, maxLength)=> {//{truncateString(item?.product?.name,50)}
    if (str.length > maxLength) {//<p style={{whiteSpace:"pre-wrap"}}>
      return str.slice(0, maxLength) + '...';
    } else {
      return str.padEnd(maxLength, ` `);
    }
  }


  return (
    <>
      
      <div className="container-fluid">
        

        <div className="section">
          <div className="row">
            <div className="col-lg-3 col-md-0">
            
                <h3>Danh mục</h3>
                <Dropdown title={"Nhóm hàng"} categories={categories}/>
                <Dropdown title={"Nhóm thuốc"} categoriesDrug={categoriesDrug}/>
            </div>
            <>
              {
                categoryMode?
                <div className="col-lg-9 col-md-12 article">
                <p>Trang chủ /<p style={{color:"blue",display:"flex"}}>{drugstoreCategory?.[0]?.categories?.[0]?.name}</p> </p>  
                <h3 className="pt-3">Sản phẩm chính</h3>
                <div className="shop-container row">
                  {
                    loadingDrugstoreCategory? (<div className="mb-5"><Loading /></div>):errorDrugstoreCategory? (<Message variant="alert-danger">{error}</Message>)
                      :
                      (
                        <>
                          {drugstoreCategory&&drugstoreCategory?.length==0?"Không có sản phẩm":drugstoreCategory?.map((item) => (
                            <div
                              className="shop col-lg-3 col-md-6 col-sm-6"
                              key={item?._id}
                            >
                              <div className="border-product">
                                <Link to={`/products/${item?._id}`}>
                                  <div className="shopBack">
                                    <img src={item?.product?.[0]?.image?.slice(0,0+1)[0]} alt={item?.product?.name} />
                                  </div>
                                </Link>

                                <div className="shop-text">
                                  <p style={{whiteSpace:"pre-wrap"}}>
                                    <Link to={`/products/${item?._id}`}>
                                      {/*{item?.product?.[0]?.name}*/}
                                      {truncateString(item?.product?.[0]?.name,36)}
                                    </Link>
                                  </p>

                                  <Rating
                                    value={item?.product?.[0]?.rating}
                                    text={`${item?.product?.[0]?.numberReviews} reviews`}
                                  />
                                 <h7>{(item?.product?.[0]?.price*(1-Number(item?.discount)/100))?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+` đ/${item?.product?.[0]?.unit}`}
                                  {item?.discount!=0?
                                    <span style={{fontSize:"12px",color:"red"}}> (-{Number(item?.discount)}%)</span>
                                    :""
                                  }
                                </h7>
                                </div>
                              </div>
                            </div>
                          ))}
                          {/*{
                            drugstoreCategory&&drugstoreCategory?.length!=0?
                              <Pagination
                                totalPage={totalPage}
                                currentPage={currentPage}
                                keyword={keyword? keyword:""}
                              />
                              :""
                          }*/}
                        </>
                      )
                  }
                
                  
                </div>
                </div>
                :
                <div className="col-lg-9 col-md-12 article">
                <p>Trang chủ /<p style={{color:"blue",display:"flex"}}>{drugstore?.[0]?.categorydrugs?.[0]?.name}</p> </p>  
                <h3 className="pt-3">Sản phẩm chính</h3>
                <div className="shop-container row">
                  {
                    loading? (<div className="mb-5"><Loading /></div>):error? (<Message variant="alert-danger">{error}</Message>)
                      :
                      (
                        <>
                          {drugstore&&drugstore.length==0?"Không có sản phẩm":drugstore?.map((item) => (
                            <div
                              className="shop col-lg-3 col-md-6 col-sm-6"
                              key={item?._id}
                            >
                              <div className="border-product">
                                <Link to={`/products/${item?._id}`}>
                                  <div className="shopBack">
                                    <img src={item?.product?.[0]?.image?.slice(0,0+1)[0]} alt={item?.product?.name} />
                                  </div>
                                </Link>

                                <div className="shop-text">
                                  <p>
                                    <Link to={`/products/${item?._id}`}>
                                      {truncateString(item?.product?.[0]?.name,38)}
                                    </Link>
                                  </p>

                                  <Rating
                                    value={item?.product?.[0]?.rating}
                                    text={`${item?.product?.[0]?.numberReviews} reviews`}
                                  />
                                 <h7  >{(item?.product?.[0]?.price*(1-Number(item?.discount)/100))?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+` đ/${item?.product?.[0]?.unit}`}
                                  {item?.discount!=0?
                                    <span style={{fontSize:"12px",color:"red"}}> (-{Number(item?.discount)}%)</span>
                                    :""
                                  }
                                </h7>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )
                  }
                  {/*{
                    drugstore&&drugstore.length!=0?
                      <Pagination
                        totalPage={totalPageDrugstoreCategory}
                        currentPage={currentPageDrugstoreCategory}
                        keyword={keyword? keyword:""}
                      />:""
                  }*/}
                
                </div>
                </div>
              
              }     
            </>
          </div>
        </div>
      </div>
    </>

  );
};

export default CateDrugSection;
