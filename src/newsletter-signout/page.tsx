export default function SignoutPage() {
  return (
    // Matches /newsletter-signup: no card behind the Brevo iframe, so the form
    // frame merges with the cream page background.
    <main className="min-h-screen w-full bg-[#EDE7D9] pt-[140px] pb-20">
      {/* The form is a Brevo iframe, so crawlers and screen readers need the page's heading here. */}
      <h1 className="sr-only">Unsubscribe from Trench Digest</h1>
      <div className="mx-auto w-full max-w-2xl px-5">
        <iframe
          title="Unsubscribe from the Trench Digest newsletter"
          width="100%"
          height="520"
          src="https://752fd23d.sibforms.com/v2/serve/MUIFAKd8z70xGK5NmtSUVA6i0uNfcKXrg8LGITaqe4tyt_za6-mgxJn1CqDy25CvWGI-2S_IjCTwEp77PWTPA9WxbeA9iNwT2-zTot3bB8xzvfgdgKrt2PGkeGeIQbxFoT2naY3bMTXdAnaXA4GmjH4E9ErbJ7A3Z2nMFWP_KNn-xAAe6u1WmXk3WoomSuGTMZ9pjdNo7OpHiYcOWA=="
          frameBorder="0"
          scrolling="auto"
          allowFullScreen
          style={{
            display: "block",
            width: "100%",
            maxWidth: "100%",
            border: 0,
            backgroundColor: "transparent",
            colorScheme: "light",
          }}
        ></iframe>
      </div>
    </main>
  );
}
