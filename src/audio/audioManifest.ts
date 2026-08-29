// Comprehensive Static Audio Manifest & English Slug Mapping for LUMI
// Prioritizes pristine pre-recorded human audio files under /public/audio/

export interface AudioAsset {
  key: string;
  path: string;
  arText: string;
  category: 'letters' | 'syllables' | 'words' | 'sentences' | 'stages' | 'dialogue' | 'names' | 'articulation';
  descriptionAr: string;
}

// 1. Letters Mapping (28 Arabic Alphabet Letters)
export const LETTER_AUDIO_MAP: Record<string, string> = {
  'alif': '/audio/letters/alif.mp3',
  'baa': '/audio/letters/baa.mp3',
  'taa': '/audio/letters/taa.mp3',
  'thaa': '/audio/letters/thaa.mp3',
  'jeem': '/audio/letters/jeem.mp3',
  'haa': '/audio/letters/haa.mp3',
  'khaa': '/audio/letters/khaa.mp3',
  'daal': '/audio/letters/daal.mp3',
  'zaal': '/audio/letters/zaal.mp3',
  'raa': '/audio/letters/raa.mp3',
  'zay': '/audio/letters/zay.mp3',
  'seen': '/audio/letters/seen.mp3',
  'sheen': '/audio/letters/sheen.mp3',
  'saad': '/audio/letters/saad.mp3',
  'daad': '/audio/letters/daad.mp3',
  'taa_heavy': '/audio/letters/taa_heavy.mp3',
  'zaa_heavy': '/audio/letters/zaa_heavy.mp3',
  'ayn': '/audio/letters/ayn.mp3',
  'ghayn': '/audio/letters/ghayn.mp3',
  'faa': '/audio/letters/faa.mp3',
  'qaaf': '/audio/letters/qaaf.mp3',
  'kaaf': '/audio/letters/kaaf.mp3',
  'laam': '/audio/letters/laam.mp3',
  'meem': '/audio/letters/meem.mp3',
  'noon': '/audio/letters/noon.mp3',
  'haa_soft': '/audio/letters/haa_soft.mp3',
  'waaw': '/audio/letters/waaw.mp3',
  'yaa': '/audio/letters/yaa.mp3'
};

// 2. Syllables & Short/Long Vowels
export const SYLLABLE_AUDIO_MAP: Record<string, string> = {
  // Baa
  'baa_fatha': '/audio/syllables/baa_fatha.mp3',
  'baa_kasra': '/audio/syllables/baa_kasra.mp3',
  'baa_damma': '/audio/syllables/baa_damma.mp3',
  'baa_alif': '/audio/syllables/baa_alif.mp3',
  'baa_yaa': '/audio/syllables/baa_yaa.mp3',
  'baa_waw': '/audio/syllables/baa_waw.mp3',
  'بَ': '/audio/syllables/baa_fatha.mp3',
  'بِ': '/audio/syllables/baa_kasra.mp3',
  'بُ': '/audio/syllables/baa_damma.mp3',
  'بَا': '/audio/syllables/baa_alif.mp3',
  'بِي': '/audio/syllables/baa_yaa.mp3',
  'بُو': '/audio/syllables/baa_waw.mp3'
};

// 3. Words Mapping
export const WORD_AUDIO_MAP: Record<string, string> = {
  // Baa Words
  'baab': '/audio/words/baab.mp3',
  'battah': '/audio/words/battah.mp3',
  'bayt': '/audio/words/bayt.mp3',
  'bahr': '/audio/words/bahr.mp3',
  'hubz': '/audio/words/hubz.mp3',
  'habl': '/audio/words/habl.mp3',
  'inab': '/audio/words/inab.mp3',
  'kataba': '/audio/words/kataba.mp3',
  'بَاب': '/audio/words/baab.mp3',
  'بَطَّة': '/audio/words/battah.mp3',
  'بَيْت': '/audio/words/bayt.mp3',
  'بَحْر': '/audio/words/bahr.mp3',
  'خُبْز': '/audio/words/hubz.mp3',
  'حَبْل': '/audio/words/habl.mp3',
  'عِنَب': '/audio/words/inab.mp3',
  'كَتَبَ': '/audio/words/kataba.mp3',

  // Common Practice Words
  'arnab': '/audio/words/arnab.mp3',
  'asad': '/audio/words/asad.mp3',
  'faar': '/audio/words/faar.mp3',
  'qaraa': '/audio/words/qaraa.mp3',
  'أَرْنَب': '/audio/words/arnab.mp3',
  'أَسَد': '/audio/words/asad.mp3',
  'فَأْر': '/audio/words/faar.mp3',
  'قَرَأَ': '/audio/words/qaraa.mp3',

  'tuffah': '/audio/words/tuffah.mp3',
  'taaj': '/audio/words/taaj.mp3',
  'kitaab': '/audio/words/kitaab.mp3',
  'تُفَّاح': '/audio/words/tuffah.mp3',
  'تَاج': '/audio/words/taaj.mp3',
  'كِتَاب': '/audio/words/kitaab.mp3',

  'thalab': '/audio/words/thalab.mp3',
  'thawb': '/audio/words/thawb.mp3',
  'muthallath': '/audio/words/muthallath.mp3',
  'bahatha': '/audio/words/bahatha.mp3',
  'ثَعْلَب': '/audio/words/thalab.mp3',
  'ثَوْب': '/audio/words/thawb.mp3',
  'مُثَلَّث': '/audio/words/muthallath.mp3',
  'بَحَثَ': '/audio/words/bahatha.mp3',

  'jamal': '/audio/words/jamal.mp3',
  'jazar': '/audio/words/jazar.mp3',
  'shajarah': '/audio/words/shajarah.mp3',
  'جَمَل': '/audio/words/jamal.mp3',
  'جَزَر': '/audio/words/jazar.mp3',
  'شَجَرَة': '/audio/words/shajarah.mp3'
};

// 4. Sentences Mapping
export const SENTENCE_AUDIO_MAP: Record<string, string> = {
  'baab_bayt': '/audio/sentences/baab_bayt.mp3',
  'battah_tasbah': '/audio/sentences/battah_tasbah.mp3',
  'هَذَا بَابُ البَيْتِ': '/audio/sentences/baab_bayt.mp3',
  'هذا باب البيت': '/audio/sentences/baab_bayt.mp3',
  'البَطَّةُ تَسْبَحُ فِي البَحْرِ': '/audio/sentences/battah_tasbah.mp3',
  'البطة تسبح في البحر': '/audio/sentences/battah_tasbah.mp3',
  'الأَرْنَبُ يَأْكُلُ الجَزَرَ': '/audio/sentences/arnab_jazar.mp3',
  'الجَمَلُ سَفِينَةُ الصَّحْرَاءِ': '/audio/sentences/jamal_sahraa.mp3'
};

// 5. Stage Prompts & Progression
export const STAGE_AUDIO_MAP: Record<string, string> = {
  'stage_1': '/audio/stages/stage_1.mp3',
  'stage_2': '/audio/stages/stage_2.mp3',
  'stage_3': '/audio/stages/stage_3.mp3',
  'stage_4': '/audio/stages/stage_4.mp3',
  'stage_5': '/audio/stages/stage_5.mp3',
  'stage_6': '/audio/stages/stage_6.mp3',
  'stage_7': '/audio/stages/stage_7.mp3',
  'stage_8': '/audio/stages/stage_8.mp3',

  'البَذْرَةُ المُضِيئَة': '/audio/stages/stage_1.mp3',
  'البذرة المضيئة': '/audio/stages/stage_1.mp3',
  'قَطَرَاتُ الصَّوْت': '/audio/stages/stage_2.mp3',
  'قطرات الصوت': '/audio/stages/stage_2.mp3',
  'بَرَاعِمُ النَّغَمَات': '/audio/stages/stage_3.mp3',
  'براعم النغمات': '/audio/stages/stage_3.mp3',
  'غُصُونٌ تَمْتَد': '/audio/stages/stage_4.mp3',
  'غصون تمتد': '/audio/stages/stage_4.mp3',
  'ثِمَارُ الكَلِمَات': '/audio/stages/stage_5.mp3',
  'ثمار الكلمات': '/audio/stages/stage_5.mp3',
  'النَّحْلَةُ البَاحِثَة': '/audio/stages/stage_6.mp3',
  'النحلة الباحثة': '/audio/stages/stage_6.mp3',
  'غَابَةُ الحِكَايَات': '/audio/stages/stage_7.mp3',
  'غابة الحكايات': '/audio/stages/stage_7.mp3',
  'الشَّجَرَةُ المُتَوَهِّجَة': '/audio/stages/stage_8.mp3',
  'الشجرة المتوهجة': '/audio/stages/stage_8.mp3',

  'stage_1_explain': '/audio/stages/stage_1_explain.mp3',
  'stage_2_explain': '/audio/stages/stage_2_explain.mp3',
  'stage_3_explain': '/audio/stages/stage_3_explain.mp3',
  'stage_4_explain': '/audio/stages/stage_4_explain.mp3',
  'stage_5_explain': '/audio/stages/stage_5_explain.mp3',
  'stage_6_explain': '/audio/stages/stage_6_explain.mp3',
  'stage_7_explain': '/audio/stages/stage_7_explain.mp3',
  'stage_8_explain': '/audio/stages/stage_8_explain.mp3',

  'تَعَالَ نَكْتَشِفُ بَذْرَةَ النُّورِ الجَدِيدَةَ وَنُشَاهِدُ شَكْلَهَا الجَمِيل!': '/audio/stages/stage_1_explain.mp3',
  'اِسْقِ البَذْرَةَ بِصَوْتِكَ العَالِي لِيَسْمَعَهَا لُومِي وَتَكْبَر!': '/audio/stages/stage_2_explain.mp3',
  'البَذْرَةُ تَكْبَرُ بِثَلَاثِ حَرَكَات.. هَيَّا نَعْزِفُ نَغَمَاتِهَا مَعًا!': '/audio/stages/stage_3_explain.mp3',
  'اِسْحَبِ الصَّوْتَ طَوِيلًا لِتَمْتَدَّ غُصُونُ الشَّجَرَةِ الرَّائِعَة!': '/audio/stages/stage_4_explain.mp3',
  'الشَّجَرَةُ أَثْمَرَت! أَيْنَ يَخْتَبِئُ حَرْفُنَا دَاخِلَ هَذِهِ الثَّمَرَة؟': '/audio/stages/stage_5_explain.mp3',
  'لُومِي خَبَّأَ الحَرْفَ بَيْنَ الزُّهُور.. سَاعِدِ النَّحْلَةَ فِي العُثُورِ عَلَيْه!': '/audio/stages/stage_6_explain.mp3',
  'لِنَجْمَعْ ثِمَارَنَا المُضِيئَةَ وَنَبْنِي بِهَا حِكَايَةً صَغِيرَةً مُفِيدَة!': '/audio/stages/stage_7_explain.mp3',
  'رَائِع! شَجَرَةُ حَرْفِنَا تُضِيءُ الغَابَةَ كُلَّهَا الْآنَ بِفَضْلِك!': '/audio/stages/stage_8_explain.mp3',

  'listen_sound': '/audio/stages/listen_sound.mp3',
  'next_stage': '/audio/stages/next_stage.mp3',
  'اسْتَمِعْ لِصَوْتِ الحَرْف': '/audio/stages/listen_sound.mp3',
  'استمع لصوت الحرف': '/audio/stages/listen_sound.mp3'
};

// 6. Dialogue, Greetings & Encouragements
export const DIALOGUE_AUDIO_MAP: Record<string, string> = {
  'ask_name': '/audio/dialogue/ask_name.mp3',
  'choose_letter': '/audio/dialogue/choose_letter.mp3',
  'excellent': '/audio/dialogue/excellent.mp3',
  'help_me': '/audio/dialogue/help_me.mp3',
  'intro_step_1': '/audio/dialogue/intro_step_1.mp3',
  'intro_step_2': '/audio/dialogue/intro_step_2.mp3',
  'intro_step_3': '/audio/dialogue/intro_step_3.mp3',
  'launch_journey': '/audio/dialogue/launch_journey.mp3',
  'letter_choice_cheer': '/audio/dialogue/letter_choice_cheer.mp3',
  'lost_sounds': '/audio/dialogue/lost_sounds.mp3',
  'open_next_stage': '/audio/dialogue/open_next_stage.mp3',
  'try_again': '/audio/dialogue/try_again.mp3',
  'welcome': '/audio/dialogue/welcome.mp3',
  'welcome_child': '/audio/dialogue/welcome_child.mp3',
  'welcome_talal': '/audio/dialogue/welcome_talal.mp3',
  'welcome_raneem': '/audio/dialogue/welcome_raneem.mp3',
  'cheer_talal': '/audio/dialogue/cheer_talal.mp3',
  'cheer_raneem': '/audio/dialogue/cheer_raneem.mp3',
  'complete_previous_first': '/audio/dialogue/complete_previous_first.mp3',

  // Arabic Text Direct Match
  'مَا اسْمُكَ يَا بَطَل؟ اكْتُبِ اسْمَكَ هُنَا لِنَبْدَأَ رِحْلَتَنَا السَّاحِرَة!': '/audio/dialogue/ask_name.mp3',
  'مَرْحَبًا يَا بَطَل! اكْتُبِ اسْمَكَ هُنَا لِنَبْدَأَ رِحْلَتَنَا السَّاحِرَة!': '/audio/dialogue/ask_name.mp3',
  'مرحبا يا بطل! اكتب اسمك هنا لنبدأ رحلتنا الساحرة!': '/audio/dialogue/ask_name.mp3',
  'مَرْحَبًا.. أَنَا لُومِي! هَيَّا نَسْتَكْشِفُ مَعًا عَالَمَ الأَصْوَاتِ السَّاحِر!': '/audio/dialogue/intro_step_1.mp3',
  'مرحبا.. أنا لومي! هيا نستكشف معا عالم الأصوات الساحر!': '/audio/dialogue/intro_step_1.mp3',
  'هَذَا العَالَمُ فَقَدَ أَصْوَاتَهُ السَّاحِرَة...': '/audio/dialogue/intro_step_2.mp3',
  'هذا العالم فقد أصواته الساحرة...': '/audio/dialogue/intro_step_2.mp3',
  'هَلْ تُسَاعِدُنِي فِي إِعَادَتِهَا مَعًا؟': '/audio/dialogue/intro_step_3.mp3',
  'هل تساعدني في إعادتها معا؟': '/audio/dialogue/intro_step_3.mp3',
  'اخْتِيَارٌ سِحْرِيٌّ رَائِع! هَيَّا بِنَا نَبْدَأُ المُغَامَرَة!': '/audio/dialogue/letter_choice_cheer.mp3',
  'مَبْرُوك! فُتِحَتْ لَكَ المَرْحَلَةُ التَّالِيَة.. هَيَّا نَنْطَلِق!': '/audio/dialogue/open_next_stage.mp3',
  'أَكْمِلِ المَرْحَلَةَ السَّابِقَةَ أَوَّلًا لِفَتْحِ هَذِهِ المَرْحَلَة!': '/audio/dialogue/complete_previous_first.mp3',
  'أَحْسَنْتَ يَا بَطَل!': '/audio/dialogue/excellent.mp3',
  'أحسنت يا بطل!': '/audio/dialogue/excellent.mp3',
  'حَاوِلْ مَرَّةً أُخْرَى يَا بَطَل!': '/audio/dialogue/try_again.mp3',
  'حاول مرة أخرى يا بطل!': '/audio/dialogue/try_again.mp3',
  'حَاوِلْ مَرَّةً أُخْرَى': '/audio/dialogue/try_again.mp3'
};

// 7. Child Names (50 Pre-recorded Names)
export const NAME_AUDIO_MAP: Record<string, string> = {
  'talal': '/audio/names/talal.mp3',
  'طلال': '/audio/names/talal.mp3',
  'طَلَال': '/audio/names/talal.mp3',
  'raneem': '/audio/names/raneem.mp3',
  'رنيم': '/audio/names/raneem.mp3',
  'رَنِيم': '/audio/names/raneem.mp3',
  'fatima': '/audio/names/fatima.mp3',
  'فاطمة': '/audio/names/fatima.mp3',
  'فَاطِمَة': '/audio/names/fatima.mp3',
  'heba': '/audio/names/heba.mp3',
  'هبة': '/audio/names/heba.mp3',
  'هِبَة': '/audio/names/heba.mp3',
  'jana': '/audio/names/jana.mp3',
  'جنى': '/audio/names/jana.mp3',
  'جَنَى': '/audio/names/jana.mp3',
  'mira': '/audio/names/mira.mp3',
  'ميرا': '/audio/names/mira.mp3',
  'مِيرَا': '/audio/names/mira.mp3',
  'deema': '/audio/names/deema.mp3',
  'ديمة': '/audio/names/deema.mp3',
  'دِيمَة': '/audio/names/deema.mp3',
  'taiba': '/audio/names/taiba.mp3',
  'طيبة': '/audio/names/taiba.mp3',
  'طِيبَة': '/audio/names/taiba.mp3',
  'mohammed': '/audio/names/mohammed.mp3',
  'محمد': '/audio/names/mohammed.mp3',
  'مُحَمَّد': '/audio/names/mohammed.mp3',
  'ahmed': '/audio/names/ahmed.mp3',
  'أحمد': '/audio/names/ahmed.mp3',
  'أَحْمَد': '/audio/names/ahmed.mp3',
  'sara': '/audio/names/sara.mp3',
  'سارة': '/audio/names/sara.mp3',
  'سَارَة': '/audio/names/sara.mp3',
  'ali': '/audio/names/ali.mp3',
  'علي': '/audio/names/ali.mp3',
  'عَلِي': '/audio/names/ali.mp3',
  'omar': '/audio/names/omar.mp3',
  'عمر': '/audio/names/omar.mp3',
  'عُمَر': '/audio/names/omar.mp3',
  'youssef': '/audio/names/youssef.mp3',
  'يوسف': '/audio/names/youssef.mp3',
  'يُوسُف': '/audio/names/youssef.mp3',
  'nour': '/audio/names/nour.mp3',
  'نور': '/audio/names/nour.mp3',
  'نُور': '/audio/names/nour.mp3',
  'maryam': '/audio/names/maryam.mp3',
  'مريم': '/audio/names/maryam.mp3',
  'مَرْيَم': '/audio/names/maryam.mp3',
  'batal': '/audio/names/batal.mp3',
  'بطل': '/audio/names/batal.mp3',
  'البطل': '/audio/names/batal.mp3',
  'البَطَل': '/audio/names/batal.mp3',
  'يَا بَطَل': '/audio/names/batal.mp3',
  'يا بطل': '/audio/names/batal.mp3',
  'batala': '/audio/names/batala.mp3',
  'بطلة': '/audio/names/batala.mp3',
  'البطلة': '/audio/names/batala.mp3',
  'البَطَلَة': '/audio/names/batala.mp3',
  'يَا بَطَلَة': '/audio/names/batala.mp3',
  'يا بطلة': '/audio/names/batala.mp3',
  'abdullah': '/audio/names/abdullah.mp3',
  'عبدالله': '/audio/names/abdullah.mp3',
  'abdulrahman': '/audio/names/abdulrahman.mp3',
  'عبدالرحمن': '/audio/names/abdulrahman.mp3',
  'adam': '/audio/names/adam.mp3',
  'آدم': '/audio/names/adam.mp3',
  'faisal': '/audio/names/faisal.mp3',
  'فيصل': '/audio/names/faisal.mp3',
  'farah': '/audio/names/farah.mp3',
  'فرح': '/audio/names/farah.mp3',
  'hamza': '/audio/names/hamza.mp3',
  'حمزة': '/audio/names/hamza.mp3',
  'hassan': '/audio/names/hassan.mp3',
  'حسن': '/audio/names/hassan.mp3',
  'huda': '/audio/names/huda.mp3',
  'هدى': '/audio/names/huda.mp3',
  'hussein': '/audio/names/hussein.mp3',
  'حسين': '/audio/names/hussein.mp3',
  'ibrahim': '/audio/names/ibrahim.mp3',
  'إبراهيم': '/audio/names/ibrahim.mp3',
  'joud': '/audio/names/joud.mp3',
  'جود': '/audio/names/joud.mp3',
  'karam': '/audio/names/karam.mp3',
  'كرم': '/audio/names/karam.mp3',
  'khaled': '/audio/names/khaled.mp3',
  'خالد': '/audio/names/khaled.mp3',
  'khalil': '/audio/names/khalil.mp3',
  'خليل': '/audio/names/khalil.mp3',
  'layan': '/audio/names/layan.mp3',
  'ليان': '/audio/names/layan.mp3',
  'leila': '/audio/names/leila.mp3',
  'ليلى': '/audio/names/leila.mp3',
  'majd': '/audio/names/majd.mp3',
  'مجد': '/audio/names/majd.mp3',
  'malak': '/audio/names/malak.mp3',
  'ملك': '/audio/names/malak.mp3',
  'qais': '/audio/names/qais.mp3',
  'قيس': '/audio/names/qais.mp3',
  'rayan': '/audio/names/rayan.mp3',
  'ريان': '/audio/names/rayan.mp3',
  'reem': '/audio/names/reem.mp3',
  'ريم': '/audio/names/reem.mp3',
  'saad': '/audio/names/saad.mp3',
  'سعد': '/audio/names/saad.mp3',
  'salem': '/audio/names/salem.mp3',
  'سالم': '/audio/names/salem.mp3',
  'salma': '/audio/names/salma.mp3',
  'سلمى': '/audio/names/salma.mp3',
  'tariq': '/audio/names/tariq.mp3',
  'طارق': '/audio/names/tariq.mp3',
  'waseem': '/audio/names/waseem.mp3',
  'وسيم': '/audio/names/waseem.mp3',
  'wissam': '/audio/names/wissam.mp3',
  'وسام': '/audio/names/wissam.mp3',
  'yara': '/audio/names/yara.mp3',
  'يارا': '/audio/names/yara.mp3',
  'zaid': '/audio/names/zaid.mp3',
  'زيد': '/audio/names/zaid.mp3',
  'ziad': '/audio/names/ziad.mp3',
  'زياد': '/audio/names/ziad.mp3'
};

// 8. Articulation & Mouth Anatomy Guides
export const ARTICULATION_AUDIO_MAP: Record<string, string> = {
  'tongue_guide_baa': '/audio/articulation/tongue_guide_baa.mp3',
  'lips_guide_baa': '/audio/articulation/lips_guide_baa.mp3',
  'tongue_lab_intro': '/audio/articulation/tongue_lab_intro.mp3',
  'tongue_quiz_success': '/audio/articulation/tongue_quiz_success.mp3'
};

// Arabic letter character to English letter slug
export const ARABIC_CHAR_TO_SLUG: Record<string, string> = {
  'أ': 'alif', 'ا': 'alif', 'إ': 'alif', 'آ': 'alif', 'ء': 'alif',
  'ب': 'baa',
  'ت': 'taa',
  'ث': 'thaa',
  'ج': 'jeem',
  'ح': 'haa',
  'خ': 'khaa',
  'د': 'daal',
  'ذ': 'zaal',
  'ر': 'raa',
  'ز': 'zay',
  'س': 'seen',
  'ش': 'sheen',
  'ص': 'saad',
  'ض': 'daad',
  'ط': 'taa_heavy',
  'ظ': 'zaa_heavy',
  'ع': 'ayn',
  'غ': 'ghayn',
  'ف': 'faa',
  'ق': 'qaaf',
  'ك': 'kaaf',
  'ل': 'laam',
  'م': 'meem',
  'ن': 'noon',
  'ه': 'haa_soft', 'ة': 'haa_soft',
  'و': 'waaw',
  'ي': 'yaa', 'ى': 'yaa'
};

// Arabic letter name to English letter slug
export const ARABIC_NAME_TO_SLUG: Record<string, string> = {
  'أَلِف': 'alif', 'الف': 'alif', 'ألف': 'alif',
  'بَاء': 'baa', 'باء': 'baa',
  'تَاء': 'taa', 'تاء': 'taa',
  'ثَاء': 'thaa', 'ثاء': 'thaa',
  'جِيم': 'jeem', 'جيم': 'jeem',
  'حَاء': 'haa', 'حاء': 'haa',
  'خَاء': 'khaa', 'خاء': 'khaa',
  'دَال': 'daal', 'دال': 'daal',
  'ذَال': 'zaal', 'ذال': 'zaal',
  'رَاء': 'raa', 'راء': 'raa',
  'زَاي': 'zay', 'زاي': 'zay',
  'سِين': 'seen', 'سين': 'seen',
  'شِين': 'sheen', 'شين': 'sheen',
  'صَاد': 'saad', 'صاد': 'saad',
  'ضَاد': 'daad', 'ضاد': 'daad',
  'طَاء': 'taa_heavy', 'طاء': 'taa_heavy',
  'ظَاء': 'zaa_heavy', 'ظاء': 'zaa_heavy',
  'عَيْن': 'ayn', 'عين': 'ayn',
  'غَيْن': 'ghayn', 'غين': 'ghayn',
  'فَاء': 'faa', 'فاء': 'faa',
  'قَاف': 'qaaf', 'قاف': 'qaaf',
  'كَاف': 'kaaf', 'كاف': 'kaaf',
  'لاَم': 'laam', 'لام': 'laam',
  'مِيم': 'meem', 'ميم': 'meem',
  'نُون': 'noon', 'noon': 'noon',
  'هَاء': 'haa_soft', 'هاء': 'haa_soft',
  'وَاو': 'waaw', 'واو': 'waaw',
  'يَاء': 'yaa', 'ياء': 'yaa'
};

// Master Unified Static Audio Map
export const MASTER_AUDIO_MANIFEST: Record<string, string> = {
  ...LETTER_AUDIO_MAP,
  ...SYLLABLE_AUDIO_MAP,
  ...WORD_AUDIO_MAP,
  ...SENTENCE_AUDIO_MAP,
  ...STAGE_AUDIO_MAP,
  ...DIALOGUE_AUDIO_MAP,
  ...NAME_AUDIO_MAP,
  ...ARTICULATION_AUDIO_MAP
};

/**
 * Strips Arabic tashkeel (diacritics) for fuzzy matching
 */
export function stripTashkeel(text: string): string {
  return text
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, '')
    .trim();
}

/**
 * Strips emojis and punctuation icons
 */
export function stripEmojis(text: string): string {
  return text
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{1F004}\u{1F0CF}\u{2B06}\u{2194}-\u{21AA}]/gu, '')
    .replace(/[✨⭐🌟💫🎉🎈🎊👑💎💡🔔🎵🎶🏆🥇🥈🥉👄👅👃🦷👁️]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Resolves any key, text, or phrase to its standardized local MP3 file path
 * Returns null if no pre-recorded audio file matches.
 */
export function resolveStaticAudioPath(keyOrText: string): string | string[] | null {
  const raw = keyOrText.trim();
  if (!raw) return null;

  // 1. Direct path or URL
  if (raw.startsWith('/') || raw.startsWith('http')) {
    return raw;
  }

  // 2. Direct exact match in master manifest
  if (MASTER_AUDIO_MANIFEST[raw]) {
    return MASTER_AUDIO_MANIFEST[raw];
  }

  // 3. Single Arabic character lookup
  if (ARABIC_CHAR_TO_SLUG[raw]) {
    const slug = ARABIC_CHAR_TO_SLUG[raw];
    return LETTER_AUDIO_MAP[slug] || null;
  }

  // 4. Normalized stripped tashkeel match
  const stripped = stripTashkeel(raw);
  if (MASTER_AUDIO_MANIFEST[stripped]) {
    return MASTER_AUDIO_MANIFEST[stripped];
  }

  // 5. Letter name lookup (e.g. 'أَلِف', 'بَاء')
  if (ARABIC_NAME_TO_SLUG[stripped]) {
    const slug = ARABIC_NAME_TO_SLUG[stripped];
    return LETTER_AUDIO_MAP[slug] || null;
  }

  // 6. Stage specific explanations & titles
  if (STAGE_AUDIO_MAP[raw]) {
    return STAGE_AUDIO_MAP[raw];
  }
  if (STAGE_AUDIO_MAP[stripped]) {
    return STAGE_AUDIO_MAP[stripped];
  }

  // Check if text is a detailed stage explanation
  const isExplanation =
    stripped.includes('في هذه المرحلة') ||
    stripped.includes('شرح') ||
    stripped.includes('كيف يلعب') ||
    stripped.includes('طريقة اللعب') ||
    stripped.includes('اصطد فقاعات') ||
    stripped.includes('تشريح الفم') ||
    stripped.includes('الحركات التشكيلية') ||
    stripped.includes('قطار الاصوات') ||
    stripped.includes('صيد الكلمات') ||
    stripped.includes('مهندس كلمات') ||
    stripped.includes('بوابة التتويج') ||
    stripped.includes('استمع للمقطع') ||
    stripped.includes('انظر للكلمة');

  const stageMatch = stripped.match(/(?:المرحلة|مرحلة)\s*([1-8])/i);
  if (stageMatch && stageMatch[1]) {
    const stageNum = stageMatch[1];
    if (isExplanation || stripped.length > 40) {
      return STAGE_AUDIO_MAP[`stage_${stageNum}_explain`] || null;
    }
    // Only return short title mp3 if it's a short title phrase
    if (stripped.length <= 40) {
      return STAGE_AUDIO_MAP[`stage_${stageNum}`] || null;
    }
  }
  if (stripped.includes('اكمل المرحلة السابقة') || stripped.includes('أكمل المرحلة السابقة')) {
    return '/audio/dialogue/complete_previous_first.mp3';
  }
  if (stripped.includes('استمع لصوت الحرف') || stripped.includes('اسْتَمِعْ لِصَوْتِ الحَرْف')) {
    return '/audio/stages/listen_sound.mp3';
  }
  if (stripped.includes('فتحت لك المرحلة') || stripped.includes('فُتِحَتْ لَكَ المَرْحَلَةُ')) {
    return '/audio/dialogue/open_next_stage.mp3';
  }

  // 7. Letter phrase match: "حرف الباء", "صوت حرف الجيم.. جْ", "حرف ب"
  const letterMatch = stripped.match(/(?:حرف|صوت)\s+(?:حرف\s+)?(?:ال)?([^\s.]+)/i);
  if (letterMatch && letterMatch[1]) {
    const candidateName = letterMatch[1].replace(/^(ال|ل)/, '');
    if (ARABIC_NAME_TO_SLUG[candidateName]) {
      const slug = ARABIC_NAME_TO_SLUG[candidateName];
      return LETTER_AUDIO_MAP[slug] || null;
    }
    if (ARABIC_CHAR_TO_SLUG[candidateName]) {
      const slug = ARABIC_CHAR_TO_SLUG[candidateName];
      return LETTER_AUDIO_MAP[slug] || null;
    }
  }

  // 8. Dialogues & System prompts
  if (stripped.includes('ما اسمك') || stripped.includes('اكتب اسمك')) {
    return '/audio/dialogue/ask_name.mp3';
  }
  if (stripped.includes('اختر حرفك') || stripped.includes('اخْتَرْ حَرْفَكَ')) {
    return '/audio/dialogue/choose_letter.mp3';
  }
  if (stripped.includes('اختيار رائع') || stripped.includes('اختيار ساحر')) {
    return '/audio/dialogue/letter_choice_cheer.mp3';
  }

  // Encouragements
  if (
    stripped.includes('احسنت') ||
    stripped.includes('أحسنت') ||
    stripped.includes('ممتاز') ||
    stripped.includes('رائع') ||
    stripped.includes('عمل ملكي') ||
    stripped.includes('اجابة رائعة')
  ) {
    if (stripped.includes('طلال')) {
      return '/audio/dialogue/cheer_talal.mp3';
    }
    if (stripped.includes('رنيم')) {
      return '/audio/dialogue/cheer_raneem.mp3';
    }
    return '/audio/dialogue/excellent.mp3';
  }

  // Retries
  if (
    stripped.includes('حاول مرة') ||
    stripped.includes('حَاوِلْ مَرَّةً') ||
    stripped.includes('حاولي مرة') ||
    stripped.includes('لنجرب خيارا') ||
    stripped.includes('لِنُجَرِّبْ خِيَارًا')
  ) {
    return '/audio/dialogue/try_again.mp3';
  }

  // Welcomes & Greetings
  if (
    stripped.includes('مرحبا') ||
    stripped.includes('مَرْحَبًا') ||
    stripped.includes('اهلا') ||
    stripped.includes('أَهْلًا') ||
    stripped.includes('أهلا')
  ) {
    if (stripped.includes('طلال')) {
      return '/audio/dialogue/welcome_talal.mp3';
    }
    if (stripped.includes('رنيم')) {
      return '/audio/dialogue/welcome_raneem.mp3';
    }
    return '/audio/dialogue/welcome.mp3';
  }

  // 9. Exact Standalone Child Name Match ONLY (Never substring match across sentences)
  if (NAME_AUDIO_MAP[stripped]) {
    return NAME_AUDIO_MAP[stripped];
  }
  if (stripped.startsWith('يا ') || stripped.startsWith('يَا ')) {
    const singleName = stripped.replace(/^(يا|يَا)\s+/, '').trim();
    if (NAME_AUDIO_MAP[singleName]) {
      return NAME_AUDIO_MAP[singleName];
    }
  }

  return null;
}
