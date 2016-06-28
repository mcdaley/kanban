/******************************************************************************
 * File: assets/javascripts/components/Comment.js.jsx
 ******************************************************************************/

//-----------------------------------------------------------------------------
// Comment
//-----------------------------------------------------------------------------
var Comment = React.createClass({
  
  render: function() {
    var body        = this.props.comment.body
    var created_at  = this.props.comment.created_at
    
    var initials;
    initials = (
      <svg height="50" width="50">
        <circle cx={20} cy={20} r={16} fill="#5BC0DE" stroke="#DDDDDD" strokeWidth="1" />
        <text textAnchor="middle" x="20" y="25" fill="#FFFFFF">MD</text>
      </svg>
    );

    return(
     <li className="list-group-item">
      <div className="initials">
        { initials }
      </div>
      <span className="comment-div">
        <p>     {body} </p>
        <span className="comment-meta-data">  Created: {created_at } </span>
      </span>
     </li>
    ) 
  }
  
});
