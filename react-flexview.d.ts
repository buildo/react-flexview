import { Component, HTMLProps } from 'react';

// listing all Div attributes apart from "wrap" because Div's wrap conflicts with FLexView' wrap
type HTMLDivElementPropsKeys = "defaultChecked" | "defaultValue" | "suppressContentEditableWarning" | "accept" | "acceptCharset" | "accessKey" | "action" | "allowFullScreen" | "allowTransparency" | "alt" | "async" | "autoComplete" | "autoFocus" | "autoPlay" | "capture" | "cellPadding" | "cellSpacing" | "charSet" | "challenge" | "checked" | "classID" | "className" | "cols" | "colSpan" | "content" | "contentEditable" | "contextMenu" | "controls" | "coords" | "crossOrigin" | "data" | "dateTime" | "default" | "defer" | "dir" | "disabled" | "download" | "draggable" | "encType" | "form" | "formAction" | "formEncType" | "formMethod" | "formNoValidate" | "formTarget" | "frameBorder" | "headers" | "height" | "hidden" | "high" | "href" | "hrefLang" | "htmlFor" | "httpEquiv" | "id" | "inputMode" | "integrity" | "is" | "keyParams" | "keyType" | "kind" | "label" | "lang" | "list" | "loop" | "low" | "manifest" | "marginHeight" | "marginWidth" | "max" | "maxLength" | "media" | "mediaGroup" | "method" | "min" | "minLength" | "multiple" | "muted" | "name" | "nonce" | "noValidate" | "open" | "optimum" | "pattern" | "placeholder" | "playsInline" | "poster" | "preload" | "radioGroup" | "readOnly" | "rel" | "required" | "reversed" | "role" | "rows" | "rowSpan" | "sandbox" | "scope" | "scoped" | "scrolling" | "seamless" | "selected" | "shape" | "size" | "sizes" | "slot" | "span" | "spellCheck" | "src" | "srcDoc" | "srcLang" | "srcSet" | "start" | "step" | "style" | "summary" | "tabIndex" | "target" | "title" | "type" | "useMap" | "value" | "width" | "wmode" | "about" | "datatype" | "inlist" | "prefix" | "property" | "resource" | "typeof" | "vocab" | "autoCapitalize" | "autoCorrect" | "autoSave" | "color" | "itemProp" | "itemScope" | "itemType" | "itemID" | "itemRef" | "results" | "security" | "unselectable" | "children" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocus" | "onFocusCapture" | "onBlur" | "onBlurCapture" | "onChange" | "onChangeCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDown" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUp" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onClick" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDrag" | "onDragCapture" | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStart" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDown" | "onMouseDownCapture" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelect" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStart" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture"

export declare interface IProps extends Pick<HTMLProps<HTMLDivElement>, HTMLDivElementPropsKeys> {
  children?: any;
  column?: boolean;
  vAlignContent?: 'top' | 'center' | 'bottom';
  hAlignContent?: 'left' | 'center' | 'right';
  marginLeft?: string | number;
  marginTop?: string | number;
  marginRight?: string | number;
  marginBottom?: string | number;
  grow?: boolean | number;
  shrink?: boolean | number;
  basis?: string | number;
  wrap?: boolean;
  height?: string | number;
  width?: string | number;
}
/** React component to abstract over flexbox
 * @param children - flexView content
 * @param column - flex-direction: column
 * @param vAlignContent - align content vertically
 * @param hAlignContent - align content horizontally
 * @param marginLeft - margin-left property ("auto" to align self right)
 * @param marginTop - margin-top property ("auto" to align self bottom)
 * @param marginRight - margin-right property ("auto" to align self left)
 * @param marginBottom - margin-bottom property ("auto" to align self top)
 * @param grow property (for parent primary axis)
 * @param shrink - flex-shrink property
 * @param basis - flex-basis property
 * @param wrap - wrap content
 * @param height - height property (for parent secondary axis)
 * @param width - width property (for parent secondary axis)
 */
export default class FlexView extends Component<IProps> {
  componentDidMount(): void;
  private logWarnings;
  private getGrow;
  private getShrink;
  private getBasis;
  private getFlexStyle;
  private getStyle;
  private getContentAlignmentClasses;
  private getClasses;
  render(): JSX.Element;
}
