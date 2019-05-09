import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import uuid from 'uuid';
export default class Profile extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    }

    componentDidMount(){
        const uid = this.props.match.params.uid;
        // looking for person/user with given uid/user ID
        for(let user of this.props.users) {
            if(user._id === uid) {  
                this.showUser(user);
                return;
            }
        };
        alert("The user ID you entered was not found. Please try again.");
    }
   
    showUser = (user) => {
        const {username, email, firstName, lastName, password} = user;
        this.setState({
            username, email, firstName, lastName, password
        });
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();
        const {username, email, firstName, lastName, password} = this.state;
        const newUser = {
            _id: this.props.match.params.uid,
            username, password,
            email,
            firstName, lastName
        }
        this.props.updateUser(newUser)
    }
        
    render() {
    return(
<div>          
    <nav className="navbar navbar-dark bg-primary fixed-top " to='/user/:uid'>
        <span></span>
        <span className="navbar-brand mb-0 h1">Profile</span>
        <button to='/user/:uid'>
            <i className='fas fa-check'></i>
        </button>
    </nav>           
    <div className='container'>
        <form id="profileForm" onSubmit={this.onSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    placeholder="Enter or edit your username..."
                    className="form-control"
                    type="text"
                    id="username"
                    name="username"
                    value={'username'}
                    onChange={this.onChange} />               
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    placeholder="Enter or edit your email address..."
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={'email'}
                    onChange={this.onChange} />                
            </div>
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                    placeholder="Enter or edit your first name..."
                    className="form-control"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={'firstName'}
                    onChange={this.onChange} />               
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                    placeholder="Enter or edit your last name..."
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={'lastName'}
                    onChange={this.onChange} />               
            </div>            
            <Link className="btn btn-primary btn-block"
                to={`/user/${this.props.match.params.uid}/website`}>Websites</Link>                         
            <Link to="/login" className="btn btn-danger btn-block">Logout</Link> 
    </form>                               
 </div>     
    <nav className="navbar navbar-dark bg-primary fixed-bottom">
            <Link to="/user/123">
                <i className="fas fa-user" />
            </Link>
        </nav>          
</div>        
    )              
}  
}              