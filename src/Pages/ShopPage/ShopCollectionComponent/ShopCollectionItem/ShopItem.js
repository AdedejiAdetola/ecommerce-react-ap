import './ShopItem.scss';
import { connect } from 'react-redux';
import { addItem } from '../../../../redux/cart/cart.action';

const ShopItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;
    return ( 
        <div className='shopItem'>
            <div
            className="shopitem-image"
            style={{
                backgroundImage: `url(${imageUrl})`
            }}>
                <div className='cart-overlay'>
                    <button onClick={() => addItem(item)} className='btn'>ADD TO CART</button>
                </div>
            </div>

            <div className="shopitem-footer">
                <span className="name">{ name } </span>
                <span className="price">{ `$${price}` }</span>
            </div>
        </div>
        
     );
}
 
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})
export default connect(
    null,
    mapDispatchToProps
)(ShopItem);