
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, XCircle } from "lucide-react";

interface PaymentConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
  title: string;
}

export const PaymentConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  amount, 
  title 
}: PaymentConfirmDialogProps) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleConfirm = () => {
    if (isAgreed) {
      onConfirm();
      setIsAgreed(false);
    }
  };

  const handleClose = () => {
    onClose();
    setIsAgreed(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">참가비 사용 안내</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm text-gray-700">
            <p className="mb-3">
              <strong>{title}</strong>에 대한 참가비 <strong>{amount.toLocaleString()}원</strong>은 아래 기준에 따라 사용됩니다:
            </p>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>인증 조건을 모두 충족하여 스터디를 성공할 경우:</strong>
                  <br />
                  → 참가비는 서비스 내 포인트로 <strong>전액 환급</strong>됩니다.
                </div>
              </div>
              
              <div className="flex gap-2">
                <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>인증 조건 미달 등으로 실패할 경우:</strong>
                  <br />
                  → 참가비는 아래와 같이 사용됩니다.
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• 50%: 서비스 유지 및 기능 개선 등 운영비</li>
                    <li>• 50%: 한국소아암재단 기부</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              ※ 결제 진행 시 위 내용에 <strong>동의한 것으로 간주</strong>되며, 
              상세 내용은 이용약관 및 환불 정책을 확인해주세요.
            </p>
          </div>
          
          <div className="flex items-center space-x-2 pt-2 border-t">
            <Checkbox 
              id="agree"
              checked={isAgreed}
              onCheckedChange={setIsAgreed}
            />
            <label 
              htmlFor="agree" 
              className="text-sm cursor-pointer"
            >
              위 참가비 사용 및 환급 조건에 동의합니다.
            </label>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="flex-1"
            >
              취소
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={!isAgreed}
              className="flex-1"
            >
              결제하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
