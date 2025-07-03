export interface TrustworthinessBadge {
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  score: number;
  label: string;
  color: string;
  icon: string;
}

export const getTrustworthinessBadge = (score: number): TrustworthinessBadge => {
  if (score >= 90) {
    return {
      level: 'platinum',
      score,
      label: 'Verified',
      color: '#3b82f6',
      icon: 'shield-check'
    };
  } else if (score >= 70) {
    return {
      level: 'gold',
      score,
      label: 'Trusted',
      color: '#22c55e',
      icon: 'badge-check'
    };
  } else if (score >= 50) {
    return {
      level: 'silver',
      score,
      label: 'Moderate',
      color: '#facc15',
      icon: 'star'
    };
  } else {
    return {
      level: 'bronze',
      score,
      label: 'Low',
      color: '#ef4444',
      icon: 'star-half'
    };
  }
};
