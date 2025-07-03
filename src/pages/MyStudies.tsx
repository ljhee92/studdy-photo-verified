import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, DollarSign, Clock, Eye, Banknote, Settings, StopCircle } from "lucide-react";
import { useStudyStore } from "@/store/studyStore";

export const MyStudies = () => {
  const navigate = useNavigate();
  const { myStudies } = useStudyStore();
  const currentUserId = "user2"; // This would come from auth context in real app
  const [studies, setStudies] = useState(
    myStudies.filter(study => 
      study.participants.some(p => p.id === currentUserId) && study.status === 'ongoing'
    )
  );

  useEffect(() => {
    setStudies(
      myStudies.filter(study => 
        study.participants.some(p => p.id === currentUserId) && study.status === 'ongoing'
      )
    );
  }, [myStudies]);

  const getStatusBadge = (status: string) => {
    const statusMap = {
      recruiting: { label: '모집 중', variant: 'default' as const },
      ongoing: { label: '진행 중', variant: 'secondary' as const },
      completed: { label: '완료', variant: 'outline' as const },
      cancelled: { label: '중단', variant: 'destructive' as const }
    };
    return statusMap[status as keyof typeof statusMap];
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

  const handleViewStudy = (studyId: string) => {
    navigate(`/my-study/${studyId}`);
  };

  const handleManageStudy = (studyId: string) => {
    navigate(`/manage/${studyId}`);
  };

  const handleStopStudy = (studyId: string) => {
    // This would show a confirmation dialog in a real app
    console.log("Stop study:", studyId);
  };

  const isOrganizer = (study: any) => {
    return study.organizer.id === currentUserId;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">내 스터디</h2>
            <p className="text-lg text-muted-foreground">
              참여 중인 스터디 목록을 확인하고 인증을 진행하세요.
            </p>
          </div>

          {studies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                진행 중인 스터디가 없습니다.
              </p>
              <Button onClick={() => navigate('/')}>
                스터디 찾아보기
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {studies.map((study) => {
                const statusInfo = getStatusBadge(study.status);
                const isOrganizerUser = isOrganizer(study);
                
                return (
                  <Card key={study.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">{study.title}</CardTitle>
                            <Badge variant={statusInfo.variant}>
                              {statusInfo.label}
                            </Badge>
                            {isOrganizerUser && (
                              <Badge variant="outline" className="text-blue-600 border-blue-600">
                                주최자
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground">{study.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{study.participants.length}명 참여</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Banknote className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{study.participantFee.toLocaleString()}원</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{formatDate(study.startDate)} - {formatDate(study.endDate)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{getVerificationText(study.verificationFrequency)}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button 
                          onClick={() => handleViewStudy(study.id)}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          상세보기
                        </Button>
                        
                        {isOrganizerUser && (
                          <>
                            <Button 
                              variant="outline"
                              onClick={() => handleManageStudy(study.id)}
                              className="flex items-center gap-2"
                            >
                              <Settings className="h-4 w-4" />
                              상세 관리
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={() => handleStopStudy(study.id)}
                              className="flex items-center gap-2"
                            >
                              <StopCircle className="h-4 w-4" />
                              스터디 중단
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
