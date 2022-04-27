import React, {useState, useEffect} from 'react';
import { Document, Page,pdfjs,  StyleSheet } from 'react-pdf';
import {useLocation, Link} from 'react-router-dom'
import { strings } from '../localization';


function BookDetails(){
    const location = useLocation()
    let bookType = location.state.type
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [book, setBook] = useState([]);
    const [path, setPath] = useState("")
    const [author, setAuthor] = useState("")
    
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    useEffect(()=>{
      if (localStorage.getItem("lng") !== null){
        strings.setLanguage(localStorage.getItem("lng"))
      }
        let id = window.location.pathname.split("/").pop()
        let authors = "";
        fetch(`http://10.129.0.217:8000/books/${id}`, {
          method: 'GET'
    
        }).then( resp => resp.json())
        .then(response => {
            console.log(response)
            setBook(response)
            setPath(response.path.split("public"))
            response.authors.map((author, id)=>
                authors += author.first_name + " " + author.last_name)
            setAuthor(authors)
            
        })
        .catch (error => console.log(error))
        
      }, [])
      function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
      }
    
    return(
      <div>
        <div className = "book-detail-wrapper">
            {bookType==="pdf" &&
            <div key={book.id} className = "item">
            <Document  file={process.env.PUBLIC_URL + path[1]} onLoadSuccess={onDocumentLoadSuccess}>
            <Page className = "page" pageNumber={pageNumber} />
          </Document>
          </div>
            }     
            {bookType ==="epub" && 
            <div key={book.id} className = "item">
                <img className="book-cover-img" src="/default_book_cover.png" alt="book cover" />
            </div>
            }

            <div className="book-info">
                <div className = "book-info-text">{strings.nameText}: {book.name}</div>
                <div className = "book-info-text">{strings.authorText}: {author}</div>
                <div className = "book-info-text">{strings.sourceText}: {book.source}</div>
                <div className = "book-info-text">{strings.publishYearText}: {book.publish_year}</div>
                <div className="book-buttons">
                    {bookType==="pdf" &&
                    <Link to="book-reader-pdf" state={{
                        path: path[1],
                        authors: author,
                        name: book.name
                    }}><div className="button">{strings.readText}</div></Link>
                    }
                    {bookType==="epub" &&
                    <Link to="book-reader-epub" state={{
                        path: path[1],
                        authors: author,
                        name: book.name
                    }}>
                    <div className="button">{strings.readText}</div>
                    </Link>
                    }
                    
                    <Link to={process.env.PUBLIC_URL + path[1]} target="_blank" download><div className="button">{strings.downloadText}</div></Link>
                    <div className="button">{strings.saveText}</div>
                </div>
                <div className="descriptionTitle">{strings.descriptionText}</div>
                <div className="description">{book.description}</div>
            </div>
            
              
            
          
        </div>
        </div>
    )}

export default BookDetails;