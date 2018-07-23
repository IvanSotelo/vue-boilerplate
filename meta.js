'use strict'

const { join } = require('path')
const { readFileSync, writeFileSync } = require('fs')
const { get } = require('https')

function getCurrentSHA (author) {
  return new Promise((resolve, reject) => {
    let isBranch = process.argv[2].indexOf('#') > -1

    get({
      host: 'api.github.com',
      path: `/repos/IvanSotelo/vue-boilerplate/commits${isBranch ? '?sha=' + process.argv[2].split('#')[1] : ''}`,
      headers: {
        'User-Agent': author
      }
    }, res => {
      res.setEncoding('utf8')
      let rawData = ''

      res.on('data', chunk => {
        rawData += chunk
      })
      res.on('end', () => {
        try {
          let parsed = JSON.parse(rawData)
          resolve(parsed[0].sha)
        } catch (e) {
          reject(e)
        }
      })
    }).on('error', e => {
      reject(e)
    })
  })
}

function appendSHALink (sha, destDirName) {
  let readmePath = join(destDirName, '/README.md')
  let md = readFileSync(readmePath, 'utf8')
  md = md.replace(
    ' using',
    `@[${sha.substring(0, 7)}](https://github.com/IvanSotelo/vue-boilerplate/tree/${sha}) using`
  )
  writeFileSync(readmePath, md, 'utf8')
}

module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Application Name'
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'An vue project'
    },
    plugins: {
      type: 'checkbox',
      message: 'Select which Vue plugins to install',
      choices: ['axios', 'vue-router', 'vuex', 'vue-meta', 'vue-i18n'],
      default: ['axios', 'vue-router', 'vuex', 'vue-meta', 'vue-i18n']
    },
    css: {
      type: 'confirm',
      message: 'Set up Css pre-processor?',
      require: true,
      default: true
    },
    cssConfig: {
      when: 'css',
      type: 'list',
      message: 'What CSS pre-processor solution would you like to use?',
      choices: [
        {
          name: 'SCSS/SASS',
          value: 'scss',
          short: 'SCSS'
        },
        {
          name: 'LESS',
          value: 'less',
          short: 'LESS'
        }
      ]
    },
    eslint: {
      type: 'confirm',
      require: true,
      message: 'Use linting with ESLint?',
      default: true
    },
    eslintConfig: {
      when: 'eslint',
      type: 'list',
      message: 'Which ESLint config would you like to use?',
      choices: [
        {
          name: 'Standard (https://github.com/feross/standard)',
          value: 'standard',
          short: 'Standard'
        },
        {
          name: 'Airbnb (https://github.com/airbnb/javascript)',
          value: 'airbnb',
          short: 'Airbnb'
        },
        {
          name: 'none (configure it yourself)',
          value: 'none',
          short: 'none'
        }
      ]
    },
    unit: {
      type: 'confirm',
      message: 'Set up unit testing?',
      required: true,
      default: true
    },
    e2e: {
      type: 'confirm',
      message: 'Set up end-to-end testing?',
      require: true
    },
  },
  helpers: {
    isEnabled (list, check, opts) {
      if (list[check]) return opts.fn(this)
      else return opts.inverse(this)
    },
    deps (plugins) {
      let output = ''
      let dependencies = {
        'axios': '^0.18.0',
        'vue-router': '^3.0.1',
        'vuex': '^3.0.1',
        'vue-i18n': '^8.0.0',
        'vue-meta': '^1.5.2',
      }

      if (Object.keys(plugins).length > 0) output += ',\n'

      Object.keys(plugins).forEach((p, i) => {
        output += `    "${p}": "${dependencies[p]}"`
        if (i !== Object.keys(plugins).length - 1) output += ',\n'
      })

      return output
    },
    testing (unit, e2e, opts) {
      if (unit || e2e) {
        return opts.fn(this)
      }
    }
  },
  filters: {
    'src/routes.js': 'plugins[\'vue-router\']',
    'src/components/HelloWorld.vue': 'plugins[\'vue-router\']',
    'src/router/**/*': 'plugins[\'vue-router\']',
    'src/store/**/*': 'plugins[\'vuex\']',
    'src/lang/**/*': 'plugins[\'vue-i18n\']',
    'src/style/**/*': 'css && cssConfig === \'scss\'',
    'test/e2e/**/*': 'e2e',
    'test/unit/specs/**/*': 'unit',
    'test/unit/jest.conf.js': 'unit',
    'test/unit/setup.js': 'unit',
    'test/.eslintrc': 'e2e || unit',
    '.eslintignore': 'eslint',
    '.eslintrc.js': 'eslint',
  },
  complete (data) {
    getCurrentSHA(data.author).then(sha => {
      let path = !data.inPlace ? data.destDirName : null
      if (path !== null) appendSHALink(sha, path)
      console.log([
        '\n---',
        '',
        'All set. Welcome to your new Vue project!',
        '',
        `Next Steps:\n${!data.inPlace ? '\n  \x1b[36m$\x1b[37;1m cd ' + data.destDirName : ''}`,
        '  \x1b[36m$\x1b[37;1m npm install\x1b[0m',
        '  \x1b[36m$\x1b[37;1m npm start\x1b[0m',
        '',
        '\x1b[36m Created by Ivan Sotelo \x1b[0m',
        '',
      ].join('\n'))
    }, () => {
      console.log('\x1b[33mwarning\x1b[0m Failed to append commit SHA on README.md')
    })
  }
}
