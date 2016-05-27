# API - Let’s get serious

`FlexView` is first of all a React component, and like any (good) React component it’s stateless and works completely (and only) through props.

## The return of the DIV

`FlexView` is also a `div` (a stronger, better `div` if you ask me) which means that any valid prop for `div` is also a valid prop for `FlexView`. A couple of notable examples:

- children
- event listeners (`onClick`, `onMouseEnter`... https://facebook.github.io/react/docs/events.html)
- `id`, `className`, `style`
- ... https://facebook.github.io/react/docs/tags-and-attributes.html


```jsx
<div className='div-forever'>
  <span>Name me one thing you can't do with a div</span>
  <span>div rulez!</span>
</div>
```

```jsx
<FlexView className='welcome-to-2016'>
  <span>SHUT UP!</span>
  <span>PS: Me and my brother span are side by side, and you?</span>
<FlexView>
```

## Custom props, the source of all power

Of course `FlexView` is not limited to the standard `div` props.

Here’s the list of any custom (or manipulated) `FlexView` prop:

Name | Type | Description
-----|------|------------
**column** | `boolean` | _optional_. Flex-direction: column
**grow** | `union(boolean,number)` | _optional_. Flex-grow property (for parent primary axis)
**shrink** | `union(boolean,number)` | _optional_. Flex-shrink property
**basis** | `union(string,number)`| _optional_. Flex-basis property
**vAlignContent** | `enum('top','center','bottom')` | _optional_. Align content vertically
**hAlignContent** | `enum('left','center','right')` | _optional_. Align content horizontally
**marginLeft** | `union(string,number)` | _optional_. Margin-left property ("auto" to align self right)
**marginTop** | `union(string,number)` | _optional_. Margin-top property ("auto" to align self bottom)
**marginRight** | `union(string,number)` | _optional_. Margin-right property ("auto" to align self left)
**marginBottom** | `union(string,number)` | _optional_. Margin-bottom property ("auto" to align self top)
**wrap** | `boolean` | _optional_. Wrap content
**height** | `union(string,number)` | _optional_. Height property (for parent secondary axis)
**width** | `union(string,number)` | _optional_. Width property (for parent secondary axis)
**className** | `string` | _optional_. Additional className for wrapper element
**style** | `object` | _optional_. Inline-style overrides for wrapper element


> `FlexView` is a wild stallion. It is strong and fast, but must first be tamed!

(“but wait, this is in contrast with what you said at the beginning of.." - “SHUT UP!”)

As you can see there are quite a few additional props we can use.
Let’s divide them in smaller groups to make it easier to understand their function:


#### DIRECTION
- `column`


#### SIZE
- `grow`
- `shrink`
- `basis`
- `width`
- `height`


#### CONTENT POSITIONING
- `vAlignContent`
- `hAlignContent`
- `wrap`


#### SELF POSITIONING (relative to parent)
- `marginTop`
- `marginRight`
- `marginBottom`
- `marginLeft`


#### MISC
- `className`
- `style`

In the following chapters we’re going to study each group.
