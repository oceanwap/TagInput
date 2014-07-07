TagInput
========
This plugin is very simple and easy to integrate.

html code:
<br>
`<script src="/jquery.min.js" type="text/javascript" ></script>`<br>
`<link href="plugin.css" type="text/css" rel="stylesheet" >`<br>
`<script src="plugin.js" type="text/javascript" ></script>`<br>
`<input class="tagger" name="tags" type="text" value="tags" >`<br>


javascript: 
<pre>$(".tagger").tagInput();</pre>

or

<pre>$(".tagger").tagInput({class:"tagInput"}); // to append extra class attribute to generated tag box.</pre>


This plugin also contains AutoSize plugin.

<pre>
$(".tagger").autoSize({ comfortZone: 30, // space to type below curser
            minWidth: this.width(),
            maxWidth: 500,
            minHeight: this.height(),
            maxHeight: 500,
        });
</pre>


</code>
