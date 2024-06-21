import {
    Diagnostic,
    DiagnosticSeverity,
} from 'vscode-languageserver/node';

import {
    TextDocument
} from 'vscode-languageserver-textdocument';
import { ExampleSettings } from '../server';

// メッセージのリスト
const randomMessages = [
    '簡潔にしろ',
    'ここほんとにいるか？',
    'もっとシンプルに書けるだろ',
    'ここいらん。消せ',
    '暇人乙',
    '無能で草',
    '才能ないよ。やめたら？',
    'まだやるの？無駄だよ？寝たら？',
    '全然ダメ',
    'どうせAIに書いてもらってんだろ？',
    'ちゃんと読んでる？おーい',
    'これで満足？',
    '成長しないね',
    'その程度？',
    '一生懸命のつもり？',
    'やり直せ',
    '酷い出来だな',
    'センスないわ',
    '無駄な努力だね',
    'これを人に見せるの？',
    '時間の無駄だったね',
    'やる気あるの？',
    'プロ意識ないね',
    'これで終わり？',
    '恥ずかしくないの？',
    '今すぐやめろ',
    '意味わからん',
    'どうしてこうなった？',
    '何度も同じミスするなよ',
    '君には無理だ',
    '努力が足りない',
    '諦めた方がいい',
    'これで満足なの？',
    '真面目にやってる？',
    '失望したよ',
    '本当に考えた？',
    'これしかできないの？',
    'ひどいな、これは',
    '何を考えているの？',
    'やり直し',
    '役立たず',
    '何も進歩してないね',
    'やめた方がいいよ',
    '何度も言わせるな',
    'それが限界？',
    '全然ダメだ',
    'やる価値ないよ',
    'このままじゃダメだ',
    'いつになったらまともになる？',
    'これじゃダメだ',
    '時間の無駄だ',
    '全く進歩しないね',
    'お疲れ様。もうやめていいよ',
    'どうしてこうなったのか',
    'これ以上は無理だろ',
    'やる気あるのか？',
    '全く期待はずれだ',
    '努力しているの？',
    'ひどすぎる',
    '恥ずかしくないのか？',
    'これを人に見せるのか？',
    '全く使えない',
    '君には無理だ',
    'もういい、やめろ',
    'お前のこと誰が好きなん？',
];

// 各行に対して選ばれたメッセージを保持するマップ
const messageMap = new Map<number, string>();

export async function charCountDiagnostics(textDocument: TextDocument, settings: ExampleSettings, hasDiagnosticRelatedInformationCapability: boolean): Promise<Diagnostic[]> {

    const text = textDocument.getText();
    const diagnostics: Diagnostic[] = [];
    const lines = text.split('\n'); // 改行ごとに分割

    for (let i = 0; i < lines.length; i++) {
        if (i === 0) continue; // 1行目はスキップ

        const line = lines[i];
        const start = textDocument.positionAt(text.indexOf(line));
        const end = textDocument.positionAt(text.indexOf(line) + line.length);

        // 各行に対して既にメッセージがある場合はそれを使う、ない場合は新しいメッセージを選ぶ
        let message: string;
        if (messageMap.has(i)) {
            message = messageMap.get(i)!;
        } else {
            message = randomMessages[Math.floor(Math.random() * randomMessages.length)];
            messageMap.set(i, message);
        }

        const diagnostic: Diagnostic = {
            severity: DiagnosticSeverity.Information,
            range: {
                start: start,
                end: end,
            },
            message: message,
            source: 'char-count-checker',
        };

        if (hasDiagnosticRelatedInformationCapability) {
            diagnostic.relatedInformation = [
                {
                    location: {
                        uri: textDocument.uri,
                        range: Object.assign({}, diagnostic.range),
                    },
                    message: '何見てんの？',
                },
            ];
        }
        diagnostics.push(diagnostic);
    }

    return diagnostics;
}
