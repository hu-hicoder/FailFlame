import * as vscode from "vscode";

let decorationsArray: vscode.TextEditorDecorationType[] = [];

export function activateDynamicTextColor() {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    vscode.workspace.onDidSaveTextDocument((event) => {
      // if (event.document !== editor.document) {
        const document = editor.document;
        const text = document.getText();

        
        const colors = [
          "red",
          "green",
          "blue",
          "yellow",
          "magenta",
          "cyan",
          "orange",
          "lime",
        ];

        const words = text.match(/\S+/g);
        if (!words) {
          return;
        }

        let index = 0;
        const ranges: vscode.DecorationOptions[] = [];

        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          console.log(word);
          const startPos = document.positionAt(text.indexOf(word, index));
          const endPos = document.positionAt(
            text.indexOf(word, index) + word.length
          );
          const range = new vscode.Range(startPos, endPos);
          ranges.push({ range });

          const rand = Math.floor(Math.random() * (colors.length - 1));
          const color = colors[rand];
          const decorationType = vscode.window.createTextEditorDecorationType({
            color: color,
          });

          decorationsArray.push(decorationType);
          editor.setDecorations(decorationType, ranges);

          index += word.length;
        }
      // }
    });
  }
}

export function deactivateDynamicTextColor() {

  decorationsArray.forEach((decoration) => {
    decoration.dispose();
  });
  decorationsArray = [];
}
