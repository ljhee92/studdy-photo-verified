import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Calendar, Users, DollarSign, Clock, Settings, StopCircle, Banknote } from "lucide-react";
import { mockMyStudies } from "../data/mockData";
import { Study } from "../types/study";
import { toast } from "@/hooks/use-toast";

export const ManageStudies = () => {
  const navigate = useNavigate();
  const [studies, setStudies] = useState<Study[]>(mockMyStudies);

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

  const handleCancelStudy = (studyId: string) => {
    setStudies(prev => prev.map(study => 
      study.id === studyId 
        ? { ...study, status: 'cancelled' as const }
        : study
    ));
    
    toast({
      title: "스터디 중단 완료",
      description: "스터디가 중단되었습니다. 더 이상 참여자를 모집할 수 없습니다.",
    });
  };

  const handleManageStudy = (studyId: string) => {
    navigate(`/manage/${studyId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">내 스터디 관리</h2>
            <p className="text-muted-foreground">
              내가 주최한 스터디를 관리하고 참여자들의 인증 내역을 확인할 수 있습니다.
            </p>
          </div>

          <div className="space-y-6">
            {studies.map((study) => {
              const statusInfo = getStatusBadge(study.status);
              const canCancel = study.status === 'recruiting' || study.status === 'ongoing';
              
              return (
                <Card key={study.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{study.title}</CardTitle>
                        <p className="text-muted-foreground line-clamp-2">{study.description}</p>
                      </div>
                      <Badge variant={statusInfo.variant} className="ml-4">
                        {statusInfo.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{study.currentParticipants}/{study.maxParticipants}명 참여</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Banknote className="h-4 w-4" />
                          <span>참가비 {study.participantFee.toLocaleString()}원</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(study.startDate)} - {formatDate(study.endDate)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>인증 {getVerificationText(study.verificationFrequency)}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-end gap-2">
                        <Button 
                          variant="outline" 
                          className="flex items-center gap-2"
                          onClick={() => handleManageStudy(study.id)}
                        >
                          <Settings className="h-4 w-4" />
                          상세 관리
                        </Button>
                        
                        {canCancel && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="destructive" 
                                className="flex items-center gap-2"
                              >
                                <StopCircle className="h-4 w-4" />
                                스터디 중단
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>스터디를 중단하시겠습니까?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  스터디를 중단하면 더 이상 참여자를 모집할 수 없으며, 
                                  현재 참여자들의 참가비 처리는 별도로 진행됩니다.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>취소</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleCancelStudy(study.id)}>
                                  중단하기
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {studies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                아직 생성한 스터디가 없습니다.
              </p>
              <Button onClick={() => navigate('/create')}>
                첫 스터디 만들기
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
