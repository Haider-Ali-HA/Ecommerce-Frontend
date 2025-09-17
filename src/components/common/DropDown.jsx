const DropDown = ({ className, onStatusChange }) => {
  const toggleDropdown = (e) => {
    onStatusChange(e.target.value);
  };

  return (
    <select
      defaultValue=""
      onChange={toggleDropdown}
      className={`select select-ghost ${className}`}
    >
      <option value="" >
        Status
      </option>
      <option value="verified">Verified</option>
      <option value="unverified">Unverified</option>
    </select>
  );
};

export default DropDown;
