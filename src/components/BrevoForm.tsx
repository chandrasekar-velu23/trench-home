"use client";

import Script from "next/script";

export default function BrevoForm() {
  return (
    <div className="w-full sib-form bg-[#0a0a0a]/50 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Abstract glow inside the card */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#0D41E1] opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

      <style dangerouslySetInnerHTML={{
        __html: `
        :where(.sib-form-message-panel) {
          display: none;
        }
        :where(.sib-form-message-panel .sib-notification__icon) {
          width: 20px;
          height: 20px;
        }
        /* Override dynamically injected Brevo CSS that ruins the theme */
        #sib-container, .sib-form-container, .sib-form, .sib-form-block {
          background-color: transparent !important;
          border: none !important;
          padding: 0 !important;
          box-shadow: none !important;
          margin: 0 !important;
          text-align: left !important;
        }
        .entry__label {
          font-family: inherit !important;
          font-size: 0.875rem !important;
          font-weight: 500 !important;
          color: #d1d5db !important;
        }
        .sib-form-message-panel {
          padding: 1rem;
          border-radius: 0.75rem;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        }
        .sib-form-message-panel--active {
          display: block !important;
        }
        input, select {
          font-family: inherit !important;
          color: white !important;
        }
        input::placeholder {
          color: #6b7280 !important;
        }
        .sib-sms-tooltip {
          display: none !important;
        }
        `
      }} />

      <div id="sib-form-container" className="sib-form-container w-full relative z-10">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-bricolage)' }}>Subscribe to Newsletter</h3>
          <p className="text-gray-400 text-sm">Subscribe to our newsletter and stay updated with the latest from the trenches.</p>
        </div>
        {/* Error Message */}
        <div id="error-message" className="sib-form-message-panel bg-red-900/20 border border-red-500/50 text-red-200">
          <div className="sib-form-message-panel__text sib-form-message-panel__text--center flex items-center gap-3">
            <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon fill-current shrink-0">
              <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
            </svg>
            <span className="sib-form-message-panel__inner-text">
              Your subscription could not be saved. Please try again.
            </span>
          </div>
        </div>

        {/* Success Message */}
        <div id="success-message" className="sib-form-message-panel bg-emerald-900/20 border border-emerald-500/50 text-emerald-200">
          <div className="sib-form-message-panel__text sib-form-message-panel__text--center flex items-center gap-3">
            <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon fill-current shrink-0">
              <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
            </svg>
            <span className="sib-form-message-panel__inner-text">
              Your subscription has been successful.
            </span>
          </div>
        </div>

        <div id="sib-container" className="sib-container--large sib-container--vertical w-full">
          <form 
            id="sib-form" 
            method="POST" 
            action="https://752fd23d.sibforms.com/v2/serve/MUIFAP0ZzfwyqXbs8gGzizNkcY7TCcW7nGIh-NQzScXep4NGXvG5zJurbxTh9Mv6WDBy-cVSKP0xw-076bdlDKb4g0EMgU_xW8FUxDdjSAoa83lufUTZAZKzLPvVm4xkTsN7JQe56WDf0EfqJgocwKAwwXS0-EfFhUAf9gKZLTuS827dwLpO4DrW4zun5PdSfa5OHTCdkxj9wuPtsg==" 
            data-type="subscription"
            className="space-y-5"
          >

            {/* Row 1: First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="sib-input sib-form-block w-full">
                <div className="form__entry entry_block">
                  <div className="form__label-row mb-1.5">
                    <label className="entry__label text-sm font-medium text-gray-300" htmlFor="FIRSTNAME" data-required="*">First Name <span className="text-red-500">*</span></label>
                  </div>
                  <div className="entry__field">
                    <input className="input w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#0D41E1] focus:ring-1 focus:ring-[#0D41E1] transition-all" maxLength={200} type="text" id="FIRSTNAME" name="FIRSTNAME" autoComplete="off" placeholder="John" data-required="true" required />
                  </div>
                  <label className="entry__error entry__error--primary text-xs text-red-400 mt-1 hidden"></label>
                </div>
              </div>

              <div className="sib-input sib-form-block w-full">
                <div className="form__entry entry_block">
                  <div className="form__label-row mb-1.5">
                    <label className="entry__label text-sm font-medium text-gray-300" htmlFor="LASTNAME">Last Name</label>
                  </div>
                  <div className="entry__field">
                    <input className="input w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#0D41E1] focus:ring-1 focus:ring-[#0D41E1] transition-all" maxLength={200} type="text" id="LASTNAME" name="LASTNAME" autoComplete="off" placeholder="Doe" />
                  </div>
                  <label className="entry__error entry__error--primary text-xs text-red-400 mt-1 hidden"></label>
                </div>
              </div>
            </div>

            {/* Row 2: Email */}
            <div className="sib-input sib-form-block w-full">
              <div className="form__entry entry_block">
                <div className="form__label-row mb-1.5">
                  <label className="entry__label text-sm font-medium text-gray-300" htmlFor="EMAIL" data-required="*">Email Address <span className="text-red-500">*</span></label>
                </div>
                <div className="entry__field">
                  <input className="input w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#0D41E1] focus:ring-1 focus:ring-[#0D41E1] transition-all" type="email" id="EMAIL" name="EMAIL" autoComplete="email" placeholder="john@company.com" data-required="true" required />
                </div>
                <label className="entry__error entry__error--primary text-xs text-red-400 mt-1 hidden"></label>
              </div>
            </div>

            {/* Row 3: Phone */}
            <div className="sib-sms-field sib-form-block w-full">
              <div className="form__entry entry_block">
                <div className="form__label-row mb-1.5">
                  <label className="entry__label text-sm font-medium text-gray-300" htmlFor="SMS" data-required="*">Phone Number <span className="text-red-500">*</span></label>
                </div>
                <div className="sib-sms-input-wrapper flex gap-2">
                  <div className="sib-sms-input flex w-full gap-2" data-placeholder="SMS" data-required="true" data-country-code="US" data-value="" data-attributename="SMS">
                    <div className="entry__field w-[120px] shrink-0">
                      <select className="input w-full bg-black/50 border border-white/10 rounded-xl px-3 py-3 text-white appearance-none focus:outline-none focus:border-[#0D41E1] focus:ring-1 focus:ring-[#0D41E1] transition-all" name="SMS__COUNTRY_CODE" data-required="true">
                        <option value="+1" className="bg-gray-800">+1 US</option>
                        <option value="+44" className="bg-gray-800">+44 GB</option>
                        <option value="+61" className="bg-gray-800">+61 AU</option>
                        <option value="+91" className="bg-gray-800">+91 IN</option>
                        <option value="+49" className="bg-gray-800">+49 DE</option>
                        <option value="+33" className="bg-gray-800">+33 FR</option>
                        {/* Other popular ones */}
                        <option value="+81" className="bg-gray-800">+81 JP</option>
                        <option value="+86" className="bg-gray-800">+86 CN</option>
                        <option value="+55" className="bg-gray-800">+55 BR</option>
                      </select>
                    </div>
                    <div className="entry__field w-full">
                      <input type="tel" className="input w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#0D41E1] focus:ring-1 focus:ring-[#0D41E1] transition-all" id="SMS" name="SMS" autoComplete="tel" placeholder="202 555 0123" data-required="true" required />
                    </div>
                  </div>
                </div>
                <label className="entry__error entry__error--primary text-xs text-red-400 mt-1 hidden"></label>
                <label className="entry__error entry__error--secondary text-xs text-red-400 mt-1 hidden"></label>
              </div>
            </div>

            {/* Row 4: Company & Designation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="sib-input sib-form-block w-full">
                <div className="form__entry entry_block">
                  <div className="form__label-row mb-1.5">
                    <label className="entry__label text-sm font-medium text-gray-300" htmlFor="name" data-required="*">Company Name <span className="text-red-500">*</span></label>
                  </div>
                  <div className="entry__field">
                    <input className="input w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#0D41E1] focus:ring-1 focus:ring-[#0D41E1] transition-all" maxLength={200} type="text" id="name" name="COMPANY:name" autoComplete="organization" placeholder="Acme Corp" data-required="true" required />
                  </div>
                  <label className="entry__error entry__error--primary text-xs text-red-400 mt-1 hidden"></label>
                </div>
              </div>

              <div className="sib-input sib-form-block w-full">
                <div className="form__entry entry_block">
                  <div className="form__label-row mb-1.5">
                    <label className="entry__label text-sm font-medium text-gray-300" htmlFor="JOB_TITLE" data-required="*">Designation <span className="text-red-500">*</span></label>
                  </div>
                  <div className="entry__field">
                    <input className="input w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#0D41E1] focus:ring-1 focus:ring-[#0D41E1] transition-all" maxLength={200} type="text" id="JOB_TITLE" name="JOB_TITLE" autoComplete="off" placeholder="Security Engineer" data-required="true" required />
                  </div>
                  <label className="entry__error entry__error--primary text-xs text-red-400 mt-1 hidden"></label>
                </div>
              </div>
            </div>

            {/* Row 5: LinkedIn */}
            <div className="sib-input sib-form-block w-full">
              <div className="form__entry entry_block">
                <div className="form__label-row mb-1.5">
                  <label className="entry__label text-sm font-medium text-gray-300" htmlFor="LINKEDIN">LinkedIn Profile</label>
                </div>
                <div className="entry__field">
                  <input className="input w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#0D41E1] focus:ring-1 focus:ring-[#0D41E1] transition-all" maxLength={200} type="text" id="LINKEDIN" name="LINKEDIN" autoComplete="url" placeholder="linkedin.com/in/username" />
                </div>
                <label className="entry__error entry__error--primary text-xs text-red-400 mt-1 hidden"></label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button className="sib-form-block__button sib-form-block__button-with-loader w-full bg-[#0D41E1] hover:bg-[#0b36c2] text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 group" form="sib-form" type="submit">
                <svg className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon hidden w-5 h-5 animate-spin" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                </svg>
                <span className="sib-form-block__button-text">SUBSCRIBE TO TRENCH DIGEST</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>

            {/* Hidden Fields required by Brevo */}
            <input type="text" name="email_address_check" defaultValue="" className="input--hidden hidden" />
            <input type="hidden" name="locale" defaultValue="en" />
          </form>
        </div>
      </div>

      <Script id="brevo-config" strategy="lazyOnload">
        {`
          window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
          window.LOCALE = 'en';
          window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "The information provided is invalid. Please review the field format and try again.";
          window.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank.";
          window.GENERIC_INVALID_MESSAGE = "The information provided is invalid. Please review the field format and try again.";
          window.INVALID_NUMBER = "The information provided is invalid. Please review the field format and try again.";
          window.INVALID_DATE = "Please enter a valid date";
          window.REQUIRED_MULTISELECT_MESSAGE = 'Please select at least 1 option';
          window.translation = {
            common: {
              selectedList: '{quantity} list selected',
              selectedLists: '{quantity} lists selected',
              selectedOption: '{quantity} selected',
              selectedOptions: '{quantity} selected',
            }
          };
          window.AUTOHIDE = Boolean(0);
        `}
      </Script>
      <Script src="https://sibforms.com/forms/end-form/build/main.js" strategy="lazyOnload" />
    </div>
  );
}
