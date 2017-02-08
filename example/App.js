import React from 'react'
import ReactDOM from 'react-dom';
import ShSpinner from '../bin/sh-spinner';
class App extends React.Component {

    render() {
        return <div className="container">
            <ShSpinner label="Loading..."/>
        </div>
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));