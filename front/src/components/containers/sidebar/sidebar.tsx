import { Form } from "../note creation form/form";

export function Sidebar() {
  return (
    <div className="fixed top-4 right-4 min-h-screen overflow-hidden w-1/4 ">
      <Form />
    </div>
  );
}
