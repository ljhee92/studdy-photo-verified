
import { useState } from "react";
import { Header } from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, Coins, Gift, CheckCircle } from "lucide-react";
import { mockGiftCards, mockCurrentUser } from "../data/mockPointData";
import { toast } from "@/hooks/use-toast";

export const Shop = () => {
  const [userPoints, setUserPoints] = useState(mockCurrentUser.points);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGiftCard, setSelectedGiftCard] = useState<any>(null);

  const handlePurchase = (giftCard: any) => {
    if (userPoints < giftCard.price) {
      toast({
        title: "포인트 부족",
        description: "포인트가 부족하여 교환할 수 없습니다.",
        variant: "destructive"
      });
      return;
    }

    setUserPoints(prev => prev - giftCard.price);
    setIsDialogOpen(false);
    
    toast({
      title: "교환 완료",
      description: `${giftCard.name}이(가) 등록된 휴대폰 번호로 전송되었습니다.`,
    });
  };

  const openPurchaseDialog = (giftCard: any) => {
    setSelectedGiftCard(giftCard);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">포인트 상점</h1>
              <p className="text-lg text-muted-foreground">
                스터디 완주로 획득한 포인트로 기프티콘을 교환하세요
              </p>
            </div>
            
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-3 rounded-lg border border-blue-200">
              <Coins className="h-6 w-6 text-blue-600" />
              <div className="text-right">
                <p className="text-sm text-blue-600">보유 포인트</p>
                <p className="text-xl font-bold text-blue-800">
                  {userPoints.toLocaleString()}P
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {mockGiftCards.map((giftCard) => {
              const canAfford = userPoints >= giftCard.price;
              
              return (
                <Card key={giftCard.id} className={`relative ${!canAfford ? 'opacity-60' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {giftCard.brand}
                      </Badge>
                      <div className="flex items-center gap-1 text-orange-600">
                        <Coins className="h-4 w-4" />
                        <span className="font-bold">{giftCard.price.toLocaleString()}P</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{giftCard.name}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <Gift className="h-12 w-12 text-gray-400" />
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {giftCard.description}
                    </p>
                    
                    <Button 
                      onClick={() => openPurchaseDialog(giftCard)}
                      disabled={!canAfford}
                      className="w-full flex items-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {canAfford ? '교환하기' : '포인트 부족'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>기프티콘 교환 확인</DialogTitle>
              </DialogHeader>
              
              {selectedGiftCard && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">{selectedGiftCard.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {selectedGiftCard.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">교환 포인트:</span>
                      <span className="font-bold text-orange-600">
                        {selectedGiftCard.price.toLocaleString()}P
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">
                        기프티콘 전송 정보
                      </span>
                    </div>
                    <p className="text-sm text-blue-700">
                      휴대폰 번호: {mockCurrentUser.phone}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      기프티콘이 문자로 전송됩니다.
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                      className="flex-1"
                    >
                      취소
                    </Button>
                    <Button 
                      onClick={() => handlePurchase(selectedGiftCard)}
                      className="flex-1"
                    >
                      교환하기
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};
