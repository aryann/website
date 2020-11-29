---
layout: post
title: "Data Serialization: JSON"
---

This post is part of a series on data serialization. If you haven't already,
take a look at [Data Serialization: A
Roadmap]({% post_url blog/2020-11-14-data-serialization-roadmap %}). This post
follows [Data Serialization:
Introduction]({% post_url blog/2020-11-15-data-serialization-introduction %}).

In the previous post, we presented an example of data serialization and a
definition. Recall that we introduced some data serialization design
considerations by contriving two formats, the [newline-delimited
format]({% post_url blog/2020-11-15-data-serialization-introduction %}#newline-delimited-format)
and the [key-value
format]({% post_url blog/2020-11-15-data-serialization-introduction %}#key-value-format).
While these contrived formats served as good examples, you should use an
existing serialization format unless you have a compelling reason to design a
new one. Chances are, there is already a format that meets your requirements.

In this post, we cover the first of many serialization formats in the series:
**JavaScript Object Notation**, commonly known as **JSON**. We start by
introducing the JSON format. We then recast in JSON [our
example]({% post_url blog/2020-11-15-data-serialization-introduction %}#an-example)
from the introduction. Finally, we examine some of JSON's attributes and
potential pitfalls. This post is not meant to be a practical guide on how to use
JSON. We provide links at the end for further reading which include some
practical resources.

This post includes some code snippets to demonstrate various concepts. You do
not need to know the languages used in the examples to follow along.

## The Format

JSON is a subset of [JavaScript](https://en.wikipedia.org/wiki/JavaScript). If
you have used JavaScript, JSON's format will look familiar. In this section we
will cover JSON's data types and syntax. [json.org](https://www.json.org)
provides a complete description of the format.

<aside markdown="1">
Technically JSON was not a subset of JavaScript until the
[2019 ECMAScript language specification](https://www.ecma-international.org/ecma-262/10.0/index.html).
ECMAScript governs JavaScript implementations. Historically, JSON allowed
unescaped Unicode line and paragraph separators in strings. These characters
were not allowed in ECMAScript strings.
[A recent proposal](https://github.com/tc39/proposal-json-superset) changed
ECMAScript to allow these characters, making JSON a subset of JavaScript.
</aside>

### Primitive Types

JSON supports the following primitive types:

- **Numbers**: Signed decimal numbers that may contain fractional parts. For
  example, `0`, `-1`, `1.2`, and `-1.1` are all valid JSON numbers. JSON also
  supports the
  [scientific E notation](https://en.wikipedia.org/wiki/Scientific_notation#E_notation).
  `2e3` and `2E3` can be used to represent `2000`. Like JavaScript, JSON does
  not make a distinction between integers and floating point numbers. Unlike
  JavaScript, `Nan` and `Infinity` are not allowed in JSON.
- **Strings**: Sequences of zero or more
  [Unicode characters](https://en.wikipedia.org/wiki/Unicode). Strings are
  delimited by double quotation marks. Strings support
  [backslash escaping](https://en.wikipedia.org/wiki/Escape_character). Examples
  include `""` for the empty string, `"Hello, world!"`,
  `"I\nCONTAIN\nLINE\nBREAKS"`, and `"I contain a \"quoted string\""`.
- **Booleans**: Literal values `true` and `false` represent booleans.

A primitive type by itself is a valid JSON document. As an example, consider
this Python interactive session where we deserialize some JSON primitives using
the [`json.loads`](https://docs.python.org/3/library/json.html#json.loads)
function:

```python
>>> import json
>>> json.loads('1')
1
>>> json.loads('651e2')
65100.0
>>> json.loads('"Hello, world!"')
'Hello, world!'
>>> json.loads('true')
True
```

### Composite Types

To support complex data structures, JSON offers two composite types: arrays and
objects.

#### Arrays

An array is an ordered list of zero or more values. Each value can be any JSON
type. In other words, values of different types are permitted in an array.
Arrays are delimited using square brackets and the values are comma-separated.
Whitespace may be used liberally between values and the delimiters. The
following are some array examples:

- `[]`
- `[1]`
- `[1, 2, 3]`
- `[ 1, 2 , 3 ]`
- `[true, false, true]`
- `[1, true, "Hello, world!"]`
- `[[]]`
- `[[1, 2, 3], ["hello", "world"], [true, false]]`

#### Objects

An object is an associative list. An association is a mapping from a string key
to any value type. Objects are delimited using curly braces. The key and the
value of a single mapping are separated using a colon. Mappings are separated by
commas. Lik arrays, whitespace may be used liberally between values and
delimiters. Here is an example:

```json
{
  "name": "Abraham Lincoln",
  "birthday": "1809-02-12",
  "federalRoles": [
    {
      "role": "president",
      "range": { "start": "1861-04-04", "end": "1865-04-15" }
    },
    {
      "role": "representative",
      "range": { "start": "1847-04-04", "end": "1849-04-03" }
    }
  ]
}
```

## Example

Now that we've presented the JSON format, let's revisit [the
example]({% post_url blog/2020-11-15-data-serialization-introduction %}#an-example)
from the introduction, this time in JSON. Recall that in the introduction we
contrived the [key-value
format]({% post_url blog/2020-11-15-data-serialization-introduction %}#key-value-format)
in order to encode status updates:

```
StatusMessage=Hello, world!
LocationAsReportedByDevice=47.637087,-122.334543
LocationAsReportedByUser=47.627577,-122.336694
Timestamp=2020-11-13T19:05:15Z
```

The following is _one possible way_ of representing a status update in JSON:

```json
{
  "statusMessage": "Hello, world!",
  "location": {
    "fromDevice": { "lat": 47.637087, "lon": -122.334543 },
    "fromUser": { "lat": 47.627577, "lon": -122.336694 }
  },
  "timestamp": "2020-11-13T19:05:15Z"
}
```

An HTTP POST request containing this payload would look like:

```http
POST /profiles/me/statuses HTTP/1.1
Host: example.com
Content-Type: application/json
Authorization: ...
...

{
  "statusMessage": "Hello, world!",
  "location": {
    "fromDevice": { "lat": 47.637087, "lon": -122.334543 },
    "fromUser": { "lat": 47.627577, "lon": -122.336694 }
   },
  "timestamp": "2020-11-13T19:05:15Z"
}
```

Note that in addition to the payload changing, we're also using a different
`Content-Type` header value: `application/json`. This signals to the server that
we are sending a JSON document in the body of the request.

## Deep Dive

### Standardization

<!-- TODO: Add links to future posts. -->

The JSON format is standardized concurrently under the
[ECMA-404 Standard](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf)
and [RFC 8259](https://tools.ietf.org/html/rfc8259). Not all popular
serialization formats are standardized. Examples include YAML, Apache Avro, and
Protocol Buffers, which we will cover in future posts. Standardization makes it
easier for library authors to develop libraries that behave consistently across
different languages and platforms. This means clients don't have to worry about
subtle serialization differences when crossing language and platform boundaries,
provided conforming libraries are used.

<aside markdown="1">
Some JSON libraries deviate from the standard for convenience but offer an
option for strict adherence. For example, the JSON module in Python's standard
library has an
[`allow_nan` option](https://docs.python.org/3/library/json.html#json.dump) that
allows serialization of out-of-range floating point numbers. By default this
option is enabled, allowing serialization of Python values `nan`, `inf`, and
`-inf` into their JavaScript counterparts `Nan`, `Infinity`, and `-Infinity`.
Recall that `Nan` and `Infinity` are not allowed in JSON. When operating in a
distributed system, prefer strict adherence to the standard to avoid
interoperability issues.
</aside>

### Ubiquity

JSON is used in many HTTP-based APIs. Prominent uses include APIs offered by
[Google Cloud Platform](https://cloud.google.com/apis),
[Amazon Web Services](https://docs.aws.amazon.com/),
[Microsoft Azure](https://docs.microsoft.com/en-us/rest/api/azure/), and
[Twitter](https://developer.twitter.com/en/docs). Ubiquity is a good attribute
for a serialization format because it often translates to better library support
across many programming languages and familiarity among developers who use the
serialized data. This is part of the reason why JSON is found in so many APIs.
You can view a list of JSON libraries on [json.org](https://www.json.org).

### Readability and Performance

JSON is human readable. This is a useful property when developing or debugging a
system. However, it's important to acknowledge that readability comes at a
performance cost. Compared to formats that do not prioritize readability, JSON
serialization and deserialization can cost more
[CPU cycles](https://en.wikipedia.org/wiki/Instruction_cycle). JSON documents
also tend to be much larger than counterparts that prioritize performance. This
can increase network bandwidth requirements for distributed systems that use
JSON.

As a salient example, consider [Kubernetes](https://kubernetes.io/). Kubernetes
is a cluster management system that can manage thousands of machines. As of this
writing, the Kubernetes control plane uses JSON for
[its API](https://kubernetes.io/docs/concepts/overview/kubernetes-api/) by
default. The choice of JSON has proven to be a scalability bottleneck,
preventing Kubernetes from reaching cluster sizes of 10,000 machines.

There is currently
[a proposal](https://stupefied-goodall-e282f7.netlify.app/contributors/design-proposals/api-machinery/protobuf/)
to support [Protocol Buffers](https://developers.google.com/protocol-buffers)
(covered in a future post) as an alternative serialization format for the
Kubernetes API. Here are two interesting excerpts from the proposal:

> At the current time, the latency of reaction to change in the cluster is
> dominated by the time required to load objects from persistent store (etcd),
> convert them to an output version, serialize them to JSON over the network,
> and then perform the reverse operation in clients. The cost of
> serialization/deserialization and the size of the bytes on the wire, as well
> as the memory garbage created during those operations, dominate the CPU and
> network usage of the API servers.
>
> ...
>
> We propose to introduce a Protocol Buffer serialization for all common API
> objects that can optionally be used by intra-cluster components. Experiments
> have demonstrated a 10x reduction in CPU use during serialization and
> deserialization, a 2x reduction in size in bytes on the wire, and a 6-9x
> reduction in the amount of objects created on the heap during serialization.
> The Protocol Buffer schema for each object will be automatically generated
> from the external API Go structs we use to serialize to JSON.

When designing a system, it's important to understand whether serialization and
deserialization can dominate performance. If the answer is yes, then JSON may
not be the right format.

### Schema

The JSON format is self-describing. That is, there is no need to reference a
separate document to understand what a JSON document contains. On the plus side,
this affords more flexibility. It's easy to add a new field to a data type
without updating all participants (there are some exceptions to this, which we
cover in the [next section](#unknown-fields)). Additionally, middleware can
perform structured logging of requests containing JSON documents without having
to understand any application-level details.

On the negative side, application developers are left to devise their own
mechanisms for defining and enforcing data schemas: the JSON libraries are not
helpful here. That said, [JSON Schema](https://json-schema.org/) is a project
that offers a mechanism for defining schemas for JSON objects. JSON Schema has a
healthy [ecosystem of libraries](https://json-schema.org/implementations.html)
across dozens of languages and, as of this writing, is undergoing
standardization.

### Unknown Fields

In large distributed systems, it is often desirable to evolve components
independently of one another. This independence is important because it is often
not possible to update all components in a timely manner or at all. Sometimes,
we need to update data models, so it's important to understand what the
limitations of our serialization format are when it comes to data model changes.

Let's revisit our status sharing app [example](#example). Recall that a status
update can be represented as JSON document like so:

```json
{
  "statusMessage": "Hello, world!",
  "location": {
    "fromDevice": { "lat": 47.637087, "lon": -122.334543 },
    "fromUser": { "lat": 47.627577, "lon": -122.336694 }
  },
  "timestamp": "2020-11-13T19:05:15Z"
}
```

Now suppose we add a feature where an author of a status update can include
their sentiment in an update:

```json
{
  "statusMessage": "Hello, world!",
  "sentiment": "happy",
  "location": {
    "fromDevice": { "lat": 47.637087, "lon": -122.334543 },
    "fromUser": { "lat": 47.627577, "lon": -122.336694 }
  },
  "timestamp": "2020-11-13T19:05:15Z"
}
```

Also suppose clients can edit status updates by sending a POST request to the
same path that contains the status:

```http
POST /profiles/me/statuses/2020/11/13/0 HTTP/1.1
Host: example.com
Content-Type: application/json
Authorization: ...
...

{
  "statusMessage": "Hello, world! And hello to all of my friends!",
  "sentiment": "happy",
  "location": {
    "fromDevice": {"lat": 47.637087, "lon": -122.334543},
    "fromUser": {"lat": 47.627577, "lon": -122.336694}
   },
  "timestamp": "2020-11-13T19:05:15Z"
}
```

This scenario can be problematic when using JSON libraries that deserialize data
into predefined types that mirror the schema. Let's consider what may happen
when a client that understands the "sentiment" key is used to create a status
update and a client that has not been updated is used to edit that update.

To edit an update, a client would do the following:

1. Send an HTTP GET request to `/profiles/me/statuses/2020/11/13/0` to get the
   JSON payload of the status update. This JSON payload will include the
   "sentiment" key.
1. Deserialize the JSON payload into the object that represents a status update.
   Since the object type is predefined and the client has not been updated, the
   sentiment key is dropped during deserialization.
1. Make edits to the status update object.
1. Send an HTTP POST request to `/profiles/me/statuses/2020/11/13/0` with the
   edited status update as a serialized JSON document. This JSON document will
   not have the "sentiment" key, making the server think "sentiment" is being
   deleted.

The following Go program provides a concrete example:

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
)

// StatusUpdate is the Go type that mirrors a status update's JSON format.
type StatusUpdate struct {
	StatusMessage string `json:"statusMessage"`

	// Note "sentiment" is not defined.
	//
	// For simplicity, other fields are elided.
}

func main() {
	// Step 1 from above:
	myJSON := `
	{
		"statusMessage": "Hello, World!",
		"sentiment": "happy"
	}`

	// Step 2 from above:
	update := StatusUpdate{}
	if err := json.Unmarshal([]byte(myJSON), &update); err != nil {
		log.Fatal(err)
	}

	// Step 3 from above:
	update.StatusMessage += " And hello to all of my friends!"

	// Step 4 from above:
	result, err := json.Marshal(update)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("%s\n", result)
}
```

The program above prints:

```json
{ "statusMessage": "Hello, World! And hello to all of my friends!" }
```

Note that because we are using a predefined `StatusUpdate` struct without a
field for sentiment, the "sentiment" key is dropped. JSON does not impose any
requirements on library developers to handle unknown keys, so as a user of JSON,
care must be taken to avoid this interoperability issue that can result in data
loss.

There are seveal ways to address this class of data loss:

- Deserialize your JSON document into a data structure that can handle arbitrary
  data. JSON libraries in dynamically-typed languages generally do this by
  default. For example,
  [Python's `json` module](https://docs.python.org/3/library/json.html) returns
  either a primitive, a dict, or a list depending on the input data. There is no
  need to declare the expected keys. Many libraries in strongly-typed languages
  offer similar support. For example,
  [Go's `encoding/json` package](https://golang.org/pkg/encoding/json) can
  [deserialize data into a `map[string]interface{}`](https://golang.org/pkg/encoding/json/#Unmarshal)
  which can hold arbitrary JSON objects.
- If there is a desire to use predefined types:
  - Use a library that can also store unknown keys. This way, on the
    serialization path, the library can write out the keys it does not
    understand instead of silently dropping them. There is
    [a pending proposal](https://github.com/golang/go/issues/22533) to extend
    Go's `endoding/json` package to support this behavior.
  - Use a library that can produce an error when an unknown key is encountered.
    While this may not be ideal in some cases, it does avoid data loss. As an
    example, [Java's Jackson JSON library](https://github.com/FasterXML/jackson)
    offers
    [this behavior](https://fasterxml.github.io/jackson-databind/javadoc/2.6/com/fasterxml/jackson/databind/DeserializationFeature.html#FAIL_ON_UNKNOWN_PROPERTIES).
- Design APIs that avoid write patterns that require all clients to be in
  agreement over the data schema. As an example, edits can be implemented using
  [patch semantics](https://google.aip.dev/134).

### Numbers

The JSON standard has this to say about numbers:

> This specification allows implementations to set limits on the range and
> precision of numbers accepted. Since software that implement IEEE 754 binary64
> (double precision) numbers [[IEEE754](https://en.wikipedia.org/wiki/IEEE_754)]
> is generally available and widely used, good interoperability can be achieved
> by implementations that expect no more precision or range than these provide,
> in the sense that implementations will approximate JSON numbers within the
> expected precision.

Note that the standard does not set range and precision requirements for
numbers. Consider the following Python code that highlights an interoperability
problem that can be caused by this lack of specificity:

```python
>>> import json
>>> original_json = '3.141592653589793238462643383279'
>>> number = json.loads(original_json)
>>> number
3.141592653589793
>>> new_json = json.dumps(number)
>>> new_json
'3.141592653589793'
>>> original_json == new_json
False
```

Note that converting `original_json` into a Python `float` leads to a loss of
precision. A case like this implies that the system that produced
`original_json` is capable of more precision than the Python environment that
deserialized the JSON. This situation can lead to an interoperability problem
where information is lost.

In practice, this may not be a problem. Most software today use
[double precision floating point numbers](https://en.wikipedia.org/wiki/Double-precision_floating-point_format)
and most applications do not require a range or precision greater than what's
offered by double precision floating point numbers. However, it's prudent to
check the implementation details of all JSON libraries that you plan to use to
guard against interoperability issues. As an example, refer to the
[Implementation Limitations](https://docs.python.org/3/library/json.html#implementation-limitations)
section of Python's JSON library.

### Comments

Because JSON is human-readable and self-describing, it is often used as a
configuration language. For example,
[Visual Studio Code uses JSON](https://code.visualstudio.com/docs/getstarted/settings)
for storing user settings. Similarly, the
[Firebase command-line tool also uses JSON](https://firebase.google.com/docs/cli#the_firebasejson_file).

In the configuration context, it is often desirable to be able to add comments.
However, JSON does not support comments. The author of JSON
[omitted comments](https://archive.vn/20150704102718/https://plus.google.com/+DouglasCrockfordEsq/posts/RK8qyGVaGSr)
to prevent the possibility of comments that hold parsing directives, a practice
that would have affected interoperability.

For example, consider a JSON library that allows arrays to be sorted using a
comment-based annotation:

```
# ORDERED
[3, 2, 1]
```

The parsed array would be ordered when deserialized using this library, but
because this behavior is non-standard, the order would be left as-is by other
libraries, leading to interoperability issues.

Some people get around the lack of comments by stripping comments prior to
passing the JSON document to a JSON library. This practice works in static
contexts, but as soon as a program needs to modify the JSON document, the
comments are lost, unless a non-standard, comment-preserving JSON library is
used. Others get around the lack of comments by using `#` as an object key:

```json
{
  "#": "This is my comment describing this object."
  "myKey": 123
}
```

We do not recommend either of these strategies. For configuration where comments
are desired, consider using a different format like [YAML](https://yaml.org/) or
[Hjson](https://hjson.github.io/). YAML will be covered in a future post. Hjson
is left as an exercise to the reader.

## Additional Resources

If you'd like to learn more about JSON, consider these resources:

- [Working with JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)
  by Mozilla
- [The Python `json` module introduction](https://docs.python.org/3/library/json.html)
- [json.org](https://www.json.org)
- Specification:
  - [ECMA-404 Standard](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf)
  - [RFC 8259](https://tools.ietf.org/html/rfc8259)

## Next

In a future post, we will examine Protocol Buffers. Stay tuned!
