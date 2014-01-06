bbjshint
========

Run [JSHint](http://jshint.com/) on the javascript code in your frontmost (and saved) [BBEdit](http://barebones.com/products/bbedit/) document, and see the results in a Result Browser window.

Note that for now, the text document must be saved before `bbjshint` can check it.

install
-------

Use from BBEdit's Scripts menu by either installing or symlinking `bbjshint` to BBEdit's Scripts folder. Usually, this is `~/Library/Application Support/BBEdit/Scripts` or `~/Dropbox/Application Support/BBEdit/Scripts`. You can show this folder from BBEdit by going to the scripts menu and choosing "Open Scripts Folder".

    npm i -g bbjshint
    cd path/to/your/Application\ Support/BBEdit/Scripts
    ln -s `which bbjshint`

acknowledgements
----------------
See [bbresults](https://github.com/isao/bbresults).

license
-------
MIT
