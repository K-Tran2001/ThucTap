import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile, updateUserProfile } from "../../Redux/Actions/UserAction";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Toast from "../LoadingError/Toast";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import renderToast from "../../util/Toast";
import { USER_CHANGE_RESET } from "../../Redux/Constants/UserConstant";

const ProfileTabs = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  })
  const [dataModal, setDataModal] = useState({
    emailModal: '',
    passModal: '',
  })
  const { emailModal, passModal } = dataModal
  const [ isStop , setIsStop ] = useState(false)
  const { name, email, phone, address, dateOfBirth,gender,password, passwordConfirm } = data;
  const handelChange = e => {
    e.preventDefault();
    setData(prev => {
      return {
        ...prev, [e.target.name]: e.target.value
      }
    })
  }
  const handelChangeModal = e =>{
    e.preventDefault();
    setDataModal(prev => {
      return {
        ...prev, [e.target.name]: e.target.value
      }
    })
  }
  const { loading, error, user } = useSelector(state => state.userDetails);
  const { loading: loadingUpdate} = useSelector(state => state.userUpdateProfile);
  const { loading: loadingChange, error: errorChange, success: successChange, info } = useSelector(state => state.userChangeProfile);
  const dispatch = useDispatch();
  const handleRequestChangeProfile = e =>{
    e.preventDefault()
    setShow(true);
  }
  const handleClose = () => setShow(false);
  const handleSubmit = e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      if(!isStop){
        renderToast('Mật khẩu không khớp','error', setIsStop, isStop)
        return;
      }
    }
    else{
      dispatch(updateUserProfile(data));
      if(!isStop){
        renderToast('Thông tin đã được cập nhật','success', setIsStop, isStop)
        setData({
          password: '',
          passwordConfirm: ''
        })
        dispatch({type: USER_CHANGE_RESET})
      }
    }
  }

  useEffect(() => {
    dispatch({type: USER_CHANGE_RESET})
    if (user) {
      setData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        dateOfBirth: `${new Date(user.dateOfBirth).getFullYear()}-${String(new Date(user.dateOfBirth).getMonth() + 1).padStart(2, '0')}-${String(new Date(user.dateOfBirth).getDate()).padStart(2, '0')}` || '',
        gender: user.gender ,
        password: '',
        passwordConfirm: '',
      })
    }
  }, [dispatch, user])
  
  return (
    <>
      <Toast />
      {
        loading ? (<Loading/>) : error ? (<Message>{error}</Message>) : ''
      }
      {
        loadingUpdate && (<Loading/>)
      }
      {
         loadingChange ? (<Loading/>) : errorChange ? (<Message>{errorChange}</Message>) : successChange ?
         (<Message variant='alert-success'>{info}</Message>) : ''
      }
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác thực tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                autoComplete="new-password"
                onChange={handelChangeModal}
                name="emailModal"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput2">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                autoComplete="new-password"
                autoFocus
                onChange={handelChangeModal}
                name='passModal'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
          <Button variant="primary" onClick={(e)=>{
            e.preventDefault();
            if(emailModal !== email){
              if(!isStop){
                renderToast('Email does not match','error', setIsStop, isStop)
                return;
              }
            }
            else{
              dispatch(changeProfile({emailModal, passModal}))
              setShow(false);
            }
          }}>
            Xác thực
          </Button>
        </Modal.Footer>
      </Modal>
      <form className="row  form-container" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">Tên đăng nhập</label>
            <input onChange={handelChange} value={name} name="name" className="form-control" type="text" autoComplete="off" disabled={successChange ? false : true}  required/>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">Địa chỉ E-mail</label>
            <input onChange={handelChange} value={email} name="email" className="form-control" type="email" autoComplete="off" disabled required/>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-phone">Điện thoại</label>
            <input onChange={handelChange} value={phone} name="phone" className="form-control" type="phone" autoComplete="off" disabled={successChange ? false : true}  required/>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-phone">Địa chỉ</label>
            <textarea  onChange={handelChange} value={address} name="address" className="form-control" type="text" autoComplete="off" disabled={successChange ? false : true}  required></textarea >
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-phone">Ngày sinh</label>
            <input onChange={handelChange} name="dateOfBirth" value={dateOfBirth}  className="form-control" type="date"  disabled={successChange ? false : true}  required/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-phone">Giới tính</label>
            <div className={`form-control ${successChange ? '' : 'disabled'} p-2`}>
              <label className=" w-25 " for="success-outlined">{gender==1?'Nam':'Nữ'}</label>
              
              <input onChange={handelChange} type="radio" className="btn-check " name="gender" value={1} id="success-outlined" autocomplete="off" disabled={successChange ? false : true}/>
              <label className="btn btn-outline-success w-25 m-2" for="success-outlined">Nam</label>

              <input  onChange={handelChange} type="radio" className="btn-check " name="gender" value={0} id="danger-outlined" autocomplete="off" disabled={successChange ? false : true} />
              <label className="btn btn-outline-danger w-25 m-2" for="danger-outlined">Nữ</label>


            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">Mật khẩu mới</label>
            <input onChange={handelChange} name="password" value={password} className="form-control" type="password" autoComplete="new-password" disabled={successChange ? false : true} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Xác nhận lại mật khẩu</label>
            <input onChange={handelChange} name="passwordConfirm" value={passwordConfirm} className="form-control" type="password" autoComplete="new-password" disabled={successChange ? false : true} />
          </div>
        </div>
       { !successChange ? (<button onClick={(e)=>{handleRequestChangeProfile(e)}}>Cập nhật thông tin</button>) : ( <button className= "btn btn-warning" type="submit">Update Profile</button>)}
      </form>
    </>
  );
};

export default ProfileTabs;
