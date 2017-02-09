import React from 'react'
import ReactDOM from 'react-dom';
import ShLoading from '../src/sh-spinner';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this)
    }

    open() {
        this.setState({
            show: true
        })
    }

    close() {
        this.setState({
            show: false
        })
    }

    render() {
        return <div className="container">
            <button onClick={this.open}>open</button>
            <button onClick={this.close}>close</button>
            <div className="loading">
                <ShLoading shToggleSpinner={this.state.show} shLabel={'Loading'} shClass={'monkey'} shKey{'prospect-list-api-call'}/>
            </div>
        </div>
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));