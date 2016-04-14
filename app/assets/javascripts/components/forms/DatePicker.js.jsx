/******************************************************************************
 * File: assets/javascripts/components/forms/DatePicker.js.jsx
 ******************************************************************************/
var DatePicker = React.createClass({
  
  /**
   * Set up the jQuery datepicker after the component mounts. Delegate the
   * onChange event to the React handleChange event, so the UI is notified
   * when a user changes the date through the jQuery datepicker widget.
   */
  componentDidMount: function() {
    $(ReactDOM.findDOMNode( this.refs.datepicker )).datepicker().on("change", function(e) {
      console.log('[DatePicker] changeDate()');
      this.handleChange(e);
    }.bind(this)); 
  },
      
  handleChange: function(e) {
    console.log('[DatePicker] handleChange()');
    this.props.handleChange(e);
  },
  
  render: function() {
    
    return (
        <input    type          = 'text'   
                  className     = 'form-control' 
                  ref           = 'datepicker'
                  name          = { this.props.name         }
                  value         = { this.props.value        }
                  defaultValue  = { this.props.defaultValue }
                  placeholder   = { this.props.placeholder  }
                  onChange      = { this.handleChange       } />
    );
  }
});