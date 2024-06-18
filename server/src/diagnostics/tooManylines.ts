import {
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';
import { ExampleSettings } from '../server';

export async function tooManyLinesDiagnostics(textDocument: TextDocument, settings: ExampleSettings, hasDiagnosticRelatedInformationCapability: boolean): Promise<Diagnostic[]> {
	const text = textDocument.getText();
	const diagnostics: Diagnostic[] = [];
	const lines = text.split('\n');
	if (lines.length > 10) {
		const startIndex = lines.reduce((acc, line, i) =>  i > 10 ? acc : acc + line.length, 0);

		const diagnostic: Diagnostic = {
			severity: DiagnosticSeverity.Information,
			range: {
				start: textDocument.positionAt(startIndex),
				end: textDocument.positionAt(text.length)
			},
			message: 'なんでこんなに整理できていないコードを書くの？',
			source: 'too-many-lines'
		};
		if (hasDiagnosticRelatedInformationCapability) {
			diagnostic.relatedInformation = [
				{
					location: {
						uri: textDocument.uri,
						range: Object.assign({}, diagnostic.range)
					},
					message: '文字数多いよ'
				},
			];
		}
		diagnostics.push(diagnostic);
	}
	return diagnostics;
}