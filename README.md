# SimpleTab
Simple tab plugin with jQuery

<div style="border:1px solid #eee;">
<img src='https://github.com/wookchu/SimpleTab/blob/master/public/src/img/screenshot_1.png?raw=true' alt='default skin' /></div>

## Features
- A tab plug-in containing only the essential features :-)
- Enable to styling with custom CSS
- Access index with URL parameters
- Assignment of unused tab.
- Enable to link external.

## Data Attribute Settings
#### Import
```HTML
<!-- Stylesheet for Default Skin (Optional) -->
<link rel="stylesheet" href="paths/simpletab.min.css">

<!-- jQuery Libraries -->
<script src="paths/jquery-3.4.1.min.js"></script>
<script src="paths/simpletab.min.js"></script>
```
#### HTML
```HTML
<!-- Tab -->
<ul class="tab" data-tab-name="tabExample">
    <li><a href="#content1">TAB1</a></li>
    <li><a href="#content2">TAB2</a></li>
    <li><a href="#content3">TAB3</a></li>
    <li><a href="http://google.com" target="_blank">Link</a></li><!-- External link -->
</ul>

<!-- Content -->
<div id="content1">
    Content of TAB 1
</div>

<div id="content2">
    Content of TAB 2
</div>

<div id="content3">
    Content of TAB 3
</div>
```
- Tabs must be written with tag `<a>` and link with content's `id`.
- '`data-tab-name`' is name for parameter with index of tab to access. You can customize this name.
- Assign starting index and dimmed Index with library options not inline class in markup.

#### Access of tab index with URL parameters

> ../filename.html<span style="color:red;font-weight:600;">?tabExample=2</span>

- 'tabExample' is tab name linked with `data-tab-name` of tab object in markup.
- Indexs start with `0` base.
- In case of that there is multiple tabs, Separate parameters with '&' like this.

> ../filename.html<span style="color:#000;font-weight:600;">?tabName1=2<span style="color:red;">&</span>tabName2=1</span>

#### jQuery
##### Default Skin
```javascript
jQuery(document).ready(function($){
    $(".tab").simpleTab({
        defaultSkin: true  //default value: false
    });
});
```
##### Custom Skin
CSS can be written freely, Assign class name for current and unable tab in library options.
```javascript
jQuery(document).ready(function($){
    // set class of active tab & dimmed tab for styling custom skin
    $(".tab").simpleTab({
        onTabClass: 'selected',
        dimmedTabClass: 'dimmed'
    });
});
```

##### Callback
There is callback option running after tab changing.
```javascript
jQuery(document).ready(function($){
    $(".tab").simpleTab({
        afterChange:function($content, prevIdx, currentIdx){
            if(currentIdx == 2) alert("Welcome :) ID of this content is '" + $content.attr("id") + "'.");
            else alert("Tab is toggled.");
        }
    });
});
```

#### Options
|Option|Type|Default|Description|
|---|---|---|---|
|defaultSkin|boolean|false|Use default skin|
|onTabClass|string|'selected'|Class name on `<li>` tag of current tab. Setting for user css.|
|dimmedTabClass|string|'dimmed'|Class name on `<li>` tag of disabled tab. Setting for user css.|
|startIndex|int|0|Enable setting index of start. Start with 0 base.|
|dimmedIndexs|int or string|null|set tabs to be couldn't clicking. Enable multiple items with separator '`,`'. (ex) `dimmedIndexs: '0, 1, 2'` or `dimmedIndexs: 1`|
|fadeEffect|boolean|true|Enable/Disable fade effect.|
|fadeSpeed|int|400|Fade In/Out Speed.|
|afterChange|function($content, prevIndex, currentIndex)|null|Callback function after changing tab. You can use connected parameters.|

#### Sass Variables
|Variable|Type|Default|Description|
|---|---|---|---|
|$selected-class|string|'.selected'|Selected tab class|
|$dimmed-class|string|'.dimmed'|Dimmed tab class|
|$default-tab-bg-color|color|#f5f5f5|Color of default tab's background|
|$default-tab-text-color|color|#777777 |Color of default tab's text|
|$default-tab-border-color|color|#dddddd |Color of default tab's border|
|$selected-tab-bg-color|color|#ffffff |Color of selected tab's background|
|$selected-tab-text-color|color|#000000 |Color of selected tab's text|
|$selected-tab-border-color|color|#09c453 |Color of selected tab's border|
|$selected-tab-border-width|pixels|4px|Thickness of selected tab's top border|
|$selected-tab-shadow-opacity|float|0.1|Opacity of selected tab's shadow. Value must be 0 to 1.|
|$dimmed-tab-bg-color|color|#d5d5d5 |Color of dimmed tab's background|
|$tab-content-padding|pixels|30px|Padding in detail contents of tab.|

#### Browser support
SimpleTab Works on IE7+ in addition to other modern browsers such as Chrome, Firefox, and Safari.

#### License
Copyright (c) 2019 Wookju Choi
Licensed under the MIT license.
