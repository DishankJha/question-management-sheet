import { Droppable, Draggable } from "@hello-pangea/dnd";
import QuestionRow from "../QuestionRow/QuestionRow";
import { useState } from "react";

export default function SubTopicCard({
  sub,
  sIndex,
  topicId,
  openSubTopic,
  setOpenSubTopic,
  addQuestion,
  newQuestion,
  setNewQuestion,
  newLink,
  setNewLink,
  toggleQuestion,
  deleteSubTopic,
  deleteQuestion,
  editSubTopic,
  editQuestion,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(sub.title);

  return (
    <Draggable draggableId={sub.id.toString()} index={sIndex}>
      {(provSub) => (
        <div ref={provSub.innerRef} {...provSub.draggableProps}>
          <div className="bg-white rounded-md border px-4 py-2 flex justify-between items-center">
            {isEditing ? (
              <input
                className="border px-2 py-1 rounded text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => {
                  editSubTopic(topicId, sub.id, title);
                  setIsEditing(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    editSubTopic(topicId, sub.id, title);
                    setIsEditing(false);
                  }
                }}
              />
            ) : (
              <span>{sub.title}</span>
            )}

            <div className="flex gap-3">
              <span {...provSub.dragHandleProps}>☰</span>

              <span
                className="cursor-pointer"
                onClick={() =>
                  setOpenSubTopic(openSubTopic === sub.id ? null : sub.id)
                }
              >
                {openSubTopic === sub.id ? "▼" : "▶"}
              </span>

              <span
                className="cursor-pointer text-blue-600"
                onClick={() => setIsEditing(!isEditing)}
              >
                ✏️
              </span>

              <span
                className="text-red-500 cursor-pointer"
                onClick={() => deleteSubTopic(topicId, sub.id)}
              >
                🗑️
              </span>
            </div>
          </div>

          {openSubTopic === sub.id && (
            <div className="ml-6 mt-2 p-3 bg-white border">
              <div className="flex gap-2 mb-2">
                <input
                  className="border px-3 py-1 rounded text-sm w-1/2"
                  placeholder="New question..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
                <input
                  className="border px-3 py-1 rounded text-sm w-1/2"
                  placeholder="Optional link..."
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                />
                <button
                  onClick={() => addQuestion(topicId, sub.id)}
                  className="text-blue-600"
                >
                  + Add Question
                </button>
              </div>

              <Droppable
                droppableId={`${topicId}-${sub.id}`}
                type="QUESTION"
              >
                {(provQ) => (
                  <div ref={provQ.innerRef} {...provQ.droppableProps}>
                    {sub.questions.map((q, qIndex) => (
                      <QuestionRow
                        key={q.id}
                        q={q}
                        qIndex={qIndex}
                        topicId={topicId}
                        subId={sub.id}
                        toggleQuestion={toggleQuestion}
                        deleteQuestion={deleteQuestion}
                        editQuestion={editQuestion}
                      />
                    ))}
                    {provQ.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
