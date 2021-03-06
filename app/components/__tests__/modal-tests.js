'use strict';
/* global jest, require, window */
jest.dontMock('../modal.jsx');

describe('Modal Tests', function() {
  var modal, TestUtils, onOpen, onClose;

  beforeEach(function() {
    var React = require('react');
    var Modal = require('../modal.jsx');
    TestUtils = require('react-addons-test-utils');
    window.loggedIn = true;
    onOpen = jest.genMockFunction();
    onClose = jest.genMockFunction();
    modal = TestUtils.renderIntoDocument(
      <Modal
        style="primary"
        name="Launch the missile"
        icon="rocket"
        onOpen={onOpen}
        onClose={onClose}
        >
        <h1>This should be the <small>island</small>.</h1>
      </Modal>
    );
  });

  it('should trigger open', function() {
    var button = TestUtils.findRenderedDOMComponentWithTag(
      modal, 'button'
    );
    expect(onOpen).not.toBeCalled();
    TestUtils.Simulate.click(button);
    expect(onOpen).toBeCalled();
  });

  it('should trigger close', function() {
    var button = TestUtils.findRenderedDOMComponentWithTag(
      modal, 'button'
    );
    TestUtils.Simulate.click(button);
    var heading = TestUtils.findRenderedDOMComponentWithTag(
      modal, 'h1'
    );
    expect(heading).toBeDefined();
    var close = TestUtils.scryRenderedDOMComponentsWithTag(
      modal, 'button'
    )[1];
    expect(onClose).not.toBeCalled();
    TestUtils.Simulate.click(close);
    expect(onClose).toBeCalled();
  });
});
