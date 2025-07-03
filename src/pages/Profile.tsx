import { useState } from "react";
import { Header } from "../components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrustworthinessDisplay } from "../components/TrustworthinessDisplay";
import { toast } from "@/hooks/use-toast";
import { useUser } from "../contexts/UserContext";

export const Profile = () => {
  const { name, setName, email, setEmail } = useUser();
  const [phoneNumber, setPhoneNumber] = useState("010-1234-5678");
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [emailCodeInput, setEmailCodeInput] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const [phoneInput, setPhoneInput] = useState(phoneNumber);
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneCodeInput, setPhoneCodeInput] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);

  const [nameInput, setNameInput] = useState(name);  

  const currentUser = {
    name,
    email,
    trustworthiness: 73,
    joinDate: "2024-10-15"
  };

  const handleSaveName = () => {
    if (!nameInput.trim()) {
      toast({ title: "입력 오류", description: "이름을 입력해주세요.", variant: "destructive" });
      return;
    }
    setName(nameInput);
    setIsEditingName(false);
    toast({ title: "이름 수정 완료", description: "이름이 성공적으로 수정되었습니다." });
  };

  const handleSendEmailCode = () => {
    if (!emailInput.trim()) {
      toast({ title: "입력 오류", description: "이메일을 입력해주세요.", variant: "destructive" });
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setEmailCode(code);
    setEmailCodeSent(true);
    toast({ title: "인증 코드 발송", description: `인증 코드가 ${emailInput}로 발송되었습니다. (mock: ${code})` });
  };

  const handleVerifyEmailCode = () => {
    if (emailCodeInput === emailCode) {
      setEmail(emailInput);
      setIsEditingEmail(false);
      setEmailVerified(true);
      setEmailCodeSent(false);
      setEmailCode("");
      setEmailCodeInput("");
      toast({ title: "이메일 수정 완료", description: "이메일이 성공적으로 수정되었습니다." });
    } else {
      toast({ title: "인증 실패", description: "인증 코드가 올바르지 않습니다.", variant: "destructive" });
    }
  };

  const handleSendPhoneCode = () => {
    if (!phoneInput.trim()) {
      toast({ title: "입력 오류", description: "휴대폰 번호를 입력해주세요.", variant: "destructive" });
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setPhoneCode(code);
    setPhoneCodeSent(true);
    toast({ title: "인증번호 발송", description: `인증번호가 ${phoneInput}로 발송되었습니다. (mock: ${code})` });
  };

  const handleVerifyPhoneCode = () => {
    if (phoneCodeInput === phoneCode) {
      setPhoneNumber(phoneInput);
      setIsEditingPhone(false);
      setPhoneVerified(true);
      setPhoneCodeSent(false);
      setPhoneCode("");
      setPhoneCodeInput("");
      toast({ title: "휴대폰 번호 수정 완료", description: "휴대폰 번호가 성공적으로 수정되었습니다." });
    } else {
      toast({ title: "인증 실패", description: "인증번호가 올바르지 않습니다.", variant: "destructive" });
    }
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
                    <div className="mt-1 p-2 border rounded-md bg-gray-50">{currentUser.name}</div>
                  </div>
                  <div>
                    <Label>이메일</Label>
                    {isEditingEmail ? (
                      <div className="space-y-2 mt-1">
                        <Input value={emailInput} onChange={e => setEmailInput(e.target.value)} placeholder="이메일 입력" />
                        {emailCodeSent ? (
                          <div className="flex gap-2">
                            <Input value={emailCodeInput} onChange={e => setEmailCodeInput(e.target.value)} placeholder="인증 코드 입력" />
                            <Button size="sm" onClick={handleVerifyEmailCode}>확인</Button>
                          </div>
                        ) : (
                          <Button size="sm" onClick={handleSendEmailCode}>인증 코드 발송</Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => setIsEditingEmail(false)}>취소</Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="p-2 border rounded-md bg-gray-50">{currentUser.email}</div>
                        <Button size="sm" variant="outline" onClick={() => { setIsEditingEmail(true); setEmailInput(email); }}>수정</Button>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label>가입일</Label>
                    <div className="mt-1 p-2 border rounded-md bg-gray-50">
                      {new Date(currentUser.joinDate).toLocaleDateString('ko-KR')}
                    </div>
                  </div>
                  <div>
                    <Label>휴대폰 번호</Label>
                    {isEditingPhone ? (
                      <div className="space-y-2 mt-1">
                        <Input value={phoneInput} onChange={e => setPhoneInput(e.target.value)} placeholder="010-0000-0000" />
                        {phoneCodeSent ? (
                          <div className="flex gap-2">
                            <Input value={phoneCodeInput} onChange={e => setPhoneCodeInput(e.target.value)} placeholder="인증번호 입력" />
                            <Button size="sm" onClick={handleVerifyPhoneCode}>확인</Button>
                          </div>
                        ) : (
                          <Button size="sm" onClick={handleSendPhoneCode}>인증번호 발송</Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => setIsEditingPhone(false)}>취소</Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="p-2 border rounded-md bg-gray-50">{phoneNumber}</div>
                        <Button size="sm" variant="outline" onClick={() => { setIsEditingPhone(true); setPhoneInput(phoneNumber); }}>수정</Button>
                      </div>
                    )}
                  </div>
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
