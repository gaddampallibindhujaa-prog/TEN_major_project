import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2, Clock, BarChart3, ShieldCheck, Award, Layers,
  Terminal, Database, Cpu, Brain, ArrowRight, Sparkles, Users, Zap
} from "lucide-react";
import { Button } from "../../components/common/Button";

export const LandingPage = () => {
  const stats = [
    { label: "Candidates evaluated", value: "10K+" },
    { label: "Assessments created", value: "500+" },
    { label: "Questions scored", value: "50K+" },
    { label: "Automated evaluation", value: "95%" },
  ];

  const features = [
    { icon: Clock, title: "Timed assessments", description: "Reliable countdowns, autosave protection and clear progress so candidates can focus on solving." },
    { icon: CheckCircle2, title: "Instant evaluation", description: "Automatic scoring, negative marking and an immediate result after submission." },
    { icon: Database, title: "Structured question bank", description: "Keep questions organized by subject, difficulty and assessment without losing control." },
    { icon: BarChart3, title: "Useful analytics", description: "Turn raw scores into clear performance trends, category breakdowns and improvement signals." },
    { icon: Award, title: "Fair rankings", description: "Compare performance through consistent scoring and transparent leaderboard views." },
    { icon: ShieldCheck, title: "Separate workspaces", description: "Candidate and administrator experiences stay focused, secure and easy to navigate." },
  ];

  const workflow = [
    ["01", "Build", "Create an assessment and choose the right questions."],
    ["02", "Assign", "Give candidates access to the assessment."],
    ["03", "Assess", "Candidates complete a focused timed test."],
    ["04", "Evaluate", "Scores and pass status are calculated automatically."],
    ["05", "Improve", "Use results and analytics to plan the next step."],
  ];

  const categories = [
    { name: "Java", icon: Terminal },
    { name: "SQL & RDBMS", icon: Database },
    { name: "OOP", icon: Layers },
    { name: "Data Structures", icon: Cpu },
    { name: "Aptitude", icon: Brain },
  ];

  return (
    <div className="overflow-hidden">
      <section className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-16">
        <div className="absolute -z-10 top-0 right-0 w-[480px] h-[480px] rounded-full bg-brand-100/50 dark:bg-brand-900/10 blur-3xl" />
        <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 dark:bg-stone-900/70 border border-brand-200 dark:border-brand-800/60 text-brand-700 dark:text-brand-300 text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              A calmer way to run technical assessments
            </div>

            <h1 className="mt-7 text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.055em] leading-[0.95] text-stone-900 dark:text-stone-50">
              Test skills.
              <br />
              <span className="text-brand-600 dark:text-brand-400">See progress.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base sm:text-lg leading-8 text-stone-500 dark:text-stone-300">
              CodeJudge gives students a focused assessment experience while giving educators and administrators the tools to create, evaluate and understand performance.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/candidate/tests">
                <Button size="lg" icon={ArrowRight}>Explore assessments</Button>
              </Link>
              <Link to="/admin/login">
                <Button size="lg" variant="secondary">Open admin workspace</Button>
              </Link>
            </div>

            <div className="mt-9 flex items-center gap-6 text-xs font-semibold text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-brand-500" />Instant scoring</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-sage-600" />Protected sessions</span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[28px] bg-stone-900 p-3 shadow-[0_28px_70px_rgba(45,42,36,.20)] rotate-[1.5deg]">
              <div className="rounded-[21px] overflow-hidden bg-[#f8f5ed]">
                <div className="px-5 py-4 bg-white border-b border-stone-200 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[.15em] font-bold text-stone-400">Java fundamentals</p>
                    <p className="font-bold text-stone-900 mt-1">Assessment in progress</p>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">18:42</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-400">
                    <span>Question 07 of 20</span><span>35%</span>
                  </div>
                  <div className="h-2 rounded-full bg-stone-200 mt-3 overflow-hidden">
                    <div className="h-full w-[35%] bg-brand-500 rounded-full" />
                  </div>
                  <div className="mt-7 p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
                    <p className="text-sm font-bold text-stone-900 leading-6">Which principle keeps an object's internal state hidden?</p>
                    <div className="mt-5 space-y-2.5">
                      {["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"].map((x, i) => (
                        <div key={x} className={`px-4 py-3 rounded-xl border text-xs font-semibold ${i === 1 ? "border-brand-400 bg-brand-50 text-brand-700" : "border-stone-200 text-stone-500"}`}>
                          <span className="mr-3 text-stone-400">{String.fromCharCode(65 + i)}</span>{x}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 flex justify-between items-center">
                    <span className="text-xs font-semibold text-stone-400">+4 marks</span>
                    <span className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold">Next question →</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-5 hidden sm:flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-[0_15px_35px_rgba(45,42,36,.12)]">
              <div className="w-9 h-9 rounded-xl bg-sage-100 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-sage-700" /></div>
              <div><p className="text-[10px] text-stone-400 font-bold uppercase">Autosaved</p><p className="text-xs font-bold text-stone-800 dark:text-stone-100">Your progress is safe</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 dark:border-stone-700 bg-white/60 dark:bg-stone-900/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <p className="text-3xl font-black tracking-tight text-stone-900 dark:text-stone-50">{s.value}</p>
              <p className="mt-1 text-xs font-semibold text-stone-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Built around the student journey</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-stone-900 dark:text-stone-50">Everything you need to run a better assessment.</h2>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="group p-6 rounded-2xl bg-white/85 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-700 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(45,42,36,.08)] transition-all">
                <div className="w-11 h-11 rounded-2xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 flex items-center justify-center group-hover:rotate-[-4deg] transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mt-5 font-bold text-stone-900 dark:text-stone-100">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-500 dark:text-stone-400">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="how-it-works" className="bg-stone-900 text-stone-100 py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-brand-300">Simple workflow</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight">From question bank to clear results.</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {workflow.map(([num, title, desc]) => (
              <div key={num} className="p-5 rounded-2xl bg-white/[.06] border border-white/10">
                <span className="text-3xl font-black text-brand-400">{num}</span>
                <h3 className="mt-6 font-bold">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-stone-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Domain coverage</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-stone-900 dark:text-stone-50">Practice what matters.</h2>
          <p className="mt-3 text-sm text-stone-500">Create focused assessments across the subjects your students actually need.</p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.name} className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-sm">
                <Icon className="w-5 h-5 text-brand-600" />
                <span className="text-sm font-bold text-stone-700 dark:text-stone-200">{cat.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-[28px] bg-brand-600 p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute -right-20 -top-28 w-80 h-80 rounded-full border-[50px] border-white/10" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-brand-100">Ready when you are</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">Give students an assessment experience they’ll actually enjoy using.</h2>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/candidate/tests"><Button size="lg" variant="secondary">Explore tests</Button></Link>
              <Link to="/register"><Button size="lg" variant="ghost" className="text-white hover:text-white hover:bg-white/10">Create candidate account</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
