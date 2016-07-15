//debrecated. Functionality has been moved into app.jsx. I'm keeping this
// file here for legacy coders who want to diversify their assets.

var rebindKey = react.createClass({
  getInitialState: function() {
    return {
      bindings: this.props.bindings || null,//just in case
      soundList: []
    };
  },
  componentDidMount: function() {
    this.serverRequest = $.get("http://localhost:8000/sounds", function (result) {
     this.setState({
       soundList: result.soundList
     });
   }.bind(this));
 },
  componentWillUnmount: function() {
   this.serverRequest.abort();//not sure what this is for but online said to put it in.
 },
 handleSoundClick: function(event) {
   console.log(event);

 },
 render: function() {

   return (
     <div id = "bindingWindow">
      <h1>Click on a sound that you would like to change the binding to</h1>
        <ul>
          {
            this.state.soundList.map(function (sound) {
              return <li onClick={this.handleSoundClick}><h4>sound</h4></li>;
            })
          }
      </ul>
     </div>
   );
 }
});
