import React, { Component } from 'react';
import { auth } from '../actions';
import { connect } from 'react-redux';

//The component to render is gonna be the one passed by the function on the routes file
export default function(ComponentToRender,reload){
    //This function will return this class
    class AuthenticationCheck extends Component{

        state={
            loading:true
        }

        //Check if the user is authenticaed or not
        componentWillMount(){
            this.props.dispatch(auth())
        }

        //To check if there are new parameters within the props
        componentWillReceiveProps(nextProps){
            this.setState({
                loading:false
            })
            
            
            if(!nextProps.user.login.isAuth){
                //If the reload parameter is true it will be redirected to /login
                if(reload === true){
                    this.props.history.push('/login')
                }
            }else{
                //If the reload parameter is false it will be redirected to /user
                if(reload === false){
                    this.props.history.push('/user')
                }
                
            }

        }
        
        render(){
            if(this.state.loading){
                return <div className="loader">Loading...</div>
            }
            return(
                //The props are received by the Route on routes.js
                <ComponentToRender 
                    {...this.props}
                    //Here we are passing the props to the ComponentToRender
                    user={this.props.user}
                />
            )
        }
    }

    function mapStateToProps(state){
        return{
            user:state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck)
}
