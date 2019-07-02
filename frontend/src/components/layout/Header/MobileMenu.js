import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import cx from 'classnames'
import styles from './MobileMenu.module.sass'

export class MobileMenu extends Component {
  render() {
    const { menuItems, isOpen, onMobileMenuOpen } = this.props
    return (
      <div
        className={cx(styles['mobile-menu'], {
          [styles['is-open']]: isOpen
        })}
      >
        <div className={styles['mobile-menu--content']}>
          {menuItems.map((item, index) => (
            <div key={index}>
              <div className={styles['mobile-menu--content__item']}>
                <NavLink
                  to={`/seite/${item.link}`}
                  className={styles['item--title']}
                  onClick={onMobileMenuOpen}
                >
                  {item.title}
                </NavLink>
                {item.subMenu && (
                  <div className={styles['sub-menu']}>
                    {item.subMenu.map((subItem, index) => (
                      <NavLink
                        key={index}
                        to={`/seite/${item.link}/${subItem.link}`}
                        className={styles['sub-menu--item']}
                        onClick={onMobileMenuOpen}
                      >
                        <span>{subItem.title}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default MobileMenu
