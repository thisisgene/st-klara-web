import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import cx from 'classnames'
import styles from './Dashboard.module.sass'

export default class Kontakt extends Component {
  state = {
    pages: [],
    image: {},
    rundgangId: null
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
          this.setState({
            rundgangId: res.data[0].id,
            image: sres.data.guid.rendered,
            isLoaded: true
          })
        })
        .catch(err => console.log(err))

        .catch(err => console.log(err))
    })
  }

  render() {
    const { isLoaded, pages, image, rundgangId } = this.state
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
            {image && (
              <div className={styles['contact--inner__content']}>
                <Link to={`/seite/galerie/${rundgangId}`}>
                  Spazieren sie durch St. Klara...
                </Link>
                <img src={image} alt="" />
              </div>
            )}
          </div>
        </div>
      )
    }
    return null
  }
}
