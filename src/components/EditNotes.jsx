
import React from 'react'
import { editBookmark} from '../services/utils'
export default class EditNodes extends React.Component {


    state = {
        currentNote: this.props.note
    }

    componentDidMount =()=>{
        console.log(this.props)
        console.log("mountin like a lion")
    }

    handleSubmit = ()=>{

        editBookmark(this.state.currentNote, this.props.bookmark_id)
        .then(()=>{
            this.props.toggleEditNotes()
            window.location.reload(false);
   
        })
        .then(()=>{           
        });
        
    }

    handleChange = (e)=>{
        this.setState({currentNote: e.target.value})
    }



    render(){

        


        return (
        
        <div>
            <label>
                Edit Notes:
            </label>
            <input type= "textarea" name="notes" value = {this.state.currentNote} onChange = {(e)=>this.handleChange(e)}></input>
            <button onClick = {(e)=>this.handleSubmit(e)}>
                save notes
            </button>
        </div>
        )
    }
}

