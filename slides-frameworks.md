
# Discussion of the current top UI frameworks/libraries


* A library is a collection of functions and or objects that serves a particular purpose.
* A framework is a collection of patterns and libraries that help with building an application.

For our intents and purposes a library concentrates on just the view part of "MVC", and a framework provides more, such as a built in router .


Vue.js - library
React - library
Angular (2) - framework
Mithril - framework

## Links:

https://auth0.com/blog/more-benchmarks-virtual-dom-vs-angular-12-vs-mithril-js-vs-the-rest/
http://www.stefankrause.net/wp/?p=301
https://www.quora.com/Which-should-I-learn-Mithril-Vue-or-Angular
https://medium.com/tastejs-blog/yet-another-framework-syndrome-yafs-cf5f694ee070#.pmd9urwuz


https://en.wikipedia.org/wiki/Not_invented_here#In_computing

https://the-pastry-box-project.net/addy-osmani/2014-January-19


## Subjective evaluation methods

### Maintainable, Expressive, Performant

Scores out of ten - based on [public opinion](https://www.quora.com/Which-should-I-learn-Mithril-Vue-or-Angular), [research](http://todomvc.com/), and of course what I reckon.

|  			| Maintainable | Expressive | Performant |
|-----------|--------------|------------|------------|
| Vue.JS   	|    	8	   |   	8    |      8      |
| React   	|    	10	   |    6        |     8       |
| Angular 2 |        9      |     7      |      7     |
| Mithril   |        8      |      9      |      8      |


Maintainable winner: React - has the most testable best-practice code
Expressive: Mithril - you can write a complete app with a single framework
Performance: All frameworks have a virtual DOM engine, and perform roughly the same.



https://about.gitlab.com/2016/10/20/why-we-chose-vue/



### Business related considerations

When evaluating a framework or library, consider what the business needs - do you want to create a collection of customisable components that will be re-used in various flexible scenarios, or do you have a more narrow scope, such as web-only, and maybe just re-used in a few, more common scenarios.

#### Scope



Make sure you pick something that fits the level of expertise of the developers - are they expert Front-enders that like to swap libraries in and out, or are they more all-round full-stack developers that might prefer a more focused approach, such as a framework?

##### Focused VS Broad

Also consider how quickly you need to be able to develop bespoke solutions - this is particularly important when looking at [certain libraries](http://pixeljets.com/blog/why-we-chose-vuejs-over-react), as they tend to encourage the developer to break components down into relatively small parts, which can be quite time consuming, though more (forcibly) testable, and hence robust in the long run. Such strictness is great if there are many developers, and they have time allocated to write tests and build scripts. In a smaller team full-coverage unit tests are considered a luxury that there is often not enough resource/time to implement.


#### Overhead


Some of the more [popular libraries](https://www.npmjs.com/browse/keyword/jquery-plugin) have a very [large amount of components](https://github.com/brillout/awesome-react-components#ui-frameworks) available for use, which may be something to consider if your implementations include a broad range of use cases.

#### Component availability




## Objective evaluation methods


### Performance


vue-v2.1.10-keyed

run took 199.10999999999967
main.js:1 add took 228.7199999999998
main.js:1 clear took 60.25
main.js:1 runLots took 2004.2150000000001
main.js:1 update took 220.71000000000095
main.js:1 swapRows took 213.97000000000116


mithril-v1.0.0-alpha

run took 185.4000000000001
main.js:1 add took 236.82499999999982
main.js:1 clear took 60.12499999999909
main.js:1 runLots took 2072.6500000000005
main.js:1 update took 235.98999999999796
main.js:1 swapRows took 271.35999999999876

react-v15.4.2-keyed

run took 231.46000000000004
main.js:5 add took 217.6849999999995
main.js:5 clear took 83.86499999999887
main.js:5 runLots took 2096.13
main.js:5 update took 183.58500000000095
main.js:5 swapRows took 156.38000000000102

angular-v2.4.3-keyed

run took 275.5199999999968
main.aot.js:1300 add took 249.3149999999987
main.aot.js:1300 clear took 80.24999999999636
main.aot.js:1300 runLots took 2468.855000000003
main.aot.js:1300 update took 110.62000000000262
main.aot.js:1300 swapRows took 150.93999999999505


KO

run took 421.5699999999997
main.js:1 add took 450.1799999999994
main.js:1 clear took 158.90000000000055
main.js:1 runLots took 4187.91
main.js:1 update took 132.0649999999987
main.js:1 swapRows took 248.49500000000262

### Popularity

See how much a framework/library [is used](https://risingstars2016.js.org/#framework), so that you can gauge what the community thinks of it.

* Available UI components
* Backing (Company)
* Community help Available

### Integrations

You may need to integrate your new framework/library with existing sites, and each will have a unique set of integration points, it is worth looking at what your integration point needs are, and how they might be affected by your UI framework/library decisions. For example if you add in a framework/library that requires building each time something is changed, you inherently add to the development time - it might only be 10 - 15 seconds extra build, but that is more than enough for a developer to lose concentration.

### Level of control

With any UI framework or library you lose control of certain things such as:

* Compatibility with browsers
* Direct access to the DOM
* Good control over certain performance aspects
* Performance tuning options can be framework/library specific

### Overheads

Some of these technologies come with certain overheads that need to be considered, such as:

* The download size of the base framework or library, and what the means for your users
* Capabilities for optimisation without needing to "hack" the framework functionality
* Ways to extend the the framework, eg: is there good component support?

It is very worthwhile to examine these, as once you start using a particular framework or library it may well be difficult to discover overhead limitations.


## Practical considerations

When selecting a UI framework, and time comes to write a significant application, all theoretical and philosophical discussion aside, you are in one way or another limited by the following:

* The underlying framework or library, eg: React, Vue, jQuery, Knockout, Mithril, Angular, etc...
* The UI library that runs on top of the underlying framework or library, eg: material-ui (React), jQUery UI, Bootstrap (jQUery), Polythene (mithril), etc...

The selection of both of these will have a profound effects on how your development cycle looks, and also how your app is built and deployed - the more [well written components](https://github.com/callemall/material-ui) and [well tested UI support libraries](https://jqueryui.com/) you can find, the easier the development lifecycle is likely to be.

An important practical factor to consider is if your framework of choice will work with legacy components. Sometimes you can find adaptors, or [write your own adaptor](http://stackoverflow.com/questions/38836553/how-to-use-jquery-ui-with-react-js/38839508), which means you can mix and match well tested and existing components, instead of rewriting or using immature libraries when speed and ease of development is key (purists would argue you should never mix and match, however practically this is not always avoidable).


## Summing up

Before settling on a particular framework or library it is important that you consider and understand the aspects and repercussions of your choice - in this article we have touched on some of these aspects, without going into too much detail on any framework or library's particular issues or aspects; this was intentional, so as to not try and influence your choice in framework, but rather make sure you understand what you should be looking for when considering frameworks or libraries, so that you don't get any nasty surprises when it comes to using your newly chosen framework or library.

So, good luck, and be sure to consider all the relevant questions, most of all: library or framework?
