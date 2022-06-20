import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import XMLParser from 'react-xml-parser';
import './MainFeed.css';

const FeedListing = (props) => {
  const {handleOpenFeed, handleSetFeedData, feedData} = props;
  const [url, setUrl] = useState(null);

  const fetchFeedData = async () => {
    const proxy_url = 'https://api.rss2json.com/v1/api.json?rss_url=';
    if (!url) { return };
      axios({
        method: 'GET',
        url: proxy_url + url,
      })
      .then(response => {
        if (response && response.data) {
        let feed = response.data.items && response.data.items.length ? response.data.items : response.data.feed ? [response.data.feed] : [];
        console.log(feed)
        handleSetFeedData(feed);
        setUrl('')
        } else {
          //display no feed available in body
        }
      })
      .catch(err => {
        //display error in main feed boody
        console.log(err)
      })
  }

  const handleSetUrl = (e) => {
    e.preventDefault();
    const url = e.target.value || null;
    setUrl(url);
  }

  useEffect (() => {
    if (!feedData.length) {
      fetchFeedData();
    }
  }, []);

  return (
    <>
    <div className='feed-search'>
      <input className='feed-search-bar' type='text' placeholder='URL' value={url} onChange={(e) => handleSetUrl(e)}></input>
      <div className='submit-btn' onClick={fetchFeedData}>
        <div id='submit-input'></div>
        <label for='submit-input'>Search</label>
      </div>
    </div>
    <div className='feed-body'>
    {feedData.map(data =>
      <div className='feed-item'>
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
        <div className='feed-bookmark btn' onClick={() => handleBookMarkData(data)}>
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
    </>
  )
}

export default FeedListing;
