/******************************************************************************
 * File: assets/javascripts/components/TaskBoard.js.jsx
 ******************************************************************************/

var TaskBoard = React.createClass({

  getInitialState: function() {
    return { incomplete_tasks: [], completed_tasks: [], tasks: [] };
  },
  
  componentWillMount: function() {
    var tasks             = _.map( this.props.data,  _.clone );
    var incomplete_tasks  = _.remove(tasks, function(task) {
      return task.complete == false;
    });
    
    var completed_tasks   = _.remove(tasks, function(task) {
      return task.complete == true;
    });
    
    this.setState( { incomplete_tasks:  incomplete_tasks,
                     completed_tasks:   completed_tasks    } );
  },
  
  getTaskList: function(task) {
    var     task_list = task.complete == true ? "completed_tasks" : "incomplete_tasks";
    return  task_list;
  },
  
  addTask: function(task) {
    console.log('[TaskBoard] addTask()');
    var incomplete_tasks  = _.map( this.state.incomplete_tasks, _.clone );
    incomplete_tasks.push(task);
    this.setState( { incomplete_tasks: incomplete_tasks } );
  },
  
  /**
   * Event handler triggered when a user checks a task as complete/incomplete.
   * The function changes the tasks complete status and move the task
   * to the complete/incomplete task list
   */
  checkTask: function(task, data) {
    console.log('[TaskBoard]: checkTask');
    var task_lists          = {};
    var source_list         = this.getTaskList(task);
    var target_list         = source_list == "incomplete_tasks" ? "completed_tasks" : "incomplete_tasks";
    
    var index               = this.state[source_list].indexOf(task);
    var source_tasks        = _.map( this.state[source_list], _.clone );
    var target_tasks        = _.map( this.state[target_list], _.clone );
    var source_task         = _.pullAt(source_tasks, [index])[0];
    var updated_task        = _.merge(source_task, data["task"]);
    target_tasks.push(updated_task);
    
    task_lists[source_list] = source_tasks;
    task_lists[target_list] = target_tasks;
    
    this.setState( task_lists );
  },
  
  updateTask: function(task, data) {
    console.log('[TaskBoard]: updateTask');
    var state         = {}
    var task_list     = this.getTaskList(task);
    
    var index         = this.state[task_list].indexOf(task);
    var updated_task  = _.merge(  task,             data["task"]  );
    var tasks         = _.map(    this.state[task_list], _.clone  );
    tasks[index]      = updated_task
    state[task_list]  = tasks;

    this.setState( state );
    
    return;
  },
  
  removeTask: function(task) {
    console.log('[TaskBoard] removeTask')
    var state         = {};
    var task_list     = this.getTaskList(task);
    
    var index         = this.state[task_list].indexOf(task);
    var tasks         = _.map( this.state[task_list], _.clone );    
    tasks.splice(index, 1);

    state[task_list]  = tasks;    
    this.setState( state );
  },
  
  render: function() {
    var title = this.props.title || "Hello World";
    
    return ( 
      <div className="tasks-board">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <TaskHeader       title             = { title            } />
        
            <div className="row">
              <div className="col-sm-7 col-md-7 col-lg-7">
                <TaskList     tasks             = { this.state.incomplete_tasks }
                              handleCheckTask   = { this.checkTask   }
                              handleEditTask    = { this.updateTask  }
                              handleDeleteTask  = { this.removeTask  } />
                          
                <TaskHeader   title             = { "Completed Tasks" } />
            
                <TaskList     tasks             = { this.state.completed_tasks } 
                              handleCheckTask   = { this.checkTask   }
                              handleEditTask    = { this.updateTask  }
                              handleDeleteTask  = { this.removeTask  } />
              </div>
                    
              <div className="col-sm-5 col-md-5 col-lg-5">      
                <TaskForm     handleNewTask     = { this.addTask     } />
              </div>
            </div>
                              
          </div>
        </div>
      </div>
    );
  }

});

//-----------------------------------------------------------------------------
// TaskBoardHeader
//-----------------------------------------------------------------------------
var TaskHeader = React.createClass({
  
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