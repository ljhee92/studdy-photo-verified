
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PointProvider } from "./contexts/PointContext";
import { Home } from "./pages/Home";
import { CreateStudy } from "./pages/CreateStudy";
import { StudyDetail } from "./pages/StudyDetail";
import { StudyManagement } from "./pages/StudyManagement";
import { MyStudies } from "./pages/MyStudies";
import { MyStudyDetail } from "./pages/MyStudyDetail";
import { Shop } from "./pages/Shop";
import { Profile } from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PointProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateStudy />} />
            <Route path="/study/:studyId" element={<StudyDetail />} />
            <Route path="/manage/:studyId" element={<StudyManagement />} />
            <Route path="/my-studies" element={<MyStudies />} />
            <Route path="/my-study/:studyId" element={<MyStudyDetail />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PointProvider>
  </QueryClientProvider>
);

export default App;
