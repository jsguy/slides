# Framework comparison

- [Why not X?](#why-not-insert-favorite-framework-here)
- [Why use Mithril?](#why-use-mithril)
- [React](#react)
- [Angular](#angular)
- [Vue](#vue)

If you're reading this page, you probably have used other frameworks to build applications, and you want to know if Mithril would help you solve your problems more effectively.

---

## Why not [insert favorite framework here]?

The reality is that most modern frameworks are fast, well-suited to build complex applications, and highly maintainable if you know how to use them effectively. There are examples of highly complex applications in the wild using just about every popular framework: Udemy uses Angular, AirBnB uses React, Gitlab uses Vue, Guild Wars 2 uses Mithril (yes, inside the game!). Clearly, these are all production-quality frameworks.

As a rule of thumb, if your team is already heavily invested in another framework/library/stack, it makes more sense to stick with it, unless your team agrees that there's a very strong reason to justify a costly rewrite.

However, if you're starting something new, do consider giving Mithril a try, if nothing else, to see how much value Mithril adopters have been getting out of 8kb (gzipped) of code. Mithril is used by many well-known companies (e.g. Vimeo, Nike, Fitbit), and it powers large open-sourced platforms too (e.g. Lichess, Flarum). 

---

## Why use Mithril?

In one sentence: because **Mithril is pragmatic**. The 10 minutes [guide](introduction.md) is a good example: that's how long it takes to get working knowledge of Mithril's virtual DOM system, XHR and routing tools.

Mithril is all about getting work done efficiently. Doing file uploads? [The docs show you how](request.md#file-uploads). Authentication? [Documented too](route.md#authentication). Exit animations? [You got it](animation.md). No extra libraries, no magic.

---

## React

React is a view library maintained by Facebook.

React and Mithril share a lot of similarities. If you already learned React, you already know almost all you need to build apps with Mithril.

- They both use virtual DOM, lifecycle methods and key-based reconciliation
- They both organize views via components
- They both use Javascript as a flow control mechanism within views

The most obvious difference between React and Mithril is in their scope. React is a view library, so a typical React-based application relies on third-party libraries for routing, XHR and state management. Using a library oriented approach allows developers to customize their stack to precisely match their needs. The not-so-nice way of saying that is that React-based architectures can vary wildly from project to project, and that those projects are that much more likely to cross the 1MB size line.

Mithril has built-in modules for common necessities such as routing and XHR, and the [guide](simple-application.md) demonstrates idiomatic usage. This approach is preferable for teams that value consistency and ease of onboarding. 

### Performance

Both React and Mithril care strongly about rendering performance, but go about it in different ways. In the past React had two DOM rendering implementations (one using the DOM API, and one using `innerHTML`). Its upcoming fiber architecture introduces scheduling and prioritization of units of work. React also has a sophisticated build system that disables various checks and error messages for production deployments, and various browser-specific optimizations. In addition, there are also several performance-oriented libraries that leverage React's `shouldComponentUpdate` hook and immutable data structure libraries' fast object equality checking properties to reduce virtual DOM reconciliation times. Generally speaking, React's approach to performance is to engineer relatively complex solutions.

Mithril follows the less-is-more school of thought. It has a substantially smaller, aggressively optimized codebase. The rationale is that a small codebase is easier to audit and optimize, and ultimately results in less code being run.

Here's a comparison of library load times, i.e. the time it takes to parse and run the Javascript code for each framework, by adding a `console.time()` call on the first line and a `console.timeEnd()` call on the last of a script that is composed solely of framework code. For your reading convenience, here are best-of-20 results with logging code manually added to bundled scripts, running from the filesystem, in Chrome on a modest 2010 PC desktop:

React v15.4.1 | Mithril 1.0
------------- | -------
55.8 ms       | 4.5 ms

Library load times matter in applications that don't stay open for long periods of time (for example, anything in mobile) and cannot be improved via caching or other optimization techniques.

Since this is a micro-benchmark, you are encourage to replicate these tests yourself since hardware can heavily affect the numbers. Note that bundler frameworks like Webpack can move dependencies out before the timer calls to emulate static module resolution, so you should either copy the code from the compiled CDN files or open the output file from the bundler library, and manually add the high resolution timer calls `console.time` and `console.timeEnd` to the bundled script. Avoid using `new Date` and `performance.now`, as those mechanisms are not as statistically accurate.

For your reading convenience, here's a version of that benchmark adapted to use CDNs on the web: the [benchmark for React is here](https://jsfiddle.net/0ovkv64u/), and the [benchmark for Mithril is here](https://jsfiddle.net/o7hxooqL/). Note that we're benchmarking all of Mithril rather than benchmarking only the rendering module (which would be equivalent in scope to React). Also note that this CDN-driven setup incurs some overheads due to fetching resources from disk cache (~2ms per resource). Due to those reasons, the numbers here are not entirely accurate, but they should be sufficient to observe that Mithril's initialization speed is noticeably better than React.

Here's a slightly more meaningful benchmark: measuring the scripting time for creating 10,000 divs (and 10,000 text nodes). Again, here's the benchmark code for [React](https://jsfiddle.net/bfoeay4f/) and [Mithril](https://jsfiddle.net/fft0ht7n/). Their best results are shown below:

React v15.4.1 | Mithril 1.0
------------- | -------
99.7 ms       | 42.8 ms

What these numbers show is that not only does Mithril initializes significantly faster, it can process upwards of 20,000 virtual DOM nodes before React is ready to use.

##### Update performance

Update performance can be even more important than first-render performance, since updates can happen many times while a Single Page Application is running.

A useful tool to benchmark update performance is a tool developed by the Ember team called DbMonster. It updates a table as fast as it can and measures frames per second (FPS) and Javascript times (min, max and mean). The FPS count can be difficult to evaluate since it also includes browser repaint times and `setTimeout` clamping delay, so the most meaningful number to look at is the mean render time. You can compare a [React implementation](http://cdn.rawgit.com/lhorie/mithril.js/rewrite/examples/dbmonster/react/index.html) and a [Mithril implementation](http://cdn.rawgit.com/lhorie/mithril.js/rewrite/examples/dbmonster/mithril/index.html). Sample results are shown below:

React v15.4.1 | Mithril 1.0
------------- | -------
12.1 ms       | 6.4 ms

##### Development performance

Another thing to keep in mind is that because React adds extra checks and helpful error messages in development mode, it is slower in development than the production version used for the benchmarks above. To illustrate, [here's the 10,000 node benchmark from above using the development version of React](https://jsfiddle.net/r1jfckrd/).

### Complexity

Both React and Mithril have relatively small API surfaces compared to other frameworks, which help ease learning curve. However, whereas idiomatic Mithril can be written without loss of readability using plain ES5 and no other dependencies, idiomatic React relies heavily on complex tooling (e.g. Babel, JSX plugin, etc), and this level of complexity frequently extends to popular parts of its ecosystem, be it in the form of syntax extensions (e.g. non-standard object spread syntax in Redux), architectures (e.g. ones using immutable data libraries), or bells and whistles (e.g. hot module reloading).

### Learning curve

Both React and Mithril have relatively small learning curves. React's learning curve mostly involves understanding components and their lifecycle. The learning curve for Mithril components is nearly identical. There are obviously more APIs to learn in Mithril, since Mithril also includes routing and XHR, but the learning curve would be fairly similar to learning React, React Router and a XHR library like superagent or axios.

Idiomatic React requires working knowledge of JSX and its caveats, and therefore there's also a small learning curve related to Babel.

### Documentation

React documentation is clear and well written, and includes a good API reference, tutorials for getting started, as well as pages covering various advanced concepts. Unfortunately, since React is limited to being only a view library, its documentation does not explore how to use React idiomatically in the context of a real-life application. As a result, there are many popular state management libraries and thus architectures using React can differ drastically from company to company (or even between projects).

Mithril documentation also includes [introductory](introduction.md) [tutorials](simple-application.md), pages about advanced concepts, and an extensive API reference section, which includes input/output type information, examples for various common use cases and advice against misuse and anti-patterns. It also includes a cheatsheet for quick reference.

Mithril documentation also demonstrates simple, close-to-the-metal solutions to common use cases in real-life applications where it's appropriate to inform a developer that web standards may be now on par with larger established libraries.

---

## Angular

Angular is a web application framework maintained by Google.

Angular and Mithril are fairly different, but they share a few similarities:

- Both support componentization
- Both have an array of tools for various aspects of web applications (e.g. routing, XHR)

The most obvious difference between Angular and Mithril is in their complexity. This can be seen most easily in how views are implemented. Mithril views are plain Javascript, and flow control is done with Javascript built-in mechanisms such as ternary operators or `Array.prototype.map`. Angular, on the other hand, implements a directive system to extend HTML views so that it's possible to evaluate Javascript-like expressions within HTML attributes and interpolations. Angular actually ships with a parser and a compiler written in Javascript to achieve that. If that doesn't seem complex enough, there's actually two compilation modes (a default mode that generates Javascript functions dynamically for performance, and [a slower mode](https://docs.angularjs.org/api/ng/directive/ngCsp) for dealing with Content Security Policy restrictions).

### Performance

Angular has made a lot of progress in terms of performance over the years. Angular 1 used a mechanism known as dirty checking which tended to get slow due to the need to constantly diff large `$scope` structures. Angular 2 uses a template change detection mechanism that is much more performant. However, even despite Angular's improvements, Mithril is often faster than Angular, due to the ease of auditing that Mithril's small codebase size affords.

It's difficult to make a comparison of load times between Angular and Mithril for a couple of reasons. The first is that Angular 1 and 2 are in fact completely different codebases, and both versions are officially supported and maintained (and the vast majority of Angular codebases in the wild currently still use version 1). The second reason is that both Angular and Mithril are modular. In both cases, it's possible to remove a significant part of the framework that is not used in a given application.

With that being said, the smallest known Angular 2 bundle is a [29kb hello world](https://www.lucidchart.com/techblog/2016/09/26/improving-angular-2-load-times/) compressed w/ the Brotli algorithm (it's 35kb using standard gzip), and with most of Angular's useful functionality removed. By comparison, a Mithril hello world - including the entire Mithril core - would not be over 8kb gzipped (a more optimized bundle could easily be half of that).

Also, remember that frameworks like Angular and Mithril are designed for non-trivial application, so an application that managed to use all of Angular's API surface would need to download several hundred kb of framework code, rather than merely 29kb.

##### Update performance

A useful tool to benchmark update performance is a tool developed by the Ember team called DbMonster. It updates a table as fast as it can and measures frames per second (FPS) and Javascript times (min, max and mean). The FPS count can be difficult to evaluate since it also includes browser repaint times and `setTimeout` clamping delay, so the most meaningful number to look at is the mean render time. You can compare an [Angular implementation](http://cdn.rawgit.com/lhorie/mithril.js/rewrite/examples/dbmonster/angular/index.html) and a [Mithril implementation](http://cdn.rawgit.com/lhorie/mithril.js/rewrite/examples/dbmonster/mithril/index.html). Both implementations are naive (i.e. no optimizations). Sample results are shown below:

Angular | Mithril
------- | -------
11.5 ms | 6.4 ms

### Complexity

Angular is superior to Mithril in the amount of tools it offers (in the form of various directives and services), but it is also far more complex. Compare [Angular's API surface](https://angular.io/docs/ts/latest/api/) with [Mithril's](api.md). You can make your own judgment on which API is more self-descriptive and more relevant to your needs.

Angular 2 has a lot more concepts to understand: on the language level, Typescript is the recommended language, and on top of that there's also Angular-specific template syntax such as bindings, pipes, "safe navigator operator". You also need to learn about architectural concepts such as modules, components, services, directives, etc, and where it's appropriate to use what.

### Learning curve

If we compare apples to apples, Angular 2 and Mithril have similar learning curves: in both, components are a central aspect of architecture, and both have reasonable routing and XHR tools.

With that being said, Angular has a lot more concepts to learn than Mithril. It offers Angular-specific APIs for many things that often can be trivially implemented (e.g. pluralization is essentially a switch statement, "required" validation is simply an equality check, etc). Angular templates also have several layers of abstractions to emulate what Javascript does natively in Mithril - Angular's `ng-if`/`ngIf` is a *directive*, which uses a custom *parser* and *compiler* to evaluate an expression string and emulate lexical scoping... and so on. Mithril tends to be a lot more transparent, and therefore easier to reason about.

### Documentation

Angular 2 documentation provides an extensive introductory tutorial, and another tutorial that implements an application. It also has various guides for advanced concepts, a cheatsheet and a style guide. Unfortunately, at the moment, the API reference leaves much to be desired. Several APIs are either undocumented or provide no context for what the API might be used for.

Mithril documentation includes [introductory](introduction.md) [tutorials](simple-application.md), pages about advanced concepts, and an extensive API reference section, which includes input/output type information, examples for various common use cases and advice against misuse and anti-patterns. It also includes a cheatsheet for quick reference.

Mithril documentation also demonstrates simple, close-to-the-metal solutions to common use cases in real-life applications where it's appropriate to inform a developer that web standards may be now on par with larger established libraries.


---

## Vue

Vue is a view library similar to Angular.

Vue and Mithril have a lot of differences but they also share some similarities:

- They both use virtual DOM and lifecycle methods
- Both organize views via components

Vue also provides tools for routing and state management as separate modules. Vue looks very similar to Angular and provides a similar directive system, HTML-based templates and logic flow directives. It differs from Angular in that it implements a monkeypatching reactive system that overwrites native methods in a component's data (whereas Angular 1 uses dirty checking and digest/apply cycles to achieve similar results). Similar to Angular 2, Vue compiles HTML templates into functions, but the compiled functions look more like Mithril or React views, rather than Angular's compiled rendering functions.

Vue is significantly smaller than Angular when comparing apples to apples, but not as small as Mithril (Vue core is around 23kb gzipped, whereas the equivalent rendering module in Mithril is around 4kb gzipped). Both have similar performance characteristics, but benchmarks often suggest Mithril is slightly faster.

### Performance

Here's a comparison of library load times, i.e. the time it takes to parse and run the Javascript code for each framework, by adding a `console.time()` call on the first line and a `console.timeEnd()` call on the last of a script that is composed solely of framework code. For your reading convenience, here are best-of-20 results with logging code manually added to bundled scripts, running from the filesystem, in Chrome on a modest 2010 PC desktop:

Vue     | Mithril
------- | -------
21.8 ms | 4.5 ms

Library load times matter in applications that don't stay open for long periods of time (for example, anything in mobile) and cannot be improved via caching or other optimization techniques.

##### Update performance

A useful tool to benchmark update performance is a tool developed by the Ember team called DbMonster. It updates a table as fast as it can and measures frames per second (FPS) and Javascript times (min, max and mean). The FPS count can be difficult to evaluate since it also includes browser repaint times and `setTimeout` clamping delay, so the most meaningful number to look at is the mean render time. You can compare an [Angular implementation](http://cdn.rawgit.com/lhorie/mithril.js/rewrite/examples/dbmonster/vue/index.html) and a [Mithril implementation](http://cdn.rawgit.com/lhorie/mithril.js/rewrite/examples/dbmonster/mithril/index.html). Both implementations are naive (i.e. no optimizations). Sample results are shown below:

Vue    | Mithril
------ | -------
9.8 ms | 6.4 ms

### Complexity

Vue is heavily inspired by Angular and has many things that Angular does (e.g. directives, filters, `v-cloak`), but also has things inspired by React (e.g. components). As of Vue 2.0, it's also possible to write templates using hyperscript/JSX syntax (in addition to single-file components and the various webpack-based language transpilation plugins). Vue provides both bi-directional data binding and an optional Redux-like state management library, and unlike Angular, it provides no style guide. The many-ways-of-doing-one-thing approach can cause architectural fragmentation in long-lived projects.

Mithril has far less concepts and typically organizes applications in terms of components and a data layer. There are no different ways of defining components, and thus there's no need to install different sets of tools to make different flavors work.

### Documentation

Both Vue and Mithril have good documentation. Both include a good API reference with examples, tutorials for getting started, as well as pages covering various advanced concepts.

However, due to Vue's many-ways-to-do-one-thing approach, some things are not adequately documented. For example, there's no documentation on hyperscript syntax or usage.

Mithril documentation typically errs on the side of being overly thorough if a topic involves things outside of the scope of Mithril. For example, when a topic involves a 3rd party library, Mithril documentation walks through the installation process for the 3rd party library. Mithril documentation also often demonstrates simple, close-to-the-metal solutions to common use cases in real-life applications where it's appropriate to inform a developer that web standards may be now on par with larger established libraries.

Mithril's tutorials also cover a lot more ground than Vue's: the [Vue tutorial](https://vuejs.org/v2/guide/#Getting-Started) finishes with a static list of foodstuff. [Mithril's 10 minute guide](introduction.md) covers the majority of its API and goes over key aspects of real-life applications, such as fetching data from a server and routing (and there's a [longer, more thorough tutorial](simple-application.md) if that's not enough).
