import React from 'react';
import '../App.css'
import PlaylistCard from './PlaylistCard'
import Modal from 'react-modal';
import BookmarkCard from './BookmarkCard'
import {getSong} from '../services/utils'
import NewPlaylist from '../assets/NewPlaylistIcon.png'
import CreatePlaylist from './CreatePlaylist'
import EditPlaylist from './EditPlaylist.jsx';

export default class PlaylistsContainer extends React.Component {

    state = {
        editPlaylistForm: false,
        showMore: false,
        featuredPlaylist: null,
        featuredBookmarks: null,
        showModal: false,
        song: null,
       
    }

    componentWillMount = () => {
        this.props.stayLoggedIn()
        .then(r => {
          this.props.mountUser(r)
        })
    }
    handleBookmark =(bookmark)=>{
        getSong(bookmark.song_id)
        .then((song)=>{
            this.setState({song})
        })
    }

    handleBookmarkDelete = (id)=>{
        let survivingBookmarks = this.state.featuredBookmarks.filter(bookmark => bookmark.id !=id)
        this.setState({featuredBookmarks: survivingBookmarks})
    }

    setFeatured = (playlist)=>{
        this.setState({ featuredPlaylist: playlist, featuredBookmarks: playlist.bookmarks, showMore: false})
    }

    setFeaturedToNull = (e)=>{
        e.preventDefault()
        this.setState({ featuredPlaylist: null})

    }


        toggleModal = ()=>{
            this.setState({showModal: !this.state.showModal})
        }

        toggleEditPlaylistForm = ()=>{
            this.setState({editPlaylistForm: !this.state.editPlaylistForm})
        }

        playlistShowMore = ()=>{
            this.setState({showMore: !this.state.showMore})
        }

        render(){
            let playlists
            if(this.props.globalState.user.playlists){
                 playlists = this.props.globalState.user.playlists.map((playlist)=>{
                    return (
                        <div onClick = {(e)=>this.setFeatured(e, playlist)}>
                            <PlaylistCard playlist = {playlist} key={playlist.id}/>
                        </div>
                    )
                })
            }

        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };
        
        return (

            <div className = "white-text">
                <div className = "in-line-playlist" onClick = {this.toggleModal}>
                    <img src = {NewPlaylist} height = '100' width = '100'/>
                    <p>new playlist...</p>
                </div>
                <div className = "playlist-card-container">
                {playlists}
                </div>
                <Modal isOpen={this.state.showModal}
                        style = {customStyles} onRequestClose={this.toggleModal}>
                    <CreatePlaylist 
                    toggleModal = {this.toggleModal}
                    renderPlaylists = {this.renderPlaylists}
                    mountUser = {this.props.mountUser}
                    />
                    <button onClick = {this.toggleModal}>close</button>
                </Modal>
                    {this.state.featuredPlaylist ? 
                        <div className = "featued-container">
                        <h1>{this.state.featuredPlaylist.title}</h1>
                        {this.state.showMore ? 
                            <div>
                            {this.state.editPlaylistForm ? 
                                <>
                                <EditPlaylist
                                setFeaturedToNull = {this.setFeaturedToNull}
                                toggleEditPlaylistForm = {this.toggleEditPlaylistForm} 
                                playlist = {this.state.featuredPlaylist}
                                mountUser = {this.props.mountUser}
                                />
                            </>
                            :
                            <>
                            <button onClick = {this.toggleEditPlaylistForm}>Edit Playlist</button>
                                <p>title: {this.state.featuredPlaylist.title}</p>
                                <p>description: {this.state.featuredPlaylist.description}</p>
                                <p>bookmarks: {this.state.featuredPlaylist.bookmarks.length}</p>
                            <button onClick = {this.playlistShowMore}>hide details</button>
                            </>}
                            
                            </div>
                    :
                    <button onClick = {this.playlistShowMore}>more...</button>
                }
                
                    <br>
                    </br>
                {/* Note: the matching initials in the song are Capitalized */}
                    { this.state.featuredBookmarks ?
              this.state.featuredBookmarks.map((bookmark) => {
                  return <BookmarkCard bookmark = {bookmark}
                  className = "bookmark-card"
                  handleBookmarkDelete = {this.handleBookmarkDelete}
                  mountUser = {this.props.mountUser}
                            setFeatured = {this.setFeatured}
                            playlist = {this.state.featuredPlaylist}
                        
                    />
            })
            :
            null
        } 
                </div>
                 :
                 null}
            </div>
        )
    }
}