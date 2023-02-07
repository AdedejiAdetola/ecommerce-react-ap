import './MenuContainer.scss';
import { useContext } from 'react';
import { DataContext } from '../../Context/DataContext/DataContext';
import MenuItem from '../MenuItem/MenuItem';
const MenuContainer = () => {
    const { data } = useContext(DataContext);
    return ( 
        <div className='menu-container'>
            {data.map(oneData => {
                return (
                    <MenuItem key={oneData.id} imageUrl={oneData.imageUrl} title={oneData.title} size={oneData.size}/>
                )
            })}
        </div>
     );
}
 //map each menuItem;
export default MenuContainer;