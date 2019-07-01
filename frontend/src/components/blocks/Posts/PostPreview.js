import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import ImageItem from '../ImageItem'

import styles from './Posts.module.sass'

export default class PostPreview extends Component {
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
          {category === 'podcasts' && <a href="">anhören...</a>
          // <Link
          //   to={`/${category}/${post.id}/${post.slug}`}
          //   className={styles['post--link']}
          // >
          //   mehr...
          // </Link>
          }
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
