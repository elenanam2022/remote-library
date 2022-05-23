import React, {useState, useEffect} from 'react';
import { Document, Page,pdfjs,  StyleSheet } from 'react-pdf';
import {useLocation, Link} from 'react-router-dom';
import {strings} from '../localization'


function BookReaderPdf(){
    const location = useLocation()
    const path = location.state.path
    const name = location.state.name
    const authors = location.state.authors
    const [displayPages, setDisplayPages] = useState([])
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageNumberInput, setPageNumberInput] = useState("")
    useEffect(()=>{
        if (localStorage.getItem("lng") !== null){
            strings.setLanguage(localStorage.getItem("lng"))
          }
         

          let page = localStorage.getItem("page_pdf"+name);
        if (page !== null){
            setPageNumber(parseInt(page))
        }
          
    }, [])
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
      function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        
        setPageNumber(pageNumber);
        // setDisplayPages([2,3,4,5,6,7,8,9,numPages])
        handlePagesList(pageNumber, numPages)
        
      }
    function handlePageChange(){
        if (pageNumberInput > 0 && pageNumberInput<=numPages){
            setPageNumber(parseInt(pageNumberInput))
            setPageNumberInput("")
            handlePagesList(parseInt(pageNumberInput))
        }         
    }
    function handleButtonNavigation(num){
        if (num > 0 && num<=numPages){
            setPageNumber(num)
            localStorage.setItem("page_pdf"+name, num)
        }
        handlePagesList(num)
    }
    function handlePagesList(num, max){
        let maxPage = numPages;
        if (max !== null){
            maxPage = max;
        }
        let new_pages = []
        if (num <= 1){
            setDisplayPages([2,3,4,5,6,7,8,9,maxPage])
        }
        else if (num !== 1 &&  num<maxPage-7){
            for (let i = num; i<num+8; i++){
                if (i === num){
                    new_pages.push(i-1)
                }else{
                    new_pages.push(i)
                }
                
            }
            new_pages.push(maxPage)
            setDisplayPages(new_pages);

        }else if(num>=numPages-7){
            let i = 1;
            let j = 1;
            while (i <= 8){
                if (num+i-1 < numPages-1){
                    new_pages.push(num+i)
                    
                }
                else{
                    new_pages.unshift(num-j)
                    j++;
                }
                i++;
            }
            new_pages.push(numPages)
            setDisplayPages(new_pages);
        }
        
    }
    function nextPage(e){
        if (pageNumber < numPages){
            e.preventDefault()
            setPageNumber(pageNumber+1)
            localStorage.setItem("page_pdf"+name, pageNumber+1)
        }
        handlePagesList(pageNumber+1)
        
    }
    function prevPage(e){
        if (pageNumber > 1){
            e.preventDefault()
            setPageNumber(pageNumber - 1)
            localStorage.setItem("page_pdf"+name, pageNumber+1)
        }
        handlePagesList(pageNumber - 1)
    }
    
    return(
      <div>

        <div className = "reader-pdf-wrapper">
        <div className='navigation'>
            <div className='buttons'></div>
            {displayPages.map(page=>{
                return (
                    <div onClick={()=>handleButtonNavigation(page)} className="page-button" key={page}>{page} </div>
                )
            })}
            <div className='buttons'>
          <div className="prev" onMouseDown={prevPage}></div>
          <div className="next" onMouseDown={nextPage}></div>
          <div className="input-chose-page"></div>
          <input type="number" value={pageNumberInput} onChange={(e)=> setPageNumberInput(e.target.value)}></input>
          <button onClick={handlePageChange}>{strings.movePageText}</button>
          </div>
          </div>
            <div className = "item">
            <Document  file={process.env.PUBLIC_URL + path} onLoadSuccess={onDocumentLoadSuccess}>
            <Page className = "page" pageNumber={pageNumber} />
          </Document>
          </div>          
        </div>
        </div>
    )}

export default BookReaderPdf;