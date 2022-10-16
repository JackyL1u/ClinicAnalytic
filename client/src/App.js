import { Provider } from 'react-redux'
import store from './context/store'
import Router from './Router';

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}