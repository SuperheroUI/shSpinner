import React from 'react';
import TestUtils from 'react-dom/lib/ReactTestUtils';
import ShSpinner from './sh-spinner';

describe('root', function() {
    it('renders without problems', function() {
        let value = true;
        let root = TestUtils.renderIntoDocument(<ShSpinner />);
        expect(root.refs.shLoaderPath).toBeTruthy();
    });
});
