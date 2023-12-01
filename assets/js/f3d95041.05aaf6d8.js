"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[5405],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>h});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),c=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(i.Provider,{value:t},e.children)},d="mdxType",_={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(r),u=a,h=d["".concat(i,".").concat(u)]||d[u]||_[u]||o;return r?n.createElement(h,l(l({ref:t},p),{},{components:r})):n.createElement(h,l({ref:t},p))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=u;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[d]="string"==typeof e?e:a,l[1]=s;for(var c=2;c<o;c++)l[c]=r[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},5364:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var n=r(7462),a=(r(7294),r(3905));const o={slug:"/wordpress-integration/gutenberg"},l="Gutenberg",s={unversionedId:"WordPress Integration/gutenberg",id:"WordPress Integration/gutenberg",title:"Gutenberg",description:"The HeadstartWP Plugin enhances every block with two special attributes directly in the markup: data-wp-block-name and data-wp-block. The first holds the name of the block and the second holds all of the block attributes.",source:"@site/documentation/06-WordPress Integration/gutenberg.md",sourceDirName:"06-WordPress Integration",slug:"/wordpress-integration/gutenberg",permalink:"/docs/learn/wordpress-integration/gutenberg",draft:!1,editUrl:"https://github.com/10up/headstartwp/tree/trunk/docs/documentation/06-WordPress Integration/gutenberg.md",tags:[],version:"current",lastUpdatedBy:"N\xedcholas Andr\xe9",lastUpdatedAt:1701451989,formattedLastUpdatedAt:"Dec 1, 2023",frontMatter:{slug:"/wordpress-integration/gutenberg"},sidebar:"tutorialSidebar",previous:{title:"Feeds",permalink:"/docs/learn/wordpress-integration/feeds"},next:{title:"Polylang Integration",permalink:"/docs/learn/wordpress-integration/polylang"}},i={},c=[{value:"Available Filters",id:"available-filters",level:2},{value:"tenup_headless_wp_render_block_attrs",id:"tenup_headless_wp_render_block_attrs",level:3},{value:"tenup_headless_wp_render_blocks_attrs_serialized",id:"tenup_headless_wp_render_blocks_attrs_serialized",level:3},{value:"tenup_headless_wp_render_block_use_tag_processor",id:"tenup_headless_wp_render_block_use_tag_processor",level:3},{value:"tenup_headless_wp_render_block_markup",id:"tenup_headless_wp_render_block_markup",level:3},{value:"tenup_headless_wp_render_html_tag_processor_block_markup",id:"tenup_headless_wp_render_html_tag_processor_block_markup",level:3}],p={toc:c};function d(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"gutenberg"},"Gutenberg"),(0,a.kt)("p",null,"The HeadstartWP Plugin enhances every block with two special attributes directly in the markup: ",(0,a.kt)("inlineCode",{parentName:"p"},"data-wp-block-name")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"data-wp-block"),". The first holds the name of the block and the second holds all of the block attributes."),(0,a.kt)("p",null,"These data attributes can be used for matching blocks in ",(0,a.kt)("inlineCode",{parentName:"p"},"BlocksRenderer")," and for accessing block's attributes directly in your React component."),(0,a.kt)("h2",{id:"available-filters"},"Available Filters"),(0,a.kt)("p",null,"There are a few filters available that you can hook into."),(0,a.kt)("h3",{id:"tenup_headless_wp_render_block_attrs"},"tenup_headless_wp_render_block_attrs"),(0,a.kt)("p",null,"This filter allows you to filter the block attributes before serializing them into the markup. You can use this to include additional attributes that you might need on the front-end. For instance, you can add information for a post instead of just a post id to prevent making an extra HTTP request to get the data for a post."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"/**\n * Filter's out the block's attributes before serializing in the block markup.\n *\n * @param array $attrs The Block's Attributes\n * @param array $block The Block's schema\n * @param \\WP_Block $block_instance The block's instance\n */\n$block_attrs = apply_filters( \n    'tenup_headless_wp_render_block_attrs', \n    $block_attrs, \n    $block, \n    $block_instance \n);\n")),(0,a.kt)("h3",{id:"tenup_headless_wp_render_blocks_attrs_serialized"},"tenup_headless_wp_render_blocks_attrs_serialized"),(0,a.kt)("p",null,"This filter is not as useful as the previous one but it allows you to filter the serialized attributes."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"/**\n * Filter's out the block's attributes after serialization\n *\n * @param string $encoded_attrs The serialized block's Attributes\n * @param array $attrs The Block's Attributes\n * @param array $block The Block's schema\n * @param \\WP_Block $block_instance The block's instance\n */\n$block_attrs_serialized = apply_filters(\n    'tenup_headless_wp_render_blocks_attrs_serialized',\n    esc_attr( wp_json_encode( $block_attrs ) ),\n    $block_attrs,\n    $block,\n    $block_instance\n);\n")),(0,a.kt)("h3",{id:"tenup_headless_wp_render_block_use_tag_processor"},"tenup_headless_wp_render_block_use_tag_processor"),(0,a.kt)("p",null,"HeadstartWP will use the DomDocument API for parsing and enhancing the block markup by default. Since 1.0.7, it is possible to opt into the new ",(0,a.kt)("inlineCode",{parentName:"p"},"WP_Html_Tag_Processor")," API via the ",(0,a.kt)("inlineCode",{parentName:"p"},"tenup_headless_wp_render_block_use_tag_processor"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"add_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );\n")),(0,a.kt)("p",null,"In the next major release, usage of the DomDocument API will be removed in favor of ",(0,a.kt)("inlineCode",{parentName:"p"},"WP_Html_Tag_Processor")," since it's easier to use and a core API. For most users this should not change anything, both APIs should yield the same result and the deprecation of the DomDocument API is merely for simplicity."),(0,a.kt)("h3",{id:"tenup_headless_wp_render_block_markup"},"tenup_headless_wp_render_block_markup"),(0,a.kt)("p",null,"This filter is called after adding the data attributes but before returning the block's final markup. You can use this filter to perform any additional modifications to the block markup."),(0,a.kt)("p",null,"This filter is only called when using the DomDocument API (i.e - the filter ",(0,a.kt)("inlineCode",{parentName:"p"},"tenup_headless_wp_render_block_use_tag_processor")," returns false)."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"/**\n * Filter the block's DOMElement before rendering\n *\n * @param \\DOMElement $root_node\n * @param string $html The original block markup\n * @param array $block The Block's schema\n * @param \\WP_Block $block_instance The block's instance\n */\n$root_node = apply_filters( \n    'tenup_headless_wp_render_block_markup', \n    $root_node, \n    $html, \n    $block, \n    $block_instance\n);\n")),(0,a.kt)("h3",{id:"tenup_headless_wp_render_html_tag_processor_block_markup"},"tenup_headless_wp_render_html_tag_processor_block_markup"),(0,a.kt)("p",null,"This filter is called after adding the data attributes but before returning the block's final markup when the ",(0,a.kt)("inlineCode",{parentName:"p"},"WP_HTML_Tag_Processor")," API is being used. You can use this filter to perform any additional modifications to the block markup."),(0,a.kt)("p",null,"This filter is only called when using the WP_HTML_Tag_Processor API (i.e - the filter ",(0,a.kt)("inlineCode",{parentName:"p"},"tenup_headless_wp_render_block_use_tag_processor")," returns true)."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"/**\n * Filter the block's before rendering\n *\n * @param \\WP_HTML_Tag_Processor $doc\n * @param string $html The original block markup\n * @param array $block The Block's schema\n * @param \\WP_Block $block_instance The block's instance\n */\n$doc = apply_filters( \n    'tenup_headless_wp_render_html_tag_processor_block_markup', \n    $doc, \n    $html, \n    $block, \n    $block_instance\n);\n")))}d.isMDXComponent=!0}}]);