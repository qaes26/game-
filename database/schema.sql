-- ==============================================================================
-- مدينة الأصوات (City of Sounds) - Database Schema
-- Compatible with PostgreSQL & Supabase
-- ==============================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS
CREATE TYPE user_role AS ENUM ('parent', 'therapist', 'admin');
CREATE TYPE mastery_status AS ENUM ('locked', 'available', 'learning', 'mastered');
CREATE TYPE letter_position AS ENUM ('start', 'middle', 'end', 'isolated');
CREATE TYPE sound_difficulty AS ENUM ('beginner', 'easy', 'medium', 'advanced');
CREATE TYPE speech_result_status AS ENUM ('high_confidence', 'acceptable', 'needs_retry', 'manual_approved');

-- 2. USERS & PROFILES
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role user_role NOT NULL DEFAULT 'parent',
    phone_number VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. THERAPIST PROFILES
CREATE TABLE therapists (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    license_number VARCHAR(100),
    clinic_name VARCHAR(200),
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. CHILDREN PROFILES
CREATE TABLE children (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    therapist_id UUID REFERENCES therapists(id) ON DELETE SET NULL,
    display_name VARCHAR(100) NOT NULL,
    age INT CHECK (age >= 3 AND age <= 15),
    hearing_impaired_mode BOOLEAN DEFAULT FALSE,
    avatar_config JSONB DEFAULT '{"skin": "default", "outfit": "adventurer", "hat": "none", "accessory": "none", "room": "green_hills"}',
    stars_count INT DEFAULT 0,
    coins_count INT DEFAULT 50,
    current_level INT DEFAULT 1,
    daily_streak INT DEFAULT 1,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. CHILD SETTINGS (Accessibility & Sound Controls)
CREATE TABLE child_settings (
    child_id UUID PRIMARY KEY REFERENCES children(id) ON DELETE CASCADE,
    sound_volume FLOAT DEFAULT 0.8,
    music_volume FLOAT DEFAULT 0.5,
    speech_rate FLOAT DEFAULT 0.85,
    visual_mode_always_on BOOLEAN DEFAULT FALSE,
    enable_mouth_mirror BOOLEAN DEFAULT TRUE,
    mic_sensitivity FLOAT DEFAULT 0.7,
    auto_advance_questions BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. EDUCATIONAL CONTENT: LETTERS
CREATE TABLE letters (
    id VARCHAR(10) PRIMARY KEY, -- e.g. 'baa', 'taa', 'jeem'
    character VARCHAR(5) NOT NULL, -- e.g. 'ب'
    name_ar VARCHAR(50) NOT NULL, -- e.g. 'باء'
    arabic_order INT NOT NULL UNIQUE,
    sound_audio_url VARCHAR(255),
    mouth_shape_guide JSONB, -- Coordinates / mouth animation shape
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. EDUCATIONAL CONTENT: SYLLABLES (Harakat & Madd)
CREATE TABLE syllables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    letter_id VARCHAR(10) REFERENCES letters(id) ON DELETE CASCADE,
    text VARCHAR(20) NOT NULL, -- e.g. 'بَ', 'بِ', 'بُ', 'با', 'بي', 'بو'
    type VARCHAR(20) NOT NULL, -- 'short_vowel', 'long_vowel', 'tanween'
    audio_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. EDUCATIONAL CONTENT: WORDS
CREATE TABLE words (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    letter_id VARCHAR(10) REFERENCES letters(id) ON DELETE CASCADE,
    word_text VARCHAR(100) NOT NULL, -- e.g. 'بَاب'
    target_letter_position letter_position NOT NULL,
    image_url VARCHAR(255),
    audio_url VARCHAR(255),
    difficulty sound_difficulty DEFAULT 'easy',
    syllables_breakdown JSONB, -- ['با', 'بٌ']
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. EDUCATIONAL CONTENT: SENTENCES
CREATE TABLE sentences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    letter_id VARCHAR(10) REFERENCES letters(id) ON DELETE CASCADE,
    sentence_text TEXT NOT NULL, -- e.g. 'هَذَا بَابُ البَيْتِ'
    image_url VARCHAR(255),
    audio_url VARCHAR(255),
    difficulty sound_difficulty DEFAULT 'medium',
    words_list JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. PROGRESS TRACKING PER LETTER & LEVEL
CREATE TABLE child_letter_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID REFERENCES children(id) ON DELETE CASCADE,
    letter_id VARCHAR(10) REFERENCES letters(id) ON DELETE CASCADE,
    recognition_rate FLOAT DEFAULT 0.0,
    sound_rate FLOAT DEFAULT 0.0,
    syllables_rate FLOAT DEFAULT 0.0,
    words_rate FLOAT DEFAULT 0.0,
    sentences_rate FLOAT DEFAULT 0.0,
    overall_mastery FLOAT DEFAULT 0.0,
    status mastery_status DEFAULT 'locked',
    unlocked_at TIMESTAMP WITH TIME ZONE,
    mastered_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(child_id, letter_id)
);

-- 11. SESSIONS & ATTEMPTS (Privacy-friendly, no raw voice recordings saved)
CREATE TABLE training_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID REFERENCES children(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL, -- 'letter_journey', 'mini_game', 'speech_gate'
    target_item_id VARCHAR(100),
    duration_seconds INT DEFAULT 0,
    stars_earned INT DEFAULT 0,
    coins_earned INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE speech_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES training_sessions(id) ON DELETE CASCADE,
    child_id UUID REFERENCES children(id) ON DELETE CASCADE,
    target_text VARCHAR(100) NOT NULL,
    recognized_text VARCHAR(100),
    confidence_score FLOAT,
    status speech_result_status NOT NULL,
    therapist_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. THERAPIST TRAINING PLANS
CREATE TABLE therapy_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    therapist_id UUID REFERENCES therapists(id) ON DELETE CASCADE,
    child_id UUID REFERENCES children(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    target_letters JSONB NOT NULL, -- ['baa', 'taa', 'meem']
    current_focus_level INT DEFAULT 1,
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. AVATAR REWARDS & SHOP ITEMS
CREATE TABLE avatar_items (
    id VARCHAR(50) PRIMARY KEY,
    name_ar VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'skin', 'hat', 'outfit', 'glasses', 'room'
    price_coins INT DEFAULT 0,
    required_stars INT DEFAULT 0,
    icon_emoji VARCHAR(20),
    is_default BOOLEAN DEFAULT FALSE
);

CREATE TABLE child_inventory (
    child_id UUID REFERENCES children(id) ON DELETE CASCADE,
    item_id VARCHAR(50) REFERENCES avatar_items(id) ON DELETE CASCADE,
    purchased_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(child_id, item_id)
);

-- INDEXES FOR FAST QUERYING
CREATE INDEX idx_child_progress ON child_letter_progress(child_id, letter_id);
CREATE INDEX idx_attempts_child ON speech_attempts(child_id);
CREATE INDEX idx_sessions_child ON training_sessions(child_id);
