import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";

function App() {

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const sock = new SockJS('http://localhost:8080/websocket-sockjs');
    sock.onopen = function() {
      console.log('open');
      sock.send('my-username');
    };

    sock.onmessage = function(e) {
      console.log('message', e.data);
      // sock.close();
    };

    sock.onclose = function() {
      console.log('close');
    };
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
