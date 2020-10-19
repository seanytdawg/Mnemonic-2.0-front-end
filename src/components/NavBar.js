import { doc } from 'prettier'
import React from 'react'

export default class NavBar extends React.Component {
  styles = {
    background: "#37C1A8",
  };
  render() {
    return (
      <div class="topnav">
        <a class="active" href="#home">
          Mnemonic Maker
        </a>
        <a href="/search">Search</a>
        <a href="/playlist">Playlist</a>
        <a href="/about">About</a>
        <a href="/login">Login</a>
      </div>
    );
  }
}