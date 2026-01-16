import { PhraseItem } from '../types';

export const phrasesData: PhraseItem[] = [
  // Original phrases
  {
    id: 'p1',
    english: "Could you please help me?",
    chinese: "请问你能帮我吗？",
    context: "寻求帮助",
    tags: ["日常", "礼貌"]
  },
  {
    id: 'p2',
    english: "I would like to order, please.",
    chinese: "我想点餐。",
    context: "餐厅",
    tags: ["用餐", "旅行"]
  },
  {
    id: 'p3',
    english: "How much does this cost?",
    chinese: "这个多少钱？",
    context: "购物",
    tags: ["购物", "旅行"]
  },
  {
    id: 'p4',
    english: "Where is the nearest subway station?",
    chinese: "最近的地铁站在哪里？",
    context: "导航",
    tags: ["旅行", "交通"]
  },
  {
    id: 'p5',
    english: "Nice to meet you.",
    chinese: "很高兴见到你。",
    context: "介绍",
    tags: ["社交", "日常"]
  },
  {
    id: 'p6',
    english: "What time is check-out?",
    chinese: "退房时间是几点？",
    context: "酒店",
    tags: ["旅行", "住宿"]
  },
  {
    id: 'p7',
    english: "I'm feeling a bit under the weather.",
    chinese: "我感觉有点不舒服。",
    context: "健康",
    tags: ["健康", "习语"]
  },
  {
    id: 'p8',
    english: "Could you speak a little slower?",
    chinese: "你能说慢一点吗？",
    context: "沟通",
    tags: ["日常", "学习"]
  },
  // Expanded phrases (Batch 1)
  {
    id: 'pn9',
    english: "I have been studying English for two years.",
    chinese: "我学英语已经两年了。",
    context: "学习经历",
    tags: ["语法", "现在完成进行时"]
  },
  {
    id: 'pn10',
    english: "She is reading a book now.",
    chinese: "她现在正在看书。",
    context: "现在动作",
    tags: ["语法", "现在进行时"]
  },
  {
    id: 'pn11',
    english: "They went to the park yesterday.",
    chinese: "他们昨天去了公园。",
    context: "过去事件",
    tags: ["语法", "一般过去时"]
  },
  {
    id: 'pn12',
    english: "He will call you tomorrow.",
    chinese: "他明天会给你打电话。",
    context: "未来计划",
    tags: ["语法", "一般将来时"]
  },
  {
    id: 'pn13',
    english: "We have finished our homework.",
    chinese: "我们已经完成了作业。",
    context: "已完成的动作",
    tags: ["语法", "现在完成时"]
  },
  {
    id: 'pn14',
    english: "I was watching TV when she called.",
    chinese: "她打电话来的时候我正在看电视。",
    context: "同时发生的动作",
    tags: ["语法", "过去进行时"]
  },
  {
    id: 'pn15',
    english: "If it rains, we will stay indoors.",
    chinese: "如果下雨，我们就待在室内。",
    context: "假设条件",
    tags: ["语法", "条件句"]
  },
  {
    id: 'pn16',
    english: "The book was written by Mark Twain.",
    chinese: "这本书是由马克·吐温写的。",
    context: "被动语态",
    tags: ["语法", "被动语态"]
  },
  {
    id: 'pn17',
    english: "I haven't seen him since last week.",
    chinese: "从上周开始我就再也没见过他。",
    context: "时间段",
    tags: ["语法", "现在完成时"]
  },
  {
    id: 'pn18',
    english: "By the time we arrived, the movie had started.",
    chinese: "我们到达时电影已经开始很久了。",
    context: "过去的过去",
    tags: ["语法", "过去完成时"]
  },
  {
    id: 'pn19',
    english: "She speaks English fluently.",
    chinese: "她说英语很流利。",
    context: "能力描述",
    tags: ["语法", "副词用法"]
  },
  {
    id: 'pn20',
    english: "This is the best movie I have ever seen.",
    chinese: "这是我见过的最好的电影。",
    context: "比较级和最高级",
    tags: ["语法", "形容词"]
  },
  {
    id: 'pn21',
    english: "Although it was raining, we went out.",
    chinese: "虽然在下雨，我们还是出去了。",
    context: "让步状语从句",
    tags: ["语法", "连接词"]
  },
  {
    id: 'pn22',
    english: "I bought a new car, which is very expensive.",
    chinese: "我买了一辆新车，它很贵。",
    context: "非限制性定语从句",
    tags: ["语法", "定语从句"]
  },
  {
    id: 'pn23',
    english: "Either you or he is responsible for this.",
    chinese: "要么你，要么他对此负责。",
    context: "选择关系",
    tags: ["语法", "主谓一致"]
  },
  {
    id: 'pn24',
    english: "Not only did he apologize, but he also offered to help.",
    chinese: "他不仅道了歉，还主动提出帮忙。",
    context: "递进关系",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'pn25',
    english: "I wish I were taller.",
    chinese: "我希望我能高一点。",
    context: "虚拟语气",
    tags: ["语法", "虚拟语气"]
  },
  {
    id: 'pn26',
    english: "It's time we went home.",
    chinese: "是我们该回家的时间了。",
    context: "虚拟语气",
    tags: ["语法", "虚拟语气"]
  },
  {
    id: 'pn27',
    english: "Hardly had I entered the room when the phone rang.",
    chinese: "我刚进房间电话就响了。",
    context: "时间状语从句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'pn28',
    english: "I prefer tea to coffee.",
    chinese: "比起咖啡我更喜欢茶。",
    context: "偏好表达",
    tags: ["语法", "比较结构"]
  },
  {
    id: 'pn29',
    english: "The meeting was postponed due to bad weather.",
    chinese: "由于天气不好，会议被推迟了。",
    context: "原因说明",
    tags: ["语法", "介词短语"]
  },
  {
    id: 'pn30',
    english: "So tired was he that he fell asleep immediately.",
    chinese: "他太累了，一坐下就睡着了。",
    context: "结果状语从句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'pn31',
    english: "I wonder whether he will come or not.",
    chinese: "我想知道他是否会来。",
    context: "宾语从句",
    tags: ["语法", "名词性从句"]
  },
  {
    id: 'pn32',
    english: "That is where we first met.",
    chinese: "那就是我们第一次见面的地方。",
    context: "表语从句",
    tags: ["语法", "名词性从句"]
  },
  {
    id: 'pn33',
    english: "Whatever you do, don't touch that button.",
    chinese: "无论你做什么，都不要碰那个按钮。",
    context: "让步状语从句",
    tags: ["语法", "连接词"]
  },
  {
    id: 'pn34',
    english: "He acted as if he knew everything.",
    chinese: "他表现得好像什么都知道似的。",
    context: "方式状语从句",
    tags: ["语法", "连接词"]
  },
  {
    id: 'pn35',
    english: "No sooner had she left than he arrived.",
    chinese: "她刚走他就到了。",
    context: "时间状语从句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'pn36',
    english: "John, who is my neighbor, is a teacher.",
    chinese: "约翰，我的邻居，是个老师。",
    context: "非限制性定语从句",
    tags: ["语法", "定语从句"]
  },
  {
    id: 'pn37',
    english: "It is important that you be present.",
    chinese: "你出席是很重要的。",
    context: "主语从句",
    tags: ["语法", "虚拟语气"]
  },
  {
    id: 'pn38',
    english: "Scarcely had we begun when it started to rain.",
    chinese: "我们刚开始下雨了。",
    context: "时间状语从句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'pn39',
    english: "I don't doubt that he is honest.",
    chinese: "我不怀疑他是诚实的。",
    context: "宾语从句",
    tags: ["语法", "名词性从句"]
  },
  {
    id: 'pn40',
    english: "The reason why he failed is unclear.",
    chinese: "他失败的原因不清楚。",
    context: "定语从句",
    tags: ["语法", "定语从句"]
  },
  {
    id: 'pn41',
    english: "Hardly anyone believes what he says.",
    chinese: "几乎没有人相信他说的话。",
    context: "宾语从句",
    tags: ["语法", "代词用法"]
  },
  {
    id: 'pn42',
    english: "Such was his anger that he couldn't speak.",
    chinese: "他如此愤怒以至于说不出话来。",
    context: "结果状语从句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'pn43',
    english: "Only after the meeting was over could I leave.",
    chinese: "只有在会议结束后我才离开。",
    context: "条件状语从句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'pn44',
    english: "Never have I seen such a beautiful sunset.",
    chinese: "我从未见过如此美丽的日落。",
    context: "否定词前置",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'pn45',
    english: "Little did he realize the danger he was in.",
    chinese: "他几乎没有意识到自己所处的危险。",
    context: "否定词前置",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'pn46',
    english: "Here comes the bus.",
    chinese: "公交车来了。",
    context: "地点状语前置",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'pn47',
    english: "There goes my chance.",
    chinese: "我的机会没了。",
    context: "存在句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'pn48',
    english: "So fast did he run that he won the race.",
    chinese: "他跑得如此之快以至于赢得了比赛。",
    context: "程度状语从句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'pn49',
    english: "Had I known earlier, I would have helped.",
    chinese: "如果我早点知道，我会帮忙的。",
    context: "虚拟语气",
    tags: ["语法", "虚拟语气"]
  },
  {
    id: 'pn50',
    english: "Were he here, he would agree with us.",
    chinese: "如果他在这里，他会同意我们的观点。",
    context: "虚拟语气",
    tags: ["语法", "虚拟语气"]
  },
  {
    id: 'pn51',
    english: "Should you need anything, just ask.",
    chinese: "如果你需要任何东西，尽管问。",
    context: "条件状语从句",
    tags: ["语法", "虚拟语气"]
  },
  {
    id: 'pn52',
    english: "I have never seen such a mess.",
    chinese: "我从未见过这么乱的情况。",
    context: "程度副词",
    tags: ["语法", "副词用法"]
  },
  {
    id: 'pn53',
    english: "He plays tennis better than I do.",
    chinese: "他打网球比我好。",
    context: "比较结构",
    tags: ["语法", "比较级"]
  },
  {
    id: 'pn54',
    english: "The faster you drive, the more dangerous it becomes.",
    chinese: "你开车越快，就越危险。",
    context: "比较结构",
    tags: ["语法", "比较级"]
  },
  {
    id: 'pn55',
    english: "I consider him to be honest.",
    chinese: "我认为他是诚实的。",
    context: "宾语补足语",
    tags: ["语法", "不定式"]
  },
  {
    id: 'pn56',
    english: "I saw her crossing the street.",
    chinese: "我看见她正穿过街道。",
    context: "感官动词",
    tags: ["语法", "分词"]
  },
  {
    id: 'pn57',
    english: "Having finished his work, he went home.",
    chinese: "完成工作后，他回家了。",
    context: "时间状语",
    tags: ["语法", "分词"]
  },
  {
    id: 'pn58',
    english: "To err is human; to forgive, divine.",
    chinese: "犯错是人之常情；宽恕乃神圣之举。",
    context: "不定式做主语",
    tags: ["语法", "不定式"]
  },
  {
    id: 'pn59',
    english: "I regret to inform you that...",
    chinese: "我很遗憾地通知您...",
    context: "不定式做宾语",
    tags: ["语法", "不定式"]
  },
  {
    id: 'pn60',
    english: "He is believed to be the best candidate.",
    chinese: "据信他是最佳候选人。",
    context: "被动语态+不定式",
    tags: ["语法", "不定式"]
  },
  {
    id: 'p9',
    english: "What do you do for a living?",
    chinese: "你是做什么工作的？",
    context: "社交",
    tags: ["日常", "对话"]
  },
  {
    id: 'p10',
    english: "Can I have the bill, please?",
    chinese: "请结账。",
    context: "餐厅",
    tags: ["用餐", "旅行"]
  },
  {
    id: 'p11',
    english: "I'm sorry, I didn't catch that.",
    chinese: "抱歉，我没听清。",
    context: "沟通",
    tags: ["日常", "学习"]
  },
  {
    id: 'p12',
    english: "Do you have any recommendations?",
    chinese: "你有什么推荐吗？",
    context: "通用",
    tags: ["用餐", "购物"]
  },
  {
    id: 'p13',
    english: "Is there a pharmacy nearby?",
    chinese: "附近有药店吗？",
    context: "健康",
    tags: ["旅行", "紧急"]
  },
  {
    id: 'p14',
    english: "I'm looking forward to it.",
    chinese: "我很期待。",
    context: "社交",
    tags: ["日常", "情绪"]
  },
  {
    id: 'p15',
    english: "Let's call it a day.",
    chinese: "今天就到这里吧（收工）。",
    context: "工作",
    tags: ["商务", "习语"]
  },
  {
    id: 'p16',
    english: "Could you take a photo for us?",
    chinese: "能帮我们要张照吗？",
    context: "旅行",
    tags: ["社交", "旅游"]
  },
  {
    id: 'p17',
    english: "I'm just browsing, thanks.",
    chinese: "我只是随便看看，谢谢。",
    context: "购物",
    tags: ["日常", "礼貌"]
  },
  {
    id: 'p18',
    english: "What's the Wi-Fi password?",
    chinese: "Wi-Fi密码是多少？",
    context: "通用",
    tags: ["旅行", "日常"]
  },
  {
    id: 'p19',
    english: "It's not my cup of tea.",
    chinese: "这不是我喜欢的类型。",
    context: "社交",
    tags: ["习语", "偏好"]
  },
  {
    id: 'p20',
    english: "Can I try this on?",
    chinese: "我可以试穿这个吗？",
    context: "购物",
    tags: ["购物", "服装"]
  },
  {
    id: 'p21',
    english: "Long time no see.",
    chinese: "好久不见。",
    context: "社交",
    tags: ["问候", "日常"]
  },
  {
    id: 'p22',
    english: "Keep up the good work!",
    chinese: "继续保持！/ 干得好！",
    context: "工作",
    tags: ["鼓励", "商务"]
  },
  {
    id: 'p23',
    english: "I'm running late.",
    chinese: "我要迟到了。",
    context: "通用",
    tags: ["时间", "日常"]
  },
  {
    id: 'p24',
    english: "It's up to you.",
    chinese: "由你决定。",
    context: "决策",
    tags: ["日常", "社交"]
  },
  {
    id: 'p25',
    english: "Do you take credit cards?",
    chinese: "可以刷信用卡吗？",
    context: "支付",
    tags: ["购物", "用餐"]
  },
  {
    id: 'p26',
    english: "Could you give me a hand?",
    chinese: "能搭把手吗？",
    context: "寻求帮助",
    tags: ["日常", "习语"]
  },
  {
    id: 'p27',
    english: "What seems to be the problem?",
    chinese: "出什么问题了？",
    context: "解决问题",
    tags: ["工作", "日常"]
  },
  {
    id: 'p28',
    english: "I'm allergic to peanuts.",
    chinese: "我对花生过敏。",
    context: "用餐",
    tags: ["健康", "安全"]
  },
  {
    id: 'p29',
    english: "Is this seat taken?",
    chinese: "这有人坐吗？",
    context: "公共场所",
    tags: ["社交", "礼貌"]
  },
  {
    id: 'p30',
    english: "Have a safe trip!",
    chinese: "旅途平安！",
    context: "道别",
    tags: ["旅行", "社交"]
  },
  {
    id: 'p31',
    english: "I totally agree with you.",
    chinese: "我完全同意你。",
    context: "对话",
    tags: ["观点", "日常"]
  },
  {
    id: 'p32',
    english: "Let me get back to you on that.",
    chinese: "我稍后回复你。",
    context: "工作",
    tags: ["商务", "沟通"]
  },
  {
    id: 'p33',
    english: "Don't take it to heart.",
    chinese: "别往心里去。",
    context: "安慰",
    tags: ["社交", "情绪"]
  },
  {
    id: 'p34',
    english: "It's a piece of cake.",
    chinese: "小菜一碟。",
    context: "通用",
    tags: ["习语", "日常"]
  },
  {
    id: 'p35',
    english: "Where can I exchange money?",
    chinese: "哪里可以兑换货币？",
    context: "旅行",
    tags: ["金钱", "服务"]
  },
  {
    id: 'p36',
    english: "I'd like to make a reservation.",
    chinese: "我想预订。",
    context: "服务",
    tags: ["用餐", "酒店"]
  },
  {
    id: 'p37',
    english: "What's the weather like today?",
    chinese: "今天天气怎么样？",
    context: "闲聊",
    tags: ["日常", "天气"]
  },
  {
    id: 'p38',
    english: "Could you repeat that, please?",
    chinese: "请再重复一遍好吗？",
    context: "沟通",
    tags: ["学习", "礼貌"]
  },
  {
    id: 'p39',
    english: "I'm on my way.",
    chinese: "我在路上了。",
    context: "通用",
    tags: ["时间", "日常"]
  },
  {
    id: 'p40',
    english: "No worries.",
    chinese: "没事/别担心。",
    context: "社交",
    tags: ["日常", "随性"]
  },
  {
    id: 'p41',
    english: "How do I get to the airport?",
    chinese: "去机场怎么走？",
    context: "导航",
    tags: ["旅行", "交通"]
  },
  {
    id: 'p42',
    english: "Are you free this weekend?",
    chinese: "这周末有空吗？",
    context: "社交",
    tags: ["邀请", "日常"]
  },
  {
    id: 'p43',
    english: "It costs an arm and a leg.",
    chinese: "这东西非常贵。",
    context: "购物",
    tags: ["习语", "金钱"]
  },
  {
    id: 'p44',
    english: "I'll have the same.",
    chinese: "我要一份一样的。",
    context: "用餐",
    tags: ["点餐", "社交"]
  },
  {
    id: 'p45',
    english: "Do you have a map?",
    chinese: "你有地图吗？",
    context: "旅行",
    tags: ["导航", "工具"]
  },
  {
    id: 'p46',
    english: "I'm lost.",
    chinese: "我迷路了。",
    context: "紧急情况",
    tags: ["旅行", "帮助"]
  },
  {
    id: 'p47',
    english: "What's your phone number?",
    chinese: "你的电话号码是多少？",
    context: "联系",
    tags: ["社交", "沟通"]
  },
  {
    id: 'p48',
    english: "Never mind.",
    chinese: "算了/没关系。",
    context: "通用",
    tags: ["日常", "随性"]
  },
  {
    id: 'p49',
    english: "Hang on a second.",
    chinese: "稍等一下。",
    context: "通用",
    tags: ["时间", "日常"]
  },
  {
    id: 'p50',
    english: "I'm exhausted.",
    chinese: "我筋疲力尽了。",
    context: "健康",
    tags: ["情绪", "日常"]
  },
  {
    id: 'p51',
    english: "Break a leg!",
    chinese: "祝你好运！",
    context: "鼓励",
    tags: ["习语", "表现"]
  },
  {
    id: 'p52',
    english: "Can I get a to-go box?",
    chinese: "可以给我一个打包盒吗？",
    context: "用餐",
    tags: ["服务", "日常"]
  },
  {
    id: 'p53',
    english: "I have a reservation under Smith.",
    chinese: "我预订了，名字是Smith。",
    context: "服务",
    tags: ["用餐", "酒店"]
  },
  {
    id: 'p54',
    english: "What do you recommend?",
    chinese: "你有什么推荐？",
    context: "通用",
    tags: ["观点", "日常"]
  },
  {
    id: 'p55',
    english: "It slipped my mind.",
    chinese: "我给忘了。",
    context: "记忆",
    tags: ["习语", "借口"]
  },
  {
    id: 'p56',
    english: "Let's keep in touch.",
    chinese: "保持联系。",
    context: "道别",
    tags: ["社交", "日常"]
  },
  {
    id: 'p57',
    english: "I'm full.",
    chinese: "我吃饱了。",
    context: "用餐",
    tags: ["日常", "健康"]
  },
  {
    id: 'p58',
    english: "Cheers!",
    chinese: "干杯！/ 谢谢（英式）",
    context: "社交",
    tags: ["用餐", "文化"]
  },
  {
    id: 'p59',
    english: "Could you lower the volume?",
    chinese: "能把声音调小点吗？",
    context: "环境",
    tags: ["礼貌", "日常"]
  },
  {
    id: 'p60',
    english: "I'm broke.",
    chinese: "我没钱了。",
    context: "财务",
    tags: ["俚语", "日常"]
  },
  {
    id: 'p61',
    english: "Better late than never.",
    chinese: "迟做总比不做好。",
    context: "谚语",
    tags: ["智慧", "日常"]
  },
  {
    id: 'p62',
    english: "I'm not feeling well.",
    chinese: "我不太舒服。",
    context: "健康",
    tags: ["日常", "医疗"]
  },
  {
    id: 'p63',
    english: "Do you need a ride?",
    chinese: "需要载你一程吗？",
    context: "交通",
    tags: ["社交", "帮助"]
  },
  {
    id: 'p64',
    english: "It's on me.",
    chinese: "我请客。",
    context: "用餐",
    tags: ["社交", "金钱"]
  },
  {
    id: 'p65',
    english: "Take your time.",
    chinese: "慢慢来。",
    context: "通用",
    tags: ["礼貌", "日常"]
  },
  {
    id: 'p66',
    english: "Where are you from?",
    chinese: "你从哪里来？",
    context: "介绍",
    tags: ["社交", "旅行"]
  },
  {
    id: 'p67',
    english: "I have no idea.",
    chinese: "我完全不知道。",
    context: "知识",
    tags: ["日常", "随性"]
  },
  {
    id: 'p68',
    english: "Sounds good to me.",
    chinese: "听起来不错。",
    context: "同意",
    tags: ["社交", "计划"]
  },
  {
    id: 'p69',
    english: "Excuse me, where is the restroom?",
    chinese: "请问洗手间在哪？",
    context: "公共场所",
    tags: ["旅行", "日常"]
  },
  {
    id: 'p70',
    english: "Can you do me a favor?",
    chinese: "能帮我个忙吗？",
    context: "寻求帮助",
    tags: ["日常", "礼貌"]
  },
  {
    id: 'p71',
    english: "I'm just looking.",
    chinese: "我只是看看。",
    context: "购物",
    tags: ["日常", "回应"]
  },
  {
    id: 'p72',
    english: "What's the catch?",
    chinese: "有什么猫腻/陷阱吗？",
    context: "谈判",
    tags: ["习语", "警示"]
  },
  {
    id: 'p73',
    english: "Let's get down to business.",
    chinese: "让我们言归正传。",
    context: "工作",
    tags: ["商务", "会议"]
  },
  {
    id: 'p74',
    english: "I beg to differ.",
    chinese: "我不敢苟同。",
    context: "辩论",
    tags: ["正式", "观点"]
  },
  {
    id: 'p75',
    english: "Call it a day.",
    chinese: "收工。",
    context: "工作",
    tags: ["习语", "日常"]
  },
  {
    id: 'p76',
    english: "Pull yourself together.",
    chinese: "振作起来。",
    context: "情绪",
    tags: ["鼓励", "习语"]
  },
  {
    id: 'p77',
    english: "So far so good.",
    chinese: "目前为止一切都好。",
    context: "状态",
    tags: ["日常", "工作"]
  },
  {
    id: 'p78',
    english: "Speak of the devil.",
    chinese: "说曹操曹操到。",
    context: "社交",
    tags: ["习语", "日常"]
  },
  {
    id: 'p79',
    english: "Time flies.",
    chinese: "时光飞逝。",
    context: "通用",
    tags: ["谚语", "时间"]
  },
  {
    id: 'p80',
    english: "You can say that again.",
    chinese: "我完全同意。",
    context: "同意",
    tags: ["习语", "对话"]
  },
  {
    id: 'p81',
    english: "Don't judge a book by its cover.",
    chinese: "不要以貌取人。",
    context: "谚语",
    tags: ["智慧", "建议"]
  },
  {
    id: 'p82',
    english: "Hit the sack.",
    chinese: "睡觉。",
    context: "日常作息",
    tags: ["俚语", "睡眠"]
  },
  {
    id: 'p83',
    english: "It's raining cats and dogs.",
    chinese: "下着倾盆大雨。",
    context: "天气",
    tags: ["习语", "自然"]
  },
  {
    id: 'p84',
    english: "Once in a blue moon.",
    chinese: "千载难逢。",
    context: "频率",
    tags: ["习语", "时间"]
  },
  {
    id: 'p85',
    english: "The ball is in your court.",
    chinese: "这就看你的了。",
    context: "决策",
    tags: ["习语", "商务"]
  },
  {
    id: 'p86',
    english: "To make a long story short.",
    chinese: "长话短说。",
    context: "讲故事",
    tags: ["对话", "总结"]
  },
  {
    id: 'p87',
    english: "Under the weather.",
    chinese: "身体不适。",
    context: "健康",
    tags: ["习语", "状况"]
  },
  {
    id: 'p88',
    english: "Wrap your head around it.",
    chinese: "弄懂/理解。",
    context: "学习",
    tags: ["习语", "认知"]
  },
  {
    id: 'p89',
    english: "You hit the nail on the head.",
    chinese: "你说到点子上了。",
    context: "同意",
    tags: ["习语", "赞扬"]
  },
  {
    id: 'p90',
    english: "A penny for your thoughts.",
    chinese: "你在想什么呢？",
    context: "社交",
    tags: ["习语", "对话"]
  },
  {
    id: 'p91',
    english: "Actions speak louder than words.",
    chinese: "事实胜于雄辩。",
    context: "谚语",
    tags: ["智慧", "建议"]
  },
  {
    id: 'p92',
    english: "Add insult to injury.",
    chinese: "雪上加霜。",
    context: "情况",
    tags: ["习语", "消极"]
  },
  {
    id: 'p93',
    english: "Barking up the wrong tree.",
    chinese: "找错人了/攻错方向了。",
    context: "错误",
    tags: ["习语", "纠正"]
  },
  {
    id: 'p94',
    english: "Beat around the bush.",
    chinese: "拐弯抹角。",
    context: "沟通",
    tags: ["习语", "直接"]
  },
  {
    id: 'p95',
    english: "Bite off more than you can chew.",
    chinese: "贪多嚼不烂。",
    context: "能力",
    tags: ["习语", "建议"]
  },
  {
    id: 'p96',
    english: "Blessing in disguise.",
    chinese: "塞翁失马，焉知非福。",
    context: "乐观",
    tags: ["习语", "生活"]
  },
  {
    id: 'p97',
    english: "Burn the midnight oil.",
    chinese: "挑灯夜战/熬夜。",
    context: "工作",
    tags: ["习语", "努力"]
  },
  {
    id: 'p98',
    english: "Cut corners.",
    chinese: "偷工减料/走捷径。",
    context: "工作",
    tags: ["习语", "质量"]
  },
  {
    id: 'p99',
    english: "Every cloud has a silver lining.",
    chinese: "黑暗中总有一线光明。",
    context: "乐观",
    tags: ["谚语", "希望"]
  },
  {
    id: 'p100',
    english: "Go back to the drawing board.",
    chinese: "推倒重来。",
    context: "工作",
    tags: ["习语", "重新开始"]
  },
  // Expanded phrases (Batch 2)
  {
    id: 'p101',
    english: "You're on mute.",
    chinese: "你静音了。",
    context: "在线会议",
    tags: ["工作", "科技"]
  },
  {
    id: 'p102',
    english: "Can you see my screen?",
    chinese: "能看到我的屏幕吗？",
    context: "在线会议",
    tags: ["工作", "科技"]
  },
  {
    id: 'p103',
    english: "My internet connection is unstable.",
    chinese: "我的网络连接不稳定。",
    context: "在线会议",
    tags: ["工作", "科技"]
  },
  {
    id: 'p104',
    english: "Please cc me on that email.",
    chinese: "发邮件请抄送我。",
    context: "办公室",
    tags: ["商务", "沟通"]
  },
  {
    id: 'p105',
    english: "I'll circle back to you.",
    chinese: "我稍后会再联系你。",
    context: "办公室",
    tags: ["商务", "习语"]
  },
  {
    id: 'p106',
    english: "Let's touch base next week.",
    chinese: "我们下周再联系/碰头。",
    context: "办公室",
    tags: ["商务", "规划"]
  },
  {
    id: 'p107',
    english: "Think outside the box.",
    chinese: "跳出思维定式。",
    context: "头脑风暴",
    tags: ["商务", "习语"]
  },
  {
    id: 'p108',
    english: "It's a win-win situation.",
    chinese: "这是双赢的局面。",
    context: "谈判",
    tags: ["商务", "成功"]
  },
  {
    id: 'p109',
    english: "Get the ball rolling.",
    chinese: "开始行动/启动。",
    context: "项目",
    tags: ["商务", "习语"]
  },
  {
    id: 'p110',
    english: "Keep me in the loop.",
    chinese: "有消息随时通知我。",
    context: "沟通",
    tags: ["商务", "习语"]
  },
  {
    id: 'p111',
    english: "My phone is running out of battery.",
    chinese: "我的手机快没电了。",
    context: "日常",
    tags: ["科技", "紧急"]
  },
  {
    id: 'p112',
    english: "Do you have a charger?",
    chinese: "你有充电器吗？",
    context: "日常",
    tags: ["科技", "帮助"]
  },
  {
    id: 'p113',
    english: "Where is the departure gate?",
    chinese: "登机口在哪里？",
    context: "机场",
    tags: ["旅行", "交通"]
  },
  {
    id: 'p114',
    english: "I have a connecting flight.",
    chinese: "我需要转机。",
    context: "机场",
    tags: ["旅行", "交通"]
  },
  {
    id: 'p115',
    english: "Is there a dress code?",
    chinese: "有着装要求吗？",
    context: "活动",
    tags: ["社交", "文化"]
  },
  {
    id: 'p116',
    english: "I'd like a window seat, please.",
    chinese: "我想要靠窗的座位。",
    context: "交通",
    tags: ["旅行", "偏好"]
  },
  {
    id: 'p117',
    english: "Can I get a refund?",
    chinese: "我可以退款吗？",
    context: "购物",
    tags: ["服务", "金钱"]
  },
  {
    id: 'p118',
    english: "Do you have this in a smaller size?",
    chinese: "这件有小一点的码吗？",
    context: "购物",
    tags: ["购物", "服装"]
  },
  {
    id: 'p119',
    english: "What's the exchange rate?",
    chinese: "汇率是多少？",
    context: "财务",
    tags: ["旅行", "金钱"]
  },
  {
    id: 'p120',
    english: "I'm swamped right now.",
    chinese: "我现在忙得不可开交。",
    context: "工作/生活",
    tags: ["习语", "忙碌"]
  },
  {
    id: 'p121',
    english: "Take it easy.",
    chinese: "放轻松/别紧张。",
    context: "安慰",
    tags: ["日常", "随性"]
  },
  {
    id: 'p122',
    english: "It's not rocket science.",
    chinese: "这并不难/不是什么高深学问。",
    context: "解释",
    tags: ["习语", "日常"]
  },
  {
    id: 'p123',
    english: "Make yourself at home.",
    chinese: "别客气/当自己家一样。",
    context: "待客",
    tags: ["社交", "礼貌"]
  },
  {
    id: 'p124',
    english: "Help yourself.",
    chinese: "请自便/随便吃。",
    context: "待客",
    tags: ["社交", "用餐"]
  },
  {
    id: 'p125',
    english: "I'm all ears.",
    chinese: "我洗耳恭听。",
    context: "倾听",
    tags: ["习语", "沟通"]
  },
  {
    id: 'p126',
    english: "Don't get me wrong.",
    chinese: "别误会我的意思。",
    context: "澄清",
    tags: ["沟通", "日常"]
  },
  {
    id: 'p127',
    english: "Fair enough.",
    chinese: "很公平/说得通。",
    context: "同意",
    tags: ["对话", "日常"]
  },
  {
    id: 'p128',
    english: "It is what it is.",
    chinese: "既来之则安之/事实就是如此。",
    context: "接受",
    tags: ["日常", "哲学"]
  },
  {
    id: 'p129',
    english: "Miss the boat.",
    chinese: "错失良机。",
    context: "机会",
    tags: ["习语", "遗憾"]
  },
  {
    id: 'p130',
    english: "Best of both worlds.",
    chinese: "两全其美。",
    context: "选择",
    tags: ["习语", "积极"]
  },
  {
    id: 'p131',
    english: "See eye to eye.",
    chinese: "看法一致。",
    context: "同意",
    tags: ["习语", "关系"]
  },
  {
    id: 'p132',
    english: "Kill two birds with one stone.",
    chinese: "一石二鸟。",
    context: "效率",
    tags: ["习语", "策略"]
  },
  {
    id: 'p133',
    english: "Let the cat out of the bag.",
    chinese: "泄露秘密。",
    context: "秘密",
    tags: ["习语", "错误"]
  },
  {
    id: 'p134',
    english: "On the ball.",
    chinese: "机灵/反应快。",
    context: "能力",
    tags: ["习语", "赞扬"]
  },
  {
    id: 'p135',
    english: "Straight from the horse's mouth.",
    chinese: "消息来源可靠（亲口听说）。",
    context: "信息",
    tags: ["习语", "真相"]
  },
  {
    id: 'p136',
    english: "Play devil's advocate.",
    chinese: "故意唱反调（为了讨论）。",
    context: "辩论",
    tags: ["习语", "讨论"]
  },
  {
    id: 'p137',
    english: "Don't put all your eggs in one basket.",
    chinese: "不要孤注一掷。",
    context: "风险",
    tags: ["习语", "建议"]
  },
  {
    id: 'p138',
    english: "In the heat of the moment.",
    chinese: "在盛怒之下/一时冲动。",
    context: "情绪",
    tags: ["习语", "冲突"]
  },
  {
    id: 'p139',
    english: "Jump on the bandwagon.",
    chinese: "随大流/跟风。",
    context: "趋势",
    tags: ["习语", "社会"]
  },
  {
    id: 'p140',
    english: "Keep it at bay.",
    chinese: "控制住/牵制。",
    context: "控制",
    tags: ["习语", "策略"]
  },
  {
    id: 'p141',
    english: "I have some time to kill.",
    chinese: "我有些时间要打发。",
    context: "等待",
    tags: ["日常", "时间"]
  },
  {
    id: 'p142',
    english: "Make ends meet.",
    chinese: "收支相抵/勉强维持生计。",
    context: "财务",
    tags: ["习语", "生活"]
  },
  {
    id: 'p143',
    english: "Let you off the hook.",
    chinese: "放你一马。",
    context: "原谅",
    tags: ["习语", "随性"]
  },
  {
    id: 'p144',
    english: "I'm on the fence.",
    chinese: "我犹豫不决。",
    context: "决策",
    tags: ["习语", "选择"]
  },
  {
    id: 'p145',
    english: "Let's play it by ear.",
    chinese: "到时候看着办。",
    context: "计划",
    tags: ["习语", "灵活性"]
  },
  {
    id: 'p146',
    english: "Does that ring a bell?",
    chinese: "你有印象吗？",
    context: "记忆",
    tags: ["习语", "提问"]
  },
  {
    id: 'p147',
    english: "Sit tight.",
    chinese: "耐心等待/按兵不动。",
    context: "等待",
    tags: ["习语", "指示"]
  },
  {
    id: 'p148',
    english: "Spill the beans.",
    chinese: "说漏嘴/揭秘。",
    context: "秘密",
    tags: ["习语", "随性"]
  },
  {
    id: 'p149',
    english: "Can I take a rain check?",
    chinese: "可以改天吗？",
    context: "邀请",
    tags: ["习语", "礼貌"]
  },
  {
    id: 'p150',
    english: "The elephant in the room.",
    chinese: "显而易见但被忽略的问题。",
    context: "问题",
    tags: ["习语", "讨论"]
  },
  {
    id: 'p151',
    english: "Through thick and thin.",
    chinese: "同甘共苦/风雨同舟。",
    context: "关系",
    tags: ["习语", "忠诚"]
  },
  {
    id: 'p152',
    english: "Throw in the towel.",
    chinese: "认输/放弃。",
    context: "竞争",
    tags: ["习语", "体育"]
  },
  {
    id: 'p153',
    english: "Twist someone's arm.",
    chinese: "强迫/劝说某人。",
    context: "说服",
    tags: ["习语", "随性"]
  },
  {
    id: 'p154',
    english: "Up in the air.",
    chinese: "悬而未决。",
    context: "状态",
    tags: ["习语", "不确定"]
  },
  {
    id: 'p155',
    english: "Pitch in.",
    chinese: "投入/参与/凑钱。",
    context: "团队合作",
    tags: ["习语", "合作"]
  },
  {
    id: 'p156',
    english: "Go the extra mile.",
    chinese: "加倍努力/多做一点。",
    context: "努力",
    tags: ["习语", "成功"]
  },
  {
    id: 'p157',
    english: "Get your act together.",
    chinese: "振作起来/把事情理顺。",
    context: "建议",
    tags: ["习语", "组织"]
  },
  {
    id: 'p158',
    english: "Give someone the cold shoulder.",
    chinese: "冷落某人。",
    context: "关系",
    tags: ["习语", "冲突"]
  },
  {
    id: 'p159',
    english: "Are you seeing anyone?",
    chinese: "你有在和谁交往吗？",
    context: "约会",
    tags: ["社交", "个人"]
  },
  {
    id: 'p160',
    english: "We drifted apart.",
    chinese: "我们逐渐疏远了。",
    context: "关系",
    tags: ["社交", "生活"]
  },
  {
    id: 'p161',
    english: "I have a crush on her/him.",
    chinese: "我暗恋她/他。",
    context: "浪漫",
    tags: ["社交", "爱"]
  },
  {
    id: 'p162',
    english: "Let's split the bill.",
    chinese: "我们AA制吧。",
    context: "用餐",
    tags: ["金钱", "社交"]
  },
  {
    id: 'p163',
    english: "I'm broke.",
    chinese: "我身无分文。",
    context: "财务",
    tags: ["俚语", "日常"]
  },
  {
    id: 'p164',
    english: "Sleep on it.",
    chinese: "考虑一晚再说。",
    context: "决策",
    tags: ["习语", "建议"]
  },
  {
    id: 'p165',
    english: "Play hard to get.",
    chinese: "故作矜持/欲擒故纵。",
    context: "约会",
    tags: ["习语", "浪漫"]
  },
  {
    id: 'p166',
    english: "Keep your chin up.",
    chinese: "别气馁/昂起头来。",
    context: "鼓励",
    tags: ["习语", "情绪"]
  },
  {
    id: 'p167',
    english: "Music to my ears.",
    chinese: "中听的话/好消息。",
    context: "新闻",
    tags: ["习语", "积极"]
  },
  {
    id: 'p168',
    english: "On cloud nine.",
    chinese: "乐不可支/九霄云外。",
    context: "幸福",
    tags: ["习语", "情绪"]
  },
  {
    id: 'p169',
    english: "Rule of thumb.",
    chinese: "经验法则/实用的估测方法。",
    context: "指南",
    tags: ["习语", "知识"]
  },
  {
    id: 'p170',
    english: "Under the table.",
    chinese: "私下/秘密地（通常指非法）。",
    context: "保密",
    tags: ["习语", "商务"]
  },
  {
    id: 'p171',
    english: "Blow off steam.",
    chinese: "发泄情绪/减压。",
    context: "压力",
    tags: ["习语", "健康"]
  },
  {
    id: 'p172',
    english: "Face the music.",
    chinese: "承担后果。",
    context: "责任",
    tags: ["习语", "生活"]
  },
  {
    id: 'p173',
    english: "Get cold feet.",
    chinese: "临阵退缩。",
    context: "恐惧",
    tags: ["习语", "表现"]
  },
  {
    id: 'p174',
    english: "In the same boat.",
    chinese: "处境相同。",
    context: "情况",
    tags: ["习语", "团结"]
  },
  {
    id: 'p175',
    english: "Lost your touch.",
    chinese: "失去了往日的水准/能力。",
    context: "技能",
    tags: ["习语", "批评"]
  },
  {
    id: 'p176',
    english: "Ring a bell?",
    chinese: "听起来耳熟吗？",
    context: "记忆",
    tags: ["习语", "提问"]
  },
  {
    id: 'p177',
    english: "Cut to the chase.",
    chinese: "开门见山/切入正题。",
    context: "沟通",
    tags: ["习语", "直接"]
  },
  {
    id: 'p178',
    english: "Get over it.",
    chinese: "克服/忘掉它。",
    context: "建议",
    tags: ["习语", "情绪"]
  },
  {
    id: 'p179',
    english: "Hands down.",
    chinese: "无疑/轻而易举。",
    context: "观点",
    tags: ["习语", "确定性"]
  },
  {
    id: 'p180',
    english: "Keep an eye on.",
    chinese: "照看/留意。",
    context: "注意",
    tags: ["习语", "关心"]
  },
  {
    id: 'p181',
    english: "Learn by heart.",
    chinese: "背诵/牢记。",
    context: "学习",
    tags: ["习语", "教育"]
  },
  {
    id: 'p182',
    english: "Out of the blue.",
    chinese: "突然/出乎意料。",
    context: "惊喜",
    tags: ["习语", "事件"]
  },
  {
    id: 'p183',
    english: "Play it safe.",
    chinese: "谨慎行事。",
    context: "安全",
    tags: ["习语", "策略"]
  },
  {
    id: 'p184',
    english: "Sick and tired.",
    chinese: "厌烦/受够了。",
    context: "抱怨",
    tags: ["习语", "情绪"]
  },
  {
    id: 'p185',
    english: "The last straw.",
    chinese: "压死骆驼的最后一根稻草/忍无可忍。",
    context: "极限",
    tags: ["习语", "冲突"]
  },
  {
    id: 'p186',
    english: "Touch wood / Knock on wood.",
    chinese: "老天保佑（以此避邪）。",
    context: "迷信",
    tags: ["习语", "文化"]
  },
  {
    id: 'p187',
    english: "When in Rome, do as the Romans do.",
    chinese: "入乡随俗。",
    context: "旅行",
    tags: ["谚语", "文化"]
  },
  {
    id: 'p188',
    english: "Your guess is as good as mine.",
    chinese: "我也不知道。",
    context: "不确定",
    tags: ["习语", "知识"]
  },
  {
    id: 'p189',
    english: "Bite the bullet.",
    chinese: "咬紧牙关/硬着头皮做。",
    context: "勇气",
    tags: ["习语", "表现"]
  },
  {
    id: 'p190',
    english: "Break the ice.",
    chinese: "打破僵局。",
    context: "社交",
    tags: ["习语", "沟通"]
  },
  {
    id: 'p191',
    english: "Butter someone up.",
    chinese: "拍马屁/巴结。",
    context: "社交",
    tags: ["习语", "说服"]
  },
  {
    id: 'p192',
    english: "Cost a fortune.",
    chinese: "花了一大笔钱。",
    context: "财务",
    tags: ["习语", "金钱"]
  },
  {
    id: 'p193',
    english: "Down to earth.",
    chinese: "脚踏实地/务实。",
    context: "个性",
    tags: ["习语", "性格"]
  },
  {
    id: 'p194',
    english: "Go with the flow.",
    chinese: "顺其自然。",
    context: "态度",
    tags: ["习语", "生活"]
  },
  {
    id: 'p195',
    english: "Hit the road.",
    chinese: "上路/出发。",
    context: "旅行",
    tags: ["习语", "旅程"]
  },
  {
    id: 'p196',
    english: "In hot water.",
    chinese: "陷入困境/惹上麻烦。",
    context: "麻烦",
    tags: ["习语", "问题"]
  },
  {
    id: 'p197',
    english: "Keep a straight face.",
    chinese: "板着脸/忍住不笑。",
    context: "控制",
    tags: ["习语", "情绪"]
  },
  {
    id: 'p198',
    english: "Let sleeping dogs lie.",
    chinese: "别自找麻烦/旧事莫重提。",
    context: "冲突",
    tags: ["习语", "建议"]
  },
  {
    id: 'p199',
    english: "Make a mountain out of a molehill.",
    chinese: "小题大做。",
    context: "夸张",
    tags: ["习语", "反应"]
  },
  {
    id: 'p200',
    english: "No pain, no gain.",
    chinese: "没有付出就没有收获。",
    context: "动机",
    tags: ["谚语", "成功"]
  },
  // Grammar practice phrases
  {
    id: 'p201',
    english: "I am eating breakfast now.",
    chinese: "我现在正在吃早餐。",
    context: "现在进行时",
    tags: ["语法", "现在进行时"]
  },
  {
    id: 'p202',
    english: "She was reading a book when I called.",
    chinese: "我打电话时她正在读书。",
    context: "过去进行时",
    tags: ["语法", "过去进行时"]
  },
  {
    id: 'p203',
    english: "They have lived here for ten years.",
    chinese: "他们已经在这里住了十年了。",
    context: "现在完成时",
    tags: ["语法", "现在完成时"]
  },
  {
    id: 'p204',
    english: "We had finished dinner before the guests arrived.",
    chinese: "客人到达之前我们就已经吃完晚饭了。",
    context: "过去完成时",
    tags: ["语法", "过去完成时"]
  },
  {
    id: 'p205',
    english: "He will be working late tonight.",
    chinese: "他今晚将会工作到很晚。",
    context: "将来进行时",
    tags: ["语法", "将来进行时"]
  },
  {
    id: 'p206',
    english: "By next year, I will have graduated from university.",
    chinese: "到明年为止，我就已经大学毕业了。",
    context: "将来完成时",
    tags: ["语法", "将来完成时"]
  },
  {
    id: 'p207',
    english: "The house was built in 1990.",
    chinese: "这栋房子建于1990年。",
    context: "被动语态",
    tags: ["语法", "被动语态"]
  },
  {
    id: 'p208',
    english: "English is spoken all over the world.",
    chinese: "全世界都在说英语。",
    context: "被动语态",
    tags: ["语法", "被动语态"]
  },
  {
    id: 'p209',
    english: "The cake was being baked when we arrived.",
    chinese: "我们到达时蛋糕正在烘烤中。",
    context: "过去进行时被动语态",
    tags: ["语法", "被动语态"]
  },
  {
    id: 'p210',
    english: "The project will be completed by Friday.",
    chinese: "项目将在周五前完成。",
    context: "将来时被动语态",
    tags: ["语法", "被动语态"]
  },
  {
    id: 'p211',
    english: "If I were rich, I would travel around the world.",
    chinese: "如果我很富有，我会环游世界。",
    context: "虚拟语气",
    tags: ["语法", "虚拟语气"]
  },
  {
    id: 'p212',
    english: "I wish I had studied harder in school.",
    chinese: "我希望我在学校时学习更努力。",
    context: "虚拟语气",
    tags: ["语法", "虚拟语气"]
  },
  {
    id: 'p213',
    english: "It's time we went home.",
    chinese: "是我们该回家的时候了。",
    context: "虚拟语气",
    tags: ["语法", "虚拟语气"]
  },
  {
    id: 'p214',
    english: "I'd rather you stayed here.",
    chinese: "我宁愿你留在这里。",
    context: "虚拟语气",
    tags: ["语法", "虚拟语气"]
  },
  {
    id: 'p215',
    english: "He suggested that we leave early.",
    chinese: "他建议我们早点离开。",
    context: "虚拟语气",
    tags: ["语法", "虚拟语气"]
  },
  {
    id: 'p216',
    english: "Although it was raining, we went for a walk.",
    chinese: "虽然在下雨，我们还是去散步了。",
    context: "让步状语从句",
    tags: ["语法", "状语从句"]
  },
  {
    id: 'p217',
    english: "Because she was tired, she went to bed early.",
    chinese: "因为她很累，所以早早就睡了。",
    context: "原因状语从句",
    tags: ["语法", "状语从句"]
  },
  {
    id: 'p218',
    english: "We'll go to the beach if it's sunny tomorrow.",
    chinese: "如果明天天晴，我们就去海滩。",
    context: "条件状语从句",
    tags: ["语法", "状语从句"]
  },
  {
    id: 'p219',
    english: "He spoke so quietly that I couldn't hear him.",
    chinese: "他说话声音那么小，我听不见。",
    context: "结果状语从句",
    tags: ["语法", "状语从句"]
  },
  {
    id: 'p220',
    english: "While I was cooking, the phone rang.",
    chinese: "我在做饭的时候电话响了。",
    context: "时间状语从句",
    tags: ["语法", "状语从句"]
  },
  {
    id: 'p221',
    english: "The man who lives next door is a doctor.",
    chinese: "住在隔壁的那个人是医生。",
    context: "定语从句",
    tags: ["语法", "定语从句"]
  },
  {
    id: 'p222',
    english: "This is the book that I bought yesterday.",
    chinese: "这就是我昨天买的书。",
    context: "定语从句",
    tags: ["语法", "定语从句"]
  },
  {
    id: 'p223',
    english: "I don't know where she went.",
    chinese: "我不知道她去哪里了。",
    context: "宾语从句",
    tags: ["语法", "名词性从句"]
  },
  {
    id: 'p224',
    english: "What he said surprised everyone.",
    chinese: "他说的话让每个人都很惊讶。",
    context: "主语从句",
    tags: ["语法", "名词性从句"]
  },
  {
    id: 'p225',
    english: "That is why I came here.",
    chinese: "那就是我来这里的原因。",
    context: "表语从句",
    tags: ["语法", "名词性从句"]
  },
  {
    id: 'p226',
    english: "I will call you as soon as I arrive.",
    chinese: "我一到达就会给你打电话。",
    context: "时间状语从句",
    tags: ["语法", "状语从句"]
  },
  {
    id: 'p227',
    english: "Since you're here, let's start the meeting.",
    chinese: "既然你在这里，我们就开始开会吧。",
    context: "原因状语从句",
    tags: ["语法", "状语从句"]
  },
  {
    id: 'p228',
    english: "Unless you study hard, you won't pass the exam.",
    chinese: "除非你努力学习，否则考试不会及格。",
    context: "条件状语从句",
    tags: ["语法", "状语从句"]
  },
  {
    id: 'p229',
    english: "The flowers smell wonderful.",
    chinese: "这些花闻起来很香。",
    context: "系动词用法",
    tags: ["语法", "系动词"]
  },
  {
    id: 'p230',
    english: "The soup tastes delicious.",
    chinese: "汤尝起来很美味。",
    context: "系动词用法",
    tags: ["语法", "系动词"]
  },
  {
    id: 'p231',
    english: "The music sounds beautiful.",
    chinese: "音乐听起来很美。",
    context: "系动词用法",
    tags: ["语法", "系动词"]
  },
  {
    id: 'p232',
    english: "The bed feels comfortable.",
    chinese: "床感觉很舒适。",
    context: "系动词用法",
    tags: ["语法", "系动词"]
  },
  {
    id: 'p233',
    english: "The news looks promising.",
    chinese: "这个消息看起来很有希望。",
    context: "系动词用法",
    tags: ["语法", "系动词"]
  },
  {
    id: 'p234',
    english: "He became a teacher after graduation.",
    chinese: "毕业后他成为了一名教师。",
    context: "系动词用法",
    tags: ["语法", "系动词"]
  },
  {
    id: 'p235',
    english: "She remained calm during the crisis.",
    chinese: "危机期间她保持冷静。",
    context: "系动词用法",
    tags: ["语法", "系动词"]
  },
  {
    id: 'p236',
    english: "The children grew quickly.",
    chinese: "孩子们长得很快。",
    context: "系动词用法",
    tags: ["语法", "系动词"]
  },
  {
    id: 'p237',
    english: "The situation turned worse.",
    chinese: "情况变得更糟了。",
    context: "系动词用法",
    tags: ["语法", "系动词"]
  },
  {
    id: 'p238',
    english: "The bread went stale.",
    chinese: "面包变 stale 了。",
    context: "系动词用法",
    tags: ["语法", "系动词"]
  },
  {
    id: 'p239',
    english: "The milk turned sour.",
    chinese: "牛奶变酸了。",
    context: "系动词用法",
    tags: ["语法", "系动词"]
  },
  {
    id: 'p240',
    english: "I have never been to Japan.",
    chinese: "我从未去过日本。",
    context: "现在完成时",
    tags: ["语法", "现在完成时"]
  },
  {
    id: 'p241',
    english: "Have you ever tried sushi?",
    chinese: "你吃过寿司吗？",
    context: "现在完成时",
    tags: ["语法", "现在完成时"]
  },
  {
    id: 'p242',
    english: "She has already finished her homework.",
    chinese: "她已经完成了家庭作业。",
    context: "现在完成时",
    tags: ["语法", "现在完成时"]
  },
  {
    id: 'p243',
    english: "They haven't seen that movie yet.",
    chinese: "他们还没看过那部电影。",
    context: "现在完成时",
    tags: ["语法", "现在完成时"]
  },
  {
    id: 'p244',
    english: "Just look at that beautiful sunset!",
    chinese: "看看那美丽的日落！",
    context: "祈使句",
    tags: ["语法", "祈使句"]
  },
  {
    id: 'p245',
    english: "Please close the door.",
    chinese: "请关门。",
    context: "祈使句",
    tags: ["语法", "祈使句"]
  },
  {
    id: 'p246',
    english: "Don't forget to call your mother.",
    chinese: "别忘了给你妈妈打电话。",
    context: "祈使句",
    tags: ["语法", "祈使句"]
  },
  {
    id: 'p247',
    english: "Be quiet, please.",
    chinese: "请安静。",
    context: "祈使句",
    tags: ["语法", "祈使句"]
  },
  {
    id: 'p248',
    english: "Let's go shopping tomorrow.",
    chinese: "我们明天去购物吧。",
    context: "祈使句",
    tags: ["语法", "祈使句"]
  },
  {
    id: 'p249',
    english: "Do be careful with that vase.",
    chinese: "一定要小心那个花瓶。",
    context: "强调祈使句",
    tags: ["语法", "祈使句"]
  },
  {
    id: 'p250',
    english: "Never do that again!",
    chinese: "再也不要那样做了！",
    context: "祈使句",
    tags: ["语法", "祈使句"]
  },
  {
    id: 'p251',
    english: "Hardly had I entered the room when the lights went out.",
    chinese: "我刚进房间灯就灭了。",
    context: "倒装句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'p252',
    english: "Not only did he lose his wallet, but he also missed the bus.",
    chinese: "他不仅丢了钱包，还错过了公交车。",
    context: "倒装句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'p253',
    english: "Only after the meeting did I realize the importance of the project.",
    chinese: "直到会议结束后我才意识到这个项目的重要性。",
    context: "倒装句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'p254',
    english: "No sooner had she graduated than she got a job.",
    chinese: "她刚毕业就找到了工作。",
    context: "倒装句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'p255',
    english: "Here comes the bus.",
    chinese: "公交车来了。",
    context: "倒装句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'p256',
    english: "There goes my chance.",
    chinese: "我的机会没了。",
    context: "倒装句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'p257',
    english: "So tired was he that he fell asleep immediately.",
    chinese: "他太累了，以至于立刻就睡着了。",
    context: "倒装句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'p258',
    english: "Such was her beauty that everyone stared at her.",
    chinese: "她如此美丽，以至于每个人都盯着她看。",
    context: "倒装句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'p259',
    english: "Little did they know that they were being watched.",
    chinese: "他们几乎不知道自己正被监视着。",
    context: "倒装句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'p260',
    english: "Never have I seen such a beautiful sight.",
    chinese: "我从未见过如此美丽的景象。",
    context: "倒装句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'p261',
    english: "Rarely does he complain about his job.",
    chinese: "他很少抱怨自己的工作。",
    context: "倒装句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'p262',
    english: "Seldom do we get such an opportunity.",
    chinese: "我们很少得到这样的机会。",
    context: "倒装句",
    tags: ["语法", "倒装句"]
  },
  {
    id: 'p263',
    english: "Many a student has failed this exam.",
    chinese: "许多学生都没有通过这次考试。",
    context: "特殊主谓一致",
    tags: ["语法", "主谓一致"]
  },
  {
    id: 'p264',
    english: "Neither of the answers is correct.",
    chinese: "两个答案都不对。",
    context: "主谓一致",
    tags: ["语法", "主谓一致"]
  },
  {
    id: 'p265',
    english: "Either you or I am responsible for this.",
    chinese: "要么你，要么我对此负责。",
    context: "主谓一致",
    tags: ["语法", "主谓一致"]
  },
  {
    id: 'p266',
    english: "Not only the students but also the teacher was surprised.",
    chinese: "不仅学生们感到惊讶，老师也很惊讶。",
    context: "主谓一致",
    tags: ["语法", "主谓一致"]
  },
  {
    id: 'p267',
    english: "The number of visitors has increased.",
    chinese: "游客数量增加了。",
    context: "主谓一致",
    tags: ["语法", "主谓一致"]
  },
  {
    id: 'p268',
    english: "A number of students have signed up for the course.",
    chinese: "许多学生报名参加了这门课程。",
    context: "主谓一致",
    tags: ["语法", "主谓一致"]
  },
  {
    id: 'p269',
    english: "None of the information is reliable.",
    chinese: "这些信息都不可靠。",
    context: "主谓一致",
    tags: ["语法", "主谓一致"]
  },
  {
    id: 'p270',
    english: "All of the books are interesting.",
    chinese: "所有的书都很有趣。",
    context: "主谓一致",
    tags: ["语法", "主谓一致"]
  },
  {
    id: 'p271',
    english: "More than one person has complained about this issue.",
    chinese: "不止一个人抱怨这个问题。",
    context: "主谓一致",
    tags: ["语法", "主谓一致"]
  },
  {
    id: 'p272',
    english: "Ten miles is a long distance to walk.",
    chinese: "十英里是很长的步行距离。",
    context: "主谓一致",
    tags: ["语法", "主谓一致"]
  },
  {
    id: 'p273',
    english: "The police are investigating the case.",
    chinese: "警方正在调查这个案件。",
    context: "集合名词",
    tags: ["语法", "集合名词"]
  },
  {
    id: 'p274',
    english: "The team are discussing their strategies.",
    chinese: "团队正在讨论他们的策略。",
    context: "集合名词",
    tags: ["语法", "集合名词"]
  },
  {
    id: 'p275',
    english: "The family is/are going on vacation.",
    chinese: "这家人要去度假。",
    context: "集合名词",
    tags: ["语法", "集合名词"]
  },
  {
    id: 'p276',
    english: "The government has announced new policies.",
    chinese: "政府宣布了新政策。",
    context: "集合名词",
    tags: ["语法", "集合名词"]
  },
  {
    id: 'p277',
    english: "The committee has/have reached a decision.",
    chinese: "委员会已做出决定。",
    context: "集合名词",
    tags: ["语法", "集合名词"]
  },
  {
    id: 'p278',
    english: "My brother and sister are both doctors.",
    chinese: "我的兄弟姐妹都是医生。",
    context: "复合主语",
    tags: ["语法", "主语"]
  },
  {
    id: 'p279',
    english: "Bread and butter is my favorite breakfast.",
    chinese: "面包和黄油是我最喜欢的早餐。",
    context: "复合主语",
    tags: ["语法", "主语"]
  },
  {
    id: 'p280',
    english: "Fish and chips is a traditional British dish.",
    chinese: "鱼和薯条是一道传统的英国菜。",
    context: "复合主语",
    tags: ["语法", "主语"]
  },
  {
    id: 'p281',
    english: "Each of the students has submitted their assignment.",
    chinese: "每个学生都提交了他们的作业。",
    context: "不定代词",
    tags: ["语法", "不定代词"]
  },
  {
    id: 'p282',
    english: "Everyone is required to attend the meeting.",
    chinese: "每个人都必须参加会议。",
    context: "不定代词",
    tags: ["语法", "不定代词"]
  },
  {
    id: 'p283',
    english: "Someone has stolen my wallet.",
    chinese: "有人偷了我的钱包。",
    context: "不定代词",
    tags: ["语法", "不定代词"]
  },
  {
    id: 'p284',
    english: "Nobody knows the answer to this question.",
    chinese: "没人知道这个问题的答案。",
    context: "不定代词",
    tags: ["语法", "不定代词"]
  },
  {
    id: 'p285',
    english: "Everything is ready for the party.",
    chinese: "派对的一切都准备好了。",
    context: "不定代词",
    tags: ["语法", "不定代词"]
  },
  {
    id: 'p286',
    english: "Nothing can stop us now.",
    chinese: "现在没有什么能阻止我们。",
    context: "不定代词",
    tags: ["语法", "不定代词"]
  },
  {
    id: 'p287',
    english: "Something is better than nothing.",
    chinese: "聊胜于无。",
    context: "不定代词",
    tags: ["语法", "不定代词"]
  },
  {
    id: 'p288',
    english: "Anything is possible if you believe.",
    chinese: "只要你相信，一切皆有可能。",
    context: "不定代词",
    tags: ["语法", "不定代词"]
  },
  {
    id: 'p289',
    english: "Everything that glitters is not gold.",
    chinese: "闪闪发光的东西未必都是金子。",
    context: "不定代词",
    tags: ["语法", "不定代词"]
  },
  {
    id: 'p290',
    english: "Is anything wrong?",
    chinese: "有什么问题吗？",
    context: "不定代词",
    tags: ["语法", "不定代词"]
  },
  {
    id: 'p291',
    english: "He runs faster than I do.",
    chinese: "他跑得比我快。",
    context: "比较级",
    tags: ["语法", "形容词"]
  },
  {
    id: 'p292',
    english: "This is the most beautiful place I have ever seen.",
    chinese: "这是我见过的最美丽的地方。",
    context: "最高级",
    tags: ["语法", "形容词"]
  },
  {
    id: 'p293',
    english: "The weather is getting warmer and warmer.",
    chinese: "天气变得越来越暖和。",
    context: "比较级",
    tags: ["语法", "形容词"]
  },
  {
    id: 'p294',
    english: "This book is as interesting as that one.",
    chinese: "这本书和那本书一样有趣。",
    context: "比较结构",
    tags: ["语法", "形容词"]
  },
  {
    id: 'p295',
    english: "She is not as tall as her sister.",
    chinese: "她没有她姐姐高。",
    context: "比较结构",
    tags: ["语法", "形容词"]
  },
  {
    id: 'p296',
    english: "The more you practice, the better you become.",
    chinese: "你练习越多，就变得越好。",
    context: "比较级",
    tags: ["语法", "形容词"]
  },
  {
    id: 'p297',
    english: "He is twice as old as his brother.",
    chinese: "他年龄是他弟弟的两倍。",
    context: "比较结构",
    tags: ["语法", "形容词"]
  },
  {
    id: 'p298',
    english: "This is the least expensive option.",
    chinese: "这是最便宜的选择。",
    context: "最高级",
    tags: ["语法", "形容词"]
  },
  {
    id: 'p299',
    english: "She is one of the best students in the class.",
    chinese: "她是班上最好的学生之一。",
    context: "最高级",
    tags: ["语法", "形容词"]
  },
  {
    id: 'p300',
    english: "I couldn't agree more with you.",
    chinese: "我非常同意你的观点。",
    context: "比较结构",
    tags: ["语法", "形容词"]
  },
  // New phrases for beginners
  {
    id: 'p301',
    english: "Good morning!",
    chinese: "早上好！",
    context: "问候",
    tags: ["日常", "问候"]
  },
  {
    id: 'p302',
    english: "How are you today?",
    chinese: "你今天怎么样？",
    context: "问候",
    tags: ["日常", "问候"]
  },
  {
    id: 'p303',
    english: "I'm fine, thank you.",
    chinese: "我很好，谢谢。",
    context: "问候",
    tags: ["日常", "问候"]
  },
  {
    id: 'p304',
    english: "What's your name?",
    chinese: "你叫什么名字？",
    context: "介绍",
    tags: ["日常", "社交"]
  },
  {
    id: 'p305',
    english: "My name is John.",
    chinese: "我叫约翰。",
    context: "介绍",
    tags: ["日常", "社交"]
  },
  {
    id: 'p306',
    english: "Nice to meet you!",
    chinese: "很高兴认识你！",
    context: "介绍",
    tags: ["日常", "社交"]
  },
  {
    id: 'p307',
    english: "How old are you?",
    chinese: "你多大了？",
    context: "个人信息",
    tags: ["日常", "社交"]
  },
  {
    id: 'p308',
    english: "I am twenty years old.",
    chinese: "我二十岁了。",
    context: "个人信息",
    tags: ["日常", "数字"]
  },
  {
    id: 'p309',
    english: "Where are you from?",
    chinese: "你来自哪里？",
    context: "个人信息",
    tags: ["日常", "地理"]
  },
  {
    id: 'p310',
    english: "I'm from China.",
    chinese: "我来自中国。",
    context: "个人信息",
    tags: ["日常", "地理"]
  },
  {
    id: 'p311',
    english: "Do you speak English?",
    chinese: "你会说英语吗？",
    context: "语言",
    tags: ["日常", "语言学习"]
  },
  {
    id: 'p312',
    english: "Yes, I do.",
    chinese: "是的，我会。",
    context: "肯定回答",
    tags: ["日常", "基本回答"]
  },
  {
    id: 'p313',
    english: "No, I don't.",
    chinese: "不，我不会。",
    context: "否定回答",
    tags: ["日常", "基本回答"]
  },
  {
    id: 'p314',
    english: "I love learning English.",
    chinese: "我喜欢学英语。",
    context: "兴趣爱好",
    tags: ["日常", "学习"]
  },
  {
    id: 'p315',
    english: "What time is it?",
    chinese: "现在几点了？",
    context: "时间",
    tags: ["日常", "时间"]
  },
  {
    id: 'p316',
    english: "It's three o'clock.",
    chinese: "三点钟。",
    context: "时间",
    tags: ["日常", "时间"]
  },
  {
    id: 'p317',
    english: "Today is Monday.",
    chinese: "今天是星期一。",
    context: "日期",
    tags: ["日常", "时间"]
  },
  {
    id: 'p318',
    english: "Tomorrow is Tuesday.",
    chinese: "明天是星期二。",
    context: "日期",
    tags: ["日常", "时间"]
  },
  {
    id: 'p319',
    english: "Yesterday was Sunday.",
    chinese: "昨天是星期日。",
    context: "日期",
    tags: ["日常", "时间"]
  },
  {
    id: 'p320',
    english: "What day is it today?",
    chinese: "今天星期几？",
    context: "日期",
    tags: ["日常", "时间"]
  },
  {
    id: 'p321',
    english: "I get up at seven.",
    chinese: "我七点起床。",
    context: "日常生活",
    tags: ["日常", "作息"]
  },
  {
    id: 'p322',
    english: "I go to school.",
    chinese: "我去上学。",
    context: "日常生活",
    tags: ["日常", "作息"]
  },
  {
    id: 'p323',
    english: "I eat lunch at noon.",
    chinese: "我中午吃午饭。",
    context: "日常生活",
    tags: ["日常", "饮食"]
  },
  {
    id: 'p324',
    english: "I go home in the evening.",
    chinese: "我晚上回家。",
    context: "日常生活",
    tags: ["日常", "作息"]
  },
  {
    id: 'p325',
    english: "I go to bed at night.",
    chinese: "我晚上睡觉。",
    context: "日常生活",
    tags: ["日常", "作息"]
  },
  {
    id: 'p326',
    english: "I like apples.",
    chinese: "我喜欢苹果。",
    context: "喜好",
    tags: ["日常", "食物"]
  },
  {
    id: 'p327',
    english: "I don't like oranges.",
    chinese: "我不喜欢橙子。",
    context: "喜好",
    tags: ["日常", "食物"]
  },
  {
    id: 'p328',
    english: "What color is this?",
    chinese: "这是什么颜色？",
    context: "颜色",
    tags: ["日常", "描述"]
  },
  {
    id: 'p329',
    english: "This is red.",
    chinese: "这是红色。",
    context: "颜色",
    tags: ["日常", "描述"]
  },
  {
    id: 'p330',
    english: "This is big.",
    chinese: "这个很大。",
    context: "尺寸描述",
    tags: ["日常", "描述"]
  },
  {
    id: 'p331',
    english: "That is small.",
    chinese: "那个很小。",
    context: "尺寸描述",
    tags: ["日常", "描述"]
  },
  {
    id: 'p332',
    english: "This book is interesting.",
    chinese: "这本书很有趣。",
    context: "评价",
    tags: ["日常", "描述"]
  },
  {
    id: 'p333',
    english: "That movie was boring.",
    chinese: "那部电影很无聊。",
    context: "评价",
    tags: ["日常", "描述"]
  },
  {
    id: 'p334',
    english: "I am happy.",
    chinese: "我很开心。",
    context: "情感表达",
    tags: ["日常", "情绪"]
  },
  {
    id: 'p335',
    english: "She is sad.",
    chinese: "她很难过。",
    context: "情感表达",
    tags: ["日常", "情绪"]
  },
  {
    id: 'p336',
    english: "He is angry.",
    chinese: "他很生气。",
    context: "情感表达",
    tags: ["日常", "情绪"]
  },
  {
    id: 'p337',
    english: "We are excited.",
    chinese: "我们很兴奋。",
    context: "情感表达",
    tags: ["日常", "情绪"]
  },
  {
    id: 'p338',
    english: "They are tired.",
    chinese: "他们很累。",
    context: "情感表达",
    tags: ["日常", "情绪"]
  },
  {
    id: 'p339',
    english: "It is hot today.",
    chinese: "今天很热。",
    context: "天气",
    tags: ["日常", "天气"]
  },
  {
    id: 'p340',
    english: "It is cold outside.",
    chinese: "外面很冷。",
    context: "天气",
    tags: ["日常", "天气"]
  },
  {
    id: 'p341',
    english: "It is raining.",
    chinese: "在下雨。",
    context: "天气",
    tags: ["日常", "天气"]
  },
  {
    id: 'p342',
    english: "It is snowing.",
    chinese: "在下雪。",
    context: "天气",
    tags: ["日常", "天气"]
  },
  {
    id: 'p343',
    english: "It is sunny.",
    chinese: "天气晴朗。",
    context: "天气",
    tags: ["日常", "天气"]
  },
  {
    id: 'p344',
    english: "I have a dog.",
    chinese: "我有一只狗。",
    context: "宠物",
    tags: ["日常", "动物"]
  },
  {
    id: 'p345',
    english: "She has a cat.",
    chinese: "她有一只猫。",
    context: "宠物",
    tags: ["日常", "动物"]
  },
  {
    id: 'p346',
    english: "He has a bird.",
    chinese: "他有一只鸟。",
    context: "宠物",
    tags: ["日常", "动物"]
  },
  {
    id: 'p347',
    english: "We have a car.",
    chinese: "我们有一辆车。",
    context: "物品拥有",
    tags: ["日常", "交通工具"]
  },
  {
    id: 'p348',
    english: "They have a house.",
    chinese: "他们有一栋房子。",
    context: "物品拥有",
    tags: ["日常", "住所"]
  },
  {
    id: 'p349',
    english: "I can swim.",
    chinese: "我会游泳。",
    context: "能力表达",
    tags: ["日常", "运动"]
  },
  {
    id: 'p350',
    english: "She can dance.",
    chinese: "她会跳舞。",
    context: "能力表达",
    tags: ["日常", "艺术"]
  },
  {
    id: 'p351',
    english: "He can sing.",
    chinese: "他会唱歌。",
    context: "能力表达",
    tags: ["日常", "音乐"]
  },
  {
    id: 'p352',
    english: "We can cook.",
    chinese: "我们会做饭。",
    context: "能力表达",
    tags: ["日常", "烹饪"]
  },
  {
    id: 'p353',
    english: "They can draw.",
    chinese: "他们会画画。",
    context: "能力表达",
    tags: ["日常", "艺术"]
  },
  {
    id: 'p354',
    english: "I want to eat.",
    chinese: "我想吃东西。",
    context: "愿望表达",
    tags: ["日常", "饮食"]
  },
  {
    id: 'p355',
    english: "She wants to drink.",
    chinese: "她想喝水。",
    context: "愿望表达",
    tags: ["日常", "饮食"]
  },
  {
    id: 'p356',
    english: "He needs to rest.",
    chinese: "他需要休息。",
    context: "需求表达",
    tags: ["日常", "健康"]
  },
  {
    id: 'p357',
    english: "We need to study.",
    chinese: "我们需要学习。",
    context: "需求表达",
    tags: ["日常", "学习"]
  },
  {
    id: 'p358',
    english: "They need help.",
    chinese: "他们需要帮助。",
    context: "需求表达",
    tags: ["日常", "社交"]
  },
  {
    id: 'p359',
    english: "Let's go shopping.",
    chinese: "我们去购物吧。",
    context: "提议",
    tags: ["日常", "购物"]
  },
  {
    id: 'p360',
    english: "Shall we go home?",
    chinese: "我们回家好吗？",
    context: "提议",
    tags: ["日常", "出行"]
  },
  {
    id: 'p361',
    english: "Thank you very much.",
    chinese: "非常感谢。",
    context: "感谢",
    tags: ["日常", "礼貌"]
  },
  {
    id: 'p362',
    english: "You're welcome.",
    chinese: "不客气。",
    context: "回应感谢",
    tags: ["日常", "礼貌"]
  },
  {
    id: 'p363',
    english: "I'm sorry.",
    chinese: "对不起。",
    context: "道歉",
    tags: ["日常", "礼貌"]
  },
  {
    id: 'p364',
    english: "That's okay.",
    chinese: "没关系。",
    context: "回应道歉",
    tags: ["日常", "礼貌"]
  },
  {
    id: 'p365',
    english: "Excuse me.",
    chinese: "打扰一下。",
    context: "礼貌用语",
    tags: ["日常", "礼貌"]
  },
  {
    id: 'p366',
    english: "Yes, please.",
    chinese: "好的，请。",
    context: "接受请求",
    tags: ["日常", "礼貌"]
  },
  {
    id: 'p367',
    english: "No, thank you.",
    chinese: "不，谢谢。",
    context: "拒绝请求",
    tags: ["日常", "礼貌"]
  },
  {
    id: 'p368',
    english: "How much is this?",
    chinese: "这个多少钱？",
    context: "购物询问",
    tags: ["日常", "购物"]
  },
  {
    id: 'p369',
    english: "It's ten dollars.",
    chinese: "十美元。",
    context: "价格说明",
    tags: ["日常", "购物"]
  },
  {
    id: 'p370',
    english: "That's too expensive.",
    chinese: "那太贵了。",
    context: "价格评价",
    tags: ["日常", "购物"]
  },
  {
    id: 'p371',
    english: "Can I help you?",
    chinese: "我能帮你吗？",
    context: "提供帮助",
    tags: ["日常", "服务"]
  },
  {
    id: 'p372',
    english: "I need help.",
    chinese: "我需要帮助。",
    context: "求助",
    tags: ["日常", "服务"]
  },
  {
    id: 'p373',
    english: "Where is the bathroom?",
    chinese: "洗手间在哪里？",
    context: "询问位置",
    tags: ["日常", "场所"]
  },
  {
    id: 'p374',
    english: "Turn left.",
    chinese: "向左转。",
    context: "指路",
    tags: ["日常", "方向"]
  },
  {
    id: 'p375',
    english: "Turn right.",
    chinese: "向右转。",
    context: "指路",
    tags: ["日常", "方向"]
  },
  {
    id: 'p376',
    english: "Go straight.",
    chinese: "直走。",
    context: "指路",
    tags: ["日常", "方向"]
  },
  {
    id: 'p377',
    english: "Stop here.",
    chinese: "在这里停下。",
    context: "指令",
    tags: ["日常", "方向"]
  },
  {
    id: 'p378',
    english: "Wait a minute.",
    chinese: "等一下。",
    context: "请求等待",
    tags: ["日常", "时间"]
  },
  {
    id: 'p379',
    english: "Come here.",
    chinese: "过来这里。",
    context: "召唤",
    tags: ["日常", "动作"]
  },
  {
    id: 'p380',
    english: "Sit down.",
    chinese: "坐下。",
    context: "指令",
    tags: ["日常", "动作"]
  },
  {
    id: 'p381',
    english: "Stand up.",
    chinese: "站起来。",
    context: "指令",
    tags: ["日常", "动作"]
  },
  {
    id: 'p382',
    english: "Listen carefully.",
    chinese: "仔细听。",
    context: "提醒",
    tags: ["日常", "学习"]
  },
  {
    id: 'p383',
    english: "Repeat after me.",
    chinese: "跟我读。",
    context: "教学",
    tags: ["日常", "学习"]
  },
  {
    id: 'p384',
    english: "Try again.",
    chinese: "再试一次。",
    context: "鼓励",
    tags: ["日常", "学习"]
  },
  {
    id: 'p385',
    english: "Well done!",
    chinese: "做得好！",
    context: "表扬",
    tags: ["日常", "学习"]
  },
  {
    id: 'p386',
    english: "Good job!",
    chinese: "干得好！",
    context: "表扬",
    tags: ["日常", "学习"]
  },
  {
    id: 'p387',
    english: "Congratulations!",
    chinese: "恭喜！",
    context: "祝贺",
    tags: ["日常", "庆祝"]
  },
  {
    id: 'p388',
    english: "Happy birthday!",
    chinese: "生日快乐！",
    context: "祝福",
    tags: ["日常", "庆祝"]
  },
  {
    id: 'p389',
    english: "Merry Christmas!",
    chinese: "圣诞快乐！",
    context: "节日祝福",
    tags: ["日常", "节日"]
  },
  {
    id: 'p390',
    english: "Happy New Year!",
    chinese: "新年快乐！",
    context: "节日祝福",
    tags: ["日常", "节日"]
  },
  {
    id: 'p391',
    english: "I love you.",
    chinese: "我爱你。",
    context: "情感表达",
    tags: ["日常", "家庭"]
  },
  {
    id: 'p392',
    english: "I miss you.",
    chinese: "我想念你。",
    context: "情感表达",
    tags: ["日常", "家庭"]
  },
  {
    id: 'p393',
    english: "Call me later.",
    chinese: "稍后给我打电话。",
    context: "约定",
    tags: ["日常", "通讯"]
  },
  {
    id: 'p394',
    english: "Send me a message.",
    chinese: "给我发个消息。",
    context: "约定",
    tags: ["日常", "通讯"]
  },
  {
    id: 'p395',
    english: "See you tomorrow.",
    chinese: "明天见。",
    context: "告别",
    tags: ["日常", "社交"]
  },
  {
    id: 'p396',
    english: "Goodbye!",
    chinese: "再见！",
    context: "告别",
    tags: ["日常", "社交"]
  },
  {
    id: 'p397',
    english: "Have a nice day!",
    chinese: "祝你今天愉快！",
    context: "祝福",
    tags: ["日常", "社交"]
  },
  {
    id: 'p398',
    english: "Sweet dreams!",
    chinese: "做个好梦！",
    context: "祝福",
    tags: ["日常", "睡眠"]
  },
  {
    id: 'p399',
    english: "Get well soon!",
    chinese: "早日康复！",
    context: "祝福",
    tags: ["日常", "健康"]
  },
  {
    id: 'p400',
    english: "Good luck!",
    chinese: "祝你好运！",
    context: "祝福",
    tags: ["日常", "鼓励"]
  },
  {
    id: 'p401',
    english: "I need to wake up at 6 AM.",
    chinese: "我需要早上6点起床。",
    context: "早晨 routine",
    tags: ["日常生活", "作息"]
  },
  {
    id: 'p402',
    english: "What should I wear today?",
    chinese: "今天我应该穿什么？",
    context: "早晨 routine",
    tags: ["日常生活", "服装"]
  },
  {
    id: 'p403',
    english: "Don't forget to brush your teeth.",
    chinese: "别忘了刷牙。",
    context: "早晨 routine",
    tags: ["日常生活", "卫生"]
  },
  {
    id: 'p404',
    english: "I'm going to take a shower.",
    chinese: "我要去洗澡。",
    context: "早晨 routine",
    tags: ["日常生活", "卫生"]
  },
  {
    id: 'p405',
    english: "Have you had breakfast yet?",
    chinese: "你吃早餐了吗？",
    context: "早晨 routine",
    tags: ["日常生活", "饮食"]
  },
  {
    id: 'p406',
    english: "I'm leaving for work now.",
    chinese: "我现在要去上班了。",
    context: "上班",
    tags: ["工作", "出行"]
  },
  {
    id: 'p407',
    english: "What time do you finish work?",
    chinese: "你什么时候下班？",
    context: "上班",
    tags: ["工作", "时间"]
  },
  {
    id: 'p408',
    english: "I have a meeting at 10 o'clock.",
    chinese: "我10点钟有个会议。",
    context: "上班",
    tags: ["工作", "会议"]
  },
  {
    id: 'p409',
    english: "Can I take a lunch break?",
    chinese: "我可以午休一下吗？",
    context: "上班",
    tags: ["工作", "休息"]
  },
  {
    id: 'p410',
    english: "I need to print this document.",
    chinese: "我需要打印这份文件。",
    context: "上班",
    tags: ["工作", "办公"]
  },
  {
    id: 'p411',
    english: "Can you send me that report?",
    chinese: "你能把那份报告发给我吗？",
    context: "上班",
    tags: ["工作", "沟通"]
  },
  {
    id: 'p412',
    english: "I'm working from home today.",
    chinese: "我今天在家办公。",
    context: "上班",
    tags: ["工作", "远程办公"]
  },
  {
    id: 'p413',
    english: "I have too much work to do.",
    chinese: "我有太多工作要做。",
    context: "上班",
    tags: ["工作", "压力"]
  },
  {
    id: 'p414',
    english: "Let's have a coffee break.",
    chinese: "我们喝杯咖啡休息一下吧。",
    context: "上班",
    tags: ["工作", "休息"]
  },
  {
    id: 'p415',
    english: "I'm going to the office.",
    chinese: "我要去办公室。",
    context: "上班",
    tags: ["工作", "出行"]
  },
  {
    id: 'p416',
    english: "I need to catch the bus.",
    chinese: "我需要赶公交车。",
    context: "通勤",
    tags: ["交通", "出行"]
  },
  {
    id: 'p417',
    english: "The traffic is really heavy today.",
    chinese: "今天交通很拥堵。",
    context: "通勤",
    tags: ["交通", "路况"]
  },
  {
    id: 'p418',
    english: "How long does it take to get there?",
    chinese: "到那里需要多长时间？",
    context: "通勤",
    tags: ["交通", "时间"]
  },
  {
    id: 'p419',
    english: "I usually walk to work.",
    chinese: "我通常走路去上班。",
    context: "通勤",
    tags: ["交通", "出行"]
  },
  {
    id: 'p420',
    english: "The subway is delayed.",
    chinese: "地铁延误了。",
    context: "通勤",
    tags: ["交通", "问题"]
  },
  {
    id: 'p421',
    english: "I'm going to be late.",
    chinese: "我要迟到了。",
    context: "通勤",
    tags: ["交通", "时间"]
  },
  {
    id: 'p422',
    english: "Can you give me a ride?",
    chinese: "你能载我一程吗？",
    context: "通勤",
    tags: ["交通", "请求"]
  },
  {
    id: 'p423',
    english: "I need to refill my gas tank.",
    chinese: "我需要加油。",
    context: "通勤",
    tags: ["交通", "汽车"]
  },
  {
    id: 'p424',
    english: "Where is the nearest parking lot?",
    chinese: "最近的停车场在哪里？",
    context: "通勤",
    tags: ["交通", "停车"]
  },
  {
    id: 'p425',
    english: "I have a doctor's appointment.",
    chinese: "我有个医生预约。",
    context: "日常安排",
    tags: ["健康", "预约"]
  },
  {
    id: 'p426',
    english: "I need to go grocery shopping.",
    chinese: "我需要去买 groceries。",
    context: "日常安排",
    tags: ["购物", "生活"]
  },
  {
    id: 'p427',
    english: "Let's make a shopping list.",
    chinese: "我们列个购物清单吧。",
    context: "日常安排",
    tags: ["购物", "计划"]
  },
  {
    id: 'p428',
    english: "I have to pick up my prescription.",
    chinese: "我得去取处方药。",
    context: "日常安排",
    tags: ["健康", "药物"]
  },
  {
    id: 'p429',
    english: "I'm going to the bank.",
    chinese: "我要去银行。",
    context: "日常安排",
    tags: ["金融", "办事"]
  },
  {
    id: 'p430',
    english: "I need to clean the house.",
    chinese: "我需要打扫房子。",
    context: "家务",
    tags: ["居家", "清洁"]
  },
  {
    id: 'p431',
    english: "When is the garbage collection day?",
    chinese: "垃圾收集日是哪天？",
    context: "家务",
    tags: ["居家", "生活"]
  },
  {
    id: 'p432',
    english: "I need to do the laundry.",
    chinese: "我需要洗衣服。",
    context: "家务",
    tags: ["居家", "清洁"]
  },
  {
    id: 'p433',
    english: "The dishwasher is broken.",
    chinese: "洗碗机坏了。",
    context: "家务",
    tags: ["居家", "问题"]
  },
  {
    id: 'p434',
    english: "I'm cooking dinner tonight.",
    chinese: "我今晚要做晚饭。",
    context: "家务",
    tags: ["居家", "饮食"]
  },
  {
    id: 'p435',
    english: "I'm going to the gym.",
    chinese: "我要去健身房。",
    context: "休闲活动",
    tags: ["健身", "健康"]
  },
  {
    id: 'p436',
    english: "Do you want to watch a movie?",
    chinese: "你想看电影吗？",
    context: "休闲活动",
    tags: ["娱乐", "休闲"]
  },
  {
    id: 'p437',
    english: "I enjoy reading books.",
    chinese: "我喜欢读书。",
    context: "休闲活动",
    tags: ["爱好", "阅读"]
  },
  {
    id: 'p438',
    english: "Let's go for a walk.",
    chinese: "我们去散步吧。",
    context: "休闲活动",
    tags: ["户外", "健康"]
  },
  {
    id: 'p439',
    english: "I'm meeting friends for dinner.",
    chinese: "我和朋友们约了晚饭。",
    context: "社交活动",
    tags: ["社交", "饮食"]
  },
  {
    id: 'p440',
    english: "Can you come to my party?",
    chinese: "你能来参加我的聚会吗？",
    context: "社交活动",
    tags: ["社交", "邀请"]
  },
  {
    id: 'p441',
    english: "I'm going to a concert.",
    chinese: "我要去看音乐会。",
    context: "娱乐活动",
    tags: ["娱乐", "音乐"]
  },
  {
    id: 'p442',
    english: "The museum is closed on Mondays.",
    chinese: "博物馆周一闭馆。",
    context: "娱乐活动",
    tags: ["娱乐", "文化"]
  },
  {
    id: 'p443',
    english: "I'd like to visit the zoo.",
    chinese: "我想去动物园参观。",
    context: "娱乐活动",
    tags: ["娱乐", "旅游"]
  },
  {
    id: 'p444',
    english: "Let's go to the beach.",
    chinese: "我们去海滩吧。",
    context: "娱乐活动",
    tags: ["娱乐", "户外"]
  },
  {
    id: 'p445',
    english: "I'm going on vacation next week.",
    chinese: "我下周要去度假。",
    context: "旅游",
    tags: ["旅游", "计划"]
  },
  {
    id: 'p446',
    english: "I need to pack my suitcase.",
    chinese: "我需要收拾行李箱。",
    context: "旅游",
    tags: ["旅游", "准备"]
  },
  {
    id: 'p447',
    english: "What's the weather forecast?",
    chinese: "天气预报怎么说？",
    context: "旅游",
    tags: ["旅游", "天气"]
  },
  {
    id: 'p448',
    english: "I'm looking for a hotel.",
    chinese: "我在找酒店。",
    context: "旅游",
    tags: ["旅游", "住宿"]
  },
  {
    id: 'p449',
    english: "How do I get to the city center?",
    chinese: "我怎样去市中心？",
    context: "旅游",
    tags: ["旅游", "交通"]
  },
  {
    id: 'p450',
    english: "I'd like to rent a car.",
    chinese: "我想租一辆车。",
    context: "旅游",
    tags: ["旅游", "交通"]
  },
  {
    id: 'p451',
    english: "Where can I exchange currency?",
    chinese: "我在哪里可以换汇？",
    context: "旅游",
    tags: ["旅游", "金融"]
  },
  {
    id: 'p452',
    english: "I lost my passport.",
    chinese: "我丢了护照。",
    context: "旅游",
    tags: ["旅游", "问题"]
  },
  {
    id: 'p453',
    english: "Can you recommend a good restaurant?",
    chinese: "你能推荐一家好餐厅吗？",
    context: "旅游",
    tags: ["旅游", "饮食"]
  },
  {
    id: 'p454',
    english: "I'm going to the tourist information center.",
    chinese: "我要去游客信息中心。",
    context: "旅游",
    tags: ["旅游", "信息"]
  },
  {
    id: 'p455',
    english: "I want to buy a souvenir.",
    chinese: "我想买纪念品。",
    context: "旅游",
    tags: ["旅游", "购物"]
  },
  {
    id: 'p456',
    english: "What time does the museum open?",
    chinese: "博物馆几点开门？",
    context: "旅游",
    tags: ["旅游", "文化"]
  },
  {
    id: 'p457',
    english: "I'm taking photos of the scenery.",
    chinese: "我在拍摄风景照片。",
    context: "旅游",
    tags: ["旅游", "摄影"]
  },
  {
    id: 'p458',
    english: "I need travel insurance.",
    chinese: "我需要旅游保险。",
    context: "旅游",
    tags: ["旅游", "保险"]
  },
  {
    id: 'p459',
    english: "I'm going to catch a flight.",
    chinese: "我要去赶航班。",
    context: "旅游",
    tags: ["旅游", "交通"]
  },
  {
    id: 'p460',
    english: "My luggage is overweight.",
    chinese: "我的行李超重了。",
    context: "旅游",
    tags: ["旅游", "问题"]
  },
  {
    id: 'p461',
    english: "I'm going to school.",
    chinese: "我要去学校。",
    context: "上学",
    tags: ["学习", "出行"]
  },
  {
    id: 'p462',
    english: "I have an exam tomorrow.",
    chinese: "我明天有考试。",
    context: "上学",
    tags: ["学习", "考试"]
  },
  {
    id: 'p463',
    english: "I need to study for my test.",
    chinese: "我需要为考试复习。",
    context: "上学",
    tags: ["学习", "复习"]
  },
  {
    id: 'p464',
    english: "Can I borrow your notes?",
    chinese: "我能借你的笔记吗？",
    context: "上学",
    tags: ["学习", "互助"]
  },
  {
    id: 'p465',
    english: "I forgot my homework at home.",
    chinese: "我把作业忘在家里了。",
    context: "上学",
    tags: ["学习", "问题"]
  },
  {
    id: 'p466',
    english: "The class starts at 9 AM.",
    chinese: "课程9点开始。",
    context: "上学",
    tags: ["学习", "时间"]
  },
  {
    id: 'p467',
    english: "I'm going to the library.",
    chinese: "我要去图书馆。",
    context: "学习",
    tags: ["学习", "场所"]
  },
  {
    id: 'p468',
    english: "I need to write a research paper.",
    chinese: "我需要写一篇研究论文。",
    context: "学习",
    tags: ["学习", "写作"]
  },
  {
    id: 'p469',
    english: "Can you help me with this problem?",
    chinese: "你能帮我解决这个问题吗？",
    context: "学习",
    tags: ["学习", "求助"]
  },
  {
    id: 'p470',
    english: "I'm graduating next year.",
    chinese: "我明年毕业。",
    context: "学习",
    tags: ["学习", "成就"]
  },
  {
    id: 'p471',
    english: "I'm going to the supermarket.",
    chinese: "我要去超市。",
    context: "购物",
    tags: ["购物", "出行"]
  },
  {
    id: 'p472',
    english: "This item is on sale.",
    chinese: "这个商品在打折。",
    context: "购物",
    tags: ["购物", "价格"]
  },
  {
    id: 'p473',
    english: "Do you accept credit cards?",
    chinese: "你们接受信用卡吗？",
    context: "购物",
    tags: ["购物", "支付"]
  },
  {
    id: 'p474',
    english: "I'd like to return this item.",
    chinese: "我想退货。",
    context: "购物",
    tags: ["购物", "售后"]
  },
  {
    id: 'p475',
    english: "Where is the fitting room?",
    chinese: "试衣间在哪里？",
    context: "购物",
    tags: ["购物", "服装"]
  },
  {
    id: 'p476',
    english: "I'm looking for size medium.",
    chinese: "我在找中号。",
    context: "购物",
    tags: ["购物", "服装"]
  },
  {
    id: 'p477',
    english: "This is too expensive for me.",
    chinese: "这对我来说太贵了。",
    context: "购物",
    tags: ["购物", "价格"]
  },
  {
    id: 'p478',
    english: "Can I get a discount?",
    chinese: "我能打折吗？",
    context: "购物",
    tags: ["购物", "价格"]
  },
  {
    id: 'p479',
    english: "I'd like to speak to the manager.",
    chinese: "我想和经理说话。",
    context: "购物",
    tags: ["购物", "服务"]
  },
  {
    id: 'p480',
    english: "Do you have this in another color?",
    chinese: "你们有其他颜色的吗？",
    context: "购物",
    tags: ["购物", "商品"]
  },
  {
    id: 'p481',
    english: "I'm going to the pharmacy.",
    chinese: "我要去药店。",
    context: "健康",
    tags: ["健康", "出行"]
  },
  {
    id: 'p482',
    english: "I have a headache.",
    chinese: "我头疼。",
    context: "健康",
    tags: ["健康", "症状"]
  },
  {
    id: 'p483',
    english: "I need to see a doctor.",
    chinese: "我需要看医生。",
    context: "健康",
    tags: ["健康", "就医"]
  },
  {
    id: 'p484',
    english: "What medicine should I take?",
    chinese: "我应该吃什么药？",
    context: "健康",
    tags: ["健康", "治疗"]
  },
  {
    id: 'p485',
    english: "I have an allergy.",
    chinese: "我有过敏症。",
    context: "健康",
    tags: ["健康", "病症"]
  },
  {
    id: 'p486',
    english: "I'm not feeling well.",
    chinese: "我不太舒服。",
    context: "健康",
    tags: ["健康", "症状"]
  },
  {
    id: 'p487',
    english: "I need to make an appointment.",
    chinese: "我需要预约。",
    context: "健康",
    tags: ["健康", "就医"]
  },
  {
    id: 'p488',
    english: "The hospital is nearby.",
    chinese: "医院就在附近。",
    context: "健康",
    tags: ["健康", "位置"]
  },
  {
    id: 'p489',
    english: "I have health insurance.",
    chinese: "我有医疗保险。",
    context: "健康",
    tags: ["健康", "保险"]
  },
  {
    id: 'p490',
    english: "I need to get a vaccination.",
    chinese: "我需要接种疫苗。",
    context: "健康",
    tags: ["健康", "预防"]
  },
  {
    id: 'p491',
    english: "I'm going to the post office.",
    chinese: "我要去邮局。",
    context: "办事",
    tags: ["邮政", "出行"]
  },
  {
    id: 'p492',
    english: "I need to send a package.",
    chinese: "我需要寄包裹。",
    context: "办事",
    tags: ["邮政", "服务"]
  },
  {
    id: 'p493',
    english: "How much is the postage?",
    chinese: "邮费多少钱？",
    context: "办事",
    tags: ["邮政", "费用"]
  },
  {
    id: 'p494',
    english: "I want to buy stamps.",
    chinese: "我想买邮票。",
    context: "办事",
    tags: ["邮政", "购买"]
  },
  {
    id: 'p495',
    english: "Where is the nearest ATM?",
    chinese: "最近的ATM在哪里？",
    context: "办事",
    tags: ["金融", "银行"]
  },
  {
    id: 'p496',
    english: "I need to withdraw cash.",
    chinese: "我需要取现金。",
    context: "办事",
    tags: ["金融", "银行"]
  },
  {
    id: 'p497',
    english: "My card is not working.",
    chinese: "我的卡不能用了。",
    context: "办事",
    tags: ["金融", "问题"]
  },
  {
    id: 'p498',
    english: "I'd like to open an account.",
    chinese: "我想开户。",
    context: "办事",
    tags: ["金融", "银行"]
  },
  {
    id: 'p499',
    english: "I need to pay my bills.",
    chinese: "我需要付账单。",
    context: "办事",
    tags: ["金融", "支付"]
  },
  {
    id: 'p500',
    english: "Can I change money here?",
    chinese: "我可以在这里换钱吗？",
    context: "办事",
    tags: ["金融", "外汇"]
  },
  {
    id: 'ws1',
    english: "Could you please help me?",
    chinese: "你能帮我一下吗？",
    context: "工作请求帮助",
    tags: ["日常", "工作"]
  },
  {
    id: 'ws2',
    english: "When is the deadline?",
    chinese: "截止日期是什么时候？",
    context: "工作时间安排",
    tags: ["工作", "时间"]
  },
  {
    id: 'ws3',
    english: "I need more time.",
    chinese: "我需要更多时间。",
    context: "工作延期请求",
    tags: ["工作", "时间"]
  },
  {
    id: 'ws4',
    english: "Let's schedule a meeting.",
    chinese: "我们来安排个会议。",
    context: "工作安排",
    tags: ["工作", "会议"]
  },
  {
    id: 'ws5',
    english: "I'll get back to you.",
    chinese: "我会回复你。",
    context: "工作沟通",
    tags: ["工作", "沟通"]
  },
  {
    id: 'ws6',
    english: "Could you clarify that?",
    chinese: "你能澄清一下吗？",
    context: "工作请求澄清",
    tags: ["工作", "沟通"]
  },
  {
    id: 'ws7',
    english: "What's your opinion?",
    chinese: "你的意见是什么？",
    context: "工作征求意见",
    tags: ["工作", "沟通"]
  },
  {
    id: 'ws8',
    english: "Let's brainstorm some ideas.",
    chinese: "我们来头脑风暴一下。",
    context: "工作讨论",
    tags: ["工作", "讨论"]
  },
  {
    id: 'ws9',
    english: "I agree with you.",
    chinese: "我同意你的观点。",
    context: "工作表达赞同",
    tags: ["工作", "沟通"]
  },
  {
    id: 'ws10',
    english: "That's a good point.",
    chinese: "说得好。",
    context: "工作表达认同",
    tags: ["工作", "沟通"]
  },

  // === 餐厅用餐句子 ===
  {
    id: 'rs1',
    english: "Table for two, please.",
    chinese: "两人桌，谢谢。",
    context: "餐厅点餐",
    tags: ["用餐", "社交"]
  },
  {
    id: 'rs2',
    english: "Could I see the menu?",
    chinese: "我能看看菜单吗？",
    context: "餐厅点餐",
    tags: ["用餐", "服务"]
  },
  {
    id: 'rs3',
    english: "I'd like to order.",
    chinese: "我想点餐。",
    context: "餐厅点餐",
    tags: ["用餐", "服务"]
  },
  {
    id: 'rs4',
    english: "What do you recommend?",
    chinese: "你推荐什么？",
    context: "餐厅点餐",
    tags: ["用餐", "服务"]
  },
  {
    id: 'rs5',
    english: "Could I have the bill?",
    chinese: "可以结账吗？",
    context: "餐厅结账",
    tags: ["用餐", "支付"]
  },
  {
    id: 'rs6',
    english: "Is service included?",
    chinese: "服务费包含在内吗？",
    context: "餐厅结账",
    tags: ["用餐", "支付"]
  },
  {
    id: 'rs7',
    english: "Keep the change.",
    chinese: "不用找零了。",
    context: "餐厅结账",
    tags: ["用餐", "支付"]
  },
  {
    id: 'rs8',
    english: "This is delicious!",
    chinese: "这个很好吃！",
    context: "餐厅用餐体验",
    tags: ["用餐", "社交"]
  },
  {
    id: 'rs9',
    english: "Could I have some water?",
    chinese: "能给我些水吗？",
    context: "餐厅用餐",
    tags: ["用餐", "服务"]
  },
  {
    id: 'rs10',
    english: "I'm allergic to peanuts.",
    chinese: "我对花生过敏。",
    context: "餐厅用餐",
    tags: ["用餐", "健康"]
  },

  // === 旅游常用句子 ===
  {
    id: 'ts1',
    english: "Where is the restroom?",
    chinese: "洗手间在哪里？",
    context: "旅游出行",
    tags: ["旅行", "场所"]
  },
  {
    id: 'ts2',
    english: "How much does it cost?",
    chinese: "这个多少钱？",
    context: "旅游购物",
    tags: ["旅行", "购物"]
  },
  {
    id: 'ts3',
    english: "Do you speak English?",
    chinese: "你会说英语吗？",
    context: "旅游交流",
    tags: ["旅行", "沟通"]
  },
  {
    id: 'ts4',
    english: "I'm lost.",
    chinese: "我迷路了。",
    context: "旅游求助",
    tags: ["旅行", "帮助"]
  },
  {
    id: 'ts5',
    english: "Could you take a photo?",
    chinese: "你能帮我拍照吗？",
    context: "旅游拍照",
    tags: ["旅行", "社交"]
  },
  {
    id: 'ts6',
    english: "Where can I buy a ticket?",
    chinese: "我在哪里能买票？",
    context: "旅游购票",
    tags: ["旅行", "交通"]
  },
  {
    id: 'ts7',
    english: "What time does it open?",
    chinese: "它什么时候开门？",
    context: "旅游咨询",
    tags: ["旅行", "时间"]
  },
  {
    id: 'ts8',
    english: "Is there a discount?",
    chinese: "有折扣吗？",
    context: "旅游购物",
    tags: ["旅行", "购物"]
  },
  {
    id: 'ts9',
    english: "Can I pay by credit card?",
    chinese: "我能用信用卡支付吗？",
    context: "旅游支付",
    tags: ["旅行", "支付"]
  },
  {
    id: 'ts10',
    english: "I'd like a refund.",
    chinese: "我想退款。",
    context: "旅游退款",
    tags: ["旅行", "服务"]
  },
  {
    id: 'ph1',
    english: "Take care",
    chinese: "保重",
    context: "告别用语",
    tags: ["日常", "社交"]
  },
  {
    id: 'ph2',
    english: "Never mind",
    chinese: "没关系",
    context: "安慰用语",
    tags: ["日常", "礼貌"]
  },
  {
    id: 'ph3',
    english: "Of course",
    chinese: "当然",
    context: "同意用语",
    tags: ["日常", "礼貌"]
  },
  {
    id: 'ph4',
    english: "No way",
    chinese: "不可能",
    context: "拒绝用语",
    tags: ["日常", "表达意见"]
  },
  {
    id: 'ph5',
    english: "By the way",
    chinese: "顺便说",
    context: "补充信息",
    tags: ["日常", "沟通"]
  },
  {
    id: 'ph6',
    english: "In fact",
    chinese: "事实上",
    context: "表达事实",
    tags: ["日常", "表达意见"]
  },
  {
    id: 'ph7',
    english: "As well",
    chinese: "也",
    context: "附加说明",
    tags: ["日常", "表达意见"]
  },
  {
    id: 'ph8',
    english: "At least",
    chinese: "至少",
    context: "程度说明",
    tags: ["日常", "表达意见"]
  },
  {
    id: 'ph9',
    english: "At most",
    chinese: "最多",
    context: "程度说明",
    tags: ["日常", "表达意见"]
  },
  {
    id: 'ph10',
    english: "For example",
    chinese: "例如",
    context: "举例说明",
    tags: ["日常", "表达意见"]
  },

  // === 日常实用句子 ===
  {
    id: 'se1',
    english: "How are you doing?",
    chinese: "你最近怎么样？",
    context: "问候",
    tags: ["日常", "社交"]
  },
  {
    id: 'se2',
    english: "What do you think?",
    chinese: "你觉得怎么样？",
    context: "征求意见",
    tags: ["日常", "沟通"]
  },
  {
    id: 'se3',
    english: "I don't think so.",
    chinese: "我不这么认为。",
    context: "表达意见",
    tags: ["日常", "沟通"]
  },
  {
    id: 'se4',
    english: "That sounds good.",
    chinese: "听起来不错。",
    context: "表达认同",
    tags: ["日常", "沟通"]
  },
  {
    id: 'se5',
    english: "Let me think about it.",
    chinese: "让我考虑一下。",
    context: "表达犹豫",
    tags: ["日常", "沟通"]
  },
  {
    id: 'se6',
    english: "I'm looking forward to it.",
    chinese: "我很期待。",
    context: "表达期待",
    tags: ["日常", "情感"]
  },
  {
    id: 'se7',
    english: "It depends on the situation.",
    chinese: "看情况。",
    context: "表达不确定",
    tags: ["日常", "沟通"]
  },
  {
    id: 'se8',
    english: "I have no idea.",
    chinese: "我不知道。",
    context: "表达不知情",
    tags: ["日常", "沟通"]
  },
  {
    id: 'se9',
    english: "That makes sense.",
    chinese: "有道理。",
    context: "表达认同",
    tags: ["日常", "沟通"]
  },
  {
    id: 'se10',
    english: "Let's give it a try.",
    chinese: "让我们试试看。",
    context: "表达尝试意愿",
    tags: ["日常", "沟通"]
  },

  // === 表达理解/困惑 ===
  {
    id: 'ph301',
    english: "What do you mean?",
    chinese: "你是什么意思？",
    context: "表达困惑",
    tags: ["日常", "沟通"]
  },
  {
    id: 'ph302',
    english: "I don't understand",
    chinese: "我不明白",
    context: "表达困惑",
    tags: ["日常", "沟通"]
  },
  {
    id: 'ph303',
    english: "Could you explain that?",
    chinese: "你能解释一下吗？",
    context: "请求解释",
    tags: ["日常", "沟通"]
  },
  {
    id: 'ph304',
    english: "What are you talking about?",
    chinese: "你在说什么？",
    context: "表达困惑",
    tags: ["日常", "沟通"]
  },
  {
    id: 'ph305',
    english: "Are you serious?",
    chinese: "你是认真的吗？",
    context: "表达惊讶",
    tags: ["日常", "情感"]
  },
  {
    id: 'ph306',
    english: "You're kidding",
    chinese: "你在开玩笑",
    context: "表达惊讶",
    tags: ["日常", "情感"]
  },
  {
    id: 'ph307',
    english: "No way",
    chinese: "不可能",
    context: "表达惊讶",
    tags: ["日常", "情感"]
  },
  {
    id: 'ph308',
    english: "You must be joking",
    chinese: "你一定是在开玩笑",
    context: "表达惊讶",
    tags: ["日常", "情感"]
  },
  {
    id: 'ph309',
    english: "I can't believe it",
    chinese: "我无法相信",
    context: "表达惊讶",
    tags: ["日常", "情感"]
  },
  {
    id: 'ph310',
    english: "Unbelievable",
    chinese: "难以置信",
    context: "表达惊讶",
    tags: ["日常", "情感"]
  },

  // === 让对方做决定 ===
  {
    id: 'ph311',
    english: "It's up to you",
    chinese: "由你决定",
    context: "让对方决定",
    tags: ["日常", "沟通"]
  },
  {
    id: 'ph312',
    english: "It's your call",
    chinese: "你说了算",
    context: "让对方决定",
    tags: ["日常", "沟通"]
  },
  {
    id: 'ph313',
    english: "I'll leave it up to you",
    chinese: "我让你决定",
    context: "让对方决定",
    tags: ["日常", "沟通"]
  },
  {
    id: 'ph314',
    english: "You decide",
    chinese: "你决定",
    context: "让对方决定",
    tags: ["日常", "沟通"]
  },
  {
    id: 'ph315',
    english: "Whatever you think is best",
    chinese: "你觉得最好的就行",
    context: "让对方决定",
    tags: ["日常", "沟通"]
  },
  {
    id: 'ph316',
    english: "I'm easy",
    chinese: "我随便",
    context: "表达无特定偏好",
    tags: ["日常", "沟通"]
  },
  {
    id: 'ph317',
    english: "I don't mind",
    chinese: "我不介意",
    context: "表达无特定偏好",
    tags: ["日常", "沟通"]
  },
  {
    id: 'ph318',
    english: "Anything is fine",
    chinese: "什么都行",
    context: "表达无特定偏好",
    tags: ["日常", "沟通"]
  },
  {
    id: 'ph319',
    english: "I'm not picky",
    chinese: "我不挑剔",
    context: "表达无特定偏好",
    tags: ["日常", "沟通"]
  },
  {
    id: 'ph320',
    english: "I'm flexible",
    chinese: "我很灵活",
    context: "表达无特定偏好",
    tags: ["日常", "沟通"]
  },

  // === 结束话题/活动 ===
  {
    id: 'ph321',
    english: "Let's call it a day",
    chinese: "今天就到这里吧",
    context: "结束活动",
    tags: ["日常", "沟通"]
  },
  {
    id: 'ph322',
    english: "Let's wrap it up",
    chinese: "我们结束吧",
    context: "结束活动",
    tags: ["日常", "沟通"]
  },
  {
    id: 'ph479',
    english: 'Early to bed, early to rise',
    chinese: '早睡早起',
    context: '生活习惯',
    tags: ["日常", "谚语"]
  },
  {
    id: 'ph480',
    english: 'The early bird gets the worm',
    chinese: '早起的鸟儿有虫吃',
    context: '时间管理',
    tags: ["日常", "谚语"]
  },

  // === 价格相关 ===
  {
    id: 'ph481',
    english: 'It\'s expensive',
    chinese: '这很贵',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph482',
    english: 'It\'s pricey',
    chinese: '这很贵',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph483',
    english: 'It costs a fortune',
    chinese: '这要花一大笔钱',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph484',
    english: 'It\'s overpriced',
    chinese: '这定价过高',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph485',
    english: 'It\'s a rip-off',
    chinese: '这是宰客',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph486',
    english: 'Daylight robbery',
    chinese: '光天化日之下的抢劫（太贵）',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph487',
    english: 'Highway robbery',
    chinese: '拦路抢劫（太贵）',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph488',
    english: 'It costs an arm and a leg',
    chinese: '这要花很多钱',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph489',
    english: 'It\'s not cheap',
    chinese: '这不便宜',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph490',
    english: 'It\'s a bit steep',
    chinese: '这有点贵',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },

  // === 便宜价格相关 ===
  {
    id: 'ph491',
    english: 'It\'s cheap',
    chinese: '这很便宜',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph492',
    english: 'It\'s a bargain',
    chinese: '这是便宜货',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph493',
    english: 'It\'s a steal',
    chinese: '这是偷来的价格（很便宜）',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph494',
    english: 'It\'s dirt cheap',
    chinese: '这便宜得像土一样',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph495',
    english: 'It\'s a good deal',
    chinese: '这是个好买卖',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph496',
    english: 'It\'s affordable',
    chinese: '这价格可以承受',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph497',
    english: 'It\'s reasonably priced',
    chinese: '这价格合理',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph498',
    english: 'It won\'t break the bank',
    chinese: '这不会让你破产',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph499',
    english: 'It\'s within my budget',
    chinese: '这在我的预算内',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    id: 'ph500',
    english: 'It\'s worth every penny',
    chinese: '每一分钱都值得',
    context: '价格评价',
    tags: ["购物", "金钱"]
  },
  {
    "id": "ph501",
    "english": "hello there!",
    "chinese": "你好啊！",
    "context": "打招呼",
    "tags": ["问候", "社交"]
  },
  {
    "id": "ph502",
    "english": "hi!",
    "chinese": "嗨！",
    "context": "打招呼",
    "tags": ["问候", "非正式"]
  },
  {
    "id": "ph503",
    "english": "hey!",
    "chinese": "嘿！",
    "context": "引起注意或打招呼",
    "tags": ["问候", "非正式"]
  },
  {
    "id": "ph504",
    "english": "hey there!",
    "chinese": "嘿，你好！",
    "context": "打招呼",
    "tags": ["问候", "随意"]
  },
  {
    "id": "ph505",
    "english": "good to see you!",
    "chinese": "见到你真好！",
    "context": "朋友见面",
    "tags": ["社交", "情感"]
  },
  {
    "id": "ph506",
    "english": "nice to see you!",
    "chinese": "很高兴见到你！",
    "context": "朋友/同事见面",
    "tags": ["礼貌", "社交"]
  },
  {
    "id": "ph507",
    "english": "what a surprise!",
    "chinese": "真是个惊喜！",
    "context": "意外相遇",
    "tags": ["感叹", "惊喜"]
  },
  {
    "id": "ph508",
    "english": "fancy meeting you here!",
    "chinese": "竟然在这里遇到你！",
    "context": "偶遇",
    "tags": ["幽默", "社交"]
  },
  {
    "id": "ph509",
    "english": "it's been a while!",
    "chinese": "好久没见了！",
    "context": "久别重逢",
    "tags": ["叙旧", "时间"]
  },
  {
    "id": "ph510",
    "english": "long time no see!",
    "chinese": "好久不见！",
    "context": "久别重逢",
    "tags": ["常用语", "叙旧"]
  },
  {
    "id": "ph511",
    "english": "how have you been?",
    "chinese": "最近怎么样？",
    "context": "询问近况",
    "tags": ["关心", "对话"]
  },
  {
    "id": "ph512",
    "english": "how's everything going?",
    "chinese": "一切都还顺利吗？",
    "context": "询问近况",
    "tags": ["关心", "生活"]
  },
  {
    "id": "ph513",
    "english": "what's new?",
    "chinese": "有什么新鲜事吗？",
    "context": "随意闲聊",
    "tags": ["非正式", "对话"]
  },
  {
    "id": "ph514",
    "english": "what's up?",
    "chinese": "怎么了？/ 最近在忙什么？",
    "context": "非正式打招呼",
    "tags": ["流行语", "随意"]
  },
  {
    "id": "ph515",
    "english": "how's it going?",
    "chinese": "最近过得如何？",
    "context": "询问状态",
    "tags": ["问候", "常用"]
  },
  {
    "id": "ph516",
    "english": "are you free?",
    "chinese": "你有空吗？",
    "context": "发出邀约前询问",
    "tags": ["邀约", "时间"]
  },
  {
    "id": "ph517",
    "english": "do you have time?",
    "chinese": "你有时间吗？",
    "context": "寻求帮助或交谈",
    "tags": ["礼貌", "询问"]
  },
  {
    "id": "ph518",
    "english": "what are you doing?",
    "chinese": "你在干什么呢？",
    "context": "询问当前行为",
    "tags": ["好奇", "对话"]
  },
  {
    "id": "ph519",
    "english": "what are you up to?",
    "chinese": "你最近在忙什么？",
    "context": "非正式近况询问",
    "tags": ["非正式", "生活"]
  },
  {
    "id": "ph520",
    "english": "how's life?",
    "chinese": "生活过得怎么样？",
    "context": "深层闲谈",
    "tags": ["关心", "人生"]
  },
  {
    "id": "ph521",
    "english": "how's your day?",
    "chinese": "今天过得怎么样？",
    "context": "日常问候",
    "tags": ["关心", "日常"]
  },
  {
    "id": "ph522",
    "english": "how's your week?",
    "chinese": "这周过得如何？",
    "context": "周期性问候",
    "tags": ["关心", "时间"]
  },
  {
    "id": "ph523",
    "english": "how's work?",
    "chinese": "工作顺利吗？",
    "context": "询问职场情况",
    "tags": ["职场", "生活"]
  },
  {
    "id": "ph524",
    "english": "how's school?",
    "chinese": "学校生活怎么样？",
    "context": "询问学业",
    "tags": ["校园", "学生"]
  },
  {
    "id": "ph525",
    "english": "how's the family?",
    "chinese": "家里人都好吗？",
    "context": "礼貌询问家属",
    "tags": ["家庭", "关心"]
  },
  {
    "id": "ph526",
    "english": "is everything okay?",
    "chinese": "一切都还好吗？",
    "context": "察觉异常时询问",
    "tags": ["担忧", "确认"]
  },
  {
    "id": "ph527",
    "english": "is everything alright?",
    "chinese": "都没问题吧？",
    "context": "确认状态",
    "tags": ["关心", "确认"]
  },
  {
    "id": "ph528",
    "english": "hope you're well!",
    "chinese": "希望你一切都好！",
    "context": "祝福语",
    "tags": ["祝福", "书信"]
  },
  {
    "id": "ph529",
    "english": "take care!",
    "chinese": "保重！",
    "context": "道别",
    "tags": ["告别", "关心"]
  },
  {
    "id": "ph530",
    "english": "see you later!",
    "chinese": "回头见！",
    "context": "道别",
    "tags": ["告别", "常用"]
  },
  {
    "id": "ph531",
    "english": "see you soon!",
    "chinese": "一会儿见！",
    "context": "近期再见",
    "tags": ["告别", "期待"]
  },
  {
    "id": "ph532",
    "english": "see you tomorrow!",
    "chinese": "明天见！",
    "context": "具体时间道别",
    "tags": ["告别", "日常"]
  },
  {
    "id": "ph533",
    "english": "see you next week!",
    "chinese": "下周见！",
    "context": "具体时间道别",
    "tags": ["告别", "工作"]
  },
  {
    "id": "ph534",
    "english": "have a good day!",
    "chinese": "祝你今天愉快！",
    "context": "日常礼貌告别",
    "tags": ["礼貌", "祝福"]
  },
  {
    "id": "ph535",
    "english": "have a great day!",
    "chinese": "祝你有美好的一天！",
    "context": "热情地告别",
    "tags": ["热情", "祝福"]
  },
  {
    "id": "ph536",
    "english": "have a good one!",
    "chinese": "祝你过得愉快！",
    "context": "万能告别语",
    "tags": ["地道", "口语"]
  },
  {
    "id": "ph537",
    "english": "enjoy your day!",
    "chinese": "享受你的一天！",
    "context": "祝福",
    "tags": ["礼貌", "心情"]
  },
  {
    "id": "ph538",
    "english": "enjoy your weekend!",
    "chinese": "周末愉快！",
    "context": "周五或周末告别",
    "tags": ["假期", "祝福"]
  },
  {
    "id": "ph539",
    "english": "have fun!",
    "chinese": "玩得开心！",
    "context": "对方要去参加活动",
    "tags": ["娱乐", "祝愿"]
  },
  {
    "id": "ph540",
    "english": "have a good time!",
    "chinese": "过得愉快！",
    "context": "祝福对方享受当下",
    "tags": ["社交", "祝福"]
  },
  {
    "id": "ph541",
    "english": "make yourself at home!",
    "chinese": "别客气，像在自己家一样！",
    "context": "招待客人",
    "tags": ["热情", "礼仪"]
  },
  {
    "id": "ph542",
    "english": "come on in!",
    "chinese": "快请进！",
    "context": "进门邀请",
    "tags": ["欢迎", "日常"]
  },
  {
    "id": "ph543",
    "english": "welcome!",
    "chinese": "欢迎！",
    "context": "正式或非正式欢迎",
    "tags": ["礼貌", "接待"]
  },
  {
    "id": "ph544",
    "english": "welcome back!",
    "chinese": "欢迎回来！",
    "context": "迎接归来的人",
    "tags": ["归家", "职场"]
  },
  {
    "id": "ph545",
    "english": "glad you could make it!",
    "chinese": "很高兴你能赶过来！",
    "context": "聚会迎宾",
    "tags": ["感激", "社交"]
  },
  {
    "id": "ph546",
    "english": "glad you're here!",
    "chinese": "你能在这儿真好！",
    "context": "表达对某人出席的欣喜",
    "tags": ["情感", "认可"]
  },
  {
    "id": "ph547",
    "english": "glad to see you!",
    "chinese": "很高兴见到你！",
    "context": "见面问候",
    "tags": ["社交", "喜悦"]
  },
  {
    "id": "ph548",
    "english": "pleased to meet you!",
    "chinese": "很荣幸认识你！",
    "context": "初次见面（正式）",
    "tags": ["正式", "社交"]
  },
  {
    "id": "ph549",
    "english": "nice meeting you!",
    "chinese": "认识你很高兴！",
    "context": "初次见面结束时",
    "tags": ["礼貌", "结识"]
  },
  {
    "id": "ph550",
    "english": "it was nice meeting you!",
    "chinese": "认识你很愉快！",
    "context": "初次见面后的道别",
    "tags": ["正式", "告别"]
  },
  {
    "id": "ph551",
    "english": "it was a pleasure meeting you!",
    "chinese": "与您相识是我的荣幸！",
    "context": "正式场合结识",
    "tags": ["商务", "敬语"]
  },
  {
    "id": "ph552",
    "english": "good afternoon!",
    "chinese": "下午好！",
    "context": "时间问候",
    "tags": ["礼貌", "日常"]
  },
  {
    "id": "ph553",
    "english": "good evening!",
    "chinese": "晚上好！",
    "context": "晚间问候",
    "tags": ["礼貌", "日常"]
  },
  {
    "id": "ph554",
    "english": "good night!",
    "chinese": "晚安！",
    "context": "睡前或深夜告别",
    "tags": ["晚安", "家庭"]
  },
  {
    "id": "ph555",
    "english": "sleep well!",
    "chinese": "睡个好觉！",
    "context": "睡前祝福",
    "tags": ["关心", "温馨"]
  },
  {
    "id": "ph556",
    "english": "rest well!",
    "chinese": "好好休息！",
    "context": "嘱咐他人休息",
    "tags": ["体贴", "健康"]
  },
  {
    "id": "ph557",
    "english": "feel better soon!",
    "chinese": "祝你早日康复！",
    "context": "慰问病人",
    "tags": ["同情", "健康"]
  },
  {
    "id": "ph558",
    "english": "happy holidays!",
    "chinese": "节日快乐！",
    "context": "节假日问候",
    "tags": ["节日", "祝福"]
  },
  {
    "id": "ph559",
    "english": "great job!",
    "chinese": "做得好！",
    "context": "称赞他人表现",
    "tags": ["表扬", "激励"]
  },
  {
    "id": "ph560",
    "english": "nice work!",
    "chinese": "干得漂亮！",
    "context": "认可工作成果",
    "tags": ["职场", "赞美"]
  },
  {
    "id": "ph561",
    "english": "excellent work!",
    "chinese": "卓越的工作！",
    "context": "高度赞扬成果",
    "tags": ["专业", "表彰"]
  },
  {
    "id": "ph562",
    "english": "outstanding!",
    "chinese": "太杰出了！",
    "context": "评价表现极其出色",
    "tags": ["高级", "赞赏"]
  },
  {
    "id": "ph563",
    "english": "impressive!",
    "chinese": "给人留下了深刻印象！",
    "context": "对能力表示赞叹",
    "tags": ["才华", "评价"]
  },
  {
    "id": "ph564",
    "english": "amazing!",
    "chinese": "太神奇了/太棒了！",
    "context": "极度赞美",
    "tags": ["感叹", "强烈"]
  },
  {
    "id": "ph565",
    "english": "incredible!",
    "chinese": "简直不可思议！",
    "context": "由于太好而感到惊讶",
    "tags": ["惊讶", "正面"]
  },
  {
    "id": "ph566",
    "english": "fantastic!",
    "chinese": "太棒了！",
    "context": "表达兴奋和赞美",
    "tags": ["情绪", "鼓励"]
  },
  {
    "id": "ph567",
    "english": "wonderful!",
    "chinese": "太美好了！",
    "context": "赞美事物或心情",
    "tags": ["美好", "赞叹"]
  },
  {
    "id": "ph568",
    "english": "brilliant!",
    "chinese": "才华横溢！/ 妙极了！",
    "context": "赞美想法或人",
    "tags": ["智慧", "英式习惯"]
  },
  {
    "id": "ph569",
    "english": "perfect!",
    "chinese": "完美！",
    "context": "确认或高度认可",
    "tags": ["肯定", "极致"]
  },
  {
    "id": "ph570",
    "english": "you nailed it!",
    "chinese": "你做到了！/ 说得太准了！",
    "context": "成功完成或精准表达",
    "tags": ["俚语", "成就"]
  },
  {
    "id": "ph571",
    "english": "you've got it!",
    "chinese": "你明白了！/ 没问题！",
    "context": "确认对方掌握或答应请求",
    "tags": ["地道", "回应"]
  },
  {
    "id": "ph572",
    "english": "you're doing great!",
    "chinese": "你做得非常好！",
    "context": "过程中的鼓励",
    "tags": ["激励", "进步"]
  },
  {
    "id": "ph573",
    "english": "you're on the right track!",
    "chinese": "你的方向是对的！",
    "context": "指引与肯定",
    "tags": ["指导", "正向"]
  },
  {
    "id": "ph574",
    "english": "you're making progress!",
    "chinese": "你在进步！",
    "context": "认可成长",
    "tags": ["教育", "肯定"]
  },
  {
    "id": "ph575",
    "english": "keep it up!",
    "chinese": "继续保持！",
    "context": "持续鼓励",
    "tags": ["动力", "坚持"]
  },
  {
    "id": "ph576",
    "english": "keep going!",
    "chinese": "继续加油！",
    "context": "面对困难时的鼓励",
    "tags": ["行动", "坚持"]
  },
  {
    "id": "ph577",
    "english": "don't give up!",
    "chinese": "别放弃！",
    "context": "加油打气",
    "tags": ["毅力", "温暖"]
  },
  {
    "id": "ph578",
    "english": "you can do it!",
    "chinese": "你能行！",
    "context": "增强自信",
    "tags": ["信心", "支持"]
  },
  {
    "id": "ph579",
    "english": "i believe in you!",
    "chinese": "我相信你！",
    "context": "深层情感支持",
    "tags": ["信任", "情感"]
  },
  {
    "id": "ph580",
    "english": "you've got this!",
    "chinese": "你可以搞定的！",
    "context": "挑战前的鼓励",
    "tags": ["现代", "自信"]
  },
  {
    "id": "ph581",
    "english": "way to go!",
    "chinese": "做得好！/ 就这样干！",
    "context": "喝彩",
    "tags": ["非正式", "表扬"]
  },
  {
    "id": "ph582",
    "english": "that's the spirit!",
    "chinese": "这才是好样的！/ 就是这种精神！",
    "context": "肯定态度",
    "tags": ["态度", "鼓励"]
  },
  {
    "id": "ph583",
    "english": "that's the way!",
    "chinese": "这就对了！",
    "context": "肯定做法",
    "tags": ["方法", "确认"]
  },
  {
    "id": "ph584",
    "english": "you're amazing!",
    "chinese": "你太了不起了！",
    "context": "人格称赞",
    "tags": ["个人", "崇拜"]
  },
  {
    "id": "ph585",
    "english": "you're awesome!",
    "chinese": "你太棒了！",
    "context": "通用赞美",
    "tags": ["流行语", "赞赏"]
  },
  {
    "id": "ph586",
    "english": "you're incredible!",
    "chinese": "你太不可思议了！",
    "context": "表示惊叹的赞美",
    "tags": ["强烈", "肯定"]
  },
  {
    "id": "ph587",
    "english": "you're fantastic!",
    "chinese": "你太出色了！",
    "context": "积极评价",
    "tags": ["评价", "友善"]
  },
  {
    "id": "ph588",
    "english": "you're wonderful!",
    "chinese": "你真好！",
    "context": "性格赞美",
    "tags": ["温暖", "赞好"]
  },
  {
    "id": "ph589",
    "english": "you're brilliant!",
    "chinese": "你太聪明了！",
    "context": "智慧称赞",
    "tags": ["智慧", "天赋"]
  },
  {
    "id": "ph590",
    "english": "you're perfect!",
    "chinese": "你真完美！",
    "context": "极度喜爱或认可",
    "tags": ["赞美", "深情"]
  },
  {
    "id": "ph591",
    "english": "you're the best!",
    "chinese": "你是最棒的！",
    "context": "表达感激或赞赏",
    "tags": ["感激", "最高级"]
  },
  {
    "id": "ph592",
    "english": "you're a genius!",
    "chinese": "你真是个天才！",
    "context": "解决难题后称赞",
    "tags": ["智商", "夸张"]
  },
  {
    "id": "ph593",
    "english": "you're a star!",
    "chinese": "你太给力了！/ 真是个明星！",
    "context": "某人帮了大忙",
    "tags": ["感激", "地道"]
  },
  {
    "id": "ph594",
    "english": "you're a champion!",
    "chinese": "你是个冠军/好样儿的！",
    "context": "克服困难后赞美",
    "tags": ["成功", "坚韧"]
  },
  {
    "id": "ph595",
    "english": "you're a natural!",
    "chinese": "你有天赋！",
    "context": "赞美某人上手快",
    "tags": ["才华", "评价"]
  },
  {
    "id": "ph596",
    "english": "you're a pro!",
    "chinese": "你是个专业人士！",
    "context": "赞美技能熟练",
    "tags": ["专业", "赞赏"]
  },
  {
    "id": "ph597",
    "english": "you're a legend!",
    "chinese": "你真是个传奇！",
    "context": "极高赞誉（常用于幽默或大忙）",
    "tags": ["夸张", "感激"]
  },
  {
    "id": "ph598",
    "english": "you're a hero!",
    "chinese": "你是个英雄！",
    "context": "关键时刻施救或帮助",
    "tags": ["拯救", "感谢"]
  },
  {
    "id": "ph599",
    "english": "you're a gem!",
    "chinese": "你真是个难得的好人！",
    "context": "称赞品格可贵",
    "tags": ["品格", "地道"]
  },
  {
    "id": "ph600",
    "english": "you're a sweetheart!",
    "chinese": "你真贴心！",
    "context": "称赞亲近的人体贴",
    "tags": ["温馨", "情感"]
  },
  {
    "id": "ph601",
    "english": "you're a doll!",
    "chinese": "你真可爱/真热心！",
    "context": "亲昵地赞美某人帮忙",
    "tags": ["非正式", "友善"]
  },
  {
    "id": "ph602",
    "english": "you're a peach!",
    "chinese": "你人真好！",
    "context": "地道的性格称赞",
    "tags": ["习惯用语", "感激"]
  },
  {
    "id": "ph603",
    "english": "you're an angel!",
    "chinese": "你真是个天使！",
    "context": "极度感激某人的善行",
    "tags": ["善良", "感恩"]
  },
  {
    "id": "ph604",
    "english": "you're a blessing!",
    "chinese": "你真是上天的恩赐！",
    "context": "深层情感表达",
    "tags": ["感恩", "深沉"]
  },
  {
    "id": "ph605",
    "english": "you're a gift!",
    "chinese": "拥有你是一种幸运！",
    "context": "深厚友谊或亲情",
    "tags": ["珍贵", "情感"]
  },
  {
    "id": "ph606",
    "english": "you're a treasure!",
    "chinese": "你是个宝贝/难得的人才！",
    "context": "评价极高",
    "tags": ["珍贵", "评价"]
  },
  {
    "id": "ph607",
    "english": "you're a delight!",
    "chinese": "你真讨人喜欢！",
    "context": "称赞他人让人愉悦",
    "tags": ["社交", "魅力"]
  },
  {
    "id": "ph608",
    "english": "you're a joy!",
    "chinese": "你给人带来了欢乐！",
    "context": "性格积极向上",
    "tags": ["性格", "快乐"]
  },
  {
    "id": "ph609",
    "english": "you're a pleasure!",
    "chinese": "与你相处很愉快！",
    "context": "社交辞令",
    "tags": ["礼貌", "社交"]
  },
  {
    "id": "ph610",
    "english": "you're a friend indeed!",
    "chinese": "你是真正的朋友！",
    "context": "患难见真情",
    "tags": ["友谊", "可靠"]
  },
  {
    "id": "ph611",
    "english": "you're a true friend!",
    "chinese": "你是一个挚友！",
    "context": "表达友谊深度",
    "tags": ["友谊", "忠诚"]
  },
  {
    "id": "ph612",
    "english": "you're a loyal friend!",
    "chinese": "你是一个忠诚的朋友！",
    "context": "称赞品质",
    "tags": ["友谊", "忠诚"]
  },
  {
    "id": "ph613",
    "english": "you're a good friend!",
    "chinese": "你是一个好朋友！",
    "context": "简单而真挚的认可",
    "tags": ["友谊", "日常"]
  },
  {
    "id": "ph614",
    "english": "you're a kind person!",
    "chinese": "你是一个善良的人！",
    "context": "评价性格",
    "tags": ["性格", "善良"]
  },
  {
    "id": "ph615",
    "english": "you're a good person!",
    "chinese": "你是个好人！",
    "context": "基础品格评价",
    "tags": ["品德", "正直"]
  },
  {
    "id": "ph616",
    "english": "you have a good heart!",
    "chinese": "你心肠很好！",
    "context": "肯定内在品质",
    "tags": ["善良", "内在"]
  },
  {
    "id": "ph617",
    "english": "you're a beautiful person!",
    "chinese": "你拥有美丽的灵魂！",
    "context": "赞美内在与修养",
    "tags": ["赞美", "深层"]
  },
  {
    "id": "ph618",
    "english": "you're a smart person!",
    "chinese": "你很聪明！",
    "context": "评价智力",
    "tags": ["智慧", "评价"]
  },
  {
    "id": "ph619",
    "english": "you're a wise person!",
    "chinese": "你是一个有智慧的人！",
    "context": "称赞见地深远",
    "tags": ["智慧", "尊敬"]
  },
  {
    "id": "ph620",
    "english": "you're a strong person!",
    "chinese": "你是一个坚强的人！",
    "context": "在困境中给予鼓励",
    "tags": ["力量", "意志"]
  },
  {
    "id": "ph621",
    "english": "you're a brave person!",
    "chinese": "你很勇敢！",
    "context": "称赞勇气",
    "tags": ["勇敢", "品质"]
  },
  {
    "id": "ph622",
    "english": "you're a confident person!",
    "chinese": "你是个自信的人！",
    "context": "评价气质",
    "tags": ["自信", "气质"]
  },
  {
    "id": "ph623",
    "english": "you're a positive person!",
    "chinese": "你很乐观！",
    "context": "评价生活态度",
    "tags": ["态度", "乐观"]
  },
  {
    "id": "ph624",
    "english": "you're a cheerful person!",
    "chinese": "你是个开朗的人！",
    "context": "评价性格",
    "tags": ["性格", "活力"]
  },
  {
    "id": "ph625",
    "english": "you're a fun person!",
    "chinese": "你是个有趣的人！",
    "context": "赞美社交魅力",
    "tags": ["有趣", "社交"]
  },
  {
    "id": "ph626",
    "english": "you're a funny person!",
    "chinese": "你很有幽默感！",
    "context": "称赞能让人发笑",
    "tags": ["幽默", "个性"]
  },
  {
    "id": "ph627",
    "english": "you're a creative person!",
    "chinese": "你很有创意！",
    "context": "赞美创造力",
    "tags": ["创意", "才华"]
  },
  {
    "id": "ph628",
    "english": "you're a talented person!",
    "chinese": "你很有才华！",
    "context": "赞美天赋",
    "tags": ["才能", "称赞"]
  },
  {
    "id": "ph629",
    "english": "you're a skilled person!",
    "chinese": "你技术娴熟！",
    "context": "赞美专业技能",
    "tags": ["技能", "专业"]
  },
  {
    "id": "ph630",
    "english": "you're a hardworking person!",
    "chinese": "你工作很努力！",
    "context": "肯定工作态度",
    "tags": ["勤奋", "评价"]
  },
  {
    "id": "ph631",
    "english": "you're a dedicated person!",
    "chinese": "你非常投入/敬业！",
    "context": "赞美专注度",
    "tags": ["敬业", "精神"]
  },
  {
    "id": "ph632",
    "english": "you're a responsible person!",
    "chinese": "你是一个负责任的人！",
    "context": "评价可靠性",
    "tags": ["责任", "品质"]
  },
  {
    "id": "ph633",
    "english": "you're a reliable person!",
    "chinese": "你很靠谱！",
    "context": "称赞值得信赖",
    "tags": ["可信", "靠谱"]
  },
  {
    "id": "ph634",
    "english": "you're a trustworthy person!",
    "chinese": "你是一个值得信赖的人！",
    "context": "关于诚信的赞美",
    "tags": ["信任", "诚信"]
  },
  {
    "id": "ph635",
    "english": "you're a honest person!",
    "chinese": "你很诚实！",
    "context": "评价品质",
    "tags": ["诚实", "品格"]
  },
  {
    "id": "ph636",
    "english": "you're a sincere person!",
    "chinese": "你很真诚！",
    "context": "称赞待人接物",
    "tags": ["真诚", "性格"]
  },
  {
    "id": "ph637",
    "english": "you're a genuine person!",
    "chinese": "你很真实！",
    "context": "称赞不虚伪",
    "tags": ["真实", "正直"]
  },
  {
    "id": "ph638",
    "english": "you're a real person!",
    "chinese": "你很有个性/真性情！",
    "context": "赞美不随波逐流",
    "tags": ["真性情", "褒义"]
  },
  {
    "id": "ph639",
    "english": "you're a unique person!",
    "chinese": "你是一个独特的人！",
    "context": "赞美与众不同",
    "tags": ["独特", "赞赏"]
  },
  {
    "id": "ph640",
    "english": "you're a special person!",
    "chinese": "你是个特别的人！",
    "context": "表达重要性",
    "tags": ["特别", "情感"]
  },
  {
    "id": "ph641",
    "english": "you're one of a kind!",
    "chinese": "你是独一无二的！",
    "context": "最高级别的独特性赞美",
    "tags": ["唯一", "赞美"]
  },
  {
    "id": "ph642",
    "english": "you're in a class of your own!",
    "chinese": "你出类拔萃，无人能及！",
    "context": "极高的专业/品质赞美",
    "tags": ["杰出", "顶级"]
  },
  {
    "id": "ph643",
    "english": "you're the apple of my eye!",
    "chinese": "你是我的掌上明珠！",
    "context": "表达珍爱",
    "tags": ["习语", "爱意"]
  },
  {
    "id": "ph644",
    "english": "you make my day!",
    "chinese": "你让我这一天都变好了！",
    "context": "因为某人的话或举动感到开心",
    "tags": ["感激", "心情"]
  },
  {
    "id": "ph645",
    "english": "you brighten my day!",
    "chinese": "你照亮了我的生活！",
    "context": "表达对方带来的积极影响",
    "tags": ["温暖", "感恩"]
  },
  {
    "id": "ph646",
    "english": "you make me happy!",
    "chinese": "你让我感到快乐！",
    "context": "直接表达情感",
    "tags": ["直白", "喜悦"]
  },
  {
    "id": "ph647",
    "english": "you make me smile!",
    "chinese": "你总能让我露出笑容！",
    "context": "称赞对方的幽默或温柔",
    "tags": ["温馨", "情感"]
  },
  {
    "id": "ph648",
    "english": "you make me laugh!",
    "chinese": "你总能逗我笑！",
    "context": "称赞幽默感",
    "tags": ["幽默", "友谊"]
  },
  {
    "id": "ph649",
    "english": "you make me proud!",
    "chinese": "你让我感到自豪！",
    "context": "长辈/导师的认可",
    "tags": ["认可", "骄傲"]
  },
  {
    "id": "ph650",
    "english": "you inspire me!",
    "chinese": "你激励着我！",
    "context": "表达榜样的力量",
    "tags": ["激励", "崇拜"]
  },
  {
    "id": "ph651",
    "english": "you motivate me!",
    "chinese": "你给了我动力！",
    "context": "称赞对方的积极影响",
    "tags": ["动力", "进步"]
  },
  {
    "id": "ph652",
    "english": "you encourage me!",
    "chinese": "你给了我鼓励！",
    "context": "感谢支持",
    "tags": ["感谢", "信心"]
  },
  {
    "id": "ph653",
    "english": "you support me!",
    "chinese": "你一直支持我！",
    "context": "感谢陪伴与帮助",
    "tags": ["支持", "感恩"]
  },
  {
    "id": "ph654",
    "english": "you help me!",
    "chinese": "你帮了我大忙！",
    "context": "简单直接的感谢",
    "tags": ["帮助", "日常"]
  },
  {
    "id": "ph655",
    "english": "you care about me!",
    "chinese": "你很关心我！",
    "context": "感受到对方的温暖",
    "tags": ["关怀", "情感"]
  },
  {
    "id": "ph656",
    "english": "you love me!",
    "chinese": "你爱着我！",
    "context": "确认/表达亲密关系",
    "tags": ["爱情", "亲情"]
  },
  {
    "id": "ph657",
    "english": "i appreciate you!",
    "chinese": "我很感激你！",
    "context": "正式/真诚的感谢",
    "tags": ["感激", "礼貌"]
  },
  {
    "id": "ph658",
    "english": "i value you!",
    "chinese": "我很看重你！",
    "context": "职场或深度友谊认可",
    "tags": ["重视", "人际"]
  },
  {
    "id": "ph659",
    "english": "i respect you!",
    "chinese": "我尊重你！",
    "context": "表达敬意",
    "tags": ["尊重", "专业"]
  },
  {
    "id": "ph660",
    "english": "i admire you!",
    "chinese": "我很钦佩你！",
    "context": "表达仰慕",
    "tags": ["敬仰", "正面"]
  },
  {
    "id": "ph661",
    "english": "i look up to you!",
    "chinese": "我一直视你为榜样！",
    "context": "对偶像/长辈的表达",
    "tags": ["榜样", "尊敬"]
  },
  {
    "id": "ph662",
    "english": "i trust you!",
    "chinese": "我信任你！",
    "context": "交付重托",
    "tags": ["信任", "契约"]
  },
  {
    "id": "ph663",
    "english": "i believe in you!",
    "chinese": "我相信你能行！",
    "context": "赛前或挑战前的鼓励",
    "tags": ["支持", "信心"]
  },
  {
    "id": "ph664",
    "english": "i have faith in you!",
    "chinese": "我对你有信心！",
    "context": "坚定的信任表达",
    "tags": ["信念", "支持"]
  },
  {
    "id": "ph665",
    "english": "i'm proud of you!",
    "chinese": "我为你感到骄傲！",
    "context": "成功后的祝贺",
    "tags": ["赞许", "自豪"]
  },
  {
    "id": "ph666",
    "english": "i'm happy for you!",
    "chinese": "我为你感到高兴！",
    "context": "分享对方的喜悦",
    "tags": ["祝福", "共情"]
  },
  {
    "id": "ph667",
    "english": "i'm excited for you!",
    "chinese": "我为你感到激动！",
    "context": "得知对方有好事将近",
    "tags": ["期待", "热情"]
  },
  {
    "id": "ph668",
    "english": "i'm grateful for you!",
    "chinese": "我很感激有你！",
    "context": "深沉的感恩",
    "tags": ["感恩", "情感"]
  },
  {
    "id": "ph669",
    "english": "i'm blessed to have you!",
    "chinese": "有你是我的福气！",
    "context": "极高的情感表达",
    "tags": ["幸福", "亲密"]
  },
  {
    "id": "ph670",
    "english": "i'm lucky to have you!",
    "chinese": "我有你真幸运！",
    "context": "由衷的感慨",
    "tags": ["幸运", "温暖"]
  },
  {
    "id": "ph671",
    "english": "i'm fortunate to have you!",
    "chinese": "能拥有你我倍感荣幸！",
    "context": "礼貌且真诚的表达",
    "tags": ["珍惜", "正式"]
  },
  {
    "id": "ph672",
    "english": "i'm honored to have you!",
    "chinese": "能邀请到您是我的荣幸！",
    "context": "正式场合欢迎",
    "tags": ["商务", "礼貌"]
  },
  {
    "id": "ph673",
    "english": "i'm privileged to have you!",
    "chinese": "能与您共事是我的荣幸！",
    "context": "高度尊重的职场表达",
    "tags": ["敬语", "职场"]
  },
  {
    "id": "ph674",
    "english": "i'm thankful for you!",
    "chinese": "谢谢你的存在/陪伴！",
    "context": "感恩季节或时刻",
    "tags": ["感恩", "生活"]
  },
  {
    "id": "ph675",
    "english": "i'm appreciative of you!",
    "chinese": "我对你满怀感激！",
    "context": "正式的感谢表现",
    "tags": ["感激", "专业"]
  },
  {
    "id": "ph676",
    "english": "i'm indebted to you!",
    "chinese": "我欠你一个人情！",
    "context": "得到大忙后的回应",
    "tags": ["欠情", "重要帮助"]
  },
  {
    "id": "ph677",
    "english": "i owe you!",
    "chinese": "我欠你一次！",
    "context": "口语化的感激",
    "tags": ["非正式", "感谢"]
  },
  {
    "id": "ph678",
    "english": "i'm in your debt!",
    "chinese": "我欠您的情。/ 感激不尽。",
    "context": "郑重的感谢",
    "tags": ["正式", "感激"]
  },
  {
    "id": "ph679",
    "english": "you have my gratitude!",
    "chinese": "请接受我的谢意！",
    "context": "正式致谢",
    "tags": ["正式", "礼貌"]
  },
  {
    "id": "ph680",
    "english": "you have my appreciation!",
    "chinese": "我很欣赏你的所作所为！",
    "context": "认可并感谢",
    "tags": ["认可", "职场"]
  },
  {
    "id": "ph681",
    "english": "you have my thanks!",
    "chinese": "在此谢过了！",
    "context": "简洁的致谢",
    "tags": ["礼貌", "书面"]
  },
  {
    "id": "ph682",
    "english": "you have my respect!",
    "chinese": "我由衷地敬佩你！",
    "context": "看到对方的高尚行为后",
    "tags": ["敬意", "品格"]
  },
  {
    "id": "ph683",
    "english": "you have my admiration!",
    "chinese": "我对你充满敬意！",
    "context": "表达仰慕之情",
    "tags": ["钦佩", "正式"]
  },
  {
    "id": "ph684",
    "english": "you have my support!",
    "chinese": "我会一直支持你的！",
    "context": "表态支持",
    "tags": ["立场", "支持"]
  },
  {
    "id": "ph685",
    "english": "you have my blessing!",
    "chinese": "我为你祝福/我准了！",
    "context": "长辈允许或纯粹祝福",
    "tags": ["许可", "祝福"]
  },
  {
    "id": "ph686",
    "english": "you have my best wishes!",
    "chinese": "带上我最好的祝愿！",
    "context": "临别或新开始的祝福",
    "tags": ["祝福", "未来"]
  },
  {
    "id": "ph687",
    "english": "you have my sympathy!",
    "chinese": "我深表同情/慰问。",
    "context": "不幸发生时的吊唁或同情",
    "tags": ["安慰", "正式"]
  },
  {
    "id": "ph688",
    "english": "you have my condolences!",
    "chinese": "请节哀顺变！",
    "context": "向丧家表达哀悼",
    "tags": ["安慰", "正式"]
  },
  {
    "id": "ph689",
    "english": "my thoughts are with you!",
    "chinese": "我会为你祈祷/我的心与你同在！",
    "context": "他人遭遇困难或不幸时",
    "tags": ["关怀", "温暖"]
  },
  {
    "id": "ph690",
    "english": "what's up?",
    "chinese": "怎么了？/ 最近忙什么？",
    "context": "随意打招呼",
    "tags": ["问候", "非正式"]
  },
  {
    "id": "ph691",
    "english": "how have you been?",
    "chinese": "这段时间过得怎么样？",
    "context": "询问近况",
    "tags": ["问候", "社交"]
  },
  {
    "id": "ph692",
    "english": "long time no see!",
    "chinese": "好久不见！",
    "context": "久别重逢",
    "tags": ["社交", "常用语"]
  },
  {
    "id": "ph693",
    "english": "it's been a while.",
    "chinese": "有一阵子没见了。",
    "context": "叙旧开场",
    "tags": ["时间", "社交"]
  },
  {
    "id": "ph694",
    "english": "what have you been up to?",
    "chinese": "你最近都在忙些什么？",
    "context": "询问详细近况",
    "tags": ["对话", "生活"]
  },
  {
    "id": "ph695",
    "english": "nothing much.",
    "chinese": "没忙什么。/ 还是老样子。",
    "context": "回应打招呼",
    "tags": ["回应", "日常"]
  },
  {
    "id": "ph696",
    "english": "same as usual.",
    "chinese": "照旧。/ 和往常一样。",
    "context": "回答近况询问",
    "tags": ["回应", "生活"]
  },
  {
    "id": "ph697",
    "english": "just the same old routine.",
    "chinese": "每天就是那一套。/ 老样子。",
    "context": "描述日常生活",
    "tags": ["回应", "枯燥"]
  },
  {
    "id": "ph698",
    "english": "keeping busy.",
    "chinese": "一直挺忙的。",
    "context": "描述工作或生活状态",
    "tags": ["状态", "职场"]
  },
  {
    "id": "ph699",
    "english": "can't complain.",
    "chinese": "挺好的。/ 没什么可抱怨的。",
    "context": "表达现状还可以",
    "tags": ["地道", "回应"]
  },
  {
    "id": "ph700",
    "english": "could be worse.",
    "chinese": "还不算太糟。",
    "context": "表达虽然不完美但尚可",
    "tags": ["心态", "回应"]
  },
  {
    "id": "ph701",
    "english": "i'm doing well, thanks.",
    "chinese": "我挺好的，谢谢。",
    "context": "礼貌回答询问",
    "tags": ["礼貌", "状态"]
  },
  {
    "id": "ph702",
    "english": "pretty good.",
    "chinese": "相当不错。",
    "context": "积极的回应",
    "tags": ["肯定", "心情"]
  },
  {
    "id": "ph703",
    "english": "not too bad.",
    "chinese": "还不赖。",
    "context": "中性的回应",
    "tags": ["回应", "日常"]
  },
  {
    "id": "ph704",
    "english": "hanging in there.",
    "chinese": "坚持着呢。/ 勉强应付。",
    "context": "在压力下坚持",
    "tags": ["地道", "情绪"]
  },
  {
    "id": "ph705",
    "english": "getting by.",
    "chinese": "过得去。/ 还能凑合。",
    "context": "描述经济或生活状况",
    "tags": ["生存", "现状"]
  },
  {
    "id": "ph706",
    "english": "making ends meet.",
    "chinese": "维持生计。",
    "context": "描述收支平衡的压力",
    "tags": ["金钱", "生活"]
  },
  {
    "id": "ph707",
    "english": "just taking it one day at a time.",
    "chinese": "过一天算一天。/ 顺其自然。",
    "context": "描述处理生活压力的方式",
    "tags": ["心态", "哲学"]
  },
  {
    "id": "ph708",
    "english": "may i introduce myself?",
    "chinese": "我可以自我介绍一下吗？",
    "context": "正式场合开场",
    "tags": ["正式", "礼仪"]
  },
  {
    "id": "ph709",
    "english": "allow me to introduce myself.",
    "chinese": "请允许我自我介绍一下。",
    "context": "非常正式的场合",
    "tags": ["正式", "商务"]
  },
  {
    "id": "ph710",
    "english": "my name is...",
    "chinese": "我的名字是……",
    "context": "自我介绍",
    "tags": ["基础", "社交"]
  },
  {
    "id": "ph711",
    "english": "i'm from...",
    "chinese": "我来自……",
    "context": "介绍背景",
    "tags": ["个人信息", "基础"]
  },
  {
    "id": "ph712",
    "english": "i work as a...",
    "chinese": "我的职业是……",
    "context": "介绍职业",
    "tags": ["职场", "介绍"]
  },
  {
    "id": "ph713",
    "english": "i study at...",
    "chinese": "我就读于……",
    "context": "介绍学校",
    "tags": ["校园", "学生"]
  },
  {
    "id": "ph714",
    "english": "i'm here on business.",
    "chinese": "我来这里出差。",
    "context": "海关询问或社交介绍",
    "tags": ["商务", "旅行"]
  },
  {
    "id": "ph715",
    "english": "i'm here on vacation.",
    "chinese": "我来这里度假。",
    "context": "旅行社交",
    "tags": ["度假", "旅行"]
  },
  {
    "id": "ph716",
    "english": "i'm visiting friends.",
    "chinese": "我来探望朋友。",
    "context": "说明来意",
    "tags": ["社交", "旅行"]
  },
  {
    "id": "ph717",
    "english": "i'm here to study.",
    "chinese": "我来这里学习。",
    "context": "说明来意",
    "tags": ["教育", "目的"]
  },
  {
    "id": "ph718",
    "english": "thanks a lot.",
    "chinese": "非常感谢。",
    "context": "通用感谢",
    "tags": ["感激", "常用"]
  },
  {
    "id": "ph719",
    "english": "thanks a million.",
    "chinese": "万分感谢。",
    "context": "热情的感谢",
    "tags": ["地道", "热情"]
  },
  {
    "id": "ph720",
    "english": "i really appreciate it.",
    "chinese": "我真的很感激。",
    "context": "真诚的感谢",
    "tags": ["礼貌", "真诚"]
  },
  {
    "id": "ph721",
    "english": "i can't thank you enough.",
    "chinese": "感激不尽。/ 怎么谢你都不为过。",
    "context": "对方帮了极大忙时",
    "tags": ["深度感激", "情感"]
  },
  {
    "id": "ph722",
    "english": "that's very kind of you.",
    "chinese": "你真是太好了。",
    "context": "接受帮助时称赞对方",
    "tags": ["赞美", "礼貌"]
  },
  {
    "id": "ph723",
    "english": "you're too kind.",
    "chinese": "你太客气了。",
    "context": "谦逊地回应夸奖或帮助",
    "tags": ["谦虚", "社交"]
  },
  {
    "id": "ph724",
    "english": "i owe you one.",
    "chinese": "我欠你一个人情。",
    "context": "非正式感谢",
    "tags": ["人情", "口语"]
  },
  {
    "id": "ph725",
    "english": "i'm in your debt.",
    "chinese": "我欠你一份情。",
    "context": "正式的感激",
    "tags": ["正式", "感激"]
  },
  {
    "id": "ph726",
    "english": "much obliged.",
    "chinese": "感激不尽。/ 多谢。",
    "context": "较传统的正式谢辞",
    "tags": ["传统", "礼貌"]
  },
  {
    "id": "ph727",
    "english": "i'm so sorry.",
    "chinese": "非常抱歉。",
    "context": "通用道歉",
    "tags": ["道歉", "情感"]
  },
  {
    "id": "ph728",
    "english": "i apologize.",
    "chinese": "我道歉。",
    "context": "正式道歉",
    "tags": ["正式", "道歉"]
  },
  {
    "id": "ph729",
    "english": "please forgive me.",
    "chinese": "请原谅我。",
    "context": "寻求谅解",
    "tags": ["恳求", "宽恕"]
  },
  {
    "id": "ph730",
    "english": "it was my fault.",
    "chinese": "是我的错。",
    "context": "承担责任",
    "tags": ["责任", "诚实"]
  },
  {
    "id": "ph731",
    "english": "i didn't mean it.",
    "chinese": "我不是故意的。",
    "context": "解释误会",
    "tags": ["解释", "道歉"]
  },
  {
    "id": "ph732",
    "english": "it won't happen again.",
    "chinese": "下不为例。/ 不会再发生了。",
    "context": "保证改进",
    "tags": ["承诺", "职业"]
  },
  {
    "id": "ph733",
    "english": "my mistake.",
    "chinese": "我的失误。",
    "context": "认错",
    "tags": ["非正式", "责任"]
  },
  {
    "id": "ph734",
    "english": "i take full responsibility.",
    "chinese": "我承担全部责任。",
    "context": "正式承担后果",
    "tags": ["领导力", "正式"]
  },
  {
    "id": "ph735",
    "english": "how can i make it up to you?",
    "chinese": "我要怎么补偿你？",
    "context": "道歉后的补救",
    "tags": ["补偿", "诚意"]
  },
  {
    "id": "ph736",
    "english": "i feel terrible about it.",
    "chinese": "我为此感到很不安。",
    "context": "表达内疚",
    "tags": ["愧疚", "情感"]
  },
  {
    "id": "ph737",
    "english": "would you mind giving me a hand?",
    "chinese": "你能帮我个忙吗？",
    "context": "礼貌请求帮助",
    "tags": ["请求", "礼貌"]
  },
  {
    "id": "ph738",
    "english": "i need your help.",
    "chinese": "我需要你的帮助。",
    "context": "直接请求",
    "tags": ["求助", "直接"]
  },
  {
    "id": "ph739",
    "english": "could you possibly...",
    "chinese": "你有没有可能……",
    "context": "委婉请求",
    "tags": ["委婉", "请求"]
  },
  {
    "id": "ph740",
    "english": "would it be possible to...",
    "chinese": "是否有可能……",
    "context": "正式询问可能性",
    "tags": ["商务", "礼貌"]
  },
  {
    "id": "ph741",
    "english": "do you think you could...",
    "chinese": "你觉得你能……吗？",
    "context": "探询式请求",
    "tags": ["询问", "社交"]
  },
  {
    "id": "ph742",
    "english": "i was wondering if you could...",
    "chinese": "我一直在想你是否能……",
    "context": "非常委婉的请求",
    "tags": ["含蓄", "礼貌"]
  },
  {
    "id": "ph743",
    "english": "if it's not too much trouble...",
    "chinese": "如果不麻烦的话……",
    "context": "体贴的请求开场",
    "tags": ["体贴", "礼貌"]
  },
  {
    "id": "ph744",
    "english": "i'd be grateful if you could...",
    "chinese": "如果你能……我将不胜感激。",
    "context": "书面或正式请求",
    "tags": ["正式", "感恩"]
  },
  {
    "id": "ph745",
    "english": "how do you feel about it?",
    "chinese": "你对此感觉如何？",
    "context": "询问情感反馈",
    "tags": ["观点", "感受"]
  },
  {
    "id": "ph746",
    "english": "what are your thoughts?",
    "chinese": "你怎么想？",
    "context": "询问看法",
    "tags": ["讨论", "观点"]
  },
  {
    "id": "ph747",
    "english": "how do you see it?",
    "chinese": "你是怎么看的？",
    "context": "询问立场",
    "tags": ["分析", "交流"]
  },
  {
    "id": "ph748",
    "english": "what's your take on this?",
    "chinese": "关于这个，你的见解是什么？",
    "context": "询问专业或个人观点",
    "tags": ["地道", "讨论"]
  },
  {
    "id": "ph749",
    "english": "where do you stand on this?",
    "chinese": "你的立场是什么？",
    "context": "询问辩论或争议话题的立场",
    "tags": ["立场", "严肃"]
  },
  {
    "id": "ph750",
    "english": "what's your perspective?",
    "chinese": "你的视角/观点是什么？",
    "context": "询问全面看法",
    "tags": ["正式", "思维"]
  },
  {
    "id": "ph751",
    "english": "how does that sound?",
    "chinese": "听起来怎么样？",
    "context": "提议后征求意见",
    "tags": ["建议", "反馈"]
  },
  {
    "id": "ph752",
    "english": "what are your views on this?",
    "chinese": "你对此有什么看法？",
    "context": "正式征求意见",
    "tags": ["正式", "观点"]
  },
  {
    "id": "ph753",
    "english": "in my opinion...",
    "chinese": "依我看来……",
    "context": "表达观点",
    "tags": ["表达", "基础"]
  },
  {
    "id": "ph754",
    "english": "from my point of view...",
    "chinese": "从我的角度来看……",
    "context": "说明立场",
    "tags": ["主观", "讨论"]
  },
  {
    "id": "ph755",
    "english": "as far as i'm concerned...",
    "chinese": "就我而言……",
    "context": "表达个人关联度高的观点",
    "tags": ["强调", "个人"]
  },
  {
    "id": "ph756",
    "english": "if you ask me...",
    "chinese": "如果你问我的话……",
    "context": "给出非正式建议或看法",
    "tags": ["非正式", "观点"]
  },
  {
    "id": "ph757",
    "english": "to my mind...",
    "chinese": "在我看来……",
    "context": "较正式的观点表达",
    "tags": ["思维", "正式"]
  },
  {
    "id": "ph758",
    "english": "personally, i think...",
    "chinese": "就我个人而言，我认为……",
    "context": "区分个人与集体观点",
    "tags": ["主观", "明确"]
  },
  {
    "id": "ph759",
    "english": "it seems to me that...",
    "chinese": "在我看来好像……",
    "context": "基于观察的推断",
    "tags": ["推断", "委婉"]
  },
  {
    "id": "ph760",
    "english": "i believe that...",
    "chinese": "我相信……",
    "context": "表达坚定信念",
    "tags": ["信念", "表达"]
  },
  {
    "id": "ph761",
    "english": "i feel that...",
    "chinese": "我觉得……",
    "context": "基于直觉或情感表达",
    "tags": ["直觉", "对话"]
  },
  {
    "id": "ph762",
    "english": "my view is that...",
    "chinese": "我的观点是……",
    "context": "正式陈述立场",
    "tags": ["专业", "立场"]
  },
  {
    "id": "ph763",
    "english": "i agree completely.",
    "chinese": "我完全同意。",
    "context": "表达高度赞同",
    "tags": ["认同", "积极"]
  },
  {
    "id": "ph764",
    "english": "i couldn't agree more.",
    "chinese": "我再同意不过了。",
    "context": "极度赞同某观点",
    "tags": ["强烈赞同", "地道"]
  },
  {
    "id": "ph765",
    "english": "that's exactly how i feel.",
    "chinese": "我也正是这么想的。",
    "context": "表达情感上的共鸣",
    "tags": ["共鸣", "赞同"]
  },
  {
    "id": "ph766",
    "english": "you're absolutely right.",
    "chinese": "你完全正确。",
    "context": "肯定对方",
    "tags": ["肯定", "正确"]
  },
  {
    "id": "ph767",
    "english": "that's just what i was thinking.",
    "chinese": "我刚才也正想着呢。",
    "context": "表达不谋而合",
    "tags": ["巧合", "一致"]
  },
  {
    "id": "ph768",
    "english": "i see your point.",
    "chinese": "我明白你的意思。",
    "context": "理解但不一定完全认同",
    "tags": ["理解", "中性"]
  },
  {
    "id": "ph769",
    "english": "you have a good point.",
    "chinese": "你说得很有道理。",
    "context": "认可对方逻辑",
    "tags": ["认可", "讨论"]
  },
  {
    "id": "ph770",
    "english": "i agree with you to some extent.",
    "chinese": "我在某种程度上同意你的观点。",
    "context": "部分认同",
    "tags": ["谨慎", "讨论"]
  },
  {
    "id": "ph771",
    "english": "i see where you're coming from.",
    "chinese": "我理解你的立场。",
    "context": "表达同理心",
    "tags": ["理解", "同理心"]
  },
  {
    "id": "ph772",
    "english": "i'm afraid i disagree.",
    "chinese": "恐怕我不能认同。",
    "context": "委婉表达异议",
    "tags": ["异议", "礼貌"]
  },
  {
    "id": "ph773",
    "english": "i'm not sure about that.",
    "chinese": "我对那个不太确定。",
    "context": "质疑某事",
    "tags": ["怀疑", "委婉"]
  },
  {
    "id": "ph774",
    "english": "i see it differently.",
    "chinese": "我有不同的看法。",
    "context": "温和地表达对立观点",
    "tags": ["分歧", "客观"]
  },
  {
    "id": "ph775",
    "english": "that's not always true.",
    "chinese": "那也不一定。",
    "context": "指出例外情况",
    "tags": ["辩论", "质疑"]
  },
  {
    "id": "ph776",
    "english": "i'm not convinced.",
    "chinese": "我还没被说服。",
    "context": "表示证据不足或不信",
    "tags": ["怀疑", "逻辑"]
  },
  {
    "id": "ph777",
    "english": "i have a different perspective.",
    "chinese": "我有一个不同的视角。",
    "context": "在会议中提出新思路",
    "tags": ["正式", "创新"]
  },
  {
    "id": "ph778",
    "english": "we'll have to agree to disagree.",
    "chinese": "我们只能求同存异了。",
    "context": "终止无法达成一致的争论",
    "tags": ["妥协", "地道"]
  },
  {
    "id": "ph779",
    "english": "i respect your opinion, but...",
    "chinese": "我尊重你的意见，但是……",
    "context": "先礼后兵的转折",
    "tags": ["转折", "礼貌"]
  },
  {
    "id": "ph780",
    "english": "i understand your point, but...",
    "chinese": "我理解你的意思，但是……",
    "context": "说明理解但有反例",
    "tags": ["逻辑", "反驳"]
  },
  {
    "id": "ph781",
    "english": "can i let you know later?",
    "chinese": "我待会儿再告诉你行吗？",
    "context": "推迟做决定",
    "tags": ["时间", "非正式"]
  },
  {
    "id": "ph782",
    "english": "i need some time to think.",
    "chinese": "我需要点时间考虑。",
    "context": "深思熟虑的请求",
    "tags": ["决策", "慎重"]
  },
  {
    "id": "ph783",
    "english": "let me sleep on it.",
    "chinese": "让我考虑一晚再决定。",
    "context": "重大决策推迟到明天",
    "tags": ["地道", "决策"]
  },
  {
    "id": "ph784",
    "english": "i'll give it some thought.",
    "chinese": "我会好好想想的。",
    "context": "承诺会考虑",
    "tags": ["积极", "回应"]
  },
  {
    "id": "ph785",
    "english": "i'm still thinking about it.",
    "chinese": "我还在考虑中。",
    "context": "表示尚未有结论",
    "tags": ["状态", "持续"]
  },
  {
    "id": "ph786",
    "english": "i haven't decided yet.",
    "chinese": "我还没决定呢。",
    "context": "犹豫不决",
    "tags": ["决策", "现状"]
  },
  {
    "id": "ph787",
    "english": "i'm torn between...",
    "chinese": "我在……之间犹豫不决。",
    "context": "面临二选一的难题",
    "tags": ["纠结", "选择"]
  },
  {
    "id": "ph788",
    "english": "what do you suggest?",
    "chinese": "你有什么建议？",
    "context": "寻求建议",
    "tags": ["求助", "建议"]
  },
  {
    "id": "ph789",
    "english": "what would you do in my situation?",
    "chinese": "如果你是我，你会怎么做？",
    "context": "寻求同理心建议",
    "tags": ["咨询", "换位思考"]
  },
  {
    "id": "ph790",
    "english": "can you give me some advice?",
    "chinese": "你能给我点建议吗？",
    "context": "寻求指导",
    "tags": ["咨询", "生活"]
  },
  {
    "id": "ph791",
    "english": "i'd like your input.",
    "chinese": "我想听听你的看法。",
    "context": "工作中邀请同事参与",
    "tags": ["协作", "职场"]
  },
  {
    "id": "ph792",
    "english": "what's your advice?",
    "chinese": "你的建议是什么？",
    "context": "直接询问对策",
    "tags": ["建议", "对策"]
  },
  {
    "id": "ph793",
    "english": "how do you think i should proceed?",
    "chinese": "你觉得我接下来该怎么做？",
    "context": "询问操作步骤",
    "tags": ["指导", "正式"]
  },
  {
    "id": "ph794",
    "english": "any suggestions?",
    "chinese": "有什么建议吗？",
    "context": "会议或讨论结束语",
    "tags": ["开放", "讨论"]
  },
  {
    "id": "ph795",
    "english": "i'm open to suggestions.",
    "chinese": "我乐于听取建议。",
    "context": "表现开放的态度",
    "tags": ["心态", "包容"]
  },
  {
    "id": "ph796",
    "english": "i value your opinion.",
    "chinese": "我很看重你的意见。",
    "context": "表示尊重和认可",
    "tags": ["尊重", "社交"]
  },
  {
    "id": "ph797",
    "english": "why don't we...",
    "chinese": "我们为什么不……呢？",
    "context": "提出积极提议",
    "tags": ["建议", "行动"]
  },
  {
    "id": "ph798",
    "english": "how about...",
    "chinese": "……怎么样？",
    "context": "提出选项",
    "tags": ["建议", "选项"]
  },
  {
    "id": "ph799",
    "english": "what about...",
    "chinese": "那……呢？",
    "context": "补充建议",
    "tags": ["建议", "补充"]
  },
  {
    "id": "ph800",
    "english": "maybe we could...",
    "chinese": "也许我们可以……",
    "context": "试探性提议",
    "tags": ["委婉", "协作"]
  },
  {
    "id": "ph801",
    "english": "have you considered...",
    "chinese": "你有没有考虑过……",
    "context": "启发式建议",
    "tags": ["思考", "建议"]
  },
  {
    "id": "ph802",
    "english": "it might be a good idea to...",
    "chinese": "……可能是一个好主意。",
    "context": "温和地给出对策",
    "tags": ["主意", "建设性"]
  },
  {
    "id": "ph803",
    "english": "if i were you, i would...",
    "chinese": "如果我是你，我会……",
    "context": "经验分享式建议",
    "tags": ["经验", "生活"]
  },
  {
    "id": "ph804",
    "english": "you might want to...",
    "chinese": "你可能想要……（建议尝试）",
    "context": "委婉的建议",
    "tags": ["委婉", "指导"]
  },
  {
    "id": "ph805",
    "english": "i recommend that you...",
    "chinese": "我建议你……",
    "context": "正式推荐",
    "tags": ["推荐", "正式"]
  },
  {
    "id": "ph806",
    "english": "my advice would be to...",
    "chinese": "我的建议是……",
    "context": "总结性意见",
    "tags": ["建议", "指导"]
  },
  {
    "id": "ph807",
    "english": "do you have the time?",
    "chinese": "你知道现在几点吗？",
    "context": "询问具体时刻",
    "tags": ["时间", "基础"]
  },
  {
    "id": "ph808",
    "english": "it's about...",
    "chinese": "大约是……（点钟）",
    "context": "模糊描述时间",
    "tags": ["时间", "日常"]
  },
  {
    "id": "ph809",
    "english": "it's a quarter past...",
    "chinese": "……点一刻",
    "context": "描述时间",
    "tags": ["时间", "表达"]
  },
  {
    "id": "ph810",
    "english": "it's half past...",
    "chinese": "……点半",
    "context": "描述时间",
    "tags": ["时间", "常用"]
  },
  {
    "id": "ph811",
    "english": "it's a quarter to...",
    "chinese": "差一刻到……点",
    "context": "描述时间",
    "tags": ["时间", "表达"]
  },
  {
    "id": "ph812",
    "english": "it's time to go.",
    "chinese": "该走了。",
    "context": "准备离开",
    "tags": ["离开", "日常"]
  },
  {
    "id": "ph813",
    "english": "time's up.",
    "chinese": "时间到。",
    "context": "截止时间已到",
    "tags": ["时间", "提醒"]
  },
  {
    "id": "ph814",
    "english": "i'm right on time.",
    "chinese": "我准时到了。",
    "context": "表达守时",
    "tags": ["守时", "社交"]
  },
  {
    "id": "ph815",
    "english": "where do you live?",
    "chinese": "你住在哪里？",
    "context": "询问居住地",
    "tags": ["询问", "社交"]
  },
  {
    "id": "ph816",
    "english": "i live in...",
    "chinese": "我住在……",
    "context": "介绍居住地",
    "tags": ["自我介绍", "居住"]
  },
  {
    "id": "ph817",
    "english": "i'm originally from...",
    "chinese": "我原籍是……/我来自……",
    "context": "介绍家乡",
    "tags": ["背景", "社交"]
  },
  {
    "id": "ph818",
    "english": "how long have you lived here?",
    "chinese": "你在这里住多久了？",
    "context": "闲聊居住时长",
    "tags": ["询问", "对话"]
  },
  {
    "id": "ph819",
    "english": "i've lived here for...",
    "chinese": "我在这里住了……（多久）",
    "context": "回答居住时长",
    "tags": ["时间", "经历"]
  },
  {
    "id": "ph820",
    "english": "do you like living here?",
    "chinese": "你喜欢住在这儿吗？",
    "context": "询问对某地的看法",
    "tags": ["感受", "生活"]
  },
  {
    "id": "ph821",
    "english": "what's it like living here?",
    "chinese": "住在这里是什么感觉？",
    "context": "深入交流",
    "tags": ["生活", "看法"]
  },
  {
    "id": "ph822",
    "english": "it's a nice place to live.",
    "chinese": "这是个宜居的好地方。",
    "context": "评价居住地",
    "tags": ["评价", "生活"]
  },
  {
    "id": "ph823",
    "english": "i'm thinking of moving.",
    "chinese": "我正在考虑搬家。",
    "context": "谈论未来计划",
    "tags": ["计划", "居住"]
  },
  {
    "id": "ph824",
    "english": "what's your occupation?",
    "chinese": "你的职业是什么？",
    "context": "正式询问职业",
    "tags": ["职场", "询问"]
  },
  {
    "id": "ph825",
    "english": "what field are you in?",
    "chinese": "你从事哪个行业？",
    "context": "询问行业领域",
    "tags": ["职场", "专业"]
  },
  {
    "id": "ph826",
    "english": "i'm in...",
    "chinese": "我在……行业。",
    "context": "回答职业所属领域",
    "tags": ["职场", "介绍"]
  },
  {
    "id": "ph827",
    "english": "i work in...",
    "chinese": "我在……（部门/领域）工作。",
    "context": "介绍工作背景",
    "tags": ["工作", "社交"]
  },
  {
    "id": "ph828",
    "english": "i'm self-employed.",
    "chinese": "我是自由职业者。",
    "context": "说明工作状态",
    "tags": ["职业", "介绍"]
  },
  {
    "id": "ph829",
    "english": "i run my own business.",
    "chinese": "我自己做生意。",
    "context": "介绍创业状态",
    "tags": ["创业", "职业"]
  },
  {
    "id": "ph830",
    "english": "i'm between jobs at the moment.",
    "chinese": "我目前正在待业中。",
    "context": "委婉说明失业状态",
    "tags": ["职业", "委婉"]
  },
  {
    "id": "ph831",
    "english": "i'm looking for a job.",
    "chinese": "我正在找工作。",
    "context": "寻求职场机会",
    "tags": ["求职", "目标"]
  },
  {
    "id": "ph832",
    "english": "i'm retired.",
    "chinese": "我退休了。",
    "context": "介绍生活状态",
    "tags": ["状态", "生活"]
  },
  {
    "id": "ph833",
    "english": "what are your hobbies?",
    "chinese": "你的爱好是什么？",
    "context": "社交闲聊",
    "tags": ["兴趣", "询问"]
  },
  {
    "id": "ph834",
    "english": "what do you do for fun?",
    "chinese": "你平时有什么消遣？",
    "context": "非正式询问爱好",
    "tags": ["兴趣", "轻松"]
  },
  {
    "id": "ph835",
    "english": "how do you spend your free time?",
    "chinese": "你闲暇时间怎么过？",
    "context": "询问日常生活",
    "tags": ["生活", "社交"]
  },
  {
    "id": "ph836",
    "english": "i enjoy...",
    "chinese": "我喜欢/享受……",
    "context": "介绍个人兴趣",
    "tags": ["兴趣", "介绍"]
  },
  {
    "id": "ph837",
    "english": "i'm into...",
    "chinese": "我非常喜欢……",
    "context": "表达强烈的兴趣",
    "tags": ["兴趣", "口语"]
  },
  {
    "id": "ph838",
    "english": "i'm a big fan of...",
    "chinese": "我是……的狂热粉丝。",
    "context": "表达热爱",
    "tags": ["热爱", "兴趣"]
  },
  {
    "id": "ph839",
    "english": "i like to...",
    "chinese": "我喜欢去做……",
    "context": "描述习惯性爱好",
    "tags": ["习惯", "兴趣"]
  },
  {
    "id": "ph840",
    "english": "in my spare time, i...",
    "chinese": "在业余时间，我……",
    "context": "描述生活细节",
    "tags": ["生活", "介绍"]
  },
  {
    "id": "ph841",
    "english": "i don't have much free time.",
    "chinese": "我没多少空余时间。",
    "context": "表达忙碌",
    "tags": ["时间", "忙碌"]
  },
  {
    "id": "ph842",
    "english": "i wish i had more time for hobbies.",
    "chinese": "我真希望有更多时间搞爱好。",
    "context": "表达感慨",
    "tags": ["愿望", "时间"]
  },
  {
    "id": "ph843",
    "english": "it's beautiful outside.",
    "chinese": "外面天气真好。",
    "context": "谈论天气",
    "tags": ["天气", "环境"]
  },
  {
    "id": "ph844",
    "english": "it's raining.",
    "chinese": "在下雨。",
    "context": "描述即时天气",
    "tags": ["天气", "雨"]
  },
  {
    "id": "ph845",
    "english": "it's snowing.",
    "chinese": "在下雪。",
    "context": "描述即时天气",
    "tags": ["天气", "雪"]
  },
  {
    "id": "ph846",
    "english": "it's windy.",
    "chinese": "风很大。",
    "context": "描述天气状态",
    "tags": ["天气", "风"]
  },
  {
    "id": "ph847",
    "english": "it's humid.",
    "chinese": "空气很潮湿。",
    "context": "描述气候",
    "tags": ["天气", "体感"]
  },
  {
    "id": "ph848",
    "english": "it's freezing cold.",
    "chinese": "冷极了。",
    "context": "描述严寒",
    "tags": ["天气", "温度"]
  },
  {
    "id": "ph849",
    "english": "it's hot and sticky.",
    "chinese": "又热又闷（黏糊糊的）。",
    "context": "描述闷热天气",
    "tags": ["天气", "体感"]
  },
  {
    "id": "ph850",
    "english": "the weather is changing.",
    "chinese": "天气正在发生变化。",
    "context": "观察气候",
    "tags": ["天气", "观察"]
  },
  {
    "id": "ph851",
    "english": "i hope the weather improves.",
    "chinese": "我希望天气能好转。",
    "context": "表达愿望",
    "tags": ["天气", "期待"]
  },
  {
    "id": "ph852",
    "english": "how about some coffee?",
    "chinese": "喝杯咖啡怎么样？",
    "context": "提出建议",
    "tags": ["饮食", "提议"]
  },
  {
    "id": "ph853",
    "english": "would you like something to drink?",
    "chinese": "你想喝点什么吗？",
    "context": "款待客人",
    "tags": ["礼貌", "饮食"]
  },
  {
    "id": "ph854",
    "english": "i'll have what you're having.",
    "chinese": "你点什么我就点什么。",
    "context": "点餐",
    "tags": ["点餐", "社交"]
  },
  {
    "id": "ph855",
    "english": "just water for me, thanks.",
    "chinese": "给我水就行，谢谢。",
    "context": "表达饮食需求",
    "tags": ["点餐", "简洁"]
  },
  {
    "id": "ph856",
    "english": "i'm not thirsty.",
    "chinese": "我不渴。",
    "context": "婉拒饮品",
    "tags": ["拒绝", "状态"]
  },
  {
    "id": "ph857",
    "english": "are you hungry?",
    "chinese": "你饿吗？",
    "context": "关心对方需求",
    "tags": ["饮食", "询问"]
  },
  {
    "id": "ph858",
    "english": "let's grab a bite to eat.",
    "chinese": "我们去随便吃点东西吧。",
    "context": "非正式邀约吃饭",
    "tags": ["邀约", "餐饮"]
  },
  {
    "id": "ph859",
    "english": "i could eat.",
    "chinese": "我能吃下点东西。（表示有点饿）",
    "context": "回应吃饭提议",
    "tags": ["回应", "地道"]
  },
  {
    "id": "ph860",
    "english": "i'm starving.",
    "chinese": "我饿扁了。",
    "context": "强调极度饥饿",
    "tags": ["强调", "状态"]
  },
  {
    "id": "ph861",
    "english": "what are your plans for the weekend?",
    "chinese": "你周末有什么计划？",
    "context": "询问假期打算",
    "tags": ["计划", "社交"]
  },
  {
    "id": "ph862",
    "english": "do you have anything planned?",
    "chinese": "你有安排好的事吗？",
    "context": "询问日程",
    "tags": ["计划", "对话"]
  },
  {
    "id": "ph863",
    "english": "i'm going to...",
    "chinese": "我打算去……",
    "context": "陈述计划",
    "tags": ["计划", "行动"]
  },
  {
    "id": "ph864",
    "english": "i'm thinking of...",
    "chinese": "我在考虑……",
    "context": "陈述不确定的打算",
    "tags": ["考虑", "计划"]
  },
  {
    "id": "ph865",
    "english": "i haven't decided yet.",
    "chinese": "我还没决定。",
    "context": "表示尚无安排",
    "tags": ["决策", "现状"]
  },
  {
    "id": "ph866",
    "english": "i have nothing planned.",
    "chinese": "我没什么特别的安排。",
    "context": "回答询问",
    "tags": ["空闲", "回应"]
  },
  {
    "id": "ph867",
    "english": "i'm just going to relax.",
    "chinese": "我就打算放松一下。",
    "context": "描述假期状态",
    "tags": ["休息", "心情"]
  },
  {
    "id": "ph868",
    "english": "i need to catch up on some sleep.",
    "chinese": "我需要补个觉。",
    "context": "表达疲劳和需求",
    "tags": ["健康", "休息"]
  },
  {
    "id": "ph869",
    "english": "i have a busy weekend ahead.",
    "chinese": "我接下来的周末会很忙。",
    "context": "陈述日程繁忙",
    "tags": ["忙碌", "时间"]
  },
  {
    "id": "ph870",
    "english": "i'm looking forward to the weekend.",
    "chinese": "我非常期待周末。",
    "context": "表达心情",
    "tags": ["心情", "期待"]
  },
  {
    "id": "ph871",
    "english": "i need a ticket to london",
    "chinese": "我需要一张去伦敦的票。",
    "context": "购票咨询",
    "tags": ["旅行", "交通"]
  },
  {
    "id": "ph872",
    "english": "what time is the next flight?",
    "chinese": "下一班飞机是几点？",
    "context": "询问航班",
    "tags": ["航班", "旅行"]
  },
  {
    "id": "ph873",
    "english": "is this flight on time?",
    "chinese": "这班飞机准点吗？",
    "context": "确认状态",
    "tags": ["确认", "航班"]
  },
  {
    "id": "ph874",
    "english": "has the flight been delayed?",
    "chinese": "航班延误了吗？",
    "context": "询问变动",
    "tags": ["航班", "查询"]
  },
  {
    "id": "ph875",
    "english": "what gate does my flight depart from?",
    "chinese": "我的航班在哪个登机口？",
    "context": "寻找位置",
    "tags": ["机场", "指引"]
  },
  {
    "id": "ph876",
    "english": "where is the check-in counter?",
    "chinese": "办理登机的柜台在哪里？",
    "context": "寻找位置",
    "tags": ["机场", "指引"]
  },
  {
    "id": "ph877",
    "english": "i'd like to check in, please",
    "chinese": "我想办理登机/入住手续。",
    "context": "办理手续",
    "tags": ["正式", "旅行"]
  },
  {
    "id": "ph878",
    "english": "can i have a window seat?",
    "chinese": "我可以要一个靠窗的座位吗？",
    "context": "选座请求",
    "tags": ["请求", "旅行"]
  },
  {
    "id": "ph879",
    "english": "can i have an aisle seat?",
    "chinese": "我可以要一个靠近走道的座位吗？",
    "context": "选座请求",
    "tags": ["请求", "旅行"]
  },
  {
    "id": "ph880",
    "english": "how many bags can i check?",
    "chinese": "我可以托运几件行李？",
    "context": "咨询规定",
    "tags": ["行李", "咨询"]
  },
  {
    "id": "ph881",
    "english": "where is the baggage claim?",
    "chinese": "行李领取处在哪里？",
    "context": "寻找位置",
    "tags": ["指引", "行李"]
  },
  {
    "id": "ph882",
    "english": "my luggage is missing",
    "chinese": "我的行李丢了。",
    "context": "报失",
    "tags": ["紧急", "行李"]
  },
  {
    "id": "ph883",
    "english": "i need to report lost luggage",
    "chinese": "我需要登记遗失的行李。",
    "context": "机场服务",
    "tags": ["服务", "行李"]
  },
  {
    "id": "ph884",
    "english": "where is the customs office?",
    "chinese": "海关办公室在哪里？",
    "context": "寻找位置",
    "tags": ["海关", "指引"]
  },
  {
    "id": "ph885",
    "english": "i have nothing to declare",
    "chinese": "我没有需要申报的物品。",
    "context": "过海关",
    "tags": ["海关", "法律"]
  },
  {
    "id": "ph886",
    "english": "these are for personal use",
    "chinese": "这些是个人自用品。",
    "context": "海关查验解释",
    "tags": ["解释", "海关"]
  },
  {
    "id": "ph887",
    "english": "how long will it take to get through customs?",
    "chinese": "过海关需要多长时间？",
    "context": "咨询时间",
    "tags": ["时间", "海关"]
  },
  {
    "id": "ph888",
    "english": "do i need to fill out a customs form?",
    "chinese": "我需要填写海关申报单吗？",
    "context": "询问流程",
    "tags": ["海关", "流程"]
  },
  {
    "id": "ph889",
    "english": "what is the exchange rate?",
    "chinese": "汇率是多少？",
    "context": "货币兑换",
    "tags": ["金融", "旅行"]
  },
  {
    "id": "ph890",
    "english": "i need a taxi",
    "chinese": "我需要一辆出租车。",
    "context": "交通请求",
    "tags": ["交通", "需求"]
  },
  {
    "id": "ph891",
    "english": "can you call a taxi for me?",
    "chinese": "你能帮我叫辆出租车吗？",
    "context": "寻求帮助",
    "tags": ["服务", "交通"]
  },
  {
    "id": "ph892",
    "english": "how much is it to the city center?",
    "chinese": "到市中心要多少钱？",
    "context": "咨询费用",
    "tags": ["交通", "金钱"]
  },
  {
    "id": "ph893",
    "english": "can you take me to this address?",
    "chinese": "你能带我去这个地址吗？",
    "context": "搭乘出租车",
    "tags": ["交通", "指引"]
  },
  {
    "id": "ph894",
    "english": "is the bus station nearby?",
    "chinese": "巴士站在这附近吗？",
    "context": "问路",
    "tags": ["交通", "询问"]
  },
  {
    "id": "ph895",
    "english": "where can i buy a bus ticket?",
    "chinese": "我在哪儿能买到巴士票？",
    "context": "寻找位置",
    "tags": ["购票", "交通"]
  },
  {
    "id": "ph896",
    "english": "does this bus go to downtown?",
    "chinese": "这辆车去市中心吗？",
    "context": "确认路线",
    "tags": ["交通", "确认"]
  },
  {
    "id": "ph897",
    "english": "how often does the bus come?",
    "chinese": "巴士多久一班？",
    "context": "咨询频率",
    "tags": ["时间", "频率"]
  },
  {
    "id": "ph898",
    "english": "which line goes to the museum?",
    "chinese": "哪条线路去博物馆？",
    "context": "咨询路线",
    "tags": ["指引", "旅游"]
  },
  {
    "id": "ph899",
    "english": "i have a reservation",
    "chinese": "我有预订。",
    "context": "办理入住/就餐",
    "tags": ["服务", "预订"]
  },
  {
    "id": "ph900",
    "english": "my name is on the reservation",
    "chinese": "预订是用我的名字登记的。",
    "context": "核对身份",
    "tags": ["服务", "身份"]
  },
  {
    "id": "ph901",
    "english": "i'd like to check in",
    "chinese": "我想办理入住手续。",
    "context": "酒店柜台",
    "tags": ["酒店", "手续"]
  },
  {
    "id": "ph902",
    "english": "i'd like to check out",
    "chinese": "我想办理退房手续。",
    "context": "酒店柜台",
    "tags": ["酒店", "手续"]
  },
  {
    "id": "ph903",
    "english": "what time is check-in?",
    "chinese": "入住时间是几点？",
    "context": "咨询时间",
    "tags": ["酒店", "规定"]
  },
  {
    "id": "ph904",
    "english": "is breakfast included?",
    "chinese": "包含早餐吗？",
    "context": "咨询服务内容",
    "tags": ["酒店", "餐饮"]
  },
  {
    "id": "ph905",
    "english": "does the room have wi-fi?",
    "chinese": "房间里有Wi-Fi吗？",
    "context": "咨询设施",
    "tags": ["酒店", "网络"]
  },
  {
    "id": "ph906",
    "english": "is there room service?",
    "chinese": "有客房服务吗？",
    "context": "咨询服务",
    "tags": ["酒店", "服务"]
  },
  {
    "id": "ph907",
    "english": "can i have a wake-up call?",
    "chinese": "我可以预约叫醒服务吗？",
    "context": "酒店服务请求",
    "tags": ["酒店", "服务"]
  },
  {
    "id": "ph908",
    "english": "the room is too hot/cold",
    "chinese": "房间里太热/太冷了。",
    "context": "表达不满",
    "tags": ["投诉", "环境"]
  },
  {
    "id": "ph909",
    "english": "the air conditioning isn't working",
    "chinese": "空调不工作了。",
    "context": "报修设施",
    "tags": ["投诉", "设施"]
  },
  {
    "id": "ph910",
    "english": "there's no hot water",
    "chinese": "没有热水了。",
    "context": "报修设施",
    "tags": ["投诉", "生活"]
  },
  {
    "id": "ph911",
    "english": "the toilet is clogged",
    "chinese": "马桶堵了。",
    "context": "报修设施",
    "tags": ["投诉", "卫生"]
  },
  {
    "id": "ph912",
    "english": "can i change rooms?",
    "chinese": "我可以换个房间吗？",
    "context": "更换服务请求",
    "tags": ["请求", "酒店"]
  },
  {
    "id": "ph913",
    "english": "can you send someone to fix it?",
    "chinese": "你能派人来修理一下吗？",
    "context": "寻求工程帮助",
    "tags": ["服务", "修理"]
  },
  {
    "id": "ph914",
    "english": "i need more towels",
    "chinese": "我需要更多毛巾。",
    "context": "补充用品请求",
    "tags": ["客房服务", "用品"]
  },
  {
    "id": "ph915",
    "english": "can i have an extra pillow?",
    "chinese": "能多给我一个枕头吗？",
    "context": "补充用品请求",
    "tags": ["客房服务", "舒适"]
  },
  {
    "id": "ph916",
    "english": "is there a safe in the room?",
    "chinese": "房间里有保险箱吗？",
    "context": "咨询设施",
    "tags": ["安全", "设施"]
  },
  {
    "id": "ph917",
    "english": "how do i use the safe?",
    "chinese": "保险箱怎么用？",
    "context": "操作咨询",
    "tags": ["询问", "指导"]
  },
  {
    "id": "ph918",
    "english": "i'm looking for a restaurant",
    "chinese": "我正在找餐厅。",
    "context": "寻觅餐饮",
    "tags": ["饮食", "旅游"]
  },
  {
    "id": "ph919",
    "english": "what's the local specialty?",
    "chinese": "当地的特色菜是什么？",
    "context": "寻求推荐",
    "tags": ["美食", "文化"]
  },
  {
    "id": "ph920",
    "english": "i'd like a table for two",
    "chinese": "我想要一个两人的位置。",
    "context": "餐厅领位",
    "tags": ["餐饮", "请求"]
  },
  {
    "id": "ph921",
    "english": "can we see the menu?",
    "chinese": "我们可以看一下菜单吗？",
    "context": "准备点餐",
    "tags": ["餐饮", "请求"]
  },
  {
    "id": "ph922",
    "english": "do you have an english menu?",
    "chinese": "你们有英文菜单吗？",
    "context": "特殊需求",
    "tags": ["餐饮", "语言"]
  },
  {
    "id": "ph923",
    "english": "i'm vegetarian",
    "chinese": "我是素食者。",
    "context": "饮食限制说明",
    "tags": ["饮食", "个人习惯"]
  },
  {
    "id": "ph924",
    "english": "i'm allergic to nuts",
    "chinese": "我对坚果过敏。",
    "context": "过敏安全提醒",
    "tags": ["健康", "安全"]
  },
  {
    "id": "ph925",
    "english": "can you make it less spicy?",
    "chinese": "能做得不那么辣吗？",
    "context": "口味调整请求",
    "tags": ["餐饮", "定制"]
  },
  {
    "id": "ph926",
    "english": "the check, please",
    "chinese": "请买单。",
    "context": "结账",
    "tags": ["结账", "地道"]
  },
  {
    "id": "ph927",
    "english": "is service charge included?",
    "chinese": "包含服务费了吗？",
    "context": "确认账单详情",
    "tags": ["金钱", "餐饮"]
  },
  {
    "id": "ph928",
    "english": "keep the change",
    "chinese": "不用找零了。",
    "context": "支付小费",
    "tags": ["小费", "地道"]
  },
  {
    "id": "ph929",
    "english": "this isn't what i ordered",
    "chinese": "这跟我点的不一样。",
    "context": "纠错投诉",
    "tags": ["投诉", "餐饮"]
  },
  {
    "id": "ph930",
    "english": "the food is cold",
    "chinese": "菜凉了。",
    "context": "质量反馈",
    "tags": ["反馈", "餐饮"]
  },
  {
    "id": "ph931",
    "english": "can i have the bill?",
    "chinese": "我能拿一下账单吗？",
    "context": "准备结账",
    "tags": ["餐饮", "金钱"]
  },
  {
    "id": "ph932",
    "english": "is there a service charge?",
    "chinese": "有服务费吗？",
    "context": "咨询规定",
    "tags": ["询问", "金钱"]
  },
  {
    "id": "ph933",
    "english": "do you accept foreign currency?",
    "chinese": "你们收外币吗？",
    "context": "支付方式咨询",
    "tags": ["支付", "旅行"]
  },
  {
    "id": "ph934",
    "english": "can we split the bill?",
    "chinese": "我们可以分开结账吗？",
    "context": "支付偏好",
    "tags": ["社交", "支付"]
  },
  {
    "id": "ph935",
    "english": "where is the tourist information center?",
    "chinese": "旅游信息中心在哪里？",
    "context": "寻找指引",
    "tags": ["旅游", "咨询"]
  },
  {
    "id": "ph936",
    "english": "can i have a map of the city?",
    "chinese": "我能要一张城市地图吗？",
    "context": "寻求资源",
    "tags": ["指引", "资源"]
  },
  {
    "id": "ph937",
    "english": "what are the must-see attractions?",
    "chinese": "有哪些必看的景点？",
    "context": "寻求建议",
    "tags": ["旅游", "景点"]
  },
  {
    "id": "ph938",
    "english": "how do i get to the museum?",
    "chinese": "怎么去博物馆？",
    "context": "问路",
    "tags": ["旅游", "交通"]
  },
  {
    "id": "ph939",
    "english": "is it within walking distance?",
    "chinese": "走路能到吗？",
    "context": "确认距离",
    "tags": ["距离", "运动"]
  },
  {
    "id": "ph940",
    "english": "what time does it open/close?",
    "chinese": "几点开门/关门？",
    "context": "确认时间",
    "tags": ["营业时间", "咨询"]
  },
  {
    "id": "ph941",
    "english": "how much is the entrance fee?",
    "chinese": "门票多少钱？",
    "context": "咨询价格",
    "tags": ["景点", "金钱"]
  },
  {
    "id": "ph942",
    "english": "is there a student discount?",
    "chinese": "有学生优惠吗？",
    "context": "咨询优惠",
    "tags": ["优惠", "询问"]
  },
  {
    "id": "ph943",
    "english": "are there guided tours?",
    "chinese": "有导游讲解的服务吗？",
    "context": "咨询服务内容",
    "tags": ["服务", "旅游"]
  },
  {
    "id": "ph944",
    "english": "i'd like to book a tour",
    "chinese": "我想预订一个旅行团。",
    "context": "预订服务",
    "tags": ["预订", "旅游"]
  },
  {
    "id": "ph945",
    "english": "what does the tour include?",
    "chinese": "旅行团费包含什么内容？",
    "context": "咨询详情",
    "tags": ["咨询", "详情"]
  },
  {
    "id": "ph946",
    "english": "how long is the tour?",
    "chinese": "游览需要多长时间？",
    "context": "咨询行程时长",
    "tags": ["旅游", "时间"]
  },
  {
    "id": "ph947",
    "english": "what time does the tour start?",
    "chinese": "游览几点开始？",
    "context": "确认出发时间",
    "tags": ["旅游", "时间"]
  },
  {
    "id": "ph948",
    "english": "where does the tour pick us up?",
    "chinese": "我们在哪里上车/集合？",
    "context": "确认接送地点",
    "tags": ["旅游", "交通"]
  },
  {
    "id": "ph949",
    "english": "is lunch included?",
    "chinese": "包含午餐吗？",
    "context": "咨询服务内容",
    "tags": ["餐饮", "费用"]
  },
  {
    "id": "ph950",
    "english": "do i need to book in advance?",
    "chinese": "我需要提前预约吗？",
    "context": "咨询预订规则",
    "tags": ["预订", "咨询"]
  },
  {
    "id": "ph951",
    "english": "can i cancel my booking?",
    "chinese": "我可以取消预订吗？",
    "context": "处理变更",
    "tags": ["服务", "取消"]
  },
  {
    "id": "ph952",
    "english": "what's the cancellation policy?",
    "chinese": "取消预订的政策是什么？",
    "context": "了解违约条款",
    "tags": ["正式", "规定"]
  },
  {
    "id": "ph953",
    "english": "is there a refund if i cancel?",
    "chinese": "如果我取消，有退款吗？",
    "context": "涉及费用退还",
    "tags": ["金钱", "退款"]
  },
  {
    "id": "ph954",
    "english": "where can i buy souvenirs?",
    "chinese": "哪里可以买纪念品？",
    "context": "购物咨询",
    "tags": ["购物", "旅游"]
  },
  {
    "id": "ph955",
    "english": "can i try it on?",
    "chinese": "我可以试穿吗？",
    "context": "商店购物",
    "tags": ["购物", "服饰"]
  },
  {
    "id": "ph956",
    "english": "do you have this in a different size?",
    "chinese": "这个有别的尺码吗？",
    "context": "调整商品规格",
    "tags": ["购物", "询问"]
  },
  {
    "id": "ph957",
    "english": "do you have this in a different color?",
    "chinese": "这个有别的颜色吗？",
    "context": "调整商品规格",
    "tags": ["购物", "询问"]
  },
  {
    "id": "ph958",
    "english": "can you give me a discount?",
    "chinese": "能给我打个折吗？",
    "context": "议价",
    "tags": ["购物", "议价"]
  },
  {
    "id": "ph959",
    "english": "is this tax-free?",
    "chinese": "这个免税吗？",
    "context": "咨询税收优惠",
    "tags": ["购物", "税务"]
  },
  {
    "id": "ph960",
    "english": "can i have a receipt?",
    "chinese": "可以给我开张收据/发票吗？",
    "context": "索要凭证",
    "tags": ["购物", "正式"]
  },
  {
    "id": "ph961",
    "english": "i'm just looking",
    "chinese": "我只是随便看看。",
    "context": "婉拒导购",
    "tags": ["购物", "礼貌"]
  },
  {
    "id": "ph962",
    "english": "that's too expensive",
    "chinese": "那太贵了。",
    "context": "表达价格异议",
    "tags": ["评价", "金钱"]
  },
  {
    "id": "ph963",
    "english": "i'm lost",
    "chinese": "我迷路了。",
    "context": "寻求方位帮助",
    "tags": ["求助", "紧急"]
  },
  {
    "id": "ph964",
    "english": "can you help me find my way?",
    "chinese": "你能帮我指路吗？",
    "context": "请求指引",
    "tags": ["求助", "方向"]
  },
  {
    "id": "ph965",
    "english": "how do i get back to my hotel?",
    "chinese": "我怎么回酒店？",
    "context": "寻找回程路径",
    "tags": ["交通", "指引"]
  },
  {
    "id": "ph966",
    "english": "is this the right way to...?",
    "chinese": "去……是走这条路吗？",
    "context": "确认方向",
    "tags": ["确认", "方向"]
  },
  {
    "id": "ph967",
    "english": "can you show me on the map?",
    "chinese": "能在地图上指给我看吗？",
    "context": "视觉化确认方位",
    "tags": ["求助", "地图"]
  },
  {
    "id": "ph968",
    "english": "how far is it from here?",
    "chinese": "离这儿有多远？",
    "context": "评估距离",
    "tags": ["距离", "询问"]
  },
  {
    "id": "ph969",
    "english": "should i go left or right?",
    "chinese": "我应该往左走还是往右走？",
    "context": "确认转弯方向",
    "tags": ["方向", "细节"]
  },
  {
    "id": "ph970",
    "english": "is it straight ahead?",
    "chinese": "是一直往前走吗？",
    "context": "确认路径",
    "tags": ["方向", "确认"]
  },
  {
    "id": "ph971",
    "english": "can you write down the address?",
    "chinese": "你能写下地址吗？",
    "context": "记录重要信息",
    "tags": ["求助", "书写"]
  },
  {
    "id": "ph972",
    "english": "is there a landmark nearby?",
    "chinese": "附近有什么标志性建筑吗？",
    "context": "寻找参考点",
    "tags": ["方向", "观察"]
  },
  {
    "id": "ph973",
    "english": "i need a doctor",
    "chinese": "我需要看医生。",
    "context": "紧急医疗请求",
    "tags": ["紧急", "医疗"]
  },
  {
    "id": "ph974",
    "english": "can you call an ambulance?",
    "chinese": "你能帮忙叫辆救护车吗？",
    "context": "极端紧急情况",
    "tags": ["紧急", "生命安全"]
  },
  {
    "id": "ph975",
    "english": "where is the nearest hospital?",
    "chinese": "最近的医院在哪里？",
    "context": "寻求医疗指引",
    "tags": ["医疗", "位置"]
  },
  {
    "id": "ph976",
    "english": "i don't feel well",
    "chinese": "我感觉不舒服。",
    "context": "描述身体状况",
    "tags": ["健康", "状态"]
  },
  {
    "id": "ph977",
    "english": "i have a headache/fever",
    "chinese": "我头痛/发烧。",
    "context": "描述症状",
    "tags": ["医疗", "症状"]
  },
  {
    "id": "ph978",
    "english": "i need medicine for a cold",
    "chinese": "我需要感冒药。",
    "context": "药店咨询",
    "tags": ["健康", "药品"]
  },
  {
    "id": "ph979",
    "english": "where is the nearest pharmacy?",
    "chinese": "最近的药房在哪里？",
    "context": "寻找药品",
    "tags": ["指引", "医疗"]
  },
  {
    "id": "ph980",
    "english": "i'm allergic to penicillin",
    "chinese": "我对青霉素过敏。",
    "context": "重要过敏史告知",
    "tags": ["安全", "医疗"]
  },
  {
    "id": "ph981",
    "english": "do i need a prescription?",
    "chinese": "我需要处方吗？",
    "context": "购买药品咨询",
    "tags": ["规定", "医疗"]
  },
  {
    "id": "ph982",
    "english": "can i have painkillers?",
    "chinese": "我可以买些止痛药吗？",
    "context": "寻求常用药",
    "tags": ["医疗", "需求"]
  },
  {
    "id": "ph983",
    "english": "help!",
    "chinese": "救命！/ 帮帮我！",
    "context": "极度紧急呼救",
    "tags": ["紧急", "呼救"]
  },
  {
    "id": "ph984",
    "english": "call the police!",
    "chinese": "报警！",
    "context": "发生犯罪或危险",
    "tags": ["紧急", "法律"]
  },
  {
    "id": "ph985",
    "english": "i've been robbed",
    "chinese": "我被抢劫了。",
    "context": "报案描述",
    "tags": ["犯罪", "报案"]
  },
  {
    "id": "ph986",
    "english": "my wallet was stolen",
    "chinese": "我的钱包被偷了。",
    "context": "报案描述",
    "tags": ["财物遗失", "报案"]
  },
  {
    "id": "ph987",
    "english": "i lost my passport",
    "chinese": "我的护照丢了。",
    "context": "寻求领事或警方帮助",
    "tags": ["证件", "紧急"]
  },
  {
    "id": "ph988",
    "english": "where is the police station?",
    "chinese": "警察局在哪里？",
    "context": "寻找官方机构",
    "tags": ["位置", "官方"]
  },
  {
    "id": "ph989",
    "english": "i need to report a crime",
    "chinese": "我需要报案。",
    "context": "正式法律行为",
    "tags": ["正式", "法律"]
  },
  {
    "id": "ph990",
    "english": "can you help me contact the embassy?",
    "chinese": "你能帮我联系大使馆吗？",
    "context": "外交求助",
    "tags": ["官方", "领事"]
  },
  {
    "id": "ph991",
    "english": "i need a police report for insurance",
    "chinese": "我需要一份警方报告单用于保险（索赔）。",
    "context": "处理后续手续",
    "tags": ["正式", "保险"]
  },
  {
    "id": "ph992",
    "english": "is this area safe?",
    "chinese": "这个地段安全吗？",
    "context": "确认环境安全",
    "tags": ["安全", "询问"]
  },
  {
    "id": "ph993",
    "english": "is there a public restroom nearby?",
    "chinese": "附近有公共洗手间吗？",
    "context": "生理需求询问",
    "tags": ["生活", "指引"]
  },
  {
    "id": "ph994",
    "english": "how much does it cost to use the restroom?",
    "chinese": "使用洗手间多少钱？",
    "context": "咨询付费厕所",
    "tags": ["生活", "费用"]
  },
  {
    "id": "ph995",
    "english": "is the bathroom clean?",
    "chinese": "洗手间干净吗？",
    "context": "确认卫生状况",
    "tags": ["卫生", "生活"]
  },
  {
    "id": "ph996",
    "english": "is there toilet paper?",
    "chinese": "有纸巾吗？",
    "context": "确认消耗品",
    "tags": ["生活", "细节"]
  },
  {
    "id": "ph997",
    "english": "the bathroom is out of order",
    "chinese": "洗手间坏了（维修中）。",
    "context": "设施状态反馈",
    "tags": ["设施", "故障"]
  },
  {
    "id": "ph998",
    "english": "is there a changing room?",
    "chinese": "有更衣室吗？",
    "context": "购物或场馆咨询",
    "tags": ["设施", "服务"]
  },
  {
    "id": "ph999",
    "english": "where can i wash my hands?",
    "chinese": "我在哪里可以洗手？",
    "context": "卫生需求",
    "tags": ["卫生", "询问"]
  },
  {
    "id": "ph1000",
    "english": "is there a baby changing facility?",
    "chinese": "有婴儿打理设施/育婴室吗？",
    "context": "母婴需求",
    "tags": ["设施", "家庭"]
  },
  {
    "id": "ph1001",
    "english": "is the bathroom for men or women?",
    "chinese": "这是男厕还是女厕？",
    "context": "确认标识",
    "tags": ["生活", "确认"]
  },
  {
    "id": "ph1002",
    "english": "can you speak more slowly?",
    "chinese": "你能说慢一点吗？",
    "context": "语言交流障碍",
    "tags": ["交流", "礼貌"]
  },
  {
    "id": "ph1003",
    "english": "can you repeat that?",
    "chinese": "你能重复一遍吗？",
    "context": "请求确认信息",
    "tags": ["交流", "常用"]
  },
  {
    "id": "ph1004",
    "english": "what does this mean?",
    "chinese": "这是什么意思？",
    "context": "询问词义或含义",
    "tags": ["语言", "学习"]
  },
  {
    "id": "ph1005",
    "english": "how do you say this in english?",
    "chinese": "这个用英语怎么说？",
    "context": "翻译求助",
    "tags": ["语言", "学习"]
  },
  {
    "id": "ph1006",
    "english": "can you write it down?",
    "chinese": "你能把它写下来吗？",
    "context": "视觉化记录",
    "tags": ["交流", "求助"]
  },
  {
    "id": "ph1007",
    "english": "do you have an english translator?",
    "chinese": "你们有英文翻译人员吗？",
    "context": "寻求官方翻译服务",
    "tags": ["正式", "语言"]
  },
  {
    "id": "ph1008",
    "english": "i need an interpreter",
    "chinese": "我需要一名口译员。",
    "context": "重要交流场合",
    "tags": ["正式", "紧急"]
  },
  {
    "id": "ph1009",
    "english": "can you point to it?",
    "chinese": "你能指一下它在哪里吗？",
    "context": "肢体语言辅助",
    "tags": ["指引", "交流"]
  },
  {
    "id": "ph1010",
    "english": "i need to make a phone call",
    "chinese": "我需要打个电话。",
    "context": "寻求通讯帮助",
    "tags": ["通讯", "需求"]
  },
  {
    "id": "ph1011",
    "english": "where can i buy a sim card?",
    "chinese": "哪里可以买到电话卡？",
    "context": "通讯咨询",
    "tags": ["通讯", "旅行"]
  },
  {
    "id": "ph1012",
    "english": "i need to charge my phone",
    "chinese": "我需要给手机充电。",
    "context": "充电请求",
    "tags": ["电量", "需求"]
  },
  {
    "id": "ph1013",
    "english": "do you have a charger i can use?",
    "chinese": "你有我可以用的充电器吗？",
    "context": "借用物品",
    "tags": ["电量", "借物"]
  },
  {
    "id": "ph1014",
    "english": "is there free wi-fi here?",
    "chinese": "这里有免费Wi-Fi吗？",
    "context": "网络咨询",
    "tags": ["网络", "询问"]
  },
  {
    "id": "ph1015",
    "english": "my phone battery is dead",
    "chinese": "我手机没电了。",
    "context": "解释困境",
    "tags": ["状态", "紧急"]
  },
  {
    "id": "ph1016",
    "english": "can i use your phone?",
    "chinese": "我可以借用你的电话吗？",
    "context": "紧急求助",
    "tags": ["求助", "通讯"]
  },
  {
    "id": "ph1017",
    "english": "i need to contact my embassy",
    "chinese": "我需要联系我的大使馆。",
    "context": "正式领事保护",
    "tags": ["官方", "紧急"]
  },
  {
    "id": "ph1018",
    "english": "what's the emergency number?",
    "chinese": "急救/报警电话是多少？",
    "context": "确认当地报警电话",
    "tags": ["紧急", "安全"]
  },
  {
    "id": "ph1019",
    "english": "i'd like to extend my stay",
    "chinese": "我想延长续住。",
    "context": "酒店变更",
    "tags": ["酒店", "手续"]
  },
  {
    "id": "ph1020",
    "english": "can i stay one more night?",
    "chinese": "我可以再多住一晚吗？",
    "context": "临时续住请求",
    "tags": ["酒店", "请求"]
  },
  {
    "id": "ph1021",
    "english": "what's the rate for another night?",
    "chinese": "再多住一晚的费用是多少？",
    "context": "咨询房价",
    "tags": ["酒店", "金钱"]
  },
  {
    "id": "ph1022",
    "english": "do you have any vacancies?",
    "chinese": "你们还有空房吗？",
    "context": "寻找住宿",
    "tags": ["酒店", "询问"]
  },
  {
    "id": "ph1023",
    "english": "i need to change my departure date",
    "chinese": "我需要改动离开的日期。",
    "context": "行程变更",
    "tags": ["正式", "变更"]
  },
  {
    "id": "ph1024",
    "english": "can i get a refund for my unused ticket?",
    "chinese": "没用的票能退款吗？",
    "context": "处理退费",
    "tags": ["金钱", "退款"]
  },
  {
    "id": "ph1025",
    "english": "i missed my flight",
    "chinese": "我误机了。",
    "context": "通报突发情况",
    "tags": ["航班", "紧急"]
  },
  {
    "id": "ph1026",
    "english": "what's the next available flight?",
    "chinese": "下一班可选的航班是哪趟？",
    "context": "补救行程",
    "tags": ["航班", "旅行"]
  },
  {
    "id": "ph1027",
    "english": "can i get on standby?",
    "chinese": "我可以排候补名单吗？",
    "context": "尝试尽早出发",
    "tags": ["航班", "地道"]
  },
  {
    "id": "ph1028",
    "english": "how much is the change fee?",
    "chinese": "改签费是多少？",
    "context": "咨询费用",
    "tags": ["金钱", "规定"]
  },
  {
    "id": "ph1029",
    "english": "is there a gym in the hotel?",
    "chinese": "酒店里有健身房吗？",
    "context": "咨询设施",
    "tags": ["酒店", "设施"]
  },
  {
    "id": "ph1030",
    "english": "where is the swimming pool?",
    "chinese": "游泳池在哪里？",
    "context": "寻找设施",
    "tags": ["酒店", "位置"]
  },
  {
    "id": "ph1031",
    "english": "is the pool heated?",
    "chinese": "泳池是恒温的吗？",
    "context": "咨询设施细节",
    "tags": ["酒店", "舒适"]
  },
  {
    "id": "ph1032",
    "english": "what are the pool hours?",
    "chinese": "泳池开放时间是几点？",
    "context": "确认时间",
    "tags": ["时间", "规定"]
  },
  {
    "id": "ph1033",
    "english": "do you have spa services?",
    "chinese": "你们提供水疗服务吗？",
    "context": "咨询高端服务",
    "tags": ["服务", "休闲"]
  },
  {
    "id": "ph1034",
    "english": "i'd like to book a massage",
    "chinese": "我想预订一个按摩。",
    "context": "预订服务",
    "tags": ["休闲", "预订"]
  },
  {
    "id": "ph1035",
    "english": "what time is breakfast served?",
    "chinese": "早餐几点供应？",
    "context": "确认餐饮时间",
    "tags": ["餐饮", "时间"]
  },
  {
    "id": "ph1036",
    "english": "is there a fitness center?",
    "chinese": "这里有健身中心吗？",
    "context": "咨询运动设施",
    "tags": ["酒店", "健康"]
  },
  {
    "id": "ph1037",
    "english": "do you have tennis courts?",
    "chinese": "你们有网球场吗？",
    "context": "咨询运动设施",
    "tags": ["运动", "设施"]
  },
  {
    "id": "ph1038",
    "english": "can i rent sports equipment?",
    "chinese": "我可以租赁运动装备吗？",
    "context": "寻求租赁服务",
    "tags": ["服务", "租赁"]
  },
  {
    "id": "ph1039",
    "english": "the water isn't working",
    "chinese": "停水了/不出水了。",
    "context": "报修",
    "tags": ["投诉", "设施"]
  },
  {
    "id": "ph1040",
    "english": "the light bulb is broken",
    "chinese": "灯泡坏了。",
    "context": "报修",
    "tags": ["投诉", "设施"]
  },
  {
    "id": "ph1041",
    "english": "there's a problem with the tv",
    "chinese": "电视机出了点问题。",
    "context": "报修",
    "tags": ["投诉", "设施"]
  },
  {
    "id": "ph1042",
    "english": "the shower drain is clogged",
    "chinese": "淋浴地漏堵了。",
    "context": "报修",
    "tags": ["投诉", "设施"]
  },
  {
    "id": "ph1043",
    "english": "the room key doesn't work",
    "chinese": "房卡失效了。",
    "context": "寻求帮助",
    "tags": ["酒店", "紧急"]
  },
  {
    "id": "ph1044",
    "english": "i locked myself out",
    "chinese": "我把自己反锁在外面了。",
    "context": "寻求开门服务",
    "tags": ["酒店", "尴尬"]
  },
  {
    "id": "ph1045",
    "english": "can you send housekeeping?",
    "chinese": "能派客房服务员来一下吗？",
    "context": "寻求清洁或用品",
    "tags": ["酒店", "服务"]
  },
  {
    "id": "ph1046",
    "english": "the sheets need changing",
    "chinese": "床单需要更换。",
    "context": "清洁请求",
    "tags": ["客房服务", "卫生"]
  },
  {
    "id": "ph1047",
    "english": "there's no toilet paper",
    "chinese": "没有卫生纸了。",
    "context": "补充物资",
    "tags": ["客房服务", "细节"]
  },
  {
    "id": "ph1048",
    "english": "the mini-bar is empty",
    "chinese": "迷你吧是空的。",
    "context": "反馈设施状况",
    "tags": ["酒店", "餐饮"]
  },
  {
    "id": "ph1049",
    "english": "can you recommend some local food?",
    "chinese": "你能推荐些当地美食吗？",
    "context": "寻求美食建议",
    "tags": ["推荐", "饮食"]
  },
  {
    "id": "ph1050",
    "english": "what's the best dish here?",
    "chinese": "这里最好吃的菜是什么？",
    "context": "点餐咨询",
    "tags": ["推荐", "点餐"]
  },
  {
    "id": "ph1051",
    "english": "is this spicy?",
    "chinese": "这个辣吗？",
    "context": "口味确认",
    "tags": ["饮食", "口味"]
  },
  {
    "id": "ph1052",
    "english": "can i have it without...?",
    "chinese": "可以不加……吗？",
    "context": "定制餐食",
    "tags": ["餐饮", "请求"]
  },
  {
    "id": "ph1053",
    "english": "i'd like it well-done/medium/rare",
    "chinese": "我要全熟/五分熟/三分熟。",
    "context": "点牛排等食物",
    "tags": ["点餐", "程度"]
  },
  {
    "id": "ph1054",
    "english": "can we have separate bills?",
    "chinese": "我们可以分开付账吗？",
    "context": "结账偏好",
    "tags": ["餐饮", "金钱"]
  },
  {
    "id": "ph1055",
    "english": "is tap water safe to drink?",
    "chinese": "自来水可以直接喝吗？",
    "context": "饮水安全确认",
    "tags": ["健康", "生活"]
  },
  {
    "id": "ph1056",
    "english": "can i have bottled water?",
    "chinese": "可以给我瓶装水吗？",
    "context": "饮水需求",
    "tags": ["餐饮", "需求"]
  },
  {
    "id": "ph1057",
    "english": "do you have any recommendations for dessert?",
    "chinese": "有什么甜点推荐吗？",
    "context": "餐后点餐",
    "tags": ["推荐", "餐饮"]
  },
  {
    "id": "ph1058",
    "english": "what's today's special?",
    "chinese": "今天的特色菜/今日特价是什么？",
    "context": "点餐咨询",
    "tags": ["餐饮", "优惠"]
  },
  {
    "id": "ph1059",
    "english": "good morning, team",
    "chinese": "团队的各位，早上好。",
    "context": "职场开场白",
    "tags": ["职场", "问候"]
  },
  {
    "id": "ph1060",
    "english": "let's get started",
    "chinese": "让我们开始吧。",
    "context": "正式开始任务或会议",
    "tags": ["职场", "行动"]
  },
  {
    "id": "ph1061",
    "english": "what's on the agenda today?",
    "chinese": "今天的议程是什么？",
    "context": "确认会议内容",
    "tags": ["职场", "会议"]
  },
  {
    "id": "ph1062",
    "english": "i'd like to call the meeting to order",
    "chinese": "我现在宣布会议开始。",
    "context": "极其正式的会议开场",
    "tags": ["正式", "职场"]
  },
  {
    "id": "ph1063",
    "english": "let's go around and introduce ourselves",
    "chinese": "让我们轮流自我介绍一下。",
    "context": "破冰或新项目启动",
    "tags": ["社交", "职场"]
  },
  {
    "id": "ph1064",
    "english": "shall we begin?",
    "chinese": "我们可以开始了吗？",
    "context": "征求开始意见",
    "tags": ["职场", "礼貌"]
  },
  {
    "id": "ph1065",
    "english": "the purpose of this meeting is...",
    "chinese": "本次会议的目的是……",
    "context": "阐述会议目标",
    "tags": ["职场", "清晰"]
  },
  {
    "id": "ph1066",
    "english": "let me take the minutes",
    "chinese": "让我来做会议记录吧。",
    "context": "分担行政工作",
    "tags": ["职场", "协作"]
  },
  {
    "id": "ph1067",
    "english": "could everyone please introduce themselves?",
    "chinese": "能请大家介绍一下自己吗？",
    "context": "主持会议",
    "tags": ["职场", "主持"]
  },
  {
    "id": "ph1068",
    "english": "we have a lot to cover today",
    "chinese": "我们今天有很多内容要讨论。",
    "context": "强调时间紧迫性",
    "tags": ["职场", "时间管理"]
  },
  {
    "id": "ph1069",
    "english": "what's your opinion on this?",
    "chinese": "你对此有什么看法？",
    "context": "征求意见",
    "tags": ["沟通", "观点"]
  },
  {
    "id": "ph1070",
    "english": "could you elaborate on that?",
    "chinese": "你能详细说明一下吗？",
    "context": "深入探讨",
    "tags": ["沟通", "细节"]
  },
  {
    "id": "ph1071",
    "english": "i'd like to hear your thoughts",
    "chinese": "我想听听你的想法。",
    "context": "鼓励参与",
    "tags": ["沟通", "包容"]
  },
  {
    "id": "ph1072",
    "english": "let me play devil's advocate",
    "chinese": "让我来扮演一下反方角色（唱反调）。",
    "context": "从反面角度进行批判性思考",
    "tags": ["职场", "地道"]
  },
  {
    "id": "ph1073",
    "english": "that's a valid point",
    "chinese": "这是一个有道理的观点。",
    "context": "认可对方意见",
    "tags": ["赞同", "沟通"]
  },
  {
    "id": "ph1074",
    "english": "i see where you're coming from",
    "chinese": "我明白你的立场/出发点。",
    "context": "表达同理心或理解",
    "tags": ["沟通", "理解"]
  },
  {
    "id": "ph1075",
    "english": "let's circle back to that",
    "chinese": "咱们稍后再回到这个问题上来。",
    "context": "推迟次要议题讨论",
    "tags": ["地道", "职场"]
  },
  {
    "id": "ph1076",
    "english": "could you clarify that point?",
    "chinese": "你能澄清一下那一点吗？",
    "context": "消除歧义",
    "tags": ["沟通", "明确"]
  },
  {
    "id": "ph1077",
    "english": "i'm not sure i follow",
    "chinese": "我不确定我听懂了你的意思。",
    "context": "坦诚跟不上进度",
    "tags": ["沟通", "反馈"]
  },
  {
    "id": "ph1078",
    "english": "let me rephrase that",
    "chinese": "让我换种说法。",
    "context": "为了让对方听懂而重述",
    "tags": ["沟通", "清晰"]
  },
  {
    "id": "ph1079",
    "english": "i agree with you completely",
    "chinese": "我完全同意你的看法。",
    "context": "深度共识",
    "tags": ["赞同", "强烈"]
  },
  {
    "id": "ph1080",
    "english": "i couldn't agree more",
    "chinese": "我再同意不过了。",
    "context": "极端赞同",
    "tags": ["赞同", "强调"]
  },
  {
    "id": "ph1081",
    "english": "you have a good point there",
    "chinese": "你在那一点上说得很对。",
    "context": "具体的认可",
    "tags": ["赞同", "细节"]
  },
  {
    "id": "ph1082",
    "english": "that's exactly how i feel",
    "chinese": "这正是我的感受。",
    "context": "情感共鸣",
    "tags": ["赞同", "感受"]
  },
  {
    "id": "ph1083",
    "english": "i'm on the same page",
    "chinese": "我和你想的一样/我们在同一频道上。",
    "context": "表达认知一致",
    "tags": ["地道", "沟通"]
  },
  {
    "id": "ph1084",
    "english": "we're in agreement",
    "chinese": "我们达成了一致。",
    "context": "总结共识",
    "tags": ["正式", "赞同"]
  },
  {
    "id": "ph1085",
    "english": "that makes perfect sense",
    "chinese": "这完全合情合理。",
    "context": "肯定逻辑",
    "tags": ["认可", "逻辑"]
  },
  {
    "id": "ph1086",
    "english": "i think we're on the same wavelength",
    "chinese": "我觉得我们志同道合/很有默契。",
    "context": "非正式的高度一致",
    "tags": ["沟通", "地道"]
  },
  {
    "id": "ph1087",
    "english": "you took the words right out of my mouth",
    "chinese": "你想说的正是我要说的。",
    "context": "强调极度巧合的共识",
    "tags": ["赞同", "地道"]
  },
  {
    "id": "ph1088",
    "english": "i concur",
    "chinese": "我同意（赞同）。",
    "context": "比较正式的书面或口头语",
    "tags": ["正式", "赞同"]
  },
  {
    "id": "ph1089",
    "english": "i respectfully disagree",
    "chinese": "恕我不能认同。",
    "context": "有礼貌地提出反对意见",
    "tags": ["正式", "异议"]
  },
  {
    "id": "ph1090",
    "english": "i see it differently",
    "chinese": "我的看法不同。",
    "context": "直接但中性的异议",
    "tags": ["异议", "观点"]
  },
  {
    "id": "ph1091",
    "english": "i'm afraid i don't share your view",
    "chinese": "恐怕我不赞同你的观点。",
    "context": "委婉表达立场不同",
    "tags": ["异议", "礼貌"]
  },
  {
    "id": "ph1092",
    "english": "let me offer a different perspective",
    "chinese": "让我从另一个角度来看待这个问题。",
    "context": "温和地引入对立观点",
    "tags": ["异议", "职场"]
  },
  {
    "id": "ph1093",
    "english": "i'm not convinced",
    "chinese": "我还没被说服。",
    "context": "表达怀疑或保留意见",
    "tags": ["保留", "质疑"]
  },
  {
    "id": "ph1094",
    "english": "that's not quite how i see it",
    "chinese": "我倒不完全是那么看的。",
    "context": "温和纠偏",
    "tags": ["异议", "视角"]
  },
  {
    "id": "ph1095",
    "english": "i have some reservations about that",
    "chinese": "我对此持保留意见。",
    "context": "正式表达不确定感",
    "tags": ["慎重", "正式"]
  },
  {
    "id": "ph1096",
    "english": "i'd like to challenge that assumption",
    "chinese": "我想质疑那个假设。",
    "context": "深度批判性讨论",
    "tags": ["职场", "严谨"]
  },
  {
    "id": "ph1097",
    "english": "we may need to agree to disagree",
    "chinese": "我们可能得求同存异了。",
    "context": "终止无果的争论",
    "tags": ["地道", "社交"]
  },
  {
    "id": "ph1098",
    "english": "i understand your point, but...",
    "chinese": "我理解你的意思，但是……",
    "context": "承认对方逻辑后进行反驳",
    "tags": ["沟通", "转折"]
  },
  {
    "id": "ph1099",
    "english": "let's move on to the next item",
    "chinese": "让我们进入下一项（议程）。",
    "context": "掌控会议节奏",
    "tags": ["会议", "效率"]
  },
  {
    "id": "ph1100",
    "english": "before we move on...",
    "chinese": "在继续之前……",
    "context": "补充说明或最后提问",
    "tags": ["沟通", "补充"]
  },
  {
    "id": "ph1101",
    "english": "let's table this for now",
    "chinese": "这个议题咱们先搁置一下。",
    "context": "推迟处理不成熟的议题",
    "tags": ["地道", "会议"]
  },
  {
    "id": "ph1102",
    "english": "can we park that idea?",
    "chinese": "咱们能不能先把那个想法放一放？",
    "context": "避免在头脑风暴时跑题",
    "tags": ["地道", "协作"]
  },
  {
    "id": "ph1103",
    "english": "let's get back on track",
    "chinese": "让我们回到正轨上来（言归正传）。",
    "context": "纠正跑题现象",
    "tags": ["效率", "沟通"]
  },
  {
    "id": "ph1104",
    "english": "we're running out of time",
    "chinese": "我们的时间快不够了。",
    "context": "提醒注意时限",
    "tags": ["紧急", "时间"]
  },
  {
    "id": "ph1105",
    "english": "we need to wrap this up",
    "chinese": "我们需要收尾了/结束这个话题。",
    "context": "准备结束讨论",
    "tags": ["地道", "职场"]
  },
  {
    "id": "ph1106",
    "english": "let's take a five-minute break",
    "chinese": "咱们休息五分钟吧。",
    "context": "缓解会议疲劳",
    "tags": ["职场", "休息"]
  },
  {
    "id": "ph1107",
    "english": "shall we adjourn?",
    "chinese": "我们可以散会了吗？",
    "context": "极其正式的会议结束询问",
    "tags": ["正式", "会议"]
  },
  {
    "id": "ph1108",
    "english": "let's summarize what we've discussed",
    "chinese": "让我们总结一下讨论过的内容。",
    "context": "确认行动要点",
    "tags": ["总结", "效率"]
  },
  {
    "id": "ph1109",
    "english": "what's the status of the project?",
    "chinese": "项目进展如何了？",
    "context": "询问进度",
    "tags": ["项目管理", "询问"]
  },
  {
    "id": "ph1110",
    "english": "we're on schedule",
    "chinese": "我们正按计划进行。",
    "context": "汇报正常进度",
    "tags": ["进度", "积极"]
  },
  {
    "id": "ph1111",
    "english": "we're ahead of schedule",
    "chinese": "我们的进度提前了。",
    "context": "汇报积极进度",
    "tags": ["进度", "高效"]
  },
  {
    "id": "ph1112",
    "english": "we're behind schedule",
    "chinese": "我们的进度落后了。",
    "context": "汇报存在延期风险",
    "tags": ["进度", "风险"]
  },
  {
    "id": "ph1113",
    "english": "what's the timeline for this?",
    "chinese": "这个的时间表是怎样的？",
    "context": "明确期限",
    "tags": ["规划", "时间"]
  },
  {
    "id": "ph1114",
    "english": "we need to accelerate the timeline",
    "chinese": "我们需要加快进度。",
    "context": "要求提速",
    "tags": ["紧急", "决策"]
  },
  {
    "id": "ph1115",
    "english": "can we push back the deadline?",
    "chinese": "我们能把截止日期往后推吗？",
    "context": "申请延期",
    "tags": ["请求", "时间"]
  },
  {
    "id": "ph1116",
    "english": "what's holding us up?",
    "chinese": "是什么在拖我们的后腿？",
    "context": "排查瓶颈",
    "tags": ["地道", "分析"]
  },
  {
    "id": "ph1117",
    "english": "we're at a critical juncture",
    "chinese": "我们正处于关键时刻。",
    "context": "强调事情的重要性",
    "tags": ["正式", "紧急"]
  },
  {
    "id": "ph1118",
    "english": "i'll take care of it",
    "chinese": "我会处理好的。",
    "context": "主动承担责任",
    "tags": ["承诺", "职场"]
  },
  {
    "id": "ph1119",
    "english": "consider it done",
    "chinese": "包在我身上（就像已经做完了一样）。",
    "context": "表达极强的执行力",
    "tags": ["地道", "积极"]
  },
  {
    "id": "ph1120",
    "english": "i'm on it",
    "chinese": "我正在办。",
    "context": "表示已经开始行动",
    "tags": ["地道", "行动"]
  },
  {
    "id": "ph1121",
    "english": "leave it with me",
    "chinese": "交给我吧。",
    "context": "让对方放心",
    "tags": ["承诺", "可靠"]
  },
  {
    "id": "ph1122",
    "english": "you can count on me",
    "chinese": "你可以指望我。",
    "context": "建立信任感",
    "tags": ["信任", "个人品质"]
  },
  {
    "id": "ph1123",
    "english": "i'll get right on that",
    "chinese": "我马上就开始办。",
    "context": "强调立即行动",
    "tags": ["效率", "行动"]
  },
  {
    "id": "ph1124",
    "english": "i'll look into it",
    "chinese": "我会去调查/核实一下。",
    "context": "初步回应问题",
    "tags": ["中性", "处理"]
  },
  {
    "id": "ph1125",
    "english": "i'll handle it",
    "chinese": "我会搞定的。",
    "context": "表达能够胜任处理某事",
    "tags": ["能力", "责任"]
  },
  {
    "id": "ph1126",
    "english": "i'll see to it",
    "chinese": "我会负责去落实的。",
    "context": "正式的承诺细节跟进",
    "tags": ["正式", "责任"]
  },
  {
    "id": "ph1127",
    "english": "i've got it covered",
    "chinese": "一切都在我的掌控之中（我已经处理好了）。",
    "context": "汇报万无一失的状态",
    "tags": ["地道", "自信"]
  }, {
    "id": "ph1128",
    "english": "could you help me with this?",
    "chinese": "你能帮我处理一下这个吗？",
    "context": "寻求具体帮助",
    "tags": ["求助", "职场"]
  },
  {
    "id": "ph1129",
    "english": "i need your assistance",
    "chinese": "我需要你的协助。",
    "context": "正式请求帮助",
    "tags": ["正式", "协作"]
  },
  {
    "id": "ph1130",
    "english": "could you lend me a hand?",
    "chinese": "能搭把手吗？",
    "context": "非正式请求帮助",
    "tags": ["口语", "协作"]
  },
  {
    "id": "ph1131",
    "english": "i'm stuck on this task",
    "chinese": "我卡在这个任务上了。",
    "context": "表达工作遇到瓶颈",
    "tags": ["职场", "状态"]
  },
  {
    "id": "ph1132",
    "english": "could you show me how to do this?",
    "chinese": "你能教我怎么做这个吗？",
    "context": "请求指导",
    "tags": ["学习", "职场"]
  },
  {
    "id": "ph1133",
    "english": "i could use some guidance",
    "chinese": "我需要一些指导/建议。",
    "context": "含蓄地寻求帮助",
    "tags": ["职业成长", "请求"]
  },
  {
    "id": "ph1134",
    "english": "would you mind taking a look at this?",
    "chinese": "你介意帮我看看这个吗？",
    "context": "请求审核或检查",
    "tags": ["礼貌", "协作"]
  },
  {
    "id": "ph1135",
    "english": "can you spare a moment?",
    "chinese": "你能抽出一点时间吗？",
    "context": "打断别人前询问",
    "tags": ["礼貌", "沟通"]
  },
  {
    "id": "ph1136",
    "english": "i need your expertise",
    "chinese": "我需要你的专业知识。",
    "context": "向上级或专家请教",
    "tags": ["专业", "职场"]
  },
  {
    "id": "ph1137",
    "english": "could you walk me through this?",
    "chinese": "你能给我详细讲解一下（过程）吗？",
    "context": "请求逐步演示",
    "tags": ["教学", "流程"]
  },
  {
    "id": "ph1138",
    "english": "i'd like to provide an update",
    "chinese": "我想提供一下最新进展。",
    "context": "主动汇报",
    "tags": ["汇报", "项目"]
  },
  {
    "id": "ph1139",
    "english": "here's where we stand",
    "chinese": "这是我们目前的现状。",
    "context": "总结进度",
    "tags": ["总结", "状态"]
  },
  {
    "id": "ph1140",
    "english": "let me bring you up to speed",
    "chinese": "让我让你了解一下最新进展。",
    "context": "为某人同步信息",
    "tags": ["同步", "地道"]
  },
  {
    "id": "ph1141",
    "english": "the project is moving forward",
    "chinese": "项目正在推进中。",
    "context": "积极汇报",
    "tags": ["项目", "积极"]
  },
  {
    "id": "ph1142",
    "english": "we've made significant progress",
    "chinese": "我们取得了显著进展。",
    "context": "强调成果",
    "tags": ["成就", "项目"]
  },
  {
    "id": "ph1143",
    "english": "we've encountered some challenges",
    "chinese": "我们遇到了一些挑战。",
    "context": "委婉汇报问题",
    "tags": ["风险", "沟通"]
  },
  {
    "id": "ph1144",
    "english": "we're facing some obstacles",
    "chinese": "我们面临一些障碍。",
    "context": "描述困难",
    "tags": ["职场", "障碍"]
  },
  {
    "id": "ph1145",
    "english": "there's been a slight delay",
    "chinese": "进度稍微有点延迟。",
    "context": "解释时间变动",
    "tags": ["时间", "解释"]
  },
  {
    "id": "ph1146",
    "english": "everything is on track",
    "chinese": "一切都在按计划进行。",
    "context": "常规汇报",
    "tags": ["进度", "积极"]
  },
  {
    "id": "ph1147",
    "english": "we're right on target",
    "chinese": "我们正对准目标/按期进行。",
    "context": "确认目标达成",
    "tags": ["绩效", "目标"]
  },
  {
    "id": "ph1148",
    "english": "could you send me that document?",
    "chinese": "你能把那个文件发给我吗？",
    "context": "请求资料",
    "tags": ["办公", "文件"]
  },
  {
    "id": "ph1149",
    "english": "i'll email it to you",
    "chinese": "我会通过邮件发给你。",
    "context": "承诺行动",
    "tags": ["邮件", "职场"]
  },
  {
    "id": "ph1150",
    "english": "please find attached...",
    "chinese": "请查收附件中的……",
    "context": "邮件常用语",
    "tags": ["正式", "邮件"]
  },
  {
    "id": "ph1151",
    "english": "i'm following up on our conversation",
    "chinese": "针对我们之前的谈话进行跟进。",
    "context": "后续联系",
    "tags": ["跟进", "正式"]
  },
  {
    "id": "ph1152",
    "english": "per our discussion...",
    "chinese": "根据我们的讨论……",
    "context": "引用共识",
    "tags": ["正式", "引用"]
  },
  {
    "id": "ph1153",
    "english": "as promised...",
    "chinese": "正如所承诺的……",
    "context": "交付成果",
    "tags": ["信用", "沟通"]
  },
  {
    "id": "ph1154",
    "english": "please let me know your thoughts",
    "chinese": "请告知你的想法。",
    "context": "征求反馈",
    "tags": ["礼貌", "沟通"]
  },
  {
    "id": "ph1155",
    "english": "looking forward to your reply",
    "chinese": "期待你的回复。",
    "context": "邮件结束语",
    "tags": ["礼貌", "邮件"]
  },
  {
    "id": "ph1156",
    "english": "let me know if you have any questions",
    "chinese": "如果有任何疑问请告知。",
    "context": "提供支持",
    "tags": ["服务", "职场"]
  },
  {
    "id": "ph1157",
    "english": "i'll keep you posted",
    "chinese": "我会随时让你了解后续情况。",
    "context": "承诺持续跟进",
    "tags": ["地道", "职场"]
  },
  {
    "id": "ph1158",
    "english": "when are you available for a meeting?",
    "chinese": "你什么时候方便开会？",
    "context": "预约时间",
    "tags": ["计划", "会议"]
  },
  {
    "id": "ph1159",
    "english": "does tuesday at 2 pm work for you?",
    "chinese": "周二下午两点你方便吗？",
    "context": "具体提议时间",
    "tags": ["计划", "会议"]
  },
  {
    "id": "ph1160",
    "english": "what time works best for you?",
    "chinese": "什么时间对你最合适？",
    "context": "灵活预约",
    "tags": ["礼貌", "时间"]
  },
  {
    "id": "ph1161",
    "english": "i'd like to schedule a meeting",
    "chinese": "我想安排一次会议。",
    "context": "正式发起邀约",
    "tags": ["会议", "正式"]
  },
  {
    "id": "ph1162",
    "english": "can we reschedule?",
    "chinese": "我们可以改期吗？",
    "context": "调整日程",
    "tags": ["计划", "变更"]
  },
  {
    "id": "ph1163",
    "english": "something has come up",
    "chinese": "突然发生了一些事情。",
    "context": "解释无法赴约的原因",
    "tags": ["地道", "解释"]
  },
  {
    "id": "ph1164",
    "english": "i need to cancel our meeting",
    "chinese": "我需要取消我们的会议。",
    "context": "取消日程",
    "tags": ["职场", "取消"]
  },
  {
    "id": "ph1165",
    "english": "is the meeting still on?",
    "chinese": "会议还会照常举行吗？",
    "context": "最后确认",
    "tags": ["确认", "会议"]
  },
  {
    "id": "ph1166",
    "english": "let me check my calendar",
    "chinese": "让我查一下我的日程表。",
    "context": "确认空档",
    "tags": ["职场", "时间"]
  },
  {
    "id": "ph1167",
    "english": "i'm available all afternoon",
    "chinese": "我整个下午都有空。",
    "context": "告知空闲时间",
    "tags": ["社交", "计划"]
  },
  {
    "id": "ph1168",
    "english": "i'd like to give you some feedback",
    "chinese": "我想给你一些反馈建议。",
    "context": "绩效沟通开场",
    "tags": ["反馈", "管理"]
  },
  {
    "id": "ph1169",
    "english": "you did a great job",
    "chinese": "你做得很好。",
    "context": "表扬",
    "tags": ["积极", "评价"]
  },
  {
    "id": "ph1170",
    "english": "i appreciate your hard work",
    "chinese": "我非常欣赏你的辛勤工作。",
    "context": "表达认可",
    "tags": ["积极", "鼓励"]
  },
  {
    "id": "ph1171",
    "english": "there's room for improvement",
    "chinese": "还有提升的空间。",
    "context": "委婉指出不足",
    "tags": ["建议", "地道"]
  },
  {
    "id": "ph1172",
    "english": "let me offer some constructive criticism",
    "chinese": "让我提供一些建设性的批评意见。",
    "context": "正式反馈",
    "tags": ["管理", "专业"]
  },
  {
    "id": "ph1173",
    "english": "you've exceeded expectations",
    "chinese": "你超出了预期。",
    "context": "高度评价",
    "tags": ["绩效", "赞扬"]
  },
  {
    "id": "ph1174",
    "english": "i have some concerns",
    "chinese": "我有一些顾虑。",
    "context": "表达担忧",
    "tags": ["谨慎", "职场"]
  },
  {
    "id": "ph1175",
    "english": "can we discuss your performance?",
    "chinese": "我们可以谈谈你的绩效表现吗？",
    "context": "正式评估",
    "tags": ["管理", "职场"]
  },
  {
    "id": "ph1176",
    "english": "you're doing excellent work",
    "chinese": "你的工作非常出色。",
    "context": "表扬",
    "tags": ["积极", "激励"]
  },
  {
    "id": "ph1177",
    "english": "i'd like to see more initiative",
    "chinese": "我希望看到更多主动性。",
    "context": "提出改进要求",
    "tags": ["期待", "成长"]
  },
  {
    "id": "ph1178",
    "english": "i need this by end of day",
    "chinese": "我需要在今天下班前拿到这个。",
    "context": "设定截止日期",
    "tags": ["时间", "紧急"]
  },
  {
    "id": "ph1179",
    "english": "what's the priority here?",
    "chinese": "这里的优先顺序是怎样的？",
    "context": "确认工作重点",
    "tags": ["效率", "询问"]
  },
  {
    "id": "ph1180",
    "english": "this is urgent",
    "chinese": "这很紧急。",
    "context": "强调重要性",
    "tags": ["紧急", "职场"]
  },
  {
    "id": "ph1181",
    "english": "let's prioritize this task",
    "chinese": "咱们先重点处理这个任务。",
    "context": "调整工作顺序",
    "tags": ["效率", "决策"]
  },
  {
    "id": "ph1182",
    "english": "this can wait",
    "chinese": "这个可以先放放（不急）。",
    "context": "分清主次",
    "tags": ["决策", "时间"]
  },
  {
    "id": "ph1183",
    "english": "we need to focus on this first",
    "chinese": "我们需要首先关注这个。",
    "context": "明确核心任务",
    "tags": ["专注", "职场"]
  },
  {
    "id": "ph1184",
    "english": "what's the most important thing right now?",
    "chinese": "眼下最重要的事情是什么？",
    "context": "审视全局",
    "tags": ["决策", "管理"]
  },
  {
    "id": "ph1185",
    "english": "let's tackle this issue first",
    "chinese": "咱们先解决这个棘手问题。",
    "context": "着手解决难题",
    "tags": ["行动", "职场"]
  },
  {
    "id": "ph1186",
    "english": "this needs immediate attention",
    "chinese": "这需要立即关注。",
    "context": "极其紧急",
    "tags": ["紧急", "管理"]
  },
  {
    "id": "ph1187",
    "english": "it's not a high priority",
    "chinese": "这不是高优先级的任务。",
    "context": "降级任务",
    "tags": ["效率", "分级"]
  },
  {
    "id": "ph1188",
    "english": "let's brainstorm some ideas",
    "chinese": "咱们来集思广益一下。",
    "context": "创意启动",
    "tags": ["创意", "协作"]
  },
  {
    "id": "ph1189",
    "english": "think outside the box",
    "chinese": "跳出常规思维。",
    "context": "鼓励创新",
    "tags": ["地道", "创意"]
  },
  {
    "id": "ph1190",
    "english": "let's be creative",
    "chinese": "咱们发挥点创造力。",
    "context": "鼓励新想法",
    "tags": ["创意", "职场"]
  },
  {
    "id": "ph1191",
    "english": "no idea is a bad idea",
    "chinese": "没有不好的主意（鼓励大家多说）。",
    "context": "讨论初期氛围建设",
    "tags": ["包容", "地道"]
  },
  {
    "id": "ph1192",
    "english": "let's think about this differently",
    "chinese": "咱们换个思路考虑下。",
    "context": "打破僵局",
    "tags": ["思维", "职场"]
  },
  {
    "id": "ph1193",
    "english": "what if we tried...",
    "chinese": "如果我们试着……会怎么样？",
    "context": "提出假设性方案",
    "tags": ["提议", "职场"]
  },
  {
    "id": "ph1194",
    "english": "i have an idea",
    "chinese": "我有个主意。",
    "context": "分享见解",
    "tags": ["主动", "创意"]
  },
  {
    "id": "ph1195",
    "english": "let's explore all options",
    "chinese": "咱们探索一下所有的选项。",
    "context": "全面分析",
    "tags": ["决策", "全面"]
  },
  {
    "id": "ph1196",
    "english": "what are the alternatives?",
    "chinese": "还有什么替代方案吗？",
    "context": "寻找B计划",
    "tags": ["方案", "备选"]
  },
  {
    "id": "ph1197",
    "english": "let's come up with a solution",
    "chinese": "咱们想出一个解决方案吧。",
    "context": "目标导向",
    "tags": ["问题解决", "职场"]
  },
  {
    "id": "ph1198",
    "english": "we're over budget",
    "chinese": "我们超预算了。",
    "context": "财务汇报",
    "tags": ["财务", "警告"]
  },
  {
    "id": "ph1199",
    "english": "we need to cut costs",
    "chinese": "我们需要削减成本。",
    "context": "控制财务",
    "tags": ["财务", "决策"]
  },
  {
    "id": "ph1200",
    "english": "what's the budget for this?",
    "chinese": "这个项目的预算是多少？",
    "context": "确认财务限制",
    "tags": ["咨询", "财务"]
  },
  {
    "id": "ph1201",
    "english": "we need to stay within budget",
    "chinese": "我们需要保持在预算范围内。",
    "context": "强调纪律",
    "tags": ["规则", "财务"]
  },
  {
    "id": "ph1202",
    "english": "this is cost-effective",
    "chinese": "这很有性价比/划算。",
    "context": "评价方案",
    "tags": ["财务", "评价"]
  },
  {
    "id": "ph1203",
    "english": "let's look at the numbers",
    "chinese": "咱们看看数据/报表。",
    "context": "理性分析",
    "tags": ["数据", "职场"]
  },
  {
    "id": "ph1204",
    "english": "we need to allocate resources wisely",
    "chinese": "我们需要明智地分配资源。",
    "context": "管理决策",
    "tags": ["管理", "效率"]
  },
  {
    "id": "ph1205",
    "english": "what's the return on investment?",
    "chinese": "投资回报率是多少？",
    "context": "评估价值",
    "tags": ["财务", "专业"]
  },
  {
    "id": "ph1206",
    "english": "we need to maximize our resources",
    "chinese": "我们需要最大化利用我们的资源。",
    "context": "提高效率",
    "tags": ["效率", "职场"]
  },
  {
    "id": "ph1207",
    "english": "this is not financially viable",
    "chinese": "这在财务上是行不通的。",
    "context": "否定方案",
    "tags": ["正式", "财务"]
  },
  {
    "id": "ph1208",
    "english": "i'd like to discuss your career development",
    "chinese": "我想谈谈你的职业发展。",
    "context": "人才培养",
    "tags": ["职业成长", "管理"]
  },
  {
    "id": "ph1209",
    "english": "where do you see yourself in five years?",
    "chinese": "你觉得五年后你在哪里？",
    "context": "询问职业愿景",
    "tags": ["面试", "发展"]
  },
  {
    "id": "ph1210",
    "english": "what are your career goals?",
    "chinese": "你的职业目标是什么？",
    "context": "了解员工意图",
    "tags": ["目标", "职场"]
  },
  {
    "id": "ph1211",
    "english": "i'd like to take on more responsibility",
    "chinese": "我希望能承担更多的责任。",
    "context": "表达晋升或成长意愿",
    "tags": ["积极", "主动"]
  },
  {
    "id": "ph1212",
    "english": "i'm interested in advancing my career",
    "chinese": "我对职业晋升很感兴趣。",
    "context": "表达上进心",
    "tags": ["职场", "愿望"]
  },
  {
    "id": "ph1213",
    "english": "what training opportunities are available?",
    "chinese": "有哪些培训机会？",
    "context": "寻求技能提升",
    "tags": ["学习", "咨询"]
  },
  {
    "id": "ph1214",
    "english": "i'd like to develop new skills",
    "chinese": "我想培养新的技能。",
    "context": "个人发展计划",
    "tags": ["学习", "职场"]
  },
  {
    "id": "ph1215",
    "english": "can we discuss a promotion?",
    "chinese": "我们可以谈谈升职的事情吗？",
    "context": "直接提出晋升请求",
    "tags": ["正式", "金钱"]
  },
  {
    "id": "ph1216",
    "english": "i feel ready for a new challenge",
    "chinese": "我觉得我准备好迎接新的挑战了。",
    "context": "表达岗位变动或承接大项目",
    "tags": ["积极", "自信"]
  },
  {
    "id": "ph1217",
    "english": "what's the career path in this role?",
    "chinese": "这个职位的晋升路径是怎样的？",
    "context": "询问职业规划",
    "tags": ["规划", "咨询"]
  },
  {
    "id": "ph1218",
    "english": "i have a conflict of interest",
    "chinese": "我存在利益冲突。",
    "context": "职业合规说明",
    "tags": ["合规", "法律"]
  },
  {
    "id": "ph1219",
    "english": "we need to maintain confidentiality",
    "chinese": "我们需要保密。",
    "context": "强调安全纪律",
    "tags": ["保密", "安全"]
  },
  {
    "id": "ph1220",
    "english": "this is proprietary information",
    "chinese": "这是专利/专有信息。",
    "context": "界定产权",
    "tags": ["正式", "法律"]
  },
  {
    "id": "ph1221",
    "english": "we must comply with regulations",
    "chinese": "我们必须遵守规章制度。",
    "context": "合规性要求",
    "tags": ["规则", "正式"]
  },
  {
    "id": "ph1222",
    "english": "this is a sensitive matter",
    "chinese": "这是一个敏感的问题。",
    "context": "提醒注意言行",
    "tags": ["谨慎", "职场"]
  },
  {
    "id": "ph1223",
    "english": "we need to be discreet",
    "chinese": "我们需要审慎/低调。",
    "context": "处理敏感信息时的态度",
    "tags": ["态度", "保密"]
  },
  {
    "id": "ph1224",
    "english": "this is off the record",
    "chinese": "这不算正式记录（私下透露）。",
    "context": "非正式沟通",
    "tags": ["地道", "沟通"]
  },
  {
    "id": "ph1225",
    "english": "let's keep this between us",
    "chinese": "这件事咱们知道就行（别传出去）。",
    "context": "小范围私密谈话",
    "tags": ["地道", "保密"]
  },
  {
    "id": "ph1226",
    "english": "i need to disclose something",
    "chinese": "我需要披露/说明一些情况。",
    "context": "坦白事实",
    "tags": ["坦诚", "正式"]
  },
  {
    "id": "ph1227",
    "english": "this is confidential",
    "chinese": "这是机密。",
    "context": "标明重要等级",
    "tags": ["安全", "保密"]
  },
  {
    "id": "ph1228",
    "english": "let's touch base next week",
    "chinese": "咱们下周联系/碰一下。",
    "context": "约期跟进",
    "tags": ["地道", "沟通"]
  },
  {
    "id": "ph1229",
    "english": "can we catch up later?",
    "chinese": "咱们晚点儿聊聊近况吗？",
    "context": "社交同步",
    "tags": ["社交", "非正式"]
  },
  {
    "id": "ph1230",
    "english": "let's sync up on this",
    "chinese": "咱们同步一下这方面的信息。",
    "context": "项目协作",
    "tags": ["协作", "同步"]
  },
  {
    "id": "ph1231",
    "english": "i'll follow up with you",
    "chinese": "我会和你跟进的。",
    "context": "承诺后续动作",
    "tags": ["跟进", "职场"]
  },
  {
    "id": "ph1232",
    "english": "keep me in the loop",
    "chinese": "随时让我了解进度（别把我排除在外）。",
    "context": "要求知情权",
    "tags": ["地道", "沟通"]
  },
  {
    "id": "ph1233",
    "english": "let's stay connected",
    "chinese": "保持联系。",
    "context": "长期关系维护",
    "tags": ["社交", "职场"]
  },
  {
    "id": "ph1234",
    "english": "i'll reach out to you soon",
    "chinese": "我很快会联络你的。",
    "context": "非正式跟进",
    "tags": ["社交", "承诺"]
  },
  {
    "id": "ph1235",
    "english": "let's have a quick chat",
    "chinese": "咱们简单聊两句。",
    "context": "非正式会议",
    "tags": ["沟通", "高效"]
  },
  {
    "id": "ph1236",
    "english": "can we connect offline?",
    "chinese": "我们可以私下（或会后）联系吗？",
    "context": "避开公众讨论",
    "tags": ["会议", "职场"]
  },
  {
    "id": "ph1237",
    "english": "i'll get back to you on that",
    "chinese": "那个问题我迟点回你。",
    "context": "暂时无法回答时使用",
    "tags": ["应对", "职场"]
  },
  {
    "id": "ph1238",
    "english": "we need to resolve this issue",
    "chinese": "我们需要解决这个问题。",
    "context": "冲突/问题处理",
    "tags": ["解决问题", "职场"]
  },
  {
    "id": "ph1239",
    "english": "let's find a solution",
    "chinese": "咱们想个办法吧。",
    "context": "寻找对策",
    "tags": ["积极", "协作"]
  },
  {
    "id": "ph1240",
    "english": "how can we fix this?",
    "chinese": "我们该如何补救？",
    "context": "求助与协商",
    "tags": ["询问", "行动"]
  },
  {
    "id": "ph1241",
    "english": "we need to address this problem",
    "chinese": "我们需要直面/处理这个问题。",
    "context": "正式解决问题",
    "tags": ["正式", "职场"]
  },
  {
    "id": "ph1242",
    "english": "let's work through this together",
    "chinese": "咱们一起来解决这个难关。",
    "context": "团队鼓励",
    "tags": ["团队", "积极"]
  },
  {
    "id": "ph1243",
    "english": "what's the root cause?",
    "chinese": "根本原因是什么？",
    "context": "深度分析",
    "tags": ["分析", "专业"]
  },
  {
    "id": "ph1244",
    "english": "we need to prevent this from happening again",
    "chinese": "我们要防止这种情况再次发生。",
    "context": "总结复盘",
    "tags": ["经验", "管理"]
  },
  {
    "id": "ph1245",
    "english": "let's put out the fire",
    "chinese": "咱们先灭火（解决燃眉之急）。",
    "context": "紧急危机处理",
    "tags": ["地道", "紧急"]
  },
  {
    "id": "ph1246",
    "english": "this needs to be escalated",
    "chinese": "这个问题需要上报（请更高层决策）。",
    "context": "处理超范围问题",
    "tags": ["管理", "正式"]
  },
  {
    "id": "ph1247",
    "english": "who can help us with this?",
    "chinese": "谁能在这方面帮到我们？",
    "context": "寻求跨部门资源",
    "tags": ["协作", "咨询"]
  },
  {
    "id": "ph1248",
    "english": "i'd like to acknowledge your contribution",
    "chinese": "我想对你的贡献表示认可。",
    "context": "正式表彰",
    "tags": ["认可", "职场"]
  },
  {
    "id": "ph1249",
    "english": "great work, everyone",
    "chinese": "大家干得漂亮。",
    "context": "团队鼓励",
    "tags": ["团队", "表扬"]
  },
  {
    "id": "ph1250",
    "english": "i want to recognize your efforts",
    "chinese": "我想对你的努力表示肯定。",
    "context": "一对一反馈",
    "tags": ["认可", "反馈"]
  },
  {
    "id": "ph1251",
    "english": "well done",
    "chinese": "做得好。",
    "context": "简单直接的赞美",
    "tags": ["通用", "积极"]
  },
  {
    "id": "ph1252",
    "english": "kudos to the team",
    "chinese": "向团队致敬（表现得太棒了）。",
    "context": "口语赞誉",
    "tags": ["地道", "团队"]
  },
  {
    "id": "ph1253",
    "english": "you went above and beyond",
    "chinese": "你做得远超出了职责范围。",
    "context": "高度赞扬",
    "tags": ["激励", "地道"]
  },
  {
    "id": "ph1254",
    "english": "i appreciate your dedication",
    "chinese": "我感谢你的敬业精神。",
    "context": "态度认可",
    "tags": ["正式", "品质"]
  },
  {
    "id": "ph1255",
    "english": "thank you for your hard work",
    "chinese": "感谢你的辛苦付出。",
    "context": "通用感谢",
    "tags": ["职场", "情感"]
  },
  {
    "id": "ph1256",
    "english": "you made a real difference",
    "chinese": "你真正发挥了作用。",
    "context": "肯定个人价值",
    "tags": ["激励", "影响"]
  },
  {
    "id": "ph1257",
    "english": "your work is greatly appreciated",
    "chinese": "你的工作得到了极大的认可。",
    "context": "正式表扬",
    "tags": ["正式", "激励"]
  },
  {
    "id": "ph1258",
    "english": "how's it going?",
    "chinese": "最近怎么样？",
    "context": "通用闲聊开场",
    "tags": ["社交", "问候"]
  },
  {
    "id": "ph1259",
    "english": "what's new?",
    "chinese": "有什么新鲜事吗？",
    "context": "询问近况",
    "tags": ["社交", "轻松"]
  },
  {
    "id": "ph1260",
    "english": "how's everything?",
    "chinese": "一切都好吗？",
    "context": "整体询问",
    "tags": ["社交", "关心"]
  },
  {
    "id": "ph1261",
    "english": "how are things?",
    "chinese": "近况如何？",
    "context": "通用闲聊",
    "tags": ["社交", "通用"]
  },
  {
    "id": "ph1262",
    "english": "what's going on?",
    "chinese": "怎么了？/ 发生了什么？",
    "context": "询问情况",
    "tags": ["对话", "好奇"]
  },
  {
    "id": "ph1263",
    "english": "how's life treating you?",
    "chinese": "生活过得怎么样？",
    "context": "地道寒暄",
    "tags": ["地道", "关心"]
  },
  {
    "id": "ph1264",
    "english": "are you doing ok?",
    "chinese": "你还好吗？",
    "context": "表达关切",
    "tags": ["情感", "询问"]
  },
  {
    "id": "ph1265",
    "english": "how are you holding up?",
    "chinese": "你还挺得住吗？",
    "context": "在对方压力大时关心",
    "tags": ["地道", "情感"]
  },
  {
    "id": "ph1266",
    "english": "what's the latest?",
    "chinese": "最近有什么最新消息吗？",
    "context": "询问动态",
    "tags": ["社交", "信息"]
  },
  {
    "id": "ph1267",
    "english": "what's happening?",
    "chinese": "怎么回事？",
    "context": "口语询问",
    "tags": ["口语", "社交"]
  },
  {
    "id": "ph1268",
    "english": "good to see you!",
    "chinese": "见到你真好！",
    "context": "重逢问候",
    "tags": ["社交", "积极"]
  },
  {
    "id": "ph1269",
    "english": "it's nice seeing you.",
    "chinese": "见到你很高兴。",
    "context": "礼貌问候",
    "tags": ["社交", "礼貌"]
  },
  {
    "id": "ph1270",
    "english": "glad to meet you!",
    "chinese": "很高兴认识你！",
    "context": "初次见面",
    "tags": ["社交", "初识"]
  },
  {
    "id": "ph1271",
    "english": "it's a pleasure to meet you.",
    "chinese": "很荣幸认识你。",
    "context": "正式初次见面",
    "tags": ["正式", "礼貌"]
  },
  {
    "id": "ph1272",
    "english": "how have you been keeping?",
    "chinese": "这段时间你过得怎么样？",
    "context": "询问较长一段时间的近况",
    "tags": ["地道", "社交"]
  },
  {
    "id": "ph1273",
    "english": "i haven't seen you in ages!",
    "chinese": "我有好多年没见你啦！",
    "context": "久别重逢的感叹",
    "tags": ["地道", "社交"]
  },
  {
    "id": "ph1274",
    "english": "you look great!",
    "chinese": "你看起来棒极了！",
    "context": "外貌称赞",
    "tags": ["赞美", "社交"]
  },
  {
    "id": "ph1275",
    "english": "you look fantastic!",
    "chinese": "你看起来神采奕奕！",
    "context": "外貌称赞",
    "tags": ["赞美", "强烈"]
  },
  {
    "id": "ph1276",
    "english": "you look wonderful!",
    "chinese": "你看起来太棒了！",
    "context": "外貌称赞",
    "tags": ["赞美", "情感"]
  },
  {
    "id": "ph1277",
    "english": "you look amazing!",
    "chinese": "你看起来惊艳极了！",
    "context": "极高称赞",
    "tags": ["赞美", "极致"]
  },
  {
    "id": "ph1278",
    "english": "what a surprise to see you here!",
    "chinese": "真没想到能在这里见到你！",
    "context": "偶遇感叹",
    "tags": ["惊喜", "社交"]
  },
  {
    "id": "ph1279",
    "english": "fancy meeting you here!",
    "chinese": "真巧，竟然在这里遇到你！",
    "context": "地道偶遇语",
    "tags": ["地道", "惊喜"]
  },
  {
    "id": "ph1280",
    "english": "i didn't expect to see you today.",
    "chinese": "我没想到今天会见到你。",
    "context": "偶遇叙旧",
    "tags": ["社交", "口语"]
  },
  {
    "id": "ph1281",
    "english": "what brings you here?",
    "chinese": "什么风把你吹到这儿来了？",
    "context": "询问来此的原因",
    "tags": ["地道", "社交"]
  },
  {
    "id": "ph1282",
    "english": "are you here alone?",
    "chinese": "你一个人在这儿吗？",
    "context": "社交探寻",
    "tags": ["社交", "询问"]
  },
  {
    "id": "ph1283",
    "english": "did you come by yourself?",
    "chinese": "你自己来的吗？",
    "context": "社交探寻",
    "tags": ["社交", "询问"]
  },
  {
    "id": "ph1284",
    "english": "who are you here with?",
    "chinese": "你和谁一起来的？",
    "context": "社交探寻",
    "tags": ["社交", "关系"]
  },
  {
    "id": "ph1285",
    "english": "are you waiting for someone?",
    "chinese": "你在等人吗？",
    "context": "社交关心",
    "tags": ["社交", "关心"]
  },
  {
    "id": "ph1286",
    "english": "mind if i join you?",
    "chinese": "介意我加入你们/你吗？",
    "context": "请求加入圈子",
    "tags": ["社交", "礼貌"]
  },
  {
    "id": "ph1287",
    "english": "do you mind if i sit here?",
    "chinese": "你介意我坐这里吗？",
    "context": "寻找座位",
    "tags": ["礼貌", "公共场所"]
  },
  {
    "id": "ph1288",
    "english": "i'm having a great time.",
    "chinese": "我玩得很开心。",
    "context": "表达愉悦",
    "tags": ["情感", "社交"]
  },
  {
    "id": "ph1289",
    "english": "this is so much fun!",
    "chinese": "这太有意思了！",
    "context": "强烈愉悦感",
    "tags": ["情感", "积极"]
  },
  {
    "id": "ph1290",
    "english": "i'm enjoying myself.",
    "chinese": "我乐在其中。",
    "context": "个人感受",
    "tags": ["感受", "社交"]
  },
  {
    "id": "ph1291",
    "english": "time flies when you're having fun!",
    "chinese": "快乐的时候，时间总是过得飞快！",
    "context": "常用俗语",
    "tags": ["地道", "时间"]
  },
  {
    "id": "ph1292",
    "english": "i wish i could stay longer.",
    "chinese": "真希望我能多待一会儿。",
    "context": "表达不舍",
    "tags": ["遗憾", "社交"]
  },
  {
    "id": "ph1293",
    "english": "i hate to leave, but i have to go.",
    "chinese": "真舍不得走，但我必须得走了。",
    "context": "礼貌告辞",
    "tags": ["礼貌", "离开"]
  },
  {
    "id": "ph1294",
    "english": "it's getting late.",
    "chinese": "时间不早了。",
    "context": "准备离开的前奏",
    "tags": ["时间", "社交"]
  },
  {
    "id": "ph1295",
    "english": "i should probably head home.",
    "chinese": "我大概该回家了。",
    "context": "口语告辞",
    "tags": ["离开", "日常"]
  },
  {
    "id": "ph1296",
    "english": "i'd better get going.",
    "chinese": "我得走了。",
    "context": "直接告辞",
    "tags": ["离开", "地道"]
  },
  {
    "id": "ph1297",
    "english": "i need to hit the road.",
    "chinese": "我该出发/上路了。",
    "context": "地道俚语告辞",
    "tags": ["地道", "离开"]
  },
  {
    "id": "ph1298",
    "english": "thanks for inviting me.",
    "chinese": "谢谢你邀请我。",
    "context": "礼貌回应",
    "tags": ["礼貌", "社交"]
  },
  {
    "id": "ph1299",
    "english": "i had a lovely time.",
    "chinese": "我度过了一段美好的时光。",
    "context": "告别评价",
    "tags": ["评价", "社交"]
  },
  {
    "id": "ph1300",
    "english": "this was really enjoyable.",
    "chinese": "这真的很令人愉快。",
    "context": "告别评价",
    "tags": ["积极", "社交"]
  },
  {
    "id": "ph1301",
    "english": "i don't want this night to end.",
    "chinese": "我真不希望这个夜晚结束。",
    "context": "极度赞美当下的聚会",
    "tags": ["情感", "社交"]
  },
  {
    "id": "ph1302",
    "english": "we should do this again sometime.",
    "chinese": "我们以后找机会再聚聚。",
    "context": "客套或真诚约定",
    "tags": ["社交", "未来"]
  },
  {
    "id": "ph1303",
    "english": "let's hang out again soon.",
    "chinese": "咱们很快再约。",
    "context": "朋友间约定",
    "tags": ["朋友", "社交"]
  },
  {
    "id": "ph1304",
    "english": "don't be a stranger!",
    "chinese": "别断了联系哦！",
    "context": "地道告别语",
    "tags": ["地道", "社交"]
  },
  {
    "id": "ph1305",
    "english": "give me a call sometime.",
    "chinese": "有空给我打电话。",
    "context": "保持联系",
    "tags": ["通讯", "社交"]
  },
  {
    "id": "ph1306",
    "english": "let me know when you're free.",
    "chinese": "有空告诉我一声。",
    "context": "灵活约见",
    "tags": ["社交", "计划"]
  },
  {
    "id": "ph1307",
    "english": "i'm beat!",
    "chinese": "我累垮了！",
    "context": "极度疲劳",
    "tags": ["地道", "疲劳"]
  },
  {
    "id": "ph1308",
    "english": "i'm worn out.",
    "chinese": "我精疲力竭了。",
    "context": "疲劳描述",
    "tags": ["状态", "疲劳"]
  },
  {
    "id": "ph1309",
    "english": "i'm dead tired.",
    "chinese": "我累得半死。",
    "context": "夸张描述疲劳",
    "tags": ["情感", "疲劳"]
  },
  {
    "id": "ph1310",
    "english": "i could really use a rest.",
    "chinese": "我现在真的很需要休息。",
    "context": "表达需求",
    "tags": ["休息", "需求"]
  },
  {
    "id": "ph1311",
    "english": "i need to recharge my batteries.",
    "chinese": "我需要充电/休整一下。",
    "context": "形象化描述休息",
    "tags": ["地道", "身心健康"]
  },
  {
    "id": "ph1312",
    "english": "i need a break.",
    "chinese": "我需要休息一下。",
    "context": "短时间停歇",
    "tags": ["职场", "休息"]
  },
  {
    "id": "ph1313",
    "english": "i need some downtime.",
    "chinese": "我需要一点不被打扰的放松时间。",
    "context": "强调个人空间",
    "tags": ["生活方式", "身心健康"]
  },
  {
    "id": "ph1314",
    "english": "i'm feeling refreshed.",
    "chinese": "我觉得精神焕发。",
    "context": "休整后的状态",
    "tags": ["积极", "健康"]
  },
  {
    "id": "ph1315",
    "english": "a good night's sleep would do me good.",
    "chinese": "睡个好觉对我大有裨益。",
    "context": "表达睡眠愿望",
    "tags": ["健康", "休息"]
  },
  {
    "id": "ph1316",
    "english": "i'm starving!",
    "chinese": "我快饿扁了！",
    "context": "表达饥饿",
    "tags": ["生理", "强调"]
  },
  {
    "id": "ph1317",
    "english": "i'm famished.",
    "chinese": "我极其饥饿。",
    "context": "正式/书面化表达饥饿",
    "tags": ["词汇", "生理"]
  },
  {
    "id": "ph1318",
    "english": "i could eat a horse.",
    "chinese": "我饿得能吃下一头牛/马。",
    "context": "极其夸张的饥饿",
    "tags": ["地道", "谚语"]
  },
  {
    "id": "ph1319",
    "english": "i'm dying for something to eat.",
    "chinese": "我渴望吃点东西。",
    "context": "急切需求",
    "tags": ["地道", "餐饮"]
  },
  {
    "id": "ph1320",
    "english": "i'm craving some food.",
    "chinese": "我很想吃某种食物。",
    "context": "食欲需求",
    "tags": ["词汇", "餐饮"]
  },
  {
    "id": "ph1321",
    "english": "i'm absolutely ravenous.",
    "chinese": "我简直饿疯了。",
    "context": "极端程度描述",
    "tags": ["词汇", "强烈"]
  },
  {
    "id": "ph1322",
    "english": "i haven't eaten all day.",
    "chinese": "我一整天都没吃东西了。",
    "context": "事实性描述",
    "tags": ["生理", "日常"]
  },
  {
    "id": "ph1323",
    "english": "food sounds amazing right now.",
    "chinese": "现在吃东西听起来棒极了。",
    "context": "憧憬餐饮",
    "tags": ["餐饮", "社交"]
  },
  {
    "id": "ph1324",
    "english": "i could really go for some pizza.",
    "chinese": "我现在真的很想来点披萨。",
    "context": "表达具体食欲",
    "tags": ["地道", "餐饮"]
  },
  {
    "id": "ph1325",
    "english": "let's grab something to eat.",
    "chinese": "咱们随便找点吃的吧。",
    "context": "非正式邀约",
    "tags": ["社交", "餐饮"]
  },
  {
    "id": "ph1326",
    "english": "i'm so excited!",
    "chinese": "我太兴奋了！",
    "context": "表达喜悦",
    "tags": ["情感", "积极"]
  },
  {
    "id": "ph1327",
    "english": "i can't wait!",
    "chinese": "我都等不及了！",
    "context": "表达期待",
    "tags": ["期待", "心情"]
  },
  {
    "id": "ph1328",
    "english": "i'm thrilled!",
    "chinese": "我感到非常激动！",
    "context": "更高程度的兴奋",
    "tags": ["词汇", "积极"]
  },
  {
    "id": "ph1329",
    "english": "i'm pumped!",
    "chinese": "我干劲十足/兴奋极了！",
    "context": "口语化的兴奋",
    "tags": ["地道", "积极"]
  },
  {
    "id": "ph1330",
    "english": "i'm really eager for this.",
    "chinese": "我真的很渴望这件事。",
    "context": "表达渴望",
    "tags": ["期待", "正式"]
  },
  {
    "id": "ph1331",
    "english": "this is going to be awesome!",
    "chinese": "这绝对会非常棒！",
    "context": "乐观预测",
    "tags": ["期待", "积极"]
  },
  {
    "id": "ph1332",
    "english": "i have a good feeling about this.",
    "chinese": "我对这件事有预感会很好。",
    "context": "直觉性乐观",
    "tags": ["地道", "直觉"]
  },
  {
    "id": "ph1333",
    "english": "i'm optimistic about this.",
    "chinese": "对此我很乐观。",
    "context": "理性的乐观",
    "tags": ["正式", "态度"]
  },
  {
    "id": "ph1334",
    "english": "i have high hopes for this.",
    "chinese": "我对这件事寄予厚望。",
    "context": "表达厚望",
    "tags": ["态度", "正式"]
  },
  {
    "id": "ph1335",
    "english": "i'm nervous.",
    "chinese": "我很紧张。",
    "context": "表达忐忑",
    "tags": ["情感", "焦虑"]
  },
  {
    "id": "ph1336",
    "english": "i'm anxious.",
    "chinese": "我很焦虑。",
    "context": "更深程度的紧张",
    "tags": ["情感", "健康"]
  },
  {
    "id": "ph1337",
    "english": "i'm worried.",
    "chinese": "我很担心。",
    "context": "表达忧虑",
    "tags": ["情感", "关注"]
  },
  {
    "id": "ph1338",
    "english": "i'm stressed out.",
    "chinese": "我压力很大。",
    "context": "职场/生活压力",
    "tags": ["地道", "压力"]
  },
  {
    "id": "ph1339",
    "english": "i'm feeling overwhelmed.",
    "chinese": "我觉得有些招架不住了。",
    "context": "事情太多超负荷",
    "tags": ["状态", "压力"]
  },
  {
    "id": "ph1340",
    "english": "i'm scared.",
    "chinese": "我害怕。",
    "context": "普通恐惧",
    "tags": ["恐惧", "情感"]
  },
  {
    "id": "ph1341",
    "english": "i'm terrified.",
    "chinese": "我吓坏了。",
    "context": "极度恐惧",
    "tags": ["恐惧", "强烈"]
  },
  {
    "id": "ph1342",
    "english": "i'm frightened.",
    "chinese": "我受到了惊吓。",
    "context": "被动受惊",
    "tags": ["情感", "恐惧"]
  },
  {
    "id": "ph1343",
    "english": "i'm petrified.",
    "chinese": "我吓呆了（像石头一样）。",
    "context": "惊呆的恐惧",
    "tags": ["地道", "恐惧"]
  },
  {
    "id": "ph1344",
    "english": "i'm shaking with fear.",
    "chinese": "我吓得浑身发抖。",
    "context": "生理性恐惧表现",
    "tags": ["恐惧", "极致"]
  },
  {
    "id": "ph1345",
    "english": "i'm confused.",
    "chinese": "我很困惑。",
    "context": "不理解情况",
    "tags": ["认知", "状态"]
  },
  {
    "id": "ph1346",
    "english": "i don't understand.",
    "chinese": "我不明白。",
    "context": "直接表述认知障碍",
    "tags": ["认知", "对话"]
  },
  {
    "id": "ph1347",
    "english": "i'm puzzled.",
    "chinese": "我很迷惑（像解不开谜题）。",
    "context": "对复杂事物的困惑",
    "tags": ["词汇", "思维"]
  },
  {
    "id": "ph1348",
    "english": "this doesn't make sense.",
    "chinese": "这不合逻辑/讲不通。",
    "context": "对事物逻辑的质疑",
    "tags": ["理性", "批判思维"]
  },
  {
    "id": "ph1349",
    "english": "i'm not following you.",
    "chinese": "我没听懂你的思路。",
    "context": "跟不上对方语速或逻辑",
    "tags": ["交流", "地道"]
  },
  {
    "id": "ph1350",
    "english": "could you explain that again?",
    "chinese": "你能再解释一遍吗？",
    "context": "请求二次解释",
    "tags": ["礼貌", "交流"]
  },
  {
    "id": "ph1351",
    "english": "i missed that.",
    "chinese": "我刚才没听到/漏掉了。",
    "context": "解释没听清的原因",
    "tags": ["交流", "坦诚"]
  },
  {
    "id": "ph1352",
    "english": "can you run that by me one more time?",
    "chinese": "你能再给我讲一遍吗？",
    "context": "地道请求复述",
    "tags": ["地道", "交流"]
  },
  {
    "id": "ph1353",
    "english": "let's schedule a meeting",
    "chinese": "咱们安排个会议吧。",
    "context": "工作计划",
    "tags": ["职场", "会议"]
  },
  {
    "id": "ph1354",
    "english": "can you send me the report?",
    "chinese": "能把报告发给我吗？",
    "context": "索取资料",
    "tags": ["职场", "文件"]
  },
  {
    "id": "ph1355",
    "english": "i'll review the document",
    "chinese": "我会审核这份文件的。",
    "context": "承诺处理",
    "tags": ["职场", "正式"]
  },
  {
    "id": "ph1356",
    "english": "please prioritize this task",
    "chinese": "请优先处理这个任务。",
    "context": "分配工作",
    "tags": ["管理", "效率"]
  },
  {
    "id": "ph1357",
    "english": "we need to delegate responsibilities",
    "chinese": "我们需要下放/分配责任。",
    "context": "团队管理",
    "tags": ["管理", "分工"]
  },
  {
    "id": "ph1358",
    "english": "let's brainstorm ideas",
    "chinese": "咱们头脑风暴一下主意。",
    "context": "创意启动",
    "tags": ["创意", "团队"]
  },
  {
    "id": "ph1359",
    "english": "i'll circle back to you",
    "chinese": "我稍后会再联系你/给你反馈。",
    "context": "地道后续跟进承诺",
    "tags": ["地道", "沟通"]
  },
  {
    "id": "ph1360",
    "english": "let's align on expectations",
    "chinese": "咱们对预期目标达成一致。",
    "context": "前期同步",
    "tags": ["职场", "共识"]
  },
  {
    "id": "ph1361",
    "english": "we should benchmark against competitors",
    "chinese": "我们应该以竞争对手为基准。",
    "context": "行业分析",
    "tags": ["正式", "商业策略"]
  },
  {
    "id": "ph1362",
    "english": "i'll keep you posted",
    "chinese": "我会随时向你通报进展。",
    "context": "持续同步",
    "tags": ["地道", "协作"]
  },
  {
    "id": "ph1363",
    "english": "let's run it by management",
    "chinese": "咱们向上级请示一下。",
    "context": "地道寻求决策支持",
    "tags": ["地道", "管理"]
  },
  {
    "id": "ph1364",
    "english": "we need to streamline processes",
    "chinese": "我们需要简化/优化流程。",
    "context": "提效建议",
    "tags": ["效率", "流程"]
  },
  {
    "id": "ph1365",
    "english": "let's take this offline",
    "chinese": "这个话题咱们私下再聊（别占会议时间）。",
    "context": "地道管理会议时长",
    "tags": ["地道", "会议效率"]
  },
  {
    "id": "ph1366",
    "english": "i'll loop you in",
    "chinese": "我会把你拉进讨论圈（让你知情）。",
    "context": "信息共享",
    "tags": ["地道", "沟通"]
  },
  {
    "id": "ph1367",
    "english": "can you clarify your requirements?",
    "chinese": "你能明确一下你的需求吗？",
    "context": "需求分析",
    "tags": ["正式", "职场"]
  },
  {
    "id": "ph1368",
    "english": "we're behind schedule",
    "chinese": "我们的进度落后了。",
    "context": "通报延误",
    "tags": ["警告", "时间"]
  },
  {
    "id": "ph1369",
    "english": "let's regroup and reassess",
    "chinese": "咱们重新集结，重新评估一下。",
    "context": "战略调整",
    "tags": ["正式", "决策"]
  },
  {
    "id": "ph1370",
    "english": "i need to consult my team",
    "chinese": "我需要咨询一下我的团队。",
    "context": "寻求内部共识",
    "tags": ["管理", "协作"]
  },
  {
    "id": "ph1371",
    "english": "we should leverage our strengths",
    "chinese": "我们应该利用我们的优势。",
    "context": "战略讨论",
    "tags": ["地道", "策略"]
  },
  {
    "id": "ph1372",
    "english": "let's table this discussion",
    "chinese": "咱们先把这个讨论搁置一下。",
    "context": "地道推迟讨论",
    "tags": ["地道", "职场"]
  },
  {
    "id": "ph1373",
    "english": "we need to pivot our strategy",
    "chinese": "我们需要转型/调整策略。",
    "context": "重大方向调整",
    "tags": ["商业", "变化"]
  },
  {
    "id": "ph1374",
    "english": "i'll follow up via email",
    "chinese": "我会通过邮件跟进。",
    "context": "设定沟通渠道",
    "tags": ["沟通", "职场"]
  },
  {
    "id": "ph1375",
    "english": "let's set some milestones",
    "chinese": "咱们设定一些里程碑目标。",
    "context": "项目规划",
    "tags": ["规划", "正式"]
  },
  {
    "id": "ph1376",
    "english": "we should think outside the box",
    "chinese": "我们应该跳出框框思考。",
    "context": "鼓励创新",
    "tags": ["地道", "创意"]
  },
  {
    "id": "ph1377",
    "english": "i'm swamped with work",
    "chinese": "我忙得不可开交。",
    "context": "形容工作量巨大",
    "tags": ["地道", "状态"]
  },
  {
    "id": "ph1378",
    "english": "let's drill down into details",
    "chinese": "咱们深入探讨细节。",
    "context": "深度分析",
    "tags": ["地道", "分析"]
  },
  {
    "id": "ph1379",
    "english": "we need to raise awareness",
    "chinese": "我们需要提高意识/知名度。",
    "context": "市场或内部推广",
    "tags": ["公关", "正式"]
  },
  {
    "id": "ph1380",
    "english": "can you take the lead?",
    "chinese": "你能牵头负责这件事吗？",
    "context": "指派负责人",
    "tags": ["领导力", "授权"]
  },
  {
    "id": "ph1381",
    "english": "i'll get you the data",
    "chinese": "我会把数据发给你。",
    "context": "提供支持",
    "tags": ["行动", "职场"]
  },
  {
    "id": "ph1382",
    "english": "let's move the needle",
    "chinese": "咱们来做出点实质性的改变/进展。",
    "context": "强调具体成果",
    "tags": ["地道", "成果导向"]
  },
  {
    "id": "ph1383",
    "english": "we should synergize our efforts",
    "chinese": "我们应该形成协同效应（合力）。",
    "context": "强调团队协作",
    "tags": ["正式", "协作"]
  },
  {
    "id": "ph1384",
    "english": "i'll keep stakeholders informed",
    "chinese": "我会让利益相关者保持知情。",
    "context": "公共关系/管理汇报",
    "tags": ["正式", "沟通"]
  },
  {
    "id": "ph1385",
    "english": "let's fast-track this project",
    "chinese": "咱们加快这个项目的进度。",
    "context": "特事特办加速",
    "tags": ["地道", "加速"]
  },
  {
    "id": "ph1386",
    "english": "we need to scale up operations",
    "chinese": "我们需要扩大运营规模。",
    "context": "业务扩展",
    "tags": ["商业", "增长"]
  },
  {
    "id": "ph1387",
    "english": "i'll break this down for you",
    "chinese": "我来为你拆解/详细说明一下。",
    "context": "简化复杂信息",
    "tags": ["交流", "清晰"]
  },
  {
    "id": "ph1388",
    "english": "let's push the envelope",
    "chinese": "咱们尝试挑战极限/创新。",
    "context": "挑战传统或现状",
    "tags": ["地道", "突破"]
  },
  {
    "id": "ph1389",
    "english": "we should benchmark our performance",
    "chinese": "我们应当对我们的表现进行基准对标。",
    "context": "绩效评估",
    "tags": ["正式", "分析"]
  },
  {
    "id": "ph1390",
    "english": "i need to crunch some numbers",
    "chinese": "我需要处理/计算一下数据。",
    "context": "地道财务/数据处理",
    "tags": ["地道", "数据分析"]
  },
  {
    "id": "ph1391",
    "english": "let's put a pin in it",
    "chinese": "咱们先标记一下，待会儿再议。",
    "context": "暂时搁置话题",
    "tags": ["地道", "会议"]
  },
  {
    "id": "ph1392",
    "english": "we need to optimize our workflow",
    "chinese": "我们需要优化我们的工作流。",
    "context": "内部提效",
    "tags": ["正式", "流程"]
  },
  {
    "id": "ph1393",
    "english": "i'll circle back tomorrow",
    "chinese": "我明天会再找你（反馈）。",
    "context": "约定短期跟进",
    "tags": ["地道", "跟进"]
  },
  {
    "id": "ph1394",
    "english": "let's take a step back",
    "chinese": "咱们先退一步（从全局看看）。",
    "context": "宏观反思",
    "tags": ["地道", "反思"]
  },
  {
    "id": "ph1395",
    "english": "we should be proactive",
    "chinese": "我们应该积极主动（防患未然）。",
    "context": "强调工作态度",
    "tags": ["正式", "态度"]
  },
  {
    "id": "ph1396",
    "english": "i'll keep you in the loop",
    "chinese": "我会让你随时知情。",
    "context": "承诺信息同步",
    "tags": ["地道", "职场"]
  },
  {
    "id": "ph1397",
    "english": "can you walk me through this?",
    "chinese": "你能给我讲解一遍这个过程吗？",
    "context": "请求逐步演示",
    "tags": ["学习", "地道"]
  },
  {
    "id": "ph1398",
    "english": "we're on the same page",
    "chinese": "我们的见解一致。",
    "context": "确认共识",
    "tags": ["地道", "沟通"]
  },
  {
    "id": "ph1399",
    "english": "let's get the ball rolling",
    "chinese": "咱们把事情开展起来吧。",
    "context": "项目启动",
    "tags": ["地道", "启动"]
  },
  {
    "id": "ph1400",
    "english": "i need to dot the i's",
    "chinese": "我需要把细节完善好（搞定琐事）。",
    "context": "形象化细节处理",
    "tags": ["地道", "细致"]
  },
  {
    "id": "ph1401",
    "english": "we should think strategically",
    "chinese": "我们应该从战略角度思考。",
    "context": "长远规划",
    "tags": ["战略", "正式"]
  },
  {
    "id": "ph1402",
    "english": "let's cross that bridge later",
    "chinese": "咱们船到桥头自然直（到时再说）。",
    "context": "搁置非紧迫问题",
    "tags": ["地道", "俗语"]
  },
  {
    "id": "ph1403",
    "english": "we need to increase efficiency",
    "chinese": "我们需要提高效率。",
    "context": "工作目标",
    "tags": ["职场", "效率"]
  },
  {
    "id": "ph1404",
    "english": "i'll touch base with you",
    "chinese": "我会和你联系。",
    "context": "短期沟通约定",
    "tags": ["地道", "社交"]
  },
  {
    "id": "ph1405",
    "english": "let's put our heads together",
    "chinese": "咱们一起商量商量。",
    "context": "鼓励集思广益",
    "tags": ["地道", "协作"]
  },
  {
    "id": "ph1406",
    "english": "we should be flexible",
    "chinese": "我们应当灵活应变。",
    "context": "态度建议",
    "tags": ["正式", "应变"]
  },
  {
    "id": "ph1407",
    "english": "i'll give you a heads up",
    "chinese": "我会提前给你打个招呼（预警）。",
    "context": "提前通知",
    "tags": ["地道", "预警"]
  },
  {
    "id": "ph1408",
    "english": "let's hit the ground running",
    "chinese": "咱们全力投入，立即开始干起来。",
    "context": "形容迅速进入高效状态",
    "tags": ["地道", "激情"]
  },
  {
    "id": "ph1409",
    "english": "we need to manage expectations",
    "chinese": "我们需要管理好（客户或领导的）预期。",
    "context": "风险管理",
    "tags": ["正式", "技巧"]
  },
  {
    "id": "ph1410",
    "english": "i'll connect the dots",
    "chinese": "我会把这些线索/信息串联起来。",
    "context": "深度分析与整合",
    "tags": ["地道", "逻辑"]
  },
  {
    "id": "ph1411",
    "english": "let's focus on priorities",
    "chinese": "咱们关注在重中之重上。",
    "context": "分清主次",
    "tags": ["专注", "正式"]
  },
  {
    "id": "ph1412",
    "english": "we should think long-term",
    "chinese": "我们应当长远打算。",
    "context": "愿景讨论",
    "tags": ["战略", "视角"]
  },
  {
    "id": "ph1413",
    "english": "i'll play devil's advocate",
    "chinese": "我来扮演一下反方，挑点毛病。",
    "context": "批判性思维引导",
    "tags": ["地道", "辩论"]
  },
  {
    "id": "ph1414",
    "english": "let's pick up where we left off",
    "chinese": "咱们从上次停下的地方继续。",
    "context": "恢复中断的讨论",
    "tags": ["常用", "连续性"]
  },
  {
    "id": "ph1415",
    "english": "we need to build consensus",
    "chinese": "我们需要达成共识。",
    "context": "团队决策前奏",
    "tags": ["正式", "协作"]
  },
  {
    "id": "ph1416",
    "english": "i'll keep the momentum going",
    "chinese": "我会保持这个良好势头。",
    "context": "维持项目热度",
    "tags": ["积极", "领导力"]
  },
  {
    "id": "ph1417",
    "english": "let's think win-win",
    "chinese": "咱们考虑双赢方案。",
    "context": "谈判/合作思路",
    "tags": ["商业", "共赢"]
  },
  {
    "id": "ph1418",
    "english": "we should be transparent",
    "chinese": "我们应当保持透明度。",
    "context": "沟通准则",
    "tags": ["原则", "诚信"]
  },
  {
    "id": "ph1419",
    "english": "i'll keep you updated",
    "chinese": "我会向你通报新动态。",
    "context": "常规跟进承诺",
    "tags": ["常用", "协作"]
  },
  {
    "id": "ph1420",
    "english": "let's shift gears",
    "chinese": "咱们换个话题/调整下节奏。",
    "context": "地道转换议题",
    "tags": ["地道", "沟通"]
  },
  {
    "id": "ph1421",
    "english": "we need to expand our reach",
    "chinese": "我们需要扩大覆盖面/影响力。",
    "context": "业务拓展",
    "tags": ["正式", "增长"]
  },
  {
    "id": "ph1422",
    "english": "i'll turn it around quickly",
    "chinese": "我会尽快把它赶出来的。",
    "context": "承诺高效交付",
    "tags": ["地道", "效率"]
  },
  {
    "id": "ph1423",
    "english": "let's make hay while the sun shines",
    "chinese": "咱们要趁热打铁（抓紧好时机）。",
    "context": "地道俗语，抓住机会",
    "tags": ["地道", "俗语"]
  },
  {
    "id": "ph1424",
    "english": "we should diversify our portfolio",
    "chinese": "我们应该分散投资/多样化业务组合。",
    "context": "财务/风险策略",
    "tags": ["金融", "专业"]
  },
  {
    "id": "ph1425",
    "english": "i'll throw out some ideas",
    "chinese": "我随便提几个主意。",
    "context": "地道开启头脑风暴",
    "tags": ["地道", "创意"]
  },
  {
    "id": "ph1426",
    "english": "let's kill two birds with one stone",
    "chinese": "咱们来个一箭双雕。",
    "context": "追求一举多得",
    "tags": ["地道", "俗语"]
  },
  {
    "id": "ph1427",
    "english": "we need to strengthen relationships",
    "chinese": "我们需要加强（合作）关系。",
    "context": "公关/客户关系",
    "tags": ["商业", "关系"]
  },
  {
    "id": "ph1428",
    "english": "i'll keep my ear to the ground",
    "chinese": "我会留心观察（打听）动向。",
    "context": "形象化描述留意消息",
    "tags": ["地道", "敏感"]
  },
  {
    "id": "ph1429",
    "english": "let's burn the midnight oil",
    "chinese": "咱们加把劲熬夜干完它。",
    "context": "形容加班拼搏",
    "tags": ["地道", "奋斗"]
  },
  {
    "id": "ph1430",
    "english": "we should cover all bases",
    "chinese": "我们要考虑周全（面面俱到）。",
    "context": "强调严谨",
    "tags": ["地道", "严谨"]
  },
  {
    "id": "ph1431",
    "english": "i'll pull my weight",
    "chinese": "我会尽到我的本分/负起责来。",
    "context": "承诺尽责",
    "tags": ["地道", "责任感"]
  },
  {
    "id": "ph1432",
    "english": "let's not put all eggs in one basket",
    "chinese": "咱们别孤注一掷（分散风险）。",
    "context": "风险管理俗语",
    "tags": ["地道", "风险控制"]
  },
  {
    "id": "ph1433",
    "english": "we need to sharpen our skills",
    "chinese": "我们需要磨炼我们的技能。",
    "context": "能力建设",
    "tags": ["地道", "成长"]
  },
  {
    "id": "ph1434",
    "english": "i'll go the extra mile",
    "chinese": "我会付出额外的努力（做得更好）。",
    "context": "承诺卓越表现",
    "tags": ["地道", "激励"]
  },
  {
    "id": "ph1435",
    "english": "let's think outside the box",
    "chinese": "咱们要打破常规思路。",
    "context": "创新鼓励",
    "tags": ["地道", "常用"]
  },
  {
    "id": "ph1436",
    "english": "we should be on the ball",
    "chinese": "我们应该保持机敏/随时准备好。",
    "context": "形容反应快、在状态",
    "tags": ["地道", "高效"]
  },
  {
    "id": "ph1437",
    "english": "i'll bite the bullet",
    "chinese": "我会硬着头皮顶住（面对难关）。",
    "context": "面对痛苦或艰难的抉择",
    "tags": ["地道", "勇气"]
  },
  {
    "id": "ph1438",
    "english": "let's get our ducks in a row",
    "chinese": "咱们把事情准备得井井有条。",
    "context": "强调前期筹备",
    "tags": ["地道", "组织"]
  },
  {
    "id": "ph1439",
    "english": "we need to raise the bar",
    "chinese": "我们需要提高标准。",
    "context": "设定更高目标",
    "tags": ["地道", "卓越"]
  },
  {
    "id": "ph1440",
    "english": "i'll keep my fingers crossed",
    "chinese": "我会祈祷好运的。",
    "context": "表达祝愿",
    "tags": ["地道", "社交"]
  },
  {
    "id": "ph1441",
    "english": "we should think ahead",
    "chinese": "我们应当未雨绸缪。",
    "context": "预防与规划",
    "tags": ["规划", "正式"]
  },
  {
    "id": "ph1442",
    "english": "i'll wear many hats",
    "chinese": "我会身兼数职。",
    "context": "形容一人负责多种角色",
    "tags": ["地道", "职场"]
  },
  {
    "id": "ph1443",
    "english": "let's reinvent the wheel",
    "chinese": "咱们重新发明轮子（重新开始做已有的东西）。",
    "context": "通常用于否定：别重新发明轮子",
    "tags": ["地道", "效率"]
  },
  {
    "id": "ph1444",
    "english": "we need to network effectively",
    "chinese": "我们需要有效地建立人脉。",
    "context": "人际关系拓展",
    "tags": ["正式", "社交"]
  },
  {
    "id": "ph1445",
    "english": "i'll keep things moving",
    "chinese": "我会让事情保持推进。",
    "context": "执行力表现",
    "tags": ["积极", "进度"]
  },
  {
    "id": "ph1446",
    "english": "let's think big picture",
    "chinese": "咱们大处着眼。",
    "context": "从全局考虑",
    "tags": ["战略", "视角"]
  },
  {
    "id": "ph1447",
    "english": "we should be accountable",
    "chinese": "我们应当有责任心/负责到底。",
    "context": "职业道德",
    "tags": ["正式", "责任"]
  },
  {
    "id": "ph1448",
    "english": "i'll keep the ball rolling",
    "chinese": "我会让事情持续进行下去。",
    "context": "防止停滞",
    "tags": ["地道", "积极"]
  },
  {
    "id": "ph1449",
    "english": "let's cut to the chase",
    "chinese": "咱们开门见山吧。",
    "context": "地道请求直奔主题",
    "tags": ["地道", "效率"]
  },
  {
    "id": "ph1450",
    "english": "we need to adapt quickly",
    "chinese": "我们需要迅速适应。",
    "context": "面对变化",
    "tags": ["敏捷", "正式"]
  },
  {
    "id": "ph1451",
    "english": "i'll rock the boat",
    "chinese": "我会打破现状/引起争议。",
    "context": "通常用于否定：我不想惹麻烦",
    "tags": ["地道", "职场"]
  }

];
