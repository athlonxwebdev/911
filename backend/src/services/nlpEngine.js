import { Intent } from '../models/Intent.js';

const normalize = (text = '') => text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

export const matchIntent = async (message) => {
  const normalizedMessage = normalize(message);
  const intents = await Intent.find({ active: true });

  let bestScore = 0;
  let bestIntent = null;

  for (const intent of intents) {
    const keywordScore = intent.keywords.reduce((score, keyword) => {
      const normalizedKeyword = normalize(keyword);
      return normalizedMessage.includes(normalizedKeyword) ? score + 2 : score;
    }, 0);

    const patternScore = intent.patterns.reduce((score, pattern) => {
      const regex = new RegExp(pattern, 'i');
      return regex.test(message) ? score + 1 : score;
    }, 0);

    const totalScore = keywordScore + patternScore;

    if (totalScore > bestScore) {
      bestScore = totalScore;
      bestIntent = intent;
    }
  }

  return bestIntent;
};
