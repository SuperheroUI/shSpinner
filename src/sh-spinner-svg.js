import React from 'react';
import * as _ from 'lodash';
import ShCore from 'sh-core';

class ShSpinner extends React.Component {
    constructor(props) {
        super(props);
        this.size = 100;

        this.state = {
            boxSize: {
                width: this.size,
                height: this.size
            },
            timer: this.props.shTimer,
            classList: {
                shLoaderSvgs: true,
                shFadeIn: false
            }
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.startLoading = this.startLoading.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.shTimer != this.state.timer) {
            this.setState({
                timer: props.shTimer
            })
        }

        if (props.shClosing) {
            this.setState({
                classList: {
                    shLoaderSvgs: true,
                    shFadeIn: false
                }
            })
        }
    }

    startLoading(size) {
        let netSize = size - 10;
        let half = netSize / 2;
        let svg;
        let path;
        let runCount = 0;
        const setupSvg = () => {
            return Promise.resolve().then(() => {
                let bck = this.refs.shLoaderBck;
                let crcx = size / 2;
                let r = size / 2 - 5;

                bck.setAttribute('cx', crcx);
                bck.setAttribute('cy', crcx);
                bck.setAttribute('r', r);

                svg = this.refs.svg;
                path = this.refs.shLoaderPath;
                svg.setAttribute('size', size);
                svg.setAttribute('height', size);
                svg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);
                path.setAttribute('transform', 'translate(' + size / 2 + ',' + size / 2 + ')');
                path.setAttribute('stroke', '#3AB676');
                return path;
            })
        };

        setupSvg().then((path) => {
            let loader = path,
                start = 0,
                pie = Math.PI,
                speed = this.props.shTimer / 360;

            const draw = function () {
                start++;
                if (start % 360 === 359) {
                    runCount++
                }

                if (runCount === 1) {
                    path.setAttribute('stroke', '#E78F2B');
                }
                if (runCount >= 2) {
                    path.setAttribute('stroke', '#B25245');
                }

                start %= 360;
                let r = ( start * pie / 180 ),
                    x = Math.sin(r) * half + ' ',
                    y = Math.cos(r) * -half + ' ',
                    M = 'M',
                    GoTo = '0 ' + -half + ' ',
                    A = 'A ',
                    xRadius = half + ' ',
                    yRadius = half + ' ',
                    xAxsisRotation = '1 ',
                    sweep = '1 ',
                    largeArcSweep = ( start > 180 ) ? 1 : 0 + ' ',
                    ArcOne = A + xRadius + yRadius + xAxsisRotation + largeArcSweep + sweep + x + y;

                let d = M + GoTo + ArcOne;

                loader.setAttribute('d', d);
                setTimeout(draw, speed); // Redraw
            };

            draw()
        })
    }

    componentDidMount() {
        let box = this.refs.shLoader.getBoundingClientRect();
        this.size = _.min([box.height, box.width]);
        this.setState({
            boxSize: {
                width: this.size,
                height: this.size
            }
        });

        this.startLoading(this.size);

        setTimeout(() => {
            this.setState({
                classList: {
                    shLoaderSvgs: true,
                    shFadeIn: true
                }
            })
        }, 100)
    }

    render() {
        return (
            <div ref="shLoader" className={ShCore.getClassNames(this.state.classList)} >
                <svg ref="svg" className="sh-loader-svg">
                    <path ref='shLoaderPath' className="sh-loader-path"/>
                    <circle ref='shLoaderBck' cx="100" cy="100" r="100" className="sh-loader-bck"/>
                </svg>
                <svg ref="svgBck" className="sh-loader-svg">

                </svg>
                <div className="sh-loader-text" style={this.state.boxSize}>
                    <div className="sh-label">{this.props.shLabel}</div>
                </div>
            </div>
        )
    }
}

ShSpinner.propTypes = {
    shLabel: React.PropTypes.string,
    shTimer: React.PropTypes.any,
    shSuccess: React.PropTypes.func,
};

export default ShSpinner;