import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//Routing
import PrivateRoute from './components/routing/PrivateRoute'
// Screens
import PrivateScreen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/Login/LoginScreen';
import RegisterScreen from './components/screens/Register/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPassword/ForgotPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPassword/ResetPasswordScreen';
import Rooms from './components/screens/Rooms/Rooms';
import Chat from './components/screens/Chat/Chat';

const App = () => {
  return (
    <Router>

      <div className="App">
        <Switch>
          <PrivateRoute exact  path="/" component={PrivateScreen} />
          <PrivateRoute exact  path="/join" component={Rooms} />
          <PrivateRoute exact  path="/chat" component={Chat} />
          
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/forogotpassword" component={ForgotPasswordScreen} />
          <Route exact path="/passwordreset:resetToken" component={ResetPasswordScreen} />
        </Switch>
      </div>

    </Router>
  );
}

export default App;
