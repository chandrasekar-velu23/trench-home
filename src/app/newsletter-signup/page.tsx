import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe to Trench Digest",
  description: "Get weekly zero-day breakdowns, cloud defense blueprints, and actionable security insights—straight from the digital trenches.",
};

export default function DigestPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#f8fafc] flex flex-col pt-[180px] pb-8">
      <div className="max-w-3xl mx-auto w-full flex-1 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
        <iframe
          width="100%"
          height="850"
          src="https://752fd23d.sibforms.com/v2/serve/MUIFAP0ZzfwyqXbs8gGzizNkcY7TCcW7nGIh-NQzScXep4NGXvG5zJurbxTh9Mv6WDBy-cVSKP0xw-076bdlDKb4g0EMgU_xW8FUxDdjSAoa83lufUTZAZKzLPvVm4xkTsN7JQe56WDf0EfqJgocwKAwwXS0-EfFhUAf9gKZLTuS827dwLpO4DrW4zun5PdSfa5OHTCdkxj9wuPtsg=="
          frameBorder="0"
          scrolling="auto"
          allowFullScreen
          style={{ display: "block", margin: "120px auto", width: "100%", backgroundColor: "transparent" }}
        ></iframe>
      </div>
    </main>
  );
}
