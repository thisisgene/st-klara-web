import React, { Component } from 'react'

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
            <div>{podcast.title.rendered}</div>
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
