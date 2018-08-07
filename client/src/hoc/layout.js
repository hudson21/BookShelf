import React from 'react';

//Components
import Header from '../components/Header/header';

const Layout = (props) => {
    return (
        <div>
            <Header />
            <div>
                {props.children}
            </div> 
        </div>
    );
};

export default Layout;