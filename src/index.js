import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import NavBar from './components/common/NavBar';
import ProductList from './components/products/ProductList';
import ProductDetails from './components/products/ProductDetails';
import MyCart from './components/cart/MyCart';
import PageNotFound from './components/errors/404';
import CheckOut from './components/cart/Checkout';
import './index.css';

const localGraphQL = 'http://localhost:4000';
export const client = new ApolloClient({
  uri: localGraphQL,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <NavBar></NavBar>
            <Routes>
              <Route exact path="" element={<ProductList />} />
              <Route exact path="product/:id" element={<ProductDetails />} />
              <Route exact path="cart" element={<MyCart />} />
              <Route exact path="checkout" element={<CheckOut />} />
              <Route exact path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
