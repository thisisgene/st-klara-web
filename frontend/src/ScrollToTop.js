import { Component } from 'react'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const hash = this.props.location.hash
      if (hash === '') {
        window.scrollTo(0, 0)
      } else {
        setTimeout(() => {
          const id = hash.replace('#', '')
          const element = document.getElementById(id)
          if (element) element.scrollIntoView()
        }, 0)
      }
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
