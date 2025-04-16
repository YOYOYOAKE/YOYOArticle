import{_ as s,c as d,a as e,b as n,w as l,r as p,o as c,e as t}from"./app-Bex44-0d.js";const u={};function m(y,o){const r=p("VPCard"),a=p("ImageCard"),i=p("CardGrid");return c(),d("div",null,[o[5]||(o[5]=e("p",null,"这周是新学期的第一周，因此新开了一部分，之前写的就归档了。",-1)),o[6]||(o[6]=e("p",null,"周记，应当记录一周生活。但是这种形式（或者说我的生活？）太单薄了，每周就是那点事，难免写成流水账。我写着乏味，看着也无趣。",-1)),o[7]||(o[7]=e("p",null,"应当做些什么，整点花活，创新形式也好，写点新内容也好。",-1)),o[8]||(o[8]=e("p",null,"哎呀，写周记真的好难。",-1)),o[9]||(o[9]=e("p",null,"现在的决定是每周五写出一部分发布出来，然后周六周日随缘补充新的内容。",-1)),n(r,{title:"科研小记",icon:"fluent-color:lightbulb-filament-16"},{default:l(()=>o[0]||(o[0]=[e("p",null,"这周正式开始阅读文献，构思论文。不出意外还是人流模拟仿真方向。",-1),e("p",null,[t("在此之前，我了解到了一个好用、美观的文献管理工具"),e("code",null,"Zotero"),t("。文献管理工具倒是不少，但是都太丑了，只有"),e("code",null,"Zotero"),t("符合我的审美。配置插件之后可以方便地直接从知网抓取文献，而且资源 "),e("a",{href:"https://zotero-chinese.com/",target:"_blank",rel:"noopener noreferrer"},"Zotero 非官方中文社区"),t(" 也非常丰富详尽。")],-1),e("div",{style:{"text-align":"center"}},[e("p",null,[e("img",{src:"https://oss.yoake.cc/yoyopics/record/2025W9/1740743736207.webp",alt:"1740743736207",class:"h-250"})])],-1),e("p",null,[t("这周暂时只读了一篇"),e("a",{href:"https://link.cnki.net/doi/10.16272/j.cnki.cn11-1392/j.2023.01.025",target:"_blank",rel:"noopener noreferrer"},"《基于视觉吸引力算法的商业广场行人模拟研究》"),t("。作者提出了一种视觉吸引力模型，大致意思是：每个店铺都有其自身对行人的吸引力，而每个行人都有自身的需求，当店铺吸引力大于行人需求时，行人就会进入店铺。当然实际模型不止如此，店铺吸引力受多个参数影响，如行人和店铺之间的距离（很好理解，离远了自然看不见）、店铺占据行人视线的视场角等。这个算法比较简单易懂，后续我可能会用 AnyLogic 实现一下（如果 AnyLogic 支持这种操作的话）。")],-1)])),_:1}),n(r,{title:"技术提升",icon:"fluent-color:code-24"},{default:l(()=>o[1]||(o[1]=[e("p",null,"BUCEA 的校园网有点扯淡，只有无线网络才能无感认证，有线网络每天凌晨会被准时踢下线。真是不知道哪个大聪明想的。我每天早上来工位打开浏览器时才发现没有认证，又要打开认证页面……就很烦躁。",-1),e("p",null,[t("因此从上周开始就在想着怎么对校园网搞点事情，做一下自动登录。本来的设想是：抓包到 BUCEA 的登录 URL，把账号密码传参进去，再写个脚本发送请求。但是我把事情想的太简单了，URL 虽然拿到了吧，但是参数不是常见的"),e("code",null,"login=xxxx&password=xxx"),t("，而是一大串莫名奇妙的东西。混合了 base64 和 md5 编码，以及当前的时间戳（应该是为了避免同一个链接被反复使用多次），似乎还有从服务器生成的一个认证 token……对我校的网信部门表示佩服。")],-1),e("p",null,"综上，通过 URL 来搞事情不是很可行，我又把目光投到了模拟点击上。",-1),e("p",null,[t("无头浏览器是一种浏览器程序。与常见的"),e("code",null,"Chrome"),t("等不同的是，它没有 GUI，但是同样能做到解析并渲染网页、执行 JS 代码、访问和操作 DOM 元素。常见的无头浏览器有"),e("code",null,"Chrome Headless"),t("和"),e("code",null,"Puppeteer"),t("。后者我以前接触过，在某个项目中用来生成图片，原理是用 HTML和CSS 做好图片的布局排版，然后模拟截图返回。")],-1),e("p",null,[t("这次我用的是"),e("code",null,"Chrome Headless"),t("，加载完成页面后查找需要操作的元素的 ID，然后执行模拟点击就可以了，比较简单。后面有时间可以写一篇关于无头浏览器的文章聊一聊（挖坑ing）。")],-1),e("p",null,[t("LLM 二次开发方面也有进展。两周前提到，导师要我给实验室部署一个基于 DeepSeek 的本地知识库。目前采用的是"),e("code",null,"Ollama"),t("+"),e("code",null,"AnythingLLM"),t("方案，但是似乎有些奇怪——"),e("code",null,"AnythingLLM"),t("只能在本地电脑上部署，也就是说用户要访问知识库的话，需要先在自己电脑上安装一个"),e("code",null,"AnythingLLM"),t("，然后手动把知识库导入进去。这显然和预期不太一样。原本的设想是，使用"),e("code",null,"Ollama"),t("驱动模型，"),e("code",null,"AnythingLLM"),t("或者什么东西作为中间件承担知识库任务，其他用户通过浏览器或者"),e("code",null,"ChatBox"),t("之类的访问。"),e("code",null,"AnythingLLM"),t("倒是向外提供了自己的 API，就可惜文档是全英文写的，读起来有点吃力。后面再研究研究吧。")],-1),e("p",null,[t("著名组件库"),e("code",null,"Ant Design"),t("推出了一套专门用于构建 AI 聊天页面的组件库"),e("a",{href:"https://antd-design-x-vue.netlify.app/",target:"_blank",rel:"noopener noreferrer"},[e("code",null,"Ant Design X")]),t("，下周我要去学习一下，构建一个自己的 AI 聊天平台。")],-1)])),_:1}),n(r,{title:"生活百态",icon:"fluent-color:food-24"},{default:l(()=>[o[2]||(o[2]=e("p",null,[e("mark",null,"我真的好想吃正宗安徽牛肉板面啊。"),t(" 都开学一周了，北门的正宗安徽牛肉板面还不开门，老板真不着急赚钱吗。")],-1)),o[3]||(o[3]=e("p",null,"去民大旁边吃了海南椰子鸡。按照我的分类法，算是一种椰子水汤底的火锅。鸡肉和平时吃的不太一样，鸡皮脆弹且有韧性，像是鸭肠。竹升面也是脆脆的，口感像是没泡开的泡面（？），也可能是我煮的方式不对吧，白瞎了这一绺面。",-1)),o[4]||(o[4]=e("p",null,"特别令人惊艳的是它的蘸水，酸辣口的，酱油、蚝油、辣椒圈、香菜、青柠汁相得益彰，开胃而令人上瘾。尤其是在沸腾椰汁中煮过一遭的响铃卷，再次吸饱岭南风情的蘸水，一口下去，心生满足。管他是否正宗地道，此时的我只不过是个忙里偷闲、用味觉感受两千公里以外的海浪与海风的一名食客。",-1)),n(i,null,{default:l(()=>[n(a,{image:"https://oss.yoake.cc/yoyopics/record/2025W9/1740743781863.webp"}),n(a,{image:"https://oss.yoake.cc/yoyopics/record/2025W9/1740743777585.webp"})]),_:1})]),_:1})])}const f=s(u,[["render",m]]),h=JSON.parse('{"path":"/record/2025w9/","title":"2025W9 雪沫乳花浮午盏","lang":"zh-CN","frontmatter":{"title":"2025W9 雪沫乳花浮午盏","createTime":"2025/02/28 14:32:32","permalink":"/record/2025w9/","description":"这周是新学期的第一周，因此新开了一部分，之前写的就归档了。 周记，应当记录一周生活。但是这种形式（或者说我的生活？）太单薄了，每周就是那点事，难免写成流水账。我写着乏味，看着也无趣。 应当做些什么，整点花活，创新形式也好，写点新内容也好。 哎呀，写周记真的好难。 现在的决定是每周五写出一部分发布出来，然后周六周日随缘补充新的内容。","head":[["meta",{"property":"og:url","content":"https://www.yoake.cc/record/2025w9/"}],["meta",{"property":"og:site_name","content":"YOYOArticle"}],["meta",{"property":"og:title","content":"2025W9 雪沫乳花浮午盏"}],["meta",{"property":"og:description","content":"这周是新学期的第一周，因此新开了一部分，之前写的就归档了。 周记，应当记录一周生活。但是这种形式（或者说我的生活？）太单薄了，每周就是那点事，难免写成流水账。我写着乏味，看着也无趣。 应当做些什么，整点花活，创新形式也好，写点新内容也好。 哎呀，写周记真的好难。 现在的决定是每周五写出一部分发布出来，然后周六周日随缘补充新的内容。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://oss.yoake.cc/yoyopics/record/2025W9/1740743736207.webp"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-05T04:41:44.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-05T04:41:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"2025W9 雪沫乳花浮午盏\\",\\"image\\":[\\"https://oss.yoake.cc/yoyopics/record/2025W9/1740743736207.webp\\"],\\"dateModified\\":\\"2025-03-05T04:41:44.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":4.95,"words":1485},"git":{"updatedTime":1741149704000,"contributors":[{"name":"YOAKE","username":"YOAKE","email":"yo2yoake@outlook.com","commits":4,"avatar":"https://avatars.githubusercontent.com/YOAKE?v=4","url":"https://github.com/YOAKE"}]},"autoDesc":true,"filePathRelative":"notes/record/2025W9.md"}');export{f as comp,h as data};
