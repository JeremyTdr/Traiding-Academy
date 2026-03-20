// Icônes utilisées dynamiquement — import ciblé pour éviter de charger toute la lib Lucide
import {
  Landmark, BookOpen, LineChart, CandlestickChart, TrendingUp,
  Activity, Scale, ShieldCheck, Waves, Brain, Lock,
  Sprout, Zap, Trophy,
} from 'lucide-react'

export const ICON_MAP = {
  Landmark, BookOpen, LineChart, CandlestickChart, TrendingUp,
  Activity, Scale, ShieldCheck, Waves, Brain, Lock,
  Sprout, Zap, Trophy,
}

export function getIcon(name) {
  return ICON_MAP[name] ?? null
}
