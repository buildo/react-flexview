# Inherited size (container)

So far we’ve seen how we can manually set the size of a *FlexView *but, as we mostly use *FlexView* as a container, we’re not done until we see how it inherits size from its content.

Let’s start once again by studying how a *div* works.

```jsx
<div id='container'>
  <div style={{ height: 50, width: 50 }} />
</div>
```

Our container will have `height: 50px` and will be large 100% as its a block by default (`display: block`).

Here’s another (very common) example where we don’t know the size of the content.

```jsx
<div id='container'>
  <span>{someText}</span>
</div>
```

Even if the height of the *span* depends on many factors (text length, available width, font characteristics…) we can say for sure that the *container* will have the same height of the *span*.

No need to say, but with *FlexView *things aren’t that easy.
The size of the container is computed keeping in count other factors:

- Has the container `min-width` and `min-height` set to `auto`?
- Has the container `basis='auto'`?
- Is everyone (container and contents) shrinkable?
- Is content growing? (has the container one or more children with `grow={true}`?)

Yes, it’s that complicated! (actually it’s probably more complicated as I’m far from knowing all the possible scenarios)

Let’s analyze each of the above cases.


### Has the container `min-width: auto` and/or `min-height: auto`?

BEWARE: this paragraph is a weird one.

By specifications a *flex* element with `min-width: auto` and `min-height: auto` will have at least its content size.

**NB: `min-height: auto` (`min-width: auto`) is translated by the browser as `min-height: "my-content-height"` (`min-width: "my-content-width"`)
**

Until January 2016 `min-width` and `min-height` treated as _0_ by default.

This obviously (and tragically) changed recently: https://www.chromestatus.com/feature/5651186401148928

To make `FlexView` more stable and predictable (and to keep backward compatibility) we decided to reject this new un-intuitive specification and enforce the old defaults (`min-width: 0`, `min-height: 0`)

**NB: by default `FlexView` has `min-width: 0` and `min-height: 0`** (like any `div`)

You may be wondering: “Does it mean `FlexView` will never have its content size by default?”
Nope, it actually does by default! Let’s jump to the next section.


### Has the container `basis='auto'`?

What we said about `min-width` and `min-height` is valid for `flex-basis` too!
(Remeber: `FlexView` has `basis='auto'` by default)

**NB: a `FlexView` with `basis='auto'` will *(try to)* have its content size**

This container will than have its content size just like a `div`:

```jsx
<FlexView>
  <span>{someText}</span>
</FlexView>
```

Finally some normality!


### Is everyone *shrinkable*?

In the *size* chapter we saw how a *FlexView* naturally shrinks fo free space for its siblings unless explicitly told not to.

This rule is still true:

```jsx
<FlexView width={500}>
  <FlexView id='fat-sibling' grow />
  <FlexView id='container'>
    <div style={{ width: 400 }} />
  </FlexView>
</FlexView>
```

*container* has `basis: 'auto'` so it should have its content size (`width: 500px`).
This would be true if it there wasn’t an aggressive *fat-sibling* trying to grow indefinitely!

In this example it’s really hard to predict what will happen. (if you’re curios the result on Chrome48 is *fat-sibiling → 277.784px* and *container → 222.216px*)

**We must avoid situations where we can’t predict the final result!**

To achieve the expected result in a situation like that (we want *fat-sibiling → 100px* and *container → 400px*) we should use **`shrink={false}`**.

```jsx
<FlexView width={500}>
  <FlexView id='fat-sibling' grow />
  <FlexView id='container' shrink={false}> // don't you dare shrinking!
    <div style={{ width: 400 }} />
  </FlexView>
</FlexView>
```

As you can see `shrink={false}` helps us understanding the result by setting a clear and intuitive constraint: you don’t shrink, no matter what!

This works also for nested containers:

```jsx
<FlexView width={500}>
  <FlexView id='fat-sibling' grow />
  <FlexView id='container' >
    <FlexView id='not-shrinkable-container' shrink={false}>
      <div style={{ width: 400 }} />
    </FlexView>
  </FlexView>
</FlexView>
```

*not-shrinkable-container* has `basis: auto`
→ it tries to have its content size
*not-shrinkable-container *is also not allowed to shrink (remember: **no matter what!**)
→ it **will have **its content size (`width: 400px`)

*container* has `basis: auto` too
→ it tries to have its content size
its content is *not-shrinkable-container* which **must** have `width: 400px`
→ it will have `width: 400px`

*fat-sibling* has `grow={true}`
→ it tries to occupy all the space
*fat-sibling* is (unfortunately for it) shrinkable
→ it** **will occupy **only the available space**
→ it will have `width: 100px`



### Is the content *growing*?

There’s only one case left: what happens if a `FlexView` with a sizeless parent has `grow={true}`?
When we talked about `grow` we described it as a magical property which could be translated to
**`width: 100%` - (all the others).**

May I remind you that 100% of 0 is 0? is this arrogant of me? I wonder why this chapter even exists!

…let’s clarify it anyway...

**NB: *`grow={true}`* DOES NOT make its parent growing too!**

Which also means that:

**NB: If you want a `FlexView` to grow you MUST pass *`grow={true}`* to EVERY parent/grandparent!**
