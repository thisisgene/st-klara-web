import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Posts from '../../blocks/Posts/Posts'

import cx from 'classnames'
import styles from './Home.module.sass'

export default class Home extends Component {
  render() {
    return (
      <div className={styles['home']}>
        <div className={styles['home--wrapper']}>
          <Posts category={'events'} categoryTitle="Veranstaltungen" />
          <div className={cx(styles['main-link'], styles['grey'])}>
            <Link to={'/seite/veranstaltungen'}>Alle Veranstaltungen</Link>
          </div>
        </div>
        <div className={styles['home--wrapper']}>
          <Posts category={'podcasts'} categoryTitle="Podcasts" />
          <div className={styles['main-link']}>
            <Link to={'/seite/podcasts'}>Alle Podcasts</Link>
          </div>
        </div>
      </div>
    )
  }
}
