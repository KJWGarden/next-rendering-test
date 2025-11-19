import Navbar from "./component/navbar";
import RenderingMetricsChart from "./component/renderingChart";
export default function Home() {
  return (
    <main className="w-full h-full">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <RenderingMetricsChart />
      </div>
    </main>
  );
}
