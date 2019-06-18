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
    const { file } = this.props
    return (
      <div className={styles['audio-item']}>
        <div>
          <div
            className={styles['audio-item--body']}
            onClick={this.toggleDescription}
          >
            <div>{file.title.rendered}</div>
          </div>
          {this.state.showDescription && (
            <div className={styles['audio-item--description']}>
              <div
                dangerouslySetInnerHTML={{
                  __html: file.caption.rendered
                }}
              />
              <div>play</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
