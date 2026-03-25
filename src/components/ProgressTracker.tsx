"use client";

import { useState, useEffect, useCallback } from "react";
import { curriculum } from "@/data/curriculum";

const STORAGE_KEY = "fastnlp-progress";

interface ProgressState {
  completedDays: string[];
  completedConcepts: string[];
}

function useProgress() {
  const [progress, setProgress] = useState<ProgressState>({
    completedDays: [],
    completedConcepts: [],
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const save = useCallback((newProgress: ProgressState) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  }, []);

  const toggleDay = useCallback(
    (slug: string) => {
      const current = progress.completedDays;
      const updated = current.includes(slug)
        ? current.filter((d) => d !== slug)
        : [...current, slug];
      save({ ...progress, completedDays: updated });
    },
    [progress, save]
  );

  const toggleConcept = useCallback(
    (slug: string) => {
      const current = progress.completedConcepts;
      const updated = current.includes(slug)
        ? current.filter((c) => c !== slug)
        : [...current, slug];
      save({ ...progress, completedConcepts: updated });
    },
    [progress, save]
  );

  const reset = useCallback(() => {
    const empty: ProgressState = { completedDays: [], completedConcepts: [] };
    save(empty);
  }, [save]);

  return { progress, toggleDay, toggleConcept, reset };
}

// Global progress bar (shown in sidebar / overview pages)
export function GlobalProgressBar() {
  const { progress, reset } = useProgress();

  const totalDays = curriculum.reduce((sum, w) => sum + w.days.length, 0);
  const completedDays = progress.completedDays.length;
  const pct = Math.round((completedDays / totalDays) * 100);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-display font-semibold text-sm">Your progress</p>
          <p className="text-xs text-[var(--ink-3)] mt-0.5">
            {completedDays} of {totalDays} days completed
          </p>
        </div>
        <span className="font-display font-bold text-2xl text-[var(--ember)]">{pct}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-cream-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--ember)] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Week breakdown */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {curriculum.map((week) => {
          const weekDaySlugs = week.days.map((d) => d.slug);
          const weekCompleted = weekDaySlugs.filter((s) =>
            progress.completedDays.includes(s)
          ).length;
          const weekPct = Math.round((weekCompleted / weekDaySlugs.length) * 100);

          return (
            <div key={week.week} className="text-center">
              <div
                className="h-1 rounded-full mb-1 overflow-hidden"
                style={{ background: `${week.accent}30` }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${weekPct}%`,
                    backgroundColor: week.accent,
                  }}
                />
              </div>
              <p className="text-xs text-[var(--ink-3)]">W{week.week}</p>
            </div>
          );
        })}
      </div>

      {completedDays > 0 && (
        <button
          onClick={reset}
          className="mt-3 text-xs text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors"
        >
          Reset progress
        </button>
      )}
    </div>
  );
}

// Day completion toggle (shown on day cards)
export function DayCheckbox({ slug, label }: { slug: string; label: string }) {
  const { progress, toggleDay } = useProgress();
  const isComplete = progress.completedDays.includes(slug);

  return (
    <button
      onClick={() => toggleDay(slug)}
      className={`flex items-center gap-2 text-sm transition-colors ${
        isComplete ? "text-emerald-600" : "text-[var(--ink-3)] hover:text-[var(--ink)]"
      }`}
    >
      <div
        className={`flex h-5 w-5 items-center justify-center rounded border transition-all ${
          isComplete
            ? "bg-emerald-500 border-emerald-500 text-white"
            : "border-[var(--border-strong)]"
        }`}
      >
        {isComplete && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      {label}
    </button>
  );
}
