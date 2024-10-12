import { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Card, CardContent, CardDescription, CardFooter } from "../../ui/card";
import moment from "moment-jalaali"; // Import moment-jalaali for Jalali date formatting
import NoteActions from "../../../note actions/noteActions";
import { useDispatch } from "react-redux";
import {
  selectNote,
  startEditing,
} from "../../../store/slices/selectedNoteSlice"; // Import startEditing

interface NoteCardProps {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deadlineDate: Date;
  deadlineTime?: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void; // Include moveCard type
}

const NoteCard: React.FC<NoteCardProps> = ({
  id,
  content,
  createdAt,
  updatedAt,
  deadlineDate,
  deadlineTime,
  index,
  moveCard,
}) => {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag({
    type: "note",
    item: { id, index }, // Include index in item
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "note",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveCard(item.index, index); // Call moveCard when hovering
        item.index = index; // Update the index to the new position
      }
    },
  });

  // Format createdAt and updatedAt to show both date and time
  const formattedCreatedAt = moment(createdAt).format(
    "jD jMMMM jYYYY [ساعت] HH:mm"
  );
  const formattedUpdatedAt = moment(updatedAt).format(
    "jD jMMMM jYYYY [ساعت] HH:mm"
  );

  // Format the deadline date to Jalali format
  const formattedDeadlineDate = deadlineDate
    ? moment(deadlineDate).format("jD jMMMM jYYYY")
    : "";

  const formattedDeadlineTime = deadlineTime ? deadlineTime : "";

  // Check if the deadline has been reached
  const currentDateTime = moment();
  const deadlineDateTime = moment(deadlineDate).set({
    hour: deadlineTime ? parseInt(deadlineTime.split(":")[0]) : 23, // Set to end of the day if no time
    minute: deadlineTime ? parseInt(deadlineTime.split(":")[1]) : 59,
    second: 59,
  });

  const isDeadlineReached = currentDateTime.isAfter(deadlineDateTime);

  return (
    <div
      ref={(node) => drag(drop(node))} // Combine drag and drop refs
      className="relative w-60 aspect-square"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => {
        dispatch(
          selectNote({
            id,
            content,
            createdAt,
            updatedAt,
            deadlineDate,
            deadlineTime,
          })
        );
        dispatch(startEditing()); // Ensure that we start editing when clicking
      }} // Dispatch selectNote on click
    >
      {isDeadlineReached && (
        <span className="w-4 h-4 animate-ping absolute z-10 inline-flex rounded-full bg-red-600 opacity-75"></span>
      )}
      <Card
        className={`p-4 group transition-all duration-100 ${
          isDeadlineReached && "bg-slate-100 animate-pulse duration-[3000]"
        }`}
      >
        {/* Display the formatted createdAt or updatedAt date */}
        <CardDescription className="text-xs font-extralight mb-2">
          {updatedAt
            ? `ویرایش شده در ${formattedUpdatedAt}`
            : `ایجاد شده در ${formattedCreatedAt}`}
        </CardDescription>

        <CardContent className="text-sm h-32 p-2 mb-2 overflow-hidden">
          {content}
        </CardContent>

        <CardFooter className="h-12 p-0 items-center justify-start rtl:space-x-reverse space-x-3">
          <NoteActions noteId={id} />
        </CardFooter>

        <span
          className={`text-xs font-light ${
            isDeadlineReached && "animate-pulse text-red-500"
          }`}
        >
          {`زمان یادآوری: ${formattedDeadlineDate} `}
          {formattedDeadlineTime ? `ساعت ${formattedDeadlineTime}` : ""}
        </span>
      </Card>
    </div>
  );
};

export default NoteCard;
