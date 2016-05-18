/******************************************************************************
 * File: assets/javascripts/components/TaskShow.js.jsx
 ******************************************************************************/

var TaskShow = React.createClass({
  getInitialState: function() {
    return { task: {} };
  },
  
  componentWillMount: function() {
    this.setState( { task: this.props.data } );
  },
  
  updateTask: function(task, data) {
    console.log('[TaskShow] updateTask()');
    
    this.setState( { task: data["task"] } );
    
    return;
  },

  render: function() {
    var title = this.props.title || "Hello World";
    
    return (
      <div className="task-show">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <TaskHeader   title = "Task Long Form" />
          </div>
        </div>
      
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <TaskLongForm   task            = { this.state.task     }
                            key             = { this.state.task.id  }
                            handleEditTask  = { this.updateTask     } />
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