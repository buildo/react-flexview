# FlexView
A React component to abstract over flexbox

## Install
```
npm i --save react-flexview
```

## Hot to use
In your `app.js`

```js
import 'react-flexview/lib/flexView.css' // FlexView is useless without its style
```

In your component

```jsx
import React from 'react';
import FlexView from 'react-flexview';

export default class Component extends React.Component {
  render() {
    return (
      <FlexView vAlignContent='center'>
        I'm vertically aligned!
      </FlexView>
    );
  }
}
```


## Demo
Here's a [live demo](http://rawgit.com/buildo/react-flexview/master/dev/build/#/)

## Documentation
Refer to the [Book of FlexView](https://buildo.gitbooks.io/flexview/content/docs/Introduction.html)
