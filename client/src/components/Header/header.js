import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

//Components
import Nav from '../Header/Sidenav/sidenav';

class Header extends Component {

    state={
        showNav:false
    }

    onHideNav = () =>{
        this.setState({
            showNav:false
        })
    }

    render() {
        return (
        <header>
            <div className="open_nav">
                <FontAwesome name="bars"
                    onClick={()=>this.setState({showNav:true})}
                    style={{
                        color:'#ffffff',
                        padding:'10px',
                        cursor:'pointer'
                    }}    
                />
            </div>

            <Nav
               showNav={this.state.showNav}
               onHideNav={()=>this.onHideNav()}    
            />
        
            <Link to="/" className="logo">
                THe Book Shelf
            </Link>
            
        </header>
        )
    }
}

export default Header;
