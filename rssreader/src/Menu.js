import React from 'react';

const Menu = (props) => {
  const {handleMenuSelect} = props;
  return (
    <div className='menu'>
      <div onClick={() => handleMenuSelect('home')}>
      <div className='menu-tab homepage'>Home</div>
      </div>
      <div onClick={() => handleMenuSelect('bookmark')}>
      <div className='menu-tab bookmark'>Bookmark</div>
      </div>
    </div>
  )
}

export default Menu;
