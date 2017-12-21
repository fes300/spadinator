'use babel';

import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'spadinator:order_Props': () => this.orderProps()
    }))
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  orderProps() {
    editor = atom.workspace.getActiveTextEditor()
    editor.getText()
    editor.setText(editor.getText() + 'ciao')
    editor.save()
  }
}
