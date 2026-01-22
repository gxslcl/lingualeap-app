import { phrasesData } from '../data/phrases';
import { vocabularyData } from '../data/vocabulary';

// 控制是否执行检查函数的变量
const enableChecks: boolean = false;

// 检查phrases.ts中的单词是否都在vocabulary.ts中存在的函数
function checkMissingWords(): void {
  // 提取phrases中的所有单词
  const allPhraseWords = new Set<string>();
  
  for (const phrase of phrasesData) {
    // 提取英文句子中的单词
    const words = phrase.english
      .toLowerCase()
      .replace(/[^\w\s']/g, ' ') // 替换所有标点符号为空格，保留撇号（用于处理如don't, I'm这类词）
      .split(/\s+/) // 按空格分割
      .filter(word => word.trim().length > 0); // 移除空字符串
    
    for (const word of words) {
      allPhraseWords.add(word);
    }
  }

  // 获取词汇表中的所有单词
  const vocabularyWords = new Set<string>();
  
  for (const wordItem of vocabularyData) {
    // 添加英文单词
    if (Array.isArray(wordItem.english)) {
      wordItem.english.forEach(eng => {
        vocabularyWords.add(eng.toLowerCase());
      });
    } else if (typeof wordItem.english === 'string') {
      vocabularyWords.add(wordItem.english.toLowerCase());
    }
    
    // 同时考虑chinese字段可能包含的英文单词
    if (Array.isArray(wordItem.chinese)) {
      for (const chinese of wordItem.chinese) {
        const chineseWords = chinese
          .toLowerCase()
          .replace(/[^\w\s]/g, ' ')
          .split(/\s+/)
          .filter(word => word.trim().length > 0);
          
        chineseWords.forEach(w => vocabularyWords.add(w));
      }
    } else if (typeof wordItem.chinese === 'string') {
      const chineseWords = wordItem.chinese
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.trim().length > 0);
        
      chineseWords.forEach(w => vocabularyWords.add(w));
    }
  }

  // 找出不在词汇表中的单词
  const missingWords: string[] = [];
  
  for (const word of allPhraseWords) {
    if (!vocabularyWords.has(word)) {
      missingWords.push(word);
    }
  }

  // 打印结果到控制台
  console.log("Phrases中缺失的单词列表：");
  console.log(missingWords);
}

// 检查vocabulary.ts中的三个特定分类句子在phrases.ts中是否存在的函数
function checkMissingSentences(): void {
  // 从vocabulary.ts中提取特定分类的句子
  const communicationSentences = vocabularyData.filter(item => 
    item.category === '日常沟通常用短句' || 
    item.category === '旅行沟通常用短句' || 
    item.category === '工作沟通常用短句'
  ).map(item => item.english.toLowerCase());

  // 获取phrases.ts中的所有句子
  const phraseSentences = new Set(phrasesData.map(phrase => phrase.english.toLowerCase()));

  // 找出在vocabulary.ts中存在但在phrases.ts中缺失的句子
  const missingSentences: string[] = [];
  
  for (const sentence of communicationSentences) {
    if (!phraseSentences.has(sentence)) {
      missingSentences.push(sentence);
    }
  }

  // 打印结果到控制台
  console.log("Vocabulary中三个通信分类在phrases.ts中缺失的句子列表：");
  console.log(missingSentences);
}

// 自动执行函数
if (enableChecks) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      checkMissingWords(); // 检查单词
      checkMissingSentences(); // 检查句子
    }, 0);
  });
}

// 导出函数供其他模块使用
export { checkMissingWords, checkMissingSentences, enableChecks };