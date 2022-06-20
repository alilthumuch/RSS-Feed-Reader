import React from 'react';
import {useState, useEffect} from 'react';
import './MainFeed.css';

const Bookmark = (props) => {
  const {handleOpenFeed, handleSetFeedData, handleBookmarkData, bookmarkData} = props;
  const [url, setUrl] = useState(null);

  return (
    <div className='feed-body'>
    {bookmarkData.map(data =>
      data &&
      <div className='feed-item' key={data.guid}>
        {data.thumbnail &&
          <div className='feed-img'>
            <img alt src={data.thumbnail}></img>
          </div>
        }
        <div className='feed-item-heading'>
          <a target="_blank" href={data.link}>
            {data.title}
          </a>
        </div>
        <div className='feed-bookmark-selected btn' onClick={() => handleBookmarkData(data)}>
          <div id='bookmark-btn'></div>
          <label for='bookmark-btn'>B!</label>
        </div>
        <div className='feed-open btn' onClick={() => handleOpenFeed(data)}>
          <div id='open-btn'></div>
          <label for='open-btn'>Open</label>
        </div>
      </div>
    )}
    </div>
  )
}

export default Bookmark;
