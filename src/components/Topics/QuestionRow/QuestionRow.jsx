import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

export default function QuestionRow({
  q,
  qIndex,
  topicId,
  subId,
  toggleQuestion,
  deleteQuestion,
  editQuestion,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(q.text);
  const [link, setLink] = useState(q.link || "");

  const openLink = () => {
    if (q.link) {
      window.open(q.link, "_blank");
    }
  };

  return (
    <Draggable draggableId={q.id.toString()} index={qIndex}>
      {(provQd) => (
        <div
          ref={provQd.innerRef}
          {...provQd.draggableProps}
          className="flex items-center gap-2 pl-2 border-l-2"
        >
          <input
            type="checkbox"
            checked={q.completed}
            onChange={() => toggleQuestion(topicId, subId, q.id)}
          />

          {isEditing ? (
            <div className="flex flex-col w-full gap-1">
              <input
                className="w-full border px-2 py-1 rounded text-sm"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <input
                className="w-full border px-2 py-1 rounded text-sm"
                placeholder="Optional link..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              <button
                className="text-xs text-blue-600 self-start"
                onClick={() => {
                  editQuestion(topicId, subId, q.id, text, link);
                  setIsEditing(false);
                }}
              >
                Save
              </button>
            </div>
          ) : q.link ? (
            <span
              className="text-blue-600 underline cursor-pointer"
              onClick={openLink}
            >
              {q.text}
            </span>
          ) : (
            <span>{q.text}</span>
          )}

          <span {...provQd.dragHandleProps}>☰</span>

          <span
            className="cursor-pointer text-blue-600"
            onClick={() => setIsEditing(!isEditing)}
          >
            ✏️
          </span>

          <span
            className="text-red-500 cursor-pointer"
            onClick={() => deleteQuestion(topicId, subId, q.id)}
          >
            🗑️
          </span>
        </div>
      )}
    </Draggable>
  );
}
