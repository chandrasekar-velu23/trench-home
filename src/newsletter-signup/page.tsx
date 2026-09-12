export default function DigestPage() {
  return (
    // No card, no panel: the Brevo iframe sits straight on the cream page so the
    // form frame reads as part of the background. The iframe is transparent and
    // the page scrolls normally rather than nesting a second scroll area.
    <main className="min-h-screen w-full bg-[#EDE7D9] pt-[140px] pb-20">
      {/* The form is a Brevo iframe, so crawlers and screen readers need the page's heading here. */}
      <h1 className="sr-only">Subscribe to Trench Digest</h1>
      <p className="sr-only">
        Get weekly zero-day breakdowns, cloud defense blueprints, and actionable security insights—straight from the digital trenches.
      </p>
      <div className="mx-auto w-full max-w-2xl px-5">
        <iframe
          title="Subscribe to the Trench Digest newsletter"
          width="100%"
          height="520"
          src="https://752fd23d.sibforms.com/v2/serve/MUIFAIR-imKeHwoy4wEPS3EQhm5xzqSeIShteaATv-zdhnDzif0dhG-8zS-K2MOjaLAv1vkobILuxIBMUqKVX_woxWdAfiwsbSYby82vTfux-Fh2dk5Q_SiBfOGGRwPm1x5qtYpuEhdpNMAoW-DwI8KcGhuTMwFqVva8fDLy380KyqmxuHwjb8ZR15noWEOT4JK0wkPZwfi-nJOWjQ=="
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
