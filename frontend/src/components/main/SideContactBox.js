import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import cx from 'classnames'
import styles from './Dashboard.module.sass'

export default class Kontakt extends Component {
  state = {
    pages: [],
    newsletterImage: '',
    rundgangImage: '',
    rundgangId: null,
    eventProgram: null,
    gotEventProgram: false,
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
    axios.get(`/wp-json/wp/v2/pages`).then(res => {
      let eventProgram = res.data.filter(
        page => page.title.rendered === 'Veranstaltungsprogramm'
      )[0]
      console.log('eventProgram', eventProgram)
      if (eventProgram !== undefined) {
        this.setState({
          eventProgram: eventProgram.acf.event_pdf,
          gotEventProgram: true,
        })
      }
    })
    axios.get('/wp-json/wp/v2/pages?slug=newsletter').then(res => {
      axios
        .get(`/wp-json/wp/v2/media/${res.data[0].featured_media}`)
        .then(sres => {
          this.setState({
            newsletterImage: sres.data.guid.rendered,
            isLoaded: true
          })
        })
        .catch(err => console.log(err))

        .catch(err => console.log(err))
    })

    axios.get('/wp-json/wp/v2/galleries?slug=rundgang').then(res => {
      axios
        .get(`/wp-json/wp/v2/media/${res.data[0].featured_media}`)
        .then(sres => {
          this.setState({
            rundgangId: res.data[0].id,
            rundgangImage: sres.data.guid.rendered,
            isLoaded: true
          })
        })
        .catch(err => console.log(err))

        .catch(err => console.log(err))
    })
  }

  render() {
    const {
      isLoaded,
      pages,
      rundgangImage,
      rundgangId,
      newsletterImage,
      gotEventProgram,
      eventProgram
    } = this.state
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
              VERANSTALTUNGS-<br />PROGRAMM
            </div>

            <div className={styles['contact--inner__content']}>
              {gotEventProgram && eventProgram && (
                <div className={styles['posts--all-events-link']}>
                  <a href={`${eventProgram}`} target="_blank">
                    Aktuelles Veranstaltungsprogramm (PDF)
                    </a>
                  <br />
                  <br />
                </div>
              )}
            </div>
          </div>
          <br />
          <div className={styles['contact--inner']}>
            <div className={cx('main-title', styles['contact-title'])}>
              NEWSLETTER
            </div>

            <div className={styles['contact--inner__content']}>
              <Link to={'/seite/newsletter'}>Newsletter abonnieren...</Link>
              <img src={newsletterImage} alt="" />
            </div>
          </div>
          <br />
          <div className={styles['contact--inner']}>
            <div className={cx('main-title', styles['contact-title'])}>
              RUNDGANG
            </div>
            {rundgangImage && (
              <div className={styles['contact--inner__content']}>
                <Link to={`/seite/galerie/${rundgangId}`}>
                  Spazieren sie durch St. Klara...
                </Link>
                <img src={rundgangImage} alt="" />
              </div>
            )}
          </div>
        </div>
      )
    }
    return null
  }
}
