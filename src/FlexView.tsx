import * as React from 'react';
import * as cx from 'classnames';
import * as PropTypes from 'prop-types';
import pick = require('lodash.pick');
import omit = require('lodash.omit');
import some = require('lodash.some');
import { ObjectOverwrite } from 'typelevel-ts';

declare var process: { env: { NODE_ENV: 'production' | 'development' } };

function warn(warning: string): void {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(warning); // eslint-disable-line no-console
  }
}
export namespace FlexView {
  export type Props = ObjectOverwrite<React.HTMLProps<HTMLDivElement>, {
    /** FlexView content */
    children?: React.ReactNode,
    /** flex-direction: column */
    column?: boolean,
    parentIsColumn?: boolean,
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
    parentIsColumn: PropTypes.bool,
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
    const { shrink, grow, hAlignContent, vAlignContent, children, column } = this.props;

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
    const { shrink } = this.props;
    if (typeof shrink === 'number') {
      return shrink;
    } else if (shrink) {
      return 1;
    } else if (shrink === false) {
      return 0;
    }

    if (this.getBasis() !== 'auto') {
      return 0;
    }

    return 1; // default
  }

  getBasis(): string {
    const { width, height, parentIsColumn } = this.props;

    const basis = parentIsColumn ? height : width;

    if (typeof parentIsColumn === 'boolean' && basis) {
      const suffix = typeof basis === 'number' || String(parseInt(basis as string, 10)) === basis ? 'px' : '';
      return basis + suffix;
    }

    return 'auto'; // default
  }

  getFlexStyle(): React.CSSProperties {
    const grow = this.getGrow();
    const shrink = this.getShrink();
    const basis = this.getBasis();
    const values = `${grow} ${shrink} ${basis}`;
    return {
      WebkitBoxFlex: values,
      MozBoxFlex: values,
      msFlex: values,
      WebkitFlex: values,
      flex: values
    };
  }

  getStyle(): React.CSSProperties {
    const style = pick(this.props, [
      'width',
      'height',
      'marginLeft',
      'marginTop',
      'marginRight',
      'marginBottom'
    ]);
    return { ...this.getFlexStyle(), ...style, ...this.props.style };
  }

  getContentAlignmentClasses(): string {
    const vPrefix = this.props.column ? 'justify-content-' : 'align-content-';
    const hPrefix = this.props.column ? 'align-content-' : 'justify-content-';

    const vAlignContentClasses = {
      top: `${vPrefix}start`,
      center: `${vPrefix}center`,
      bottom: `${vPrefix}end`
    };

    const hAlignContentClasses = {
      left: `${hPrefix}start`,
      center: `${hPrefix}center`,
      right: `${hPrefix}end`
    };

    const vAlignContent = this.props.vAlignContent && vAlignContentClasses[this.props.vAlignContent];
    const hAlignContent = this.props.hAlignContent && hAlignContentClasses[this.props.hAlignContent];

    return cx(vAlignContent, hAlignContent);
  }

  getClasses(): string {
    const direction = this.props.column && 'flex-column';
    const contentAlignment = this.getContentAlignmentClasses();
    const wrap = this.props.wrap && 'flex-wrap';
    return cx('react-flex-view', direction, contentAlignment, wrap, this.props.className);
  }

  getMappedChildren(): React.ReactNode {
    const { children, column } = this.props;

    const isFlexView = (c: any): c is React.ReactElement<FlexView.Props> => React.isValidElement(c) && c.type === FlexView

    const cloneFlexView = (f: React.ReactElement<FlexView.Props>) => React.cloneElement(f as any, { ...f.props, parentIsColumn: !!column })

    if (Array.isArray(children)) {
      return children.map(c => isFlexView(c) ? cloneFlexView(c) : c);
    } else if (isFlexView(children)) {
      return cloneFlexView(children);
    }

    return children;
  }

  render() {
    const className = this.getClasses();
    const style = this.getStyle();
    const props = omit(this.props, Object.keys(FlexView.propTypes));
    return (
      <div className={className} style={style} {...props}>
        {this.getMappedChildren()}
      </div>
    );
  }

}
