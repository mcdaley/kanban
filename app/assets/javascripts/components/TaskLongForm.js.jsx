/**
 * assets/javascript/components/TaskLongForm.js.jsx
 */

var TaskLongForm = React.createClass({
  
  getInitialState: function() {
    return { edit: false }
  },
    
  toggleEditMode: function(event) {
    console.log("[TaskLongForm]: toggleEditMode");
    event.preventDefault();
    this.setState( { edit: !this.state.edit } );
    return;
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
      }.bind(this)
    });
    
    return;
  },
  
  /**
   * Display the non-editable version of the task
   */
  taskView: function() {
    console.log('[TaskLongForm]: taskView()');
    
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
                <i className="fa fa-2x fa-circle-o"></i>
              </div>
              <div className="task-fields-tmp">
                <div className="title">                  
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
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          
          <div className="task-long-form-div">
            <form onSubmit={this.handleEdit}>
              <div className="task-form-btns form-group">
                <button className   = "btn btn-primary" 
                        type        = "submit" >                Save  </button>

                <button className   = "btn btn-default" 
                        onClick     = { this.toggleEditMode } > Cancel </button>
              </div>
          
              <div className="task-title form-group">
                <input    type          = 'text'   
                          className     = 'form-control' 
                          name          = 'title'  
                          placeholder   = 'Enter task'
                          defaultValue  = {this.props.task.title} 
                          autoFocus     = 'true'
                          ref           = 'title' />
              </div>
                    
              <div className="task-description form-group">
                <textarea className     = 'form-control'
                          name          = 'description'
                          placeholder   = 'Entered detail task description'
                          defaultValue  = {this.props.task.description} 
                          ref           = 'description' />
                    
              </div>
              
              <div className="row">        
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div className="task-due-date form-group">
                    <DatePicker name          = 'due_text'
                                placeholder   = 'mm/dd/yyyy'
                                defaultValue  = {formatDateString(this.props.task.due)}
                                ref           = 'due' />
                  </div>
                </div>
                              
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                </div>
              </div>
                              
            </form>
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