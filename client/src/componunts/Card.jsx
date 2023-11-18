
const Card = ({ item, checkouthandler={checkouthandler} }) => {
    return (
        <div className="card">
            <div className="card-img">
                <img className="img-card" src={item.img} alt="" />
            </div>
            <div className="card-detail">
                <h2>{item.title}</h2>
                <p>₹ {item.price}</p>
                <button className="button-card" onClick={()=>checkouthandler(item.price)} >Buy Now</button>
            </div>
        </div>
    )
}

export default Card