/******************************************************************************
 * File: assets/javascripts/components/Comment.js.jsx
 ******************************************************************************/

//-----------------------------------------------------------------------------
// Comment
//-----------------------------------------------------------------------------
var Comment = React.createClass({
  
  render: function() {
    var body = this.props.comment.body

    return(
     <li className="list-group-item">
       <p> {body} </p>
     </li>
    ) 
  }
  
});
