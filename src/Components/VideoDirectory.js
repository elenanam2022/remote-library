import React from 'react'
import VideoPlayer from 'react-video-js-player';
import { Link } from "react-router-dom";
import {strings} from '../localization'


class VideoDirectory extends React.Component{
  player = {}
  state={
    videos: [],
  }
    
  componentDidMount(){
    if (localStorage.getItem("lng") !== null){
      strings.setLanguage(localStorage.getItem("lng"))
    }
    
    fetch("http://10.129.0.217:8000/videos", {
      method: 'GET'

    }).then( resp => resp.json())
    .then(response => this.setState({
      videos: response
    }))
    .catch (error => console.log(error))
    
  }
  onPlayerReady(player){
    this.player = player;
}

  render() {
    
    return(
      <div>
        <h2 className="bookHeader">{strings.videoText}</h2>
        <div className = "book-wrapper book-directory">
        {this.state.videos.map(video=>{
          let author = video.author
          let name = video.name
          let path = video.path.split("public")
          return(
            <div key={video.id} className="item">
              <Link to={`/video/${video.id}`} state={{id: video.id}}>
              <VideoPlayer
                    controls={false}
                    src={process.env.PUBLIC_URL + path[1]}
                    onReady={this.onPlayerReady.bind(this)}
                />
                </Link>
              <div className="authorName"><h1>{author}</h1></div>
              <div className="bookTitle"><h1>{name}</h1></div>
              </div>
              
          )
        })}
        
                </div>
       </div>
    )}
}

export default VideoDirectory;