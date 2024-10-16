import { DatePicker } from "zaman";
import { CalendarFold } from "lucide-react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDeadlineDate } from "../../../../store/slices/deadlineSlice";
import moment from "moment-jalaali";

moment.loadPersian({ usePersianDigits: true, dialect: "persian-modern" });

const CustomDatePicker: React.FC = () => {
  const dispatch = useDispatch();
  const deadlineDate = useSelector((state) => state.deadline.date);
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const handleDateChange = (e: { value: Date }) => {
    dispatch(setDeadlineDate(e.value)); 
  };

  const formattedJalaliDate = deadlineDate
    ? moment(deadlineDate).format("jD jMMMM jYYYY") 
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
        value={formattedJalaliDate} 
      />

      <DatePicker
        onChange={handleDateChange}
        accentColor="#7c3aed"
        locale="fa" 
        inputClass="w-14 h-9 bg-[#7c3aed] rounded-md text-[#7c3aed] focus:outline-none absolute right-0 cursor-pointer" // Position the calendar absolutely
      />
    </div>
  );
};

export default CustomDatePicker;
