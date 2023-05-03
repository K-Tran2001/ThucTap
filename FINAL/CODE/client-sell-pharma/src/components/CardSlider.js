import react,{useEffect} from 'react'



const CardSlider=() => {
    useEffect(() => {
        const productContainers=[...document.querySelectorAll('.slider-container')];
        const nxtBtn=[...document.querySelectorAll('.nxt-btn')];
        const preBtn=[...document.querySelectorAll('.pre-btn')];

        productContainers.forEach((item,i) => {
            let containerDimensions=item.getBoundingClientRect();
            let containerWidth=containerDimensions.width;

            nxtBtn[i].addEventListener('click',() => {
                item.scrollLeft+=containerWidth;

            })

            preBtn[i].addEventListener('click',() => {
                item.scrollLeft-=containerWidth;
            })
        })
    },[])
    return (

        <section className="slider">
            <h2 className="slider-category">best selling</h2>
            <button className="pre-btn"><img src="images/arrow.png" alt="" /></button>
            <button className="nxt-btn"><img src="images/arrow.png" alt="" /></button>
            <div className="slider-container">
                <div className="slider-card">
                    <div className="slider-image">
                        <span className="discount-tag">50% off</span>
                        <img src="images/card1.jpg" className="slider-thumb" alt="" />
                        <button className="card-btn">Add to Cart</button>
                    </div>
                    <div className="slider-info">
                        <h2 className="slider-brand">brand</h2>
                        <p className="slider-short-description">a short line about the cloth..</p>
                        <span className="price">$20</span><span className="actual-price">$40</span>
                    </div>
                </div>
                <div className="slider-card">
                    <div className="slider-image">
                        <span className="discount-tag">50% off</span>
                        <img src="images/card2.jpg" className="slider-thumb" alt="" />
                        <button className="card-btn">Add to Cart</button>
                    </div>
                    <div className="slider-info">
                        <h2 className="slider-brand">brand</h2>
                        <p className="slider-short-description">a short line about the cloth..</p>
                        <span className="price">$20</span><span className="actual-price">$40</span>
                    </div>
                </div>
                <div className="slider-card">
                    <div className="slider-image">
                        <span className="discount-tag">50% off</span>
                        <img src="images/card3.jpg" className="slider-thumb" alt="" />
                        <button className="card-btn">Add to Cart</button>
                    </div>
                    <div className="slider-info">
                        <h2 className="slider-brand">brand</h2>
                        <p className="slider-short-description">a short line about the cloth..</p>
                        <span className="price">$20</span><span className="actual-price">$40</span>
                    </div>
                </div>
                <div className="slider-card">
                    <div className="slider-image">
                        <span className="discount-tag">50% off</span>
                        <img src="images/card4.jpg" className="slider-thumb" alt="" />
                        <button className="card-btn">Add to Cart</button>
                    </div>
                    <div className="slider-info">
                        <h2 className="slider-brand">brand</h2>
                        <p className="slider-short-description">a short line about the cloth..</p>
                        <span className="price">$20</span><span className="actual-price">$40</span>
                    </div>
                </div>
                <div className="slider-card">
                    <div className="slider-image">
                        <span className="discount-tag">50% off</span>
                        <img src="images/card5.jpg" className="slider-thumb" alt="" />
                        <button className="card-btn">Add to Cart</button>
                    </div>
                    <div className="slider-info">
                        <h2 className="slider-brand">brand</h2>
                        <p className="slider-short-description">a short line about the cloth..</p>
                        <span className="price">$20</span><span className="actual-price">$40</span>
                    </div>
                </div>
                <div className="slider-card">
                    <div className="slider-image">
                        <span className="discount-tag">50% off</span>
                        <img src="images/card6.jpg" className="slider-thumb" alt="" />
                        <button className="card-btn">Add to Cart</button>
                    </div>
                    <div className="slider-info">
                        <h2 className="slider-brand">brand</h2>
                        <p className="slider-short-description">a short line about the cloth..</p>
                        <span className="price">$20</span><span className="actual-price">$40</span>
                    </div>
                </div>
                <div className="slider-card">
                    <div className="slider-image">
                        <span className="discount-tag">50% off</span>
                        <img src="images/card7.jpg" className="slider-thumb" alt="" />
                        <button className="card-btn">Add to Cart</button>
                    </div>
                    <div className="slider-info">
                        <h2 className="slider-brand">brand</h2>
                        <p className="slider-short-description">a short line about the cloth..</p>
                        <span className="price">$20</span><span className="actual-price">$40</span>
                    </div>
                </div>
                <div className="slider-card">
                    <div className="slider-image">
                        <span className="discount-tag">50% off</span>
                        <img src="images/card8.jpg" className="slider-thumb" alt="" />
                        <button className="card-btn">Add to Cart</button>
                    </div>
                    <div className="slider-info">
                        <h2 className="slider-brand">brand</h2>
                        <p className="slider-short-description">a short line about the cloth..</p>
                        <span className="price">$20</span><span className="actual-price">$40</span>
                    </div>
                </div>
                <div className="slider-card">
                    <div className="slider-image">
                        <span className="discount-tag">50% off</span>
                        <img src="images/card9.jpg" className="slider-thumb" alt="" />
                        <button className="card-btn">Add to Cart</button>
                    </div>
                    <div className="slider-info">
                        <h2 className="slider-brand">brand</h2>
                        <p className="slider-short-description">a short line about the cloth..</p>
                        <span className="price">$20</span><span className="actual-price">$40</span>
                    </div>
                </div>
                <div className="slider-card">
                    <div className="slider-image">
                        <span className="discount-tag">50% off</span>
                        <img src="images/card10.jpg" className="slider-thumb" alt="" />
                        <button className="card-btn">Add to Cart</button>
                    </div>
                    <div className="slider-info">
                        <h2 className="slider-brand">brand</h2>
                        <p className="slider-short-description">a short line about the cloth..</p>
                        <span className="price">$20</span><span className="actual-price">$40</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CardSlider
