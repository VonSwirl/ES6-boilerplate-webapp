'use-strict'
const spacer = ' >>>\n'
const srtUndef = '>>> JLOG (Undefined) '
const srtError = '>>> JLOG (Error) '
const srtObj = '>>> JLOG (Object) '
const srtArr = '>>> JLOG (Array) '
const srtFunc = '>>>JLOG (Function) '
const srtUnk = '>>> JLOG (Unknown) '
const srtBool = '>>> JLOG (Boolean) '
const srtStr = '>>> JLOG (String) '
const srtNum = '>>> JLOG (Number) '
const srtBigInt = '>>> JLOG (BigInt) '
const srtSym = '>>> JLOG (Symbol) '
const endMsg = '\n<<< JLOG End <<<'

/**
 * * Makes viewing console.log() more distinguashable
 * just pass the title of the message and content e.g error
 * or data.whatever and jLog() will format it as follows...
 * @example
 * >>> JLOG (isUndefined) title
 * content
 * <<< JLOG End <<<
 *
 * @param {String} title The title of the console log.
 * @param {*} content The content to show in the console log.
 * @returns see example
 *
 */

async function jLog (title, content) {
  const isTypeOf = typeof content
  if (process.env.NODE_ENV === 'production') { // PRODUCTION LOG
    switch (isTypeOf) {
      case 'undefined': return console.log(`\n${srtUndef}${title}${spacer}${content}${endMsg}`)
      case 'function': return console.log(`\n${srtFunc}${title}${spacer}${content}${endMsg}`)
      case 'boolean': return console.log(`\n${srtBool}${title}${spacer}${content}${endMsg}`)
      case 'string': return console.log(`\n${srtStr}${title}${spacer}${content}${endMsg}`)
      case 'number': return console.log(`\n${srtNum}${title}${spacer}${content}${endMsg}`)
      case 'bigint': return console.log(`\n${srtBigInt}${title}${spacer}${content}${endMsg}`)
      case 'symbol': return console.log(`\n${srtSym}${title}${spacer}${content}${endMsg}`)
      case 'object': {
        if (Array.isArray(content)) {
          console.log(`\n${srtArr}${title}' >>>'`)
          for (let i = 0; i < content.length; i++) { console.log(content[i]) }
          console.log('<<< JLOG End <<<')
          break
        } else {
          if (content instanceof TypeError) return console.log(`${srtError}${title}${spacer}${content}${endMsg}`)
          else {
            console.log(`\n${srtObj}${title}' >>>'`)
            for (const key in content) { if (content.hasOwnProperty(key)) console.log(key + ': ' + content[key]) }
            console.log('<<< JLOG End <<<')
            break
          }
        }
      }
      default: return console.log(`\n${srtUnk}${title}${spacer}${content}${endMsg}`)
    }
  } else { // DEV LOG
    switch (isTypeOf) {
      case 'undefined': return console.log(`\n${srtUndef}${title}${spacer}${content}${endMsg}`)
      case 'function': return console.log(`\n${srtFunc}${title}${spacer}${content}${endMsg}`)
      case 'boolean': return console.log(`\n${srtBool}${title}${spacer}${content}${endMsg}`)
      case 'string': return console.log(`\n${srtStr}${title}${spacer}${content}${endMsg}`)
      case 'number': return console.log(`\n${srtNum}${title}${spacer}${content}${endMsg}`)
      case 'bigint': return console.log(`\n${srtBigInt}${title}${spacer}${content}${endMsg}`)
      case 'symbol': return console.log(`\n${srtSym}${title}${spacer}${content}${endMsg}`)
      case 'object':
        if (Array.isArray(content)) {
          console.log(`${srtArr}${title}${spacer}`)
          for (let i = 0; i < content.length; i++) { console.log(content[i]) }
          console.log(`${endMsg}`)
          break
        } else {
          if (content instanceof TypeError) {
            console.log(`${srtError}${title}' >>>'`)
            console.log(content)
            console.log('<<< JLOG End <<<')
            break
          } else {
            console.log(`${srtObj}${title}' >>>'`)
            console.log(content)
            console.log('<<< JLOG End <<<')
            break
          }
        }
      default: return console.log(`${srtUnk}${title}${spacer}${content}${endMsg}`)
    }
  }
}

export default jLog
