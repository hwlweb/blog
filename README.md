#####目录结构

- routes 路由目录

    - index.js 路由主入口

##### 更新记录

- 2015.07.17 规划目录结构


- 2015.07.18 

    - 放弃使用express框架，接入koa框架(http://koa.bootcss.com/)，koa是Es6 Generator方法，所以有启用主文件时要加上--harmony: 
    
    	<code>node --harmony app.js</code>
    	
    	
    - koa-views 模板解析包
    	
    - koa-static 静态服务包
    	
    - dustjs-helpers 模板引擎包
    	
    - koa-router 路由包
    	
    - 引入守护进程代码dispatch.js,防止服务中断时，自动重启，启动主程序代码改为：
    
    	<code>node --harmony dispatch.js</code>
    	
    - mongo 配置：使用可视化工具（Robomongo）进行管理，前提是先启动本的mongo服务：sudo ./mongod
    
- 2015.07.23
    
    - 成功使用layout.dust,抽取头，尾模板，因为koa对dust的支持还不是很完美，layout引用时加上views文件地址，示例："views/layout.dust"
    
    - 增加add,edit功能 
    
    - 踩得几个坑
       
       - koa-mongo, 中间件都是挂在app上面，所以在control里面要把app传给module，route也是中间件，所以这里面的this是指向app的
      
       - thunkify模块，可以去掉后面的回调，之后就可以把查询的结果直接return回去
       
       <code>
           var collection = app.mongo.db('niko_wolf_blog').collection('article');
           
           var findOne = thunkify(collection.findOne.bind(collection));
       
           return yield findOne(obj);
       </code>
       
       - redirect 前面不能用yield,而render前面可以，因为redirect 返回的是一个undefine,理论上来讲，yield可以出现在任何function前面
       
       - 获取:id参数的值，this.params.id，但直用来用来查询却不可以，比如{_id:id}，因为mongodb接收的是一个objectId,而不是一个字符串，所以
       要引用mongo模块的objectId对象
       
       <code>
       var ObjectId = require('mongodb').ObjectID;
       
       var id = new ObjectId(this.params.id);
       
       var post = yield articleModules.findOne({_id:id}, app);
       </code>
       
    - 2015.07.24
    
      - 完成文章的增、删、改，查，list功能
      
        - 坑：mongo的find功能需要toArray一下，因为toArray还是处在同步时期，所以需要把toArray方法trunkify一下转为异步
      
    - 2015.07.27 
    
       - 增加marked编辑，dust模块解析的时候可以在输出参数上面加上{xxoo|s}可以对html进行转译，更多方法见Dust Helpers
       
       - 增加文章分类功能
