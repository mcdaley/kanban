/**
 * File: assets/javascripts/components/TaskForm.js.jsx
 */

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
    var taskForm = this.taskForm();
    
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
