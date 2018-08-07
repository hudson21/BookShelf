import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';

class Login extends Component {

    state = {
        email:'',
        password:'',
        error:'',
        success:false
    }

    handleInputEmail = (event) =>{
        this.setState({
            email:event.target.value
        })
    }

    handleInputPassword = (event) =>{
        this.setState({
            password:event.target.value
        })
    }

    //Compare the previous and the current state of the props
    componentWillReceiveProps(nextProps){
        //To examinate if the user is authorized or not
        if(nextProps.user.login.isAuth){
            this.props.history.push('/user')    
        }
    }
 
    submitForm = (e) =>{
        e.preventDefault();
        this.props.dispatch(loginUser(this.state))
    }

    render() {
        let user = this.props.user;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Log in here</h2>

                    <div className="form_element">
                        <input 
                            type="email"
                            placeholder="Enter your email"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />
                    </div>

                    <div className="form_element">
                        <input 
                            type="password"
                            placeholder="Enter your password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>

                    <button type="submit">Log in</button>
                    
                    <div className="error">
                        {
                            user.login 
                            ? <div>{user.login.message}</div>
                            :null
                        }
                    </div>
                    

                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log(state)
    return {
        user:state.user //This is associated with the user of reducers/index.js
    }
}

export default connect(mapStateToProps)(Login)