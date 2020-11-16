---
layout: post
title: "Data Serialization: Introduction"
---

This post is part of a series on data serialization. If you haven't already,
take a look at [Data Serialization: A
Roadmap]({% post_url blog/2020-11-14-data-serialization-roadmap %}) before
reading this post.

In this post, we explain what data serialization is and what it's used for.
We'll begin with an example, followed by a generalized definition.

## An Example

Suppose you are building a status sharing application, similar to Twitter. Each
user has a profile page that lists a timeline of their status updates. Users can
view profile pages and post status updates through a web frontend, an iOS app,
or an Android app. We refer to the web frontend and the mobile apps as clients.

A status update contains three fields of data: the message, the time of the
update, and the user's location, given as a pair of latitude and longitude.
Since our application facilitates sharing of status updates, we must have a
central source of truth. An HTTP server acts as this central source. Clients
contact the server to fetch status updates and post new ones.

Because clients are implemented in different programming languages and operate
on a variety of platforms, we need a common format for clients and the server to
communicate.

HTTP already handles the details of transporting data. Consider the case of
posting a new status update. To post a new update, let's assume that a client
sends an HTTP POST request to the `/profiles/me/statuses` endpoint on the
server. The body of this request contains the status update. We'll refer to the
body as the payload. Here's what a request may look like:

```http
POST /profiles/me/statuses HTTP/1.1
Host: mystatussharingapp.example.com
Content-Type: text/plain
Authorization: ...
...

<payload>
```

Let's now turn to how the payload is created. Suppose the web frontend is
implemented in TypeScript with the following class definition for a status
update:

```typescript
class StatusUpdate {
  readonly message: string;
  readonly timestamp: Date;
  readonly location: Location;

  constructor(message: string, timestamp: Date, location: Location) {
    // ...
  }
}
```

Similarly, the Android app is implemented in Java with status updates
represented using a class as follows:

```java
public class StatusUpdate {
  private final String message;
  private final Date timestamp;
  private final Location location;

  public StatusUpdate(String message, Date timestamp, Location location) {
    // ...
  }
}
```

When clients create new instances of these objects, each client will have its
own platform-dependent way of representing the underlying data in memory. It
would be infeasible to teach the server about each platform-dependent format, so
we need a common, platform-independent way of constructing the payload that is
placed in the status update HTTP POST request. Let's see how we can construct a
platform-independent payload.

### Newline-Delimited Format

We'll name our first proposal the **newline-delimited format**. We will place
each field of the status update on its own line, starting with the message. For
example, suppose we have a status update with the message "Hello, world!",
created on November 13, 2020 from Seattle. Here's how the payload is
constructed:

```
Hello, world!
2020-11-13T19:05:15Z
47.637087,-122.334543
```

Both the web frontend and the Android app can produce payloads that look like
the above, even though their status update representations vary. This is our
first example of data serialization, which gives us a platform-independent way
of representing data structures. Note that the payload in the above example is a
sequence of bits that happens to also be a human-readable string.

While the newline-delimited scheme works, it is brittle. All client and server
code must adhere to a strict (and arbitrary) ordering of data when encoding and
decoding payloads. For example, if a client reorders the timestamp and location,
then a server will be unable to parse the payload correctly:

```
Hello, world!
47.637087,-122.334543
2020-11-13T19:05:15Z
```

Optional fields are also tricky. Suppose we want to make the location optional
and introduce the ability to reply to an existing status by including a link to
the subject status. This now leads to potential payloads like:

```
I'm a status message without a location.
2020-11-13T19:05:15Z
```

Or:

```
I'm a reply to a friend's status. I include my location.
2020-11-13T19:05:15Z
47.637087,-122.334543
/profiles/my-friend/statuses/1
```

Or:

```
I'm a reply to a friend's status. I do not include my location.
2020-11-13T19:05:15Z
/profiles/my-friend/statuses/1
```

It quickly becomes difficult for the server to figure out which line corresponds
to which piece of data. For example, if a location is included, the subject
status link appears on the fourth line. Without a location, the subject status
link appears on the third line.

For this contrived example, the server can sniff the contents of each line to
tell what it contains, but this is not a scalable solution. This regime will
break if we introduce additional fields that are optional and have the same
type. For example, suppose we allow for two types of optional locations: the
location as reported by the user's phone as well as the location selected by the
user. If a payload contains a single location, how can the server tell what type
of location it is given?

> **Note:** The example of collecting the user's location as reported by their
> phone as well as by the user may seem peculiar for a status-sharing app. There
> are more practical use-cases in other domains. For example, this practice can
> be helpful for a ride-hailing app where the accuracy of the phone's location
> data may be low or where the user plans to walk to a desired pick-up location.

It's clear that the newline-delimited format is inflexible. Further, this format
does not abide by the
[robustness principle](https://en.wikipedia.org/wiki/Robustness_principle). That
is, being conservative in what the client sends and liberal in what the server
accepts.

### Key-Value Format

Let's design a more robust solution. What if we prefixed each field with a key
followed by an equals sign? We'll refer to this as the **key-value format**.
Consider this example:

```
StatusMessage=Hello, world!
LocationAsReportedByDevice=47.637087,-122.334543
LocationAsReportedByUser=47.627577,-122.336694
Timestamp=2020-11-13T19:05:15Z
```

Or this one which omits all location data:

```
StatusMessage=Hello, world! I lack location data!
Timestamp=2020-11-13T19:05:15Z
```

As with the earlier examples, these payloads are also just sequences of bits,
which happen to also be human-readable strings. Now the server can look at the
keys to make sense of the payload. Supporting optional fields does not require
complex logic on the server's part. Additionally, the key-value format makes the
payload human-readable, which is a desirable property for debuggability (though
not necessarily for performance; more on this in a future post).

We've now covered two ways of constructing status update payloads: the
newline-delimited format and the key-value format. While these examples are
contrived and should not be used in practice due to the availability of better
approaches we will cover shortly, the examples allow a gentle introduction to
what can be a complex topic. We are now ready for a generalized definition of
data serialization.

## A Generalized Definition

**Data serialization** is the process of translating an in-memory data structure
into a sequence of platform-independent bits that can be used for transport and
storage. **Data deserialization** is the reverse: reading back into memory a
data structure from its serialized bits.

In our example, the status updates are serialized by clients to support
transport to the server. The server performs the reverse operation when it
receives the POST request.

We did not cover storage, but the story is the same: when the server saves
status updates to persistent storage, it must again serialize the data to a
format appropriate for the storage system.

> **Note:** An HTTP message, like the POST request we surveyed earlier, is
> itself a serialization format. In our example, we actually showcased two
> levels of serialization: one for the status update and one for the HTTP POST
> request. Using a novel example makes it easier to demonstrate the
> considerations a serialization format has to make.
>
> Learning more about
> [HTTP messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)
> can be a good supplement to this series.
>
> Also note that placing one serialized format into another is a fairly common
> pattern. A prevalent use of this technique is found in computer networking.
> For example, an HTTP message is often placed inside of a
> [TCP segment](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_segment_structure),
> which is often placed inside an
> [IPv4 packet](https://en.wikipedia.org/wiki/IPv4#Packet_structure), which is
> placed inside yet another packet at the
> [link layer](https://en.wikipedia.org/wiki/Link_layer). Studying computer
> networking can also be a good supplement to this series. We recommend
> [the Bits and Bytes of Computer Networking](https://www.coursera.org/learn/computer-networking),
> a course offered by Google on Coursera.

## Next

Armed with a definition of data serialization, we can now dive in and explore an
assortment of popular data serialization formats along with the trade-offs at
play. Stay tuned for the upcoming blog posts!
