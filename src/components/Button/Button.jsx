function Button({ title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-rose-600 w-full text-white px-4 py-3  shadow-lg shadow-rose-300 rounded-lg transition-all hover:bg-rose-700 dark:bg-gray-600 dark:hover:bg-gray-900 dark:shadow-gray-950"
    >
      {title}
    </button>
  );
}

export default Button;
