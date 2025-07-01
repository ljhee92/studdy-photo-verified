
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Info } from "lucide-react";
import { format, addMonths } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export const CreateStudy = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    maxParticipants: "",
    participantFee: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    verificationFrequency: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 폼 검증
    if (!formData.title || !formData.description || !formData.maxParticipants || 
        !formData.participantFee || !formData.startDate || !formData.endDate || 
        !formData.verificationFrequency) {
      toast({
        title: "입력 오류",
        description: "모든 필드를 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    // 종료 날짜가 시작 날짜보다 이후인지 확인
    if (formData.endDate <= formData.startDate) {
      toast({
        title: "날짜 오류",
        description: "종료 날짜는 시작 날짜보다 뒤에 있어야 합니다.",
        variant: "destructive"
      });
      return;
    }

    // 종료 날짜가 시작 날짜로부터 3개월 이내인지 확인
    const maxEndDate = addMonths(formData.startDate, 3);
    if (formData.endDate > maxEndDate) {
      toast({
        title: "날짜 오류",
        description: "종료 날짜는 시작 날짜로부터 최대 3개월까지만 가능합니다.",
        variant: "destructive"
      });
      return;
    }

    console.log("스터디 생성 데이터:", formData);
    
    toast({
      title: "스터디 생성 완료",
      description: `"${formData.title}" 스터디가 생성되었습니다. 참가비 ${formData.participantFee}원이 결제됩니다.`,
    });

    // 홈으로 이동
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const getMaxEndDate = () => {
    return formData.startDate ? addMonths(formData.startDate, 3) : undefined;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">스터디 생성</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">스터디 제목 *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="예: 토익 900점 달성 스터디"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">스터디 설명 *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="스터디에 대한 자세한 설명을 입력하세요..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="participants">스터디 인원 수 *</Label>
                    <Select value={formData.maxParticipants} onValueChange={(value) => setFormData({ ...formData, maxParticipants: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="인원 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}명
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fee">1인당 참가비 *</Label>
                    <Select value={formData.participantFee} onValueChange={(value) => setFormData({ ...formData, participantFee: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="참가비 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500">500원</SelectItem>
                        <SelectItem value="1000">1,000원</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>시작 날짜 *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.startDate ? format(formData.startDate, "PPP", { locale: ko }) : "날짜 선택"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.startDate}
                          onSelect={(date) => setFormData({ ...formData, startDate: date, endDate: undefined })}
                          disabled={(date) => date < new Date().setHours(0, 0, 0, 0)}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>종료 날짜 *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.endDate ? format(formData.endDate, "PPP", { locale: ko }) : "날짜 선택"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.endDate}
                          onSelect={(date) => setFormData({ ...formData, endDate: date })}
                          disabled={(date) => {
                            if (!formData.startDate) return true;
                            const maxDate = getMaxEndDate();
                            return date <= formData.startDate || (maxDate && date > maxDate);
                          }}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    {formData.startDate && (
                      <p className="text-xs text-muted-foreground">
                        최대 {format(getMaxEndDate()!, "PPP", { locale: ko })}까지 가능
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verification">인증 조건 *</Label>
                  <Select value={formData.verificationFrequency} onValueChange={(value) => setFormData({ ...formData, verificationFrequency: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="인증 주기 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => (
                        <SelectItem key={day} value={day.toString()}>
                          {day === 1 ? '매일' : `${day}일마다`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg mt-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                      <strong>인증 방식:</strong> 메타데이터(사진이 촬영된 실제 시간)가 포함된 사진을 추가해야 합니다.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>주최자</Label>
                  <Input value="김철수 (현재 로그인 사용자)" disabled />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => navigate('/')}>
                    취소
                  </Button>
                  <Button type="submit" className="flex-1">
                    생성하기
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
