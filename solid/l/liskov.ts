class Options {
  async getText(): Promise<string> {
    return 'The text';
  }

  async click(): Promise<void> {
    'Click on the option';
  }
}

class Button extends Options {
  async getText(): Promise<string> {
    return 'The Button text';
  }

  async click(): Promise<void> {
    'Click on the Button';
  }
}

class Label extends Options {
  async getText(): Promise<string> {
    return 'The Label text';
  }

  async click(): Promise<void> {
    throw new Error('A Label is not clickable');
  }
}

class Walker {
  makeAllWak(){
    const options: Array<Options> = [new Button(), new Label()];

    // this will throw an error in RUNTIME when calling Label:click
    // and violates LSP
    options.forEach((bear) => bear.click());
  }
}