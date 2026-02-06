const PROGRESS_KEY = 'monad_learn_progress';

function getAllProgress() {
  const data = localStorage.getItem(PROGRESS_KEY);
  return data ? JSON.parse(data) : {};
}

function saveAllProgress(data) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

export function getProgress(email) {
  const all = getAllProgress();
  return all[email] || {};
}

export function markLessonComplete(email, trackId, lessonSlug) {
  const all = getAllProgress();
  if (!all[email]) all[email] = {};
  if (!all[email][trackId]) all[email][trackId] = {};
  all[email][trackId][lessonSlug] = true;
  saveAllProgress(all);
}

export function getTrackProgress(email, trackId, totalLessons) {
  const progress = getProgress(email);
  const trackProgress = progress[trackId] || {};
  const completed = Object.keys(trackProgress).filter(k => trackProgress[k]).length;
  return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
}

export function isLessonComplete(email, trackId, lessonSlug) {
  const progress = getProgress(email);
  return !!(progress[trackId] && progress[trackId][lessonSlug]);
}

export function getTotalCompleted(email) {
  const progress = getProgress(email);
  let count = 0;
  for (const trackId in progress) {
    count += Object.values(progress[trackId]).filter(Boolean).length;
  }
  return count;
}

const PROFILES_KEY = 'monad_learn_profiles';

function getAllProfiles() {
  const data = localStorage.getItem(PROFILES_KEY);
  return data ? JSON.parse(data) : {};
}

export function defaultAvatar(email) {
  const seed = encodeURIComponent(email);
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`;
}

export function getProfile(email) {
  const all = getAllProfiles();
  const profile = all[email] || { displayName: '', avatar: '' };
  if (!profile.avatar) {
    profile.avatar = defaultAvatar(email);
  }
  return profile;
}

export function saveProfile(email, profile) {
  const all = getAllProfiles();
  all[email] = { ...all[email], ...profile };
  localStorage.setItem(PROFILES_KEY, JSON.stringify(all));
}

const TOTAL_LESSONS = 40;

export function getRank(completed) {
  const pct = (completed / TOTAL_LESSONS) * 100;
  if (pct >= 90) return { name: 'Grandmaster', color: '#F59E0B', bg: '#F59E0B' };
  if (pct >= 70) return { name: 'Master', color: '#A855F7', bg: '#A855F7' };
  if (pct >= 50) return { name: 'Gold', color: '#EAB308', bg: '#EAB308' };
  if (pct >= 25) return { name: 'Silver', color: '#9CA3AF', bg: '#9CA3AF' };
  if (pct >= 1)  return { name: 'Bronze', color: '#CD7F32', bg: '#CD7F32' };
  return { name: 'Unranked', color: '#4B5563', bg: '#4B5563' };
}

export function getLeaderboard() {
  const all = getAllProgress();
  const profiles = getAllProfiles();
  return Object.entries(all).map(([email, tracks]) => {
    let completed = 0;
    for (const trackId in tracks) {
      completed += Object.values(tracks[trackId]).filter(Boolean).length;
    }
    const profile = profiles[email] || {};
    const rank = getRank(completed);
    const avatar = profile.avatar || defaultAvatar(email);
    return { email, completed, displayName: profile.displayName || '', avatar, rank };
  }).sort((a, b) => b.completed - a.completed);
}

export function seedData() {
  if (localStorage.getItem('monad_learn_seeded_v4')) return;

  const classicTracks = {
    freshman: ["what-is-blockchain","intro-to-monad","setting-up-wallet","first-smart-contract","gas-and-transactions"],
    sophomore: ["solidity-deep-dive","erc20-tokens","nfts-on-monad","defi-concepts","monad-parallel-execution"],
    junior: ["advanced-solidity","building-a-dex","oracle-integration","security-and-auditing","cross-chain-communication"],
    senior: ["monad-architecture-deep-dive","high-performance-dapp-design","mev-on-monad","monad-ecosystem","capstone-project"]
  };
  const vibeTrs = {
    "vibe-starter": ["what-is-vibe-coding","prompting-for-smart-contracts","ai-tools-for-web3","deploying-with-ai","iterating-on-dapps"],
    "vibe-builder": ["vibe-coding-a-token","vibe-coding-an-nft","vibe-coding-a-dapp-frontend","debugging-with-ai","shipping-a-full-project"],
    "vibe-advanced": ["prompt-engineering-for-contracts","auditing-ai-code","complex-system-prompting","ai-testing-strategies","vibe-coding-capstone"],
    "vibe-master": ["ai-agents-on-chain","vibe-coding-defi-protocols","multi-chain-vibe-coding","production-readiness","the-future-of-vibe-coding"]
  };

  const allSlugs = [];
  for (const tid in classicTracks) for (const s of classicTracks[tid]) allSlugs.push({ trackId: tid, slug: s });
  for (const tid in vibeTrs) for (const s of vibeTrs[tid]) allSlugs.push({ trackId: tid, slug: s });

  function pickN(arr, n) {
    const copy = [...arr];
    const result = [];
    for (let i = 0; i < n && copy.length; i++) {
      const idx = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(idx, 1)[0]);
    }
    return result;
  }

  function buildProgress(lessons) {
    const prog = {};
    for (const { trackId, slug } of lessons) {
      if (!prog[trackId]) prog[trackId] = {};
      prog[trackId][slug] = true;
    }
    return prog;
  }

  const fakeUsers = [
    { email: "alex.chen@gmail.com", name: "Alex Chen", lessons: 38 },
    { email: "maria.santos@outlook.com", name: "Maria Santos", lessons: 35 },
    { email: "james.wilson@yahoo.com", name: "James Wilson", lessons: 32 },
    { email: "yuki.tanaka@gmail.com", name: "Yuki Tanaka", lessons: 30 },
    { email: "sarah.johnson@gmail.com", name: "Sarah J", lessons: 28 },
    { email: "dev.patel@proton.me", name: "Dev Patel", lessons: 26 },
    { email: "emma.larsson@gmail.com", name: "Emma L", lessons: 24 },
    { email: "omar.hassan@outlook.com", name: "Omar Hassan", lessons: 22 },
    { email: "lisa.wang@gmail.com", name: "Lisa Wang", lessons: 20 },
    { email: "marco.rossi@yahoo.com", name: "Marco Rossi", lessons: 18 },
    { email: "nina.petrov@gmail.com", name: "Nina P", lessons: 16 },
    { email: "jake.miller@proton.me", name: "Jake Miller", lessons: 14 },
    { email: "aisha.khan@gmail.com", name: "Aisha Khan", lessons: 12 },
    { email: "tom.baker@outlook.com", name: "Tom Baker", lessons: 10 },
    { email: "sofia.garcia@gmail.com", name: "Sofia Garcia", lessons: 8 },
    { email: "ryan.lee@yahoo.com", name: "Ryan Lee", lessons: 6 },
    { email: "chloe.dubois@gmail.com", name: "Chloe D", lessons: 4 },
    { email: "kevin.nguyen@proton.me", name: "Kevin N", lessons: 3 },
    { email: "anna.schmidt@gmail.com", name: "Anna Schmidt", lessons: 2 },
    { email: "ben.taylor@outlook.com", name: "Ben Taylor", lessons: 1 },
  ];

  const progress = getAllProgress();
  const profiles = getAllProfiles();

  // Seed kacieahmed with all lessons (Grandmaster rank)
  const kacieProgress = {};
  for (const { trackId, slug } of allSlugs) {
    if (!kacieProgress[trackId]) kacieProgress[trackId] = {};
    kacieProgress[trackId][slug] = true;
  }
  progress["kacieahmed@gmail.com"] = kacieProgress;
  profiles["kacieahmed@gmail.com"] = { displayName: "Kacie Ahmed", avatar: "" };

  // Seed fake users
  for (const u of fakeUsers) {
    const picked = pickN(allSlugs, u.lessons);
    progress[u.email] = buildProgress(picked);
    profiles[u.email] = { displayName: u.name, avatar: "" };
  }

  saveAllProgress(progress);
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  localStorage.setItem('monad_learn_seeded_v4', 'true');

  // Also register them in the users store so they appear
  const USERS_KEY = 'monad_learn_users';
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
  users["kacieahmed@gmail.com"] = { email: "kacieahmed@gmail.com", password: "ksa99ilh" };
  for (const u of fakeUsers) users[u.email] = { email: u.email, password: "pass1234" };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
