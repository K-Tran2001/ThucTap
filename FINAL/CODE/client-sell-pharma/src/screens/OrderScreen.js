import React,{useEffect,useState} from "react";
import {Link,useParams} from "react-router-dom";
import Header from "./../components/Header";
import {PayPalButton} from "react-paypal-button-v2";
import {useDispatch,useSelector} from "react-redux";
import {listMyOrders,getOrderDetails,payOrder,checkOrder,cancelOrder,receiveOrder} from "../Redux/Actions/OrderAction";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import Footer2 from "../components/Footer/Footer2"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Toast from "../components/LoadingError/Toast";
import { toast } from "react-toastify";
import printReport from '../util/PrintReport';
import moment from "moment";
import axios from "axios";
import {ORDER_PAY_RESET} from "../Redux/Constants/OrderConstant";
const OrderScreen=() => {
  const orderMyList = useSelector((state)=> state.orderMyList)

  const orderCancel = useSelector((state)=> state.orderCancel)
  const {loading: loadingCancel, success: successCancel} = orderCancel

  const orderReceive = useSelector((state)=> state.orderReceive)
  const {loading: loadingReceive, success: successReceive} = orderReceive

  const {loading,error,order}=useSelector(state => state.orderDetails);
  const currentDate = new Date();
  const specificDate = new Date(order?.cancellationDeadline);
  const {result}=useSelector(state => state.orderCheck);
  const {id: idParam}=useParams();
  const dispatch=useDispatch();
  const [sdkReady,setSdkReady]=useState(true);
  const {loading: loadingPay,error: errorPay,success}=useSelector(state => state.orderPay);
  if(!loading&&!error) {
    order.itemsPrice=order.orderItems.reduce((sum,current) => sum+current.price*current.qty*(1-current.discount/100),0);
  }
  const [modalShow,setModalShow]=useState(false);
  const [dataModal,setDataModal]=useState({});
  const [reportShow,setReportShow]=useState(false);

  if(reportShow){
    printReport(dataModal)
    setReportShow(false)
    setDataModal(null)
  }

  const MyVerticallyCenteredModal=(props) => {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="my-modal"
        >
            <Modal.Header closeButton className="bg-dark">
                <Modal.Title id="contained-modal-title-vcenter">
                    Xác nhận hủy 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Bạn có chắc chắn muốn hủy đơn<span className="text-dark">{" "+order?._id}</span> ?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-dark" onClick={(e) => {
                    canceledHanlder(e)
                    setModalShow(false)
                }}>OK</Button>
            </Modal.Footer>
        </Modal>
    )
  }
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  useEffect(() => {
    const addPaypal=async () => {
      const {data: clientId}=await axios.get('/api/config/paypal');
      const script=document.createElement('script');
      script.type='text/javascript';
      script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async=true;
      script.onload=() => {
        setSdkReady(true)
      }
      document.body.appendChild(script);
    }
    // chưa có thông tin order hoặc success là true (cập nhật lại orderDetail)
    if(!order||success) {
      dispatch({type: ORDER_PAY_RESET})
      dispatch(getOrderDetails(idParam));
    }
    // chưa trả
    else if(!order.isPaid) {
      //chưa hiện button paypal thì hiện còn không thì setSdkReady(true)
      if(!window.paypal) {
        addPaypal();
      }
      else {
        setSdkReady(true);
      }
    }
    // trả rồi
    else if(order.isPaid) {
      setSdkReady(false);
    }
    if(successCancel){
      toast.success("Đã hủy đơn hàng", ToastObjects)
    }
    if(successReceive){
      toast.success("Đã nhận hàng", ToastObjects)
    }
    
    dispatch(checkOrder(idParam))
    dispatch(getOrderDetails(idParam));
    if(successCancel,successCancel){
      dispatch(listMyOrders())
    }

  },[dispatch,idParam,success,successCancel,successReceive,modalShow])

  const successPaymentHandler=paymentResult => {
    dispatch(payOrder(idParam,paymentResult));
  }
  const canceledHanlder = ((e)=>{ 
    e.preventDefault()
    //alert("Hủy đơn")
    dispatch(cancelOrder(order))
    dispatch({type: ORDER_PAY_RESET})
    dispatch(getOrderDetails(idParam));
   
  })

  const receivedHanlder = ((e)=>{ 
    e.preventDefault()
    dispatch(receiveOrder(order))
    dispatch({type: ORDER_PAY_RESET})
    dispatch(getOrderDetails(idParam));
    
  })

  return (
    <>
      <Header />
      <Toast />
      <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
      />
      <div className="container">
        {
          loading? (<Loading />):error? (<Message>{error}</Message>)
            :order?
              (
                <>
                  <div className="row  order-detail">
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                      <div className="row">
                        <div className="col-md-4 center">
                          <div className="alert-success order-box">
                            <i className="fas fa-user"></i>
                          </div>
                        </div>
                        <div className="col-md-8 center">
                          <h5>
                            <strong>Khách hàng</strong>
                          </h5>
                          <p>{order?.user?.name}</p>
                          <p>
                            <a href={`mailto:admin@example.com`}>{order?.user?.email}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* 2 */}
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                      <div className="row">
                        <div className="col-md-4 center">
                          <div className="alert-success order-box">
                            <i className="fas fa-truck-moving"></i>
                          </div>
                        </div>
                        <div className="col-md-8 center">
                          <h5>
                            <strong>Thông tin đơn hàng</strong>
                          </h5>
                          <p>Vận chuyển: {order.shippingAddress.country}</p>
                          <p>Phương thức thanh toán: {order.paymentMethod}</p>

                          {
                            order.isPaid? (
                              <div className="bg-info p-2 col-12">
                                <p className="text-white text-center text-sm-start">
                                  Thanh toán lúc
                                  {
                                    moment(order.createdAt).calendar()
                                  }
                                </p>
                              </div>
                            ): order.paymentMethod=="COD"?
                                  <div className="bg-info p-2 col-12">
                                    <p className="text-white text-center text-sm-start">
                                      Trả khi nhận hàng
                                    </p>
                                  </div>
                                :
                                  (
                                    <div className="bg-danger p-2 col-12">
                                      <p className="text-white text-center text-sm-start">
                                        Chưa trả
                                      </p>
                                    </div>
                                  )
                          }
                        </div>
                      </div>
                    </div>
                    {/* 3 */}
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                      <div className="row">
                        <div className="col-md-4 center">
                          <div className="alert-success order-box">
                            <i className="fas fa-map-marker-alt"></i>
                          </div>
                        </div>
                        <div className="col-md-8 center">
                          <h5>
                            <strong>Vận chuyển đến</strong>
                          </h5>
                          <p>
                            Địa chỉ: {order.shippingAddress.address}
                          </p>
                          {
                            order.isDelivered? (
                              <div className="bg-info p-1 col-12">
                                <p className="text-white text-center text-sm-start">
                                  Đã chuyển
                                </p>
                              </div>
                            )
                              :
                              (
                                <div className="bg-danger p-1 col-12">
                                  <p className="text-white text-center text-sm-start">
                                    Chưa chuyển
                                  </p>
                                </div>
                              )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row p-2 mt-2">
                    <div className="col-sm-10"></div>
                    <div className="col-sm-2">
                      <button className="btn btn-success" onClick={(e)=>{
                          e.preventDefault()
                          setReportShow(true)
                          setDataModal(order)
                        }}>
                        <i className="fas fa-print"></i>
                        <span>In đơn mua</span>
                      </button>
                    </div>
                  </div>

                  <div className="row order-products justify-content-between">
                    <div className="col-lg-8">

                      {
                        order.orderItems.map((order,index) => {
                          return (
                            <div key={index} className="order-product row">
                              <div className="col-md-3 col-6">
                                <img src={order?.image?.slice(0,0+1)[0]} alt="product" />
                              </div>
                              <div className="col-md-5 col-6 d-flex align-items-center">
                                <Link to={`/`}>
                                  <h6>{order.name}</h6>
                                </Link>
                              </div>
                              <div className="mt-3 mt-md-0 col-6 col-md-2  d-flex align-items-center flex-column justify-content-center ">
                                <h4>Số lượng</h4>
                                <h6>{order.qty}</h6>
                              </div>
                              <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center">
                                <h4>Thành tiền</h4>
                                <h6>{(order.price*order.qty*(1-order.discount/100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</h6>
                              </div>



                            </div>
                          )
                        })
                      }

                    </div>
                    

                    <div className="col-lg-4 d-flex align-items-end flex-column mt-3 subtotal-order pb-2">
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <td>
                              <strong>Tổng sản phẩm</strong>
                            </td>
                            <td style={{textAlign:"right"}}>{order.itemsPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Vận chuyển </strong>
                            </td>
                            <td style={{textAlign:"right"}}>{order.shippingPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Chuyển phát nhanh</strong>
                            </td>
                            <td style={{textAlign:"right"}}>{order.taxPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Điểm quy đổi</strong>
                            </td>
                            <td style={{textAlign:"right"}}>-{order.discountPoint.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Tổng tiền</strong>
                            </td>
                            <td style={{textAlign:"right"}}>{order.totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</td>
                          </tr>
                        </tbody>
                      </table>

                      <> 
                        {//CONFORM
                          order.isComformed?
                          <>
                            {
                                result?//kt sl đơn hàng còn thỏa ko?
                                  <div className="col-12">
                                    {
                                      loadingPay? (<Loading />):errorPay? (<Message>{error}</Message>)
                                        :
                                        (
                                          order.isPaid? (<div className="paid-button"><p>Đã thanh toán</p></div>)
                                            : order.paymentMethod=="COD"?(<div className="paid-button"><p>Trả sau</p></div>)
                                              :
                                                <> 
                                                  {
                                                    order.isCanceled||order.isReceived?""
                                                    :
                                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />  
                                                  }                                                          
                                                </>
                                            
                                        )
                                    }
                                    
                                  </div>
                                :<button className="mt-2 form-control bg-dark" onClick={canceledHanlder}>Buộc hủy đơn hàng</button>
                              //:""      
                            }
                          </>
                          :""

                        }
                      </>
                      <>
                        {//CANCEL
                          order.isCanceled?"":
                            <>
                              {
                                (order.isComformed&&order.isDelivered && order.isPaid||order.isComformed&&order.isDelivered&& order.paymentMethod=='COD')?

                                <>
                                  {
                                    !order.isReceived?<button className="mt-2 form-control bg-dark" onClick={receivedHanlder}>Đã nhận hàng</button>
                                    :<div class="mt-2 alert alert-success w-100" role="alert">
                                      Nhận hàng thành công.
                                    </div>
                                  }
        
                                </>
                                :""
                              }
                            
                            </>
                        }
                      </>
                      <>
                        {//RECEIVE
                          !order.isReceived?
                          <>
                            {
                              currentDate.getTime() < specificDate.getTime()?
                                <>
                                  {
                                    !order.isCanceled?<button className="mt-2 form-control bg-dark" onClick={(e)=>{e.preventDefault();setModalShow(true)}}>Hủy đơn</button>
                                    :<div class="mt-2 alert alert-dark w-100" role="alert">
                                      Đơn hàng đã được hủy.
                                    </div>
                                  }
                                </>
                              :""
                            }
                          </>
                          :""
                        }
                        
                      </>


                      
                      

                      
                      
                    </div>
                  </div>
                </>
              ):''
        }
      </div>
      <Footer2/>
    </>
  );
};

export default OrderScreen;
