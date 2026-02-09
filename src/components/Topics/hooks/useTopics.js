import { useState, useEffect } from "react";

export default function useTopics(setCompleted) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSheet = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/striver-sde-sheet"
        );

        const data = await res.json();
        const sheet = data?.data?.sheet;

        if (!sheet) throw new Error("Invalid API response");

        const { topicOrder } = sheet.config;

        const mappedTopics = topicOrder.map((topicName, tIndex) => {
          const questionsForTopic =
            sheet.questions?.filter((q) => q.topic === topicName) || [];

          const subTopicMap = {};

          questionsForTopic.forEach((q) => {
            const sub = q.subTopic || "General";

            if (!subTopicMap[sub]) {
              subTopicMap[sub] = [];
            }

            subTopicMap[sub].push({
              id: q._id,
              text: q.title || q.problem || "Untitled Question",
              link: q.link || "", // <-- NEW FIELD
              completed: false,
            });
          });

          const subTopics = Object.entries(subTopicMap).map(
            ([subTitle, questions], sIndex) => ({
              id: `${tIndex}-${sIndex}`,
              title: subTitle,
              done: 0,
              total: questions.length,
              questions,
            })
          );

          return {
            id: tIndex + 1,
            title: topicName,
            done: 0,
            total: questionsForTopic.length,
            subTopics,
          };
        });

        setTopics(mappedTopics);
        recalcAllProgress(mappedTopics);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSheet();
  }, []);

  const recalcSubTopic = (sub) => {
    const total = sub.questions.length;
    const done = sub.questions.filter((q) => q.completed).length;
    return { ...sub, total, done };
  };

  const recalcTopic = (topic) => {
    let total = 0;
    let done = 0;

    const updatedSubs = topic.subTopics.map((sub) => {
      const newSub = recalcSubTopic(sub);
      total += newSub.total;
      done += newSub.done;
      return newSub;
    });

    return { ...topic, subTopics: updatedSubs, total, done };
  };

  const recalcAllProgress = (topicsList) => {
    let done = 0;
    topicsList.forEach((topic) => {
      done += topic.done;
    });
    setCompleted(done);
  };

  const updateTopics = (updater) => {
    setTopics((prev) => {
      const updated =
        typeof updater === "function" ? updater(prev) : updater;

      recalcAllProgress(updated);
      return updated;
    });
  };

  const toggleQuestion = (topicId, subTopicId, qId) => {
    updateTopics((prev) =>
      prev.map((t) =>
        t.id === topicId
          ? recalcTopic({
              ...t,
              subTopics: t.subTopics.map((s) =>
                s.id === subTopicId
                  ? {
                      ...s,
                      questions: s.questions.map((q) =>
                        q.id === qId
                          ? { ...q, completed: !q.completed }
                          : q
                      ),
                    }
                  : s
              ),
            })
          : t
      )
    );
  };

  const deleteQuestion = (topicId, subTopicId, qId) => {
    updateTopics((prev) =>
      prev.map((t) =>
        t.id === topicId
          ? recalcTopic({
              ...t,
              subTopics: t.subTopics.map((s) =>
                s.id === subTopicId
                  ? {
                      ...s,
                      questions: s.questions.filter(
                        (q) => q.id !== qId
                      ),
                    }
                  : s
              ),
            })
          : t
      )
    );
  };

  const deleteSubTopic = (topicId, subTopicId) => {
    updateTopics((prev) =>
      prev.map((t) =>
        t.id === topicId
          ? recalcTopic({
              ...t,
              subTopics: t.subTopics.filter((s) => s.id !== subTopicId),
            })
          : t
      )
    );
  };

  const deleteTopic = (topicId) => {
    updateTopics((prev) => prev.filter((t) => t.id !== topicId));
  };

  const editTopic = (topicId, newTitle) => {
    updateTopics((prev) =>
      prev.map((t) =>
        t.id === topicId ? { ...t, title: newTitle } : t
      )
    );
  };

  const editSubTopic = (topicId, subTopicId, newTitle) => {
    updateTopics((prev) =>
      prev.map((t) =>
        t.id === topicId
          ? {
              ...t,
              subTopics: t.subTopics.map((s) =>
                s.id === subTopicId ? { ...s, title: newTitle } : s
              ),
            }
          : t
      )
    );
  };

  const editQuestion = (topicId, subTopicId, qId, newText, newLink) => {
    updateTopics((prev) =>
      prev.map((t) =>
        t.id === topicId
          ? recalcTopic({
              ...t,
              subTopics: t.subTopics.map((s) =>
                s.id === subTopicId
                  ? {
                      ...s,
                      questions: s.questions.map((q) =>
                        q.id === qId
                          ? { ...q, text: newText, link: newLink ?? q.link }
                          : q
                      ),
                    }
                  : s
              ),
            })
          : t
      )
    );
  };

  return {
    topics,
    setTopics: updateTopics,
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
  };
}
