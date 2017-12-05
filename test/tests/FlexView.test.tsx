import * as React from 'react';
import * as renderer from 'react-test-renderer';
import FlexView from '../../src';

describe('FlexView', () => {

  it('renders correctly', () => {
    const component = renderer.create(
      <FlexView
        vAlignContent='center'
        hAlignContent='right'
        grow
        shrink
        wrap
      >
        CONTENT
      </FlexView>
    );
    expect(component).toMatchSnapshot();
  });

});
