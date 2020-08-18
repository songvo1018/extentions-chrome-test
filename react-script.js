'use strict';

let rootElement = document.createElement('div')

let react = document.createElement("script")
react.setAttribute("src", "https://unpkg.com/react@16/umd/react.development.js")
let reactDom = document.createElement("script")
reactDom.setAttribute("src", "https://unpkg.com/react-dom@16/umd/react-dom.development.js")


// const e = React.createElement;

class message extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  render() {
    return (
      <span> Message for user </span>
    )
  }
}

const domContainer = document.querySelector('#rootElement');
ReactDOM.render(message, domContainer);
