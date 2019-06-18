import React, { Component } from 'react'

import axios from 'axios'

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
    if (isLoaded) {
      return (
        <div>
          {pages
            .filter(page => page.title.rendered === 'Titelbild')
            .map((page, index) => (
              <div key={index} className={styles['cover-image']}>
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
    return <div>Loading ...</div>
  }
}
