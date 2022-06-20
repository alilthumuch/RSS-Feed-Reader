import React from 'react';

const Menu = (props) => {
  const {handleMenuSelect} = props;
  return (
    <div className='menu'>
      <div onClick={() => handleMenuSelect('home')}>
      <div className='menu-homepage'>Home</div>
      </div>
    </div>
  )
}

export default Menu;
