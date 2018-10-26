import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'open closed check';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new OpenClosedWalker(sourceFile, this.ruleName, new Set(this.ruleArguments.map(String))));
  }
}

class OpenClosedWalker extends Lint.AbstractWalker<Set<string>> {
  public walk(sourceFile: ts.SourceFile) {
    if (sourceFile.fileName.endsWith('open-closed.ts')){
      const cb = (node: ts.Node): void => {
          // Finds specific node types and do checking.
          if (node.kind === ts.SyntaxKind.Identifier) {
            this.checkMethodInCorrectClass('goTo', ['UserMenu', 'CityMenu', 'MapMenu'], node);
            this.checkMethodInCorrectClass('selectOption', ['MenuSelector'], node);
          }
          // Continue recursion: call function `cb` for all children of the current node.
          return ts.forEachChild(node, cb);
      };

      // Start recursion for all children of `sourceFile`.
      return ts.forEachChild(sourceFile, cb);
    }
  }

  private checkMethodInCorrectClass(methodName: string, classNames: string[], node: ts.Node) {
    if (node.getText() === methodName && node.parent.kind == ts.SyntaxKind.MethodDeclaration) {
      const parentClassName = node.parent.parent.getChildAt(1).getText();
      // verify if method is inside one of the classes
      if (!classNames.some((className) => className === parentClassName)) {
        this.addFailureAtNode(node, `${Rule.FAILURE_STRING}: ${methodName} method must be inside ${classNames} class`);
      }
    }
  }
}
