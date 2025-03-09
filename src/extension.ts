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

            if (position.character >= 2) { 
                const newText = line.substring(0, position.character - 2) +
                                line.charAt(position.character - 1) +
                                line.charAt(position.character - 2) +
                                line.substring(position.character);

                editor.edit(editBuilder => {
                    editBuilder.replace(new vscode.Range(
                        new vscode.Position(position.line, 0),
                        new vscode.Position(position.line, line.length)
                    ), newText);
                });
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}