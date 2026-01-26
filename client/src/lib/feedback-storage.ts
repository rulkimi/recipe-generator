const KEY = "feedback_map_v2";

export type FeedbackType = "good" | "bad" | null;

export function getFeedbackMap(): Record<string, FeedbackType> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function getStoredFeedback(id: string): FeedbackType {
  const map = getFeedbackMap();
  return map[id] ?? null;
}

export function setStoredFeedback(id: string, type: FeedbackType) {
  const map = getFeedbackMap();
  if (type === null) {
    delete map[id];
  } else {
    map[id] = type;
  }
  localStorage.setItem(KEY, JSON.stringify(map));
}
