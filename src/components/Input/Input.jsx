
function Input({ placeholder, value, onChange, type }) {
  return (
    <input
      value={value == null ? '' : value}
      onChange={onChange}
      placeholder={placeholder}
      type={type ? type : "text"}
      className="border-2 border-gray-200 border-solid rounded-lg p-2 focus:ring-0 focus:border-gray-300 w-full h-full text-xl dark:bg-gray-800 dark:border-gray-500 dark:text-gray-100"
    />
  );
}

export default Input;
