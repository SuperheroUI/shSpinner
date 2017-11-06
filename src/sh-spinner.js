import React from 'react';
import './sh-spinner.scss';
import ShSpinnerSVG from './sh-spinner-svg';

class LoadingTimer extends React.Component {
    constructor(props) {
        super(props);
        this.timeDiff = null;
        this.timeNow = null;
        this.state = {
            show: true,
            timer: 3000,
            closing: false,
            key: props.shKey
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    componentWillReceiveProps(props) {
        if (!props.shToggleSpinner) {
            this.close();
        }
        this.setState({
            key: props.shKey
        }, () => {
            if (props.shToggleSpinner) {
                this.open(props.shKey);
            }
        })
    }

    open(key) {
        let timer = 3000;
        this.timeNow = Date.now();
        try {
            if (typeof(Storage) !== 'undefined') {
                if (localStorage.getItem(key) === null) {
                    localStorage.setItem(key, timer);
                } else {
                    this.setState({
                        timer: localStorage.getItem(key)
                    }, () => {
                        this.setState({show: true})
                    })
                }
            } else {
                console.error('storage unusable no load times will be saved')
            }
        } catch (e) {
            // There was a problem using localStorage, so we won't save load times
        }
    }

    close() {
        this.setState({
            closing: true
        }, () => {
            setTimeout(() => {
                this.timeDiff = Date.now() - this.timeNow;
                try {
                    if (typeof(Storage) !== 'undefined') {
                        localStorage.setItem(this.state.key, this.timeDiff);
                    } else {
                        console.error('storage unusable no load times will be saved')
                    }
                } catch (e) {
                    // There was a problem using localStorage, so we won't save load times
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
            return <ShSpinnerSVG shLabel={this.props.shLabel} shTimer={this.state.timer}
                                 shClosing={this.state.closing}/>
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
    shKey: React.PropTypes.string,
    shLabel: React.PropTypes.string,
    shClass: React.PropTypes.string,
    shToggleSpinner: React.PropTypes.bool,
    shComponentName: React.PropTypes.string
};

LoadingTimer.defaultProps = {
    shKey: 'sh-timer',
    shClass: '',
    shLabel: 'Loading...'
};

export default LoadingTimer;