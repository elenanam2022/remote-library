import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {strings} from '../localization'


function GovernmentalResources(){
    const [govResources, setGovResources] = useState([]);
    useEffect(()=>{
        if (localStorage.getItem("lng") !== null){
            strings.setLanguage(localStorage.getItem("lng"))
          }
        fetch("http://10.129.0.217:8000/governmental-resource-popular", {
          method: 'GET'
    
        }).then( resp => resp.json())
        .then(response => setGovResources(response))
        .catch (error => console.log(error))
        
      }, [])
    return(
      <div>
      <h2 className="bookHeader">{strings.govResourcesText}</h2>
        <div className = "book-wrapper">
        
        { govResources.map(govResources=> {
          let path = govResources.path.split("governmental_resources")[1].split(".html")[0].substring(1)
            return (
                <Link to={`gov-resource/${govResources.id}`}>
              <div key={govResources.id} className = "item">
                <div>{path}</div>
           </div>
           </Link>
            )
           
          })}
        </div>
        </div>
    )}

export default GovernmentalResources;