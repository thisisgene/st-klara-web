import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Posts from '../../blocks/Posts/Posts';
import cx from 'classnames';
import styles from './Home.module.sass';

export default class Home extends Component {
  render() {
    return (
      <div className={styles['home']}>
        <div className={styles['home--wrapper']}>
          <Posts
            category={'events'}
            categoryTitle="Veranstaltungen"
            onlyAfterToday={true}
            limitTo={4}
          />

          <div
            className={cx(
              styles['main-link'],
              styles['grey'],
              styles['bottom-space']
            )}
          >
            <Link to={'/seite/veranstaltungen'}>Alle Veranstaltungen</Link>
          </div>
          <Posts category={'videos'} categoryTitle="Videos" limitTo={2} />
          <div className={styles['main-link']}>
            <Link to={'/seite/videos'}>Alle Videos</Link>
          </div>
        </div>
        <div className={styles['home--wrapper']}>
          <Posts category={'podcasts'} categoryTitle="Podcasts" limitTo={4} />
          <div className={styles['main-link']}>
            <Link to={'/seite/podcasts'}>Alle Podcasts</Link>
          </div>
        </div>
      </div>
    );
  }
}
