# `width`, `height` and `flex-basis`


There are two kind of `FlexViews`: those with a non-flex parent and those with a flex parent.


## `div` parent

In the first scenario things are easy: `FlexView` will behave as a standard `div` with `display: block`.

```jsx
<div>
  <FlexView /> // width as its parent, height 0
</div>
```

## `FlexView` parent

If a `FlexView` is the child of another `FlexView` things get much trickier!

1. It will no longer behave as a block (<s>`display: block`</s>)
2. Height and width will be computed by the browser (with some black magic) relative to any other parent, sibling or children!


flex elements have two types of size: **main size** (direction of main axis) and **cross size** (direction of cross axis).
To set the main size we must use the flex-basis property. With FlexView this is achieved with the prop **`basis`**.


```jsx
<FlexView> // row
  <FlexView basis={50} /> // width 50px, height 0
</FlexView>


<FlexView column> // column
  <FlexView basis={50} /> // height 50px, width 0
</FlexView>
```

To set the **cross size** say “welcome back” to **`width`** and **`height`**!

```jsx
<FlexView>
  <FlexView basis={50} style={{ height: 50 }} /> // width 50px, height 50px
</FlexView>


<FlexView column>
  <FlexView basis={50} style={{ width: 50 }} /> // height 50px, width 50px
</FlexView>
```jsx

This means that, to properly size a flex element, you **must** know its parent.
(Is it a `div` or a `FlexView`? Is it a row or a column?)

As `width` and `height` are often needed, `FlexView` is kind enough to expose them directly so instead of using style you can simply pass your values as width and height.

```jsx
<FlexView>
  <FlexView basis={50} height={50} /> // width 50px, height 50px
</FlexView>


<FlexView column>
  <FlexView basis={50} width={50} /> // height 50px, width 50px
</FlexView>
```
