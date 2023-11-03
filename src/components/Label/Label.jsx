function Label({ title }) {
  return (
    <label htmlFor={title} className="text-lg sm:text-xl flex pb-1 dark:text-gray-400">
      {title}
      <p className="text-red-700">*</p>
    </label>
  );
}

export default Label;
