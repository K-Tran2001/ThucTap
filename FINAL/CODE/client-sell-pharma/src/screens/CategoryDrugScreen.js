import React,{useEffect,useState} from "react";
import CateDrugSection from "../components/homeComponents/CateDrugSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import CallToActionSection from "../components/homeComponents/CallToActionSection";
import Toast from "../components/LoadingError/Toast";
import Header from "../components/Header";
import Footer2 from "../components/Footer/Footer2"





const CategoryDrugScreen=({match}) => {
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
      {/*<Navbar />*/}
      <CateDrugSection keyword={keyword} pageNumber={pageNumber}/>
      <CallToActionSection />
      <ContactInfo />
      <Footer2/>
      {showGoToShop&&(<button style={{position: 'fixed',right: 20,bottom: 20}} onClick={handleClick}><i class='fas fa-angle-double-up' style={{fontSize:"36px"}}></i></button>)}
    </div>
  );
};

export default CategoryDrugScreen;
