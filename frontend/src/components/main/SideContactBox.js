import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import cx from 'classnames'
import styles from './Dashboard.module.sass'

export default class Kontakt extends Component {
  state = {
    pages: [],
    image: {}
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
    axios.get('/wp-json/wp/v2/galleries?slug=rundgang').then(res => {
      axios
        .get(`/wp-json/wp/v2/media/${res.data[0].featured_media}`)
        .then(sres => {
          console.log(sres.data.guid)
          this.setState({
            image: sres.data.guid.rendered,
            isLoaded: true
          })
        })
        .catch(err => console.log(err))

        .catch(err => console.log(err))
    })
  }

  render() {
    const { isLoaded, pages, image } = this.state
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
          <br />
          <div className={styles['contact--inner']}>
            <div className={cx('main-title', styles['contact-title'])}>
              RUNDGANG
            </div>
            <div className={styles['contact--inner__content']}>
              <Link to="/seite/galerie/170">
                Spazieren sie durch St. Klara...
              </Link>
              {image && <img src={image} alt="" />}
            </div>
          </div>
        </div>
      )
    }
    return null
  }
}
