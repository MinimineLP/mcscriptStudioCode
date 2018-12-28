/**
 * @author Minimine <https://github.com/MinimineLP>
 *
 * @name Editor
 * @version 0.0.1
 * @since 0.0.1
 *
 * @copyright Copyright (c) 2018 by Minimine, all reights reserved
 * @license MIT
 *
 */

 /**
	* Start of the config
 	*/
 const editor_config = {
	 import_material_icons: false, // Import googles material icons from googleapis
   material_icons: "MaterialDesign-Webfont-master/css/materialdesignicons.css",
	 apply_style: false, // Should the stylesheet be added?
   language: {
     words: "words",
     word: "word",
     lines: "lines",
     line: "line",
     columns: "columns",
     column: "column",
   },
	 style:
	 `
	 `,
	 editorcontent:
	 `
	 <div class="MineEditor-menuebar">
		 <button class="MineEditor-button" data-attribute="undo" tooltip="undo"><i class="material-icons mdi mdi-arrow-left"></i></button>
		 <button class="MineEditor-button" data-attribute="redo" tooltip="redo"><i class="material-icons mdi mdi-arrow-right"></i></button>
		 <button class="MineEditor-button" data-attribute="paste" tooltip="paste text"><i class="material-icons mdi mdi-content-paste"></i></button>
		 <button class="MineEditor-button" data-attribute="copy" tooltip="copy selection"><i class="material-icons mdi mdi-content-copy"></i></button>
		 <button class="MineEditor-button" data-attribute="cut" tooltip="cut selection"><i class="material-icons mdi mdi-content-cut"></i></button>
		 <button class="MineEditor-button" data-attribute="bold" tooltip="fromat bold"><i class="mdi mdi-format-bold"></i></button>
		 <button class="MineEditor-button" data-attribute="italic" tooltip="fromat italic"><i class="mdi mdi-format-italic"></i></button>
		 <button class="MineEditor-button" data-attribute="underline" tooltip="fromat underline"><i class="mdi mdi-format-underline"></i></button>
		 <button class="MineEditor-button" data-attribute="strikeThrough" tooltip="fromat strikethrough"><i class="mdi mdi-format-strikethrough-variant"></i></button>
		 <button class="MineEditor-button" data-attribute="justifyleft" tooltip="justify left"><i class="mdi mdi-format-align-left"></i></button>
		 <button class="MineEditor-button" data-attribute="justifycenter" tooltip="justify center"><i class="mdi mdi-format-align-center"></i></button>
		 <button class="MineEditor-button" data-attribute="justifyright" tooltip="justify right"><i class="mdi mdi-format-align-right"></i></button>
		 <button class="MineEditor-button" data-attribute="justifyFull" tooltip="justify full"><i class="mdi mdi-format-align-justify"></i></button>
		 <button class="MineEditor-button" data-attribute="foreColor" tooltip="color text"><input type="color" hidden/><i class="mdi mdi-format-color-text"></i></button>
		 <button class="MineEditor-button" data-attribute="backColor" tooltip="color background"><input type="color" hidden/><i class="mdi mdi-format-color-fill"></i></button>
		 <button class="MineEditor-button" data-attribute="insertUnorderedList" tooltip="insert unordered list"><i class="mdi mdi-format-list-bulleted"></i></button>
		 <button class="MineEditor-button" data-attribute="insertOrderedList" tooltip="insert ordered list"><i class="mdi mdi-format-list-numbers"></i></button>
		 <button class="MineEditor-button" data-attribute="createLink" tooltip="create link"><i class="mdi mdi-link-variant"></i></button>
		 <button class="MineEditor-button" data-attribute="unlink" tooltip="remove link"><i class="mdi mdi-link-variant-off"></i></button>
		 <button class="MineEditor-button" data-attribute="insertImage" tooltip="insert image"><i class="mdi mdi-image"></i></button>
		 <button class="MineEditor-button" data-attribute="insertEmote" tooltip="insert emote"><i class="mdi mdi-emoticon"></i></button>
		 <button class="MineEditor-button" data-attribute="delete" tooltip="delete"><i class="mdi mdi-backspace"></i></button>
	 </div>
	 	<div class="MineEditor-canvas" contenteditable></div>
 	 	<div class="MineEditor-bottom">
      <p class="MineEditor-lines"></p>
      <p class="MineEditor-words"></p>
      <p class="MineEditor-columns"></p>
      <p class="MineEditor-credits">by <a href="https://github.com/MinimineLP/" target="_blank">Minimine</a></p>
    </div>
	 `,
 };

/**
 * End of the config
 */

 Element.prototype.remove = function() {
   this.parentElement.removeChild(this);
 }

	/*
	 * Functions
	 */
  // InsertAfter: insert a element after another element
  function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  // addCssCode: add css code
  function addStyle(code) {
    let style = document.createElement("style");
    style.innerHTML = code;
    document.head.appendChild(style);
  }

  // addCss: add a css file
  function addStylesheet(fileName) {

    // create <link> to import stylesheet
    let link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;

    document.head.appendChild(link);
  }

  // guid: returns a uuid
  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  // getFirstSubElementByClass
  function getFirstSubElementByClass(element, getclass) {
    for (let c of element.childNodes) {
      if (c.className == getclass) {
        return c;
      }
    }
  }

  // getEditorCanvas: get editor canvas from editor
  function getEditorCanvas(editor) {
    return getFirstSubElementByClass(editor,"MineEditor-canvas");
  }

  let toManageEditors = [];

  //@ts-ignore
  global.reloadEditors = function() {

    let elts = document.getElementsByClassName("MineEditor");

    //@ts-ignore
    for(let el of elts) {
      el.remove();
    }
    toManageEditors = [];

    // Get editors
  	let editors = document.getElementsByClassName("editor");

    //@ts-ignore
  	for(let i of editors) {
      let id = guid();
  		let editor = document.createElement("div");
  		editor.innerHTML = editor_config.editorcontent;
  		editor.classList.add('MineEditor');
      editor.id = id;
  		i.style.display = "none";
      i.setAttribute("editor", id);

      getEditorCanvas(editor).innerHTML = i.value;
      getEditorCanvas(editor).setAttribute("placeholder",i.placeholder);
      getEditorCanvas(editor).onkeyup = i.onkeyup;
      getEditorCanvas(editor).onkeydown = i.onkeydown;
      getEditorCanvas(editor).onkeypress = i.onkeypress;
      getEditorCanvas(editor).onclick = i.onclick;
      getEditorCanvas(editor).onmousedown = i.onmousedown;
      getEditorCanvas(editor).onmouseup = i.onmouseup;

      getEditorCanvas(editor).addEventListener("click", function() {
        let target = event.target;

        //@ts-ignore
        if(target.tagName.toLowerCase()=="a") {

          //@ts-ignore
          if(target.href) {

            //@ts-ignore
            if (event.ctrlKey) {
              //@ts-ignore
              window.open(target.href, '_blank').focus();
              event.preventDefault();
            }
          }
        }
      });
  		insertAfter(editor,i);

      toManageEditors.push({id: id, bef: i, LastTickContent: guid(), EditorLastTickContent: guid()});
  	}

    document.body.addEventListener("keydown", function(e) {
      if(e.ctrlKey)document.body.classList.add("ctrl_pressed");
      if(e.shiftKey)document.body.classList.add("shift_pressed");
      if(e.altKey)document.body.classList.add("alt_pressed");
    })

    document.body.addEventListener("keyup", function(e) {
      if(!e.ctrlKey)document.body.classList.remove("ctrl_pressed");
      if(!e.shiftKey)document.body.classList.remove("shift_pressed");
      if(!e.altKey)document.body.classList.remove("alt_pressed");
    })

  	if(editor_config.import_material_icons)addStylesheet(editor_config.material_icons);
  	if(editor_config.apply_style)addStyle(editor_config.style);

  	let editorButtons = document.getElementsByClassName('MineEditor-button');

  	let setAttribute = (element) => {
      let selection = window.getSelection();

      //@ts-ignore
      getSelection(getEditorCanvas(element.parentNode.parentNode))
  		let children = element.childNodes;

      if(element.dataset.attribute=="paste") {
        //@ts-ignore
        navigator.clipboard.readText().then(function(text) {
          document.execCommand("insertHTML", false, text)
        });
        return;
      }

      // Emotes
  		if(element.dataset.attribute=="insertEmote") {
  			window.open('https://emojipedia.org/','_blank');
  			return;
  		}

      // Link & image
  		if(element.dataset.attribute=="createLink"||element.dataset.attribute=="insertImage") {
  			let link = prompt("Please enter the Link here");
  			if(link != null)document.execCommand( element.dataset.attribute, false, link);
  			return;
  		}

      // Children (for the color selects)
  		for(let i=0;i<children.length;i++) {
  			let child = children[i];
  			if(child.tagName.toLowerCase()=="input" && child.getAttribute("type").toLowerCase()=="color") {
  				child.click();
  			}
  		}

      // Execute command
  		document.execCommand( element.dataset.attribute, false);
  	}

    // Apply Listeners to buttons
  	for(let i = 0; i<editorButtons.length;i++) {

      //@ts-ignore
  		let children:HTMLElement[] = editorButtons[i].childNodes;

  		for(let c=0;c<children.length;c++) {
  			let child:HTMLElement = children[c];

        // Manage inputs (for colors)
  			if(child.tagName.toLowerCase()=="input" && child.getAttribute("type").toLowerCase()=="color") {
  				child.addEventListener('change',function() {
            //@ts-ignore
  					let color = this.value;
  					let element = this.parentElement;
  					if(color != null)document.execCommand( element.dataset.attribute, true, color);
  				});
  			}
  		}
  		editorButtons[i].addEventListener('click',function(e) {
        //@ts-ignore
        if(event.target.tagName.toLowerCase()=="input")return;
        e.preventDefault();
  			setAttribute(this);
  		}, false);
  	}
  };

  //@ts-ignore
  global.reloadEditors();

  setInterval(function() {
    for(let i of toManageEditors) {
      let editor = document.getElementById(i.id);

      if(i.LastTickContent != i.bef.value) {
        getEditorCanvas(editor).innerHTML = i.bef.value;
      }
      else if(i.EditorLastTickContent != getEditorCanvas(editor).innerHTML){
        i.bef.value = getEditorCanvas(editor).innerHTML;
      }
      else continue;

      i.LastTickContent = i.bef.value;
      i.EditorLastTickContent = getEditorCanvas(editor).innerHTML;

      let lines = 0, words = 0, cols = 0, linesWord = editor_config.language.lines, wordsWord = editor_config.language.words, colsWord = editor_config.language.columns,
          linesContainer = getFirstSubElementByClass(getFirstSubElementByClass(editor, "MineEditor-bottom"),"MineEditor-lines"),
          wordsContainer = getFirstSubElementByClass(getFirstSubElementByClass(editor, "MineEditor-bottom"),"MineEditor-words"),
          colsContainer = getFirstSubElementByClass(getFirstSubElementByClass(editor, "MineEditor-bottom"),"MineEditor-columns");

      if(getEditorCanvas(editor).innerText.match(/\n/g))lines = getEditorCanvas(editor).innerText.match(/\n/g).length;
      if(getEditorCanvas(editor).innerText.match(/\S+/g))words = getEditorCanvas(editor).innerText.match(/\S+/g).length;
      cols = getEditorCanvas(editor).innerText.length;

      if(lines == 0)lines=1;

      if(lines==1)linesWord = editor_config.language.line;
      if(words==1)wordsWord = editor_config.language.word;
      if(cols==1)colsWord = editor_config.language.column;

      linesContainer.innerHTML = `${lines} ${linesWord}`;
      wordsContainer.innerHTML = `${words} ${wordsWord}`;
      colsContainer.innerHTML =  `${cols} ${colsWord}`;

    }
  },1);

  (function () {

    function getPosition( el ) {
      let _x = 0;
      let _y = 0;
      let positionInfo = el.getBoundingClientRect();
      let height = positionInfo.height;
      let width = positionInfo.width;
      while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
      }
      return { top: _y, left: _x, width: width, height: height };
    }

    function getAllElementsWithAttribute(attribute){
      let matchingElements = [];
      let allElements = document.getElementsByTagName('*');
      for (let i = 0, n = allElements.length; i < n; i++){
        if (allElements[i].getAttribute(attribute) !== null){
          // Element exists with attribute. Add to array.
          matchingElements.push(allElements[i]);
        }
      }
      return matchingElements;
    }

    let tooltip = document.createElement("div");
    tooltip.id="MineEditor_tooltip";
    tooltip.style.display = "none";
    document.body.appendChild(tooltip);

    getAllElementsWithAttribute("tooltip").forEach(function(el) {
      el.addEventListener("mouseenter", function (e) {
        if(this.getAttribute("tooltip")) {
          let position = getPosition(this);
          let tooltip = document.getElementById("MineEditor_tooltip");
          tooltip.innerHTML = this.getAttribute("tooltip");
          tooltip.style.top = (position.top + position.height + 3) + "px";
          tooltip.style.left = (position.left + (position.width/2)) + "px";
          tooltip.style.display = null;
        }
        el.addEventListener("mouseleave", function(e) {
        tooltip.style.display = "none";
        })
      });
    });
  }());
