import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { Clock, HelpCircle, Award, ArrowUpRight } from "lucide-react";

export const AssessmentCard = ({ test }) => {
  const difficultyBadgeMap = { Easy: "success", Medium: "warning", Hard: "danger" };

  return (
    <Card hover className="flex min-h-[260px] flex-col justify-between">
      <div>
        <div className="mb-4 flex items-center justify-between gap-2">
          <Badge variant="brand">{test.category}</Badge>
          <Badge variant={difficultyBadgeMap[test.difficulty] || "default"}>{test.difficulty}</Badge>
        </div>
        <h4 className="line-clamp-1 text-base font-extrabold tracking-[-0.015em] text-stone-900 dark:text-stone-100">{test.title}</h4>
        <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-stone-500 dark:text-stone-400">{test.description}</p>

        <div className="mt-5 grid grid-cols-3 divide-x divide-stone-200 rounded-xl border border-stone-200/80 bg-stone-50/70 py-3 dark:divide-stone-700 dark:border-stone-700 dark:bg-stone-800/30">
          <div className="px-3 text-center"><Clock className="mx-auto h-3.5 w-3.5 text-brand-500" /><p className="mt-1 text-[10px] font-semibold text-stone-500">{test.durationMinutes} mins</p></div>
          <div className="px-3 text-center"><HelpCircle className="mx-auto h-3.5 w-3.5 text-sage-600" /><p className="mt-1 text-[10px] font-semibold text-stone-500">{test.questionIds?.length || 0} Qs</p></div>
          <div className="px-3 text-center"><Award className="mx-auto h-3.5 w-3.5 text-amber-600" /><p className="mt-1 text-[10px] font-semibold text-stone-500">{test.totalMarks} Marks</p></div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-stone-100 pt-4 dark:border-stone-800">
        <p className="text-[10px] text-stone-400">Pass score <span className="font-bold text-stone-600 dark:text-stone-300">{test.passingScore}</span></p>
        <Link to={`/candidate/tests/${test.id}/instructions`}>
          <Button size="sm" icon={ArrowUpRight}>Start test</Button>
        </Link>
      </div>
    </Card>
  );
};
