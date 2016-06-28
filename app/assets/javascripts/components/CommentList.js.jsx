/******************************************************************************
 * File: assets/javascripts/components/CommentList.js.jsx
 ******************************************************************************/

//-----------------------------------------------------------------------------
// CommentList
//-----------------------------------------------------------------------------
var CommentList = React.createClass({
  render: function() {
    var rows  = [];
    
    this.props.comments.forEach(function(comment) {
      rows.push( <Comment comment = { comment     } 
                          key     = { comment.id  } /> );
    }.bind(this));
    
    return (
      <ul className="list-group  comment-list-group">
        {rows}
      </ul>
    );
  }
});