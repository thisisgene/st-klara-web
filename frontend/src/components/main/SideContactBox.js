import React, { Component } from 'react'
import axios from 'axios'

import cx from 'classnames'
import styles from './Dashboard.module.sass'

export default class Kontakt extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios
      .get('/wp-json/wp/v2/pages?slug=kontakt_mini')
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
        <div className={styles['contact']}>
          {pages
            // .filter(page => page.title.rendered === 'Titelbild')
            .map((page, index) => (
              <div key={index} className={styles['contact--inner']}>
                <div className={cx('main-title', styles['contact-title'])}>
                  KONTAKT
                </div>
                <div
                  className={styles['contact--inner__content']}
                  dangerouslySetInnerHTML={{ __html: page.content.rendered }}
                />
              </div>
            ))}
        </div>
      )
    }
    return null
  }
}
