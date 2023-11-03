import Label from "../Label/Label";
import { ErrorMessage, Field } from "formik";

function FormValidationField({ title, type, name }) {
  return (
    <div className="relative flex flex-col h-14 my-2">
      <Label title={title} />
      <Field
        id={title}
        className="border-2 border-gray-200 border-solid p-2 focus:ring-0 focus:border-gray-300 w-full h-full text-xl rounded-lg dark:bg-gray-800 dark:border-gray-500 dark:text-gray-200"
        type={type}
        name={name}
      />
      <ErrorMessage
        className="text-xs text-red-500 my-1"
        name={name}
        component="div"
      />
    </div>
  );
}

export default FormValidationField;
