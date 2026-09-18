import Price from "./Price.jsx"
import './product.css'
function Product({title, Oldprice, Newprice, features}) { 
  return (
    <div className="product">
      <h3>{title}</h3>
      <p>{features.join(", ")}</p>
      <Price Oldprice={Oldprice} Newprice={Newprice} />
    </div>
  )
}
export default Product