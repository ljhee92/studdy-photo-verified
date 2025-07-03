
import { useState } from "react";
import { Header } from "../components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrustworthinessDisplay } from "../components/TrustworthinessDisplay";
import { toast } from "@/hooks/use-toast";

export const Profile = () => {
  const [phoneNumber, setPhoneNumber] = useState("010-1234-5678");
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data - in real app, this would come from authentication context
  const currentUser = {
    name: "최민수",
    email: "minsu@example.com",
    trustworthiness: 73,
    joinDate: "2024-10-15"
  };

  const handleSave = () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "입력 오류",
        description: "휴대폰 번호를 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "정보 수정 완료",
      description: "휴대폰 번호가 성공적으로 수정되었습니다.",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">내 정보 관리</h2>
            <p className="text-lg text-muted-foreground">
              개인정보 및 신뢰도를 확인하고 관리하세요.
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>이름</Label>
                    <div className="mt-1 p-2 border rounded-md bg-gray-50">
                      {currentUser.name}
                    </div>
                  </div>
                  <div>
                    <Label>이메일</Label>
                    <div className="mt-1 p-2 border rounded-md bg-gray-50">
                      {currentUser.email}
                    </div>
                  </div>
                  <div>
                    <Label>가입일</Label>
                    <div className="mt-1 p-2 border rounded-md bg-gray-50">
                      {new Date(currentUser.joinDate).toLocaleDateString('ko-KR')}
                    </div>
                  </div>
                  <div>
                    <Label>휴대폰 번호</Label>
                    {isEditing ? (
                      <Input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="010-0000-0000"
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 p-2 border rounded-md bg-gray-50">
                        {phoneNumber}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        취소
                      </Button>
                      <Button onClick={handleSave}>
                        저장
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      수정
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>신뢰도</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      현재 신뢰도
                    </p>
                    <TrustworthinessDisplay 
                      score={currentUser.trustworthiness} 
                      showScore={true} 
                      size="lg" 
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {currentUser.trustworthiness}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      /100
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    신뢰도는 스터디 참여 및 완주 이력, 인증 성실도 등을 종합하여 산출됩니다.
                    꾸준한 스터디 참여로 신뢰도를 높여보세요!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
