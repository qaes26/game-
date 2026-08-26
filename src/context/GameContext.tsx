import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';
import { ARABIC_LETTERS } from '../data/letters';
import { audioManager } from '../audio/AudioManager';
import confetti from 'canvas-confetti';

export interface StageProgress {
  discovery: boolean;   // Stage 1
  sound: boolean;       // Stage 2
  vowels: boolean;      // Stage 3
  syllables: boolean;   // Stage 4
  words: boolean;       // Stage 5
  soundPosition: boolean; // Stage 6
  sentences: boolean;   // Stage 7
  finalChallenge: boolean; // Stage 8
  currentStage: number; // 1 to 8
  masteryPercentage: number;
}

export interface TherapistPlan {
  childName?: string;
  dailyMinutes?: number;
  focusedLetters?: string[];
  targetLetters?: string[];
  recommendedLevel?: number;
  focusLevel?: number;
  difficulty?: string;
  updatedAt?: string | number;
  notes: string;
}

export interface AttemptLog {
  id: string;
  timestamp: string;
  letter: string;
  letterId?: string;
  stageName?: string;
  target?: string;
  score: number;
  success?: boolean;
  status?: 'correct' | 'needs_practice' | 'failed' | any;
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatarEmoji?: string;
  stars: number;
  coins: number;
  streak: number;
  level: number;
  inventory: string[];
  avatar: { hat: string; glasses: string; skin: string; pet: string; room?: string; accessory?: string };
  letterProgressMap: Record<string, StageProgress>;
  therapistPlan: TherapistPlan;
  lastPlayedAt: number;
}

export interface GameContextType {
  // Active child profile data
  childName: string;
  setChildName: (name: string) => void;
  age: number;
  setAge: (age: number) => void;
  stars: number;
  coins: number;
  streak: number;
  level: number;
  trainingTimeMinutes: number;
  isVisualFirst: boolean;
  setIsVisualFirst: (active: boolean) => void;
  isVisualMode: boolean;
  setIsVisualMode: (active: boolean) => void;
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
  setVolume: (v: number) => void;
  selectedLetterId: string;
  setSelectedLetterId: (id: string) => void;
  letterProgressMap: Record<string, StageProgress>;
  updateLetterStage: (letterId: string, stageNum: number, isComplete: boolean) => void;
  addStars: (amount: number) => void;
  addCoins: (amount: number) => void;
  triggerVictoryCelebration: () => void;
  triggerCelebration: () => void;
  resetProgress: () => void;
  // Multi-Child Profile Management (Local Isolation on Same Device)
  profiles: ChildProfile[];
  activeProfileId: string;
  switchProfile: (profileId: string) => void;
  createProfile: (name: string, age?: number, avatarEmoji?: string) => string;
  deleteProfile: (profileId: string) => void;
  // Compatibility helpers
  letterProgress: Record<string, any>;
  updateLetterLevelProgress: (letterId: string, levelNum: number, score: number) => void;
  logAttempt: (letter: string, stageName: string, score: number, success: any) => void;
  attemptsLog: AttemptLog[];
  unlockLetterManually: (letterId: string) => void;
  lockLetterManually: (letterId: string) => void;
  therapistPlan: TherapistPlan;
  setTherapistPlan: (plan: TherapistPlan) => void;
  avatar: { hat: string; glasses: string; skin: string; pet: string; room?: string; accessory?: string };
  setAvatar: (a: any) => void;
  inventory: string[];
  buyAvatarItem: (itemId: string, price: number, starsRequired?: any) => boolean;
}

// Initial progress generator: all 28 letters start fresh from Stage 1 with 0% mastery
const generateInitialLetterProgress = (): Record<string, StageProgress> => {
  const map: Record<string, StageProgress> = {};
  ARABIC_LETTERS.forEach((letter) => {
    map[letter.id] = {
      discovery: false,
      sound: false,
      vowels: false,
      syllables: false,
      words: false,
      soundPosition: false,
      sentences: false,
      finalChallenge: false,
      currentStage: 1,
      masteryPercentage: 0
    };
  });
  return map;
};

const PROFILES_STORAGE_KEY = 'lumi_device_profiles_v3';
const ACTIVE_PROFILE_ID_KEY = 'lumi_active_profile_id_v3';

// Unique Device Fingerprint generator
export const getDeviceUUID = (): string => {
  if (typeof window === 'undefined') return 'server_device';
  let uuid = localStorage.getItem('lumi_device_uuid');
  if (!uuid) {
    uuid = `device_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    localStorage.setItem('lumi_device_uuid', uuid);
  }
  return uuid;
};

// Create a default initial child profile strictly starting at 0 stars and 0 coins
const createDefaultProfile = (name: string = 'البَطَل', age: number = 6, avatarEmoji: string = '👑'): ChildProfile => {
  return {
    id: `child_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name,
    age,
    avatarEmoji,
    stars: 0, // Starts clean at ZERO
    coins: 0, // Starts clean at ZERO
    streak: 0,
    level: 1,
    inventory: ['crown_gold', 'star_shades', 'space_theme', 'cape_star'],
    avatar: {
      hat: 'crown_gold',
      glasses: 'star_shades',
      skin: 'default',
      pet: 'spark_cat',
      room: 'space_theme',
      accessory: 'cape_star'
    },
    letterProgressMap: generateInitialLetterProgress(),
    therapistPlan: {
      childName: name,
      dailyMinutes: 20,
      focusedLetters: ['baa', 'alif'],
      targetLetters: ['baa', 'alif'],
      recommendedLevel: 1,
      focusLevel: 1,
      notes: 'التركيز على مخارج الشفتين والحركات الأساسية.'
    },
    lastPlayedAt: Date.now()
  };
};

// Load all device profiles starting clean with zero stars/coins and independent per device
const loadDeviceProfiles = (): { profiles: ChildProfile[]; activeId: string } => {
  if (typeof window === 'undefined') {
    const def = createDefaultProfile();
    return { profiles: [def], activeId: def.id };
  }

  try {
    getDeviceUUID(); // Ensure device uuid is registered
    const rawProfiles = localStorage.getItem(PROFILES_STORAGE_KEY);
    let profilesList: ChildProfile[] = rawProfiles ? JSON.parse(rawProfiles) : [];

    // Initialize fresh clean profile starting at 0 if none exist
    if (profilesList.length === 0) {
      const cleanProfile = createDefaultProfile('البَطَل');
      profilesList = [cleanProfile];
      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profilesList));
      localStorage.setItem(ACTIVE_PROFILE_ID_KEY, cleanProfile.id);
    }

    let activeId = localStorage.getItem(ACTIVE_PROFILE_ID_KEY) || profilesList[0].id;
    if (!profilesList.some(p => p.id === activeId)) {
      activeId = profilesList[0].id;
    }

    return { profiles: profilesList, activeId };
  } catch {
    const def = createDefaultProfile();
    return { profiles: [def], activeId: def.id };
  }
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Profiles state
  const [profiles, setProfiles] = useState<ChildProfile[]>(() => loadDeviceProfiles().profiles);
  const [activeProfileId, setActiveProfileId] = useState<string>(() => loadDeviceProfiles().activeId);

  // Active Profile Lookup
  const activeProfile = useMemo(() => {
    return profiles.find(p => p.id === activeProfileId) || profiles[0] || createDefaultProfile();
  }, [profiles, activeProfileId]);

  // App-level state
  const [selectedLetterId, setSelectedLetterId] = useState<string>('baa');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.9);
  const [isVisualFirst, setIsVisualFirstState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('cos_visual_first') === 'true';
  });
  const [attemptsLog, setAttemptsLog] = useState<AttemptLog[]>([]);

  // Ref to hold current state for exit/background flush
  const profilesRef = useRef(profiles);
  profilesRef.current = profiles;
  const activeProfileIdRef = useRef(activeProfileId);
  activeProfileIdRef.current = activeProfileId;

  // Real-time atomic save function
  const saveAllToDisk = (updatedProfiles: ChildProfile[], currentActiveId: string) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(updatedProfiles));
      localStorage.setItem(ACTIVE_PROFILE_ID_KEY, currentActiveId);
    } catch (e) {
      console.warn('[Lumi Storage Error]:', e);
    }
  };

  // Helper to update active profile atomically
  const updateActiveProfile = (updater: (prev: ChildProfile) => ChildProfile) => {
    setProfiles(prevProfiles => {
      const nextProfiles = prevProfiles.map(p => {
        if (p.id === activeProfileId) {
          const updated = updater(p);
          updated.lastPlayedAt = Date.now();
          return updated;
        }
        return p;
      });
      saveAllToDisk(nextProfiles, activeProfileId);
      return nextProfiles;
    });
  };

  // =========================================================================
  // 🌟 ZERO-LOSS LIFECYCLE HOOK: Flush to disk on exit / app switch / tab close
  // =========================================================================
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const flushOnExit = () => {
      saveAllToDisk(profilesRef.current, activeProfileIdRef.current);
    };

    // 1. App background / switch tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushOnExit();
      }
    };

    window.addEventListener('beforeunload', flushOnExit);
    window.addEventListener('pagehide', flushOnExit);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', flushOnExit);
      window.removeEventListener('pagehide', flushOnExit);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Multi-Child Profile Methods
  const switchProfile = (profileId: string) => {
    if (profiles.some(p => p.id === profileId)) {
      setActiveProfileId(profileId);
      saveAllToDisk(profiles, profileId);
      const target = profiles.find(p => p.id === profileId);
      if (target) {
        audioManager.speak(`أَهْلًا يَا ${target.name}! هَيَّا نُكْمِلُ رِحْلَتَنَا!`);
      }
    }
  };

  const createProfile = (name: string, age: number = 6, avatarEmoji: string = '👑'): string => {
    const newProfile = createDefaultProfile(name, age, avatarEmoji);
    const updatedList = [...profiles, newProfile];
    setProfiles(updatedList);
    setActiveProfileId(newProfile.id);
    saveAllToDisk(updatedList, newProfile.id);
    audioManager.speak(`مَرْحَبًا بِكَ يَا ${name} فِي مَمْلَكَةِ الأَصْوَات!`);
    return newProfile.id;
  };

  const deleteProfile = (profileId: string) => {
    if (profiles.length <= 1) return; // Keep at least one profile
    const updatedList = profiles.filter(p => p.id !== profileId);
    let nextActiveId = activeProfileId;
    if (activeProfileId === profileId) {
      nextActiveId = updatedList[0].id;
    }
    setProfiles(updatedList);
    setActiveProfileId(nextActiveId);
    saveAllToDisk(updatedList, nextActiveId);
  };

  // State Updaters targeting active child profile
  const setChildName = (name: string) => {
    updateActiveProfile(prev => ({ ...prev, name }));
  };

  const setAge = (age: number) => {
    updateActiveProfile(prev => ({ ...prev, age }));
  };

  const addStars = (amount: number) => {
    updateActiveProfile(prev => ({ ...prev, stars: prev.stars + amount }));
    audioManager.playStar();
  };

  const addCoins = (amount: number) => {
    updateActiveProfile(prev => ({ ...prev, coins: prev.coins + amount }));
    audioManager.playStar();
  };

  const setAvatar = (newAvatar: any) => {
    updateActiveProfile(prev => ({ ...prev, avatar: { ...prev.avatar, ...newAvatar } }));
  };

  const setTherapistPlan = (plan: TherapistPlan) => {
    updateActiveProfile(prev => ({ ...prev, therapistPlan: plan }));
  };

  const setIsVisualFirst = (active: boolean) => {
    setIsVisualFirstState(active);
    audioManager.setVisualFirstMode(active);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cos_visual_first', active.toString());
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      audioManager.setMute(next);
      return next;
    });
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
    audioManager.setVolume(v);
  };

  const triggerVictoryCelebration = () => {
    audioManager.playVictory();
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const updateLetterStage = (letterId: string, stageNum: number, isComplete: boolean) => {
    updateActiveProfile(prev => {
      const current = prev.letterProgressMap[letterId] || {
        discovery: false,
        sound: false,
        vowels: false,
        syllables: false,
        words: false,
        soundPosition: false,
        sentences: false,
        finalChallenge: false,
        currentStage: 1,
        masteryPercentage: 0
      };

      const updated = { ...current };
      if (stageNum === 1) updated.discovery = isComplete;
      if (stageNum === 2) updated.sound = isComplete;
      if (stageNum === 3) updated.vowels = isComplete;
      if (stageNum === 4) updated.syllables = isComplete;
      if (stageNum === 5) updated.words = isComplete;
      if (stageNum === 6) updated.soundPosition = isComplete;
      if (stageNum === 7) updated.sentences = isComplete;
      if (stageNum === 8) updated.finalChallenge = isComplete;

      if (isComplete && updated.currentStage <= stageNum) {
        updated.currentStage = Math.min(8, stageNum + 1);
      }

      const completedCount = [
        updated.discovery,
        updated.sound,
        updated.vowels,
        updated.syllables,
        updated.words,
        updated.soundPosition,
        updated.sentences,
        updated.finalChallenge
      ].filter(Boolean).length;

      updated.masteryPercentage = Math.round((completedCount / 8) * 100);

      return {
        ...prev,
        letterProgressMap: {
          ...prev.letterProgressMap,
          [letterId]: updated
        }
      };
    });
  };

  const buyAvatarItem = (itemId: string, price: number): boolean => {
    if (activeProfile.coins >= price && !activeProfile.inventory.includes(itemId)) {
      updateActiveProfile(prev => ({
        ...prev,
        coins: prev.coins - price,
        inventory: [...prev.inventory, itemId]
      }));
      audioManager.playVictory();
      return true;
    }
    return false;
  };

  const resetProgress = () => {
    updateActiveProfile(prev => ({
      ...prev,
      stars: 0,
      coins: 0,
      letterProgressMap: generateInitialLetterProgress()
    }));
  };

  const logAttempt = (letter: string, stageName: string, score: number, success: any) => {
    setAttemptsLog(prev => [
      {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString('ar-SA'),
        letter,
        letterId: letter,
        stageName,
        target: letter,
        score,
        success: success === 'correct' || success === true,
        status: typeof success === 'string' ? success : success ? 'correct' : 'needs_practice'
      },
      ...prev
    ]);
  };

  // Convert letterProgressMap to compatible letterProgress map with memoization
  const letterProgress = useMemo(() => {
    const map: Record<string, any> = {};
    ARABIC_LETTERS.forEach(l => {
      const p = activeProfile.letterProgressMap[l.id] || { currentStage: 1, masteryPercentage: 0 };
      map[l.id] = {
        isUnlocked: true,
        completedLevels: p.currentStage - 1,
        totalLevels: 8,
        stars: Math.floor(p.masteryPercentage / 20),
        accuracy: p.masteryPercentage
      };
    });
    return map;
  }, [activeProfile.letterProgressMap]);

  return (
    <GameContext.Provider
      value={{
        childName: activeProfile.name,
        setChildName,
        age: activeProfile.age,
        setAge,
        stars: activeProfile.stars,
        coins: activeProfile.coins,
        streak: activeProfile.streak,
        level: activeProfile.level,
        trainingTimeMinutes: 0,
        isVisualFirst,
        setIsVisualFirst,
        isVisualMode: isVisualFirst,
        setIsVisualMode: setIsVisualFirst,
        isMuted,
        toggleMute,
        volume,
        setVolume,
        selectedLetterId,
        setSelectedLetterId,
        letterProgressMap: activeProfile.letterProgressMap,
        updateLetterStage,
        addStars,
        addCoins,
        triggerVictoryCelebration,
        triggerCelebration: triggerVictoryCelebration,
        resetProgress,
        profiles,
        activeProfileId,
        switchProfile,
        createProfile,
        deleteProfile,
        letterProgress,
        updateLetterLevelProgress: (letterId, lvl) => updateLetterStage(letterId, lvl, true),
        logAttempt,
        attemptsLog,
        unlockLetterManually: () => {},
        lockLetterManually: () => {},
        therapistPlan: activeProfile.therapistPlan,
        setTherapistPlan,
        avatar: activeProfile.avatar,
        setAvatar,
        inventory: activeProfile.inventory,
        buyAvatarItem
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
