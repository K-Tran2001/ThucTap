import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'

const Dropdown = (props) => {
    const {categories,categoriesDrug,title}=props
    const [active,setActive]=useState(false)
    const handleChange=()=>{
        setActive(!active)
    }
  useEffect(()=>{

  },[active])  
  return (
    <div className="shop-container row">
        <div className="container">
            <div className="select" onClick={handleChange} style={{cursor:"pointer"}}>
                <div className="icon">
                    <i className="fa fa-plus-square"></i>
                    <span>{title}</span>
                </div>
                <i className="fa fa-chevron-down"></i>
            </div>

            <ul className={`option ${active?'active':''}`}>
                {categories?categories?.map((item)=>{
                    return(
                        <Link to={`../../${item?._id}/category`}>
                            <li className="twitter">
                                <i className="fas fa-pills"></i>
                                <span>{item?.name}</span>
                            </li>
                        </Link>
                    )
                }):
                categoriesDrug?.map((item)=>{
                    return(
                        <Link to={`../../${item?._id}/cate-drug`}>
                            <li className="twitter">
                                <i className="fas fa-capsules"></i>
                                <span>{item?.name}</span>
                            </li>
                        </Link>
                    )
                })
                }
                
                
            </ul>
        </div>
    </div>    
  )
}

export default Dropdown
