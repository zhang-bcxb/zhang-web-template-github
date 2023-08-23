const { notEmpty } = require('../utils.js');

module.exports = {
  description: '创建store',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'store名称',
    validate: notEmpty('name'),
  },
  {
    type: 'checkbox',
    name: 'blocks',
    message: '包含以下哪些:',
    choices: [{
      name: 'state',
      value: 'state',
      checked: true,
    },
    {
      name: 'mutations',
      value: 'mutations',
      checked: true,
    },
    {
      name: 'actions',
      value: 'actions',
      checked: true,
    },
    ],
    validate(value) {
      if (!value.includes('state') || !value.includes('mutations')) {
        return 'state和mutations是必须项';
      }
      return true;
    },
  },
  ],
  actions(data) {
    const name = '{{camelCase name}}';
    const { blocks } = data;
    const options = ['state', 'mutations'];
    const joinFlag = `,
  `;
    if (blocks.length === 3) {
      options.push('actions');
    }
    options.push('localStorage: [],');

    const actions = [{
      type: 'add',
      path: `src/store/modules/${name}.js`,
      templateFile: 'plop-templates/store/index.hbs',
      data: {
        options: options.join(joinFlag),
        state: blocks.includes('state'),
        mutations: blocks.includes('mutations'),
        actions: blocks.includes('actions'),
      },
    }];
    return actions;
  },
};
