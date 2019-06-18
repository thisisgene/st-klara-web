import React, { Component } from 'react'

import axios from 'axios'

import cx from 'classnames'
import styles from './CoverImage.module.sass'

export default class CoverImage extends Component {
  state = {
    pages: [],
    isLoaded: false
  }

  componentDidMount() {
    axios
      .get('/wp-json/wp/v2/pages')
      .then(res =>
        this.setState({
          pages: res.data,
          isLoaded: true
        })
      )
      .catch(err => console.log(err))
  }
  render() {
    const { isLoaded, pages } = this.state

    return (
      <div
        className={cx(styles['cover-image-container'], {
          [styles['loading']]: !isLoaded
        })}
      >
        {pages
          .filter(page => page.title.rendered === 'Titelbild')
          .map((page, index) => (
            <div
              key={index}
              className={cx(styles['cover-image'], {
                [styles['loading']]: !isLoaded
              })}
            >
              {index === 0 && (
                <div
                  className={styles['cover-image--image']}
                  dangerouslySetInnerHTML={{ __html: page.content.rendered }}
                />
              )}
            </div>
          ))}
      </div>
    )
  }
}
