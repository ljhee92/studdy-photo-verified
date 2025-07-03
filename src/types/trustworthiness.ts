
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
      label: '플래티넘',
      color: '#a855f7',
      icon: 'shield-check'
    };
  } else if (score >= 70) {
    return {
      level: 'gold',
      score,
      label: '골드',
      color: '#eab308',
      icon: 'badge-check'
    };
  } else if (score >= 50) {
    return {
      level: 'silver',
      score,
      label: '실버',
      color: '#6b7280',
      icon: 'star'
    };
  } else {
    return {
      level: 'bronze',
      score,
      label: '브론즈',
      color: '#cd7c0f',
      icon: 'star-half'
    };
  }
};
