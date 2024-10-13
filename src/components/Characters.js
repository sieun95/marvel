import PropTypes from "prop-types";
function Characters({ name }) {
  return (
    <div>
      <li>{name}</li>
    </div>
  );
}

Characters.propTypes = {
  name: PropTypes.string.isRequired,
};
export default Characters;
