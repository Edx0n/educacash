import PropTypes from "prop-types";

const RenderIf = ({ condition, children }) => {
  return condition ? children : null;
};

export default RenderIf;

RenderIf.propTypes = {
  condition: PropTypes.bool,
  children: PropTypes.node,
};
