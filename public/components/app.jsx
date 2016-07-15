

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

var qwertyMap = [
  113,
  119,
  101,
  114,
  116,
  121,
  117,
  105,
  111,
  112,
  97,
  115,
  100,
  102,
  103,
  104,
  106,
  107,
  108,
  0,
  122,
  120,
  99,
  118,
  98,
  110,
  109
];

//sample input:
//This example would bind the 'a' key to the "example.wav" file.
//{
//  65: '/path/to/example'
//}

//For a comprehensive list of keycode bindings, see "keycode.js"
//in this same directory.
var VKey = React.createClass ({
  // the initial state houses the player, which is set to false.
  getInitialState: function() {
    return {
      playing: false
    }
  },
  // when a key is pressed, change key color, set player to true, and play it.
  handleKeyPress: function(event) {
    if ("" + event.keyCode === "" + this.props.targetKey) {
      $('#' + event.keyCode).parent().removeClass('key');
      $('#' + event.keyCode).parent().addClass('blue');
      this.setState({playing: true})
      document.getElementById(this.props.targetKey).play();
      event.preventDefault();
    }
    this.render();
  },
  handleAudioEnd: function(event) {
    $('#' + this.props.targetKey).parent().removeClass('blue');
    $('#' + this.props.targetKey).parent().addClass('key');
    event.preventDefault();
    this.render();
  },

  componentDidMount: function(event) {
    window.addEventListener('keypress', this.handleKeyPress);
    // window.addEventListener('ended', this.handleKeyUp);
  },

  render: function() {
    return (
      <div className="key" onKeyPress={ this.handleKeyPress }>
      <p className="keyLabel">{keyCodes[this.props.targetKey]}</p>
      <audio id={this.props.targetKey} src={ this.props.path } onEnded={ this.handleAudioEnd }></audio>
      </div>
    )
  }
});
var RebindNode = React.createClass({
  updateServerBinding: function(event) {
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
  render: function() {
    return (
      <div onClick = {this.updateServerBinding}>
        <p>Click here to bind: {this.props.targetSong}</p>
      </div>
    )
  }
});
var App = React.createClass({
  getInitialState: function() {
    return {
      bindings: [],
      soundList: [],
      changeKey: "-test-"
    }
  },
  componentDidMount: function() {
    this.serverRequest = $.get("http://localhost:8000/sounds", function (result) {
      this.setState({
        soundList: result,
      });
    }.bind(this));

    brokenLogic = qwertyMap.map(function(key) {//TAKE THIS OUT AFTER REFACTOR;
      return key !== 0 ? {key: key, path: testData[key]} : 0;
    });//TAKE THIS OUT AFTER REFACTOR;

    this.setState({
      bindings: qwertyMap.map(function(key) {
        return key !== 0 ? {key: key, path: testData[key]} : 0;
      })
    })
    window.addEventListener('keypress', this.setKeyChange);
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();//not sure what this is for but online said to put it in.
  },
  setKeyChange:function(event) {
    if (event.altKey) {
      var key = event.code.toLowerCase()[3];
      var keyNumber = key.charCodeAt(0);
      if (keyNumber < 123 && keyNumber > 96) {
        this.setState({changeKey: key})
        brokenTargetKey = key;//TAKE THIS OUT AFTER REFACTOR!
      }
    }
  },
  reRender: function() {
    ReactDOM.render(<div>
      <App/>
      </div>, document.getElementById('app')
    );
  },
  render: function() {
    return (//Tim heavily modified this return statement. Prepare to merge!
      <div id = 'appWindow'>
        <div id = "bindingWindow">
        <h1>Click on a sound that you would like to change the binding of {this.state.changeKey} to</h1>
        <input type="button" value="CLick me when done" onClick={this.reRender}/>
        <ul>
        {
          this.state.soundList.map(function (sound) {
            return <RebindNode targetSong = {sound}/>;
          })
        }
        </ul>
        </div>
        <div className="keyboard">
        {
          brokenLogic.map(function(keyBinding, idx) {
            if (keyBinding === 0) {
              return <br/>
            } else {
              return <VKey targetKey={keyBinding.key} path={keyBinding.path}/>
            }
          })
        }
        </div>
      </div>
    )
  }
})

var brokenTargetKey = "";
var brokenLogic = [];

ReactDOM.render(<div>
  <App/>
  </div>, document.getElementById('app')
);
