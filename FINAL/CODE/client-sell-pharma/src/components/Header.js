import React,{useEffect,useState,useRef} from "react";
import {Link,useHistory} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {changeTheme} from '../Redux/Actions/ThemeAction'
import {getUserDetails,logout} from "../Redux/Actions/UserAction";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import debounce from "lodash.debounce";
import {USER_FORGOT_RESET,USER_REGISTER_RESET} from "../Redux/Constants/UserConstant";
import {listCategory} from './../Redux/Actions/CategoryAction';


import {singleContent} from "../Redux/Actions/ContentAction.js"
import {Nav, Navbar} from "react-bootstrap";
import Toast from "./LoadingError/Toast";
import { toast } from "react-toastify";
const Header=() => {
  
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
  
  const MyVerticallyCenteredModal=(props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Log out
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to log out ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            dispatch(logout())
            history.push('/')
          }}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [modalShow,setModalShow]=useState(false);
  const [keyword,setKeyword]=useState()
  const dispatch=useDispatch();
  const history=useHistory();
  const contentSingle=useSelector((state) => state.contentSingle)
  const {contentUp}=contentSingle

  const data=useSelector((state) => state.theme)
  const {cartItems}=useSelector(state => state.cart);
  const {userInfo,success:successLogin}=useSelector(state => state.userLogin);
  const {categories}=useSelector(state => state.categoryList);
  const {user}=useSelector(state => state.userDetails);

  const handleLogout=e => {
    e.preventDefault()
    setModalShow(true)
  }

  const handleChangeTheme=(e) => {
    e.preventDefault();
    dispatch(changeTheme(data.theme==='light'? 'dark':'light'))
    var element=document.getElementById("radio-inner");
    element.classList.toggle("active");
  }

  const callApiKeywordSearch=(keyword) => {
    if(keyword.trim()!=='') {
      history.push(`/search/${keyword.trim()}`);
    }
    else {
      history.push('/');
    }
  }
  const debounceDropDown=useRef(debounce((keyword) => callApiKeywordSearch(keyword),300)).current;

  const handleSubmitSearch=e => {
    setKeyword(e.target.value)
    debounceDropDown(e.target.value);
  }
  useEffect(() => {
    dispatch(listCategory())
    dispatch(getUserDetails())
    dispatch(singleContent())
    if(successLogin){
      //toast.success(`Hi ${userInfo.name}, welcome to shop`, ToastObjects);
    }
  },[dispatch])
  return (
    <div>
      {/* Top Header */}
      <Toast />
      
     <div className="Announcement">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>Đặt hàng online ( Miễn phí)</p>
              <p><i className='fas fa-phone-volume'></i> {contentUp?.phone}</p>
              {/* <ul class="lv1">
              {categories?.map((item, index)=>(
                  <li key={index}>{item.name}</li>
                ))}
              </ul> */}
            </div>

          </div>
        </div>
        <div className="header">
          <div className="container">
            {/* MOBILE HEADER */}
            <div className="mobile-header">
              <div className="container ">
                <div className="row ">
                  <div className="col-6 d-flex align-items-center">
                    <Link className="navbar-brand" to="/">
                      <img alt="logo" src={contentUp?.logo} />
                    </Link>
                  </div>
                  <div className="col-6 d-flex align-items-center justify-content-end Login-Register" >
                    {
                      userInfo&&(
                        <div className="btn-group">
                          <button
                            type="button"
                            className="name-button dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="fas fa-user"></i>
                          </button>
                          <div className="dropdown-menu">
                            <Link className="dropdown-item" to="/profile">
                              Thông tin cá nhân
                            </Link>

                            <Link className="dropdown-item" to="#" onClick={handleLogout}>
                              Đăng xuất
                            </Link>
                          </div>
                        </div>
                      )

                    }
                    <Link to="/cart" className="cart-mobile-icon">
                      <i className="fas fa-shopping-bag"></i>
                      <span className="badge">{
                        cartItems.length
                      }</span>
                    </Link>
                  </div>
                  <div className="col-12 d-flex align-items-center">
                    <form onSubmit={handleSubmitSearch} className="input-group">
                      <input
                        type="search"
                        // value={keyword}
                        className="form-control rounded search"
                        placeholder="Search"
                        value={keyword}
                        onChange={handleSubmitSearch}
                      />
                      <button type="submit" className="search-button">
                        search
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* PC HEADER */}
            <div className="pc-header">
              <div className="row">
                <div className="col-md-3 col-4 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" src={contentUp?.logo} />
                  </Link>
                </div>
                <div className="col-md-6 col-8 d-flex align-items-center">
                  <form onSubmit={handleSubmitSearch} className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Nhập nội dung..."
                      value={keyword}
                      onChange={handleSubmitSearch}
                    />
                    <button type="submit" className="search-button">
                      Tìm kiếm
                    </button>
                  </form>
                </div>
                <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                  {
                    userInfo? (
                      <div className="btn-group">
                        <button
                          type="button"
                          className="name-button dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Chào, {user?.name}
                        </button>
                        <div className="dropdown-menu">
                          <Link className="dropdown-item" to="/profile">
                            Thông tin cá nhân
                          </Link>

                          <Link className="dropdown-item" to="#" onClick={(e) => handleLogout(e)}>
                            Đăng xuất 
                          </Link>
                          <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                          />
                        </div>
                      </div>
                    )
                      :
                      (
                        < >

                          <Link to="#">
                            <div onClick={(e) => {
                              e.preventDefault()
                              dispatch({type: USER_FORGOT_RESET})
                              history.push('/login')
                            }}>
                              Đăng nhập
                            </div>
                          </Link>
                          <Link to="#">
                            <div onClick={(e) => {
                              e.preventDefault()
                              dispatch({type: USER_REGISTER_RESET})
                              history.push('/register')
                            }}>
                              Đăng kí
                            </div>
                          </Link>


                        </>
                      )
                  }

                  <Link to="/cart">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{
                      cartItems.length>0&&cartItems.length
                    }</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header */}

    </div>
  );
};

export default Header;
