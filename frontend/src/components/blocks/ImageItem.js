import React, { Component } from 'react'
import axios from 'axios'

export default class ImageItem extends Component {
  state = {
    image: {},
    isLoaded: false
  }

  componentDidMount() {
    axios
      .get(`/wp-json/wp/v2/media/${this.props.id}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          image: res.data,
          isLoaded: true
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    const { isLoaded, image } = this.state
    return (
      <div>
        {isLoaded && (
          <img
            src={image.media_details.sizes.thumbnail.source_url}
            alt={image.title.rendered}
          />
        )}
      </div>
    )
  }
}
