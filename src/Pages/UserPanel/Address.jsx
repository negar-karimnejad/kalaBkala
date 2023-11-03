import { PiWarningCircle } from "react-icons/pi";

function Address() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-5 flex items-center justify-center dark:text-gray-100">
      <PiWarningCircle className="me-4 text-3xl" />
      <p className="text-xl">هیچ آدرسی هنوز ثبت نشده است.</p>
    </div>
  );
}

export default Address;
