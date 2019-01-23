# FlexView
A powerful React component to abstract over *flexbox* and create any layout on any browser.

## Install
```
yarn add react-flexview
```

## Why
The *flexbox* API is powerful but far from being perfect.
The API is complex and there are still many inconsistencies between browsers that force developers to overuse vendor prefixes and literally do magic tricks to achieve the desired layout.

For these reasons, we asked ourselves: is there a way to simplify the API and handle any browser inconsistency in a single place? Our attempt to answer "yes!" to that question gave birth to `FlexView`.

```jsx
// flex row
<FlexView />

// flex column
<FlexView column />

// grow, shrink and basis
<FlexView grow shrink basis={100} />
<FlexView grow={2} shrink={1} basis='auto' />
<FlexView basis={100} /> // shrink is set to `false` by default so you're certain to a have it `100px` wide/tall

// wrap
<FlexView wrap />
```

Remember how difficult it was to center a `div` inside another `div`?
*flexbox* definitely improved it, but still having to switch from `align-items` to `justify-content` based on `flex-direction` of the parent is confusing and error prone.

`FlexView` lets you align and center `children` with two intuitive props: `vAlignContent` and `hAlignContent`.

```jsx
<FlexView hAlignContent='center' vAlignContent='center'>
  <FlexView>the center of the Earth</FlexView>
</FlexView>
```

## How to use
In your component:

```jsx
import React from 'react';
import FlexView from 'react-flexview';

export default class Component extends React.Component {
  render() {
    return (
      <FlexView vAlignContent='center'>
        I'm vertically centered!
      </FlexView>
    );
  }
}
```

### Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **children** | <code>ReactChildren</code> |  | **required**. FlexView content |
| **column** | <code>Boolean</code> |  | *optional*. Flex-direction: column |
| **vAlignContent** | <code>enum("top" &#124; "center" &#124; "bottom")</code> |  | *optional*. Align content vertically |
| **hAlignContent** | <code>enum("left" &#124; "center" &#124; "right")</code> |  | *optional*. Align content horizontally |
| **marginLeft** | <code>union(String &#124; Number)</code> |  | *optional*. Margin-left property ("auto" to align self right) |
| **marginTop** | <code>union(String &#124; Number)</code> |  | *optional*. Margin-top property ("auto" to align self bottom) |
| **marginRight** | <code>union(String &#124; Number)</code> |  | *optional*. Margin-right property ("auto" to align self left) |
| **marginBottom** | <code>union(String &#124; Number)</code> |  | *optional*. Margin-bottom property ("auto" to align self top) |
| **grow** | <code>union(Boolean &#124; Number)</code> |  | *optional*. Property (for parent primary axis) |
| **shrink** | <code>union(Boolean &#124; Number)</code> |  | *optional*. Flex-shrink property |
| **basis** | <code>union(String &#124; Number)</code> |  | *optional*. Flex-basis property |
| **wrap** | <code>Boolean</code> |  | *optional*. Wrap content |
| **height** | <code>union(String &#124; Number)</code> |  | *optional*. Height property (for parent secondary axis) |
| **width** | <code>union(String &#124; Number)</code> |  | *optional*. Width property (for parent secondary axis) |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |


## Demo
Here's a [live playground](http://react-components.buildo.io/#flexview)

## Documentation
Refer to the [Book of FlexView](http://buildo.github.io/react-flexview/)

## Supported browsers
We removed vendor prefixes in [#66](https://github.com/buildo/react-flexview/issues/66), since than we only supports browsers that don't require prefixes for *flexbox* CSS properties which are most browsers:
- IE 11
- Edge (any version)
- Google Chrome 29+
- Firefox 28+
- Safari 9+

If you need to support older browsers, try with `FlexView` `3.x`.

## Used By
At [buildo](https://buildo.io/) we've been using `FlexView` in production in every web application we built since [July 2015](https://github.com/buildo/react-components/pull/7) (it was in a different repo back then).

As of today, `FlexView` has replaced the `div` as the brick of our projects and, thanks to it, our developers can finally build without too much trouble complex layouts that work the same on Chrome, Firefox, Safari and **Internet Explorer 11**.

You can see it in action here:
- [buildo.io](https://buildo.io/)
- [LexDo.it](https://www.lexdo.it/)
