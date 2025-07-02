import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, Clock, Banknote } from "lucide-react";
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
          <CardTitle className="text-base md:text-lg font-semibold line-clamp-2 flex-1 mr-0 md:mr-3">
            {study.title}
          </CardTitle>
          <Badge variant={statusInfo.variant}>
            {statusInfo.label}
          </Badge>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mt-1 md:mt-2">
          {study.description}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 md:space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 md:h-4 md:w-4" />
              <span>{study.currentParticipants}/{study.maxParticipants}명</span>
            </div>
            <div className="flex items-center gap-1">
              <Banknote className="h-3 w-3 md:h-4 md:w-4" />
              <span>{study.participantFee.toLocaleString()}원</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 md:h-4 md:w-4" />
              <span>{formatDate(study.startDate)} - {formatDate(study.endDate)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 md:h-4 md:w-4" />
              <span>인증 {getVerificationText(study.verificationFrequency)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 md:pt-3 gap-2 sm:gap-0">
            <span className="text-xs md:text-sm text-muted-foreground">
              주최: {study.organizer.name}
            </span>
            <div className="flex gap-1 md:gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs md:text-sm px-2 md:px-4"
                onClick={() => onViewDetails(study.id)}
              >
                상세보기
              </Button>
              {showJoinButton && study.status === 'recruiting' && (
                <Button 
                  size="sm"
                  className="text-xs md:text-sm px-2 md:px-4"
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
