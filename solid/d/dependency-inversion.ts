class HamburgerMenu {
  state: string;

  close(): void {
    // closes the menu
    this.state = 'closed';
  }

  open(): void {
    // opens the menu
    this.state = 'opened';
  }
}

class AccordionMenu {
  state: string;

  close(): void {
    // closes the menu
    this.state = 'closed';
  }

  open(): void {
    // opens the menu
    this.state = 'opened';
  }
}

class HamburgerMenuInteractor {
  constructor(private hamburgerMenu: HamburgerMenu) {}

  click(): void {
    if (this.hamburgerMenu.state === 'opened') {
      this.hamburgerMenu.close();
    } else if (this.hamburgerMenu.state === 'closed') {
      this.hamburgerMenu.open();
    }
  }
}

class AccordionMenuInteractor {
  constructor(private accordionMenu: AccordionMenu) {}

  click(): void {
    if (this.accordionMenu.state === 'opened') {
      this.accordionMenu.close();
    } else if (this.accordionMenu.state === 'closed') {
      this.accordionMenu.open();
    }
  }
}