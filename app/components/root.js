import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCampuses, getStudents } from '../reducers';

import Nav from './Nav';
import Home from './Home';
import Students from './Students';
import Campuses from './Campuses';
import EditCampus from './EditCampus';
import EditStudent from './EditStudent';
import CreateStudent from './CreateStudent';
import CreateCampus from './CreateCampus';
import Student from './Student';
import Campus from './Campus';
import Footer from './Footer';

class Root extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Nav />
          <div className='container-fluid'>
            <Switch>
              <Route path='/students/:id' component={ Student } />
              <Route path='/campuses/:id' component={ Campus } />
              <Route path='/editstudent/:id' component={ EditStudent } />
              <Route path='/editcampus/:id' component={ EditCampus } />
              <Route path='/createstudent' component={ CreateStudent } />
              <Route path='/createcampus' component= { CreateCampus } />
              <Route path='/students' component={ Students } />
              <Route path='/campuses' component={ Campuses } />
              <Route exact path='/' component={ Home } />
            </Switch>
          </div>
          <Footer />
        </div>
      </HashRouter>
    );
  }


  const mapDispatch = dispatch => ({
    fetch() {
      dispatch(getCampuses());
      dispatch(getStudents());
    }
  });

export default connect(null, mapDispatchToProps)(Root);
