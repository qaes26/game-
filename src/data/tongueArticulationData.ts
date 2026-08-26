// Anatomically Accurate Tongue Position Data for All 28 Arabic Letters
// Each letter maps to precise SVG coordinates for tongue shape, lip state,
// airflow direction, and articulation point — based on Arabic phonetics.

export type ArticulationPlace =
  | 'bilabial'       // شفوي ثنائي (ب، م، و)
  | 'labiodental'    // شفوي أسناني (ف)
  | 'dental'         // أسناني (ث، ذ، ظ)
  | 'alveolar'       // لثوي (ت، د، ط، ض، ن، ل، ر، ز، س، ص)
  | 'postalveolar'   // خلف لثوي (ش، ج)
  | 'palatal'        // غاري (ي)
  | 'velar'          // طبقي (ك، غ، خ)
  | 'uvular'         // لهوي (ق)
  | 'pharyngeal'     // حلقي (ح، ع)
  | 'glottal'        // حنجري (ه، ء/أ)
  | 'lateral';       // جانبي (ل)

export type LipState = 'closed' | 'open' | 'rounded' | 'spread' | 'labiodental' | 'protruded';
export type AirflowType = 'oral' | 'nasal' | 'oral_nasal';
export type VoicingState = 'voiced' | 'voiceless';

export interface TongueArticulationConfig {
  letterId: string;
  char: string;
  nameAr: string;
  place: ArticulationPlace;
  placeNameAr: string;
  // SVG path for tongue body shape (sagittal cross-section, viewBox 0 0 300 250)
  tonguePath: string;
  // Tongue tip position (cx, cy)
  tongueTipX: number;
  tongueTipY: number;
  // Tongue body peak height (how high the tongue rises)
  tongueRiseY: number;
  // Tongue back position (how far back it retracts)
  tongueBackX: number;
  tongueBackY: number;
  // Lip state
  lipState: LipState;
  // Upper lip offset (0 = normal, negative = up)
  upperLipOffset: number;
  // Lower lip offset (0 = normal, positive = down)
  lowerLipOffset: number;
  // Jaw opening (0 = closed, 1 = fully open)
  jawOpen: number;
  // Soft palate lowered (for nasal sounds)
  softPalateLowered: boolean;
  // Airflow direction
  airflow: AirflowType;
  // Voiced or voiceless
  voicing: VoicingState;
  // Vocal cords vibrating
  vocalCordsActive: boolean;
  // Epiglottis position (0 = normal, 1 = constricted)
  epiglottisConstriction: number;
  // Description of tongue movement for animation
  tipAr: string;
  // Contact point label
  contactPointAr: string;
  // Airflow path SVG
  airflowPath: string;
}

// Helper to generate tongue paths for different articulation positions
const makeTonguePath = (tipX: number, tipY: number, riseX: number, riseY: number, backX: number, backY: number): string => {
  // Tongue root is at approximately (65, 210)
  // Tongue body curves up to the rise point, then forward to the tip
  return `M 65 210 C 70 ${backY} ${backX} ${backY} ${riseX} ${riseY} C ${riseX + 20} ${riseY - 5} ${tipX - 15} ${tipY + 5} ${tipX} ${tipY} L ${tipX + 3} ${tipY + 8} C ${tipX - 10} ${tipY + 15} ${riseX + 15} ${riseY + 25} ${riseX - 5} ${riseY + 30} C ${backX - 10} ${backY + 5} 75 215 65 210 Z`;
};

export const TONGUE_ARTICULATION_DATA: TongueArticulationConfig[] = [
  // ============ 1. أَلِف (Glottal) ============
  {
    letterId: 'alif',
    char: 'ا',
    nameAr: 'أَلِف',
    place: 'glottal',
    placeNameAr: 'حَنْجَرِيّ',
    tonguePath: makeTonguePath(175, 155, 130, 145, 85, 185),
    tongueTipX: 175, tongueTipY: 155,
    tongueRiseY: 145, tongueBackX: 85, tongueBackY: 185,
    lipState: 'open', upperLipOffset: -2, lowerLipOffset: 4,
    jawOpen: 0.7, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0.3,
    tipAr: 'افتح فمك بحرية ودع الهواء يخرج من الحلق بنعومة',
    contactPointAr: 'الأحبال الصوتية',
    airflowPath: 'M 70 220 Q 110 180 160 150 Q 200 130 240 120'
  },

  // ============ 2. بَاء (Bilabial) ============
  {
    letterId: 'baa',
    char: 'ب',
    nameAr: 'بَاء',
    place: 'bilabial',
    placeNameAr: 'شَفَوِيّ',
    tonguePath: makeTonguePath(170, 160, 125, 155, 85, 190),
    tongueTipX: 170, tongueTipY: 160,
    tongueRiseY: 155, tongueBackX: 85, tongueBackY: 190,
    lipState: 'closed', upperLipOffset: 0, lowerLipOffset: 0,
    jawOpen: 0.1, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'أغلق الشفتين معاً بلطف ثم افتحهما مع الهواء: بْ!',
    contactPointAr: 'الشَّفَتَانِ مَعًا',
    airflowPath: 'M 70 220 Q 130 170 200 130 Q 230 115 250 105'
  },

  // ============ 3. تَاء (Alveolar) ============
  {
    letterId: 'taa',
    char: 'ت',
    nameAr: 'تَاء',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ',
    tonguePath: makeTonguePath(195, 108, 150, 115, 90, 185),
    tongueTipX: 195, tongueTipY: 108,
    tongueRiseY: 115, tongueBackX: 90, tongueBackY: 185,
    lipState: 'spread', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.3, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0,
    tipAr: 'ارفع طرف اللسان للثة خلف الأسنان العلوية مباشرة ثم أطلقه: تْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ عَلَى اللِّثَة',
    airflowPath: 'M 70 220 Q 130 160 190 115 Q 220 100 250 95'
  },

  // ============ 4. ثَاء (Dental) ============
  {
    letterId: 'thaa',
    char: 'ث',
    nameAr: 'ثَاء',
    place: 'dental',
    placeNameAr: 'أَسْنَانِيّ',
    tonguePath: makeTonguePath(210, 112, 160, 120, 90, 185),
    tongueTipX: 210, tongueTipY: 112,
    tongueRiseY: 120, tongueBackX: 90, tongueBackY: 185,
    lipState: 'spread', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.25, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0,
    tipAr: 'أخرج طرف اللسان قليلاً بين الأسنان ودع الهواء يمر: ثْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ بَيْنَ الأَسْنَان',
    airflowPath: 'M 70 220 Q 140 160 200 118 Q 230 105 260 100'
  },

  // ============ 5. جِيم (Postalveolar) ============
  {
    letterId: 'jeem',
    char: 'ج',
    nameAr: 'جِيم',
    place: 'postalveolar',
    placeNameAr: 'خَلْفَ لِثَوِيّ',
    tonguePath: makeTonguePath(185, 115, 145, 100, 90, 180),
    tongueTipX: 185, tongueTipY: 115,
    tongueRiseY: 100, tongueBackX: 90, tongueBackY: 180,
    lipState: 'spread', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.3, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ارفع وسط اللسان نحو سقف الحلق خلف اللثة: جْ!',
    contactPointAr: 'وَسَطُ اللِّسَانِ خَلْفَ اللِّثَة',
    airflowPath: 'M 70 220 Q 120 150 175 110 Q 210 95 250 90'
  },

  // ============ 6. حَاء (Pharyngeal) ============
  {
    letterId: 'haa',
    char: 'ح',
    nameAr: 'حَاء',
    place: 'pharyngeal',
    placeNameAr: 'حَلْقِيّ',
    tonguePath: makeTonguePath(165, 158, 120, 148, 75, 175),
    tongueTipX: 165, tongueTipY: 158,
    tongueRiseY: 148, tongueBackX: 75, tongueBackY: 175,
    lipState: 'open', upperLipOffset: -1, lowerLipOffset: 3,
    jawOpen: 0.5, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0.7,
    tipAr: 'ضيّق الحلق ودع الهواء يحتك بجدار البلعوم: حْ!',
    contactPointAr: 'جِدَارُ البَلْعُومِ (الحَلْق)',
    airflowPath: 'M 60 225 Q 75 195 85 170 Q 130 140 200 120'
  },

  // ============ 7. خَاء (Velar) ============
  {
    letterId: 'khaa',
    char: 'خ',
    nameAr: 'خَاء',
    place: 'velar',
    placeNameAr: 'طَبَقِيّ',
    tonguePath: makeTonguePath(165, 150, 115, 105, 80, 170),
    tongueTipX: 165, tongueTipY: 150,
    tongueRiseY: 105, tongueBackX: 80, tongueBackY: 170,
    lipState: 'open', upperLipOffset: -1, lowerLipOffset: 3,
    jawOpen: 0.4, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0,
    tipAr: 'ارفع مؤخرة اللسان نحو سقف الحلق الرخو: خْ!',
    contactPointAr: 'مُؤَخَّرَةُ اللِّسَانِ + الطَّبَق',
    airflowPath: 'M 70 220 Q 100 165 125 110 Q 170 90 240 100'
  },

  // ============ 8. دَال (Alveolar) ============
  {
    letterId: 'daal',
    char: 'د',
    nameAr: 'دَال',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ',
    tonguePath: makeTonguePath(195, 108, 150, 115, 90, 185),
    tongueTipX: 195, tongueTipY: 108,
    tongueRiseY: 115, tongueBackX: 90, tongueBackY: 185,
    lipState: 'spread', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.3, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ارفع طرف اللسان للثة خلف الأسنان ثم أطلقه بقوة: دْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ عَلَى اللِّثَة',
    airflowPath: 'M 70 220 Q 130 160 190 115 Q 220 100 250 95'
  },

  // ============ 9. ذَال (Dental) ============
  {
    letterId: 'zaal',
    char: 'ذ',
    nameAr: 'ذَال',
    place: 'dental',
    placeNameAr: 'أَسْنَانِيّ',
    tonguePath: makeTonguePath(210, 112, 160, 120, 90, 185),
    tongueTipX: 210, tongueTipY: 112,
    tongueRiseY: 120, tongueBackX: 90, tongueBackY: 185,
    lipState: 'spread', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.25, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'أخرج طرف اللسان بين الأسنان مع اهتزاز الأحبال: ذْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ بَيْنَ الأَسْنَان',
    airflowPath: 'M 70 220 Q 140 160 200 118 Q 230 105 260 100'
  },

  // ============ 10. رَاء (Alveolar Trill) ============
  {
    letterId: 'raa',
    char: 'ر',
    nameAr: 'رَاء',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ تَكْرَارِيّ',
    tonguePath: makeTonguePath(190, 112, 148, 118, 88, 185),
    tongueTipX: 190, tongueTipY: 112,
    tongueRiseY: 118, tongueBackX: 88, tongueBackY: 185,
    lipState: 'open', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.35, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ارفع طرف اللسان للثة ودعه يهتز بسرعة: رْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ يَهْتَزُّ عَلَى اللِّثَة',
    airflowPath: 'M 70 220 Q 130 160 185 118 Q 215 100 250 95'
  },

  // ============ 11. زَاي (Alveolar Fricative) ============
  {
    letterId: 'zay',
    char: 'ز',
    nameAr: 'زَاي',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ احْتِكَاكِيّ',
    tonguePath: makeTonguePath(195, 115, 150, 118, 90, 185),
    tongueTipX: 195, tongueTipY: 115,
    tongueRiseY: 118, tongueBackX: 90, tongueBackY: 185,
    lipState: 'spread', upperLipOffset: 0, lowerLipOffset: 1,
    jawOpen: 0.2, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ارفع طرف اللسان قرب اللثة ودع الهواء يمر مع اهتزاز: زْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ قُرْبَ اللِّثَة',
    airflowPath: 'M 70 220 Q 130 160 190 118 Q 220 105 255 98'
  },

  // ============ 12. سِين (Alveolar Fricative) ============
  {
    letterId: 'seen',
    char: 'س',
    nameAr: 'سِين',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ احْتِكَاكِيّ',
    tonguePath: makeTonguePath(195, 115, 150, 118, 90, 185),
    tongueTipX: 195, tongueTipY: 115,
    tongueRiseY: 118, tongueBackX: 90, tongueBackY: 185,
    lipState: 'spread', upperLipOffset: 0, lowerLipOffset: 1,
    jawOpen: 0.2, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0,
    tipAr: 'ارفع طرف اللسان قرب اللثة ودع الهواء يصفر: سْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ قُرْبَ اللِّثَة',
    airflowPath: 'M 70 220 Q 130 160 190 118 Q 220 105 255 98'
  },

  // ============ 13. شِين (Postalveolar) ============
  {
    letterId: 'sheen',
    char: 'ش',
    nameAr: 'شِين',
    place: 'postalveolar',
    placeNameAr: 'خَلْفَ لِثَوِيّ',
    tonguePath: makeTonguePath(180, 118, 140, 100, 88, 178),
    tongueTipX: 180, tongueTipY: 118,
    tongueRiseY: 100, tongueBackX: 88, tongueBackY: 178,
    lipState: 'protruded', upperLipOffset: 0, lowerLipOffset: 1,
    jawOpen: 0.25, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0,
    tipAr: 'ارفع وسط اللسان نحو سقف الحلق مع بروز الشفتين: شْ!',
    contactPointAr: 'وَسَطُ اللِّسَانِ خَلْفَ اللِّثَة',
    airflowPath: 'M 70 220 Q 120 150 170 108 Q 210 92 250 88'
  },

  // ============ 14. صَاد (Emphatic Alveolar) ============
  {
    letterId: 'saad',
    char: 'ص',
    nameAr: 'صَاد',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ مُفَخَّم',
    tonguePath: makeTonguePath(195, 118, 140, 110, 80, 170),
    tongueTipX: 195, tongueTipY: 118,
    tongueRiseY: 110, tongueBackX: 80, tongueBackY: 170,
    lipState: 'rounded', upperLipOffset: 0, lowerLipOffset: 1,
    jawOpen: 0.25, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0.2,
    tipAr: 'ارفع طرف اللسان للثة مع تفخيم مؤخرة اللسان: صْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ + تَفْخِيمُ المُؤَخَّرَة',
    airflowPath: 'M 70 220 Q 125 155 190 118 Q 220 105 255 98'
  },

  // ============ 15. ضَاد (Emphatic) ============
  {
    letterId: 'daad',
    char: 'ض',
    nameAr: 'ضَاد',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ مُفَخَّم',
    tonguePath: makeTonguePath(195, 110, 140, 108, 78, 168),
    tongueTipX: 195, tongueTipY: 110,
    tongueRiseY: 108, tongueBackX: 78, tongueBackY: 168,
    lipState: 'rounded', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.3, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0.2,
    tipAr: 'ارفع حافة اللسان الجانبية لسقف الحلق مع تفخيم: ضْ!',
    contactPointAr: 'حَافَةُ اللِّسَانِ الجَانِبِيَّة + التَّفْخِيم',
    airflowPath: 'M 70 220 Q 125 155 190 115 Q 220 100 255 95'
  },

  // ============ 16. طَاء (Emphatic Alveolar) ============
  {
    letterId: 'taa_heavy',
    char: 'ط',
    nameAr: 'طَاء',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ مُفَخَّم',
    tonguePath: makeTonguePath(195, 108, 138, 105, 78, 168),
    tongueTipX: 195, tongueTipY: 108,
    tongueRiseY: 105, tongueBackX: 78, tongueBackY: 168,
    lipState: 'rounded', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.3, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0.2,
    tipAr: 'ارفع طرف اللسان للثة مع تفخيم قوي في مؤخرة اللسان: طْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ + التَّفْخِيمُ القَوِيّ',
    airflowPath: 'M 70 220 Q 125 155 190 112 Q 220 98 255 92'
  },

  // ============ 17. ظَاء (Emphatic Dental) ============
  {
    letterId: 'zaa_heavy',
    char: 'ظ',
    nameAr: 'ظَاء',
    place: 'dental',
    placeNameAr: 'أَسْنَانِيّ مُفَخَّم',
    tonguePath: makeTonguePath(210, 112, 155, 115, 78, 170),
    tongueTipX: 210, tongueTipY: 112,
    tongueRiseY: 115, tongueBackX: 78, tongueBackY: 170,
    lipState: 'rounded', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.3, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0.2,
    tipAr: 'أخرج طرف اللسان بين الأسنان مع تفخيم: ظْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ بَيْنَ الأَسْنَانِ + التَّفْخِيم',
    airflowPath: 'M 70 220 Q 140 160 205 115 Q 235 105 265 100'
  },

  // ============ 18. عَيْن (Pharyngeal) ============
  {
    letterId: 'ayn',
    char: 'ع',
    nameAr: 'عَيْن',
    place: 'pharyngeal',
    placeNameAr: 'حَلْقِيّ',
    tonguePath: makeTonguePath(165, 155, 120, 145, 72, 172),
    tongueTipX: 165, tongueTipY: 155,
    tongueRiseY: 145, tongueBackX: 72, tongueBackY: 172,
    lipState: 'open', upperLipOffset: -1, lowerLipOffset: 4,
    jawOpen: 0.55, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0.75,
    tipAr: 'ضيّق الحلق بقوة ودع الأحبال الصوتية تهتز: عْ!',
    contactPointAr: 'جِدَارُ البَلْعُوم (مَعَ اهْتِزَاز)',
    airflowPath: 'M 60 225 Q 72 195 80 172 Q 120 140 200 120'
  },

  // ============ 19. غَيْن (Velar Fricative) ============
  {
    letterId: 'ghayn',
    char: 'غ',
    nameAr: 'غَيْن',
    place: 'velar',
    placeNameAr: 'طَبَقِيّ',
    tonguePath: makeTonguePath(165, 148, 115, 100, 78, 168),
    tongueTipX: 165, tongueTipY: 148,
    tongueRiseY: 100, tongueBackX: 78, tongueBackY: 168,
    lipState: 'open', upperLipOffset: -1, lowerLipOffset: 3,
    jawOpen: 0.4, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ارفع مؤخرة اللسان للطبق مع اهتزاز الأحبال: غْ!',
    contactPointAr: 'مُؤَخَّرَةُ اللِّسَانِ + الطَّبَق',
    airflowPath: 'M 70 220 Q 100 165 120 108 Q 165 88 240 100'
  },

  // ============ 20. فَاء (Labiodental) ============
  {
    letterId: 'faa',
    char: 'ف',
    nameAr: 'فَاء',
    place: 'labiodental',
    placeNameAr: 'شَفَوِيّ أَسْنَانِيّ',
    tonguePath: makeTonguePath(170, 158, 125, 152, 85, 190),
    tongueTipX: 170, tongueTipY: 158,
    tongueRiseY: 152, tongueBackX: 85, tongueBackY: 190,
    lipState: 'labiodental', upperLipOffset: 0, lowerLipOffset: 0,
    jawOpen: 0.15, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0,
    tipAr: 'ضع أسنانك العلوية على شفتك السفلية ودع الهواء يمر: فْ!',
    contactPointAr: 'الأَسْنَانُ العُلْوِيَّةُ + الشَّفَةُ السُّفْلِيَّة',
    airflowPath: 'M 70 220 Q 130 170 200 130 Q 235 118 260 110'
  },

  // ============ 21. قَاف (Uvular) ============
  {
    letterId: 'qaaf',
    char: 'ق',
    nameAr: 'قَاف',
    place: 'uvular',
    placeNameAr: 'لَهَوِيّ',
    tonguePath: makeTonguePath(165, 148, 110, 95, 75, 165),
    tongueTipX: 165, tongueTipY: 148,
    tongueRiseY: 95, tongueBackX: 75, tongueBackY: 165,
    lipState: 'open', upperLipOffset: -1, lowerLipOffset: 3,
    jawOpen: 0.4, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0,
    tipAr: 'ارفع أقصى مؤخرة اللسان نحو اللهاة: قْ!',
    contactPointAr: 'أَقْصَى مُؤَخَّرَةِ اللِّسَانِ + اللَّهَاة',
    airflowPath: 'M 70 220 Q 90 170 110 100 Q 155 80 240 98'
  },

  // ============ 22. كَاف (Velar) ============
  {
    letterId: 'kaaf',
    char: 'ك',
    nameAr: 'كَاف',
    place: 'velar',
    placeNameAr: 'طَبَقِيّ',
    tonguePath: makeTonguePath(168, 148, 118, 100, 82, 170),
    tongueTipX: 168, tongueTipY: 148,
    tongueRiseY: 100, tongueBackX: 82, tongueBackY: 170,
    lipState: 'open', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.35, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0,
    tipAr: 'ارفع مؤخرة اللسان للطبق ثم أطلقه بقوة: كْ!',
    contactPointAr: 'مُؤَخَّرَةُ اللِّسَانِ + الطَّبَق',
    airflowPath: 'M 70 220 Q 100 165 125 108 Q 170 90 240 100'
  },

  // ============ 23. لاَم (Lateral Alveolar) ============
  {
    letterId: 'laam',
    char: 'ل',
    nameAr: 'لاَم',
    place: 'lateral',
    placeNameAr: 'لِثَوِيّ جَانِبِيّ',
    tonguePath: makeTonguePath(195, 108, 150, 110, 90, 182),
    tongueTipX: 195, tongueTipY: 108,
    tongueRiseY: 110, tongueBackX: 90, tongueBackY: 182,
    lipState: 'open', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.3, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ارفع طرف اللسان للثة ودع الهواء يمر من الجانبين: لْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ عَلَى اللِّثَة (الهَوَاءُ مِنَ الجَانِبَيْن)',
    airflowPath: 'M 70 220 Q 130 160 190 112 Q 220 100 250 95'
  },

  // ============ 24. مِيم (Bilabial Nasal) ============
  {
    letterId: 'meem',
    char: 'م',
    nameAr: 'مِيم',
    place: 'bilabial',
    placeNameAr: 'شَفَوِيّ أَنْفِيّ',
    tonguePath: makeTonguePath(170, 160, 125, 155, 85, 190),
    tongueTipX: 170, tongueTipY: 160,
    tongueRiseY: 155, tongueBackX: 85, tongueBackY: 190,
    lipState: 'closed', upperLipOffset: 0, lowerLipOffset: 0,
    jawOpen: 0.1, softPalateLowered: true, airflow: 'nasal',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'أغلق الشفتين ودع الهواء يخرج من الأنف: مْ!',
    contactPointAr: 'الشَّفَتَانِ (الهَوَاءُ عَبْرَ الأَنْف)',
    airflowPath: 'M 70 220 Q 100 180 110 130 Q 115 90 130 60'
  },

  // ============ 25. نُون (Alveolar Nasal) ============
  {
    letterId: 'noon',
    char: 'ن',
    nameAr: 'نُون',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ أَنْفِيّ',
    tonguePath: makeTonguePath(195, 108, 150, 115, 90, 185),
    tongueTipX: 195, tongueTipY: 108,
    tongueRiseY: 115, tongueBackX: 90, tongueBackY: 185,
    lipState: 'open', upperLipOffset: 0, lowerLipOffset: 1,
    jawOpen: 0.2, softPalateLowered: true, airflow: 'nasal',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ارفع طرف اللسان للثة ودع الهواء يخرج من الأنف: نْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ عَلَى اللِّثَة (الهَوَاءُ مِنَ الأَنْف)',
    airflowPath: 'M 70 220 Q 120 175 140 130 Q 145 90 130 60'
  },

  // ============ 26. هَاء (Glottal) ============
  {
    letterId: 'haa_soft',
    char: 'ه',
    nameAr: 'هَاء',
    place: 'glottal',
    placeNameAr: 'حَنْجَرِيّ',
    tonguePath: makeTonguePath(170, 158, 128, 148, 85, 188),
    tongueTipX: 170, tongueTipY: 158,
    tongueRiseY: 148, tongueBackX: 85, tongueBackY: 188,
    lipState: 'open', upperLipOffset: -1, lowerLipOffset: 3,
    jawOpen: 0.5, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0.2,
    tipAr: 'ابقِ اللسان مسترخياً ودع الهواء يمر من الحنجرة: هْ!',
    contactPointAr: 'الحَنْجَرَة (بِدُونِ اهْتِزَاز)',
    airflowPath: 'M 70 225 Q 110 185 150 150 Q 200 125 240 115'
  },

  // ============ 27. وَاو (Bilabial + Velar) ============
  {
    letterId: 'waaw',
    char: 'و',
    nameAr: 'وَاو',
    place: 'bilabial',
    placeNameAr: 'شَفَوِيّ طَبَقِيّ',
    tonguePath: makeTonguePath(160, 155, 115, 115, 80, 175),
    tongueTipX: 160, tongueTipY: 155,
    tongueRiseY: 115, tongueBackX: 80, tongueBackY: 175,
    lipState: 'rounded', upperLipOffset: 0, lowerLipOffset: 0,
    jawOpen: 0.15, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ضم الشفتين بشكل دائري مع رفع مؤخرة اللسان: وْ!',
    contactPointAr: 'الشَّفَتَانِ مُدَوَّرَتَانِ + مُؤَخَّرَةُ اللِّسَان',
    airflowPath: 'M 70 220 Q 110 170 140 120 Q 190 100 240 105'
  },

  // ============ 28. يَاء (Palatal) ============
  {
    letterId: 'yaa',
    char: 'ي',
    nameAr: 'يَاء',
    place: 'palatal',
    placeNameAr: 'غَارِيّ',
    tonguePath: makeTonguePath(180, 125, 140, 95, 85, 178),
    tongueTipX: 180, tongueTipY: 125,
    tongueRiseY: 95, tongueBackX: 85, tongueBackY: 178,
    lipState: 'spread', upperLipOffset: 0, lowerLipOffset: 1,
    jawOpen: 0.2, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ارفع وسط اللسان نحو سقف الحلق الصلب مع ابتسامة: يْ!',
    contactPointAr: 'وَسَطُ اللِّسَانِ + سَقْفُ الحَلْقِ الصَّلْب',
    airflowPath: 'M 70 220 Q 115 155 150 100 Q 185 85 240 95'
  }
];

// Lookup helper
export const getTongueDataForLetter = (letterId: string): TongueArticulationConfig | undefined => {
  return TONGUE_ARTICULATION_DATA.find(d => d.letterId === letterId);
};

// Get articulation group
export const getArticulationGroup = (place: ArticulationPlace): TongueArticulationConfig[] => {
  return TONGUE_ARTICULATION_DATA.filter(d => d.place === place);
};
