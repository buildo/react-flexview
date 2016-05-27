# Self positioning

Self alignment, like content alignment, can also be done with _flex_. Unfortunately its API looks a lot like the one for content alignment (which means that it’s horrible too).

Instead of `align-items` and `justify-content` we now have *`align-self`* and ...*`margin`*! The natural direction of their effect (vertical, horizontal) depends again on the direction, but this time the one of its parent!

For the content alignment we had everything we needed (a `FlexView` knows its direction), here we’re not that lucky anymore: **props are not telling `FlexView` anything about its parent!**

How can we solve this? Do we finally have to come to terms with _flex_?

As it turns out, margin: `auto` works reliably in **both directions**! (cross axis too!).
We can therefore forget align-self even exists and replace it with good old margin.

We want a _row_ with two children: the first one on the left and the other on on the right.

We can simply do this:

```jsx
<FlexView>
  <FlexView />
  <FlexView style={{ margin-left: 'auto' }} /> // pushed to the right
</FlexView>
```

What about a _column_ with the first child on top and the other one on the bottom? Same thing:

```jsx
<FlexView column>
  <FlexView />
  <FlexView style={{ margin-top: 'auto' }} /> // pushed to the bottom
</FlexView>
```

As we did for `width` and `height`, each margin has been directly exposed to make them easier to use

```jsx
<FlexView>
  <FlexView />
  <FlexView marginLeft='auto' /> // pushed to the right
</FlexView>


<FlexView column>
  <FlexView />
  <FlexView marginTop='auto' /> // pushed to the bottom
</FlexView>
```

**NB: To self align a `FlexView` inside another `FlexView` you can set `marginTop`, `marginBottom`, `marginLeft` or `marginRight` to `'auto'`.**
