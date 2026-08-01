"use client";

import Script from "next/script";

export default function NewsletterForm() {
  return (
    <div id="mc_embed_shell" style={{ background: "#ffffff", padding: "40px", borderRadius: "16px", border: "1px solid #eaeaea", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css" />
      <style dangerouslySetInnerHTML={{
        __html: `
        #mc_embed_signup{background:transparent; clear:left; font:14px Helvetica,Arial,sans-serif; width: 100%;}
        #mc_embed_signup h2 { color: #111827; }
        #mc_embed_signup .mc-field-group label { color: #374151; font-weight: 500; }
        #mc_embed_signup .mc-field-group input { background: #fff; color: #111827; border: 1px solid #d1d5db; }
        #mc_embed_signup .asterisk { color: #ef4444; }
        #mc_embed_signup .indicates-required { color: #6b7280; }
        #mc_embed_signup .button { background-color: #0D41E1; color: #fff; }
        #mc_embed_signup .button:hover { background-color: #0b36c2; }
        `
      }} />
      <div id="mc_embed_signup">
        <form 
          action="https://trenchsecurity.us1.list-manage.com/subscribe/post?u=e293fdae0e4a09d187dabd8c1&amp;id=692ac1a3f3&amp;f_id=003177e1f0" 
          method="post" 
          id="mc-embedded-subscribe-form" 
          name="mc-embedded-subscribe-form" 
          className="validate" 
          target="_blank"
        >
          <div id="mc_embed_signup_scroll">
            <h2>Subscribe</h2>
            <div className="indicates-required"><span className="asterisk">*</span> indicates required</div>
            
            <div className="mc-field-group">
              <label htmlFor="mce-FNAME">First Name <span className="asterisk">*</span></label>
              <input type="text" name="FNAME" className="required text" id="mce-FNAME" required defaultValue="" />
            </div>
            
            <div className="mc-field-group">
              <label htmlFor="mce-LNAME">Last Name </label>
              <input type="text" name="LNAME" className="text" id="mce-LNAME" defaultValue="" />
            </div>
            
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL">Email Address <span className="asterisk">*</span></label>
              <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required defaultValue="" />
            </div>
            
            <div className="mc-field-group">
              <label htmlFor="mce-PHONE">Phone Number <span className="asterisk">*</span></label>
              <input type="text" name="PHONE" className="REQ_CSS" id="mce-PHONE" defaultValue="" />
            </div>
            
            <div className="mc-field-group">
              <label htmlFor="mce-COMPANY">Company <span className="asterisk">*</span></label>
              <input type="text" name="COMPANY" className="required text" id="mce-COMPANY" required defaultValue="" />
            </div>
            
            <div className="mc-field-group">
              <label htmlFor="mce-MMERGE7">Designation </label>
              <input type="text" name="MMERGE7" className="text" id="mce-MMERGE7" defaultValue="" />
            </div>
            
            <div className="mc-field-group">
              <label htmlFor="mce-MMERGE8">LinkedIn Profile </label>
              <input type="text" name="MMERGE8" className="text" id="mce-MMERGE8" defaultValue="" />
            </div>
            
            <div id="mce-responses" className="clear foot">
              <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
              <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
            </div>
            
            <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
              <input type="text" name="b_e293fdae0e4a09d187dabd8c1_692ac1a3f3" tabIndex={-1} defaultValue="" />
            </div>
            
            <div className="optionalParent">
              <div className="clear foot">
                <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button" value="Subscribe" />
                <p style={{ margin: "0px auto" }}>
                  <a href="http://eepurl.com/KucTsuKU17" title="Mailchimp - email marketing made easy and fun">
                    <span style={{ display: "inline-block", backgroundColor: "transparent", borderRadius: "4px" }}>
                      <img className="refferal_badge" src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg" alt="Intuit Mailchimp" style={{ width: "220px", height: "40px", display: "flex", padding: "2px 0px", justifyContent: "center", alignItems: "center" }} />
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Script src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js" strategy="lazyOnload" />
      <Script id="mc-validate-inline" strategy="lazyOnload">
        {`
        (function($) {
          window.fnames = new Array(); window.ftypes = new Array();
          fnames[1]='FNAME';ftypes[1]='text';
          fnames[2]='LNAME';ftypes[2]='text';
          fnames[0]='EMAIL';ftypes[0]='email';
          fnames[4]='PHONE';ftypes[4]='phone';
          fnames[6]='COMPANY';ftypes[6]='text';
          fnames[7]='MMERGE7';ftypes[7]='text';
          fnames[8]='MMERGE8';ftypes[8]='text';
          fnames[3]='ADDRESS';ftypes[3]='address';
          fnames[5]='BIRTHDAY';ftypes[5]='birthday';
        }(jQuery));
        var $mcj = jQuery.noConflict(true);
        // SMS Phone Multi-Country Functionality
        if(!window.MC) {
          window.MC = {};
        }
        window.MC.smsPhoneData = {
          defaultCountryCode: 'IN',
          programs: [],
          smsProgramDataCountryNames: []
        };

        function getCountryUnicodeFlag(countryCode) {
           return countryCode.toUpperCase().replace(/./g, function(char) { return String.fromCodePoint(char.charCodeAt(0) + 127397); });
        };

        // HTML sanitization function to prevent XSS
        function sanitizeHtml(str) {
          if (typeof str !== 'string') return '';
          return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\\//g, '&#x2F;');
        }

        // URL sanitization function to prevent javascript: and data: URLs
        function sanitizeUrl(url) {
          if (typeof url !== 'string') return '';
          const trimmedUrl = url.trim().toLowerCase();
          if (trimmedUrl.startsWith('javascript:') || trimmedUrl.startsWith('data:') || trimmedUrl.startsWith('vbscript:')) {
            return '#';
          }
          return url;
        }

        const getBrowserLanguage = function() {
          if (!window.navigator.language.split('-')[1]) {
            return window.navigator.language.toUpperCase();
          }
          return window.navigator.language.split('-')[1];
        };

        
        function getDefaultCountryProgram(defaultCountryCode, smsProgramData) {
          if (!smsProgramData || smsProgramData.length === 0) {
            return null;
          }

          const browserLanguage = getBrowserLanguage();

          if (browserLanguage) {
            const foundProgram = smsProgramData.find(
              function(program) { return program && program.countryCode === browserLanguage; }
            );
            if (foundProgram) {
              return foundProgram;
            }
          }

          if (defaultCountryCode) {
            const foundProgram = smsProgramData.find(
              function(program) { return program && program.countryCode === defaultCountryCode; }
            );
            if (foundProgram) {
              return foundProgram;
            }
          }

          return smsProgramData[0];
        }

        function updateSmsLegalText(countryCode, fieldName) {
          if (!countryCode || !fieldName) {
            return;
          }
          
          const programs = window.MC && window.MC.smsPhoneData && window.MC.smsPhoneData.programs;
          if (!programs || !Array.isArray(programs)) {
            return;
          }
          
          const program = programs.find(function(program) { return program && program.countryCode === countryCode; });
          if (!program || !program.requiredTemplate) {
            return;
          }
        
          
          var smsConsentHtmlRenderingFixEnabled = true;
          
          const legalTextElement = document.querySelector('#legal-text-' + fieldName);
          if (!legalTextElement) {
            return;
          }
          
          const divRegex = new RegExp('</?[div][^>]*>', 'gi');
          const blockWrapperRegex = new RegExp('</?(?:div|p)[^>]*>', 'gi');
          const fullAnchorRegex = new RegExp('<a.*?</a>', 'g');
          const anchorRegex = new RegExp('<a href="(.*?)" target="(.*?)">(.*?)</a>');
          
          const template = smsConsentHtmlRenderingFixEnabled
            ? program.requiredTemplate
                .replace(/<\\/p>\\s*<p[^>]*>/gi, ' ')
                .replace(blockWrapperRegex, '')
            : program.requiredTemplate.replace(divRegex, '');
          
          

          legalTextElement.textContent = '';
          const parts = template.split(/(<a href=".*?" target=".*?">.*?<\\/a>)/g);
          parts.forEach(function(part) {
            if (!part) {
              return;
            }
            const anchorMatch = part.match(/<a href="(.*?)" target="(.*?)">(.*?)<\\/a>/);
            if (anchorMatch) {
              const linkElement = document.createElement('a');
              linkElement.href = sanitizeUrl(anchorMatch[1]);
              linkElement.target = sanitizeHtml(anchorMatch[2]);
              linkElement.textContent = sanitizeHtml(anchorMatch[3]);
              legalTextElement.appendChild(linkElement);
            } else {
              legalTextElement.appendChild(document.createTextNode(part));
            }
          });
              
        }

        function generateDropdownOptions(smsProgramData) {
          if (!smsProgramData || smsProgramData.length === 0) {
            return '';
          }

          var programs = false
            ? smsProgramData.filter(function(p, i, arr) {
                return arr.findIndex(function(q) { return q.countryCode === p.countryCode; }) === i;
              })
            : smsProgramData;
          
          return programs.map(function(program) {
            const flag = getCountryUnicodeFlag(program.countryCode);
            const countryName = getCountryName(program.countryCode);
            const callingCode = program.countryCallingCode || '';
            // Sanitize all values to prevent XSS
            const sanitizedCountryCode = sanitizeHtml(program.countryCode || '');
            const sanitizedCountryName = sanitizeHtml(countryName || '');
            const sanitizedCallingCode = sanitizeHtml(callingCode || '');
            return '<option value="' + sanitizedCountryCode + '">' + sanitizedCountryName + ' ' + sanitizedCallingCode + '</option>';
          }).join('');
        }

        function getCountryName(countryCode) {
          if (window.MC && window.MC.smsPhoneData && window.MC.smsPhoneData.smsProgramDataCountryNames && Array.isArray(window.MC.smsPhoneData.smsProgramDataCountryNames)) {
            for (let i = 0; i < window.MC.smsPhoneData.smsProgramDataCountryNames.length; i++) {
              if (window.MC.smsPhoneData.smsProgramDataCountryNames[i].code === countryCode) {
                return window.MC.smsPhoneData.smsProgramDataCountryNames[i].name;
              }
            }
          }
          return countryCode;
        }

        function getDefaultPlaceholder(countryCode) {
          if (!countryCode || typeof countryCode !== 'string') {
            return '+1 000 000 0000'; // Default US placeholder
          }
          
          var mockPlaceholders = [
            { countryCode: 'US', placeholder: '+1 000 000 0000', helpText: 'Include the US country code +1 before the phone number' }
          ];

          const selectedPlaceholder = mockPlaceholders.find(function(item) {
            return item && item.countryCode === countryCode;
          });
          
          return selectedPlaceholder ? selectedPlaceholder.placeholder : mockPlaceholders[0].placeholder;
        }

        function updatePlaceholder(countryCode, fieldName) {
          if (!countryCode || !fieldName) {
            return;
          }
          
          const phoneInput = document.querySelector('#mce-' + fieldName);
          if (!phoneInput) {
            return;
          }
          
          const placeholder = getDefaultPlaceholder(countryCode);
          if (placeholder) {
            phoneInput.placeholder = placeholder;
          }
        }

        function updateCountryCodeInstruction(countryCode, fieldName) {
          updatePlaceholder(countryCode, fieldName);
          
        }

        function getDefaultHelpText(countryCode) {
          var mockPlaceholders = [
            { countryCode: 'US', placeholder: '+1 000 000 0000', helpText: 'Include the US country code +1 before the phone number' }
          ];
          
          if (!countryCode || typeof countryCode !== 'string') {
            return mockPlaceholders[0].helpText;
          }
          
          const selectedHelpText = mockPlaceholders.find(function(item) {
              return item && item.countryCode === countryCode;
            });
            
            return selectedHelpText ? selectedHelpText.helpText : mockPlaceholders[0].helpText;
        }

        function setDefaultHelpText(countryCode) {
          const helpTextSpan = document.querySelector('#help-text');
          if (!helpTextSpan) {
            return;
          }
        }

        function updateHelpTextCountryCode(countryCode, fieldName) {
          if (!countryCode || !fieldName) {
            return;
          }
          
          setDefaultHelpText(countryCode);
        }

        function initializeSmsPhoneDropdown(fieldName) {
          if (!fieldName || typeof fieldName !== 'string') {
            return;
          }
          
          const dropdown = document.querySelector('#country-select-' + fieldName);
          const displayFlag = document.querySelector('#flag-display-' + fieldName);
          
          if (!dropdown || !displayFlag) {
            return;
          }

          const smsPhoneData = window.MC && window.MC.smsPhoneData;
          if (smsPhoneData && smsPhoneData.programs && Array.isArray(smsPhoneData.programs)) {
            dropdown.innerHTML = generateDropdownOptions(smsPhoneData.programs);
          }

          const defaultProgram = getDefaultCountryProgram(smsPhoneData && smsPhoneData.defaultCountryCode, smsPhoneData && smsPhoneData.programs);
          if (defaultProgram && defaultProgram.countryCode) {
            dropdown.value = defaultProgram.countryCode;
            
            const flagSpan = displayFlag && displayFlag.querySelector('#flag-emoji-' + fieldName);
            if (flagSpan) {
              flagSpan.textContent = getCountryUnicodeFlag(defaultProgram.countryCode);
              flagSpan.setAttribute('aria-label', sanitizeHtml(defaultProgram.countryCode) + ' flag');
            }
            
            updateSmsLegalText(defaultProgram.countryCode, fieldName);
            updatePlaceholder(defaultProgram.countryCode, fieldName);
            updateCountryCodeInstruction(defaultProgram.countryCode, fieldName);
          }
         
          var smsNotRequiredRemoveCountryCodeEnabled = true;
          var smsField = Object.values({"FNAME":{"name":"FNAME","label":"First Name","helper_text":"","type":"text","required":true,"audience_field_name":"First Name","merge_id":1,"help_text_enabled":false,"enabled":true,"order":0,"field_type":"merge"},"LNAME":{"name":"LNAME","label":"Last Name","helper_text":"","type":"text","required":false,"audience_field_name":"Last Name","merge_id":2,"help_text_enabled":false,"enabled":true,"order":1,"field_type":"merge"},"EMAIL":{"name":"EMAIL","label":"Email Address","helper_text":"","type":"email","required":true,"audience_field_name":"Email Address","merge_id":0,"help_text_enabled":false,"enabled":true,"order":2,"field_type":"merge"}}).find(function(f) { return f && f.name === fieldName && f.type === 'smsphone'; });
          var isRequired = smsField ? smsField.required : false;
          var shouldAppendCountryCode = smsNotRequiredRemoveCountryCodeEnabled ? isRequired : true;
          
          var phoneInput = document.querySelector('#mce-' + fieldName);
          if (phoneInput && defaultProgram && defaultProgram.countryCallingCode && shouldAppendCountryCode) {
            phoneInput.value = defaultProgram.countryCallingCode;
          }
          
          displayFlag && displayFlag.addEventListener('click', function(e) {
            dropdown.focus();
          });

          dropdown && dropdown.addEventListener('change', function() {
            const selectedCountry = this.value;
            
            if (!selectedCountry || typeof selectedCountry !== 'string') {
              return;
            }
            
            const flagSpan = displayFlag && displayFlag.querySelector('#flag-emoji-' + fieldName);
            if (flagSpan) {
              flagSpan.textContent = getCountryUnicodeFlag(selectedCountry);
              flagSpan.setAttribute('aria-label', sanitizeHtml(selectedCountry) + ' flag');
            }
             
            const selectedProgram = window.MC && window.MC.smsPhoneData && window.MC.smsPhoneData.programs && window.MC.smsPhoneData.programs.find(function(program) {
              return program && program.countryCode === selectedCountry;
            });

            var smsNotRequiredRemoveCountryCodeEnabled = true;
            var smsField = Object.values({"FNAME":{"name":"FNAME","label":"First Name","helper_text":"","type":"text","required":true,"audience_field_name":"First Name","merge_id":1,"help_text_enabled":false,"enabled":true,"order":0,"field_type":"merge"},"LNAME":{"name":"LNAME","label":"Last Name","helper_text":"","type":"text","required":false,"audience_field_name":"Last Name","merge_id":2,"help_text_enabled":false,"enabled":true,"order":1,"field_type":"merge"},"EMAIL":{"name":"EMAIL","label":"Email Address","helper_text":"","type":"email","required":true,"audience_field_name":"Email Address","merge_id":0,"help_text_enabled":false,"enabled":true,"order":2,"field_type":"merge"}}).find(function(f) { return f && f.name === fieldName && f.type === 'smsphone'; });
            var isRequired = smsField ? smsField.required : false;
            var shouldAppendCountryCode = smsNotRequiredRemoveCountryCodeEnabled ? isRequired : true;
            
            var phoneInput = document.querySelector('#mce-' + fieldName);
            if (phoneInput && selectedProgram && selectedProgram.countryCallingCode && shouldAppendCountryCode) {
              phoneInput.value = selectedProgram.countryCallingCode;
            }
            
            updateSmsLegalText(selectedCountry, fieldName);
            updatePlaceholder(selectedCountry, fieldName);
            updateCountryCodeInstruction(selectedCountry, fieldName);
          });
        }

        document.addEventListener('DOMContentLoaded', function() {
          const smsPhoneFields = document.querySelectorAll('[id^="country-select-"]');
          
          smsPhoneFields.forEach(function(dropdown) {
            const fieldName = dropdown && dropdown.id.replace('country-select-', '');
            initializeSmsPhoneDropdown(fieldName);
          });
        });
        `}
      </Script>
    </div>
  );
}
