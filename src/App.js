import React from 'react';
import ProductList from './components/product-list'
import Cart from './components/cart'
import PRODUCT from './productJson'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedItem: "",
      cartItems: [],
      showNotication: false,
      showCart:false,
      totalCost:0,
      discount:0
    }
  }
  compare = (index) => {
    let temp = []
    for (let i = 0; i < this.state.cartItems.length; i++) {
      if (this.state.cartItems[i].index === index) {
        temp.push(i)
        break;
      }
    }
    return temp;
  }
  total = () =>{
    let allItems  = this.state.cartItems
    let totalCost =0
    let discount =0
    allItems.map(eachItem =>{
      totalCost += eachItem.qty*eachItem.display
      discount += (eachItem.qty*eachItem.display) - (eachItem.qty*eachItem.actual)
    })
    this.setState({
      totalCost : totalCost,
      discount : discount
    })
  }
  notify = (showItem) => {
    this.setState({
      selectedItem: showItem,
      showNotication: true,
      showCart:true
    })
  }
  addCardHandler = (detail) => {
    this.notify(detail.name)
    let temp = this.compare(detail.index)
    if (temp[0] !== undefined) {
      let update = this.state.cartItems
      update[temp[0]].qty += 1
      this.setState({
        selectedItem: detail.name,
        cartItems: update
      },()=>{this.total()})
    } else {
      this.setState({
        selectedItem: detail.name,
        cartItems: [...this.state.cartItems, detail]
      },()=>{this.total()})
    }
  }
  addExtraItemHandler = (extraItem) => {
    let temp = this.compare(extraItem)
    let update = this.state.cartItems
    update[temp[0]].qty += 1
    this.setState({
      cartItems: update
    },()=>{this.total()})
  }
  removeExtraItemHandler = (deleteItem) => {
    let temp = this.compare(deleteItem)
    let update = this.state.cartItems
    if (update[temp[0]].qty === 1) {
      update.splice(temp[0], 1)
      this.setState({
        cartItems: update
      },()=>{this.total()})
    } else {
      update[temp[0]].qty -= 1
      this.setState({
        cartItems: update
      },()=>{this.total()})
    }
  }
  removeItemHandler =(deleteItem) =>{
    let temp = this.compare(deleteItem)
    let update = this.state.cartItems
    update.splice(temp[0], 1)
      this.setState({
        cartItems: update
      },this.total())
      
  }
  render() {
    const { cartItems, selectedItem, showNotication,showCart,totalCost,discount } = this.state
    return (
      <div className="container">
        <div className="header">
          <span className="all-header">All Items</span>

          <span className="notification">
            {showNotication ? selectedItem + " is added to card" : "Add Items to the cart"}
          </span>
        </div>

        <div className="product-list">
          <ProductList products={PRODUCT} addToCart={this.addCardHandler} />
        </div>

        <div className="cart">
          { showCart ? <Cart totalCost={totalCost} discount={discount} cartList={cartItems} removeItemHandler={this.removeItemHandler} addExtraItemHandler={this.addExtraItemHandler} removeExtraItemHandler={this.removeExtraItemHandler} />:null}
        </div>
      </div>
    );
  }
}

export default App;
