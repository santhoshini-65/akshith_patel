import type { FC, TextareaHTMLAttributes } from "react";

export const Textarea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea {...props} />
);

export default Textarea;
