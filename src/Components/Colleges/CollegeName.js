import React,{Component} from 'react'
import axios from 'axios'
class CollegeName extends Component{
    constructor(props){
        super(props)
        this.state={
            collegename:''
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:8000/codingcenter/colleges/${this.props.match.params.id}`)
        .then((response)=>{
            this.setState({
                collegesList:response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })

    }

    render(){
        return(
            <div>
                {this.state.college!==''&&JSON.stringify(this.state.collegename)}
                </div>
        )
    }
}


export default CollegeName