// Comprehensive Database of All 28 Arabic Letters in Exact Alphabetical Order
// ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي

export interface LetterData {
  id: string;
  char: string;
  nameAr: string;
  order: number;
  soundKey: string;
  mouthGuide: {
    tip: string;
    lipPosition: string;
    shape: 'closed_lips' | 'open_throat' | 'tongue_teeth' | 'round_lips' | 'smile_teeth';
  };
  syllables: {
    short: Array<{ id: string; syl: string; vowel: string; nameAr: string; tip: string }>;
    long: Array<{ id: string; syl: string; vowel: string; nameAr: string; tip: string; example: string }>;
  };
  words: Array<{
    id: string;
    word: string;
    meaning: string;
    position: 'start' | 'middle' | 'end';
    positionLabel: string;
    emoji: string;
    letters: string[];
  }>;
  sentences: Array<{
    id: string;
    sentence: string;
    meaning: string;
    emoji: string;
    missingWordQuestion: string;
    options: string[];
    correctIndex: number;
  }>;
  themeColor: string;
  accentColor: string;
}

export const ARABIC_LETTERS: LetterData[] = [
  {
    id: 'alif',
    char: 'ا',
    nameAr: 'أَلِف',
    order: 1,
    soundKey: 'alif',
    mouthGuide: {
      tip: 'افتح فمك بحرية ودع الهواء النقي يخرج من الحلق: أَ',
      lipPosition: 'فم مفتوح براحة وهدوء',
      shape: 'open_throat'
    },
    syllables: {
      short: [
        { id: 'a_fatha', syl: 'أَ', vowel: 'fatha', nameAr: 'همزة بالفتحة', tip: 'أَ.. افتح الفم لأعلى' },
        { id: 'a_kasra', syl: 'إِ', vowel: 'kasra', nameAr: 'همزة بالكسرة', tip: 'إِ.. ابتسامة خفيفة' },
        { id: 'a_damma', syl: 'أُ', vowel: 'damma', nameAr: 'همزة بالضمة', tip: 'أُ.. ضم الشفتين' }
      ],
      long: [
        { id: 'a_madd_a', syl: 'آ', vowel: 'madd_alif', nameAr: 'مد الألف', tip: 'آااا.. مد الصوت طويلًا', example: 'آمَال' },
        { id: 'a_madd_y', syl: 'إِي', vowel: 'madd_yaa', nameAr: 'مد الياء', tip: 'إِييي.. مد الياء', example: 'إِيمَان' },
        { id: 'a_madd_w', syl: 'أُو', vowel: 'madd_waw', nameAr: 'مد الواو', tip: 'أُووو.. ضم الشفتين ومد', example: 'أُولَى' }
      ]
    },
    words: [
      { id: 'a_w1', word: 'أَرْنَب', meaning: 'أرنب يقفز في الحقل', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐰', letters: ['أ', 'ر', 'ن', 'ب'] },
      { id: 'a_w2', word: 'أَسَد', meaning: 'أسد قوي وشجاع', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🦁', letters: ['أ', 'س', 'د'] },
      { id: 'a_w3', word: 'فَأْر', meaning: 'فأر صغير وسريع', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🐭', letters: ['ف', 'أ', 'ر'] },
      { id: 'a_w4', word: 'قَرَأَ', meaning: 'قرأ كتابًا مفيدًا', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '📖', letters: ['ق', 'ر', 'أ'] }
    ],
    sentences: [
      {
        id: 'a_s1',
        sentence: 'الأَرْنَبُ يَأْكُلُ الجَزَرَ.',
        meaning: 'الأرنب يأكل الجزر',
        emoji: '🐰🥕',
        missingWordQuestion: 'أكمل الجملة: ..... يَأْكُلُ الجَزَرَ.',
        options: ['الأَرْنَبُ', 'البَابُ', 'القَلَمُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-amber-400 to-red-500',
    accentColor: 'border-red-400 text-red-700 bg-red-50'
  },
  {
    id: 'baa',
    char: 'ب',
    nameAr: 'بَاء',
    order: 2,
    soundKey: 'baa',
    mouthGuide: {
      tip: 'أغلق الشفتين معًا بلطف ثم افتحهما مع إخراج الهواء: بْ',
      lipPosition: 'الشفتان متلاصقتان برفق ثم تنفرجان',
      shape: 'closed_lips'
    },
    syllables: {
      short: [
        { id: 'baa_fatha', syl: 'بَ', vowel: 'fatha', nameAr: 'باء بالفتحة', tip: 'بَ.. افتح الفم لأعلى' },
        { id: 'baa_kasra', syl: 'بِ', vowel: 'kasra', nameAr: 'باء بالكسرة', tip: 'بِ.. ابتسم بنعومة' },
        { id: 'baa_damma', syl: 'بُ', vowel: 'damma', nameAr: 'باء بالضمة', tip: 'بُ.. ضم الشفتين مثل الوردة' }
      ],
      long: [
        { id: 'baa_alif', syl: 'بَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'بَاااا.. مد الصوت طويلًا', example: 'بَاب' },
        { id: 'baa_yaa', syl: 'بِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'بِيييي.. ابتسم ومد الصوت', example: 'طَبِيب' },
        { id: 'baa_waw', syl: 'بُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'بُوووو.. ضم الشفتين ومد', example: 'بُومَة' }
      ]
    },
    words: [
      { id: 'baa_w1', word: 'بَاب', meaning: 'باب البيت الجميل', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🚪', letters: ['ب', 'ا', 'ب'] },
      { id: 'baa_w2', word: 'بَطَّة', meaning: 'بطة تسبح في البحيرة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🦆', letters: ['ب', 'ط', 'ة'] },
      { id: 'baa_w3', word: 'بَيْت', meaning: 'بيت دافئ وسعيد', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🏠', letters: ['ب', 'ي', 'ت'] },
      { id: 'baa_w4', word: 'بَحْر', meaning: 'بحر أزرق واسع', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🌊', letters: ['ب', 'ح', 'ر'] },
      { id: 'baa_w5', word: 'حَبْل', meaning: 'حبل متين', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🪢', letters: ['ح', 'ب', 'ل'] },
      { id: 'baa_w6', word: 'خُبْز', meaning: 'خبز طازج ولذيذ', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🍞', letters: ['خ', 'ب', 'ز'] },
      { id: 'baa_w7', word: 'عِنَب', meaning: 'عنب حلو ومفيد', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🍇', letters: ['ع', 'ن', 'ب'] },
      { id: 'baa_w8', word: 'كَتَبَ', meaning: 'كتب بالقلم', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '✍️', letters: ['ك', 'ت', 'ب'] }
    ],
    sentences: [
      {
        id: 'baa_s1',
        sentence: 'هَذَا بَابُ البَيْتِ.',
        meaning: 'هذا باب البيت',
        emoji: '🚪🏠',
        missingWordQuestion: 'أكمل الجملة: هَذَا ..... البَيْتِ.',
        options: ['بَابُ', 'قَلَمُ', 'شَمْسُ'],
        correctIndex: 0
      },
      {
        id: 'baa_s2',
        sentence: 'البَطَّةُ تَسْبَحُ فِي البَحْرِ.',
        meaning: 'البطة تسبح في البحر',
        emoji: '🦆🌊',
        missingWordQuestion: 'أكمل الجملة: ..... تَسْبَحُ فِي البَحْرِ.',
        options: ['القِطَّةُ', 'البَطَّةُ', 'الشَّجَرَةُ'],
        correctIndex: 1
      },
      {
        id: 'baa_s3',
        sentence: 'أَنَا أُحِبُّ أَبِي وَأُمِّي.',
        meaning: 'أنا أحب أبي وأمي',
        emoji: '❤️👨‍👩‍👧',
        missingWordQuestion: 'أكمل الجملة: أَنَا أُحِبُّ ..... وَأُمِّي.',
        options: ['أَبِي', 'كِتَابِي', 'بَابِي'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-rose-400 to-pink-500',
    accentColor: 'border-pink-400 text-pink-700 bg-pink-50'
  },
  {
    id: 'taa',
    char: 'ت',
    nameAr: 'تَاء',
    order: 3,
    soundKey: 'taa',
    mouthGuide: {
      tip: 'ضع طرف اللسان خلف الأسنان العلوية مباشرة واضغط بخفة: تْ',
      lipPosition: 'شفتان مفتوحتان قليلًا مع ملامسة طرف اللسان',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'taa_fatha', syl: 'تَ', vowel: 'fatha', nameAr: 'تاء بالفتحة', tip: 'تَ.. طرف اللسان مع الفتح' },
        { id: 'taa_kasra', syl: 'تِ', vowel: 'kasra', nameAr: 'تاء بالكسرة', tip: 'تِ.. ابتسامة مع التاء' },
        { id: 'taa_damma', syl: 'تُ', vowel: 'damma', nameAr: 'تاء بالضمة', tip: 'تُ.. ضم الشفتين' }
      ],
      long: [
        { id: 'taa_alif', syl: 'تَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'تَااا.. مد الصوت', example: 'تَاج' },
        { id: 'taa_yaa', syl: 'تِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'تِييي.. مد الياء', example: 'تِين' },
        { id: 'taa_waw', syl: 'تُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'تُووو.. مد الواو', example: 'تُوت' }
      ]
    },
    words: [
      { id: 'taa_w1', word: 'تُفَّاح', meaning: 'تفاح أحمر حلو ولذيذ', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🍎', letters: ['ت', 'ف', 'ا', 'ح'] },
      { id: 'taa_w2', word: 'تَاج', meaning: 'تاج ذهبي لامع للأبطال', position: 'start', positionLabel: 'في أول الكلمة', emoji: '👑', letters: ['ت', 'ا', 'ج'] },
      { id: 'taa_w3', word: 'كِتَاب', meaning: 'كتاب مليء بالحكايات', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '📖', letters: ['ك', 'ت', 'ا', 'ب'] },
      { id: 'taa_w4', word: 'بَيْت', meaning: 'بيت جميل', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🏡', letters: ['ب', 'ي', 'ت'] }
    ],
    sentences: [
      {
        id: 'taa_s1',
        sentence: 'أَكَلَ أَحْمَدُ تُفَّاحَةً لَذِيذَةً.',
        meaning: 'أكل أحمد تفاحة لذيذة',
        emoji: '🍎😋',
        missingWordQuestion: 'أكمل الجملة: أَكَلَ أَحْمَدُ ..... لَذِيذَةً.',
        options: ['تُفَّاحَةً', 'بَابًا', 'قَلَمًا'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-emerald-400 to-teal-500',
    accentColor: 'border-emerald-400 text-emerald-700 bg-emerald-50'
  },
  {
    id: 'thaa',
    char: 'ث',
    nameAr: 'ثَاء',
    order: 4,
    soundKey: 'thaa',
    mouthGuide: {
      tip: 'أخرج طرف لسانك برفق بين الأسنان مع نفخ هواء ناعم: ثْ',
      lipPosition: 'طرف اللسان بارز قليلًا بين الأسنان',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'th_fatha', syl: 'ثَ', vowel: 'fatha', nameAr: 'ثاء بالفتحة', tip: 'ثَ.. افتح مع خروج طرف اللسان' },
        { id: 'th_kasra', syl: 'ثِ', vowel: 'kasra', nameAr: 'ثاء بالكسرة', tip: 'ثِ.. ابتسم مع الثاء' },
        { id: 'th_damma', syl: 'ثُ', vowel: 'damma', nameAr: 'ثاء بالضمة', tip: 'ثُ.. ضم الشفتين' }
      ],
      long: [
        { id: 'th_alif', syl: 'ثَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'ثَااا.. مد الصوت', example: 'ثَابِت' },
        { id: 'th_yaa', syl: 'ثِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'ثِييي.. مد الياء', example: 'كَثِير' },
        { id: 'th_waw', syl: 'ثُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'ثُووو.. مد الواو', example: 'ثُوم' }
      ]
    },
    words: [
      { id: 'th_w1', word: 'ثَعْلَب', meaning: 'ثعلب ذكي ورشيق', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🦊', letters: ['ث', 'ع', 'ل', 'ب'] },
      { id: 'th_w2', word: 'ثَوْب', meaning: 'ثوب نظيف وأنيق', position: 'start', positionLabel: 'في أول الكلمة', emoji: '👘', letters: ['ث', 'و', 'ب'] },
      { id: 'th_w3', word: 'مُثَلَّث', meaning: 'شكل المثلث الهندسي', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🔺', letters: ['م', 'ث', 'ل', 'ث'] },
      { id: 'th_w4', word: 'بَحَثَ', meaning: 'بحث عن الكنز', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🔍', letters: ['ب', 'ح', 'ث'] }
    ],
    sentences: [
      {
        id: 'th_s1',
        sentence: 'الثَّعْلَبُ حَيَوَانٌ سَرِيعٌ.',
        meaning: 'الثعلب حيوان سريع',
        emoji: '🦊💨',
        missingWordQuestion: 'أكمل الجملة: ..... حَيَوَانٌ سَرِيعٌ.',
        options: ['الثَّعْلَبُ', 'الكِتَابُ', 'البَابُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-indigo-400 to-purple-500',
    accentColor: 'border-indigo-400 text-indigo-700 bg-indigo-50'
  },
  {
    id: 'jeem',
    char: 'ج',
    nameAr: 'جِيم',
    order: 5,
    soundKey: 'jeem',
    mouthGuide: {
      tip: 'وسط اللسان يرتفع لوسط سقف الحلق ويخرج صوت رنان: جْ',
      lipPosition: 'شفتان مدورتان قليلًا',
      shape: 'round_lips'
    },
    syllables: {
      short: [
        { id: 'j_fatha', syl: 'جَ', vowel: 'fatha', nameAr: 'جيم بالفتحة', tip: 'جَ.. جيم مفتوحة' },
        { id: 'j_kasra', syl: 'جِ', vowel: 'kasra', nameAr: 'جيم بالكسرة', tip: 'جِ.. جيم مكسورة' },
        { id: 'j_damma', syl: 'جُ', vowel: 'damma', nameAr: 'جيم بالضمة', tip: 'جُ.. جيم مضمومة' }
      ],
      long: [
        { id: 'j_alif', syl: 'جَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'جَااا', example: 'جَامِع' },
        { id: 'j_yaa', syl: 'جِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'جِييي', example: 'جِيرَان' },
        { id: 'j_waw', syl: 'جُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'جُووو', example: 'نُجُوم' }
      ]
    },
    words: [
      { id: 'j_w1', word: 'جَمَل', meaning: 'جمل يعيش في الصحراء', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐪', letters: ['ج', 'م', 'ل'] },
      { id: 'j_w2', word: 'جَزَر', meaning: 'جزر برتقالي مفيد', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🥕', letters: ['ج', 'ز', 'ر'] },
      { id: 'j_w3', word: 'شَجَرَة', meaning: 'شجرة خضراء عالية', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🌳', letters: ['ش', 'ج', 'ر', 'ة'] },
      { id: 'j_w4', word: 'تَاج', meaning: 'تاج ذهبي', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '👑', letters: ['ت', 'ا', 'ج'] }
    ],
    sentences: [
      {
        id: 'j_s1',
        sentence: 'الجَمَلُ سَفِينَةُ الصَّحْرَاءِ.',
        meaning: 'الجمل سفينة الصحراء',
        emoji: '🐪🏜️',
        missingWordQuestion: 'أكمل الجملة: ..... سَفِينَةُ الصَّحْرَاءِ.',
        options: ['الجَمَلُ', 'البَحْرُ', 'القَلَمُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-yellow-400 to-amber-500',
    accentColor: 'border-amber-400 text-amber-700 bg-amber-50'
  },
  {
    id: 'haa',
    char: 'ح',
    nameAr: 'حَاء',
    order: 6,
    soundKey: 'haa',
    mouthGuide: {
      tip: 'أخرج هواءً دافئًا ناعمًا من وسط الحلق دون حشرجة: حْ',
      lipPosition: 'فم مفتوح باسترخاء وهواء دافئ',
      shape: 'open_throat'
    },
    syllables: {
      short: [
        { id: 'h_fatha', syl: 'حَ', vowel: 'fatha', nameAr: 'حاء بالفتحة', tip: 'حَ.. دافئة ومفتوحة' },
        { id: 'h_kasra', syl: 'حِ', vowel: 'kasra', nameAr: 'حاء بالكسرة', tip: 'حِ.. دافئة ومكسورة' },
        { id: 'h_damma', syl: 'حُ', vowel: 'damma', nameAr: 'حاء بالضمة', tip: 'حُ.. دافئة ومضمومة' }
      ],
      long: [
        { id: 'h_alif', syl: 'حَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'حَااا', example: 'حَافِلَة' },
        { id: 'h_yaa', syl: 'حِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'حِييي', example: 'حَلِيب' },
        { id: 'h_waw', syl: 'حُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'حُووو', example: 'حُوت' }
      ]
    },
    words: [
      { id: 'h_w1', word: 'حِصَان', meaning: 'حصان أصيل وسريع', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐴', letters: ['ح', 'ص', 'ا', 'ن'] },
      { id: 'h_w2', word: 'حَلِيب', meaning: 'حليب أبيض مغذٍ', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🥛', letters: ['ح', 'ل', 'ي', 'ب'] },
      { id: 'h_w3', word: 'بَحْر', meaning: 'بحر أزرق واسع', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🌊', letters: ['ب', 'ح', 'ر'] },
      { id: 'h_w4', word: 'تُفَّاح', meaning: 'تفاح أحمر', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🍎', letters: ['ت', 'ف', 'ا', 'ح'] }
    ],
    sentences: [
      {
        id: 'h_s1',
        sentence: 'الحِصَانُ يَجْرِي بِسُرْعَةٍ فِي المَيْدَانِ.',
        meaning: 'الحصان يجري بسرعة في الميدان',
        emoji: '🐴🏇',
        missingWordQuestion: 'أكمل الجملة: ..... يَجْرِي بِسُرْعَةٍ.',
        options: ['الحِصَانُ', 'البَابُ', 'الكِتَابُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-orange-400 to-rose-500',
    accentColor: 'border-orange-400 text-orange-700 bg-orange-50'
  },
  {
    id: 'khaa',
    char: 'خ',
    nameAr: 'خَاء',
    order: 7,
    soundKey: 'khaa',
    mouthGuide: {
      tip: 'صوت يخرج من أعلى الحلق برفق وانسيابية: خْ',
      lipPosition: 'فم نصف مفتوح',
      shape: 'open_throat'
    },
    syllables: {
      short: [
        { id: 'kh_fatha', syl: 'خَ', vowel: 'fatha', nameAr: 'خاء بالفتحة', tip: 'خَ.. مفخمة ومفتوحة' },
        { id: 'kh_kasra', syl: 'خِ', vowel: 'kasra', nameAr: 'خاء بالكسرة', tip: 'خِ.. مفخمة ومكسورة' },
        { id: 'kh_damma', syl: 'خُ', vowel: 'damma', nameAr: 'خاء بالضمة', tip: 'خُ.. مفخمة ومضمومة' }
      ],
      long: [
        { id: 'kh_alif', syl: 'خَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'خَااا', example: 'خَاتَم' },
        { id: 'kh_yaa', syl: 'خِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'خِييي', example: 'نَخِيل' },
        { id: 'kh_waw', syl: 'خُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'خُووو', example: 'خُوخ' }
      ]
    },
    words: [
      { id: 'kh_w1', word: 'خَرُوف', meaning: 'خروف ذو صوف ناعم', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐑', letters: ['خ', 'ر', 'و', 'ف'] },
      { id: 'kh_w2', word: 'خُبْز', meaning: 'خبز طازج وشهي', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🍞', letters: ['خ', 'ب', 'ز'] },
      { id: 'kh_w3', word: 'نَخْلَة', meaning: 'نخلة تعطي التمر الحلو', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🌴', letters: ['ن', 'خ', 'ل', 'ة'] },
      { id: 'kh_w4', word: 'بِطِّيخ', meaning: 'بطيخ أحمر منعش', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🍉', letters: ['ب', 'ط', 'ي', 'خ'] }
    ],
    sentences: [
      {
        id: 'kh_s1',
        sentence: 'الخَرُوفُ يَرْعَى فِي الحَقْلِ الأَخْضَرِ.',
        meaning: 'الخروف يرعى في الحقل الأخضر',
        emoji: '🐑🌾',
        missingWordQuestion: 'أكمل الجملة: ..... يَرْعَى فِي الحَقْلِ.',
        options: ['الخَرُوفُ', 'القَلَمُ', 'السَّيَّارَةُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-green-400 to-emerald-600',
    accentColor: 'border-green-400 text-green-700 bg-green-50'
  },
  {
    id: 'daal',
    char: 'د',
    nameAr: 'دَال',
    order: 8,
    soundKey: 'daal',
    mouthGuide: {
      tip: 'المس خلف الأسنان العلوية بطرف اللسان بقوة خفيفة: دْ',
      lipPosition: 'شفتان مفتوحتان مع نبضة بطرف اللسان',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'd_fatha', syl: 'دَ', vowel: 'fatha', nameAr: 'دال بالفتحة', tip: 'دَ' },
        { id: 'd_kasra', syl: 'دِ', vowel: 'kasra', nameAr: 'دال بالكسرة', tip: 'دِ' },
        { id: 'd_damma', syl: 'دُ', vowel: 'damma', nameAr: 'دال بالضمة', tip: 'دُ' }
      ],
      long: [
        { id: 'd_alif', syl: 'دَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'دَااا', example: 'دَار' },
        { id: 'd_yaa', syl: 'دِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'دِييي', example: 'دِيك' },
        { id: 'd_waw', syl: 'دُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'دُووو', example: 'دُودَة' }
      ]
    },
    words: [
      { id: 'd_w1', word: 'دُبّ', meaning: 'دب أليف', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐻', letters: ['د', 'ب'] },
      { id: 'd_w2', word: 'دَرَّاجَة', meaning: 'دراجة أركبها في الحديقة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🚲', letters: ['د', 'ر', 'ا', 'ج', 'ة'] },
      { id: 'd_w3', word: 'حَدِيقَة', meaning: 'حديقة خضراء جميلة', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🏡', letters: ['ح', 'د', 'ي', 'ق', 'ة'] },
      { id: 'd_w4', word: 'أَسَد', meaning: 'أسد ملك الغابة', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🦁', letters: ['أ', 'س', 'د'] }
    ],
    sentences: [
      {
        id: 'd_s1',
        sentence: 'أَحْمَدُ يَرْكَبُ الدَّرَّاجَةَ الجَدِيدَةَ.',
        meaning: 'أحمد يركب الدراجة الجديدة',
        emoji: '👦🚲',
        missingWordQuestion: 'أكمل الجملة: أَحْمَدُ يَرْكَبُ ..... الجَدِيدَةَ.',
        options: ['الدَّرَّاجَةَ', 'البَابَ', 'الشَّمْسَ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-teal-400 to-emerald-500',
    accentColor: 'border-teal-400 text-teal-700 bg-teal-50'
  },
  {
    id: 'zaal',
    char: 'ذ',
    nameAr: 'ذَال',
    order: 9,
    soundKey: 'zaal',
    mouthGuide: {
      tip: 'أخرج طرف لسانك قليلًا بين الأسنان برنين خفيف: ذْ',
      lipPosition: 'طرف اللسان بين الأسنان برفق',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'dh_fatha', syl: 'ذَ', vowel: 'fatha', nameAr: 'ذال بالفتحة', tip: 'ذَ' },
        { id: 'dh_kasra', syl: 'ذِ', vowel: 'kasra', nameAr: 'ذال بالكسرة', tip: 'ذِ' },
        { id: 'dh_damma', syl: 'ذُ', vowel: 'damma', nameAr: 'ذال بالضمة', tip: 'ذُ' }
      ],
      long: [
        { id: 'dh_alif', syl: 'ذَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'ذَااا', example: 'ذَاكِر' },
        { id: 'dh_yaa', syl: 'ذِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'ذِييي', example: 'مُذِيع' },
        { id: 'dh_waw', syl: 'ذُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'ذُووو', example: 'بُذُور' }
      ]
    },
    words: [
      { id: 'dh_w1', word: 'ذُرَة', meaning: 'ذرة صفراء ولذيذة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🌽', letters: ['ذ', 'ر', 'ة'] },
      { id: 'dh_w2', word: 'ذِئْب', meaning: 'ذئب في الغابة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐺', letters: ['ذ', 'ئ', 'ب'] },
      { id: 'dh_w3', word: 'بُذُور', meaning: 'بذور نزرعها في التربة', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🌱', letters: ['ب', 'ذ', 'و', 'ر'] },
      { id: 'dh_w4', word: 'قُنْفُذ', meaning: 'قنفذ ذو شوك لطيف', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🦔', letters: ['ق', 'ن', 'ف', 'ذ'] }
    ],
    sentences: [
      {
        id: 'dh_s1',
        sentence: 'الذُّرَةُ نَبَاتٌ لَذِيذٌ وَمُفِيدٌ.',
        meaning: 'الذرة نبات لذيذ ومفيد',
        emoji: '🌽😋',
        missingWordQuestion: 'أكمل الجملة: ..... نَبَاتٌ لَذِيذٌ وَمُفِيدٌ.',
        options: ['الذُّرَةُ', 'البَابُ', 'القَلَمُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-indigo-400 to-blue-600',
    accentColor: 'border-indigo-400 text-indigo-700 bg-indigo-50'
  },
  {
    id: 'raa',
    char: 'ر',
    nameAr: 'رَاء',
    order: 10,
    soundKey: 'raa',
    mouthGuide: {
      tip: 'دع طرف اللسان يرتعش برفق عند سقف الحلق: رْ',
      lipPosition: 'فم مفتوح باعتدال واللسان يهتز بخفة',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'r_fatha', syl: 'رَ', vowel: 'fatha', nameAr: 'راء بالفتحة', tip: 'رَ' },
        { id: 'r_kasra', syl: 'رِ', vowel: 'kasra', nameAr: 'راء بالكسرة', tip: 'رِ' },
        { id: 'r_damma', syl: 'رُ', vowel: 'damma', nameAr: 'راء بالضمة', tip: 'رُ' }
      ],
      long: [
        { id: 'r_alif', syl: 'رَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'رَااا', example: 'رَامِي' },
        { id: 'r_yaa', syl: 'رِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'رِييي', example: 'رِيشَة' },
        { id: 'r_waw', syl: 'رُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'رُووو', example: 'خَرُوف' }
      ]
    },
    words: [
      { id: 'r_w1', word: 'رُمَّان', meaning: 'رمان أحمر شهي', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🍎', letters: ['ر', 'م', 'ا', 'ن'] },
      { id: 'r_w2', word: 'رِيشَة', meaning: 'ريشة طائر خفيفة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🪶', letters: ['ر', 'ي', 'ش', 'ة'] },
      { id: 'r_w3', word: 'زَرَافَة', meaning: 'زرافة طويلة العنق', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🦒', letters: ['ز', 'ر', 'ا', 'ف', 'ة'] },
      { id: 'r_w4', word: 'قَمَر', meaning: 'قمر منير في السماء', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🌙', letters: ['ق', 'م', 'ر'] }
    ],
    sentences: [
      {
        id: 'r_s1',
        sentence: 'القَمَرُ يُنِيرُ السَّمَاءَ فِي اللَّيْلِ.',
        meaning: 'القمر ينير السماء في الليل',
        emoji: '🌙✨',
        missingWordQuestion: 'أكمل الجملة: ..... يُنِيرُ السَّمَاءَ فِي اللَّيْلِ.',
        options: ['القَمَرُ', 'البَابُ', 'الخَرُوفُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-lime-400 to-green-500',
    accentColor: 'border-lime-400 text-lime-700 bg-lime-50'
  },
  {
    id: 'zay',
    char: 'ز',
    nameAr: 'زَاي',
    order: 11,
    soundKey: 'zay',
    mouthGuide: {
      tip: 'قرب الأسنان واجعل الصوت يرن ويهتز مثل طنين النحلة: زْ',
      lipPosition: 'ابتسامة والأسنان متقاربة مع طنين خفيف',
      shape: 'smile_teeth'
    },
    syllables: {
      short: [
        { id: 'z_fatha', syl: 'زَ', vowel: 'fatha', nameAr: 'زاي بالفتحة', tip: 'زَ' },
        { id: 'z_kasra', syl: 'زِ', vowel: 'kasra', nameAr: 'زاي بالكسرة', tip: 'زِ' },
        { id: 'z_damma', syl: 'زُ', vowel: 'damma', nameAr: 'زاي بالضمة', tip: 'زُ' }
      ],
      long: [
        { id: 'z_alif', syl: 'زَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'زَااا', example: 'زَائِر' },
        { id: 'z_yaa', syl: 'زِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'زِييي', example: 'وَزِير' },
        { id: 'z_waw', syl: 'زُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'زُووو', example: 'زُهُور' }
      ]
    },
    words: [
      { id: 'z_w1', word: 'زَرَافَة', meaning: 'زرافة لطيفة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🦒', letters: ['ز', 'ر', 'ا', 'ف', 'ة'] },
      { id: 'z_w2', word: 'زَهْرَة', meaning: 'زهرة فواحة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🌸', letters: ['ز', 'ه', 'ر', 'ة'] },
      { id: 'z_w3', word: 'جَزَر', meaning: 'جزر مقوٍ للنظر', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🥕', letters: ['ج', 'ز', 'ر'] },
      { id: 'z_w4', word: 'مَوْز', meaning: 'موز حلو', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🍌', letters: ['م', 'و', 'ز'] }
    ],
    sentences: [
      {
        id: 'z_s1',
        sentence: 'الزَّرَافَةُ تَأْكُلُ أَوْرَاقَ الشَّجَرِ العَالِيَةِ.',
        meaning: 'الزرافة تأكل أوراق الشجر',
        emoji: '🦒🌿',
        missingWordQuestion: 'أكمل الجملة: ..... تَأْكُلُ أَوْرَاقَ الشَّجَرِ.',
        options: ['الزَّرَافَةُ', 'البَابُ', 'القَلَمُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-purple-400 to-violet-600',
    accentColor: 'border-purple-400 text-purple-700 bg-purple-50'
  },
  {
    id: 'seen',
    char: 'س',
    nameAr: 'سِين',
    order: 12,
    soundKey: 'seen',
    mouthGuide: {
      tip: 'ابتسم وقرب الأسنان واخرج هواءً صافيًا كالنسيم: سْ',
      lipPosition: 'ابتسامة عريضة والأسنان متقاربة مع تدفق الهواء',
      shape: 'smile_teeth'
    },
    syllables: {
      short: [
        { id: 's_fatha', syl: 'سَ', vowel: 'fatha', nameAr: 'سين بالفتحة', tip: 'سَ' },
        { id: 's_kasra', syl: 'سِ', vowel: 'kasra', nameAr: 'سين بالكسرة', tip: 'سِ' },
        { id: 's_damma', syl: 'سُ', vowel: 'damma', nameAr: 'سين بالضمة', tip: 'سُ' }
      ],
      long: [
        { id: 's_alif', syl: 'سَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'سَااا', example: 'سَاعَة' },
        { id: 's_yaa', syl: 'سِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'سِييي', example: 'سَفِينَة' },
        { id: 's_waw', syl: 'سُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'سُووو', example: 'سُور' }
      ]
    },
    words: [
      { id: 's_w1', word: 'سَيَّارَة', meaning: 'سيارة حديثة وسريعة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🚗', letters: ['س', 'ي', 'ا', 'ر', 'ة'] },
      { id: 's_w2', word: 'سَمَكَة', meaning: 'سمكة ملونة في الحوض', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐟', letters: ['س', 'م', 'ك', 'ة'] },
      { id: 's_w3', word: 'مَسْجِد', meaning: 'مسجد نصلي فيه', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🕌', letters: ['م', 'س', 'ج', 'د'] },
      { id: 's_w4', word: 'شَمْس', meaning: 'شمس مشرقة', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '☀️', letters: ['ش', 'م', 'س'] }
    ],
    sentences: [
      {
        id: 's_s1',
        sentence: 'السَّمَكَةُ تَسْبَحُ فِي المَاءِ الصَّافِي.',
        meaning: 'السمكة تسبح في الماء الصافي',
        emoji: '🐟🌊',
        missingWordQuestion: 'أكمل الجملة: ..... تَسْبَحُ فِي المَاءِ.',
        options: ['السَّمَكَةُ', 'الكِتَابُ', 'البَابُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-purple-400 to-indigo-500',
    accentColor: 'border-purple-400 text-purple-700 bg-purple-50'
  },
  {
    id: 'sheen',
    char: 'ش',
    nameAr: 'شِين',
    order: 13,
    soundKey: 'sheen',
    mouthGuide: {
      tip: 'ضم الشفتين قليلًا للأمام واخرج هواءً واسعًا هادئًا: شْ',
      lipPosition: 'شفتان مدورتان قليلًا للأمام',
      shape: 'round_lips'
    },
    syllables: {
      short: [
        { id: 'sh_fatha', syl: 'شَ', vowel: 'fatha', nameAr: 'شين بالفتحة', tip: 'شَ' },
        { id: 'sh_kasra', syl: 'شِ', vowel: 'kasra', nameAr: 'شين بالكسرة', tip: 'شِ' },
        { id: 'sh_damma', syl: 'شُ', vowel: 'damma', nameAr: 'شين بالضمة', tip: 'شُ' }
      ],
      long: [
        { id: 'sh_alif', syl: 'شَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'شَااا', example: 'شَارِع' },
        { id: 'sh_yaa', syl: 'شِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'شِييي', example: 'نَشِيط' },
        { id: 'sh_waw', syl: 'شُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'شُووو', example: 'شُعُور' }
      ]
    },
    words: [
      { id: 'sh_w1', word: 'شَمْس', meaning: 'شمس دافئة وساطعة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '☀️', letters: ['ش', 'م', 'س'] },
      { id: 'sh_w2', word: 'شَجَرَة', meaning: 'شجرة خضراء', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🌳', letters: ['ش', 'ج', 'ر', 'ة'] },
      { id: 'sh_w3', word: 'فَرَاشَة', meaning: 'فراشة بألوان بديعة', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🦋', letters: ['ف', 'ر', 'ا', 'ش', 'ة'] },
      { id: 'sh_w4', word: 'عُشّ', meaning: 'عش العصافير', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🪺', letters: ['ع', 'ش'] }
    ],
    sentences: [
      {
        id: 'sh_s1',
        sentence: 'الشَّمْسُ تُشْرِقُ كُلَّ صَبَاحٍ جَمِيلٍ.',
        meaning: 'الشمس تشرق كل صباح',
        emoji: '☀️🌅',
        missingWordQuestion: 'أكمل الجملة: ..... تُشْرِقُ كُلَّ صَبَاحٍ.',
        options: ['الشَّمْسُ', 'القَمَرُ', 'البَحْرُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-teal-400 to-cyan-600',
    accentColor: 'border-teal-400 text-teal-700 bg-teal-50'
  },
  {
    id: 'saad',
    char: 'ص',
    nameAr: 'صَاد',
    order: 14,
    soundKey: 'saad',
    mouthGuide: {
      tip: 'صوت قوي مفخم يملأ الفم مع تقريب الأسنان: صْ',
      lipPosition: 'فم ممتلئ بالهواء المفخم',
      shape: 'smile_teeth'
    },
    syllables: {
      short: [
        { id: 'sa_fatha', syl: 'صَ', vowel: 'fatha', nameAr: 'صاد بالفتحة', tip: 'صَ' },
        { id: 'sa_kasra', syl: 'صِ', vowel: 'kasra', nameAr: 'صاد بالكسرة', tip: 'صِ' },
        { id: 'sa_damma', syl: 'صُ', vowel: 'damma', nameAr: 'صاد بالضمة', tip: 'صُ' }
      ],
      long: [
        { id: 'sa_alif', syl: 'صَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'صَااا', example: 'صَابُون' },
        { id: 'sa_yaa', syl: 'صِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'صِييي', example: 'عَصِير' },
        { id: 'sa_waw', syl: 'صُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'صُووو', example: 'صُورَة' }
      ]
    },
    words: [
      { id: 'sa_w1', word: 'صَقْر', meaning: 'صقر جارح وقوي', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🦅', letters: ['ص', 'ق', 'ر'] },
      { id: 'sa_w2', word: 'صَابُون', meaning: 'صابون ينظف الأيدي', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🧼', letters: ['ص', 'ا', 'ب', 'و', 'ن'] },
      { id: 'sa_w3', word: 'عَصِير', meaning: 'عصير برتقال لذيذ', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🧃', letters: ['ع', 'ص', 'ي', 'ر'] },
      { id: 'sa_w4', word: 'قَفَص', meaning: 'قفص العصافير', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🦜', letters: ['ق', 'ف', 'ص'] }
    ],
    sentences: [
      {
        id: 'sa_s1',
        sentence: 'الصَّقْرُ يَطِيرُ عَالِيًا فِي الفَضَاءِ.',
        meaning: 'الصقر يطير عاليًا',
        emoji: '🦅☁️',
        missingWordQuestion: 'أكمل الجملة: ..... يَطِيرُ عَالِيًا.',
        options: ['الصَّقْرُ', 'السَّمَكَةُ', 'البَابُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-amber-500 to-orange-600',
    accentColor: 'border-amber-400 text-amber-700 bg-amber-50'
  },
  {
    id: 'daad',
    char: 'ض',
    nameAr: 'ضَاد',
    order: 15,
    soundKey: 'daad',
    mouthGuide: {
      tip: 'حافة اللسان تلامس الأضراس العلوية بصوت لغة الضاد المميز: ضْ',
      lipPosition: 'ضغط جانبي بحافة اللسان',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'da_fatha', syl: 'ضَ', vowel: 'fatha', nameAr: 'ضاد بالفتحة', tip: 'ضَ' },
        { id: 'da_kasra', syl: 'ضِ', vowel: 'kasra', nameAr: 'ضاد بالكسرة', tip: 'ضِ' },
        { id: 'da_damma', syl: 'ضُ', vowel: 'damma', nameAr: 'ضاد بالضمة', tip: 'ضُ' }
      ],
      long: [
        { id: 'da_alif', syl: 'ضَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'ضَااا', example: 'ضَابِط' },
        { id: 'da_yaa', syl: 'ضِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'ضِييي', example: 'رَضِيع' },
        { id: 'da_waw', syl: 'ضُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'ضُووو', example: 'وُضُوء' }
      ]
    },
    words: [
      { id: 'da_w1', word: 'ضِفْدَع', meaning: 'ضفدع يقفز على الصخور', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐸', letters: ['ض', 'ف', 'د', 'ع'] },
      { id: 'da_w2', word: 'ضَوْء', meaning: 'ضوء المصباح المنير', position: 'start', positionLabel: 'في أول الكلمة', emoji: '💡', letters: ['ض', 'و', 'ء'] },
      { id: 'da_w3', word: 'خُضَار', meaning: 'خضار طازجة ومفيدة', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🥦', letters: ['خ', 'ض', 'ا', 'ر'] },
      { id: 'da_w4', word: 'أَرْض', meaning: 'كوكب الأرض الجميل', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🌍', letters: ['أ', 'ر', 'ض'] }
    ],
    sentences: [
      {
        id: 'da_s1',
        sentence: 'الضِّفْدَعُ يَقْفِزُ فِي البِرْكَةِ المَائِيَّةِ.',
        meaning: 'الضفدع يقفز في البركة',
        emoji: '🐸💧',
        missingWordQuestion: 'أكمل الجملة: ..... يَقْفِزُ فِي البِرْكَةِ.',
        options: ['الضِّفْدَعُ', 'الكِتَابُ', 'البَابُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-emerald-500 to-green-700',
    accentColor: 'border-emerald-400 text-emerald-700 bg-emerald-50'
  },
  {
    id: 'taa_heavy',
    char: 'ط',
    nameAr: 'طَاء',
    order: 16,
    soundKey: 'taa_heavy',
    mouthGuide: {
      tip: 'طرف اللسان يلتصق بقوة بسقف الحلق مع تفخيم قوي: طْ',
      lipPosition: 'ارتفاع لمقدمة اللسان مع ملء الفم بالصوت',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'ta_fatha', syl: 'طَ', vowel: 'fatha', nameAr: 'طاء بالفتحة', tip: 'طَ' },
        { id: 'ta_kasra', syl: 'طِ', vowel: 'kasra', nameAr: 'طاء بالكسرة', tip: 'طِ' },
        { id: 'ta_damma', syl: 'طُ', vowel: 'damma', nameAr: 'طاء بالضمة', tip: 'طُ' }
      ],
      long: [
        { id: 'ta_alif', syl: 'طَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'طَااا', example: 'طَائِر' },
        { id: 'ta_yaa', syl: 'طِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'طِييي', example: 'طَبِيب' },
        { id: 'ta_waw', syl: 'طُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'طُووو', example: 'عُطُور' }
      ]
    },
    words: [
      { id: 'ta_w1', word: 'طَائِرَة', meaning: 'طائرة تحلق في السماء', position: 'start', positionLabel: 'في أول الكلمة', emoji: '✈️', letters: ['ط', 'ا', 'ئ', 'ر', 'ة'] },
      { id: 'ta_w2', word: 'طَبِيب', meaning: 'طبيب يعالج المرضى', position: 'start', positionLabel: 'في أول الكلمة', emoji: '👨‍⚕️', letters: ['ط', 'ب', 'ي', 'ب'] },
      { id: 'ta_w3', word: 'قِطَار', meaning: 'قطار يسير على السكة', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🚆', letters: ['ق', 'ط', 'ا', 'ر'] },
      { id: 'ta_w4', word: 'بَطَّة', meaning: 'بطة تسبح', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🦆', letters: ['ب', 'ط', 'ة'] }
    ],
    sentences: [
      {
        id: 'ta_s1',
        sentence: 'الطَّائِرَةُ تُحَلِّقُ فَوْقَ السَّحَابِ.',
        meaning: 'الطائرة تحلق فوق السحاب',
        emoji: '✈️☁️',
        missingWordQuestion: 'أكمل الجملة: ..... تُحَلِّقُ فَوْقَ السَّحَابِ.',
        options: ['الطَّائِرَةُ', 'السَّفِينَةُ', 'البَابُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-red-400 to-rose-600',
    accentColor: 'border-rose-400 text-rose-700 bg-rose-50'
  },
  {
    id: 'zaa_heavy',
    char: 'ظ',
    nameAr: 'ظَاء',
    order: 17,
    soundKey: 'zaa_heavy',
    mouthGuide: {
      tip: 'طرف اللسان بين الأسنان بصوت مفخم وقوي: ظْ',
      lipPosition: 'طرف اللسان بارز ومفخم',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'za_fatha', syl: 'ظَ', vowel: 'fatha', nameAr: 'ظاء بالفتحة', tip: 'ظَ' },
        { id: 'za_kasra', syl: 'ظِ', vowel: 'kasra', nameAr: 'ظاء بالكسرة', tip: 'ظِ' },
        { id: 'za_damma', syl: 'ظُ', vowel: 'damma', nameAr: 'ظاء بالضمة', tip: 'ظُ' }
      ],
      long: [
        { id: 'za_alif', syl: 'ظَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'ظَااا', example: 'ظَاهِر' },
        { id: 'za_yaa', syl: 'ظِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'ظِييي', example: 'نَظِيف' },
        { id: 'za_waw', syl: 'ظُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'ظُووو', example: 'حُظُوظ' }
      ]
    },
    words: [
      { id: 'za_w1', word: 'ظَرْف', meaning: 'ظرف رسالة جميلة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '✉️', letters: ['ظ', 'ر', 'ف'] },
      { id: 'za_w2', word: 'ظَبْي', meaning: 'ظبي رشيق وجميل', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🦌', letters: ['ظ', 'ب', 'ي'] },
      { id: 'za_w3', word: 'نَظَّارَة', meaning: 'نظارة شمسية', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🕶️', letters: ['ن', 'ظ', 'ا', 'ر', 'ة'] },
      { id: 'za_w4', word: 'حَفِظَ', meaning: 'حفظ الدرس', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🧠', letters: ['ح', 'ف', 'ظ'] }
    ],
    sentences: [
      {
        id: 'za_s1',
        sentence: 'وَضَعَ أَحْمَدُ الرِّسَالَةَ فِي الظَّرْفِ.',
        meaning: 'وضع أحمد الرسالة في الظرف',
        emoji: '✉️📝',
        missingWordQuestion: 'أكمل الجملة: وَضَعَ الرِّسَالَةَ فِي .....',
        options: ['الظَّرْفِ', 'البَحْرِ', 'البَابِ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-purple-500 to-indigo-700',
    accentColor: 'border-purple-400 text-purple-700 bg-purple-50'
  },
  {
    id: 'ayn',
    char: 'ع',
    nameAr: 'عَيْن',
    order: 18,
    soundKey: 'ayn',
    mouthGuide: {
      tip: 'صوت عميق وسلس يخرج من وسط الحلق بانسيابية: عْ',
      lipPosition: 'تراجع خفيف لوسط الحلق مع فم مسترخٍ',
      shape: 'open_throat'
    },
    syllables: {
      short: [
        { id: 'ay_fatha', syl: 'عَ', vowel: 'fatha', nameAr: 'عين بالفتحة', tip: 'عَ' },
        { id: 'ay_kasra', syl: 'عِ', vowel: 'kasra', nameAr: 'عين بالكسرة', tip: 'عِ' },
        { id: 'ay_damma', syl: 'عُ', vowel: 'damma', nameAr: 'عين بالضمة', tip: 'عُ' }
      ],
      long: [
        { id: 'ay_alif', syl: 'عَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'عَااا', example: 'عَالِم' },
        { id: 'ay_yaa', syl: 'عِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'عِييي', example: 'عِيد' },
        { id: 'ay_waw', syl: 'عُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'عُووو', example: 'عُود' }
      ]
    },
    words: [
      { id: 'ay_w1', word: 'عَيْن', meaning: 'عين نرى بها الجمال', position: 'start', positionLabel: 'في أول الكلمة', emoji: '👁️', letters: ['ع', 'ي', 'ن'] },
      { id: 'ay_w2', word: 'عَسَل', meaning: 'عسل نحل لذيذ وشفاء', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🍯', letters: ['ع', 'س', 'ل'] },
      { id: 'ay_w3', word: 'ثَعْلَب', meaning: 'ثعلب في الغابة', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🦊', letters: ['ث', 'ع', 'ل', 'ب'] },
      { id: 'ay_w4', word: 'شُمُوع', meaning: 'شموع مضيئة', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🕯️', letters: ['ش', 'م', 'و', 'ع'] }
    ],
    sentences: [
      {
        id: 'ay_s1',
        sentence: 'العَسَلُ شَرَابٌ حُلْوٌ وَمُفِيدٌ لِلصِّحَّةِ.',
        meaning: 'العسل شراب حلو ومفيد',
        emoji: '🍯🐝',
        missingWordQuestion: 'أكمل الجملة: ..... شَرَابٌ حُلْوٌ وَمُفِيدٌ.',
        options: ['العَسَلُ', 'البَابُ', 'الكِتَابُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-blue-400 to-cyan-600',
    accentColor: 'border-blue-400 text-blue-700 bg-blue-50'
  },
  {
    id: 'ghayn',
    char: 'غ',
    nameAr: 'غَيْن',
    order: 19,
    soundKey: 'ghayn',
    mouthGuide: {
      tip: 'صوت ناعم يخرج من أعلى الحلق كجريان الماء: غْ',
      lipPosition: 'فم مفتوح باسترخاء',
      shape: 'open_throat'
    },
    syllables: {
      short: [
        { id: 'gh_fatha', syl: 'غَ', vowel: 'fatha', nameAr: 'غين بالفتحة', tip: 'غَ' },
        { id: 'gh_kasra', syl: 'غِ', vowel: 'kasra', nameAr: 'غين بالكسرة', tip: 'غِ' },
        { id: 'gh_damma', syl: 'غُ', vowel: 'damma', nameAr: 'غين بالضمة', tip: 'غُ' }
      ],
      long: [
        { id: 'gh_alif', syl: 'غَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'غَااا', example: 'غَابَة' },
        { id: 'gh_yaa', syl: 'غِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'غِييي', example: 'صَغِير' },
        { id: 'gh_waw', syl: 'غُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'غُووو', example: 'غُيُوم' }
      ]
    },
    words: [
      { id: 'gh_w1', word: 'غَزَال', meaning: 'غزال سريع وجميل', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🦌', letters: ['غ', 'ز', 'ا', 'ل'] },
      { id: 'gh_w2', word: 'غَيْمَة', meaning: 'غيمة بيضاء في السماء', position: 'start', positionLabel: 'في أول الكلمة', emoji: '☁️', letters: ['غ', 'ي', 'م', 'ة'] },
      { id: 'gh_w3', word: 'مَغْنَاطِيس', meaning: 'مغناطيس يجذب الحديد', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🧲', letters: ['م', 'غ', 'ن', 'ا', 'ط', 'ي', 'س'] },
      { id: 'gh_w4', word: 'صَمْغ', meaning: 'صمغ نلصق به الأوراق', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🧴', letters: ['ص', 'م', 'غ'] }
    ],
    sentences: [
      {
        id: 'gh_s1',
        sentence: 'الغَزَالُ يَرْكُضُ بِمَرَحٍ فِي الغَابَةِ.',
        meaning: 'الغزال يركض في الغابة',
        emoji: '🦌🌲',
        missingWordQuestion: 'أكمل الجملة: ..... يَرْكُضُ بِمَرَحٍ.',
        options: ['الغَزَالُ', 'البَابُ', 'القَلَمُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-violet-400 to-purple-600',
    accentColor: 'border-violet-400 text-violet-700 bg-violet-50'
  },
  {
    id: 'faa',
    char: 'ف',
    nameAr: 'فَاء',
    order: 20,
    soundKey: 'faa',
    mouthGuide: {
      tip: 'الأسنان العلوية تلمس الشفة السفلية برفق مع نفخ الهواء: فْ',
      lipPosition: 'الأسنان فوق الشفة السفلية مع تدفق نسيم الهواء',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'f_fatha', syl: 'فَ', vowel: 'fatha', nameAr: 'فاء بالفتحة', tip: 'فَ' },
        { id: 'f_kasra', syl: 'فِ', vowel: 'kasra', nameAr: 'فاء بالكسرة', tip: 'فِ' },
        { id: 'f_damma', syl: 'فُ', vowel: 'damma', nameAr: 'فاء بالضمة', tip: 'فُ' }
      ],
      long: [
        { id: 'f_alif', syl: 'فَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'فَااا', example: 'فَارِس' },
        { id: 'f_yaa', syl: 'فِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'فِييي', example: 'فِيل' },
        { id: 'f_waw', syl: 'فُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'فُووو', example: 'فُول' }
      ]
    },
    words: [
      { id: 'f_w1', word: 'فَرَاشَة', meaning: 'فراشة رقيقة تطير فوق الزهور', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🦋', letters: ['ف', 'ر', 'ا', 'ش', 'ة'] },
      { id: 'f_w2', word: 'فِيل', meaning: 'فيل ضخم وطيب', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐘', letters: ['ف', 'ي', 'ل'] },
      { id: 'f_w3', word: 'تُفَّاح', meaning: 'تفاح أحمر لذيذ', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🍎', letters: ['ت', 'ف', 'ا', 'ح'] },
      { id: 'f_w4', word: 'خَرُوف', meaning: 'خروف لطيف', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🐑', letters: ['خ', 'ر', 'و', 'ف'] }
    ],
    sentences: [
      {
        id: 'f_s1',
        sentence: 'الفَرَاشَةُ تَرْقُصُ بَيْنَ الأَزْهَارِ المُلَوَّنَةِ.',
        meaning: 'الفراشة ترقص بين الأزهار',
        emoji: '🦋🌸',
        missingWordQuestion: 'أكمل الجملة: ..... تَرْقُصُ بَيْنَ الأَزْهَارِ.',
        options: ['الفَرَاشَةُ', 'البَابُ', 'الكِتَابُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-pink-400 to-rose-500',
    accentColor: 'border-pink-400 text-pink-700 bg-pink-50'
  },
  {
    id: 'qaaf',
    char: 'ق',
    nameAr: 'قَاف',
    order: 21,
    soundKey: 'qaaf',
    mouthGuide: {
      tip: 'أقصى اللسان من الخلف يرتفع لأقصى سقف الحلق بنبضة قوية: قْ',
      lipPosition: 'فم مفتوح ونبض حلقي قوي',
      shape: 'open_throat'
    },
    syllables: {
      short: [
        { id: 'q_fatha', syl: 'قَ', vowel: 'fatha', nameAr: 'قاف بالفتحة', tip: 'قَ' },
        { id: 'q_kasra', syl: 'قِ', vowel: 'kasra', nameAr: 'قاف بالكسرة', tip: 'قِ' },
        { id: 'q_damma', syl: 'قُ', vowel: 'damma', nameAr: 'قاف بالضمة', tip: 'قُ' }
      ],
      long: [
        { id: 'q_alif', syl: 'قَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'قَااا', example: 'قَائِد' },
        { id: 'q_yaa', syl: 'قِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'قِييي', example: 'قِطَار' },
        { id: 'q_waw', syl: 'قُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'قُووو', example: 'قُوَّة' }
      ]
    },
    words: [
      { id: 'q_w1', word: 'قَمَر', meaning: 'قمر مضيء يزين السماء', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🌙', letters: ['ق', 'م', 'ر'] },
      { id: 'q_w2', word: 'قَلَم', meaning: 'قلم نكتب ونرسم به', position: 'start', positionLabel: 'في أول الكلمة', emoji: '✏️', letters: ['ق', 'ل', 'م'] },
      { id: 'q_w3', word: 'صَقْر', meaning: 'صقر محلق', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🦅', letters: ['ص', 'ق', 'ر'] },
      { id: 'q_w4', word: 'حَدِيقَة', meaning: 'حديقة خضراء', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🏡', letters: ['ح', 'د', 'ي', 'ق', 'ة'] }
    ],
    sentences: [
      {
        id: 'q_s1',
        sentence: 'القَلَمُ أَدَاةُ العِلْمِ وَالمَعْرِفَةِ.',
        meaning: 'القلم أداة العلم',
        emoji: '✏️📚',
        missingWordQuestion: 'أكمل الجملة: ..... أَدَاةُ العِلْمِ.',
        options: ['القَلَمُ', 'البَابُ', 'البَحْرُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-yellow-500 to-amber-600',
    accentColor: 'border-yellow-400 text-yellow-700 bg-yellow-50'
  },
  {
    id: 'kaaf',
    char: 'ك',
    nameAr: 'كَاف',
    order: 22,
    soundKey: 'kaaf',
    mouthGuide: {
      tip: 'أقصى اللسان يلامس الحنك بلطف مع خروج هواء خفيف: كْ',
      lipPosition: 'فم نصف مفتوح مع همسة هواء',
      shape: 'open_throat'
    },
    syllables: {
      short: [
        { id: 'k_fatha', syl: 'كَ', vowel: 'fatha', nameAr: 'كاف بالفتحة', tip: 'كَ' },
        { id: 'k_kasra', syl: 'كِ', vowel: 'kasra', nameAr: 'كاف بالكسرة', tip: 'كِ' },
        { id: 'k_damma', syl: 'كُ', vowel: 'damma', nameAr: 'كاف بالضمة', tip: 'كُ' }
      ],
      long: [
        { id: 'k_alif', syl: 'كَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'كَااا', example: 'كَاتِب' },
        { id: 'k_yaa', syl: 'كِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'كِييي', example: 'كِيس' },
        { id: 'k_waw', syl: 'كُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'كُووو', example: 'كُوب' }
      ]
    },
    words: [
      { id: 'k_w1', word: 'كُرَة', meaning: 'كرة نلعب بها مع الأصدقاء', position: 'start', positionLabel: 'في أول الكلمة', emoji: '⚽', letters: ['ك', 'ر', 'ة'] },
      { id: 'k_w2', word: 'كِتَاب', meaning: 'كتاب مفيد', position: 'start', positionLabel: 'في أول الكلمة', emoji: '📖', letters: ['ك', 'ت', 'ا', 'ب'] },
      { id: 'k_w3', word: 'سَمَكَة', meaning: 'سمكة في الماء', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🐟', letters: ['س', 'م', 'ك', 'ة'] },
      { id: 'k_w4', word: 'دِيك', meaning: 'ديك يصيح في الفجر', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🐓', letters: ['د', 'ي', 'ك'] }
    ],
    sentences: [
      {
        id: 'k_s1',
        sentence: 'الأَطْفَالُ يَلْعَبُونَ بِالكُرَةِ فِي المَلْعَبِ.',
        meaning: 'الأطفال يلعبون بالكرة',
        emoji: '⚽👦👧',
        missingWordQuestion: 'أكمل الجملة: الأَطْفَالُ يَلْعَبُونَ بِـ .....',
        options: ['الكُرَةِ', 'البَابِ', 'الشَّمْسِ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-fuchsia-400 to-pink-500',
    accentColor: 'border-fuchsia-400 text-fuchsia-700 bg-fuchsia-50'
  },
  {
    id: 'laam',
    char: 'ل',
    nameAr: 'لاَم',
    order: 23,
    soundKey: 'laam',
    mouthGuide: {
      tip: 'ارفع مقدمة اللسان لتلامس سقف الفم العلوي برفق: لْ',
      lipPosition: 'فم مفتوح قليلًا واللسان يرتفع لأعلى الحنك',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'l_fatha', syl: 'لَ', vowel: 'fatha', nameAr: 'لام بالفتحة', tip: 'لَ' },
        { id: 'l_kasra', syl: 'لِ', vowel: 'kasra', nameAr: 'لام بالكسرة', tip: 'لِ' },
        { id: 'l_damma', syl: 'لُ', vowel: 'damma', nameAr: 'لام بالضمة', tip: 'لُ' }
      ],
      long: [
        { id: 'l_alif', syl: 'لاَ', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'لاَااا', example: 'لاعِب' },
        { id: 'l_yaa', syl: 'لِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'لِييي', example: 'لَيْمُون' },
        { id: 'l_waw', syl: 'لُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'لُووو', example: 'لُولُو' }
      ]
    },
    words: [
      { id: 'l_w1', word: 'لَيْمُون', meaning: 'ليمون أصفر ومنعش', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🍋', letters: ['ل', 'ي', 'م', 'و', 'ن'] },
      { id: 'l_w2', word: 'لُعْبَة', meaning: 'لعبة مسلية', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🧸', letters: ['ل', 'ع', 'ب', 'ة'] },
      { id: 'l_w3', word: 'قَلَم', meaning: 'قلم ملون', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '✏️', letters: ['ق', 'ل', 'م'] },
      { id: 'l_w4', word: 'جَمَل', meaning: 'جمل في الصحراء', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🐪', letters: ['ج', 'م', 'ل'] }
    ],
    sentences: [
      {
        id: 'l_s1',
        sentence: 'عَصِيرُ اللَّيْمُونِ بَارِدٌ وَلَذِيذٌ.',
        meaning: 'عصير الليمون بارد ولذيذ',
        emoji: '🍋🥤',
        missingWordQuestion: 'أكمل الجملة: عَصِيرُ ..... بَارِدٌ وَلَذِيذٌ.',
        options: ['اللَّيْمُونِ', 'البَابِ', 'الكِتَابِ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-cyan-400 to-teal-500',
    accentColor: 'border-cyan-400 text-cyan-700 bg-cyan-50'
  },
  {
    id: 'meem',
    char: 'م',
    nameAr: 'مِيم',
    order: 24,
    soundKey: 'meem',
    mouthGuide: {
      tip: 'أغلق الشفتين بلطف ودع الصوت الرنان يخرج بنعومة وغنة: مْ',
      lipPosition: 'الشفتان مغلقتان برفق وهدوء',
      shape: 'closed_lips'
    },
    syllables: {
      short: [
        { id: 'm_fatha', syl: 'مَ', vowel: 'fatha', nameAr: 'ميم بالفتحة', tip: 'مَ' },
        { id: 'm_kasra', syl: 'مِ', vowel: 'kasra', nameAr: 'ميم بالكسرة', tip: 'مِ' },
        { id: 'm_damma', syl: 'مُ', vowel: 'damma', nameAr: 'ميم بالضمة', tip: 'مُ' }
      ],
      long: [
        { id: 'm_alif', syl: 'مَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'مَااا', example: 'مَاء' },
        { id: 'm_yaa', syl: 'مِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'مِييي', example: 'أَمِير' },
        { id: 'm_waw', syl: 'مُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'مُووو', example: 'مَوْز' }
      ]
    },
    words: [
      { id: 'm_w1', word: 'مَوْز', meaning: 'موز أصفر حلو المذاق', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🍌', letters: ['م', 'و', 'ز'] },
      { id: 'm_w2', word: 'مَطَر', meaning: 'مطر يسقي الزرع', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🌧️', letters: ['م', 'ط', 'ر'] },
      { id: 'm_w3', word: 'شَمْس', meaning: 'شمس مشرقة', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '☀️', letters: ['ش', 'م', 'س'] },
      { id: 'm_w4', word: 'قَلَم', meaning: 'قلم نكتب به', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '✏️', letters: ['ق', 'ل', 'م'] }
    ],
    sentences: [
      {
        id: 'm_s1',
        sentence: 'المَوْزُ فَاكِهَةٌ لَذِيذَةٌ وَمُغَذِّيَةٌ.',
        meaning: 'الموز فاكهة لذيذة ومغذية',
        emoji: '🍌😋',
        missingWordQuestion: 'أكمل الجملة: ..... فَاكِهَةٌ لَذِيذَةٌ.',
        options: ['المَوْزُ', 'البَابُ', 'القَلَمُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-amber-400 to-orange-500',
    accentColor: 'border-orange-400 text-orange-700 bg-orange-50'
  },
  {
    id: 'noon',
    char: 'ن',
    nameAr: 'نُون',
    order: 25,
    soundKey: 'noon',
    mouthGuide: {
      tip: 'طرف اللسان يلامس سقف الحلق الأمامي مع خروج غنة جميلة: نْ',
      lipPosition: 'ابتسامة خفيفة مع رفع مقدمة اللسان',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'n_fatha', syl: 'نَ', vowel: 'fatha', nameAr: 'نون بالفتحة', tip: 'نَ' },
        { id: 'n_kasra', syl: 'نِ', vowel: 'kasra', nameAr: 'نون بالكسرة', tip: 'نِ' },
        { id: 'n_damma', syl: 'نُ', vowel: 'damma', nameAr: 'نون بالضمة', tip: 'نُ' }
      ],
      long: [
        { id: 'n_alif', syl: 'نَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'نَااا', example: 'نَار' },
        { id: 'n_yaa', syl: 'نِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'نِييي', example: 'تِين' },
        { id: 'n_waw', syl: 'نُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'نُووو', example: 'نُور' }
      ]
    },
    words: [
      { id: 'n_w1', word: 'نَجْمَة', meaning: 'نجمة تلمع في السماء', position: 'start', positionLabel: 'في أول الكلمة', emoji: '⭐', letters: ['ن', 'ج', 'م', 'ة'] },
      { id: 'n_w2', word: 'نَمْلَة', meaning: 'نملة نشيطة ومجتهدة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐜', letters: ['ن', 'م', 'ل', 'ة'] },
      { id: 'n_w3', word: 'عِنَب', meaning: 'عنب لذيذ', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🍇', letters: ['ع', 'ن', 'ب'] },
      { id: 'n_w4', word: 'عَيْن', meaning: 'عين جميلة', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '👁️', letters: ['ع', 'ي', 'ن'] }
    ],
    sentences: [
      {
        id: 'n_s1',
        sentence: 'النَّجْمَةُ تَلْمَعُ بِضِيَاءٍ جَمِيلٍ فِي الفَضَاءِ.',
        meaning: 'النجمة تلمع في الفضاء',
        emoji: '⭐🌌',
        missingWordQuestion: 'أكمل الجملة: ..... تَلْمَعُ فِي الفَضَاءِ.',
        options: ['النَّجْمَةُ', 'البَابُ', 'الخَرُوفُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-sky-400 to-blue-500',
    accentColor: 'border-sky-400 text-sky-700 bg-sky-50'
  },
  {
    id: 'haa_soft',
    char: 'هـ',
    nameAr: 'هَاء',
    order: 26,
    soundKey: 'haa_soft',
    mouthGuide: {
      tip: 'تنفس لطيف وخفيف يخرج كالهواء النقي الصافي: هْ',
      lipPosition: 'فم مفتوح براحة وهدوء تام',
      shape: 'open_throat'
    },
    syllables: {
      short: [
        { id: 'he_fatha', syl: 'هَ', vowel: 'fatha', nameAr: 'هاء بالفتحة', tip: 'هَ' },
        { id: 'he_kasra', syl: 'هِ', vowel: 'kasra', nameAr: 'هاء بالكسرة', tip: 'هِ' },
        { id: 'he_damma', syl: 'هُ', vowel: 'damma', nameAr: 'هاء بالضمة', tip: 'هُ' }
      ],
      long: [
        { id: 'he_alif', syl: 'هَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'هَااا', example: 'هَادِي' },
        { id: 'he_yaa', syl: 'هِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'هِييي', example: 'شَهِيد' },
        { id: 'he_waw', syl: 'هُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'هُووو', example: 'زُهُور' }
      ]
    },
    words: [
      { id: 'he_w1', word: 'هَدِيَّة', meaning: 'هدية جميلة في صندوق مفاجآت', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🎁', letters: ['ه', 'د', 'ي', 'ة'] },
      { id: 'he_w2', word: 'هِلال', meaning: 'هلال يظهر في أول الشهر', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🌙', letters: ['ه', 'ل', 'ا', 'ل'] },
      { id: 'he_w3', word: 'زَهْرَة', meaning: 'زهرة عطرة', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🌸', letters: ['ز', 'ه', 'ر', 'ة'] },
      { id: 'he_w4', word: 'وَجْه', meaning: 'وجه مبتسم', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '😊', letters: ['و', 'ج', 'ه'] }
    ],
    sentences: [
      {
        id: 'he_s1',
        sentence: 'فَتَحَ الطِّفْلُ الهَدِيَّةَ بِفَرَحٍ كَبِيرٍ.',
        meaning: 'فتح الطفل الهدية بفرح',
        emoji: '🎁🎉',
        missingWordQuestion: 'أكمل الجملة: فَتَحَ الطِّفْلُ ..... بِفَرَحٍ.',
        options: ['الهَدِيَّةَ', 'البَابَ', 'الشَّمْسَ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-sky-300 to-indigo-400',
    accentColor: 'border-sky-400 text-sky-700 bg-sky-50'
  },
  {
    id: 'waaw',
    char: 'و',
    nameAr: 'وَاو',
    order: 27,
    soundKey: 'waaw',
    mouthGuide: {
      tip: 'ضم الشفتين كالدائرة الجميلة إلى الأمام: وْ',
      lipPosition: 'استدارة كاملة للشفتين للأمام',
      shape: 'round_lips'
    },
    syllables: {
      short: [
        { id: 'w_fatha', syl: 'وَ', vowel: 'fatha', nameAr: 'واو بالفتحة', tip: 'وَ' },
        { id: 'w_kasra', syl: 'وِ', vowel: 'kasra', nameAr: 'واو بالكسرة', tip: 'وِ' },
        { id: 'w_damma', syl: 'وُ', vowel: 'damma', nameAr: 'واو بالضمة', tip: 'وُ' }
      ],
      long: [
        { id: 'w_alif', syl: 'وَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'وَااا', example: 'وَاحَة' },
        { id: 'w_yaa', syl: 'وِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'وِييي', example: 'طَوِيل' },
        { id: 'w_waw', syl: 'وُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'وُووو', example: 'طَاوُوس' }
      ]
    },
    words: [
      { id: 'w_w1', word: 'وَرْدَة', meaning: 'وردة حمراء جميلة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🌹', letters: ['و', 'ر', 'د', 'ة'] },
      { id: 'w_w2', word: 'وَزَّة', meaning: 'وزة بيضاء تسبح', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🪿', letters: ['و', 'ز', 'ة'] },
      { id: 'w_w3', word: 'مَوْز', meaning: 'موز لذيذ', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🍌', letters: ['م', 'و', 'ز'] },
      { id: 'w_w4', word: 'دَلْو', meaning: 'دلو نسحب به الماء', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🪣', letters: ['د', 'ل', 'و'] }
    ],
    sentences: [
      {
        id: 'w_s1',
        sentence: 'الوَرْدَةُ الحَمْرَاءُ رَائِحَتُهَا زَكِيَّةٌ.',
        meaning: 'الوردة الحمراء رائحتها زكية',
        emoji: '🌹✨',
        missingWordQuestion: 'أكمل الجملة: ..... رَائِحَتُهَا زَكِيَّةٌ.',
        options: ['الوَرْدَةُ', 'البَابُ', 'القَلَمُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-amber-400 to-orange-400',
    accentColor: 'border-amber-400 text-amber-700 bg-amber-50'
  },
  {
    id: 'yaa',
    char: 'ي',
    nameAr: 'يَاء',
    order: 28,
    soundKey: 'yaa',
    mouthGuide: {
      tip: 'وسط اللسان يرتفع مع ابتسامة عريضة لطيفة: يْ',
      lipPosition: 'ابتسامة واسعة مع رفع وسط اللسان',
      shape: 'smile_teeth'
    },
    syllables: {
      short: [
        { id: 'y_fatha', syl: 'يَ', vowel: 'fatha', nameAr: 'ياء بالفتحة', tip: 'يَ' },
        { id: 'y_kasra', syl: 'يِ', vowel: 'kasra', nameAr: 'ياء بالكسرة', tip: 'يِ' },
        { id: 'y_damma', syl: 'يُ', vowel: 'damma', nameAr: 'ياء بالضمة', tip: 'يُ' }
      ],
      long: [
        { id: 'y_alif', syl: 'يَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'يَااا', example: 'يَاسِر' },
        { id: 'y_yaa', syl: 'يِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'يِييي', example: 'يَمِين' },
        { id: 'y_waw', syl: 'يُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'يُووو', example: 'يُوسُف' }
      ]
    },
    words: [
      { id: 'y_w1', word: 'يَد', meaning: 'يد نرسم ونكتب بها', position: 'start', positionLabel: 'في أول الكلمة', emoji: '✋', letters: ['ي', 'د'] },
      { id: 'y_w2', word: 'يَمَامَة', meaning: 'يمامة بيضاء تطير بسلام', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🕊️', letters: ['ي', 'م', 'ا', 'م', 'ة'] },
      { id: 'y_w3', word: 'بَيْت', meaning: 'بيت الأمان', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🏠', letters: ['ب', 'ي', 'ت'] },
      { id: 'y_w4', word: 'شَاي', meaning: 'شاي دافئ ولذيذ', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '☕', letters: ['ش', 'ا', 'ي'] }
    ],
    sentences: [
      {
        id: 'y_s1',
        sentence: 'اليَمَامَةُ البَيْضَاءُ رَمْزُ السَّلامِ.',
        meaning: 'اليمامة البيضاء رمز السلام',
        emoji: '🕊️🌿',
        missingWordQuestion: 'أكمل الجملة: ..... رَمْزُ السَّلامِ.',
        options: ['اليَمَامَةُ', 'البَابُ', 'القَلَمُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-emerald-400 to-teal-600',
    accentColor: 'border-emerald-400 text-emerald-700 bg-emerald-50'
  }
];
