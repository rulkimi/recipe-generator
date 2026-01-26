import { useState, useRef } from "react";
import { setStoredFeedback, getStoredFeedback } from "@/lib/feedback-storage";
import { giveFeedback } from "@/actions/feedback";

export function useFeedback(initialGood: number, initialBad: number, id: string) {
  const [counts, setCounts] = useState({ good: initialGood, bad: initialBad });
  const [given, setGiven] = useState(getStoredFeedback(id));
  const [pending, setPending] = useState(false);
  const seq = useRef(0);

  const send = async (type: "good" | "bad") => {
    if (pending || type === given) return;

    setPending(true);
    const thisReq = ++seq.current;
    const prev = given;

    // optimistic update
    setCounts(c => ({
      good: c.good + (type === "good" ? 1 : 0) - (prev === "good" ? 1 : 0),
      bad:  c.bad  + (type === "bad"  ? 1 : 0) - (prev === "bad"  ? 1 : 0),
    }));
    setGiven(type);
    setStoredFeedback(id, type);

    try {
      await giveFeedback(id, type, prev ?? undefined);
    } catch {
      // rollback
      if (thisReq === seq.current) {
        setCounts(c => ({
          good: c.good - (type === "good" ? 1 : 0) + (prev === "good" ? 1 : 0),
          bad:  c.bad  - (type === "bad"  ? 1 : 0) + (prev === "bad"  ? 1 : 0)
        }));
        setGiven(prev);
        setStoredFeedback(id, prev);
      }
    } finally {
      if (thisReq === seq.current) setPending(false);
    }
  };

  return { counts, given, pending, send };
}
