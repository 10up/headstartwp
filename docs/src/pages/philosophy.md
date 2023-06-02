# Framework Principles

These are the guiding principles for 10up's Headless Framework.

## Solid Foundation

We aren't trying to reinvent the wheel nor do we want to spend a massive amount of resources building a new foundation for our framework. Therefore we decided to pick an existing and solid foundation to power 10up's Headless Framework: [Next.js](https://nextjs.org/).

Next.js is by far the most used Full-Stack React Framework and we believe using Next.js will give us a solid foundation for our framework and let us focus on what matters: solving headless WordPress sites.

## Reduce the complexity of building headless sites

The 10up headless framework aims at making creating headless sites as easy as creating traditional WordPress sites. We want to reduce the complexity that developers need to face when building headless WordPress sites from scratch.

We aim to let engineers focus on the important aspects of the site instead of spending time figuring out how to "wire up" the Next.js application with WordPress.

## Explore new possibilities

We want to boost creativity and let engineers explore new ways of building and scaling sites. From shipping component libraries for brand consistency and code reuse to building complex app-like experiences. From leveraging the power of serverless to hosting completely at the Edge. These are all things that can be explored when going headless.

## Low cost of maintenance

The 10up headless framework is a thin layer built on top of a solid foundation. It focuses on interacting with WordPress. At the end of the day, it's a Next.js application.

This means the maintenance cost is low as the lowest-level and most complex parts are provided by Next.js which is maintained by Vercel and have been driving a lot of innovations alongside partners like Google.

## Simple stack

We also aim at maintaining a simple stack. 

### REST API over WPGraphQL

The 10up's Headless Framework at the moment does not work with WPGraphQL.

GraphQL is great and when used on the right project adds tons of value in the long run. However, for most headless sites, there isn’t much value added by GraphQL. The additional complexity and engineering time required by adopting GraphQL/WPGraphQL isn’t worth the cost most of the time (caching, persisted queries, cache-bursting, etc).

Building a proper GraphQL implementation that leverages all of the GraphQL advantages isn’t that easy. Proper implementation of GraphQL would mean doing something similar to what [relay](https://relay.dev/) does and if you are not doing then you’re probably doing it wrong and losing most of its benefits.

We might add support for GraphQL in future releases but experience has shown us that GraphQL would be more suitable when building a middleware layer that's sitting in front of WordPress and that middleware is aggregating multiple sources of data, that use case however, is well beyond the scope of this framework.