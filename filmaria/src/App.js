import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

function App() {
  return (
    <div className="App">
       <Routes/>
       <ToastContainer autoClose={3000} />
    </div>
     
  );
}

export default App;