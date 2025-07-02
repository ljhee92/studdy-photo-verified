
import { useState } from "react";
import { Header } from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, Save } from "lucide-react";
import { usePointContext } from "../contexts/PointContext";
import { toast } from "@/hooks/use-toast";

export const Profile = () => {
  const { user, updateUser } = usePointContext();
  const [phone, setPhone] = useState(user.phone);
  const [name, setName] = useState(user.name);

  const handleSave = () => {
    updateUser({ phone, name });
    toast({
      title: "정보 저장 완료",
      description: "사용자 정보가 성공적으로 업데이트되었습니다.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">내 정보 관리</h1>
            <p className="text-lg text-muted-foreground">
              개인정보를 관리하고 업데이트하세요
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                사용자 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름을 입력하세요"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">휴대폰 번호</Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  기프티콘은 등록된 휴대폰 번호로 전송됩니다.
                </p>
              </div>

              <div className="pt-4">
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  저장하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
