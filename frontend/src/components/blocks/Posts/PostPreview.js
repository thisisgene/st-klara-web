import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import ImageItem from '../ImageItem'

import styles from './Posts.module.sass'

export default class PostPreview extends Component {
  state = {
    showPlayer: false
  }

  onShowPlayerClick = () => {
    this.setState({ showPlayer: true })
  }

  render() {
    const { post, category } = this.props
    return (
      <div className={styles['post']}>
        <div className={styles['post-text']}>
          <div className={styles['post--title']}>{post.title.rendered}</div>
          {category === 'events' && (
            <div className={styles['post--date']}>{post.acf.date_time}</div>
          )}
          <div
            className={styles['post--excerpt']}
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
          {category === 'podcasts' && (
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
        </div>
        {post.featured_media !== 0 && (
          <div className={styles['post-image']}>
            <ImageItem id={post.featured_media} />
          </div>
        )}
      </div>
    )
  }
}
