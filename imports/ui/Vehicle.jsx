import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import {Vehicles} from'../api/vehicles';

import Menu from '../inc/Menu';
import Sidebar from '../inc/Sidebar';

export default class Vehicle extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            error: '',
            message: ''
        };
        if (Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','plot-owner','flat-owner','tenant']) === false){
            browserHistory.replace('/property');
        }

        console.log(localStorage.getItem('has_property_id'));
    }
  
    onSubmit(e) {
        this.setState({error: ''});
        this.setState({message: ''});
        const property_id = localStorage.getItem('has_property_id');
        var flat = this.refs.flat_id.value.trim();
        var flat_id =  property_id + flat;
        const vehicle_type = this.refs.vehicle_type.value.trim();
        const registration_no = this.refs.registration_no.value.trim();
        const manufacturer = this.refs.manufacturer.value.trim();
        const model_no = this.refs.model_no.value.trim();

    
    
    
        e.preventDefault();
    
        
          Meteor.call('vehicles.insert', flat_id, vehicle_type, registration_no, manufacturer, model_no,    (err, res) => {
              if(err){
                  this.setState({error: err.reason});
                //   console.log(this.state.error);
              }else { 
                  this.setState({message: 'Successfully added!!!'});
                  this.refs.flat_id.value = '';
                  this.refs.vehicle_type.value = '';
                  this.refs.registration_no.value = '';
                  this.refs.manufacturer.value = '';
                  this.refs.model_no.value = '';
    
                // browserHistory.replace('plot-owner');
                }
          });
          
        
      }

  render() {
    return (
      <div>

<Menu />

        <div className="main-container">
            <section className="bg--secondary space--sm">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <Sidebar />
                        </div>
                        <div className="col-lg-8">
                            <div className="boxed boxed--lg boxed--border">
                                <div id="account-profile" className="account-tab">
                                {this.state.error ? <p className="alert bg--error">{this.state.error}</p> : undefined}
                                {this.state.message ? <p className="alert bg--success">{this.state.message}</p> : undefined}
                                    <h4>Vehicle</h4>
                                    <form  onSubmit={this.onSubmit.bind(this)}>
                                        <div className="row">
                                        
                                        <div className="col-md-6">
                                                <label>Flat No:</label>
                                                <input type="text" ref="flat_id" />
                                            </div>
                                            <div className="col-md-6">
                                                <label>Vehicle Type:</label>
                                                <input type="text" ref="vehicle_type" />
                                            </div>
                                            <div className="col-md-6">
                                                <label>Registration No</label>
                                                <input type="text" ref="registration_no" />
                                            </div>
                                            <div className="col-md-6">
                                                <label>Manufacturer:</label>
                                                <input type="text" ref="manufacturer" />
                                            </div>
                                            <div className="col-md-6">
                                                <label>Model No:</label>
                                                <input type="text" ref="model_no" />
                                            </div>
                                            
                                            
                                            <div className="col-lg-3 col-md-4">
                                                <button type="submit" className="btn btn--primary type--uppercase">Save</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="footer-3 text-center-xs space--xs ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img alt="Image" className="logo" src="../img/logo-dark.png" />
                            <ul className="list-inline list--hover">
                                <li className="list-inline-item">
                                    <a href="#">
                                        <span className="type--fine-print">Get Started</span>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#">
                                        <span className="type--fine-print">help@stack.io</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 text-right text-center-xs">
                            <ul className="social-list list-inline list--hover">
                                <li className="list-inline-item">
                                    <a href="#">
                                        <i className="socicon socicon-google icon icon--xs"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#">
                                        <i className="socicon socicon-twitter icon icon--xs"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#">
                                        <i className="socicon socicon-facebook icon icon--xs"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#">
                                        <i className="socicon socicon-instagram icon icon--xs"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p className="type--fine-print">
                                Supercharge your web workflow
                            </p>
                        </div>
                        <div className="col-md-6 text-right text-center-xs">
                            <span className="type--fine-print">&copy;
                                <span className="update-year"></span> Stack Inc.</span>
                            <a className="type--fine-print" href="#">Privacy Policy</a>
                            <a className="type--fine-print" href="#">Legal</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
      </div>
    );
  }
}
