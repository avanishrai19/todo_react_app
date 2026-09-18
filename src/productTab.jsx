import Product from "./product.jsx"

function ProductTab() {

    return ( 

        <div className="productTab">
         <Product title="Zebronic Soundbar" Oldprice={25000} Newprice={20000} features={["Clean Sound Effects", "Wireless Connectivity"]} />
         <Product title="Asus laptop" Oldprice={85000} Newprice={82499} features={["High Performance", "Gaming Laptop"]} />
         <Product title="Vivo T4x 5G" Oldprice={18000} Newprice={15499} features={["5G Connectivity", "Smart Camera & Gaming Features"]} />
         <Product title="Asus VivoBook" Oldprice={28000} Newprice={25000} features={["Fast Performance", "Big Screen"]} />
        </div>
    )
}
export default ProductTab