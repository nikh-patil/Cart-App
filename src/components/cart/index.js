import React from 'react'
import './index.css'

export default function Cart(props) {
    const addHandler = (index) => {
        props.addExtraItemHandler(index)
    }
    const removeHandler = (index) => {
        props.removeExtraItemHandler(index)
    }
    const removeItem = (index) =>{
        props.removeItemHandler(index)
    }
     return (
        <div className="cart-container" >
            <div>
                <table>
                    <thead>
                        <tr>
                            <th className="font">Items</th>
                            <th className="font">Quantity</th>
                            <th className="font">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.cartList.map((eachItem, index) =>
                                <tr key={index}>
                                    <td >
                                        <div className="selected-item">
                                            {"$" + eachItem.name} <button className="sign-btn" onClick={removeItem.bind(this,eachItem.index)}>X</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="selected-qty">
                                            <button className="sign-btn" onClick={addHandler.bind(this, eachItem.index)}>+</button>
                                            <span className="selected-item">{eachItem.qty}</span>
                                            <button className="sign-btn" onClick={removeHandler.bind(this, eachItem.index)}>-</button>
                                        </div>
                                    </td>
                                    <td className="font">{"$" + eachItem.display * eachItem.qty}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div><br />
            <div>
                <table>
                    <thead>
                        <tr>
                            <th className="font">Total</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="font"> items(4)</td>
                            <td>:</td>
                            <td>{"$"+props.totalCost}</td>
                        </tr>
                        <tr>
                            <td className="font"> Discount</td>
                            <td>:</td>
                            <td>{"$"+props.discount}</td>
                        </tr>
                        <tr>
                            <td className="font"> Type Discount</td>
                            <td>:</td>
                            <td>{"$"+0}</td>
                        </tr>
                        <tr className="order-total">
                        <td> Order Total</td>
                            <td>:</td>
                            <td>{"$"+ (props.totalCost-props.discount)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}