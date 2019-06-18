import React, { Component } from 'react'

import spinner from './spinner.gif'

import styles from './Spinner.module.sass'

export default class Spinner extends Component {
  render() {
    return (
      <div className={styles['spinner']}>
        <img src={spinner} alt="Laden" />
      </div>
    )
  }
}
