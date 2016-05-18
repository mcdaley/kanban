/******************************************************************************
 * File: assets/javascripts/components/TaskShow.js.jsx
 ******************************************************************************/

var TaskShow = React.createClass({
  getInitialState: function() {
    return { task: {}, comments: [] };
  },
  
  componentWillMount: function() {
    this.setState( { task:      this.props.data,
                     comments:  this.props.comments } );
  },
  
  updateTask: function(task, data) {
    console.log('[TaskShow]: updateTask()');
    
    this.setState( { task: data["task"] } );
    
    return;
  },
  
  addComment: function(comment) {
    console.log('[TaskShow]: addComment()');
    var comments  = _.map( this.state.comments, _.clone );
    comments.push(comment);
    this.setState( { comments: comments } );
  },

  render: function() {
    var title = this.props.title || "Hello World";
    
    return (
      <div className="task-show">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <TaskHeader     title             = "Task Long Form" />
          </div>
        </div>
      
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <TaskLongForm   task              = { this.state.task     }
                            key               = { this.state.task.id  }
                            handleEditTask    = { this.updateTask     } />
          </div>
        </div>
                            
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <CommentHeader  title             = "Comments" />
            
            <CommentList    comments          = { this.state.comments } />
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12">
            <CommentForm    commentable_type  = 'Task' 
                            commentable_id    = { this.state.task.id  }
                            handleNewComment  = { this.addComment     } />
          </div>
                            
        </div>
                            
{/**
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <TaskHeader   title = { title } />
          </div>
        </div>
      
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <Task task            = { this.state.task     }
                  key             = { this.state.task.id  }
                  handleCheckTask = { this.updateTask     }
                  handleEditTask  = { this.updateTask     } />
          </div>
        </div>
**/}
      </div>
    );
  }
  
});  // end of TaskShow