import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class PageList extends Component {

    state = {
        pid: '',
        uid: '',
        wid: '',
        pages: []    
    }

    async componentDidMount () {
        const isLoggedIn = await this.props.loggedIn();
        if (isLoggedIn === 0) {
          this.props.history.push('/login');
          return;
        }     
        await this.setState({
            pid: this.props.match.params.pid,
            uid: this.props.match.params.uid,
            wid: this.props.match.params.wid
        })
        this.filterPage(this.state.wid);
    }

    filterPage = async (wid) => {
        const res = await axios.get(`/api/website/${this.state.wid}/page`)
        this.setState({
            pages: res.data
        })
    }

render() {
// pid removed from line below
    const {uid, wid} = this.state;

return (

<div>
    <nav className='navbar navbar-light fixed-top bg-light'>
        <Link className='color-black' to={`/user/${uid}/website`}>
            <i className='fas fa-chevron-left' />
        </Link>
        <span className='navbar-brand'>
            Pages
        </span>
        <Link className='color-black' to={`/user/${uid}/website/${wid}/page/new`}>
            <i className='fas fa-plus' />
        </Link>            
    </nav>            

    <div className='container'>
        <ul className='list-group'>
            {
                this.state.pages.map((page) => (                 
                        <li key={page._id} className='list-group-item'>
                            <Link to={`/user/${uid}/website/${wid}/page/${page._id}/widget`}>{page.name}</Link>
                            <Link className='float-right' to={`/user/${uid}/website/${wid}/page/${page._id}`}>
                                <i className='fas fa-cog' />
                            </Link>
                        </li>                       
                    
                    )
                )
            }
             
        </ul>
    </div>

    <footer className='navbar navbar-light fixed-bottom bg-light'>
        <div className='full-width'>
            <Link className='color-black float-right' to={`/user/${uid}`}>    
                <i className='fas fa-user' />                
            </Link>
        </div>
    </footer>
                
</div>          
        );
    }
}    
