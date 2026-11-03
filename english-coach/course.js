/* The level course: 8 Beginner and 8 Intermediate lessons (Advanced and Leadership use the
   vocabulary, IELTS, OET and work conversations). Each lesson has a grammar or speaking focus and
   six phrases, with Malayalam (ml), Hindi (hi) and Tamil (ta). Lessons open in the normal lesson
   and quiz screens (see courseUnits() in app.js). The same course serves all three Englishes. */

const COURSE = {
  beginner: [
    { id: 'c_b1', icon: '👋', title: 'Hello and introductions', ml: 'ഹലോയും പരിചയപ്പെടുത്തലും', hi: 'नमस्ते और परिचय', ta: 'வணக்கமும் அறிமுகமும்',
      focus: { en: 'Use "I am" (I\'m) to say your name, job and country: "I\'m Anu. I\'m a nurse. I\'m from Kerala."', ml: 'പേര്, ജോലി, നാട് പറയാൻ "I am" (I\'m) ഉപയോഗിക്കുക: "I\'m Anu. I\'m a nurse. I\'m from Kerala."', hi: 'नाम, काम और देश बताने के लिए "I am" (I\'m) का प्रयोग करें: "I\'m Anu. I\'m a nurse. I\'m from Kerala."', ta: 'பெயர், வேலை, ஊர் சொல்ல "I am" (I\'m) பயன்படுத்துங்கள்: "I\'m Anu. I\'m a nurse. I\'m from Kerala."' },
      phrases: [
        { en: 'Hello, my name is Anu.', ml: 'ഹലോ, എന്റെ പേര് അനു.', hi: 'नमस्ते, मेरा नाम अनु है।', ta: 'வணக்கம், என் பெயர் அனு.' },
        { en: "I'm from Kerala, in India.", ml: 'ഞാൻ ഇന്ത്യയിലെ കേരളത്തിൽ നിന്നാണ്.', hi: 'मैं भारत के केरल से हूँ।', ta: 'நான் இந்தியாவின் கேரளாவிலிருந்து வருகிறேன்.' },
        { en: "I'm a nurse.", ml: 'ഞാൻ ഒരു നഴ്സാണ്.', hi: 'मैं नर्स हूँ।', ta: 'நான் ஒரு செவிலியர்.' },
        { en: 'Nice to meet you.', ml: 'കണ്ടതിൽ സന്തോഷം.', hi: 'आपसे मिलकर ख़ुशी हुई।', ta: 'உங்களைச் சந்தித்ததில் மகிழ்ச்சி.' },
        { en: 'How are you?', ml: 'സുഖമാണോ?', hi: 'आप कैसे हैं?', ta: 'எப்படி இருக்கிறீர்கள்?' },
        { en: "I'm fine, thank you. And you?", ml: 'എനിക്ക് സുഖമാണ്, നന്ദി. നിങ്ങൾക്കോ?', hi: 'मैं ठीक हूँ, धन्यवाद। और आप?', ta: 'நான் நன்றாக இருக்கிறேன், நன்றி. நீங்கள்?' }
      ] },
    { id: 'c_b2', icon: '👨‍👩‍👧', title: 'Family', ml: 'കുടുംബം', hi: 'परिवार', ta: 'குடும்பம்',
      focus: { en: 'Use "have" for family: "I have two children." Put "my" before family words: "my husband", "my mother".', ml: 'കുടുംബത്തെക്കുറിച്ച് പറയാൻ "have" ഉപയോഗിക്കുക: "I have two children." കുടുംബാംഗങ്ങളുടെ മുമ്പിൽ "my" ചേർക്കുക: "my husband", "my mother".', hi: 'परिवार के लिए "have" का प्रयोग करें: "I have two children." रिश्तों से पहले "my" लगाएँ: "my husband", "my mother"।', ta: 'குடும்பம் பற்றிச் சொல்ல "have" பயன்படுத்துங்கள்: "I have two children." உறவுச் சொற்களுக்கு முன் "my" சேருங்கள்: "my husband", "my mother".' },
      phrases: [
        { en: 'I have two children.', ml: 'എനിക്ക് രണ്ട് കുട്ടികളുണ്ട്.', hi: 'मेरे दो बच्चे हैं।', ta: 'எனக்கு இரண்டு குழந்தைகள் இருக்கிறார்கள்.' },
        { en: 'My husband works in a bank.', ml: 'എന്റെ ഭർത്താവ് ഒരു ബാങ്കിൽ ജോലി ചെയ്യുന്നു.', hi: 'मेरे पति एक बैंक में काम करते हैं।', ta: 'என் கணவர் ஒரு வங்கியில் வேலை செய்கிறார்.' },
        { en: 'My daughter is ten years old.', ml: 'എന്റെ മകൾക്ക് പത്ത് വയസ്സാണ്.', hi: 'मेरी बेटी दस साल की है।', ta: 'என் மகளுக்குப் பத்து வயது.' },
        { en: 'I live with my parents.', ml: 'ഞാൻ എന്റെ മാതാപിതാക്കളോടൊപ്പമാണ് താമസിക്കുന്നത്.', hi: 'मैं अपने माता-पिता के साथ रहता/रहती हूँ।', ta: 'நான் என் பெற்றோருடன் வசிக்கிறேன்.' },
        { en: 'Do you have any brothers or sisters?', ml: 'നിങ്ങൾക്ക് സഹോദരങ്ങളുണ്ടോ?', hi: 'क्या आपके भाई-बहन हैं?', ta: 'உங்களுக்குச் சகோதர சகோதரிகள் இருக்கிறார்களா?' },
        { en: 'Yes, I have one brother.', ml: 'ഉണ്ട്, എനിക്ക് ഒരു സഹോദരനുണ്ട്.', hi: 'हाँ, मेरा एक भाई है।', ta: 'ஆம், எனக்கு ஒரு சகோதரன் இருக்கிறான்.' }
      ] },
    { id: 'c_b3', icon: '🕘', title: 'Numbers, time and dates', ml: 'അക്കങ്ങൾ, സമയം, തീയതി', hi: 'संख्याएँ, समय और तारीख़', ta: 'எண்கள், நேரம், தேதி',
      focus: { en: 'Say the time like this: "It\'s nine o\'clock", "It\'s half past ten". Say dates like this: "the fifth of March".', ml: 'സമയം ഇങ്ങനെ പറയുക: "It\'s nine o\'clock", "It\'s half past ten". തീയതി: "the fifth of March".', hi: 'समय ऐसे बताएँ: "It\'s nine o\'clock", "It\'s half past ten"। तारीख़: "the fifth of March"।', ta: 'நேரத்தை இப்படிச் சொல்லுங்கள்: "It\'s nine o\'clock", "It\'s half past ten". தேதி: "the fifth of March".' },
      phrases: [
        { en: 'What time is it?', ml: 'സമയം എത്രയായി?', hi: 'कितने बजे हैं?', ta: 'மணி என்ன?' },
        { en: "It's half past nine.", ml: 'ഒമ്പതര ആയി.', hi: 'साढ़े नौ बजे हैं।', ta: 'மணி ஒன்பதரை.' },
        { en: 'My phone number is 555 0199.', ml: 'എന്റെ ഫോൺ നമ്പർ 555 0199 ആണ്.', hi: 'मेरा फ़ोन नंबर 555 0199 है।', ta: 'என் தொலைபேசி எண் 555 0199.' },
        { en: 'My birthday is on the fifth of March.', ml: 'എന്റെ ജന്മദിനം മാർച്ച് അഞ്ചിനാണ്.', hi: 'मेरा जन्मदिन पाँच मार्च को है।', ta: 'என் பிறந்தநாள் மார்ச் ஐந்தாம் தேதி.' },
        { en: "The shop opens at eight o'clock.", ml: 'കട എട്ട് മണിക്ക് തുറക്കും.', hi: 'दुकान आठ बजे खुलती है।', ta: 'கடை எட்டு மணிக்குத் திறக்கும்.' },
        { en: 'See you on Monday.', ml: 'തിങ്കളാഴ്ച കാണാം.', hi: 'सोमवार को मिलते हैं।', ta: 'திங்கள்கிழமை சந்திப்போம்.' }
      ] },
    { id: 'c_b4', icon: '🍎', title: 'Food and shopping', ml: 'ഭക്ഷണവും ഷോപ്പിംഗും', hi: 'खाना और ख़रीदारी', ta: 'உணவும் கடைகளும்',
      focus: { en: 'Ask politely with "Can I have…, please?" and ask prices with "How much is…?"', ml: 'മര്യാദയോടെ ചോദിക്കാൻ "Can I have…, please?", വില ചോദിക്കാൻ "How much is…?"', hi: 'विनम्रता से माँगने के लिए "Can I have…, please?" और दाम पूछने के लिए "How much is…?"', ta: 'மரியாதையாகக் கேட்க "Can I have…, please?", விலை கேட்க "How much is…?"' },
      phrases: [
        { en: 'Can I have a coffee, please?', ml: 'ഒരു കാപ്പി തരാമോ, പ്ലീസ്?', hi: 'क्या मुझे एक कॉफ़ी मिल सकती है, प्लीज़?', ta: 'ஒரு காபி கிடைக்குமா, தயவுசெய்து?' },
        { en: 'How much is this?', ml: 'ഇതിന് എത്രയാണ്?', hi: 'यह कितने का है?', ta: 'இது எவ்வளவு?' },
        { en: "I'd like two apples, please.", ml: 'എനിക്ക് രണ്ട് ആപ്പിൾ വേണം, പ്ലീസ്.', hi: 'मुझे दो सेब चाहिए, प्लीज़।', ta: 'எனக்கு இரண்டு ஆப்பிள் வேண்டும், தயவுசெய்து.' },
        { en: 'Do you have any bread?', ml: 'ബ്രെഡ് ഉണ്ടോ?', hi: 'क्या आपके पास ब्रेड है?', ta: 'உங்களிடம் ரொட்டி இருக்கிறதா?' },
        { en: 'Can I pay by card?', ml: 'കാർഡ് വഴി പണം കൊടുക്കാമോ?', hi: 'क्या मैं कार्ड से पैसे दे सकता/सकती हूँ?', ta: 'கார்டு மூலம் பணம் செலுத்தலாமா?' },
        { en: 'Thank you very much.', ml: 'വളരെ നന്ദി.', hi: 'बहुत-बहुत धन्यवाद।', ta: 'மிக்க நன்றி.' }
      ] },
    { id: 'c_b5', icon: '🏠', title: 'Daily routine', ml: 'ദിനചര്യ', hi: 'दिनचर्या', ta: 'அன்றாட வழக்கம்',
      focus: { en: 'Use the present simple for things you do every day: "I get up at six." Add -s for he and she: "She works at night."', ml: 'എല്ലാ ദിവസവും ചെയ്യുന്ന കാര്യങ്ങൾക്ക് present simple: "I get up at six." he, she എന്നിവയ്ക്ക് -s ചേർക്കുക: "She works at night."', hi: 'रोज़ के कामों के लिए present simple: "I get up at six." he और she के साथ -s लगाएँ: "She works at night."', ta: 'தினமும் செய்யும் செயல்களுக்கு present simple: "I get up at six." he, she உடன் -s சேருங்கள்: "She works at night."' },
      phrases: [
        { en: "I get up at six o'clock.", ml: 'ഞാൻ ആറ് മണിക്ക് എഴുന്നേൽക്കും.', hi: 'मैं छह बजे उठता/उठती हूँ।', ta: 'நான் ஆறு மணிக்கு எழுந்திருப்பேன்.' },
        { en: 'I have breakfast at seven.', ml: 'ഞാൻ ഏഴ് മണിക്ക് പ്രഭാതഭക്ഷണം കഴിക്കും.', hi: 'मैं सात बजे नाश्ता करता/करती हूँ।', ta: 'நான் ஏழு மணிக்குக் காலை உணவு சாப்பிடுவேன்.' },
        { en: 'I go to work by bus.', ml: 'ഞാൻ ബസിലാണ് ജോലിക്ക് പോകുന്നത്.', hi: 'मैं बस से काम पर जाता/जाती हूँ।', ta: 'நான் பேருந்தில் வேலைக்குப் போவேன்.' },
        { en: 'She works at night.', ml: 'അവൾ രാത്രിയിലാണ് ജോലി ചെയ്യുന്നത്.', hi: 'वह रात में काम करती है।', ta: 'அவள் இரவில் வேலை செய்கிறாள்.' },
        { en: 'I go to bed at ten.', ml: 'ഞാൻ പത്ത് മണിക്ക് ഉറങ്ങാൻ പോകും.', hi: 'मैं दस बजे सोने जाता/जाती हूँ।', ta: 'நான் பத்து மணிக்குத் தூங்கச் செல்வேன்.' },
        { en: 'On Sundays, I visit my friends.', ml: 'ഞായറാഴ്ചകളിൽ ഞാൻ സുഹൃത്തുക്കളെ കാണാൻ പോകും.', hi: 'रविवार को मैं अपने दोस्तों से मिलने जाता/जाती हूँ।', ta: 'ஞாயிற்றுக்கிழமைகளில் நான் நண்பர்களைப் பார்க்கச் செல்வேன்.' }
      ] },
    { id: 'c_b6', icon: '🗺️', title: 'Directions and places', ml: 'വഴിയും സ്ഥലങ്ങളും', hi: 'रास्ता और जगहें', ta: 'வழியும் இடங்களும்',
      focus: { en: 'Ask "Where is…?" and listen for "go straight", "turn left" and "turn right".', ml: '"Where is…?" എന്ന് ചോദിക്കുക; "go straight", "turn left", "turn right" എന്നിവ ശ്രദ്ധിക്കുക.', hi: '"Where is…?" पूछें और "go straight", "turn left", "turn right" ध्यान से सुनें।', ta: '"Where is…?" என்று கேளுங்கள்; "go straight", "turn left", "turn right" ஆகியவற்றைக் கவனியுங்கள்.' },
      phrases: [
        { en: 'Excuse me, where is the bus stop?', ml: 'ക്ഷമിക്കണം, ബസ് സ്റ്റോപ്പ് എവിടെയാണ്?', hi: 'माफ़ कीजिए, बस स्टॉप कहाँ है?', ta: 'மன்னிக்கவும், பேருந்து நிறுத்தம் எங்கே?' },
        { en: 'Go straight and turn left.', ml: 'നേരെ പോയി ഇടത്തോട്ട് തിരിയുക.', hi: 'सीधे जाइए और बाएँ मुड़िए।', ta: 'நேராகச் சென்று இடது பக்கம் திரும்புங்கள்.' },
        { en: "It's next to the supermarket.", ml: 'അത് സൂപ്പർമാർക്കറ്റിന് അടുത്താണ്.', hi: 'वह सुपरमार्केट के बगल में है।', ta: 'அது பல்பொருள் அங்காடிக்குப் பக்கத்தில் உள்ளது.' },
        { en: 'Is it far from here?', ml: 'ഇവിടെ നിന്ന് ദൂരമുണ്ടോ?', hi: 'क्या यह यहाँ से दूर है?', ta: 'இங்கிருந்து தொலைவா?' },
        { en: "It's about five minutes on foot.", ml: 'നടന്നാൽ ഏകദേശം അഞ്ച് മിനിറ്റ്.', hi: 'पैदल लगभग पाँच मिनट है।', ta: 'நடந்தால் சுமார் ஐந்து நிமிடம்.' },
        { en: 'Thank you for your help.', ml: 'സഹായത്തിന് നന്ദി.', hi: 'आपकी मदद के लिए धन्यवाद।', ta: 'உங்கள் உதவிக்கு நன்றி.' }
      ] },
    { id: 'c_b7', icon: '🤒', title: 'Health and feelings', ml: 'ആരോഗ്യവും വികാരങ്ങളും', hi: 'सेहत और भावनाएँ', ta: 'உடல்நலமும் உணர்வுகளும்',
      focus: { en: 'Use "I have" + a problem: "I have a headache." Use "I feel" + a feeling: "I feel tired."', ml: 'പ്രശ്നം പറയാൻ "I have": "I have a headache." തോന്നൽ പറയാൻ "I feel": "I feel tired."', hi: 'तकलीफ़ के लिए "I have": "I have a headache." भावना के लिए "I feel": "I feel tired."', ta: 'பிரச்சனைக்கு "I have": "I have a headache." உணர்வுக்கு "I feel": "I feel tired."' },
      phrases: [
        { en: 'I have a headache.', ml: 'എനിക്ക് തലവേദനയുണ്ട്.', hi: 'मेरे सिर में दर्द है।', ta: 'எனக்குத் தலைவலி.' },
        { en: 'I feel tired today.', ml: 'ഇന്ന് എനിക്ക് ക്ഷീണം തോന്നുന്നു.', hi: 'आज मुझे थकान महसूस हो रही है।', ta: 'இன்று எனக்குக் களைப்பாக இருக்கிறது.' },
        { en: 'My back hurts.', ml: 'എന്റെ മുതുക് വേദനിക്കുന്നു.', hi: 'मेरी पीठ में दर्द है।', ta: 'என் முதுகு வலிக்கிறது.' },
        { en: 'I need to see a doctor.', ml: 'എനിക്ക് ഒരു ഡോക്ടറെ കാണണം.', hi: 'मुझे डॉक्टर को दिखाना है।', ta: 'நான் மருத்துவரைப் பார்க்க வேண்டும்.' },
        { en: "I'm feeling better now.", ml: 'ഇപ്പോൾ എനിക്ക് കുറവുണ്ട്.', hi: 'अब मैं बेहतर महसूस कर रहा/रही हूँ।', ta: 'இப்போது எனக்குப் பரவாயில்லை.' },
        { en: "I'm happy to help.", ml: 'സഹായിക്കാൻ എനിക്ക് സന്തോഷമേയുള്ളൂ.', hi: 'मदद करके मुझे ख़ुशी होगी।', ta: 'உதவுவதில் மகிழ்ச்சி.' }
      ] },
    { id: 'c_b8', icon: '📅', title: 'Talking about the past', ml: 'കഴിഞ്ഞ കാര്യങ്ങൾ പറയാം', hi: 'बीते समय की बातें', ta: 'கடந்த காலத்தைப் பற்றிப் பேசுதல்',
      focus: { en: 'Use the past simple for finished times: "Yesterday I went to the shop." Many verbs add -ed: worked, called, watched.', ml: 'കഴിഞ്ഞുപോയ കാര്യങ്ങൾക്ക് past simple: "Yesterday I went to the shop." പല ക്രിയകൾക്കും -ed ചേരും: worked, called, watched.', hi: 'बीते समय के लिए past simple: "Yesterday I went to the shop." कई क्रियाओं में -ed लगता है: worked, called, watched।', ta: 'முடிந்த நிகழ்வுகளுக்கு past simple: "Yesterday I went to the shop." பல வினைச்சொற்களுடன் -ed சேரும்: worked, called, watched.' },
      phrases: [
        { en: 'Yesterday I worked at the hospital.', ml: 'ഇന്നലെ ഞാൻ ആശുപത്രിയിൽ ജോലി ചെയ്തു.', hi: 'कल मैंने अस्पताल में काम किया।', ta: 'நேற்று நான் மருத்துவமனையில் வேலை செய்தேன்.' },
        { en: 'I went to the market last Sunday.', ml: 'കഴിഞ്ഞ ഞായറാഴ്ച ഞാൻ ചന്തയിൽ പോയി.', hi: 'पिछले रविवार मैं बाज़ार गया/गई।', ta: 'கடந்த ஞாயிறு நான் சந்தைக்குப் போனேன்.' },
        { en: 'We watched a film last night.', ml: 'ഇന്നലെ രാത്രി ഞങ്ങൾ ഒരു സിനിമ കണ്ടു.', hi: 'कल रात हमने एक फ़िल्म देखी।', ta: 'நேற்று இரவு நாங்கள் ஒரு படம் பார்த்தோம்.' },
        { en: 'I called my mother yesterday.', ml: 'ഇന്നലെ ഞാൻ അമ്മയെ വിളിച്ചു.', hi: 'कल मैंने अपनी माँ को फ़ोन किया।', ta: 'நேற்று நான் என் அம்மாவை அழைத்தேன்.' },
        { en: 'Did you have a good weekend?', ml: 'നിങ്ങളുടെ വീക്കെൻഡ് നന്നായിരുന്നോ?', hi: 'क्या आपका वीकेंड अच्छा रहा?', ta: 'உங்கள் வார இறுதி நன்றாக இருந்ததா?' },
        { en: 'Yes, I did. It was great.', ml: 'അതെ, നന്നായിരുന്നു. വളരെ രസമായിരുന്നു.', hi: 'हाँ, बहुत अच्छा रहा।', ta: 'ஆம், மிகவும் நன்றாக இருந்தது.' }
      ] }
  ],

  intermediate: [
    { id: 'c_i1', icon: '💬', title: 'Small talk that keeps going', ml: 'സംസാരം തുടർന്നുകൊണ്ടുപോകാം', hi: 'बातचीत को आगे बढ़ाना', ta: 'உரையாடலைத் தொடர்வது',
      focus: { en: 'Answer, add a detail, then ask back: "It was great - we went to the beach. How about you?"', ml: 'മറുപടി പറയുക, ഒരു വിശദാംശം കൂടി ചേർക്കുക, എന്നിട്ട് തിരിച്ച് ചോദിക്കുക: "It was great - we went to the beach. How about you?"', hi: 'जवाब दें, एक बात और जोड़ें, फिर वापस पूछें: "It was great - we went to the beach. How about you?"', ta: 'பதில் சொல்லுங்கள், ஒரு விவரம் சேருங்கள், பிறகு திருப்பிக் கேளுங்கள்: "It was great - we went to the beach. How about you?"' },
      phrases: [
        { en: 'It was great, thanks - we went to the beach. How about you?', ml: 'നന്നായിരുന്നു, നന്ദി - ഞങ്ങൾ ബീച്ചിൽ പോയി. നിങ്ങളുടേതോ?', hi: 'बहुत अच्छा था, धन्यवाद - हम समुद्र तट गए थे। और आपका?', ta: 'நன்றாக இருந்தது, நன்றி - நாங்கள் கடற்கரைக்குப் போனோம். உங்களுக்கு?' },
        { en: 'Have you lived here long?', ml: 'നിങ്ങൾ ഇവിടെ താമസം തുടങ്ങിയിട്ട് കുറേ ആയോ?', hi: 'क्या आप यहाँ काफ़ी समय से रह रहे हैं?', ta: 'நீங்கள் இங்கே நீண்ட காலமாக வசிக்கிறீர்களா?' },
        { en: 'About two years now. I really like it here.', ml: 'ഏകദേശം രണ്ട് വർഷമായി. എനിക്ക് ഇവിടം വളരെ ഇഷ്ടമാണ്.', hi: 'लगभग दो साल हो गए। मुझे यहाँ बहुत अच्छा लगता है।', ta: 'சுமார் இரண்டு வருடங்கள். எனக்கு இந்த இடம் மிகவும் பிடிக்கும்.' },
        { en: 'What do you do in your free time?', ml: 'ഒഴിവുസമയത്ത് നിങ്ങൾ എന്താണ് ചെയ്യുന്നത്?', hi: 'ख़ाली समय में आप क्या करते हैं?', ta: 'ஓய்வு நேரத்தில் என்ன செய்வீர்கள்?' },
        { en: "I'm into cooking and walking. What about you?", ml: 'എനിക്ക് പാചകവും നടത്തവും ഇഷ്ടമാണ്. നിങ്ങൾക്കോ?', hi: 'मुझे खाना बनाना और घूमना पसंद है। और आपको?', ta: 'எனக்குச் சமையலும் நடைப்பயிற்சியும் பிடிக்கும். உங்களுக்கு?' },
        { en: 'That sounds fun!', ml: 'അത് രസമായി തോന്നുന്നു!', hi: 'यह तो मज़ेदार लगता है!', ta: 'அது சுவாரஸ்யமாக இருக்கிறது!' }
      ] },
    { id: 'c_i2', icon: '🕰️', title: 'Experiences (present perfect)', ml: 'അനുഭവങ്ങൾ (present perfect)', hi: 'अनुभव (present perfect)', ta: 'அனுபவங்கள் (present perfect)',
      focus: { en: 'Use have/has + past participle for experiences up to now: "I\'ve worked here for three years." Use "for" with a length of time and "since" with a starting point.', ml: 'ഇതുവരെയുള്ള അനുഭവങ്ങൾക്ക് have/has + past participle: "I\'ve worked here for three years." കാലയളവിന് "for", തുടങ്ങിയ സമയത്തിന് "since".', hi: 'अब तक के अनुभवों के लिए have/has + past participle: "I\'ve worked here for three years." अवधि के लिए "for", शुरुआत के समय के लिए "since"।', ta: 'இதுவரையிலான அனுபவங்களுக்கு have/has + past participle: "I\'ve worked here for three years." காலத்தின் நீளத்துக்கு "for", தொடங்கிய நேரத்துக்கு "since".' },
      phrases: [
        { en: "I've worked here for three years.", ml: 'ഞാൻ ഇവിടെ മൂന്ന് വർഷമായി ജോലി ചെയ്യുന്നു.', hi: 'मैं यहाँ तीन साल से काम कर रहा/रही हूँ।', ta: 'நான் இங்கே மூன்று ஆண்டுகளாக வேலை செய்கிறேன்.' },
        { en: "I've lived in this city since 2022.", ml: '2022 മുതൽ ഞാൻ ഈ നഗരത്തിലാണ് താമസം.', hi: 'मैं 2022 से इस शहर में रह रहा/रही हूँ।', ta: '2022 முதல் நான் இந்த நகரத்தில் வசிக்கிறேன்.' },
        { en: 'Have you ever been abroad?', ml: 'നിങ്ങൾ എപ്പോഴെങ്കിലും വിദേശത്ത് പോയിട്ടുണ്ടോ?', hi: 'क्या आप कभी विदेश गए हैं?', ta: 'நீங்கள் எப்போதாவது வெளிநாடு சென்றிருக்கிறீர்களா?' },
        { en: "I've never tried that before.", ml: 'ഞാൻ അത് ഇതുവരെ പരീക്ഷിച്ചിട്ടില്ല.', hi: 'मैंने यह पहले कभी नहीं आज़माया।', ta: 'நான் இதை இதுவரை முயற்சித்ததில்லை.' },
        { en: "She's just finished her shift.", ml: 'അവൾ ഇപ്പോൾ ഷിഫ്റ്റ് കഴിഞ്ഞതേയുള്ളൂ.', hi: 'उसकी शिफ़्ट अभी-अभी ख़त्म हुई है।', ta: 'அவள் இப்போதுதான் ஷிப்டை முடித்தாள்.' },
        { en: "We haven't met yet.", ml: 'നമ്മൾ ഇതുവരെ പരിചയപ്പെട്ടിട്ടില്ല.', hi: 'हम अभी तक नहीं मिले हैं।', ta: 'நாம் இதுவரை சந்தித்ததில்லை.' }
      ] },
    { id: 'c_i3', icon: '📆', title: 'Making arrangements', ml: 'പരിപാടികൾ തീരുമാനിക്കാം', hi: 'योजनाएँ बनाना', ta: 'ஏற்பாடுகள் செய்வது',
      focus: { en: 'Talk about plans with "I\'m going to…" or "I\'m meeting… at six". Suggest with "How about…?" and "Shall we…?"', ml: 'പദ്ധതികൾക്ക് "I\'m going to…" അല്ലെങ്കിൽ "I\'m meeting… at six". നിർദ്ദേശിക്കാൻ "How about…?", "Shall we…?"', hi: 'योजनाओं के लिए "I\'m going to…" या "I\'m meeting… at six"। सुझाव के लिए "How about…?" और "Shall we…?"', ta: 'திட்டங்களுக்கு "I\'m going to…" அல்லது "I\'m meeting… at six". பரிந்துரைக்க "How about…?", "Shall we…?"' },
      phrases: [
        { en: 'Are you free on Saturday?', ml: 'ശനിയാഴ്ച നിങ്ങൾ ഫ്രീയാണോ?', hi: 'क्या आप शनिवार को ख़ाली हैं?', ta: 'சனிக்கிழமை நீங்கள் ஓய்வாக இருக்கிறீர்களா?' },
        { en: 'How about meeting for coffee?', ml: 'ഒരു കാപ്പി കുടിക്കാൻ കണ്ടാലോ?', hi: 'कॉफ़ी पर मिलें तो कैसा रहेगा?', ta: 'காபி குடிக்கச் சந்திக்கலாமா?' },
        { en: "I'm working that day. Can we make it Sunday?", ml: 'അന്ന് എനിക്ക് ജോലിയുണ്ട്. ഞായറാഴ്ച ആക്കാമോ?', hi: 'उस दिन मेरा काम है। क्या हम रविवार रख सकते हैं?', ta: 'அன்று எனக்கு வேலை. ஞாயிற்றுக்கிழமை வைத்துக்கொள்ளலாமா?' },
        { en: "Shall we say ten o'clock?", ml: 'പത്ത് മണി ആക്കിയാലോ?', hi: 'दस बजे रखें?', ta: 'பத்து மணி வைத்துக்கொள்ளலாமா?' },
        { en: "I'm going to visit my cousin next week.", ml: 'അടുത്ത ആഴ്ച ഞാൻ എന്റെ കസിനെ കാണാൻ പോകുന്നു.', hi: 'मैं अगले हफ़्ते अपने कज़िन से मिलने जा रहा/रही हूँ।', ta: 'அடுத்த வாரம் என் உறவினரைப் பார்க்கப் போகிறேன்.' },
        { en: 'Sorry, I need to cancel. Can we reschedule?', ml: 'ക്ഷമിക്കണം, എനിക്ക് ഇത് റദ്ദാക്കേണ്ടി വരും. മറ്റൊരു ദിവസം ആക്കാമോ?', hi: 'माफ़ कीजिए, मुझे रद्द करना होगा। क्या हम दूसरा समय रख सकते हैं?', ta: 'மன்னிக்கவும், இதை ரத்து செய்ய வேண்டும். வேறு நேரம் வைக்கலாமா?' }
      ] },
    { id: 'c_i4', icon: '🗣️', title: 'Opinions and reasons', ml: 'അഭിപ്രായങ്ങളും കാരണങ്ങളും', hi: 'राय और कारण', ta: 'கருத்துகளும் காரணங்களும்',
      focus: { en: 'Give an opinion, then a reason: "I think…, because…". Disagree politely: "I see your point, but…"', ml: 'അഭിപ്രായം പറയുക, എന്നിട്ട് കാരണം: "I think…, because…". മര്യാദയോടെ വിയോജിക്കാൻ: "I see your point, but…"', hi: 'पहले राय, फिर कारण: "I think…, because…"। विनम्रता से असहमति: "I see your point, but…"', ta: 'கருத்தைச் சொல்லிப் பிறகு காரணம்: "I think…, because…". மரியாதையாக மாறுபட: "I see your point, but…"' },
      phrases: [
        { en: "I think it's a good idea, because it saves time.", ml: 'സമയം ലാഭിക്കുന്നതുകൊണ്ട് ഇതൊരു നല്ല ആശയമാണെന്ന് ഞാൻ കരുതുന്നു.', hi: 'मुझे लगता है यह अच्छा विचार है, क्योंकि इससे समय बचता है।', ta: 'நேரம் மிச்சமாவதால் இது நல்ல யோசனை என்று நினைக்கிறேன்.' },
        { en: 'In my opinion, the new roster is better.', ml: 'എന്റെ അഭിപ്രായത്തിൽ, പുതിയ റോസ്റ്ററാണ് നല്ലത്.', hi: 'मेरी राय में, नया रोस्टर बेहतर है।', ta: 'என் கருத்தில், புதிய பணி அட்டவணை சிறந்தது.' },
        { en: "I'm not sure about that.", ml: 'അതിനെക്കുറിച്ച് എനിക്ക് ഉറപ്പില്ല.', hi: 'मुझे इसके बारे में पक्का नहीं पता।', ta: 'அதைப் பற்றி எனக்கு உறுதியாகத் தெரியவில்லை.' },
        { en: "I see your point, but I don't agree.", ml: 'നിങ്ങൾ പറയുന്നത് മനസ്സിലായി, പക്ഷേ ഞാൻ യോജിക്കുന്നില്ല.', hi: 'मैं आपकी बात समझता/समझती हूँ, लेकिन मैं सहमत नहीं हूँ।', ta: 'உங்கள் கருத்து புரிகிறது, ஆனால் நான் உடன்படவில்லை.' },
        { en: "That's true, but there's another problem.", ml: 'അത് ശരിയാണ്, പക്ഷേ മറ്റൊരു പ്രശ്നമുണ്ട്.', hi: 'यह सच है, लेकिन एक और समस्या है।', ta: 'அது உண்மைதான், ஆனால் இன்னொரு பிரச்சனை இருக்கிறது.' },
        { en: 'What do you think?', ml: 'നിങ്ങൾ എന്ത് കരുതുന്നു?', hi: 'आप क्या सोचते हैं?', ta: 'நீங்கள் என்ன நினைக்கிறீர்கள்?' }
      ] },
    { id: 'c_i5', icon: '🙏', title: 'Polite requests at work', ml: 'ജോലിസ്ഥലത്തെ മര്യാദയുള്ള അഭ്യർത്ഥനകൾ', hi: 'काम पर विनम्र अनुरोध', ta: 'பணியிடத்தில் மரியாதையான கோரிக்கைகள்',
      focus: { en: 'Make requests softer with "Could you…?", "Would you mind …ing?" and "I was wondering if I could…".', ml: '"Could you…?", "Would you mind …ing?", "I was wondering if I could…" എന്നിവ ഉപയോഗിച്ച് അഭ്യർത്ഥനകൾ മൃദുവാക്കുക.', hi: '"Could you…?", "Would you mind …ing?" और "I was wondering if I could…" से अनुरोध नरम बनाएँ।', ta: '"Could you…?", "Would you mind …ing?", "I was wondering if I could…" மூலம் கோரிக்கைகளை மென்மையாக்குங்கள்.' },
      phrases: [
        { en: 'Could you help me with this, please?', ml: 'ഇതിൽ ഒന്ന് സഹായിക്കാമോ, പ്ലീസ്?', hi: 'क्या आप इसमें मेरी मदद कर सकते हैं, प्लीज़?', ta: 'இதில் எனக்கு உதவ முடியுமா, தயவுசெய்து?' },
        { en: 'Would you mind checking this for me?', ml: 'ഇതൊന്ന് പരിശോധിച്ച് തരാമോ?', hi: 'क्या आप मेरे लिए इसे जाँच देंगे?', ta: 'எனக்காக இதைச் சரிபார்க்க முடியுமா?' },
        { en: 'Do you think you could cover my shift on Friday?', ml: 'വെള്ളിയാഴ്ച എന്റെ ഷിഫ്റ്റ് നിങ്ങൾക്ക് എടുക്കാൻ പറ്റുമോ?', hi: 'क्या आप शुक्रवार को मेरी शिफ़्ट कर पाएँगे?', ta: 'வெள்ளிக்கிழமை என் ஷிப்டை நீங்கள் பார்த்துக்கொள்ள முடியுமா?' },
        { en: 'Is it okay if I leave a bit early today?', ml: 'ഇന്ന് ഞാൻ കുറച്ച് നേരത്തെ പോയാൽ കുഴപ്പമുണ്ടോ?', hi: 'क्या आज मैं थोड़ा जल्दी जा सकता/सकती हूँ?', ta: 'இன்று நான் கொஞ்சம் சீக்கிரம் கிளம்பலாமா?' },
        { en: 'I was wondering if I could have Monday off.', ml: 'തിങ്കളാഴ്ച എനിക്ക് അവധി കിട്ടുമോ എന്ന് ചോദിക്കാനായിരുന്നു.', hi: 'मैं पूछना चाहता/चाहती था/थी कि क्या मुझे सोमवार की छुट्टी मिल सकती है।', ta: 'திங்கள்கிழமை எனக்கு விடுப்பு கிடைக்குமா என்று கேட்க நினைத்தேன்.' },
        { en: 'Thanks, I really appreciate it.', ml: 'നന്ദി, ഇത് ഞാൻ ശരിക്കും വിലമതിക്കുന്നു.', hi: 'धन्यवाद, मैं सच में आभारी हूँ।', ta: 'நன்றி, இதை உண்மையில் பாராட்டுகிறேன்.' }
      ] },
    { id: 'c_i6', icon: '⚠️', title: 'Problems and complaints', ml: 'പ്രശ്നങ്ങളും പരാതികളും', hi: 'समस्याएँ और शिकायतें', ta: 'பிரச்சனைகளும் புகார்களும்',
      focus: { en: 'Explain the problem, say what you want, and stay polite: "I\'m afraid there\'s a problem with… Could I…?"', ml: 'പ്രശ്നം വിശദീകരിക്കുക, എന്താണ് വേണ്ടതെന്ന് പറയുക, മര്യാദ കൈവിടരുത്: "I\'m afraid there\'s a problem with… Could I…?"', hi: 'समस्या बताएँ, क्या चाहिए बताएँ, और विनम्र रहें: "I\'m afraid there\'s a problem with… Could I…?"', ta: 'பிரச்சனையை விளக்குங்கள், என்ன வேண்டும் என்று சொல்லுங்கள், மரியாதையாக இருங்கள்: "I\'m afraid there\'s a problem with… Could I…?"' },
      phrases: [
        { en: "I'm afraid there's a problem with my bill.", ml: 'എന്റെ ബില്ലിൽ ഒരു പ്രശ്നമുണ്ടെന്ന് തോന്നുന്നു.', hi: 'माफ़ कीजिए, मेरे बिल में एक समस्या है।', ta: 'என் கட்டணச் சீட்டில் ஒரு பிரச்சனை இருக்கிறது.' },
        { en: 'I was charged twice for the same thing.', ml: 'ഒരേ കാര്യത്തിന് രണ്ടുതവണ പണം ഈടാക്കി.', hi: 'एक ही चीज़ के लिए मुझसे दो बार पैसे लिए गए।', ta: 'ஒரே பொருளுக்கு என்னிடம் இரண்டு முறை கட்டணம் வசூலிக்கப்பட்டது.' },
        { en: 'It stopped working after two days.', ml: 'രണ്ട് ദിവസത്തിന് ശേഷം അത് പ്രവർത്തിക്കാതായി.', hi: 'यह दो दिन बाद काम करना बंद कर गया।', ta: 'இரண்டு நாட்களுக்குப் பிறகு அது வேலை செய்யவில்லை.' },
        { en: 'Could I get a refund, please?', ml: 'പണം തിരികെ തരാമോ, പ്ലീസ്?', hi: 'क्या मुझे रिफ़ंड मिल सकता है, प्लीज़?', ta: 'பணத்தைத் திருப்பித் தர முடியுமா, தயவுசெய்து?' },
        { en: "I'd like to speak to the manager, please.", ml: 'എനിക്ക് മാനേജരോട് സംസാരിക്കണം, പ്ലീസ്.', hi: 'मैं मैनेजर से बात करना चाहता/चाहती हूँ, प्लीज़।', ta: 'நான் மேலாளரிடம் பேச விரும்புகிறேன், தயவுசெய்து.' },
        { en: 'Thank you for sorting it out.', ml: 'ഇത് പരിഹരിച്ചതിന് നന്ദി.', hi: 'इसे सुलझाने के लिए धन्यवाद।', ta: 'இதைச் சரிசெய்ததற்கு நன்றி.' }
      ] },
    { id: 'c_i7', icon: '🧑‍💼', title: 'Describing your job and skills', ml: 'ജോലിയും കഴിവുകളും വിവരിക്കാം', hi: 'अपना काम और कौशल बताना', ta: 'உங்கள் வேலையும் திறன்களும்',
      focus: { en: 'Describe duties with the present simple ("I look after…") and achievements with the past simple ("I trained three new staff").', ml: 'ചുമതലകൾ present simple-ൽ ("I look after…"), നേട്ടങ്ങൾ past simple-ൽ ("I trained three new staff").', hi: 'ज़िम्मेदारियाँ present simple में ("I look after…"), उपलब्धियाँ past simple में ("I trained three new staff")।', ta: 'பொறுப்புகளை present simple-இல் ("I look after…"), சாதனைகளை past simple-இல் ("I trained three new staff") சொல்லுங்கள்.' },
      phrases: [
        { en: 'I look after eight patients on a morning shift.', ml: 'രാവിലത്തെ ഷിഫ്റ്റിൽ ഞാൻ എട്ട് രോഗികളെ നോക്കുന്നു.', hi: 'सुबह की शिफ़्ट में मैं आठ मरीज़ों की देखभाल करता/करती हूँ।', ta: 'காலை ஷிப்டில் நான் எட்டு நோயாளிகளைக் கவனிக்கிறேன்.' },
        { en: "I'm responsible for the medication round.", ml: 'മരുന്ന് കൊടുക്കുന്ന റൗണ്ടിന്റെ ചുമതല എനിക്കാണ്.', hi: 'दवा देने के राउंड की ज़िम्मेदारी मेरी है।', ta: 'மருந்து வழங்கும் சுற்றுக்கு நான் பொறுப்பு.' },
        { en: "I'm good at staying calm under pressure.", ml: 'സമ്മർദ്ദത്തിലും ശാന്തമായിരിക്കാൻ എനിക്ക് കഴിയും.', hi: 'दबाव में शांत रहना मुझे अच्छे से आता है।', ta: 'அழுத்தத்திலும் அமைதியாக இருப்பது எனக்கு நன்றாக வரும்.' },
        { en: 'Last year I trained three new staff members.', ml: 'കഴിഞ്ഞ വർഷം ഞാൻ മൂന്ന് പുതിയ ജീവനക്കാരെ പരിശീലിപ്പിച്ചു.', hi: 'पिछले साल मैंने तीन नए कर्मचारियों को प्रशिक्षण दिया।', ta: 'கடந்த ஆண்டு நான் மூன்று புதிய ஊழியர்களுக்குப் பயிற்சி அளித்தேன்.' },
        { en: 'I enjoy working in a team.', ml: 'ഒരു ടീമിൽ ജോലി ചെയ്യാൻ എനിക്ക് ഇഷ്ടമാണ്.', hi: 'मुझे टीम में काम करना अच्छा लगता है।', ta: 'குழுவாக வேலை செய்வது எனக்குப் பிடிக்கும்.' },
        { en: "I'd like to develop my leadership skills.", ml: 'എന്റെ നേതൃത്വ കഴിവുകൾ വളർത്താൻ ഞാൻ ആഗ്രഹിക്കുന്നു.', hi: 'मैं अपनी नेतृत्व क्षमता बढ़ाना चाहता/चाहती हूँ।', ta: 'என் தலைமைத் திறன்களை வளர்க்க விரும்புகிறேன்.' }
      ] },
    { id: 'c_i8', icon: '🔮', title: 'If, when and future plans', ml: 'If, when, ഭാവി പദ്ധതികൾ', hi: 'If, when और भविष्य की योजनाएँ', ta: 'If, when, எதிர்காலத் திட்டங்கள்',
      focus: { en: 'For real possibilities use If + present, will + verb: "If it rains, I\'ll take the bus." Use "will" for promises: "I\'ll call you."', ml: 'നടക്കാൻ സാധ്യതയുള്ള കാര്യങ്ങൾക്ക് If + present, will + verb: "If it rains, I\'ll take the bus." വാഗ്ദാനത്തിന് "will": "I\'ll call you."', hi: 'संभावित बातों के लिए If + present, will + verb: "If it rains, I\'ll take the bus." वादे के लिए "will": "I\'ll call you."', ta: 'நடக்கக்கூடியவற்றுக்கு If + present, will + verb: "If it rains, I\'ll take the bus." வாக்குறுதிக்கு "will": "I\'ll call you."' },
      phrases: [
        { en: "If I pass the exam, I'll apply for the job.", ml: 'പരീക്ഷ പാസായാൽ ഞാൻ ആ ജോലിക്ക് അപേക്ഷിക്കും.', hi: 'अगर मैं परीक्षा पास कर लूँ, तो उस नौकरी के लिए आवेदन करूँगा/करूँगी।', ta: 'தேர்வில் தேர்ச்சி பெற்றால், அந்த வேலைக்கு விண்ணப்பிப்பேன்.' },
        { en: "When I finish work, I'll call you.", ml: 'ജോലി കഴിഞ്ഞാൽ ഞാൻ വിളിക്കാം.', hi: 'काम ख़त्म होने पर मैं आपको फ़ोन करूँगा/करूँगी।', ta: 'வேலை முடிந்ததும் உங்களை அழைக்கிறேன்.' },
        { en: 'If you have any questions, let me know.', ml: 'എന്തെങ്കിലും സംശയമുണ്ടെങ്കിൽ എന്നോട് പറയൂ.', hi: 'अगर आपके कोई सवाल हों, तो मुझे बताइए।', ta: 'ஏதாவது கேள்வி இருந்தால் எனக்குத் தெரிவியுங்கள்.' },
        { en: "I'll send it to you this afternoon.", ml: 'ഇന്ന് ഉച്ചകഴിഞ്ഞ് ഞാൻ അത് അയക്കാം.', hi: 'मैं आज दोपहर इसे आपको भेज दूँगा/दूँगी।', ta: 'இன்று மதியம் அதை உங்களுக்கு அனுப்புகிறேன்.' },
        { en: "I'm hoping to move to a bigger flat next year.", ml: 'അടുത്ത വർഷം ഒരു വലിയ ഫ്ലാറ്റിലേക്ക് മാറാൻ ഞാൻ ആഗ്രഹിക്കുന്നു.', hi: 'मैं अगले साल बड़े फ़्लैट में जाने की उम्मीद कर रहा/रही हूँ।', ta: 'அடுத்த ஆண்டு பெரிய வீட்டுக்கு மாற நினைக்கிறேன்.' },
        { en: "Don't worry, I'll take care of it.", ml: 'വിഷമിക്കേണ്ട, ഞാൻ അത് നോക്കിക്കോളാം.', hi: 'चिंता मत कीजिए, मैं इसे संभाल लूँगा/लूँगी।', ta: 'கவலைப்படாதீர்கள், நான் அதைப் பார்த்துக்கொள்கிறேன்.' }
      ] }
  ]
};
