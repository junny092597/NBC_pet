import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from './redux/Store';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/Global-styles';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RecoilRoot>
    <Provider store={Store}>
    <BrowserRouter>
      <GlobalStyles />
      <App />
    </BrowserRouter>
    </Provider>
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
