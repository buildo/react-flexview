# `basis`, `grow` and `shrink` working together

`basis`, `grow` and `shrink` may look easy by themselves, but a true _flex_ master knows not to underestimate the chaos generated from them working together.

We’ve finally got to the point where `FlexView` and _flex_ go their separate ways.

`FlexView` was built to make our lives easier, not to be 1 to 1 with browsers defaults (which browser? which browser version? yeah, that’s way we’re going for a separate path...).

When in CSS you don’t provide a value for one of `flex-basis`, `flex-grow` and `flex-shrink` the browser will set a default for it. `FlexView` will do the same.

Before analyzing each case you should know that `flex-basis`, `flex-grow` and `flex-shrink` can be written with a shorthand in a single line of CSS:

```sass
flex-grow: 0;
flex-shrink: 1;
flex-basis: 100px;

// equivalent
flex: 0 1 100px;
```

`FlexView` uses this syntax for backwards compatible reasons (I’m looking at you IE...) so when you write

```jsx
<FlexView grow={0} shrink={1} basis={100} />
```

This is what you’ll see in your inspector:

```jsx
webkit-box-flex: 0 1 100px;
moz-box-flex: 0 1 100px;
ms-flex: 0 1 100px;
webkit-flex: 0 1 100px;
flex: 0 1 100px;
```

From now on we’ll use the `flex` property to write the output of a `FlexView`.
Ok, let’s go back to analyzing each possible default for `grow`, `basis` and `shrink`.


### base cases

When all size props are implicit, `FlexView` will follow the consolidated standard:

```jsx
<FlexView /> // flex: 0 1 auto
```

which is then equivalent:

```jsx
<FlexView grow={false} shrink basis='auto' />
```

### grow

`grow` has no side effect on other properties base default:

```jsx
<FlexView grow /> // flex: 1 1 auto
<FlexView grow={7} /> // flex: 7 1 auto
```

### shrink

`shrink` has no side effect on other properties base default.

```jsx
<FlexView shrink={false} /> // flex: 0 0 auto
<FlexView shrink={0} /> // flex: 0 0 auto
<FlexView shrink={4} /> // flex: 0 4 auto
```

### basis

`basis` is a `shrink` killer! If you pass an explicit `basis` the default for `shrink` will change from `true` (_1_) to `false` (_0_).

**NB: this behavior is different from what most browsers do**

```jsx
<FlexView basis={300} /> // flex: 0 0 300px
<FlexView basis='50%' /> // flex: 0 0 50%
```

**NB: if you pass `basis='auto'` `shrink` will not be affected as it is the default value (this will also throw a warning)**


```jsx
// throws a warning
<FlexView basis='auto' /> // flex: 0 1 auto;
```

This default is **opinionated**, we know, but in our experience when a developer explicitly sets a size (`width`, `height` or `basis`) (s)he expects `FlexView` to have exactly that size and any difference is found to be confusing.

To avoid this:

```jsx
<FlexView>
  <FlexView width={100} style={{ minWidth: 100 }} />
</FlexView>
```

We opted to make `shrink={false}` when a `basis` other than `auto` is set.

PS: the above case is real, and was actually used a lot... by me... Oops!

If you want your `FlexView` to be shrinkable you can of course explicitly tell it:

```jsx
<FlexView basis={300} shrink /> // flex: 0 1 300px;
```

This is a word we like at buildo: **explicit**. Most of our decisions are driven by our desire to have everything understandable by simply looking at it.



