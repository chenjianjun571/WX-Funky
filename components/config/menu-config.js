
const FooterMenuConfig = {
  '/':{
    name:'首页',
    link:'/home',
  },
  '/home':{
    name:'首页',
    link:'/home',
  },
  '/shot':{
    name:'摄影',
    link:'/shot',
  },
  '/scheme':{
    name:'婚庆',
    link:'/scheme',
  },
  '/hotel':{
    name:'婚宴',
    link:'/hotel',
  }
}

const MenuConfig = {
  '/shot':[
    {
      cn:'摄影首页',
      en:'PHOTO',
      link:'/shot',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'作品欣赏',
      en:'WORKS',
      link:'/sample',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'客片欣赏',
      en:'PRINGLES',
      link:'/pringles',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'套系报价',
      en:'SUITE',
      link:'/suite',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'微电影',
      en:'MOVIE',
      link:'/movie',
      target:false,
      kClass:'item second-menu',
      remark:''
    }
  ],
  '/hotel':[
    {
      cn:'婚宴首页',
      en:'BANQUET',
      link:'/hotel',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'提交需求',
      en:'REQUIRE',
      link:'/hotel-require',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'大礼包',
      en:'GIFT',
      link:'/activity/detail/libao',
      target:true,
      kClass:'item second-menu',
      remark:''
    }
  ],
  '/scheme':[
    {
      cn:'婚庆首页',
      en:'WEDDING',
      link:'/scheme',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'实景案例',
      en:'CASES',
      link:'/cases',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'婚礼跟拍',
      en:'FOLLOW',
      link:'/followPhoto',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'婚礼视频',
      en:'VIDEO',
      link:'/followVideo',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'选婚礼人',
      en:'F4',
      link:'/f4',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'婚纱礼服',
      en:'DRESS',
      link:'/dress',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'婚礼用品',
      en:'SUPPLIES',
      link:'/supply',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'婚车租赁',
      en:'CAR',
      link:'/car',
      target:false,
      kClass:'item second-menu',
      remark:''
    }
  ]
}

export { MenuConfig }
