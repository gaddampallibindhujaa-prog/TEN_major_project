import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { testService } from "../../services/testService";
import { resultService } from "../../services/resultService";
import { StatCard } from "../../components/common/StatCard";
import { AssessmentCard } from "../../components/assessment/AssessmentCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { LoadingState } from "../../components/common/LoadingState";
import { FileCheck2, CheckCircle2, Trophy, BarChart3, ArrowRight, CalendarDays, Target, Sparkles } from "lucide-react";
import { formatDate } from "../../utils/formatters";
import { filterActiveTests } from "../../utils/activeTests";

export const CandidateDashboard = () => {
  const { user } = useAuth();
  const [tests, setTests] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [allTests, userResults] = await Promise.all([
          testService.getAllTests(),
          resultService.getResultsByCandidateId(user?.id || "cand-001"),
        ]);
        setTests(filterActiveTests(allTests));
        setResults(userResults);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  const completedCount = results.length;
  const avgScore = completedCount ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / completedCount) : 0;
  const bestScore = completedCount ? Math.max(...results.map((r) => r.percentage)) : 0;
  const latestResult = results[0];
  const readiness = Math.min(100, Math.round((completedCount * 18) + (avgScore * 0.55)));

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  if (loading) return <LoadingState message="Loading your workspace..." />;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[26px] border border-brand-200/70 bg-[#2b2926] px-6 py-7 text-white shadow-[0_20px_55px_rgba(54,47,38,.16)] sm:px-8">
        <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute -bottom-32 right-28 h-64 w-64 rounded-full bg-sage-500/15 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.07] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.13em] text-brand-200"><Sparkles className="h-3.5 w-3.5" /> Candidate workspace</div>
            <h1 className="max-w-2xl text-3xl font-black tracking-[-0.04em] sm:text-4xl">{greeting}, {user?.fullName?.split(" ")[0] || "Candidate"}.</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-stone-300">You have <span className="font-bold text-white">{tests.length} active assessments</span> available. Keep a steady pace and let your results show the progress.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/candidate/tests"><Button size="md" icon={ArrowRight}>Explore assessments</Button></Link>
              <Link to="/candidate/analytics"><Button size="md" variant="ghost" className="border border-white/15 text-white hover:bg-white/10 hover:text-white">View analytics</Button></Link>
            </div>
          </div>
          <div className="w-full max-w-[270px] rounded-2xl border border-white/10 bg-white/[.06] p-4 backdrop-blur-md">
            <div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[.14em] text-stone-400">Readiness</span><Target className="h-4 w-4 text-brand-300" /></div>
            <div className="mt-3 flex items-end justify-between"><span className="text-3xl font-black">{readiness}%</span><span className="text-[10px] text-stone-400">based on activity</span></div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-brand-400 transition-all" style={{ width: `${readiness}%` }} /></div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Tests available" value={tests.length} subtitle="Ready to attempt" icon={FileCheck2} color="brand" />
        <StatCard title="Tests completed" value={completedCount} subtitle="Evaluated submissions" icon={CheckCircle2} color="emerald" />
        <StatCard title="Average score" value={`${avgScore}%`} subtitle="Across completed tests" icon={BarChart3} color="sage" />
        <StatCard title="Best score" value={`${bestScore}%`} subtitle="Your current high" icon={Trophy} color="amber" />
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div><p className="eyebrow">Next up</p><h2 className="mt-1 text-xl font-black tracking-[-0.025em] text-stone-900 dark:text-stone-100">Assessments waiting for you</h2><p className="mt-1 text-xs text-stone-500">Choose one and stay focused from start to submission.</p></div>
          <Link to="/candidate/tests" className="hidden items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 sm:flex">View all <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        {tests.length ? <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{tests.slice(0, 3).map((test) => <AssessmentCard key={test.id} test={test} />)}</div> : <div className="section-card p-8 text-center text-xs text-stone-500">No active assessments are available right now.</div>}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <div className="section-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4 dark:border-stone-800"><div><p className="section-heading">Recent submissions</p><p className="mt-1 text-[11px] text-stone-400">Your latest assessment activity</p></div><Link to="/candidate/history" className="text-xs font-bold text-brand-600">Full history</Link></div>
          {results.length ? <div className="divide-y divide-stone-100 dark:divide-stone-800">{results.slice(0, 4).map((res) => <div key={res.id} className="flex flex-col justify-between gap-3 px-5 py-4 transition-colors hover:bg-brand-50/20 sm:flex-row sm:items-center"><div><div className="flex flex-wrap items-center gap-2"><span className="text-sm font-bold text-stone-800 dark:text-stone-100">{res.testTitle}</span><Badge variant="brand">{res.category}</Badge><Badge variant={res.status === "PASSED" ? "success" : "danger"}>{res.status}</Badge></div><div className="mt-1.5 flex items-center gap-2 text-[11px] text-stone-400"><CalendarDays className="h-3.5 w-3.5" />{formatDate(res.completedAt)}<span>•</span><span>{res.score} / {res.totalMarks} ({res.percentage}%)</span></div></div><Link to={`/candidate/results/${res.id}`}><Button variant="secondary" size="sm">Review</Button></Link></div>)}</div> : <div className="p-8 text-center text-xs text-stone-400">Complete your first assessment and it will appear here.</div>}
        </div>

        <div className="section-card p-5">
          <div className="flex items-center justify-between"><div><p className="section-heading">Latest snapshot</p><p className="mt-1 text-[11px] text-stone-400">A quick read of your current pace</p></div><BarChart3 className="h-5 w-5 text-brand-500" /></div>
          <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl bg-stone-50 p-4 dark:bg-stone-800/50"><p className="muted-label">Average</p><p className="mt-2 text-2xl font-black">{avgScore}%</p></div><div className="rounded-xl bg-sage-50 p-4 dark:bg-sage-700/10"><p className="muted-label">Best</p><p className="mt-2 text-2xl font-black text-sage-700 dark:text-sage-300">{bestScore}%</p></div></div>
          {latestResult && <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50/60 p-4 dark:border-brand-900/40 dark:bg-brand-950/20"><p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-brand-600">Latest result</p><p className="mt-1 text-sm font-bold text-stone-800 dark:text-stone-100">{latestResult.testTitle}</p><p className="mt-1 text-xs text-stone-500">Scored {latestResult.percentage}%</p></div>}
        </div>
      </section>
    </div>
  );
};
