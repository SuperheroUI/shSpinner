import React from 'react';
import './sh-spinner.scss';
import ShSpinnerSVG from './sh-spinner-svg';

class LoadingTimer extends React.Component {
    constructor(props) {
        super(props);
        this.timeDiff = null;
        this.timeNow = null;
        this.state = {
            show: false,
            timer: 3000,
            closing: false
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.shToggleSpinner) {
            this.open();
        }

        if (!props.shToggleSpinner) {
            this.close();
        }
    }

    open() {
        let timer = 3000;
        this.timeNow = Date.now();

        if (typeof(Storage) !== 'undefined') {
            if (localStorage.getItem('timer') === null) {
                localStorage.setItem('timer', timer);
            } else {
                timer = localStorage.getItem('timer');
            }
        } else {
            console.error('storage unusable no load times will be saved')
        }
        this.setState({show: true})
    }

    close() {
        this.setState({
            closing: true
        }, () => {
            setTimeout(() => {
                this.timeDiff = Date.now() - this.timeNow;
                if (typeof(Storage) !== 'undefined') {
                    localStorage.setItem('timer', this.timeDiff);
                } else {
                    console.error('storage unusable no load times will be saved')
                }

                this.setState({
                    show: false,
                    timer: this.timeDiff
                })
            }, 500)
        });
    }

    spinner() {
        if (this.state.show) {
            return <ShSpinnerSVG shLabel={this.props.shLabel} shTimer={this.state.timer} shClosing={this.state.closing}/>
        }
    }

    render() {
        return (
            <div className={this.props.shClass + ' sh-loader'}>
                {this.spinner()}
            </div>
        )
    }
}

LoadingTimer.propTypes = {
    shLabel: React.PropTypes.string,
    shClass: React.PropTypes.string,
    shToggleSpinner: React.PropTypes.bool,
    shComponentName: React.PropTypes.string
};

export default LoadingTimer;