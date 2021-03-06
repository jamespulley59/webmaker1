import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default class WebsiteList extends Component {
    // define website
    state={
        uid: this.props.match.params.uid,
        websites: []
    }
    // check if website is here
    async componentDidMount(){
        const isLoggedIn = await this.props.loggedIn();
        if (isLoggedIn === 0) {
          this.props.history.push('/login');
          return;
        }
        const res = await axios.get(`/api/user/${this.state.uid}/website`);
            this.filterWebsites(res.data);
    }
    // get particular website
    filterWebsites = (websites) => {
        const newWebsites = websites.filter(
            website => (website.developerId === this.state.uid)
        )
        this.setState({
            websites: newWebsites
        })
    }

render() {

    const {uid} = this.state

return (

    <div>
        <nav className='navbar navbar-dark bg-primary fixed-top'>
            <Link to={`/user/${uid}`} >
                <i className='fas fa-chevron-left' />
            </Link>
            <span className='navbar-brand mb-0 h1'>Websites</span>
            <Link to={`/user/${uid}/website/new`}>
                <i className='fas fa-plus' />
            </Link>
        </nav>

        <section className='container'>
            <ul className='list-group'> 
                {this.state.websites.map((website) => (
                    <li key={website._id}className='list-group-item'>             
                        <Link to={`/user/${uid}/website/${website._id}/page`}>{website.name}</Link>
                        <Link to={`/user/${uid}/website/${website._id}`} className='float-right'>
                            <i className='fas fa-cog'></i>
                        </Link>
                    </li>                    
                        )
                    )
                }                
            </ul>            
        </section>

            <nav className='navbar navbar-dark bg-primary fixed-bottom'>
                <Link to={`/user/${uid}`}>
                    <i className='fas fa-user' />
                </Link>
            </nav>

    </div>
        );
    }
}
