import React,{useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {singleContent} from "../Redux/Actions/ContentAction.js"

const Footer = () => {
  const dispatch=useDispatch()
  const contentSingle=useSelector((state) => state.contentSingle)
  const {contentUp}=contentSingle
  const {logo,phone,banners,companyName,companyAddress,links,contacts,qrCode}=contentUp


  useEffect(()=>{
      dispatch(singleContent())
  },[dispatch])
  return (
    <div className="footer">
      <p>{JSON.stringify({...contentUp})}</p>
      <div className="justify-content-center d-flex">
        <div className="card-name">
          <img
            alt="mastercard"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
          />
        </div>
        <div className="card-name">
          <img
            alt="visa"
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
          />
        </div>
        <div className="card-name">
          <img
            alt="paypal"
            src="https://pbs.twimg.com/media/EfTZlEnWAAMn1lX.png"
          />
        </div>
        <div className="card-name">
          <img
            alt="express"
            src="https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/American-Express-icon.png"
          />
        </div>
        <div className="card-name">
          <img
            alt="discover"
            src="https://icons-for-free.com/iconfiles/png/512/cash+checkout+discover+network+online+shopping+payment+method-1320191225548835050.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
