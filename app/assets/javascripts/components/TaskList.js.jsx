/******************************************************************************
 * File: assets/javascripts/components/TaskList.js.jsx
 ******************************************************************************/

//-----------------------------------------------------------------------------
// TaskList
//-----------------------------------------------------------------------------
var TaskList = React.createClass({
  
  render: function() {
    var rows = [];
    this.props.tasks.forEach(function(task) {
      rows.push( <Task  task              = { task                        } 
                        key               = { task.id                     }
                        handleCheckTask   = { this.props.handleCheckTask  }
                        handleEditTask    = { this.props.handleEditTask   }
                        handleDeleteTask  = { this.props.handleDeleteTask } /> );
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

