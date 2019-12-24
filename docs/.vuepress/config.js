module.exports = {
  title: '翌擎大前端',
  description: '技术文档',
  themeConfig: {
    logo: 'https://i.loli.net/2019/12/19/Lh7ZSUCJX2Kon3j.jpg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
          { text: 'Chinese', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      },
      { text: 'Github', link: '/' },
      { text: '关注我', link: 'https://google.com', target:'_self', rel:'' },
    ],
    sidebar: [
      '/',
      '/guide/',
      ['/', 'Explicit link text']
    ],
    // sidebar: [
    //   {
    //     title: 'Group 1',   // 必要的
    //     path: '/foo/',      // 可选的, 应该是一个绝对路径
    //     collapsable: false, // 可选的, 默认值是 true,
    //     sidebarDepth: 1,    // 可选的, 默认值是 1
    //     children: [
    //       '/'
    //     ]
    //   },
    //   {
    //     title: 'Group 2',
    //     children: [ /* ... */ ]
    //   }
    // ]
    lastUpdated: 'Last Updated', // string | boolean
    smoothScroll: true
  }
}
