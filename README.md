# Tiny Smiles

English, responsive maroon-and-black website with the supplied logo converted to PNG, Instagram cover assets, character selection, official social links, and a collaboration inquiry flow. Emaan is the main character. Owner-authorized names Zara and Ayaan identify the children. Emaan's introduction is now the owner-supplied 20-second MP4 at dist/assets/emaan-introduction.mp4, played directly in an HTML video player with controls, inline mobile playback, and no Instagram embed or intro link. Server supports video MIME type and byte ranges for playback and seeking. Public view/follower figures are hidden until live synchronization is available.

Run `node server.mjs` (or `npm start` where npm is available) and visit http://127.0.0.1:4173. No dependency installation required. Static content is in `dist/`; the Node server is needed for Instagram sync.

## Instagram sync — prepared, not yet connected

Browser login is not an API token. Provision an Instagram API with Instagram Login app for the professional account and grant the required basic read permission. Configure these values privately as hosting environment secrets, never in browser JavaScript or source:

- `INSTAGRAM_ACCESS_TOKEN`: valid Instagram user token
- `INSTAGRAM_USER_ID`: the authorized Tiny Smiles professional account ID
- `INSTAGRAM_API_VERSION`: defaults to v25.0; confirm against the Meta app's available version

Server fetches the latest 12 media items every five minutes; the browser also refreshes every five minutes. Images, reels and carousel covers link to their original posts. It keeps the last in-memory successful feed on errors; selected reels remain visible without credentials. No Instagram session cookies are used. Configure token refresh/rotation before production; current implementation does not renew tokens. Live sync cannot be verified until app credentials are connected. Use a persistent Node hosting environment and bind to the host-required interface before deployment.

Official API guidance: https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/ and Meta's official collection https://www.postman.com/meta/instagram/overview

## Contact and collaboration inquiries

Sponsor content includes six video services (character stories, product showcases, styling/routine concepts, short-form ads, collection/offer promotions, and campaign series) plus selectable categories for dresses, cosmetics/skincare, kidswear, bags/shoes, jewellery/accessories, home remedies/self-care, home/lifestyle, and food/drinks/other businesses. Category buttons fill the collaboration form; the prepared email inquiry includes the selected category. Routine copy describes creative concepts, without claiming medical results or personal product testing.

Hero redesign: cinematic muted inline preview of the owner's Emaan MP4, user-controlled play/pause, reduced-motion-aware autoplay, a concise sponsor-facing headline, product-category tags and couple/family previews. Full intro audio remains in its separate native video player.

Latest redesign: interactive Brand Story Studio replaces the presentation-only hero. Eight product categories each offer a tailored concept, opening, product moment and call to action. Sponsors enter their brand name and select Emaan, the couple, family or little stars; the visual and concept update in place. “Let's create this” transfers the selected category, characters, brand name and idea into the inquiry form. Concepts are clearly labelled as previews, not completed client campaigns. Three editorial image panels introduce the fashion, couple and family worlds without fabricated sponsors or metrics.

Business email: tinysmileskidstv@gmail.com. Phone: +92 325 4313433. Email and telephone links appear in the contact section, collaboration area, and footer. The form prepares an inquiry and opens an email draft for the sponsor to review and send, or lets them copy it for Instagram. It does not auto-send messages or pretend to store inquiries. A hosted form backend is still needed for direct website submissions.

WhatsApp is now prominently displayed with the owner's number in the top contact bar, hero, collaboration area, contact section, footer and a floating contact button. Inquiry drafts can open in WhatsApp with the brief prefilled; sending remains the visitor's action. The readability pass raises body copy to approximately 15–17px, form fields to 15–16px, and secondary labels to readable sizes, with stronger contrast and tighter section spacing.

Owner requested removal of the upper preview's play/pause control: the hero video now plays automatically, muted and looping, with no visible controls. The separate full introduction player retains native audio/playback controls.

The couple selection now uses the realistic characters from the latest DeZaZG-jIt4 reel. The complete family selection uses a newly generated AI cast concept, labelled as such, with Emaan, Waseeq and two children. Family image: dist/assets/family.png. Built-in image generation prompt: "Create a realistic vertical portrait preserving the two parents from latest-couple.jpg, with daughter Zara in pink and son Ayaan in cream, in the same warm Pakistani living room; four faces visible, no cartoons, text or logos." Main generation instruction included modest outfits and central framing for website cropping.

At the owner's request, all manually captured view and follower figures have been removed from the public UI. No reach claims are shown without live synchronization. The Instagram area resembles an Instagram profile with a three-column media grid, POSTS/REELS tabs, official profile link and no simulated counters. Selected recent posts appear while the official API is unconnected. Owner confirmed no Meta Developer app exists yet, so automatic uploads are not active. Create/connect the Meta app and configure server secrets before claiming live synchronization.

## Research, 13 October 2026

Account: https://www.instagram.com/tinysmileskidstv/ — 6,961 followers, 95 posts. Profile bio self-reports 11M+ monthly views; this unverified monthly figure is not presented as an analytics-verified statistic.

Featured reels, in descending public rounded view count:

1. https://www.instagram.com/reel/DcbRgtfkYBO/ — 5M, bestie comedy.
2. https://www.instagram.com/reel/DcgZlnDANpL/ — 1.3M, brains or money, animated boy/girl.
3. https://www.instagram.com/reel/Dc1n8OtuP5u/ — 977K, animated couple scene.
4. https://www.instagram.com/reel/DcVwgzujPsI/ — 969K, ghost character scene.

Combined rounded counts: 8.246M; website uses 8.2M+. Repeat plays are not unique viewers. Bestie Duo and Desi Couple are descriptive labels. Instagram thumbnails exported using the browser's asset bundler. Facebook and both YouTube links came from the account bio links.

Validation: JavaScript syntax checks; HTTP 200 for local page and API; browser-tested Emaan and complete-family selection, email-draft generation (without sending), Instagram POSTS/REELS tabs, mobile menu, and introduction embed. No inquiries were sent. Live Instagram sync is not yet connected and cannot be verified without API credentials. No public deployment has been made. Public UI contains no manually captured view or follower counts.


## Current sponsor showcase and Web3Forms integration

The sponsor section uses three image-led creative-direction cards and three compact service cards. Buttons transfer service and character choices into the existing inquiry form. The original imagery is labelled as creative directions, not completed sponsor campaigns. The footer has improved navigation and contacts; AI Soulmates was removed.

Direct submission now uses Web3Forms, replacing the unconfigured Resend approach. dist/inquiry.js sends all sponsor fields to the official browser-side API and uses the visitor email as Reply-To. The owner-provided public form access key is in dist/index.html, as prescribed by Web3Forms; it is not a private email password. The setup page was checked: form ready, logged in as tinysmileskidstv@gmail.com. No Resend account, domain, secret environment variables or Node mail backend are needed.

Validation and honeypot checks run before sending. The submit button locks during the request; successful submission resets the form. Errors preserve all entered fields, and network/invalid-JSON errors avoid claiming confirmed delivery. WhatsApp/email draft controls remain removed, as requested. Direct contact links remain.

Validation on 13 October 2026: three Web3Forms unit tests passed; syntax checks passed; one clearly labelled integration test was sent using the website form. Web3Forms returned success, the on-page confirmation appeared, and the browser reported no errors. Gmail inbox receipt has not been independently inspected. No production deployment was made.

Run `node --test tests/web3forms.test.mjs`. Unit tests mock sending and do not send real emails. Official API: https://docs.web3forms.com/getting-started/api-reference

## Latest branding and deployment package — 13 October 2026

The owner's new maroon logo is used in the header, footer, Instagram profile, favicon and app icon. The PNG exterior is transparent. Built-in imagegen was used to remove the exterior white background while preserving the portrait, lettering and internal white elements. The active optimized logo is dist/assets/tiny-smiles-logo-maroon.png.

The social cover uses the owner's supplied wide banner with the transparent logo in a dark lower panel. dist/assets/tiny-smiles-og.png is a 1200×630 PNG. Open Graph and Twitter metadata point to the public HTTPS image. The visible upper website banner was removed at the owner's request. Emaan & Waseeq replaces the previous partner label throughout active content and form selections.

The floating WhatsApp button is an accessible icon. Other WhatsApp links do not repeat the phone number; separate telephone links remain. Mobile layout checks covered 320, 375, 390, 430, 768, 1024 and 1440px with no horizontal overflow. The Instagram mobile profile now has a wider readable copy column. Character selection and mobile menu behavior were verified. No Lighthouse score is claimed.

Deploy the contents of dist using the existing static Vercel project configuration (output directory: dist; no build required). Web3Forms works through its hosted service. The optional Instagram server integration still needs official credentials and compatible server hosting; automatic Instagram sync is not active.

Live OG check: the deployed site exposed the expected OG metadata and its HTTPS PNG loaded at 1200×630. An OG image is a social link preview, not a visible page banner. Social platforms may retain an earlier cached preview.
