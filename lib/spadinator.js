'use babel'

import { CompositeDisposable } from 'atom'

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
    //editor.scan(regex, [options], iterator) take all matches of "regexp" pass them through iterator
    const cursorPositions = this.editor.getCursorScreenPositions()

    this.editor.setText(this.editor.getText())

    this.setCursorsPosition(cursorPositions)

    this.editor.save()
  }
}
