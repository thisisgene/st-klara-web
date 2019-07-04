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
            <div dangerouslySetInnerHTML={{ __html: podcast.title.rendered }} />
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
              <audio controls>
                <source
                  src={podcast.acf.file.url}
                  type={podcast.acf.file.mime_type}
                />
              </audio>
            </div>
          )}
        </div>
      </div>
    )
  }
}
