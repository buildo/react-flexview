### Examples

#### Column
```js
<FlexView column height={120} hAlignContent='center' vAlignContent='center'>
  <div style={{ width: 30, height: 30, backgroundColor: '#1A91EB' }} />
  <div style={{ width: 30, height: 30, backgroundColor: '#D1236D' }} />
</FlexView>
```

#### Row
```js
class ComputeFlex extends React.Component {

  constructor() {
    this.state = {}
    this.updateOutput = this.updateOutput.bind(this);
  }

  componentDidMount() {
    this.updateOutput();
  }

  updateOutput() {
    this.setState({ flex: ReactDOM.findDOMNode(this.output).style.flex })
  }

  getValues() {
    const { grow, shrink, basis } = this.state;
    return {
      grow: grow === 'true' ? true : (grow === 'false' ? false : (parseInt(grow) || undefined)),
      shrink: shrink === 'true' ? true : (shrink === 'false' ? false : (parseInt(shrink) || undefined)),
      basis: String(parseInt(basis)) === basis ? parseInt(basis) : basis
    };
  }

  onChange(key) {
    return ({ target: { value } }) => {
      this.setState({ [key]: value });
      setTimeout(this.updateOutput);
    }
  }

  render() {
    const { grow = '', shrink = '', basis = '', flex } = this.state;

    return  (
      <div>
        <h2>Input</h2>
        <input placeholder='grow' value={grow} onChange={this.onChange('grow')} />
        <input placeholder='shrink' value={shrink} onChange={this.onChange('shrink')} />
        <input placeholder='basis' value={basis} onChange={this.onChange('basis')} />

        <FlexView {...this.getValues()} ref={ref => this.output = ref} />

        <h2>Output</h2>
        <input value={flex} readOnly />
      </div>
    );
  }
}

<ComputeFlex />
```
