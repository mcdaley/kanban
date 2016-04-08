/******************************************************************************
 * File: assets/javascripts/components/TasksBoard.js.jsx
 ******************************************************************************/

var TasksBoard = React.createClass({

  getInitialState: function() {
    return { tasks: [] };
  },
  
  componentWillMount: function() {
    this.setState( { tasks: this.props.data } );
  },
  
  /////////////////////////////////////////////////////////////////////////////
  // TODO: 04/06/2016
  // - NEED TO REPLACE THE React.addons WITH LODASH, SO I CAN MERGE UPDATED
  //   TASK FIELDS IN A NEW TASK AND THEN REPLACE THE RECORD IN THE STATE
  /////////////////////////////////////////////////////////////////////////////
  handleCheck: function(task, data) {
    console.log('[TasksBoard]: handleToggle');
    var index         = this.state.tasks.indexOf(task);
    var updated_task  = React.addons.update( task, { $merge: data["task"] } );
    var tasks         = React.addons.update(this.state.tasks, { $splice: [[index, 1, updated_task]] }) 
    this.replaceState({tasks: tasks});
  },
  
  render: function() {
    var title = this.props.title || "Hello World";
    
    return ( 
      <div className="tasks-board">
        <div className="row">
          <div className="col-sm-12.col-md-12.col-lg-12">
            <TasksHeader  title       = {title}             />
            <TasksList    tasks       = {this.state.tasks} 
                          handleCheck = {this.handleCheck}  />
          </div>
        </div>
      </div>
    );
  }

});

var TasksHeader = React.createClass({
  
  render: function() {
    var label = this.props.title;
    
    return (
      <div className = "row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <h1> {label} </h1>
        </div>
      </div>
    );
  }
  
});

var TasksList = React.createClass({
  
  render: function() {
    var rows = [];
    this.props.tasks.forEach(function(task) {
      rows.push( <Task  task        = {task} 
                        key         = {task.id}
                        handleCheck = {this.props.handleCheck} /> );
    }.bind(this));
    
    return (
      <div className="row">
        <div className="col-sm-8 col-md-8 col-lg-8">
          <ul className="list-group  task-list-group">
            {rows}
          </ul>
        </div>
      </div>
    );
  }
});

var Task = React.createClass({
  
  handleCheck: function(e) {
    e.preventDefault();
    console.log("[Task.handleCheck] Entered handleCheck()");
  
    var data = {
      complete: e.target.checked
    }
  
    $.ajax({
      method:     "PATCH",
      url:        `/tasks/${this.props.task.id}`,
      dataType:   "JSON",
      data:       { task: data },
      success:    function(data) {
        {this.props.handleCheck( this.props.task, data)};
      }.bind(this)
    });
  },
  
  render: function() {      
    var title       = this.props.task.title;
    var task_path   = `/tasks/${this.props.task.id}`;
    var description = this.props.task.description || "";
    var due_date    = "Due: " + formatDateString(this.props.task.due);
    var complete    = this.props.task.complete == true ? "1" : "0";
    var checked     = this.props.task.complete == true ? true : false;
    
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="task-card">
              <div className="task-checkbox">
                <input  className = "checkbox"  
                        type      = "checkbox" 
                        value     = {complete}      
                        checked   = {checked} 
                        onChange  = {this.handleCheck} />
              </div>                              
              
              <div className="task-fields">
                <div className="title">                  
                  <h4> 
                    <a href={task_path}> {title} </a>
                  </h4>
                </div>
    
                <div className="description">
                  <p> {description} </p>
                </div>

                <div className="due">
                  <p> {due_date} </p>
                </div>
              </div>  
            </div> {/* end of task-card */}
          </div>
        </div>
      </li>
    );
  }
});


//-----------------------------------------------------------------------------
// main()
//-----------------------------------------------------------------------------
/******************************************************************************
//
// 04/07/2016 - DO NOT NEED SINCE I AM CREATING THE COMPONENT WITH THE
// react_component HELPER
//
$(function() {
  ReactDOM.render(
    <TaskBoard tasks={$('#tasks-board').data('tasks')} />, document.getElementById('tasks-board')
  );
});
*******************************************************************************/