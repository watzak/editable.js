var behavior = (function() {
  return {
    focus: function(element) {
      console.log('Default focus behavior');
    },

    blur: function(element) {
      console.log('Default blur behavior');
    },

    flow: function(element, action) {
      console.log('Default flow behavior');
    },

    selection: function(element, selection) {
      if (selection) {
        console.log('Default selection behavior');
      } else {
        console.log('Default selection empty behavior');
      }
    },

    cursor: function(element, cursor) {
      if (cursor) {
        console.log('Default cursor behavior');
      } else {
        console.log('Default cursor empty behavior');
      }
    },

    newline: function(element, cursor, selection) {
      console.log(cursor);
      console.log('Default newline behavior');
      if(selection) {
        cursor = selection.deleteContent();
      }

      if(cursor.isAtTheEnd()) {
        console.log('at the end');
      }
      else {
        console.log('not at the end');
      }

      /*var br = document.createElement('br');
      var trailingBr = document.createElement('br');
      trailingBr.setAttribute('type', '-editablejs');
      cursor.insertBefore(br);
      cursor.insertAfter(trailingBr);
      cursor.update();*/


      /*var range,
          sel = rangy.getSelection(),


      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.insertNode(br);
        range.setStartAfter(br);
        range.setEndAfter(br);
        sel.removeAllRanges();
        sel.addRange(range);
      }*/
    },

    insert: function(element, direction) {
      console.log('Default insert behavior');
    },

    split: function(element, before, after) {
      console.log('Default split behavior');
    },

    merge: function(element, direction) {
      console.log('Default merge behavior');
    },

    empty: function(element) {
      console.log('Default empty behavior');
    },

    'switch': function(element, direction) {
      console.log('Default switch behavior');
    },

    move: function(element, selection, direction) {
      console.log('Default move behavior');
    },

    clipboard: function(element, selection, action) {
      console.log('Default clipboard behavior');
    }
  };
})();
