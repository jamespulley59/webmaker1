import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// defines website properties 
export default class WebsiteEdit extends Component {
    state = {
        uid: this.props.match.params.uid,
        wid: this.props.match.params.wid,
        websites: [],
        name: '',
        description: ''
    };

// confirms website exists
    async componentDidMount() {
        const isLoggedIn = await this.props.loggedIn();
        if (isLoggedIn === 0) {
          this.props.history.push('/login');
          return;
        }
        const res = await axios.get(`/api/user/${this.state.uid}/website`); 
            await this.filterWebsites(res.data);
                this.getWebsite(this.state.wid);
    }

// confirms who made it
    filterWebsites = websites => {
        const newWebsites = websites.filter(
            website => website.developerId === this.state.uid
        );
        this.setState({
            websites: newWebsites
        });
    };

// describes new website
    getWebsite = wid => {
        let currentWeb;
        for (let website of this.state.websites) {
            if (website._id === wid) {
                currentWeb = website;
                break;
            }
        }
        this.setState({
            name: currentWeb.name,
            description: currentWeb.description
        });
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

// deletes data
    delete = async () => {
        await axios.delete(`/api/website/${this.state.wid}`);
        this.props.history.push(`/user/${this.state.uid}/website`);
    };

// also adds data
    onSubmit = async e => {
        e.preventDefault();        
        const newWeb = {
            _id: this.state.wid,
            name: this.state.name,
            description: this.state.description,
            developerId: this.state.uid
        }
        await axios.put('/api/website', newWeb);
        this.props.history.push(`/user/${this.state.uid}/website`);
    };


render() {
    // added wid, to below const to fix error message 
    const { uid, wid} = this.state;

return (

    <div>
        <nav className='navbar navbar-light bg-primary fixed-top row'>
            <div className='col-lg-4 d-none d-lg-block text-center text-white'>
                <Link className='float-left' to={`/user/${uid}/website`}>
                    <i className='fas fa-chevron-left' />
                </Link>
                {/* deleted 'className='' ' from below span*/}
                    <span>Websites</span>
                <Link className='float-right' to={`/user/${uid}/website/${wid}/page`}>
                    <i className='fas fa-plus' />
                </Link>
            </div>

            <div className='col-lg-8 text-center text-white'>
                <Link className='d-lg-none float-left' to={`/user/${uid}/website`}>
                    <i className='fas fa-chevron-left'/>
                </Link>
                    <span className=''>Edit Website</span>
                <button form="editWebForm" className="float-right btn">
                    <i className="fas fa-check" />
                </button>
            </div>
        </nav>

        <div className='row'>
            <div className='col-4 d-none d-sm-block'>
                <div className='container-fluid'>
                    <ul className='list-group'>
                        {this.state.websites.map(website => (
                        <li key={website._id} className='list-group-item'>
                            <Link to={`/user/${uid}/website/${website._id}/page`}> 
                                {website.name} 
                            </Link>
                            <Link
                                to={`/user/${uid}/website/${website._id}`} className='float-right'>
                                    <i className='fas fa-cog'></i>
                            </Link>     
                        </li>             
                        ))}
                    </ul>
                </div>
            </div>        
                            
            <div className='col-sm-8'>
                <div className='container-fluid'>
                    <form id='editWebForm' onSubmit={this.onSubmit}>
                        <div className='form-group'>
                            <label htmlFor='name'>
                                <b>Name</b>
                            </label>
                            <input  id='name'
                                    name='name'
                                    className='form-control'
                                    type='text'
                                    placeholder='Name of this Website'
                                    value={this.state.name}
                                    onChange={this.onChange}/>
                         </div>                       
                        
                        <div className='form-group'>
                            <label htmlFor='description'>
                                <b>Description</b>
                            </label>
                            <textarea   id='description'
                                        name='description'
                                        rows='5'
                                        className='form-control'
                                        type='text'
                                        value={this.state.description}
                                        onChange={this.onChange}
                                        placeholder='Describe this Website'/>
                        </div>        
                        
                        <Link to={`/user/${uid}/website`}
                            className='btn btn-lg btn-warning'>                        
                            Cancel
                        </Link>
                        <button type='button'
                                onClick={this.delete}
                                className='btn btn-lg btn-danger float-right'>
                             Delete
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <nav className='navbar navbar-dark bg-primary fixed-bottom'>
            <div className='full-width'>
                <Link className='color-white float-right'
                        to={`/user/${uid}`}
                >   <i className='fas fa-user' />
                </Link>
            </div>
        </nav>
        
    </div>
        );
    }
}                            
                                    
                                
                                
                           
                        

            
                    

               