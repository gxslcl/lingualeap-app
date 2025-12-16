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
  }
];
