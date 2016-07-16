"use strict";

//input syntax:  {
//  targetKeyCode1: "/path/to/source/file.wav",
//  targetKeyCode2: "/path/to/next/source.wav"
//  ...
//}

var testData = {
  97: "/soundfiles/beads.wav",
  98: "/soundfiles/beltbuckle.wav",
  99: "/soundfiles/footsteps.wav",
  100: "/soundfiles/grendel.wav",
  101: "/soundfiles/beads.wav",
  102: "/soundfiles/beltbuckle.wav",
  103: "/soundfiles/footsteps.wav",
  104: "/soundfiles/grendel.wav",
  105: "/soundfiles/beads.wav",
  106: "/soundfiles/beltbuckle.wav",
  107: "/soundfiles/footsteps.wav",
  108: "/soundfiles/grendel.wav",
  109: "/soundfiles/beads.wav",
  110: "/soundfiles/beltbuckle.wav",
  111: "/soundfiles/footsteps.wav",
  112: "/soundfiles/grendel.wav",
  113: "/soundfiles/beltbuckle.wav",
  114: "/soundfiles/footsteps.wav",
  115: "/soundfiles/grendel.wav",
  116: "/soundfiles/beads.wav",
  117: "/soundfiles/beltbuckle.wav",
  118: "/soundfiles/footsteps.wav",
  119: "/soundfiles/grendel.wav",
  120: "/soundfiles/beads.wav",
  121: "/soundfiles/beltbuckle.wav",
  122: "/soundfiles/footsteps.wav"
};

var qwertyMap = [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 0, 97, 115, 100, 102, 103, 104, 106, 107, 108, 0, 122, 120, 99, 118, 98, 110, 109];

//sample input:
//This example would bind the 'a' key to the "example.wav" file.
//{
//  65: '/path/to/example'
//}

//For a comprehensive list of keycode bindings, see "keycode.js"
//in this same directory.
var VKey = React.createClass({
  displayName: "VKey",

  // the initial state houses the player, which is set to false.
  getInitialState: function getInitialState() {
    return {
      playing: false
    };
  },
  // when a key is pressed, change key color, set player to true, and play it.
  handleKeyPress: function handleKeyPress(event) {
    if ("" + event.keyCode === "" + this.props.targetKey) {
      $('#' + event.keyCode).parent().removeClass('key');
      $('#' + event.keyCode).parent().addClass('blue');
      this.setState({ playing: true });
      document.getElementById(this.props.targetKey).play();
      event.preventDefault();
    }
    this.render();
  },
  handleAudioEnd: function handleAudioEnd(event) {
    $('#' + this.props.targetKey).parent().removeClass('blue');
    $('#' + this.props.targetKey).parent().addClass('key');
    event.preventDefault();
    this.render();
  },

  componentDidMount: function componentDidMount(event) {
    window.addEventListener('keypress', this.handleKeyPress);
    // window.addEventListener('ended', this.handleKeyUp);
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "key", onKeyPress: this.handleKeyPress },
      React.createElement(
        "p",
        { className: "keyLabel" },
        keyCodes[this.props.targetKey]
      ),
      React.createElement("audio", { id: this.props.targetKey, src: this.props.path, onEnded: this.handleAudioEnd })
    );
  }
});
var RebindNode = React.createClass({
  displayName: "RebindNode",

  updateServerBinding: function updateServerBinding(event) {
    var code = brokenTargetKey.charCodeAt(0);
    console.log("So you're trying to change", brokenTargetKey, " to ", this.props.targetSong, "?");
    console.log("Key ", brokenTargetKey, "will become ", code);
    console.log("Current brokenLogic is ", brokenLogic);
    var song = "/soundfiles/" + this.props.targetSong;
    brokenLogic.forEach(function (ele, idx) {
      if (ele.key === code) {
        brokenLogic[idx].path = song;
      }
    });
  },
  render: function render() {
    return React.createElement(
      "div",
      { onClick: this.updateServerBinding },
      React.createElement(
        "p",
        null,
        "Click here to bind: ",
        this.props.targetSong
      )
    );
  }
});
var App = React.createClass({
  displayName: "App",

  getInitialState: function getInitialState() {
    return {
      bindings: [],
      soundList: [],
      changeKey: "-test-"
    };
  },
  componentDidMount: function componentDidMount() {
    this.serverRequest = $.get("http://localhost:8000/sounds", function (result) {
      this.setState({
        soundList: result
      });
    }.bind(this));

    brokenLogic = qwertyMap.map(function (key) {
      //TAKE THIS OUT AFTER REFACTOR;
      return key !== 0 ? { key: key, path: testData[key] } : 0;
    }); //TAKE THIS OUT AFTER REFACTOR;

    this.setState({
      bindings: qwertyMap.map(function (key) {
        return key !== 0 ? { key: key, path: testData[key] } : 0;
      })
    });
    window.addEventListener('keypress', this.setKeyChange);
  },
  componentWillUnmount: function componentWillUnmount() {
    this.serverRequest.abort(); //not sure what this is for but online said to put it in.
  },
  setKeyChange: function setKeyChange(event) {
    if (event.altKey) {
      var key = event.code.toLowerCase()[3];
      var keyNumber = key.charCodeAt(0);
      if (keyNumber < 123 && keyNumber > 96) {
        this.setState({ changeKey: key });
        brokenTargetKey = key; //TAKE THIS OUT AFTER REFACTOR!
      }
    }
  },
  reRender: function reRender() {
    ReactDOM.render(React.createElement(
      "div",
      null,
      React.createElement(App, null)
    ), document.getElementById('app'));
  },
  render: function render() {
    return (//Tim heavily modified this return statement. Prepare to merge!
      React.createElement(
        "div",
        { id: "appWindow" },
        React.createElement(
          "div",
          { id: "bindingWindow" },
          React.createElement(
            "h1",
            null,
            "Click on a sound that you would like to change the binding of ",
            this.state.changeKey,
            " to"
          ),
          React.createElement(
            "ul",
            null,
            this.state.soundList.map(function (sound, idx) {
              return React.createElement(RebindNode, { key: idx, targetSong: sound });
            })
          ),
          React.createElement("input", { type: "button", value: "CLick me when done", onClick: this.reRender })
        ),
        React.createElement(
          "div",
          { className: "keyboard" },
          brokenLogic.map(function (keyBinding, idx) {
            if (keyBinding === 0) {
              return React.createElement("br", { key: idx });
            } else {
              return React.createElement(VKey, { key: idx, targetKey: keyBinding.key, path: keyBinding.path });
            }
          })
        )
      )
    );
  }
});

var brokenTargetKey = "";
var brokenLogic = [];

ReactDOM.render(React.createElement(
  "div",
  null,
  React.createElement(App, null)
), document.getElementById('app'));