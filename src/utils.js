const validators = {
  required: {
    msg (value, values) {
      return this.message || `required`
    },
    fn (value, values) {
      switch (Object.prototype.toString.call(value)) {
        case '[object Number]':
          return isNaN(value) === false
        case '[object Array]':
          return value.length > 0
        case '[object String]':
          return value.trim().length > 0
        default:
          return !!value
      }
    }
  },
  email: {
    msg (value, values) {
      return this.message || `invalid email`
    },
    fn (value, values) {
      return /^[^@\s]+@([^.]+)(.[^.]+){1,2}$/.test(value)
    }
  },
  custom: {
    msg (value, values) {
      return this.message || `invalid value`
    },
    fn (value, values) {
      if (Object.prototype.toString.call(this.custom) !== '[object Function]') {
        throw new Error('FormValidateRule: custom must specify custom function')
      }
      return this.custom(value, values)
    }
  },
  pattern: {
    msg (value, values) {
      return this.message || `not match pattern ${this.pattern}`
    },
    fn (value, values) {
      if (Object.prototype.toString.call(this.pattern) !== '[object RegExp]') {
        throw new Error('FormValidateRule: pattern must specify a RegExp value')
      }
      return this.pattern.test(value)
    }
  },
  equal: {
    msg (value, values) {
      return this.message || `not equal to ${this.equal}`
    },
    fn (value, values) {
      if (typeof this.equal === 'undefined') {
        throw new Error('FormValidateRule: equal must specify equal field name')
      }
      return value === values[this.equal]
    }
  },
  number: {
    msg (value, values) {
      return this.message || `invalid number`
    },
    fn (value, values) {
      return (/^[-+]?\d+$/).test(value)
    }
  },
  min: {
    msg (value, values) {
      return this.message || `min ${this.min}`
    },
    fn (value, values) {
      if (Object.prototype.toString.call(this.min) !== '[object Number]') {
        throw new Error('FormValidateRule: min must specify min value')
      }
      return parseFloat(value) >= this.min
    }
  },
  max: {
    msg (value, values) {
      return this.message || `max ${this.max}`
    },
    fn (value, values) {
      if (Object.prototype.toString.call(this.max) !== '[object Number]') {
        throw new Error('FormValidateRule: max must specify max value')
      }
      return parseFloat(value) <= this.max
    }
  },
  minlength: {
    msg (value, values) {
      return this.message || `min length ${this.minlength}`
    },
    fn (value, values) {
      if (Object.prototype.toString.call(this.minlength) !== '[object Number]') {
        throw new Error('FormValidateRule: minlength must specify minlength value')
      }
      return value && value.length >= this.minlength
    }
  },
  maxlength: {
    msg (value, values) {
      return this.message || `max length ${this.maxlength}`
    },
    fn (value, values) {
      if (Object.prototype.toString.call(this.maxlength) !== '[object Number]') {
        throw new Error('FormValidateRule: maxlength must specify maxlength value')
      }
      return value && value.length <= this.maxlength
    }
  }
}

export const validate = (value, rules, values) => {
  for (let i = 0, l = rules.length; i < l; i += 1) {
    if (rules[i].type === 'optional') {
      if (!validators.required.fn(value, values)) {
        return
      }
      continue
    }
    const validator = validators[rules[i].type]
    if (!validator) {
      throw new Error(`FormValidateRule: [${rules[i].type}] not found`)
    } else if (!validator.fn.call(rules[i], value, values)) {
      return validator.msg.call(rules[i], value, values)
    }
  }
}
