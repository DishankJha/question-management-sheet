import { Droppable, Draggable } from "@hello-pangea/dnd";
import SubTopicCard from "../SubTopicCard/SubTopicCard";
import { useState } from "react";

export default function TopicCard({
  topic,
  tIndex,
  openTopic,
  setOpenTopic,
  openSubTopic,
  setOpenSubTopic,
  newSubTopic,
  setNewSubTopic,
  addSubTopic,
  addQuestion,
  newQuestion,
  setNewQuestion,
  newLink,
  setNewLink,
  toggleQuestion,
  deleteTopic,
  deleteSubTopic,
  deleteQuestion,
  editTopic,
  editSubTopic,
  editQuestion,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(topic.title);

  return (
    <Draggable draggableId={topic.id.toString()} index={tIndex}>
      {(provT) => (
        <div ref={provT.innerRef} {...provT.draggableProps}>
          <div className="bg-white rounded-lg shadow-sm border px-6 py-4 flex justify-between items-center">
            {isEditing ? (
              <input
                className="border px-2 py-1 rounded text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => {
                  editTopic(topic.id, title);
                  setIsEditing(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    editTopic(topic.id, title);
                    setIsEditing(false);
                  }
                }}
              />
            ) : (
              <span className="font-semibold">{topic.title}</span>
            )}

            <div className="flex gap-4">
              <span {...provT.dragHandleProps}>☰</span>

              <span
                className="cursor-pointer"
                onClick={() =>
                  setOpenTopic(openTopic === topic.id ? null : topic.id)
                }
              >
                {openTopic === topic.id ? "▼" : "▶"}
              </span>

              <span>
                {topic.done} / {topic.total}
              </span>

              <span
                className="cursor-pointer text-blue-600"
                onClick={() => setIsEditing(!isEditing)}
              >
                ✏️
              </span>

              <span
                className="text-red-500 cursor-pointer"
                onClick={() => deleteTopic(topic.id)}
              >
                🗑️
              </span>
            </div>
          </div>

          {openTopic === topic.id && (
            <div className="ml-6 mt-2 p-4 bg-gray-50 rounded-lg border">
              <div className="flex gap-2 mb-2">
                <input
                  className="border px-3 py-1 rounded text-sm"
                  placeholder="New sub-topic..."
                  value={newSubTopic}
                  onChange={(e) => setNewSubTopic(e.target.value)}
                />
                <button
                  onClick={() => addSubTopic(topic.id)}
                  className="text-blue-600"
                >
                  + Add Sub-topic
                </button>
              </div>

              <Droppable droppableId={topic.id.toString()} type="SUBTOPIC">
                {(provS) => (
                  <div ref={provS.innerRef} {...provS.droppableProps}>
                    {topic.subTopics.map((sub, sIndex) => (
                      <SubTopicCard
                        key={sub.id}
                        sub={sub}
                        sIndex={sIndex}
                        topicId={topic.id}
                        openSubTopic={openSubTopic}
                        setOpenSubTopic={setOpenSubTopic}
                        addQuestion={addQuestion}
                        newQuestion={newQuestion}
                        setNewQuestion={setNewQuestion}
                        newLink={newLink}
                        setNewLink={setNewLink}
                        toggleQuestion={toggleQuestion}
                        deleteSubTopic={deleteSubTopic}
                        deleteQuestion={deleteQuestion}
                        editSubTopic={editSubTopic}
                        editQuestion={editQuestion}
                      />
                    ))}
                    {provS.placeholder}
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
