import React from 'react';
import ReactDOM from 'react-dom';
import t from 'tcomb';
import { Route, create } from 'react-router';
import find from 'lodash/find';
import includes from 'lodash/includes';
import pick from 'lodash/pick';
import KitchenSink from 'buildo-react-components/lib/kitchen-sink';
import sections from './examples/index.js';
import FlexView from '../src';

import './examples.scss';
import '../src/flexView.scss';

/* KitchenSink styles */
import 'buildo-react-components/src/kitchen-sink/style.scss';
import 'buildo-react-components/src/more-or-less/moreOrLess.scss';
import 'buildo-react-components/src/loading-spinner/style.scss';

const log = (...args) => console.log(...args); // eslint-disable-line no-console

const scope = {
  React, ReactDOM,
  t, log,
  includes, pick,
  FlexView
};

class Examples extends React.Component {

  constructor(props) {
    super(props);
    this.state = { openSections: sections.map(s => s.id) };
  }

  findSection = (id) => find(sections, { id })

  onSelectItem = (sectionId, id) => {
    const isComponent = this.findSection(sectionId).components;
    const componentId = isComponent ? id : undefined;
    const contentId = isComponent ? undefined : id;
    this.props.router.transitionTo('/', null, { componentId, contentId, sectionId });
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    });
  }

  onToggleSection = (sectionId) => {
    const { openSections } = this.state;
    if (includes(openSections, sectionId)) {
      this.setState({ openSections: openSections.filter(s => s !== sectionId) });
    } else {
      this.setState({ openSections: openSections.concat(sectionId) });
    }
  }

  render() {
    const {
      props: { query: { componentId, contentId, sectionId } },
      state: { openSections, loading },
      onSelectItem, onToggleSection
    } = this;

    return (
      <div style={{ padding: 100 }}>
        <KitchenSink
          {...{
            scope,
            sections,
            loading,
            componentId,
            contentId,
            sectionId,
            onSelectItem,
            onToggleSection,
            openSections
          }}
        />
      </div>
    );
  }
}


const routes = (
  <Route path='/' handler={Examples} />
);

const router = create({ routes });

router.run((Handler, { query }) => {
  // RENDERS
  ReactDOM.render(<Examples router={router} query={query} />, document.getElementById('container'));
});
