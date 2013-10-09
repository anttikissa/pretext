<h1>Pretext</h1>
<h2>Work in progress</h2>
<p>The current implementation works, roughly, but doesn&#39;t quite follow all of the
design guidelines.  Expect the language to change.
<h2>Better than Markdown</h2>
<p>Pretext is a replacement for Markdown (the language).  It doesn&#39;t try to offer
backward compatibility.  It doesn&#39;t try to cater to every possible need under
the sky (except by being extensible).  It just tries to be simple, easy, and do
its job well.
<h2>Features</h2>
<p>Paragraphs are separated by empty lines, like in Markdown.  When starting a
paragraph with a <code>&lt;</code>, it&#39;s taken to be a literal HTML element and is passed as-is.
<h2>Weight</h2>
<p>Pretext is small (around 1.7 kB minified + compressed, 8kB without) and the code
is comprehensibly and well-documented.  (TODO at least that&#39;s the goal.)
<h2>Speed?</h2>
<p>Pretext is &quot;fast enough&quot; (TODO test against marked)
<h2>Implemented in JavaScript, Node.js and the browser</h2>
<h2>Small footprint</h2>
<h2>How fast is it?</h2>
<p>...
<ul>
<li>a single way to do everything
<li>link syntax that isn&#39;t confusing (perhaps <code>&lt;link http://google.com/ This is
  google&gt;</code> or something like that)
<li><code>/italics/</code> and <code>*bold*</code> instead of <code>*italics*</code> and <code>**bold**</code>
<li>comes with a good plugin system 
<li>and a reasonable set of plugins for typography etc.
<li>and for those who want things like <code>&lt;del&gt;</code>, <code>&lt;abbr&gt;</code>, <code>&lt;u&gt;</code> etc.
<li>take all the good stuff from Markdown
</ul>
<h2>Philosophy</h2>
<h3>Don&#39;t surprise the user.</h3>
<p>The boundaries of Pretext should be as obvious as possible.  If you know the
basics of Pretext, you should be immediately able to answer the question: &quot;Can
you do this in Pretext?&quot;
<p>Either you can, or you can&#39;t.  Usually you can&#39;t.  In that case, you can always
fall back to the HTML.  If Pretext fails your expectations often, it&#39;s easy to
write a plugin to fix the deficiency.  Or find an existing one.
<p>Example:
<p>&quot;I wonder if there is some syntax for data definition lists&quot; &ndash; there isn&#39;t.
Use HTML.
<p>&quot;I wonder if I can add a <code>target</code> attribute to a link written in Pretext&quot; &ndash; you
can&#39;t.  Use HTML. 
<p>&quot;I wonder if tables&ndash;&quot; No.  Use HTML.
<p>If you keep falling back to plain HTML a lot of time, you can find a plugin or
write your own.
<h4>Examples of things that might surprise you</h4>
<p>If <code>_foo_ (?bar=1&amp;zot=2)</code> is escaped, why isn&#39;t <code>&lt;a
href=&#39;?bar=1&amp;zot=2&#39;&gt;foo&lt;/a&gt;</code>?
<p>Consider the difference between these Markdown excerpts:
<pre><code>`hello.c`:
    int main() {
        printf(&quot;Hello world!\n&quot;);
    }</code></pre>
<p>end 
<pre><code>`hello.c`:

    int main() {
        printf(&quot;Hello world!\n&quot;);
    }</code></pre>
<p>It should be obvious that the latter one is what the user wanted.  We arrive at
a maxim: inconspicuous changes in the source shouldn&#39;t cause conspicuous changes
in the output.
<ul>
<li>If the user starts a paragraph with an HTML element that looks like it starts
  a paragraph, then it should start a paragraph, otherwise it should be a
  standalone HTML element.  (See the list of elements that allow you to skip a
  <code>&lt;/p&gt;</code>:
  http://developers.whatwg.org/syntax.html#optional-tags)
</ul>
<ul>
<li>If <code>\</code> is used to quote things, it is to be used consistently.
  * The general meaning: if a character has a special meaning in Pretext, and you
    want to use that character literally, put a <code>\</code> in front of it
  * Inside `, should it prevent things from being quoted?  To highlight parts of
    the code, for example?
</ul>
<h3>Trust the user.</h3>
<p>If you write invalid Pretext, you&#39;ll get invalid markup. <code>*one _two three*
four_</code>._  But Pretext tries to make it obvious if you do.
<p>It&#39;s not Pretext&#39;s job to save you from XSS attacks or other acts of
malevolence.  You should run the output through a filter if use Pretext for
untrusted inputs.
<h3>What you write should look like what you typically get.</h3>
<p>This is the rationale for <code>/italic/</code>, <code>*bold*</code>, <code>_links_</code>, and the list syntax.
<p>Of course you can 
<h3>Pretext should encourage you to write maintainable text.</h3>
<p>The format should be as uniform as possible.  (When it comes to the ordered list
syntax, this is at odds with 
<h3>Pretext should be forgiving of user errors.</h3>
<p>, without taking into account 
<p>#
<h3>Don&#39;t take HTML semantics too seriously.</h3>
<p>The <a href='http://developers.whatwg.org/text-level-semantics.html#text-level-semantics'>current HTML standard</a>
mandates that you should use <code>&lt;i&gt;</code> for &quot;an alternate voice or mood, [or] a
technical term, [or lots of things that are typically italicized]&quot;.  <code>&lt;em&gt;</code>
should be used stress emphasis, which is typically italicized.  
<p>Likewise &ndash; this is my interpretation &ndash; <code>&lt;b&gt;</code> should be used for text that
isn&#39;t particularly important but you still want it to needs out, and <code>&lt;strong&gt;</code>
should be used for things that are important and therefore needs to stand out.
Both are typically set in boldface.
<p>Pretext doesn&#39;t really care which one you mean.  It generates <code>&lt;i&gt;</code> for <code>/this/</code>
and <code>&lt;b&gt;</code> for <code>*this*</code> by default.  And it talks about making things &#39;bold&#39; and
&#39;italic&#39; instead of &#39;warranting attention without being especially important&#39;
and &#39;offset from normal prose because it&#39;s in an alternate voice or mood or
because of some other aspect in which it&#39;s different&#39;, because it&#39;s easier.
<p>To use <code>&lt;em&gt;</code> or <code>&lt;strong&gt;</code>, just use them as you would in HTML.
<p>Code blocks are also simply wrapped inside <code>&lt;pre&gt;</code> instead of <code>&lt;pre&gt;&lt;code&gt;</code>,
like the standard suggests.  This is mainly done to make the resulting HTML look
better: <code>&lt;pre&gt;</code> allows us to put a newline before the first line, so it doesn&#39;t
meddle with the content&#39;s formatting.  Then again, even though Pretext calls
them &#39;code blocks&#39; instead of &#39;preformatted text&#39;, they are basically
preformatted text and you might want to use them for different purposes than
computer code.  It wouldn&#39;t be particularly semantic to wrap a printout or a
poem inside <code>&lt;code&gt;</code>, would it?
<h3>The user will encounter problems.  They should be easy to solve.</h3>
<p>There should ideally be an <i>intuitive solution</i> to a problem.
<p>Example: I want to quote 
Problems should be solvably first intuitive, googleable, or trying a couple of
different solution.  There should be only one obvious solution to a problem.
<p>Examples of problems:
<ul>
<li>add a <code>class</code> attribute to a link 
<li>use a different kind of link
</ul>
<p>Whenever there&#39;s a recurring problem, there should be a plugin to do it; if
there isn&#39;t, it should be relatively straightforward to write one.
<p>There are roughly two kinds of problems:
<ul>
<li>the user wants to do something Pretext supports, but Pretext fails to deliver.
<li>the user wants to do something Pretext doesn&#39;t support, 
</ul>
<h3>Order of priorities</h3>
<ol>
<li>Extensible
<li>Simple (in this order: simple to learn, simple to use, simple to extend)
<li>Small
<li>Fast
</ol>
<p>(1), (2) and (3) go hand in hand: in order to be small, it needs to be simple;
in order to be simple, it needs to be extensible.
<p>Each time a concept or a building block is introduced to a system, you create a
set of expectations for the user.  To reduce user&#39;s mental burden, Pretext
introduces as few concepts as possible, and tries very hard not to break your
expectations.
<p>For instance, the user expects <code>\</code> to quote things where they need to be
quoted.  That means quoting special characters outside 
<h2>The user will encounter problems. They should be easy to solve.</h2>
<h2>Implementing plugins</h2>
<p>Pretext processing is split into phases.  Phases are functions that take some
input and produce some output.
<p>TODO document phases
<p>TODO move this to later; this is just a shorthand for defining plugins on a fly.
Possibly demonstrate it like this:
<pre><code>pretext.before(&#39;all&#39;, function(input) { do something to input });</code></pre>
<p>and then congratulate the reader of having written his first Pretext plugin.
<p>If you need to do your processing before some other phase:
<pre><code>pretext.before(&lt;phase&gt;, function(input) { return output; });</code></pre>
<p>If you need to do your processing after some other phase:
<pre><code>pretext.after(&lt;phase&gt;, function(input) { return output; });</code></pre>
<p>To replace a phase:
<pre><code>pretext.replace(&lt;phase&gt;, function(input) { return output; });</code></pre>
<p>To remove a phase:
<pre><code>pretext.remove(&lt;phase&gt;);</code></pre>
<p>Inside phase functions, you can invoke other phases with:
<pre><code>output = this.&lt;phase&gt;(content)</code></pre>
<p><code>this</code> is the <code>pretext</code> object.
<p>By default, Pretext attempts to inject your plugin immediately after or before a
phase.  In the case of multiple plugins, the last to come will win.
<p>Plugins will themselves become phases once they are installed.
<p>(Eventually there may be multiple constraints between different plugins and some
dependency analysis to determine a suitable order.)
<p>You can use pretext directly.  In that case, it comes with the default settings:
<pre><code>var pretext = require(&#39;pretext&#39;);
console.log(pretext(&#39;# Hello&#39;));</code></pre>
<p>You can use <code>install</code> to install plugins.  Using a newly created instance is
recommended (but not enforced):
<pre><code>var Pretext = require(&#39;pretext&#39;).Pretext;
var pretext = new Pretext();
pretext.install(&#39;uglify&#39;);
pretext.install(&#39;sanitize&#39;);
pretext.install(require(&#39;pretext-newlines&#39;));</code></pre>
<p>Or, more succinctly:
<pre><code>var Pretext = require(&#39;pretext&#39;).Pretext;
var pretext = new Pretext(&#39;uglify&#39;, &#39;sanitize&#39;, require(&#39;pretext-newlines&#39;));</code></pre>
<p>A plugin is either a string (in which case it&#39;s looked up in the internal
plugins, of which there will be a few), or a function with an optional member
(one of <code>after</code>, <code>before</code> or <code>replace</code>) that tells the phase where it should be
plugged in.
<p>The <code>pretext-newlines</code> plugin, for example, is defined as:
<pre><code>function newlines(text) {
    return text.replace(&#39;\n&#39;, &#39;&lt;br&gt;&#39;);
}

// Or whatever 
newlines.after = &#39;filter&#39;;

module.exports = newlines;</code></pre>
<p>TODO some plugins may want to install multiple phases in different places.  What
then?
<p>TODO some plugins may want to access a data object that collects data during the
processing.  Or is that actually necessary?  We could also do things like a
plugin that collects a list of figures from the text:
<pre><code>var figures = [];
pretext.after(&#39;filter&#39;, function collect(text) { // collect figures in `figures` });
pretext.after(&#39;all&#39;, function summarize(text) { // append list of figures at the end }); </code></pre>
<p>Ideally, the data would live as a variable inside the second phase, but it needs
to be readable by the first phase.  Perhaps allow this:
<pre><code>pretext.replace(&#39;all&#39;, function summarize(text) {
    var figures = [];
    function collect(text) {
        ... access `figures` ...
    }
    pretext.after(&#39;filter&#39;, collect);
    var result = inner.all()
    // append stuff to `result` and return
});</code></pre>
<p>Where <code>pretext.after(&#39;filter&#39;, collect)</code> will replace the current <code>collect</code> if
one was previously installed.  Another question arises: should
<code>pretext.replace(&#39;all&#39;)</code> save the name of the old phase as an alias for the new
phase?  Obviously others might refer to <code>all</code> and expect it to work.
<p>Example: github markdown style fenced code blocks
<p>Example: roman literals
<p>Example: typography with options
<p>Example: custom HTML elements (<code>&lt;sc&gt;</code> to generate better fake small caps;
<sample> to show a code block followed by its output)
<p>Example: beautify / uglify HTML
<h2>To study</h2>
<ul>
<li>Markright http://blog.elliottcable.name/posts/markright.xhtml
<li>Textile http://en.wikipedia.org/wiki/Textile_(markup_language)
<li>txt2tags http://txt2tags.org/online.php
<li>Github flavored markdown http://github.github.com/github-flavored-markdown/
<li>The future of Markdown http://www.codinghorror.com/blog/2012/10/the-future-of-markdown.html
<li>MultiMarkdown http://fletcherpenney.net/multimarkdown/
<li>PHP Markdown Extra http://michelf.ca/projects/php-markdown/extra/ 
<li>reStructuredText (though it&#39;s quite 90&#39;s) http://en.wikipedia.org/wiki/ReStructuredText
</ul>
