/******************************************************************************
 * File: assets/javascripts/components/Task.js.jsx
 ******************************************************************************/

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

