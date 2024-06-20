import * as vscode from 'vscode';

let activeDecoration: vscode.TextEditorDecorationType | undefined = undefined;

export function activateDynamicVerticalLines() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const decorations = createRandomDecorations(editor);
        editor.setDecorations(activeDecoration, decorations);

        vscode.workspace.onDidChangeTextDocument(event => {
            if (event.document === editor.document) {
                const newDecorations = createRandomDecorations(editor);
                editor.setDecorations(activeDecoration, newDecorations);
            }
        });
    }
}

function createRandomDecorations(editor: vscode.TextEditor): vscode.DecorationOptions[] {
    const decorations: vscode.DecorationOptions[] = [];
    const text = editor.document.getText();
	const len = text.length;
	const num_of_lines = len / 20;
    const lines = text.split('\n');
    const numLines = lines.length;

    if (!activeDecoration) {
        activeDecoration = vscode.window.createTextEditorDecorationType({
            before: {
                contentText: '',
                border: '1px solid orange',
                margin: '0 0 0 -1px', // Adjust margin to position the line correctly
            }
        });
    }

    // ランダムに10個の縦線を引く
    for (let i = 0; i < num_of_lines; i++) {
        const randomLine = Math.floor(Math.random() * numLines);
        const randomChar = Math.floor(Math.random() * (lines[randomLine].length + 1));
        const position = new vscode.Position(randomLine, randomChar);
        const range = new vscode.Range(position, position);
        decorations.push({ range });
    }

    return decorations;
}

export function deactivateDynamicVerticalLines() {
    if (activeDecoration) {
        activeDecoration.dispose();
        activeDecoration = undefined;
    }
}
