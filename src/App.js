import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ShopPage from './Pages/ShopPage/ShopPage';
import SignInSignUp from './Pages/SignInSignUp/SignInSignUp';
import Header from './Components/Header/Header';
import { auth, createUserProfileDocument } from './Firebase/Firebase';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/UserActions';
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './Pages/CheckoutPage/CheckoutPage';

// functional component gives same result as class component below




// function App() {
//   const [currentUser, setCurrentUser] = useState(null);

//   //useEffect in place of componentdidmount and componentwillunmount
//   useEffect(() => {
//     const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
//       if (userAuth){
//         const userRef = await createUserProfileDocument(userAuth);
//         userRef.onSnapshot(snapShot => {
          
//           setCurrentUser({
//             'id': snapShot.id,
//             ...snapShot.data()
//           })
//           console.log('.............add.........')
//           console.log(snapShot.data())
//         })
//       }else{
//         setCurrentUser(userAuth);
//         console.log('here')
//       }
//     });
    
//     return() => unsubscribeFromAuth();
//   }, [])

class App extends React.Component{
  

  unsubscribeFromAuth = null;
  
  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })
        })
      }

      setCurrentUser(userAuth)
    });
  }
  
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render(){
    return (
    
      <Router>
          <div>
            {/* Current user props passed in to determine sign in or sign out */}
            <Header/>
            <Switch>
                

                <Route exact path="/shop">
                  <ShopPage/>
                </Route>

                <Route exact path="/checkout">
                  <CheckoutPage/>
                </Route>                

                <Route
                 exact 
                 path='/signin'
                 render={() => this.props.currentUser ? (
                  <Redirect to = '/' />
                 ) : (
                  <SignInSignUp />
                 )}
                 />

                <Route path="/">
                  <HomePage/>
                </Route>
            </Switch>
          </div>
      </Router>   
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);
