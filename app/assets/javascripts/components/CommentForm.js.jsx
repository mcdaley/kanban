/******************************************************************************
 * assets/javascripts/components/CommentForm.js.jsx
 ******************************************************************************/

//-----------------------------------------------------------------------------
// CommentForm
//-----------------------------------------------------------------------------
var CommentForm = React.createClass({
  
  getInitialState: function() {
    return {  body:             '', 
              errors:           {} }
  },
  
  handleChange: function(event) {
    console.log('[CommentForm]: handleChange()');
    
    var name = event.target.name;
    
    if(name == "body") {
      this.setState( { body: event.target.value } );
    }
  },
  
  postCommentUrl: function() {
    var action  = this.props.commentable_type.toLowerCase() + 's';
    var id      = this.props.commentable_id;
    var url     = '/' + action + '/' + id + '/' + 'comments';
    
    return      url;
  },

  handleSubmit: function(e) {
    console.log('[CommentForm] handleSubmit()');
    
    e.preventDefault();
    
    var url = this.postCommentUrl();
    
    $.ajax({
      type:     "POST",
      url:      url,
      data:     { comment: this.state },
      success:  function(data) { 
        console.log("Post success, data= " + data);
        this.props.handleNewComment( data["comment"]        );
        this.setState(               this.getInitialState() );
        return;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/tasks/comments', status, err.toString() );
        this.setState( { errors: xhr["responseJSON"] } );
      }.bind(this),
      dataType: 'JSON'
    });
  },
  
  commentForm: function() {
    console.log('[CommentForm] render()');
    
    return (
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          
          <form>      
            <div className='form-group'>
              <label>   Add comment form </label>
              <textarea type          = 'text'         
                        className     = 'form-control' 
                        name          = 'body'  
                        placeholder   = 'Enter comment'
                        value         = {this.state.body}
                        onChange      = {this.handleChange} />
            </div>
                                                
            <button type      = "submit" 
                    className = "btn btn-primary" 
                    onClick   = {this.handleSubmit} > Add Comment  </button>
          </form>
                    
        </div>
      </div>
    );
  },
  
  render: function() {
    var commentForm = this.commentForm();
    
    return (
      <div className="col-sm-12 col-md-12 col-lg-12">
      { commentForm }
      </div>
    );
  }
  
});