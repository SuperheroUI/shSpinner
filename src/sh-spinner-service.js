import React from 'react';
import ReactDOM from 'react-dom';
import ShSpinner from './sh-spinner';


const rootElement = document.createElement('div');
rootElement.classList.add('sh-modal-Dialog-wrapper');
document.body.appendChild(rootElement);

class ShToastService {
    constructor(label, cssClass, element) {
        this.label = label;
        this.cssClass = cssClass || '';
        this.timeDiff = null;
        this.timeNow = null;
        this.element = element;

    }

    open() {
        return new Promise((resolve) => {
            let timer = 60000;
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

            ReactDOM.render(
                <ShSpinner shClass={this.cssClass}
                           shLabel={this.label}
                           shTimer={timer}
                           shSuccess={resolve}
                />
                , this.element);
        });
    }

    close() {
        this.timeDiff = Date.now() - this.timeNow;
        if (typeof(Storage) !== 'undefined') {
            localStorage.setItem('timer', this.timeDiff);
        } else {
            console.error('storage unusable no load times will be saved')
        }

        ReactDOM.unmountComponentAtNode(this.element);
    }
}

export default ShToastService
