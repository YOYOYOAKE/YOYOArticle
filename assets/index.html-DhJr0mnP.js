import{_ as o,c as i,a as e,o as r}from"./app-Bex44-0d.js";const a={};function n(s,t){return r(),i("div",null,t[0]||(t[0]=[e("p",null,"2025年的第二周，本周状态：忙，但是百无聊赖。",-1),e("p",null,"继续完善YOYOGeoViewer的项目。导师说可以在地图里加载建筑白模以体现Cesium作为三维地图框架的优势。从师姐那里要到了北京市的建筑轮廓，然后用Cesium Lab转成3D Tiles加载。不得不说一嘴，3D Tiles真的是黑科技，局部加载和按需加载让核显办公本也能流畅加载大量建筑模型。",-1),e("p",null,"针对上周提到的加载海量点数据时吃内存的问题，Code Review了一下发现应该是自己又犯了在Vue中滥用响应式变量的错误。最初设想的是把Cesium.Viewer的实例挂载到Pinia上，这样就可以在任何地方都访问到。但是我忽略了一个问题：Cesium Viewer作为一个超大规模的对象有超级多的属性，把它作为响应式变量后，每次向Cesium Viewer中添加数据的时候Vue都要重新检查一遍所有的属性有没有更改，特别是我添加点的方式还是循环添加，每添加一个点Vue就要重新对比一遍，自然就吃内存了。解决方式是把Cesium Viewer挂载到全局对象window中，虽然不是很优雅，但是目前也只有这一种方式可以平衡需求了。还检查了一下其他的响应式变量，把无需响应式的全都解绑了，内存占用又下了一个台阶。现在加载50万点数据+城市建筑模型只占3G内存，可喜可贺。",-1),e("p",null,"周二花了一整天时间肝完了一篇六千字的论文和两千字的实验报告，这门课的老师实在不当人，我的评价是这课你爱上就上，不上也别恶心学生。八周就上三节课，讲的课还是本科生的内容，糊弄鬼呢。糊弄完了还留作业，逼着学生花时间做你那卵用没有的论文和实验，真是懒得喷。（补充：室友选的另一门课的老师更逆天，看起来没有最烂只有更烂。）",-1),e("p",null,"昨天约一位朋友吃了顿饭，在万达路过西西弗书店，就进去看了看。他一进书店就跟回家了一样。有点羡慕这种读过很多书的人，随便拿起一本书就可以说出这本书讲的什么、写的如何。可能是因为自己的理工科思维太重了吧，多交一些学文史政经的朋友也挺好的，偶尔交流一下来点思维碰撞，对自己的工作生活什么的也有好处。毕竟不能在舒适区中一直呆下去，毕竟不能让工作占满我的整个生活。",-1),e("p",null,"下午要去机场接另一个朋友回来，半年没见了，很想他。",-1),e("p",null,"这周就到这里吧。",-1)]))}const c=o(a,[["render",n]]),m=JSON.parse('{"path":"/record/2025w2/","title":"2025W2 假设","lang":"zh-CN","frontmatter":{"title":"2025W2 假设","createTime":"2025/01/09 16:25:37","permalink":"/record/2025w2/","description":"2025年的第二周，本周状态：忙，但是百无聊赖。 继续完善YOYOGeoViewer的项目。导师说可以在地图里加载建筑白模以体现Cesium作为三维地图框架的优势。从师姐那里要到了北京市的建筑轮廓，然后用Cesium Lab转成3D Tiles加载。不得不说一嘴，3D Tiles真的是黑科技，局部加载和按需加载让核显办公本也能流畅加载大量建筑模型。 针...","head":[["meta",{"property":"og:url","content":"https://www.yoake.cc/record/2025w2/"}],["meta",{"property":"og:site_name","content":"YOYOArticle"}],["meta",{"property":"og:title","content":"2025W2 假设"}],["meta",{"property":"og:description","content":"2025年的第二周，本周状态：忙，但是百无聊赖。 继续完善YOYOGeoViewer的项目。导师说可以在地图里加载建筑白模以体现Cesium作为三维地图框架的优势。从师姐那里要到了北京市的建筑轮廓，然后用Cesium Lab转成3D Tiles加载。不得不说一嘴，3D Tiles真的是黑科技，局部加载和按需加载让核显办公本也能流畅加载大量建筑模型。 针..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-28T06:57:08.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-28T06:57:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"2025W2 假设\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-02-28T06:57:08.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":2.54,"words":762},"git":{"updatedTime":1740725828000,"contributors":[{"name":"YOAKE","username":"YOAKE","email":"yo2yoake@outlook.com","commits":3,"avatar":"https://avatars.githubusercontent.com/YOAKE?v=4","url":"https://github.com/YOAKE"}]},"autoDesc":true,"filePathRelative":"notes/record/2025W2.md"}');export{c as comp,m as data};
