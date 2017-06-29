# carousel
这就是一个移动端的轮播， 支持左滑和右滑。 用在PC端也是没问题的。

### Usage

1. 引入这个css和js是必须的。 这个轮播也依赖于jQuery， 但是没在jQuery的基础上扩展， 暂时先这么用一下。jQuery是3.0.0以后的

   ```html
   <link rel="stylesheet" href="./dist/css/xdyuan_carousel.min.css">
   <script src="./node_modules/jquery/dist/jquery.js"></script>
   <script src="dist/js/xdyuan_carousel.min.js"></script>
   ```

2. HTML的结构需要注意下

   ```html
   <div class="xdyuan_container">
       <ul class="">
           <li class="">
               <a target="" href="#"><img class="" src="../image/1.jpg" alt="0"></a>
           </li>
           <li class="xdyuan_li">
               <a target="" href="#"><img class="" src="../image/2.jpg" alt="1"></a>
           </li>
       </ul>
   </div>
   ```

   最外层的**div**的类名暂时先取成**xdyuan_container**，固定一下。里面必须第一层包含**ul，**  **li**里面的一般的设计也是**a**和**img**。类名可以不要。

3. js的使用

   ```javascript
    window.xdyuanCarouselInit({
           containerIdentify : '.xdyuan_container',
           effectiveDeltaX:80,
           invalidDeltaY: 80,
           interval : 5000, //毫秒
           contaner_height : 175,
           indexObj : {
               right : 0,
               bottom : 5,
               isCenter : false,
               currentBackgroundColor : 'orange',
               backgroundColor : '#ccc'
           }
       });
   ```

   几个参数这里注意一下

   |           参数           |                    说明                    |   类型    |
   | :--------------------: | :--------------------------------------: | :-----: |
   |   containerIdentify    |          这是最外层div. 格式.class或#id          | string  |
   |    effectiveDeltaX     |          左右滑触发图片滑动的距离。设计为80差不多           | number  |
   |     invalidDeltaY      |     滑动时垂直的距离超过这个数就放弃， 考虑到可能需要下拉刷新等。      | number  |
   |        interval        |              轮播的时间间隔， 单位毫秒               | number  |
   |    contaner_height     |         你希望的轮播的高度， 可以自己根据图片的比例计算         | number  |
   |        indexObj        | 这是一个索引，轮播的指示，是一个个的圆点。通过这个对象设置索引的一些类型。不设置这个属性就是没有索引， 设置了里面的属性就得完成 | object  |
   |  right ，       bottom  |  这是定位的值， 目前支持这两个值， left和top没做进去， 因为太懒了。  | number  |
   |        isCenter        |   是不是居中， 如果是的话设置一些bottom就行， 不需要设置right   | boolean |
   | currentBackgroundColor |                高亮的小圆点背景色                 |  color  |
   |    backgroundColor     |                  其他的背景色                  |  color  |

   > color : javascript认可的所有的颜色格式。

   ​





















