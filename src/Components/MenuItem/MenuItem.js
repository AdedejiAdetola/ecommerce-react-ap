import MenuContent from '../MenuContent/MenuContent';
import './MenuItem.scss';
const MenuItem = ({ title, imageUrl, size }) => {
    return ( 
        <div className={`menu-item ${size}`}>
            
            <div className='background-image' 
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <MenuContent title={ title } size= { size }/>
        </div>
     );
}
 //contain menu contents
export default MenuItem;