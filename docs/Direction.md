## Direction

Positioning elements horizontally inside a `div` has always been absurdly hard.
(“What about `float`? I made the most incredible things with flo..” - “SHUT UP!”)

With flexbox we can finally achieve this in a much easier and more intuitive way: by applying a direction to any flexbox element we can make it work as a row (horizontal view) or a  column (vertical view - like a standard `div`)

`FlexView` by default behaves as a row (this is the consolidated standard for flex elements). To transform it in a column we simply pass it the prop `column={true}`:

```jsx
<FlexView /> // this is a row
<FlexView column /> // this is a column
```

***{PREVIEW HERE}***
