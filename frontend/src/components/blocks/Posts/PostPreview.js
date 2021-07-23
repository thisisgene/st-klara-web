import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';
import localization from 'moment/locale/de';

import ImageItem from '../ImageItem';

import styles from './Posts.module.sass';

export default class PostPreview extends Component {
  state = {
    showPlayer: false
  };

  onShowPlayerClick = () => {
    this.setState({ showPlayer: true });
  };

  render() {
    const { post, category } = this.props;
    return (
      <div className={styles['post']}>
        <div className={styles['post-text']}>
          <div
            className={styles['post--title']}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          {category === 'events' && post.acf.date_time !== '' && (
            <div className={styles['post--date']}>
              {moment(post.acf.date_time)
                .locale('de', localization)
                .format('dddd, DD. MMMM YYYY - HH:mm')}{' '}
              Uhr
            </div>
          )}
          <div
            className={styles['post--excerpt']}
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
          {category === 'podcasts' && post.acf.file && (
            <div>
              {this.state.showPlayer ? (
                <div className={styles['podcast']}>
                  <audio controls ref={ref => (this.player = ref)}>
                    <source
                      src={post.acf.file.url}
                      type={post.acf.file.mime_type}
                    />
                  </audio>
                </div>
              ) : (
                <button
                  onClick={this.onShowPlayerClick}
                  className={'button-link'}
                >
                  anhören...
                </button>
              )}
            </div>
          )}
          {category === 'videos' && post.acf.file && (
            <div>
              {this.state.showPlayer ? (
                <div className={styles['podcast']}>
                  <video width="100%" controls ref={ref => (this.player = ref)}>
                    <source
                      src={post.acf.file.url}
                      type={post.acf.file.mime_type}
                    />
                  </video>
                </div>
              ) : (
                <button
                  onClick={this.onShowPlayerClick}
                  className={'button-link'}
                >
                  ansehen...
                </button>
              )}
            </div>
          )}
        </div>
        {post.featured_media !== 0 && (
          <div className={styles['post-image']}>
            <ImageItem id={post.featured_media} />
          </div>
        )}
      </div>
    );
  }
}
