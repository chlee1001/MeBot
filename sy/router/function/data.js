/* Local Storage Helper Class */
var Storage = Class.create({
  initialize: function(name, options) {
    this.options = Object.extend({
      clearable: true, // automatically clear data if an error occurred
      delay: 2000, // save data to localStorage after the allotted time
      maximum: 5 // the maximum size in megabytes
    }, options);

    if (typeof localStorage == "undefined" && typeof globalStorage != "undefined")
      window.localStorage = globalStorage[location.hostname];
      this.localStorage = window.localStorage;
    // undefined localStorage if it doesn't already exist
    if (!this.localStorage) this.localStorage = {
        getItem: function(name) {
          this.data = window.name ? window.name.evalJSON() : {};
          return $H(this.data[name] || (this.data[name] = {})).toJSON();
        }, setItem: function(name, data) {
          this.data[name] = data.evalJSON();
          window.name = $H(this.data).toJSON();
        }, removeItem: function(name) {
          delete this.data[name];
          window.name = $H(this.data).toJSON();
        }
      };

    this.name = name || 'unnamed';
    this.data = this.get();
  },
  // get item from localStorage
  get: function() {
    try {
      return (this.localStorage.getItem(this.name) || '{}').toString().evalJSON();
    } catch(e) {
      this.options.clearable && this.set({});
    }
  },
  // set item to localStorage
  set: function(data) {
    if (data) this.data = data;
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(function() {
      if (this.size(true) > this.options.maximum * 1048576) return;
      try {
        this.localStorage.setItem(this.name, $H(this.data).toJSON());
      } catch(e) {
        this.options.clearable && this.set({});
      }
    }.bind(this), this.options.delay)
  },
  // remove item
  remove: function(name) {
    this.localStorage.removeItem(name || this.name);
  },
  // remove all items
  clear: function() {
    if (!this.localStorage.length)
      window.name = '{}';
    else
      for (i = 0; i < this.localStorage.length; i++) this.remove(this.localStorage.key(i));
  },
  // size of localStorage
  size: function(bytes) {
    var data = $H(this.data).toJSON().length;
    return bytes ? data : data > 1024 ? (function() {
      data = (data / 1024).round().toString();
      var reg = /(^[+-]?\d+)(\d{3})/;
      while (reg.test(data)) data = data.replace(reg, '$1' + ',' + '$2');
      return data  + 'kb';
    })() : data + 'bytes';
  }
});

/* Usage */
var MyStorage = new Storage('MyStorage'); // Create the helper instance
var MyData = MyStorage.data; // Read data from localStorage(JSON Object)
MyData['firejune'] = { name: 'Junho, Kyung', age: 33 }; // Update a single data
MyStorage.set(MyData); // Write the data to localStorage
MyStorage.size(); // => '49bytes'