import React from 'react'
import Button from './Button';
import { Link } from 'react-router-dom';
import Card from './Card'
import Header from './Header';
import '../css/AdminView.css'
//import MovieShowForm from './AddMovieShowForm'
function AdminView () {
	return (
      <div>
			<Header/>
			<div className= "admin-cover">
			<div className= "admincard">
				<h2 className='adminView'>Admin View</h2>
            <Link to="/addMovies" style={{ textDecoration: 'none' }}>
		        <Button className="button-admin">
			        Manage Movies Page	
		        </Button>
	        </Link>

            <Link to="/editPromotions" style={{ textDecoration: 'none' }}>
		        <Button className="button-admin">
			        Promotions Page
		        </Button>
	        </Link>
			<Link to="/addMovieShow" style={{ textDecoration: 'none' }}>
		        <Button className="button-admin">
			        Add Movie Show
		        </Button>
	        </Link>

			</div>
        </div>  

				<footer className="footer" style={{ backgroundColor: '#f5e9e6', marginTop: '0px', marginBottom: '0px'}}>
                <p>© 2024 Dohee Kim. All rights reserved.</p>
            </footer>
				</div>
				
    )	
    }
export default AdminView