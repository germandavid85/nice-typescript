# TYPESCRIPT CLEAN CODE

This repository contains some base examples of bad code in typescript and some documentation and walkthrough on how to to make better a bad code

## Guide

clone this repository in your machine, run `npm i` and follow up the next sections. To test any of the code, the `test.ts` file can be modified as need to do the execution.

## Table of Contents

1. [Do's and dont's](#1.-dos-and-donts)
1. [A linter FTW](#2.-a-linter-ftw)
1. [Extending from a external set of rules](#3.-extending-from-a-external-set-of-rules)
1. [SOLID](#4.-solid)
    * [S: Single Responsibility](#s-single-responsibility)
    * [O: Open Closed](#o-open-closed)
    * [L: Liskov Substitution](#l-liskov-substitution)
    * [I: Interface Segregation](#i-interface-Segregation)
    * [D: Dependency Inversion](#d-dependency-inversion)

## Before Starting

### Required tools

Make sure to:

1. Have node installed in your machine (version 8 or superior is recommended)
1. Have git installed in your machine
1. Cloned this repository in your machine
1. run `npm i`
1. Have [created a repository](https://help.github.com/articles/creating-a-new-repository/) of your own in github with the cloned content as base

### Required Integrations

Make sure to:

1. [Enable](https://docs.travis-ci.com/user/tutorial/) `travis CI` in the github repository
1. [Enabled](https://travis-ci.com/account/repositories) the repository to run in `travis CI`

## 1. Do's and dont's

These are some basic initial rules about what should be and should not be done in typescript, taken from [these typescript docs](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

### General Types

Don’t ever use the types Number, String, Boolean, or Object. These types refer to non-primitive boxed objects that are almost never used appropriately in JavaScript code.

```ts
/* WRONG */
function reverse(s: String): String;
```

```ts
/* OK */
function reverse(s: string): string;
```

### Use union types

Don’t write overloads that differ by type in only one argument position:

```ts
/* WRONG */
interface Moment {
    utcOffset(): number;
    utcOffset(b: number): Moment;
    utcOffset(b: string): Moment;
}
```

```ts
/* OK */
interface Moment {
    utcOffset(): number;
    utcOffset(b: number|string): Moment;
}
```

### Return Types of Callbacks

Don’t use the return type any for callbacks whose value will be ignored:

```ts
/* WRONG */
function fn(x: () => any) {
    x();
}
```

```ts
/* OK */
function fn(x: () => void) {
    x();
}
```

* **CHALLENGE**

  1. take a look at the docs in the link above
  1. review the file `bad-code/bad-code.ts`
  1. can you spot the things to be done better?
  1. **fix** the code according to the do's and dont's documentation
  1. run `npm run lint:badcode` and make sure it doesn't throw any error
  1. create a pull request and make sure `travis ci` execution was successful

## 2. A linter FTW

A linter is a programming tool that can help us the review the code automatically based on some user defined rules. We have already used in the previous step, now we're goint a bit further and configure some rules. We''ll be using the rules from [tslint](https://palantir.github.io/tslint/rules/).

* **CHALLENGE**

  1. take a look at the docs in this [link](https://palantir.github.io/tslint/rules/) above
  1. review the tslint configuration file `tslint.config` in the root of the project and understand the rules according to the docs in the link above
  1. run `npm run lint`
  1. can you **spot**  the errors found by the linter?
  1. **fix** the code as pointed by tslint
  1. add two new rules to `tslint.config` file:
      ```json
      "semicolon": true,
      "curly": true
      ```
  1. run `npm run lint` again until no errors are showing up
  1. modify the `package.json` file by replacing `build` script with `"build": "npm run clean && tsc && npm run lint:badcode && npm run lint"`
  1. create a pull request and make sure `travis ci` execution was successful

### Additional links

* [tslint project setup](https://spin.atomicobject.com/2017/06/05/tslint-linting-setup/)
* [tslint configuration](https://www.youtube.com/watch?v=syddCEdvAhI)

## 3. Extending from a external set of rules

We can extend tslint rules from a pre existing and well tunned set of rules, in this case we'll be extending `air bnb` tslint rules

* **CHALLENGE**

  1. install `npm i --save-dev tslint-config-airbnb`
  1. modify the file `tslint.json` to add:
      ```js
      "extends": [
        "tslint-config-airbnb"
      ]
      ```
  1. run `npm run lint` until no errors are showing up
  1. create a pull request and make sure `travis ci` execution was successful

## 4. SOLID

S.O.L.I.D is an acronym for the first five object-oriented design(OOD) principles by Robert C. Martin, popularly known as Uncle Bob. This make the programmer's life easier by keeping the code well organized, maintainable and extensible

**NOTE:** this will use some custom tslint rules to validate that SOLID rules were correctly applied

### S: Single Responsibility

> A class should have one, and only one, reason to change. [link](https://drive.google.com/file/d/0ByOwmqah_nuGNHEtcU5OekdDMkk/view)

Let's see this example to review this principle, we can have for instance this `Bicycle` class:

```ts
class Bicycle {
  getName() {
    return "my bike name";
  }

  getModel() {
    return "awesome model";
  }

  clean() {
    return "shining the bike";
  }

  fixFlatTire() {
    return "inflating flat";
  }
}
```

We have here a class that is doing too much, let's say over time we want to add more methods like `getOwner` or `doPreventiveMaintenance` that will make it even more hard to maintain over time. Here is where the principle says to separate each function by responsibility, so a correct way to have the class above will be:

```ts
class Bicycle {
  getName() {
    return "my bike name";
  }

  getModel() {
    return "awesome model";
  }
}

class Workshop {
  fixFlatTire() {
    return "inflating flat";
  }
}

class Cleaner {
  clean() {
    return "shining the bike";
  }
}
```

* **CHALLENGE**

  1. take a look at `solid/s/single.ts`
  1. modify `single.ts` to have 3 classes `LoginPage`, `UserPage`, and `LocationPage` and make sure the methods they contain fulfill the single responsibility principle
  1. modify the `package.json` file by replacing `build` script with `"build": "npm run clean && tsc && npm run lint:badcode && npm run lint && npm run lint:single"`
  1. run `npm run build` until no errors are showing up
  1. create a pull request and make sure `travis ci` execution was successful

### O: Open Closed

> You should be able to extend a classes behavior, without modifying it. [link](https://drive.google.com/file/d/0BwhCYaYDn8EgN2M5MTkwM2EtNWFkZC00ZTI3LWFjZTUtNTFhZGZiYmUzODc1/view)

Let's see this class as example:

```ts
class Cellphone {
  ring(cellphoneNames: Array<string>): void {
    cellphoneNames.forEach((cellphoneName: string) => {
      if (cellphoneName === 'Nokia') {
        console.log('ring like Nokia');
      } else if (cellphoneName === 'IPhone'){
        console.log('ring like IPhone');
      } else if (cellphoneName === 'Samsung'){
        console.log('ring like Samsung');
      }
    });
  }
}
```

in the example above if you wan to keep adding more cellphones, then more `if / else` will be needed and `Cellphone` class will have to be modified each time, along with its unit tests. We can do this instead:

```ts
interface Soundable {
  ring(): void;
}

class Nokia implements Soundable {
  ring() {
    console.log('ring like Nokia');
  }
}

class IPhone implements Soundable {
  ring() {
    console.log('ring like IPhone');
  }
}

class Samsung implements Soundable {
  ring() {
    console.log('ring like Samsung');
  }
}

class Cellphone {
  ring(cellphone: Array<Soundable>): void {
    cellphoneNames.forEach((cellphoneName: string) => {
      cellphone.ring();
    });
  }
}
```

that way if a new cellphone is needed, then `Cellphone` class remains untouched and a new class has to be added.

* **CHALLENGE**

  1. take a look at `solid/o/open-closed.ts`
  1. modify `open-closed.ts` to follow open closed principle as described above, it should have an interface named `Navigable` that defines a method `goTo`, also it must implement the 3 classes to divide the navigations named `UserMenu`, `CityMenu` and `MapMenu`
  1. modify the `package.json` file by replacing `build` script with `"build": "npm run clean && tsc && npm run lint:badcode && npm run lint && npm run lint:single && npm run lint && npm run lint:open-closed"`
  1. run `npm run build` until no errors are showing up
  1. create a pull request and make sure `travis ci` execution was successful

### L: Liskov Substitution

> Derived classes must be substitutable for their base classes. [link](https://drive.google.com/file/d/0BwhCYaYDn8EgNzAzZjA5ZmItNjU3NS00MzQ5LTkwYjMtMDJhNDU5ZTM0MTlh/view)

This is saying that child should be able to modify the parent functionality without breaking anything. We should also consider a good use of inheritance, interfaces and composition. Let's see the example:

```ts
class Bear {
  walk(): string {
    return 'Bear is walking';
  }

  sit(): string {
    return 'Bear is sited';
  }
}

class GrizzlyBear extends Bear {
  walk(): string {
    return 'Walk like a Grizzly';
  }
}

class TeddyBear extends Bear {
  walk(): string {
    // violates LSP
    throw new Error('Teddy bear can`t walk');
  }
}

class Walker {
  makeAllWak(): void {
    const bears: Array<Bear> = [new GrizzlyBear(), new TeddyBear()];

    // this will throw an error in RUNTIME when calling TeddyBear:walk
    // and violates LSP
    bears.forEach((bear) => bear.walk());
  }
}
```

As seen in the example above, the `TeddyBear` implementation is violating LSP. So we'll need to think in a better design to avoid breaking parent functionality. A better way to do it is:

```ts
interface Walkable {
  walk(): string;
}

class Bear {
  walk(): string {
    return 'Bear is walking';
  }
}

class GrizzlyBear extends Bear implements Walkable {
  walk(): string {
    return 'Walk like a Grizzly';
  }
}

class TeddyBear extends Bear {
}

class Walker {
  makeAllWak(): void {
    // we are using Walkable here as type
    // this will generate an error in COMPILATION time that will prevent us to do wrong things
    // const bears: Array<Walkable> = [new GrizzlyBear(), new TeddyBear()];

    // the correct way
    const bears: Array<Walkable> = [new GrizzlyBear()];

    // this works fine
    bears.forEach((bear) => bear.walk);
  }
}
```

* **CHALLENGE**

  1. take a look at `solid/l/liskov.ts`
  1. modify `liskov.ts` to follow open Liskov Substitution principle as described above, it should have an interface named `Clickable` to be implemented by class `Button`
  1. figure out what is wrong with `getText` method, is OK to be overridden always by the child classes, what can the made to improve that part?
  1. modify the `package.json` file by replacing `build` script with `"build": "npm run clean && tsc && npm run lint:badcode && npm run lint && npm run lint:single && npm run lint && npm run lint:open-closed && npm run lint && npm run lint:liskov"`
  1. run `npm run build` until no errors are showing up
  1. create a pull request and make sure `travis ci` execution was successful

### I: Interface Segregation

> Make fine grained interfaces that are client specific. [link](https://drive.google.com/file/d/0BwhCYaYDn8EgOTViYjJhYzMtMzYxMC00MzFjLWJjMzYtOGJiMDc5N2JkYmJi/view)

It is quite common to find that an interface is in essence just a description of an entire class. The ISP states that we should write a series of smaller and more specific interfaces that are implemented by the class. Each interface provides an single behavior.

Let's see this example

```ts
interface Printer {
    copyDocument();
    printDocument(document: Document);
    stapleDocument(document: Document, tray: Number);
}


class SimplePrinter implements Printer {

    public copyDocument() {
        //...
    }

    public printDocument(document: Document) {
        //...
    }

    public stapleDocument(document: Document, tray: Number) {
        //...
    }

}
```

This code violates ISP, as `Printer` makes it impossible to implement a printer that can print and copy, but no staple. The following example shows an alternative approach  that groups methods into more specific interfaces. It describe a number of contracts that could be implemented individually by a simple printer or copier or by a super printer. 

```ts

interface Printer {
    printDocument(document: Document);
}


interface Stapler {
    stapleDocument(document: Document, tray: number);
}


interface Copier {
    copyDocument();
}

class SimplePrinter implements Printer {
    public printDocument(document: Document) {
        //...
    }
}


class SuperPrinter implements Printer, Stapler, Copier {
    public copyDocument() {
        //...
    }

    public printDocument(document: Document) {
        //...
    }

    public stapleDocument(document: Document, tray: number) {
        //...
    }
}
```


### D: Dependency Inversion

> Depend on abstractions, not on concretions. [link](https://drive.google.com/file/d/0BwhCYaYDn8EgMjdlMWIzNGUtZTQ0NC00ZjQ5LTkwYzQtZjRhMDRlNTQ3ZGMz/view)

Let's suppose that you need to login into any page and you have setted up google oauth login for your client
```ts
class Login { 
    login(googleLogin: any) { 
        // some code which will be used for google login.
    }
}
```
Now your client has changed and you need to start implementing other social login (FB login, user and password etc). This code won't work. So as per the principle, your high level class should not depend on low level class. Let's see the refactor.

```ts
interface ISocialLogin {
    login(options: any);
 }

class GoogleLogin implements ISocialLogin { 
    login(googleLogin: any) { 
        // some code which will be used for google login.
    }
}

class FBLogin implements ISocialLogin { 
    login(fbLogin: any) { 
        // some code which will be used for fb login.
    }
}
```
