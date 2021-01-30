import './App.css';
import {HomePage} from './pages/HomePage';
import {ItemsPage} from './pages/ItemsPage';
import {ItemPage} from './pages/ItemPage';
import {CartPage} from './pages/CartPage';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { useSelector } from 'react-redux';
import { RegisterPage } from './pages/RegisterPage'


function App() {
    
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    
    function openMenu () {
        document.querySelector(".sidebar").classList.add("open");
    }

    function closeMenu () {
        document.querySelector(".sidebar").classList.remove("open");
    }

    return (
        <BrowserRouter>
        <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>☰</button>
                    <Link to ='/'>eCommerce</Link>
                </div>
                <div className="header-links">
                    {
                        userInfo ? <Link to ='/profile'>{userInfo.name}</Link> : <Link to ='/Login'>Log In</Link>
                    }
                    <Link to ='/cart'>Cart</Link>
                </div>
            </header>

            <aside className="sidebar">
                <div className="sidebar-header">
                    <h3>Shopping Categories</h3>
                    <button onClick={closeMenu}>✖</button>
                </div>
                <ul className="sidebar-main">
                    <li>
                        <a href="index.html">Shirts</a>
                    </li>
                    <li>
                        <a href="index.html">Jeans</a>
                    </li>
                </ul>
            </aside>

            <main className="main">
                <div className="content">
                <Route path="/items" component={ItemsPage} />
                <Route path="/LogIn" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/item/:id" component={ItemPage} />
                <Route path="/cart/:id?" component={CartPage} />
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
