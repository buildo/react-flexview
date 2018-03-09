React component to abstract over CSS *flexbox*.

`FlexView` should be used as a replacement for `div` to create complex layouts such as grids.
Once you decide to use `FlexView`, you should try to replace any `div` with it because, to work effectively, `FlexView` needs to be nested inside another `FlexView`: a single `div` may cause big problems.

You can read more about how `FlexView` works [here](https://github.com/buildo/react-flexview).
