'esversion: 6';

class Layout extends React.Component {
  render() {
    return React.createElement(
      'div',
      { className: 'keyboard' },
      React.createElement(
        'h1',
        null,
        'Welcome to Soundboard!'
      )
    );
  }
}

ReactDOM.render(React.createElement(
  'div',
  null,
  React.createElement(Layout, null)
), document.getElementById('app'));