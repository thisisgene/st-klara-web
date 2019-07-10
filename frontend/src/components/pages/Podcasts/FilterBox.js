import React, { Component } from 'react'

import cx from 'classnames'
import styles from './FilterBox.module.sass'

export default class FilterBox extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    this.parseCategories(this.props.items)
  }

  parseCategories = items => {
    let catArray = []
    items.map(item => {
      const cat = item.acf.category && item.acf.category
      if (!catArray.includes(cat)) {
        catArray.push(cat)
      }
    })
    this.setState({ categories: catArray })
  }

  render() {
    const { setActiveCategory, activeCategory } = this.props
    const { categories } = this.state
    return (
      <div className={styles['filter-box']}>
        <ul>
          <li
            className={cx({
              [styles['active']]: activeCategory === null
            })}
            onClick={() => setActiveCategory(null)}
          >
            Alle
          </li>
          {categories &&
            categories.map(category => (
              <li
                className={cx({
                  [styles['active']]: activeCategory === category
                })}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </li>
            ))}
        </ul>
      </div>
    )
  }
}
