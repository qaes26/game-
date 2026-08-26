import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { ProjectIntroCredits } from './components/splash/ProjectIntroCredits';
import { CinematicIntroScene } from './components/3d/CinematicIntroScene';
import { CinematicOnboarding } from './components/onboarding/CinematicOnboarding';
import { ChildKingdomHub } from './components/home/ChildKingdomHub';
import { MobileStageMap } from './components/mobile/MobileStageMap';
import { MobileStagePlayer } from './components/mobile/MobileStagePlayer';
import { CleanLetterSelect } from './components/pages/CleanLetterSelect';
import { WorldMap3D } from './components/3d/WorldMap3D';
import { InteractiveTongueLab } from './components/articulation/InteractiveTongueLab';
import { MiniGamesHub } from './components/minigames/MiniGamesHub';
import { ValleyOfLettersWorld } from './components/worlds/ValleyOfLettersWorld';
import { SyllablesForestWorld } from './components/worlds/SyllablesForestWorld';
import { WordsVillageWorld } from './components/worlds/WordsVillageWorld';
import { SentencesRiverWorld } from './components/worlds/SentencesRiverWorld';
import { EchoMountainsWorld } from './components/worlds/EchoMountainsWorld';
import { SoundsCastleWorld } from './components/worlds/SoundsCastleWorld';
import { SoundsGalaxyWorld } from './components/worlds/SoundsGalaxyWorld';
import { StarRealmSpaceWorld } from './components/worlds/StarRealmSpaceWorld';

type PageRoute =
  | 'splash_intro'
  | 'intro'
  | 'onboarding'
  | 'hub'
  | 'stages'
  | 'stage_player'
  | 'letters'
  | 'worlds'
  | 'games'
  | 'mirror'
  | 'valley_of_letters'
  | 'syllables_forest'
  | 'words_village'
  | 'sentences_river'
  | 'echo_mountains'
  | 'sounds_castle'
  | 'sounds_galaxy'
  | 'star_realm';

const AppContent: React.FC = () => {
  const { selectedLetterId, setSelectedLetterId } = useGame();
  
  const [currentPage, setCurrentPage] = useState<PageRoute>('splash_intro');
  const [currentStageNumber, setCurrentStageNumber] = useState<number>(1);

  const handleSelectLetter = (letterId: string) => {
    setSelectedLetterId(letterId);
    setCurrentPage('stages');
  };

  const handleStartStage = (letterId: string, stageNum: number) => {
    setSelectedLetterId(letterId);
    setCurrentStageNumber(stageNum);
    setCurrentPage('stage_player');
  };

  const handleCompleteStageAndNext = (nextStageNum: number) => {
    setCurrentStageNumber(nextStageNum);
    setCurrentPage('stage_player');
  };

  // 0. Black Splash Intro & Credits Flow
  if (currentPage === 'splash_intro') {
    return (
      <ProjectIntroCredits
        onEnterApp={() => setCurrentPage('intro')}
      />
    );
  }

  // 1. Cinematic 3D Opening Scene
  if (currentPage === 'intro') {
    return (
      <CinematicIntroScene
        onStartJourney={() => setCurrentPage('onboarding')}
      />
    );
  }

  // 2. Child Name & 3D Avatar Onboarding
  if (currentPage === 'onboarding') {
    return (
      <CinematicOnboarding
        onComplete={() => {
          setCurrentPage('letters');
        }}
      />
    );
  }

  // 3. Main Child Kingdom Hub (Large Square Cards Navigation)
  if (currentPage === 'hub') {
    return (
      <ChildKingdomHub
        onNavigate={(section) => setCurrentPage(section)}
      />
    );
  }

  // 4. Dedicated Full-Screen Mobile Stage Player (8 Stages)
  if (currentPage === 'stage_player') {
    return (
      <MobileStagePlayer
        letterId={selectedLetterId}
        stageNumber={currentStageNumber}
        onBackToMap={() => setCurrentPage('stages')}
        onCompleteStageAndNext={handleCompleteStageAndNext}
      />
    );
  }

  // 5. Individual 8 Living World Scenes
  if (currentPage === 'valley_of_letters') {
    return (
      <ValleyOfLettersWorld
        onBack={() => setCurrentPage('worlds')}
        onSelectLetter={handleSelectLetter}
      />
    );
  }

  if (currentPage === 'syllables_forest') {
    return (
      <SyllablesForestWorld
        onBack={() => setCurrentPage('worlds')}
      />
    );
  }

  if (currentPage === 'words_village') {
    return (
      <WordsVillageWorld
        onBack={() => setCurrentPage('worlds')}
      />
    );
  }

  if (currentPage === 'sentences_river') {
    return (
      <SentencesRiverWorld
        onBack={() => setCurrentPage('worlds')}
      />
    );
  }

  if (currentPage === 'echo_mountains') {
    return (
      <EchoMountainsWorld
        onBack={() => setCurrentPage('worlds')}
      />
    );
  }

  if (currentPage === 'sounds_castle') {
    return (
      <SoundsCastleWorld
        onBack={() => setCurrentPage('worlds')}
      />
    );
  }

  if (currentPage === 'sounds_galaxy') {
    return (
      <SoundsGalaxyWorld
        onBack={() => setCurrentPage('worlds')}
      />
    );
  }

  if (currentPage === 'star_realm') {
    return (
      <StarRealmSpaceWorld
        onBack={() => setCurrentPage('worlds')}
      />
    );
  }

  // 6. Section Views (with full-screen direct Hub returns)
  return (
    <div className="relative min-h-screen bg-[#050814]">
      {currentPage === 'stages' && (
        <MobileStageMap
          onStartStage={handleStartStage}
          onOpenLetterSelect={() => setCurrentPage('letters')}
          onOpenWorlds={() => setCurrentPage('worlds')}
          onOpenGames={() => setCurrentPage('games')}
          onBackToHub={() => setCurrentPage('hub')}
        />
      )}

      {currentPage === 'letters' && (
        <CleanLetterSelect
          onSelectLetter={handleSelectLetter}
          onBackToMenu={() => setCurrentPage('hub')}
        />
      )}

      {currentPage === 'mirror' && (
        <InteractiveTongueLab
          onBack={() => setCurrentPage('hub')}
        />
      )}

      {currentPage === 'worlds' && (
        <WorldMap3D
          onSelectWorld={(worldId) => setCurrentPage(worldId as PageRoute)}
          onBackToHome={() => setCurrentPage('hub')}
        />
      )}

      {currentPage === 'games' && (
        <MiniGamesHub
          onBackToHome={() => setCurrentPage('hub')}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
