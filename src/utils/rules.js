/* eslint-disable no-unused-vars */
// 表单规则校验
// 规则校验
import Regular from './regular';
// val1 === val2 ? new Error('两次输入不一致!') : ''
const Rules = {
  // 不得为空
  required: { required: true, message: '不得为空', trigger: ['blur', 'change'] },
  // 不固定长度
  dynamicLength: (min, max) => ({
    min,
    max,
    message: `长度为${min}-${max}位`,
    trigger: ['blur', 'change'],
  }),
  //   固定长度
  fixedLength: (length) => ({
    min: length,
    max: length,
    message: `长度为${length}位`,
    trigger: ['blur', 'change'],
  }),
  // 只允许中文
  chinese: { pattern: Regular.chineseRule, message: '只允许输入中文' },
  // 比较是否相同,https://github.com/yiminghe/async-validator
  same: (val1, val2, message = '两次输入不一致') => ({
    validator: (rule, value, callback, source, options) => {
      if (val1 === val2) {
        callback();
      } else {
        callback(new Error(message));
      }
    },
    trigger: 'blur',
  }),
};

export { Rules };
