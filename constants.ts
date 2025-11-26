import { TarotCard } from './types';

// Using Trusted Tarot images which are high quality and have a consistent naming convention
const BASE_URL = "https://www.trustedtarot.com/img/cards";

const getCardImage = (name: string) => {
  // Convert "The Fool" -> "the-fool", "Ace of Wands" -> "ace-of-wands"
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  return `${BASE_URL}/${slug}.png`;
};

export const DECK: TarotCard[] = [
  // Major Arcana
  { id: 'maj-0', name: 'The Fool', nameCN: '愚者', arcana: 'Major', meaningKeywords: ['开始', '自由', '天真'], image: getCardImage('The Fool') },
  { id: 'maj-1', name: 'The Magician', nameCN: '魔术师', arcana: 'Major', meaningKeywords: ['显化', '资源', '力量'], image: getCardImage('The Magician') },
  { id: 'maj-2', name: 'The High Priestess', nameCN: '女祭司', arcana: 'Major', meaningKeywords: ['直觉', '潜意识', '神秘'], image: getCardImage('The High Priestess') },
  { id: 'maj-3', name: 'The Empress', nameCN: '皇后', arcana: 'Major', meaningKeywords: ['丰盛', '母性', '自然'], image: getCardImage('The Empress') },
  { id: 'maj-4', name: 'The Emperor', nameCN: '皇帝', arcana: 'Major', meaningKeywords: ['权威', '结构', '控制'], image: getCardImage('The Emperor') },
  { id: 'maj-5', name: 'The Hierophant', nameCN: '教皇', arcana: 'Major', meaningKeywords: ['传统', '信仰', '教导'], image: getCardImage('The Hierophant') },
  { id: 'maj-6', name: 'The Lovers', nameCN: '恋人', arcana: 'Major', meaningKeywords: ['爱', '和谐', '选择'], image: getCardImage('The Lovers') },
  { id: 'maj-7', name: 'The Chariot', nameCN: '战车', arcana: 'Major', meaningKeywords: ['意志力', '胜利', '决心'], image: getCardImage('The Chariot') },
  { id: 'maj-8', name: 'Strength', nameCN: '力量', arcana: 'Major', meaningKeywords: ['勇气', '耐心', '同情'], image: getCardImage('Strength') },
  { id: 'maj-9', name: 'The Hermit', nameCN: '隐士', arcana: 'Major', meaningKeywords: ['内省', '孤独', '指引'], image: getCardImage('The Hermit') },
  { id: 'maj-10', name: 'Wheel of Fortune', nameCN: '命运之轮', arcana: 'Major', meaningKeywords: ['周期', '命运', '改变'], image: getCardImage('Wheel of Fortune') },
  { id: 'maj-11', name: 'Justice', nameCN: '正义', arcana: 'Major', meaningKeywords: ['公平', '真理', '因果'], image: getCardImage('Justice') },
  { id: 'maj-12', name: 'The Hanged Man', nameCN: '倒吊人', arcana: 'Major', meaningKeywords: ['牺牲', '新视角', '等待'], image: getCardImage('The Hanged Man') },
  { id: 'maj-13', name: 'Death', nameCN: '死神', arcana: 'Major', meaningKeywords: ['结束', '转变', '重生'], image: getCardImage('Death') },
  { id: 'maj-14', name: 'Temperance', nameCN: '节制', arcana: 'Major', meaningKeywords: ['平衡', '适度', '耐心'], image: getCardImage('Temperance') },
  { id: 'maj-15', name: 'The Devil', nameCN: '恶魔', arcana: 'Major', meaningKeywords: ['束缚', '物质', '诱惑'], image: getCardImage('The Devil') },
  { id: 'maj-16', name: 'The Tower', nameCN: '高塔', arcana: 'Major', meaningKeywords: ['突变', '觉醒', '混乱'], image: getCardImage('The Tower') },
  { id: 'maj-17', name: 'The Star', nameCN: '星星', arcana: 'Major', meaningKeywords: ['希望', '灵感', '宁静'], image: getCardImage('The Star') },
  { id: 'maj-18', name: 'The Moon', nameCN: '月亮', arcana: 'Major', meaningKeywords: ['幻觉', '恐惧', '潜意识'], image: getCardImage('The Moon') },
  { id: 'maj-19', name: 'The Sun', nameCN: '太阳', arcana: 'Major', meaningKeywords: ['快乐', '成功', '活力'], image: getCardImage('The Sun') },
  { id: 'maj-20', name: 'Judgement', nameCN: '审判', arcana: 'Major', meaningKeywords: ['觉醒', '召唤', '宽恕'], image: getCardImage('Judgement') },
  { id: 'maj-21', name: 'The World', nameCN: '世界', arcana: 'Major', meaningKeywords: ['完成', '整合', '旅行'], image: getCardImage('The World') },
];

const SUITS = ['Wands', 'Cups', 'Swords', 'Pentacles'] as const;
const SUITS_CN = { 'Wands': '权杖', 'Cups': '圣杯', 'Swords': '宝剑', 'Pentacles': '星币' };
const NUMBERS = [
  { val: 1, name: 'Ace', nameCN: '首牌' },
  { val: 2, name: 'Two', nameCN: '二' },
  { val: 3, name: 'Three', nameCN: '三' },
  { val: 4, name: 'Four', nameCN: '四' },
  { val: 5, name: 'Five', nameCN: '五' },
  { val: 6, name: 'Six', nameCN: '六' },
  { val: 7, name: 'Seven', nameCN: '七' },
  { val: 8, name: 'Eight', nameCN: '八' },
  { val: 9, name: 'Nine', nameCN: '九' },
  { val: 10, name: 'Ten', nameCN: '十' },
  { val: 11, name: 'Page', nameCN: '侍从' },
  { val: 12, name: 'Knight', nameCN: '骑士' },
  { val: 13, name: 'Queen', nameCN: '王后' },
  { val: 14, name: 'King', nameCN: '国王' },
];

SUITS.forEach(suit => {
  NUMBERS.forEach(num => {
    const id = `${suit.toLowerCase()}-${num.val}`;
    const name = `${num.name} of ${suit}`;
    DECK.push({
      id: id,
      name: name,
      nameCN: `${SUITS_CN[suit]}${num.nameCN}`,
      arcana: 'Minor',
      suit: suit,
      number: num.val,
      meaningKeywords: ['日常', '能量', '行动'],
      image: getCardImage(name)
    });
  });
});