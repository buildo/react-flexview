/// <reference types="react" />
import * as React from 'react';
export declare type IProps = {
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
    className?: string;
    style?: {
        [key: string]: any;
    };
};
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
export default class FlexView extends React.Component<IProps, void> {
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
