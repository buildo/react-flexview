# `flex-shrink`

Another very confusing thing about flex is its property to **shrink**.

By default, any `div` will have the size of its content (“obvious!”, you’ll say).
With `FlexView` the sentence above is not entirely true... we could say that:

> By default, any `FlexView` will **try** to have the size of its content

The difference between a `div` and a `FlexView` is once again relativity. Any `FlexView` is in constant war against its siblings about space.

Let’s see an example:

```jsx
<FlexView width={300}>
  <FlexView grow />
  <FlexView grow />
</FlexView>
```

Both inner `FlexViews` want to grow indefinitely inside the main one (which is large _300px_) so both are **trying** to have a width of 300px but can’t reach it. Why does this happen? Why aren’t they both large 300px and simply overflowing their parent like it would happen in a normal div?
Because `FlexViews` can (and by default will) shrink!

When a `FlexView` has **`shrink`** greater than _0_, if there’s not enough room for everyone it will reduce its size so that everyone can fit.

By default `flex-shrink: 1` so, contrary to `grow`, you must explicitly tell a `FlexView` **not** to shrink.

```jsx
<FlexView width={300}>
  <FlexView grow shrink={false} />
  <FlexView grow shrink={false} />
</FlexView>
```

Now they both are _300px_ wide and therefore overflowing their too small parent.
