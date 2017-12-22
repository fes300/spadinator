'use babel'

import { CompositeDisposable } from 'atom'

const pipe = (first, ...more) => more.reduce(
  (accumulator, routine) => (...args) => routine(accumulator(...args)),
  first,
)
const objectSyntaxes = ['{{', ':{', '={', '[{', '({']
const split = syntax => syntax.split('')
const concatenate = splitSyntax => `${splitSyntax[0]} {0,}\\n{0,}${splitSyntax[1]}`
const sanitize = string => string.replace('[', '\\\\[').replace('(', '\\\\(')
const matchingStarts = sanitize(
  objectSyntaxes.reduce((acc, syntax) => acc.concat(pipe(split, concatenate)(syntax)), []).join('|')
)

export default {
  subscriptions: null,
  editor: null,

  activate(state) {
    this.editor = atom.workspace.getActiveTextEditor()
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'spadinator:order': () => this.orderProps()
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  setCursorsPosition(cursorPositions) {


    this.editor.setCursorScreenPosition(cursorPositions.pop())

    cursorPositions.forEach(point => this.editor.addCursorAtScreenPosition(point))
  },

  orderProps() {
    // /`[^${matchingStarts}]*(${matchingStarts})(.+)`/
    // [^{ {0,}\n{0,}{|: {0,}\n{0,}{|= {0,}\n{0,}{|[ {0,}\n{0,}{|( {0,}\n{0,}{]*)({ {0,}\n{0,}{|: {0,}\n{0,}{|= {0,}\n{0,}{|[ {0,}\n{0,}{|( {0,}\n{0,}{)(.+)
    // ([^{{|:{|={|,{|\[{|\({]*)({{|:{|={|,{|\[{|\({)(.+)
    //editor.scan(regex, [options], iterator) take all matches of "regexp" pass them through iterator
    const cursorPositions = this.editor.getCursorScreenPositions()

    console.log(matchingStarts.exec(this.editor.getText()))

    this.setCursorsPosition(cursorPositions)

    this.editor.save()
  }
}
