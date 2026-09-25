import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Compass,
  Trophy,
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Volume2,
  VolumeX,
  Clock,
  Sparkles,
  Share2,
  Check,
  Flame,
  Target,
  Play,
  Sliders,
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen,
  TrendingUp,
  Search,
  Sparkle,
  Anchor,
  Landmark,
  ShieldAlert,
  Navigation,
  Mountain,
  Users
} from 'lucide-react';
import { QUESTION_BANK } from '../data/geopoliticsQuestions';
import type { Question } from '../data/geopoliticsQuestions';
import { soundEngine } from '../utils/quizAudio';
import { QuizBackground } from '../components/quiz/QuizBackground';

interface ShuffledQuestion extends Question {
  shuffledOptions: string[];
  shuffledCorrectIndex: number;
}

interface QuestionResult {
  question: Question;
  selectedOptionIndex: number;
  isCorrect: boolean;
  shuffledOptions: string[];
  shuffledCorrectIndex: number;
  timeSpentSeconds: number;
  pointsEarned: number;
}

type QuizState = 'setup' | 'playing' | 'answered' | 'results';
type QuizMode = 'progressive' | 'all' | 'category';

export const GeopoliticsQuiz: React.FC = () => {
  // Setup state
  const [mode, setMode] = useState<QuizMode>('progressive');
  const [quizLength, setQuizLength] = useState<number>(20);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [timedMode, setTimedMode] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Active quiz state
  const [gameState, setGameState] = useState<QuizState>('setup');
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  // Floating score popup indicator (+25 pts!)
  const [scorePopup, setScorePopup] = useState<{ show: boolean; text: string; id: number }>({
    show: false,
    text: '',
    id: 0
  });

  // Scoring & Stats
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [history, setHistory] = useState<QuestionResult[]>([]);

  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Review filters on results screen
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [reviewSearch, setReviewSearch] = useState<string>('');
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);

  // High score in LocalStorage
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem('geopolitics_quiz_high_score');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Toggle sound
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEngine.setEnabled(next);
  };

  // Category Icon & Color Mapping
  const getCategoryTheme = (catName: string) => {
    switch (catName) {
      case 'Straits, Seas & Canals':
        return { icon: Anchor, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' };
      case 'Capitals & Countries':
        return { icon: Landmark, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
      case 'Borders & Neighbors':
        return { icon: ShieldAlert, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
      case 'International Organizations':
        return { icon: Users, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' };
      case 'Strategic Locations':
        return { icon: Target, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' };
      case 'Mountains & Rivers':
        return { icon: Mountain, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
      default:
        return { icon: Navigation, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' };
    }
  };

  // Distinct categories with counts
  const categoriesWithCounts = useMemo(() => {
    const map = new Map<string, number>();
    QUESTION_BANK.forEach((q) => {
      map.set(q.category, (map.get(q.category) || 0) + 1);
    });
    return [
      { name: 'All', count: QUESTION_BANK.length },
      ...Array.from(map.entries()).map(([name, count]) => ({ name, count }))
    ];
  }, []);

  // Fisher-Yates shuffle
  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Start Quiz session
  const startQuiz = useCallback(() => {
    let pool: Question[] = [];

    if (mode === 'category' && selectedCategory !== 'All') {
      pool = QUESTION_BANK.filter((q) => q.category === selectedCategory);
    } else if (mode === 'progressive') {
      const easyPool = shuffleArray(QUESTION_BANK.filter((q) => q.difficulty === 'easy'));
      const medPool = shuffleArray(QUESTION_BANK.filter((q) => q.difficulty === 'medium'));
      const hardPool = shuffleArray(QUESTION_BANK.filter((q) => q.difficulty === 'hard'));
      const vhardPool = shuffleArray(QUESTION_BANK.filter((q) => q.difficulty === 'very_hard'));

      const countPerTier = Math.max(1, Math.floor(quizLength / 4));
      const easySel = easyPool.slice(0, countPerTier);
      const medSel = medPool.slice(0, countPerTier);
      const hardSel = hardPool.slice(0, countPerTier);
      const vhardSel = vhardPool.slice(0, quizLength - (easySel.length + medSel.length + hardSel.length));

      pool = [...easySel, ...medSel, ...hardSel, ...vhardSel];
    } else {
      pool = shuffleArray(QUESTION_BANK);
    }

    const selectedPool = pool.slice(0, Math.min(quizLength, pool.length));

    const preparedQuestions: ShuffledQuestion[] = selectedPool.map((q) => {
      const originalOptions = q.options;
      const correctAnswerText = originalOptions[q.correctIndex];

      const shuffledOptions = shuffleArray(originalOptions);
      const shuffledCorrectIndex = shuffledOptions.indexOf(correctAnswerText);

      return {
        ...q,
        shuffledOptions,
        shuffledCorrectIndex
      };
    });

    setQuestions(preparedQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setMaxStreak(0);
    setHistory([]);
    setTimeLeft(20);
    setQuestionStartTime(Date.now());
    setGameState('playing');
    soundEngine.playClick();
  }, [mode, selectedCategory, quizLength]);

  // Current Question
  const currentQuestion = questions[currentIndex];

  // Option selection handler
  const handleSelectOption = useCallback(
    (index: number) => {
      if (gameState !== 'playing' || !currentQuestion) return;

      const isCorrect = index === currentQuestion.shuffledCorrectIndex;
      const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);

      setSelectedOption(index);
      setGameState('answered');

      let basePoints = 10;
      if (currentQuestion.difficulty === 'medium') basePoints = 20;
      if (currentQuestion.difficulty === 'hard') basePoints = 30;
      if (currentQuestion.difficulty === 'very_hard') basePoints = 40;

      const timeBonus = timedMode ? Math.max(0, Math.floor((timeLeft / 20) * 10)) : 0;
      let roundScore = 0;

      if (isCorrect) {
        soundEngine.playCorrect();
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > maxStreak) setMaxStreak(newStreak);

        if (newStreak === 3 || newStreak === 5 || newStreak === 8) {
          soundEngine.playStreakBonus();
        }

        let streakMultiplier = 1;
        if (newStreak >= 3) streakMultiplier = 1.25;
        if (newStreak >= 5) streakMultiplier = 1.5;
        if (newStreak >= 8) streakMultiplier = 2.0;

        roundScore = Math.round((basePoints + timeBonus) * streakMultiplier);
        setScore((prev) => prev + roundScore);
        setCorrectCount((prev) => prev + 1);

        setScorePopup({
          show: true,
          text: `+${roundScore} pts!`,
          id: Date.now()
        });
      } else {
        soundEngine.playIncorrect();
        setStreak(0);
      }

      setHistory((prev) => [
        ...prev,
        {
          question: currentQuestion,
          selectedOptionIndex: index,
          isCorrect,
          shuffledOptions: currentQuestion.shuffledOptions,
          shuffledCorrectIndex: currentQuestion.shuffledCorrectIndex,
          timeSpentSeconds: timeSpent,
          pointsEarned: roundScore
        }
      ]);
    },
    [gameState, currentQuestion, questionStartTime, timedMode, timeLeft, streak, maxStreak]
  );

  // Next Question
  const handleNextQuestion = useCallback(() => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setGameState('playing');
      setTimeLeft(20);
      setQuestionStartTime(Date.now());
      soundEngine.playClick();
    } else {
      setGameState('results');
      soundEngine.playComplete();

      setHighScore((prev) => {
        if (score > prev) {
          localStorage.setItem('geopolitics_quiz_high_score', score.toString());
          return score;
        }
        return prev;
      });
    }
  }, [currentIndex, questions.length, score]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'playing') {
        if (['1', 'a', 'A'].includes(e.key)) handleSelectOption(0);
        if (['2', 'b', 'B'].includes(e.key)) handleSelectOption(1);
        if (['3', 'c', 'C'].includes(e.key)) handleSelectOption(2);
        if (['4', 'd', 'D'].includes(e.key)) handleSelectOption(3);
      } else if (gameState === 'answered') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleSelectOption, handleNextQuestion]);

  // Countdown timer
  useEffect(() => {
    if (gameState !== 'playing' || !timedMode) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSelectOption(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timedMode, handleSelectOption]);

  // Stats calculation
  const attemptedCount = history.length;
  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

  // Rank Evaluator
  const getRank = (acc: number) => {
    if (acc >= 90) return { title: 'Grand Strategist', badge: '🏆 Master', color: 'from-amber-400 via-amber-500 to-yellow-600', icon: Trophy };
    if (acc >= 75) return { title: 'Diplomatic Ambassador', badge: '🌟 Elite', color: 'from-emerald-400 via-teal-500 to-cyan-600', icon: Award };
    if (acc >= 60) return { title: 'Geopolitical Analyst', badge: '🗺️ Expert', color: 'from-sky-400 via-indigo-500 to-purple-600', icon: Globe };
    if (acc >= 45) return { title: 'Regional Explorer', badge: '🧭 Voyager', color: 'from-purple-400 via-indigo-500 to-slate-600', icon: Compass };
    return { title: 'Geography Cadet', badge: '📚 Scholar', color: 'from-slate-400 via-slate-500 to-zinc-700', icon: BookOpen };
  };

  const rank = getRank(accuracy);

  // Earnable Achievement Badges
  const achievements = useMemo(() => {
    const list = [];
    if (accuracy >= 90) list.push({ icon: '🎯', title: 'Sharp Shooter', desc: 'Over 90% accuracy' });
    if (maxStreak >= 5) list.push({ icon: '🔥', title: 'Streak Legend', desc: '5+ consecutive correct answers' });
    if (score >= 250) list.push({ icon: '🏆', title: 'High Scorer', desc: 'Scored over 250 points' });
    if (correctCount === questions.length && questions.length > 0) list.push({ icon: '🛡️', title: 'Flawless Victory', desc: '100% correct campaign' });
    if (list.length === 0) list.push({ icon: '🧭', title: 'First Campaign', desc: 'Completed a quiz session' });
    return list;
  }, [accuracy, maxStreak, score, correctCount, questions.length]);

  // Category Mastery Breakdown
  const categoryMastery = useMemo(() => {
    const catStats: Record<string, { total: number; correct: number }> = {};
    history.forEach((item) => {
      const cat = item.question.category;
      if (!catStats[cat]) catStats[cat] = { total: 0, correct: 0 };
      catStats[cat].total += 1;
      if (item.isCorrect) catStats[cat].correct += 1;
    });
    return Object.entries(catStats).map(([category, data]) => ({
      category,
      pct: Math.round((data.correct / data.total) * 100),
      correct: data.correct,
      total: data.total
    }));
  }, [history]);

  // Filtered Review History
  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      if (reviewFilter === 'correct' && !item.isCorrect) return false;
      if (reviewFilter === 'incorrect' && item.isCorrect) return false;
      if (reviewSearch.trim()) {
        const query = reviewSearch.toLowerCase();
        return (
          item.question.question.toLowerCase().includes(query) ||
          item.question.category.toLowerCase().includes(query) ||
          item.question.explanation.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [history, reviewFilter, reviewSearch]);

  // Share handler
  const handleShareResults = () => {
    const text = `🌍 Geopolitics & World Geography Quiz:\n🏆 Score: ${score} pts | Accuracy: ${accuracy}% (${correctCount}/${questions.length})\n🎖️ Rank: ${rank.title}\nCan you beat my geopolitical score?`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const difficultyBadgeMap = {
    easy: { label: 'Easy', color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' },
    medium: { label: 'Medium', color: 'bg-amber-500/10 border-amber-500/30 text-amber-400' },
    hard: { label: 'Hard', color: 'bg-orange-500/10 border-orange-500/30 text-orange-400' },
    very_hard: { label: 'Very Hard', color: 'bg-purple-500/10 border-purple-500/30 text-purple-400' }
  };

  // ==========================================
  // RENDER SETUP SCREEN
  // ==========================================
  if (gameState === 'setup') {
    return (
      <div className="min-h-[92vh] bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden selection:bg-indigo-500 selection:text-white">
        <QuizBackground />

        <div className="max-w-4xl w-full relative z-10 space-y-8">
          {/* Header Title Hero */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/15 via-sky-500/15 to-purple-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-extrabold tracking-wider uppercase backdrop-blur-md shadow-lg shadow-indigo-500/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              104 Fact-Checked Geopolitical Questions
            </motion.div>

            <motion.h1
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-tight"
            >
              Geopolitics & World Geography
            </motion.h1>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
            >
              Master strategic maritime straits, international borders, country capitals, geopolitical alliances, and territorial geography in an interactive tactical quiz.
            </motion.p>
          </div>

          {/* Feature Stat Counter Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-center">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Question Bank</p>
              <p className="text-xl sm:text-2xl font-black text-indigo-400 mt-0.5">104 Fact-Checked</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-center">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Geopolitical Domains</p>
              <p className="text-xl sm:text-2xl font-black text-sky-400 mt-0.5">10 Categories</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-center">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Difficulty Tiers</p>
              <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">4 Progressive</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-center">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Engine Mode</p>
              <p className="text-xl sm:text-2xl font-black text-amber-400 mt-0.5">Adaptive Shuffling</p>
            </div>
          </div>

          {/* Configuration Card */}
          <div className="glass-card-dark border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-purple-500" />

            {/* High Score Banner */}
            {highScore > 0 && (
              <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />
                  <span className="text-sm font-bold">Personal High Score</span>
                </div>
                <span className="text-xl font-black tracking-tight">{highScore} pts</span>
              </div>
            )}

            {/* Mode Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Select Game Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setMode('progressive')}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    mode === 'progressive'
                      ? 'bg-gradient-to-br from-indigo-600/30 via-indigo-600/20 to-purple-600/30 border-indigo-500 text-white shadow-xl shadow-indigo-500/20 ring-1 ring-indigo-500/40'
                      : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      <Flame className="w-4 h-4 fill-current" />
                    </div>
                    {mode === 'progressive' && <Check className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-100">Gradual Escalation</h3>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">Easy → Medium → Hard → Very Hard</p>
                  </div>
                </button>

                <button
                  onClick={() => setMode('all')}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    mode === 'all'
                      ? 'bg-gradient-to-br from-indigo-600/30 via-indigo-600/20 to-purple-600/30 border-indigo-500 text-white shadow-xl shadow-indigo-500/20 ring-1 ring-indigo-500/40'
                      : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                      <Globe className="w-4 h-4" />
                    </div>
                    {mode === 'all' && <Check className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-100">Random Mix</h3>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">Shuffled across all difficulty levels</p>
                  </div>
                </button>

                <button
                  onClick={() => setMode('category')}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    mode === 'category'
                      ? 'bg-gradient-to-br from-indigo-600/30 via-indigo-600/20 to-purple-600/30 border-indigo-500 text-white shadow-xl shadow-indigo-500/20 ring-1 ring-indigo-500/40'
                      : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <Target className="w-4 h-4" />
                    </div>
                    {mode === 'category' && <Check className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-100">Category Mastery</h3>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">Focus on a specific geography topic</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Category selection */}
            {mode === 'category' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Select Focus Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-52 overflow-y-auto pr-1">
                  {categoriesWithCounts.map((cat) => {
                    const theme = getCategoryTheme(cat.name);
                    const CatIcon = theme.icon;
                    return (
                      <button
                        key={cat.name}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`p-3 rounded-2xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${
                          selectedCategory === cat.name
                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-500/10'
                            : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span className={`p-1.5 rounded-lg border ${theme.color}`}>
                            <CatIcon className="w-3.5 h-3.5" />
                          </span>
                          <span className="truncate">{cat.name}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Quiz Length & Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Campaign Length
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 20, 30, 104].map((num) => (
                    <button
                      key={num}
                      onClick={() => setQuizLength(num)}
                      className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                        quizLength === num
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {num === 104 ? 'All 104' : `${num} Qs`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferences Toggles */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Match Rules
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTimedMode(!timedMode)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      timedMode
                        ? 'bg-slate-900 border-indigo-500/60 text-indigo-400 shadow-md shadow-indigo-500/10'
                        : 'bg-slate-900/40 border-slate-800/80 text-slate-500'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    20s Timer ({timedMode ? 'ON' : 'OFF'})
                  </button>

                  <button
                    onClick={handleToggleSound}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      soundEnabled
                        ? 'bg-slate-900 border-emerald-500/60 text-emerald-400 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-900/40 border-slate-800/80 text-slate-500'
                    }`}
                  >
                    {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    Sound ({soundEnabled ? 'ON' : 'OFF'})
                  </button>
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <button
              onClick={startQuiz}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-600 text-white font-black text-lg shadow-xl shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-3 group"
            >
              <Play className="w-5 h-5 fill-current transition-transform group-hover:translate-x-1" />
              Launch Geopolitics Campaign
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER RESULTS SCREEN
  // ==========================================
  if (gameState === 'results') {
    const RankIcon = rank.icon;

    return (
      <div className="min-h-[92vh] bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden selection:bg-indigo-500 selection:text-white">
        <QuizBackground />

        <div className="max-w-4xl w-full space-y-8 relative z-10">
          
          {/* Main Performance Header */}
          <div className="glass-card-dark border border-slate-800/80 rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl backdrop-blur-xl">
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${rank.color}`} />
            
            <div className="inline-flex p-4 rounded-3xl bg-slate-900/90 border border-slate-800/80 mb-4 shadow-xl">
              <RankIcon className="w-12 h-12 text-amber-400" />
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Campaign Completed</p>
            <h2 className="text-3xl sm:text-5xl font-black mt-1 text-white tracking-tight">{rank.title}</h2>
            <div className="mt-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-extrabold uppercase tracking-wider">
                {rank.badge} Rank
              </span>
            </div>

            {/* Key Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <p className="text-xs text-slate-400 font-semibold">Total Score</p>
                <p className="text-2xl sm:text-3xl font-black text-indigo-400 mt-1">{score}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <p className="text-xs text-slate-400 font-semibold">Accuracy Rate</p>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">{accuracy}%</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <p className="text-xs text-slate-400 font-semibold">Correct Answers</p>
                <p className="text-2xl sm:text-3xl font-black text-sky-400 mt-1">
                  {correctCount} / {questions.length}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <p className="text-xs text-slate-400 font-semibold">Max Streak</p>
                <p className="text-2xl sm:text-3xl font-black text-amber-400 mt-1 flex items-center justify-center gap-1">
                  <Flame className="w-5 h-5 fill-current" />
                  {maxStreak}
                </p>
              </div>
            </div>

            {/* Trophies & Achievements Unlocked */}
            {achievements.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-800/80">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Earned Campaign Badges</p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {achievements.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-200 shadow-sm">
                      <span className="text-base">{item.icon}</span>
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={startQuiz}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white font-black text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again (Restart)
              </button>

              <button
                onClick={() => setGameState('setup')}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Sliders className="w-4 h-4 text-slate-400" />
                Change Options
              </button>

              <button
                onClick={handleShareResults}
                className="py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                {copiedShare ? 'Copied!' : 'Share Score'}
              </button>
            </div>
          </div>

          {/* Category Mastery Breakdown Bars */}
          {categoryMastery.length > 0 && (
            <div className="glass-card-dark border border-slate-800/80 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                Category Performance Breakdown
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categoryMastery.map((item) => {
                  const theme = getCategoryTheme(item.category);
                  const CatIcon = theme.icon;

                  return (
                    <div key={item.category} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="flex items-center gap-2 text-slate-300 truncate">
                          <span className={`p-1 rounded-md border ${theme.color}`}>
                            <CatIcon className="w-3 h-3" />
                          </span>
                          <span className="truncate">{item.category}</span>
                        </span>
                        <span className="text-indigo-400 font-bold">{item.pct}% ({item.correct}/{item.total})</span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Detailed Question Review List */}
          <div className="glass-card-dark border border-slate-800/80 rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-400" />
                Question Review Log ({filteredHistory.length}/{history.length})
              </h3>

              {/* Review Filter Controls */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search review..."
                    value={reviewSearch}
                    onChange={(e) => setReviewSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-36 sm:w-48"
                  />
                </div>

                <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => setReviewFilter('all')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                      reviewFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setReviewFilter('correct')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                      reviewFilter === 'correct' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Correct
                  </button>
                  <button
                    onClick={() => setReviewFilter('incorrect')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                      reviewFilter === 'incorrect' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Incorrect
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {filteredHistory.map((item, idx) => {
                const isExpanded = expandedReviewId === item.question.id;
                const letterMapping = ['A', 'B', 'C', 'D'];
                const theme = getCategoryTheme(item.question.category);
                const CatIcon = theme.icon;

                return (
                  <div
                    key={item.question.id + idx}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                  >
                    <div
                      onClick={() => setExpandedReviewId(isExpanded ? null : item.question.id)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-3 pr-4">
                        {item.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        )}
                        <div>
                          <p className="text-xs font-semibold text-slate-400">Question {idx + 1}</p>
                          <p className="text-sm font-bold text-slate-200 line-clamp-1">{item.question.question}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`text-[11px] px-2.5 py-0.5 rounded-full border ${theme.color} flex items-center gap-1 font-medium`}>
                          <CatIcon className="w-3 h-3" />
                          {item.question.category}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-slate-800 text-xs space-y-3"
                      >
                        <p className="font-bold text-slate-200 text-sm leading-snug">{item.question.question}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.shuffledOptions.map((opt, optIdx) => {
                            const isUserSelected = optIdx === item.selectedOptionIndex;
                            const isCorrectOpt = optIdx === item.shuffledCorrectIndex;

                            let optionBg = 'bg-slate-950 border-slate-800 text-slate-400';
                            if (isCorrectOpt) optionBg = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-semibold';
                            if (isUserSelected && !isCorrectOpt) optionBg = 'bg-rose-500/10 border-rose-500/40 text-rose-300';

                            return (
                              <div key={optIdx} className={`p-2.5 rounded-xl border ${optionBg} flex items-center gap-2`}>
                                <span className="font-bold">{letterMapping[optIdx]}.</span>
                                <span className="flex-1">{opt}</span>
                                {isCorrectOpt && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                                {isUserSelected && !isCorrectOpt && <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                              </div>
                            );
                          })}
                        </div>

                        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 leading-relaxed">
                          <span className="font-bold text-indigo-400">Fact Explanation:</span> {item.question.explanation}
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER ACTIVE GAMEPLAY SCREEN
  // ==========================================
  const letterMapping = ['A', 'B', 'C', 'D'];
  const keyMapping = ['1', '2', '3', '4'];
  const badgeConfig = difficultyBadgeMap[currentQuestion.difficulty];
  const progressPct = Math.round(((currentIndex + 1) / questions.length) * 100);
  const currentCatTheme = getCategoryTheme(currentQuestion.category);
  const CatIcon = currentCatTheme.icon;

  return (
    <div className="min-h-[92vh] bg-slate-950 text-slate-100 py-6 px-4 sm:px-6 lg:px-8 flex flex-col justify-between items-center relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      <QuizBackground />

      {/* Floating Score Popup (+25 pts!) */}
      <AnimatePresence>
        {scorePopup.show && (
          <motion.div
            key={scorePopup.id}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -40, scale: 1.1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => setScorePopup((prev) => ({ ...prev, show: false }))}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 py-2 rounded-2xl bg-emerald-500 text-slate-950 font-black text-lg shadow-2xl shadow-emerald-500/40 flex items-center gap-1.5"
          >
            <Sparkle className="w-5 h-5 fill-current" />
            {scorePopup.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Floating HUD Bar */}
      <div className="max-w-3xl w-full flex items-center justify-between mb-6 relative z-10">
        <button
          onClick={() => setGameState('setup')}
          className="text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Exit Campaign
        </button>

        <div className="flex items-center gap-3">
          {/* Dynamic Streak Flame */}
          {streak >= 2 && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black shadow-lg shadow-amber-500/10"
            >
              <Flame className="w-4 h-4 fill-current animate-pulse text-amber-400" />
              {streak} Streak!
            </motion.div>
          )}

          {/* Live Score Counter */}
          <div className="flex items-center gap-1.5 text-xs font-black text-indigo-300 bg-slate-900/80 border border-slate-800/80 px-3.5 py-1.5 rounded-full shadow-lg shadow-indigo-500/5 backdrop-blur-md">
            <Zap className="w-4 h-4 fill-current text-indigo-400" />
            {score} pts
          </div>

          <button
            onClick={handleToggleSound}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80 text-slate-400 hover:text-white transition-colors backdrop-blur-md"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>

      {/* Center Question Engine */}
      <div className="max-w-3xl w-full relative z-10 my-auto space-y-4">
        
        {/* Progress & Category Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="text-slate-200">
              Question <span className="text-indigo-400 font-extrabold">{currentIndex + 1}</span> / {questions.length}
            </span>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full border text-[11px] font-black ${badgeConfig.color}`}>
                {badgeConfig.label}
              </span>
              <span className={`px-3 py-1 rounded-full border text-[11px] font-semibold backdrop-blur-md flex items-center gap-1.5 ${currentCatTheme.color}`}>
                <CatIcon className="w-3 h-3" />
                {currentQuestion.category}
              </span>
            </div>
          </div>

          {/* Main Progress Bar */}
          <div className="w-full h-2.5 bg-slate-900/80 rounded-full overflow-hidden border border-slate-800/80 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Radial/Bar Countdown */}
          {timedMode && (
            <div className="w-full h-1 bg-slate-900/60 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  timeLeft <= 5 ? 'bg-rose-500' : 'bg-amber-400/80'
                }`}
                style={{ width: `${(timeLeft / 20) * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -12 }}
            className="glass-card-dark border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-600" />

            {/* Question Text */}
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 leading-snug">
              {currentQuestion.question}
            </h2>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.shuffledOptions.map((optionText, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectOption = idx === currentQuestion.shuffledCorrectIndex;
                const isAnswered = gameState === 'answered';

                let borderStyle = 'border-slate-800/80 hover:border-indigo-500/60 hover:bg-indigo-500/5 hover:scale-[1.005]';
                let bgStyle = 'bg-slate-900/50 text-slate-200';
                let letterBadgeBg = 'bg-slate-800 text-slate-300 border-slate-700';

                if (isAnswered) {
                  if (isCorrectOption) {
                    borderStyle = 'border-emerald-500/90 ring-2 ring-emerald-500/30';
                    bgStyle = 'bg-emerald-500/15 text-emerald-200 font-bold';
                    letterBadgeBg = 'bg-emerald-500 text-slate-950 font-black border-emerald-400';
                  } else if (isSelected && !isCorrectOption) {
                    borderStyle = 'border-rose-500/90 ring-2 ring-rose-500/30';
                    bgStyle = 'bg-rose-500/15 text-rose-200';
                    letterBadgeBg = 'bg-rose-500 text-white font-black border-rose-400';
                  } else {
                    borderStyle = 'border-slate-900 opacity-40';
                    bgStyle = 'bg-slate-950 text-slate-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border ${borderStyle} ${bgStyle} transition-all duration-200 flex items-center justify-between text-left group`}
                  >
                    <div className="flex items-center gap-3.5 pr-3">
                      <span
                        className={`w-8 h-8 rounded-xl border font-black text-xs flex items-center justify-center shrink-0 transition-colors shadow-sm ${letterBadgeBg}`}
                      >
                        {letterMapping[idx]}
                      </span>
                      <span className="text-sm sm:text-base font-semibold leading-snug">{optionText}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/60 border border-slate-800 text-slate-500">
                        [{keyMapping[idx]}]
                      </span>
                      {isAnswered && isCorrectOption && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-bounce" />
                      )}
                      {isAnswered && isSelected && !isCorrectOption && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Fact Explanation Card */}
            {gameState === 'answered' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 pt-2"
              >
                <div
                  className={`p-4 sm:p-5 rounded-2xl border ${
                    selectedOption === currentQuestion.shuffledCorrectIndex
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 font-black text-sm">
                    {selectedOption === currentQuestion.shuffledCorrectIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Correct Answer!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>
                          Incorrect • Right Choice:{' '}
                          <strong className="text-white">
                            {letterMapping[currentQuestion.shuffledCorrectIndex]}.{' '}
                            {currentQuestion.shuffledOptions[currentQuestion.shuffledCorrectIndex]}
                          </strong>
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <span className="font-black text-indigo-400">Fact Explanation:</span> {currentQuestion.explanation}
                  </p>
                </div>

                {/* Next Question Action */}
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-600 text-white font-black text-base shadow-xl shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
                >
                  {currentIndex + 1 < questions.length ? 'Next Question' : 'View Campaign Results'}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Keyboard Shortcut Hint */}
      <div className="max-w-3xl w-full text-center text-[11px] text-slate-500 py-3">
        Press <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-slate-400">1-4</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-slate-400">A-D</kbd> to choose • Press <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-slate-400">Enter</kbd> to advance
      </div>
    </div>
  );
};
