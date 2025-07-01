
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Won, Clock } from "lucide-react";
import { Study } from "../types/study";

interface StudyCardProps {
  study: Study;
  onViewDetails: (studyId: string) => void;
  showJoinButton?: boolean;
}

export const StudyCard = ({ study, onViewDetails, showJoinButton = true }: StudyCardProps) => {
  const getStatusBadge = (status: Study['status']) => {
    const statusMap = {
      recruiting: { label: '모집 중', variant: 'default' as const },
      ongoing: { label: '진행 중', variant: 'secondary' as const },
      completed: { label: '완료', variant: 'outline' as const },
      cancelled: { label: '중단', variant: 'destructive' as const }
    };
    return statusMap[status];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getVerificationText = (days: number) => {
    return days === 1 ? '매일' : `${days}일마다`;
  };

  const statusInfo = getStatusBadge(study.status);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-2 flex-1 mr-3">
            {study.title}
          </CardTitle>
          <Badge variant={statusInfo.variant}>
            {statusInfo.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
          {study.description}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{study.currentParticipants}/{study.maxParticipants}명</span>
            </div>
            <div className="flex items-center gap-1">
              <Won className="h-4 w-4" />
              <span>{study.participantFee.toLocaleString()}원</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(study.startDate)} - {formatDate(study.endDate)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>인증 {getVerificationText(study.verificationFrequency)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-3">
            <span className="text-sm text-muted-foreground">
              주최: {study.organizer.name}
            </span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onViewDetails(study.id)}
              >
                상세보기
              </Button>
              {showJoinButton && study.status === 'recruiting' && (
                <Button 
                  size="sm"
                  onClick={() => onViewDetails(study.id)}
                  disabled={study.currentParticipants >= study.maxParticipants}
                >
                  참가하기
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
