import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { testService } from "../../services/testService";
import { candidateService } from "../../services/candidateService";
import { questionService } from "../../services/questionService";
import { resultService } from "../../services/resultService";
import { StatCard } from "../../components/common/StatCard";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { LoadingState } from "../../components/common/LoadingState";
import { FileCheck2, Users, FileCode, Percent, Plus, ArrowRight, ShieldCheck, Activity, Clock3 } from "lucide-react";
import { formatDate } from "../../utils/formatters";

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentTests, setRecentTests] = useState([]);
  const [recentResults, setRecentResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminOverview = async () => {
      try {
        const [tests, candidates, questions, results] = await Promise.all([
          testService.getAllTests(), candidateService.getAllCandidates(), questionService.getAllQuestions(), resultService.getAllResults(),
        ]);
        const passCount = results.filter((r) => r.status === "PASSED").length;
        const passRate = results.length ? Math.round((passCount / results.length) * 100) : 0;
        const avgScore = results.length ? Math.round(results.reduce((acc, curr) => acc + curr.percentage, 0) / results.length) : 0;
        setStats({ totalTests: tests.length, activeTests: tests.filter((t) => t.status === "Active").length, totalCandidates: candidates.length, totalQuestions: questions.length, testsCompleted: results.length, passRate, avgScore });
        setRecentTests(tests.slice(0, 4));
        setRecentResults(results.slice(0, 4));
      } catch (err) {
        console.error("Admin overview fetch failed:", err);
        setStats({ totalTests: 0, activeTests: 0, totalCandidates: 0, totalQuestions: 0, testsCompleted: 0, passRate: 0, avgScore: 0 });
        setRecentTests([]); setRecentResults([]);
      } finally { setLoading(false); }
    };
    fetchAdminOverview();
    const onVisible = () => { if (document.visibilityState === "visible") fetchAdminOverview(); };
    window.addEventListener("focus", onVisible); document.addEventListener("visibilitychange", onVisible);
    return () => { window.removeEventListener("focus", onVisible); document.removeEventListener("visibilitychange", onVisible); };
  }, []);

  if (loading) return <LoadingState message="Loading administrative overview..." />;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[26px] border border-stone-700 bg-[#2b2926] px-6 py-7 text-white shadow-[0_20px_55px_rgba(54,47,38,.15)] sm:px-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.07] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.14em] text-stone-300"><ShieldCheck className="h-3.5 w-3.5 text-sage-300" /> Admin workspace</div>
            <h1 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">System overview.</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-300">Manage assessments, question quality and candidate performance from one calm operational view.</p>
          </div>
          <div className="flex flex-wrap gap-2"><Link to="/admin/questions/create"><Button variant="ghost" size="sm" icon={Plus} className="border border-white/15 text-white hover:bg-white/10 hover:text-white">Add question</Button></Link><Link to="/admin/tests/create"><Button size="sm" icon={Plus}>Create assessment</Button></Link></div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Assessments" value={stats.totalTests} subtitle={`${stats.activeTests} currently active`} icon={FileCheck2} color="brand" />
        <StatCard title="Candidates" value={stats.totalCandidates} subtitle="Registered accounts" icon={Users} color="emerald" />
        <StatCard title="Question bank" value={stats.totalQuestions} subtitle="Across all categories" icon={FileCode} color="amber" />
        <StatCard title="Pass rate" value={`${stats.passRate}%`} subtitle={`Average score ${stats.avgScore}%`} icon={Percent} color="sage" />
      </div>

      <section className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <div className="section-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4 dark:border-stone-800"><div><p className="section-heading">Active assessments</p><p className="mt-1 text-[11px] text-stone-400">Current tests in the platform</p></div><Link to="/admin/tests" className="flex items-center gap-1 text-xs font-bold text-brand-600">Manage all <ArrowRight className="h-3.5 w-3.5" /></Link></div>
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {recentTests.length ? recentTests.map((t) => <div key={t.id} className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-brand-50/20"><div className="min-w-0"><h4 className="truncate text-sm font-bold text-stone-800 dark:text-stone-100">{t.title}</h4><div className="mt-1.5 flex flex-wrap items-center gap-2"><Badge variant="brand">{t.category}</Badge><span className="flex items-center gap-1 text-[10px] text-stone-400"><Clock3 className="h-3 w-3" />{t.durationMinutes} mins</span><span className="text-[10px] text-stone-400">{t.totalMarks} marks</span></div></div><Badge variant={t.status === "Active" ? "success" : "default"}>{t.status}</Badge></div>) : <div className="p-8 text-center text-xs text-stone-400">No assessments available.</div>}
          </div>
        </div>

        <div className="section-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4 dark:border-stone-800"><div><p className="section-heading">Recent submissions</p><p className="mt-1 text-[11px] text-stone-400">Latest evaluated attempts</p></div><Activity className="h-4 w-4 text-brand-500" /></div>
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {recentResults.length ? recentResults.map((r) => <div key={r.id} className="flex items-center justify-between gap-4 px-5 py-4"><div className="min-w-0"><h4 className="truncate text-sm font-bold text-stone-800 dark:text-stone-100">{r.candidateName}</h4><p className="mt-1 truncate text-[11px] text-stone-400">{r.testTitle} · {formatDate(r.completedAt)}</p></div><div className="shrink-0 text-right"><span className="block text-xs font-black text-stone-800 dark:text-stone-200">{r.percentage}%</span><Badge variant={r.status === "PASSED" ? "success" : "danger"}>{r.status}</Badge></div></div>) : <div className="p-8 text-center text-xs text-stone-400">No submissions yet.</div>}
          </div>
        </div>
      </section>
    </div>
  );
};
