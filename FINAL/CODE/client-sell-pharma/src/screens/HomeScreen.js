import React,{useEffect,useState} from "react";
import ShopSection from "./../components/homeComponents/ShopSection";
import CallToActionSection from "../components/homeComponents/CallToActionSection";
import Toast from "../components/LoadingError/Toast";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Banner from "../components/Banner";

import Footer2 from "../components/Footer/Footer2"





const HomeScreen=({match}) => {
  

  const keyword=match.params.keyword
  const pageNumber=match.params.pageNumber
  const handleClick=(e) => {
    e.preventDefault()
    window.scrollTo(0,0)

  }
  const [showGoToShop,setShowGoToShop]=useState(false)
  useEffect(() => {
    const handleScroll=() => {
      (window.innerHeight+window.scrollY)>=document.body.scrollHeight? setShowGoToShop(true):setShowGoToShop(false)
    }
    window.addEventListener('scroll',handleScroll)
    return () => {
      window.removeEventListener('scroll',handleScroll)
    }
  },[]) // eslint-disable-next-line

  return (
    <div >
      <Toast />
      <Header/>
      <Navbar />
      <Banner/>
      <ShopSection keyword={keyword} pageNumber={pageNumber}/>

      <CallToActionSection />
      <Footer2/>
      {showGoToShop&&(<button style={{position: 'fixed',right: 20,bottom: 20}} onClick={handleClick}><i class='fas fa-angle-double-up' style={{fontSize:"36px"}}></i></button>)}
    </div>
  );
};

export default HomeScreen;
