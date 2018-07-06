import * as React from 'react';
import * as PropTypes from 'prop-types';
import pick = require('lodash.pick');
import omit = require('lodash.omit');
import some = require('lodash.some');

export type Omit<O, K extends string> = Pick<O, Exclude<keyof O, K>>;

export type Overwrite<O1, O2> = Pick<O1, Exclude<keyof O1, keyof O2>> & O2;

declare var process: { env: { NODE_ENV: 'production' | 'development' } };

function warn(warning: string): void {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(warning); // eslint-disable-line no-console
  }
}
export namespace FlexView {
  export type Props = Overwrite<Omit<React.HTMLProps<HTMLDivElement>, 'ref'>, {
    /** FlexView content */
    children?: React.ReactNode,
    /** flex-direction: column */
    column?: boolean,
    /** align content vertically */
    vAlignContent?: 'top' | 'center' | 'bottom',
    /** align content horizontally */
    hAlignContent?: 'left' | 'center' | 'right',
    /** margin-left property ("auto" to align self right) */
    marginLeft?: string | number,
    /** margin-top property ("auto" to align self bottom) */
    marginTop?: string | number,
    /** margin-right property ("auto" to align self left) */
    marginRight?: string | number,
    /** margin-bottom property ("auto" to align self top) */
    marginBottom?: string | number,
    /** grow property (for parent primary axis) */
    grow?: boolean | number,
    /** flex-shrink property */
    shrink?: boolean | number,
    /** flex-basis property */
    basis?: string | number,
    /** wrap content */
    wrap?: boolean,
    /** height property (for parent secondary axis) */
    height?: string | number,
    /** width property (for parent secondary axis) */
    width?: string | number,
    /** class to pass to top level element of the component */
    className?: string,
    /** style object to pass to top level element of the component */
    style?: React.CSSProperties
  }>;
}

/** A powerful React component to abstract over flexbox and create any layout on any browser */
export class FlexView extends React.Component<FlexView.Props> {

  static propTypes = {
    children: PropTypes.node,
    column: PropTypes.bool,
    vAlignContent: PropTypes.oneOf(['top', 'center', 'bottom']),
    hAlignContent: PropTypes.oneOf(['left', 'center', 'right']),
    marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    grow: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    shrink: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    basis: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    wrap: PropTypes.bool,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    style: PropTypes.object
  }

  componentDidMount() {
    this.logWarnings();
  }

  logWarnings(): void {
    const { basis, shrink, grow, hAlignContent, vAlignContent, children, column } = this.props;

    if (basis === 'auto') {
      warn('basis is "auto" by default: forcing it to "auto"  will leave "shrink:true" as default');
    }

    if (
      (shrink === false || shrink === 0) &&
      (grow === true || (typeof grow === 'number' && grow > 0))
    ) {
      warn('passing both "grow" and "shrink={false}" is a no-op!');
    }

    if (process.env.NODE_ENV !== 'production' && typeof children !== 'undefined' && !column && hAlignContent === 'center') {
      const atLeastOneChildHasHMarginAuto = some([].concat(children as any), (child: any) => {
        const props = (typeof child === 'object' ? child.props : undefined) || {};
        const style = props.style || {};

        const marginLeft = style.marginLeft || props.marginLeft;
        const marginRight = style.marginRight || props.marginRight;
        return marginLeft === 'auto' && marginRight === 'auto';
      });

      atLeastOneChildHasHMarginAuto && warn('In a row with hAlignContent="center" there should be no child with marginLeft and marginRight set to "auto"\nhttps://github.com/buildo/react-flexview/issues/30');
    }

    if (process.env.NODE_ENV !== 'production' && typeof children !== 'undefined' && column && vAlignContent === 'center') {
      const atLeastOneChildHasVMarginAuto = some([].concat(children as any), (child: any) => {
        const props = (typeof child === 'object' ? child.props : undefined) || {};
        const style = props.style || {};

        const marginTop = style.marginTop || props.marginTop;
        const marginBottom = style.marginBottom || props.marginBottom;
        return marginTop === 'auto' && marginBottom === 'auto';
      });

      atLeastOneChildHasVMarginAuto && warn('In a column with vAlignContent="center" there should be no child with marginTop and marginBottom set to "auto"\nhttps://github.com/buildo/react-flexview/issues/30');
    }
  }

  getGrow(): number {
    const { grow } = this.props;
    if (typeof grow === 'number') {
      return grow;
    } else if (grow) {
      return 1;
    }

    return 0; // default
  }

  getShrink(): number {
    const { shrink, basis } = this.props;
    if (typeof shrink === 'number') {
      return shrink;
    } else if (shrink) {
      return 1;
    } else if (shrink === false) {
      return 0;
    }

    if (basis && basis !== 'auto') {
      return 0;
    }

    return 1; // default
  }

  getBasis(): string {
    const { basis } = this.props;
    if (basis) {
      const suffix = typeof basis === 'number' || String(parseInt(basis as string, 10)) === basis ? 'px' : '';
      return basis + suffix;
    }

    return 'auto'; // default
  }

  getStyle(): React.CSSProperties {
    const { column, wrap, vAlignContent, hAlignContent } = this.props;

    const style = pick(this.props, [
      'width',
      'height',
      'marginLeft',
      'marginTop',
      'marginRight',
      'marginBottom'
    ]);

    function alignPropToFlex(align: FlexView.Props['vAlignContent'] | FlexView.Props['hAlignContent']) {
      switch (align) {
        case 'top':
        case 'left': return 'flex-start'
        case 'center': return 'center'
        case 'bottom':
        case 'right': return 'flex-end'
      }
    }

    return {
      boxSizing: 'border-box',

      // some browsers don't set these by default on flex
      minWidth: 0,
      minHeight: 0,

      // flex properties
      display: 'flex',
      flexDirection: column ? 'column' : 'row',
      flexWrap: wrap ? 'wrap' : 'nowrap',
      flex: `${this.getGrow()} ${this.getShrink()} ${this.getBasis()}`,
      justifyContent: alignPropToFlex(column ? vAlignContent : hAlignContent),
      alignItems: alignPropToFlex(column ? hAlignContent : vAlignContent),

      // style passed through props
      ...style,
      ...this.props.style
    };
  }

  render() {
    const style = this.getStyle();
    const props = omit(this.props, Object.keys(FlexView.propTypes));
    return (
      <div className={this.props.className} style={style} {...props}>
        {this.props.children}
      </div>
    );
  }

}

export default FlexView
