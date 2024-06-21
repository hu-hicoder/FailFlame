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
    '毛穴開いてんぞ',
    '無駄な努力だね',
    'これを人に見せるの？',
    '時間の無駄だったね',
    'やる気あるの？',
    'これで終わり？',
    '恥ずかしくないの？',
    '今すぐやめろ',
    '意味わからん',
    'どうしてこうなった？',
    '何度も同じミスするなよ',
    'お前には無理だ',
    '努力が足りない',
    '諦めた方がいい',
    '真面目にやってる？',
    '失望したよ',
    '本当に考えた？',
    'これしかできないの？',
    'ひどいな、これは',
    '何を考えているの？',
    '役立たず',
    '何も進歩してないね',
    'やめた方がいいよ',
    '何度も言わせるな',
    'それが限界？',
    'やる価値ないよ',
    'いつになったらまともになる？',
    '何？逆ギレ？',
    'お疲れ様。もうやめていいよ',
    'どうしてこうなったのか',
    'これ以上は無理だろ',
    'やる気あるのか？',
    '全く期待はずれだ',
    '努力しているの？',
    'カッコ悪…',
    'これを人に見せるのか？',
    '全く使えない',
    '君には無理だ',
    'もういい、やめろ',
    'お前のこと誰が好きなん？',
    '時間の無駄以外の何物でもない',
    '誰もお前のコードに興味ないよ',
    '期待するだけ無駄だね',
    '本当にプログラマー向いてないね',
    '誰が見てもひどい出来',
    'もっとマシなことに時間使えよ',
    'プログラミングやめたら？',
    'このコード見て誰が喜ぶの？',
    '才能ゼロだね',
    'どうせ誰も使わない',
    'これ以上悪くなることはないと思いたい',
    'この程度のこともできないの？',
    '誰かに頼んだ方がいいよ',
    '自分が恥ずかしくならない？',
    '他人の時間を無駄にするな',
    '諦めるのも大事なスキルだよ',
    'これがお前の限界か',
    '冗談だよね？',
    'プログラミングやる資格ないよ',
    'こんなコード見たことない',
    'もう酷くならないでほしい',
    'VSCodeがかわいそう',
    '見ててつらい',
    '君の成長がみられない',
    'ごめん。どこを褒めればいいの？',
    'もう一回勉強しなおせ',
    'どうしてこうなったか教えて',
    '君の能力では無理だ',
    '失望の一言',
    '何も得るものがないね',
    '学習しないんだね',
    '恥の上塗りだね',
    '厚顔無恥ってこういうことを言うんだね',
    '一生懸命の方向が間違ってる',
    'お前のために誰も手伝わない',
    'ひどすぎて笑えない',
    '時間返してほしい',
    '一生このレベルなの？',
    'これじゃ先が見えない',
    '今までなにやってきたの？',
    'お前が嫌いな奴にそっくりだな',
    'この拡張機能使ってる時点でセンスない',
    '「無能」ってお前のために生まれた言葉なんだな',
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
