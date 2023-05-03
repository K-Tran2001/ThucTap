import React,{useEffect} from 'react'
import {Navigation,Pagination} from 'swiper';
import {Link} from "react-router-dom";
import Rating from "./homeComponents/Rating";

import {useDispatch,useSelector} from "react-redux";
import {Swiper,SwiperSlide,useSwiper} from 'swiper/react';
import {activeListDrugStore} from "../Redux/Actions/DrugStoreActions.js"
import {addToCart} from "../Redux/Actions/CartAction.js" 
import {ACTIVE_DRUGSTORE_LIST_RESET} from "../Redux/Constants/DrugStoreConstants"

import 'swiper/swiper.min.css';
//import 'swiper/modules/navigation/navigation.min.css';
import { toast } from "react-toastify";
import Toast from './../components/LoadingError/Toast';



const CardSlider2=(props) => {

    const {keyword,pageNumber,drugstores}=props //{keyword,pageNumber,banners}=props 
    const dispatch=useDispatch()
  
   

    const ToastObjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        pauseOnHover: false,
        autoClose: 2000,
      };
    const swiper=useSwiper();

    const truncateString=(str, maxLength)=> {//truncateString(item.product.name40)
        if (str.length > maxLength) {//<p style={{whiteSpace:"pre-wrap"}}>
            return str.slice(0, maxLength) + '...';
          } else {
            return str.padEnd(maxLength, ` `);
          }
      }
    
    return (
        <>
            <Toast />
            <Swiper
                modules={[Navigation,Pagination]}
                //pagination={{
                //    type: "fraction",
                //}}
                spaceBetween={25}
                slidesPerView={5}

                breakpoints={{
                    0: {
                    slidesPerView: 1,
                    },
                    520: {
                    slidesPerView: 2,
                    },
                    768: {
                    slidesPerView: 3,
                    },
                    1000: {
                    slidesPerView: 5,
                    }
            
                }
                }
                navigation={true}

            >
                
                {
                    drugstores?.map((item)=>{
                    return(
                        <SwiperSlide>
                            <div className="card swiper-slide">
                                <div className="image-box">
                                    <Link to={`/products/${item?._id}`}>
                                        <img src={item.product.image[0]} alt="" srcSet=""/>
                                    </Link>
                                </div>
                                <div className="profile-details">
                                    <div className="name-job">
                                        <p className='name' style={{whiteSpace:"pre-wrap"}}>
                                            <Link to={`/products/${item?._id}`} >
                                                {truncateString(item?.product?.name,50)}
                                                &nbsp;
                                            </Link>
                                        </p>
                                        <Rating
                                            value={item?.product?.rating}
                                            text={`${item?.product?.numberReviews} reviews`}
                                        />
                                        <h5>{(item?.product?.price*(1-Number(item?.discount)/100))?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+` đ/${item?.product?.unit}`}
                                            {item?.discount!=0?
                                                <span style={{fontSize:"12px",color:"red"}}> (-{Number(item?.discount)}%)</span>
                                                :""
                                            }
                                        </h5>
                                    </div>
                                </div>
                                <div className='p-2'>
                                    <button className="round-black-btn" onClick={(e)=>{
                                         e.preventDefault();
                                         dispatch(addToCart(item._id,1,15));
                                         toast.success("Đã thêm vào giỏ.", ToastObjects);
                                         //history.push(`/cart/${id}?qty=${qty}`);
                                    }}>Thêm giỏ hàng</button>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                    })
                }
            </Swiper>
        
        </>
        


    )
}

export default CardSlider2
