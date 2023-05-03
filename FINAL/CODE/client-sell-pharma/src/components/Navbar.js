import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {activeListDrugStore,newListDrugStore} from "../Redux/Actions/DrugStoreActions"
import {useDispatch,useSelector} from "react-redux";
import {listCategory} from "../Redux/Actions/CategoryAction"



const Navbar=() => {
    const activeDrugStoreList=useSelector((state) => state.activeDrugStoreList)
    const { drugstores} = activeDrugStoreList
    
    const categoryList=useSelector((state) => state.categoryList)//newDrugStoreList
    const { categories} = categoryList

    const newDrugStoreList=useSelector((state) => state.newDrugStoreList)
    const { drugstores: newDrugStore,success:successNewDrugStore} = newDrugStoreList

    const dispatch = useDispatch()

    useEffect(() => {
        const menu=document.querySelector(".menu");
        const menuMain=menu.querySelector(".menu-main");
        const goBack=menu.querySelector(".go-back");
        const menuTrigger=document.querySelector(".mobile-menu-trigger");
        const closeMenu=menu.querySelector(".mobile-menu-close");
        let subMenu;
        menuMain.addEventListener("click",(e) => {
            if(!menu.classList.contains("active")) {
                return;
            }
            if(e.target.closest(".menu-item-has-children")) {
                const hasChildren=e.target.closest(".menu-item-has-children");
                showSubMenu(hasChildren);
            }
        });
        goBack.addEventListener("click",() => {
            hideSubMenu();
        })
        menuTrigger.addEventListener("click",() => {
            toggleMenu();
        })
        closeMenu.addEventListener("click",() => {
            toggleMenu();
        })
        document.querySelector(".menu-overlay").addEventListener("click",() => {
            toggleMenu();
        })
        function toggleMenu() {
            menu.classList.toggle("active");
            document.querySelector(".menu-overlay").classList.toggle("active");
        }
        function showSubMenu(hasChildren) {
            subMenu=hasChildren.querySelector(".sub-menu");
            subMenu.classList.add("active");
            subMenu.style.animation="slideLeft 0.5s ease forwards";
            const menuTitle=hasChildren.querySelector("i").parentNode.childNodes[0].textContent;
            menu.querySelector(".current-menu-title").innerHTML=menuTitle;
            menu.querySelector(".mobile-menu-head").classList.add("active");
        }

        function hideSubMenu() {
            subMenu.style.animation="slideRight 0.5s ease forwards";
            setTimeout(() => {
                subMenu.classList.remove("active");
            },300);
            menu.querySelector(".current-menu-title").innerHTML="";
            menu.querySelector(".mobile-menu-head").classList.remove("active");
        }

        window.onresize=function() {
            if(this.innerWidth>991) {
                if(menu.classList.contains("active")) {
                    toggleMenu();
                }

            }
        }
    },[])
    useEffect(()=>{
        dispatch(activeListDrugStore())
        dispatch(listCategory())
        dispatch(newListDrugStore())
    },[successNewDrugStore])
    return (
        <>
            <header className="header category">
                <div className="container">
                    <div className="row v-center">
                        <div className="header-item item-left">

                        </div>

                        <div className="header-item item-center">
                            <div className="menu-overlay">
                            </div>
                            <nav className="menu">
                                <div className="mobile-menu-head">
                                    <div className="go-back"><i className="fa fa-angle-left"></i></div>
                                    <div className="current-menu-title"></div>
                                    <div className="mobile-menu-close">&times;</div>
                                </div>
                                <ul className="menu-main">
                                    <li>   
                                        <Link to={`/63fda2480eb51f66e1dc733b/cate-drug`}>
                                            Danh mục thuốc
                                        </Link>
                                    </li>
                               
                                    
                                   

                                    <li className="menu-item-has-children">
                                        <a href="#">Sản phẩm mới <i className="fa fa-angle-down"></i></a>
                                        <div className="sub-menu mega-menu mega-menu-column-4">
                                            {
                                                newDrugStore?.map((item)=>{
                                                return(

                                                    <div className="list-item text-center">
                                                        <Link to={`/products/${item._id}`}>
                                                            <img src={item?.product?.image?.[0]} alt="new Product" 
                                                                style={{width:"200px",height:"200px"}}
                                                            />
                                                            <h4 className="title">{item?.product?.name}</h4>
                                                        </Link>
                                                    </div>
                                                )

                                                })
                                            }
                                            
                                            
                                        </div>
                                    </li>
                                    <li className="menu-item-has-children">
                                        <a href="#">Tủ thuốc <i className="fa fa-angle-down"></i></a>
                                        <div className="sub-menu mega-menu mega-menu-column-4">

                                            {
                                                categories?.map((cate)=>{
                                                    return(
                                                        <div className="list-item">
                                                            <Link to={`/${cate._id}/category`}><h4 className="title">{cate.name}</h4></Link>
                                                            
                                                            <ul>
                                                            {
                                                                drugstores?.filter(item => item.product.category === cate._id).map((drug)=>{
                                                                    return( 
                                                                        <li>
                                                                            <Link to={`/products/${drug._id}`}>
                                                                                {drug.product.name}
                                                                            </Link>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                            </ul>
                                                        </div>
                                                    )
                                                })
                                            }
                                            

                                            <div className="list-item">
                                                <h4 className="title">Sản phẩm tiện lợi</h4>
                                                <ul>
                                                    <li>
                                                        <Link to={`#`}>
                                                            Hàng tổng hợp
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to={`#`}>
                                                            Hàng bách hóa
                                                        </Link>
                                                    </li>
                                                    
                                                </ul>
                                            </div>
                                            <div className="list-item">
                                                <img src="https://bcp.cdnchinhphu.vn/334894974524682240/2022/12/30/image003-7427326-16723913420051368540960.png" alt="shop" />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="menu-item-has-children">
                                        <a href="#">Blog <i className="fas fa-angle-down"></i></a>
                                        <div className="sub-menu single-column-menu">
                                            <ul>
                                                <li><a href="#">Blog 1</a></li>
                                                <li><a href="#">Blog 2</a></li>
                                                <li><a href="#">Blog 3</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="menu-item-has-children">
                                        <a href="#">Tin tức <i className="fas fa-angle-down"></i></a>
                                        <div className="sub-menu single-column-menu">
                                            <ul>
                                                <li><a href="#">Đang thử nghiệm</a></li>
                                                <li><a href="#">Đang thử nghiệm</a></li>
                                            </ul>
                                        </div>
                                    </li>

                                </ul>
                            </nav>
                        </div>

                        <div className="header-item item-right">


                            <div className="mobile-menu-trigger">
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Navbar