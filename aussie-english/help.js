/* Help: the step-by-step path for new users, then questions and answers by section.
   Text may contain simple HTML. "check" names the progress test that ticks a step off
   (see startSteps() in app.js). */

const HELP_STEPS = [
  { check: 'installed', title: 'Install the app on your phone',
    text: '<b>Android:</b> tap <b>Install</b> on the Home screen card (or Chrome menu, then <b>Install app</b>). <b>iPhone:</b> open this page in <b>Safari</b>, tap <b>Share</b>, then <b>Add to Home Screen</b>. From now on, open it from the round Aussie English icon.' },
  { check: 'code', title: 'Enter your access code', href: '#/talk/general', go: 'Open a conversation',
    text: 'Go to <b>Talk</b> and open <b>General conversation</b>. Say or type "Hi", and enter the access code you were given when the app asks. Tap <b>Allow</b> when your phone asks to use the microphone.' },
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
    { q: 'Everyday lessons and quizzes', a: 'Eight lessons of everyday Australian English with Malayalam meanings. Listen to each phrase, say it, then take the quiz at the end.' }
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
  { title: 'Slang and Tips', items: [
    { q: 'Slang', a: 'About 70 words Australians use every day, from "arvo" to "ambo". Tap a card to see its meaning, an example and a Malayalam translation; tap the speaker to hear it.' },
    { q: 'Tips', a: 'The unwritten rules of Australian life and work, such as calling your boss by their first name and what "bring a plate" means.' }
  ] },
  { title: 'Getting the best results', items: [
    { q: 'Tips for accurate scores', a: 'Practise somewhere quiet. Hold the phone about 20 cm from your mouth. Speak at a normal volume and pace - do not shout or say one word at a time. Use Chrome on Android or Safari on iPhone.' },
    { q: 'Make it a habit', a: 'Ten minutes a day beats an hour once a week. Follow Today\'s plan, have one conversation, and take the level test again every few weeks.' },
    { q: 'Text size and dark mode', a: 'Tap <b>Aa</b> at the top to make the text bigger. Tap the half-circle button to switch between light mode, dark mode and your phone\'s setting.' }
  ] },
  { title: 'Problems and fixes', items: [
    { q: 'The microphone doesn\'t listen', a: 'Check that the microphone is allowed for this app: on Android open <b>Settings, Apps, Chrome, Permissions, Microphone</b> and choose <b>Allow</b>. Close other apps that use the microphone, such as a phone call or a voice recorder. Then close this app completely and open it again.' },
    { q: 'There is no Australian voice', a: 'The voice comes from your phone. Chrome usually has an Australian English voice; if not, the app uses another English voice. On Android you can add voices in <b>Settings, Text-to-speech</b>.' },
    { q: '"Access code needed" or "today\'s limit"', a: 'Enter the access code you were given; it is saved on that phone. Each person has a daily limit on conversation messages, which resets every day.' },
    { q: 'Something looks out of date', a: 'Close the app completely and open it again; it updates itself. If it still looks old, open the web address in Chrome once and reload the page.' },
    { q: 'Using it offline', a: 'Lessons, slang and tips work without internet. Conversations, the level test and sound-by-sound scoring need internet.' }
  ] },
  { title: 'Your privacy', items: [
    { q: 'What is saved, and where', a: 'Your progress (streak, scores, saved phrases) is saved only on your own phone. Clearing your browser data or changing phones starts fresh.' },
    { q: 'What is sent for scoring', a: 'What you say in conversations is sent to the AI coach (Anthropic\'s Claude) to reply and give feedback. For sound-by-sound scoring, your voice is sent to Microsoft Azure Speech. Never share real personal details such as passport, bank or patient information - use made-up details when you practise.' }
  ] }
];
