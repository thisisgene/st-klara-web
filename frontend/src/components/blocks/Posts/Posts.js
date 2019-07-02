import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import PostPreview from './PostPreview'

import cx from 'classnames'
import styles from './Posts.module.sass'

export default class Posts extends Component {
  state = {
    posts: [],
    isLoaded: false
  }

  componentDidMount() {
    axios
      .get(`/wp-json/wp/v2/${this.props.category}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          posts: res.data,
          isLoaded: true
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    const { isLoaded, posts } = this.state
    const { category, categoryTitle, mainLink } = this.props
    return (
      <div className={styles['posts']}>
        <div className={cx('main-title', styles['posts--title'])}>
          {categoryTitle}
        </div>
        {isLoaded && (
          <div className={cx(styles['posts--wrapper'], styles[`${category}`])}>
            {posts.map((post, index) => (
              <div key={index}>
                {index <= 3 && (
                  <PostPreview key={index} post={post} category={category} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}
