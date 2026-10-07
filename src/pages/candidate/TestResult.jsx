import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { resultService } from "../../services/resultService";
import { questionService } from "../../services/questionService";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { ProgressBar } from "../../components/common/ProgressBar";
import { LoadingState } from "../../components/common/LoadingState";
import { CodeSnippetViewer } from "../../components/assessment/CodeSnippetViewer";
import { CheckCircle2, XCircle, Clock, Trophy, Award, ArrowRight, RotateCcw } from "lucide-react";
import { formatDuration } from "../../utils/formatters";

export const TestResult = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResult = async () => {
      try {
        const foundResult = await resultService.getResultById(id);
        setResult(foundResult);
        const questionIds = Object.keys(foundResult.answers || {});
        setQuestions(await questionService.getQuestionsByIds(questionIds));
      } catch (err) { console.error("Result fetch error:", err); }
      finally { setLoading(false); }
    };
    loadResult();
  }, [id]);

  if (loading) return <LoadingState message="Compiling assessment evaluation..." />;
  if (!result) return <div className="section-card mx-auto max-w-2xl p-10 text-center text-sm text-stone-500">Result record not found.</div>;

  const isPassed = result.status === "PASSED";
  const correct = result.correctCount || 0;
  const incorrect = result.incorrectCount || 0;
  const unanswered = Math.max(0, questions.length - correct - incorrect);

  return (
    <div className="mx-auto max-w-5xl space-y-7 pb-12">
      <section className="relative overflow-hidden rounded-[28px] border border-stone-200/90 bg-white/90 p-6 shadow-[0_18px_50px_rgba(54,47,38,.08)] dark:border-stone-700 dark:bg-stone-900/85 sm:p-8">
        <div className={`absolute right-0 top-0 h-48 w-48 rounded-full blur-3xl ${isPassed ? "bg-sage-200/40 dark:bg-sage-700/10" : "bg-rose-200/40 dark:bg-rose-700/10"}`} />
        <div className="relative grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className={`mx-auto flex h-36 w-36 items-center justify-center rounded-full p-2 sm:h-40 sm:w-40 ${isPassed ? "bg-sage-50 dark:bg-sage-700/10" : "bg-rose-50 dark:bg-rose-950/20"}`}>
            <div className={`flex h-full w-full flex-col items-center justify-center rounded-full border-8 bg-white dark:bg-stone-900 ${isPassed ? "border-sage-200 text-sage-700 dark:border-sage-700/50 dark:text-sage-300" : "border-rose-200 text-rose-600 dark:border-rose-800/50 dark:text-rose-300"}`}>
              <span className="text-3xl font-black tracking-[-.04em]">{result.percentage}%</span><span className="mt-1 text-[9px] font-extrabold uppercase tracking-[.13em] text-stone-400">Score</span>
            </div>
          </div>
          <div>
            <Badge variant={isPassed ? "success" : "danger"}>{result.status}</Badge>
            <h1 className="mt-3 text-3xl font-black tracking-[-.04em] text-stone-900 dark:text-stone-50 sm:text-4xl">{isPassed ? "Strong work." : "Keep building."}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500 dark:text-stone-400">You scored <span className="font-bold text-stone-800 dark:text-stone-200">{result.score} / {result.totalMarks}</span>. Review the breakdown below to see where you performed well and where another pass would help.</p>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div className="rounded-xl bg-stone-50 p-3 dark:bg-stone-800/50"><Clock className="h-4 w-4 text-brand-500" /><p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-stone-400">Time</p><p className="mt-1 text-xs font-black">{formatDuration(result.timeTakenSeconds)}</p></div>
              <div className="rounded-xl bg-stone-50 p-3 dark:bg-stone-800/50"><Trophy className="h-4 w-4 text-amber-500" /><p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-stone-400">Rank</p><p className="mt-1 text-xs font-black">#{result.rank || 1}</p></div>
              <div className="rounded-xl bg-sage-50 p-3 dark:bg-sage-700/10"><CheckCircle2 className="h-4 w-4 text-sage-600" /><p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-stone-400">Correct</p><p className="mt-1 text-xs font-black text-sage-700 dark:text-sage-300">{correct}</p></div>
              <div className="rounded-xl bg-rose-50 p-3 dark:bg-rose-950/20"><XCircle className="h-4 w-4 text-rose-500" /><p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-stone-400">Incorrect</p><p className="mt-1 text-xs font-black text-rose-700 dark:text-rose-300">{incorrect}</p></div>
            </div>
          </div>
        </div>
      </section>

      {result.categoryBreakdown && <section className="section-card p-6"><div className="flex items-center gap-2"><Award className="h-5 w-5 text-brand-600" /><div><p className="section-heading">Category performance</p><p className="mt-1 text-[11px] text-stone-400">A quick view of where your score came from</p></div></div><div className="mt-5 space-y-4">{Object.entries(result.categoryBreakdown).map(([cat, pct]) => <ProgressBar key={cat} label={cat} progress={pct} max={100} color={pct >= 70 ? "emerald" : pct >= 40 ? "amber" : "rose"} />)}</div></section>}

      <section>
        <div className="mb-4"><p className="eyebrow">Review</p><h2 className="mt-1 text-xl font-black tracking-[-.025em]">Question-by-question breakdown</h2><p className="mt-1 text-xs text-stone-500">Use the explanations to turn mistakes into the next improvement.</p></div>
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const candidateAnswerId = result.answers[q.id];
            const isCorrect = candidateAnswerId === q.correctOptionId;
            const candidateOption = q.options.find((o) => o.id === candidateAnswerId);
            const correctOption = q.options.find((o) => o.id === q.correctOptionId);
            return <article key={q.id} className={`rounded-2xl border bg-white/90 p-5 shadow-sm dark:bg-stone-900/85 sm:p-6 ${isCorrect ? "border-sage-200 dark:border-sage-800/60" : "border-rose-200 dark:border-rose-800/60"}`}>
              <div className="flex items-center justify-between gap-3 border-b border-stone-100 pb-3 dark:border-stone-800"><span className="text-xs font-black">Question {idx + 1}</span><Badge variant={isCorrect ? "success" : "danger"}>{isCorrect ? "Correct" : candidateOption ? "Incorrect" : "Unanswered"}</Badge></div>
              <p className="mt-4 text-sm font-semibold leading-6 text-stone-900 dark:text-stone-100">{q.text}</p>
              {q.codeSnippet && <div className="mt-4"><CodeSnippetViewer code={q.codeSnippet} language={q.category.toLowerCase()} /></div>}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className={`rounded-xl border p-3 text-xs ${isCorrect ? "border-sage-200 bg-sage-50 text-sage-800 dark:border-sage-800 dark:bg-sage-700/10 dark:text-sage-300" : "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/20 dark:text-rose-300"}`}><span className="mb-1 block text-[10px] font-extrabold uppercase tracking-wider opacity-70">Your answer</span>{candidateOption ? candidateOption.text : "Unanswered"}</div>
                <div className="rounded-xl border border-sage-200 bg-sage-50 p-3 text-xs text-sage-800 dark:border-sage-800 dark:bg-sage-700/10 dark:text-sage-300"><span className="mb-1 block text-[10px] font-extrabold uppercase tracking-wider opacity-70">Correct answer</span>{correctOption?.text}</div>
              </div>
              {q.explanation && <div className="mt-3 rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs leading-5 text-stone-600 dark:border-stone-700 dark:bg-stone-800/50 dark:text-stone-300"><span className="mb-1 block font-bold text-stone-800 dark:text-stone-100">Explanation</span>{q.explanation}</div>}
            </article>;
          })}
        </div>
      </section>

      <div className="flex flex-col justify-between gap-3 border-t border-stone-200 pt-5 dark:border-stone-800 sm:flex-row sm:items-center"><Link to="/candidate/dashboard"><Button variant="secondary">Back to dashboard</Button></Link><div className="flex gap-2"><Link to="/candidate/tests"><Button variant="outline" icon={RotateCcw}>Take another test</Button></Link><Link to="/candidate/leaderboard"><Button icon={ArrowRight}>View leaderboard</Button></Link></div></div>
    </div>
  );
};
