import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux";
import {singleContent} from "../Redux/Actions/ContentAction.js"
import {Navigation,Pagination} from 'swiper';
import {Swiper,SwiperSlide,useSwiper} from 'swiper/react';

import 'swiper/swiper.min.css';
//import 'swiper/modules/navigation/navigation.min.css';
import {Link} from 'react-router-dom';

const Banner=() => {
    
    const swiper=useSwiper();
    const dispatch = useDispatch();
    const contentSingle=useSelector((state) => state.contentSingle)
    const {contentUp}=contentSingle

    useEffect(()=>{
        dispatch(singleContent())
    }, [dispatch])
    

    return (
        <div className="container-fluid">
            <div className="banner-list">

                <div className="row">
                    <div className="col-lg-8 col-sm-12 mt-1 banner-left">
                        <Swiper
                            className="w-100 h-100"
                            modules={[Navigation,Pagination]}
                            spaceBetween={20}
                            slidesPerView={1}
                            navigation={true}
                        >
                        {contentUp?.banners?.map((banner)=>{
                            return(
                            <>
                                <SwiperSlide>
                                    <Link to={banner?.link}>
                                    <img src={banner?.image} className="w-100"  style={{height:"300px",borderRadius:"5px"}}/>
                                    </Link>
                                </SwiperSlide>
                            </>
                            )
                        })}    
                        </Swiper>
                    </div>
                    <div className="col-lg-4 col-sm-0 banner-right p-0">
                        <div className="row">
                            <div ><Link to={contentUp?.banners?.[contentUp?.banners?.length-2]?.link}><img src={contentUp?.banners?.[contentUp?.banners?.length-2]?.image} alt="new fashion summer sale" class="banner-img-min" style={{height:"143px"}} /> </Link></div>
                        </div>
                        <div className="row ">
                            <div ><Link to={contentUp?.banners?.[contentUp?.banners?.length-1]?.link}><img src={contentUp?.banners?.[contentUp?.banners?.length-1]?.image} alt="new fashion summer sale" class="banner-img-min" style={{height:"143px"}} /> </Link></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    )
}
export default Banner