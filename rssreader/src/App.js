import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import FeedListing from './FeedListing.js';
import FeedContent from './FeedContent.js';
import Bookmark from './Bookmark.js';
import Menu from './Menu.js';

const App = () => {
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [menuState, setMenuState] = useState('home');
  const [feedData, setFeedData] = useState(JSON.parse(window.localStorage.getItem('feed')) || []);
  const [bookmarkData, setBookmarkData] = useState(JSON.parse(window.localStorage.getItem('bookmark')) || []);

  const handleOpenFeed = (feed) => {
    if (feed) {
      setMenuState('feedContent')
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
      data.forEach(feed => {feed.bookmark = false});
      setFeedData(data);
    }
  }

  const handleBookmarkData = (data) => {
    let newBookmark = true;
    const updatedFeed = feedData.map(feed =>
      feed.guid === data.guid ? {...feed, bookmark: !feed.bookmark} : feed
    )
    const updatedBookmark = bookmarkData.length ? bookmarkData.map(bookmark => {
        if (bookmark && bookmark.guid !== data.guid) {
          return bookmark;
        } else if (bookmark && bookmark.guid === data.guid) {
          newBookmark = false;
        }
      }
    ) : [];
    if (newBookmark && !data.bookmark) updatedBookmark.push(data);
    setBookmarkData(updatedBookmark);
    setFeedData(updatedFeed);
  }

  useEffect(() => {
    window.localStorage.setItem('bookmark', JSON.stringify(bookmarkData));
    window.localStorage.setItem('feed', JSON.stringify(feedData));
  }, [feedData]);

  useEffect(() => {
    const bookmark = JSON.parse(window.localStorage.getItem('bookmark'));
    const feed = JSON.parse(window.localStorage.getItem('feed'));
    if (feed) {
      setFeedData(feed);
    }
    if (bookmark) {
      setBookmarkData(bookmark);
    }
  }, [])

  const renderPage = () => {
    switch (menuState) {
      case ('home') :
      return (
        <FeedListing
        handleOpenFeed={handleOpenFeed}
        handleSetFeedData={handleSetFeedData}
        feedData={feedData}
        handleBookmarkData={handleBookmarkData}
        />
      )
      case ('bookmark') :
      return (
        <Bookmark
        handleOpenFeed={handleOpenFeed}
        handleSetFeedData={handleSetFeedData}
        bookmarkData={bookmarkData}
        handleBookmarkData={handleBookmarkData}
        />
      )
      case ('feedContent') :
      return (
        <FeedContent
        selectedFeed={selectedFeed}
        />
      )
    }
  }

  return (
    <div className="App">
      <Menu handleMenuSelect = {handleMenuSelect}/>
      {renderPage()}
    </div>
  );
}

export default App;
