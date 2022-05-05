import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Navbar, Nav, Badge, NavDropdown, Container} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useContext} from "react";
import {Store} from "./Store";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreens/ProductScreen";
import CartScreen from "./screens/orderScreens/CartScreen";
import SignInScreen from "./screens/userScreens/SignInScreen";
import ShippingAddressScreen from "./screens/orderScreens/ShippingAddressScreen";
import SignupScreen from "./screens/userScreens/SignupScreen";
import PaymentMethodScreen from "./screens/orderScreens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/orderScreens/PlaceOrderScreen";
import OrderScreen from "./screens/orderScreens/OrderScreen";
import OrderHistoryScreen from "./screens/orderScreens/OrderHistoryScreen";
import ProfileScreen from "./screens/userScreens/ProfileScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

const App = () => {
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {cart, userInfo} = state;

    const signoutHandler = () => {
        ctxDispatch({type: "USER_SIGNOUT"});
        localStorage.removeItem("userInfo");
        localStorage.removeItem("shippingAddress");
        localStorage.removeItem("paymentMethod");
        window.location.href = "/signin";
    };

    return (
        <BrowserRouter>
            <div className={"site-container d-flex flex-column"}>
                <ToastContainer position="bottom-center" limit={1}/>
                <header>
                    <Navbar bg="primary" variant="dark" expand="lg">
                        <Container>
                            <LinkContainer to="/">
                                <Navbar.Brand><i className="fa-solid fa-house"></i> Card Zone</Navbar.Brand>
                            </LinkContainer>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <SearchBox/>
                                <Nav className="me-auto  w-100  justify-content-end">
                                    <Link to="/cart" className="nav-link"><i
                                        className="fa-solid fa-cart-shopping"></i> Cart
                                        {cart.cartItems.length > 0 && (
                                            <Badge pill bg="secondary">
                                                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                            </Badge>
                                        )}
                                    </Link>

                                    {userInfo ? (
                                        <NavDropdown
                                            title={<span><i className="fa-solid fa-user"></i> {userInfo.name}</span>}
                                            id="basic-nav-dropdown">
                                            <LinkContainer to="/profile">
                                                <NavDropdown.Item>User Profile</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/orderhistory">
                                                <NavDropdown.Item>Order History</NavDropdown.Item>
                                            </LinkContainer>
                                            <NavDropdown.Divider/>
                                            <Link className="dropdown-item" to="#signout" onClick={signoutHandler}>
                                                Sign Out <i className="fa-solid fa-right-from-bracket"></i>
                                            </Link>
                                        </NavDropdown>
                                    ) : (
                                        <Link className="nav-link" to="/signin">
                                            <i className="fa-solid fa-right-to-bracket"></i> Sign In
                                        </Link>
                                    )}
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </header>
                <main>
                    <Container className="mt-3">
                        <Routes>
                            <Route path="/product/:slug" element={<ProductScreen/>}/>
                            <Route path="/cart" element={<CartScreen/>}/>
                            <Route path="/search" element={<SearchScreen/>}/>
                            <Route path="/signin" element={<SignInScreen/>}/>
                            <Route path="/signup" element={<SignupScreen/>}/>
                            <Route path="/profile" element={<ProtectedRoute><ProfileScreen/></ProtectedRoute>}/>
                            <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
                            <Route path="/order/:id" element={<ProtectedRoute><OrderScreen/></ProtectedRoute>}></Route>
                            <Route path="/orderhistory"
                                   element={<ProtectedRoute><OrderHistoryScreen/></ProtectedRoute>}></Route>
                            <Route path="/shipping" element={<ShippingAddressScreen/>}></Route>
                            <Route path="/payment" element={<PaymentMethodScreen/>}></Route>
                            <Route path="/" element={<HomeScreen/>}/>
                        </Routes>
                    </Container>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    );
};

export default App;
