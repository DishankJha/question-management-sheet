import { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import useTopics from "./hooks/useTopics";
import TopicCard from "./TopicCard/TopicCard";

export default function TopicsSection({ setCompleted }) {
  const [openTopic, setOpenTopic] = useState(null);
  const [openSubTopic, setOpenSubTopic] = useState(null);

  const [newTopic, setNewTopic] = useState("");
  const [newSubTopic, setNewSubTopic] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [newLink, setNewLink] = useState(""); // <-- NEW

  const {
    topics,
    setTopics,
    loading,
    error,
    recalcTopic,
    toggleQuestion,
    deleteQuestion,
    deleteSubTopic,
    deleteTopic,
    editTopic,
    editSubTopic,
    editQuestion,
  } = useTopics(setCompleted);

  if (loading)
    return <div className="p-6 text-blue-700 bg-blue-50">Loading...</div>;

  if (error)
    return <div className="p-6 text-red-700 bg-red-50">{error}</div>;

  const addTopic = () => {
    if (!newTopic.trim()) return;

    setTopics((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newTopic,
        done: 0,
        total: 0,
        subTopics: [],
      },
    ]);

    setNewTopic("");
  };

  const addSubTopic = (topicId) => {
    if (!newSubTopic.trim()) return;

    setTopics((prev) =>
      prev.map((t) =>
        t.id === topicId
          ? {
              ...t,
              subTopics: [
                ...t.subTopics,
                {
                  id: Date.now().toString(),
                  title: newSubTopic,
                  done: 0,
                  total: 0,
                  questions: [],
                },
              ],
            }
          : t
      )
    );

    setNewSubTopic("");
  };

  const addQuestion = (topicId, subId) => {
    if (!newQuestion.trim()) return;

    setTopics((prev) =>
      prev.map((t) =>
        t.id === topicId
          ? recalcTopic({
              ...t,
              subTopics: t.subTopics.map((s) =>
                s.id === subId
                  ? {
                      ...s,
                      questions: [
                        ...s.questions,
                        {
                          id: Date.now().toString(),
                          text: newQuestion,
                          link: newLink, // <-- NEW
                          completed: false,
                        },
                      ],
                    }
                  : s
              ),
            })
          : t
      )
    );

    setNewQuestion("");
    setNewLink(""); // clear after add
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { type, source, destination } = result;

    if (type === "TOPIC") {
      setTopics((prev) =>
        reorder(prev, source.index, destination.index)
      );
      return;
    }

    if (type === "SUBTOPIC") {
      setTopics((prev) =>
        prev.map((t) =>
          t.id.toString() === source.droppableId
            ? {
                ...t,
                subTopics: reorder(
                  t.subTopics,
                  source.index,
                  destination.index
                ),
              }
            : t
        )
      );
      return;
    }

    if (type === "QUESTION") {
      const [tId, sId] = source.droppableId.split("-");

      setTopics((prev) =>
        prev.map((t) =>
          t.id.toString() === tId
            ? {
                ...t,
                subTopics: t.subTopics.map((s) =>
                  s.id.toString() === sId
                    ? {
                        ...s,
                        questions: reorder(
                          s.questions,
                          source.index,
                          destination.index
                        ),
                      }
                    : s
                ),
              }
            : t
        )
      );
    }
  };

  return (
    <div className="px-8 py-4 space-y-3">
      <div className="flex gap-2 items-center mb-4">
        <input
          className="border px-3 py-1 rounded text-sm"
          placeholder="New topic..."
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
        />
        <button onClick={addTopic} className="text-blue-600">
          + Add Topic
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="topics" type="TOPIC">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {topics.map((topic, tIndex) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  tIndex={tIndex}
                  openTopic={openTopic}
                  setOpenTopic={setOpenTopic}
                  openSubTopic={openSubTopic}
                  setOpenSubTopic={setOpenSubTopic}
                  newSubTopic={newSubTopic}
                  setNewSubTopic={setNewSubTopic}
                  newQuestion={newQuestion}
                  setNewQuestion={setNewQuestion}
                  newLink={newLink}
                  setNewLink={setNewLink}
                  addSubTopic={addSubTopic}
                  addQuestion={addQuestion}
                  toggleQuestion={toggleQuestion}
                  deleteTopic={deleteTopic}
                  deleteSubTopic={deleteSubTopic}
                  deleteQuestion={deleteQuestion}
                  editTopic={editTopic}
                  editSubTopic={editSubTopic}
                  editQuestion={editQuestion}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
