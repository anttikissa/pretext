# Pretext

## Better than Markdown

Pretext is a replacement for Markdown (the language).  It doesn't try to offer
backward compatibility.  It doesn't try to cater to every possible need under
the sky (except by being extensible).  It just tries to be simple, easy, and do
its job well.

... Sprinkle examples here ...

## Implemented in JavaScript, Node.js and the browser

## Small footprint

## How fast is it?

...

* a single way to do everything
* link syntax that isn't confusing (perhaps `<link http://google.com/ This is
  google>` or something like that)
* `/italics/` and `*bold*` instead of `*italics*` and `**bold**`
* comes with a good plugin system 
* and a reasonable set of plugins for typography etc.
* and for those who want things like `<del>`, `<abbr>`, `<u>` etc.
* take all the good stuff from Markdown

## Philosophy

### Don't surprise the user.

The boundaries of Pretext should be as obvious as possible.  If you know the
basics of Pretext, you should be immediately able to answer the question: "Can
you do this in Pretext?"

Either you can, or you can't.  Usually you can't.  In that case, you can always
fall back to the HTML.  If Pretext fails your expectations often, it's easy to
write a plugin to fix the deficiency.  Or find an existing one.

Example:

"I wonder if there is some syntax for data definition lists" -- there isn't.
Use HTML.

"I wonder if I can add a `target` attribute to a link written in Pretext" -- you
can't.  Use HTML. 

"I wonder if tables--" No.  Use HTML.

If you keep falling back to plain HTML a lot of time, you can find a plugin or
write your own.

#### Examples of things that might surprise you

If `_foo_ (?bar=1&zot=2)` is escaped, why isn't `<a
href='?bar=1&zot=2'>foo</a>`?

Consider the difference between these Markdown excerpts:

	`hello.c`:
		int main() {
			printf("Hello world!\n");
		}

end 

	`hello.c`:

		int main() {
			printf("Hello world!\n");
		}

It should be obvious that the latter one is what the user wanted.  We arrive at
a maxim: inconspicuous changes in the source shouldn't cause conspicuous changes
in the output.

- If the user starts a paragraph with an HTML element that looks like it starts
  a paragraph, then it should start a paragraph, otherwise it should be a
  standalone HTML element.  (See the list of elements that allow you to skip a
  `</p>`:
  http://developers.whatwg.org/syntax.html#optional-tags)

- If `\\` is used to quote things, it is to be used consistently.
  - The general meaning: if a character has a special meaning in Pretext, and you
    want to use that character literally, put a `\\` in front of it
  - Inside `, should it prevent things from being quoted?  To highlight parts of
	the code, for example?

### Trust the user.

If you write invalid Pretext, you'll get invalid markup. `*one _two three*
four_`._  But Pretext tries to make it obvious if you do.

It's not Pretext's job to save you from XSS attacks or other acts of
malevolence.  You should run the output through a filter if use Pretext for
untrusted inputs.

### What you write should look like what you typically get.

This is the rationale for `/italic/`, `*bold*`, `_links_`, and the list syntax.

Of course you can 

### Pretext should encourage you to write maintainable text.

The format should be as uniform as possible.  (When it comes to the ordered list
syntax, this is at odds with 

### Pretext should be forgiving of user errors.

, without taking into account 

#

### Don't take HTML semantics too seriously.

The _current HTML standard_
(http://developers.whatwg.org/text-level-semantics.html#text-level-semantics)
mandates that you should use `<i>` for "an alternate voice or mood, [or] a
technical term, [or lots of things that are typically italicized]".  `<em>`
should be used stress emphasis, which is typically italicized.  

Likewise -- this is my interpretation -- `<b>` should be used for text that
isn't particularly important but you still want it to needs out, and `<strong>`
should be used for things that are important and therefore needs to stand out.
Both are typically set in boldface.

Pretext doesn't really care which one you mean.  It generates `<i>` for `/this/`
and `<b>` for `*this*` by default.  And it talks about making things 'bold' and
'italic' instead of 'warranting attention without being especially important'
and 'offset from normal prose because it's in an alternate voice or mood or
because of some other aspect in which it's different', because it's easier.

To use `<em>` or `<strong>`, just use them as you would in HTML.

Code blocks are also simply wrapped inside `<pre>` instead of `<pre><code>`,
like the standard suggests.  This is mainly done to make the resulting HTML look
better: `<pre>` allows us to put a newline before the first line, so it doesn't
meddle with the content's formatting.  Then again, even though Pretext calls
them 'code blocks' instead of 'preformatted text', they are basically
preformatted text and you might want to use them for different purposes than
computer code.  It wouldn't be particularly semantic to wrap a printout or a
poem inside `<code>`, would it?

### The user will encounter problems.  They should be easy to solve.

There should ideally be an /intuitive solution/ to a problem.

Example: I want to quote 
Problems should be solvably first intuitive, googleable, or trying a couple of
different solution.  There should be only one obvious solution to a problem.

Examples of problems:

- add a `class` attribute to a link 
- use a different kind of link

Whenever there's a recurring problem, there should be a plugin to do it; if
there isn't, it should be relatively straightforward to write one.

There are roughly two kinds of problems:

- the user wants to do something Pretext supports, but Pretext fails to deliver.
- the user wants to do something Pretext doesn't support, 


### Order of priorities

1. Extensible
2. Simple (in this order: simple to learn, simple to use, simple to extend)
3. Small
4. Fast

(1), (2) and (3) go hand in hand: in order to be small, it needs to be simple;
in order to be simple, it needs to be extensible.




Each time a concept or a building block is introduced to a system, you create a
set of expectations for the user.  To reduce user's mental burden, Pretext
introduces as few concepts as possible, and tries very hard not to break your
expectations.

For instance, the user expects `\\` to quote things where they need to be
quoted.  That means quoting special characters outside 

## The user will encounter problems. They should be easy to solve.










## To study

* Textile http://en.wikipedia.org/wiki/Textile_(markup_language)
* txt2tags http://txt2tags.org/online.php
* Markright http://blog.elliottcable.name/posts/markright.xhtml
* Github flavored markdown http://github.github.com/github-flavored-markdown/
* The future of Markdown http://www.codinghorror.com/blog/2012/10/the-future-of-markdown.html
* MultiMarkdown http://fletcherpenney.net/multimarkdown/
* PHP Markdown Extra http://michelf.ca/projects/php-markdown/extra/ 
* reStructuredText (though it's quite 90's) http://en.wikipedia.org/wiki/ReStructuredText


