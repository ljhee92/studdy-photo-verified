
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Users, DollarSign, Clock, ArrowLeft, Upload, CheckCircle, XCircle, AlertCircle, Banknote, Camera } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { TrustworthinessDisplay } from "../components/TrustworthinessDisplay";
import { useStudyStore } from "@/store/studyStore";

export const MyStudyDetail = () => {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getStudyById } = useStudyStore();
  
  const study = getStudyById(studyId!);
  const currentUserId = "user2"; // This would come from auth context in real app
  const currentUser = study?.participants.find(p => p.id === currentUserId);
  
  if (!study) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">스터디를 찾을 수 없습니다</h2>
            <Button onClick={() => navigate('/my-studies')}>내 스터디로 돌아가기</Button>
          </div>
        </main>
      </div>
    );
  }

  
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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR');
  };

  const getVerificationText = (days: number) => {
    return days === 1 ? '매일 인증' : `${days}일마다 인증`;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "파일 형식 오류",
        description: "이미지 파일만 업로드할 수 있습니다.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    // 파일 업로드 시뮬레이션
    setTimeout(() => {
      toast({
        title: "인증 완료",
        description: "스터디 인증이 제출되었습니다. 주최자의 승인을 기다려주세요.",
      });
      setIsUploading(false);
      setIsDialogOpen(false);
    }, 2000);
  };

  const handleResubmit = (verificationId: string) => {
    setIsDialogOpen(true);
    toast({
      title: "재인증 요청",
      description: "새로운 인증 사진을 업로드해주세요.",
    });
  };

  const handleAccountSubmit = () => {
    if (!accountNumber.trim()) {
      toast({
        title: "입력 오류",
        description: "계좌번호를 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "환급 신청 완료",
      description: "입력하신 계좌로 참가비가 환급됩니다.",
    });
  };

  const getVerificationStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: '검토 중', variant: 'secondary' as const, icon: AlertCircle },
      approved: { label: '승인', variant: 'default' as const, icon: CheckCircle },
      rejected: { label: '반려', variant: 'destructive' as const, icon: XCircle }
    };
    return statusMap[status as keyof typeof statusMap];
  };

  const statusInfo = getStatusBadge(study.status);
  const isCompleted = study.status === 'completed';
  const canReceiveRefund = isCompleted && currentUser?.verifications.every(v => v.status === 'approved');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/my-studies')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              내 스터디 목록으로
            </Button>
          </div>

          
          <Card className="mb-8">
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
              <div className="grid md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>{study.participants.length}명 참여</span>
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

          <Tabs defaultValue="verification" className="space-y-4">
            <TabsList>
              <TabsTrigger value="verification">인증 관리</TabsTrigger>
              <TabsTrigger value="participants">참여자 목록</TabsTrigger>
              {isCompleted && canReceiveRefund && (
                <TabsTrigger value="refund">환급 신청</TabsTrigger>
              )}
            </TabsList>
            
            
            <TabsContent value="verification" className="space-y-4">
              {study.status === 'ongoing' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">스터디 인증하기</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>인증 방식:</strong> 메타데이터가 포함된 사진을 업로드해주세요. 
                          주최자가 사진의 촬영 시간을 확인하여 인증을 승인합니다.
                        </p>
                      </div>
                      
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="flex items-center gap-2">
                            <Camera className="h-4 w-4" />
                            인증 사진 업로드
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>스터디 인증 사진 업로드</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                              <p className="text-sm text-blue-800">
                                메타데이터가 포함된 사진을 업로드해주세요. 주최자가 사진의 촬영 시간을 확인하여 인증을 승인합니다.
                              </p>
                            </div>
                            <div>
                              <Label htmlFor="verification-upload" className="block mb-2">
                                인증 사진 선택
                              </Label>
                              <input
                                id="verification-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                disabled={isUploading}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              />
                            </div>
                            
                            {isUploading && (
                              <div className="flex items-center gap-2 text-blue-600">
                                <Upload className="h-4 w-4 animate-spin" />
                                업로드 중...
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">내 인증 내역</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentUser?.verifications && currentUser.verifications.length > 0 ? (
                    <div className="space-y-4">
                      {currentUser.verifications.map((verification) => {
                        const statusInfo = getVerificationStatusBadge(verification.status);
                        const StatusIcon = statusInfo.icon;
                        
                        return (
                          <div key={verification.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">
                                  {formatDate(verification.date)} 인증
                                </h4>
                                <Badge variant={statusInfo.variant} className="flex items-center gap-1">
                                  <StatusIcon className="h-3 w-3" />
                                  {statusInfo.label}
                                </Badge>
                              </div>
                              
                              {verification.status === 'rejected' && (
                                <Button
                                  size="sm"
                                  onClick={() => handleResubmit(verification.id)}
                                  className="flex items-center gap-1"
                                >
                                  <Upload className="h-4 w-4" />
                                  재인증
                                </Button>
                              )}
                            </div>
                            
                            {/* 업로드된 이미지 표시 */}
                            {verification.imageUrl && (
                              <div className="mb-3">
                                <img 
                                  src={verification.imageUrl} 
                                  alt="인증 사진" 
                                  className="max-w-xs h-32 object-cover rounded-lg border"
                                />
                              </div>
                            )}
                            
                            <p className="text-sm text-muted-foreground">
                              촬영 시간: {formatDateTime(verification.capturedAt)}
                            </p>
                            
                            {verification.reviewedAt && (
                              <p className="text-sm text-muted-foreground">
                                검토 완료: {formatDateTime(verification.reviewedAt)}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        아직 제출한 인증이 없습니다.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="participants" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">참여자 목록</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {study.participants.map((participant, index) => (
                      <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {participant.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{participant.name}</span>
                              <TrustworthinessDisplay score={participant.trustworthiness} />
                            </div>
                            <div className="flex items-center gap-2">
                              {study.organizer.id === participant.id && (
                                <Badge variant="outline" className="text-xs">주최자</Badge>
                              )}
                              {participant.id === currentUserId && (
                                <Badge variant="secondary" className="text-xs">나</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(participant.joinedAt).toLocaleDateString('ko-KR')} 참가
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            
            {isCompleted && canReceiveRefund && (
              <TabsContent value="refund">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Banknote className="h-5 w-5" />
                      참가비 환급 신청
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>축하합니다!</strong> 모든 인증이 승인되어 참가비 환급 대상입니다.
                          환급받을 계좌번호를 입력해주세요.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="account">환급 계좌번호</Label>
                        <Input
                          id="account"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          placeholder="계좌번호를 입력하세요 (예: 1234-567-890123)"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleAccountSubmit}>
                          환급 신청하기
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
    </div>
  );
};
