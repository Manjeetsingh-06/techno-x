import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ACHIEVEMENTS } from '../../data/mockData';
import { Award, Code2, ShieldCheck, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const StudentAchievementsPage = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    if (user) {
      // Filter by student ID or show all achievements for this student
      const list = ACHIEVEMENTS.filter(a =>
        !a.studentId || a.studentId === user.studentId || a.studentId === user.id
      );
      setAchievements(list);
    }
  }, [user]);


  const iconMap = {
    Code2: Code2,
    ShieldCheck: ShieldCheck,
    Zap: Zap,
    Award: Award,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Achievements & Campus Badges
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Recognized milestones unlocked through active technical and extracurricular engagement at TGI.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {achievements.map((item) => {
          const Icon = iconMap[item.badgeIcon] || Award;
          return (
            <div
              key={item.id}
              className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between text-left space-y-4"
            >
              <div>
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} p-0.5 shadow-xl flex items-center justify-center mb-4`}
                >
                  <div className="w-full h-full bg-navy-950/80 rounded-[14px] flex items-center justify-center text-white">
                    <Icon className="w-7 h-7" />
                  </div>
                </div>

                <Badge variant="purple" size="sm">
                  Verified Badge
                </Badge>

                <h3 className="text-base font-bold text-white mt-2">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Event:</span>
                  <span className="text-slate-300 font-medium truncate max-w-[130px]">{item.associatedEvent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Awarded:</span>
                  <span className="text-slate-300 font-medium">{item.earnedDate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
