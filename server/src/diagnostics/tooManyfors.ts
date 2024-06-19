import {
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';
import { ExampleSettings } from '../server';

export async function tooManyForLoopsDiagnostics(textDocument: TextDocument, settings: ExampleSettings, hasDiagnosticRelatedInformationCapability: boolean): Promise<Diagnostic[]> {
	const text = textDocument.getText();
	const diagnostics: Diagnostic[] = [];

	// 正規表現を使って `for` 文を見つける
	const forPattern = /\bfor\b/g;
	let match: RegExpExecArray | null;
	let forCount = 0;

	while ((match = forPattern.exec(text)) !== null) {
		forCount++;
	}

	// `for` 文が4つ以上の場合、診断を作成する
	if (forCount > 3) {
		// 最後のマッチ位置を再度取得するための正規表現検索
		let lastMatch: RegExpExecArray | null;
		while ((lastMatch = forPattern.exec(text)) !== null) {
			if (forCount === 4) {
				const diagnostic: Diagnostic = {
					severity: DiagnosticSeverity.Warning,
					range: {
						start: textDocument.positionAt(lastMatch.index),
						end: textDocument.positionAt(lastMatch.index + lastMatch[0].length)
					},
					message: `このコードには 'for' 文が ${forCount} 回使われています。使い過ぎです！`,
					source: 'too-many-for-loops'
				};
				if (hasDiagnosticRelatedInformationCapability) {
					diagnostic.relatedInformation = [
						{
							location: {
								uri: textDocument.uri,
								range: Object.assign({}, diagnostic.range)
							},
							message: 'ループを減らしてコードをシンプルにしましょう。'
						}
					];
				}
				diagnostics.push(diagnostic);
				break;
			}
			forCount--;
		}
	}
	return diagnostics;
}
