# Introduction

> `FlexView`  is a loyal and friendly React component to work with `flex` in an easier, standard and more reliable way. Welcome to 2017!

Still, we’re talking about flex… easy, standard and reliable may not be fully true!
Therefore, may I present to you ladies and gentlemen the greatest guide for FlexView ever made!(and first one, and only one…probably also the last one)


First of all, why `FlexView`

This how you flex without `FlexView`:

```scss
// flex
display: flexbox;
display: -webkit-box;
display: -moz-box;
display: -ms-flexbox;
display: -webkit-flex;
display: flex;

// direction
webkit-box-flex-direction: row;
moz-box-flex-direction: row;
ms-flex-direction: row;
webkit-flex-direction: row;
flex-direction: row;

// grow, shrink, basis
webkit-box-flex: 1 1 200px;
moz-box-flex: 1 1 200px;
ms-flex: 1 1 200px;
webkit-flex: 1 1 200px;
flex: 1 1 200px;
```

And this is how you flex with `FlexView`:

```jsx
<FlexView grow shrink basis='200' />
```

Now that I have your attention we can jump to the real chapters!
