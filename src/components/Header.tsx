
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Studdy</h1>
          </div>
          
          <nav className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/create')}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              스터디 생성
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/my-studies')}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              내 스터디
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/manage')}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              스터디 관리
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
