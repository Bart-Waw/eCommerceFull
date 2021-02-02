import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {ItemsPage} from './pages/ItemsPage';
import {ItemPage} from './pages/ItemPage';
import {CartPage} from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage'
import { ShippingPage } from './pages/ShippingPage';
import { PaymentPage } from './pages/paymentPage';
import { PlaceOrderPage } from './pages/placeOrderPage';
import { logout } from './actions/userActions';
import { LogoutPage } from './pages/LogoutPage';

// sidebar moved to utils.js

function App() {

    const dispatch = useDispatch();
    
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const handleLogout = () => {
        dispatch(logout());
        window.location.reload(false);
    };

    return (
        <BrowserRouter>
        <div className="grid-container">
            <header className="header">
                <div className="brand">
                        <div className='header-link'><Link to ='/'>eCommerce</Link></div>
                </div>
                <div className="header-links">
                    {
                        userInfo ?
                            <div className='logged-link'>Logged as:<div className='header-link'><Link to ={ userInfo.name === 'Admin' ? '/items' : '/profile'}>{userInfo.name}</Link></div></div>
                        :
                            <div className='header-link'><Link to ='/Login'>Log In</Link></div>
                    }
                    {
                        userInfo && <div><button className='header-button' onClick={handleLogout}><Link to ='/LogoutPage'>Log Out</Link></button></div>
                    }
                    <div className='header-link'><Link to ='/cart'>Cart</Link></div>
                </div>
            </header>

            <main className="main">
                <div className="content">
                <Route path="/items" component={ItemsPage} />
                <Route path="/LogIn" component={LoginPage} />
                <Route path="/LogoutPage" component={LogoutPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/item/:id" component={ItemPage} />
                <Route path="/cart/:id?" component={CartPage} />
                <Route path="/shipping" component={ShippingPage} />
                <Route path="/payment" component={PaymentPage} />
                <Route path="/placeOrder" component={PlaceOrderPage} />
                <Route path="/" component={HomePage} exact={true} />
                </div>
            </main>
            <footer className="footer">
                This is a fictional website.
            </footer>
        </div>
        </BrowserRouter>
    );
}

export default App;
