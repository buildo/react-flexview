# `flex-grow`

Sidebars... have you ever tried to create a layout with two sidebars (one on the left and one on the right) with fixed width (let’s say _200px)) and a growing main content in the middle using only `divs` and old style css?
This is how you would have probably done it:


```html
<div id='app'>
  <div id='left-sidebar' />
  <div id='content' />
  <div id='right-sidebar' />
</div>
```

```css
#app {
  width: 100%;
  height: 100%;
}

#left-sidebar {
  float: left;
  margin: 0 0 0 -75%;
  width: 25%;
  clear: none;
}

#content {
  float: left;
  margin-left: 25%;
  width: 50%;
}

#right-sidebar {
  float: right;
  width: 25%;
  clear: none;
}
```

Exactly, you would have used percentages! “Fuck those designers! 200px… 25%… what’s the difference?”

Well, I don’t know, I’m not designer. What I know is you can create that layout with _flexbox_ and you can **easily** create it with `FlexView` (**`grow`** and **`basis`** to the rescue!)

```jsx
<FlexView id='app' width='100%' height='100%'>
  <FlexView id='left-sidebar' basis={200} />
  <FlexView id='content' grow />
  <FlexView id='right-sidebar' basis={200} />
</FlexView>
```

Ok, what have we done here?

First, our layout is supposed to have its parts (sidebars, content) positioned horizontally:

- the first FlexView should be a row

Each sidebar should be **exactly** 200px wide:

- both the right and left sidebar have **`basis={200}`**.
  - Why `basis` instead of `width`? Because their parent is a row.

The main content should occupy all the left available space:

- in other words it should **grow**! Let’s pass to the content `FlexView` **`grow={true}`**

Even if `grow` (like the other size props `width`, `height`, `basis`) accepts numbers, you’ll find yourself mostly using it in its boolean form.

When you write `<FlexView grow />` what you’re actually doing is simply setting `flex-grow` the default value for a growing flex element: `flex-grow: 1`

So these two cases are actually equivalent:

```jsx
<FlexView grow={1} />
<FlexView grow />
```

In the (rare) case you need to set different `grow` values for different `FlexViews`, you can pass your desired value as a number:

```jsx
<FlexView>
  <FlexView grow={1} />
  <FlexView grow={2} />
</FlexView>
```

**NB: `grow` will work ONLY in the direction of the *main* axis**

This means that content will grow horizontally (the computed width will be _100% - 200px - 200px_) but it will still have `height: 0` unless populated with some content or explicitly given a valid `height`!

Another important lesson is about grow strength. In this previous example, what would be the final result?
As we already know, grow is a value in CSS (an integer to be precise). The bigger the value the stronger our FlexView will be relative to its siblings. Quite intuitive, right? The catch is there’s another factor influencing the strength of a growing FlexView: the base size.
A bigger FlexView (with a bigger content) will also be stronger.

Base size (content size) will be better explained in the following chapter. For now let’s simply accept the following rule:
grow strength is the result of two factors: grow value and base size (size of content).
The bigger the grow value, the stronger. The bigger the base size, the stronger.

Let’s see a couple of examples

```jsx
// only grow
<FlexView>
  <FlexView id='weaker' grow={1} />
  <FlexView id='stronger' grow={2} /> // grow twice as "strong"
</FlexView>
```

Both FlexView have the same content (they’re both empty!) so they have the same base size. The outcome is therefore limited to the grow value:
stronger has twice the grow power of weaker so we can easily predict that it will occupy double of the space.
→weaker will have a computed width of 33.33...%
→stronger will have a computed width of 66.66...%

```
// both grow and base size
<FlexView>
  <FlexView id='weaker?' grow={1}>
    {contentTop} // how big are you?
  </FlexView>
  <FlexView id='stronger?' grow={2}> // grow twice as "strong"
    {contentBottom} // how big are you?
  </FlexView>
</FlexView>
```

Here things get complicated: our FlexViews have different contents. Again we easily see that the second one has a higher grow value  but, as we know nothing about their base size, the outcome is impossible to predict.
To show you how hard it is let’s say that both contents are divs and that contentTop has `width: 200px` while contentBottom has `width: 100px`. What do you expect? Probably not this:
weaker computed width → 35%
stronger computed width → 65%

This result brings out another real problem: is there a way to force them to follow only the grow factor? This could be very useful in some situations (ex: grids!)

The rule of thumb is: we use percentages.
“Wait, all this talking about grow and now we go back to percentages?” Not exactly..

With basis we can definitely set the precise percentage for each FlexView.

```jsx
<FlexView>
  <FlexView id='weaker' basis='40%' />
  <FlexView id-'stronger' basis='60%' />
</FlexView>
```

This would result of course in the expected outcome (40%, 60%) but we’ve just brutally excluded grow from the party! We want a way to use grow while and ignoring the base size.

As it turns out, if you use a percentage basis together with grow  and shrink, that percentage will work as a max-width because it can shrink) while the grow will (as usual) tell our FlexView to get as much space as it can.

This means that the two following examples will actually produce the same result:

```jsx
// only basis
<FlexView>
  <FlexView basis='25%' />
  <FlexView basis='75%' />
</FlexView>

// grow, shrink and basis
<FlexView>
  <FlexView grow={1} shrink basis='100%' />
  <FlexView grow={3} shrink basis='100%' />
</FlexView>
```

or also:

```jsx
// only basis, equally sized
<FlexView>
  <FlexView basis='50%' />
  <FlexView basis='50%' />
</FlexView>

// shrink and basis
<FlexView>
  <FlexView shrink basis='100%' />
  <FlexView shrink basis='100%' />
</FlexView>
```

These examples are the perfect display that with the correct combined usage of grow, shrink and basis you can almost always produce the desired effect!

**NB: when using grow together with a percentage basis  and `shrink={true}`, if that percentage can’t be easily reached (because of siblings), the strength of a FlexView will be ENTIRELY caused by its grow value.**

**NB: `shrink={true}` is required as, when setting a custom basis, shrink is false by default**

This may come in handy when creating grids as we don’t need to know how many cells there will be.

**BEWARE**: setting basis to a percentage in other situations may cause layout defects! As we’ll see in the the following section basis is by default set to ‘auto' for a very good reason.
