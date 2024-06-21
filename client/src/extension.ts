/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';
import { activateDynamicVerticalLines, deactivateDynamicVerticalLines } from './non-chara-effect';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';
import { activateDynamicFontSize } from './fontSize';
import { activateDynamicTextColor, deactivateDynamicTextColor } from './TextColor';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	// The server is implemented in node
	const serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
		}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: 
		[
			{ "scheme": "file", "language": "abap" },
			{ "scheme": "file", "language": "bat" },
			{ "scheme": "file", "language": "bibtex" },
			{ "scheme": "file", "language": "clojure" },
			{ "scheme": "file", "language": "coffeescript" },
			{ "scheme": "file", "language": "c" },
			{ "scheme": "file", "language": "cpp" },
			{ "scheme": "file", "language": "csharp" },
			{ "scheme": "file", "language": "dockercompose" },
			{ "scheme": "file", "language": "css" },
			{ "scheme": "file", "language": "cuda-cpp" },
			{ "scheme": "file", "language": "d" },
			{ "scheme": "file", "language": "pascal" },
			{ "scheme": "file", "language": "diff" },
			{ "scheme": "file", "language": "dockerfile" },
			{ "scheme": "file", "language": "erlang" },
			{ "scheme": "file", "language": "fsharp" },
			{ "scheme": "file", "language": "git-commit" },
			{ "scheme": "file", "language": "git-rebase" },
			{ "scheme": "file", "language": "go" },
			{ "scheme": "file", "language": "groovy" },
			{ "scheme": "file", "language": "handlebars" },
			{ "scheme": "file", "language": "haml" },
			{ "scheme": "file", "language": "haskell" },
			{ "scheme": "file", "language": "html" },
			{ "scheme": "file", "language": "ini" },
			{ "scheme": "file", "language": "java" },
			{ "scheme": "file", "language": "javascript" },
			{ "scheme": "file", "language": "javascriptreact" },
			{ "scheme": "file", "language": "json" },
			{ "scheme": "file", "language": "jsonc" },
			{ "scheme": "file", "language": "julia" },
			{ "scheme": "file", "language": "latex" },
			{ "scheme": "file", "language": "less" },
			{ "scheme": "file", "language": "lua" },
			{ "scheme": "file", "language": "makefile" },
			{ "scheme": "file", "language": "markdown" },
			{ "scheme": "file", "language": "objective-c" },
			{ "scheme": "file", "language": "objective-cpp" },
			{ "scheme": "file", "language": "ocaml" },
			{ "scheme": "file", "language": "perl" },
			{ "scheme": "file", "language": "perl6" },
			{ "scheme": "file", "language": "php" },
			{ "scheme": "file", "language": "plaintext" },
			{ "scheme": "file", "language": "powershell" },
			{ "scheme": "file", "language": "jade" },
			{ "scheme": "file", "language": "pug" },
			{ "scheme": "file", "language": "python" },
			{ "scheme": "file", "language": "r" },
			{ "scheme": "file", "language": "razor" },
			{ "scheme": "file", "language": "ruby" },
			{ "scheme": "file", "language": "rust" },
			{ "scheme": "file", "language": "scss" },
			{ "scheme": "file", "language": "sass" },
			{ "scheme": "file", "language": "shaderlab" },
			{ "scheme": "file", "language": "shellscript" },
			{ "scheme": "file", "language": "slim" },
			{ "scheme": "file", "language": "sql" },
			{ "scheme": "file", "language": "stylus" },
			{ "scheme": "file", "language": "svelte" },
			{ "scheme": "file", "language": "swift" },
			{ "scheme": "file", "language": "typescript" },
			{ "scheme": "file", "language": "typescriptreact" },
			{ "scheme": "file", "language": "tex" },
			{ "scheme": "file", "language": "vb" },
			{ "scheme": "file", "language": "vue" },
			{ "scheme": "file", "language": "vue-html" },
			{ "scheme": "file", "language": "xml" },
			{ "scheme": "file", "language": "xsl" },
			{ "scheme": "file", "language": "yaml" }
		],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'languageServerExample',
		'Language Server Example',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();

	activateDynamicVerticalLines();
	activateDynamicFontSize();
	activateDynamicTextColor();
}

export function deactivate(): Thenable<void> | undefined {
	
	deactivateDynamicVerticalLines();
	deactivateDynamicTextColor();

	if (!client) {
		return undefined;
	}
	return client.stop();
}
