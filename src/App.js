import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [postData, setPostData] = useState("TotallyShopify")
  const [showSilly, setShowSilly] = useState("none")
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('https://6uh0la089e.execute-api.eu-west-1.amazonaws.com/dev/products')
    .then(function (response) {
      console.log(response)
      setProducts(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
    .then(function () {
      
    })
  }, [])

  const makePostRequest = (prod) => {
      axios.post('https://6uh0la089e.execute-api.eu-west-1.amazonaws.com/dev/order/create', {
        productID: prod.productID
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {
        setPostData("Ordered")
        // setShowSilly("block")
      })
  }

  return (
    <div className="App">
      <main className="main">
        <h1>{postData}</h1>
        {products.map((product, i) =>
          <div key={i}>
            <h3>{product.name}</h3>
            <img src={product.imageURL} alt={product.name} />
            <div>
              {product.quantity >= 1 ? 
                <button className="button" onClick={() => makePostRequest(product)}>Order</button> : 
                "Out of stock"                
              }
            </div>
          </div>
        )}
        <img style={{display: showSilly}} className="silly" src={process.env.PUBLIC_URL + '/alfie-charlie.jpg'} alt="silly" />
      </main>
    </div>
  )
}

export default App
