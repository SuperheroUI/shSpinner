import React from 'react';
import TestUtils from 'react-dom/lib/ReactTestUtils';
import ShSpinner from './sh-spinner';

describe('root', function () {
    beforeEach(function () {
        jasmine.clock().install();
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });

    it('renders without problems', function (done) {
        let root = TestUtils.renderIntoDocument(<ShSpinner shToggleSpinner={true} shLabel={'Loading'}
                                                           shClass={'monkey'}/>);
        jasmine.clock().tick(5000);
        expect(root).toBeTruthy();
        done();
    });

    it('make sure initial classes are added', function (done) {
        let root = TestUtils.renderIntoDocument(<ShSpinner shToggleSpinner={true} shLabel={'Loading'}
                                                           shClass={'monkey'}/>);
        jasmine.clock().tick(5000);
        let comp = TestUtils.findRenderedDOMComponentWithClass(root, 'sh-loader');
        expect(comp.classList).toContain('sh-loader');
        expect(comp.classList).toContain('monkey');
        done();
    });

    it('spinner opens when prop is received', function (done) {
        let root = TestUtils.renderIntoDocument(<ShSpinner shToggleSpinner={true} shLabel={'Loading'}
                                                           shClass={'monkey'}/>);
        root.componentWillReceiveProps({shToggleSpinner: true});
        jasmine.clock().tick(5000);
        let comp = TestUtils.findRenderedDOMComponentWithClass(root, 'sh-loader-svgs');
        expect(comp.classList).toContain('sh-loader-svgs');
        done()
    });
});
