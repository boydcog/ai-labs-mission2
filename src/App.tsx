/**
 * 메인 앱 컴포넌트
 * React Router를 사용한 라우팅 설정
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TrainingResultPage from './pages/TrainingResultPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/training-result" element={<TrainingResultPage />} />
        {/* 추가 페이지는 여기에 Route로 추가 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
