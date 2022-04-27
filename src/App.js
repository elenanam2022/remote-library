import './Styles/App.css'
import './Styles/Header.css'
import './Styles/main.css'
import React from 'react'
import Home from './Components/Home'
import Header from './Components/Header'
import VideosDetails from './Components/VideoDetails'
import BookDetails from './Components/BookDetails'
import BookDirectory from './Components/BookDirectory'
import VideoDirectory from './Components/VideoDirectory'
import BookReaderPdf from './Components/BookReaderPdf'
import BookReaderEpub from './Components/BookReaderEpub'
import GovResource from './Components/GovResource'
import GovResourcesDirectory from './Components/GovResourcesDirectory'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

class App extends React.Component {
  render(){
    return (
      <div className="App">
      
      <Router>
      <header className="App-header">
            <Header></Header>
        </header>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/video/:id" element={<VideosDetails/>}/>
          <Route exact path="/book/:id" element={<BookDetails/>}/>
          <Route exact path="/book-directory/book/:id" element={<BookDetails/>}/>
          <Route exact path="book-directory" element={<BookDirectory/>}/>
          <Route exact path="video-directory/video/:id" element={<VideosDetails/>}/>
          <Route exact path="gov-directory/gov-resource/:id" element={<GovResource/>}/>
          <Route exact path="gov-resource/:id" element={<GovResource/>}/>
          <Route exact path="gov-directory/gov-resource/:id" element={<GovResource/>}/>
          <Route exact path="gov-directory" element={<GovResourcesDirectory/>}/>
          <Route exact path="/video-directory" element={<VideoDirectory/>}/>
          <Route path="book/:id/book-reader-pdf" element={<BookReaderPdf/>}/>
          <Route path="/book-directory/book/:id/book-reader-pdf" element={<BookReaderPdf/>}/>
          <Route path="book/:id/book-reader-epub" element={<BookReaderEpub/>}/>
          <Route path="book-directory/book/:id/book-reader-epub" element={<BookReaderEpub/>}/>
          </Routes>
      </Router>
      </div>
    );
  }
}
export default App;
