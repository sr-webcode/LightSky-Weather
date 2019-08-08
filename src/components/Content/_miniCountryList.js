import React, { Component } from 'react'

export class _miniCountryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentList: [...props.orgList]
    }
  }
  render() {
    // console.log(this.state.currentList)
    return (
      <ul className="miniCountryList">
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, perspiciatis.</li>
        <li>Obcaecati, odit voluptatibus vitae facilis ea laboriosam consequuntur temporibus magnam?</li>
        <li>Nulla ducimus sequi eius eligendi cum laborum maxime fugit eveniet.</li>
        <li>Et illum quibusdam enim. Dolores suscipit sit molestiae veniam ipsum!</li>
      </ul>
    )
  }
}

export default _miniCountryList
