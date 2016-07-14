

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

var qwertyMap = [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 97, 115, 100, 102, 103, 104, 106, 107, 108, 0, 122, 120, 99, 118, 98, 110, 109];

//sample input:
//This example would bind the 'a' key to the "example.wav" file.
//{
//  65: '/path/to/example'
//}

//For a comprehensive list of keycode bindings, see "keycode.js"
//in this same directory.
var VKey = React.createClass({
  displayName: "VKey",

  getInitialState: function () {
    return { playing: false };
  },

  handleKeyPress: function (event) {
    if ("" + event.keyCode === "" + this.props.targetKey) {
      this.setState({ playing: true });
      document.getElementById(this.props.targetKey).play();
      event.preventDefault();
    }
    this.render();
  },
  componentDidMount: function (event) {
    window.addEventListener('keypress', this.handleKeyPress);
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "key", onKeyPress: this.handleKeyPress },
      React.createElement(
        "p",
        { className: "keyLabel" },
        keyCodes[this.props.targetKey]
      ),
      React.createElement("audio", { id: this.props.targetKey, src: this.props.path })
    );
  }
});

var App = React.createClass({
  displayName: "App",


  render: function () {
    var data = [];

    qwertyMap = qwertyMap.map(function (key) {
      if (key !== 0) {
        return { key: key, path: testData[key] };
      } else {
        return 0;
      }
    });

    return React.createElement(
      "div",
      { className: "keyboard" },
      qwertyMap.map(function (keyBinding, idx) {
        if (keyBinding === 0) {
          return React.createElement("br", null);
        } else {
          return React.createElement(VKey, { targetKey: keyBinding.key, path: keyBinding.path });
        }
      })
    );
  }
});

ReactDOM.render(React.createElement(
  "div",
  null,
  React.createElement(App, null)
), document.getElementById('app'));