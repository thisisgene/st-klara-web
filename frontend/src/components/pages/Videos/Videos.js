import React, { Component } from 'react';
import axios from 'axios';

import VideoItem from './VideoItem';
import FilterBox from './FilterBox';

import Spinner from '../../common/Spinner/Spinner';

import spinnerStyles from '../../common/Spinner/Spinner.module.sass';
import styles from './Videos.module.sass';

export default class Videos extends Component {
  state = {
    videos: [],
    perPage: 30,
    isLoaded: false,
    looping: true,
    activeCategory: null
  };
  getRequest = currentPage => {
    axios
      .get(
        `/wp-json/wp/v2/videos/?per_page=${this.state.perPage}&offset=${currentPage}`
      )
      .then(res => {
        console.log('res.data: ', res.data);
        console.log('res: ', res);
        if (currentPage + this.state.perPage < res.headers['x-wp-total']) {
          let array = this.state.videos;
          array = [...array, ...res.data];
          this.setState({ videos: array });
          this.getRequest(currentPage + this.state.perPage);
        } else {
          let array = this.state.videos;
          array = [...array, ...res.data];
          console.log('array: ', array);
          this.setState({ videos: array, looping: false });
        }
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    this.getRequest(0);
  }

  setActiveCategory = category => {
    this.setState({
      activeCategory: category
    });
  };

  render() {
    const { isLoaded, videos, looping } = this.state;
    const { activeCategory } = this.state;
    return (
      <div className={styles['videos']}>
        <h1>Videos</h1>
        {!looping ? (
          <div>
            <FilterBox
              items={videos}
              setActiveCategory={this.setActiveCategory}
              activeCategory={this.state.activeCategory}
            />
            {videos
              .filter(
                video =>
                  video.acf.category === activeCategory ||
                  activeCategory === null
              )
              .map((video, index) => (
                <VideoItem key={index} video={video} />
              ))}
          </div>
        ) : (
          <div className={spinnerStyles['spinner-container']}>
            <div className={spinnerStyles['spinner-container--wrapper']}>
              <Spinner />
            </div>
          </div>
        )}
      </div>
    );
  }
}
