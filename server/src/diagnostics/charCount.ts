import {
    Diagnostic,
    DiagnosticSeverity,
} from 'vscode-languageserver/node';

import {
    TextDocument
} from 'vscode-languageserver-textdocument';
import { ExampleSettings } from '../server';

const randomMessages = [
    'もう少し簡潔にしましょう。',
    'この部分を改善できますか？',
    'もっとシンプルに書けるかもしれません。',
    '冗長な部分を減らしてください。',
    '文章を短くしましょう。',
];

export async function charCountDiagnostics(textDocument: TextDocument, settings: ExampleSettings, hasDiagnosticRelatedInformationCapability: boolean): Promise<Diagnostic[]> {
    console.log('charCountDiagnostics called'); // デバッグログ

    const text = textDocument.getText();
    console.log(`Text length: ${text.length}`); // デバッグログ
    const diagnostics: Diagnostic[] = [];

    const threshold = 10; // 10文字ごとに診断を作成
    let offset = 0;

    while (offset < text.length) {
        console.log(`Creating diagnostic at offset: ${offset}`); // デバッグログ
        const start = textDocument.positionAt(offset);
        const end = textDocument.positionAt(Math.min(offset + threshold, text.length));

        const diagnostic: Diagnostic = {
            severity: DiagnosticSeverity.Information,
            range: {
                start: start,
                end: end,
            },
            message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
            source: 'char-count-checker',
        };
        if (hasDiagnosticRelatedInformationCapability) {
            diagnostic.relatedInformation = [
                {
                    location: {
                        uri: textDocument.uri,
                        range: Object.assign({}, diagnostic.range),
                    },
                    message: '文章が長すぎます。',
                },
            ];
        }
        diagnostics.push(diagnostic);

        offset += threshold;
    }

    console.log(`Total diagnostics: ${diagnostics.length}`); // デバッグログ
    return diagnostics;
}
