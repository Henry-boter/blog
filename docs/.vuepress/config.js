module.exports = {
  base: '/blog/',
  title: '翌擎大前端',
  description: '前端创造无线可能',
  themeConfig: {
    logo: 'https://i.loli.net/2019/12/19/Lh7ZSUCJX2Kon3j.jpg',
    nav: [
      { text: '规范', link: '/standard/' },
      { text: '指南', link: '/guide/' },
      {
        text: '功能',
        ariaLabel: 'Features Menu',
        items: [
          {
            text: '组件',
            items: [
              { text: 'SliceUpload（大文件切片上传）', ariaLabel: 'Slice upload', link: '/language/chinese/' },
              { text: 'Tinymce(富文本)', link: '/language/chinese/' },
              { text: '大屏监控', link: '/language/chinese/' },
              { text: '电子围栏', link: '/language/chinese/' },
            ],
          },
          {
            text: 'JavaScript库',
            items: [ { text: 'Lodash', link: '/language/chinese/' }],
          },
        ]
      },
      // {
      //   text: 'Languages',
      //   ariaLabel: 'Language Menu',
      //   items: [
      //     { text: 'Chinese', link: '/language/chinese/' },
      //     { text: 'Japanese', link: '/language/japanese/' }
      //   ]
      // },
      { text: 'Github', link: '/github' },
      { text: '更新日志', link: '/config.html' },
      { text: '关注我', link: 'https://github.com/Henry-boter', target:'_self', rel:'' },
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
