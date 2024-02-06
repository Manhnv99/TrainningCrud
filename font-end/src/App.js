import './App.css';
import Home from "./components/pages/home";
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/font/fontawesome-free-6.5.1-web/css/all.css'
import {Toastmessage} from "./components/pages/toastmessage";



function App() {
      return (
          <div className="App">
              <Home/>
              <Toastmessage/>
          </div>
      );
}

export default App;
