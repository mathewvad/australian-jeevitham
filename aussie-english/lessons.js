/* Australian Jeevitham Aussie English Coach - lesson content.
   Each phrase: en (shown and spoken), ml (Malayalam meaning), tip (optional, Malayalam),
   say (optional - spelling the voice reads instead of en, when the voice gets en wrong). */

const LESSONS = [
  {
    id: 'greetings',
    icon: '👋',
    title: 'Aussie Greetings & Slang',
    ml: 'ഓസി അഭിവാദ്യങ്ങളും സ്ലാങ്ങും',
    phrases: [
      { en: "G'day, how ya going?", say: 'Gidday, how ya going?', ml: 'ഹലോ, എങ്ങനെയുണ്ട്?', tip: '"How are you?" എന്നതിന്റെ ഓസി രൂപം. ഇത് വെറും അഭിവാദ്യമാണ്; "Good thanks, you?" എന്ന് ചുരുക്കി മറുപടി പറഞ്ഞാൽ മതി.' },
      { en: 'Good thanks, how are you?', ml: 'സുഖം, നന്ദി. നിങ്ങൾക്കോ?' },
      { en: 'No worries.', ml: 'കുഴപ്പമില്ല / സാരമില്ല.', tip: 'Thank you പറഞ്ഞാലും Sorry പറഞ്ഞാലും ഓസികൾ സാധാരണ പറയുന്ന മറുപടി.' },
      { en: 'See you this arvo.', ml: 'ഇന്ന് ഉച്ചകഴിഞ്ഞ് കാണാം.', tip: 'arvo = afternoon (ഉച്ചകഴിഞ്ഞ്)' },
      { en: "Let's grab some brekkie.", ml: 'നമുക്ക് പ്രഭാതഭക്ഷണം കഴിക്കാം.', tip: 'brekkie = breakfast' },
      { en: "I reckon it'll rain today.", ml: 'ഇന്ന് മഴ പെയ്യുമെന്ന് എനിക്ക് തോന്നുന്നു.', tip: 'reckon = think (തോന്നുക, കരുതുക)' },
      { en: 'Cheers, mate!', ml: 'നന്ദി, സുഹൃത്തേ!', tip: 'Cheers = Thanks. ചിലപ്പോൾ "Bye" എന്ന അർത്ഥത്തിലും പറയും.' },
      { en: "She'll be right.", ml: 'എല്ലാം ശരിയാകും, പേടിക്കണ്ട.' },
      { en: 'Catch you later.', ml: 'പിന്നെ കാണാം.' },
      { en: 'Fair dinkum?', ml: 'ശരിക്കും? സത്യമാണോ?', tip: 'fair dinkum = genuine, true' }
    ]
  },
  {
    id: 'airport',
    icon: '✈️',
    title: 'At the Airport',
    ml: 'എയർപോർട്ടിൽ',
    phrases: [
      { en: 'Do you have anything to declare?', ml: 'ഡിക്ലയർ ചെയ്യാൻ എന്തെങ്കിലും ഉണ്ടോ?', tip: 'അച്ചാർ, മസാല, ഉണക്കമീൻ പോലുള്ള ഭക്ഷണസാധനങ്ങൾ ഉണ്ടെങ്കിൽ കാർഡിൽ "Yes" എഴുതി ഡിക്ലയർ ചെയ്യുക. ഒളിപ്പിച്ചാൽ വലിയ പിഴ കിട്ടാം.' },
      { en: 'Yes, I have some spices and pickles.', ml: 'ഉണ്ട്, കുറച്ച് മസാലയും അച്ചാറും ഉണ്ട്.' },
      { en: "What's the purpose of your visit?", ml: 'നിങ്ങളുടെ യാത്രയുടെ ഉദ്ദേശ്യം എന്താണ്?' },
      { en: "I'm here on a work visa.", ml: 'ഞാൻ വർക്ക് വിസയിലാണ് വന്നിരിക്കുന്നത്.' },
      { en: 'Where can I get a SIM card?', ml: 'സിം കാർഡ് എവിടെ കിട്ടും?' },
      { en: "Where's the taxi rank?", ml: 'ടാക്സി സ്റ്റാൻഡ് എവിടെയാണ്?', tip: 'taxi rank = taxi stand' },
      { en: "My luggage hasn't arrived.", ml: 'എന്റെ ലഗേജ് വന്നിട്ടില്ല.' },
      { en: 'How do I get to the city?', ml: 'സിറ്റിയിലേക്ക് എങ്ങനെ പോകാം?', tip: 'ഓസികൾ നഗരമധ്യത്തെ "the city" അല്ലെങ്കിൽ "the CBD" എന്ന് വിളിക്കും.' }
    ]
  },
  {
    id: 'shopping',
    icon: '🛒',
    title: 'Shops & the Servo',
    ml: 'കടകളിലും പെട്രോൾ പമ്പിലും',
    phrases: [
      { en: 'Can I get a flat white, please?', ml: 'ഒരു ഫ്ലാറ്റ് വൈറ്റ് (പാൽ കോഫി) തരാമോ?', tip: 'ഓർഡർ ചെയ്യുമ്പോൾ "Give me" എന്നതിന് പകരം "Can I get..., please?" എന്ന് പറയുക.' },
      { en: 'Do you need a bag?', ml: 'ബാഗ് വേണോ?', tip: 'പല കടകളിലും ബാഗിന് പണം കൊടുക്കണം. സ്വന്തം ബാഗ് കൊണ്ടുപോകുന്നതാണ് നല്ലത്.' },
      { en: 'Just tap your card.', ml: 'കാർഡ് മെഷീനിൽ ടാപ്പ് ചെയ്താൽ മതി.' },
      { en: "I'm just looking, thanks.", ml: 'ഞാൻ വെറുതെ നോക്കുകയാണ്, നന്ദി.' },
      { en: "Where's the nearest servo?", ml: 'അടുത്തുള്ള പെട്രോൾ പമ്പ് എവിടെയാണ്?', tip: 'servo = service station (പെട്രോൾ പമ്പ്)' },
      { en: 'Pump number four, thanks.', ml: 'പമ്പ് നമ്പർ നാല്, നന്ദി.', tip: 'ഓസ്ട്രേലിയയിൽ ഇന്ധനം സ്വയം നിറയ്ക്കണം. പിന്നെ അകത്ത് ചെന്ന് പമ്പ് നമ്പർ പറഞ്ഞ് പണം കൊടുക്കുക.' },
      { en: 'Is this on special?', ml: 'ഇതിന് ഓഫർ ഉണ്ടോ?', tip: 'on special = on sale (ഓഫർ / ഡിസ്കൗണ്ട്)' },
      { en: 'Can I get a receipt, please?', ml: 'രസീത് തരാമോ?' }
    ]
  },
  {
    id: 'renting',
    icon: '🏠',
    title: 'Renting a House',
    ml: 'വീട് വാടകയ്ക്ക് എടുക്കുമ്പോൾ',
    phrases: [
      { en: 'Is the unit still available?', ml: 'ആ യൂണിറ്റ് ഇപ്പോഴും കിട്ടാനുണ്ടോ?', tip: 'unit = flat / apartment' },
      { en: 'When is the inspection?', ml: 'വീട് കാണാനുള്ള സമയം (ഇൻസ്പെക്ഷൻ) എപ്പോഴാണ്?' },
      { en: 'How much is the rent per week?', ml: 'ആഴ്ചയിൽ വാടക എത്രയാണ്?', tip: 'ഓസ്ട്രേലിയയിൽ വാടക സാധാരണ ആഴ്ച കണക്കിലാണ് പറയുന്നത്, മാസക്കണക്കിലല്ല.' },
      { en: 'How much is the bond?', ml: 'ബോണ്ട് (സെക്യൂരിറ്റി ഡെപ്പോസിറ്റ്) എത്രയാണ്?' },
      { en: 'Are pets allowed?', ml: 'വളർത്തുമൃഗങ്ങളെ അനുവദിക്കുമോ?' },
      { en: "I'd like to apply for this property.", ml: 'ഈ വീടിന് അപേക്ഷിക്കാൻ ആഗ്രഹിക്കുന്നു.' },
      { en: "The hot water isn't working.", ml: 'ചൂടുവെള്ളം വരുന്നില്ല.' },
      { en: 'Could you send someone to fix it?', ml: 'ഇത് നന്നാക്കാൻ ആരെയെങ്കിലും അയയ്ക്കാമോ?' }
    ]
  },
  {
    id: 'doctor',
    icon: '🩺',
    title: 'At the Doctor (GP)',
    ml: 'ഡോക്ടറെ (GP) കാണുമ്പോൾ',
    phrases: [
      { en: "I'd like to book an appointment with a GP.", ml: 'ഒരു GP-യെ കാണാൻ അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യണം.', tip: 'GP = General Practitioner (ഫാമിലി ഡോക്ടർ)' },
      { en: 'Do you bulk bill?', ml: 'ഇവിടെ ബൾക്ക് ബില്ലിംഗ് ഉണ്ടോ?', tip: 'Bulk billing = ഫീസ് മെഡികെയർ നേരിട്ട് അടയ്ക്കും; നിങ്ങൾ ഒന്നും കൊടുക്കേണ്ട.' },
      { en: "Here's my Medicare card.", ml: 'ഇതാ എന്റെ മെഡികെയർ കാർഡ്.' },
      { en: "I've had a fever for two days.", ml: 'രണ്ട് ദിവസമായി പനിയുണ്ട്.' },
      { en: "I've got a sore throat.", ml: 'തൊണ്ടവേദനയുണ്ട്.' },
      { en: 'I feel a bit crook.', ml: 'എനിക്ക് കുറച്ച് സുഖമില്ല.', tip: 'crook = sick (സുഖമില്ലാത്ത)' },
      { en: 'Can I get a medical certificate for work?', ml: 'ജോലിസ്ഥലത്ത് കൊടുക്കാൻ മെഡിക്കൽ സർട്ടിഫിക്കറ്റ് തരാമോ?' },
      { en: "Where's the nearest chemist?", ml: 'അടുത്തുള്ള മെഡിക്കൽ ഷോപ്പ് എവിടെയാണ്?', tip: 'chemist = pharmacy (മെഡിക്കൽ ഷോപ്പ്)' },
      { en: 'Call triple zero!', ml: '000-ൽ വിളിക്കൂ!', tip: 'പോലീസ്, ആംബുലൻസ്, ഫയർ - അടിയന്തര നമ്പർ 000 ആണ് ("triple zero").' }
    ]
  },
  {
    id: 'interview',
    icon: '💼',
    title: 'Job Interview',
    ml: 'ജോലി ഇന്റർവ്യൂ',
    phrases: [
      { en: 'Tell me a bit about yourself.', ml: 'നിങ്ങളെക്കുറിച്ച് കുറച്ച് പറയൂ.' },
      { en: 'I have five years of experience in aged care.', ml: 'എനിക്ക് ഏജ്ഡ് കെയറിൽ അഞ്ച് വർഷത്തെ പരിചയമുണ്ട്.' },
      { en: "I'm a quick learner and a good team player.", ml: 'ഞാൻ വേഗം കാര്യങ്ങൾ പഠിക്കും, ടീമിനൊപ്പം നന്നായി ജോലി ചെയ്യും.' },
      { en: 'Why do you want to work here?', ml: 'എന്തുകൊണ്ടാണ് ഇവിടെ ജോലി ചെയ്യാൻ ആഗ്രഹിക്കുന്നത്?' },
      { en: 'Could you repeat that, please?', ml: 'ഒന്നുകൂടി പറയാമോ?', tip: 'മനസ്സിലായില്ലെങ്കിൽ ഊഹിച്ച് മറുപടി പറയുന്നതിനേക്കാൾ നല്ലത് വീണ്ടും ചോദിക്കുന്നതാണ്.' },
      { en: 'Do you have any questions for us?', ml: 'ഞങ്ങളോട് എന്തെങ്കിലും ചോദിക്കാനുണ്ടോ?', tip: 'എപ്പോഴും ഒരു ചോദ്യമെങ്കിലും ചോദിക്കുക - ജോലിയിൽ താൽപ്പര്യമുണ്ടെന്ന് അത് കാണിക്കും.' },
      { en: 'What would a typical day look like?', ml: 'ഒരു സാധാരണ ജോലിദിവസം എങ്ങനെയായിരിക്കും?' },
      { en: "I'm available to start straight away.", ml: 'എനിക്ക് ഉടൻ തന്നെ ജോലി തുടങ്ങാം.' },
      { en: 'Thanks for your time.', ml: 'സമയം തന്നതിന് നന്ദി.' }
    ]
  },
  {
    id: 'work',
    icon: '🦺',
    title: 'At Work',
    ml: 'ജോലിസ്ഥലത്ത്',
    phrases: [
      { en: 'Morning! How was your weekend?', ml: 'ഗുഡ് മോണിംഗ്! വീക്കെൻഡ് എങ്ങനെയുണ്ടായിരുന്നു?', tip: 'തിങ്കളാഴ്ച രാവിലെ ഓസികൾ സ്ഥിരം ചോദിക്കുന്ന ചോദ്യം. ഒന്നോ രണ്ടോ വാക്യത്തിൽ മറുപടി പറഞ്ഞ് തിരിച്ചും ചോദിക്കുക.' },
      { en: 'Just call me Steve.', ml: 'എന്നെ സ്റ്റീവ് എന്ന് വിളിച്ചോളൂ.', tip: 'ഓസ്ട്രേലിയയിൽ ബോസിനെയും പേര് വിളിക്കും. "Sir" എന്ന് വിളിക്കേണ്ടതില്ല.' },
      { en: "Smoko's at ten.", ml: 'പത്ത് മണിക്കാണ് ചെറിയ ബ്രേക്ക്.', tip: 'smoko = ജോലിക്കിടയിലെ ചെറിയ ചായ ഇടവേള' },
      { en: 'Can you give me a hand?', ml: 'ഒന്ന് സഹായിക്കാമോ?' },
      { en: "I'm not sure. Could you show me how?", ml: 'എനിക്ക് ഉറപ്പില്ല. എങ്ങനെയെന്ന് കാണിച്ചുതരാമോ?', tip: 'അറിയില്ലെങ്കിൽ ചോദിക്കുന്നത് ഇവിടെ നല്ല കാര്യമായാണ് കാണുന്നത്, പ്രത്യേകിച്ച് സുരക്ഷയുടെ കാര്യത്തിൽ.' },
      { en: "I'll get onto it.", ml: 'ഞാൻ ഉടനെ അത് ചെയ്യാം.' },
      { en: "Sorry, I'm running a bit late.", ml: 'ക്ഷമിക്കണം, ഞാൻ കുറച്ച് വൈകും.', tip: 'വൈകുമെങ്കിൽ ഷിഫ്റ്റ് തുടങ്ങുന്നതിന് മുമ്പ് ബോസിന് മെസ്സേജ് അയക്കുക.' },
      { en: "It's my shout.", ml: 'ഇത്തവണ ഞാൻ ചെലവ് ചെയ്യാം.', tip: 'shout = മറ്റുള്ളവർക്ക് വേണ്ടി കാപ്പിയോ ഡ്രിങ്കോ വാങ്ങുക' },
      { en: 'Have a good one!', ml: 'നല്ലൊരു ദിവസം ആശംസിക്കുന്നു!' }
    ]
  },
  {
    id: 'phone',
    icon: '📞',
    title: 'Phone Calls',
    ml: 'ഫോൺ വിളിക്കുമ്പോൾ',
    phrases: [
      { en: "Hi, I'm calling about my bank account.", ml: 'ഹലോ, എന്റെ ബാങ്ക് അക്കൗണ്ടിനെക്കുറിച്ചാണ് വിളിക്കുന്നത്.' },
      { en: 'Could you speak a bit slower, please?', ml: 'കുറച്ച് പതുക്കെ സംസാരിക്കാമോ?' },
      { en: 'Could you spell that, please?', ml: 'അതൊന്ന് സ്പെൽ ചെയ്തു പറയാമോ?' },
      { en: 'My date of birth is the fifth of March, 1990.', ml: 'എന്റെ ജനനത്തീയതി 1990 മാർച്ച് അഞ്ച് ആണ്.', tip: 'ഓസ്ട്രേലിയയിൽ തീയതി ദിവസം / മാസം / വർഷം ക്രമത്തിലാണ് (05/03/1990).' },
      { en: "Sorry, the line's breaking up.", ml: 'ക്ഷമിക്കണം, ശബ്ദം മുറിഞ്ഞുപോകുന്നു.' },
      { en: 'Can I leave a message?', ml: 'ഒരു മെസ്സേജ് പറഞ്ഞുവെക്കാമോ?' },
      { en: "I'll call you back in five minutes.", ml: 'അഞ്ച് മിനിറ്റിനുള്ളിൽ തിരിച്ചുവിളിക്കാം.' },
      { en: "Thanks, you've been really helpful.", ml: 'നന്ദി, വലിയ സഹായമായി.' }
    ]
  }
];

/* AI role-play scenes. The character's instructions live on the server (aussie-english-worker);
   the id and opening line here must match it. Scenes without a level are "everyday" scenes,
   kept for the beginner and intermediate tiers. */
const SCENES = [
  { id: 'general', level: 'leadership', icon: '☕', title: 'General conversation - talk about anything', ml: 'ഏത് വിഷയത്തെക്കുറിച്ചും സംസാരിക്കാം', who: 'Alex, a friendly local',
    opening: "G'day! Grab a seat. So, what's on your mind today? We can chat about anything you like.",
    say: "Gidday! Grab a seat. So, what's on your mind today? We can chat about anything you like.",
    opening_ml: 'ഹലോ! ഇരിക്കൂ. ഇന്ന് എന്താണ് മനസ്സിൽ? എന്തിനെക്കുറിച്ചും നമുക്ക് സംസാരിക്കാം.' },
  { id: 'handover', level: 'leadership', icon: '📋', title: 'Give a shift handover (ISBAR)', ml: 'ഷിഫ്റ്റ് ഹാൻഡോവർ നൽകാം (ISBAR)', who: 'Grace, night-shift RN',
    opening: "Hi, I'm taking over bays one to six tonight. Who should I be worried about?",
    opening_ml: 'ഹലോ, ഇന്ന് രാത്രി ഒന്ന് മുതൽ ആറ് വരെയുള്ള ബേകൾ ഞാനാണ് നോക്കുന്നത്. ആരെയാണ് കൂടുതൽ ശ്രദ്ധിക്കേണ്ടത്?' },
  { id: 'escalate', level: 'leadership', icon: '📞', title: 'Escalate a deteriorating patient', ml: 'ഗുരുതരാവസ്ഥയിലാകുന്ന രോഗിയെക്കുറിച്ച് ഡോക്ടറെ അറിയിക്കാം', who: 'Dr Nguyen, registrar on call',
    opening: "Dr Nguyen, registrar on call. What's going on?", opening_ml: 'ഡോ. എൻഗുയെൻ, ഓൺ-കോൾ രജിസ്ട്രാർ. എന്താണ് പ്രശ്നം?' },
  { id: 'family', level: 'leadership', icon: '👵', title: 'Handle an upset family member', ml: 'വിഷമിച്ചിരിക്കുന്ന കുടുംബാംഗത്തോട് സംസാരിക്കാം', who: "Margaret, a resident's daughter",
    opening: "I've been trying to speak to someone in charge all week. Mum's had another fall and nobody even rang me.",
    opening_ml: 'ഒരാഴ്ചയായി ചുമതലയുള്ള ആരോടെങ്കിലും സംസാരിക്കാൻ ശ്രമിക്കുകയാണ്. അമ്മ വീണ്ടും വീണു, എന്നിട്ടും ആരും എന്നെ വിളിച്ചുപോലും ഇല്ല.' },
  { id: 'staffing', level: 'leadership', icon: '🏥', title: 'Lead a short-staffed shift', ml: 'സ്റ്റാഫ് കുറവുള്ള ഷിഫ്റ്റ് നയിക്കാം', who: 'Lisa, Enrolled Nurse',
    opening: "We're two staff down again tonight. Honestly, I don't know how we're meant to keep everyone safe.",
    opening_ml: 'ഇന്നും രണ്ട് സ്റ്റാഫ് കുറവാണ്. സത്യം പറഞ്ഞാൽ, എല്ലാവരെയും എങ്ങനെ സുരക്ഷിതമായി നോക്കുമെന്ന് എനിക്കറിയില്ല.' },
  { id: 'feedback', level: 'leadership', icon: '💊', title: 'Give feedback after a med error', ml: 'മരുന്നിലെ പിഴവിന് ശേഷം ഫീഡ്‌ബാക്ക് നൽകാം', who: 'Tom, graduate RN',
    opening: 'You wanted to see me? Is this about the medication chart yesterday?',
    opening_ml: 'എന്നെ കാണണമെന്ന് പറഞ്ഞല്ലോ? ഇന്നലത്തെ മെഡിക്കേഷൻ ചാർട്ടിനെക്കുറിച്ചാണോ?' },
  { id: 'panel', level: 'leadership', icon: '🎯', title: 'Nurse Unit Manager interview', ml: 'നഴ്സ് യൂണിറ്റ് മാനേജർ ഇന്റർവ്യൂ', who: 'Karen, Director of Nursing',
    opening: 'Thanks for coming in. To start, tell us about a time you led your team through a significant change on the ward.',
    opening_ml: 'വന്നതിന് നന്ദി. ആദ്യം, വാർഡിൽ ഒരു വലിയ മാറ്റത്തിലൂടെ നിങ്ങൾ ടീമിനെ നയിച്ച അനുഭവം പറയൂ.' },
  { id: 'pitch', level: 'leadership', icon: '📊', title: 'Pitch a quality-improvement project', ml: 'ക്വാളിറ്റി ഇംപ്രൂവ്മെന്റ് പ്രൊപ്പോസൽ അവതരിപ്പിക്കാം', who: 'Linda, Executive Director of Nursing',
    opening: "I've read your falls prevention proposal. Walk me through the evidence. Why should we fund this now, with the budget as tight as it is?",
    opening_ml: 'നിങ്ങളുടെ ഫാൾസ് പ്രിവൻഷൻ പ്രൊപ്പോസൽ ഞാൻ വായിച്ചു. തെളിവുകൾ വിശദീകരിക്കൂ. ബജറ്റ് ഇത്ര കുറവായിരിക്കെ എന്തുകൊണ്ട് ഇപ്പോൾ ഇതിന് പണം അനുവദിക്കണം?' },
  { id: 'conflict', level: 'leadership', icon: '🤝', title: 'Resolve a conflict between nurses', ml: 'നഴ്സുമാർ തമ്മിലുള്ള തർക്കം പരിഹരിക്കാം', who: 'Sam, Registered Nurse',
    opening: "Look, I don't want to make a big deal of this, but I'm really struggling to work with Jess.",
    opening_ml: 'നോക്കൂ, ഇതൊരു വലിയ പ്രശ്നമാക്കാൻ എനിക്ക് താൽപ്പര്യമില്ല, പക്ഷേ ജെസ്സിനൊപ്പം ജോലി ചെയ്യാൻ എനിക്ക് ശരിക്കും ബുദ്ധിമുട്ടുണ്ട്.' },

  { id: 'mate', icon: '🏡', title: 'Chat with your Aussie neighbour', ml: 'ഓസി അയൽക്കാരനുമായി സംസാരിക്കാം', who: 'Jack, your neighbour',
    opening: "G'day! You must be the new neighbour. How ya going?", say: 'Gidday! You must be the new neighbour. How ya going?',
    opening_ml: 'ഹലോ! നിങ്ങളാണല്ലേ പുതിയ അയൽക്കാരൻ. എങ്ങനെയുണ്ട്?' },
  { id: 'customs', icon: '🛂', title: 'Airport customs', ml: 'എയർപോർട്ടിലെ കസ്റ്റംസ് പരിശോധന', who: 'Border Force officer',
    opening: "G'day, welcome to Australia. Can I see your passport and incoming passenger card, please?", say: 'Gidday, welcome to Australia. Can I see your passport and incoming passenger card, please?',
    opening_ml: 'ഹലോ, ഓസ്ട്രേലിയയിലേക്ക് സ്വാഗതം. നിങ്ങളുടെ പാസ്പോർട്ടും പാസഞ്ചർ കാർഡും കാണിക്കാമോ?' },
  { id: 'coffee', icon: '☕', title: 'Order at a cafe', ml: 'കഫേയിൽ ഓർഡർ ചെയ്യാം', who: 'Barista',
    opening: 'Morning! What can I get for you today?', opening_ml: 'ഗുഡ് മോണിംഗ്! ഇന്ന് എന്താണ് വേണ്ടത്?' },
  { id: 'rental', icon: '🏠', title: 'Rental inspection', ml: 'വാടകവീട് കാണാൻ പോകുമ്പോൾ', who: 'Emma, property manager',
    opening: 'Hi there, thanks for coming to the inspection. Have a look around. Any questions so far?', opening_ml: 'ഹലോ, ഇൻസ്പെക്ഷന് വന്നതിന് നന്ദി. ചുറ്റും നോക്കിക്കോളൂ. എന്തെങ്കിലും ചോദിക്കാനുണ്ടോ?' },
  { id: 'gp', icon: '🩺', title: 'See a GP', ml: 'ഡോക്ടറെ കാണാം', who: 'Dr Patel, your GP',
    opening: 'Come on in and take a seat. So, what brings you in today?', opening_ml: 'അകത്തേക്ക് വരൂ, ഇരിക്കൂ. എന്താണ് ഇന്ന് വന്നതിന്റെ കാരണം?' },
  { id: 'interview', icon: '💼', title: 'Job interview (aged care)', ml: 'ജോലി ഇന്റർവ്യൂ (ഏജ്ഡ് കെയർ)', who: 'Karen, the manager',
    opening: 'Thanks for coming in today. To start off, can you tell me a bit about yourself?', opening_ml: 'ഇന്ന് വന്നതിന് നന്ദി. ആദ്യം, നിങ്ങളെക്കുറിച്ച് കുറച്ച് പറയാമോ?' },
  { id: 'workmate', icon: '🦺', title: 'Smoko with a workmate', ml: 'ബ്രേക്ക് സമയത്ത് സഹപ്രവർത്തകനുമായി', who: 'Dave, your workmate',
    opening: 'Ah, smoko at last! How was your weekend, mate?', opening_ml: 'ഹാവൂ, അവസാനം ബ്രേക്ക് ആയി! വീക്കെൻഡ് എങ്ങനെയുണ്ടായിരുന്നു, സുഹൃത്തേ?' },
  { id: 'bank', icon: '📞', title: 'Call the bank', ml: 'ബാങ്കിലേക്ക് ഫോൺ വിളിക്കാം', who: 'Sarah from the bank',
    opening: "Thanks for calling, you're speaking with Sarah. How can I help you today?", opening_ml: 'വിളിച്ചതിന് നന്ദി, സാറയാണ് സംസാരിക്കുന്നത്. എന്ത് സഹായമാണ് വേണ്ടത്?' }
];

const SLANG = [
  { word: 'arvo', means: 'afternoon', ml: 'ഉച്ചകഴിഞ്ഞ്', ex: 'See you this arvo.' },
  { word: 'brekkie', means: 'breakfast', ml: 'പ്രഭാതഭക്ഷണം', ex: "What's for brekkie?" },
  { word: 'mate', means: 'friend', ml: 'സുഹൃത്ത്', ex: 'Thanks, mate.' },
  { word: 'reckon', means: 'think', ml: 'തോന്നുക, കരുതുക', ex: 'I reckon so.' },
  { word: 'heaps', means: 'a lot', ml: 'ധാരാളം', ex: 'Thanks heaps!' },
  { word: 'stoked', means: 'very happy', ml: 'വളരെ സന്തോഷം', ex: "I'm stoked I got the job." },
  { word: 'servo', means: 'petrol station', ml: 'പെട്രോൾ പമ്പ്', ex: "I'll stop at the servo." },
  { word: 'bottle-o', means: 'liquor shop', ml: 'മദ്യക്കട', ex: 'The bottle-o is next to Woolies.' },
  { word: 'chemist', means: 'pharmacy', ml: 'മെഡിക്കൽ ഷോപ്പ്', ex: "I'm going to the chemist." },
  { word: 'crook', means: 'sick', ml: 'സുഖമില്ലാത്ത', ex: "I'm feeling crook today." },
  { word: 'smoko', means: 'short break at work', ml: 'ചെറിയ ഇടവേള', ex: "Let's have smoko." },
  { word: 'shout', means: 'pay for others', ml: 'മറ്റുള്ളവർക്ക് ചെലവ് ചെയ്യുക', ex: "Coffee's my shout." },
  { word: 'ute', means: 'pickup truck', ml: 'പിക്കപ്പ് വണ്ടി', ex: 'Chuck it in the back of the ute.' },
  { word: 'thongs', means: 'flip-flops', ml: 'ഹവായ് ചെരുപ്പ്', ex: "Don't wear thongs on site." },
  { word: 'esky', means: 'cool box', ml: 'കൂൾ ബോക്സ്', ex: 'Put the drinks in the esky.' },
  { word: 'mozzie', means: 'mosquito', ml: 'കൊതുക്', ex: 'The mozzies are bad tonight.' },
  { word: 'sunnies', means: 'sunglasses', ml: 'കൂളിംഗ് ഗ്ലാസ്', ex: "Don't forget your sunnies." },
  { word: 'Maccas', means: "McDonald's", ml: 'മക്ഡൊണാൾഡ്സ്', ex: "Let's get Maccas." },
  { word: 'Woolies', means: 'Woolworths supermarket', ml: 'വൂൾവർത്ത്സ് സൂപ്പർമാർക്കറ്റ്', ex: "I'm off to Woolies." },
  { word: 'rego', means: 'vehicle registration', ml: 'വാഹന രജിസ്ട്രേഷൻ', ex: 'My rego is due next month.' },
  { word: 'tradie', means: 'tradesperson', ml: 'പ്ലംബർ, ഇലക്ട്രീഷ്യൻ പോലുള്ളവർ', ex: 'The tradie is coming at nine.' },
  { word: 'uni', means: 'university', ml: 'യൂണിവേഴ്സിറ്റി', ex: 'She studies at uni.' },
  { word: 'barbie', means: 'barbecue', ml: 'ബാർബിക്യൂ', ex: "We're having a barbie on Sunday." },
  { word: 'footy', means: 'football (AFL / rugby)', ml: 'ഫുട്ബോൾ (AFL / റഗ്ബി)', ex: 'Are you watching the footy?' },
  { word: 'chook', means: 'chicken', ml: 'കോഴി', ex: 'We keep chooks in the backyard.' },
  { word: 'dunny', means: 'toilet', ml: 'ടോയ്‌ലറ്റ്', ex: "Where's the dunny?" },
  { word: 'fair dinkum', means: 'genuine, true', ml: 'സത്യം, യഥാർത്ഥം', ex: "He's a fair dinkum Aussie." },
  { word: 'no worries', means: 'no problem', ml: 'കുഴപ്പമില്ല', ex: 'No worries, mate.' }
];

const TIPS = [
  { icon: '🙋', title: 'First names, not "Sir"', ml: 'ബോസിനെയും മാനേജരെയും പേര് വിളിച്ചാൽ മതി. "Sir", "Madam" എന്ന് വിളിക്കുന്നത് ഇവിടെ അസ്വാഭാവികമായി തോന്നും.' },
  { icon: '💬', title: '"How ya going?" is just hello', ml: 'ഇത് ആരോഗ്യവിവരം അറിയാനുള്ള ചോദ്യമല്ല, വെറും അഭിവാദ്യമാണ്. "Good thanks, you?" എന്ന് ചുരുക്കി മറുപടി പറയുക.' },
  { icon: '🙏', title: 'Please, thanks, sorry', ml: '"Please", "Thanks", "Sorry" ധാരാളം ഉപയോഗിക്കുക. "Give me..." എന്നതിന് പകരം "Can I get..., please?" എന്ന് പറയുക.' },
  { icon: '⏰', title: 'Be on time', ml: 'ജോലിക്കും അപ്പോയിന്റ്മെന്റിനും കൃത്യസമയം വളരെ പ്രധാനമാണ്. വൈകുമെങ്കിൽ മുൻകൂട്ടി മെസ്സേജ് അയക്കുക.' },
  { icon: '🍺', title: 'Shouting a round', ml: 'കൂട്ടുകാർ ഓരോരുത്തരായി എല്ലാവർക്കും ഡ്രിങ്ക് വാങ്ങും. നിങ്ങളുടെ ഊഴം വരുമ്പോൾ നിങ്ങളും വാങ്ങണം (മദ്യം കഴിക്കാത്തവർക്ക് സോഫ്റ്റ് ഡ്രിങ്ക് മതി).' },
  { icon: '🍽️', title: '"Bring a plate"', ml: 'കാലി പ്ലേറ്റ് അല്ല - എല്ലാവർക്കും പങ്കിടാൻ ഒരു വിഭവം കൊണ്ടുവരണം എന്നാണ് അർത്ഥം. BYO = Bring Your Own (ഡ്രിങ്ക്സ് സ്വന്തമായി കൊണ്ടുവരിക).' },
  { icon: '💵', title: 'Tipping is optional', ml: 'ഓസ്ട്രേലിയയിൽ ടിപ്പ് നിർബന്ധമില്ല. ജീവനക്കാർക്ക് നിയമപ്രകാരം മിനിമം വേതനം ഉണ്ട്.' },
  { icon: '😄', title: 'Aussie humour', ml: 'ഓസികൾ പലപ്പോഴും കളിയാക്കി സംസാരിക്കും ("taking the mickey"). മിക്കപ്പോഴും അത് സൗഹൃദത്തിന്റെ ലക്ഷണമാണ്, അപമാനമല്ല.' },
  { icon: '🚶', title: 'Wait your turn', ml: 'ക്യൂവിൽ നിൽക്കുക, ഇടയ്ക്ക് കയറരുത്. ബസിൽ കയറുമ്പോൾ ഡ്രൈവറോട് "Thanks" പറയുന്നതും ഇവിടത്തെ ശീലമാണ്.' },
  { icon: '📅', title: 'Dates: day / month / year', ml: 'തീയതി എഴുതുന്നത് ദിവസം / മാസം / വർഷം ക്രമത്തിലാണ് (ഉദാ: 30/10/2026). ഫോമുകൾ പൂരിപ്പിക്കുമ്പോൾ ശ്രദ്ധിക്കുക.' },
  { icon: '🚨', title: 'Emergency: 000', ml: 'പോലീസ്, ആംബുലൻസ്, ഫയർ - അടിയന്തര സാഹചര്യത്തിൽ 000 ("triple zero") വിളിക്കുക.' },
  { icon: '☀️', title: 'Slip, slop, slap', ml: 'ഇവിടത്തെ വെയിൽ വളരെ ശക്തമാണ്. പുറത്ത് ജോലി ചെയ്യുമ്പോൾ സൺസ്ക്രീൻ, തൊപ്പി, കൂളിംഗ് ഗ്ലാസ് ഉപയോഗിക്കുക.' }
];

/* Sound drills for the sounds Malayali speakers most often find hard. ipa: the sounds (in the
   American IPA that Azure reports) this drill trains, used to spot them in any practice. */
const SOUNDS = [
  { id: 'vw', title: 'V and W', ipa: ['v', 'w'],
    tip: 'For V, touch your top teeth to your bottom lip and buzz. For W, round your lips as if saying "oo" - no teeth.',
    ml: 'V: മേൽപ്പല്ല് താഴത്തെ ചുണ്ടിൽ തൊട്ട് ശബ്ദമുണ്ടാക്കുക. W: പല്ല് തൊടാതെ ചുണ്ടുകൾ "ഊ" പോലെ ഉരുട്ടുക.',
    pairs: [['vet', 'wet'], ['vine', 'wine'], ['vest', 'west'], ['veil', 'whale']],
    sentences: ['We visited the ward very early.', 'Would you like a warm vegetable soup?'] },
  { id: 'th', title: 'TH as in "think"', ipa: ['θ'],
    tip: 'Put the tip of your tongue lightly between your teeth and blow air out. It is not a "t".',
    ml: 'നാക്കിന്റെ അറ്റം പല്ലുകൾക്കിടയിൽ വെച്ച് കാറ്റ് ഊതുക. "ട" അല്ല.',
    pairs: [['thin', 'tin'], ['three', 'tree'], ['thank', 'tank'], ['thought', 'taught']],
    sentences: ['I think three therapists are on shift on Thursday.', 'Thanks for your thoughtful feedback.'] },
  { id: 'dh', title: 'TH as in "this"', ipa: ['ð'],
    tip: 'The same tongue position as "think", but switch your voice on so it buzzes. It is not a "d".',
    ml: '"think"-ലെ പോലെ നാക്ക് വെക്കുക, പക്ഷേ ശബ്ദത്തോടെ മുഴക്കി പറയുക. "ഡ" അല്ല.',
    pairs: [['they', 'day'], ['then', 'den'], ['though', 'dough'], ['breathe', 'breed']],
    sentences: ['The other nurse is there with them.', 'Is this the father or the brother?'] },
  { id: 'z', title: 'The Z sound', ipa: ['z'],
    tip: 'Z is a buzzing S. Keep your tongue behind your top teeth - do not turn it into a "j".',
    ml: 'Z എന്നത് മുഴക്കമുള്ള S ആണ്. "ജ" ആക്കരുത്.',
    pairs: [['zip', 'sip'], ['zeal', 'seal'], ['prize', 'price'], ['buzz', 'bus']],
    sentences: ['These busy days are easy to organise.', 'Please close the zip on the bag.'] },
  { id: 'fp', title: 'F and P', ipa: ['f', 'p'],
    tip: 'For F, rest your top teeth on your bottom lip and blow. For P, close both lips and pop the air out.',
    ml: 'F: മേൽപ്പല്ല് താഴത്തെ ചുണ്ടിൽ വെച്ച് ഊതുക. P: രണ്ട് ചുണ്ടും അടച്ച് പൊട്ടിക്കുക.',
    pairs: [['fan', 'pan'], ['fine', 'pine'], ['fast', 'past'], ['coffee', 'copy']],
    sentences: ['Fill in the form before the family arrives.', 'The coffee from the cafe is perfect.'] },
  { id: 'ii', title: 'Short "i" and long "ee"', ipa: ['ɪ', 'i'],
    tip: '"ship" is short and relaxed. "sheep" is long, with your lips spread in a smile. Hold the long one longer.',
    ml: '"ship" ചെറുതും അയഞ്ഞതും. "sheep" നീട്ടി, ചിരിക്കുന്നതുപോലെ ചുണ്ട് വിടർത്തി.',
    pairs: [['ship', 'sheep'], ['live', 'leave'], ['fill', 'feel'], ['sit', 'seat']],
    sentences: ['Please fill in the sheet before you leave.', 'Did he eat the meat at six?'] },
  { id: 'ae', title: 'The "a" in "bad"', ipa: ['æ'],
    tip: 'Open your mouth wide and drop your jaw: "bad", not "bed".',
    ml: 'വായ നന്നായി തുറന്ന് താടി താഴ്ത്തുക: "bad", "bed" അല്ല.',
    pairs: [['bad', 'bed'], ['man', 'men'], ['pan', 'pen'], ['sat', 'set']],
    sentences: ['The man had a bad back.', 'Can you pass me that black bag?'] },
  { id: 'end', title: 'Word endings', ipa: [],
    tip: 'Say the last sound clearly: "asked" ends in "skt" and "jobs" ends in "bz". Do not drop it.',
    ml: 'വാക്കിന്റെ അവസാന ശബ്ദം വ്യക്തമായി പറയുക. "asked", "jobs" എന്നിവയുടെ അവസാനം കളയരുത്.',
    pairs: [['ask', 'asked'], ['job', 'jobs'], ['help', 'helped'], ['month', 'months']],
    sentences: ['She asked about the jobs last month.', 'He helped two patients and checked their files.'] }
];

/* Speaking level test: read three sentences aloud, then answer three questions. */
const LEVEL_TEST = {
  read: [
    'I have been working as a nurse for several years.',
    'The weather in Queensland is usually warm and sunny.',
    'Could you please explain the new process to the whole team?'
  ],
  questions: [
    'Tell me a little about yourself and the work you do.',
    'Describe a difficult situation you handled well. What happened, and what did you do?',
    'What do you enjoy about living in Australia, or what are you looking forward to?'
  ]
};
