/**
 * WordPress dependencies
 */
import { Composite } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
export { default as InserterListboxGroup } from './group';
export { default as InserterListboxRow } from './row';
export { default as InserterListboxItem } from './item';
function InserterListbox({
  children
}) {
  return /*#__PURE__*/_jsx(Composite, {
    focusShift: true,
    focusWrap: "horizontal",
    render: /*#__PURE__*/_jsx(_Fragment, {}),
    children: children
  });
}
export default InserterListbox;
//# sourceMappingURL=index.js.map