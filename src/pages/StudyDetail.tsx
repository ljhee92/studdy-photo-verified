import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Users, DollarSign, Clock, User, ArrowLeft, Banknote, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { TrustworthinessDisplay } from "../components/TrustworthinessDisplay";
import { PaymentConfirmDialog } from "../components/PaymentConfirmDialog";
import { useStudyStore } from "@/store/studyStore";

export const StudyDetail = () => {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const { getStudyById, joinStudy } = useStudyStore();
  
  const study = getStudyById(studyId!);
  const currentUserId = "user2"; // This would come from auth context in real app

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

  // 현재 사용자가 이미 참여중인지 확인
  const isAlreadyParticipant = study.participants.some(p => p.id === currentUserId);
  // 현재 사용자가 주최자인지 확인
  const isOrganizer = study.organizer.id === currentUserId;

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

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getVerificationText = (days: number) => {
    return days === 1 ? '매일 인증' : `${days}일마다 인증`;
  };

  const handleJoinClick = () => {
    if (study.currentParticipants >= study.maxParticipants) {
      toast({
        title: "참가 불가",
        description: "모집 인원이 마감되었습니다.",
        variant: "destructive"
      });
      return;
    }

    if (isAlreadyParticipant) {
      toast({
        title: "참가 불가",
        description: "이미 참여중인 스터디입니다.",
        variant: "destructive"
      });
      return;
    }

    if (isOrganizer) {
      toast({
        title: "참가 불가",  
        description: "본인이 주최한 스터디입니다.",
        variant: "destructive"
      });
      return;
    }

    setShowPaymentDialog(true);
  };

  const handlePaymentConfirm = async () => {
    setShowPaymentDialog(false);
    setIsJoining(true);
    
    // 결제 시뮬레이션
    setTimeout(() => {
      const newParticipant = {
        id: currentUserId,
        name: "사용자2", // This would come from auth context
        joinedAt: new Date().toISOString(),
        trustworthiness: 85,
        verifications: []
      };

      joinStudy(study.id, newParticipant);

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
  const canJoin = study.status === 'recruiting' && !isRecruitingFull && !isAlreadyParticipant && !isOrganizer;

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
                        <Banknote className="h-5 w-5 text-muted-foreground" />
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
                        <TrustworthinessDisplay score={study.organizer.trustworthiness} />
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
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{participant.name}</span>
                                <TrustworthinessDisplay score={participant.trustworthiness} />
                              </div>
                              {index === 0 && (
                                <Badge variant="outline" className="text-xs w-fit">주최자</Badge>
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

                  {/* Chat preview section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      소통 중인 내용
                    </h3>
                    {study.chatMessages.length > 0 ? (
                      <Card>
                        <CardContent className="p-4">
                          <ScrollArea className="h-40">
                            <div className="space-y-3">
                              {study.chatMessages.slice(-5).map((message) => (
                                <div key={message.id} className="text-sm">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-blue-600">{message.senderName}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {formatTime(message.timestamp)}
                                    </span>
                                  </div>
                                  <p className="text-gray-700 pl-2 border-l-2 border-gray-200">
                                    {message.message}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                          <div className="mt-3 pt-3 border-t text-center">
                            <p className="text-xs text-muted-foreground">
                              스터디에 참여하시면 채팅에 참여할 수 있습니다
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardContent className="p-4 text-center text-muted-foreground">
                          <p>아직 채팅 메시지가 없습니다</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {study.status === 'recruiting' && (
                    <div className="pt-4 border-t">
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={handleJoinClick}
                        disabled={!canJoin || isJoining}
                      >
                        {isJoining 
                          ? "참가 처리 중..." 
                          : isOrganizer
                            ? "본인이 주최한 스터디입니다"
                          : isAlreadyParticipant
                            ? "이미 참여중인 스터디입니다"
                          : isRecruitingFull 
                            ? "모집 완료" 
                            : `참가하기 (${study.participantFee.toLocaleString()}원)`
                        }
                      </Button>
                      
                      {canJoin && (
                        <p className="text-sm text-muted-foreground text-center mt-2">
                          참가 시 참가비가 결제되며, 성공하면 서비스 내 포인트로 전액 환급됩니다. 
                          실패 시 일부는 기부 및 운영비로 사용됩니다.
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

      <PaymentConfirmDialog
        isOpen={showPaymentDialog}
        onClose={() => setShowPaymentDialog(false)}
        onConfirm={handlePaymentConfirm}
        amount={study.participantFee}
        title={study.title}
      />
    </div>
  );
};
