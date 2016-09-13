# FlexView

React component to abstract over flexbox

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **children** | <code>ReactChildren</code> |  | **required**. FlexView content |
| **column** | <code>Boolean</code> |  | *optional*. Flex-direction: column |
| **vAlignContent** | <code>enum("top" &#124; "center" &#124; "bottom")</code> |  | *optional*. Align content vertically |
| **hAlignContent** | <code>enum("left" &#124; "center" &#124; "right")</code> |  | *optional*. Align content horizontally |
| **marginLeft** | <code>union(String &#124; Number)</code> |  | *optional*. Margin-left property ("auto" to align self right) |
| **marginTop** | <code>union(String &#124; Number)</code> |  | *optional*. Margin-top property ("auto" to align self bottom) |
| **marginRight** | <code>union(String &#124; Number)</code> |  | *optional*. Margin-right property ("auto" to align self left) |
| **marginBottom** | <code>union(String &#124; Number)</code> |  | *optional*. Margin-bottom property ("auto" to align self top) |
| **grow** | <code>union(Boolean &#124; Number)</code> |  | *optional*. Property (for parent primary axis) |
| **shrink** | <code>union(Boolean &#124; Number)</code> |  | *optional*. Flex-shrink property |
| **basis** | <code>union(String &#124; Number)</code> |  | *optional*. Flex-basis property |
| **wrap** | <code>Boolean</code> |  | *optional*. Wrap content |
| **height** | <code>union(String &#124; Number)</code> |  | *optional*. Height property (for parent secondary axis) |
| **width** | <code>union(String &#124; Number)</code> |  | *optional*. Width property (for parent secondary axis) |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |