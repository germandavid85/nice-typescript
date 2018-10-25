# TYPESCRIPT UGLY CODE

This repository contains some base examples of bad code in typescript and some documentation and walkthrough on how to to make better a bad code

## Guide

clone this repository in your machine, run `npm i` and follow up the next sections. To test any of the code, the `test.ts` file can be modified as need to do the execution.

## Do's and dont's

This is based on [this typescript docs](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

1. take a look at the docs in the link above
1. review the file `bad-code/bad-code.ts`
1. can you spot the things to be done better?
1. **fix** the code according to the do's and dont's documentation

<details><summary>Click here only to check the answer</summary>
<p>

```ts
interface Example {
  diff(one: string, two: string, three: boolean): number;
  diff(one: string, two: string): number;
  diff(one: string): number;
}

interface Size {
  length(b: string|Array<any>): number;
}

class BadCode {
  public palindrome(input: string): boolean {
    return input.split('').reverse().join('') === input;
  }

  public length(input: string): number {
    return input.length;
  }

  public exec(func: () => number): number {
    return func();
  }
}
```

</p>
</details>

## A linter FTW

A linter is a programming tool that can help us the review the code automatically based on some user defined rules. We''ll be using the rule from [tslint](https://palantir.github.io/tslint/rules/).

1. install `npm i --save-dev tslint`
1. take a look at the docs in the link above
1. review the tslint configuration file `tslint.config`
1. run `npm run lint`
1. can you **spot**  the errors found by the linter?
1. **fix** the code as pointed by tslint
1. add two new rules to `tslint.config` file:
    ```json
    "semicolon": true,
    "curly": true
    ```
1. repeat spot and fix steps

<details><summary>Click here only to check the answer</summary>
<p>

```ts
function getFullNameLength(name: string) {
  let nameCopy = name;
  if (nameCopy.length === 0){
    nameCopy = 'John'
  }

  const lastName = 'Doe';

  return `${nameCopy} + ${lastName}`.toUpperCase();
}
```

</p>
</details>

### More rules

keep digging on the list of rules and test them in the code to discover its usage

### Additional links

* [tslint project setup](https://spin.atomicobject.com/2017/06/05/tslint-linting-setup/)
* [tslint configuration](https://www.youtube.com/watch?v=syddCEdvAhI)

## More on Tslint

We can extend tslint rules from a pre existing and well tunned set of rules, in this case we'll be extending `air bnb` tslint rules

1. install `npm i --save-dev tslint-config-airbnb`
1. modify the file `tslint.json` to add:
    ```js
    "extends": [
      "tslint-config-airbnb"
    ]
    ```
1. run `npm run lint`, then **spot** and **fix** as needed

## Clean code

coming...
