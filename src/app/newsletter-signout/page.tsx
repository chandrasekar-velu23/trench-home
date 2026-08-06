import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsubscribe from Trench Digest",
  description: "Unsubscribe from the Trench Security newsletter.",
};

export default function SignoutPage() {
  return (
    <main className="h-screen w-full bg-[#f8fafc] flex flex-col pt-[140px] pb-8 overflow-hidden">
      <div className="max-w-3xl mx-auto w-full flex-1 overflow-y-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <iframe
          width="100%"
          height="800"
          src="https://752fd23d.sibforms.com/v2/serve/MUIFAKd8z70xGK5NmtSUVA6i0uNfcKXrg8LGITaqe4tyt_za6-mgxJn1CqDy25CvWGI-2S_IjCTwEp77PWTPA9WxbeA9iNwT2-zTot3bB8xzvfgdgKrt2PGkeGeIQbxFoT2naY3bMTXdAnaXA4GmjH4E9ErbJ7A3Z2nMFWP_KNn-xAAe6u1WmXk3WoomSuGTMZ9pjdNo7OpHiYcOWA=="
          frameBorder="0"
          scrolling="auto"
          allowFullScreen
          style={{ display: "block", margin: "120px auto", maxWidth: "100%", backgroundColor: "transparent" }}
        ></iframe>
      </div>
    </main>
  );
}
