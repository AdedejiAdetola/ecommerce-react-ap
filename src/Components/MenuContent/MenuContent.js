import './MenuContent.scss';
import { Link } from "react-router-dom";
const MenuContent = ({ title, size }) => {
    return ( 
        
        <div 
        className={`menu-content ${size}`}>
            <Link className="option" to='/shop'>
            <h1>{ title.toUpperCase() }</h1>
            <p>SHOP NOW</p>
            </Link>
        </div>
        
     );
}
 
export default MenuContent;