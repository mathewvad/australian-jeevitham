/* PTE Academic speaking practice: guide and practice items for six task types.
   Read Aloud, Repeat Sentence and Answer Short Question are scored on the phone (speech scores and
   word matching, no AI); Describe Image, Re-tell Lecture and Respond to a Situation get AI marking. */
const PTE = {
  guide: [
    { t: 'PTE speaking at a glance', d: 'PTE Academic is taken on a computer. The speaking tasks are: <b>Read Aloud</b>, <b>Repeat Sentence</b>, <b>Describe Image</b>, <b>Re-tell Lecture</b>, <b>Answer Short Question</b>, <b>Summarise Group Discussion</b> and <b>Respond to a Situation</b> (the last two were added in 2025). Scores run from 10 to 90. Many tasks count towards both speaking and another skill, so speaking well lifts your whole score.' },
    { t: 'What nurses need', d: 'AHPRA (the NMBA standard) sets a minimum score for each skill. For tests taken from <b>23 April 2026</b>, published guides report <b>63 overall with 76 in speaking</b> (and 58 listening, 59 reading, 60 writing). Speaking is now the hardest skill to meet, so it is worth practising most. <b>Always check the current table on the AHPRA website</b> before you book.' },
    { t: 'How speaking is marked', d: 'Most tasks are marked on three traits:<br><b>Content</b> - did you say all the words (Read Aloud, Repeat Sentence) or cover the key points (Describe Image, Re-tell Lecture)?<br><b>Oral fluency</b> - smooth, even speech with no restarts, long pauses or "umm".<br><b>Pronunciation</b> - clear sounds and word stress that a native speaker understands easily.<br>Fluency and pronunciation count a lot. A smooth answer with one missed word beats a slow, perfect one.' },
    { t: 'Golden rules', d: '1. <b>Start within 3 seconds</b> of the beep. If you stay silent for 3 seconds, the microphone closes and you cannot try again.<br>2. <b>Never restart</b> a sentence. If you make a mistake, keep going.<br>3. Speak at a <b>natural, steady pace</b> - not fast, not slow.<br>4. Avoid "umm" and long pauses - pause only at commas and full stops.<br>5. In Describe Image and Re-tell Lecture, use a <b>template</b>: an opening sentence, three or four key points, and a conclusion.' },
    { t: 'Templates that work', d: '<b>Describe Image:</b> "This [bar chart] shows [the topic]. The highest is [X] at [number], while the lowest is [Y] at [number]. [Another point with a number]. Overall, [the main trend]."<br><b>Re-tell Lecture:</b> "The speaker was talking about [topic]. First, he/she said that [point 1]. Then [point 2]. He/she also mentioned [point 3]. In conclusion, [main idea]."<br><b>Respond to a Situation:</b> greet the person, explain the situation, give a reason, suggest a solution, close politely.' },
    { t: 'Common Malayali mistakes in PTE', d: 'V and W mixed up ("wery" for "very") - see the Sound drills.<br>Adding "a" before words ("a-school") or stressing every syllable the same.<br>Reading too fast to "sound fluent" - the score drops when words blur together.<br>Stopping to correct one word - restarts hurt fluency far more than the mistake.<br>Describe Image: listing numbers with no trend or conclusion.' }
  ],
  ra: [
    'Hand hygiene is the single most effective way to prevent infections in hospitals. Health workers are expected to clean their hands before and after touching a patient, after contact with body fluids, and after touching the patient\'s surroundings. Simple as it sounds, studies show that compliance often falls during busy shifts.',
    'Australia has one of the highest rates of skin cancer in the world, largely because of its fair-skinned population and strong sunlight. Public campaigns encourage people to cover up, apply sunscreen, wear a hat and seek shade, especially in the middle of the day when ultraviolet radiation is at its peak.',
    'Sleep plays a vital role in memory and learning. During deep sleep, the brain organises the information gathered during the day and stores the most important parts. Students who sleep well before an exam usually recall more than those who stay up all night revising.',
    'The Great Barrier Reef stretches for more than two thousand kilometres along the coast of Queensland. It is home to thousands of species of fish, coral and other marine life. However, rising sea temperatures have caused several mass bleaching events, raising serious concerns about its long-term health.',
    'Many universities now offer online courses that allow students to study from anywhere in the world. While this flexibility is attractive, research suggests that learners who study alone often find it harder to stay motivated. Regular contact with teachers and classmates appears to improve completion rates.',
    'Clear communication between health professionals is essential for patient safety. Structured tools such as ISBAR help nurses and doctors share information quickly and accurately, particularly when a patient\'s condition changes. A large share of serious errors in hospitals can be traced back to poor handover.',
    'Urban gardens are becoming increasingly popular in large cities. Apart from providing fresh vegetables, they create green spaces where neighbours can meet and work together. Some researchers argue that community gardens also reduce stress and improve the mental wellbeing of the people who take part.',
    'The invention of the printing press in the fifteenth century transformed the way knowledge spread across Europe. Books, which had once been copied slowly by hand, could suddenly be produced in large numbers. As a result, literacy rates rose and new ideas travelled faster than ever before.'
  ],
  rs: [
    'Please submit your assignment before the end of the week.',
    'The library will be closed on public holidays.',
    'Most students found the second lecture easier to follow.',
    'Patients should be encouraged to walk as soon as it is safe.',
    'The results of the survey will be published next month.',
    'You can find the timetable on the university website.',
    'Remember to check the patient\'s identity before giving any medication.',
    'The research team collected data from over five hundred participants.',
    'Climate change is affecting rainfall patterns across the country.',
    'All new staff must complete the online training module.',
    'The tutorial has been moved to room twelve on the second floor.',
    'Regular exercise can significantly reduce the risk of heart disease.'
  ],
  di: [
    { title: 'Hours of sleep by age group', type: 'bar', unit: 'hours', labels: ['Teens', '20-34', '35-49', '50-64', '65+'], values: [8.1, 7.2, 6.8, 7.0, 7.6],
      about: 'Bar chart: average hours of sleep per night by age group. Teens 8.1, 20-34 7.2, 35-49 6.8, 50-64 7.0, 65+ 7.6. Lowest in 35-49, highest in teens.' },
    { title: 'Ward admissions per month', type: 'line', unit: 'admissions', labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], values: [120, 135, 150, 145, 180, 210],
      about: 'Line graph: hospital ward admissions per month, January to June. 120, 135, 150, 145, 180, 210. A steady rise with a small dip in April, then a sharp increase to a peak of 210 in June.' },
    { title: 'How students travel to university', type: 'pie', unit: '%', labels: ['Bus', 'Car', 'Bicycle', 'Walk', 'Train'], values: [35, 30, 10, 15, 10],
      about: 'Pie chart: how students travel to university. Bus 35%, car 30%, walk 15%, bicycle 10%, train 10%. Bus and car together make up 65%.' },
    { title: 'Nurses by state (thousands)', type: 'bar', unit: 'thousand', labels: ['NSW', 'VIC', 'QLD', 'WA', 'SA'], values: [110, 95, 78, 40, 30],
      about: 'Bar chart: number of registered nurses by state, in thousands. NSW 110, VIC 95, QLD 78, WA 40, SA 30. NSW highest, SA lowest, about a quarter of NSW.' },
    { title: 'Average temperature in Townsville (°C)', type: 'line', unit: '°C', labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'], values: [29, 28, 24, 21, 24, 28],
      about: 'Line graph: average temperature in Townsville across the year. January 29, March 28, May 24, July 21 (lowest), September 24, November 28. Falls to a low in July, then rises again - a U shape.' },
    { title: 'Household spending', type: 'pie', unit: '%', labels: ['Housing', 'Food', 'Transport', 'Health', 'Other'], values: [40, 20, 15, 10, 15],
      about: 'Pie chart: average household spending. Housing 40%, food 20%, transport 15%, other 15%, health 10%. Housing is by far the largest share, twice food.' }
  ],
  rl: [
    { title: 'Why we yawn', text: 'Today I want to talk about yawning. For a long time, people believed we yawn because our bodies need more oxygen. However, experiments have shown that breathing extra oxygen does not reduce yawning at all. A newer theory suggests that yawning helps to cool the brain. When we yawn, we take in a large amount of air, which may lower the temperature of the blood flowing to the head. Interestingly, yawning is also contagious. Seeing someone else yawn, or even reading about it, can make us yawn too. Researchers think this may be linked to empathy, because people tend to catch yawns more easily from friends and family than from strangers.' },
    { title: 'Coral reefs', text: 'Coral reefs cover less than one per cent of the ocean floor, yet they support about a quarter of all marine species. Corals are actually tiny animals that live together in large colonies. They depend on algae living inside them, which produce food through photosynthesis and give corals their bright colours. When the water becomes too warm, the corals push the algae out and turn white. This is called bleaching. If the temperature returns to normal quickly, the corals can recover, but long periods of heat can kill them. Protecting reefs therefore means reducing pollution locally and tackling climate change globally.' },
    { title: 'The history of nursing', text: 'Modern nursing is often traced back to Florence Nightingale and her work during the Crimean War in the 1850s. She noticed that more soldiers were dying from infections and poor conditions than from their wounds. By improving hygiene, ventilation and nutrition, her team reduced the death rate dramatically. Nightingale also used statistics and diagrams to convince the government to change hospital policy. Later, she founded a nursing school in London, which set the standard for training nurses around the world. Today, nursing is a university-level profession, but her focus on evidence and patient environment remains central.' },
    { title: 'Bilingual brains', text: 'Many people around the world speak more than one language every day. Research suggests that being bilingual changes the way the brain works. Bilingual people constantly have to choose one language and block the other, and this practice seems to strengthen attention and the ability to switch between tasks. Some studies even report that bilingual adults develop symptoms of dementia several years later than people who speak only one language. However, scientists caution that other factors, such as education and lifestyle, may also explain these results, so more research is needed.' }
  ],
  asq: [
    { q: 'What do you call a doctor who specialises in children\'s health?', a: ['paediatrician', 'pediatrician', 'paediatrician'] },
    { q: 'How many days are there in a leap year?', a: ['366', 'three hundred and sixty six', 'three hundred sixty six'] },
    { q: 'What do we call the device used to measure temperature?', a: ['thermometer'] },
    { q: 'Which organ pumps blood around the body?', a: ['heart'] },
    { q: 'What is the opposite of the word "ancient"?', a: ['modern', 'new'] },
    { q: 'If you are not guilty of a crime, what are you?', a: ['innocent'] },
    { q: 'What do you call a person who writes poems?', a: ['poet'] },
    { q: 'How many sides does a triangle have?', a: ['3', 'three'] },
    { q: 'What do we call frozen water?', a: ['ice'] },
    { q: 'Which season comes after winter?', a: ['spring'] },
    { q: 'What do you call the list of food items available in a restaurant?', a: ['menu'] },
    { q: 'Which instrument do astronomers use to look at stars?', a: ['telescope'] },
    { q: 'What is the name of the period of ten years?', a: ['decade'] },
    { q: 'Where would you go to borrow a book?', a: ['library'] },
    { q: 'What is the medical word for high blood pressure?', a: ['hypertension'] }
  ],
  rts: [
    { title: 'Missed tutorial', text: 'You missed an important tutorial last week because you were sick. You want to ask your tutor for the notes and whether you can still submit the related task. What would you say to your tutor?' },
    { title: 'Noisy flatmate', text: 'Your flatmate plays loud music late every night, and you have an early shift at the hospital. You want to raise this politely. What would you say to your flatmate?' },
    { title: 'Wrong order', text: 'You ordered a laptop online and the store sent the wrong model. You call the customer service line. What would you say to the staff member?' },
    { title: 'Group project', text: 'One member of your university group project has not done their share of the work, and the deadline is in three days. You decide to speak to them. What would you say?' },
    { title: 'Shift swap', text: 'You need next Saturday off for a family event, but you are rostered to work. You ask your nurse unit manager about swapping the shift. What would you say?' },
    { title: 'Late library book', text: 'You have returned a library book two weeks late because you were overseas for a family emergency. The library has charged you a fine. What would you say to the librarian?' }
  ]
};
