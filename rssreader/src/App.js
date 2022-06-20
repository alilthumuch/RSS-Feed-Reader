import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import FeedListing from './FeedListing.js';
import FeedContent from './FeedContent.js';
import Menu from './Menu.js';

const App = () => {
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [menuState, setMenuState] = useState('home');
  const [feedData, setFeedData] = useState([]);

  const handleOpenFeed = (feed) => {
    if (feed) {
      setSelectedFeed(feed);
    }
  }

  const handleMenuSelect = (page) => {
    if (page) {
      setMenuState(page);
      setSelectedFeed(null);
    }
  }

  const handleSetFeedData = (data) => {
    if (data) {
      setFeedData(data);
    }
  }
  return (
    <div className="App">
      <Menu handleMenuSelect = {handleMenuSelect}/>
      {!selectedFeed && menuState === 'home'?
        <FeedListing handleOpenFeed={handleOpenFeed} handleSetFeedData={handleSetFeedData} feedData={feedData}/> :
        <FeedContent selectedFeed={selectedFeed}/>
      }
    </div>
  );
}

export default App;
