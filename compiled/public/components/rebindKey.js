"use strict";

//debrecated. Functionality has been moved into app.jsx. I'm keeping this
// file here for legacy coders who want to diversify their assets.

var rebindKey = react.createClass({
  getInitialState: function getInitialState() {
    return {
      bindings: this.props.bindings || null, //just in case
      soundList: []
    };
  },
  componentDidMount: function componentDidMount() {
    this.serverRequest = $.get("http://localhost:8000/sounds", function (result) {
      this.setState({
        soundList: result.soundList
      });
    }.bind(this));
  },
  componentWillUnmount: function componentWillUnmount() {
    this.serverRequest.abort(); //not sure what this is for but online said to put it in.
  },
  handleSoundClick: function handleSoundClick(event) {
    console.log(event);
  },
  render: function render() {

    return React.createElement(
      "div",
      { id: "bindingWindow" },
      React.createElement(
        "h1",
        null,
        "Click on a sound that you would like to change the binding to"
      ),
      React.createElement(
        "ul",
        null,
        this.state.soundList.map(function (sound) {
          return React.createElement(
            "li",
            { onClick: this.handleSoundClick },
            React.createElement(
              "h4",
              null,
              "sound"
            )
          );
        })
      )
    );
  }
});