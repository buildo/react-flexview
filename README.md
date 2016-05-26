# FlexView
A react component to abstract over flexbox

## Install
`npm i --save react-flexview`

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

`flexbox` is complex... If you need more help you can read this [blogpost](https://paper.dropbox.com/doc/How-to-FlexView-gMIxUHhNX3xtRfrFE4wlK)

## Demo
[demo](http://rawgit.com/buildo/react-flexview/master/dev/build/#/)

## API
[API](https://paper.dropbox.com/doc/How-to-FlexView-gMIxUHhNX3xtRfrFE4wlK#:h2=API---Let’s-get-serious)

## Guide
[blogpost](https://paper.dropbox.com/doc/How-to-FlexView-gMIxUHhNX3xtRfrFE4wlK)
