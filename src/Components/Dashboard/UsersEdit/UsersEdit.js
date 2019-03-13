import React,{Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';

  
  const styles = theme => ({
    root: {
      flexGrow: 1,
      height: 250,
    },
    input: {
      display: 'flex',
      padding: 0,
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden',
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
        0.08,
      ),
    },
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16,
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    divider: {
      height: theme.spacing.unit * 2,
    },
  });
  
  function NoOptionsMessage(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
  }
  
  function Control(props) {
    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps,
          },
        }}
        {...props.selectProps.textFieldProps}
      />
    );
  }
  
  function Option(props) {
    return (
      <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  }
  
  function Placeholder(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function SingleValue(props) {
    return (
      <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
        {props.children}
      </Typography>
    );
  }
  
  function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
  }
  
  function MultiValue(props) {
    return (
      <Chip
        tabIndex={-1}
        label={props.children}
        className={classNames(props.selectProps.classes.chip, {
          [props.selectProps.classes.chipFocused]: props.isFocused,
        })}
        onDelete={props.removeProps.onClick}
        deleteIcon={<CancelIcon {...props.removeProps} />}
      />
    );
  }
  
  function Menu(props) {
    return (
      <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
        {props.children}
      </Paper>
    );
  }
  
  const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
  };

class UsersEdit extends Component{
    constructor(props){
        super(props)
        this.state = {
            single: null,
            multi: null,
            name:'',
            username:'',
            email:'',
            hackerrank_id:'',
            suggestions:[]
          }
          this.handleText= this.handleText.bind(this);
          this.handleClick= this.handleClick.bind(this);
    }
    handleChange = name => value => {
      if(name ==="multi"){
        console.log(value)
      }
        this.setState({
          [name]: value,
        });
      }
    handleText(event){
      this.setState({
        [event.target.name]:event.target.value
      })
    }
    handleOpen(e){
      console.log(e.target)
    }

      componentDidMount(){
          Axios.get(`http://localhost:8000/users/${this.props.match.params.username}`,{
            headers: {
              "Authorization": "JWT " + this.props.token
          } 
          }).then((response) =>{
            console.log(response)
            this.setState({
              name:response.data.name,
              username:response.data.username,
              email:response.data.email
            })
          }) 
          .catch( err => console.log(err))
          Axios.get("http://localhost:8000/codingcenter/colleges")
          .then((response)=>{
            console.log(response)
            let objects = response.data
            let jetex = objects.map(obj =>({
              value:obj.hackerrank_college_id,
              label:obj.name,
              id:obj.id
            }))
            this.setState({
              suggestions:jetex
            })
          })

      }
      handleClick(){
        let arr =[]
        let colleges = this.state.multi.map(obj =>{
          arr.push(obj.id)
        } );
        console.log(arr)
        console.log({
          email: this.state.email,
          name:this.state.name,
          username:this.state.username,
          hackerrank_id:this.state.hackerrank_id,
          colleges:arr})
        Axios.put(`http://localhost:8000/users/${this.props.match.params.username}`,
        {
                email: this.state.email,
                name:this.state.name,
                username:this.state.username,
                hackerrank_id:this.state.hackerrank_id,
                colleges:arr
        },
        {headers:{"Authorization":"JWT "+this.props.token}}
        ).then(response => console.log(response))
      }


    render(){
        const { classes } = this.props;
        const selectStyles = {
      input: base => ({
        ...base,
        '& input': {
          font: 'inherit',
        },
      }),
    };
        return(
            <div>
                <h3>users edit</h3>
                <Grid container spacing={24}>
                <Grid item xs={12}>
                <TextField
                    id="outlined-helperText"
                    label="username"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleText}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    id="outlined-helperText"
                    label="name"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleText}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    id="outlined-helperText"
                    label="email"
                    className={classes.textField}
                    name="email"
                    margin="normal"
                    variant="outlined"
                    value={this.state.email}
                    onChange={this.handleText}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    id="outlined-helperText"
                    label="hackerrank id"
                    className={classes.textField}
                    name = "hackerrank_id"
                    margin="normal"
                    variant="outlined"
                    value={this.state.hackerrank_id}
                    onChange={this.handleText}
                />
                </Grid>

                <Grid item xs={6}>
                <Select
                    classes={classes}
                    styles={selectStyles}
                    textFieldProps={{
                    label: 'college name',
                    InputLabelProps: {
                        shrink: true,
                    },
                    }}
                    options={this.state.suggestions}
                    components={components}
                    value={this.state.multi}
                    onChange={this.handleChange('multi')}
                    onOpen={this.handleOpen}
                    placeholder="Select colleges"
                    isMulti
                />
                </Grid>
                <Grid item xs={12}>
                <Button variant="outlined" size="medium" color="primary" className={classes.margin} onClick={this.handleClick}>
                  Submit
                </Button>
                </Grid>
                
            </Grid>
            </div>
        )
    }

}

export default withStyles(styles)(UsersEdit);