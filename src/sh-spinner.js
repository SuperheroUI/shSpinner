import React from 'react';
import * as _ from 'lodash';
import './sh-spinner.scss';

class ShSpinner extends React.Component {

    constructor(props) {
        super(props);
        this.size = 100;
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    startLoading(size) {
        let netSize = size - 10;
        let half = netSize / 2;
        let svg;
        let path;
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
                return path;
            })
        };

        setupSvg().then((path) => {
            let loader = path,
                start = 0,
                pie = Math.PI,
                speed = 30;

            const draw = function () {
                start++;

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
        this.startLoading(this.size);
    }

    render() {
        let {...other} = this.props;
        return (
            <div className="sh-loader" ref="shLoader" {...other}>
                <svg ref="svg" className="sh-loader-svg">
                    <path ref='shLoaderPath' className="sh-loader-path"/>
                    <circle ref='shLoaderBck' cx="100" cy="100" r="100" className="sh-loader-bck"/>
                </svg>
                <svg ref="svgBck" className="sh-loader-svg">

                </svg>
                <div className="sh-loader-text">
                    <div className="sh-label">{this.props.label}</div>
                </div>
            </div>
        )
    }
}

ShSpinner.propTypes = {
    label: React.PropTypes.string
};

export default ShSpinner;