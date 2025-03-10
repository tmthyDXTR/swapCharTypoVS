// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('swapCharTypo', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const position = editor.selection.active;
            const line = document.lineAt(position.line).text;

            // Find the last two non-whitespace characters
            let idx1 = -1, idx2 = -1;
            for (let i = line.length - 1; i >= 0; i--) {
                if (!/\s/.test(line[i])) {
                    if (idx1 === -1) {
                        idx1 = i;
                    } else {
                        idx2 = i;
                        break;
                    }
                }
            }

            // If there are fewer than two non-whitespace characters, do nothing
            if (idx1 === -1 || idx2 === -1) return;

            const newText = line.substring(0, idx2) +
                            line.charAt(idx1) +
                            line.substring(idx2 + 1, idx1) +
                            line.charAt(idx2) +
                            line.substring(idx1 + 1);

            editor.edit(editBuilder => {
                editBuilder.replace(new vscode.Range(
                    new vscode.Position(position.line, 0),
                    new vscode.Position(position.line, line.length)
                ), newText);
            });
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}