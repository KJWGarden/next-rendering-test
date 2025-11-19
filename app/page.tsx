import Navbar from "./component/navbar";
import RenderingMetricsChart from "./component/renderingChart";
export default function Home() {
  return (
    <main className="w-full h-full">
      <Navbar />
      <RenderingMetricsChart />
    </main>
  );
}
