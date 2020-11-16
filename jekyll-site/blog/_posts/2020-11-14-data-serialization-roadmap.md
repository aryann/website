---
layout: post
title: "Data Serialization: A Roadmap"
---

This blog series provides a hands-on overview of data serialization. We start by
explaining what data serialization is and what it's used for. We then cover an
assortment of popular data serialization formats and their trade-offs. We round
off the exploration by implementing a library for the Bencode data serialization
format which is used by the popular peer-to-peer file sharing system BitTorrent.

## Learning Objectives

By the time you are done reading this series, you can expect to:

- Understand data serialization and its use-cases.
- Gain familiarity with an assortment of popular serialization formats. We will
  cover JSON, YAML, Protocol Buffers, Cap'n Proto, Apache Avro, Apache Arrow,
  and Bencode.
- Become adept at choosing a serialization format based on the problem space and
  the trade-offs each format makes.
- Experience what it takes to implement a data serialization library for a
  simple format, Bencode.

## Target Audience

This series is intended for readers new to data serialization as well as those
who have some experience. For the latter group, we hope this series provides a
broader exposure to the topic and some hands-on experience.

## Prerequisites

We assume the reader is proficient in at least one programming language and has
familiarity with the following topics:

- statically- versus dynamically-typed languages;
- the
  [client-server model](https://en.wikipedia.org/wiki/Client%E2%80%93server_model);
  and
- [Hypertext Transfer Protocol (HTTP)](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).

Throughout the series we include code snippets from many programming languages.
The reader need not know every language presented. Most of the examples are
constructed to be self-explanatory.

We will discuss some issues around performance. It is helpful for the reader to
have some knowledge of computer architecture, however, this is not a
requirement. We provide links to learning resources as appropriate.

The implementation of a library for the Bencode format is done in Go. We assume
the reader does not know Go ahead of time.

## The Series

For reference, this section lists all posts in the series. Each post builds upon
the preceding one, so we recommend reading them in order. Readers who already
have experience with the topic may find it helpful to skip certain sections.

- [Data Serialization:
  Introduction]({% post_url blog/2020-11-15-data-serialization-introduction %})
- ... more posts are coming soon. Watch this space!

## Next

Continue on by reading [Data Serialization:
Introduction]({% post_url blog/2020-11-15-data-serialization-introduction %}).
