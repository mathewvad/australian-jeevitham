/* Help: the step-by-step path for new users, then questions and answers by section.
   Text may contain simple HTML. "check" names the progress test that ticks a step off
   (see startSteps() in app.js). */

const HELP_STEPS = [
  { check: 'installed', title: 'Install the app on your phone',
    text: '<b>Android:</b> tap <b>Install</b> on the Home screen card (or Chrome menu, then <b>Install app</b>). <b>iPhone:</b> open this page in <b>Safari</b>, tap <b>Share</b>, then <b>Add to Home Screen</b>. From now on, open it from the round Aussie English icon.' },
  { check: 'code', title: 'Create your account', href: '#/account', go: 'My account',
    text: 'Sign up with <b>Continue with Google</b> or your email and a password, and answer the four short questions about you. If you used email, tap the link we email you first. Tap <b>Allow</b> whenever your phone asks to use the microphone.' },
  { check: 'test', title: 'Take the speaking level test', href: '#/test', go: 'Start the test',
    text: 'Go to <b>Learn</b>, then <b>Speaking level test</b> (about 4 minutes). Read three sentences, then answer three questions. You get your level, an estimated IELTS band, and what to work on.' },
  { check: 'drill', title: 'Do your first sound drill', href: '#/sounds', go: 'Open sound drills',
    text: 'Go to <b>Learn</b>, then <b>Sound drills</b>. Start with the sound your test showed as weakest (or "V and W"). Listen to a word pair, tap a word, then tap the microphone and say it. Tap any red word to see which sound to fix.' },
  { check: 'talk', title: 'Have your first real conversation', href: '#/talk', go: 'Choose a conversation',
    text: 'Go to <b>Talk</b> and choose a situation from your work, such as <b>Give a shift handover</b>. Reply at least five times. Tap the label under each message to see a better way to say it.' },
  { check: 'plan', title: 'Follow Today\'s plan every day', href: '#/', go: 'See today\'s plan',
    text: 'Each day, open <b>Home</b> and do the three tasks in <b>Today\'s plan</b> - about 10 minutes. Watch <b>Your skills</b> go up, and take the level test again every two or three weeks.' }
];

const HELP = [
  { title: 'Home', items: [
    { q: 'Today\'s plan', a: 'Three short tasks picked for you each day: a drill for your weakest sound, one conversation, and either the level test or practising your own sentences. Each task ticks itself off when you finish it.' },
    { q: 'Your skills', a: 'Scores out of 100 for <b>Pronunciation</b>, <b>Fluency</b>, <b>Intonation</b>, <b>Grammar</b> and <b>Vocabulary</b>, from your practice over the last 14 days. Pronunciation, fluency and intonation come from drills and lessons; grammar and vocabulary come from conversations. Until you practise, they show your level test result.' },
    { q: 'Streak, speaking time and saved phrases', a: 'Your streak counts the days in a row you have practised. Speaking time adds up the minutes you have spoken. Power phrases you save in conversations appear at the bottom of Home - tap the speaker to hear one again.' }
  ] },
  { title: 'Learn', items: [
    { q: 'Sound drills', a: 'Nine drills for the sounds Malayalis find hardest: V and W, the two TH sounds, Z, F and P, short "i" and long "ee", the "a" in "bad", the R sound, and word endings. Each shows a picture of the mouth position. Read the tip, listen to the word pairs (like <i>thin / tin</i>), tap one, then tap the microphone and say it.' },
    { q: '1-minute speaking check', a: 'Talk about a topic for up to a minute and get a six-part report: <b>Pronunciation</b>, <b>Grammar</b>, <b>Vocabulary</b>, <b>Pace</b> (words per minute - about 120-160 is natural), <b>Pauses</b> (hesitations per minute) and <b>Filler words</b> ("basically", "actually", "umm"), plus your talk rewritten in natural English.' },
    { q: 'Listening: older patients', a: 'Twelve short clips of older Australian patients speaking fast and informally ("I\'ve been feeling a bit crook", "me ticker\'s going like the clappers"). Choose what the patient means, then see what they said and what the slang means. Use Normal or Slow if you need to.' },
    { q: 'OET Speaking (Nursing)', a: 'Ten nursing role-plays in the OET style - going home after a hip replacement, new diabetes, a child\'s asthma, quitting smoking, falls, antibiotics, a colonoscopy, warfarin, breastfeeding and a child with a fever. Read the card, prepare for 3 minutes (with notes), then talk with the patient for 5 minutes - you start, just like the real test. The patient has their own hidden worries to find out. There are no corrections during the role-play; at the end you get an estimated grade (A to E) and score out of 500, all 9 OET criteria, how well you covered the tasks, and your own sentences rewritten as a grade-A nurse would say them. AHPRA needs grade B (350).' },
    { q: 'IELTS Speaking', a: 'Practise all three parts of the IELTS Speaking test. <b>Part 1</b>: 10 topics with short questions. <b>Part 2</b>: 12 cue cards with a 1-minute preparation timer and notes, then a 2-minute talk. <b>Part 3</b>: discussion questions for each cue card. Or take a <b>full mock test</b> (about 12 minutes). You get a band on each of the four criteria - Fluency and Coherence, Lexical Resource, Grammar, and Pronunciation (measured from your voice) - plus an overall band, what to fix, and a Band 8 version of each of your answers. "How the test works" explains the format, marking and the AHPRA requirement of 7.0.' },
    { q: 'Interview preparation', a: 'Twenty common Australian healthcare interview questions in five groups, each with why the panel asks it, tips and a model answer. Choose the job you are applying for, tap the microphone and answer, then tap <b>Get feedback</b>: you get a score, a STAR check for "tell me about a time" questions, what worked, what to improve, and your own answer rewritten in natural Australian English. For a full practice interview, try the mock interviews with Michelle (hospital RN), David (aged care) or Karen (Nurse Unit Manager).' },
    { q: 'Vocabulary', a: '96 words and phrases in 8 themes: on the ward, medications, aged care, body and symptoms, leading a team, empathy and difficult talks, phone and admin, and everyday life in Australia. Tap a word to see its meaning, Malayalam and an example; tap the speaker to hear it, say the example with the microphone below, and tap <b>Mark as learnt</b>.' },
    { q: 'Practise any sentence', a: 'Type or paste anything - something you say at work, or a word you find hard. Tap <b>Listen</b> to hear it in an Australian voice, then tap the microphone and say it.' },
    { q: 'Speaking level test', a: 'About 4 minutes. Read three sentences aloud, then answer three questions as you would in a real conversation. Speak for 30 to 60 seconds per answer; the microphone stops by itself after a few seconds of silence, or tap it when you have finished. You get your level (A1 to C2), an estimated IELTS speaking band, your strengths and what to work on. There are 10 different versions, so each time you take the test you get new sentences and questions; your past results are listed on the test screen.' },
    { q: 'Everyday Australian English', a: 'Tap <b>Everyday Australian English</b> in Learn to see eight lessons of everyday phrases with Malayalam meanings. Listen to each phrase, say it, then take the quiz at the end.' },
    { q: 'Aussie slang', a: 'In <b>Learn</b>, tap <b>Aussie slang</b>: about 70 words Australians use every day, from "arvo" to "ambo". Tap a card to see its meaning, an example and a Malayalam translation; tap the speaker to hear it.' }
  ] },
  { title: 'Reading your pronunciation scores', items: [
    { q: 'The four scores', a: '<b>Overall</b> - your total pronunciation score.<br><b>Accuracy</b> - how clearly you said each sound.<br><b>Fluency</b> - how smoothly you spoke, without long pauses.<br><b>Intonation</b> - stress, rhythm and the rise and fall of your voice.<br>Tap any score bar to see what it means, in English and Malayalam.' },
    { q: 'The coloured words and sounds', a: '<b>Green</b> is clear, <b>yellow</b> is close and <b>red</b> needs work. A crossed-out word was missed. Tap any word to see its syllables and each of its sounds; a red sound shows what you actually said, for example <b>/θ/ you said /t/</b>. Your weakest sound appears in a yellow box at the top with a picture of the mouth position, a tip in English and Malayalam, and a link to the matching drill.' },
    { q: 'Australian or American?', a: 'The sound-by-sound check uses an American English engine, because it is the only one that names each sound. The sounds the drills train are the same in Australian English. Words where Australians drop the "r" (like "car" or "nurse") may sometimes score a little lower - that is fine.' }
  ] },
  { title: 'Talk (the AI coach)', items: [
    { q: 'How a conversation works', a: 'Choose a situation. The character speaks first. Tap the big microphone, answer as you would at work, and pause - your message is sent after about a second of silence. The character replies in an Australian voice. Tap the keyboard button if you would rather type, and the speaker button to hear the last reply again.' },
    { q: 'Corrections', a: 'Under each of your messages you see <b>Excellent</b>, <b>Could be stronger</b> or <b>Needs a fix</b>. Tap it to see a better way to say it, with the reason, and tap <b>Hear the better version</b>. Words to improve are underlined - <b>yellow</b> for grammar or word choice, <b>blue</b> for tone. Tap them for the fix.' },
    { q: 'Suggestions, power phrases and pace', a: 'Stuck? Tap a suggestion above the microphone to hear an example reply. <b>Power phrases</b> are expressions worth learning - tap the bookmark to save one. When you speak, you also see your pace (words per minute) and any filler words like "basically" or "actually".' },
    { q: 'General conversation', a: 'The first situation is an open chat with Alex, a friendly local. Talk about anything - family, travel, the weekend - to practise everyday English.' },
    { q: 'Start again', a: 'Tap the circular arrow at the top right of a conversation to start it over.' }
  ] },
  { title: 'Tips and Feedback', items: [
    { q: 'Feedback', a: 'Tap <b>Feedback</b> at the bottom of the screen to rate the app, tell us what isn\'t working, or share an idea. It goes straight to Australian Jeevitham.' },
    { q: 'Tips', a: 'The unwritten rules of Australian life and work, such as calling your boss by their first name and what "bring a plate" means.' }
  ] },
  { title: 'Getting the best results', items: [
    { q: 'Tips for accurate scores', a: 'Practise somewhere quiet. Hold the phone about 20 cm from your mouth. Speak at a normal volume and pace - do not shout or say one word at a time. Use Chrome on Android or Safari on iPhone.' },
    { q: 'Make it a habit', a: 'Ten minutes a day beats an hour once a week. Follow Today\'s plan, have one conversation, and take the level test again every few weeks.' },
    { q: 'Text size and dark mode', a: 'Tap <b>Aa</b> at the top to make the text bigger. Tap the half-circle button to switch between light mode, dark mode and your phone\'s setting.' }
  ] },
  { title: 'Problems and fixes', items: [
    { q: 'The microphone doesn\'t listen', a: 'Check that the microphone is allowed for this app: on Android open <b>Settings, Apps, Chrome, Permissions, Microphone</b> and choose <b>Allow</b>. Close other apps that use the microphone, such as a phone call or a voice recorder. Then close this app completely and open it again.' },
    { q: 'Changing the voice', a: 'Tap the speaker button at the top of the screen. Choose one of six natural Australian voices (Natasha, William, Annette, Darren, Carly or Ken) - tap <b>Listen</b> to hear each one. Natural voices need internet and your access code. You can also choose <b>Phone\'s own voice</b>, which works offline; if the phone has no Australian voice, Android can add one in <b>Settings, Text-to-speech</b>.' },
    { q: 'Signing in', a: 'Use <b>Continue with Google</b>, or your email and password. Forgot your password? Type your email on the sign-in screen and tap <b>Forgot password?</b> - we email you a link. If you signed up with email and see "Check your email", tap the link in our email (look in spam too), then tap <b>Continue</b>. You stay signed in on your phone; to sign out, open <b>My account</b> from Home.' },
    { q: '"Today\'s limit" - 60 AI actions a day', a: 'During testing, each person has <b>60 AI actions a day</b>. One action is one reply from your coach in Talk, one patient reply in an OET role-play, one IELTS marking or Band 8 answer, one interview feedback, one 1-minute check or one level test. Talk shows how many you have left. The count resets every day. Sound drills, lessons, slang, tips and the voices have no limit.' },
    { q: 'Something looks out of date', a: 'Close the app completely and open it again; it updates itself. If it still looks old, open the web address in Chrome once and reload the page.' },
    { q: 'Using it offline', a: 'Lessons, slang and tips work without internet. Conversations, the level test and sound-by-sound scoring need internet.' }
  ] },
  { title: 'Your privacy', items: [
    { q: 'What is saved, and where', a: 'Your account (name, email and the four profile answers) is saved securely so you can sign in on any phone. Your progress (streak, scores, saved phrases) is saved only on your own phone, so changing phones starts your progress fresh. You can edit your profile or delete your account in <b>My account</b>. Full details are in the <a href="#/privacy">Privacy policy</a>.' },
    { q: 'What is sent for scoring', a: 'What you say in conversations is sent to the AI coach (Anthropic\'s Claude) to reply and give feedback. For sound-by-sound scoring, your voice is sent to Microsoft Azure Speech. Never share real personal details such as passport, bank or patient information - use made-up details when you practise.' }
  ] }
];

/* Privacy policy and Terms of use, shown at #/privacy and #/terms. */
const LEGAL = {
  privacy: {
    eyebrow: 'Privacy', title: 'Privacy policy', updated: '3 November 2026',
    html:
      '<p>Aussie English Coach is made by Australian Jeevitham (australianjeevitham.com), based in Queensland, Australia. This page explains what we collect when you use the app, why, and your choices.</p>' +
      '<h2>What we collect</h2><ul>' +
        '<li><b>Your account:</b> your name, email address and how you sign in (Google or email and password). Passwords are handled by Google Firebase - we never see them.</li>' +
        '<li><b>Your profile:</b> where you live, your work and your main goal.</li>' +
        '<li><b>Usage counts:</b> how many AI coach messages you send each day, kept for 90 days to apply daily limits and plan the app.</li>' +
        '<li><b>What you say or type to the AI features:</b> sent to the AI coach to reply and give feedback. We do not keep your conversations.</li>' +
        '<li><b>Your voice recordings</b> in drills and speaking tests: sent for pronunciation scoring and not kept by us.</li>' +
        '<li><b>Website statistics:</b> our website uses Google Analytics to count visits.</li>' +
      '</ul>' +
      '<p>Your practice progress (streak, scores, saved phrases) stays on your own phone.</p>' +
      '<h2>Why we collect it</h2><p>To give you an account, run the AI coach and pronunciation scoring, keep the service fair with daily limits, contact you about your account, and understand who uses the app so we can improve it. We do not sell your information or use it for advertising.</p>' +
      '<h2>Services we use</h2><p>These companies process information for us, and may do so outside Australia (for example in the United States):</p><ul>' +
        '<li>Google Firebase - accounts and sign-in</li>' +
        '<li>Cloudflare - our server and account storage</li>' +
        '<li>Anthropic (Claude) - the AI coach replies and feedback</li>' +
        '<li>Microsoft Azure - pronunciation scoring and the natural voices</li>' +
        '<li>GitHub - hosts the app files; Google Analytics - website statistics</li>' +
      '</ul>' +
      '<h2>Please don\'t share private details</h2><p>Never type or say real patient information, passwords, bank details or ID numbers in the app. Use made-up names and details when you practise.</p>' +
      '<h2>Your choices</h2><ul>' +
        '<li>Edit your profile or <b>delete your account</b> at any time in My account. Deleting removes your account and profile; usage counts expire within 90 days.</li>' +
        '<li>Ask us what we hold about you, or to correct it, by emailing <a href="mailto:australianjeevitham@gmail.com">australianjeevitham@gmail.com</a>.</li>' +
      '</ul>' +
      '<h2>Who the app is for</h2><p>The app is for adults aged 18 and over.</p>' +
      '<h2>Changes</h2><p>We may update this policy as the app grows. The date at the top shows the latest version.</p>'
  },
  terms: {
    eyebrow: 'Terms', title: 'Terms of use', updated: '3 November 2026',
    html:
      '<p>By using Aussie English Coach you agree to these terms. If you don\'t agree, please don\'t use the app.</p>' +
      '<h2>A practice tool</h2><p>The app helps you practise English. Scores, bands and grades are estimates for practice only. The app is not connected with IELTS, OET, AHPRA or any employer, and does not guarantee any test result, registration or job.</p>' +
      '<h2>The AI coach can make mistakes</h2><p>Feedback, corrections and example answers come from artificial intelligence and may sometimes be wrong. The healthcare situations are for communication practice only - they are not medical or clinical advice. Always follow your workplace policies and qualified professionals.</p>' +
      '<h2>Testing (beta)</h2><p>The app is free while it is being tested. Features, daily limits and availability may change, and the service may sometimes be unavailable.</p>' +
      '<h2>Your account</h2><ul>' +
        '<li>You must be 18 or older and give true details.</li>' +
        '<li>Keep your account to yourself - don\'t share it.</li>' +
        '<li>Don\'t enter real patient information or other people\'s private details.</li>' +
        '<li>Don\'t misuse the app, try to break its limits, or use it for anything unlawful or abusive.</li>' +
      '</ul><p>We may pause or close accounts that break these terms.</p>' +
      '<h2>Our content</h2><p>The lessons, drills and other content belong to Australian Jeevitham. You may use them for your own learning, but please don\'t copy or sell them.</p>' +
      '<h2>Responsibility</h2><p>The app is provided "as is". To the extent the law allows, Australian Jeevitham is not responsible for losses from using it. Nothing in these terms removes your rights under the Australian Consumer Law.</p>' +
      '<h2>Law and contact</h2><p>These terms are governed by the law of Queensland, Australia. Questions? Email <a href="mailto:australianjeevitham@gmail.com">australianjeevitham@gmail.com</a>.</p>'
  }
};
