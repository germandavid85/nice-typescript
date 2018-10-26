import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'liskov substitution check';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new LiskovSubstitutionRuleWalker(sourceFile, this.ruleName, new Set(this.ruleArguments.map(String))));
  }
}

class LiskovSubstitutionRuleWalker extends Lint.AbstractWalker<Set<string>> {
  public walk(sourceFile: ts.SourceFile) {
    if (sourceFile.fileName.endsWith('liskov.ts')){
      const cb = (node: ts.Node): void => {
          // Finds specific node types and do checking.
          if (node.kind === ts.SyntaxKind.Identifier) {
            this.checkMethodInCorrectClass('signIn', 'LoginPage', node);
            this.checkMethodInCorrectClass('deleteUser', 'UserPage', node);
            this.checkMethodInCorrectClass('updateUserData', 'UserPage', node);
            this.checkMethodInCorrectClass('searchCountry', 'LocationPage', node);
          }
          // Continue recursion: call function `cb` for all children of the current node.
          return ts.forEachChild(node, cb);
      };

      // Start recursion for all children of `sourceFile`.
      return ts.forEachChild(sourceFile, cb);
    }
  }

  private checkMethodInCorrectClass(methodName: string, className: string, node: ts.Node) {
    if (node.getText() === methodName && node.parent.kind == ts.SyntaxKind.MethodDeclaration) {
      const parentClassName = node.parent.parent.getChildAt(1).getText();
      if (parentClassName !== className) {
        this.addFailureAtNode(node, `${Rule.FAILURE_STRING}: ${methodName} method must be inside ${className} class`);
      }
    }
  }
}
