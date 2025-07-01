
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Won, Clock, User, ArrowLeft } from "lucide-react";
import { mockStudies } from "../data/mockData";
import { toast } from "@/hooks/use-toast";

export const StudyDetail = () => {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = useState(false);
  
  const study = mockStudies.find(s => s.id === studyId);

  if (!study) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">스터디를 찾을 수 없습니다</h2>
            <Button onClick={() => navigate('/')}>홈으로 돌아가기</Button>
          </div>
        </main>
      </div>
    );
  }

  const getStatusBadge = (status: typeof study.status) => {
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
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getVerificationText = (days: number) => {
    return days === 1 ? '매일 인증' : `${days}일마다 인증`;
  };

  const handleJoin = async () => {
    if (study.currentParticipants >= study.maxParticipants) {
      toast({
        title: "참가 불가",
        description: "모집 인원이 마감되었습니다.",
        variant: "destructive"
      });
      return;
    }

    setIsJoining(true);
    
    // 결제 시뮬레이션
    setTimeout(() => {
      toast({
        title: "스터디 참가 완료",
        description: `"${study.title}" 스터디에 참가했습니다. 참가비 ${study.participantFee.toLocaleString()}원이 결제되었습니다.`,
      });
      setIsJoining(false);
      
      // 홈으로 이동
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 2000);
  };

  const statusInfo = getStatusBadge(study.status);
  const isRecruitingFull = study.currentParticipants >= study.maxParticipants;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              스터디 목록으로 돌아가기
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{study.title}</CardTitle>
                  <p className="text-muted-foreground text-lg">{study.description}</p>
                </div>
                <Badge variant={statusInfo.variant} className="ml-4">
                  {statusInfo.label}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">스터디 정보</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span>모집 인원: {study.currentParticipants}/{study.maxParticipants}명</span>
                        {isRecruitingFull && (
                          <Badge variant="secondary">모집 완료</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Won className="h-5 w-5 text-muted-foreground" />
                        <span>참가비: {study.participantFee.toLocaleString()}원</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span>기간: {formatDate(study.startDate)} - {formatDate(study.endDate)}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <span>{getVerificationText(study.verificationFrequency)}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <span>주최자: {study.organizer.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">인증 방식 안내</h4>
                    <p className="text-sm text-blue-800">
                      메타데이터(사진이 촬영된 실제 시간)가 포함된 사진을 업로드해야 합니다. 
                      주최자가 사진의 메타데이터를 확인하여 인증을 승인하거나 반려합니다.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">참가자 목록</h3>
                    <div className="space-y-2">
                      {study.participants.map((participant, index) => (
                        <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">
                                {participant.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium">{participant.name}</span>
                              {index === 0 && (
                                <Badge variant="outline" className="ml-2 text-xs">주최자</Badge>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(participant.joinedAt).toLocaleDateString('ko-KR')} 참가
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {study.status === 'recruiting' && (
                    <div className="pt-4 border-t">
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={handleJoin}
                        disabled={isRecruitingFull || isJoining}
                      >
                        {isJoining 
                          ? "참가 처리 중..." 
                          : isRecruitingFull 
                            ? "모집 완료" 
                            : `참가하기 (${study.participantFee.toLocaleString()}원)`
                        }
                      </Button>
                      
                      {!isRecruitingFull && (
                        <p className="text-sm text-muted-foreground text-center mt-2">
                          참가 버튼을 클릭하면 참가비가 결제됩니다.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
