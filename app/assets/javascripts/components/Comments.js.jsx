/******************************************************************************
 * File: assets/javascripts/components/Comments.js.jsx
 ******************************************************************************/

var Comments = React.createClass({
  
  render: function() {
    return (
      <div className="task-section-div">
        <div className="comments-container-div">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <CommentHeader  title             = { this.props.title } />
            </div>
    
            <div className="col-sm-12 col-md-12 col-lg-12">
              <CommentList    comments          = { this.props.comments } />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="comment-form-div">
                <CommentForm    commentable_type  = { this.props.commentable_type }
                                commentable_id    = { this.props.commentable_id   }
                                handleNewComment  = { this.props.handleNewComment } />
              </div>
            </div>             
          </div>               
        </div>
      </div>
    );
  }
});