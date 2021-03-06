
const FooterMenuConfig = {
  '/home':{
    name:'首页',
    link:'/home',
  },
  '/scheme':{
    name:'婚庆',
    link:'/scheme',
  },
  '/shot':{
    name:'摄影',
    link:'/shot',
  },
  //'/hotel':{
  //  name:'婚宴',
  //  link:'/hotel',
  //},
  '/dress':{
    name:'婚纱',
    link:'/dress',
  },
}

const MenuConfig = {
  '/shot':[
    {
      name:'摄影首页',
      menu:'/shot',
      link:'/shot',
      target:false
    },
    {
      name:'作品欣赏',
      menu:'/sample',
      link:'/sample',
      target:false
    },
    {
      name:'客片欣赏',
      menu:'/pringles',
      link:'/pringles',
      target:false
    },
    {
      name:'套系报价',
      menu:'/suite',
      link:'/suite',
      target:false
    },
    {
      name:'金色旅拍',
      menu:'',
      link:'http://trip.jsbn.com',
      target:true
    },
    //{
    //  name:'微电影',
    //  menu:'/movie',
    //  link:'/movie',
    //  target:false
    //}
  ],
  '/hotel':[
    {
      name:'婚宴酒店',
      menu:'/hotel',
      link:'/hotel',
      target:false
    },
    {
      name:'婚宴预约',
      menu:'/hotel-require',
      link:'/hotel-require',
      target:false
    },
    {
      name:'大礼包',
      menu:'/libao',
      link:'/activity/detail/libao?parentKey=hotel&menuKey=libao',
      target:true
    }
  ],
  '/scheme':[
    {
      name:'婚庆首页',
      menu:'/scheme',
      link:'/scheme',
      target:false
    },
    {
      name:'实景案例',
      menu:'/case',
      link:'/case',
      target:false
    },
    {
      name:'婚礼跟拍',
      menu:'/followPhoto',
      link:'/followPhoto',
      target:false
    },
    {
      name:'婚礼视频',
      menu:'/followVideo',
      link:'/followVideo',
      target:false
    },
    {
      name:'选婚礼人',
      menu:'/f4',
      link:'/f4',
      target:false
    },
    //{
    //  name:'婚纱礼服',
    //  menu:'/dress',
    //  link:'/dress',
    //  target:false
    //},
    {
      name:'婚礼用品',
      menu:'/supply',
      link:'/supply',
      target:false
    },
    {
      name:'婚车租赁',
      menu:'/car',
      link:'/car',
      target:false
    }
  ],
  '/dress': []
}

export { MenuConfig, FooterMenuConfig }
