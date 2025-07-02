import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, DollarSign, Clock, ArrowLeft, CheckCircle, XCircle, Image, Banknote } from "lucide-react";
import { mockMyStudies } from "../data/mockData";
import { Participant, Verification } from "../types/study";
import { toast } from "@/hooks/use-toast";

export const StudyManagement = () => {
  const { studyId } = useParams();
  const navigate = useNavigate();
  
  const study = mockMyStudies.find(s => s.id === studyId);
  const [participants, setParticipants] = useState<Participant[]>(study?.participants || []);
  
  if (!study) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">스터디를 찾을 수 없습니다</h2>
            <Button onClick={() => navigate('/manage')}>관리 목록으로 돌아가기</Button>
          </div>
        </main>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR');
  };

  const getVerificationText = (days: number) => {
    return days === 1 ? '매일 인증' : `${days}일마다 인증`;
  };

  const handleVerificationAction = (participantId: string, verificationId: string, action: 'approve' | 'reject') => {
    setParticipants(prev => prev.map(participant => {
      if (participant.id === participantId) {
        return {
          ...participant,
          verifications: participant.verifications.map(verification => {
            if (verification.id === verificationId) {
              return {
                ...verification,
                status: action === 'approve' ? 'approved' : 'rejected',
                reviewedBy: 'user1', // 현재 로그인한 사용자
                reviewedAt: new Date().toISOString()
              };
            }
            return verification;
          })
        };
      }
      return participant;
    }));

    toast({
      title: action === 'approve' ? "인증 승인" : "인증 반려",
      description: action === 'approve' 
        ? "스터디 인증이 승인되었습니다." 
        : "스터디 인증이 반려되었습니다. 참여자에게 재인증을 요청합니다.",
    });
  };

  const getStatusBadge = (status: Verification['status']) => {
    const statusMap = {
      pending: { label: '검토 중', variant: 'secondary' as const },
      approved: { label: '승인', variant: 'default' as const },
      rejected: { label: '반려', variant: 'destructive' as const }
    };
    return statusMap[status];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/manage')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              스터디 관리 목록으로
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">{study.title}</CardTitle>
              <p className="text-muted-foreground">{study.description}</p>
            </CardHeader>
            
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>{study.currentParticipants}/{study.maxParticipants}명</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Banknote className="h-5 w-5 text-muted-foreground" />
                  <span>{study.participantFee.toLocaleString()}원</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{formatDate(study.startDate)} - {formatDate(study.endDate)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>{getVerificationText(study.verificationFrequency)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="participants" className="space-y-4">
            <TabsList>
              <TabsTrigger value="participants">참여자 관리</TabsTrigger>
              <TabsTrigger value="verifications">인증 내역</TabsTrigger>
            </TabsList>
            
            <TabsContent value="participants" className="space-y-4">
              <div className="grid gap-4">
                {participants.map((participant, index) => (
                  <Card key={participant.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-medium text-blue-600">
                              {participant.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{participant.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(participant.joinedAt)} 참가
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {index === 0 && (
                            <Badge variant="outline">주최자</Badge>
                          )}
                          <Badge variant="secondary">
                            인증 {participant.verifications.length}회
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    {participant.verifications.length > 0 && (
                      <CardContent>
                        <h4 className="font-medium mb-3">최근 인증 내역</h4>
                        <div className="space-y-2">
                          {participant.verifications.slice(0, 3).map((verification) => {
                            const statusInfo = getStatusBadge(verification.status);
                            return (
                              <div key={verification.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <Image className="h-6 w-6 text-gray-500" />
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      {formatDate(verification.date)} 인증
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      촬영: {formatDateTime(verification.capturedAt)}
                                    </p>
                                  </div>
                                </div>
                                <Badge variant={statusInfo.variant}>
                                  {statusInfo.label}
                                </Badge>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="verifications" className="space-y-4">
              <div className="space-y-6">
                {participants.map((participant) => (
                  participant.verifications.length > 0 && (
                    <Card key={participant.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {participant.name}의 인증 내역
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-4">
                          {participant.verifications.map((verification) => {
                            const statusInfo = getStatusBadge(verification.status);
                            return (
                              <div key={verification.id} className="border rounded-lg p-4">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex gap-4 flex-1">
                                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                                      <Image className="h-8 w-8 text-gray-500" />
                                    </div>
                                    
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <h4 className="font-medium">
                                          {formatDate(verification.date)} 인증
                                        </h4>
                                        <Badge variant={statusInfo.variant}>
                                          {statusInfo.label}
                                        </Badge>
                                      </div>
                                      
                                      <p className="text-sm text-muted-foreground mb-1">
                                        사진 촬영 시간: {formatDateTime(verification.capturedAt)}
                                      </p>
                                      
                                      {verification.reviewedAt && (
                                        <p className="text-sm text-muted-foreground">
                                          검토 완료: {formatDateTime(verification.reviewedAt)}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {verification.status === 'pending' && (
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        onClick={() => handleVerificationAction(participant.id, verification.id, 'approve')}
                                        className="flex items-center gap-1"
                                      >
                                        <CheckCircle className="h-4 w-4" />
                                        승인
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleVerificationAction(participant.id, verification.id, 'reject')}
                                        className="flex items-center gap-1"
                                      >
                                        <XCircle className="h-4 w-4" />
                                        반려
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )
                ))}
              </div>
              
              {participants.every(p => p.verifications.length === 0) && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    아직 제출된 인증 내역이 없습니다.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};
