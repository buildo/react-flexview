import examplesJSON from 'raw!./examples.json';

const json = JSON.parse(examplesJSON);

function dynamicRequire(e) {
  const fileName = e.split('.')[0];
  return require(`raw!./${fileName}.example`);
}

const components = json.components.map(c => ({
  ...c,
  examples: c.examples.map(dynamicRequire)
}));

export default [{ ...json, components }];
