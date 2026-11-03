/* Indian English content: clear, professional English for working in India. Shown instead of the
   Australian lessons, slang, culture tips, listening clips and "everyday life" words when a learner
   chooses Indian English (see pack() in app.js). Each text has Malayalam (ml), Hindi (hi) and
   Tamil (ta). "Expressions" are Indian English words: fine in India, with a note when people
   abroad would say it differently. */

CONTENT_PACKS.in = {
  // ---- Interview preparation and the IELTS guide ----
  interview: {
    roles: ['Staff Nurse', 'Senior Nurse / Nursing In-charge', 'Nursing Assistant / GDA', 'Home-care nurse / attendant', 'Nursing Supervisor / Superintendent', 'Other healthcare role'],
    tips: {
      'Know the key frameworks': "NABH accreditation standards, your hospital's SOPs and infection-control protocols, SBAR or ISBAR handover, the International Patient Safety Goals and the Indian Nursing Council code of ethics.",
      'Dress and manner': 'Formal clothes, a friendly smile and eye contact. "Sir" and "Ma\'am" are normal with interview panels in India - follow the panel\'s lead.'
    },
    models: {
      'about:0': "I'm a staff nurse with six years' experience, mostly in medical and critical care wards. I started my career in Kochi, and for the last two years I've worked on a busy medical ward at a multi-speciality hospital in Bengaluru, where I often act as shift in-charge. I'm known for staying calm when things get busy and for clear communication with patients' families. I'm now looking for a senior role where I can keep building my leadership skills, and your hospital's focus on patient safety and NABH standards really matches my interests."
    }
  },
  guides: {
    'What you need for AHPRA': { t: 'Do you need IELTS?', d: 'IELTS is not needed to work in India, but many employers value a good band, and it is the first step if you plan to work abroad later - Australia (AHPRA) and the UK (NMC) usually ask for about <b>7.0</b>. Use this practice to measure and improve your speaking.' }
  },

  // ---- Everyday lessons ----
  lessons: [
    { id: 'in_greetings', icon: '🙏', title: 'Polite Greetings & Small Talk', ml: 'മര്യാദയുള്ള അഭിവാദ്യങ്ങളും ചെറുസംസാരവും', hi: 'शिष्ट अभिवादन और छोटी बातचीत', ta: 'மரியாதையான வாழ்த்துகளும் சிறு உரையாடலும்', phrases: [
      { en: 'Good morning! How are you doing?', ml: 'സുപ്രഭാതം! സുഖമാണോ?', hi: 'सुप्रभात! आप कैसे हैं?', ta: 'காலை வணக்கம்! எப்படி இருக்கிறீர்கள்?' },
      { en: "I'm fine, thank you. How about you?", ml: 'എനിക്ക് സുഖമാണ്, നന്ദി. നിങ്ങൾക്കോ?', hi: 'मैं ठीक हूँ, धन्यवाद। और आप?', ta: 'நான் நன்றாக இருக்கிறேன், நன்றி. நீங்கள்?' },
      { en: "Nice to meet you. I'm Anu, from the accounts team.", ml: 'കണ്ടതിൽ സന്തോഷം. ഞാൻ അനു, അക്കൗണ്ട്സ് ടീമിൽ നിന്നാണ്.', hi: 'आपसे मिलकर ख़ुशी हुई। मैं अनु हूँ, अकाउंट्स टीम से।', ta: 'உங்களைச் சந்தித்ததில் மகிழ்ச்சி. நான் அனு, கணக்குக் குழுவிலிருந்து.',
        tip: '"What is your good name?" എന്നതിന് പകരം "May I know your name?" എന്ന് ചോദിക്കുക.', tip_hi: '"What is your good name?" की जगह "May I know your name?" पूछें।', tip_ta: '"What is your good name?" என்பதற்குப் பதில் "May I know your name?" என்று கேளுங்கள்.' },
      { en: 'Where are you from originally?', ml: 'നിങ്ങൾ യഥാർത്ഥത്തിൽ എവിടെ നിന്നാണ്?', hi: 'आप मूल रूप से कहाँ से हैं?', ta: 'நீங்கள் உண்மையில் எந்த ஊர்?' },
      { en: 'How was your weekend?', ml: 'വീക്കെൻഡ് എങ്ങനെയുണ്ടായിരുന്നു?', hi: 'आपका वीकेंड कैसा रहा?', ta: 'உங்கள் வார இறுதி எப்படி இருந்தது?' },
      { en: "Sorry, I didn't catch that. Could you repeat it?", ml: 'ക്ഷമിക്കണം, മനസ്സിലായില്ല. ഒന്നുകൂടി പറയാമോ?', hi: 'माफ़ कीजिए, मैं समझ नहीं पाया/पाई। क्या आप दोहरा सकते हैं?', ta: 'மன்னிக்கவும், சரியாகக் கேட்கவில்லை. மீண்டும் சொல்ல முடியுமா?' },
      { en: 'Take care. See you tomorrow.', ml: 'ശ്രദ്ധിക്കൂ. നാളെ കാണാം.', hi: 'अपना ध्यान रखिए। कल मिलते हैं।', ta: 'கவனமாக இருங்கள். நாளை சந்திப்போம்.' }
    ] },
    { id: 'in_office', icon: '🏢', title: 'At the Office', ml: 'ഓഫീസിൽ', hi: 'दफ़्तर में', ta: 'அலுவலகத்தில்', phrases: [
      { en: 'Could you send me the report by 5 pm?', ml: 'വൈകിട്ട് 5 മണിക്കകം റിപ്പോർട്ട് അയക്കാമോ?', hi: 'क्या आप शाम 5 बजे तक रिपोर्ट भेज सकते हैं?', ta: 'மாலை 5 மணிக்குள் அறிக்கையை அனுப்ப முடியுமா?' },
      { en: "I'll get back to you by tomorrow.", ml: 'നാളെക്കകം ഞാൻ മറുപടി തരാം.', hi: 'मैं कल तक आपको जवाब दूँगा/दूँगी।', ta: 'நாளைக்குள் உங்களுக்குப் பதில் சொல்கிறேன்.',
        tip: '"I will revert back" എന്ന് പറയരുത് - "I\'ll get back to you" എന്നാണ് ശരി.', tip_hi: '"I will revert back" न कहें - सही है "I\'ll get back to you"।', tip_ta: '"I will revert back" என்று சொல்லாதீர்கள் - "I\'ll get back to you" என்பதே சரி.' },
      { en: 'Please find the file attached.', ml: 'ഫയൽ അറ്റാച്ച് ചെയ്തിട്ടുണ്ട്.', hi: 'फ़ाइल संलग्न है।', ta: 'கோப்பு இணைக்கப்பட்டுள்ளது.',
        tip: '"PFA" എന്ന ചുരുക്കം ഒഴിവാക്കുക; മുഴുവനായി എഴുതുക.', tip_hi: '"PFA" जैसा छोटा रूप न लिखें; पूरा लिखें।', tip_ta: '"PFA" போன்ற சுருக்கத்தைத் தவிர்த்து முழுமையாக எழுதுங்கள்.' },
      { en: 'The meeting has been moved to 11 am.', ml: 'മീറ്റിംഗ് രാവിലെ 11 മണിയിലേക്ക് മാറ്റി.', hi: 'मीटिंग सुबह 11 बजे कर दी गई है।', ta: 'கூட்டம் காலை 11 மணிக்கு மாற்றப்பட்டுள்ளது.' },
      { en: 'Could you help me with this, please?', ml: 'ഇതിൽ ഒന്ന് സഹായിക്കാമോ, പ്ലീസ്?', hi: 'क्या आप इसमें मेरी मदद कर सकते हैं, प्लीज़?', ta: 'இதில் எனக்கு உதவ முடியுமா, தயவுசெய்து?',
        tip: '"Kindly do the needful" എന്നതിന് പകരം എന്താണ് വേണ്ടതെന്ന് വ്യക്തമായി ചോദിക്കുക.', tip_hi: '"Kindly do the needful" की जगह साफ़ बताएँ कि क्या चाहिए।', tip_ta: '"Kindly do the needful" என்பதற்குப் பதில் என்ன வேண்டும் என்று தெளிவாகக் கேளுங்கள்.' },
      { en: "I'm working from home today.", ml: 'ഇന്ന് ഞാൻ വീട്ടിൽ നിന്നാണ് ജോലി ചെയ്യുന്നത്.', hi: 'आज मैं घर से काम कर रहा/रही हूँ।', ta: 'இன்று நான் வீட்டிலிருந்து வேலை செய்கிறேன்.' },
      { en: "I'll be on leave next week.", ml: 'അടുത്ത ആഴ്ച ഞാൻ ലീവിലായിരിക്കും.', hi: 'मैं अगले हफ़्ते छुट्टी पर रहूँगा/रहूँगी।', ta: 'அடுத்த வாரம் நான் விடுப்பில் இருப்பேன்.' }
    ] },
    { id: 'in_hospital', icon: '🏥', title: 'In the Hospital', ml: 'ആശുപത്രിയിൽ', hi: 'अस्पताल में', ta: 'மருத்துவமனையில்', phrases: [
      { en: 'Which ward is the patient admitted to?', ml: 'രോഗി ഏത് വാർഡിലാണ് അഡ്മിറ്റ് ആയിരിക്കുന്നത്?', hi: 'मरीज़ किस वार्ड में भर्ती है?', ta: 'நோயாளி எந்த வார்டில் அனுமதிக்கப்பட்டுள்ளார்?' },
      { en: 'The patient has had a fever since last night.', ml: 'ഇന്നലെ രാത്രി മുതൽ രോഗിക്ക് പനിയുണ്ട്.', hi: 'मरीज़ को कल रात से बुखार है।', ta: 'நோயாளிக்கு நேற்று இரவு முதல் காய்ச்சல்.',
        tip: '"The patient is having fever" എന്നല്ല, "has had a fever" എന്നാണ് ശരി.', tip_hi: '"The patient is having fever" नहीं, सही है "has had a fever"।', tip_ta: '"The patient is having fever" அல்ல, "has had a fever" என்பதே சரி.' },
      { en: 'Please inform the duty doctor.', ml: 'ഡ്യൂട്ടി ഡോക്ടറെ അറിയിക്കൂ.', hi: 'कृपया ड्यूटी डॉक्टर को सूचित करें।', ta: 'தயவுசெய்து பணியிலுள்ள மருத்துவருக்குத் தெரிவியுங்கள்.' },
      { en: 'His blood pressure is 90 over 60.', ml: 'അദ്ദേഹത്തിന്റെ ബ്ലഡ് പ്രഷർ 90/60 ആണ്.', hi: 'उनका ब्लड प्रेशर 90/60 है।', ta: 'அவருடைய இரத்த அழுத்தம் 90/60.' },
      { en: 'Visiting hours are from 4 to 6 pm.', ml: 'സന്ദർശന സമയം വൈകിട്ട് 4 മുതൽ 6 വരെയാണ്.', hi: 'मिलने का समय शाम 4 से 6 बजे तक है।', ta: 'பார்வையாளர் நேரம் மாலை 4 முதல் 6 வரை.' },
      { en: "Please don't worry. The doctor will see him soon.", ml: 'വിഷമിക്കേണ്ട. ഡോക്ടർ ഉടനെ അദ്ദേഹത്തെ കാണും.', hi: 'चिंता मत कीजिए। डॉक्टर जल्दी ही उन्हें देखेंगे।', ta: 'கவலைப்படாதீர்கள். மருத்துவர் விரைவில் அவரைப் பார்ப்பார்.' },
      { en: 'He passed away peacefully this morning.', ml: 'ഇന്ന് രാവിലെ അദ്ദേഹം സമാധാനപൂർവ്വം മരിച്ചു.', hi: 'आज सुबह वे शांति से चल बसे।', ta: 'இன்று காலை அவர் அமைதியாகக் காலமானார்.',
        tip: '"The patient expired" എന്ന് കുടുംബത്തോട് പറയരുത് - "passed away" എന്നാണ് മര്യാദ.', tip_hi: 'परिवार से "The patient expired" न कहें - "passed away" कहना शिष्ट है।', tip_ta: 'குடும்பத்தினரிடம் "The patient expired" என்று சொல்லாதீர்கள் - "passed away" என்பதே மரியாதையானது.' }
    ] },
    { id: 'in_phone', icon: '📞', title: 'Phone & Customer Calls', ml: 'ഫോൺ കോളുകൾ', hi: 'फ़ोन और ग्राहक कॉल', ta: 'தொலைபேசி அழைப்புகள்', phrases: [
      { en: 'Good afternoon, this is Ravi from City Hospital.', ml: 'ഗുഡ് ആഫ്റ്റർനൂൺ, സിറ്റി ഹോസ്പിറ്റലിൽ നിന്ന് രവിയാണ്.', hi: 'नमस्कार, मैं सिटी हॉस्पिटल से रवि बोल रहा हूँ।', ta: 'மதிய வணக்கம், நான் சிட்டி மருத்துவமனையிலிருந்து ரவி.' },
      { en: "May I know who's calling, please?", ml: 'ആരാണ് വിളിക്കുന്നതെന്ന് അറിയാമോ, പ്ലീസ്?', hi: 'क्या मैं जान सकता/सकती हूँ कि कौन बोल रहा है?', ta: 'யார் அழைக்கிறீர்கள் என்று தெரிந்துகொள்ளலாமா?' },
      { en: 'Could you hold for a moment, please?', ml: 'ഒരു നിമിഷം ലൈനിൽ നിൽക്കാമോ, പ്ലീസ്?', hi: 'क्या आप एक पल रुक सकते हैं, प्लीज़?', ta: 'தயவுசெய்து ஒரு நிமிடம் காத்திருக்க முடியுமா?' },
      { en: "I'll transfer your call to the billing team.", ml: 'നിങ്ങളുടെ കോൾ ബില്ലിംഗ് ടീമിലേക്ക് മാറ്റാം.', hi: 'मैं आपकी कॉल बिलिंग टीम को ट्रांसफ़र करता/करती हूँ।', ta: 'உங்கள் அழைப்பைக் கட்டணப் பிரிவுக்கு மாற்றுகிறேன்.' },
      { en: 'Sorry, the line is not clear. Can you hear me?', ml: 'ക്ഷമിക്കണം, ലൈൻ വ്യക്തമല്ല. എന്നെ കേൾക്കാമോ?', hi: 'माफ़ कीजिए, लाइन साफ़ नहीं है। क्या आप मुझे सुन पा रहे हैं?', ta: 'மன்னிக்கவும், இணைப்பு தெளிவாக இல்லை. நான் பேசுவது கேட்கிறதா?' },
      { en: 'Could you share your registered mobile number?', ml: 'നിങ്ങളുടെ രജിസ്റ്റർ ചെയ്ത മൊബൈൽ നമ്പർ പറയാമോ?', hi: 'क्या आप अपना रजिस्टर्ड मोबाइल नंबर बता सकते हैं?', ta: 'உங்கள் பதிவு செய்யப்பட்ட கைபேசி எண்ணைச் சொல்ல முடியுமா?' },
      { en: 'Thank you for calling. Have a nice day.', ml: 'വിളിച്ചതിന് നന്ദി. നല്ലൊരു ദിവസം ആശംസിക്കുന്നു.', hi: 'कॉल करने के लिए धन्यवाद। आपका दिन शुभ हो।', ta: 'அழைத்ததற்கு நன்றி. இனிய நாளாக அமையட்டும்.' }
    ] },
    { id: 'in_meetings', icon: '📊', title: 'Meetings & Video Calls', ml: 'മീറ്റിംഗുകളും വീഡിയോ കോളുകളും', hi: 'मीटिंग और वीडियो कॉल', ta: 'கூட்டங்களும் வீடியோ அழைப்புகளும்', phrases: [
      { en: 'Can everyone see my screen?', ml: 'എല്ലാവർക്കും എന്റെ സ്ക്രീൻ കാണാമോ?', hi: 'क्या सबको मेरी स्क्रीन दिख रही है?', ta: 'எல்லோருக்கும் என் திரை தெரிகிறதா?' },
      { en: "Sorry, you're on mute.", ml: 'ക്ഷമിക്കണം, നിങ്ങൾ മ്യൂട്ടിലാണ്.', hi: 'माफ़ कीजिए, आप म्यूट पर हैं।', ta: 'மன்னிக்கவும், நீங்கள் ஒலியடக்கத்தில் இருக்கிறீர்கள்.' },
      { en: 'Could I add something here?', ml: 'ഇവിടെ ഞാൻ ഒരു കാര്യം കൂടി പറയട്ടെ?', hi: 'क्या मैं यहाँ कुछ जोड़ सकता/सकती हूँ?', ta: 'இங்கே நான் ஒன்று சேர்க்கலாமா?' },
      { en: 'I see your point, but I have a concern.', ml: 'നിങ്ങൾ പറയുന്നത് മനസ്സിലായി, പക്ഷേ എനിക്ക് ഒരു ആശങ്കയുണ്ട്.', hi: 'मैं आपकी बात समझता/समझती हूँ, लेकिन मेरी एक चिंता है।', ta: 'உங்கள் கருத்து புரிகிறது, ஆனால் எனக்கு ஒரு கவலை உள்ளது.' },
      { en: "Let's discuss this separately after the meeting.", ml: 'ഇത് മീറ്റിംഗിന് ശേഷം നമുക്ക് പ്രത്യേകം സംസാരിക്കാം.', hi: 'इस पर हम मीटिंग के बाद अलग से बात करते हैं।', ta: 'இதைப் பற்றிக் கூட்டத்துக்குப் பிறகு தனியாகப் பேசலாம்.' },
      { en: 'To summarise, we agreed on three action points.', ml: 'ചുരുക്കത്തിൽ, നമ്മൾ മൂന്ന് കാര്യങ്ങളിൽ ധാരണയായി.', hi: 'संक्षेप में, हम तीन कार्य-बिंदुओं पर सहमत हुए।', ta: 'சுருக்கமாக, நாம் மூன்று செயல் புள்ளிகளில் உடன்பட்டோம்.' },
      { en: "Thank you, everyone. Let's meet again on Friday.", ml: 'എല്ലാവർക്കും നന്ദി. വെള്ളിയാഴ്ച വീണ്ടും കാണാം.', hi: 'सभी का धन्यवाद। शुक्रवार को फिर मिलते हैं।', ta: 'அனைவருக்கும் நன்றி. வெள்ளிக்கிழமை மீண்டும் சந்திப்போம்.' }
    ] },
    { id: 'in_interview', icon: '💼', title: 'Job Interview', ml: 'ജോലി ഇന്റർവ്യൂ', hi: 'नौकरी का इंटरव्यू', ta: 'வேலை நேர்காணல்', phrases: [
      { en: 'Tell me about yourself.', ml: 'നിങ്ങളെക്കുറിച്ച് പറയൂ.', hi: 'अपने बारे में बताइए।', ta: 'உங்களைப் பற்றிச் சொல்லுங்கள்.' },
      { en: 'I have five years of experience in critical care.', ml: 'എനിക്ക് ക്രിട്ടിക്കൽ കെയറിൽ അഞ്ച് വർഷത്തെ പരിചയമുണ്ട്.', hi: 'मुझे क्रिटिकल केयर में पाँच साल का अनुभव है।', ta: 'தீவிர சிகிச்சைப் பிரிவில் எனக்கு ஐந்து ஆண்டு அனுபவம் உள்ளது.',
        tip: '"I am having five years of experience" എന്നല്ല, "I have" എന്നാണ് ശരി.', tip_hi: '"I am having five years of experience" नहीं, सही है "I have"।', tip_ta: '"I am having five years of experience" அல்ல, "I have" என்பதே சரி.' },
      { en: 'I graduated from Kerala University in 2019.', ml: '2019-ൽ കേരള യൂണിവേഴ്സിറ്റിയിൽ നിന്ന് ബിരുദം നേടി.', hi: 'मैंने 2019 में केरल यूनिवर्सिटी से स्नातक किया।', ta: '2019-இல் கேரளா பல்கலைக்கழகத்தில் பட்டம் பெற்றேன்.',
        tip: '"I passed out in 2019" എന്നതിന് പകരം "I graduated in 2019" എന്ന് പറയുക.', tip_hi: '"I passed out in 2019" की जगह "I graduated in 2019" कहें।', tip_ta: '"I passed out in 2019" என்பதற்குப் பதில் "I graduated in 2019" என்று சொல்லுங்கள்.' },
      { en: 'My notice period is one month.', ml: 'എന്റെ നോട്ടീസ് പീരിയഡ് ഒരു മാസമാണ്.', hi: 'मेरा नोटिस पीरियड एक महीने का है।', ta: 'என் அறிவிப்புக் காலம் ஒரு மாதம்.' },
      { en: 'What are your salary expectations?', ml: 'നിങ്ങൾ എത്ര ശമ്പളം പ്രതീക്ഷിക്കുന്നു?', hi: 'आपकी वेतन अपेक्षाएँ क्या हैं?', ta: 'நீங்கள் எவ்வளவு சம்பளம் எதிர்பார்க்கிறீர்கள்?' },
      { en: 'Could you tell me more about the team?', ml: 'ടീമിനെക്കുറിച്ച് കൂടുതൽ പറയാമോ?', hi: 'क्या आप टीम के बारे में और बता सकते हैं?', ta: 'குழுவைப் பற்றி மேலும் சொல்ல முடியுமா?' },
      { en: 'Thank you for the opportunity.', ml: 'ഈ അവസരത്തിന് നന്ദി.', hi: 'इस अवसर के लिए धन्यवाद।', ta: 'இந்த வாய்ப்புக்கு நன்றி.' }
    ] },
    { id: 'in_services', icon: '🏦', title: 'Banks & Offices', ml: 'ബാങ്കുകളും ഓഫീസുകളും', hi: 'बैंक और दफ़्तर', ta: 'வங்கிகளும் அலுவலகங்களும்', phrases: [
      { en: "I'd like to open a savings account.", ml: 'എനിക്ക് ഒരു സേവിംഗ്സ് അക്കൗണ്ട് തുടങ്ങണം.', hi: 'मैं एक बचत खाता खोलना चाहता/चाहती हूँ।', ta: 'நான் ஒரு சேமிப்புக் கணக்கு தொடங்க விரும்புகிறேன்.' },
      { en: 'Which documents do I need?', ml: 'എന്തൊക്കെ രേഖകൾ വേണം?', hi: 'मुझे कौन-से दस्तावेज़ चाहिए?', ta: 'எந்த ஆவணங்கள் தேவை?' },
      { en: 'Here are copies of my Aadhaar and PAN card.', ml: 'ഇതാ എന്റെ ആധാറിന്റെയും പാൻ കാർഡിന്റെയും പകർപ്പുകൾ.', hi: 'ये रहीं मेरे आधार और पैन कार्ड की कॉपियाँ।', ta: 'இதோ என் ஆதார், பான் கார்டு நகல்கள்.' },
      { en: "There's an error in my statement.", ml: 'എന്റെ സ്റ്റേറ്റ്മെന്റിൽ ഒരു തെറ്റുണ്ട്.', hi: 'मेरे स्टेटमेंट में एक ग़लती है।', ta: 'என் கணக்கு அறிக்கையில் ஒரு பிழை உள்ளது.' },
      { en: 'How long will it take to process?', ml: 'ഇത് പൂർത്തിയാകാൻ എത്ര സമയമെടുക്കും?', hi: 'इसमें कितना समय लगेगा?', ta: 'இதை முடிக்க எவ்வளவு நேரம் ஆகும்?' },
      { en: 'Could I speak to the manager, please?', ml: 'മാനേജരോട് സംസാരിക്കാമോ, പ്ലീസ്?', hi: 'क्या मैं मैनेजर से बात कर सकता/सकती हूँ, प्लीज़?', ta: 'தயவுசெய்து மேலாளரிடம் பேசலாமா?' },
      { en: 'Thank you for your help.', ml: 'സഹായത്തിന് നന്ദി.', hi: 'आपकी मदद के लिए धन्यवाद।', ta: 'உங்கள் உதவிக்கு நன்றி.' }
    ] },
    { id: 'in_travel', icon: '🚆', title: 'Travel & Getting Around', ml: 'യാത്ര', hi: 'यात्रा और आना-जाना', ta: 'பயணம்', phrases: [
      { en: 'Is this train going to Chennai?', ml: 'ഈ ട്രെയിൻ ചെന്നൈയിലേക്കാണോ?', hi: 'क्या यह ट्रेन चेन्नई जा रही है?', ta: 'இந்த ரயில் சென்னைக்குப் போகிறதா?' },
      { en: 'Which platform does it leave from?', ml: 'ഏത് പ്ലാറ്റ്ഫോമിൽ നിന്നാണ് പുറപ്പെടുന്നത്?', hi: 'यह किस प्लेटफ़ॉर्म से जाती है?', ta: 'அது எந்த நடைமேடையிலிருந்து புறப்படும்?' },
      { en: 'Please go by the meter.', ml: 'മീറ്റർ പ്രകാരം പോകൂ, പ്ലീസ്.', hi: 'कृपया मीटर से चलिए।', ta: 'தயவுசெய்து மீட்டர் கட்டணத்தில் செல்லுங்கள்.' },
      { en: 'Could you drop me at the hospital gate?', ml: 'ആശുപത്രി ഗേറ്റിൽ ഇറക്കാമോ?', hi: 'क्या आप मुझे अस्पताल के गेट पर छोड़ सकते हैं?', ta: 'மருத்துவமனை வாசலில் இறக்கிவிட முடியுமா?' },
      { en: 'My flight has been delayed by two hours.', ml: 'എന്റെ ഫ്ലൈറ്റ് രണ്ട് മണിക്കൂർ വൈകി.', hi: 'मेरी फ़्लाइट दो घंटे लेट है।', ta: 'என் விமானம் இரண்டு மணி நேரம் தாமதமாகியுள்ளது.' },
      { en: 'Where can I get a prepaid taxi?', ml: 'പ്രീപെയ്ഡ് ടാക്സി എവിടെ കിട്ടും?', hi: 'प्रीपेड टैक्सी कहाँ मिलेगी?', ta: 'முன்கட்டண டாக்சி எங்கே கிடைக்கும்?' },
      { en: 'How long will it take to get there?', ml: 'അവിടെ എത്താൻ എത്ര സമയമെടുക്കും?', hi: 'वहाँ पहुँचने में कितना समय लगेगा?', ta: 'அங்கே போய்ச் சேர எவ்வளவு நேரம் ஆகும்?' }
    ] }
  ],

  // ---- Indian English expressions ----
  slang: [
    { word: 'prepone', means: 'move to an earlier time (fine in India; abroad say "bring forward")', ex: 'Can we prepone the meeting to 10?', ml: 'നേരത്തെയാക്കുക', hi: 'पहले करना', ta: 'முன்னதாக மாற்றுதல்' },
    { word: 'revert', means: 'reply (clearer: "get back to you")', ex: "I'll get back to you by Monday.", ml: 'മറുപടി നൽകുക', hi: 'जवाब देना', ta: 'பதில் சொல்லுதல்' },
    { word: 'do the needful', means: 'do what is required (vague - say exactly what you need)', ex: 'Please approve the leave request today.', ml: 'ആവശ്യമായത് ചെയ്യുക', hi: 'ज़रूरी काम करना', ta: 'தேவையானதைச் செய்தல்' },
    { word: 'out of station', means: 'out of town, travelling', ex: "I'll be out of town until Monday.", ml: 'സ്ഥലത്തില്ല, യാത്രയിൽ', hi: 'शहर से बाहर', ta: 'ஊரில் இல்லை' },
    { word: 'co-brother', means: "your wife's sister's husband", ex: 'My co-brother works in Dubai.', ml: 'ഭാര്യയുടെ സഹോദരിയുടെ ഭർത്താവ്', hi: 'साढ़ू', ta: 'சகலை' },
    { word: 'cousin brother', means: 'male cousin (abroad, just say "cousin")', ex: 'My cousin is visiting this weekend.', ml: 'കസിൻ', hi: 'चचेरा / ममेरा भाई', ta: 'ஒன்றுவிட்ட சகோதரன்' },
    { word: 'passed out', means: 'graduated (abroad "passed out" means fainted - say "graduated")', ex: 'I graduated in 2019.', ml: 'പഠിച്ചിറങ്ങി', hi: 'स्नातक हुए', ta: 'படிப்பை முடித்தேன்' },
    { word: 'batchmate', means: 'a classmate from the same year', ex: 'She was my batchmate at nursing college.', ml: 'സഹപാഠി', hi: 'बैचमेट, सहपाठी', ta: 'ஒரே ஆண்டு வகுப்புத் தோழர்' },
    { word: 'timepass', means: 'something done just to pass the time', ex: 'We watched a film just for fun.', ml: 'സമയം കളയൽ', hi: 'टाइमपास', ta: 'பொழுதுபோக்கு' },
    { word: 'lakh', means: '100,000 (one hundred thousand)', ex: 'The course costs two lakh rupees.', ml: 'ലക്ഷം', hi: 'लाख', ta: 'லட்சம்' },
    { word: 'crore', means: '10,000,000 (ten million)', ex: 'The project budget is five crore.', ml: 'കോടി', hi: 'करोड़', ta: 'கோடி' },
    { word: 'tiffin', means: 'a packed lunch or light meal', ex: 'I bring my tiffin to work.', ml: 'ഉച്ചഭക്ഷണപ്പൊതി', hi: 'टिफ़िन', ta: 'சாப்பாட்டு டப்பா' },
    { word: 'PG', means: 'paying guest - a rented room, often with meals', ex: 'I stay in a PG near the hospital.', ml: 'പേയിംഗ് ഗസ്റ്റ് താമസം', hi: 'पेइंग गेस्ट', ta: 'பணம் செலுத்தித் தங்குமிடம்' },
    { word: 'OPD', means: 'outpatient department', ex: 'The OPD opens at 9 am.', ml: 'ഒ.പി. വിഭാഗം', hi: 'ओपीडी, बाह्य रोगी विभाग', ta: 'வெளிநோயாளர் பிரிவு' },
    { word: 'casualty', means: 'the emergency department', ex: 'Take him to casualty immediately.', ml: 'അത്യാഹിത വിഭാഗം', hi: 'आपातकालीन विभाग', ta: 'அவசர சிகிச்சைப் பிரிவு' },
    { word: 'sister', means: 'a nurse (a polite way to address one in India)', ex: 'Sister, could you check his drip?', ml: 'നഴ്സ് (ബഹുമാനത്തോടെ)', hi: 'नर्स (सम्मान से)', ta: 'செவிலியர் (மரியாதையாக)' },
    { word: 'duty doctor', means: 'the doctor on shift', ex: 'Please call the duty doctor.', ml: 'ഡ്യൂട്ടി ഡോക്ടർ', hi: 'ड्यूटी डॉक्टर', ta: 'பணியிலுள்ள மருத்துவர்' },
    { word: 'attender', means: 'the family member who stays with a patient in hospital', ex: "The patient's attender is waiting outside.", ml: 'രോഗിയുടെ കൂടെ നിൽക്കുന്ന ബന്ധു', hi: 'मरीज़ के साथ रहने वाला परिजन', ta: 'நோயாளியுடன் தங்கும் உறவினர்' },
    { word: 'good name', means: 'your name (old-fashioned - say "May I know your name?")', ex: 'May I know your name, please?', ml: 'പേര്', hi: 'शुभ नाम', ta: 'பெயர்' },
    { word: 'kindly', means: 'please (sounds formal; "please" is more natural)', ex: 'Please sign here.', ml: 'ദയവായി', hi: 'कृपया', ta: 'தயவுசெய்து' },
    { word: 'updation', means: 'an update (say "update")', ex: 'Is there any update on my file?', ml: 'പുതുക്കൽ', hi: 'अपडेट', ta: 'புதுப்பிப்பு' },
    { word: 'intimate', means: 'inform (abroad it can sound personal - say "inform" or "let us know")', ex: 'Please let HR know about your leave.', ml: 'അറിയിക്കുക', hi: 'सूचित करना', ta: 'தெரிவித்தல்' },
    { word: 'same to same', means: 'exactly the same (say "exactly the same")', ex: 'The two reports are exactly the same.', ml: 'അതേപടി', hi: 'बिल्कुल एक जैसा', ta: 'அப்படியே ஒரே மாதிரி' },
    { word: 'itself', means: 'for emphasis, as in "today itself" (abroad, "today" is enough)', ex: 'Please send it today.', ml: 'ഇന്നുതന്നെ', hi: 'आज ही', ta: 'இன்றே' },
    { word: 'hill station', means: 'a cool mountain holiday town', ex: 'We went to Munnar, a hill station.', ml: 'മലമ്പ്രദേശത്തെ വിനോദസ്ഥലം', hi: 'हिल स्टेशन', ta: 'மலைவாசஸ்தலம்' },
    { word: 'chai', means: 'tea with milk and spices', ex: 'Shall we have chai?', ml: 'ചായ', hi: 'चाय', ta: 'டீ' },
    { word: 'appraisal', means: 'a yearly performance review', ex: 'My appraisal is next month.', ml: 'വാർഷിക പ്രവർത്തന വിലയിരുത്തൽ', hi: 'सालाना कार्य मूल्यांकन', ta: 'ஆண்டு செயல்திறன் மதிப்பீடு' },
    { word: 'WFH', means: 'work from home', ex: "I'm working from home on Friday.", ml: 'വീട്ടിൽ നിന്നുള്ള ജോലി', hi: 'घर से काम', ta: 'வீட்டிலிருந்து வேலை' },
    { word: 'scheme', means: 'a government programme (abroad "scheme" can sound dishonest - say "programme")', ex: 'She joined a government health programme.', ml: 'പദ്ധതി', hi: 'योजना', ta: 'திட்டம்' },
    { word: 'loose motions', means: 'diarrhoea', ex: 'He has had diarrhoea since last night.', ml: 'വയറിളക്കം', hi: 'दस्त', ta: 'வயிற்றுப்போக்கு' }
  ],

  // ---- Workplace tips ----
  tips: [
    { icon: '📧', title: 'Clear, specific requests', en: 'Say exactly what you need and by when: "Please send the signed form by Friday" is better than "Kindly do the needful."', ml: 'എന്താണ് വേണ്ടതെന്നും എപ്പോഴേക്കാണെന്നും വ്യക്തമായി പറയുക: "Kindly do the needful" എന്നതിനേക്കാൾ "Please send the signed form by Friday" ആണ് നല്ലത്.', hi: 'साफ़ बताएँ कि क्या चाहिए और कब तक: "Kindly do the needful" से बेहतर है "Please send the signed form by Friday"।', ta: 'என்ன வேண்டும், எப்போதுக்குள் என்று தெளிவாகச் சொல்லுங்கள்: "Kindly do the needful" என்பதை விட "Please send the signed form by Friday" சிறந்தது.' },
    { icon: '🙋', title: 'Sir and Ma\'am', en: 'In many Indian workplaces "Sir" and "Ma\'am" are normal. With international clients, use first names once they invite you to.', ml: 'പല ഇന്ത്യൻ ജോലിസ്ഥലങ്ങളിലും "Sir", "Ma\'am" സാധാരണമാണ്. വിദേശ ക്ലയന്റുകൾ ക്ഷണിച്ചാൽ അവരെ പേര് വിളിക്കുക.', hi: 'कई भारतीय दफ़्तरों में "Sir" और "Ma\'am" सामान्य है। विदेशी क्लाइंट कहें तो उन्हें नाम से बुलाएँ।', ta: 'பல இந்தியப் பணியிடங்களில் "Sir", "Ma\'am" வழக்கம். வெளிநாட்டு வாடிக்கையாளர்கள் சொன்னால் பெயர் சொல்லி அழையுங்கள்.' },
    { icon: '⏰', title: 'Be on time', en: 'Arrive on time for meetings and interviews, and message early if you will be late. International clients expect strict timing.', ml: 'മീറ്റിംഗുകൾക്കും ഇന്റർവ്യൂകൾക്കും കൃത്യസമയത്ത് എത്തുക; വൈകുമെങ്കിൽ നേരത്തെ മെസ്സേജ് ചെയ്യുക. വിദേശ ക്ലയന്റുകൾ കൃത്യനിഷ്ഠ പ്രതീക്ഷിക്കും.', hi: 'मीटिंग और इंटरव्यू में समय पर पहुँचें, और देर हो तो पहले मैसेज करें। विदेशी क्लाइंट समय की पाबंदी चाहते हैं।', ta: 'கூட்டங்களுக்கும் நேர்காணல்களுக்கும் நேரத்துக்கு வாருங்கள்; தாமதமானால் முன்கூட்டியே தெரிவியுங்கள். வெளிநாட்டு வாடிக்கையாளர்கள் நேரந்தவறாமையை எதிர்பார்ப்பார்கள்.' },
    { icon: '🌍', title: 'Time zones', en: 'When you work with other countries, always state the time zone: "3 pm IST" or "9 am UK time".', ml: 'മറ്റ് രാജ്യങ്ങളുമായി ജോലി ചെയ്യുമ്പോൾ സമയമേഖല എപ്പോഴും പറയുക: "3 pm IST" അല്ലെങ്കിൽ "9 am UK time".', hi: 'दूसरे देशों के साथ काम करते समय हमेशा टाइम ज़ोन बताएँ: "3 pm IST" या "9 am UK time"।', ta: 'பிற நாடுகளுடன் வேலை செய்யும்போது நேர மண்டலத்தை எப்போதும் குறிப்பிடுங்கள்: "3 pm IST" அல்லது "9 am UK time".' },
    { icon: '🔢', title: 'Lakhs and millions', en: 'Indians count in lakhs and crores; most of the world uses thousands and millions. 10 lakh = 1 million; 1 crore = 10 million.', ml: 'ഇന്ത്യക്കാർ ലക്ഷം, കോടി എന്ന് എണ്ണുന്നു; ലോകത്തിന്റെ മിക്ക ഭാഗങ്ങളിലും thousand, million ആണ്. 10 ലക്ഷം = 1 million; 1 കോടി = 10 million.', hi: 'भारत में लाख और करोड़ में गिनते हैं; बाक़ी दुनिया हज़ार और मिलियन में। 10 लाख = 1 मिलियन; 1 करोड़ = 10 मिलियन।', ta: 'இந்தியர்கள் லட்சம், கோடி என்று எண்ணுவார்கள்; உலகின் பெரும்பகுதி ஆயிரம், மில்லியன் என்று. 10 லட்சம் = 1 மில்லியன்; 1 கோடி = 10 மில்லியன்.' },
    { icon: '✉️', title: 'Short, polite emails', en: 'Start with "Hi Priya" or "Dear Mr Rao", keep it short, put the request first, and end with "Thanks" or "Best regards".', ml: '"Hi Priya" അല്ലെങ്കിൽ "Dear Mr Rao" എന്ന് തുടങ്ങുക, ചുരുക്കി എഴുതുക, ആവശ്യം ആദ്യം പറയുക, "Thanks" അല്ലെങ്കിൽ "Best regards" എന്ന് അവസാനിപ്പിക്കുക.', hi: '"Hi Priya" या "Dear Mr Rao" से शुरू करें, छोटा रखें, अनुरोध पहले लिखें, और "Thanks" या "Best regards" से ख़त्म करें।', ta: '"Hi Priya" அல்லது "Dear Mr Rao" என்று தொடங்குங்கள், சுருக்கமாக எழுதுங்கள், கோரிக்கையை முதலில் வையுங்கள், "Thanks" அல்லது "Best regards" என்று முடியுங்கள்.' },
    { icon: '🗣️', title: 'Speak up in meetings', en: 'It is fine to disagree politely: "I see your point, but…" Silence can be read as agreement.', ml: 'മര്യാദയോടെ വിയോജിക്കുന്നതിൽ തെറ്റില്ല: "I see your point, but…" മിണ്ടാതിരുന്നാൽ സമ്മതമായി കണക്കാക്കാം.', hi: 'विनम्रता से असहमत होना ठीक है: "I see your point, but…" चुप रहने को सहमति समझा जा सकता है।', ta: 'மரியாதையாக மாறுபட்ட கருத்தைச் சொல்வது சரி: "I see your point, but…" மௌனம் சம்மதமாகக் கருதப்படலாம்.' },
    { icon: '☎️', title: 'Phone manners', en: 'Answer with your name and organisation, and ask "How may I help you?". Avoid "Tell me" or "Yes, what?".', ml: 'നിങ്ങളുടെ പേരും സ്ഥാപനവും പറഞ്ഞ് ഫോൺ എടുക്കുക, "How may I help you?" എന്ന് ചോദിക്കുക. "Tell me" അല്ലെങ്കിൽ "Yes, what?" ഒഴിവാക്കുക.', hi: 'फ़ोन उठाकर अपना नाम और संस्था बताएँ, और पूछें "How may I help you?"। "Tell me" या "Yes, what?" से बचें।', ta: 'உங்கள் பெயரையும் நிறுவனத்தையும் சொல்லி அழைப்பை ஏற்று "How may I help you?" என்று கேளுங்கள். "Tell me", "Yes, what?" தவிர்க்கவும்.' },
    { icon: '🚑', title: 'Emergency numbers', en: 'In an emergency, call 112. For an ambulance, many states use 108.', ml: 'അടിയന്തര സാഹചര്യത്തിൽ 112 വിളിക്കുക. ആംബുലൻസിന് പല സംസ്ഥാനങ്ങളിലും 108.', hi: 'आपात स्थिति में 112 पर कॉल करें। एम्बुलेंस के लिए कई राज्यों में 108।', ta: 'அவசரத்தில் 112 அழையுங்கள். ஆம்புலன்ஸுக்குப் பல மாநிலங்களில் 108.' },
    { icon: '📅', title: 'Dates', en: 'Dates are written day / month / year (for example 30/10/2026). US clients write month / day first - check carefully.', ml: 'തീയതി ദിവസം / മാസം / വർഷം ക്രമത്തിലാണ് (ഉദാ: 30/10/2026). അമേരിക്കൻ ക്ലയന്റുകൾ മാസം ആദ്യം എഴുതും - ശ്രദ്ധിക്കുക.', hi: 'तारीख़ दिन / महीना / साल क्रम में लिखी जाती है (जैसे 30/10/2026)। अमेरिकी क्लाइंट महीना पहले लिखते हैं - ध्यान से देखें।', ta: 'தேதி நாள் / மாதம் / ஆண்டு வரிசையில் எழுதப்படும் (எ.கா. 30/10/2026). அமெரிக்க வாடிக்கையாளர்கள் மாதத்தை முதலில் எழுதுவார்கள் - கவனமாகப் பாருங்கள்.' },
    { icon: '🤝', title: 'Small talk', en: 'Light small talk about the weekend, food or cricket builds rapport. Avoid personal questions about salary, marriage or religion with new colleagues.', ml: 'വീക്കെൻഡ്, ഭക്ഷണം, ക്രിക്കറ്റ് എന്നിവയെക്കുറിച്ചുള്ള ചെറുസംസാരം അടുപ്പമുണ്ടാക്കും. പുതിയ സഹപ്രവർത്തകരോട് ശമ്പളം, വിവാഹം, മതം പോലുള്ള വ്യക്തിപരമായ ചോദ്യങ്ങൾ ഒഴിവാക്കുക.', hi: 'वीकेंड, खाने या क्रिकेट पर हल्की बातचीत से रिश्ता बनता है। नए सहकर्मियों से वेतन, शादी या धर्म जैसे निजी सवाल न पूछें।', ta: 'வார இறுதி, உணவு, கிரிக்கெட் பற்றிய சிறு உரையாடல் நெருக்கத்தை உருவாக்கும். புதிய சக ஊழியர்களிடம் சம்பளம், திருமணம், மதம் போன்ற தனிப்பட்ட கேள்விகளைத் தவிர்க்கவும்.' },
    { icon: '👂', title: 'Check understanding', en: 'With clients and patients, repeat the key points back: "Just to confirm, you need the report by Monday?"', ml: 'ക്ലയന്റുകളോടും രോഗികളോടും പ്രധാന കാര്യങ്ങൾ ആവർത്തിച്ച് ഉറപ്പാക്കുക: "Just to confirm, you need the report by Monday?"', hi: 'क्लाइंट और मरीज़ों के साथ मुख्य बातें दोहराकर पक्का करें: "Just to confirm, you need the report by Monday?"', ta: 'வாடிக்கையாளர்களிடமும் நோயாளிகளிடமும் முக்கியக் கருத்துகளைத் திருப்பிச் சொல்லி உறுதிசெய்யுங்கள்: "Just to confirm, you need the report by Monday?"' }
  ],

  // ---- Listening: patients and colleagues speaking fast Indian English ----
  listening: [
    { say: 'Sister, my mother is having giddiness from morning and she is not taking any food also.', options: ['Her mother has felt dizzy since morning and has not eaten.', 'Her mother went out this morning without food.', 'Her mother is happy and eating well.'], answer: 0, note: '"giddiness" = dizziness; "from morning" = since this morning.' },
    { say: "Doctor, I'm having loose motions since yesterday night, five-six times already.", options: ['He has been moving house since last night.', 'He has had diarrhoea since last night, five or six times.', 'He has been walking a lot.'], answer: 1, note: '"loose motions" = diarrhoea.' },
    { say: 'Madam, the report will come by evening only, you please come tomorrow morning.', options: ['The report will be ready only in the evening, so come back tomorrow morning.', 'The report is ready now.', 'The report was lost.'], answer: 0, note: '"by evening only" = not before the evening.' },
    { say: "Boss is in a meeting. He'll call you back, just give a missed call to his number.", options: ['Do not call at all.', 'Send him an email instead.', 'Ring his number once and hang up so he sees it and calls back.'], answer: 2, note: '"give a missed call" = ring once and hang up so the other person calls back.' },
    { say: 'My BP is shooting up whenever I take tension, doctor.', options: ['His blood pressure rises when he is stressed.', 'He shoots at targets.', 'His blood pressure is always low.'], answer: 0, note: '"take tension" = feel stressed or worried.' },
    { say: "We'll do one thing: you send the details on WhatsApp, I'll check and revert.", options: ['Do only one task today.', 'Send the details on WhatsApp and he will check and reply.', 'He will not reply.'], answer: 1, note: '"We\'ll do one thing" = here is a suggestion; "revert" = reply.' },
    { say: "The patient's attender is asking for the discharge summary, sister.", options: ['The family member staying with the patient wants the discharge report.', 'The patient wants to leave without a report.', 'A doctor is asking for a summary.'], answer: 0, note: '"attender" = the family member who stays with a patient in Indian hospitals.' },
    { say: 'Sir, the server is down since morning. Our team is looking into it, it will be up by afternoon.', options: ['The server was moved downstairs.', 'The team went home.', 'The system has not worked since morning and should work again by afternoon.'], answer: 2, note: '"down" = not working; "up" = working again.' },
    { say: 'Aunty is having pain in her stomach, she vomited twice, she is very weak only.', options: ['The older woman has stomach pain, has vomited twice and is very weak.', 'The older woman is cooking.', 'The older woman feels strong.'], answer: 0, note: '"Aunty" = a polite word for an older woman; "only" here adds emphasis.' },
    { say: 'Kindly intimate us two days prior if you are taking leave.', options: ['Take leave for two days.', 'Tell us two days before if you will take leave.', 'Do not take any leave.'], answer: 1, note: '"intimate" = inform; "prior" = before.' },
    { say: "He's out of station for a week, he'll join back on Monday.", options: ['He has left the job.', 'He missed the train.', 'He is away from town for a week and will return to work on Monday.'], answer: 2, note: '"out of station" = away from town; "join back" = return to work.' },
    { say: 'Doctor told to take these tablets after food, twice daily, for five days.', options: ['Take the tablets after meals, twice a day, for five days.', 'Take the tablets before food, once a day.', 'Take them only when needed.'], answer: 0, note: 'In standard English: "The doctor told me to take…"' }
  ],

  // ---- "Everyday life" vocabulary (replaces the Australian set) ----
  life: { id: 'in_life', title: 'Everyday life and work in India', words: [
    { w: 'Aadhaar', m: "India's 12-digit identity number", ml: 'ആധാർ - 12 അക്ക തിരിച്ചറിയൽ നമ്പർ', hi: 'आधार - 12 अंकों की पहचान संख्या', ta: 'ஆதார் - 12 இலக்க அடையாள எண்', ex: 'Please bring your Aadhaar card for verification.' },
    { w: 'PAN card', m: 'your tax identity card', ml: 'നികുതി തിരിച്ചറിയൽ കാർഡ്', hi: 'टैक्स पहचान कार्ड', ta: 'வரி அடையாள அட்டை', ex: 'You need a PAN card to open a bank account.' },
    { w: 'UPI', m: 'instant mobile bank payments', ml: 'മൊബൈൽ വഴി ഉടനടി പണം അയയ്ക്കൽ', hi: 'मोबाइल से तुरंत भुगतान', ta: 'கைபேசி மூலம் உடனடிப் பணப் பரிமாற்றம்', ex: 'Can I pay by UPI?' },
    { w: 'EMI', m: 'a fixed monthly loan payment', ml: 'മാസത്തവണ', hi: 'मासिक किस्त', ta: 'மாதத் தவணை', ex: 'The EMI for my car loan is due on the 5th.' },
    { w: 'PF', m: 'Provident Fund - retirement savings from your salary', ml: 'പ്രോവിഡന്റ് ഫണ്ട് - വിരമിക്കൽ സമ്പാദ്യം', hi: 'भविष्य निधि', ta: 'வருங்கால வைப்பு நிதி', ex: 'Twelve percent of my salary goes to PF.' },
    { w: 'CTC', m: 'cost to company - your total yearly pay package', ml: 'ആകെ വാർഷിക ശമ്പള പാക്കേജ്', hi: 'कुल वार्षिक वेतन पैकेज', ta: 'மொத்த ஆண்டு ஊதியத் தொகுப்பு', ex: 'The offer is six lakh CTC.' },
    { w: 'TDS', m: 'tax deducted at source from your pay', ml: 'ശമ്പളത്തിൽ നിന്ന് പിടിക്കുന്ന നികുതി', hi: 'स्रोत पर काटा गया टैक्स', ta: 'ஊதியத்திலிருந்து பிடிக்கப்படும் வரி', ex: 'TDS is deducted from my salary every month.' },
    { w: 'notice period', m: 'the time you must keep working after you resign', ml: 'രാജിക്ക് ശേഷം ജോലി ചെയ്യേണ്ട കാലയളവ്', hi: 'इस्तीफ़े के बाद काम करने की अवधि', ta: 'ராஜினாமாவுக்குப் பின் பணியாற்ற வேண்டிய காலம்', ex: 'My notice period is two months.' },
    { w: 'relieving letter', m: 'a letter from your last employer confirming you have left', ml: 'പഴയ സ്ഥാപനത്തിൽ നിന്നുള്ള വിടുതൽ കത്ത്', hi: 'पिछली कंपनी का कार्यमुक्ति पत्र', ta: 'பழைய நிறுவனத்தின் பணிவிடுவிப்புக் கடிதம்', ex: 'HR needs your relieving letter.' },
    { w: 'gazetted holiday', m: 'an official public holiday', ml: 'ഔദ്യോഗിക പൊതു അവധി', hi: 'राजपत्रित छुट्टी', ta: 'அரசு பொது விடுமுறை', ex: 'The office is closed on gazetted holidays.' },
    { w: 'cashless treatment', m: 'hospital care paid directly by your health insurer', ml: 'ഇൻഷുറൻസ് കമ്പനി നേരിട്ട് പണം നൽകുന്ന ചികിത്സ', hi: 'बीमा कंपनी द्वारा सीधे भुगतान वाला इलाज', ta: 'காப்பீட்டு நிறுவனம் நேரடியாகச் செலுத்தும் சிகிச்சை', ex: 'Show your insurance card at the TPA desk for cashless treatment.' },
    { w: 'DigiLocker', m: 'the government app for your official documents', ml: 'ഔദ്യോഗിക രേഖകൾക്കുള്ള സർക്കാർ ആപ്പ്', hi: 'आधिकारिक दस्तावेज़ों के लिए सरकारी ऐप', ta: 'அதிகாரப்பூர்வ ஆவணங்களுக்கான அரசு செயலி', ex: 'You can show your driving licence on DigiLocker.' }
  ] },

  // ---- Conversation openings that are Australian in the main list ----
  scenes: {
    general: { opening: 'Hello! Please have a seat. So, what would you like to talk about today? We can chat about anything.',
      opening_ml: 'ഹലോ! ഇരിക്കൂ. ഇന്ന് എന്തിനെക്കുറിച്ചാണ് സംസാരിക്കേണ്ടത്? എന്തിനെക്കുറിച്ചും നമുക്ക് സംസാരിക്കാം.', opening_hi: 'नमस्ते! बैठिए। तो, आज आप किस बारे में बात करना चाहेंगे? हम किसी भी विषय पर बात कर सकते हैं।', opening_ta: 'வணக்கம்! உட்காருங்கள். இன்று எதைப் பற்றிப் பேச விரும்புகிறீர்கள்? எதைப் பற்றி வேண்டுமானாலும் பேசலாம்.' },
    mate: { title: 'Chat with your new neighbour', opening: 'Hello! You must be the new neighbour. How are you settling in?',
      opening_ml: 'ഹലോ! നിങ്ങളാണല്ലേ പുതിയ അയൽക്കാരൻ. ഇവിടെ എങ്ങനെയുണ്ട്?', opening_hi: 'नमस्ते! आप नए पड़ोसी होंगे। यहाँ कैसा लग रहा है?', opening_ta: 'வணக்கம்! நீங்கள்தான் புதிய பக்கத்து வீட்டுக்காரர் போல. இங்கே எப்படி இருக்கிறது?' },
    customs: { title: 'Airport check-in', who: 'Airline check-in staff', opening: 'Good morning! May I see your ticket and ID, please? Do you have any bags to check in?',
      opening_ml: 'ഗുഡ് മോണിംഗ്! ടിക്കറ്റും ഐഡിയും കാണിക്കാമോ? ചെക്ക്-ഇൻ ചെയ്യാൻ ബാഗുകളുണ്ടോ?', opening_hi: 'सुप्रभात! क्या मैं आपका टिकट और पहचान पत्र देख सकता/सकती हूँ? क्या आपके पास चेक-इन के लिए बैग हैं?', opening_ta: 'காலை வணக்கம்! உங்கள் டிக்கெட்டையும் அடையாள அட்டையையும் பார்க்கலாமா? பதிவு செய்ய வேண்டிய பைகள் உள்ளனவா?' },
    workmate: { title: 'Chai break with a colleague', opening: 'Finally, chai time! So, how was your weekend?',
      opening_ml: 'അവസാനം ചായ സമയം! വീക്കെൻഡ് എങ്ങനെയുണ്ടായിരുന്നു?', opening_hi: 'आख़िरकार चाय का समय! तो, आपका वीकेंड कैसा रहा?', opening_ta: 'அப்பாடா, டீ நேரம்! உங்கள் வார இறுதி எப்படி இருந்தது?' },
    rental: { title: 'See a flat with a broker', who: 'Mr Sharma, property broker', opening: 'Namaste, come in. This is the 2BHK I told you about. The rent is 18,000 a month. Any questions?',
      opening_ml: 'നമസ്തേ, അകത്തേക്ക് വരൂ. ഞാൻ പറഞ്ഞ 2BHK ഇതാണ്. മാസവാടക 18,000. എന്തെങ്കിലും ചോദ്യമുണ്ടോ?', opening_hi: 'नमस्ते, अंदर आइए। यही वह 2BHK है जिसके बारे में मैंने बताया था। किराया 18,000 महीना है। कोई सवाल?', opening_ta: 'வணக்கம், உள்ளே வாருங்கள். நான் சொன்ன 2BHK இதுதான். மாத வாடகை 18,000. ஏதாவது கேள்வி உண்டா?' },
    gp: { title: "At the doctor's clinic" },
    sales: { opening: 'Hello, come in. I have only five minutes, so tell me - what are you offering?',
      opening_ml: 'ഹലോ, അകത്തേക്ക് വരൂ. എനിക്ക് അഞ്ച് മിനിറ്റേ ഉള്ളൂ, പറയൂ - എന്താണ് നിങ്ങൾ മുന്നോട്ടുവയ്ക്കുന്നത്?', opening_hi: 'नमस्ते, अंदर आइए। मेरे पास सिर्फ़ पाँच मिनट हैं, तो बताइए - आप क्या पेश कर रहे हैं?', opening_ta: 'வணக்கம், உள்ளே வாருங்கள். என்னிடம் ஐந்து நிமிடம்தான் இருக்கிறது, சொல்லுங்கள் - நீங்கள் என்ன வழங்குகிறீர்கள்?' },
    salary: { opening: "Congratulations, we'd like to offer you the position. The package is six lakh per annum CTC. What do you think?",
      opening_ml: 'അഭിനന്ദനങ്ങൾ, ഈ ജോലി നിങ്ങൾക്ക് നൽകാൻ ഞങ്ങൾ ആഗ്രഹിക്കുന്നു. പാക്കേജ് വർഷം ആറ് ലക്ഷം CTC ആണ്. എന്ത് തോന്നുന്നു?', opening_hi: 'बधाई हो, हम आपको यह पद देना चाहते हैं। पैकेज छह लाख सालाना CTC है। आपकी क्या राय है?', opening_ta: 'வாழ்த்துகள், இந்தப் பதவியை உங்களுக்கு வழங்க விரும்புகிறோம். ஊதியத் தொகுப்பு ஆண்டுக்கு ஆறு லட்சம் CTC. நீங்கள் என்ன நினைக்கிறீர்கள்?' },
    rn_interview: { who: 'Mrs Thomas, Nursing Superintendent', opening: "Good morning, thank you for coming. I'm Mrs Thomas, the Nursing Superintendent. Please tell us a little about yourself.",
      opening_ml: 'ഗുഡ് മോണിംഗ്, വന്നതിന് നന്ദി. ഞാൻ മിസിസ് തോമസ്, നഴ്സിംഗ് സൂപ്രണ്ട്. നിങ്ങളെക്കുറിച്ച് കുറച്ച് പറയൂ.', opening_hi: 'सुप्रभात, आने के लिए धन्यवाद। मैं श्रीमती थॉमस हूँ, नर्सिंग अधीक्षक। कृपया अपने बारे में थोड़ा बताइए।', opening_ta: 'காலை வணக்கம், வந்ததற்கு நன்றி. நான் திருமதி தாமஸ், செவிலியர் கண்காணிப்பாளர். உங்களைப் பற்றிக் கொஞ்சம் சொல்லுங்கள்.' },
    aged_interview: { who: 'Mr Iyer, home-care agency manager', opening: "Hello, thanks for coming. I'm Mr Iyer from the home-care agency. Tell me, why do you want to work in elderly care?",
      opening_ml: 'ഹലോ, വന്നതിന് നന്ദി. ഞാൻ ഹോം-കെയർ ഏജൻസിയിൽ നിന്നുള്ള മിസ്റ്റർ അയ്യർ. പറയൂ, എന്തുകൊണ്ടാണ് വയോജന പരിചരണത്തിൽ ജോലി ചെയ്യാൻ ആഗ്രഹിക്കുന്നത്?', opening_hi: 'नमस्ते, आने के लिए धन्यवाद। मैं होम-केयर एजेंसी से मिस्टर अय्यर हूँ। बताइए, आप बुज़ुर्गों की देखभाल में काम क्यों करना चाहते हैं?', opening_ta: 'வணக்கம், வந்ததற்கு நன்றி. நான் வீட்டுப் பராமரிப்பு நிறுவனத்திலிருந்து திரு. ஐயர். சொல்லுங்கள், முதியோர் பராமரிப்பில் ஏன் வேலை செய்ய விரும்புகிறீர்கள்?' },
    panel: { title: 'Mock interview: Nursing Supervisor' }
  },

  // ---- Sound drills: Indian English keeps the R after vowels ----
  sounds: {
    r: { tip: 'English R is soft: curl the tip of your tongue back a little without touching the roof of your mouth, and round your lips slightly. Do not roll or tap it. In Indian English an R after a vowel ("car", "nurse") is usually pronounced - that is fine, just keep it soft.',
      ml: 'ഇംഗ്ലീഷ് R മൃദുവാണ്: നാവിന്റെ അറ്റം അണ്ണാക്കിൽ തൊടാതെ ചെറുതായി പിന്നോട്ട് വളയ്ക്കുക, ചുണ്ടുകൾ ചെറുതായി ഉരുട്ടുക. ഉരുട്ടുകയോ തട്ടുകയോ ചെയ്യരുത്. ഇന്ത്യൻ ഇംഗ്ലീഷിൽ സ്വരത്തിന് ശേഷമുള്ള R ("car", "nurse") സാധാരണ ഉച്ചരിക്കും - അത് കുഴപ്പമില്ല, മൃദുവായി പറഞ്ഞാൽ മതി.',
      hi: 'अंग्रेज़ी का R नरम होता है: जीभ की नोक थोड़ी पीछे मोड़ें, तालू को छुए बिना, और होंठ हल्के गोल करें। इसे लुढ़काएँ या थपथपाएँ नहीं। भारतीय अंग्रेज़ी में स्वर के बाद R ("car", "nurse") आमतौर पर बोला जाता है - यह ठीक है, बस नरम रखें।',
      ta: 'ஆங்கில R மென்மையானது: மேல் அண்ணத்தைத் தொடாமல் நாக்கின் நுனியைச் சற்றுப் பின்னால் வளையுங்கள், உதடுகளை லேசாகக் குவியுங்கள். அதை உருட்டவோ தட்டவோ வேண்டாம். இந்திய ஆங்கிலத்தில் உயிரெழுத்துக்குப் பின் வரும் R ("car", "nurse") பொதுவாக உச்சரிக்கப்படும் - அது சரி, மென்மையாகச் சொன்னால் போதும்.' }
  }
};
