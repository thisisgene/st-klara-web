import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import PostPreview from './PostPreview'
import Spinner from '../../common/Spinner/Spinner'

import spinnerStyles from '../../common/Spinner/Spinner.module.sass'
import cx from 'classnames'
import styles from './Posts.module.sass'

export default class Posts extends Component {
  state = {
    posts: [],
    perPage: 30,
    looping: true
  }
  getRequest = currentPage => {
    axios
      .get(
        `/wp-json/wp/v2/${this.props.category}/?per_page=${
          this.state.perPage
        }&offset=${currentPage}`
      )
      .then(res => {
        if (currentPage + this.state.perPage < res.headers['x-wp-total']) {
          let array = this.state.posts
          array = [...array, ...res.data]
          this.setState({ posts: array })
          this.getRequest(currentPage + this.state.perPage)
        } else {
          let array = this.state.posts
          array = [...array, ...res.data]
          this.setState({ posts: array, looping: false })
        }
      })
      .catch(err => console.log(err))
  }
  componentDidMount() {
    this.getRequest(0)
  }
  render() {
    const { looping, posts } = this.state
    const { category, categoryTitle, mainLink, limitTo } = this.props
    return (
      <div className={styles['posts']}>
        <div className={cx('main-title', styles['posts--title'])}>
          {categoryTitle}
        </div>
        {!looping ? (
          <div className={cx(styles['posts--wrapper'], styles[`${category}`])}>
            {posts.map((post, index) => (
              <div key={index}>
                {limitTo ? (
                  index <= limitTo - 1 && (
                    <PostPreview key={index} post={post} category={category} />
                  )
                ) : (
                  <PostPreview key={index} post={post} category={category} />
                )}
              </div>
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
    )
  }
}
