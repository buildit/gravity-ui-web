There are many definitions of "design system" out there. For the most part though, there is a consensus that [design systems are living _products_](https://medium.com/eightshapes-llc/a-design-system-isn-t-a-project-it-s-a-product-serving-products-74dcfffef935) that support other product teams when creating user interfaces. As [Brad Frost](http://bradfrost.com/) eloquently puts it:

>A design system is the official story of how your organization designs and builds digital products.

At Wipro, and by extension [Buildit @ Wipro Digital](https://buildit.wiprodigital.com/), we share this high-level view. However, we find it is also helpful to expand on this definition and provide a little more detail as to what the key ingredients of design systems are. We therefore define a design system as consisting of: **Artefacts**, **Tools**, **Processes** and **People**:

## Artefacts
Artefacts are the things that a design system _provides_ to its consumers. This can encompass documentation, design files and assets, code, software libraries and more. These should be all the things that enable consuming teams to efficiently craft high quality user interfaces.

Common examples of design system artefacts are:

* **UI (design) kits**: Shared UI design templates, that UI designers can import into their tools to rapidly assemble UI mock-ups and click-through prototypes. [Sketch symbol libraries](https://www.sketch.com/docs/libraries/) are an example of a UI kits. Sometimes these are also referred to as "sticker sheets".
* **Design principles**: A set of core principles or guidelines to guide design choices. Examples include [SalesForce Lightning Design System's guidelines](https://www.lightningdesignsystem.com/guidelines/overview/), [IBM Carbon's guiding principles](https://www.carbondesignsystem.com/get-started/about-carbon#guiding-principles) and, of course, our very own [Gravity principles]({{ '/docs/about-gravity/principles' | path }}).
* **Visual assets**: Icons, illustrations, stock photos and other visual assets that can be embedded in UIs.
* **UI (software) libraries**: Software libraries containing fully functional implementations of UI components. Developers can use these to rapidly assemble their UIs (in much the same way as a designer can use a UI kit to assemble mock-ups in design tools).
* **Pattern libraries** (aka "component library"): A catalogue of available UI styles and components that contains visual demos and supporting documentation, such as how and when to use a particular component or how to implement it in code. Ideally, they are _living_ pattern libraries that show live demos of _real_ UI components (as opposed to static pictures of them) and are always up to date with the latest version of the corresponding UI library. You are looking at [Gravity's own living pattern library](/) _right now_.
* **Copywriting guidelines**: Guidance for copywriters. Typically these will cover both the _style or writing_, such as capitalisation, punctuation, spelling (e.g. British vs US English) as well as the _tone of voice_.

The above list is just a small taster. There are many more artefacts that a design system might provide.


## Tools
Artefacts don't come out of nowhere. Tools are required to create and maintain them, to distribute them to consumers and for consumers to make use of them. At a minimum, there will be the tools that a design system's maintainers use _within_ their system to create and run it. However, some design systems may also provide or support tools that their consumers use.

The kinds of tools used in and around a design system may include:

* **Pattern library generators**: Tools that take coded UI components, docs and metadata and generate a pattern library website (or app) to showcase them. Popular examples include [Pattern Lab](https://patternlab.io/), [Storybook](https://storybook.js.org/) and [Fractal](https://fractal.build/). This Gravity pattern library is generated using Fractal!
* **Task / backlog tracking tools**: Like any product, healthy design systems will have backlogs, kanban boards, stories, bugs, roadmaps etc. that need to be managed. Tools like [JIRA](https://www.atlassian.com/software/jira) or [Trello](https://trello.com/) help with this kind of work.
* **UI design & prototyping tools**: UI designers inside and outside of a design system will typically use tools like [Sketch](https://www.sketch.com/), [AdobeXD](https://www.adobe.com/uk/products/xd.html), [Figma](https://www.figma.com/) etc.
* **Visual design repositories**: Specialised tools exist for managing, distributing and versioning shared visual design assets and shared UI kits. Examples include [InVision DSM](https://www.invisionapp.com/design-system-manager), [Abstract](https://www.abstract.com/) & [Cactus](https://kactus.io/).
* **Software development tools**: The heart of most design systems will be one or more shared UI libraries. Like any software project, the developers creating and maintaining it will be using IDEs, build tools, CI/CD pipelines, automated testing, version control, etc. etc.
* **Design token converters**: Many design systems distill their core visual attributes into a set of platform-agnostic design tokens. From that central, "single source of truth" tools like [Theo](https://github.com/salesforce-ux/theo) and [StyleDictionary](https://amzn.github.io/style-dictionary/) can export the design tokens into a variety of formats for inclusion into software development and desgin tools.

...and many more. The exact set of tools and the integrations between them will vary widely from one design system to another.

It is not uncommon for design systems to create their own, bespoke tools. Usually these will be tools used internally by the design system's maintainers to automate menial tasks or integrate other tools with each other. However, in some cases, design system teams create tools for consumers to use as well.


## Processes
Every design system will have processes that govern how it operates. Examples include:

* **Contribution model**: Some design systems are very strict and mandate designs and guidelines for other teams to use. Others rely on contributions from consumers and focus on curating and sharing those. These are extremes of a spectrum and many variations exist inbetween.
* **Release and versioning process**: Are UI components and other artefacts versioned individually, or does the whole system versioned as a whole? What versioning conventon(s) does it follow - [Semantic Versioning](https://semver.org/), [Sentimental Versioning](http://sentimentalversioning.org/) or something else?
* **Communications**: What comms channels does the design system use to notify its consumers of new releases, upcoming changes, events, etc.? What is the comms strategy and frequency? What contact options exist for consumers to report bugs, request features, submit contributions, ask for help, etc. and who monitors them?
* **Metrics**: What metrics does the design system track? Feature turn-around times? Consumer satisfaction? Number of UI components? Number of products adopting the system? Are these tracked by automated tools or do they need to be manually gathered? How are they reported and to whom?
* **Quality**: Does the design system have targets or commitments regarding the quality of UI components? Do they need to meet certain accessibility, performance, compatibility or test coverage targets?

Agreed and well-defined processes are critical to the smooth operation of a design system. Like anything else, they may evolve and change over time... but even that is a _process_! ;-)


## People
Last, but certainly not least, are people. Many argue this is _the_ most important aspect of any design system. Without people to create, maintain and advocate the design system is ceases to exist. Without people making products that consume the desgin system, it is worthless.

Design systems can be thought of products and/or services in their own right. They continuously support other teams - similar to how HR or IT departments support others in the organisation. As such, they need to be _continuously_ maintained. Over time, design and technology trends change, so they system needs to adapt accordingly. Requirements from products teams will grow and change over time as they iterate existing prducts or create new ones. The level of investment a design system needs will vary depending on its size and complexity as well as that of the organisation it supports. However, every successful design system has _some_ degree of ongoing support behind it. Without it, they inevitably grow stale and fall out of use.

Equally, a design system is only useful when teams actually consume it to create UIs for their products. They are the design system's customers and, if they are unhappy, they will go elsewhere. Besides "just" consuming the artefacts, guidance and services the design system provides they also play a critical role by contributing back to the system in the form of bug reports, feature requests, feedback and sometimes even design or code contributions.
