import React, { Component } from 'react';

import arrow from '../../common/assets/arrow.png';

import cx from 'classnames';
import styles from './Videos.module.sass';

export default class VideoItem extends Component {
  state = {
    showDescription: false
  };

  toggleDescription = () => {
    this.setState({
      showDescription: !this.state.showDescription
    });
  };

  render() {
    const { video } = this.props;
    return (
      <div className={styles['video-item']}>
        <div>
          <div
            className={styles['video-item--body']}
            onClick={this.toggleDescription}
          >
            <div className={styles['video-item--body__title']}>
              <div dangerouslySetInnerHTML={{ __html: video.title.rendered }} />
              {video.acf.category && video.acf.category !== '' && (
                <span>{video.acf.category}</span>
              )}
            </div>
            <div
              className={cx(styles['arrow'], {
                [styles['open']]: this.state.showDescription
              })}
            >
              <img src={arrow} alt="" />
            </div>
          </div>
          {this.state.showDescription && (
            <div className={styles['video-item--description']}>
              <div
                dangerouslySetInnerHTML={{
                  __html: video.content.rendered
                }}
              />
              {video.acf.file && video.acf.file.type === 'audio' ? (
                <div className={styles['media-container']}>
                  <audio width="100%" controls>
                    <source
                      src={video.acf.file.url}
                      type={video.acf.file.mime_type}
                    />
                  </audio>
                </div>
              ) : (
                video.acf.file.type === 'video' && (
                  <div className={styles['media-container']}>
                    <video width="100%" controls>
                      <source
                        src={video.acf.file.url}
                        type={video.acf.file.mime_type}
                      />
                    </video>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
