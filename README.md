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
    	
    

