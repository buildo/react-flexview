# Content positioning

We can all agree that `row` and `grow` are already enough to make `FlexView` your new enhanced `div`, but why stopping there?

Flashback time!

Your designer:
> "This content should be centered horizontally and vertically”

You:
> "Oh come on! Where do you think to live? in 2016?"

This is how you used to center a `div` inside another `div`:

```jsx
// horizontally (life is beautiful)
<div>
  <div style={{ margin: '0 auto' }}/>
</div>
```

```jsx
// horizontally (damn! Venus, Mars and the Moon are aligned...again!)
<div style={{ position: 'relative' }}>
  <div style={{ position: 'absolute', width: 100, left: '50%', margin-left: -50 }}/>
</div>


// vertically
<div style={{ display: 'table-cell', vertical-align: 'middle' }}> // WTF?!
  <div style={{ display: 'inline-block' }}/> // Ok, I quit..
</div>
```

Fast-forward!

Here we are, this is 2016: time to make that dream come true!

With _flex_ we can **finally** align content wherever we want. But even if we can, that doesn’t mean it’s easy!

Let me introduce you the horrible (and really counterintuitive) API to align content in a _flex_ element with pure CSS:

Any alignment can be achieved by using the combination of two (absurdly named) properties:
**`align-items`** and **`justify-content`**.
Which of them aligns horizontally and which vertically? The truth is: it depends on the _direction_ of the element! (wait, what?)

**NB: *`justify-content`* works for main-axis while *`align-items`* for the cross-axis**

If that’s not enough, this causes another problem: as they may work for both horizontal and vertical alignment how could we use the natural values _top_, _bottom_, _left_ and _right_ without confusion?

The answer is: you can’t use them at all! Instead they have been translated to **`flex-start`**, **`center`** and **`flex-end`** so to make them unisex...

We (everyone) found this API to be confusing and unnecessary complex.
So we thought: if the source of all evil is the _direction_, and we know it for sure (`FlexView` knows if it’s a row or a column), can we make a more natural API?

Luckily, **yes**!

With `FlexView` we can finally align content in an intuitive, easy and reliable way: no more astronomical shit alignments, no more `align-items` and `justify-content` non-sense.


```jsx
// horizontal
<FlexView hAlignContent='left'>
  <div />
</FlexView>
<FlexView hAlignContent='center'>
  <div />
</FlexView>
<FlexView hAlignContent='right'>
  <div />
</FlexView>
```

```jsx
// vertical
<FlexView vAlignContent='top'>
  <div />
</FlexView>
<FlexView vAlignContent='center'>
  <div />
</FlexView>
<FlexView vAlignContent='bottom'>
  <div />
</FlexView>
```

```jsx
// both
<FlexView hAlignContent='right' vAlignContent='center'>
  <div />
</FlexView>
```

**NB: you can use *`vAlignContent`* and *`hAlignContent`* to position your content exactly where you want!**

As you probably deduced by the examples, both props accept an enum of strings:

- `vAlignContent` → `["top", "center", "bottom"]`
- `hAlignContent` → `["left", "center", "right"]`

Better, right?
