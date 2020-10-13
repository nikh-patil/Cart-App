import React from 'react'
import './index.css'

export default function ProductList(props) {
    const clickHandler = (name, actual, display,index) => {
        let obj = {
            name: name,
            actual: actual,
            display: display,
            index:index,
            qty:1
        }
        props.addToCart(obj)
    }
    return (
        <div className="product-container" >
            {
                props.products.map((eachProduct, index) =>
                    <div className="card" key={index + "id"} >
                        <div className="cart-image" >
                            <img src={eachProduct.image} width="120" height="120" alt="product"/>
                        </div>
                        <div className="card-footer">
                            <div className="left-footer">
                                <p className="item">{eachProduct.name}</p>
                                <div className="prices">
                                    <span className="diplay-line-through font">{"$"+eachProduct.price.display}</span>&nbsp;
                                    <span className="actual-bold-value">{"$"+eachProduct.price.actual}</span>
                                </div>
                            </div>
                            <div className="right-footer">
                                <button className="btn info" onClick={clickHandler.bind(this, eachProduct.name, eachProduct.price.actual, eachProduct.price.display,index)}> Add to cart </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>)
}