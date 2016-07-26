bbjshint
========

Run [JSHint](http://jshint.com/) on the javascript code in your frontmost (and saved) [BBEdit](http://barebones.com/products/bbedit/) document, and see the results in a Result Browser window.

Note that for now, the text document must be saved before `bbjshint` can check it.

install
-------

Use from BBEdit's Scripts menu by either installing or symlinking `bbjshint` to BBEdit's Scripts folder. This is `~/Library/Application Support/BBEdit/Scripts` or perhaps `~/Dropbox/Application Support/BBEdit/Scripts`. You can show this folder from BBEdit by going to the scripts menu and choosing "Open Scripts Folder".

    npm install --global bbjshint (or, sudo npm install --global bbjshint)
    cd ~/Library/Application\ Support/BBEdit/Scripts/
    ln -s `which bbjshint`

config
------

`bbjshint` will use the first `.jshintrc` file it finds, starting from the directory of the document being checked, and looking in each subsequent parent directory. If no `.jshintrc` file is found, then `./jshint-flags.json` will be used.

Comments are also allowed in the `.jshintrc`, as seen in [this example](https://github.com/jshint/jshint/blob/master/examples/.jshintrc).


contributors
------------
- [Nate Silva](https://github.com/natesilva)
- [Daniel Caspi](https://github.com/dxdc)

acknowledgements
----------------
See [bbresults](https://github.com/isao/bbresults).

license
-------
MIT
