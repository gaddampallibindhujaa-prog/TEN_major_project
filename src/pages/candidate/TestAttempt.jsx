import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAssessment } from "../../context/AssessmentContext";
import { useAuth } from "../../context/AuthContext";
import { Timer } from "../../components/assessment/Timer";
import { QuestionNavigator } from "../../components/assessment/QuestionNavigator";
import { CodeSnippetViewer } from "../../components/assessment/CodeSnippetViewer";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { Badge } from "../../components/common/Badge";
import { Bookmark, ChevronLeft, ChevronRight, RotateCcw, Send, AlertCircle, CheckCircle2, Flag } from "lucide-react";

export const TestAttempt = () => {
  const { activeTest, questions, currentQuestionIndex, setCurrentQuestionIndex, selectedAnswers, markedForReview, timeLeft, selectOption, clearAnswer, toggleMarkForReview, submitTest, isSubmitting } = useAssessment();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    if (!activeTest) navigate("/candidate/tests");
  }, [activeTest, navigate]);

  if (!activeTest || !questions.length) return null;

  const currentQ = questions[currentQuestionIndex];
  const selectedOptionId = selectedAnswers[currentQ?.id];
  const isMarked = markedForReview.has(currentQ?.id);
  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = questions.length - answeredCount;
  const progress = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const handleFinalSubmit = async () => {
    const res = await submitTest(user);
    if (res?.id) navigate(`/candidate/results/${res.id}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-stone-900 dark:bg-[#191a18] dark:text-stone-100">
      <header className="sticky top-0 z-40 border-b border-stone-200/90 bg-[#fffdf8]/95 px-4 py-3 shadow-[0_8px_25px_rgba(54,47,38,.06)] backdrop-blur-xl dark:border-stone-700 dark:bg-stone-900/95 sm:px-6">
        <div className="mx-auto flex max-w-[1450px] items-center justify-between gap-4">
          <div className="min-w-0 flex-1"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand-500" /><span className="text-[10px] font-extrabold uppercase tracking-[.15em] text-brand-600 dark:text-brand-400">Live assessment</span></div><h2 className="mt-1 truncate text-sm font-black tracking-[-.01em] sm:text-base">{activeTest.title}</h2></div>
          <div className="flex items-center gap-3"><Timer secondsLeft={timeLeft} /><Button variant="primary" size="sm" icon={Send} onClick={() => setShowSubmitModal(true)}>Submit</Button></div>
        </div>
        <div className="mx-auto mt-3 h-1 max-w-[1450px] overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800"><div className="h-full rounded-full bg-brand-500 transition-all duration-300" style={{ width: `${progress}%` }} /></div>
      </header>

      <main className="mx-auto grid w-full max-w-[1450px] grid-cols-1 gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_290px]">
        <section className="rounded-[24px] border border-stone-200/90 bg-white/90 p-5 shadow-[0_15px_45px_rgba(54,47,38,.07)] dark:border-stone-700 dark:bg-stone-900/85 sm:p-7">
          <div className="flex flex-col gap-4 border-b border-stone-100 pb-5 dark:border-stone-800 sm:flex-row sm:items-center sm:justify-between">
            <div><div className="flex flex-wrap items-center gap-2"><span className="text-sm font-black">Question {currentQuestionIndex + 1}<span className="font-medium text-stone-400"> / {questions.length}</span></span><Badge variant="brand">{currentQ?.category}</Badge><Badge variant="default">+{currentQ?.marks} marks</Badge>{activeTest.negativeMarking && <Badge variant="danger">-{currentQ?.negativeMarks || 1} neg</Badge>}</div><p className="mt-1 text-[11px] text-stone-400">Read carefully, choose one option, then continue.</p></div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleMarkForReview(currentQ.id)} className={`focus-ring inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[11px] font-bold transition-colors ${isMarked ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-300" : "border-stone-200 text-stone-500 hover:border-brand-200 hover:text-brand-600 dark:border-stone-700"}`}><Bookmark className={`h-3.5 w-3.5 ${isMarked ? "fill-amber-500" : ""}`} />{isMarked ? "Marked" : "Review"}</button>
              {selectedOptionId && <button onClick={() => clearAnswer(currentQ.id)} className="focus-ring inline-flex items-center gap-1 rounded-lg px-2 py-2 text-[11px] font-bold text-stone-400 hover:bg-stone-100 hover:text-rose-500 dark:hover:bg-stone-800"><RotateCcw className="h-3.5 w-3.5" />Clear</button>}
            </div>
          </div>

          <div className="mx-auto max-w-4xl pt-7">
            <p className="text-lg font-semibold leading-8 tracking-[-.012em] text-stone-900 dark:text-stone-50 sm:text-xl">{currentQ?.text}</p>
            {currentQ?.codeSnippet && <div className="mt-6"><CodeSnippetViewer code={currentQ.codeSnippet} language={currentQ.category.toLowerCase()} /></div>}

            <div className="mt-7 space-y-3">
              {currentQ?.options?.map((opt, idx) => {
                const isSelected = selectedOptionId === opt.id;
                const letter = String.fromCharCode(65 + idx);
                return <label key={opt.id} onClick={() => selectOption(currentQ.id, opt.id)} className={`group flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all sm:p-5 ${isSelected ? "border-brand-500 bg-brand-50/70 shadow-[0_8px_25px_rgba(196,93,61,.09)] ring-1 ring-brand-500 dark:bg-brand-950/25" : "border-stone-200 bg-white hover:border-brand-200 hover:bg-brand-50/20 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-brand-800"}`}>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black ${isSelected ? "bg-brand-600 text-white" : "bg-stone-100 text-stone-500 group-hover:bg-brand-50 group-hover:text-brand-600 dark:bg-stone-800 dark:text-stone-400"}`}>{letter}</span>
                  <span className={`flex-1 text-sm leading-6 ${isSelected ? "font-bold text-brand-900 dark:text-brand-100" : "font-medium text-stone-700 dark:text-stone-200"}`}>{opt.text}</span>
                  {isSelected && <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" />}
                </label>;
              })}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-stone-100 pt-5 dark:border-stone-800">
              <Button variant="secondary" size="sm" icon={ChevronLeft} disabled={currentQuestionIndex === 0} onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}>Previous</Button>
              <span className="hidden text-[11px] font-bold text-stone-400 sm:block">{progress}% complete</span>
              <Button variant="primary" size="sm" disabled={currentQuestionIndex === questions.length - 1} onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}>Next <ChevronRight className="ml-1 h-4 w-4" /></Button>
            </div>
          </div>
        </section>

        <aside className="h-fit rounded-[24px] border border-stone-200/90 bg-white/90 p-5 shadow-[0_12px_35px_rgba(54,47,38,.06)] dark:border-stone-700 dark:bg-stone-900/85 lg:sticky lg:top-[92px]">
          <div className="flex items-center justify-between"><div><p className="section-heading">Question palette</p><p className="mt-1 text-[10px] text-stone-400">Jump to any question</p></div><Flag className="h-4 w-4 text-brand-500" /></div>
          <div className="mt-5 flex gap-3 text-[10px] font-semibold text-stone-400"><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-brand-500" />Answered</span><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-amber-400" />Review</span></div>
          <div className="mt-4"><QuestionNavigator questions={questions} currentIndex={currentQuestionIndex} onSelectIndex={(idx) => setCurrentQuestionIndex(idx)} answers={selectedAnswers} markedForReview={markedForReview} /></div>
          <div className="mt-5 grid grid-cols-2 gap-2"><div className="rounded-xl bg-sage-50 p-3 dark:bg-sage-700/10"><p className="muted-label">Answered</p><p className="mt-1 text-lg font-black text-sage-700 dark:text-sage-300">{answeredCount}</p></div><div className="rounded-xl bg-stone-50 p-3 dark:bg-stone-800/50"><p className="muted-label">Remaining</p><p className="mt-1 text-lg font-black">{unansweredCount}</p></div></div>
          <p className="mt-4 text-[10px] leading-5 text-stone-400">Marked questions can be revisited before you submit.</p>
        </aside>
      </main>

      <Modal isOpen={showSubmitModal} onClose={() => setShowSubmitModal(false)} title="Submit assessment?">
        <div className="space-y-4 text-xs leading-5 text-stone-600 dark:text-stone-300">
          <p>Are you sure you want to finish and submit? Once submitted, your answers cannot be edited.</p>
          <div className="grid grid-cols-3 gap-2 border-y border-stone-100 py-3 text-center dark:border-stone-800">
            <div className="rounded-xl bg-sage-50 p-2 dark:bg-sage-700/10"><span className="block text-base font-black text-sage-700 dark:text-sage-300">{answeredCount}</span><span className="text-[10px] text-stone-400">Answered</span></div>
            <div className="rounded-xl bg-stone-100 p-2 dark:bg-stone-800"><span className="block text-base font-black">{unansweredCount}</span><span className="text-[10px] text-stone-400">Unanswered</span></div>
            <div className="rounded-xl bg-amber-50 p-2 dark:bg-amber-950/30"><span className="block text-base font-black text-amber-600 dark:text-amber-300">{markedForReview.size}</span><span className="text-[10px] text-stone-400">Review</span></div>
          </div>
          {unansweredCount > 0 && <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-rose-600 dark:border-rose-900 dark:bg-rose-950/20 dark:text-rose-300"><AlertCircle className="h-4 w-4 shrink-0" /><span>You still have {unansweredCount} unanswered questions.</span></div>}
          <div className="flex justify-end gap-2 pt-2"><Button variant="secondary" onClick={() => setShowSubmitModal(false)} disabled={isSubmitting}>Resume</Button><Button onClick={handleFinalSubmit} isLoading={isSubmitting}>Confirm & submit</Button></div>
        </div>
      </Modal>
    </div>
  );
};
