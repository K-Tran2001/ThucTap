import React,{useEffect,useState} from 'react';
import Header from './../components/Header';
import Rating from '../components/homeComponents/Rating';
import {Link} from 'react-router-dom';
import { toast } from "react-toastify";
import Toast from './../components/LoadingError/Toast';
import Loading from './../components/LoadingError/Loading';
import Message from './../components/LoadingError/Error';
import {useParams} from 'react-router-dom';
import {
  createProductReview,
} from '../Redux/Actions/ProductAction';
import {useSelector,useDispatch} from 'react-redux';
import {
  singleDrugStore,
} from '../Redux/Actions/DrugStoreActions';
import {promotionProductList} from "../Redux/Actions/PromotionAction"
import {addToCart} from '../Redux/Actions/CartAction';
import moment from 'moment';
import ChatwootWidget from '../components/ChatWoot';



const SingleProduct=() => {
  const [qty,setQty]=useState(1);
  const [showChat, setShowChat] = useState(false)
  const [rating,setRating]=useState(5);
  const [comment,setComment]=useState('')
  const [tab,setTab]=useState(0)



  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };


  const {id}=useParams();
  const dispatch=useDispatch();
  //const [drugstore,setDrugstore]=useState('')

  const {userInfo}=useSelector((state) => state.userLogin);
  const {loading,error,drugstore, success: successDS}=useSelector((state) => state.drugstoreSingle);
  const {error: errorReview,success:successRV}=useSelector((state) => state.productReview);

  const {data}=useSelector((state) => state.promotionProductList);

  console.log({data});

  const AddToCart=(e) => {
    e.preventDefault();
    dispatch(addToCart(id,qty,data.total));
    toast.success("Đã thêm vào giỏ.", ToastObjects);
  };

  const handleSubmitReview=(e) => {
    e.preventDefault();
    dispatch(createProductReview(drugstore?.product?._id,{rating,comment}));
    //dispatch(singleDrugStore(id));
  };



  useEffect(() => {
    //dispatch(singleDrugStore(id));
    if(drugstore._id !== id||successRV){
      dispatch(singleDrugStore(id));
    } 
    
    //dispatch(singleDrugStore(id));

    
  },[id, dispatch,successRV]);  
  useEffect(()=>{
    if(successDS){
      dispatch(promotionProductList(drugstore.discountDetail));
    }
  },[dispatch,drugstore,successDS])





  const isActive=(index) => {
    if(tab===index) return " active";
    return ""
  }

 
  return (
    <>
      <ChatwootWidget show={showChat} data={drugstore}/>
      <Header />
      <div className="container single-product">
        {loading? (
          <Loading />
        ):error? (
          <Message>{error}</Message>
        ):(
          <>
            <Toast />
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12">
                    <div className="product-info">
                      <div className="product-name" style={{lineHeight:"1.5"}}>{drugstore?.product?.name}</div>
                    </div>
                    <img src={drugstore?.product?.image?.slice(tab,tab+1)[0]} alt={`tab[${tab}]`}
                      className="d-block img-thumbnail rounded mt-4 w-100"
                      style={{height: '350px'}} />
                    <div className="row mx-0" style={{cursor: 'pointer'}} >
                      {drugstore?.product?.image?.map((img,index) => (
                        <img key={index} src={img} alt={img}
                          className={`img-thumbnail rounded ${isActive(index)}`}
                          style={{height: '80px',width: '20%'}}
                          onClick={() => setTab(index)} />
                      ))}

                    </div>
                    

                  </div>
                </div>
              </div>
             
              
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">Thông tin</div>
                  </div>
                  
                  <div className="product-count col-lg-7 ">
                      {
                        Number(data?.total)!=0?
                          <>
                        
                            <div className="flex-box d-flex justify-content-between align-items-center">
                              <h6>Giá gốc</h6>
                              <span><span style={{textDecoration:"line-through"}}>{drugstore?.product?.price?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"} </span> <span style={{fontSize:"10px",color:"red"}}> (-{Number(data?.total)}%)</span></span>
                            </div>
                            <div className="flex-box d-flex justify-content-between align-items-center">
                              <h6>Giá khuyến mãi</h6>
                              <span>{(drugstore?.product?.price*(1-Number(data?.total)/100))?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}  </span>
                            </div>
                          </>
                          :
                          <div className="flex-box d-flex justify-content-between align-items-center">
                              <h6>Giá bán lẻ</h6>
                              <span>{drugstore?.product?.price?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"} </span>
                          </div>
                      
                      }
                      {drugstore?.refunded?
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        
                        <span style={{fontSize:"15px"}}>Khi mua hàng bạn sẽ nhận được <span style={{color:"green"}}>{drugstore?.product?.price*drugstore?.refunded/100} </span> điểm thành viên</span>
                      </div>:""
                      }
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Trạng thái</h6>
                        {drugstore?.stock?.length>0? (
                          <span>Còn hàng</span>
                        ):(
                          <span>Hết hàng</span>
                        )}
                      </div>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Bình luận</h6>
                        <Rating
                          value={drugstore?.product?.rating}
                          text={`${drugstore?.product?.numberReviews} bình luận`}
                        />
                      </div>
                      {drugstore?.stock?.length>0? (
                        <>
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6>Số lượng</h6>
                            <select onChange={(e) => setQty(e.target.value)}>
                              {[...Array(drugstore?.stock?.reduce((sum,item)=>sum+item.count,0)).keys()].map(
                                (x) => (
                                  <option key={x+1} value={x+1}>
                                    {x+1}
                                  </option>
                                )
                              )}
                            </select>
                            
                          </div>
                          <button onClick={AddToCart} className="round-black-btn" style={{borderRadius:"15px"}}>
                          <i class='fas fa-cart-plus' style={{fontSize:"24px"}}></i>&nbsp;
                            Thêm giỏ hàng
                          </button>
                          
                        </>
                      ):null}
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="container row p-5">
              {/*<div className="product-info">
                <div className="product-name">Mô tả</div>
              </div>
              <div id="content" dangerouslySetInnerHTML={{ __html: drugstore?.product?.description }}></div>*/}
              <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <button class="nav-link active" id="nav-description-tab" data-bs-toggle="tab" data-bs-target="#nav-description" type="button" role="tab" aria-controls="nav-description" aria-selected="true">
                    <div className="product-info">
                      <div className="product-name">Mô tả</div>
                    </div>
                  </button>
                  <button class="nav-link" id="nav-instruction-tab" data-bs-toggle="tab" data-bs-target="#nav-instruction" type="button" role="tab" aria-controls="nav-instruction" aria-selected="false">
                    <div className="product-info">
                      <div className="product-name">Chỉ dẫn</div>
                    </div>
                  </button>
                  
                </div>
              </nav>
              <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab" tabindex="0"
                dangerouslySetInnerHTML={{ __html: drugstore?.product?.description }}>

                </div>
                <div class="tab-pane fade" id="nav-instruction" role="tabpanel" aria-labelledby="nav-instruction-tab" tabindex="0"
                dangerouslySetInnerHTML={{ __html: drugstore?.product?.instruction }}>

                </div>
              </div>
            </div>
            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">Bình luận</h6>
                {drugstore?.product?.reviews?.length===0&&(
                  <Message variant={'alert-info mt-3'}>Chưa có bình luận</Message>
                )}
                {drugstore?.product?.reviews?.map((review,index) => (
                  <div
                    key={index}
                    className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                  >
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <span>{moment(review.createdAt).calendar()}</span>
                    <div className="alert alert-info mt-3">
                      {review.isShow?review.comment:"Bình luận đã bị ẩn vì nội dụng không phù hợp!"}
                    </div>
                  </div>
                ))
                }
              </div>
              <div className="col-md-6">
                <h6>Phản hồi từ khách hàng</h6>
                <div className="my-4">
                  {/* {loadingReview && <Loading/>}
                  {errorReview && (
                    <Message variant="alert-danger">{errorReview}</Message>
                  )} */}
                </div>

                <form onSubmit={handleSubmitReview}>
                  <div className="my-4">
                    <strong>Đánh giá</strong>
                    <select
                      onChange={(e) => setRating(e.target.value)}
                      className="col-12 bg-light p-3 mt-2 border-0 rounded"
                    >
                      <option value="">Bình chọn...</option>
                      <option value="1">1 - Chưa hài lòng</option>
                      <option value="2">2 - Cũng tạm</option>
                      <option value="3">3 - Tốt</option>
                      <option value="4">4 - Rất tốt</option>
                      <option value="5">5 - Tuyệt vời</option>
                    </select>
                  </div>
                  <div className="my-4">
                    <strong>Bình luận</strong>
                    <textarea
                      row="3"
                      className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>

                  </div>
                  <div className="my-3">
                    {!userInfo? (
                      <Message variant={'alert-warning'}>
                        {' '}
                        <Link to="/login">
                          " <strong>Đăng nhập</strong> "
                        </Link>{' '}
                        để có thể viết bình luận{' '}
                      </Message>
                    ):(
                      !errorReview? (
                        <button className="col-12 bg-black border-0 p-3 rounded text-white">
                          Đăng bình luận
                        </button>
                      ):(
                        <Message variant="alert-danger">{errorReview}</Message>
                      )

                    )}
                  </div>
                </form>
                
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
