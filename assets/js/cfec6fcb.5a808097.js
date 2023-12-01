"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[9953],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>g});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},p="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),p=c(n),u=o,g=p["".concat(s,".").concat(u)]||p[u]||h[u]||r;return n?a.createElement(g,i(i({ref:t},d),{},{components:n})):a.createElement(g,i({ref:t},d))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:o,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},3685:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>p,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var a=n(7462),o=(n(7294),n(3905));const r={sidebar_label:"Rendering Blocks in React Native",slug:"/gutenberg/rendering-blocks-in-react-native"},i="Rendering Blocks in React Native",l={unversionedId:"Gutenberg/rendering-blocks-in-react-native",id:"Gutenberg/rendering-blocks-in-react-native",title:"Rendering Blocks in React Native",description:"Introduction",source:"@site/documentation/05-Gutenberg/rendering-blocks-in-react-native.md",sourceDirName:"05-Gutenberg",slug:"/gutenberg/rendering-blocks-in-react-native",permalink:"/docs/learn/gutenberg/rendering-blocks-in-react-native",draft:!1,editUrl:"https://github.com/10up/headstartwp/tree/trunk/docs/documentation/05-Gutenberg/rendering-blocks-in-react-native.md",tags:[],version:"current",lastUpdatedBy:"N\xedcholas Andr\xe9",lastUpdatedAt:1701451989,formattedLastUpdatedAt:"Dec 1, 2023",frontMatter:{sidebar_label:"Rendering Blocks in React Native",slug:"/gutenberg/rendering-blocks-in-react-native"},sidebar:"tutorialSidebar",previous:{title:"Rendering Custom Blocks",permalink:"/docs/learn/gutenberg/rendering-custom-blocks"},next:{title:"Previews",permalink:"/docs/learn/wordpress-integration/previews"}},s={},c=[{value:"Introduction",id:"introduction",level:2},{value:"Blocks Rendering",id:"blocks-rendering",level:2},{value:"Paragraph Block",id:"paragraph-block",level:2},{value:"Heading Block",id:"heading-block",level:2},{value:"Image Block",id:"image-block",level:2},{value:"Result",id:"result",level:2}],d={toc:c};function p(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,a.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"rendering-blocks-in-react-native"},"Rendering Blocks in React Native"),(0,o.kt)("h2",{id:"introduction"},"Introduction"),(0,o.kt)("p",null,"The BlocksRenderer component can also be used to render Gutenberg blocks in React Native, by rendering blocks to native components without using a webview."),(0,o.kt)("p",null,"The examples in this section are part of a demo react native expo hosted on the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/nicholasio/headless-expo"},"headless-expo")," repo. This Demo app uses expo and the HeadstartWP to fetch a page and render Gutenberg blocks as react-native components."),(0,o.kt)("p",null,"All of the code for this demo app lives in ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/nicholasio/headless-expo/blob/trunk/App.js"},"App.js"),". Since the demo app is using the data-fetching hooks from the core package, we first need to wrap the App with the SettingsProvider component."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'export default function App() {\n  return (\n    <SettingsProvider>\n      <View style={styles.container}>\n        <StatusBar style="auto" />\n        <SinglePostComponent />\n      </View>\n    </SettingsProvider>\n  );\n}\n')),(0,o.kt)("p",null,"We also need to inject the headless config. For now, we need to use a workaround to inject the headless config."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import headlessConfig from "./headless.config";\n\nglobalThis.__10up__HEADLESS_CONFIG = { ...headlessConfig };\n')),(0,o.kt)("h2",{id:"blocks-rendering"},"Blocks Rendering"),(0,o.kt)("p",null,"The SinglePostComponent is the one that fetches a page and render its content"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'function SinglePostComponent() {\n  const { loading, data } = useFetchPost({\n    postType: "page",\n    slug: "react-native-test",\n  });\n\n  if (loading) {\n    return <Text>Loading...</Text>;\n  }\n\n  return (\n    <BlocksRenderer html={data.post.content.rendered}>\n      <ParagraphBlock component={RNParagraphBlock} />\n      <HeadingBlock component={RNHeadingBlock} />\n      <ImageBlock component={RNImageBlock} />\n      <RawText />\n      <EmptyBlock />\n    </BlocksRenderer>\n  );\n}\n')),(0,o.kt)("p",null,'useFetchPost is the core implementation of the usePost. The next.js hooks are built on top of the core data-fetching hooks. The core data-fetching hooks can be used in any react environment. In this example, we\u2019re fetching a page, with a slug called "react-native-test".'),(0,o.kt)("p",null,"This is all we need to have a React Native app that fetches data from a WP instance. The next step is building out the Block components."),(0,o.kt)("p",null,"We\u2019ll start with EmptyBlock and RawText. We need to be very careful when rendering blocks in React Native as we can\u2019t render any text under a React Native View component and remember that ",(0,o.kt)("strong",{parentName:"p"},"we\u2019re not rendering this under a webview, we are rendering blocks as native components.")),(0,o.kt)("p",null,"Since we can\u2019t render blocks that haven\u2019t been implemented by us yet, we\u2019ll create an allowed block list! We\u2019ll do that in the EmptyBlock component."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'/**\n * A noop block\n *\n * You can also use this to create a "allowList" of blocks and ignore blocks you don\'t want to render\n *\n * @returns\n */\nconst EmptyBlock = () => <></>;\n\nEmptyBlock.defaultProps = {\n  /**\n   * Essentially catches any empty text nodes to make sure they don\'t get rendered under a <View> component\n   *\n   * @param {*} node\n   * @returns\n   */\n  test: (node) => {\n    const allowedBlocks = ["core/paragraph", "core/heading", "core/image"];\n\n    // if this isn\'t an allowed block catch it\n    // if this is an allowed block it should have been handled at this ppint\n    if (\n      node.type !== "text" &&\n      !allowedBlocks.some((blockName) => isBlockByName(node, blockName))\n    ) {\n      return true;\n    }\n\n    return (\n      node.type === "text" &&\n      (node.parent === null || node.data?.trim().length === 0)\n    );\n  },\n};\n')),(0,o.kt)("p",null,"The goal of the EmptyBlock is to catch all non-allowed blocks and skip rendering them at all. Additionally, it also catches orphan text nodes that only contain whitespaces (this would catch things carriage returns, spacing around tags, etc\u2026)"),(0,o.kt)("p",null,"Note that we\u2019re using defaultProps to provide the test function. This has the same result of passing the test function as a prop directly."),(0,o.kt)("p",null,"The next step is implementing a RawText component."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'/**\n * Trims raw text nodes\n *\n * @param {*} param0\n * @returns\n */\nconst RawText = ({ domNode }) => {\n  return domNode.data.trim();\n};\n\nRawText.defaultProps = {\n  /**\n   * Catches any non-orphans and non-empty text fields\n   *\n   * @param {*} node\n   * @returns\n   */\n  test: (node) =>\n    node.type === "text" &&\n    node.parent !== null &&\n    node.data?.trim().length >= 0,\n};\n')),(0,o.kt)("p",null,'The goal here is to trim all text nodes. This is mostly to clean up text nodes. Therefore, we catch any non-orphans and non-empty text field nodes and replace them with a "trimmed" version.'),(0,o.kt)("p",null,"Now we have ensured that we don\u2019t have lingering text nodes and that valid text node does not contain additional whitespaces at the beginning and end."),(0,o.kt)("h2",{id:"paragraph-block"},"Paragraph Block"),(0,o.kt)("p",null,"Implementing the Paragraph block is pretty simple. All we need to do is use the React Native Text component"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { /* ... */, Text} from "react-native";\n\nconst RNParagraphBlock = ({ children }) => {\n  return <Text>{children}</Text>;\n};\n')),(0,o.kt)("p",null,'Note that this is essentially replacing the "p" tag with a native "Text" component. "children" in this context represent text nodes that are processed via the "RawText" block. If we didn\u2019t render children here, RawText block would never be executed for this paragraph. It\u2019s recursive logic!'),(0,o.kt)("h2",{id:"heading-block"},"Heading Block"),(0,o.kt)("p",null,'The heading block is very similar, we leverage the "level" prop that\u2019s automatically passed by the HeadingBlock component. We use it to create a dynamic class name that contains the style for the heading.'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { /* ... */, Text} from "react-native";\n\nconst RNHeadingBlock = ({ children, level }) => {\n  return <Text style={styles[`headingLevel${level}`]}>{children}</Text>;\n};\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    backgroundColor: "#fff",\n    alignItems: "center",\n    justifyContent: "center",\n  },\n  headingLevel1: {\n    fontWeight: "bold",\n    fontSize: "26px",\n  },\n  headingLevel2: {\n    fontWeight: "bold",\n    fontSize: "20px",\n  },\n});\n')),(0,o.kt)("h2",{id:"image-block"},"Image Block"),(0,o.kt)("p",null,'The last block we\u2019ll implement is the image block. It is a bit more complex but it first captures the image caption by looping through the DOM node children until it finds a "figcaption" Then it uses the "height", "width" and "src" props that are automatically passed by the ImageBlock component to render the image using the native "Image" component.'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { /* ... */, Image, Text} from "react-native";\n\nconst RNImageBlock = ({ domNode, height, width, src }) => {\n  const caption =\n    domNode.children.find((el) => el.name === "figcaption")?.firstChild?.data ??\n    "";\n  return (\n    <>\n      <Image\n        style={[{ width: width, height: height }]}\n        source={{\n          uri: src,\n        }}\n      />\n      <Text>{caption}</Text>\n    </>\n  );\n};\n')),(0,o.kt)("h2",{id:"result"},"Result"),(0,o.kt)("p",null,"The demo app should render something like this"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Blocks App",src:n(1264).Z,width:"495",height:"1024"})))}p.isMDXComponent=!0},1264:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/blocks-app-8e0dc4891e16eece268a8dd31d9b9564.png"}}]);