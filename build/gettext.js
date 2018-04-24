const fs = require('fs')
const path = require('path')
const child_process = require('child_process')
const pkg = require('../package.json')

// Configurations
const root = path.join(__dirname, '../src') // source dir
const localeDir = path.join(__dirname, '../locale') // storage po files
const includePath = [root] // include files
const excludePath = [ // no translate path
  `${root}/assets`,
  `${root}/styles`
]
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.vue'] // translate file extName
const regexps = { // regexpress for match source code
  default: {
    reg: /__\(\s*('|")([^'"]+)\1\)/g,
    index: 2
  }
}

const getDirFiles = (filePath) => {
  if (fs.statSync(filePath).isFile()) {
    return filePath
  } else {
    return fs.readdirSync(filePath).reduce((r, file) => r.concat(getDirFiles(filePath + '/' + file)), [])
  }
}

const ensurePoFileExists = (poPath) => {
  try {
    fs.accessSync(poPath, fs.constants.R_OK | fs.constants.W_OK)
  } catch (e) {
    fs.writeFileSync(poPath, [
      'msgid ""',
      'msgstr ""',
      `"Project-Id-Version: ${pkg.version}\\n"`,
      '"Content-Type: text/plain; charset=UTF-8\\n"',
      '"Content-Transfer-Encoding: 8bit\\n"'
    ].join('\n'))
  }
}

const getTranslationsToPo = () => {
  const sourceFiles = includePath.reduce((r, file) => r.concat(
    fs.statSync(file).isDirectory() ? getDirFiles(file) : file,
  ), []).filter((file) => excludePath.findIndex((extFile) => file.startsWith(extFile)) < 0)
  // get all keys
  const translations = sourceFiles.reduce((tr, filePath) => {
    const content = fs.readFileSync(filePath)
    const extName = path.extname(filePath)
    if (extensions.indexOf(extName) < 0) {
      return tr
    }
    const regexp = regexps[extName] || regexps.default
    let lineCount = 0
    return content.toString().split(/\r?\n/).reduce((cr, lineStr) => {
      lineCount++
      lineStr.replace(regexp.reg, (str, ...args) => {
        const match = args[regexp.index - 1]
        const matched = cr[match] || []
        matched.push(`#: ${filePath}:${lineCount}`)
        cr[match] = matched
        return ''
      })
      return cr
    }, tr)
  }, {})
  // wirte template.pot
  fs.writeFileSync(
    `${localeDir}/template.pot`,
    Object.entries(translations).map(([key, value]) => [
      value.join("\n"),
      `msgid "${key}"`,
      'msgstr ""',
    ].join("\n")).join("\n\n")
  )
  // wirte LANG.po
  pkg.languages.forEach((lang) => {
    ensurePoFileExists(`${localeDir}/${lang}.po`)
    child_process.execSync(
      `msgmerge -Uq ${lang}.po template.pot --backup=none --no-location --no-wrap --no-fuzzy-matching`,
      { cwd: localeDir }
    )
  })
}

const writeTranslationsToJson = () => {
  const msgReg = /msgid "([^\n]+)"\r?\nmsgstr "([^\n]*)"/gm
  const translations = pkg.languages.reduce((trans, lang) => {
    const poPath = `${localeDir}/${lang}.po`
    // const jsonPath = `${localeDir}/${lang}.json`
    ensurePoFileExists(poPath)
    const content = fs.readFileSync(poPath).toString().match(msgReg) || []
    const langTrans = content.reduce((r, item) => {
      const splitData = item.split(/\r?\n/) // ['msgid ""', 'msgstr ""']
      const msgid = splitData[0].slice(7, splitData[0].length - 1) // msgid "<7, -1>"
      const msgstr = splitData[1].slice(8, splitData[1].length - 1) // msgstr "<8, -1>"
      return { ...r, [msgid]: msgstr }
    }, {})
    return { ...trans, [lang]: langTrans }
  }, {})
  fs.writeFileSync(`${localeDir}/template.json`, JSON.stringify(translations))
}

function main(action){
  try {
    fs.accessSync(localeDir, fs.constants.R_OK | fs.constants.W_OK)
  } catch (e) {
    fs.mkdirSync(localeDir)
  }
  if ('write' === action) {
    writeTranslationsToJson()
  } else {
    getTranslationsToPo()
  }
}

module.exports = main

if (__filename === process.argv[1]) {
  main(process.argv[2])
}
