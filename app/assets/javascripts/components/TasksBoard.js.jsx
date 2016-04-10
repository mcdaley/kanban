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
  
  addTask: function(task) {
    console.log('[TaskBoard] addTask()');
    var tasks  = _.map(    this.state.tasks, _.clone       );
    tasks.push(task);
    this.setState( { tasks: tasks } );
  },
  
  updateTask: function(task, data) {
    console.log('[TasksBoard]: handleEditRecord');
    
    var index         = this.state.tasks.indexOf(task);
    var updated_task  = _.merge(  task,             data["task"]  );
    var tasks         = _.map(    this.state.tasks, _.clone       );
    tasks[index]      = updated_task
    
    this.replaceState({tasks: tasks});
  },
  
  render: function() {
    var title = this.props.title || "Hello World";
    
    return ( 
      <div className="tasks-board">
        <div className="row">
          <div className="col-sm-12.col-md-12.col-lg-12">
            <TasksHeader  title           = {title            } />
      
            <TasksList    tasks           = {this.state.tasks } 
                          handleEditTask  = {this.updateTask  } />
            
            <TaskForm     handleNewTask   = {this.addTask     } />
          </div>
        </div>
      </div>
    );
  }

});

//-----------------------------------------------------------------------------
// TaskBoardHeader
//-----------------------------------------------------------------------------
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

//-----------------------------------------------------------------------------
// TaskList
//-----------------------------------------------------------------------------
var TasksList = React.createClass({
  
  render: function() {
    var rows = [];
    this.props.tasks.forEach(function(task) {
      rows.push( <Task  task            = {task} 
                        key             = {task.id}
                        handleEditTask  = {this.props.handleEditTask} /> );
    }.bind(this));
    
    return (
      <div className="col-sm-8 col-md-8 col-lg-8">
        <ul className="list-group  task-list-group">
          {rows}
        </ul>
      </div>
    );
  }
});

//-----------------------------------------------------------------------------
// Task
//-----------------------------------------------------------------------------
var Task = React.createClass({
  
  getInitialState: function() {
    return { edit: false };
  },
  
  /**
   * Display background when hovering over a task
   */
  componentDidMount: function() {
    $(ReactDOM.findDOMNode(this)).hover(
      function() {
        $(this).addClass("hover-bkgrd");
      },
      function() {
        $(this).removeClass("hover-bkgrd");
      }
    );
  },
  
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
        {this.props.handleEditTask( this.props.task, data)};
      }.bind(this)
    });
  },
  
  handleToggle: function(e) {
    console.log('[Task] handleToggle');
    e.preventDefault();
    this.setState( { edit: !this.state.edit } );
  },
  
  handleEdit: function(e) {
    console.log('[Task] handleEdit');
    e.preventDefault();
    
    var data = {
      title:        ReactDOM.findDOMNode( this.refs.title       ).value,
      description:  ReactDOM.findDOMNode( this.refs.description ).value,
      due_text:     ReactDOM.findDOMNode( this.refs.due         ).value,
    };
    
    $.ajax({
      method:     "PATCH",
      url:        `/tasks/${this.props.task.id}`,
      dataType:   "JSON",
      data:       { task: data },
      success:    function(data) {
        {this.setState({edit: false })};
        {this.props.handleEditTask( this.props.task, data)};
      }.bind(this)
    });
    
    return;
  },
  
  taskForm: function() {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            
            <form onSubmit={this.handleEdit}>
      
              <div className='form-group'>
                <label>   Title </label>
                <input    type          = 'text'   
                          className     = 'form-control' 
                          name          = 'title'  
                          defaultValue  = {this.props.task.title} 
                          autoFocus     = 'true'
                          ref           = 'title' />
              </div>
          
              <div className='form-group'>
                <label>   Description </label>
                <textarea type          = 'text'         
                          className     = 'form-control' 
                          name          = 'description'  
                          defaultValue  = {this.props.task.description} 
                          ref           = 'description' />
              </div>
                        
              <div className='form-group'>
                <label>   Due </label>
                <input    type          = 'text'   
                          className     = 'form-control' 
                          name          = 'due'    
                          defaultValue  = {formatDateString(this.props.task.due)}
                          ref           = 'due' />
              </div>
                    
              <button className="btn btn-primary" type="submit" >              Update </button>
              <button className="btn btn-default" onClick={this.handleToggle}> Cancel </button>
            </form>
                      
          </div>
        </div>
      </li>
    );
  },
  
  taskView: function() {
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
          
                <div className="action-icons">
                  <a href="#" className="btn btn-default" onClick={this.handleToggle}>Edit</a> 
                </div>
                  
              </div>  
            </div> {/* end of task-card */}
          </div>
        </div>
      </li>
    );
  },
  
  render: function() {
    var task_view;
    
    if(this.state.edit) {
      task_view = this.taskForm();
    }
    else {
      task_view = this.taskView();
    }
              
    return task_view;
  }
});

//-----------------------------------------------------------------------------
// TODO: 04/09/2016
// - CREATE A TASK WRAPPER CLASS TO HOLD THE TaskForm OBJECT, AND THAT WAY
//   I SHOULD BE ABLE TO REFACTOR THE TASKFORM IN THE Task OBJECT, SO THAT
//   I CAN KEEP IT DRY.
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// TaskForm
//-----------------------------------------------------------------------------
var TaskForm = React.createClass({
  
  getInitialState: function() {
    return { title: '', description: '', due_text: ''}
  },
  
  handleChange: function(event) {
    var name = event.target.name;
    
    if(name == "title") {
      this.setState( { title:       event.target.value } );
    }
    else if(name == "description") {
      this.setState( { description: event.target.value } );
    }
    else {  // name = due_text
      this.setState( { due_text:    event.target.value } );
    }
  },
  
  handleSubmit: function(e) {
    console.log('[TaskForm] handleSubmit()');
    
    e.preventDefault();
    $.ajax({
      type:     "POST",
      url:      "/tasks/",
      data:     { task: this.state },
      success:  function(data) { 
        console.log("post success, data= " + data);
        this.props.handleNewTask( data["task"]            );
        this.setState(            this.getInitialState()  );
      }.bind(this),
      dataType: 'JSON'
    });
  },
  
  handleClear: function(e) {
    this.setState( this.getInitialState()  );
  },
  
  //---------------------------------------------------------------------------
  // TODO: 04/09/2016
  // - NEED TO FIGURE OUT HOW THE valid FUNCTION WORKS!
  //---------------------------------------------------------------------------
  valid: function() {
    console.log('[TaskForm] validate()');
    this.state.title;
  },
  
  taskForm: function() {
    console.log('[TaskForm] render()');
    
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            
            <form onSubmit={this.handleSubmit}>
      
              <div className='form-group'>
                <label>   Title </label>
                <input    type          = 'text'   
                          className     = 'form-control' 
                          name          = 'title'  
                          placeholder   = 'Enter task'
                          value         = {this.state.title}
                          onChange      = {this.handleChange} />
              </div>
          
              <div className='form-group'>
                <label>   Description </label>
                <textarea type          = 'text'         
                          className     = 'form-control' 
                          name          = 'description'  
                          placeholder   = 'Enter task description'
                          value         = {this.state.description}
                          onChange      = {this.handleChange} />
              </div>
                        
              <div className='form-group'>
                <label>   Due </label>
                <input    type          = 'text'   
                          className     = 'form-control' 
                          name          = 'due_text'    
                          placeholder   = "Enter due date"
                          value         = { this.state.due_text }
                          onChange      = { this.handleChange   } />
              </div>
                    
              <button className="btn btn-primary" type="submit" >              Submit </button>
              <button className="btn btn-default" onClick={this.handleClear}>  Clear  </button>
            </form>
                      
          </div>
        </div>
      </li>
    );
  },
  
  render: function() {
    taskForm = this.taskForm();
    
    return(
      <div className="col-sm-4 col-md-4 col-lg-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4> Add Task </h4>
          </div>
          <div className="panel-body">
            {taskForm}
          </div>
        </div>
      </div>
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