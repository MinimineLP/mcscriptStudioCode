document.write(`<!DOCTYPE html><html lang="en" dir="ltr"> <head> <meta charset="utf-8"> <link rel="icon" href="/images/icon.png"> <title>Editor test</title> <script>if (typeof module==='object'){window.module=module; module=undefined;}</script> <script type="text/javascript" src="/scripts/jquery-min.js"></script> <script type="text/javascript" src="/codemirror/lib/codemirror.js"></script><script type="text/javascript" src="/codemirror/addon/dialog/dialog.js"></script><script type="text/javascript" src="/codemirror/addon/search/searchcursor.js"></script><script type="text/javascript" src="/codemirror/addon/search/search.js"></script><script type="text/javascript" src="/codemirror/addon/scroll/annotatescrollbar.js"></script><script type="text/javascript" src="/codemirror/addon/search/matchesonscrollbar.js"></script><script type="text/javascript" src="/codemirror/addon/search/jump-to-line.js"></script><script type="text/javascript" src="/codemirror/addon/selection/active-line.js"></script><script type="text/javascript" src="/codemirror/addon/edit/matchbrackets.js"></script><script type="text/javascript" src="/codemirror/addon/display/fullscreen.js"></script><script type="text/javascript" src="/codemirror/addon/scroll/simplescrollbars.js"></script><script type="text/javascript" src="/codemirror/addon/edit/closetag.js"></script><script type="text/javascript" src="/codemirror/addon/fold/foldcode.js"></script><script type="text/javascript" src="/codemirror/addon/fold/foldgutter.js"></script><script type="text/javascript" src="/codemirror/addon/fold/brace-fold.js"></script><script type="text/javascript" src="/codemirror/addon/fold/xml-fold.js"></script><script type="text/javascript" src="/codemirror/addon/fold/indent-fold.js"></script><script type="text/javascript" src="/codemirror/addon/fold/markdown-fold.js"></script><script type="text/javascript" src="/codemirror/addon/fold/comment-fold.js"></script><script type="text/javascript" src="/codemirror/addon/selection/active-line.js"></script><script type="text/javascript" src="/codemirror/addon/mode/simple.js"></script><script type="text/javascript" src="/codemirror/addon/mode/overlay.js"></script> <script type="text/javascript" src="/codemirror/addon/hint/javascript-hint.js"></script> <script type="text/javascript" src="/codemirror/mode/javascript/javascript.js"></script><script type="text/javascript" src="/codemirror/mode/scheme/scheme.js"></script><link type="text/css" rel="stylesheet" href="/codemirror/lib/codemirror.css"><link type="text/css" rel="stylesheet" href="/codemirror/addon/hint/show-hint.css"><link type="text/css" rel="stylesheet" href="/codemirror/addon/dialog/dialog.css"><link type="text/css" rel="stylesheet" href="/codemirror/addon/search/matchesonscrollbar.css"><link type="text/css" rel="stylesheet" href="/codemirror/addon/display/fullscreen.css"><link type="text/css" rel="stylesheet" href="/codemirror/addon/scroll/simplescrollbars.css"><link type="text/css" rel="stylesheet" href="/codemirror/addon/fold/foldgutter.css"/> <script src="/codemirror/mode/xml/xml.js"></script> <script src="/codemirror/mode/markdown/markdown.js"></script> <script src="/codemirror/mode/gfm/gfm.js"></script> <script src="/codemirror/mode/javascript/javascript.js"></script> <script src="/codemirror/mode/css/css.js"></script> <script src="/codemirror/mode/htmlmixed/htmlmixed.js"></script> <script type="text/javascript" src="/scripts/api.js"></script> <script type="text/javascript" src="/scripts/prototypes.js"></script> <script type="text/javascript" src="/scripts/history.js"></script> <script type="text/javascript" src="/scripts/ajax.js"></script> <script type="text/javascript" src="/scripts/language-mcfunction.js"></script> <script type="text/javascript" src="/scripts/language-mcscript.js"></script> <script type="text/javascript" src="/scripts/explorer.js"></script> <script type="text/javascript" src="/scripts/editor.js"></script> <script type="text/javascript" src="/scripts/setupWindow.js"></script> <script type="text/javascript" src="/scripts/keys.js"></script> <link type="text/css" rel="stylesheet" href="/css/global.min.css"> <script>if (window.module) module=window.module;</script> </head> <body> <div id="bar-top"> <ul> <li>File</li><li>Edit</li><li>View</li><li>Settings</li></ul> </div><div id="explorer"> <h3>Project Explorer</h3> </div><div id="editorcontainer"> <div id="editorfiles"><div id="editorfilescontainer"></div></div><textarea id="editor" class="editor">execute as @s[scores={x=..1}] at @s run say hi black dark_blue dark_green dark_aqua dark_red dark_purple gold gray dark_gray blue green aqua red light_purple yellow white reset bold underline italic strikethrough obfuscated</textarea> </div></body></html>`);

/*
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>

    <meta charset="utf-8">
    <link rel="icon" href="/images/icon.png">
    <title>Editor test</title>

    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

    <!-- JQuery -->
    <script type="text/javascript" src="/scripts/jquery-min.js"></script>

    <!-- codemirror -->
		<script type="text/javascript" src="/codemirror/lib/codemirror.js"></script>

		<!--Addon-->
		<script type="text/javascript" src="/codemirror/addon/dialog/dialog.js"></script>
		<script type="text/javascript" src="/codemirror/addon/search/searchcursor.js"></script>
		<script type="text/javascript" src="/codemirror/addon/search/search.js"></script>
		<script type="text/javascript" src="/codemirror/addon/scroll/annotatescrollbar.js"></script>
		<script type="text/javascript" src="/codemirror/addon/search/matchesonscrollbar.js"></script>
		<script type="text/javascript" src="/codemirror/addon/search/jump-to-line.js"></script>
		<script type="text/javascript" src="/codemirror/addon/selection/active-line.js"></script>
		<script type="text/javascript" src="/codemirror/addon/edit/matchbrackets.js"></script>
		<script type="text/javascript" src="/codemirror/addon/display/fullscreen.js"></script>
		<script type="text/javascript" src="/codemirror/addon/scroll/simplescrollbars.js"></script>
		<script type="text/javascript" src="/codemirror/addon/edit/closetag.js"></script>
		<script type="text/javascript" src="/codemirror/addon/fold/foldcode.js"></script>
		<script type="text/javascript" src="/codemirror/addon/fold/foldgutter.js"></script>
		<script type="text/javascript" src="/codemirror/addon/fold/brace-fold.js"></script>
		<script type="text/javascript" src="/codemirror/addon/fold/xml-fold.js"></script>
		<script type="text/javascript" src="/codemirror/addon/fold/indent-fold.js"></script>
		<script type="text/javascript" src="/codemirror/addon/fold/markdown-fold.js"></script>
		<script type="text/javascript" src="/codemirror/addon/fold/comment-fold.js"></script>
		<script type="text/javascript" src="/codemirror/addon/selection/active-line.js"></script>
		<script type="text/javascript" src="/codemirror/addon/mode/simple.js"></script>
		<script type="text/javascript" src="/codemirror/addon/mode/overlay.js"></script>

		<!--Hint-->
    <script type="text/javascript" src="/codemirror/addon/hint/javascript-hint.js"></script>
    <script type="text/javascript" src="/codemirror/mode/javascript/javascript.js"></script>

		<!--Scheme-->
		<script type="text/javascript" src="/codemirror/mode/scheme/scheme.js"></script>

		<link type="text/css" rel="stylesheet" href="/codemirror/lib/codemirror.css">

		<!--Addon-->
		<link type="text/css" rel="stylesheet" href="/codemirror/addon/hint/show-hint.css">
		<link type="text/css" rel="stylesheet" href="/codemirror/addon/dialog/dialog.css">
		<link type="text/css" rel="stylesheet" href="/codemirror/addon/search/matchesonscrollbar.css">
		<link type="text/css" rel="stylesheet" href="/codemirror/addon/display/fullscreen.css">
		<link type="text/css" rel="stylesheet" href="/codemirror/addon/scroll/simplescrollbars.css">
		<link type="text/css" rel="stylesheet" href="/codemirror/addon/fold/foldgutter.css" />

    <!-- Modes -->
    <script src="/codemirror/mode/xml/xml.js"></script>
    <script src="/codemirror/mode/markdown/markdown.js"></script>
    <script src="/codemirror/mode/gfm/gfm.js"></script>
    <script src="/codemirror/mode/javascript/javascript.js"></script>
    <script src="/codemirror/mode/css/css.js"></script>
    <script src="/codemirror/mode/htmlmixed/htmlmixed.js"></script>

    <!-- Scripts -->
    <script type="text/javascript" src="/scripts/api.js"></script>
    <script type="text/javascript" src="/scripts/prototypes.js"></script>
    <script type="text/javascript" src="/scripts/history.js"></script>
    <script type="text/javascript" src="/scripts/ajax.js"></script>
    <script type="text/javascript" src="/scripts/language-mcfunction.js"></script>
    <script type="text/javascript" src="/scripts/language-mcscript.js"></script>
    <script type="text/javascript" src="/scripts/explorer.js"></script>
    <script type="text/javascript" src="/scripts/editor.js"></script>
    <script type="text/javascript" src="/scripts/setupWindow.js"></script>
    <script type="text/javascript" src="/scripts/keys.js"></script>


    <!-- Style -->
    <link type="text/css" rel="stylesheet" href="/css/global.min.css">

    <script>if (window.module) module = window.module;</script>

  </head>
  <body>
    <div id="bar-top">
      <ul>
        <li>File</li>
        <li>Edit</li>
        <li>View</li>
        <li>Settings</li>
      </ul>
    </div>
    <div id="explorer">
      <h3>Project Explorer</h3>
    </div>
    <div id="editorcontainer">
      <div id="editorfiles"><div id="editorfilescontainer"></div></div>
      <textarea id="editor" class="editor">execute as @s[scores={x=..1}] at @s run say hi black dark_blue dark_green dark_aqua dark_red dark_purple gold gray dark_gray blue green aqua red light_purple yellow white reset bold underline italic strikethrough obfuscated</textarea>
    </div>
  </body>
</html>
 */
