class MenuSelector {
  selectOption(options: Array<string>) {
    options.forEach((option: string)  => {
      if (option === 'create user') {
        console.log('go to user option');
      } else if (option === 'create city') {
        console.log('go to city option');
      }  else if (option === 'create map') {
        console.log('go to map option');
      }
    });
  }
}
