import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {

  return (
    <div className='exploremenu' id='exploremenu'>
      <h1>Explore Our Menu</h1>
      <p className='exploremenu-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus at, neque rem cumque deserunt sed? </p>
      <div className="exploremenu-list">
        {menu_list.map((item, index) => {
            return (
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='exploremenu-list-item'>
                    <img className={category===item.menu_name?"Active":""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />

    </div> 
  )
}

export default ExploreMenu
