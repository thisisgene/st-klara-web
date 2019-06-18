import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { menuItems } from './menu-items'

import MobileMenu from './MobileMenu'

import Logo from '../../common/assets/logo.png'
import LogoWide from '../../common/assets/logo_wide.png'
import cx from 'classnames'
import styles from './Header.module.sass'

export class Header extends Component {
  state = {
    mobileMenuOpen: false,
    showLogoWide: false
  }
  componentDidMount() {
    window.addEventListener('scroll', this.listenScrollEvent)
  }
  listenScrollEvent = e => {
    if (window.scrollY > 70) {
      this.setState({
        showLogoWide: true
      })
    } else {
      this.setState({
        showLogoWide: false
      })
    }
  }

  onMobileMenuOpen = () => {
    this.setState({
      mobileMenuOpen: !this.state.mobileMenuOpen
    })
  }

  render() {
    return (
      <div
        className={cx(styles['header-container'], {
          [styles['small']]: this.state.showLogoWide
        })}
      >
        <div className={styles['header']}>
          <div className={styles['header--side']}>
            <NavLink activeClassName={styles['active']} to="/seite/impressum">
              Impressum / Datenschutz
            </NavLink>
            <NavLink activeClassName={styles['active']} to="/seite/links">
              Links
            </NavLink>
          </div>
          <NavLink activeClassName={styles['active']} to="/">
            <div
              className={cx(styles['header--logo'], {
                [styles['visible']]: !this.state.showLogoWide
              })}
            >
              <img src={Logo} alt="Sankt Klara" />
            </div>
            <div
              className={cx(styles['header--logo-wide'], {
                [styles['visible']]: this.state.showLogoWide
              })}
            >
              <img src={LogoWide} alt="Sankt Klara" />
            </div>
          </NavLink>
          <div
            className={cx(styles['nav-burger'], {
              [styles['is-open']]: this.state.mobileMenuOpen
            })}
            onClick={this.onMobileMenuOpen}
          >
            <span />
          </div>

          <div className={styles['header--menu']}>
            {menuItems &&
              menuItems.map((item, index) => (
                <div key={index}>
                  <div className={styles['header--menu__item']}>
                    <NavLink
                      activeClassName={styles['active']}
                      to={`/seite/${item.link}`}
                      className={styles['item--title']}
                    >
                      {item.title}
                    </NavLink>
                    {item.subMenu && (
                      <div className={styles['sub-menu']}>
                        {item.subMenu.map((subItem, index) => (
                          <NavLink
                            activeClassName={styles['active']}
                            key={index}
                            to={`/seite/${item.link}/${subItem.link}`}
                            className={styles['sub-menu--item']}
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
        <MobileMenu menuItems={menuItems} isOpen={this.state.mobileMenuOpen} />
      </div>
    )
  }
}

export default Header
