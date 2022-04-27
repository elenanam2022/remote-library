import React from 'react'
import VideoPlayer from 'react-video-js-player';
import { Link } from "react-router-dom";
import {strings} from '../localization'


class VideosDetails extends React.Component{
    constructor(props) {
        super(props);
        
      }
  player = {}
  state={
    video: {},
    path: "",
    author: "",
    name: "",
    upload_date: "",
    views: "",
    source: ""

  }
    
  componentDidMount(){
    if (localStorage.getItem("lng") !== null){
      strings.setLanguage(localStorage.getItem("lng"))
    }
    console.log(window.location.pathname)
    let id = window.location.pathname.split("/")
    fetch(`http://10.129.0.217:8000/videos/${id[2]}`, {
      method: 'GET'

    }).then( resp => resp.json())
    .then(response => {
        console.log(response)
        let author = response.author
        let name = response.name
        let path = response.path.split("public")
        let upload_date = response.upload_date_time
        let date_time = upload_date.split('T')
        let time = date_time[1].split(".")[0]
        let date = date_time[0]
        this.setState({
            video: response,
            author: author,
            name: name,
            path: path[1],
            upload_date: date + " " + time,
            views: response.views_counter,
            source: response.source
        }
    )
    })
    .catch (error => console.log(error))
    
  }
  onPlayerReady(player){
    this.player = player;
}

  render() {
    return(
      <div>
        <h2 className="bookHeader">{strings.videoText}</h2>
        <div className = "video-detail-wrapper">
        
            <div key={this.state.video.id} className="item">
              <VideoPlayer
                    controls={true}
                    src={process.env.PUBLIC_URL + this.state.path}
                    // src="http://localhost:4000/video"
                    onReady={this.onPlayerReady.bind(this)}
                />
                {/* <video controls src="http://localhost:4000/video" type="video/mp4">

                </video> */}
              <div className="video-info"><h1>{this.state.name}</h1></div>
              <div className="video-info"><h1>{this.state.views} {strings.viwsText}</h1></div>
              <div className="video-info"><h1>{strings.uploadDateText} {this.state.upload_date}</h1></div>
              <div className="video-info"><h1>{strings.sourceText}: {this.state.source}</h1></div>
              <div className="book-buttons">
              <Link to={this.state.path} target="_blank" download><div className="button">{strings.downloadText}</div></Link>
                    <div className="button">{strings.saveText}</div>
                </div>
              </div>
        
                </div>
       </div>
    )}
}

export default VideosDetails;