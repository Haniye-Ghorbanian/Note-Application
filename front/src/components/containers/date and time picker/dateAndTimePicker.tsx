import CustomDatePicker from "./date picker/datePicker";
import CustomTimePicker from "./time picker/timePicker";

interface DateAndTimePickerProps {
  setDeadlineDate: (date: Date | null) => void;
  setDeadlineTime: (time: Date | null) => void;
}

const DateAndTimePicker: React.FC<DateAndTimePickerProps> = ({
  setDeadlineDate,
  setDeadlineTime,
}) => {
  return (
    <div className="w-full flex items-center justify-between space-x-4 mt-12 mb-4">
      <CustomDatePicker setDeadlineDate={setDeadlineDate} />
      <CustomTimePicker setDeadlineTime={setDeadlineTime} />
    </div>
  );
};

export default DateAndTimePicker;
