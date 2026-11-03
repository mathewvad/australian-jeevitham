/* British English content: shown instead of the Australian lessons, slang, culture tips, listening
   clips and "everyday life" words when a learner chooses British English. Each text has its
   Malayalam (ml), Hindi (hi) and Tamil (ta) version. The app picks a pack with pack() in app.js;
   Indian English will add CONTENT_PACKS.in the same way. */

const CONTENT_PACKS = {};

CONTENT_PACKS.uk = {
  // ---- Interview preparation and the IELTS / OET guides ----
  interview: {
    roles: ['Registered Nurse (Band 5)', 'Senior Staff Nurse / Sister (Band 6)', 'Healthcare Assistant (HCA)', 'Care worker / Senior carer', 'Ward Manager (Band 7)', 'Other healthcare role'],
    tips: {
      'Know the key frameworks': 'The NHS values and the NHS Constitution, the NMC Code, the CQC fundamental standards, SBAR handover and the duty of candour. Mention them naturally in your answers.'
    },
    models: {
      'about:0': "I'm a Registered Nurse with six years' experience, mostly in medical and elderly care wards. I started my career in Kochi, and for the last two years I've worked on a busy medical ward at an NHS trust in Birmingham, where I often act as nurse in charge. I'm known for staying calm when things get busy and for clear communication with families. I'm now looking for a Band 6 role where I can keep building my leadership skills, and your ward's focus on falls prevention really matches my interests."
    }
  },
  guides: {
    'What you need for AHPRA': { t: 'What you need for the NMC', d: 'For nurse and midwife registration in the UK, the NMC accepts IELTS Academic (or IELTS for UKVI) with <b>7.0 overall, at least 7.0 in Listening, Reading and Speaking and 6.5 in Writing</b>. OET grade B (C+ in Writing) is also accepted. For a visa you may also need a UKVI test - always check the latest rules on the NMC and GOV.UK websites.' },
    'Grades and what AHPRA needs': { t: 'Grades and what the NMC needs', d: 'Scores are reported from 0 to 500. <b>A</b> = 450-500, <b>B</b> = 350-440, <b>C+</b> = 300-340, <b>C</b> = 200-290, <b>D</b> = 100-190, <b>E</b> = 0-90. For UK nurse registration, the NMC needs at least <b>grade B in Listening, Reading and Speaking and C+ in Writing</b> - always check the latest rules on the NMC website.' }
  },

  // ---- Everyday lessons ----
  lessons: [
    { id: 'uk_greetings', icon: '👋', title: 'British Greetings & Slang', ml: 'ബ്രിട്ടീഷ് അഭിവാദ്യങ്ങളും സ്ലാംഗും', hi: 'ब्रिटिश अभिवादन और बोलचाल के शब्द', ta: 'பிரிட்டிஷ் வாழ்த்துகளும் பேச்சுவழக்குச் சொற்களும்', phrases: [
      { en: 'Hiya, you all right?', ml: 'ഹായ്, സുഖമാണോ?', hi: 'हाय, आप ठीक हैं?', ta: 'ஹாய், நல்லா இருக்கீங்களா?',
        tip: '"You all right?" എന്നത് വെറും അഭിവാദ്യമാണ്. "Yeah, good thanks, you?" എന്ന് മറുപടി പറഞ്ഞാൽ മതി.', tip_hi: '"You all right?" बस अभिवादन है। जवाब दें: "Yeah, good thanks, you?"', tip_ta: '"You all right?" என்பது வெறும் வாழ்த்து. "Yeah, good thanks, you?" என்று பதில் சொன்னால் போதும்.' },
      { en: 'Cheers, mate.', ml: 'നന്ദി, സുഹൃത്തേ.', hi: 'धन्यवाद, दोस्त।', ta: 'நன்றி, நண்பா.',
        tip: 'ബ്രിട്ടനിൽ "Cheers" എന്നാൽ "Thanks" ആണ്.', tip_hi: 'ब्रिटेन में "Cheers" का मतलब "Thanks" है।', tip_ta: 'பிரிட்டனில் "Cheers" என்றால் "Thanks".' },
      { en: 'Fancy a cuppa?', ml: 'ഒരു ചായ കുടിക്കുന്നോ?', hi: 'एक कप चाय पिएँगे?', ta: 'ஒரு கப் டீ குடிக்கலாமா?' },
      { en: "I'm knackered.", ml: 'ഞാൻ ആകെ ക്ഷീണിച്ചു.', hi: 'मैं बहुत थक गया/गई हूँ।', ta: 'நான் மிகவும் களைத்துவிட்டேன்.' },
      { en: "That's brilliant!", ml: 'അത് ഗംഭീരം!', hi: 'यह तो बहुत बढ़िया है!', ta: 'அது அருமை!' },
      { en: 'Sorry, could you say that again?', ml: 'ക്ഷമിക്കണം, ഒന്നുകൂടി പറയാമോ?', hi: 'माफ़ कीजिए, क्या आप फिर से कह सकते हैं?', ta: 'மன்னிக்கவும், மீண்டும் சொல்ல முடியுமா?' },
      { en: 'See you later.', ml: 'പിന്നെ കാണാം.', hi: 'बाद में मिलते हैं।', ta: 'பிறகு பார்க்கலாம்.' }
    ] },
    { id: 'uk_travel', icon: '✈️', title: 'Airport & Getting Around', ml: 'എയർപോർട്ടും യാത്രയും', hi: 'हवाई अड्डा और आना-जाना', ta: 'விமான நிலையமும் பயணமும்', phrases: [
      { en: "I'm here on a Health and Care Worker visa.", ml: 'ഞാൻ ഹെൽത്ത് ആൻഡ് കെയർ വർക്കർ വിസയിലാണ് വന്നത്.', hi: 'मैं हेल्थ एंड केयर वर्कर वीज़ा पर आया/आई हूँ।', ta: 'நான் ஹெல்த் அண்ட் கேர் வொர்க்கர் விசாவில் வந்திருக்கிறேன்.',
        tip: 'NHS-ൽ ജോലിക്ക് വരുന്ന നഴ്സുമാർക്ക് സാധാരണ ഈ വിസയാണ്.', tip_hi: 'NHS में काम करने आने वाली नर्सों को आमतौर पर यही वीज़ा मिलता है।', tip_ta: 'NHS-இல் வேலைக்கு வரும் செவிலியர்களுக்குப் பொதுவாக இந்த விசா.' },
      { en: 'A single to London, please.', ml: 'ലണ്ടനിലേക്ക് ഒരു വൺവേ ടിക്കറ്റ്, പ്ലീസ്.', hi: 'लंदन का एक तरफ़ का टिकट, प्लीज़।', ta: 'லண்டனுக்கு ஒரு வழி டிக்கெட், தயவுசெய்து.',
        tip: 'single = വൺവേ ടിക്കറ്റ്, return = പോയി വരാനുള്ള ടിക്കറ്റ്.', tip_hi: 'single = एक तरफ़ का टिकट, return = आने-जाने का टिकट।', tip_ta: 'single = ஒரு வழி டிக்கெட், return = போய் வரும் டிக்கெட்.' },
      { en: 'Which platform does the train leave from?', ml: 'ട്രെയിൻ ഏത് പ്ലാറ്റ്ഫോമിൽ നിന്നാണ് പുറപ്പെടുന്നത്?', hi: 'ट्रेन किस प्लेटफ़ॉर्म से जाती है?', ta: 'ரயில் எந்த நடைமேடையிலிருந்து புறப்படும்?' },
      { en: 'Does this bus go to the hospital?', ml: 'ഈ ബസ് ആശുപത്രിയിലേക്ക് പോകുമോ?', hi: 'क्या यह बस अस्पताल जाती है?', ta: 'இந்தப் பேருந்து மருத்துவமனைக்குப் போகுமா?' },
      { en: 'Can I pay by card?', ml: 'കാർഡ് വഴി പണം കൊടുക്കാമോ?', hi: 'क्या मैं कार्ड से पैसे दे सकता/सकती हूँ?', ta: 'கார்டு மூலம் பணம் செலுத்தலாமா?' },
      { en: "Where's the nearest Tube station?", ml: 'ഏറ്റവും അടുത്ത ട്യൂബ് (മെട്രോ) സ്റ്റേഷൻ എവിടെയാണ്?', hi: 'सबसे पास का ट्यूब (मेट्रो) स्टेशन कहाँ है?', ta: 'அருகிலுள்ள டியூப் (மெட்ரோ) நிலையம் எங்கே?',
        tip: 'the Tube = ലണ്ടനിലെ ഭൂഗർഭ മെട്രോ.', tip_hi: 'the Tube = लंदन की ज़मीन के नीचे चलने वाली मेट्रो।', tip_ta: 'the Tube = லண்டனின் சுரங்க மெட்ரோ.' },
      { en: 'Is this seat taken?', ml: 'ഈ സീറ്റിൽ ആരെങ്കിലും ഉണ്ടോ?', hi: 'क्या इस सीट पर कोई बैठा है?', ta: 'இந்த இருக்கையில் யாராவது இருக்கிறார்களா?' }
    ] },
    { id: 'uk_shops', icon: '🛒', title: 'Shops & the High Street', ml: 'കടകളും ഹൈ സ്ട്രീറ്റും', hi: 'दुकानें और हाई स्ट्रीट', ta: 'கடைகளும் ஹை ஸ்ட்ரீட்டும்', phrases: [
      { en: 'Could I have a latte, please?', ml: 'ഒരു ലാറ്റെ തരാമോ, പ്ലീസ്?', hi: 'क्या मुझे एक लाटे मिल सकती है, प्लीज़?', ta: 'ஒரு லாட்டே கிடைக்குமா, தயவுசெய்து?' },
      { en: 'Eat in or take away?', ml: 'ഇവിടെ ഇരുന്ന് കഴിക്കുമോ അതോ കൊണ്ടുപോകുമോ?', hi: 'यहीं खाएँगे या पैक करके ले जाएँगे?', ta: 'இங்கே சாப்பிடுவீர்களா, எடுத்துச் செல்வீர்களா?' },
      { en: 'Do you need a carrier bag?', ml: 'ക്യാരി ബാഗ് വേണോ?', hi: 'क्या आपको थैला चाहिए?', ta: 'உங்களுக்குப் பை வேண்டுமா?',
        tip: 'ബാഗിന് സാധാരണ പണം കൊടുക്കണം - സ്വന്തം ബാഗ് കൊണ്ടുപോകുക.', tip_hi: 'थैले के आमतौर पर पैसे लगते हैं - अपना थैला साथ रखें।', tip_ta: 'பைக்குப் பொதுவாகப் பணம் கேட்பார்கள் - சொந்தப் பையைக் கொண்டு செல்லுங்கள்.' },
      { en: 'Is this on offer?', ml: 'ഇതിന് ഓഫർ ഉണ്ടോ?', hi: 'क्या इस पर ऑफ़र है?', ta: 'இதற்குச் சலுகை உள்ளதா?' },
      { en: "Where's the queue?", ml: 'ക്യൂ എവിടെയാണ്?', hi: 'लाइन कहाँ है?', ta: 'வரிசை எங்கே?',
        tip: 'queue = വരി. ബ്രിട്ടീഷുകാർ ക്യൂവിൽ നിൽക്കുന്നത് വളരെ പ്രധാനമായി കാണുന്നു.', tip_hi: 'queue = लाइन। ब्रिटिश लोग लाइन में लगने को बहुत महत्व देते हैं।', tip_ta: 'queue = வரிசை. பிரிட்டிஷ் மக்கள் வரிசையில் நிற்பதை மிக முக்கியமாகக் கருதுகிறார்கள்.' },
      { en: 'Could I get a receipt, please?', ml: 'രസീത് തരാമോ, പ്ലീസ്?', hi: 'क्या मुझे रसीद मिल सकती है, प्लीज़?', ta: 'ரசீது கிடைக்குமா, தயவுசெய்து?' },
      { en: "I'd like to return this, please.", ml: 'ഇത് തിരിച്ചു കൊടുക്കണം, പ്ലീസ്.', hi: 'मैं इसे वापस करना चाहता/चाहती हूँ, प्लीज़।', ta: 'இதைத் திருப்பிக் கொடுக்க விரும்புகிறேன், தயவுசெய்து.' }
    ] },
    { id: 'uk_renting', icon: '🏠', title: 'Renting a Flat', ml: 'ഫ്ലാറ്റ് വാടകയ്ക്ക് എടുക്കാം', hi: 'फ़्लैट किराए पर लेना', ta: 'அடுக்குமாடி வீடு வாடகைக்கு', phrases: [
      { en: 'Is the flat still available?', ml: 'ഫ്ലാറ്റ് ഇപ്പോഴും ഒഴിവുണ്ടോ?', hi: 'क्या फ़्लैट अभी भी खाली है?', ta: 'அந்த வீடு இன்னும் கிடைக்குமா?' },
      { en: 'How much is the rent per month?', ml: 'മാസവാടക എത്രയാണ്?', hi: 'महीने का किराया कितना है?', ta: 'மாத வாடகை எவ்வளவு?',
        tip: 'ബ്രിട്ടനിൽ വാടക സാധാരണ മാസക്കണക്കിലാണ് (pcm = per calendar month).', tip_hi: 'ब्रिटेन में किराया आमतौर पर महीने के हिसाब से होता है (pcm = per calendar month)।', tip_ta: 'பிரிட்டனில் வாடகை பொதுவாக மாதக் கணக்கில் (pcm = per calendar month).' },
      { en: 'Are bills included?', ml: 'ബില്ലുകൾ (വൈദ്യുതി, ഗ്യാസ്, വെള്ളം) വാടകയിൽ ഉൾപ്പെടുമോ?', hi: 'क्या बिल (बिजली, गैस, पानी) किराए में शामिल हैं?', ta: 'கட்டணங்கள் (மின்சாரம், எரிவாயு, தண்ணீர்) வாடகையில் அடங்குமா?' },
      { en: 'How much is the deposit?', ml: 'ഡെപ്പോസിറ്റ് എത്രയാണ്?', hi: 'डिपॉज़िट कितना है?', ta: 'முன்பணம் எவ்வளவு?' },
      { en: 'Which council tax band is it?', ml: 'ഇത് ഏത് കൗൺസിൽ ടാക്സ് ബാൻഡിലാണ്?', hi: 'यह किस काउंसिल टैक्स बैंड में है?', ta: 'இது எந்த கவுன்சில் வரி பிரிவில் உள்ளது?',
        tip: 'council tax = പ്രാദേശിക ഭരണകൂടത്തിന് വീട്ടുകാർ നൽകുന്ന നികുതി.', tip_hi: 'council tax = स्थानीय प्रशासन को घर के लिए दिया जाने वाला टैक्स।', tip_ta: 'council tax = உள்ளூர் நிர்வாகத்துக்கு வீட்டுக்காகச் செலுத்தும் வரி.' },
      { en: "The boiler isn't working.", ml: 'ബോയിലർ (ചൂടുവെള്ളവും ഹീറ്റിംഗും) പ്രവർത്തിക്കുന്നില്ല.', hi: 'बॉयलर (गरम पानी और हीटिंग) काम नहीं कर रहा है।', ta: 'பாய்லர் (வெந்நீர், வெப்பமூட்டி) வேலை செய்யவில்லை.' },
      { en: 'Could you send someone to fix it?', ml: 'ഇത് ശരിയാക്കാൻ ആരെയെങ്കിലും അയക്കാമോ?', hi: 'क्या आप इसे ठीक करने के लिए किसी को भेज सकते हैं?', ta: 'இதைச் சரிசெய்ய யாரையாவது அனுப்ப முடியுமா?' }
    ] },
    { id: 'uk_gp', icon: '🩺', title: 'At the GP (NHS)', ml: 'GP-യുടെ അടുത്ത് (NHS)', hi: 'GP के पास (NHS)', ta: 'GP-யிடம் (NHS)', phrases: [
      { en: "I'd like to register with the surgery.", ml: 'ഈ ക്ലിനിക്കിൽ (സർജറി) രജിസ്റ്റർ ചെയ്യണം.', hi: 'मुझे इस क्लिनिक (सर्जरी) में रजिस्टर करना है।', ta: 'இந்த மருத்துவமனையில் (சர்ஜரி) பதிவு செய்ய வேண்டும்.',
        tip: 'ബ്രിട്ടനിൽ GP ക്ലിനിക്കിനെ "surgery" എന്ന് വിളിക്കും.', tip_hi: 'ब्रिटेन में GP क्लिनिक को "surgery" कहते हैं।', tip_ta: 'பிரிட்டனில் GP மருத்துவமனையை "surgery" என்று அழைப்பார்கள்.' },
      { en: "I'd like to book an appointment, please.", ml: 'ഒരു അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യണം, പ്ലീസ്.', hi: 'मुझे एक अपॉइंटमेंट बुक करनी है, प्लीज़।', ta: 'ஒரு சந்திப்பு நேரம் பதிவு செய்ய வேண்டும், தயவுசெய்து.' },
      { en: "I've had a temperature since Monday.", ml: 'തിങ്കളാഴ്ച മുതൽ എനിക്ക് പനിയുണ്ട്.', hi: 'मुझे सोमवार से बुखार है।', ta: 'திங்கள் முதல் எனக்குக் காய்ச்சல்.' },
      { en: "I'm feeling a bit under the weather.", ml: 'എനിക്ക് ചെറിയ സുഖക്കുറവുണ്ട്.', hi: 'मेरी तबीयत थोड़ी ठीक नहीं है।', ta: 'எனக்குக் கொஞ்சம் உடம்பு சரியில்லை.' },
      { en: 'Do I need to pay for the prescription?', ml: 'മരുന്നിന് (പ്രിസ്ക്രിപ്ഷൻ) പണം കൊടുക്കണോ?', hi: 'क्या मुझे दवा के पर्चे के पैसे देने होंगे?', ta: 'மருந்துச் சீட்டுக்கு நான் பணம் செலுத்த வேண்டுமா?' },
      { en: "Where's the nearest pharmacy?", ml: 'ഏറ്റവും അടുത്ത ഫാർമസി എവിടെയാണ്?', hi: 'सबसे पास की फ़ार्मेसी कहाँ है?', ta: 'அருகிலுள்ள மருந்தகம் எங்கே?' },
      { en: 'Call 999!', ml: '999 വിളിക്കൂ!', hi: '999 पर कॉल करो!', ta: '999 அழையுங்கள்!',
        tip: 'അടിയന്തരമെങ്കിൽ 999. അടിയന്തരമല്ലാത്ത ആരോഗ്യപ്രശ്നങ്ങൾക്ക് NHS 111.', tip_hi: 'आपात स्थिति में 999। ज़रूरी लेकिन आपात नहीं, ऐसी समस्याओं के लिए NHS 111।', tip_ta: 'அவசரத்துக்கு 999. அவசரமில்லாத உடல்நலப் பிரச்சனைகளுக்கு NHS 111.' }
    ] },
    { id: 'uk_interview', icon: '💼', title: 'Job Interview (NHS)', ml: 'ജോലി ഇന്റർവ്യൂ (NHS)', hi: 'नौकरी का इंटरव्यू (NHS)', ta: 'வேலை நேர்காணல் (NHS)', phrases: [
      { en: 'Tell us a bit about yourself.', ml: 'നിങ്ങളെക്കുറിച്ച് കുറച്ച് പറയൂ.', hi: 'अपने बारे में थोड़ा बताइए।', ta: 'உங்களைப் பற்றிக் கொஞ்சம் சொல்லுங்கள்.' },
      { en: "I've worked as a staff nurse for five years.", ml: 'ഞാൻ അഞ്ച് വർഷമായി സ്റ്റാഫ് നഴ്സായി ജോലി ചെയ്യുന്നു.', hi: 'मैं पाँच साल से स्टाफ़ नर्स के रूप में काम कर रहा/रही हूँ।', ta: 'நான் ஐந்து ஆண்டுகளாக ஸ்டாஃப் நர்ஸாக வேலை செய்கிறேன்.' },
      { en: 'Why do you want to work for this trust?', ml: 'എന്തുകൊണ്ടാണ് ഈ NHS ട്രസ്റ്റിൽ ജോലി ചെയ്യാൻ ആഗ്രഹിക്കുന്നത്?', hi: 'आप इस NHS ट्रस्ट में क्यों काम करना चाहते हैं?', ta: 'இந்த NHS டிரஸ்டில் ஏன் வேலை செய்ய விரும்புகிறீர்கள்?',
        tip: 'trust = ആശുപത്രികൾ നടത്തുന്ന NHS സ്ഥാപനം.', tip_hi: 'trust = अस्पताल चलाने वाली NHS संस्था।', tip_ta: 'trust = மருத்துவமனைகளை நடத்தும் NHS அமைப்பு.' },
      { en: 'Could you repeat the question, please?', ml: 'ചോദ്യം ഒന്നുകൂടി പറയാമോ, പ്ലീസ്?', hi: 'क्या आप सवाल फिर से बता सकते हैं, प्लीज़?', ta: 'தயவுசெய்து கேள்வியை மீண்டும் சொல்ல முடியுமா?' },
      { en: "I'm a quick learner and a good team player.", ml: 'ഞാൻ വേഗം പഠിക്കുന്നയാളും നല്ല ടീം അംഗവുമാണ്.', hi: 'मैं जल्दी सीखता/सीखती हूँ और टीम में अच्छा काम करता/करती हूँ।', ta: 'நான் விரைவாகக் கற்றுக்கொள்வேன், குழுவில் நன்றாக வேலை செய்வேன்.' },
      { en: 'What would a typical shift look like?', ml: 'ഒരു സാധാരണ ഷിഫ്റ്റ് എങ്ങനെയായിരിക്കും?', hi: 'एक आम शिफ़्ट कैसी होगी?', ta: 'ஒரு சாதாரண ஷிப்ட் எப்படி இருக்கும்?' },
      { en: 'Thank you for your time.', ml: 'നിങ്ങളുടെ സമയത്തിന് നന്ദി.', hi: 'आपके समय के लिए धन्यवाद।', ta: 'உங்கள் நேரத்துக்கு நன்றி.' }
    ] },
    { id: 'uk_work', icon: '🧑‍⚕️', title: 'At Work', ml: 'ജോലിസ്ഥലത്ത്', hi: 'काम पर', ta: 'வேலையில்', phrases: [
      { en: 'Morning! Did you have a good weekend?', ml: 'ഗുഡ് മോണിംഗ്! വീക്കെൻഡ് നന്നായിരുന്നോ?', hi: 'सुप्रभात! आपका वीकेंड अच्छा रहा?', ta: 'காலை வணக்கம்! வார இறுதி நன்றாக இருந்ததா?' },
      { en: 'Shall I put the kettle on?', ml: 'ഞാൻ ചായ ഇടട്ടെ?', hi: 'क्या मैं चाय बना दूँ?', ta: 'நான் டீ போடட்டுமா?',
        tip: 'ബ്രിട്ടീഷ് ജോലിസ്ഥലങ്ങളിൽ എല്ലാവർക്കും ചായ ഉണ്ടാക്കിക്കൊടുക്കുന്നത് സൗഹൃദത്തിന്റെ ലക്ഷണമാണ്.', tip_hi: 'ब्रिटिश दफ़्तरों में सबके लिए चाय बनाना दोस्ताना व्यवहार माना जाता है।', tip_ta: 'பிரிட்டிஷ் பணியிடங்களில் எல்லோருக்கும் டீ போட்டுக் கொடுப்பது நட்பின் அடையாளம்.' },
      { en: 'Could you give me a hand with this?', ml: 'ഇതിൽ ഒന്ന് സഹായിക്കാമോ?', hi: 'क्या आप इसमें मेरी थोड़ी मदद करेंगे?', ta: 'இதில் எனக்குக் கொஞ்சம் உதவ முடியுமா?' },
      { en: "I'm not sure - could you show me how?", ml: 'എനിക്ക് ഉറപ്പില്ല - എങ്ങനെയാണെന്ന് കാണിച്ചുതരാമോ?', hi: 'मुझे पक्का नहीं पता - क्या आप दिखा सकते हैं कैसे?', ta: 'எனக்குச் சரியாகத் தெரியவில்லை - எப்படி என்று காட்ட முடியுமா?' },
      { en: "I'll crack on with it.", ml: 'ഞാൻ അത് ഉടനെ ചെയ്യാൻ തുടങ്ങാം.', hi: 'मैं अभी इस पर काम शुरू करता/करती हूँ।', ta: 'நான் உடனே அதைத் தொடங்குகிறேன்.',
        tip: 'crack on = വേഗം ജോലി തുടങ്ങുക അല്ലെങ്കിൽ തുടരുക.', tip_hi: 'crack on = जल्दी काम शुरू करना या जारी रखना।', tip_ta: 'crack on = வேலையை விரைவாகத் தொடங்குதல் அல்லது தொடர்தல்.' },
      { en: "Sorry, I'm running a bit late.", ml: 'ക്ഷമിക്കണം, ഞാൻ കുറച്ച് വൈകും.', hi: 'माफ़ कीजिए, मुझे थोड़ी देर हो रही है।', ta: 'மன்னிக்கவும், கொஞ்சம் தாமதமாகிறது.' },
      { en: 'Have a good one!', ml: 'നല്ലൊരു ദിവസം ആശംസിക്കുന്നു!', hi: 'आपका दिन अच्छा हो!', ta: 'உங்கள் நாள் இனிதாக அமையட்டும்!' }
    ] },
    { id: 'uk_phone', icon: '📞', title: 'Phone Calls', ml: 'ഫോൺ കോളുകൾ', hi: 'फ़ोन कॉल', ta: 'தொலைபேசி அழைப்புகள்', phrases: [
      { en: "Hello, I'm ringing about my bank account.", ml: 'ഹലോ, എന്റെ ബാങ്ക് അക്കൗണ്ടിനെക്കുറിച്ചാണ് വിളിക്കുന്നത്.', hi: 'नमस्ते, मैं अपने बैंक खाते के बारे में फ़ोन कर रहा/रही हूँ।', ta: 'வணக்கம், என் வங்கிக் கணக்கு பற்றி அழைக்கிறேன்.',
        tip: 'ബ്രിട്ടനിൽ "call" എന്നതിന് പകരം പലപ്പോഴും "ring" പറയും.', tip_hi: 'ब्रिटेन में "call" की जगह अक्सर "ring" कहते हैं।', tip_ta: 'பிரிட்டனில் "call" என்பதற்குப் பதில் அடிக்கடி "ring" என்று சொல்வார்கள்.' },
      { en: 'Could you speak a bit more slowly, please?', ml: 'കുറച്ചുകൂടി പതുക്കെ സംസാരിക്കാമോ, പ്ലീസ്?', hi: 'क्या आप थोड़ा और धीरे बोल सकते हैं, प्लीज़?', ta: 'தயவுசெய்து இன்னும் கொஞ்சம் மெதுவாகப் பேச முடியுமா?' },
      { en: 'Could you spell that for me?', ml: 'അതിന്റെ സ്പെല്ലിംഗ് പറയാമോ?', hi: 'क्या आप उसकी स्पेलिंग बता सकते हैं?', ta: 'அதன் எழுத்துக்கூட்டலைச் சொல்ல முடியுமா?' },
      { en: 'My postcode is SW1A 1AA.', ml: 'എന്റെ പോസ്റ്റ്കോഡ് SW1A 1AA ആണ്.', hi: 'मेरा पोस्टकोड SW1A 1AA है।', ta: 'என் அஞ்சல் குறியீடு SW1A 1AA.' },
      { en: "Sorry, you're breaking up.", ml: 'ക്ഷമിക്കണം, ശബ്ദം മുറിഞ്ഞുപോകുന്നു.', hi: 'माफ़ कीजिए, आपकी आवाज़ टूट रही है।', ta: 'மன்னிக்கவும், உங்கள் குரல் சரியாகக் கேட்கவில்லை.' },
      { en: 'Can I leave a message?', ml: 'ഒരു സന്ദേശം വെക്കാമോ?', hi: 'क्या मैं संदेश छोड़ सकता/सकती हूँ?', ta: 'நான் ஒரு செய்தி விட்டுச் செல்லலாமா?' },
      { en: "I'll call you back in five minutes.", ml: 'അഞ്ച് മിനിറ്റിനുള്ളിൽ തിരിച്ചു വിളിക്കാം.', hi: 'मैं पाँच मिनट में वापस फ़ोन करता/करती हूँ।', ta: 'ஐந்து நிமிடத்தில் திரும்ப அழைக்கிறேன்.' }
    ] }
  ],

  // ---- Slang ----
  slang: [
    { word: 'cheers', means: 'thanks / goodbye', ex: 'Cheers for your help.', ml: 'നന്ദി / ബൈ', hi: 'धन्यवाद / अलविदा', ta: 'நன்றி / போய் வருகிறேன்' },
    { word: 'mate', means: 'friend', ex: 'Thanks, mate.', ml: 'സുഹൃത്ത്', hi: 'दोस्त', ta: 'நண்பன்' },
    { word: 'brilliant', means: 'excellent', ex: "That's brilliant news!", ml: 'ഗംഭീരം', hi: 'बहुत बढ़िया', ta: 'அருமை' },
    { word: 'knackered', means: 'very tired', ex: "I'm knackered after that night shift.", ml: 'ആകെ ക്ഷീണിച്ച', hi: 'बहुत थका हुआ', ta: 'மிகவும் களைப்பாக' },
    { word: 'cuppa', means: 'a cup of tea', ex: 'Fancy a cuppa?', ml: 'ഒരു കപ്പ് ചായ', hi: 'एक कप चाय', ta: 'ஒரு கப் டீ' },
    { word: 'brew', means: 'a cup of tea', ex: "Let's have a brew.", ml: 'ചായ', hi: 'चाय', ta: 'டீ' },
    { word: 'queue', means: 'a line of people', ex: 'Please join the queue.', ml: 'വരി', hi: 'लाइन, कतार', ta: 'வரிசை' },
    { word: 'loo', means: 'toilet', ex: "Where's the loo?", ml: 'ടോയ്ലറ്റ്', hi: 'शौचालय', ta: 'கழிவறை' },
    { word: 'quid', means: 'pound (money)', ex: 'It cost twenty quid.', ml: 'പൗണ്ട് (പണം)', hi: 'पाउंड (पैसा)', ta: 'பவுண்ட் (பணம்)' },
    { word: 'fancy', means: 'want / would like', ex: 'Do you fancy lunch?', ml: 'ആഗ്രഹിക്കുക', hi: 'चाहना, मन होना', ta: 'விரும்புவது' },
    { word: 'gutted', means: 'very disappointed', ex: 'She was gutted about the result.', ml: 'വല്ലാതെ നിരാശ', hi: 'बहुत निराश', ta: 'மிகவும் ஏமாற்றம்' },
    { word: 'chuffed', means: 'very pleased', ex: "I'm chuffed with my exam result.", ml: 'വളരെ സന്തോഷം', hi: 'बहुत ख़ुश', ta: 'மிகவும் மகிழ்ச்சி' },
    { word: 'skint', means: 'having no money', ex: "I'm skint until payday.", ml: 'കയ്യിൽ പണമില്ലാത്ത', hi: 'जेब ख़ाली', ta: 'கையில் பணமில்லை' },
    { word: 'rubbish', means: 'bad / garbage', ex: "The weather's rubbish today.", ml: 'മോശം / മാലിന്യം', hi: 'बेकार / कचरा', ta: 'மோசம் / குப்பை' },
    { word: 'sorted', means: 'arranged, done', ex: "Don't worry, it's sorted.", ml: 'ശരിയാക്കി', hi: 'हो गया, सुलझ गया', ta: 'சரி செய்யப்பட்டது' },
    { word: 'reckon', means: 'think', ex: "I reckon it'll rain.", ml: 'തോന്നുക', hi: 'लगना, सोचना', ta: 'நினைப்பது' },
    { word: 'fortnight', means: 'two weeks', ex: "I'm off for a fortnight.", ml: 'രണ്ടാഴ്ച', hi: 'दो हफ़्ते', ta: 'இரண்டு வாரம்' },
    { word: 'lift', means: 'elevator; or a ride in a car', ex: 'Take the lift to the third floor.', ml: 'ലിഫ്റ്റ് / വണ്ടിയിൽ കൊണ്ടുപോകൽ', hi: 'लिफ़्ट / किसी को गाड़ी में छोड़ना', ta: 'மின்தூக்கி / வண்டியில் அழைத்துச் செல்வது' },
    { word: 'flat', means: 'apartment', ex: 'I live in a flat near the hospital.', ml: 'ഫ്ലാറ്റ്', hi: 'फ़्लैट', ta: 'அடுக்குமாடி வீடு' },
    { word: 'chips', means: 'thick fried potatoes', ex: 'Fish and chips, please.', ml: 'വറുത്ത ഉരുളക്കിഴങ്ങ്', hi: 'तली हुई आलू की मोटी फाँकें', ta: 'வறுத்த உருளைக்கிழங்கு' },
    { word: 'crisps', means: 'thin potato chips in a packet', ex: 'A packet of crisps, please.', ml: 'പാക്കറ്റ് ചിപ്സ്', hi: 'पैकेट वाले चिप्स', ta: 'பாக்கெட் சிப்ஸ்' },
    { word: 'biscuit', means: 'cookie', ex: 'Tea and a biscuit?', ml: 'ബിസ്കറ്റ്', hi: 'बिस्कुट', ta: 'பிஸ்கட்' },
    { word: 'jumper', means: 'sweater', ex: "Bring a jumper, it's cold.", ml: 'സ്വെറ്റർ', hi: 'स्वेटर', ta: 'ஸ்வெட்டர்' },
    { word: 'trainers', means: 'sports shoes', ex: 'Wear your trainers for the walk.', ml: 'സ്പോർട്സ് ഷൂസ്', hi: 'स्पोर्ट्स जूते', ta: 'விளையாட்டுக் காலணிகள்' },
    { word: 'holiday', means: 'vacation', ex: "I'm on holiday next week.", ml: 'അവധി', hi: 'छुट्टी', ta: 'விடுமுறை' },
    { word: 'bank holiday', means: 'public holiday', ex: 'The surgery is closed on the bank holiday.', ml: 'പൊതു അവധി', hi: 'सार्वजनिक छुट्टी', ta: 'பொது விடுமுறை' },
    { word: 'the Tube', means: 'the London Underground', ex: 'I take the Tube to work.', ml: 'ലണ്ടൻ മെട്രോ', hi: 'लंदन मेट्रो', ta: 'லண்டன் மெட்ரோ' },
    { word: 'A&E', means: 'the emergency department', ex: 'Take him straight to A&E.', ml: 'അത്യാഹിത വിഭാഗം', hi: 'आपातकालीन विभाग', ta: 'அவசர சிகிச்சைப் பிரிவு' },
    { word: 'surgery', means: "a GP's clinic", ex: 'The surgery opens at eight.', ml: 'GP ക്ലിനിക്', hi: 'GP क्लिनिक', ta: 'GP மருத்துவமனை' },
    { word: 'sister', means: 'a senior nurse or ward manager (old-fashioned)', ex: 'Ask Sister on Ward 5.', ml: 'മുതിർന്ന നഴ്സ് / വാർഡ് മാനേജർ', hi: 'वरिष्ठ नर्स / वार्ड मैनेजर', ta: 'மூத்த செவிலியர் / வார்டு மேலாளர்' },
    { word: 'bleep', means: 'a pager; to page a doctor', ex: "I'll bleep the doctor.", ml: 'പേജർ / ഡോക്ടറെ പേജ് ചെയ്യുക', hi: 'पेजर / डॉक्टर को पेज करना', ta: 'பேஜர் / மருத்துவரை அழைத்தல்' },
    { word: 'rota', means: 'a work roster', ex: 'Is the new rota out?', ml: 'ഡ്യൂട്ടി റോസ്റ്റർ', hi: 'ड्यूटी रोस्टर', ta: 'பணி அட்டவணை' },
    { word: 'innit', means: "isn't it (very informal)", ex: "It's cold, innit?", ml: 'അല്ലേ?', hi: 'है ना?', ta: 'இல்லையா?' },
    { word: 'taking the mick', means: 'joking or teasing', ex: 'Are you taking the mick?', ml: 'കളിയാക്കുക', hi: 'मज़ाक़ उड़ाना', ta: 'கேலி செய்வது' },
    { word: 'gobsmacked', means: 'amazed', ex: 'I was gobsmacked by the news.', ml: 'അമ്പരന്നു', hi: 'हैरान', ta: 'வியப்படைந்தேன்' },
    { word: 'cheeky', means: 'slightly rude but funny', ex: 'Cheeky! You ate the last biscuit.', ml: 'കുസൃതി', hi: 'शरारती', ta: 'குறும்பான' },
    { word: 'mind the gap', means: 'be careful of the gap (trains)', ex: 'Mind the gap when you get off.', ml: 'വിടവ് ശ്രദ്ധിക്കുക', hi: 'गैप का ध्यान रखें', ta: 'இடைவெளியைக் கவனியுங்கள்' },
    { word: 'car park', means: 'parking area', ex: 'The car park is behind the hospital.', ml: 'കാർ പാർക്കിംഗ്', hi: 'पार्किंग', ta: 'வாகன நிறுத்துமிடம்' },
    { word: 'postcode', means: 'postal code', ex: "What's your postcode?", ml: 'പോസ്റ്റ്കോഡ്', hi: 'पोस्टकोड, पिन कोड', ta: 'அஞ்சல் குறியீடு' },
    { word: 'takeaway', means: 'food bought to eat at home', ex: 'Shall we get a takeaway tonight?', ml: 'പാഴ്സൽ ഭക്ഷണം', hi: 'पैक करवाया खाना', ta: 'பார்சல் உணவு' }
  ],

  // ---- Culture tips ----
  tips: [
    { icon: '🫖', title: 'Tea solves everything', en: 'Offering to make tea is a kind, friendly gesture at work and at home. Ask "How do you take it?" (milk, sugar).', ml: 'ജോലിസ്ഥലത്തും വീട്ടിലും ചായ ഉണ്ടാക്കിക്കൊടുക്കുന്നത് സ്നേഹത്തിന്റെ ലക്ഷണമാണ്. "How do you take it?" (പാൽ, പഞ്ചസാര) എന്ന് ചോദിക്കുക.', hi: 'काम पर और घर पर चाय बनाने की पेशकश दोस्ताना मानी जाती है। पूछें "How do you take it?" (दूध, चीनी)।', ta: 'வேலையிலும் வீட்டிலும் டீ போட்டுக் கொடுப்பது நட்பின் அடையாளம். "How do you take it?" (பால், சர்க்கரை) என்று கேளுங்கள்.' },
    { icon: '🚶', title: 'Always queue', en: 'Wait your turn in queues - at shops, bus stops and counters. Pushing in is seen as very rude.', ml: 'കടകളിലും ബസ് സ്റ്റോപ്പിലും കൗണ്ടറുകളിലും വരിയിൽ കാത്തുനിൽക്കുക. ഇടയ്ക്ക് കയറുന്നത് വലിയ മര്യാദകേടായി കാണും.', hi: 'दुकानों, बस स्टॉप और काउंटर पर अपनी बारी का इंतज़ार करें। बीच में घुसना बहुत बुरा माना जाता है।', ta: 'கடைகள், பேருந்து நிறுத்தங்கள், கவுண்டர்களில் உங்கள் முறைக்காகக் காத்திருங்கள். இடையில் நுழைவது மிகவும் அநாகரிகமாகக் கருதப்படும்.' },
    { icon: '🙏', title: 'Please, thank you, sorry', en: 'British people say "please", "thank you" and "sorry" all the time - even when someone else bumps into them. Use them often.', ml: 'ബ്രിട്ടീഷുകാർ "please", "thank you", "sorry" എപ്പോഴും പറയും - മറ്റൊരാൾ തട്ടിയാൽ പോലും. നിങ്ങളും ധാരാളം ഉപയോഗിക്കുക.', hi: 'ब्रिटिश लोग हर समय "please", "thank you" और "sorry" कहते हैं - तब भी जब कोई और उनसे टकरा जाए। आप भी इन्हें ख़ूब इस्तेमाल करें।', ta: 'பிரிட்டிஷ் மக்கள் எப்போதும் "please", "thank you", "sorry" சொல்வார்கள் - வேறொருவர் மோதினாலும் கூட. நீங்களும் அடிக்கடி பயன்படுத்துங்கள்.' },
    { icon: '🌦️', title: 'Talk about the weather', en: 'The weather is the easiest small talk. "Lovely day, isn\'t it?" or "Cold out there!" starts most conversations.', ml: 'കാലാവസ്ഥയാണ് ഏറ്റവും എളുപ്പമുള്ള ചെറുസംസാര വിഷയം. "Lovely day, isn\'t it?" എന്ന് പറഞ്ഞ് സംസാരം തുടങ്ങാം.', hi: 'मौसम सबसे आसान बातचीत का विषय है। "Lovely day, isn\'t it?" जैसी बात से ज़्यादातर बातचीत शुरू होती है।', ta: 'வானிலை தான் எளிதான சிறு உரையாடல் தலைப்பு. "Lovely day, isn\'t it?" என்று பெரும்பாலான உரையாடல்கள் தொடங்கும்.' },
    { icon: '🙂', title: 'Polite, indirect requests', en: 'British English is indirect. "Would you mind…?" or "Could you possibly…?" sounds much better than "Do this."', ml: 'ബ്രിട്ടീഷ് ഇംഗ്ലീഷ് നേരിട്ടല്ല പറയുക. "Do this" എന്നതിനേക്കാൾ "Would you mind…?" അല്ലെങ്കിൽ "Could you possibly…?" എന്നതാണ് നല്ലത്.', hi: 'ब्रिटिश अंग्रेज़ी में बात घुमाकर कही जाती है। "Do this" से कहीं अच्छा है "Would you mind…?" या "Could you possibly…?"', ta: 'பிரிட்டிஷ் ஆங்கிலம் மறைமுகமானது. "Do this" என்பதை விட "Would you mind…?" அல்லது "Could you possibly…?" மிகவும் நல்லது.' },
    { icon: '😏', title: 'Understatement', en: '"Not bad" can mean "very good", and "a bit of a problem" can mean "a big problem". Listen to the tone.', ml: '"Not bad" എന്നാൽ "വളരെ നല്ലത്" ആകാം, "a bit of a problem" എന്നാൽ "വലിയ പ്രശ്നം" ആകാം. ശബ്ദത്തിന്റെ ഭാവം ശ്രദ്ധിക്കുക.', hi: '"Not bad" का मतलब "बहुत अच्छा" हो सकता है, और "a bit of a problem" का मतलब "बड़ी समस्या"। लहजे पर ध्यान दें।', ta: '"Not bad" என்றால் "மிகவும் நல்லது" என்று பொருள்படலாம், "a bit of a problem" என்றால் "பெரிய பிரச்சனை". குரலின் தொனியைக் கவனியுங்கள்.' },
    { icon: '👤', title: 'First names at work', en: 'Most workplaces, including the NHS, use first names - even for managers. Some older patients like "Mr" or "Mrs" - ask what they prefer.', ml: 'NHS ഉൾപ്പെടെ മിക്ക ജോലിസ്ഥലങ്ങളിലും മാനേജർമാരെയും പേര് വിളിക്കും. പ്രായമായ ചില രോഗികൾക്ക് "Mr", "Mrs" ഇഷ്ടമാണ് - അവരോട് ചോദിക്കുക.', hi: 'NHS समेत ज़्यादातर दफ़्तरों में मैनेजरों को भी पहले नाम से बुलाते हैं। कुछ बुज़ुर्ग मरीज़ "Mr" या "Mrs" पसंद करते हैं - उनसे पूछ लें।', ta: 'NHS உட்பட பெரும்பாலான பணியிடங்களில் மேலாளர்களையும் பெயர் சொல்லியே அழைப்பார்கள். சில வயதான நோயாளிகள் "Mr", "Mrs" விரும்புவார்கள் - அவர்களிடம் கேளுங்கள்.' },
    { icon: '⏰', title: 'Be on time', en: "Punctuality matters for shifts, interviews and appointments. If you're running late, ring or message before the start time.", ml: 'ഷിഫ്റ്റ്, ഇന്റർവ്യൂ, അപ്പോയിന്റ്മെന്റ് എന്നിവയ്ക്ക് കൃത്യസമയം പ്രധാനമാണ്. വൈകുമെങ്കിൽ തുടങ്ങുന്ന സമയത്തിന് മുമ്പ് വിളിക്കുകയോ മെസ്സേജ് അയക്കുകയോ ചെയ്യുക.', hi: 'शिफ़्ट, इंटरव्यू और अपॉइंटमेंट के लिए समय पर पहुँचना ज़रूरी है। देर हो रही हो तो शुरू होने से पहले फ़ोन या मैसेज करें।', ta: 'ஷிப்ட், நேர்காணல், சந்திப்புகளுக்கு நேரம் தவறாமை முக்கியம். தாமதமானால் தொடங்கும் நேரத்துக்கு முன் அழையுங்கள் அல்லது செய்தி அனுப்புங்கள்.' },
    { icon: '🏥', title: '999, 111 and your GP', en: 'Call 999 in an emergency. For urgent but not life-threatening health problems, call NHS 111. For everything else, book with your GP surgery.', ml: 'അടിയന്തരമെങ്കിൽ 999 വിളിക്കുക. ജീവന് ഭീഷണിയില്ലാത്ത അത്യാവശ്യ ആരോഗ്യപ്രശ്നങ്ങൾക്ക് NHS 111. മറ്റെല്ലാത്തിനും GP സർജറിയിൽ ബുക്ക് ചെയ്യുക.', hi: 'आपात स्थिति में 999 पर कॉल करें। ज़रूरी लेकिन जानलेवा नहीं, ऐसी समस्याओं के लिए NHS 111। बाकी सबके लिए अपनी GP सर्जरी में बुक करें।', ta: 'அவசரத்தில் 999 அழையுங்கள். உயிருக்கு ஆபத்தில்லாத அவசர உடல்நலப் பிரச்சனைகளுக்கு NHS 111. மற்ற எல்லாவற்றுக்கும் உங்கள் GP சர்ஜரியில் பதிவு செய்யுங்கள்.' },
    { icon: '📅', title: 'Dates: day / month / year', en: 'Dates are written day / month / year (for example 30/10/2026). Take care when filling in forms.', ml: 'തീയതി ദിവസം / മാസം / വർഷം ക്രമത്തിലാണ് (ഉദാ: 30/10/2026). ഫോം പൂരിപ്പിക്കുമ്പോൾ ശ്രദ്ധിക്കുക.', hi: 'तारीख़ दिन / महीना / साल क्रम में लिखी जाती है (जैसे 30/10/2026)। फ़ॉर्म भरते समय ध्यान रखें।', ta: 'தேதி நாள் / மாதம் / ஆண்டு வரிசையில் எழுதப்படும் (எ.கா. 30/10/2026). படிவங்களை நிரப்பும்போது கவனமாக இருங்கள்.' },
    { icon: '🍽️', title: 'Tipping', en: 'In restaurants, a 10-12.5% tip is common if service is not already included on the bill. Check the bill first.', ml: 'റെസ്റ്റോറന്റുകളിൽ ബില്ലിൽ സർവീസ് ചാർജ് ഇല്ലെങ്കിൽ 10-12.5% ടിപ്പ് സാധാരണയാണ്. ആദ്യം ബില്ല് നോക്കുക.', hi: 'रेस्टोरेंट में अगर बिल में सर्विस चार्ज शामिल नहीं है, तो 10-12.5% टिप आम है। पहले बिल देख लें।', ta: 'உணவகங்களில் பில்லில் சேவைக் கட்டணம் சேர்க்கப்படவில்லை என்றால் 10-12.5% டிப்ஸ் வழக்கம். முதலில் பில்லைப் பாருங்கள்.' },
    { icon: '🧥', title: 'Dress for the weather', en: 'The weather changes quickly. Carry a light waterproof jacket, and wear layers in winter.', ml: 'കാലാവസ്ഥ പെട്ടെന്ന് മാറും. ഒരു ചെറിയ റെയിൻ ജാക്കറ്റ് കയ്യിൽ കരുതുക, ശൈത്യകാലത്ത് പല അടുക്ക് വസ്ത്രങ്ങൾ ധരിക്കുക.', hi: 'मौसम जल्दी बदलता है। एक हल्की वाटरप्रूफ़ जैकेट साथ रखें और सर्दियों में कई परतों में कपड़े पहनें।', ta: 'வானிலை விரைவாக மாறும். ஒரு லேசான மழைக்கோட்டை எடுத்துச் செல்லுங்கள், குளிர்காலத்தில் பல அடுக்கு உடைகள் அணியுங்கள்.' }
  ],

  // ---- Listening: older British patients ----
  listening: [
    { say: "I've been feeling a bit poorly since Tuesday, love, and my waterworks have been playing up.", options: ['She has felt unwell since Tuesday and has problems passing urine.', 'She had a fall on Tuesday.', 'The water pipes at her house are broken.'], answer: 0, note: '"poorly" = unwell; "waterworks" = bladder and urine; "playing up" = not working properly.' },
    { say: "My chest's been ever so tight since breakfast, and I'm a bit short of breath.", options: ['He ate too much at breakfast.', 'His chest has felt tight since breakfast and he is breathless.', 'His jumper is too tight.'], answer: 1, note: '"ever so" = very.' },
    { say: 'I came over all funny in the loo this morning and had to sit down on the floor.', options: ['She cleaned the toilet this morning.', 'She laughed a lot this morning.', 'She felt dizzy or faint in the toilet this morning.'], answer: 2, note: '"came over all funny" = suddenly felt unwell or faint; "loo" = toilet.' },
    { say: "I've not had my bowels open for four days, doctor, and I feel ever so bloated.", options: ['She is constipated - no bowel movement for four days - and bloated.', 'She has not opened her windows for four days.', 'She has eaten too much for four days.'], answer: 0, note: '"bowels open" = a bowel movement.' },
    { say: "I've been spending a penny every half hour, night and day.", options: ['He cannot sleep at all.', 'He has spent a lot of money.', 'He goes to the toilet to pass urine very often.'], answer: 2, note: '"spend a penny" = go to the toilet (old-fashioned).' },
    { say: "I'm right as rain now, thanks. The tablets have sorted me out.", options: ['She went out in the rain.', 'She feels completely better now.', 'She wants more tablets.'], answer: 1, note: '"right as rain" = completely well; "sorted me out" = fixed my problem.' },
    { say: "I had a nasty tumble on the stairs and I've done my wrist in.", options: ['She fell on the stairs and hurt her wrist.', 'She tidied the stairs.', 'She broke a glass on the stairs.'], answer: 0, note: '"a tumble" = a fall; "done my wrist in" = injured my wrist.' },
    { say: "I'm absolutely shattered. I've not slept a wink all week.", options: ['He broke something.', 'He winked at the nurse.', 'He is extremely tired and has not slept at all this week.'], answer: 2, note: '"shattered" = exhausted; "not slept a wink" = not slept at all.' },
    { say: 'My knees are giving me gyp again with all this damp weather.', options: ['Her knees are painful again in the wet weather.', 'She went to the gym.', 'She wants to go outside.'], answer: 0, note: '"giving me gyp" = causing pain (informal).' },
    { say: "Could you pop the telly on for me, pet? And I'm parched.", options: ['He has lost his pet.', 'He wants the TV on and is very thirsty.', 'He wants to go home.'], answer: 1, note: '"telly" = TV; "pet" = a friendly word like "dear" (North of England); "parched" = very thirsty.' },
    { say: "I've been under the weather all week and I've gone right off my food.", options: ['She has been outside in bad weather.', 'She has been cooking all week.', 'She has been unwell and has lost her appetite.'], answer: 2, note: '"under the weather" = unwell; "gone off my food" = lost my appetite.' },
    { say: "The doctor's put me on these new pills, but they make me feel proper woozy.", options: ['The new tablets make her feel very dizzy.', 'She wants the pills to be stronger.', 'She feels much better.'], answer: 0, note: '"proper" = very (informal); "woozy" = dizzy or light-headed.' }
  ],

  // ---- "Everyday life" vocabulary (replaces the Australian set) ----
  life: { id: 'uk_life', title: 'Everyday life in the UK', words: [
    { w: 'NHS', m: 'the National Health Service - free public healthcare', ml: 'ബ്രിട്ടനിലെ സൗജന്യ പൊതു ആരോഗ്യ സേവനം', hi: 'ब्रिटेन की मुफ़्त सरकारी स्वास्थ्य सेवा', ta: 'பிரிட்டனின் இலவச அரசு சுகாதார சேவை', ex: 'Most hospitals in the UK are part of the NHS.' },
    { w: 'GP surgery', m: "your local doctor's clinic", ml: 'നിങ്ങളുടെ പ്രാദേശിക ഡോക്ടറുടെ ക്ലിനിക്', hi: 'आपके इलाक़े के डॉक्टर का क्लिनिक', ta: 'உங்கள் பகுதி மருத்துவரின் மருத்துவமனை', ex: 'Register with a GP surgery as soon as you arrive.' },
    { w: 'NI number', m: 'National Insurance number - needed to work and pay tax', ml: 'ജോലി ചെയ്യാനും നികുതി അടയ്ക്കാനും വേണ്ട നമ്പർ', hi: 'काम करने और टैक्स भरने के लिए ज़रूरी नंबर', ta: 'வேலை செய்யவும் வரி செலுத்தவும் தேவையான எண்', ex: 'Your employer will ask for your NI number.' },
    { w: 'council tax', m: 'a local tax on your home, usually paid monthly', ml: 'വീടിന് പ്രാദേശിക ഭരണകൂടത്തിന് നൽകുന്ന നികുതി', hi: 'घर पर स्थानीय प्रशासन का टैक्स', ta: 'வீட்டுக்காக உள்ளூர் நிர்வாகத்துக்குச் செலுத்தும் வரி', ex: 'Council tax is usually paid in ten monthly instalments.' },
    { w: 'tenancy agreement', m: 'a rental contract for a home', ml: 'വീട് വാടക കരാർ', hi: 'घर का किराया अनुबंध', ta: 'வீட்டு வாடகை ஒப்பந்தம்', ex: 'Read the tenancy agreement before you sign.' },
    { w: 'deposit', m: 'money paid at the start of renting, returned at the end', ml: 'വാടകയുടെ തുടക്കത്തിൽ നൽകി അവസാനം തിരികെ ലഭിക്കുന്ന തുക', hi: 'किराये की शुरुआत में दी जाने वाली राशि, जो अंत में लौटती है', ta: 'வாடகையின் தொடக்கத்தில் செலுத்தி முடிவில் திரும்பப் பெறும் தொகை', ex: 'Your deposit must be kept in a protection scheme.' },
    { w: 'payslip', m: 'a document showing your pay, tax and deductions', ml: 'ശമ്പളവും നികുതിയും കിഴിവുകളും കാണിക്കുന്ന രേഖ', hi: 'वेतन, टैक्स और कटौतियाँ दिखाने वाली पर्ची', ta: 'ஊதியம், வரி, பிடித்தங்களைக் காட்டும் சீட்டு', ex: 'Check your payslip every month.' },
    { w: 'workplace pension', m: 'retirement savings taken from your pay', ml: 'ശമ്പളത്തിൽ നിന്നുള്ള വിരമിക്കൽ സമ്പാദ്യം', hi: 'वेतन से सेवानिवृत्ति के लिए बचत', ta: 'ஊதியத்திலிருந்து ஓய்வுக்கான சேமிப்பு', ex: 'You are automatically enrolled in a workplace pension.' },
    { w: 'MOT', m: 'a yearly safety check for cars over three years old', ml: 'മൂന്ന് വർഷത്തിലധികം പഴയ കാറുകളുടെ വാർഷിക സുരക്ഷാ പരിശോധന', hi: 'तीन साल से पुरानी गाड़ियों की सालाना सुरक्षा जाँच', ta: 'மூன்று ஆண்டுக்கு மேற்பட்ட கார்களுக்கான ஆண்டு பாதுகாப்புச் சோதனை', ex: 'My car needs its MOT next month.' },
    { w: 'bank holiday', m: 'a public holiday', ml: 'പൊതു അവധി', hi: 'सार्वजनिक छुट्टी', ta: 'பொது விடுமுறை', ex: 'The office is closed on the bank holiday Monday.' },
    { w: 'school term', m: 'one of the three parts of the school year', ml: 'സ്കൂൾ വർഷത്തിന്റെ മൂന്ന് ഭാഗങ്ങളിൽ ഒന്ന്', hi: 'स्कूल वर्ष के तीन हिस्सों में से एक', ta: 'பள்ளி ஆண்டின் மூன்று பருவங்களில் ஒன்று', ex: 'The summer term ends in July.' },
    { w: 'GOV.UK', m: 'the website for government services', ml: 'സർക്കാർ സേവനങ്ങൾക്കുള്ള വെബ്സൈറ്റ്', hi: 'सरकारी सेवाओं की वेबसाइट', ta: 'அரசு சேவைகளுக்கான இணையதளம்', ex: 'You can find visa information on GOV.UK.' }
  ] },

  // ---- Conversation openings that are Australian in the main list ----
  scenes: {
    general: { opening: "Hello! Have a seat. So, what's on your mind today? We can chat about anything you like.",
      opening_ml: 'ഹലോ! ഇരിക്കൂ. ഇന്ന് എന്താണ് മനസ്സിൽ? എന്തിനെക്കുറിച്ചും നമുക്ക് സംസാരിക്കാം.', opening_hi: 'नमस्ते! बैठिए। तो, आज आप किस बारे में बात करना चाहेंगे? हम किसी भी विषय पर बात कर सकते हैं।', opening_ta: 'வணக்கம்! உட்காருங்கள். இன்று எதைப் பற்றிப் பேச விரும்புகிறீர்கள்? எதைப் பற்றி வேண்டுமானாலும் பேசலாம்.' },
    mate: { title: 'Chat with your new neighbour', opening: 'Hiya! You must be the new neighbour. How are you settling in?',
      opening_ml: 'ഹായ്! നിങ്ങളാണല്ലേ പുതിയ അയൽക്കാരൻ. ഇവിടെ എങ്ങനെയുണ്ട്?', opening_hi: 'हाय! आप नए पड़ोसी होंगे। यहाँ कैसा लग रहा है?', opening_ta: 'ஹாய்! நீங்கள்தான் புதிய பக்கத்து வீட்டுக்காரர் போல. இங்கே எப்படி இருக்கிறது?' },
    customs: { title: 'Airport arrivals (UK Border Force)', opening: "Good morning, welcome to the UK. Can I see your passport, please? What's the purpose of your visit?",
      opening_ml: 'ഗുഡ് മോണിംഗ്, യുകെയിലേക്ക് സ്വാഗതം. പാസ്പോർട്ട് കാണിക്കാമോ? നിങ്ങളുടെ യാത്രയുടെ ഉദ്ദേശ്യം എന്താണ്?', opening_hi: 'सुप्रभात, ब्रिटेन में आपका स्वागत है। क्या मैं आपका पासपोर्ट देख सकता/सकती हूँ? आपकी यात्रा का उद्देश्य क्या है?', opening_ta: 'காலை வணக்கம், பிரிட்டனுக்கு வரவேற்கிறோம். உங்கள் கடவுச்சீட்டைப் பார்க்கலாமா? உங்கள் வருகையின் நோக்கம் என்ன?' },
    workmate: { title: 'Tea break with a colleague', opening: 'Ah, tea break at last! How was your weekend?',
      opening_ml: 'ഹാവൂ, അവസാനം ചായ ഇടവേള! വീക്കെൻഡ് എങ്ങനെയുണ്ടായിരുന്നു?', opening_hi: 'आख़िरकार चाय का ब्रेक! आपका वीकेंड कैसा रहा?', opening_ta: 'அப்பாடா, தேநீர் இடைவேளை! உங்கள் வார இறுதி எப்படி இருந்தது?' },
    rental: { title: 'Flat viewing', opening: 'Hi there, thanks for coming to the viewing. Have a look around. Any questions so far?',
      opening_ml: 'ഹലോ, വീട് കാണാൻ വന്നതിന് നന്ദി. ചുറ്റും നോക്കൂ. ഇതുവരെ എന്തെങ്കിലും ചോദ്യമുണ്ടോ?', opening_hi: 'नमस्ते, घर देखने आने के लिए धन्यवाद। घूमकर देख लीजिए। अब तक कोई सवाल?', opening_ta: 'வணக்கம், வீட்டைப் பார்க்க வந்ததற்கு நன்றி. சுற்றிப் பாருங்கள். இதுவரை ஏதாவது கேள்வி உண்டா?' },
    sales: { opening: "Hello, come on in. I've only got about five minutes, so what have you got for me?",
      opening_ml: 'ഹലോ, അകത്തേക്ക് വരൂ. എനിക്ക് അഞ്ച് മിനിറ്റേ ഉള്ളൂ, എന്താണ് എനിക്കായി കൊണ്ടുവന്നത്?', opening_hi: 'नमस्ते, अंदर आइए। मेरे पास बस पाँच मिनट हैं, तो बताइए आपके पास मेरे लिए क्या है?', opening_ta: 'வணக்கம், உள்ளே வாருங்கள். என்னிடம் ஐந்து நிமிடம்தான் இருக்கிறது, எனக்காக என்ன கொண்டு வந்திருக்கிறீர்கள்?' },
    salary: { opening: "Congratulations - we'd love to have you on the team. We're offering the position at Band 5, on the first point of the pay scale. How does that sound?",
      opening_ml: 'അഭിനന്ദനങ്ങൾ - നിങ്ങളെ ടീമിൽ എടുക്കാൻ ഞങ്ങൾക്ക് സന്തോഷമുണ്ട്. ഈ ജോലി ബാൻഡ് 5-ൽ, ശമ്പള സ്കെയിലിന്റെ ആദ്യ പോയിന്റിലാണ് നൽകുന്നത്. എന്ത് തോന്നുന്നു?', opening_hi: 'बधाई हो - हम आपको टीम में लेना चाहेंगे। हम यह पद बैंड 5 पर, वेतनमान के पहले पॉइंट पर दे रहे हैं। आपको कैसा लगा?', opening_ta: 'வாழ்த்துகள் - உங்களை எங்கள் குழுவில் சேர்க்க விரும்புகிறோம். இந்தப் பதவியை பேண்ட் 5-இல், ஊதிய அளவின் முதல் நிலையில் வழங்குகிறோம். உங்களுக்கு எப்படித் தோன்றுகிறது?' },
    rn_interview: { who: 'Michelle, Ward Manager', opening: "Hi, thanks for coming in today. I'm Michelle, the Ward Manager. To start off, could you tell us a little about yourself?",
      opening_ml: 'ഹലോ, ഇന്ന് വന്നതിന് നന്ദി. ഞാൻ മിഷേൽ, വാർഡ് മാനേജർ. ആദ്യം, നിങ്ങളെക്കുറിച്ച് കുറച്ച് പറയാമോ?', opening_hi: 'नमस्ते, आज आने के लिए धन्यवाद। मैं मिशेल हूँ, वार्ड मैनेजर। शुरुआत में, क्या आप अपने बारे में थोड़ा बता सकते हैं?', opening_ta: 'வணக்கம், இன்று வந்ததற்கு நன்றி. நான் மிஷேல், வார்டு மேலாளர். முதலில், உங்களைப் பற்றிக் கொஞ்சம் சொல்ல முடியுமா?' },
    aged_interview: { who: 'David, Care Home Manager', opening: "Hello, thanks for coming along. I'm David, the Care Home Manager here. Let's start with you - what made you want to work in care?",
      opening_ml: 'ഹലോ, വന്നതിന് നന്ദി. ഞാൻ ഡേവിഡ്, ഇവിടത്തെ കെയർ ഹോം മാനേജർ. നിങ്ങളിൽ നിന്ന് തുടങ്ങാം - എന്തുകൊണ്ടാണ് കെയർ മേഖലയിൽ ജോലി ചെയ്യാൻ ആഗ്രഹിച്ചത്?', opening_hi: 'नमस्ते, आने के लिए धन्यवाद। मैं डेविड हूँ, यहाँ का केयर होम मैनेजर। आपसे शुरू करते हैं - आपने केयर में काम करना क्यों चुना?', opening_ta: 'வணக்கம், வந்ததற்கு நன்றி. நான் டேவிட், இங்குள்ள பராமரிப்பு இல்ல மேலாளர். உங்களிடமிருந்து தொடங்கலாம் - பராமரிப்புப் பணியில் வேலை செய்ய ஏன் விரும்பினீர்கள்?' },
    panel: { title: 'Mock interview: Ward Manager' }
  }
};
