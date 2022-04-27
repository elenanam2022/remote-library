import Header from './Header.js';
import Books from './Books.js';
import Videos from './Videos.js';
import GovernmentalResources from './GovernmentalResources.js';
import React, {useEffect} from 'react';
import {strings} from '../localization.js'


class Home extends React.Component{
    render(){
        return(
            <React.Fragment>
            
            
                <Books/>
                <Videos/>
                <GovernmentalResources/>
            </React.Fragment>
        )
    }
}
export default Home;
