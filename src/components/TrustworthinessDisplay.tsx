
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, BadgeCheck, Star, StarHalf } from "lucide-react";
import { getTrustworthinessBadge } from "../types/trustworthiness";

interface TrustworthinessDisplayProps {
  score: number;
  showScore?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const TrustworthinessDisplay = ({ 
  score, 
  showScore = false, 
  size = 'sm' 
}: TrustworthinessDisplayProps) => {
  const trustBadge = getTrustworthinessBadge(score);
  
  const getIcon = () => {
    const iconSize = size === 'lg' ? 16 : size === 'md' ? 14 : 12;
    const iconProps = { size: iconSize, style: { color: trustBadge.color } };
    
    switch (trustBadge.icon) {
      case 'shield-check':
        return <ShieldCheck {...iconProps} />;
      case 'badge-check':
        return <BadgeCheck {...iconProps} />;
      case 'star':
        return <Star {...iconProps} />;
      case 'star-half':
        return <StarHalf {...iconProps} />;
      default:
        return <Star {...iconProps} />;
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={`flex items-center gap-1 ${
        size === 'lg' ? 'text-sm px-3 py-1' : 
        size === 'md' ? 'text-xs px-2 py-1' : 
        'text-xs px-1.5 py-0.5'
      }`}
      style={{ borderColor: trustBadge.color }}
    >
      {getIcon()}
      <span style={{ color: trustBadge.color }}>
        {trustBadge.label}
        {showScore && ` (${score})`}
      </span>
    </Badge>
  );
};
