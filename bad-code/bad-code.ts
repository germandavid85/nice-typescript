interface Example {
  diff(one: string): number;
  diff(one: string, two: string): number;
  diff(one: string, two: string, three: boolean): number;
}

interface Size {
  length(b: string): number;
  length(b: Array<any>): number;
}

class BadCode {
  public palindrome(input: String): Boolean {
    return input.split('').reverse().join('') === input;
  }

  public length(input: any): any {
    return input.length;
  }

  public exec(func: () => any): any {
    return func();
  }
}
