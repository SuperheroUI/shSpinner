import React from 'react';
import TestUtils from 'react-dom/lib/ReactTestUtils';
import ShSpinner from './sh-spinner';

describe('root', function() {
    beforeEach(function () {
        jasmine.clock().install();
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });

    it('renders without problems', function(done) {
        let root = TestUtils.renderIntoDocument(<ShSpinner shToggleSpinner={true} shLabel={'Loading'} shClass={'monkey'}/>);
        jasmine.clock().tick(5000);

        expect(root).toBeTruthy();
        done();
    });


    it('renders when props change', function(done) {
        let root = TestUtils.renderIntoDocument(<ShSpinner shToggleSpinner={true} shLabel={'Loading'} shClass={'monkey'}/>);
        root.componentWillReceiveProps({shToggleSpinner: true});
        jasmine.clock().tick(5000);

        expect(root).toBeTruthy();
        console.log(root)
        done();
    });
});
