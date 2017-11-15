import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory, IndexRoute, Switch } from 'react-router-dom';
import { App, Home, Login, Register } from 'containers';

//write by my tablet

const rootElement = document.getElementById('root');
ReactDOM.render(
    // <Router history={browserHistory}>
    //     <Route path="/" component={App}>
    //         <IndexRoute component={Home} />
    //         <Route path="home" component={Home} />
    //         <Route path="login" component={Login} />
    //         <Route path="register" component={Register} />
    //     </Route>
    // </Router>
    <Router history={browserHistory}>
        <div>
            <Route path="/" component={App}/>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Switch>
        </div>
    </Router>
    , rootElement
);
if (module.hot) {
    module.hot.accept();
}