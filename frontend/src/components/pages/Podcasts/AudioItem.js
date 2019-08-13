import React, { Component } from 'react'

import arrow from '../../common/assets/arrow.png'

import cx from 'classnames'
import styles from './Podcasts.module.sass'

export default class AudioItem extends Component {
  state = {
    showDescription: false
  }

  toggleDescription = () => {
    this.setState({
      showDescription: !this.state.showDescription
    })
  }

  render() {
    const { podcast } = this.props
    return (
      <div className={styles['audio-item']}>
        <div>
          <div
            className={styles['audio-item--body']}
            onClick={this.toggleDescription}
          >
            <div className={styles['audio-item--body__title']}>
              <div
                dangerouslySetInnerHTML={{ __html: podcast.title.rendered }}
              />
              {podcast.acf.category && podcast.acf.category !== '' && (
                <span>{podcast.acf.category}</span>
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
            <div className={styles['audio-item--description']}>
              <div
                dangerouslySetInnerHTML={{
                  __html: podcast.content.rendered
                }}
              />
              {podcast.acf.file && podcast.acf.file.type === 'audio' ? (
                <div className={styles['media-container']}>
                  <audio width="100%" controls>
                    <source
                      src={podcast.acf.file.url}
                      type={podcast.acf.file.mime_type}
                    />
                  </audio>
                </div>
              ) : (
                podcast.acf.file.type === 'video' && (
                  <div className={styles['media-container']}>
                    <video width="100%" controls>
                      <source
                        src={podcast.acf.file.url}
                        type={podcast.acf.file.mime_type}
                      />
                    </video>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}
