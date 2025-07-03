
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { StudyCard } from "../components/StudyCard";
import { Study } from "../types/study";
import { useNavigate } from "react-router-dom";
import { useStudyStore } from "@/store/studyStore";

export const Home = () => {
  const { studies } = useStudyStore();
  const [filteredStudies, setFilteredStudies] = useState<Study[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredStudies(studies.filter(study => study.status === 'recruiting'));
  }, [studies]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredStudies(studies.filter(study => study.status === 'recruiting'));
      return;
    }

    const filtered = studies.filter(study => 
      study.status === 'recruiting' && 
      (study.title.toLowerCase().includes(query.toLowerCase()) ||
       study.description.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredStudies(filtered);
  };

  const handleViewDetails = (studyId: string) => {
    navigate(`/study/${studyId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
            신뢰할 수 있는 스터디를 찾아보세요
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-8">
            사진 메타데이터 기반 인증으로 책임감 있는 스터디 참여
          </p>
          
          <div className="max-w-full sm:max-w-2xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
            모집 중인 스터디 ({filteredStudies.length}개)
          </h3>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredStudies.map((study) => (
            <StudyCard
              key={study.id}
              study={study}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredStudies.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-base sm:text-lg text-muted-foreground">
              검색 조건에 맞는 스터디가 없습니다.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
              다른 키워드로 검색해보세요.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
