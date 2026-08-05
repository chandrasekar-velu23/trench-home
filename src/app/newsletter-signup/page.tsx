import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe to Trench Digest",
  description: "Get weekly zero-day breakdowns, cloud defense blueprints, and actionable security insights—straight from the digital trenches.",
};

export default function DigestPage() {
  return (
    <main className="h-screen w-full bg-[#f8fafc] flex flex-col pt-[140px] pb-8 overflow-hidden">
      <div className="max-w-3xl mx-auto w-full flex-1 overflow-y-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <iframe
          width="100%"
          height="800"
          src="https://752fd23d.sibforms.com/v2/serve/MUIFAIR-imKeHwoy4wEPS3EQhm5xzqSeIShteaATv-zdhnDzif0dhG-8zS-K2MOjaLAv1vkobILuxIBMUqKVX_woxWdAfiwsbSYby82vTfux-Fh2dk5Q_SiBfOGGRwPm1x5qtYpuEhdpNMAoW-DwI8KcGhuTMwFqVva8fDLy380KyqmxuHwjb8ZR15noWEOT4JK0wkPZwfi-nJOWjQ=="
          frameBorder="0"
          scrolling="auto"
          allowFullScreen
          style={{ marginTop: "120px", maxWidth: "100%", backgroundColor: "transparent" }}
        ></iframe>
      </div>
    </main>
  );
}
