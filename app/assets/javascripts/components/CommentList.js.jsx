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
      <div className="col-sm-12 col-md-12 col-lg-12">
        <ul className="list-group  task-list-group">
          {rows}
        </ul>
      </div>
    );
  }
});