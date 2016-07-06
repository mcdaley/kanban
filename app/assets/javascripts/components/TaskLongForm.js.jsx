//-----------------------------------------------------------------------------
// app/assets/javascript/components/TaskLongForm.js.jsx
//-----------------------------------------------------------------------------

var TaskLongForm = React.createClass({
  
  getInitialState: function() {
    return { edit: false, errors: {} }
  },
    
  toggleEditMode: function(event) {
    console.log("[TaskLongForm]: toggleEditMode");
    event.preventDefault();
    this.setState( { edit: !this.state.edit } );
    return;
  },
  
  handleCheck: function(event) {
    event.preventDefault();
    console.log("[TaskLongForm.handleCheck] Entered handleCheck()");
  
    var data = {
      complete: !this.props.task.complete
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
  
  handleEdit: function(event) {
    console.log('[TaskLongForm]: handleEdit()');
    event.preventDefault();
    
    var data = {
      title:        ReactDOM.findDOMNode( this.refs.title       ).value,
      description:  ReactDOM.findDOMNode( this.refs.description ).value,
      due_text:     ReactDOM.findDOMNode( this.refs.due         ).value,
    };
    
    // Update the task
    $.ajax({
      method:     "PATCH",
      url:        `/tasks/${this.props.task.id}`,
      dataType:   "JSON",
      data:       { task: data },
      success:    function(data) {
        {this.setState({edit: false })};
        {this.props.handleEditTask( this.props.task, data)};
      }.bind(this),
      error: function(xhr, status, err) {
        //this.handleSubmitError(xhr, status, err);
        console.error('/tasks', status, err.toString() );
        this.setState( { errors: xhr["responseJSON"] } );
      }.bind(this),
    });
    
    return;
  },
  
  hasError: function(name) {
    if(this.state.errors.hasOwnProperty(name) ) {
      return true;
    }
    return false;
  },
  
  handleCancel: function(e) {
    this.setState( this.getInitialState()  );
  },
  
  taskCheckbox: function() {
    var task_checkbox;
    
    if (this.props.task.complete == true) {
      task_checkbox = (
        <i  className = "fa fa-2x fa-check-circle-o complete-checkbox"
            onClick   = {this.handleCheck}
            style     = {{cursor: 'pointer'}} >
        </i>
      );
    }
    else {
      task_checkbox = (
          <i  className = "fa fa-2x fa-circle-o"
              onClick   = {this.handleCheck}
              style     = {{cursor: 'pointer'}} >
          </i>
      );
    }    
    
    return task_checkbox;
  },
  
  /**
   * Display the non-editable version of the task
   */
  taskView: function() {
    console.log('[TaskLongForm]: taskView()');
    
    // Display the checkbox
    var task_checkbox;
    if (this.props.task.complete == true) {
      task_checkbox = (
        <i  className = "fa fa-2x fa-check-circle-o complete-checkbox"
            onClick   = {this.handleCheck}
            style     = {{cursor: 'pointer'}} >
        </i>
      );
    }
    else {
      task_checkbox = (
          <i  className = "fa fa-2x fa-circle-o"
              onClick   = {this.handleCheck}
              style     = {{cursor: 'pointer'}} >
          </i>
      );
    }    
    
    // Create the task description style
    var description;
    if (this.props.task.description) {
      description = (
        <div className="description">
          <p> {this.props.task.description} </p>
        </div>);
    }
    else {
      description = (
        <div className="panel panel-default description blank-description">
          <div className="panel-body">
            Description...
          </div>
        </div>);
    }
    
    // Create the due date style
    var due_date;
    if (this.props.task.due) {
      due_date = (
        <span className="due-date"> 
          <i className="fa fa-lg fa-clock-o"></i>
          <span> { formatDateString(this.props.task.due) } </span>
        </span>
      );
    }
    else {
      due_date = (
        <span className="due-date blank-due-date">
          <i className="fa fa-lg fa-clock-o"></i>
          <span> Due Date </span>
        </span>
      );
    }
                  
    return (    
      <div className="task-section-div">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="task-form-btns form-group">
              <button type      = "button" 
                      className = "btn btn-primary"
                      onClick   = {this.toggleEditMode}> Edit </button>
            </div>
          </div>
        </div>
  
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="task-card-tmp">
              <div className="task-checkbox-tmp">
                {task_checkbox}
              </div>
              <div className="task-fields-tmp">
                <div className={ this.props.task.complete ? "title completed-title" : "title"}>                  
                  <h4> {this.props.task.title} </h4>
                </div>

                <div className="description">
                  {description}
                </div>

                <div className="due">
                  {due_date}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, 
  
  /**
   * Helper function to display the editable version of the Task
   */
  taskForm: function() {
    console.log('[TaskLongForm]: taskForm()');
    
    return (
      <div className="task-section-div">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="task-card-tmp">
              <div className="task-checkbox-tmp">
                <i></i>
              </div>
                
              <div className="task-fields-tmp">
                <form onSubmit={this.handleEdit}>
                  <div className="task-form-btns form-group">
                    <button className   = "btn btn-primary" 
                            type        = "submit" >                Save  </button>

                    <button className   = "btn btn-default" 
                            onClick     = { this.handleCancel } > Cancel </button>
                  </div>

                  <div className={ this.hasError('title') ? 'task-title form-group has-error' : 'task-title form-group'}>
                    <label>   Title </label>
                    <input    type          = 'text'   
                              className     = 'form-control' 
                              name          = 'title'  
                              placeholder   = 'Enter task'
                              defaultValue  = {this.props.task.title} 
                              autoFocus     = 'true'
                              ref           = 'title' />
                    <span className={this.hasError('title') ? 'error-msg' : 'hidden'}> 
                      { this.hasError('title') ? this.state.errors['title'][0] : '' } 
                    </span>                    
                  </div>                              
                    
                  <div className="task-description form-group">
                    <label> Description </label>
                    <textarea className     = 'form-control'
                              name          = 'description'
                              placeholder   = 'Entered detail task description'
                              defaultValue  = {this.props.task.description} 
                              ref           = 'description' />
                    
                  </div>
              
                  <div className="row">        
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <div className={ this.hasError('due_text') ? 'task-due-date form-group has-error' : 'task-due-date form-group'}>
                        <label>     Due </label>
                        <DatePicker name          = 'due_text'
                                    placeholder   = 'mm/dd/yyyy'
                                    defaultValue  = {formatDateString(this.props.task.due)}
                                    ref           = 'due' />
                        <span className={this.hasError('due_text') ? 'error-msg' : 'hidden'}> 
                          { this.hasError('due_text') ? this.state.errors['due_text'][0] : '' } 
                        </span>
                      </div>
                    </div>
                              
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    </div>
                  </div>            
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  
}); // end of TaskLongForm