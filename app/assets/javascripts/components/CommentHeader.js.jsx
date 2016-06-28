//-----------------------------------------------------------------------------
// assets/javascripts/components/comment_header.js.jsx
//-----------------------------------------------------------------------------
var CommentHeader = React.createClass({
  
  render: function() {
    var label = this.props.title;
    
    return (
      <div className = "row">
        <div className="col-sm-12 col-md-12 col-lg-12 comment-title">
          <h4> {label} </h4>
        </div>
      </div>
    );
  }
});
