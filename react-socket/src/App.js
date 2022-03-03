import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";

function App() {

    function subscriptionCallback(iMessage) {
        console.log('Received message: ' + JSON.stringify(iMessage));
    }

    useEffect(() => {
        // See https://stomp-js.github.io/guide/stompjs/rx-stomp/ng2-stompjs/using-stomp-with-sockjs.html#usage
        // eslint-disable-next-line no-undef
        const client = new StompJs.Client({
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.webSocketFactory = function () {
            // Testing with just WebSocket enabled:
            // eslint-disable-next-line no-undef
            // return new SockJS('http://localhost:8080/websocket', null, {transports: ["websocket"]});
            // eslint-disable-next-line no-undef
            return new SockJS('https://websocket-test.apps.gmdcpt01.gmd.local:443/websocket', null, {transports: ["websocket"]});

            // Testing without WebSocket enabled:
            // eslint-disable-next-line no-undef
            // return new SockJS('http://localhost:8080/websocket', null, {transports: ["xhr-polling"]});
        };

        client.onConnect = function (frame) {
            console.log('onConnect frame is: ' + JSON.stringify(frame))
            // Do something, all subscribes must be done is this callback
            // This is needed because this will be executed after a (re)connect
            client.subscribe('/topic', subscriptionCallback, {user: 'ExampleUsername'});
        };

        client.onStompError = function (frame) {
            // Will be invoked in case of error encountered at Broker
            // Bad login/passcode typically will cause an error
            // Complaint brokers will set `message` header with a brief message. Body may contain details.
            // Compliant brokers will terminate the connection after any error
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };

        client.activate();
    })

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
            </header>
        </div>
    );
}

export default App;
