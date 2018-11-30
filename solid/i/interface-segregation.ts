interface Interactible {
  getText(): string;
  click(): void;
  writeInput(input: string): void;
}

class SubmitButton implements Interactible {
  getText(): string {
    // get the text
    return '';
  }

  click(): void {
    // click on the button
  }
  writeInput(input: string): void {
    // this is a button, should it write an input?
  }
}
