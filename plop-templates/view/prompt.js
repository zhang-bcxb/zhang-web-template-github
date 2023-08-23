const { notEmpty } = require('../utils.js');

module.exports = {
  description: '新建一个页面',
  prompts: [{
    type: 'input',
    name: 'name',
    message: '页面名称',
    validate: notEmpty('name'),
  },
  {
    type: 'checkbox',
    name: 'blocks',
    message: '需要包含什么:',
    choices: [{
      name: '<template>',
      value: 'template',
      checked: true,
    },
    {
      name: '<script>',
      value: 'script',
      checked: true,
    },
    {
      name: 'style',
      value: 'style',
      checked: true,
    },
    ],
    validate(value) {
      if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
        return ' <template> 和 <script> 是必须的.';
      }
      return true;
    },
  },
  ],
  actions: (data) => {
    const name = '{{properCase name}}';
    const actions = [{
      type: 'add',
      path: `src/views/${name}/index.vue`,
      templateFile: 'plop-templates/view/index.hbs',
      data: {
        name,
        template: data.blocks.includes('template'),
        script: data.blocks.includes('script'),
        style: data.blocks.includes('style'),
      },
    }];

    return actions;
  },
};
