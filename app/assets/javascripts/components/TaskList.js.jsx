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
        {this.props.handleCheckTask( this.props.task, data)};
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
  
  handleDelete: function(e) {
    console.log('[Task] handleDelete()');
    e.preventDefault();
    
    $.ajax({
      method:     "DELETE",
      url:        `/tasks/${this.props.task.id}`,
      dataType:   'JSON',
      success:    function() { 
        { this.props.handleDeleteTask(this.props.task) };
      }.bind(this)
    });
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
                <label>     Due </label>
                <DatePicker name          = 'due_text'
                            placeholder   = 'mm/dd/yyyy'
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
      <li className={ checked ? "list-group-item completed-task-li" : "list-group-item"}>
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
                  <a  href      = "#" 
                      className = "btn btn-default" 
                      onClick   = { this.handleToggle }> Edit   </a>
                  <a  href      = "#" 
                      className = "btn btn-default" 
                      onClick   = { this.handleDelete }> Delete </a> 
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
// TaskForm
//-----------------------------------------------------------------------------
var TaskForm = React.createClass({
  
  getInitialState: function() {
    return { title: '', description: '', due_text: '', errors: {} }
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
      error: function(xhr, status, err) {
        //this.handleSubmitError(xhr, status, err);
        console.error('/tasks', status, err.toString() );
        this.setState( { errors: xhr["responseJSON"] } );
      }.bind(this),
      dataType: 'JSON'
    });
  },
  
  handleSubmitError: function(xhr, status, err) {
    console.error('/tasks', status, err.toString() );
    this.setState( { errors: xhr["responseJSON"] } );
    return;
  },
  
  hasError: function(name) {
    if(this.state.errors.hasOwnProperty(name) ) {
      return true;
    }
    return false;
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
    
    {/*
      TODO: 04/09/2016
      -  TO ADD SIMPLE ERROR HANDLING, I CAN ADD THE 'has-error' CLASS TO THE 
         FORM-GROUP AND I CAN REPLACE THE PLACEHOLDER WITH THE ERROR MESSAGE.
         OTHERWISE, I COULD ADD A SPAN TO THE BOTTOM THE FORM-CONTROL THAT IS
         ONLY DISPLAYED WHEN THERE IS AN ERROR.
    */}
    return (
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          
          <form>
            <div className={ this.hasError('title') ? 'form-group has-error' : 'form-group'}>
              <label>   Title* </label>
              <input    type          = 'text'   
                        className     = 'form-control' 
                        name          = 'title'  
                        placeholder   = 'Enter task'
                        value         = {this.state.title}
                        onChange      = {this.handleChange} />

              <span className={this.hasError('title') ? 'error-msg' : 'hidden'}> 
                { this.hasError('title') ? this.state.errors['title'][0] : '' } 
              </span>
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
              <div className={ this.hasError('due_text') ? 'form-group has-error' : 'form-group'}>
                <label>     Due </label>
                <DatePicker name          = 'due_text'
                            placeholder   = 'mm/dd/yyyy'
                            value         = { this.state.due_text }
                            handleChange  = { this.handleChange   } />
                <span className={this.hasError('due_text') ? 'error-msg' : 'hidden'}> 
                  { this.hasError('due_text') ? this.state.errors['due_text'][0] : '' } 
                </span>
              </div>
            </div>
                        
            <button type      = "submit" 
                    className = "btn btn-primary" 
                    onClick   = {this.handleSubmit} > Submit  </button>
            
            <button className = "btn btn-default"
                    onClick   = {this.handleClear}  >  Clear  </button>
          </form>
                    
        </div>
      </div>
    );
  },
  
  render: function() {
    taskForm = this.taskForm();
    
    return(
      <div className="col-sm-12 col-md-12 col-lg-12">
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