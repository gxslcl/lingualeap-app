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
  }

];
