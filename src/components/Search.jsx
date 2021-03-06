import React from "react";
import { fetchMnemonic } from '../services/utils'
import SearchBar from './SearchBar/SearchBar'
import Result from "./Result";
import NoResults from './NoResults'
import Logo from '../assets/mnemonic-2.0-logo.png'
export default class Search extends React.Component {
  state = {
    query: "",
    currentArtist: "any",
    currentSong: null,
    matchingPhrase: "",
    currentSongIndex: 0,
    current_snippet_index: 0,
    order_matters: true,
    error: null,
    saved: false,
    resultDisplayed: false,
    satisfied_artist_request: true, 
    fresh_search: true
  };

  // goToNextResult = (e, query, current_song_index = 0, artist, order_matters) => {
  //   console.log("next result");
  //   this.handleSubmit(e, query, current_song_index, artist, order_matters);
  // };
  
  handleSubmit = (e, query, current_snippet_index = 0, artist, order_matters, fresh_search = true) => {
    if(query == ""){
      e.preventDefault()
      document.getElementById('enter-a-valid-phrase').innerText = "enter a valid word or phrase"

    }
    else{
      document.getElementById('enter-a-valid-phrase').innerText = ""
    console.log("submitting...")
    this.setState({ query: query, currentArtist: artist });
    fetchMnemonic(query, current_snippet_index, artist, order_matters, fresh_search).then((r) => {
      console.log("response: ",r)
      if (r.error) {
          if(!fresh_search){
            this.setState({satisfied_artist_request: true})
          }
        this.setState({ error: r.error });
        document.getElementById('error-div').scrollIntoView()
        this.props.handleSearch(r)
      } else {
        this.setState({
          error: null,
          current_snippet_index: r.current_snippet_index,
          resultDisplayed: true,
          original_query: r.original_query,
          satisfied_artist_request: r.satisfied_artist_request
        });
        this.props.handleSearch(r)
      }
    });
    e.preventDefault();
  }
  };

  toggleSave = () => {
    this.setState({ saved: !this.state.saved });
  };

  
  render() {
    return (
      <div className="home">
        <div id= 'search-bar' className = "search-error-inline">
        <SearchBar artistOptions={this.props.artistOptions} handleSubmit={this.handleSubmit} />
        <text id = "enter-a-valid-phrase" className = "white-text"></text>
        </div>
        <div id = "error-div">
        {this.state.error ? < NoResults/> : null}
        </div>
        <div id="full-body-div">
          {/* <img src = {Logo} id ="logo"/> */}

       <text id = "artist-request-satisfied-or-not" className = "white-text">{this.state.satisfied_artist_request ? null : "We Couldn't find results with that artist, but here's something..."}</text>
          {
            this.props.globalState.search.song && this.props.globalState.search.song.title ?  
            <Result handleSubmit={this.handleSubmit} globalState={this.props.globalState}
            mountUser = {this.props.mountUser}
            original_query = {this.state.original_query}
            />
            :
            null
          }
        </div>
      </div>
    );
  }
}


