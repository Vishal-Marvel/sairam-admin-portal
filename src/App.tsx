import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/404";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { Providers } from "@/providers/Provider";
import Login from "@/pages/login";
import ReportPage from "@/pages/report";
import AnalysisPage from "./pages/analysis";
function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Providers>
    </BrowserRouter>
  );
}

export default App;
