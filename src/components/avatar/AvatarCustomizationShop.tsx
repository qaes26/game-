import React, { useState } from 'react';
import { Sparkles, Coins, Star, Check, Lock, ArrowRight, User } from 'lucide-react';
import avatarItems from '../../data/avatar_items.json';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';

export const AvatarCustomizationShop: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { avatar, setAvatar, inventory, coins, stars, buyAvatarItem } = useGame();
  const [activeCategory, setActiveCategory] = useState<'skin' | 'hat' | 'outfit' | 'accessory' | 'room'>('outfit');

  const filteredItems = avatarItems.filter(item => item.category === activeCategory);

  const categories = [
    { id: 'outfit', label: 'المَلابِس 👕' },
    { id: 'hat', label: 'القُبَّعَات 🧢' },
    { id: 'accessory', label: 'الإِكْسِسْوَارَات 👓' },
    { id: 'skin', label: 'اللَّوْن 🌟' },
    { id: 'room', label: 'الخَلْفِيَّة 🏞️' }
  ];

  const handleEquipOrBuy = (item: typeof avatarItems[0]) => {
    const isOwned = inventory.includes(item.id);
    if (isOwned) {
      soundManager.playClick();
      setAvatar({ ...avatar, [item.category]: item.id });
    } else {
      const success = buyAvatarItem(item.id, item.price, item.stars);
      if (success) {
        setAvatar({ ...avatar, [item.category]: item.id });
      } else {
        soundManager.playEncouragement();
        soundManager.speak('تحتاج إلى المزيد من العملات أو النجوم!');
      }
    }
  };

  const selectedRoom = avatarItems.find(i => i.id === avatar.room) || avatarItems[avatarItems.length - 1];
  const selectedSkin = avatarItems.find(i => i.id === avatar.skin);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/90 p-4 rounded-3xl border-2 border-purple-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-2">
              <span>تَخْصِيصُ الشَّخْصِيَّةِ وَالمَتْجَر</span>
              <span className="text-2xl">👕</span>
            </h1>
            <p className="text-xs text-slate-500 font-bold">
              غَيِّرْ مَلابِسَ وَقُبَّعَةَ وَخَلْفِيَّةَ بَطَلِك!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 text-amber-900 px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{stars}</span>
          </div>
          <div className="bg-yellow-100 text-yellow-900 px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 fill-yellow-500 text-yellow-600" />
            <span>{coins}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Side: Avatar Live Stage Preview */}
        <div className={`game-card p-6 border-4 border-purple-300 bg-gradient-to-b ${selectedRoom?.gradient || 'from-sky-300 to-indigo-200'} flex flex-col items-center justify-center min-h-[380px] shadow-card-pop relative overflow-hidden`}>
          <span className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-slate-800">
            بَطَلُ الأَصْوَات
          </span>

          {/* Animated Hero Avatar */}
          <div className="relative w-44 h-44 flex items-center justify-center animate-float">
            {/* Base Body */}
            <div
              className="w-32 h-32 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-6xl relative"
              style={{ backgroundColor: selectedSkin?.color || '#fde047' }}
            >
              {/* Face Emoji Expression */}
              <span>🧑‍🚀</span>

              {/* Hat Overlay */}
              {avatar.hat !== 'hat_none' && (
                <div className="absolute -top-7 text-4xl">
                  {avatarItems.find(i => i.id === avatar.hat)?.emoji}
                </div>
              )}

              {/* Accessory Overlay */}
              {avatar.accessory !== 'acc_none' && (
                <div className="absolute -bottom-2 -left-2 text-3xl">
                  {avatarItems.find(i => i.id === avatar.accessory)?.emoji}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-center border-2 border-white shadow-sm">
            <h4 className="font-black text-slate-800 text-sm">
              أَنْتَ تَبْدُو رَائِعًا جِدًّا! 🌟
            </h4>
          </div>
        </div>

        {/* Right Side: Category Switcher & Shop Grid */}
        <div className="md:col-span-2 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveCategory(cat.id as any);
                }}
                className={`px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm whitespace-nowrap border-2 transition-all ${
                  activeCategory === cat.id
                    ? 'bg-purple-600 text-white border-white shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredItems.map(item => {
              const isOwned = inventory.includes(item.id);
              const isEquipped = (avatar as any)[item.category] === item.id;
              const canAfford = coins >= item.price && stars >= item.stars;

              return (
                <div
                  key={item.id}
                  onClick={() => handleEquipOrBuy(item)}
                  className={`game-card p-4 border-3 cursor-pointer flex flex-col items-center justify-between text-center min-h-[160px] transition-all ${
                    isEquipped
                      ? 'border-purple-500 bg-purple-50 shadow-md scale-105'
                      : isOwned
                      ? 'border-slate-200 bg-white hover:border-purple-300'
                      : 'border-slate-200 bg-slate-50/90 opacity-80'
                  }`}
                >
                  <span className="text-4xl my-2">{item.emoji}</span>

                  <h5 className="font-black text-slate-800 text-xs mb-1">
                    {item.nameAr}
                  </h5>

                  {/* Status / Purchase Button */}
                  {isEquipped ? (
                    <span className="bg-purple-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      مُسْتَخْدَم
                    </span>
                  ) : isOwned ? (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                      مَمْلُوك (ارْتَدِ)
                    </span>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[11px] font-black text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded-full border border-yellow-300">
                      <Coins className="w-3 h-3 fill-yellow-600 text-yellow-600" />
                      <span>{item.price}</span>
                      {item.stars > 0 && <span>⭐{item.stars}</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
