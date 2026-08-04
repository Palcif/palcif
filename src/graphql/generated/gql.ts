/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query AboutPage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    aboutFields {\n      heroTagline: herotagline\n      heroHeading: heroheading\n      heroDescription: herodescription\n      storyBody: storybody\n      joinHeading: joinheading\n      joinDescription: joindescription\n    }\n  }\n}": typeof types.AboutPageDocument,
    "query Activities($language: LanguageCodeFilterEnum!) {\n  activities(\n    first: 20\n    where: {language: $language, orderby: {field: DATE, order: DESC}}\n  ) {\n    nodes {\n      id\n      title\n      slug\n      date\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n        }\n      }\n      activityFields {\n        category\n        summary\n      }\n    }\n  }\n}": typeof types.ActivitiesDocument,
    "query ActivityDetail($slug: ID!) {\n  activity(id: $slug, idType: SLUG) {\n    id\n    title\n    content\n    date\n    activityFields {\n      category\n      summary\n    }\n    translations {\n      language\n      slug\n    }\n  }\n}": typeof types.ActivityDetailDocument,
    "query BlogPost($slug: ID!) {\n  post(id: $slug, idType: SLUG) {\n    id\n    title\n    content\n    date\n    author {\n      node {\n        name\n      }\n    }\n    translations {\n      language\n      slug\n    }\n  }\n}": typeof types.BlogPostDocument,
    "query BlogPosts($language: LanguageCodeFilterEnum!) {\n  posts(\n    first: 20\n    where: {language: $language, orderby: {field: DATE, order: DESC}}\n  ) {\n    nodes {\n      id\n      title\n      excerpt\n      date\n      slug\n      author {\n        node {\n          name\n        }\n      }\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n        }\n      }\n    }\n  }\n}": typeof types.BlogPostsDocument,
    "query ContactPage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    contactFields {\n      contactIntro: contactintro\n    }\n  }\n}": typeof types.ContactPageDocument,
    "query EventDetail($slug: ID!) {\n  event(id: $slug, idType: SLUG) {\n    id\n    title\n    content\n    eventsFields {\n      eventdate\n      eventtime\n      location\n    }\n    translations {\n      language\n      slug\n    }\n  }\n}": typeof types.EventDetailDocument,
    "query Events($language: LanguageCodeFilterEnum!) {\n  events(first: 50, where: {language: $language}) {\n    nodes {\n      id\n      title\n      slug\n      content\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n        }\n      }\n      eventsFields {\n        eventdate\n        eventtime\n        location\n      }\n    }\n  }\n}": typeof types.EventsDocument,
    "query HighlightDetail($slug: ID!) {\n  highlights(id: $slug, idType: SLUG) {\n    id\n    title\n    featuredImage {\n      node {\n        sourceUrl\n        altText\n      }\n    }\n    highlightFields {\n      description\n      tag\n      linkUrl: linkurl\n    }\n    translations {\n      language\n      slug\n    }\n  }\n}": typeof types.HighlightDetailDocument,
    "query Highlights($language: LanguageCodeFilterEnum!) {\n  highlight(first: 12, where: {language: $language}) {\n    nodes {\n      id\n      slug\n      title\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n        }\n      }\n      highlightFields {\n        description\n        tag\n        linkUrl: linkurl\n      }\n    }\n  }\n}": typeof types.HighlightsDocument,
    "query HomePage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    homeFields {\n      heroTagline: herotagline\n      heroHeading: heroheading\n      heroDescription: herodescription\n    }\n  }\n}": typeof types.HomePageDocument,
    "query SiteSettings {\n  siteSettings {\n    siteSettingsFields {\n      orgName: orgname\n      address\n      email\n      socialFacebook: socialfacebook\n      socialInstagram: socialinstagram\n      socialWhatsapp: socialwhatsapp\n      footerTagline: footertagline\n      copyrightLine: copyrightline\n    }\n  }\n}": typeof types.SiteSettingsDocument,
};
const documents: Documents = {
    "query AboutPage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    aboutFields {\n      heroTagline: herotagline\n      heroHeading: heroheading\n      heroDescription: herodescription\n      storyBody: storybody\n      joinHeading: joinheading\n      joinDescription: joindescription\n    }\n  }\n}": types.AboutPageDocument,
    "query Activities($language: LanguageCodeFilterEnum!) {\n  activities(\n    first: 20\n    where: {language: $language, orderby: {field: DATE, order: DESC}}\n  ) {\n    nodes {\n      id\n      title\n      slug\n      date\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n        }\n      }\n      activityFields {\n        category\n        summary\n      }\n    }\n  }\n}": types.ActivitiesDocument,
    "query ActivityDetail($slug: ID!) {\n  activity(id: $slug, idType: SLUG) {\n    id\n    title\n    content\n    date\n    activityFields {\n      category\n      summary\n    }\n    translations {\n      language\n      slug\n    }\n  }\n}": types.ActivityDetailDocument,
    "query BlogPost($slug: ID!) {\n  post(id: $slug, idType: SLUG) {\n    id\n    title\n    content\n    date\n    author {\n      node {\n        name\n      }\n    }\n    translations {\n      language\n      slug\n    }\n  }\n}": types.BlogPostDocument,
    "query BlogPosts($language: LanguageCodeFilterEnum!) {\n  posts(\n    first: 20\n    where: {language: $language, orderby: {field: DATE, order: DESC}}\n  ) {\n    nodes {\n      id\n      title\n      excerpt\n      date\n      slug\n      author {\n        node {\n          name\n        }\n      }\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n        }\n      }\n    }\n  }\n}": types.BlogPostsDocument,
    "query ContactPage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    contactFields {\n      contactIntro: contactintro\n    }\n  }\n}": types.ContactPageDocument,
    "query EventDetail($slug: ID!) {\n  event(id: $slug, idType: SLUG) {\n    id\n    title\n    content\n    eventsFields {\n      eventdate\n      eventtime\n      location\n    }\n    translations {\n      language\n      slug\n    }\n  }\n}": types.EventDetailDocument,
    "query Events($language: LanguageCodeFilterEnum!) {\n  events(first: 50, where: {language: $language}) {\n    nodes {\n      id\n      title\n      slug\n      content\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n        }\n      }\n      eventsFields {\n        eventdate\n        eventtime\n        location\n      }\n    }\n  }\n}": types.EventsDocument,
    "query HighlightDetail($slug: ID!) {\n  highlights(id: $slug, idType: SLUG) {\n    id\n    title\n    featuredImage {\n      node {\n        sourceUrl\n        altText\n      }\n    }\n    highlightFields {\n      description\n      tag\n      linkUrl: linkurl\n    }\n    translations {\n      language\n      slug\n    }\n  }\n}": types.HighlightDetailDocument,
    "query Highlights($language: LanguageCodeFilterEnum!) {\n  highlight(first: 12, where: {language: $language}) {\n    nodes {\n      id\n      slug\n      title\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n        }\n      }\n      highlightFields {\n        description\n        tag\n        linkUrl: linkurl\n      }\n    }\n  }\n}": types.HighlightsDocument,
    "query HomePage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    homeFields {\n      heroTagline: herotagline\n      heroHeading: heroheading\n      heroDescription: herodescription\n    }\n  }\n}": types.HomePageDocument,
    "query SiteSettings {\n  siteSettings {\n    siteSettingsFields {\n      orgName: orgname\n      address\n      email\n      socialFacebook: socialfacebook\n      socialInstagram: socialinstagram\n      socialWhatsapp: socialwhatsapp\n      footerTagline: footertagline\n      copyrightLine: copyrightline\n    }\n  }\n}": types.SiteSettingsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AboutPage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    aboutFields {\n      heroTagline: herotagline\n      heroHeading: heroheading\n      heroDescription: herodescription\n      storyBody: storybody\n      joinHeading: joinheading\n      joinDescription: joindescription\n    }\n  }\n}"): (typeof documents)["query AboutPage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    aboutFields {\n      heroTagline: herotagline\n      heroHeading: heroheading\n      heroDescription: herodescription\n      storyBody: storybody\n      joinHeading: joinheading\n      joinDescription: joindescription\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Activities($language: LanguageCodeFilterEnum!) {\n  activities(\n    first: 20\n    where: {language: $language, orderby: {field: DATE, order: DESC}}\n  ) {\n    nodes {\n      id\n      title\n      slug\n      date\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n        }\n      }\n      activityFields {\n        category\n        summary\n      }\n    }\n  }\n}"): (typeof documents)["query Activities($language: LanguageCodeFilterEnum!) {\n  activities(\n    first: 20\n    where: {language: $language, orderby: {field: DATE, order: DESC}}\n  ) {\n    nodes {\n      id\n      title\n      slug\n      date\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n        }\n      }\n      activityFields {\n        category\n        summary\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ActivityDetail($slug: ID!) {\n  activity(id: $slug, idType: SLUG) {\n    id\n    title\n    content\n    date\n    activityFields {\n      category\n      summary\n    }\n    translations {\n      language\n      slug\n    }\n  }\n}"): (typeof documents)["query ActivityDetail($slug: ID!) {\n  activity(id: $slug, idType: SLUG) {\n    id\n    title\n    content\n    date\n    activityFields {\n      category\n      summary\n    }\n    translations {\n      language\n      slug\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query BlogPost($slug: ID!) {\n  post(id: $slug, idType: SLUG) {\n    id\n    title\n    content\n    date\n    author {\n      node {\n        name\n      }\n    }\n    translations {\n      language\n      slug\n    }\n  }\n}"): (typeof documents)["query BlogPost($slug: ID!) {\n  post(id: $slug, idType: SLUG) {\n    id\n    title\n    content\n    date\n    author {\n      node {\n        name\n      }\n    }\n    translations {\n      language\n      slug\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query BlogPosts($language: LanguageCodeFilterEnum!) {\n  posts(\n    first: 20\n    where: {language: $language, orderby: {field: DATE, order: DESC}}\n  ) {\n    nodes {\n      id\n      title\n      excerpt\n      date\n      slug\n      author {\n        node {\n          name\n        }\n      }\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query BlogPosts($language: LanguageCodeFilterEnum!) {\n  posts(\n    first: 20\n    where: {language: $language, orderby: {field: DATE, order: DESC}}\n  ) {\n    nodes {\n      id\n      title\n      excerpt\n      date\n      slug\n      author {\n        node {\n          name\n        }\n      }\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ContactPage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    contactFields {\n      contactIntro: contactintro\n    }\n  }\n}"): (typeof documents)["query ContactPage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    contactFields {\n      contactIntro: contactintro\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query EventDetail($slug: ID!) {\n  event(id: $slug, idType: SLUG) {\n    id\n    title\n    content\n    eventsFields {\n      eventdate\n      eventtime\n      location\n    }\n    translations {\n      language\n      slug\n    }\n  }\n}"): (typeof documents)["query EventDetail($slug: ID!) {\n  event(id: $slug, idType: SLUG) {\n    id\n    title\n    content\n    eventsFields {\n      eventdate\n      eventtime\n      location\n    }\n    translations {\n      language\n      slug\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Events($language: LanguageCodeFilterEnum!) {\n  events(first: 50, where: {language: $language}) {\n    nodes {\n      id\n      title\n      slug\n      content\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n        }\n      }\n      eventsFields {\n        eventdate\n        eventtime\n        location\n      }\n    }\n  }\n}"): (typeof documents)["query Events($language: LanguageCodeFilterEnum!) {\n  events(first: 50, where: {language: $language}) {\n    nodes {\n      id\n      title\n      slug\n      content\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n        }\n      }\n      eventsFields {\n        eventdate\n        eventtime\n        location\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query HighlightDetail($slug: ID!) {\n  highlights(id: $slug, idType: SLUG) {\n    id\n    title\n    featuredImage {\n      node {\n        sourceUrl\n        altText\n      }\n    }\n    highlightFields {\n      description\n      tag\n      linkUrl: linkurl\n    }\n    translations {\n      language\n      slug\n    }\n  }\n}"): (typeof documents)["query HighlightDetail($slug: ID!) {\n  highlights(id: $slug, idType: SLUG) {\n    id\n    title\n    featuredImage {\n      node {\n        sourceUrl\n        altText\n      }\n    }\n    highlightFields {\n      description\n      tag\n      linkUrl: linkurl\n    }\n    translations {\n      language\n      slug\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Highlights($language: LanguageCodeFilterEnum!) {\n  highlight(first: 12, where: {language: $language}) {\n    nodes {\n      id\n      slug\n      title\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n        }\n      }\n      highlightFields {\n        description\n        tag\n        linkUrl: linkurl\n      }\n    }\n  }\n}"): (typeof documents)["query Highlights($language: LanguageCodeFilterEnum!) {\n  highlight(first: 12, where: {language: $language}) {\n    nodes {\n      id\n      slug\n      title\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n        }\n      }\n      highlightFields {\n        description\n        tag\n        linkUrl: linkurl\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query HomePage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    homeFields {\n      heroTagline: herotagline\n      heroHeading: heroheading\n      heroDescription: herodescription\n    }\n  }\n}"): (typeof documents)["query HomePage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    homeFields {\n      heroTagline: herotagline\n      heroHeading: heroheading\n      heroDescription: herodescription\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SiteSettings {\n  siteSettings {\n    siteSettingsFields {\n      orgName: orgname\n      address\n      email\n      socialFacebook: socialfacebook\n      socialInstagram: socialinstagram\n      socialWhatsapp: socialwhatsapp\n      footerTagline: footertagline\n      copyrightLine: copyrightline\n    }\n  }\n}"): (typeof documents)["query SiteSettings {\n  siteSettings {\n    siteSettingsFields {\n      orgName: orgname\n      address\n      email\n      socialFacebook: socialfacebook\n      socialInstagram: socialinstagram\n      socialWhatsapp: socialwhatsapp\n      footerTagline: footertagline\n      copyrightLine: copyrightline\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;