import { Button } from "@/components/ui/button";
import { BookOpen, Plus, Settings, User, ShoppingBag, UserCog, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PointDisplay } from "./PointDisplay";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-0">
          <div 
            className="flex items-center gap-1 sm:gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <BookOpen className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600" />
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Studdy</h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <PointDisplay />
            
            <nav className="hidden sm:flex items-center gap-1 sm:gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/create')}
                className="flex items-center gap-2 text-xs sm:text-base px-2 sm:px-4"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                스터디 생성
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/my-studies')}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-base px-2 sm:px-4"
              >
                <User className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">내 스터디</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/manage')}
                className="flex items-center gap-2 text-xs sm:text-base px-2 sm:px-4"
              >
                <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                스터디 관리
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/shop')}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-base px-2 sm:px-4"
              >
                <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">상점</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/profile')}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-base px-2 sm:px-4"
              >
                <UserCog className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">내 정보</span>
              </Button>
            </nav>
            <div className="flex sm:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="p-2" aria-label="메뉴 열기">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="p-0 w-60">
                  <nav className="flex flex-col gap-1 p-4">
                    <Button variant="ghost" className="justify-start gap-3 text-base py-3" onClick={() => navigate('/create')}>
                      <Plus className="h-5 w-5" />
                      스터디 생성
                    </Button>
                    <Button variant="ghost" className="justify-start gap-3 text-base py-3" onClick={() => navigate('/my-studies')}>
                      <User className="h-5 w-5" />
                      내 스터디
                    </Button>
                    <Button variant="ghost" className="justify-start gap-3 text-base py-3" onClick={() => navigate('/manage')}>
                      <Settings className="h-5 w-5" />
                      스터디 관리
                    </Button>
                    <Button variant="ghost" className="justify-start gap-3 text-base py-3" onClick={() => navigate('/shop')}>
                      <ShoppingBag className="h-5 w-5" />
                      상점
                    </Button>
                    <Button variant="ghost" className="justify-start gap-3 text-base py-3" onClick={() => navigate('/profile')}>
                      <UserCog className="h-5 w-5" />
                      내 정보
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
