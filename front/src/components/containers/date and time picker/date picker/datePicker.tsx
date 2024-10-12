// src/components/date picker/datePicker.tsx
import { DatePicker } from "zaman";
import { CalendarFold } from "lucide-react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDeadlineDate } from "../../../../store/slices/deadlineSlice";
import moment from "moment-jalaali";

// Load Persian language and configure moment-jalaali
moment.loadPersian({ usePersianDigits: true, dialect: "persian-modern" });

const CustomDatePicker: React.FC = () => {
  const dispatch = useDispatch();
  const deadlineDate = useSelector((state) => state.deadline.date); // Access the date from Redux
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const handleDateChange = (e: { value: Date }) => {
    dispatch(setDeadlineDate(e.value)); // Dispatch action to set deadline date
  };

  // Convert the deadlineDate to Jalali format using moment-jalaali
  const formattedJalaliDate = deadlineDate
    ? moment(deadlineDate).format("jD jMMMM jYYYY") // Example format: ۱ آبان ۱۴۰۳
    : "";

  return (
    <div className="w-1/2 relative flex items-center rtl:space-x-reverse space-x-2">
      <CalendarFold className="absolute z-10 right-6" color="white" />

      <input
        ref={dateInputRef}
        type="text"
        readOnly
        className="p-2 w-2/3 absolute -left-4 z-10 bg-indigo-50 focus:outline-none focus:ring-0 cursor-auto"
        placeholder="تاریخ"
        value={formattedJalaliDate} // Display the formatted Jalali date
      />

      <DatePicker
        onChange={handleDateChange}
        accentColor="#7c3aed"
        locale="fa" // Set to your desired locale
        inputClass="w-14 h-9 bg-[#7c3aed] rounded-md text-[#7c3aed] focus:outline-none absolute right-0 cursor-pointer" // Position the calendar absolutely
      />
    </div>
  );
};

export default CustomDatePicker;
