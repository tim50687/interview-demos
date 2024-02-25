/**
 * Represents the header component for the survey builder application.
 *
 * @component
 * @returns {React.ReactElement} A header element containing the application title.
 */

import "./Header.css";
const Header = ({ className }) => {
  return (
    <div className={`survey-header ${className}`}>
      <h1>Survey Builder</h1>
    </div>
  );
};

export default Header; // Export the component for use in other parts of the application
