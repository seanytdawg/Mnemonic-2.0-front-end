
const BACKEND = "http://127.0.0.1:3001/";

export const fetchMnemonic = (phrase, current_song_index, artist, order) => {
  if(!artist){
    artist = 'any'
  }
  return fetch(BACKEND + `query/${phrase}/${current_song_index}/artist/${artist}/order/${order}`)
  .then(r => r.json())
}

export const loginUser = (user_params) => {
  console.log(`Logging in user ${user_params.email}...`)
  return fetch( BACKEND + 'login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user_params)
  })
  .then( r => {
    console.log(`Login fetch returned with status ${r.status}`)
    return r.json() 
  })
}

export const registerUser = (user_params) => {
  console.log(`Registering user ${user_params.email}...`)
  return fetch( BACKEND + 'users', {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(user_params)
  })
  .then(r => {
    console.log(`Register fetch returned with status ${r.status}`)
    return r.json()
  })
}

export const stayLoggedIn = (token) => {
  return fetch( BACKEND + 'stay_logged_in', {
    headers: {
      "Authorization": token
    }
  })
  .then(r => r.json())
}

export const saveBookMark = (playlist_id, song_id, input_phrase, matching_phrase, token)=>{

  console.log("token", token)

  let bookmark_params = {
    playlist_id: playlist_id,
    song_id: song_id,
    input_phrase: input_phrase,
    matching_phrase: matching_phrase
  }
    // console.log(song_id, input_phrase, matching_phrase)
      return fetch(BACKEND + "bookmarks", {
        method: "POST",
        headers: {
          "Authorization": token,
          "content-type": "application/json"
        },
        body: JSON.stringify(bookmark_params),
      }).then((r) => {
        console.log(`Register fetch returned with status ${r.status}`);
        return r.json();
      });
}

export const fetchPlaylists = (token)=>{
  return fetch(BACKEND + "playlists", {
    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}
