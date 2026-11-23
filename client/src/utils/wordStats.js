const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'to', 'of', 'in', 'on', 'for', 'with', 'as', 'at', 'by', 'from', 'this', 'that', 'it',
  'i', 'you', 'he', 'she', 'we', 'they', 'them', 'his', 'her', 'its', 'our', 'your', 'their',
  'not', 'no', 'so', 'if', 'then', 'than', 'do', 'does', 'did', 'have', 'has', 'had', 'will',
  'would', 'can', 'could', 'should', 'my', 'me', 'us',
]);

export function analyzeText(rawText) {
  const text = rawText || '';
  const trimmed = text.trim();

  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;

  const paragraphCount = trimmed
    ? trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
    : 0;

  const sentenceCount = trimmed
    ? (trimmed.match(/[^.!?]+[.!?]+|\S+$/g) || []).filter((s) => s.trim().length > 0).length
    : 0;

  const readingTimeMinutes = wordCount / 200;
  const speakingTimeMinutes = wordCount / 130;

  const wordFrequency = new Map();
  for (const raw of words) {
    const cleaned = raw.toLowerCase().replace(/[^a-z0-9'-]/g, '');
    if (!cleaned || STOP_WORDS.has(cleaned)) continue;
    wordFrequency.set(cleaned, (wordFrequency.get(cleaned) || 0) + 1);
  }

  const mostUsedWords = [...wordFrequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      density: wordCount > 0 ? (count / wordCount) * 100 : 0,
    }));

  return {
    wordCount,
    charCount,
    charCountNoSpaces,
    paragraphCount,
    sentenceCount,
    readingTimeMinutes,
    speakingTimeMinutes,
    mostUsedWords,
  };
}

export function formatDuration(minutes) {
  if (minutes < 1) {
    const seconds = Math.max(1, Math.round(minutes * 60));
    return `${seconds} sec`;
  }
  const whole = Math.floor(minutes);
  const seconds = Math.round((minutes - whole) * 60);
  return seconds > 0 ? `${whole} min ${seconds} sec` : `${whole} min`;
}
