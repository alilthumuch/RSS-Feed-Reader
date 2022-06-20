import React from 'react';
import {useState, useEffect} from 'react';
import './MainFeed.css'

const FeedContent = (props) => {
  const { selectedFeed } = props;

  return (
    <div className='feed-content'>
      <div dangerouslySetInnerHTML={{__html: selectedFeed.content}}></div>
      <div className='feed-open'>
        <a target="_blank" href={selectedFeed.link}>
        <div id='open-btn'></div>
        <label for='open-btn'>Open</label>
        </a>
      </div>
    </div>
  )
}

export default FeedContent;
