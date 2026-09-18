export default function Price({ Oldprice, Newprice }) {
    return (
        <div className="price">
          <span> <p className="old-price"> Rs {Oldprice}</p></span> 
            <span><p className="new-price"> Rs {Newprice}</p></span>
        </div>
    );
}